/**
 * ==============================================================================
 * GAIA: PRELÚDIO - ACTION ATTACK / ATAQUES DE AÇÕES
 * ==============================================================================
 * PT: Processamento de testes de ataque, acertos e geração de botões de defesa.
 * EN: Processing of attack rolls, hits, and generation of target defense buttons.
 */

import { flowParameter } from "../flow.mjs";
import { getStatEntry, promptRollDialog } from "../stat-rolls.mjs";

/**
 * Processa a rolagem de ataque/embate da ação e gera os botões de defesa para os alvos.
 * @param {object} action - Objeto de dados da Ação
 * @param {Actor|null} actor - Ator atacante
 * @param {Array<Token>} targets - Tokens alvejados
 * @param {string} fitness - Aptidão da rolagem (standard, advantage, disadvantage)
 * @param {object} [context={}] - Contexto opcional com eventos ou opções adicionais
 * @returns {Promise<{ attackRoll: Roll|null, attackHtml: string, rollMode?: string, cancelled?: boolean }>}
 */
export async function processActionAttack(action, actor, targets = [], fitness = "standard", context = {}) {
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
  const system = actor?.system ?? {};
  const exhaustion = Number(system.exhaustion) || 0;

  // Avalia modificadores e aptidão com base em condições situacionais
  let defaultFitness = fitness || action.attack.rollType || "standard";
  let defaultModifier = bonus;

  const rawKey = String(attrKey || "").toLowerCase();
  const hasDarkness = Boolean(system.hasDarkness);
  const hasPenumbra = Boolean(system.hasPenumbra);

  if (hasDarkness && (rawKey === "precision" || rawKey === "channeling" || rawKey === "precisão" || rawKey === "precisao" || rawKey === "canalização" || rawKey === "canalizacao")) {
    defaultModifier -= 1; // Escuridão: -1 em todo teste de Precisão e Canalização
  }

  const hasStunned = Boolean(system.hasStunned);
  if (hasStunned) {
    defaultFitness = "disadvantage"; // Atordoado: Inaptidão em todo teste de Parâmetro
  }

  const hasProne = Boolean(system.hasProne);
  if (hasProne && (rawKey === "precision" || rawKey === "channeling" || rawKey === "precisão" || rawKey === "precisao" || rawKey === "canalização" || rawKey === "canalizacao")) {
    defaultFitness = "disadvantage";
  }

  if (context.event?.shiftKey) defaultFitness = "advantage";
  if (context.event?.altKey || context.event?.ctrlKey) defaultFitness = "disadvantage";

  // Exibe o diálogo de rolagem padronizado
  const rollLabel = action.name ? `${action.name} (Ataque: ${attrLabel})` : `Ataque: ${attrLabel}`;
  const dialogResult = await promptRollDialog({
    label: rollLabel,
    dataKey: attrKey,
    value: totalParam,
    modifier: defaultModifier,
    exhaustionPenalty: exhaustion,
    defaultFitness
  });

  if (!dialogResult) {
    return { attackRoll: null, attackHtml: "", cancelled: true };
  }

  const attackRoll = await flowParameter({ value: totalParam }, dialogResult.fitness, dialogResult.modifier, exhaustion);
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

  const attackTotalVal = attackRoll?.total ?? 1;
  const dmgFormula = action.damage?.formula || "";
  const dmgTypeKey = action.damage?.type || "physical";
  const dmgTypeLabel = config?.damageTypesFlat?.[dmgTypeKey] ? game.i18n.localize(config.damageTypesFlat[dmgTypeKey]) : (dmgTypeKey || "physical");
  const damageTextVal = dmgFormula ? `${dmgFormula} ${dmgTypeLabel}` : "";

  const defenseBlockHtml = `
    <div class="weapon-defense-block">
      <span class="defense-label">
        <i class="fa-solid fa-shield-halved"></i> Reação de Defesa
      </span>
      <div style="display:flex;gap:6px;justify-content:center;margin-top:4px">
        <button type="button" class="gaia-btn-roll-defense" data-action="rollTargetDefense" data-defense-type="agility" data-attack-total="${attackTotalVal}" data-damage-amount="0" data-damage-text="${damageTextVal}" data-damage-type="${dmgTypeKey}">
          Esquiva
        </button>
        <button type="button" class="gaia-btn-roll-defense" data-action="rollTargetDefense" data-defense-type="block" data-attack-total="${attackTotalVal}" data-damage-amount="0" data-damage-text="${damageTextVal}" data-damage-type="${dmgTypeKey}">
          Bloqueio
        </button>
      </div>
    </div>
  `;

  const attackHtml = `
    <div class="action-section-block action-attack-section">
      <div class="action-section-header">
        <div class="action-section-title attack-title">
          <i class="fa-solid fa-crosshairs"></i> Ataque: ${attrLabel}
        </div>
        ${defenseBlockHtml}
      </div>
      ${rollHtml}
      ${targetDefenseCards}
    </div>
  `;

  return { attackRoll, attackHtml, rollMode: dialogResult.rollMode };
}
