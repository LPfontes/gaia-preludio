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
    position: { width: 580, height: 560 },
    tag: "form",
    form: {
      submitOnChange: true,
      closeOnSubmit: false
    }
  };

  /** @override */
  static PARTS = {
    main: { template: "systems/gaia-preludio/templates/item/weapon.hbs" }
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
