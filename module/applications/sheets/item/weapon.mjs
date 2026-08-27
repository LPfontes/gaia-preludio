/**
 * ==============================================================================
 * WEAPON SHEET / FICHA DE ARMA (ApplicationV2)
 * ==============================================================================
 * PT: Ficha de item para Armas e instrumentos de combate no sistema Gaia: Prelúdio.
 * EN: Item sheet for Weapons and combat instruments in the Gaia: Prelúdio system.
 */

import { GaiaItemSheet } from "./base.mjs";

export class WeaponSheet extends GaiaItemSheet {
  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ["gaia-preludio", "sheet", "item", "weapon"],
    position: { width: 800, height: "auto" },
    actions: {
      addProperty: WeaponSheet.#onAddProperty,
      removeProperty: WeaponSheet.#onRemoveProperty
    }
  };

  /** @override */
  static PARTS = {
    main: { template: "systems/gaia-preludio/templates/item/weapon.hbs" }
  };

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);

    const rawProps = this.item.system?.properties ?? [];
    context.weaponProperties = rawProps.map((prop, index) => {
      if (typeof prop === "string") {
        return { name: prop, description: "", index };
      }
      return {
        name: prop.name || "",
        description: prop.description || "",
        index
      };
    });

    return context;
  }

  static async #onAddProperty(event, target) {
    event.preventDefault();
    const rawList = this.item.system.properties ?? [];
    const current = Array.isArray(rawList) ? [...rawList] : [];
    current.push({
      name: "",
      description: ""
    });
    await this.item.update({ "system.properties": current });
  }

  static async #onRemoveProperty(event, target) {
    event.preventDefault();
    const index = Number(target.dataset.index);
    if (isNaN(index)) return;
    const rawList = this.item.system.properties ?? [];
    const current = Array.isArray(rawList) ? [...rawList] : [];
    current.splice(index, 1);
    await this.item.update({ "system.properties": current });
  }
}
