/**
 * ==============================================================================
 * GAIA: PRELÚDIO - MAIN ENTRY POINT / PONTO DE ENTRADA PRINCIPAL
 * ==============================================================================
 * PT: Inicialização do sistema Gaia: Prelúdio para o Foundry Virtual Tabletop.
 * EN: System initialization for Gaia: Prelúdio on Foundry Virtual Tabletop.
 */

import { GAIA } from "./helpers/config.mjs";
import { modifyDieCategory, isCriticalHit, flowClash, flowDifficultyCheck, flowDestinyCheck, getDifficultyLevel, getCreatureStatsByDifficulty, calculateHomunculusStats, calculateCreatureStats, calculateLegacyNpcStats } from "./helpers/flow.mjs";
import { GaiaActor } from "./documents/actor.mjs";
import { GaiaItem } from "./documents/item.mjs";
import { EquipmentBaseDataModel, ArmorDataModel, WeaponDataModel } from "./data/EquipmentModel.mjs";
import { LegacyDataModel, LegacyNpcDataModel } from "./data/Legacy.mjs";
import { CreatureDataModel } from "./data/creature.mjs";
import { AbilityBaseModel } from "./data/abilitiesBaseModel.mjs";
import { LegacySheet } from "./applications/sheets/actor/legacy.mjs";
import { LegacyNpcSheet } from "./applications/sheets/actor/legacy-npc.mjs";
import { CreatureSheet } from "./applications/sheets/actor/creature.mjs";
import { EquipmentSheet } from "./applications/sheets/item/equipment.mjs";
import { ArmorSheet } from "./applications/sheets/item/armor.mjs";
import { WeaponSheet } from "./applications/sheets/item/weapon.mjs";
import { AbilitySheet } from "./applications/sheets/item/ability.mjs";
import { LegadoSheet } from "./applications/sheets/item/legacy.mjs";
import { GaiaItemBrowser } from "./applications/item-browser.mjs";
import { promptRollRequestDialog, promptCreatureWizardDialog, promptLegacyNpcWizardDialog, registerRollRequestListeners } from "./helpers/dialogs.mjs";
const { Actors, Items } = foundry.documents.collections;
const { ActorSheetV2, ItemSheetV2 } = foundry.applications.sheets;
const { loadTemplates } = foundry.applications.handlebars;

Hooks.once("init", async () => {
  console.log("Gaia: Prelúdio | Inicializando o sistema Gaia: Prelúdio...");

  // PT: Pré-carrega templates parciais de Handlebars
  // EN: Preload Handlebars partial templates
  await loadTemplates([
    "systems/gaia-preludio/templates/actor/parts/actor-header.hbs",
    "systems/gaia-preludio/templates/actor/parts/actor-personagem.hbs",
    "systems/gaia-preludio/templates/actor/parts/inventory.hbs",
    "systems/gaia-preludio/templates/actor/parts/bio.hbs",
    "systems/gaia-preludio/templates/actor/parts/abilities.hbs",
    "systems/gaia-preludio/templates/item/ability.hbs",
    "systems/gaia-preludio/templates/item/legacy.hbs",
    "systems/gaia-preludio/templates/dialog/roll-request-dialog.hbs",
    "systems/gaia-preludio/templates/actor/parts/creature-header.hbs",
    "systems/gaia-preludio/templates/apps/item-browser.hbs",
    "systems/gaia-preludio/templates/actor/parts/legacy-npc-header.hbs",
    "systems/gaia-preludio/templates/dialog/creature-wizard-dialog.hbs",
    "systems/gaia-preludio/templates/dialog/legacy-npc-wizard-dialog.hbs"
  ]);

  // PT: Configura os Enums e funções auxiliares globais do sistema
  // EN: Configure global system Enums and helper functions
  GAIA.modifyDieCategory = modifyDieCategory;
  GAIA.isCriticalHit = isCriticalHit;
  GAIA.flowClash = flowClash;
  GAIA.flowEmbate = flowClash;
  GAIA.flowDifficultyCheck = flowDifficultyCheck;
  GAIA.flowTesteDificuldade = flowDifficultyCheck;
  GAIA.flowDestinyCheck = flowDestinyCheck;
  GAIA.flowTesteDestino = flowDestinyCheck;
  GAIA.getDifficultyLevel = getDifficultyLevel;
  GAIA.getCreatureStatsByDifficulty = getCreatureStatsByDifficulty;
  GAIA.getAtributosPorDificuldade = getCreatureStatsByDifficulty;
  GAIA.calculateHomunculusStats = calculateHomunculusStats;
  GAIA.calculateHomunculariumStats = calculateHomunculusStats;
  GAIA.calculateCreatureStats = calculateCreatureStats;
  GAIA.calcularAtributosCriatura = calculateCreatureStats;
  GAIA.calculateLegacyNpcStats = calculateLegacyNpcStats;
  GAIA.promptRollRequestDialog = promptRollRequestDialog;
  GAIA.promptCreatureWizardDialog = promptCreatureWizardDialog;
  GAIA.promptAssistenteCriatura = promptCreatureWizardDialog;
  GAIA.promptLegacyNpcWizardDialog = promptLegacyNpcWizardDialog;
  GAIA.promptAssistenteLegadoNPC = promptLegacyNpcWizardDialog;
  GAIA.ItemBrowser = GaiaItemBrowser;
  GAIA.openItemBrowser = (actor = null, options = {}) => GaiaItemBrowser.open(actor, options);
  /** @type {any} */ (CONFIG).GAIA = GAIA;

  // PT: Registra os ouvintes interativos de mensagens do Chat
  registerRollRequestListeners();

  // PT: Reorganiza o bloco de dano da arma no chat para ficar após .message-content (Foundry VTT v12 HTMLElement)
  Hooks.on("renderChatMessageHTML", (message, html) => {
    if (!html) return;
    const damageBlock = html.querySelector(".flavor-text .weapon-damage-block, header .weapon-damage-block");
    const messageContent = html.querySelector(".message-content");
    if (damageBlock && messageContent && damageBlock.parentElement !== html) {
      messageContent.after(damageBlock);
    }
  });

  // PT: Registra as classes de Document personalizadas do sistema
  // EN: Register system custom Document classes
  CONFIG.Actor.documentClass = /** @type {any} */ (GaiaActor);
  CONFIG.Item.documentClass = /** @type {any} */ (GaiaItem);

  // PT: Registra os DataModels para cada tipo de Actor
  // EN: Register DataModels for each Actor type
  Object.assign(CONFIG.Actor.dataModels, {
    legacy: LegacyDataModel,
    legacyNpc: LegacyNpcDataModel,
    creature: CreatureDataModel
  });

  // PT: Registra os DataModels para cada tipo de Item
  // EN: Register DataModels for each Item type
  Object.assign(CONFIG.Item.dataModels, {
    equipment: EquipmentBaseDataModel,
    armor: ArmorDataModel,
    weapon: WeaponDataModel,
    ability: AbilityBaseModel,
    legacy: LegacyDataModel
  });

  // PT: Registra as fichas de Actor (ApplicationV2)
  // EN: Register Actor sheets (ApplicationV2)

  Actors.unregisterSheet("core", ActorSheetV2);
  Actors.registerSheet("gaia-preludio", /** @type {any} */ (LegacySheet), {
    types: ["legacy"],
    makeDefault: true,
    label: "GAIA.Sheet.Legacy"
  });
  Actors.registerSheet("gaia-preludio", /** @type {any} */ (LegacyNpcSheet), {
    types: ["legacyNpc"],
    makeDefault: true,
    label: "GAIA.Sheet.LegacyNpc"
  });
  Actors.registerSheet("gaia-preludio", /** @type {any} */ (CreatureSheet), {
    types: ["creature"],
    makeDefault: true,
    label: "GAIA.Sheet.Creature"
  });

  // PT: Registra as fichas de Item (ApplicationV2)
  // EN: Register Item sheets (ApplicationV2)
  Items.unregisterSheet("core", ItemSheetV2);
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
  Items.registerSheet("gaia-preludio", /** @type {any} */ (AbilitySheet), {
    types: ["ability"],
    makeDefault: true,
    label: "GAIA.Sheet.Ability"
  });
  Items.registerSheet("gaia-preludio", /** @type {any} */ (LegadoSheet), {
    types: ["legacy"],
    makeDefault: true,
    label: "GAIA.Sheet.Legacy"
  });
});