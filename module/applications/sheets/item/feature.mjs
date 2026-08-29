import { AbilitySheet } from "./ability.mjs";

/**
 * ==============================================================================
 * FEATURE SHEET / FICHA DE CARACTERÍSTICA (ApplicationV2)
 * ==============================================================================
 * PT: Ficha de item para Características no sistema Gaia: Prelúdio.
 *     Herda a estrutura e funcionalidades completas da ficha de Habilidade.
 * EN: Item sheet for Features in the Gaia: Prelúdio system.
 *     Inherits full structure and features from Ability sheet.
 */
export class FeatureSheet extends AbilitySheet {
  /** @override */
  static DEFAULT_OPTIONS = {
    ...super.DEFAULT_OPTIONS,
    classes: ["gaia-preludio", "sheet", "item", "feature", "ability"]
  };
}
