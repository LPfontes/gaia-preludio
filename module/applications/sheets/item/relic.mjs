/**
 * ==============================================================================
 * RELIC SHEET / FICHA DE RELÍQUIA (ApplicationV2)
 * ==============================================================================
 * PT: Ficha de item para Relíquias no sistema Gaia: Prelúdio.
 * EN: Item sheet for Relics in the Gaia: Prelúdio system.
 */

import { GaiaItemSheet } from "./base.mjs";

export class RelicSheet extends GaiaItemSheet {
  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ["gaia-preludio", "sheet", "item", "relic"],
    position: { width: 720, height: "auto" },
    actions: {
      toggleBound: RelicSheet.#onToggleBound
    }
  };

  /** @override */
  static PARTS = {
    main: { template: "systems/gaia-preludio/templates/item/relic.hbs" }
  };

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);

    const config = /** @type {any} */ (CONFIG).GAIA;
    
    // Categorias de Relíquia com seus rótulos traduzidos
    const relicCategories = {};
    for (const [key, obj] of Object.entries(config?.relicCategories ?? {})) {
      relicCategories[key] = game.i18n.localize(obj.label || key);
    }
    context.relicCategories = relicCategories;

    const categoryKey = this.item.system?.category || "comum";
    const defaultPotency = config?.relicCategories?.[categoryKey]?.potency ?? 0;
    const currentPotency = this.item.system?.potency ?? defaultPotency;

    context.currentPotency = currentPotency;
    context.isBound = Boolean(this.item.system?.isBound);

    return context;
  }

  /**
   * Alterna o estado de vínculo (attunement) da relíquia.
   */
  static async #onToggleBound(event, target) {
    event.preventDefault();
    const isBound = !Boolean(this.item.system.isBound);
    await this.item.update({ "system.isBound": isBound });
    
    const msg = isBound 
      ? `A Relíquia "${this.item.name}" foi Vinculada ao personagem (${this.item.system.potency} Potência).`
      : `A Relíquia "${this.item.name}" foi Desvinculada do personagem.`;
    ui.notifications?.info(msg);
  }
}
