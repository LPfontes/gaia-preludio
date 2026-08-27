/**
 * ==============================================================================
 * ARMOR SHEET / FICHA DE ARMADURA (ApplicationV2)
 * ==============================================================================
 * PT: Ficha de item para Armaduras e proteções no sistema Gaia: Prelúdio.
 * EN: Item sheet for Armors and protections in the Gaia: Prelúdio system.
 */

import { GaiaItemSheet } from "./base.mjs";

export class ArmorSheet extends GaiaItemSheet {
  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ["gaia-preludio", "sheet", "item", "armor"],
    position: { width: 650, height: "auto" }
  };

  /** @override */
  static PARTS = {
    main: { template: "systems/gaia-preludio/templates/item/armor.hbs" }
  };
}
