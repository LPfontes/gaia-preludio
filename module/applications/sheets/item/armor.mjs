/**
 * ==============================================================================
 * ARMOR SHEET / FICHA DE ARMADURA (ApplicationV2)
 * ==============================================================================
 * PT: Ficha de item para Armaduras e proteções no sistema Gaia: Prelúdio.
 * EN: Item sheet for Armors and protections in the Gaia: Prelúdio system.
 */

const { ItemSheetV2 } = foundry.applications.sheets;
const { HandlebarsApplicationMixin } = foundry.applications.api;

export class ArmorSheet extends HandlebarsApplicationMixin(ItemSheetV2) {
  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ["gaia-preludio", "sheet", "item", "armor"],
    position: { width: 550, height: 500 },
    tag: "form",
    form: {
      submitOnChange: true,
      closeOnSubmit: false
    }
  };

  /** @override */
  static PARTS = {
    main: { template: "systems/gaia-preludio/templates/item/armor.hbs" }
  };

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.item = this.item;
    context.system = this.item.system;
    const config = (CONFIG).GAIA;
    context.config = config;
    return context;
  }
}
