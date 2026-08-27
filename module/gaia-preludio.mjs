/**
 * ==============================================================================
 * GAIA: PRELÚDIO - MAIN ENTRY POINT / PONTO DE ENTRADA PRINCIPAL
 * ==============================================================================
 * PT: Inicialização do sistema Gaia: Prelúdio para o Foundry Virtual Tabletop.
 * EN: System initialization for Gaia: Prelúdio on Foundry Virtual Tabletop.
 */

import { GAIA } from "./helpers/config.mjs";
import { 
  modifyDieCategory, 
  isCriticalHit, 
  flowClash, 
  flowDifficultyCheck, 
  flowDestinyCheck, 
  flowDeathDie,
  flowRegenerateStabilized,
  getDifficultyLevel, 
  getCreatureStatsByDifficulty, 
  calculateHomunculusStats, 
  calculateCreatureStats, 
  calculateLegacyNpcStats 
} from "./helpers/flow.mjs";
import { GaiaActor } from "./documents/actor.mjs";
import { GaiaItem } from "./documents/item.mjs";
import { EquipmentBaseDataModel, ArmorDataModel, WeaponDataModel } from "./data/EquipmentModel.mjs";
import { LegacyDataModel, LegacyNpcDataModel } from "./data/Legacy.mjs";
import { CreatureDataModel } from "./data/creature.mjs";
import { AbilityBaseModel } from "./data/abilitiesBaseModel.mjs";
import { PathDataModel } from "./data/PathModel.mjs";
import { ActionDataModel } from "./data/ActionModel.mjs";
import { CharacterLegacySheet } from "./applications/sheets/actor/character-legacy.mjs";
import { CharacterLegacyNpcSheet } from "./applications/sheets/actor/character-legacy-npc.mjs";
import { CreatureSheet } from "./applications/sheets/actor/creature.mjs";
import { GaiaItemSheet } from "./applications/sheets/item/base.mjs";
import { EquipmentSheet } from "./applications/sheets/item/equipment.mjs";
import { ArmorSheet } from "./applications/sheets/item/armor.mjs";
import { WeaponSheet } from "./applications/sheets/item/weapon.mjs";
import { AbilitySheet } from "./applications/sheets/item/ability.mjs";
import { LegacySheet } from "./applications/sheets/item/legacy.mjs";
import { PathSheet } from "./applications/sheets/item/path.mjs";
import { GaiaItemBrowser } from "./applications/item-browser.mjs";
import { GaiaDeathSaveDialog } from "./applications/death-save-dialog.mjs";
import { promptRollRequestDialog, promptCreatureWizardDialog, promptLegacyNpcWizardDialog, promptActionDialog, registerRollRequestListeners } from "./helpers/dialogs.mjs";
import { createRegion, createRegionShape } from "./helpers/region-helper.mjs";
import { getSelectedToken, getSelectedTokens, getTargetedTokens, getSelectedOrTargetToken } from "./helpers/token-helper.mjs";
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
    "systems/gaia-preludio/templates/item/path.hbs",
    "systems/gaia-preludio/templates/dialog/roll-request-dialog.hbs",
    "systems/gaia-preludio/templates/actor/parts/creature-header.hbs",
    "systems/gaia-preludio/templates/apps/item-browser.hbs",
    "systems/gaia-preludio/templates/actor/parts/legacy-npc-header.hbs",
    "systems/gaia-preludio/templates/dialog/creature-wizard-dialog.hbs",
    "systems/gaia-preludio/templates/dialog/legacy-npc-wizard-dialog.hbs",
    "systems/gaia-preludio/templates/dialog/legacy-ability-dialog.hbs",
    "systems/gaia-preludio/templates/dialog/action-dialog.hbs",
    "systems/gaia-preludio/templates/item/parts/item-actions.hbs",
    "systems/gaia-preludio/templates/actor/parts/effects.hbs",
    "systems/gaia-preludio/templates/item/parts/item-effects.hbs"
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
  GAIA.flowDeathDie = flowDeathDie;
  GAIA.flowDadoDeMorte = flowDeathDie;
  GAIA.flowRegenerateStabilized = flowRegenerateStabilized;
  GAIA.flowRegenerarEstabilizado = flowRegenerateStabilized;
  GAIA.getDifficultyLevel = getDifficultyLevel;
  GAIA.getCreatureStatsByDifficulty = getCreatureStatsByDifficulty;
  GAIA.getAtributosPorDificuldade = getCreatureStatsByDifficulty;
  GAIA.calculateHomunculusStats = calculateHomunculusStats;
  GAIA.calculateHomunculariumStats = calculateHomunculusStats;
  GAIA.calculateCreatureStats = calculateCreatureStats;
  GAIA.calcularAtributosCriatura = calculateCreatureStats;
  GAIA.calculateLegacyNpcStats = calculateLegacyNpcStats;
  const { promptRollRequestDialog, promptCreatureWizardDialog, promptLegacyNpcWizardDialog, promptActionDialog, registerRollRequestListeners, promptLevelUpDialog } = await import("./helpers/dialogs.mjs");
  GAIA.promptRollRequestDialog = promptRollRequestDialog;
  GAIA.promptCreatureWizardDialog = promptCreatureWizardDialog;
  GAIA.promptAssistenteCriatura = promptCreatureWizardDialog;
  GAIA.promptLegacyNpcWizardDialog = promptLegacyNpcWizardDialog;
  GAIA.promptAssistenteLegadoNPC = promptLegacyNpcWizardDialog;
  GAIA.promptLevelUpDialog = promptLevelUpDialog;
  GAIA.promptEvolucao = promptLevelUpDialog;
  GAIA.createRegion = createRegion;
  GAIA.createRegionShape = createRegionShape;
  GAIA.getSelectedToken = getSelectedToken;
  GAIA.getSelectedTokens = getSelectedTokens;
  GAIA.getTargetedTokens = getTargetedTokens;
  GAIA.getSelectedOrTargetToken = getSelectedOrTargetToken;
  GAIA.ItemBrowser = GaiaItemBrowser;
  GAIA.openItemBrowser = (actor = null, options = {}) => GaiaItemBrowser.open(actor, options);
  GAIA.DeathSaveDialog = GaiaDeathSaveDialog;
  GAIA.promptDeathSaveDialog = (actor) => GaiaDeathSaveDialog.open(actor);
  GAIA.ActionDataModel = ActionDataModel;
  GAIA.GaiaItemSheet = GaiaItemSheet;
  GAIA.promptActionDialog = promptActionDialog;
  GAIA.promptDialogoAcao = promptActionDialog;

  // PT: Registra helpers Handlebars do sistema
  Handlebars.registerHelper("add", (a, b) => (Number(a) || 0) + (Number(b) || 0));
  Handlebars.registerHelper("gte", (a, b) => Number(a) >= Number(b));

  // Motor de Execução de Ações e Efeitos
  const { executeAction, applyActionDamage, applyActionCondition, placeActionAoETemplate } = await import("./helpers/action-flow.mjs");
  GAIA.executeAction = executeAction;
  GAIA.applyActionDamage = applyActionDamage;
  GAIA.applyActionCondition = applyActionCondition;
  GAIA.placeActionAoETemplate = placeActionAoETemplate;

  /** @type {any} */ (CONFIG).GAIA = GAIA;

  // PT: Registra exclusivamente as condições e efeitos visuais do sistema Gaia: Prelúdio no Foundry VTT
  CONFIG.statusEffects = Object.values(GAIA.conditions || {});
  if (CONFIG.specialStatusEffects) {
    CONFIG.specialStatusEffects.DEFEATED = "incapacitado";
  }

  // PT: Registra os ouvintes interativos de mensagens do Chat
  registerRollRequestListeners();

  // PT: Abre automaticamente a janela de Dado de Morte quando o personagem fica com 0 PV / Incapacitado
  Hooks.on("updateActor", (actor, changed, options, userId) => {
    if (!actor) return;
    const hp = Number(actor.system?.health?.value ?? 0);
    const isIncapacitated = Boolean(actor.system?.isIncapacitated);
    const isStabilized = Boolean(actor.system?.death?.stabilized);
    const isDead = Boolean(actor.system?.isDeadByDeathDie || actor.system?.isDeadByExhaustion);

    // Se está em risco de morte (0 PV / incapacitado, não estabilizado, não morto)
    if ((hp <= 0 || isIncapacitated) && !isStabilized && !isDead) {
      if (game.user?.isGM || actor.isOwner) {
        GaiaDeathSaveDialog.open(actor);
      }
    } else if (hp > 0 || isStabilized) {
      // Se estabilizou ou recuperou PV acima de 0, fecha a janela
      GaiaDeathSaveDialog.closeForActor(actor);
    }
  });

  // PT: Reorganiza o bloco de dano da arma e alvos de dano de ação no chat para ficar após .message-content (Foundry VTT v12 HTMLElement)
  Hooks.on("renderChatMessageHTML", (message, html) => {
    if (!html) return;
    const damageBlock = html.querySelector(".flavor-text .weapon-damage-block, header .weapon-damage-block, .flavor-text .action-damage-targets-block, header .action-damage-targets-block");
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
    legacy: LegacyDataModel,
    path: PathDataModel
  });

  // PT: Registra as fichas de Actor (ApplicationV2)
  // EN: Register Actor sheets (ApplicationV2)

  Actors.unregisterSheet("core", ActorSheetV2);
  Actors.registerSheet("gaia-preludio", /** @type {any} */ (CharacterLegacySheet), {
    types: ["legacy"],
    makeDefault: true,
    label: "GAIA.Sheet.Legacy"
  });
  Actors.registerSheet("gaia-preludio", /** @type {any} */ (CharacterLegacyNpcSheet), {
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
  Items.registerSheet("gaia-preludio", /** @type {any} */ (LegacySheet), {
    types: ["legacy"],
    makeDefault: true,
    label: "GAIA.Sheet.Legacy"
  });
  Items.registerSheet("gaia-preludio", /** @type {any} */ (PathSheet), {
    types: ["path"],
    makeDefault: true,
    label: "GAIA.Sheet.Path"
  });
});