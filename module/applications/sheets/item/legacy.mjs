/**
 * ==============================================================================
 * LEGADO ITEM SHEET / FICHA DE ITEM LEGADO (ApplicationV2)
 * ==============================================================================
 * PT: Ficha de item para Legado no sistema Gaia: Prelúdio.
 * EN: Item sheet for Legacy in the Gaia: Prelúdio system.
 */

const { ItemSheetV2 } = foundry.applications.sheets;
const { HandlebarsApplicationMixin } = foundry.applications.api;

export class LegadoSheet extends HandlebarsApplicationMixin(ItemSheetV2) {
  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ["gaia-preludio", "sheet", "item", "legado"],
    position: { width: 640, height: "auto" },
    tag: "form",
    form: {
      submitOnChange: true,
      closeOnSubmit: false
    },
    actions: {
      editImage: LegadoSheet.#onEditImage,
      addLegacyAbility: LegadoSheet.#onAddLegacyAbility,
      removeLegacyAbility: LegadoSheet.#onRemoveLegacyAbility
    }
  };

  /** @override */
  static PARTS = {
    main: { template: "systems/gaia-preludio/templates/item/legacy.hbs" }
  };

  /** @override */
  _onRender(context, options) {
    super._onRender(context, options);
    this.element.querySelectorAll("[data-edit='img']").forEach(img => {
      img.addEventListener("click", (event) => {
        LegadoSheet.#onEditImage.call(this, event, img);
      });
    });
  }

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.item = this.item;
    context.system = this.item.system;
    context.config = /** @type {any} */ (CONFIG).GAIA;
    return context;
  }

  static async #onEditImage(event, target) {
    const attr = target.dataset.edit || "img";
    const current = foundry.utils.getProperty(this.item, attr);
    const FilePickerClass = foundry.applications.apps.FilePicker?.implementation || globalThis.FilePicker;
    const fp = new FilePickerClass({
      type: "image",
      current,
      callback: async (path) => {
        await this.item.update({ [attr]: path });
      },
      top: this.position.top + 40,
      left: this.position.left + 10
    });
    return fp.browse();
  }

  static async #onAddLegacyAbility(event, target) {
    event.preventDefault();
    const rawList = this.item.system.legacyAbilities ?? this.item.system.habilidadesLegado;
    const current = Array.isArray(rawList) ? [...rawList] : [];
    current.push({
      name: "Nova Habilidade de Legado",
      description: "",
      activeEffect: {
        text: "",
        used: false,
        recharge: "full_rest",
        trigger: { event: "hp_threshold", inCombatOnly: true, hpThresholdPercentage: 50 },
        changes: [{ key: "all_parameters", mode: "ADD", value: 1, allowExceedMax: true }],
        duration: { type: "end_of_combat" }
      }
    });
    await this.item.update({ "system.legacyAbilities": current });
  }

  static async #onRemoveLegacyAbility(event, target) {
    event.preventDefault();
    const index = Number(target.dataset.index);
    if (isNaN(index)) return;
    const rawList = this.item.system.legacyAbilities ?? this.item.system.habilidadesLegado;
    const current = Array.isArray(rawList) ? [...rawList] : [];
    current.splice(index, 1);
    await this.item.update({ "system.legacyAbilities": current });
  }
}
