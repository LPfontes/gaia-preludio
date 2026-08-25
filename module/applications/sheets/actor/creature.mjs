import { GaiaBaseActorSheet } from "./base.mjs";
import { GAIA } from "../../../helpers/config.mjs";

/**
 * ==============================================================================
 * CREATURE SHEET / FICHA DE CRIATURA (NPC/MONSTRO)
 * ==============================================================================
 * Ficha de ator para Criaturas baseada em ApplicationV2 do Foundry VTT.
 * Herda a estrutura básica e handlers genéricos de GaiaBaseActorSheet.
 */
export class CreatureSheet extends GaiaBaseActorSheet {
  /** @override */
  static DEFAULT_OPTIONS = {
    ...super.DEFAULT_OPTIONS,
    classes: ["gaia-preludio", "sheet", "actor", "creature-sheet"],
    position: { width: 850, height: 750 },
    actions: {
      ...super.DEFAULT_OPTIONS.actions,
      openCreatureWizard: CreatureSheet.#onOpenCreatureWizard
    }
  };

  /** @override */
  static PARTS = {
    main: { 
      template: "systems/gaia-preludio/templates/actor/creature.hbs",
      scrollable: [".sheet-body"]
    }
  };

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);

    // Prepara a lista de checkboxes dos tipos de criatura (creaturesType)
    const currentTypes = new Set(this.actor.system.creatureTypes ?? []);
    context.creatureTypesList = Object.entries(GAIA.creaturesType ?? {}).map(([key, labelKey]) => ({
      key,
      label: game.i18n.localize(labelKey),
      checked: currentTypes.has(key)
    }));

    // Categoriza os itens da criatura por seções
    const config = /** @type {any} */ (CONFIG).GAIA;
    context.weapons = this.actor.items.filter((i) => i.type === "weapon");
    context.abilities = this.actor.items.filter((i) => i.type === "ability").map(item => {
      const rawCategory = item.system?.category || "";
      const categoryLabel = rawCategory && config?.abilityCategories?.[rawCategory]
        ? game.i18n.localize(config.abilityCategories[rawCategory])
        : (rawCategory || "");

      const rawTypes = Array.isArray(item.system?.types) && item.system.types.length > 0 
        ? item.system.types 
        : (item.system?.type ? [item.system.type] : []);
      const localizedTypes = rawTypes.map(t => config?.abilitiesTypes?.[t] ? game.i18n.localize(config.abilitiesTypes[t]) : t).filter(Boolean);
      const firstType = localizedTypes[0] || "";
      const additionalTypes = localizedTypes.slice(1).join(" / ");

      const rawAction = item.system?.typeAction || "";
      const actionLabel = rawAction && config?.actionType?.[rawAction] 
        ? game.i18n.localize(config.actionType[rawAction]) 
        : (rawAction || "");

      const cost = item.system?.cost || "";
      const metaParts = [cost, actionLabel, categoryLabel, firstType].filter(Boolean);
      const metaRow1 = metaParts.join(" | ");

      const rawImprovements = Array.isArray(item.system?.improvements) ? item.system.improvements : [];
      const activeImprovements = rawImprovements.filter(imp => typeof imp === "object" && Boolean(imp.active));

      return {
        id: item.id,
        name: item.name,
        img: item.img,
        system: item.system,
        categoryLabel,
        firstType,
        additionalTypes,
        hasAdditionalTypes: localizedTypes.length > 1,
        actionLabel,
        cost,
        metaRow1,
        activeImprovements,
        hasActiveImprovements: activeImprovements.length > 0
      };
    });
    context.inventory = this.actor.items.filter((i) => i.type === "equipment" || i.type === "armor");

    return context;
  }

  /* ==============================================================================
   * AÇÕES ESPECÍFICAS DA FICHA DE CRIATURA
   * ============================================================================== */

  static async #onOpenCreatureWizard(event, target) {
    event.preventDefault();
    const { promptCreatureWizardDialog } = await import("../../../helpers/dialogs.mjs");
    return await promptCreatureWizardDialog(this.actor);
  }
}