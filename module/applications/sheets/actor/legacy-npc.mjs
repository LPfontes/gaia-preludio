import { LegacySheet } from "./legacy.mjs";

/**
 * Ficha de Ator para o DataModel Legado NPC (LegacyNpcDataModel).
 * Extende LegacySheet e renderiza o template compacto templates/actor/legacy-npc.hbs.
 */
export class LegacyNpcSheet extends LegacySheet {
  /** @override */
  static DEFAULT_OPTIONS = {
    ...super.DEFAULT_OPTIONS,
    classes: ["gaia-preludio", "sheet", "actor", "legacy-npc-sheet", "creature-sheet"],
    position: { width: 900, height: 800 },
    actions: {
      ...super.DEFAULT_OPTIONS.actions,
      openLegacyNpcWizard: LegacyNpcSheet.#onOpenLegacyNpcWizard
    }
  };

  /** @override */
  static PARTS = {
    main: { 
      template: "systems/gaia-preludio/templates/actor/legacy-npc.hbs",
      scrollable: [".sheet-main-body", ".sheet-tabs-content"]
    }
  };

  static async #onOpenLegacyNpcWizard(event, target) {
    event.preventDefault();
    const { promptLegacyNpcWizardDialog } = await import("../../../helpers/dialogs.mjs");
    return await promptLegacyNpcWizardDialog(this.actor);
  }
}
