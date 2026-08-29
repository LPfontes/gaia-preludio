/**
 * ==============================================================================
 * BASE ITEM SHEET / FICHA BASE DE ITEM (ApplicationV2)
 * ==============================================================================
 * PT: Ficha base compartilhada para todos os tipos de itens do sistema Gaia: Prelúdio.
 *     Centraliza o upload de imagens, ciclo de vida e gerenciamento de Ações.
 * EN: Shared base sheet for all item types in the Gaia: Prelúdio system.
 *     Centralizes image editing, lifecycle, and Actions management.
 */

const { ItemSheetV2 } = foundry.applications.sheets;
const { HandlebarsApplicationMixin } = foundry.applications.api;
import { promptActionDialog } from "../../../helpers/dialogs/index.mjs";

export class GaiaItemSheet extends HandlebarsApplicationMixin(ItemSheetV2) {
  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ["gaia-preludio", "sheet", "item"],
    position: { width: 650, height: "auto" },
    tag: "form",
    form: {
      submitOnChange: true,
      closeOnSubmit: false
    },
    actions: {
      editImage: GaiaItemSheet.#onEditImage,
      tab: GaiaItemSheet.#onChangeTab,
      addAction: GaiaItemSheet.#onAddAction,
      editAction: GaiaItemSheet.#onEditAction,
      removeAction: GaiaItemSheet.#onRemoveAction,
      rollAction: GaiaItemSheet.#onRollAction,
      createEffect: GaiaItemSheet.#onCreateEffect,
      editEffect: GaiaItemSheet.#onEditEffect,
      deleteEffect: GaiaItemSheet.#onDeleteEffect,
      toggleEffect: GaiaItemSheet.#onToggleEffect
    }
  };

  /** @override */
  _onRender(context, options) {
    super._onRender(context, options);
    this._syncTabs();
    this.element.querySelectorAll("[data-edit='img']").forEach(img => {
      img.addEventListener("click", (event) => {
        GaiaItemSheet.#onEditImage.call(this, event, img);
      });
    });
  }

  /**
   * Sincroniza o estado ativo das abas na ficha do Item.
   * @protected
   */
  _syncTabs() {
    this.tabGroups ??= { primary: "tabela" };
    for (const [group, activeTab] of Object.entries(this.tabGroups)) {
      if (!activeTab) continue;
      const elements = this.element.querySelectorAll(`[data-group="${group}"][data-tab]`);
      for (const el of elements) {
        el.classList.toggle("active", el.dataset.tab === activeTab);
      }
    }
  }

  static #onChangeTab(event, target) {
    event.preventDefault();
    const tab = target.dataset.tab;
    const group = target.dataset.group || target.closest("[data-group]")?.dataset.group || "primary";
    if (tab && group) {
      this.changeTab(tab, group);
      this._syncTabs();
    }
  }

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.item = this.item;
    context.system = this.item.system;
    context.config = /** @type {any} */ (CONFIG).GAIA;

    // Formata a lista de Ações para exibição unificada
    context.formattedActions = this._prepareActionsContext(context.config);

    // Formata Efeitos Ativos e Passivos
    const { prepareActiveEffectCategories } = await import("../../../helpers/actor-context.mjs");
    context.effects = prepareActiveEffectCategories(this.item);

    return context;
  }

  /**
   * Prepara e enriquece a lista de Ações configuradas no item.
   * @param {object} config - Configurações do sistema (CONFIG.GAIA)
   * @returns {Array<object>} Lista de ações formatadas
   */
  _prepareActionsContext(config) {
    const rawActions = Array.isArray(this.item.system?.actions) ? this.item.system.actions : [];
    return rawActions.map((act, index) => {
      const actionTypeKey = act.type?.actionType;
      const actionTypeLabel = actionTypeKey && config?.actionType?.[actionTypeKey]
        ? game.i18n.localize(config.actionType[actionTypeKey])
        : (actionTypeKey || "");

      const categoryKey = act.type?.category;
      const categoryLabel = categoryKey && config?.abilitiesTypes?.[categoryKey]
        ? game.i18n.localize(config.abilitiesTypes[categoryKey])
        : (categoryKey || "");

      const summaries = [];
      if (act.attack?.hasAttack) {
        const paramKey = act.attack.attribute || "brutality";
        const paramLabel = config?.parameters?.[paramKey] ? game.i18n.localize(config.parameters[paramKey]) : paramKey;
        summaries.push(`Ataque: ${paramLabel}`);
      }
      if (act.damage?.hasDamage && act.damage.formula) {
        summaries.push(`Dano: ${act.damage.formula}`);
      }
      if (act.check?.hasCheck) {
        summaries.push(`Dif. ${act.check.difficulty ?? 10}`);
      }
      if (act.condition?.hasCondition && act.condition.status) {
        summaries.push(`Condição: ${act.condition.status}`);
      }
      if (act.areaOfEffect?.hasArea) {
        summaries.push(`Área: ${act.areaOfEffect.size ?? 3}${act.areaOfEffect.unit || "m"}`);
      }

      return {
        ...act,
        index,
        actionTypeLabel,
        categoryLabel,
        summary: summaries.join(" | ")
      };
    });
  }

  /* -------------------------------------------------------------------------- */
  /*  Action Handlers Compartilhados                                           */
  /* -------------------------------------------------------------------------- */

  static async #onEditImage(event, target) {
    const attr = target.dataset.edit || "img";
    const current = foundry.utils.getProperty(this.item, attr);
    const FilePickerClass = foundry.applications.apps.FilePicker?.implementation || globalThis.FilePicker;
    const fpOptions = {
      type: "image",
      current,
      callback: async (path) => {
        await this.item.update({ [attr]: path });
      }
    };
    if (Number.isNumeric(this.position?.top)) fpOptions.top = this.position.top + 40;
    if (Number.isNumeric(this.position?.left)) fpOptions.left = this.position.left + 10;

    const fp = new FilePickerClass(fpOptions);
    return fp.browse();
  }

  static async #onAddAction(event, target) {
    event.preventDefault();
    const actionData = await promptActionDialog();
    if (!actionData) return;
    const current = Array.isArray(this.item.system.actions) ? [...this.item.system.actions] : [];
    current.push(actionData);
    await this.item.update({ "system.actions": current });
    this.render(true);
  }

  static async #onEditAction(event, target) {
    event.preventDefault();
    event.stopPropagation();
    const index = Number(target.dataset.index);
    if (isNaN(index)) return;
    const current = Array.isArray(this.item.system.actions) ? [...this.item.system.actions] : [];
    const actionData = current[index];
    if (!actionData) return;
    const result = await promptActionDialog(actionData);
    if (!result) return;
    current[index] = result;
    await this.item.update({ "system.actions": current });
    this.render(true);
  }

  static async #onRemoveAction(event, target) {
    event.preventDefault();
    event.stopPropagation();
    const index = Number(target.dataset.index);
    if (isNaN(index)) return;
    const current = Array.isArray(this.item.system.actions) ? [...this.item.system.actions] : [];
    current.splice(index, 1);
    await this.item.update({ "system.actions": current });
    this.render(true);
  }

  static async #onRollAction(event, target) {
    event.preventDefault();
    event.stopPropagation();
    const index = Number(target.dataset.index);
    if (isNaN(index)) return;
    await this.item.rollAction(index);
  }

  static async #onCreateEffect(event, target) {
    event.preventDefault();
    const created = await this.item.createEmbeddedDocuments("ActiveEffect", [{
      name: game.i18n.localize("GAIA.Effects.NewEffectDefaultName") || "Novo Efeito",
      img: this.item.img || "icons/svg/aura.svg",
      icon: this.item.img || "icons/svg/aura.svg",
      origin: this.item.uuid
    }]);
    return created[0]?.sheet?.render(true);
  }

  static async #onEditEffect(event, target) {
    event.preventDefault();
    const effectId = target.dataset.effectId || target.closest("[data-effect-id]")?.dataset.effectId;
    const effect = this.item.effects.get(effectId);
    return effect?.sheet?.render(true);
  }

  static async #onDeleteEffect(event, target) {
    event.preventDefault();
    const effectId = target.dataset.effectId || target.closest("[data-effect-id]")?.dataset.effectId;
    const effect = this.item.effects.get(effectId);
    return await effect?.delete();
  }

  static async #onToggleEffect(event, target) {
    event.preventDefault();
    const effectId = target.dataset.effectId || target.closest("[data-effect-id]")?.dataset.effectId;
    const effect = this.item.effects.get(effectId);
    if (effect) {
      return await effect.update({ disabled: !effect.disabled });
    }
  }
}
