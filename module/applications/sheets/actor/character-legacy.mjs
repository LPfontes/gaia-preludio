import { GaiaBaseActorSheet } from "./base.mjs";
import { prepareLegacySheetContext } from "../../../helpers/actor-context.mjs";

/**
 * ==============================================================================
 * CHARACTER LEGACY SHEET / FICHA DE PERSONAGEM LEGADO
 * ==============================================================================
 * Ficha de ator para Personagens Legado baseada em ApplicationV2 do Foundry VTT.
 * Herda a estrutura básica e handlers genéricos de GaiaBaseActorSheet.
 */
export class CharacterLegacySheet extends GaiaBaseActorSheet {
  /** @override */
  static DEFAULT_OPTIONS = {
    ...super.DEFAULT_OPTIONS,
    classes: ["gaia-preludio", "sheet", "actor"],
    position: { width: 900, height: 900 }
  };

  /** @override */
  static PARTS = {
    main: { 
      template: "systems/gaia-preludio/templates/actor/legacy.hbs",
      scrollable: [".sheet-tabs-content"]
    }
  };

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    return await prepareLegacySheetContext(this, context);
  }
}

export { CharacterLegacySheet as LegacySheet };
