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
 * CHARACTER LEGACY NPC SHEET / FICHA DE NPC LEGADO
 * ==============================================================================
 * Ficha de Ator para o DataModel Legado NPC (LegacyNpcDataModel).
 * Extende GaiaBaseActorSheet e renderiza o template compacto templates/actor/legacy-npc.hbs.
 */
export class CharacterLegacyNpcSheet extends GaiaBaseActorSheet {
  /** @override */
  static DEFAULT_OPTIONS = {
    ...super.DEFAULT_OPTIONS,
    classes: ["gaia-preludio", "sheet", "actor", "legacy-npc-sheet", "creature-sheet"],
    position: { width: 920, height: 800 },
    actions: {
      ...super.DEFAULT_OPTIONS.actions,
      openLegacyNpcWizard: CharacterLegacyNpcSheet.#onOpenLegacyNpcWizard
    }
  };

  /** @override */
  static PARTS = {
    main: { 
      template: "systems/gaia-preludio/templates/actor/legacy-npc.hbs",
      scrollable: [".sheet-main-body", ".sheet-tabs-content"]
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

    if (partId === "main") {
      context.tab = { active: this.tabGroups.primary || "personagem" };
      prepareSidebarContext(actor, context);
      preparePersonagemContext(actor, context);
      prepareInventoryContext(actor, context);
      prepareAbilitiesContext(actor, context);
      prepareBioContext(actor, context);
      prepareEffectsContext(actor, context);
    }

    return context;
  }

  static async #onOpenLegacyNpcWizard(event, target) {
    event.preventDefault();
    const { promptLegacyNpcWizardDialog } = await import("../../../helpers/dialogs/index.mjs");
    return await promptLegacyNpcWizardDialog(this.actor);
  }
}

export { CharacterLegacyNpcSheet as LegacyNpcSheet };
