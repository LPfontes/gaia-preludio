/**
 * ==============================================================================
 * GAIA: PRELÚDIO - MAIN ENTRY POINT / PONTO DE ENTRADA PRINCIPAL
 * ==============================================================================
 * PT: Inicialização do sistema Gaia: Prelúdio para o Foundry Virtual Tabletop.
 * EN: System initialization for Gaia: Prelúdio on Foundry Virtual Tabletop.
 */

import { GAIA } from "./helpers/config.mjs";
import { GaiaActor } from "./documents/actor.mjs";
import { GaiaItem } from "./documents/item.mjs";
import { EquipmentBaseDataModel, ArmorDataModel, WeaponDataModel } from "./data/EquipmentModel.mjs";
import { legadoDataModel } from "./data/Legado.mjs";
import { creatureDataModel } from "./data/creature.mjs";
import { LegadoSheet } from "./applications/sheets/actor/legado.mjs";
import { CreatureSheet } from "./applications/sheets/actor/creature.mjs";
import { EquipmentSheet } from "./applications/sheets/item/equipment.mjs";
import { ArmorSheet } from "./applications/sheets/item/armor.mjs";
import { WeaponSheet } from "./applications/sheets/item/weapon.mjs";

Hooks.once("init", () => {
  console.log("Gaia: Prelúdio | Inicializando o sistema Gaia: Prelúdio...");

  // PT: Configura os Enums e constantes globais do sistema
  // EN: Configure global system Enums and constants
  /** @type {any} */ (CONFIG).GAIA = GAIA;

  // PT: Registra as classes de Document personalizadas do sistema
  // EN: Register system custom Document classes
  CONFIG.Actor.documentClass = /** @type {any} */ (GaiaActor);
  CONFIG.Item.documentClass = /** @type {any} */ (GaiaItem);

  // PT: Registra os DataModels para cada tipo de Actor
  // EN: Register DataModels for each Actor type
  Object.assign(CONFIG.Actor.dataModels, {
    legado: legadoDataModel,
    creature: creatureDataModel
  });

  // PT: Registra os DataModels para cada tipo de Item
  // EN: Register DataModels for each Item type
  Object.assign(CONFIG.Item.dataModels, {
    equipment: EquipmentBaseDataModel,
    armor: ArmorDataModel,
    weapon: WeaponDataModel
  });

  // PT: Registra as fichas de Actor (ApplicationV2)
  // EN: Register Actor sheets (ApplicationV2)
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("gaia-preludio", /** @type {any} */ (LegadoSheet), {
    types: ["legado"],
    makeDefault: true,
    label: "GAIA.Sheet.Legado"
  });
  Actors.registerSheet("gaia-preludio", /** @type {any} */ (CreatureSheet), {
    types: ["creature"],
    makeDefault: true,
    label: "GAIA.Sheet.Creature"
  });

  // PT: Registra as fichas de Item (ApplicationV2)
  // EN: Register Item sheets (ApplicationV2)
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("gaia-preludio", /** @type {any} */ (EquipmentSheet), {
    types: ["equipment"],
    makeDefault: true,
    label: "GAIA.Sheet.Equipment"
  });
  Items.registerSheet("gaia-preludio", /** @type {any} */ (ArmorSheet), {
    types: ["armor"],
    makeDefault: true,
    label: "GAIA.Sheet.Armor"
  });
  Items.registerSheet("gaia-preludio", /** @type {any} */ (WeaponSheet), {
    types: ["weapon"],
    makeDefault: true,
    label: "GAIA.Sheet.Weapon"
  });
});