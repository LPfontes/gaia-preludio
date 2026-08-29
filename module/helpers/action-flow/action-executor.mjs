/**
 * ==============================================================================
 * GAIA: PRELÚDIO - ACTION EXECUTOR / EXECUTOR PRINCIPAL DE AÇÕES
 * ==============================================================================
 * PT: Orquestrador principal da execução de Ações (ActionDataModel).
 * EN: Main orchestrator for Action (ActionDataModel) execution.
 */

import { getTargetedTokens } from "../token-helper.mjs";
import { processActionCost } from "./action-cost.mjs";
import { processActionAttack } from "./action-attack.mjs";
import {
  processActionDamageSection,
  processActionCheckSection,
  processActionConditionSection,
  processActionAoESection,
  buildActionBadges,
  buildActionChatCardHtml
} from "./action-card.mjs";

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

  // 2. Deduz custo de PE
  const { costSpentNotice } = await processActionCost(action, actor);

  // 3. Processa seções modulares
  const { attackRoll, attackHtml } = await processActionAttack(action, actor, targets, fitness);
  const damageHtml = processActionDamageSection(action, config);
  const checkHtml = processActionCheckSection(action, config);
  const conditionHtml = processActionConditionSection(action);
  const aoeHtml = processActionAoESection(action);

  // 4. Constrói badges e card final
  const badgesHtml = buildActionBadges(action, config, costSpentNotice);
  const content = buildActionChatCardHtml({
    action,
    item,
    badgesHtml,
    attackHtml,
    damageHtml,
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

  if (attackRoll) {
    return attackRoll.toMessage(msgData);
  }

  return ChatMessage.create(msgData);
}
