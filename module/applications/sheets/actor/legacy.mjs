const { ActorSheetV2 } = foundry.applications.sheets;
const { HandlebarsApplicationMixin } = foundry.applications.api;

import { prepareLegacySheetContext } from "../../../helpers/actor-context.mjs";
import {
  promptDefenseTraitDialog,
  promptMasteryDialog,
  promptEditFieldDialog,
  promptRollRequestDialog,
  promptItemActionDialog
} from "../../../helpers/dialogs.mjs";
import { rollStat, rollWeaponAttack } from "../../../helpers/stat-rolls.mjs";
import { GaiaItemBrowser } from "../../item-browser.mjs";

/**
 * ==============================================================================
 * LEGACY SHEET / FICHA DE PERSONAGEM (LEGADO)
 * ==============================================================================
 * Ficha de ator baseada em ApplicationV2 do Foundry VTT.
 * Orquestra a renderização e delega a lógica de contexto, diálogos e rolagens
 * para módulos auxiliares especializados em `helpers/`.
 */
export class LegacySheet extends HandlebarsApplicationMixin(ActorSheetV2) {
  static DEFAULT_OPTIONS = {
    classes: ["gaia-preludio", "sheet", "actor"],
    position: { width: 900, height: 900 },
    tag: "form",
    form: {
      submitOnChange: true,
      closeOnSubmit: false
    },
    tabGroups: {
      primary: "personagem"
    },
    actions: {
      setExhaustion: LegacySheet.#onSetExhaustion,
      addResistance: LegacySheet.#onAddResistance,
      removeResistance: LegacySheet.#onRemoveResistance,
      addImmunity: LegacySheet.#onAddImmunity,
      removeImmunity: LegacySheet.#onRemoveImmunity,
      addReduction: LegacySheet.#onAddReduction,
      removeReduction: LegacySheet.#onRemoveReduction,
      setParameterPip: LegacySheet.#onSetParameterPip,
      setKnowledgePip: LegacySheet.#onSetKnowledgePip,
      addMastery: LegacySheet.#onAddMastery,
      removeMastery: LegacySheet.#onRemoveMastery,
      rollParameter: LegacySheet.#onRollParameter,
      rollKnowledge: LegacySheet.#onRollKnowledge,
      rollDefense: LegacySheet.#onRollDefense,
      rollInitiative: LegacySheet.#onRollInitiative,
      editImage: LegacySheet.#onEditImage,
      sendPortraitToChat: LegacySheet.#onSendPortraitToChat,
      showPortraitToPlayers: LegacySheet.#onShowPortraitToPlayers,
      openItem: LegacySheet.#onOpenItem,
      rollItem: LegacySheet.#onRollItem,
      rollWeaponAttack: LegacySheet.#onRollWeaponAttack,
      rollWeapon: LegacySheet.#onRollWeaponAttack,
      promptItemAction: LegacySheet.#onPromptItemAction,
      deleteItem: LegacySheet.#onDeleteItem,
      createAbility: LegacySheet.#onCreateAbility,
      createItem: LegacySheet.#onCreateItem,
      toggleEquip: LegacySheet.#onToggleEquip,
      openItemBrowser: LegacySheet.#onOpenItemBrowser,
      editField: LegacySheet.#onPromptEditField,
      tab: LegacySheet.#onChangeTab,
      promptRollRequest: LegacySheet.#onPromptRollRequest,
      promptRollRequestDialog: LegacySheet.#onPromptRollRequest
    }
  };

  static PARTS = {
    main: { 
      template: "systems/gaia-preludio/templates/actor/legacy.hbs",
      scrollable: [".sheet-tabs-content"]
    }
  };

  /** @type {AbortController|null} */
  #contextMenuController = null;

  /** @override */
  _onRender(context, options) {
    super._onRender(context, options);

    this.#syncTabs();

    // Cancela qualquer ouvinte anterior para evitar duplicação a cada re-render da ficha
    this.#contextMenuController?.abort();
    this.#contextMenuController = new AbortController();

    // Ouve cliques com o botão direito (contextmenu) em toda a extensão da ficha
    this.element.addEventListener("contextmenu", (event) => {
      const actionElement = event.target.closest("[data-context-action]");
      if (!actionElement) return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      const action = actionElement.dataset.contextAction;

      switch (action) {
        case "editField":
          LegacySheet.#onPromptEditField.call(this, event, actionElement);
          break;
        case "clearParameterPip":
          LegacySheet.#onClearParameterPip.call(this, event, actionElement);
          break;
        case "clearKnowledgePip":
          LegacySheet.#onClearKnowledgePip.call(this, event, actionElement);
          break;
        case "sendPortraitToChat":
          LegacySheet.#onSendPortraitToChat.call(this, event, actionElement);
          break;
      }
    }, { signal: this.#contextMenuController.signal });
  }

  /**
   * Processa o evento de soltar (drop) de um Item na ficha.
   * @override
   * @param {DragEvent} event - Evento de arrastar e soltar
   * @param {object} data - Dados do objeto solto na ficha
   * @returns {Promise<Document[]|boolean>}
   */
  async _onDropItem(event, data) {
    if (!this.actor.isOwner) return false;
    const item = await Item.fromDropData(data);
    if (!item) return false;

    // Se o item já for pertencente a esta mesma ficha, ignora para não duplicar
    if (item.actor?.id === this.actor.id) return false;

    const itemData = item.toObject();
    return await this.actor.createEmbeddedDocuments("Item", [itemData]);
  }

  /**
   * Trata os dados a serem salvos no formulário, higienizando caminhos de imagem inválidos ou vazios.
   * @override
   */
  _prepareSubmitData(event, form, formData) {
    if (formData && formData.object && "img" in formData.object) {
      const img = formData.object.img;
      if (!img || typeof img !== "string" || !img.trim() || !/\.(png|jpe?g|webp|svg|gif|avif)$/i.test(img)) {
        delete formData.object.img;
      }
    }
    const submitData = super._prepareSubmitData(event, form, formData);
    if ("img" in submitData) {
      const img = submitData.img;
      if (!img || typeof img !== "string" || !img.trim() || !/\.(png|jpe?g|webp|svg|gif|avif)$/i.test(img)) {
        delete submitData.img;
      }
    }
    return submitData;
  }

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    return await prepareLegacySheetContext(this, context);
  }

  /* ==============================================================================
   * AÇÕES ESTÁTICAS (ACTION HANDLERS)
   * ============================================================================== */

  /**
   * Manipula o clique em um diamante de exaustão.
   */
  static async #onSetExhaustion(event, target) {
    const value = Number(target.dataset.value);
    const current = Number(this.actor.system.exhaustion) || 0;
    const next = current === value ? value - 1 : value;
    await this.actor.update({ "system.exhaustion": Math.max(0, next) });
  }

  /**
   * Define o nível de um Parâmetro (1 a 6).
   */
  static async #onSetParameterPip(event, target) {
    const paramKey = String(target.dataset.param || "").toLowerCase();
    const value = Number(target.dataset.value);
    const list = [...(this.actor.system.parameters ?? [])];

    let entry = list.find(p => String(p.name || "").toLowerCase() === paramKey);
    if (!entry) {
      entry = { name: paramKey, value: 0 };
      list.push(entry);
    }

    entry.value = entry.value === value ? value - 1 : value;
    await this.actor.update({ "system.parameters": list });
    // Se o parâmetro for Agilidade, calcula e atualiza o bônus
    if (paramKey === "agility") {
      const bonusList = [...(this.actor.system.parametersBonus ?? [])];
      const targetAttr = "movement"; // Parametro que receberá o bônus (ex: movement, health.max, etc.)
      // Exemplo: 1 de bônus para cada 2 pontos de Agilidade (ex: 2 agilidade = +1, 4 = +2, 6 = +3)
      const calculatedBonus = Math.floor(entry.value / 2);
      // Procura se já existe um bônus para esse parametro na lista
      let bonusEntry = bonusList.find(b => b.attr === targetAttr);
      if (calculatedBonus > 0) {
        if (bonusEntry) {
          bonusEntry.bonus = calculatedBonus; // Atualiza o bônus existente
        } else {
          bonusList.push({ attr: targetAttr, bonus: calculatedBonus }); // Adiciona novo bônus
        }
      } else {
        // Se a Agilidade caiu abaixo de 2, remove o bônus da lista
        const index = bonusList.findIndex(b => b.attr === targetAttr);
        if (index !== -1) bonusList.splice(index, 1);
      }
      await this.actor.update({ "system.parametersBonus": bonusList });
    }
    if(paramKey === "vigor"){
      const bonusList = [...(this.actor.system.parametersBonus ?? [])];
      const targetAttr = "health.max";
      const calculatedBonus = entry.value;
      let bonusEntry = bonusList.find(b => b.attr === targetAttr);
      if(calculatedBonus > 0){
        if(bonusEntry){
          bonusEntry.bonus = calculatedBonus;
        }else{
          bonusList.push({attr: targetAttr, bonus: calculatedBonus});
        }
      }else{
        const index = bonusList.findIndex(b => b.attr === targetAttr);
        if(index !== -1) bonusList.splice(index, 1);
      }
      await this.actor.update({ "system.parametersBonus": bonusList });
    }
      

  }

  /**
   * Zera o valor de um Parâmetro (via clique direito).
   */
  static async #onClearParameterPip(event, target) {
    const paramKey = String(target.dataset.param || "").toLowerCase();
    const list = [...(this.actor.system.parameters ?? [])];
    let entry = list.find(p => String(p.name || "").toLowerCase() === paramKey);
    if (entry) {
      entry.value = 0;
      await this.actor.update({ "system.parameters": list });
    }
  }

  /**
   * Define o nível de um Conhecimento (0 a 6).
   */
  static async #onSetKnowledgePip(event, target) {
    const knowKey = String(target.dataset.knowledge || "").toLowerCase();
    const value = Number(target.dataset.value);
    const list = [...(this.actor.system.knowledge ?? [])];

    let entry = list.find(k => String(k.name || "").toLowerCase() === knowKey);
    if (!entry) {
      entry = { name: knowKey, value: 0 };
      list.push(entry);
    }

    entry.value = entry.value === value ? value - 1 : value;
    await this.actor.update({ "system.knowledge": list });
    if (knowKey === "perception") {
      const bonusList = [...(this.actor.system.parametersBonus ?? [])];
      const targetAttr = "passivePerception"; // Parametro que receberá o bônus (ex: movement, health.max, etc.)
      // Exemplo: 1 de bônus para cada 2 pontos de Agilidade (ex: 2 agilidade = +1, 4 = +2, 6 = +3)
      const calculatedBonus = entry.value;
      // Procura se já existe um bônus para esse Parametro na lista
      let bonusEntry = bonusList.find(b => b.attr === targetAttr);
      if (calculatedBonus > 0) {
        if (bonusEntry) {
          bonusEntry.bonus = calculatedBonus; // Atualiza o bônus existente
        } else {
          bonusList.push({ attr: targetAttr, bonus: calculatedBonus }); // Adiciona novo bônus
        }
      } else {
        // Se a Agilidade caiu abaixo de 2, remove o bônus da lista
        const index = bonusList.findIndex(b => b.attr === targetAttr);
        if (index !== -1) bonusList.splice(index, 1);
      }
      await this.actor.update({ "system.parametersBonus": bonusList });
  }
}

  /**
   * Zera o valor de um Conhecimento (via clique direito).
   */
  static async #onClearKnowledgePip(event, target) {
    const knowKey = String(target.dataset.knowledge || "").toLowerCase();
    const list = [...(this.actor.system.knowledge ?? [])];
    let entry = list.find(k => String(k.name || "").toLowerCase() === knowKey);
    if (entry) {
      entry.value = 0;
      await this.actor.update({ "system.knowledge": list });
    }
  }

  /**
   * Abre diálogo para adicionar uma nova maestria.
   */
  static async #onAddMastery(event, target) {
    await promptMasteryDialog(this.actor);
  }

  /**
   * Remove uma maestria da lista.
   */
  static async #onRemoveMastery(event, target) {
    const index = Number(target.dataset.index);
    const list = [...(this.actor.system.masteries ?? [])];
    list.splice(index, 1);
    await this.actor.update({ "system.masteries": list });
  }

  /**
   * Adiciona uma nova resistência a dano através do diálogo.
   */
  static async #onAddResistance(event, target) {
    const data = await promptDefenseTraitDialog("Adicionar Resistência", false);
    if (!data || !data.type) return;

    const list = [...(this.actor.system.damageResistance ?? [])];
    list.push({ type: data.type });
    await this.actor.update({ "system.damageResistance": list });
  }

  /**
   * Remove uma resistência a dano.
   */
  static async #onRemoveResistance(event, target) {
    const index = Number(target.dataset.index);
    const list = [...(this.actor.system.damageResistance ?? [])];
    list.splice(index, 1);
    await this.actor.update({ "system.damageResistance": list });
  }

  /**
   * Adiciona uma nova imunidade a dano através do diálogo.
   */
  static async #onAddImmunity(event, target) {
    const data = await promptDefenseTraitDialog("Adicionar Imunidade", false);
    if (!data || !data.type) return;

    const list = [...(this.actor.system.damageImmunity ?? [])];
    list.push({ type: data.type });
    await this.actor.update({ "system.damageImmunity": list });
  }

  /**
   * Remove uma imunidade a dano.
   */
  static async #onRemoveImmunity(event, target) {
    const index = Number(target.dataset.index);
    const list = [...(this.actor.system.damageImmunity ?? [])];
    list.splice(index, 1);
    await this.actor.update({ "system.damageImmunity": list });
  }

  /**
   * Adiciona uma nova redução de dano através do diálogo.
   */
  static async #onAddReduction(event, target) {
    const data = await promptDefenseTraitDialog("Adicionar Redução de Dano", true);
    if (!data || !data.type) return;

    const list = [...(this.actor.system.damageReduction ?? [])];
    list.push({ type: data.type, value: data.value });
    await this.actor.update({ "system.damageReduction": list });
  }

  /**
   * Remove uma redução de dano.
   */
  static async #onRemoveReduction(event, target) {
    const index = Number(target.dataset.index);
    const list = [...(this.actor.system.damageReduction ?? [])];
    list.splice(index, 1);
    await this.actor.update({ "system.damageReduction": list });
  }

  /**
   * Executa a rolagem de um Parâmetro.
   */
  static async #onRollParameter(event, target) {
    return await rollStat(this.actor, { event, target, type: "parameters", categoryLabel: "Parâmetro" });
  }

  /**
   * Executa a rolagem de um Conhecimento.
   */
  static async #onRollKnowledge(event, target) {
    return await rollStat(this.actor, { event, target, type: "knowledge", categoryLabel: "Conhecimento" });
  }

  /**
   * Executa a rolagem de Defesa (Bloqueio ou Agilidade).
   */
  static async #onRollDefense(event, target) {
    return await rollStat(this.actor, { event, target, type: "defense", categoryLabel: "Defesa" });
  }

  /**
   * Executa a rolagem de Iniciativa (baseada em Agilidade).
   */
  static async #onRollInitiative(event, target) {
    return await rollStat(this.actor, { event, target, type: "initiative", categoryLabel: "Iniciativa" });
  }

  /**
   * Abre o FilePicker para alterar o retrato (portrait) do personagem.
   */
  static async #onEditImage(event, target) {
    const attr = target.dataset.field || target.dataset.edit || "img";
    const current = foundry.utils.getProperty(this.actor, attr);
    const FilePickerClass = foundry.applications.apps.FilePicker?.implementation || globalThis.FilePicker;
    const fp = new FilePickerClass({
      type: "image",
      current,
      callback: async (path) => {
        await this.actor.update({ [attr]: path });
      },
      top: this.position.top + 40,
      left: this.position.left + 10
    });
    return fp.browse();
  }

  /**
   * Envia o retrato do personagem (character-portrait) como mensagem no chat.
   */
  static async #onSendPortraitToChat(event, target) {
    event?.preventDefault?.();
    const actor = this.actor;
    if (!actor || !actor.img) return;

    const content = `
      <div class="gaia-chat-card gaia-portrait-chat-card" style="text-align: center; padding: 6px;">
        <h3 style="margin: 0 0 6px 0; font-family: var(--gaia-font-medieval, 'Cinzel', Georgia, serif); font-size: 1.1em; color: var(--gaia-text-parchment, #000); border-bottom: 1px solid var(--gaia-border-gold, #8c7355); padding-bottom: 4px;">
          ${actor.name}
        </h3>
        <img class="chat-portrait-img" src="${actor.img}" alt="${actor.name}" style="max-width: 100%; max-height: 320px; border-radius: 4px; border: 1px solid var(--gaia-border-frame, #574c43); object-fit: contain; background: rgba(0,0,0,0.1);" />
      </div>
    `;

    return await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      content
    });
  }

  /**
   * Exibe a imagem do personagem para os jogadores conectados.
   */
  static async #onShowPortraitToPlayers(event, target) {
    event?.preventDefault?.();
    const actor = this.actor;
    if (!actor || !actor.img) return;

    const ImagePopoutClass = foundry.applications.apps.ImagePopout?.implementation || globalThis.ImagePopout;
    const popout = new ImagePopoutClass({
      src: actor.img,
      title: actor.name,
      uuid: actor.uuid
    });
    popout.render(true);
    popout.shareImage();
  }

  /**
   * Abre a ficha de um item ao clicar nele na tabela.
   */
  static async #onOpenItem(event, target) {
    const itemId = target.dataset.itemId || target.closest("[data-item-id]")?.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (item) item.sheet.render(true);
  }

  /**
   * Manipula a abertura do diálogo de edição de campo genérico.
   */
  static async #onPromptEditField(event, target) {
    const field = target.dataset.field;
    if (!field) return;

    const label = target.dataset.label;
    const type = target.dataset.typeInput || target.dataset.type;
    const min = target.dataset.min !== undefined ? Number(target.dataset.min) : undefined;
    const max = target.dataset.max !== undefined ? Number(target.dataset.max) : undefined;
    const step = target.dataset.step !== undefined ? Number(target.dataset.step) : undefined;

    await promptEditFieldDialog(this.actor, field, { label, type, min, max, step });
  }

  /**
   * Método de conveniência para invocar o diálogo genérico diretamente pela instância da ficha.
   * @param {string} field - Caminho do campo
   * @param {object} [options={}] - Opções de configuração
   * @returns {Promise<any | null>}
   */
  async promptEditFieldDialog(field, options = {}) {
    return await promptEditFieldDialog(this.actor, field, options);
  }
  
  #syncTabs() {
    this.tabGroups ??= { primary: "personagem" };
    for (const [group, activeTab] of Object.entries(this.tabGroups)) {
      if (!activeTab) continue;
      const elements = this.element.querySelectorAll(`[data-group="${group}"][data-tab]`);
      for (const el of elements) {
        el.classList.toggle("active", el.dataset.tab === activeTab);
      }
    }
  }

  static #onChangeTab(event, target) {
    const tab = target.dataset.tab;
    const group = target.dataset.group || target.closest("[data-group]")?.dataset.group || "primary";
    if (tab && group) {
      this.changeTab(tab, group);
      this.#syncTabs();
    }
  }

  static async #onCreateAbility(event, target) {
    event.preventDefault();
    return this.actor.createEmbeddedDocuments("Item", [{
      name: "Nova Habilidade",
      type: "ability",
      system: {
        cost: "1 PE",
        typeAction: "acaoAtiva",
        type: "conjuracao",
        numberTarget: "1 Alvo",
        range: "8 metros",
        quote: "",
        description: "",
        subEffects: [],
        improvements: []
      }
    }]);
  }

  static async #onRollItem(event, target) {
    event.preventDefault();
    const itemId = target.dataset.itemId;
    const item = this.actor.items.get(itemId);
    return item?.roll();
  }

  static async #onRollWeaponAttack(event, target) {
    event.preventDefault();
    const itemId = target.dataset.itemId || target.closest("[data-item-id]")?.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (!item) return null;
    return await rollWeaponAttack(this.actor, item, { event, target });
  }

  static async #onPromptItemAction(event, target) {
    event.preventDefault();
    const itemId = target.dataset.itemId || target.closest("[data-item-id]")?.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (!item) return null;
    return await promptItemActionDialog(this.actor, item, { event, target });
  }

  static async #onDeleteItem(event, target) {
    event.preventDefault();
    const itemId = target.dataset.itemId;
    const item = this.actor.items.get(itemId);
    return item?.delete();
  }

  /**
   * Manipula a criação genérica de itens (Armamento, Armadura, Equipamento, Habilidade, Legado).
   */
  static async #onCreateItem(event, target) {
    event.preventDefault();
    const type = target.dataset.type || "equipment";
    const category = target.dataset.category;

    const defaultNames = {
      weapon: "Novo Armamento",
      armor: "Nova Armadura",
      equipment: "Novo Equipamento",
      ability: "Nova Habilidade",
      legacy: "Novo Legado"
    };

    const name = defaultNames[type] || "Novo Item";
    const itemData = {
      name,
      type,
      system: category ? { category } : {}
    };

    const [newItem] = await this.actor.createEmbeddedDocuments("Item", [itemData]);
    newItem?.sheet?.render(true);
    return newItem;
  }

  /**
   * Alterna a propriedade 'equipped' de um item (Equipado / Desequipado).
   */
  static async #onToggleEquip(event, target) {
    event.preventDefault();
    const itemId = target.dataset.itemId || target.closest("[data-item-id]")?.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (item) {
      const isEquipped = Boolean(item.system?.equipped);
      await item.update({ "system.equipped": !isEquipped });
    }
  }

  /**
   * Abre o Navegador de Itens e Habilidades com este Ator como alvo para importação.
   */
  static #onOpenItemBrowser(event, target) {
    event.preventDefault();
    const type = target?.dataset?.type;
    return GaiaItemBrowser.open(this.actor, { type });
  }

  static async #onPromptRollRequest(event, target) {
    return await promptRollRequestDialog();
  }
}

export { LegacySheet as LegadoSheet };
