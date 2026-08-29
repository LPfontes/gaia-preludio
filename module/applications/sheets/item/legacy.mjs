/**
 * ==============================================================================
 * LEGADO ITEM SHEET / FICHA DE ITEM LEGADO (ApplicationV2)
 * ==============================================================================
 * PT: Ficha de item para Legado no sistema Gaia: Prelúdio.
 * EN: Item sheet for Legacy in the Gaia: Prelúdio system.
 */

import { GaiaItemSheet } from "./base.mjs";
import { promptLegacyAbilityDialog } from "../../../helpers/dialogs/index.mjs";

export class LegacySheet extends GaiaItemSheet {
  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ["gaia-preludio", "sheet", "item", "legado"],
    position: { width: 800, height: "auto" },
    actions: {
      addLegacyAbility: LegacySheet.#onAddLegacyAbility,
      editLegacyAbility: LegacySheet.#onEditLegacyAbility,
      removeLegacyAbility: LegacySheet.#onRemoveLegacyAbility,
      rollLegacyAction: LegacySheet.#onRollLegacyAction
    }
  };

  /** @override */
  static PARTS = {
    main: { template: "systems/gaia-preludio/templates/item/legacy.hbs" }
  };

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const config = context.config;

    const rawAbilities = this.item.system?.legacyAbilities ?? [];
    context.legacyAbilities = rawAbilities.map((ab, index) => {
      const activeEffect = ab.activeEffect;
      let activeEffectText = "";
      if (typeof activeEffect === "string") {
        activeEffectText = activeEffect;
      } else if (activeEffect && typeof activeEffect === "object") {
        activeEffectText = typeof activeEffect.text === "string" ? activeEffect.text : "";
      }

      const actions = Array.isArray(ab.actions) ? ab.actions : [];
      const formattedActions = actions.map((act, aIdx) => {
        const summaries = [];
        if (act.attack?.hasAttack) {
          const paramKey = act.attack.attribute || "brutality";
          const paramLabel = config?.parameters?.[paramKey] ? game.i18n.localize(config.parameters[paramKey]) : paramKey;
          summaries.push(`Ataque: ${paramLabel}`);
        }
        if (act.damage?.hasDamage && act.damage.formula) {
          summaries.push(`Dano: ${act.damage.formula}`);
        }
        if (act.check?.hasCheck) {
          summaries.push(`Dif. ${act.check.difficulty ?? 10}`);
        }
        return {
          ...act,
          index: aIdx,
          abilityIndex: index,
          summary: summaries.join(" | ")
        };
      });

      return {
        ...ab,
        index,
        activeEffectText,
        formattedActions
      };
    });

    return context;
  }

  static async #onAddLegacyAbility(event, target) {
    event.preventDefault();
    const dialogData = await promptLegacyAbilityDialog({}, { item: this.item });
    if (!dialogData) return;

    const rawList = this.item.system.legacyAbilities ?? [];
    const current = Array.isArray(rawList) ? [...rawList] : [];
    current.push({
      name: dialogData.name,
      description: dialogData.description,
      actions: dialogData.actions || [],
      activeEffect: dialogData.activeEffect ?? {
        text: dialogData.activeEffectText,
        used: false,
        recharge: "full_rest",
        trigger: { event: "hp_threshold", inCombatOnly: true, hpThresholdPercentage: 50 },
        changes: [{ key: "all_parameters", mode: "ADD", value: 1, allowExceedMax: true }],
        duration: { type: "end_of_combat" }
      }
    });
    await this.item.update({ "system.legacyAbilities": current });
  }

  static async #onEditLegacyAbility(event, target) {
    event.preventDefault();
    const index = Number(target.dataset.index);
    if (isNaN(index)) return;

    const rawList = this.item.system.legacyAbilities ?? [];
    const ability = rawList[index];
    if (!ability) return;

    const dialogData = await promptLegacyAbilityDialog(ability, { item: this.item });
    if (!dialogData) return;

    const current = Array.isArray(rawList) ? [...rawList] : [];
    current[index] = {
      ...ability,
      name: dialogData.name,
      description: dialogData.description,
      actions: dialogData.actions || [],
      activeEffect: dialogData.activeEffect ?? {
        ...(ability.activeEffect || {}),
        text: dialogData.activeEffectText
      }
    };
    await this.item.update({ "system.legacyAbilities": current });
  }

  static async #onRemoveLegacyAbility(event, target) {
    event.preventDefault();
    const index = Number(target.dataset.index);
    if (isNaN(index)) return;

    const rawList = this.item.system.legacyAbilities ?? [];
    const current = Array.isArray(rawList) ? [...rawList] : [];
    current.splice(index, 1);
    await this.item.update({ "system.legacyAbilities": current });
  }

  static async #onRollLegacyAction(event, target) {
    event.preventDefault();
    event.stopPropagation();
    const abilityIndex = Number(target.dataset.abilityIndex);
    const actionIndex = Number(target.dataset.actionIndex);
    if (isNaN(abilityIndex) || isNaN(actionIndex)) return;

    const ability = this.item.system?.legacyAbilities?.[abilityIndex];
    const action = ability?.actions?.[actionIndex];
    if (!action) return;

    return this.item.rollAction(action);
  }
}
