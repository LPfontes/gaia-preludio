/**
 * ==============================================================================
 * EQUIPMENT SHEET / FICHA DE EQUIPAMENTO (ApplicationV2)
 * ==============================================================================
 * PT: Ficha de item para Equipamentos gerais no sistema Gaia: Prelúdio.
 * EN: Item sheet for general Equipment in the Gaia: Prelúdio system.
 */

import { GaiaItemSheet } from "./base.mjs";

export class EquipmentSheet extends GaiaItemSheet {
  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ["gaia-preludio", "sheet", "item", "equipment"],
    position: { width: 600, height: "auto" }
  };

  /** @override */
  static PARTS = {
    main: { template: "systems/gaia-preludio/templates/item/equipment.hbs" }
  };
}
