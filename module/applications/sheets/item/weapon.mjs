/**
 * ==============================================================================
 * WEAPON SHEET / FICHA DE ARMA (ApplicationV2)
 * ==============================================================================
 * PT: Ficha de item para Armas e instrumentos de combate no sistema Gaia: Prelúdio.
 * EN: Item sheet for Weapons and combat instruments in the Gaia: Prelúdio system.
 */

const { ItemSheetV2 } = foundry.applications.sheets;
const { HandlebarsApplicationMixin } = foundry.applications.api;

export class WeaponSheet extends HandlebarsApplicationMixin(ItemSheetV2) {
  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ["gaia-preludio", "sheet", "item", "weapon"],
    position: { width: 800, height: 'auto' },
    tag: "form",
    form: {
      submitOnChange: true,
      closeOnSubmit: false
    },
    actions: {
      editImage: WeaponSheet.#onEditImage,
      addProperty: WeaponSheet.#onAddProperty,
      removeProperty: WeaponSheet.#onRemoveProperty
    }
  };

  /** @override */
  static PARTS = {
    main: { template: "systems/gaia-preludio/templates/item/weapon.hbs" }
  };

  /** @override */
  _onRender(context, options) {
    super._onRender(context, options);
    this.element.querySelectorAll("[data-edit='img']").forEach(img => {
      img.addEventListener("click", (event) => {
        WeaponSheet.#onEditImage.call(this, event, img);
      });
    });
  }

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.item = this.item;
    context.system = this.item.system;
    const config = (/** @type {any} */ (CONFIG)).GAIA;
    context.config = config;

    const rawProps = this.item.system?.properties ?? [];
    context.weaponProperties = rawProps.map((prop, index) => {
      if (typeof prop === "string") {
        return { name: prop, description: "", index };
      }
      return {
        name: prop.name || "",
        description: prop.description || "",
        index
      };
    });

    return context;
  }

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

  static async #onAddProperty(event, target) {
    event.preventDefault();
    const rawList = this.item.system.properties ?? [];
    const current = Array.isArray(rawList) ? [...rawList] : [];
    current.push({
      name: "",
      description: ""
    });
    await this.item.update({ "system.properties": current });
  }

  static async #onRemoveProperty(event, target) {
    event.preventDefault();
    const index = Number(target.dataset.index);
    if (isNaN(index)) return;
    const rawList = this.item.system.properties ?? [];
    const current = Array.isArray(rawList) ? [...rawList] : [];
    current.splice(index, 1);
    await this.item.update({ "system.properties": current });
  }
}
