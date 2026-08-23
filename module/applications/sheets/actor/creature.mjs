const { ActorSheetV2 } = foundry.applications.sheets;
const { HandlebarsApplicationMixin } = foundry.applications.api;

import {
  promptDefenseTraitDialog,
  promptEditFieldDialog,
  promptRollRequestDialog,
  promptItemActionDialog
} from "../../../helpers/dialogs.mjs";
import { defense } from "../../../helpers/flow.mjs";
import { rollWeaponAttack, rollStat } from "../../../helpers/stat-rolls.mjs";
import { GaiaItemBrowser } from "../../item-browser.mjs";
import { GAIA } from "../../../helpers/config.mjs";

/**
 * ==============================================================================
 * CREATURE SHEET / FICHA DE CRIATURA (NPC/MONSTRO)
 * ==============================================================================
 * Ficha de ator para Criaturas baseada em ApplicationV2 do Foundry VTT.
 */
export class CreatureSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ["gaia-preludio", "sheet", "actor", "creature-sheet"],
    position: { width: 850, height: 750 },
    tag: "form",
    form: {
      submitOnChange: true,
      closeOnSubmit: false
    },
    tabGroups: {
      primary: "personagem"
    },
    actions: {
      addResistance: CreatureSheet.#onAddResistance,
      removeResistance: CreatureSheet.#onRemoveResistance,
      addImmunity: CreatureSheet.#onAddImmunity,
      removeImmunity: CreatureSheet.#onRemoveImmunity,
      addVulnerability: CreatureSheet.#onAddVulnerability,
      removeVulnerability: CreatureSheet.#onRemoveVulnerability,
      addReduction: CreatureSheet.#onAddReduction,
      removeReduction: CreatureSheet.#onRemoveReduction,
      rollDefense: CreatureSheet.#onRollDefense,
      rollParameter: CreatureSheet.#onRollParameter,
      editField: CreatureSheet.#onPromptEditField,
      createItem: CreatureSheet.#onCreateItem,
      createAbility: CreatureSheet.#onCreateItem,
      openItem: CreatureSheet.#onOpenItem,
      deleteItem: CreatureSheet.#onDeleteItem,
      toggleEquip: CreatureSheet.#onToggleEquip,
      rollItem: CreatureSheet.#onRollItem,
      rollWeaponAttack: CreatureSheet.#onRollWeaponAttack,
      rollWeapon: CreatureSheet.#onRollWeaponAttack,
      promptItemAction: CreatureSheet.#onPromptItemAction,
      openItemBrowser: CreatureSheet.#onOpenItemBrowser,
      editImage: CreatureSheet.#onEditImage,
      sendPortraitToChat: CreatureSheet.#onSendPortraitToChat,
      showPortraitToPlayers: CreatureSheet.#onShowPortraitToPlayers,
      tab: CreatureSheet.#onChangeTab,
      promptRollRequest: CreatureSheet.#onPromptRollRequest,
      promptRollRequestDialog: CreatureSheet.#onPromptRollRequest,
      openCreatureWizard: CreatureSheet.#onOpenCreatureWizard
    }
  };

  /** @override */
  static PARTS = {
    main: { 
      template: "systems/gaia-preludio/templates/actor/creature.hbs",
      scrollable: [".sheet-body"]
    }
  };

  /** @type {AbortController|null} */
  #contextMenuController = null;

  /** @override */
  _onRender(context, options) {
    super._onRender(context, options);

    this.#syncTabs();

    this.#contextMenuController?.abort();
    this.#contextMenuController = new AbortController();

    this.element.addEventListener("contextmenu", (event) => {
      const actionElement = event.target.closest("[data-context-action]");
      if (!actionElement) return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      const action = actionElement.dataset.contextAction;
      if (action === "editField") {
        CreatureSheet.#onPromptEditField.call(this, event, actionElement);
      } else if (action === "sendPortraitToChat") {
        CreatureSheet.#onSendPortraitToChat.call(this, event, actionElement);
      }
    }, { signal: this.#contextMenuController.signal });
  }

  /**
   * Processa o evento de soltar (drop) de um Item na ficha de Criatura.
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
    context.actor = this.actor;
    context.system = this.actor.system;

    // Prepara a lista de checkboxes dos tipos de criatura (creaturesType)
    const currentTypes = new Set(this.actor.system.creatureTypes ?? []);
    context.creatureTypesList = Object.entries(GAIA.creaturesType ?? {}).map(([key, labelKey]) => ({
      key,
      label: game.i18n.localize(labelKey),
      checked: currentTypes.has(key)
    }));

    // Categoriza os itens da criatura por seções
    const config = /** @type {any} */ (CONFIG).GAIA;
    context.weapons = this.actor.items.filter((i) => i.type === "weapon");
    context.abilities = this.actor.items.filter((i) => i.type === "ability").map(item => {
      const rawTypes = Array.isArray(item.system?.types) && item.system.types.length > 0 
        ? item.system.types 
        : (item.system?.type ? [item.system.type] : ["conjuracao"]);
      const localizedTypes = rawTypes.map(t => config?.abilitiesTypes?.[t] ? game.i18n.localize(config.abilitiesTypes[t]) : t);
      const firstType = localizedTypes[0] || "Conjuração";
      const additionalTypes = localizedTypes.slice(1).join(" / ");
      const rawAction = item.system?.typeAction || "acaoAtiva";
      const actionLabel = config?.actionType?.[rawAction] 
        ? game.i18n.localize(config.actionType[rawAction]) 
        : (rawAction || "Ação Ativa");

      const rawImprovements = Array.isArray(item.system?.improvements) ? item.system.improvements : [];
      const activeImprovements = rawImprovements.filter(imp => typeof imp === "object" && Boolean(imp.active));

      return {
        id: item.id,
        name: item.name,
        img: item.img,
        system: item.system,
        firstType,
        additionalTypes,
        hasAdditionalTypes: localizedTypes.length > 1,
        actionLabel,
        activeImprovements,
        hasActiveImprovements: activeImprovements.length > 0
      };
    });
    context.inventory = this.actor.items.filter((i) => i.type === "equipment" || i.type === "armor");

    return context;
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

  // ============================================================================
  // HANDLERS DE AÇÃO DAS DEFESAS E ITENS
  // ============================================================================

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

  static async #onOpenItem(event, target) {
    event.preventDefault();
    const itemId = target.dataset.itemId || target.closest("[data-item-id]")?.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (item) item.sheet.render(true);
  }

  static async #onDeleteItem(event, target) {
    event.preventDefault();
    const itemId = target.dataset.itemId || target.closest("[data-item-id]")?.dataset.itemId;
    const item = this.actor.items.get(itemId);
    return item?.delete();
  }

  static async #onToggleEquip(event, target) {
    event.preventDefault();
    const itemId = target.dataset.itemId || target.closest("[data-item-id]")?.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (item) {
      const isEquipped = Boolean(item.system?.equipped);
      await item.update({ "system.equipped": !isEquipped });
    }
  }

  static async #onRollItem(event, target) {
    event.preventDefault();
    const itemId = target.dataset.itemId || target.closest("[data-item-id]")?.dataset.itemId;
    const item = this.actor.items.get(itemId);
    return item?.roll();
  }

  static async #onAddResistance(event, target) {
    const trait = await promptDefenseTraitDialog("Adicionar Resistência a Dano", false);
    if (!trait) return;
    const current = [...(this.actor.system.damageResistance ?? [])];
    current.push(trait);
    await this.actor.update({ "system.damageResistance": current });
  }

  static async #onRemoveResistance(event, target) {
    const index = Number(target.dataset.index);
    if (isNaN(index)) return;
    const current = [...(this.actor.system.damageResistance ?? [])];
    current.splice(index, 1);
    await this.actor.update({ "system.damageResistance": current });
  }

  static async #onAddImmunity(event, target) {
    const trait = await promptDefenseTraitDialog("Adicionar Imunidade a Dano", false);
    if (!trait) return;
    const current = [...(this.actor.system.damageImmunity ?? [])];
    current.push(trait);
    await this.actor.update({ "system.damageImmunity": current });
  }

  static async #onRemoveImmunity(event, target) {
    const index = Number(target.dataset.index);
    if (isNaN(index)) return;
    const current = [...(this.actor.system.damageImmunity ?? [])];
    current.splice(index, 1);
    await this.actor.update({ "system.damageImmunity": current });
  }

  static async #onAddVulnerability(event, target) {
    const trait = await promptDefenseTraitDialog("Adicionar Vulnerabilidade a Dano", false);
    if (!trait) return;
    const current = [...(this.actor.system.damageVulnerability ?? [])];
    current.push(trait);
    await this.actor.update({ "system.damageVulnerability": current });
  }

  static async #onRemoveVulnerability(event, target) {
    const index = Number(target.dataset.index);
    if (isNaN(index)) return;
    const current = [...(this.actor.system.damageVulnerability ?? [])];
    current.splice(index, 1);
    await this.actor.update({ "system.damageVulnerability": current });
  }

  static async #onAddReduction(event, target) {
    const trait = await promptDefenseTraitDialog("Adicionar Redução de Dano Fixa", true);
    if (!trait) return;
    const current = [...(this.actor.system.damageReduction ?? [])];
    current.push(trait);
    await this.actor.update({ "system.damageReduction": current });
  }

  static async #onRemoveReduction(event, target) {
    const index = Number(target.dataset.index);
    if (isNaN(index)) return;
    const current = [...(this.actor.system.damageReduction ?? [])];
    current.splice(index, 1);
    await this.actor.update({ "system.damageReduction": current });
  }

  static async #onRollDefense(event, target) {
    const defenseType = target.dataset.type || "block";
    const roll = await defense(defenseType, this.actor, "standard");
    const label = defenseType === "agility" ? "Esquiva (Agilidade)" : "Bloqueio";
    await roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      flavor: `Rolagem de Defesa (${label}) - Gaia: Prelúdio`
    });
  }

  static async #onRollParameter(event, target) {
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

  static async #onPromptEditField(event, target) {
    const fieldPath = target.dataset.field;
    const fieldLabel = target.dataset.label || fieldPath;
    const typeInput = target.dataset.typeInput || "text";
    const min = target.dataset.min;
    const max = target.dataset.max;

    if (!fieldPath) return;
    await promptEditFieldDialog(this.actor, fieldPath, {
      label: fieldLabel,
      typeInput,
      min,
      max
    });
  }

  static #onOpenItemBrowser(event, target) {
    event.preventDefault();
    const type = target?.dataset?.type;
    return GaiaItemBrowser.open(this.actor, { type });
  }

  static async #onOpenCreatureWizard(event, target) {
    event.preventDefault();
    const { promptCreatureWizardDialog } = await import("../../../helpers/dialogs.mjs");
    return await promptCreatureWizardDialog(this.actor);
  }

  static async #onEditImage(event, target) {
    const attr = target.dataset.edit || "img";
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

  static async #onPromptRollRequest(event, target) {
    return await promptRollRequestDialog();
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
}