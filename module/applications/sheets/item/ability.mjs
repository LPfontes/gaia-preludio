/**
 * ==============================================================================
 * ABILITY SHEET / FICHA DE HABILIDADE (ApplicationV2)
 * ==============================================================================
 * PT: Ficha de item para Habilidades no sistema Gaia: Prelúdio.
 * EN: Item sheet for Abilities in the Gaia: Prelúdio system.
 */

const { ItemSheetV2 } = foundry.applications.sheets;
const { HandlebarsApplicationMixin } = foundry.applications.api;

export class AbilitySheet extends HandlebarsApplicationMixin(ItemSheetV2) {
  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ["gaia-preludio", "sheet", "item", "ability"],
    position: { width: 640, height: "auto" },
    tag: "form",
    form: {
      submitOnChange: true,
      closeOnSubmit: false
    },
    actions: {
      editImage: AbilitySheet.#onEditImage,
      addType: AbilitySheet.#onAddType,
      removeType: AbilitySheet.#onRemoveType,
      addImprovement: AbilitySheet.#onAddImprovement,
      removeImprovement: AbilitySheet.#onRemoveImprovement,
      addSubEffect: AbilitySheet.#onAddSubEffect,
      removeSubEffect: AbilitySheet.#onRemoveSubEffect,
      rollAbility: AbilitySheet.#onRollAbility
    }
  };

  /** @override */
  static PARTS = {
    main: { template: "systems/gaia-preludio/templates/item/ability.hbs" }
  };

  /** @override */
  _onRender(context, options) {
    super._onRender(context, options);
    this.element.querySelectorAll("[data-edit='img']").forEach(img => {
      img.addEventListener("click", (event) => {
        AbilitySheet.#onEditImage.call(this, event, img);
      });
    });
  }

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.item = this.item;
    context.system = this.item.system;
    const config = /** @type {any} */ (CONFIG).GAIA;
    context.config = config;

    // Converte os aprimoramentos para um array formatado com letras (A), B), C)...)
    const rawImprovements = Array.isArray(context.system.improvements) ? context.system.improvements : [];
    context.formattedImprovements = rawImprovements.map((imp, index) => {
      const letter = String.fromCharCode(65 + (index % 26)); // A, B, C...
      return {
        index,
        letter: `${letter})`,
        title: typeof imp === "string" ? imp : (imp.title || ""),
        description: typeof imp === "string" ? "" : (imp.description || ""),
        active: typeof imp === "object" ? Boolean(imp.active) : false
      };
    });

    const rawSubEffects = Array.isArray(context.system.subEffects) ? context.system.subEffects : [];
    context.formattedSubEffects = rawSubEffects.map((sub, index) => ({
      index,
      name: sub.name || "",
      cost: sub.cost || "",
      description: sub.description || "",
      note: sub.note || ""
    }));

    // Prepara os tipos de habilidade: 1º tipo para a linha 1, tipos adicionais para a linha 2
    const currentTypes = Array.isArray(context.system.types) && context.system.types.length > 0 
      ? context.system.types 
      : [context.system.type || "conjuracao"];
    
    const allFormattedTypes = currentTypes.map((val, index) => ({
      index,
      value: val,
      canRemove: currentTypes.length > 1
    }));

    context.firstType = allFormattedTypes[0];
    context.additionalTypes = allFormattedTypes.slice(1);
    context.hasAdditionalTypes = context.additionalTypes.length > 0;

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

  static async #onAddImprovement(event, target) {
    event.preventDefault();
    const current = Array.isArray(this.item.system.improvements) ? [...this.item.system.improvements] : [];
    current.push({ title: "Novo Aprimoramento", description: "", active: false });
    await this.item.update({ "system.improvements": current });
  }

  static async #onRemoveImprovement(event, target) {
    event.preventDefault();
    const index = Number(target.dataset.index);
    if (isNaN(index)) return;
    const current = Array.isArray(this.item.system.improvements) ? [...this.item.system.improvements] : [];
    current.splice(index, 1);
    await this.item.update({ "system.improvements": current });
  }

  static async #onAddSubEffect(event, target) {
    event.preventDefault();
    const current = Array.isArray(this.item.system.subEffects) ? [...this.item.system.subEffects] : [];
    current.push({ name: "NOVO EFEITO", cost: "1 PE", description: "", note: "" });
    await this.item.update({ "system.subEffects": current });
  }

  static async #onRemoveSubEffect(event, target) {
    event.preventDefault();
    const index = Number(target.dataset.index);
    if (isNaN(index)) return;
    const current = Array.isArray(this.item.system.subEffects) ? [...this.item.system.subEffects] : [];
    current.splice(index, 1);
    await this.item.update({ "system.subEffects": current });
  }

  static async #onAddType(event, target) {
    event.preventDefault();
    const current = Array.isArray(this.item.system.types) && this.item.system.types.length > 0 
      ? [...this.item.system.types] 
      : [this.item.system.type || "conjuracao"];
    current.push("conjuracao");
    await this.item.update({ "system.types": current, "system.type": current[0] });
  }

  static async #onRemoveType(event, target) {
    event.preventDefault();
    const index = Number(target.dataset.index);
    if (isNaN(index)) return;
    const current = Array.isArray(this.item.system.types) && this.item.system.types.length > 0 
      ? [...this.item.system.types] 
      : [this.item.system.type || "conjuracao"];
    if (current.length <= 1) return;
    current.splice(index, 1);
    await this.item.update({ "system.types": current, "system.type": current[0] });
  }

  static async #onRollAbility(event, target) {
    event.preventDefault();
    return this.item.roll();
  }
}
