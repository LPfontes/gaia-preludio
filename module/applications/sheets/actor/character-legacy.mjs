import { GaiaBaseActorSheet } from "./base.mjs";
import {
  prepareSidebarContext,
  preparePersonagemContext,
  prepareInventoryContext,
  prepareAbilitiesContext,
  prepareBioContext,
  prepareEffectsContext
} from "../../../helpers/actor-context.mjs";

/**
 * ==============================================================================
 * CHARACTER LEGACY SHEET / FICHA DE PERSONAGEM LEGADO
 * ==============================================================================
 * Ficha de ator para Personagens Legado baseada em ApplicationV2 do Foundry VTT.
 * Totalmente componentizada em 7 PARTS para renderização seletiva e alta performance.
 */
export class CharacterLegacySheet extends GaiaBaseActorSheet {
  /** @override */
  static DEFAULT_OPTIONS = {
    ...super.DEFAULT_OPTIONS,
    classes: ["gaia-preludio", "sheet", "actor", "legacy-sheet"],
    position: { width: 900, height: 900 }
  };

  /** @override */
  static PARTS = {
    sidebar: {
      template: "systems/gaia-preludio/templates/actor/parts/actor-header.hbs",
      scrollable: [".gaia-actor-banner", ".sheet-sidebar-header"]
    },
    tabs: {
      template: "systems/gaia-preludio/templates/actor/parts/tabs-nav.hbs"
    },
    tabPersonagem: {
      template: "systems/gaia-preludio/templates/actor/parts/actor-personagem.hbs",
      scrollable: [".tab"]
    },
    tabInventory: {
      template: "systems/gaia-preludio/templates/actor/parts/inventory.hbs",
      scrollable: [".tab-inventory-content", ".inventory-column-container"]
    },
    tabAbilities: {
      template: "systems/gaia-preludio/templates/actor/parts/abilities.hbs",
      scrollable: [".tab-abilities-content", ".abilities-panel"]
    },
    tabBiografia: {
      template: "systems/gaia-preludio/templates/actor/parts/bio.hbs",
      scrollable: [".tab-bio-content", ".bio-content"]
    },
    tabEffects: {
      template: "systems/gaia-preludio/templates/actor/parts/effects.hbs",
      scrollable: [".tab-effects-content", ".actor-effects-panel"]
    }
  };

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.actor = this.actor;
    context.system = this.actor.system;
    context.config = /** @type {any} */ (CONFIG).GAIA;
    return context;
  }

  /** @override */
  async _preparePartContext(partId, context, options) {
    context = await super._preparePartContext(partId, context, options);
    const actor = this.actor;

    switch (partId) {
      case "sidebar":
        prepareSidebarContext(actor, context);
        break;
      case "tabs":
        context.tab = { active: this.tabGroups.primary || "personagem" };
        break;
      case "tabPersonagem":
        preparePersonagemContext(actor, context);
        break;
      case "tabInventory":
        prepareInventoryContext(actor, context);
        break;
      case "tabAbilities":
        prepareAbilitiesContext(actor, context);
        break;
      case "tabBiografia":
        prepareBioContext(actor, context);
        break;
      case "tabEffects":
        prepareEffectsContext(actor, context);
        break;
    }

    return context;
  }
}

export { CharacterLegacySheet as LegacySheet };
