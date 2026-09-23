import { toggleInventoryGridTableMode } from "../../../helpers/inventory-table.mjs";
const { ActorSheetV2 } = foundry.applications.sheets;
const { HandlebarsApplicationMixin } = foundry.applications.api;

import {
  promptDefenseTraitDialog,
  promptMasteryDialog,
  promptEditFieldDialog,
  promptRollRequestDialog,
  promptItemActionDialog,
  promptLevelUpDialog
} from "../../../helpers/dialogs/index.mjs";
import { defense, flowDeathDie, flowRegenerateStabilized } from "../../../helpers/flow.mjs";
import { rollWeaponAttack, rollStat, rollMastery } from "../../../helpers/stat-rolls.mjs";
import { GaiaItemBrowser } from "../../item-browser.mjs";
import { GaiaDeathSaveDialog } from "../../death-save-dialog.mjs";

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
      toggleTableEdit: GaiaBaseActorSheet._onToggleTableEdit,
      levelUp: GaiaBaseActorSheet._onLevelUp,
      addResistance: GaiaBaseActorSheet._onAddResistance,
      removeResistance: GaiaBaseActorSheet._onRemoveResistance,
      addImmunity: GaiaBaseActorSheet._onAddImmunity,
      removeImmunity: GaiaBaseActorSheet._onRemoveImmunity,
      addVulnerability: GaiaBaseActorSheet._onAddVulnerability,
      removeVulnerability: GaiaBaseActorSheet._onRemoveVulnerability,
      addReduction: GaiaBaseActorSheet._onAddReduction,
      removeReduction: GaiaBaseActorSheet._onRemoveReduction,
      editDefense: GaiaBaseActorSheet._onEditDefense,
      setExhaustion: GaiaBaseActorSheet._onSetExhaustion,
      openDeathSave: GaiaBaseActorSheet._onOpenDeathSaveDialog,
      openDeathSaveDialog: GaiaBaseActorSheet._onOpenDeathSaveDialog,
      rollDeathDie: GaiaBaseActorSheet._onRollDeathDie,
      regenerateStabilized: GaiaBaseActorSheet._onRegenerateStabilized,
      setDeathSentence: GaiaBaseActorSheet._onSetDeathSentence,
      setDeathGift: GaiaBaseActorSheet._onSetDeathGift,
      setParameterPip: GaiaBaseActorSheet._onSetParameterPip,
      setKnowledgePip: GaiaBaseActorSheet._onSetKnowledgePip,
      addMastery: GaiaBaseActorSheet._onAddMastery,
      removeMastery: GaiaBaseActorSheet._onRemoveMastery,
      rollMastery: GaiaBaseActorSheet._onRollMastery,
      rollDefense: GaiaBaseActorSheet._onRollDefense,
      rollParameter: GaiaBaseActorSheet._onRollParameter,
      rollKnowledge: GaiaBaseActorSheet._onRollKnowledge,
      rollInitiative: GaiaBaseActorSheet._onRollInitiative,
      editField: GaiaBaseActorSheet._onPromptEditField,
      createItem: GaiaBaseActorSheet._onCreateItem,
      createAbility: GaiaBaseActorSheet._onCreateAbility,
      openItem: GaiaBaseActorSheet._onOpenItem,
      openLegacyItem: GaiaBaseActorSheet._onOpenLegacyItem,
      viewItemProperties: GaiaBaseActorSheet._onViewItemProperties,
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
      rollAction: GaiaBaseActorSheet._onRollItemAction,
      rollActionText: GaiaBaseActorSheet._onRollActionText,
      rollItemAction: GaiaBaseActorSheet._onRollItemAction,
      rollSubEffect: GaiaBaseActorSheet._onRollSubEffect,
      rollLegacyAbility: GaiaBaseActorSheet._onRollLegacyAbility,
      applyLegacyEffect: GaiaBaseActorSheet._onApplyLegacyEffect,
      createEffect: GaiaBaseActorSheet._onCreateEffect,
      editEffect: GaiaBaseActorSheet._onEditEffect,
      deleteEffect: GaiaBaseActorSheet._onDeleteEffect,
      toggleEffect: GaiaBaseActorSheet._onToggleEffect,
      toggleBound: GaiaBaseActorSheet._onToggleBound,
      rollRelicOverload: GaiaBaseActorSheet._onRollRelicOverload,
      addLanguage: GaiaBaseActorSheet._onAddLanguage,
      removeLanguage: GaiaBaseActorSheet._onRemoveLanguage,
      toggleAbilityCollapse: GaiaBaseActorSheet._onToggleAbilityCollapse,
      toggleAllAbilitiesCollapse: GaiaBaseActorSheet._onToggleAllAbilitiesCollapse
    }
  };

  /** @type {AbortController|null} */
  /**
   * Configura as opções de renderização para a aplicação.
   * Determina de forma reativa e seletiva quais partes (PARTS) precisam ser renderizadas,
   * evitando reflow e processamento desnecessários nas demais partes da ficha.
   * @override
   * @param {object} options - Opções de renderização
   */
  _configureRenderOptions(options) {
    super._configureRenderOptions(options);

    // Na primeira renderização ou se a ficha ainda não foi inserida no DOM, renderiza todas as partes
    if (options.isFirstRender || !this.rendered) return;

    // Se as partes já foram explicitamente definidas na chamada this.render({ parts: [...] }), respeita a escolha
    if (Array.isArray(options.parts) && options.parts.length) return;

    // Se a renderização foi disparada por um evento do Foundry (updateActor, createItem, etc.)
    if (options.renderContext) {
      const parts = this._getPartsForRenderContext(options.renderContext, options.renderData, options);
      if (Array.isArray(parts) && parts.length) {
        options.parts = parts;
      }
    }
  }

  /**
   * Identifica quais partes do template devem ser re-renderizadas com base no contexto do update.
   * @protected
   * @param {string} renderContext - Tipo de operação (ex: "updateActor", "createItem", "deleteItem", "updateActiveEffect")
   * @param {object} renderData - Dados associados à atualização (diff de alterações, IDs, documentos)
   * @param {object} options - Opções gerais de renderização
   * @returns {string[] | null} Lista de partes a renderizar ou null para renderizar tudo.
   */
  _getPartsForRenderContext(renderContext, renderData, options) {
    const available = new Set(Object.keys(this.constructor.PARTS ?? {}));
    if (available.size <= 1) return null;

    const parts = new Set();
    const headerPart = available.has("sidebar") ? "sidebar" : (available.has("header") ? "header" : null);
    const bioPart = available.has("tabBiografia") ? "tabBiografia" : (available.has("tabBio") ? "tabBio" : null);

    if (renderContext === "updateActor") {
      const changed = renderData ?? {};

      // 1. Mudanças que afetam exclusivamente o cabeçalho / banner
      const hasHeaderOnlyChange =
        foundry.utils.hasProperty(changed, "system.health") ||
        foundry.utils.hasProperty(changed, "system.energy") ||
        foundry.utils.hasProperty(changed, "system.nivel") ||
        foundry.utils.hasProperty(changed, "system.powerPoints") ||
        foundry.utils.hasProperty(changed, "system.exhaustion") ||
        foundry.utils.hasProperty(changed, "system.death") ||
        foundry.utils.hasProperty(changed, "name") ||
        foundry.utils.hasProperty(changed, "img") ||
        foundry.utils.hasProperty(changed, "prototypeToken");

      // 2. Mudanças em atributos/parâmetros que afetam cabeçalho E aba de personagem
      const hasPersonagemChange =
        foundry.utils.hasProperty(changed, "system.stats") ||
        foundry.utils.hasProperty(changed, "system.parameters") ||
        foundry.utils.hasProperty(changed, "system.parametersBonus") ||
        foundry.utils.hasProperty(changed, "system.knowledge") ||
        foundry.utils.hasProperty(changed, "system.masteries") ||
        foundry.utils.hasProperty(changed, "system.defenses") ||
        foundry.utils.hasProperty(changed, "system.movement") ||
        foundry.utils.hasProperty(changed, "system.shield") ||
        foundry.utils.hasProperty(changed, "system.resistances") ||
        foundry.utils.hasProperty(changed, "system.reductions") ||
        foundry.utils.hasProperty(changed, "system.immunities") ||
        foundry.utils.hasProperty(changed, "system.vulnerabilities") ||
        foundry.utils.hasProperty(changed, "system.creatureTypes") ||
        foundry.utils.hasProperty(changed, "system.legacy") ||
        foundry.utils.hasProperty(changed, "system.homunculusType") ||
        foundry.utils.hasProperty(changed, "system.difficulty");

      // 3. Mudanças na biografia ou notas
      const hasBioChange =
        foundry.utils.hasProperty(changed, "system.biography") ||
        foundry.utils.hasProperty(changed, "system.description") ||
        foundry.utils.hasProperty(changed, "system.notes") ||
        foundry.utils.hasProperty(changed, "system.lore");

      // 4. Mudanças em moedas
      const hasCurrencyChange = foundry.utils.hasProperty(changed, "system.currency");

      // Validação de segurança: se houver alguma chave desconhecida de primeiro nível, renderiza tudo
      const flatChanges = foundry.utils.flattenObject(changed);
      const allKnownKeys = Object.keys(flatChanges).every(k => {
        return (
          k.startsWith("system.health") ||
          k.startsWith("system.energy") ||
          k.startsWith("system.nivel") ||
          k.startsWith("system.powerPoints") ||
          k.startsWith("system.exhaustion") ||
          k.startsWith("system.death") ||
          k.startsWith("name") ||
          k.startsWith("img") ||
          k.startsWith("prototypeToken") ||
          k.startsWith("system.stats") ||
          k.startsWith("system.parameters") ||
          k.startsWith("system.parametersBonus") ||
          k.startsWith("system.knowledge") ||
          k.startsWith("system.masteries") ||
          k.startsWith("system.defenses") ||
          k.startsWith("system.movement") ||
          k.startsWith("system.shield") ||
          k.startsWith("system.resistances") ||
          k.startsWith("system.reductions") ||
          k.startsWith("system.immunities") ||
          k.startsWith("system.vulnerabilities") ||
          k.startsWith("system.creatureTypes") ||
          k.startsWith("system.legacy") ||
          k.startsWith("system.homunculusType") ||
          k.startsWith("system.difficulty") ||
          k.startsWith("system.biography") ||
          k.startsWith("system.description") ||
          k.startsWith("system.notes") ||
          k.startsWith("system.lore") ||
          k.startsWith("system.currency")
        );
      });

      if (!allKnownKeys) {
        return null;
      }

      if (hasHeaderOnlyChange && headerPart) parts.add(headerPart);
      if (hasPersonagemChange) {
        if (headerPart) parts.add(headerPart);
        if (available.has("tabPersonagem")) parts.add("tabPersonagem");
      }
      if (hasBioChange && bioPart) parts.add(bioPart);
      if (hasCurrencyChange) {
        if (available.has("tabInventory")) parts.add("tabInventory");
        if (available.has("tabPersonagem")) parts.add("tabPersonagem");
      }

      return parts.size > 0 ? Array.from(parts) : null;
    }

    if (renderContext === "createItem" || renderContext === "updateItem" || renderContext === "deleteItem") {
      const items = Array.isArray(renderData) ? renderData : [renderData];
      let hasInventoryItem = false;
      let hasAbilityItem = false;

      for (const itemData of items) {
        const itemType = itemData?.type || this.actor.items.get(itemData?._id || itemData?.id || itemData)?.type;
        if (!itemType) {
          hasInventoryItem = true;
          hasAbilityItem = true;
          break;
        }

        if (["weapon", "armor", "equipment", "relic"].includes(itemType)) {
          hasInventoryItem = true;
        } else if (["ability", "feature", "path", "legacy"].includes(itemType)) {
          hasAbilityItem = true;
        } else {
          hasInventoryItem = true;
          hasAbilityItem = true;
        }
      }

      if (hasInventoryItem) {
        if (available.has("tabInventory")) parts.add("tabInventory");
        if (available.has("tabPersonagem")) parts.add("tabPersonagem");
        if (headerPart) parts.add(headerPart);
      }
      if (hasAbilityItem) {
        if (available.has("tabAbilities")) parts.add("tabAbilities");
        if (headerPart) parts.add(headerPart);
        if (available.has("tabPersonagem")) parts.add("tabPersonagem");
      }

      return parts.size > 0 ? Array.from(parts) : null;
    }

    if (renderContext === "createActiveEffect" || renderContext === "updateActiveEffect" || renderContext === "deleteActiveEffect") {
      if (available.has("tabEffects")) parts.add("tabEffects");
      if (headerPart) parts.add(headerPart);
      if (available.has("tabPersonagem")) parts.add("tabPersonagem");
      return parts.size > 0 ? Array.from(parts) : null;
    }

    return null;
  }

  /**
   * Executado quando a ficha é renderizada. Sincroniza abas e adiciona ouvintes de evento de menu de contexto.
   * @override
   * @param {object} context - Objeto de contexto de renderização
   * @param {object} options - Opções de renderização da aplicação
   */
  _onRender(context, options) {
    super._onRender(context, options);

    this._syncTabs();
    toggleInventoryGridTableMode(this.element, false);

    this._contextMenuController?.abort();
    this._contextMenuController = new AbortController();
    const signal = this._contextMenuController.signal;

    this.element.addEventListener("contextmenu", (event) => {
      const actionElement = event.target.closest("[data-context-action]");
      if (!actionElement) return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      this._onContextMenu(event, actionElement);
    }, { signal });

    // Ouvinte reativo: troca o item de legado embutido quando o select de legado muda
    const legacySelect = this.element.querySelector('select[name="system.legacy"]');
    if (legacySelect) {
      legacySelect.addEventListener("change", (event) => {
        this._onChangeLegacySelect(event);
      }, { signal });
    }
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
   * Troca o item de legado embutido no ator quando o usuário seleciona um novo legado no select.
   * Busca o documento de legado em ordem: itens embutidos > game.items > compêndios.
   * Atualiza `system.legacyAbilities` e cria o novo item de legado embutido.
   * @protected
   * @param {Event} event - Evento de mudança do select de legado
   * @returns {Promise<void>}
   */
  async _onChangeLegacySelect(event) {
    const newLegacyName = String(event.target?.value || "").trim();
    if (!newLegacyName) return;

    // Evita troca desnecessária se o legado já for o mesmo (case-insensitive)
    const currentLegacy = String(this.actor.system?.legacy || "").trim();
    if (currentLegacy.toLowerCase() === newLegacyName.toLowerCase()) return;

    // 1. Busca em itens já embutidos no ator
    let legacyDoc = this.actor.items.find(
      i => i.type === "legacy" && i.name.toLowerCase() === newLegacyName.toLowerCase()
    );

    // 2. Busca nos itens globais do mundo
    if (!legacyDoc) {
      legacyDoc = game.items?.find(
        i => i.type === "legacy" && i.name.toLowerCase() === newLegacyName.toLowerCase()
      ) ?? null;
    }

    // 3. Busca nos compêndios
    if (!legacyDoc) {
      for (const pack of (game.packs?.filter(p => p.documentName === "Item") ?? [])) {
        const entry = pack.index?.find(
          e => e.type === "legacy" && e.name?.toLowerCase() === newLegacyName.toLowerCase()
        );
        if (entry) {
          try {
            legacyDoc = await pack.getDocument(entry._id);
          } catch (err) {
            console.warn(`Gaia | Falha ao carregar legado "${newLegacyName}" do compêndio.`, err);
          }
          break;
        }
      }
    }

    if (!legacyDoc) {
      // Legado não encontrado; o submitOnChange já salva o nome, sem mais nada a fazer
      return;
    }

    // Remove itens de legado existentes
    const existingLegacies = this.actor.items.filter(i => i.type === "legacy");
    if (existingLegacies.length > 0) {
      await this.actor.deleteEmbeddedDocuments("Item", existingLegacies.map(i => i.id));
    }

    // Monta objeto de atualização do ator
    /** @type {Record<string, any>} */
    const updateData = { "system.legacy": legacyDoc.name };
    if (Array.isArray(legacyDoc.system?.legacyAbilities)) {
      updateData["system.legacyAbilities"] = legacyDoc.system.legacyAbilities;
    }
    if (legacyDoc.system?.appearance) updateData["system.appearance"] = legacyDoc.system.appearance;
    if (legacyDoc.system?.origin)     updateData["system.origin"]     = legacyDoc.system.origin;
    if (legacyDoc.system?.traditions) updateData["system.traditions"] = legacyDoc.system.traditions;
    if (legacyDoc.system?.inWorld)    updateData["system.inWorld"]    = legacyDoc.system.inWorld;

    // Cria o novo item embutido e atualiza o ator em paralelo
    await Promise.all([
      this.actor.createEmbeddedDocuments("Item", [legacyDoc.toObject()]),
      this.actor.update(updateData)
    ]);
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
    let item = null;

    // 1. Se o dado já for uma instância de Documento Item
    if (data && typeof data.toObject === "function" && data.documentName === "Item") {
      item = data;
    } else if (data) {
      // 2. Se possuir UUID, tenta resolver pelo compêndio ou mundo
      if (data.uuid) {
        try {
          item = await fromUuid(data.uuid);
        } catch (err) {
          item = null;
        }
      }

      // 3. Se não resolveu via UUID (ou UUID era inválido), mas possui dados embutidos (data.data)
      if (!item && data.data) {
        try {
          item = new CONFIG.Item.documentClass(data.data);
        } catch (err) {
          item = null;
        }
      }

      // 4. Fallback padrão do Foundry
      if (!item) {
        try {
          item = await Item.fromDropData(data);
        } catch (err) {
          item = null;
        }
      }
    }

    if (!item) return false;

    // Impede duplicar se o mesmo item embutido já pertence ao ator
    if (item.isEmbedded && item.actor?.id === this.actor.id && this.actor.items.has(item.id)) return false;

    const itemData = item.toObject();
    // Remove _id pré-existente para garantir que o Foundry gere um ID embutido de 16 caracteres válido
    delete itemData._id;

    // Se for um item de Legado, vincula o nome no sistema e substitui legado anterior
    if (item.type === "legacy") {
      const existingLegacies = this.actor.items.filter(i => i.type === "legacy");
      if (existingLegacies.length > 0) {
        await this.actor.deleteEmbeddedDocuments("Item", existingLegacies.map(i => i.id));
      }
      await this.actor.update({ "system.legacy": item.name });
    }

    // Se for habilidade, avisa se o personagem já possui uma habilidade com o mesmo nome
    if (item.type === "ability") {
      const exists = this.actor.items.some(i => i.type === "ability" && i.name.toLowerCase().trim() === itemData.name.toLowerCase().trim());
      if (exists) {
        ui.notifications?.warn(`O personagem já possui a habilidade "${itemData.name}".`);
        return false;
      }
    }

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
    context.config = /** @type {any} */ (CONFIG).GAIA;
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
    toggleInventoryGridTableMode(this.element, false);
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
    const itemUuid = target.dataset.itemUuid || target.closest("[data-item-uuid]")?.dataset.itemUuid;
    let item = null;
    if (itemUuid) {
      item = await fromUuid(itemUuid);
    }
    if (!item && itemId) {
      item = this.actor.items.get(itemId) || game.items?.get(itemId);
    }
    if (item) item.sheet.render(true);
  }

  /**
   * Abre uma janela de diálogo com os detalhes e descrições das propriedades do item.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento contendo o `data-item-id`
   */
  static async _onViewItemProperties(event, target) {
    event.preventDefault();
    event.stopPropagation();
    const itemId = target.dataset.itemId || target.closest("[data-item-id]")?.dataset.itemId;
    if (!itemId) return;
    const item = this.actor.items.get(itemId);
    if (!item) return;

    const rawProps = item.system?.properties;
    let propList = [];

    if (Array.isArray(rawProps)) {
      propList = rawProps.map(p => {
        if (typeof p === "string") {
          return { name: p.trim(), description: "" };
        }
        return {
          name: (p.name || p.label || p.title || "").trim(),
          description: (p.description || "").trim()
        };
      }).filter(p => p.name);
    } else if (typeof rawProps === "string" && rawProps.trim()) {
      propList = [{ name: item.name, description: rawProps.trim() }];
    }

    if (!propList.length) {
      propList = [{ name: "Sem Propriedades", description: "Este armamento não possui propriedades cadastradas." }];
    }

    const { DialogV2 } = foundry.applications.api;

    const propsContent = `
      <div class="gaia-item-props-dialog">
        ${propList.map(p => `
          <div class="prop-card">
            <strong class="prop-card-title">${p.name}</strong>
            <div class="prop-card-desc ${p.description ? '' : 'empty'}">
              ${p.description || "Nenhuma descrição detalhada informada."}
            </div>
          </div>
        `).join("")}
      </div>
    `;

    return await DialogV2.prompt({
      window: {
        title: `Propriedades: ${item.name}`
      },
      content: propsContent,
      classes: ["gaia-preludio", "gaia-dialog", "gaia-dialog-item-props"],
      position: { width: 420, height: "auto" },
      ok: {
        label: "Fechar",
        icon: "fa-solid fa-check"
      }
    });
  }

  /**
   * Abre a ficha do Legado vinculado ao Ator.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento disparador
   */
  static async _onOpenLegacyItem(event, target) {
    event.preventDefault();
    const itemId = target?.dataset?.itemId;
    const itemUuid = target?.dataset?.itemUuid;
    let item = null;
    if (itemUuid) {
      item = await fromUuid(itemUuid);
    }
    if (!item && itemId) {
      item = this.actor.items.get(itemId) || game.items?.get(itemId);
    }
    if (!item) {
      const legacyName = this.actor.system?.legacy || "";
      item = (this.actor.items ?? []).find(i => i.type === "legacy" && (!legacyName || i.name.toLowerCase() === legacyName.toLowerCase()))
        || (game.items ?? []).find(i => i.type === "legacy" && i.name.toLowerCase() === legacyName.toLowerCase())
        || this.actor.items.find(i => i.type === "legacy");
    }
    if (item) {
      item.sheet.render(true);
    } else {
      ui.notifications?.info("Nenhuma ficha de Legado vinculada a este personagem.");
    }
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
   * Alterna o estado de vínculo (isBound) de uma Relíquia do Ator.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento contendo data-item-id
   */
  static async _onToggleBound(event, target) {
    event.preventDefault();
    const itemId = target.dataset.itemId || target.closest("[data-item-id]")?.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (item) {
      const isBound = Boolean(item.system?.isBound);
      await item.update({ "system.isBound": !isBound });
    }
  }

  /**
   * Executa a rolagem de Sobrecarga de Véu (1d20 PV e 1d6 PE) e aplica a perda nos recursos do Ator.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento disparador
   */
  static async _onRollRelicOverload(event, target) {
    event.preventDefault();

    const hpRoll = new Roll("1d20");
    await hpRoll.evaluate();

    const peRoll = new Roll("1d6");
    await peRoll.evaluate();

    const currentHp = Number(this.actor.system?.health?.value ?? 0);
    const currentPe = Number(this.actor.system?.energy?.value ?? 0);

    const newHp = Math.max(0, currentHp - hpRoll.total);
    const newPe = Math.max(0, currentPe - peRoll.total);

    await this.actor.update({
      "system.health.value": newHp,
      "system.energy.value": newPe
    });

    const cardContent = `
      <div class="gaia-preludio chat-card relic-overload-card" style="border: 2px solid var(--gaia-border-frame); border-radius: var(--gaia-radius); padding: 10px; background: rgba(74, 46, 107, 0.08);">
        <header style="text-align: center; margin-bottom: 6px;">
          <h3 style="margin: 0; font-family: var(--gaia-font-medieval); color: var(--gaia-purple-dark); font-size: 1.15em;">
            <i class="fa-solid fa-triangle-exclamation"></i> ${game.i18n.localize("GAIA.Relic.OverloadTitle")}
          </h3>
          <p style="margin: 2px 0 0 0; font-size: 11px; font-weight: bold; color: var(--gaia-text-parchment);">
            <strong>${this.actor.name}</strong> sofreu dano por Sobrecarga de Potência de Véu!
          </p>
        </header>
        <div style="font-size: 11px; margin-bottom: 8px; color: var(--gaia-text-muted); text-align: center;">
          ${game.i18n.localize("GAIA.Relic.OverloadCardDesc")}
        </div>
        <div style="display: flex; gap: 8px; justify-content: space-around; background: rgba(0,0,0,0.06); padding: 8px; border-radius: var(--gaia-radius);">
          <div style="text-align: center;">
            <div style="font-size: 11px; color: var(--gaia-health); font-weight: bold;">Perda de PV (1d20)</div>
            <div style="font-size: 16px; font-weight: bold; color: var(--gaia-health);"><i class="fa-solid fa-heart-crack"></i> -${hpRoll.total} PV</div>
            <div style="font-size: 10px; color: var(--gaia-text-dim);">Atual: ${newHp}</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 11px; color: var(--gaia-purple-dark); font-weight: bold;">Perda de PE (1d6)</div>
            <div style="font-size: 16px; font-weight: bold; color: var(--gaia-purple-dark);">-${peRoll.total} PE</div>
            <div style="font-size: 10px; color: var(--gaia-text-dim);">Atual: ${newPe}</div>
          </div>
        </div>
      </div>
    `;

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      content: cardContent
    });
  }

  /**
   * Abre modal para adicionar um novo idioma ao personagem.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento disparador
   */
  static async _onAddLanguage(event, target) {
    event.preventDefault();
    const config = CONFIG.GAIA;
    const currentLangs = (this.actor.system?.languages ?? []).map(l => String(l).toLowerCase());

    const allLangs = [];
    if (!currentLangs.includes("comum")) {
      allLangs.push({ key: "comum", label: game.i18n.localize("GAIA.Language.Comum") || "Comum", category: "Geral" });
    }

    for (const [key, obj] of Object.entries(config?.allLanguages ?? {})) {
      if (!currentLangs.includes(key.toLowerCase())) {
        allLangs.push({
          key,
          label: game.i18n.localize(obj.label || key),
          category: game.i18n.localize(obj.categoryLabel || "")
        });
      }
    }

    if (allLangs.length === 0) {
      ui.notifications?.info("O personagem já possui todos os idiomas disponíveis.");
      return;
    }

    const optionsHtml = allLangs.map(l => `<option value="${l.key}">${l.label} (${l.category})</option>`).join("");
    const content = `
      <div class="gaia-dialog-add-language" style="padding: 10px 4px;">
        <label>${game.i18n.localize("GAIA.Language.SelectLanguagePrompt") || "Selecione o idioma a ser adicionado:"}</label>
        <select class="select-new-language" style="width: 100%; padding: 6px; border: 1px solid var(--gaia-border-frame); border-radius: var(--gaia-radius);">
          ${optionsHtml}
        </select>
      </div>
    `;

    const result = await foundry.applications.api.DialogV2.prompt({
      classes: ["gaia-preludio", "gaia-dialog"],
      window: { title: game.i18n.localize("GAIA.Language.DialogTitle") || "Adicionar Idioma" },
      position: { width: 420, height: "auto" },
      content,
      ok: {
        label: game.i18n.localize("GAIA.Language.AddLanguage") || "Adicionar",
        icon: "fa-solid fa-plus",
        callback: (ev, btn, dialog) => {
          return dialog.element.querySelector(".select-new-language")?.value;
        }
      },
      rejectClose: false
    });

    if (result) {
      const updatedList = Array.from(new Set([...(this.actor.system?.languages ?? []), result]));
      await this.actor.update({ "system.languages": updatedList });
      ui.notifications?.info(`Idioma adicionado com sucesso!`);
    }
  }

  /**
   * Remove um idioma do personagem.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento contendo data-language
   */
  static async _onRemoveLanguage(event, target) {
    event.preventDefault();
    const langKey = target.dataset.language || target.dataset.key;
    if (!langKey) return;
    const currentList = this.actor.system?.languages ?? [];
    const updatedList = currentList.filter(l => String(l).toLowerCase() !== String(langKey).toLowerCase());
    await this.actor.update({ "system.languages": updatedList });
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
   * Executa uma Ação estruturada de um Item diretamente a partir da ficha do Ator.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento disparador
   */
  static async _onRollItemAction(event, target) {
    event.preventDefault();
    const itemId = target.dataset.itemId || target.closest("[data-item-id]")?.dataset.itemId;
    const actionId = target.dataset.actionId;
    const actionIndex = target.dataset.actionIndex ?? target.dataset.index;
    const subIndex = target.dataset.subeffectIndex ?? target.closest("[data-subeffect-index]")?.dataset.subeffectIndex;
    const item = this.actor.items.get(itemId);
    if (!item) return null;

    let action = null;
    let sub = null;
    if (subIndex !== undefined) {
      sub = item.system?.subEffects?.[Number(subIndex)];
    }

    if (sub) {
      if (actionId) action = sub.actions?.find(a => a.id === actionId);
      if (!action && actionIndex !== undefined) action = sub.actions?.[Number(actionIndex)];
    }

    if (!action && actionId) {
      action = item.system?.actions?.find(a => a.id === actionId);
      if (!action && Array.isArray(item.system?.subEffects)) {
        for (const s of item.system.subEffects) {
          action = s.actions?.find(a => a.id === actionId);
          if (action) break;
        }
      }
    }
    if (!action && actionIndex !== undefined && !sub) {
      action = item.system?.actions?.[Number(actionIndex)];
    }
    if (!action && item.system?.action) {
      action = item.system.action;
    }
    if (action) {
      return await item.rollAction(action, { event, target });
    }
    return null;
  }

  /**
   * Envia apenas o texto descritivo de uma Ação estruturada de um Item diretamente ao chat.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento disparador
   */
  static async _onRollActionText(event, target) {
    event.preventDefault();
    const itemId = target.dataset.itemId || target.closest("[data-item-id]")?.dataset.itemId;
    const actionId = target.dataset.actionId;
    const actionIndex = target.dataset.actionIndex ?? target.dataset.index;
    const subIndex = target.dataset.subeffectIndex ?? target.closest("[data-subeffect-index]")?.dataset.subeffectIndex;
    const item = this.actor.items.get(itemId);
    if (!item) return null;

    let action = null;
    let sub = null;
    if (subIndex !== undefined) {
      sub = item.system?.subEffects?.[Number(subIndex)];
    }

    if (sub) {
      if (actionId) action = sub.actions?.find(a => a.id === actionId);
      if (!action && actionIndex !== undefined) action = sub.actions?.[Number(actionIndex)];
    }

    if (!action && actionId) {
      action = item.system?.actions?.find(a => a.id === actionId);
      if (!action && Array.isArray(item.system?.subEffects)) {
        for (const s of item.system.subEffects) {
          action = s.actions?.find(a => a.id === actionId);
          if (action) break;
        }
      }
    }
    if (!action && actionIndex !== undefined && !sub) {
      action = item.system?.actions?.[Number(actionIndex)];
    }
    if (!action && item.system?.action) {
      action = item.system.action;
    }
    if (action) {
      if (typeof item.rollActionText === "function") {
        return await item.rollActionText(action);
      }
      return await item.rollAction(action, { event, target });
    }
    return null;
  }

  /**
   * Envia uma Sub-Habilidade (subEffect) ao chat.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento com data-index ou data-subeffect-index
   */
  static async _onRollSubEffect(event, target) {
    event.preventDefault();
    const itemId = target.dataset.itemId || target.closest("[data-item-id]")?.dataset.itemId;
    const subIndex = target.dataset.index ?? target.dataset.subeffectIndex ?? target.closest("[data-subeffect-index]")?.dataset.subeffectIndex;
    const item = this.actor.items.get(itemId);
    if (!item || subIndex === undefined) return null;
    return await item.rollSubEffect(Number(subIndex));
  }

  /**
   * Executa ou envia ao chat uma Habilidade de Legado da ficha.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento com `data-index`
   */
  static async _onRollLegacyAbility(event, target) {
    event.preventDefault();
    const index = Number(target.dataset.index);
    const legacyItem = this.actor.items.find(i => i.type === "legacy");
    const ability = legacyItem?.system?.legacyAbilities?.[index];
    if (!ability) return null;

    if (ability.action && (ability.action.attack?.hasAttack || ability.action.damage?.hasDamage || ability.action.check?.hasCheck)) {
      return await legacyItem.rollAction(ability.action, { event, target });
    }

    const speaker = ChatMessage.getSpeaker({ actor: this.actor });
    const content = `
      <div class="gaia-ability-chat-card">
        <div class="ability-title-row" style="border-bottom: 1px solid var(--gaia-purple-dark); padding-bottom: 4px; margin-bottom: 4px;">
          <h3 style="margin: 0; font-family: var(--gaia-font-medieval); font-size: 1.1em; color: var(--gaia-purple-dark);">${ability.name}</h3>
        </div>
        ${ability.description ? `<p style="font-size: 12px; line-height: 1.4; margin: 4px 0;">${ability.description}</p>` : ""}
        ${ability.activeEffectText ? `<div style="font-size: 11px; font-style: italic; color: var(--gaia-purple-dark);"><strong>Efeito:</strong> ${ability.activeEffectText}</div>` : ""}
      </div>
    `;
    return await ChatMessage.create({ speaker, content });
  }

  /**
   * Cria um novo Efeito Ativo no Ator.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento disparador
   */
  static async _onCreateEffect(event, target) {
    event.preventDefault();

    // Se disparado a partir de uma habilidade (ex: Legado com data-action="createEffect")
    const index = Number(target.dataset.index ?? target.dataset.abilityIndex);
    if (!isNaN(index)) {
      return await GaiaBaseActorSheet._onApplyLegacyEffect.call(this, event, target);
    }

    const defaultName = target.dataset.effectName || game.i18n.localize("GAIA.Effects.NewEffectDefaultName") || "Novo Efeito";
    const changes = [];
    const normName = defaultName.toLowerCase();
    if (normName.includes("proteção da natureza") || normName.includes("protecao da natureza")) {
      changes.push(
        { key: "system.damageResistance", mode: 2, value: "nature" },
        { key: "system.conditionImmunity", mode: 2, value: "envenenado" }
      );
    } else if (normName.includes("abraço da treva") || normName.includes("abraco da treva")) {
      changes.push(
        { key: "system.damageResistance", mode: 2, value: "dark" },
        { key: "system.conditionImmunity", mode: 2, value: "enfraquecido" }
      );
    } else if (normName.includes("corpo de ferro")) {
      changes.push(
        { key: "system.conditionImmunity", mode: 2, value: "envenenado" },
        { key: "system.conditionImmunity", mode: 2, value: "sangramento" }
      );
    } else if (normName.includes("filho de nolgadan")) {
      changes.push(
        { key: "system.conditionImmunity", mode: 2, value: "lentidao" },
        { key: "system.conditionImmunity", mode: 2, value: "terreno dificil" }
      );
    } else if (normName.includes("fortitude ampliada")) {
      changes.push(
        { key: "system.hpDie", mode: 2, value: "1d8" },
        { key: "system.hpFixed", mode: 2, value: "4" }
      );
    }

    const created = await this.actor.createEmbeddedDocuments("ActiveEffect", [{
      name: defaultName,
      img: target.dataset.effectImg || "icons/svg/aura.svg",
      icon: target.dataset.effectImg || "icons/svg/aura.svg",
      origin: this.actor.uuid,
      changes
    }]);
    return created[0]?.sheet?.render(true);
  }

  /**
   * Abre a janela de edição de um Efeito Ativo do Ator.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento contendo data-effect-id
   */
  static async _onEditEffect(event, target) {
    event.preventDefault();
    const effectId = target.dataset.effectId || target.closest("[data-effect-id]")?.dataset.effectId;
    const effect = this.actor.effects.get(effectId);
    return effect?.sheet?.render(true);
  }

  /**
   * Exclui um Efeito Ativo do Ator.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento contendo data-effect-id
   */
  static async _onDeleteEffect(event, target) {
    event.preventDefault();
    const effectId = target.dataset.effectId || target.closest("[data-effect-id]")?.dataset.effectId;
    const effect = this.actor.effects.get(effectId);
    return await effect?.delete();
  }

  /**
   * Alterna o estado (ativo / desativado) de um Efeito Ativo do Ator.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento contendo data-effect-id
   */
  static async _onToggleEffect(event, target) {
    event.preventDefault();
    const effectId = target.dataset.effectId || target.closest("[data-effect-id]")?.dataset.effectId;
    const effect = this.actor.effects.get(effectId);
    if (effect) {
      return await effect.update({ disabled: !effect.disabled });
    }
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
        <img class="chat-portrait-img" src="${actor.img}" alt="${actor.name}" style="max-width: 100%; max-height: 320px; border-radius: var(--gaia-radius); border: 1px solid var(--gaia-border-frame, #574c43); object-fit: contain; background: rgba(0,0,0,0.1);" />
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
      <div class="gaia-ability-chat-card">
        <header class="gaia-card-header">
          <img src="icons/svg/book.svg" title="${ab.name}" width="32" height="32" />
          <h3 class="gaia-card-title">${ab.name}</h3>
        </header>
        <div class="gaia-card-content">
          ${ab.description ? `<p class="gaia-ability-description">${ab.description}</p>` : ""}
          ${activeEffectText ? `<p class="gaia-ability-effect"><strong>Efeito:</strong> ${activeEffectText}</p>` : ""}
          ${activeEffectText ? `
            <div class="gaia-ability-effect-btn-wrapper">
              <button type="button" class="btn-chat-apply-effect" data-action="createEffect" data-actor-id="${this.actor.id}" data-ability-index="${index}">
                <i class="fa-solid fa-sparkles"></i> Ativar Efeito (${ab.name})
              </button>
            </div>
          ` : ""}
        </div>
        <footer class="gaia-card-footer">
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
   * Ativa ou desativa o Efeito Ativo de uma Habilidade de Legado no Ator.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento disparador com data-index
   */
  static async _onApplyLegacyEffect(event, target) {
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

    const effectName = ab.name;
    const existing = this.actor.effects.find(e => e.name === effectName || e.flags?.gaia?.abilityName === effectName);

    if (existing) {
      await existing.delete();
      ui.notifications?.info(`Efeito "${effectName}" desativado de ${this.actor.name}.`);
      return;
    }

    const activeEffectData = ab.activeEffect || {};
    const effectText = typeof activeEffectData === "string" ? activeEffectData : (activeEffectData.text || ab.activeEffectText || "");
    
    // Mapeia mudanças configuradas
    const changes = [];
    const changeList = Array.isArray(activeEffectData.changes) ? activeEffectData.changes : [];
    for (const ch of changeList) {
      if (!ch.key) continue;
      if (ch.key === "all_parameters") {
        const val = String(ch.value ?? 1);
        const paramKeys = ["precision", "brutality", "dexterity", "agility", "channeling", "arcane", "spirit", "vigor"];
        for (const p of paramKeys) {
          changes.push({ key: `system.parameters.${p}`, mode: 2, value: val });
        }
      } else {
        const valStr = String(ch.value ?? "").trim();
        // Ignora placeholders numéricos ou vazios para resistência ou imunidade textual
        if ((ch.key === "system.damageResistance" || ch.key === "system.conditionImmunity") && (!valStr || valStr === "1" || !isNaN(Number(valStr)))) {
          continue;
        }
        changes.push({ key: ch.key, mode: ch.mode ?? 2, value: String(ch.value ?? 1) });
      }
    }

    // Suporte específico para regras de Habilidades de Legado
    const normEffectName = effectName.toLowerCase();
    if (normEffectName.includes("proteção da natureza") || normEffectName.includes("protecao da natureza")) {
      const clean = changes.filter(c => !(c.key === "system.damageResistance" && (c.value === "1" || !c.value)) && !(c.key === "system.conditionImmunity" && (c.value === "1" || !c.value)));
      changes.length = 0;
      changes.push(...clean);
      if (!changes.some(c => c.key === "system.damageResistance" && c.value === "nature")) {
        changes.push({ key: "system.damageResistance", mode: 2, value: "nature" });
      }
      if (!changes.some(c => c.key === "system.conditionImmunity" && c.value === "envenenado")) {
        changes.push({ key: "system.conditionImmunity", mode: 2, value: "envenenado" });
      }
    }
    if (normEffectName.includes("fortitude ampliada")) {
      if (!changes.some(c => c.key === "system.hpDie")) {
        changes.push({ key: "system.hpDie", mode: 2, value: "1d8" });
      }
      if (!changes.some(c => c.key === "system.hpFixed")) {
        changes.push({ key: "system.hpFixed", mode: 2, value: "4" });
      }
    }
    if (normEffectName.includes("abraço da treva") || normEffectName.includes("abraco da treva")) {
      const clean = changes.filter(c => !(c.key === "system.damageResistance" && (c.value === "1" || !c.value)) && !(c.key === "system.conditionImmunity" && (c.value === "1" || !c.value)));
      changes.length = 0;
      changes.push(...clean);
      if (!changes.some(c => c.key === "system.damageResistance" && c.value === "dark")) {
        changes.push({ key: "system.damageResistance", mode: 2, value: "dark" });
      }
      if (!changes.some(c => c.key === "system.conditionImmunity" && c.value === "enfraquecido")) {
        changes.push({ key: "system.conditionImmunity", mode: 2, value: "enfraquecido" });
      }
    }
    if (normEffectName.includes("corpo de ferro")) {
      const clean = changes.filter(c => !(c.key === "system.conditionImmunity" && (c.value === "1" || !c.value)));
      changes.length = 0;
      changes.push(...clean);
      if (!changes.some(c => c.key === "system.conditionImmunity" && c.value === "envenenado")) {
        changes.push({ key: "system.conditionImmunity", mode: 2, value: "envenenado" });
      }
      if (!changes.some(c => c.key === "system.conditionImmunity" && c.value === "sangramento")) {
        changes.push({ key: "system.conditionImmunity", mode: 2, value: "sangramento" });
      }
    }
    if (normEffectName.includes("filho de nolgadan")) {
      const clean = changes.filter(c => !(c.key === "system.conditionImmunity" && (c.value === "1" || !c.value)));
      changes.length = 0;
      changes.push(...clean);
      if (!changes.some(c => c.key === "system.conditionImmunity" && (c.value === "lentidao" || c.value === "lentidão"))) {
        changes.push({ key: "system.conditionImmunity", mode: 2, value: "lentidao" });
      }
      if (!changes.some(c => c.key === "system.conditionImmunity" && c.value === "terreno dificil")) {
        changes.push({ key: "system.conditionImmunity", mode: 2, value: "terreno dificil" });
      }
    }

    const created = await this.actor.createEmbeddedDocuments("ActiveEffect", [{
      name: effectName,
      img: legacyItem?.img || "icons/svg/aura.svg",
      icon: legacyItem?.img || "icons/svg/aura.svg",
      origin: legacyItem?.uuid || this.actor.uuid,
      description: effectText,
      changes,
      flags: {
        gaia: {
          abilityName: effectName,
          activeEffect: activeEffectData
        }
      }
    }]);

    ui.notifications?.info(`Efeito "${effectName}" ativado em ${this.actor.name}!`);
    return created[0];
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
   * Abre o diálogo para editar uma Defesa Inferior (Resistência, Imunidade, Vulnerabilidade, Redução).
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento disparador
   */
  static async _onEditDefense(event, target) {
    const index = Number(target.dataset.index);
    if (isNaN(index)) return;
    
    const type = target.dataset.defenseType; // "resistance", "immunity", "vulnerability", "reduction"
    let listName = "";
    let title = "";
    let isReduction = false;

    if (type === "resistance") {
      listName = "damageResistance";
      title = "Editar Resistência a Dano";
    } else if (type === "immunity") {
      listName = "damageImmunity";
      title = "Editar Imunidade a Dano";
    } else if (type === "vulnerability") {
      listName = "damageVulnerability";
      title = "Editar Vulnerabilidade a Dano";
    } else if (type === "reduction") {
      listName = "damageReduction";
      title = "Editar Redução de Dano Fixa";
      isReduction = true;
    } else {
      return;
    }

    const list = [...(this.actor.system[listName] ?? [])];
    const currentData = list[index];
    if (!currentData) return;

    const data = await promptDefenseTraitDialog(title, isReduction, currentData);
    if (!data) return;

    list[index] = data;
    await this.actor.update({ [`system.${listName}`]: list });
  }

  /**
   * Executa a rolagem de Defesa (Bloqueio ou Esquiva) do Ator.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento contendo `data-type` ("block" ou "agility")
   */
  static async _onRollDefense(event, target) {
    if (this.actor.type === "creature" || this.actor.type === "legacyNpc") {
      const roll = await defense("defensiveParameters", this.actor, "standard");
      return await roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: `Rolagem de Defesa`
      });
    }
    const defenseType = target.dataset.type || "block";
    if (defenseType === "agility" || defenseType === "block") {
      const roll = await defense(defenseType, this.actor, "standard");
      const label = defenseType === "agility" ? "Esquiva" : "Bloqueio";
      return await roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: `Rolagem de Defesa ${label}`
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
   * Manipula a marcação de diamantes de Exaustão no Ator (0 a 6).
   * Caso atinja 6 pontos de exaustão, o personagem morre e uma notificação/mensagem é emitida.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento contendo `data-value`
   */
  static async _onSetExhaustion(event, target) {
    const value = Number(target.dataset.value);
    const current = Number(this.actor.system.exhaustion) || 0;
    const next = current === value ? value - 1 : value;
    const clamped = Math.clamp(next, 0, 6);
    await this.actor.update({ "system.exhaustion": clamped });

    if (clamped === 6 && current !== 6) {
      ui.notifications.warn(`${this.actor.name} atingiu 6 pontos de Exaustão e morreu!`);
      const speaker = ChatMessage.getSpeaker({ actor: this.actor });
      const content = `
        <div class="gaia-preludio chat-card exhaustion-death-card" style="border-left: 4px solid var(--gaia-red-crimson, #b02e2e); padding: 8px; background: rgba(0,0,0,0.05); border-radius: var(--gaia-radius);">
          <h3 style="margin: 0 0 4px 0; color: var(--gaia-red-crimson, #b02e2e); font-family: var(--gaia-font-medieval, Georgia, serif); font-size: 1.1em;">
            <i class="fa-solid fa-skull"></i> MORTE POR EXAUSTÃO
          </h3>
          <p style="margin: 0; font-size: 13px; line-height: 1.4;">
            <strong>${this.actor.name}</strong> atingiu <strong>6 pontos de Exaustão</strong> e sucumbiu (MORTE).
          </p>
        </div>
      `;
      await ChatMessage.create({ speaker, content });
    }
  }

  /**
   * Abre a janela dedicada do Dado de Morte (GaiaDeathSaveDialog) para o Ator.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento disparador
   */
  static async _onOpenDeathSaveDialog(event, target) {
    event?.preventDefault?.();
    return await GaiaDeathSaveDialog.open(this.actor);
  }

  /**
   * Executa a rolagem do Dado de Morte (1d12) para um personagem incapacitado.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento disparador
   */
  static async _onRollDeathDie(event, target) {
    event?.preventDefault?.();
    return await flowDeathDie(this.actor);
  }

  /**
   * Executa a regeneração de 1d4 PV para um personagem estabilizado após 10 minutos.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento disparador
   */
  static async _onRegenerateStabilized(event, target) {
    event?.preventDefault?.();
    return await flowRegenerateStabilized(this.actor);
  }

  /**
   * Ajusta manualmente a quantidade de Sentenças do Corruptor do personagem (0 a 2).
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento com `data-value`
   */
  static async _onSetDeathSentence(event, target) {
    event?.preventDefault?.();
    const value = Number(target.dataset.value);
    const current = Number(this.actor.system?.death?.sentences ?? 0);
    const next = current === value ? value - 1 : value;
    const clamped = Math.clamp(next, 0, 2);
    await this.actor.update({ "system.death.sentences": clamped });

    if (clamped >= 2 && current < 2) {
      ui.notifications?.warn(`${this.actor.name} acumulou 2 Sentenças do Corruptor e morreu!`);
    }
  }

  /**
   * Ajusta manualmente a quantidade de Dádivas do Artesão do personagem (0 a 2).
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento com `data-value`
   */
  static async _onSetDeathGift(event, target) {
    event?.preventDefault?.();
    const value = Number(target.dataset.value);
    const current = Number(this.actor.system?.death?.gifts ?? 0);
    const next = current === value ? value - 1 : value;
    const clamped = Math.clamp(next, 0, 2);

    if (clamped >= 2) {
      await this.actor.update({
        "system.death.gifts": 0,
        "system.death.sentences": 0,
        "system.death.stabilized": true
      });
      ui.notifications?.info(`${this.actor.name} acumulou 2 Dádivas do Artesão e estabilizou!`);
    } else {
      await this.actor.update({ "system.death.gifts": clamped });
    }
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
    const updates = { "system.parameters": list };

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
      updates["system.parametersBonus"] = bonusList;
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
      updates["system.parametersBonus"] = bonusList;
    }

    await this.actor.update(updates);
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
    const updates = { "system.knowledge": list };

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
      updates["system.parametersBonus"] = bonusList;
    }

    await this.actor.update(updates);
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
    const key = target?.dataset?.key || target?.getAttribute?.("data-key");
    return await rollStat(this.actor, { event, target, type: "knowledge", key, categoryLabel: "Conhecimento" });
  }

  /**
   * Executa a rolagem associada a uma Maestria do Ator (com Aptidão / Vantagem).
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento contendo as informações da maestria
   */
  static async _onRollMastery(event, target) {
    const key = target?.dataset?.key || target?.getAttribute?.("data-key");
    const knowledgeKey = target?.dataset?.knowledge || target?.getAttribute?.("data-knowledge");
    return await rollMastery(this.actor, { event, target, key, customKey: key, knowledgeKey });
  }

  /**
   * Abre o diálogo de Evolução do Nível de Despertar.
   * @protected
   * @param {Event} event - Evento de clique
   * @param {HTMLElement} target - Elemento disparador
   */
  static async _onLevelUp(event, target) {
    event.preventDefault();
    await promptLevelUpDialog(this.actor);
  }

    static async _onToggleTableEdit(event, target) {
    event.preventDefault();
    const scope = target.closest("tr.item-row") || target.closest(".inventory-table-panel") || target.closest(".inventory-grid-table") || this.element;
    toggleInventoryGridTableMode(scope);
  }

  /**
   * Alterna o estado de sanfona (recolhido/expandido) de um card de habilidade.
   * @protected
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static _onToggleAbilityCollapse(event, target) {
    event.preventDefault();
    event.stopPropagation();

    // 1. Suporte para recolher / expandir sub-efeitos (.subeffect-display-block)
    const subBlock = target.closest(".subeffect-display-block");
    if (subBlock && (target.classList.contains("btn-toggle-ability-collapse") || target.closest(".btn-toggle-ability-collapse") || target.classList.contains("subeffect-display-header") || target.closest(".subeffect-display-header"))) {
      subBlock.classList.toggle("is-collapsed");
      return;
    }

    // 2. Suporte padrão para cards de habilidade/característica (.ability-card-item) e itens de criatura (.creature-item-card)
    const card = target.closest(".ability-card-item, .creature-item-card");
    if (!card) return;

    card.classList.toggle("is-collapsed");

    if (!this._collapsedAbilities) {
      this._collapsedAbilities = new Set();
    }

    const key = card.dataset.itemId || card.dataset.index || card.querySelector(".ability-name-display")?.textContent?.trim() || card.querySelector(".item-name")?.textContent?.trim();
    if (key) {
      if (card.classList.contains("is-collapsed")) {
        this._collapsedAbilities.add(key);
      } else {
        this._collapsedAbilities.delete(key);
      }
    }
  }

  /**
   * Alterna o estado de sanfona de todos os cards de habilidade na aba/seção.
   * @protected
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static _onToggleAllAbilitiesCollapse(event, target) {
    event.preventDefault();
    event.stopPropagation();
    const container = target.closest(".legacy-abilities-section")
      || target.closest(".tab-abilities-content")
      || target.closest(".tab.abilities")
      || target.closest(".creature-items-list")
      || this.element;

    const cards = container.querySelectorAll(".ability-card-item, .creature-item-card");
    if (!cards.length) return;

    if (!this._collapsedAbilities) {
      this._collapsedAbilities = new Set();
    }

    const collapsedCount = Array.from(cards).filter(c => c.classList.contains("is-collapsed")).length;
    const shouldCollapse = collapsedCount < (cards.length / 2);

    cards.forEach(card => {
      card.classList.toggle("is-collapsed", shouldCollapse);
      const key = card.dataset.itemId || card.dataset.index || card.querySelector(".ability-name-display")?.textContent?.trim();
      if (key) {
        if (shouldCollapse) {
          this._collapsedAbilities.add(key);
        } else {
          this._collapsedAbilities.delete(key);
        }
      }
    });
  }

}
