/**
 * ==============================================================================
 * EQUIPMENT SHEET / FICHA DE EQUIPAMENTO (ApplicationV2)
 * ==============================================================================
 * PT: Ficha de item para Equipamentos gerais no sistema Gaia: Prelúdio.
 * EN: Item sheet for general Equipment in the Gaia: Prelúdio system.
 */

const { ItemSheetV2 } = foundry.applications.sheets;
const { HandlebarsApplicationMixin } = foundry.applications.api;

export class EquipmentSheet extends HandlebarsApplicationMixin(ItemSheetV2) {
  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ["gaia-preludio", "sheet", "item", "equipment"],
    position: { width: 550, height: 480 },
    tag: "form",
    form: {
      submitOnChange: true,
      closeOnSubmit: false
    }
  };

  /** @override */
  static PARTS = {
    main: { template: "systems/gaia-preludio/templates/item/equipment.hbs" }
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
