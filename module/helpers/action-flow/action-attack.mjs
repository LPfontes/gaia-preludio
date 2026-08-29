/**
 * ==============================================================================
 * GAIA: PRELÚDIO - ACTION ATTACK / ATAQUES DE AÇÕES
 * ==============================================================================
 * PT: Processamento de testes de ataque, acertos e geração de botões de defesa.
 * EN: Processing of attack rolls, hits, and generation of target defense buttons.
 */

import { flowParameter } from "../flow.mjs";
import { getStatEntry } from "../stat-rolls.mjs";

/**
 * Processa a rolagem de ataque/embate da ação e gera os botões de defesa para os alvos.
 * @param {object} action - Objeto de dados da Ação
 * @param {Actor|null} actor - Ator atacante
 * @param {Array<Token>} targets - Tokens alvejados
 * @param {string} fitness - Aptidão da rolagem (standard, advantage, disadvantage)
 * @returns {Promise<{ attackRoll: Roll|null, attackHtml: string }>}
 */
export async function processActionAttack(action, actor, targets = [], fitness = "standard") {
  if (!action.attack?.hasAttack) {
    return { attackRoll: null, attackHtml: "" };
  }

  const config = /** @type {any} */ (CONFIG).GAIA;
  const attrKey = action.attack.attribute || "brutality";
  const attrLabel = config?.parameters?.[attrKey] ? game.i18n.localize(config.parameters[attrKey]) : attrKey;
  const bonus = Number(action.attack.bonus) || 0;

  // Resgata o valor do parâmetro base do Ator
  let paramVal = 0;
  if (actor?.system) {
    const entry = getStatEntry(actor.system, "parameters", attrKey);
    paramVal = Number(entry?.value ?? 0);
  }

  // Resgata o bônus de conhecimento (perícia) opcional
  let knowledgeBonus = 0;
  if (action.attack.knowledge && actor?.system?.knowledge) {
    const knowEntry = getStatEntry(actor.system, "knowledge", action.attack.knowledge);
    knowledgeBonus = Number(knowEntry?.value ?? 0);
  }

  const totalParam = paramVal + knowledgeBonus;
  const exhaustion = Number(actor?.system?.exhaustion) || 0;
  const attackRoll = await flowParameter({ value: totalParam }, fitness, bonus, exhaustion);
  const rollHtml = await attackRoll.render();

  let targetDefenseCards = "";
  if (targets.length > 0) {
    targetDefenseCards = targets.map(t => {
      const isNpcOrCreature = t.actor?.type === "creature" || t.actor?.type === "legacyNpc";
      if (isNpcOrCreature) {
        return `
          <div class="action-target-row">
            <span class="action-target-name"><strong>${t.name}</strong></span>
            <div class="action-target-buttons">
              <button type="button" class="btn-target-defend" data-action="rollTargetDefense" data-defense-type="defensiveParameters" data-target-token-id="${t.id}" data-attack-total="${attackRoll.total}" title="Defesa">
                Defesa
              </button>
            </div>
          </div>
        `;
      }
      return `
        <div class="action-target-row">
          <span class="action-target-name"><strong>${t.name}</strong></span>
          <div class="action-target-buttons">
            <button type="button" class="btn-target-defend" data-action="rollTargetDefense" data-defense-type="agility" data-target-token-id="${t.id}" data-attack-total="${attackRoll.total}" title="Esquivar">
              Esquiva
            </button>
            <button type="button" class="btn-target-defend" data-action="rollTargetDefense" data-defense-type="block" data-target-token-id="${t.id}" data-attack-total="${attackRoll.total}" title="Bloquear">
              Bloqueio
            </button>
          </div>
        </div>
      `;
    }).join("");
  }

  const attackHtml = `
    <div class="action-section-block action-attack-section">
      <div class="action-section-header">
        <div class="action-section-title attack-title">
          <i class="fa-solid fa-crosshairs"></i> Ataque: ${attrLabel}
        </div>
      </div>
      ${rollHtml}
      ${targetDefenseCards}
    </div>
  `;

  return { attackRoll, attackHtml };
}
