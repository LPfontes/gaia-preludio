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
      editImage: WeaponSheet.#onEditImage
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
    const config = (CONFIG).GAIA;
    context.config = config;
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
}
