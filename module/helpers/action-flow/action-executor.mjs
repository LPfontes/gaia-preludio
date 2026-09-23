/**
 * ==============================================================================
 * GAIA: PRELÚDIO - ACTION EXECUTOR / EXECUTOR PRINCIPAL DE AÇÕES
 * ==============================================================================
 * PT: Orquestrador principal da execução de Ações (ActionDataModel).
 * EN: Main orchestrator for Action (ActionDataModel) execution.
 */

import { getTargetedTokens } from "../token-helper.mjs";
import { getHomunculariumDamageFormula } from "../homuncularium-rules.mjs";
import { flowParameter, flowDifficultyCheck } from "../flow.mjs";
import { getStatEntry, promptRollDialog } from "../stat-rolls.mjs";
import { processActionCost } from "./action-cost.mjs";
import { processActionAttack } from "./action-attack.mjs";
import {
  processActionDamageSection,
  processActionHealingSection,
  processActionCheckSection,
  processActionConditionSection,
  processActionAoESection,
  buildActionBadges,
  buildActionChatCardHtml
} from "./action-card.mjs";

/**
 * Executa o teste de resistência/parâmetro da ação para o próprio ator caso a ação não possua ataque e não haja alvos.
 * @param {object} action - Dados da Ação
 * @param {Actor|null} actor - Ator executante
 * @param {string} fitness - Aptidão inicial
 * @param {object} context - Contexto da execução
 * @returns {Promise<{ roll: Roll|null, checkHtml: string, rollMode?: string, cancelled?: boolean }|null>}
 */
export async function processActionSelfCheck(action, actor, fitness = "standard", context = {}) {
  if (!actor || !action.check?.hasCheck) return null;

  const config = /** @type {any} */ (CONFIG).GAIA;
  const checkAttr = action.check.attribute || "vigor";
  const category = action.check.category || "parameter";
  const dc = Number(action.check.difficulty ?? 10);

  let paramObj = null;
  let label = null;

  if (category === "parameter") {
    const entry = getStatEntry(actor.system, "parameters", checkAttr);
    paramObj = { value: Number(entry?.value ?? 0) };
    label = config?.parameters?.[checkAttr] ? game.i18n.localize(config.parameters[checkAttr]) : checkAttr;
  } else if (category === "knowledge") {
    const entry = getStatEntry(actor.system, "knowledge", checkAttr);
    paramObj = { value: Number(entry?.value ?? 0) };
    label = config?.knowledge?.[checkAttr] ? game.i18n.localize(config.knowledge[checkAttr]) : checkAttr;
  } else if (category === "defense") {
    const mod = Number(actor.system?.defesas?.[checkAttr]?.total ?? actor.system?.defesas?.[checkAttr]?.value ?? 0);
    paramObj = { value: mod };
    label = checkAttr.toUpperCase();
  } else {
    const pEntry = getStatEntry(actor.system, "parameters", checkAttr);
    const kEntry = getStatEntry(actor.system, "knowledge", checkAttr);
    const val = Number(pEntry?.value ?? kEntry?.value ?? 0);
    paramObj = { value: val };
    label = config?.parameters?.[checkAttr] 
      ? game.i18n.localize(config.parameters[checkAttr]) 
      : (config?.knowledge?.[checkAttr] ? game.i18n.localize(config.knowledge[checkAttr]) : checkAttr);
  }

  const isParam = category === "parameter" || Boolean(config?.parameters?.[checkAttr]);
  const exhaustion = isParam ? (Number(actor.system?.exhaustion) || 0) : 0;

  // Condições situacionais
  let defaultFitness = fitness || "standard";
  let defaultModifier = 0;
  const system = actor.system ?? {};

  const rawKey = String(checkAttr).toLowerCase();
  if (rawKey === "perception" || rawKey === "percepção" || rawKey === "percepcao") {
    if (system.hasDarkness) defaultFitness = "disadvantage";
    else if (system.hasPenumbra) defaultModifier -= 1;
  }
  if (system.hasDarkness && (rawKey === "precision" || rawKey === "channeling" || rawKey === "precisão" || rawKey === "precisao" || rawKey === "canalização" || rawKey === "canalizacao")) {
    defaultModifier -= 1;
  }
  if (system.hasStunned && isParam) {
    defaultFitness = "disadvantage";
  }
  if (system.hasProne && (rawKey === "precision" || rawKey === "channeling" || rawKey === "precisão" || rawKey === "precisao" || rawKey === "canalização" || rawKey === "canalizacao")) {
    defaultFitness = "disadvantage";
  }

  if (context.event?.shiftKey) defaultFitness = "advantage";
  if (context.event?.altKey || context.event?.ctrlKey) defaultFitness = "disadvantage";

  const rollTitle = action.name ? `${action.name} (Teste: ${label})` : `Teste: ${label}`;
  const dialogResult = await promptRollDialog({
    label: `${rollTitle} [Dif. ${dc}]`,
    dataKey: checkAttr,
    value: paramObj.value,
    modifier: defaultModifier,
    exhaustionPenalty: exhaustion,
    defaultFitness
  });

  if (!dialogResult) {
    return { cancelled: true };
  }

  const roll = await flowParameter(paramObj, dialogResult.fitness, dialogResult.modifier, exhaustion);
  const check = flowDifficultyCheck(roll, dc);
  const rollHtml = await roll.render();

  const outcomeClass = check.success ? "success" : "failure";
  const outcomeText = check.success ? `Sucesso (Total ${roll.total} vs Dif. ${dc})` : `Falha (Total ${roll.total} vs Dif. ${dc})`;

  const checkHtml = `
    <div class="action-section-block action-check-section">
      <div class="action-section-header">
        <div class="action-section-title check-title">
          Teste: ${label} (Dif. ${dc})
        </div>
      </div>
      ${rollHtml}
      <div class="action-check-outcome ${outcomeClass}">
        <div class="action-check-outcome-label">${outcomeText}</div>
        ${check.success && action.check.onSuccess ? `<div class="action-check-outcome-content"> ${action.check.onSuccess}</div>` : ""}
        ${!check.success && action.check.onFailure ? `<div class="action-check-outcome-content"> ${action.check.onFailure}</div>` : ""}
      </div>
    </div>
  `;

  return { roll, checkHtml, rollMode: dialogResult.rollMode };
}

/**
 * Função principal que orquestra a execução completa de uma Ação (ActionDataModel).
 * 
 * @param {object} action - Objeto de dados da Ação (ActionDataModel)
 * @param {object} [context={}] - Parâmetros de execução
 * @param {Item} [context.item] - Item de origem da ação
 * @param {Actor} [context.actor] - Ator executante da ação
 * @param {string} [context.fitness="standard"] - Aptidão da rolagem (disadvantage, standard, advantage, etc.)
 * @param {Array<Token>} [context.targets] - Lista opcional de tokens alvejados
 * @param {object} [context.options] - Opções adicionais
 * @returns {Promise<ChatMessage|null>}
 */
export async function executeAction(action, context = {}) {
  if (!action) return null;

  const item = context.item || null;
  const actor = context.actor || item?.actor || null;
  const config = /** @type {any} */ (CONFIG).GAIA;
  const fitness = context.fitness || "standard";

  // 1. Resgata alvos
  const targets = context.targets && context.targets.length > 0 
    ? context.targets 
    : getTargetedTokens(null, { fallbackToSelected: false });

  // Resolução dinâmica de fórmula de dano para ataques do Homuncularium
  const isHomuncularium = item?.flags?.["gaia-preludio"]?.isHomunculariumAttack ||
    item?.name === "Golpe Brutal" ||
    item?.name === "Evocação Mística" ||
    action.id?.startsWith("golpe-brutal") ||
    action.id?.startsWith("evocacao-mistica");

  let effectiveAction = action;
  if (actor && isHomuncularium && action.damage?.hasDamage) {
    const homDmg = getHomunculariumDamageFormula(actor, item || action.id);
    effectiveAction = foundry.utils?.deepClone ? foundry.utils.deepClone(action) : JSON.parse(JSON.stringify(action));
    effectiveAction.damage.formula = homDmg.formula;
    if (!effectiveAction.damage.type) effectiveAction.damage.type = homDmg.damageType;
  }

  // 2. Processa ataque com diálogo se a ação possuir ataque
  let attackRoll = null;
  let attackHtml = "";
  let rollMode = null;

  if (effectiveAction.attack?.hasAttack) {
    const attackResult = await processActionAttack(effectiveAction, actor, targets, fitness, context);
    if (attackResult?.cancelled) {
      return null; // Cancelado no roll-dialog, aborta sem gastar PE nem gerar mensagem
    }
    attackRoll = attackResult.attackRoll;
    attackHtml = attackResult.attackHtml;
    rollMode = attackResult.rollMode;
  }

  // 3. Processa teste próprio (check) com diálogo caso a ação não possua ataque e não haja alvos mirados
  let checkRoll = null;
  let checkHtml = "";
  if (!effectiveAction.attack?.hasAttack && effectiveAction.check?.hasCheck && targets.length === 0) {
    const checkResult = await processActionSelfCheck(effectiveAction, actor, fitness, context);
    if (checkResult?.cancelled) {
      return null; // Cancelado no roll-dialog
    }
    if (checkResult?.roll) {
      checkRoll = checkResult.roll;
      checkHtml = checkResult.checkHtml;
      if (!rollMode) rollMode = checkResult.rollMode;
    }
  }

  // Se a seção de teste ainda não foi renderizada, monta a seção padrão (com alvos para resistirem se houver)
  if (!checkHtml) {
    checkHtml = processActionCheckSection(effectiveAction, config, targets);
  }

  // 4. Deduz custo de PE (após validação/confirmação dos diálogos de rolagem)
  const { costSpentNotice } = await processActionCost(effectiveAction, actor);

  // 5. Processa demais seções modulares
  const damageHtml = processActionDamageSection(effectiveAction, config);
  const healingHtml = processActionHealingSection(effectiveAction, config);
  const conditionHtml = processActionConditionSection(effectiveAction);
  const aoeHtml = processActionAoESection(effectiveAction);

  // 6. Constrói badges e card final
  const badgesHtml = buildActionBadges(effectiveAction, config, costSpentNotice);
  const content = buildActionChatCardHtml({
    action: effectiveAction,
    item,
    badgesHtml,
    attackHtml,
    damageHtml,
    healingHtml,
    checkHtml,
    conditionHtml,
    aoeHtml
  });

  const speaker = ChatMessage.getSpeaker({ actor, item });
  const msgData = {
    speaker,
    content,
    flags: {
      "gaia-preludio": {
        actionData: action,
        itemId: item?.id ?? null,
        actorId: actor?.id ?? null
      }
    }
  };

  const messageOptions = rollMode ? { messageMode: rollMode } : {};
  const effectiveRoll = attackRoll || checkRoll;
  if (effectiveRoll) {
    return effectiveRoll.toMessage(msgData, messageOptions);
  }

  return ChatMessage.create(msgData, messageOptions);
}
