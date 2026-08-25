const { ActorSheetV2 } = foundry.applications.sheets;
const { HandlebarsApplicationMixin } = foundry.applications.api;

import {
  promptDefenseTraitDialog,
  promptMasteryDialog,
  promptEditFieldDialog,
  promptRollRequestDialog,
  promptItemActionDialog
} from "../../../helpers/dialogs.mjs";
import { defense } from "../../../helpers/flow.mjs";
import { rollWeaponAttack, rollStat } from "../../../helpers/stat-rolls.mjs";
import { GaiaItemBrowser } from "../../item-browser.mjs";

/**
 * ==============================================================================
 * BASE ACTOR SHEET / FICHA BASE DE ATOR (ABSTRATA)
 * ==============================================================================
 * Classe abstrata base para fichas de atores baseada em ApplicationV2 do Foundry VTT.
 * Concentra handlers de ação comuns, menus de contexto, drag & drop e sanitização.
 */
export class GaiaBaseActorSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ["gaia-preludio", "sheet", "actor"],
    position: { width: 900, height: 800 },
    tag: "form",
    form: {
      submitOnChange: true,
      closeOnSubmit: false
    },
    tabGroups: {
      primary: "personagem"
    },
    actions: {
      addResistance: GaiaBaseActorSheet._onAddResistance,
      removeResistance: GaiaBaseActorSheet._onRemoveResistance,
      addImmunity: GaiaBaseActorSheet._onAddImmunity,
      removeImmunity: GaiaBaseActorSheet._onRemoveImmunity,
      addVulnerability: GaiaBaseActorSheet._onAddVulnerability,
      removeVulnerability: GaiaBaseActorSheet._onRemoveVulnerability,
      addReduction: GaiaBaseActorSheet._onAddReduction,
      removeReduction: GaiaBaseActorSheet._onRemoveReduction,
      setExhaustion: GaiaBaseActorSheet._onSetExhaustion,
      setParameterPip: GaiaBaseActorSheet._onSetParameterPip,
      setKnowledgePip: GaiaBaseActorSheet._onSetKnowledgePip,
      addMastery: GaiaBaseActorSheet._onAddMastery,
      removeMastery: GaiaBaseActorSheet._onRemoveMastery,
      rollDefense: GaiaBaseActorSheet._onRollDefense,
      rollParameter: GaiaBaseActorSheet._onRollParameter,
      rollKnowledge: GaiaBaseActorSheet._onRollKnowledge,
      rollInitiative: GaiaBaseActorSheet._onRollInitiative,
      editField: GaiaBaseActorSheet._onPromptEditField,
      createItem: GaiaBaseActorSheet._onCreateItem,
      createAbility: GaiaBaseActorSheet._onCreateAbility,
      openItem: GaiaBaseActorSheet._onOpenItem,
      deleteItem: GaiaBaseActorSheet._onDeleteItem,
      toggleEquip: GaiaBaseActorSheet._onToggleEquip,
      rollItem: GaiaBaseActorSheet._onRollItem,
      rollWeaponAttack: GaiaBaseActorSheet._onRollWeaponAttack,
      rollWeapon: GaiaBaseActorSheet._onRollWeaponAttack,
      promptItemAction: GaiaBaseActorSheet._onPromptItemAction,
      openItemBrowser: GaiaBaseActorSheet._onOpenItemBrowser,
      editImage: GaiaBaseActorSheet._onEditImage,
      sendPortraitToChat: GaiaBaseActorSheet._onSendPortraitToChat,
      showPortraitToPlayers: GaiaBaseActorSheet._onShowPortraitToPlayers,
      tab: GaiaBaseActorSheet._onChangeTab,
      promptRollRequest: GaiaBaseActorSheet._onPromptRollRequest,
      promptRollRequestDialog: GaiaBaseActorSheet._onPromptRollRequest,
      rollLegacyAbility: GaiaBaseActorSheet._onRollLegacyAbility
    }
  };

  /** @type {AbortController|null} */
  _contextMenuController = null;

  /**
   * Executado quando a ficha é renderizada. Sincroniza abas e adiciona ouvintes de evento de menu de contexto.
   * @override
   * @param {object} context - Objeto de contexto de renderização
   * @param {object} options - Opções de renderização da aplicação
   */
  _onRender(context, options) {
    super._onRender(context, options);

    this._syncTabs();

    this._contextMenuController?.abort();
    this._contextMenuController = new AbortController();

    this.element.addEventListener("contextmenu", (event) => {
      const actionElement = event.target.closest("[data-context-action]");
      if (!actionElement) return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      this._onContextMenu(event, actionElement);
    }, { signal: this._contextMenuController.signal });
  }

  /**
   * Manipula eventos do menu de contexto (clique com o botão direito) disparados na ficha.
   * Pode ser estendido ou sobrescrito por subclasses.
   * @protected
   * @param {MouseEvent} event - Evento de clique
   * @param {HTMLElement} actionElement - Elemento HTML que possui o atributo `data-context-action`
   */
  _onContextMenu(event, actionElement) {
    const action = actionElement.dataset.contextAction;
    switch (action) {
      case "editField":
        this.constructor._onPromptEditField.call(this, event, actionElement);
        break;
      case "clearParameterPip":
        this.constructor._onClearParameterPip.call(this, event, actionElement);
        break;
      case "clearKnowledgePip":
        this.constructor._onClearKnowledgePip.call(this, event, actionElement);
        break;
      case "sendPortraitToChat":
        this.constructor._onSendPortraitToChat.call(this, event, actionElement);
        break;
    }
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

    if (item.actor?.id === this.actor.id) return false;

    const itemData = item.toObject();
    return await this.actor.createEmbeddedDocuments("Item", [itemData]);
  }

  /**
   * Trata os dados a serem salvos no formulário, higienizando caminhos de imagem inválidos ou vazios.
   * @override
   * @param {Event} event - Evento de submissão ou alteração do formulário
   * @param {HTMLFormElement} form - Elemento do formulário
   * @param {FormDataExtended} formData - Dados estendidos do formulário
   * @returns {object} Objeto com os dados higienizados para salvamento
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

  /**
   * Prepara o contexto de dados fornecido ao template Handlebars durante a renderização.
   * @override
   * @param {object} options - Opções de renderização
   * @returns {Promise<object>} Contexto com propriedades `actor` e `system` injetadas
   */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.actor = this.actor;
    context.system = this.actor.system;
    return context;
  }

  /**
   * Sincroniza o estado ativo (classe CSS `active`) dos botões e painéis de abas no DOM.
   * @protected
   */
  _syncTabs() {
    this.tabGroups ??= { primary: "personagem" };
    for (const [group, activeTab] of Object.entries(this.tabGroups)) {
      if (!activeTab) continue;
      const elements = this.element.querySelectorAll(`[data-group="${group}"][data-tab]`);
      for (const el of elements) {
        el.classList.toggle("active", el.dataset.tab === activeTab);
      }
    }
  }

  /**
   * Método de conveniência para invocar o diálogo genérico de edição de campo diretamente pela instância da ficha.
   * @param {string} field - Caminho da propriedade no documento do Ator (ex: "system.health.value")
   * @param {object} [options={}] - Opções de configuração do diálogo (label, type, min, max, step)
   * @returns {Promise<any | null>}
   */
  async promptEditFieldDialog(field, options = {}) {
    return await promptEditFieldDialog(this.actor, field, options);
  }

  /* ==============================================================================
   * ACTION HANDLERS ESTÁTICOS COMPARTILHADOS
   * ============================================================================== */

  /**
   * Altera a aba ativa selecionada pelo usuário no grupo correspondente.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento clicado que define `data-tab` e opcionalmente `data-group`
   */
  static _onChangeTab(event, target) {
    const tab = target.dataset.tab;
    const group = target.dataset.group || target.closest("[data-group]")?.dataset.group || "primary";
    if (tab && group) {
      this.changeTab(tab, group);
      this._syncTabs();
    }
  }

  /**
   * Manipula a criação genérica de novos itens no Ator (equipamento, armadura, armamento, etc.).
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento que dispara a ação, com `data-type` e opcionalmente `data-category`
   * @returns {Promise<Item|null>} O item recém-criado
   */
  static async _onCreateItem(event, target) {
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
   * Manipula a criação específica de uma nova Habilidade no Ator.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento disparador da ação
   * @returns {Promise<Item[]>} Documentos de itens criados
   */
  static async _onCreateAbility(event, target) {
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

  /**
   * Abre a ficha de edição de um Item pertencente ao Ator.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento contendo o `data-item-id`
   */
  static async _onOpenItem(event, target) {
    event.preventDefault();
    const itemId = target.dataset.itemId || target.closest("[data-item-id]")?.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (item) item.sheet.render(true);
  }

  /**
   * Remove um Item do Ator.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento contendo o `data-item-id`
   * @returns {Promise<Item|undefined>} O item removido
   */
  static async _onDeleteItem(event, target) {
    event.preventDefault();
    const itemId = target.dataset.itemId || target.closest("[data-item-id]")?.dataset.itemId;
    const item = this.actor.items.get(itemId);
    return item?.delete();
  }

  /**
   * Alterna a propriedade `equipped` de um item (Equipado / Desequipado).
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento contendo o `data-item-id`
   */
  static async _onToggleEquip(event, target) {
    event.preventDefault();
    const itemId = target.dataset.itemId || target.closest("[data-item-id]")?.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (item) {
      const isEquipped = Boolean(item.system?.equipped);
      await item.update({ "system.equipped": !isEquipped });
    }
  }

  /**
   * Executa a rolagem padrão associada a um Item.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento contendo o `data-item-id`
   * @returns {Promise<any>}
   */
  static async _onRollItem(event, target) {
    event.preventDefault();
    const itemId = target.dataset.itemId || target.closest("[data-item-id]")?.dataset.itemId;
    const item = this.actor.items.get(itemId);
    return item?.roll();
  }

  /**
   * Executa o ataque com uma arma pertencente ao Ator.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento contendo o `data-item-id`
   * @returns {Promise<any | null>}
   */
  static async _onRollWeaponAttack(event, target) {
    event.preventDefault();
    const itemId = target.dataset.itemId || target.closest("[data-item-id]")?.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (!item) return null;
    return await rollWeaponAttack(this.actor, item, { event, target });
  }

  /**
   * Abre o diálogo de ação customizada ou uso rápido para um Item.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento contendo o `data-item-id`
   * @returns {Promise<any | null>}
   */
  static async _onPromptItemAction(event, target) {
    event.preventDefault();
    const itemId = target.dataset.itemId || target.closest("[data-item-id]")?.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (!item) return null;
    return await promptItemActionDialog(this.actor, item, { event, target });
  }

  /**
   * Abre o Navegador de Itens (Browser) associado a este Ator.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento com `data-type` opcional para filtro
   */
  static _onOpenItemBrowser(event, target) {
    event.preventDefault();
    const type = target?.dataset?.type;
    return GaiaItemBrowser.open(this.actor, { type });
  }

  /**
   * Abre o FilePicker para alterar a imagem do retrato ou atributo de imagem do Ator.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento com `data-edit` ou `data-field` indicando o atributo
   */
  static async _onEditImage(event, target) {
    const attr = target.dataset.field || target.dataset.edit || "img";
    const current = foundry.utils.getProperty(this.actor, attr);
    const FilePickerClass = foundry.applications.apps.FilePicker?.implementation || globalThis.FilePicker;
    const fpOptions = {
      type: "image",
      current,
      callback: async (path) => {
        await this.actor.update({ [attr]: path });
      }
    };
    if (Number.isNumeric(this.position?.top)) fpOptions.top = this.position.top + 40;
    if (Number.isNumeric(this.position?.left)) fpOptions.left = this.position.left + 10;

    const fp = new FilePickerClass(fpOptions);
    return fp.browse();
  }

  /**
   * Envia o retrato (portrait) do personagem estilizado para o chat do Foundry.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento disparador
   * @returns {Promise<ChatMessage|undefined>}
   */
  static async _onSendPortraitToChat(event, target) {
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
   * Exibe a imagem do retrato do personagem para todos os jogadores conectados.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento disparador
   */
  static async _onShowPortraitToPlayers(event, target) {
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
   * Envia a habilidade de Legado para o chat.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento disparador
   */
  static async _onRollLegacyAbility(event, target) {
    event?.preventDefault?.();
    const index = Number(target.dataset.index);
    if (isNaN(index)) return;

    const legacyItem = (this.actor.items ?? []).find(i => i.type === "legacy" && i.name.toLowerCase() === (this.actor.system?.legacy || "").toLowerCase())
      || (game.items ?? []).find(i => i.type === "legacy" && i.name.toLowerCase() === (this.actor.system?.legacy || "").toLowerCase());

    let rawList = legacyItem?.system?.legacyAbilities;
    if (!rawList || !Array.isArray(rawList)) {
      rawList = this.actor.system?.legacyAbilities ?? [];
    }

    const ab = rawList[index];
    if (!ab) return;

    const activeEffectText = typeof ab.activeEffect === "string" ? ab.activeEffect : (ab.activeEffect?.text || "");

    const content = `
      <div class="gaia-preludio chat-card item-card legacy-ability-card">
        <header class="card-header flexrow" style="display: flex; align-items: center; gap: 8px; border-bottom: 2px solid var(--gaia-purple-dark, #4a2e6b); padding-bottom: 4px; margin-bottom: 6px;">
          <img src="icons/svg/book.svg" title="${ab.name}" width="32" height="32" style="border: none;"/>
          <h3 class="item-name" style="margin: 0; font-family: var(--gaia-font-medieval, Georgia, serif); color: var(--gaia-purple-dark, #4a2e6b); font-size: 16px;">${ab.name}</h3>
        </header>
        <div class="card-content">
          ${ab.description ? `<p style="margin-bottom: 6px;">${ab.description}</p>` : ""}
          ${activeEffectText ? `<p style="color: var(--gaia-purple-dark, #4a2e6b); font-style: italic; margin-top: 4px;"><strong>Efeito:</strong> ${activeEffectText}</p>` : ""}
        </div>
        <footer class="card-footer" style="margin-top: 8px; font-size: 11px; font-style: italic; color: #666;">
          <span>Habilidade de Legado (${this.actor.system?.legacy || "Legado"})</span>
        </footer>
      </div>
    `;

    return await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      content
    });
  }

  /**
   * Exibe o diálogo para edição dinâmica de um campo específico do sistema.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento com `data-field`, `data-label`, `data-type-input`, etc.
   */
  static async _onPromptEditField(event, target) {
    const fieldPath = target.dataset.field;
    if (!fieldPath) return;

    const fieldLabel = target.dataset.label || fieldPath;
    const typeInput = target.dataset.typeInput || target.dataset.type || "text";
    const min = target.dataset.min !== undefined ? Number(target.dataset.min) : undefined;
    const max = target.dataset.max !== undefined ? Number(target.dataset.max) : undefined;
    const step = target.dataset.step !== undefined ? Number(target.dataset.step) : undefined;

    await promptEditFieldDialog(this.actor, fieldPath, {
      label: fieldLabel,
      type: typeInput,
      typeInput,
      min,
      max,
      step
    });
  }

  /**
   * Abre o diálogo de requisição de rolagem para os jogadores/GM.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento disparador
   */
  static async _onPromptRollRequest(event, target) {
    return await promptRollRequestDialog();
  }

  /**
   * Abre o diálogo para adicionar uma nova Resistência a Dano ao Ator.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento disparador
   */
  static async _onAddResistance(event, target) {
    const data = await promptDefenseTraitDialog("Adicionar Resistência a Dano", false);
    if (!data) return;
    const list = [...(this.actor.system.damageResistance ?? [])];
    list.push(data);
    await this.actor.update({ "system.damageResistance": list });
  }

  /**
   * Remove uma Resistência a Dano da lista do Ator.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento contendo `data-index`
   */
  static async _onRemoveResistance(event, target) {
    const index = Number(target.dataset.index);
    if (isNaN(index)) return;
    const list = [...(this.actor.system.damageResistance ?? [])];
    list.splice(index, 1);
    await this.actor.update({ "system.damageResistance": list });
  }

  /**
   * Abre o diálogo para adicionar uma nova Imunidade a Dano ao Ator.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento disparador
   */
  static async _onAddImmunity(event, target) {
    const data = await promptDefenseTraitDialog("Adicionar Imunidade a Dano", false);
    if (!data) return;
    const list = [...(this.actor.system.damageImmunity ?? [])];
    list.push(data);
    await this.actor.update({ "system.damageImmunity": list });
  }

  /**
   * Remove uma Imunidade a Dano da lista do Ator.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento contendo `data-index`
   */
  static async _onRemoveImmunity(event, target) {
    const index = Number(target.dataset.index);
    if (isNaN(index)) return;
    const list = [...(this.actor.system.damageImmunity ?? [])];
    list.splice(index, 1);
    await this.actor.update({ "system.damageImmunity": list });
  }

  /**
   * Abre o diálogo para adicionar uma nova Vulnerabilidade a Dano ao Ator.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento disparador
   */
  static async _onAddVulnerability(event, target) {
    const data = await promptDefenseTraitDialog("Adicionar Vulnerabilidade a Dano", false);
    if (!data) return;
    const list = [...(this.actor.system.damageVulnerability ?? [])];
    list.push(data);
    await this.actor.update({ "system.damageVulnerability": list });
  }

  /**
   * Remove uma Vulnerabilidade a Dano da lista do Ator.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento contendo `data-index`
   */
  static async _onRemoveVulnerability(event, target) {
    const index = Number(target.dataset.index);
    if (isNaN(index)) return;
    const list = [...(this.actor.system.damageVulnerability ?? [])];
    list.splice(index, 1);
    await this.actor.update({ "system.damageVulnerability": list });
  }

  /**
   * Abre o diálogo para adicionar uma nova Redução de Dano Fixa ao Ator.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento disparador
   */
  static async _onAddReduction(event, target) {
    const data = await promptDefenseTraitDialog("Adicionar Redução de Dano Fixa", true);
    if (!data) return;
    const list = [...(this.actor.system.damageReduction ?? [])];
    list.push(data);
    await this.actor.update({ "system.damageReduction": list });
  }

  /**
   * Remove uma Redução de Dano Fixa da lista do Ator.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento contendo `data-index`
   */
  static async _onRemoveReduction(event, target) {
    const index = Number(target.dataset.index);
    if (isNaN(index)) return;
    const list = [...(this.actor.system.damageReduction ?? [])];
    list.splice(index, 1);
    await this.actor.update({ "system.damageReduction": list });
  }

  /**
   * Executa a rolagem de Defesa (Bloqueio ou Esquiva) do Ator.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento contendo `data-type` ("block" ou "agility")
   */
  static async _onRollDefense(event, target) {
    const defenseType = target.dataset.type || "block";
    if (defenseType === "agility" || defenseType === "block") {
      const roll = await defense(defenseType, this.actor, "standard");
      const label = defenseType === "agility" ? "Esquiva (Agilidade)" : "Bloqueio";
      return await roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: `Rolagem de Defesa (${label}) - Gaia: Prelúdio`
      });
    }
    return await rollStat(this.actor, { event, target, type: "defense", categoryLabel: "Defesa" });
  }

  /**
   * Executa a rolagem de um Parâmetro do Ator (atributos principais ou ofensivos/defensivos).
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento contendo os atributos de dados do parâmetro
   */
  static async _onRollParameter(event, target) {
    if (event.target?.tagName === "INPUT") return;
    const key = target.dataset.key;
    let overrideValue;
    let label;

    if (key === "offensiveParameters") {
      overrideValue = this.actor.system.offensiveParameters ?? 0;
      label = game.i18n.localize("GAIA.Creature.OffensiveParameters");
    } else if (key === "defensiveParameters") {
      overrideValue = this.actor.system.defensiveParameters ?? 0;
      label = game.i18n.localize("GAIA.Creature.DefensiveParameters");
    } else if (target.dataset.value !== undefined) {
      overrideValue = Number(target.dataset.value);
    }

    if (target.dataset.label) {
      label = target.dataset.label;
    }

    return await rollStat(this.actor, {
      event,
      target,
      type: "parameters",
      categoryLabel: label || "Parâmetro",
      overrideValue
    });
  }

  /**
   * Executa a rolagem de Iniciativa do Ator.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento disparador
   */
  static async _onRollInitiative(event, target) {
    return await rollStat(this.actor, { event, target, type: "initiative", categoryLabel: "Iniciativa" });
  }

  /**
   * Manipula a marcação de diamantes de Exaustão no Ator.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento contendo `data-value`
   */
  static async _onSetExhaustion(event, target) {
    const value = Number(target.dataset.value);
    const current = Number(this.actor.system.exhaustion) || 0;
    const next = current === value ? value - 1 : value;
    await this.actor.update({ "system.exhaustion": Math.max(0, next) });
  }

  /**
   * Define ou ajusta o nível de um Parâmetro (1 a 6) e recalcula bônus derivados (Agilidade, Vigor).
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento com `data-param` e `data-value`
   */
  static async _onSetParameterPip(event, target) {
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

    if (paramKey === "agility") {
      const bonusList = [...(this.actor.system.parametersBonus ?? [])];
      const targetAttr = "movement";
      const calculatedBonus = Math.floor(entry.value / 2);
      let bonusEntry = bonusList.find(b => b.attr === targetAttr);
      if (calculatedBonus > 0) {
        if (bonusEntry) {
          bonusEntry.bonus = calculatedBonus;
        } else {
          bonusList.push({ attr: targetAttr, bonus: calculatedBonus });
        }
      } else {
        const index = bonusList.findIndex(b => b.attr === targetAttr);
        if (index !== -1) bonusList.splice(index, 1);
      }
      await this.actor.update({ "system.parametersBonus": bonusList });
    }

    if (paramKey === "vigor") {
      const bonusList = [...(this.actor.system.parametersBonus ?? [])];
      const targetAttr = "health.max";
      const calculatedBonus = entry.value;
      let bonusEntry = bonusList.find(b => b.attr === targetAttr);
      if (calculatedBonus > 0) {
        if (bonusEntry) {
          bonusEntry.bonus = calculatedBonus;
        } else {
          bonusList.push({ attr: targetAttr, bonus: calculatedBonus });
        }
      } else {
        const index = bonusList.findIndex(b => b.attr === targetAttr);
        if (index !== -1) bonusList.splice(index, 1);
      }
      await this.actor.update({ "system.parametersBonus": bonusList });
    }
  }

  /**
   * Zera o valor de um Parâmetro (disparado via menu de contexto / clique direito).
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento com `data-param`
   */
  static async _onClearParameterPip(event, target) {
    const paramKey = String(target.dataset.param || "").toLowerCase();
    const list = [...(this.actor.system.parameters ?? [])];
    let entry = list.find(p => String(p.name || "").toLowerCase() === paramKey);
    if (entry) {
      entry.value = 0;
      await this.actor.update({ "system.parameters": list });
    }
  }

  /**
   * Define ou ajusta o nível de um Conhecimento (0 a 6) e recalcula bônus derivados (Percepção).
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento com `data-knowledge` e `data-value`
   */
  static async _onSetKnowledgePip(event, target) {
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
      const targetAttr = "passivePerception";
      const calculatedBonus = entry.value;
      let bonusEntry = bonusList.find(b => b.attr === targetAttr);
      if (calculatedBonus > 0) {
        if (bonusEntry) {
          bonusEntry.bonus = calculatedBonus;
        } else {
          bonusList.push({ attr: targetAttr, bonus: calculatedBonus });
        }
      } else {
        const index = bonusList.findIndex(b => b.attr === targetAttr);
        if (index !== -1) bonusList.splice(index, 1);
      }
      await this.actor.update({ "system.parametersBonus": bonusList });
    }
  }

  /**
   * Zera o valor de um Conhecimento (disparado via menu de contexto / clique direito).
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento com `data-knowledge`
   */
  static async _onClearKnowledgePip(event, target) {
    const knowKey = String(target.dataset.knowledge || "").toLowerCase();
    const list = [...(this.actor.system.knowledge ?? [])];
    let entry = list.find(k => String(k.name || "").toLowerCase() === knowKey);
    if (entry) {
      entry.value = 0;
      await this.actor.update({ "system.knowledge": list });
    }
  }

  /**
   * Abre o diálogo para adicionar uma nova Maestria ao Ator.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento disparador
   */
  static async _onAddMastery(event, target) {
    await promptMasteryDialog(this.actor);
  }

  /**
   * Remove uma Maestria da lista do Ator.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento contendo `data-index`
   */
  static async _onRemoveMastery(event, target) {
    const index = Number(target.dataset.index);
    const list = [...(this.actor.system.masteries ?? [])];
    list.splice(index, 1);
    await this.actor.update({ "system.masteries": list });
  }

  /**
   * Executa a rolagem associada a um Conhecimento do Ator.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento contendo as informações do conhecimento
   */
  static async _onRollKnowledge(event, target) {
    return await rollStat(this.actor, { event, target, type: "knowledge", categoryLabel: "Conhecimento" });
  }
}
