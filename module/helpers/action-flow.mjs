/**
 * ==============================================================================
 * GAIA: PRELÚDIO - ACTION FLOW & EFFECT HANDLER / FLUXO DE AÇÕES E EFEITOS
 * ==============================================================================
 * PT: Motor de execução de Ações (ActionDataModel), integrando rolagens de ataque,
 *     dano, testes de resistência, aplicação de condições e modelos de área.
 * EN: Action execution engine (ActionDataModel), integrating attack rolls, damage,
 *     saving throw checks, condition applications, and area of effect templates.
 */

import { flowRoll, flowParameter, flowDifficultyCheck, isCriticalHit } from "./flow.mjs";
import { getStatEntry } from "./stat-rolls.mjs";
import { getTargetedTokens, getSelectedOrTargetToken } from "./token-helper.mjs";

/**
 * Deduz o custo de PE e/ou PV do Ator se a Ação possuir custo configurado.
 * @param {object} action - Objeto de dados da Ação
 * @param {Actor|null} actor - Ator executante
 * @returns {Promise<{ costSpentNotice: string, spent: boolean }>}
 */
export async function processActionCost(action, actor) {
  if (!actor || !action?.cost) return { costSpentNotice: "", spent: false };

  const rawCost = String(action.cost).trim();
  if (!rawCost) return { costSpentNotice: "", spent: false };

  // Detecta custos específicos de PV (Vida / HP) e de PE (Energia)
  const pvMatch = rawCost.match(/(\d+)\s*(?:pv|vida|hp|pontos de vida)/i);
  const peMatch = rawCost.match(/(\d+)\s*(?:pe|energia|pet|pontos de energia)/i);

  let pvCost = pvMatch ? parseInt(pvMatch[1], 10) : 0;
  let peCost = peMatch ? parseInt(peMatch[1], 10) : 0;

  // Se não indicou unidade explicitamente (ex: apenas um número "2"), assume PE por padrão
  if (!pvMatch && !peMatch) {
    const genericNumberMatch = rawCost.match(/^(\d+)$/);
    if (genericNumberMatch) {
      peCost = parseInt(genericNumberMatch[1], 10);
    }
  }

  if (pvCost === 0 && peCost === 0) {
    return { costSpentNotice: "", spent: false };
  }

  const updates = {};
  const notices = [];

  // 1. Dedução de PE
  if (peCost > 0) {
    const currentTempPe = Number(actor.system?.energy?.temp ?? 0);
    const currentPe = Number(actor.system?.energy?.value ?? 0);
    const totalPeAvailable = currentTempPe + currentPe;

    if (totalPeAvailable < peCost) {
      ui.notifications.warn(`${actor.name} não possui PE suficiente (${totalPeAvailable}/${peCost}) para realizar "${action.name}".`);
      return { costSpentNotice: "", spent: false };
    }

    let remainingPeCost = peCost;
    if (currentTempPe > 0) {
      const spentFromTemp = Math.min(currentTempPe, remainingPeCost);
      updates["system.energy.temp"] = currentTempPe - spentFromTemp;
      remainingPeCost -= spentFromTemp;
    }
    if (remainingPeCost > 0) {
      updates["system.energy.value"] = Math.max(0, currentPe - remainingPeCost);
    }

    const newPe = updates["system.energy.value"] ?? currentPe;
    const newTempPe = updates["system.energy.temp"] ?? currentTempPe;
    const tempText = newTempPe > 0 ? ` + ${newTempPe} PET` : "";
    notices.push(`-${peCost} PE (${newPe}/${actor.system?.energy?.max ?? '?'}${tempText})`);
  }

  // 2. Dedução de PV
  if (pvCost > 0) {
    const currentTempHp = Number(actor.system?.health?.temp ?? 0);
    const currentHp = Number(actor.system?.health?.value ?? 0);
    const totalHpAvailable = currentTempHp + currentHp;

    if (totalHpAvailable < pvCost) {
      ui.notifications.warn(`${actor.name} não possui PV suficiente (${totalHpAvailable}/${pvCost}) para realizar "${action.name}".`);
      return { costSpentNotice: "", spent: false };
    }

    let remainingHpCost = pvCost;
    if (currentTempHp > 0) {
      const spentFromTemp = Math.min(currentTempHp, remainingHpCost);
      updates["system.health.temp"] = currentTempHp - spentFromTemp;
      remainingHpCost -= spentFromTemp;
    }
    if (remainingHpCost > 0) {
      updates["system.health.value"] = Math.max(0, currentHp - remainingHpCost);
    }

    const newHp = updates["system.health.value"] ?? currentHp;
    const newTempHp = updates["system.health.temp"] ?? currentTempHp;
    const tempText = newTempHp > 0 ? ` + ${newTempHp} PVT` : "";
    notices.push(`-${pvCost} PV (${newHp}/${actor.system?.health?.max ?? '?'}${tempText})`);
  }

  if (Object.keys(updates).length > 0) {
    await actor.update(updates);
  }

  const costSpentNotice = notices.length > 0 
    ? `<div class="action-cost-notice">${notices.join(" | ")}</div>` 
    : "";

  return { costSpentNotice, spent: true };
}

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
    targetDefenseCards = targets.map(t => `
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
    `).join("");
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

/**
 * Gera o bloco HTML da seção de Dano da ação.
 * @param {object} action - Objeto de dados da Ação
 * @param {object} config - Configurações CONFIG.GAIA
 * @returns {string} HTML da seção de dano
 */
export function processActionDamageSection(action, config) {
  if (!action.damage?.hasDamage || !action.damage.formula) return "";

  const dmgTypeKey = action.damage.type || "physical";
  const dmgTypeLabel = config?.damageTypesFlat?.[dmgTypeKey] ? game.i18n.localize(config.damageTypesFlat[dmgTypeKey]) : dmgTypeKey;
  const critBonus = action.damage.criticalBonus ? ` + ${action.damage.criticalBonus}` : "";

  return `
    <div class="action-section-block action-damage-section">
      <div class="action-section-header">
        <strong class="action-section-title damage-title">
          Dano: ${action.damage.formula} ${dmgTypeLabel}
        </strong>
        <button type="button" class="btn-action-chat btn-roll-action-damage" data-action="rollActionDamage" data-formula="${action.damage.formula}" data-crit-formula="${action.damage.formula}${critBonus}" data-damage-type="${dmgTypeLabel}">
          Rolar Dano
        </button>
      </div>
    </div>
  `;
}

/**
 * Gera o bloco HTML da seção de Teste de Dificuldade / Resistência da ação.
 * @param {object} action - Objeto de dados da Ação
 * @param {object} config - Configurações CONFIG.GAIA
 * @returns {string} HTML da seção de teste
 */
export function processActionCheckSection(action, config) {
  if (!action.check?.hasCheck) return "";

  const checkAttr = action.check.attribute || "vigor";
  const attrLabel = config?.parameters?.[checkAttr] 
    ? game.i18n.localize(config.parameters[checkAttr]) 
    : (config?.knowledge?.[checkAttr] ? game.i18n.localize(config.knowledge[checkAttr]) : checkAttr);
  const dc = Number(action.check.difficulty ?? 10);

  return `
    <div class="action-section-block action-check-section">
      <div class="action-section-header">
        <div class="action-section-title check-title">
          Teste: ${attrLabel} (Dif. ${dc})
        </div>
        <button type="button" class="btn-action-chat btn-roll-action-check" data-action="rollActionCheck" data-stat="${checkAttr}" data-dc="${dc}" data-label="${attrLabel}">
          <i class="fa-solid fa-dice"></i> Rolar Teste
        </button>
      </div>
      ${action.check.onSuccess ? `<div class="action-check-outcome success"><div class="action-check-outcome-label">Sucesso:</div><div class="action-check-outcome-content"> ${action.check.onSuccess}</div></div>` : ""}
      ${action.check.onFailure ? `<div class="action-check-outcome failure"><div class="action-check-outcome-label">Falha:</div><div class="action-check-outcome-content"> ${action.check.onFailure}</div></div>` : ""}
    </div>
  `;
}

/**
 * Gera o bloco HTML da seção de Condição / Status da ação.
 * @param {object} action - Objeto de dados da Ação
 * @returns {string} HTML da seção de condição
 */
export function processActionConditionSection(action) {
  if (!action.condition?.hasCondition || !action.condition.status) return "";

  const dur = action.condition.duration ? ` (${action.condition.duration})` : "";

  return `
    <div class="action-section-block action-condition-section">
      <div class="action-section-header">
        <div class="action-section-title condition-title">
          Condição: ${action.condition.status}${dur}
        </div>
        <button type="button" class="btn-action-chat btn-apply-action-condition" data-action="applyActionCondition" data-status="${action.condition.status}" data-duration="${action.condition.duration || ''}">
           Aplicar
        </button>
      </div>
      ${action.condition.description ? `<div class="action-condition-desc">${action.condition.description}</div>` : ""}
    </div>
  `;
}

/**
 * Gera o bloco HTML da seção de Área de Efeito da ação.
 * @param {object} action - Objeto de dados da Ação
 * @returns {string} HTML da seção de área de efeito
 */
export function processActionAoESection(action) {
  if (!action.areaOfEffect?.hasArea) return "";

  const shape = action.areaOfEffect.shape || "circle";
  const size = action.areaOfEffect.size ?? 3;
  const unit = action.areaOfEffect.unit || "m";
  const targetDisposition = action.areaOfEffect.targetDisposition || "all";

  const shapeKeys = {
    circle: "GAIA.ActionDialog.ShapeCircle",
    cone: "GAIA.ActionDialog.ShapeCone",
    line: "GAIA.ActionDialog.ShapeLine",
    rectangle: "GAIA.ActionDialog.ShapeRectangle",
    rect: "GAIA.ActionDialog.ShapeRectangle",
    ellipse: "GAIA.ActionDialog.ShapeEllipse"
  };
  const shapeI18n = shapeKeys[shape];
  const shapeLabel = shapeI18n ? game.i18n.localize(shapeI18n) : shape;

  const dispositionKeys = {
    all: "GAIA.ActionDialog.TargetDispositionAll",
    hostile: "GAIA.ActionDialog.TargetDispositionHostile",
    friendly: "GAIA.ActionDialog.TargetDispositionFriendly"
  };
  const dispI18n = dispositionKeys[targetDisposition];
  const dispLabel = dispI18n ? game.i18n.localize(dispI18n) : "Todos";
  const limit = action.areaOfEffect.targetLimit ? ` • Limite: ${action.areaOfEffect.targetLimit}` : "";

  return `
    <div class="action-section-block action-aoe-section">
      <div class="action-section-header">
        <div class="action-section-title aoe-title">
          Área
          <div class="aoe-size">${size}${unit} (${shapeLabel})</div>
          <div class="aoe-targets">Alvos: ${dispLabel}${limit}</div>
        </div>
        <button type="button" class="btn-action-chat btn-place-action-template" data-action="placeActionTemplate" data-shape="${shape}" data-size="${size}" data-target-disposition="${targetDisposition}">
          Posicionar
        </button>
      </div>
    </div>
  `;
}

/**
 * Constrói as tags/badges visuais de identificação da Ação.
 * @param {object} action - Objeto de dados da Ação
 * @param {object} config - Configurações CONFIG.GAIA
 * @param {string} costSpentNotice - Notificação de PE gasto
 * @returns {string} HTML formatado das badges
 */
export function buildActionBadges(action, config, costSpentNotice = "") {
  const metaBadges = [];

  if (costSpentNotice) {
    metaBadges.push(costSpentNotice);
  }

  const actionTypeLabel = action.type?.actionType && config?.actionType?.[action.type.actionType]
    ? game.i18n.localize(config.actionType[action.type.actionType])
    : (action.type?.actionType || "");
  if (actionTypeLabel) {
    metaBadges.push(`<div class="action-badge-row"><span class="badge type-badge">${actionTypeLabel}</span>`);
  }

  const categoryLabel = action.type?.category && config?.abilitiesTypes?.[action.type.category]
    ? game.i18n.localize(config.abilitiesTypes[action.type.category])
    : (action.type?.category || "");
  if (categoryLabel) {
    metaBadges.push(`<span class="badge category-badge">${categoryLabel}</span></div>`);
  }

  if (metaBadges.length === 0) return "";
  return `<div class="action-badges">${metaBadges.join("")}</div>`;
}

/**
 * Constrói o HTML completo do card de chat para a Ação.
 * @param {object} params
 * @returns {string} HTML completo do chat card
 */
export function buildActionChatCardHtml({ action, item, badgesHtml, attackHtml, damageHtml, checkHtml, conditionHtml, aoeHtml }) {
  return `
    <div class="gaia-action-chat-card gaia-ability-chat-card">
      <div class="action-card-title-header">
        <span>${action.name || "Ação"}</span>
        ${item ? `<div class="action-item-parent"><i class="fa-solid fa-bookmark"></i> ${item.name}</div>` : ""}
      </div>
      ${badgesHtml}
      ${action.description ? `<p class="action-description-p">${action.description}</p>` : ""}
      ${attackHtml}
      ${damageHtml}
      ${checkHtml}
      ${conditionHtml}
      ${aoeHtml}
    </div>
  `;
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

/**
 * Aplica dano diretamente a um Ator ou Token e registra no Chat.
 * @param {Actor|TokenDocument|Token} target - Alvo do dano
 * @param {number} amount - Quantidade de dano a aplicar
 * @param {object} [options={}] - Opções adicionais (damageType, baseDamage, sendToChat)
 * @returns {Promise<ChatMessage|null>}
 */
export async function applyActionDamage(target, amount, options = {}) {
  const actor = target?.actor || target;
  if (!actor || typeof amount !== "number" || isNaN(amount)) return null;

  const currentHp = Number(actor.system?.health?.value ?? 0);
  const maxHp = Number(actor.system?.health?.max ?? 0);
  const newHp = Math.max(0, currentHp - amount);

  await actor.update({ "system.health.value": newHp });
  ui.notifications.info(`${actor.name} recebeu ${amount} de dano (PV: ${currentHp} -> ${newHp}/${maxHp}).`);

  // Se options.sendToChat !== false, gera o card informativo no Chat
  if (options.sendToChat !== false) {
    const rawType = options.damageType || "";
    const locKey = CONFIG.GAIA?.damageTypesFlat?.[rawType] ?? CONFIG.GAIA?.damageTypes?.[rawType] ?? rawType;
    const typeLabel = rawType ? (game.i18n.localize(locKey) || rawType) : "";
    const typeText = typeLabel ? ` (${typeLabel})` : "";
    const baseAmount = Number(options.baseDamage) || amount;
    const hasReductionOrMod = baseAmount !== amount && baseAmount > 0;
    const isKnockedOut = newHp === 0 && currentHp > 0;

    const damageCardHtml = `
      <div class="gaia-chat-card damage-applied-card">
        <div class="damage-applied-header">
          <div class="damage-applied-title">
            <i class="fa-solid fa-heart-crack"></i> Dano Aplicado
          </div>
          <span class="damage-applied-badge">
            ${typeLabel ? typeLabel.toUpperCase() : 'DANO'}
          </span>
        </div>
        <div class="damage-applied-target">
          ${actor.img ? `<img src="${actor.img}" class="damage-target-avatar" />` : ''}
          <div class="damage-target-info">
            <div class="damage-target-name">${actor.name}</div>
            <div class="damage-target-amount">
              Recebeu <strong class="damage-highlight">${amount}</strong> de dano${typeText}${hasReductionOrMod ? ` <span class="damage-base-info">(Base: ${baseAmount})</span>` : ''}
            </div>
          </div>
        </div>
        <div class="damage-applied-vitals">
          <span><strong>Pontos de Vida:</strong></span>
          <span>${currentHp} ➜ <strong class="damage-vitals-new ${newHp <= 0 ? 'damage-vitals-zero' : ''}">${newHp}</strong> / ${maxHp}</span>
        </div>
        ${isKnockedOut ? `<div class="damage-knockout-alert"><i class="fa-solid fa-skull"></i> 0 PV - Personagem Incapacitado!</div>` : ''}
      </div>
    `;

    return await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      content: damageCardHtml,
      style: CONST.CHAT_MESSAGE_STYLES?.OTHER ?? 0
    });
  }

  return null;
}

/**
 * Normaliza uma string de condição para busca e identificador de status do Foundry.
 * @param {string} str - Nome ou ID da condição
 * @returns {string} ID normalizado sem acentos
 */
export function normalizeStatusId(str) {
  if (!str) return "";
  return String(str)
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9_-]/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Aplica uma condição/status a um Ator ou Token e exibe o ícone correspondente sobre o Token na cena.
 * @param {Actor|TokenDocument|Token} target - Alvo
 * @param {string} statusName - Nome da condição
 * @param {string} [duration=""] - Duração descritiva
 * @returns {Promise<void>}
 */
export async function applyActionCondition(target, statusName, duration = "") {
  const actor = target?.actor || (target instanceof Actor ? target : null);
  if (!actor || !statusName) return;

  const rawName = String(statusName).trim();
  const normalizedId = normalizeStatusId(rawName);

  // 1. Busca a condição registrada oficial em GAIA.conditions ou CONFIG.statusEffects
  let registered = Object.values(CONFIG.GAIA?.conditions || {}).find(c => {
    const cId = normalizeStatusId(c.id);
    const cName = typeof c.name === "string" ? normalizeStatusId(game.i18n?.localize?.(c.name) || c.name) : "";
    return cId === normalizedId || cName === normalizedId;
  });

  if (!registered && Array.isArray(CONFIG.statusEffects)) {
    registered = CONFIG.statusEffects.find(c => {
      const cId = normalizeStatusId(c.id);
      const cName = typeof c.name === "string" ? normalizeStatusId(game.i18n?.localize?.(c.name) || c.name) : "";
      return cId === normalizedId || cName === normalizedId;
    });
  }

  const finalStatusId = registered?.id || normalizedId;
  const finalIcon = registered?.icon || "icons/svg/aura.svg";
  const finalLabel = registered ? (game.i18n?.localize?.(registered.name) || registered.name || rawName) : rawName;

  // Garante registro em CONFIG.GAIA.conditions e CONFIG.statusEffects para o HUD
  if (CONFIG.GAIA?.conditions && !CONFIG.GAIA.conditions[finalStatusId]) {
    const newCond = {
      id: finalStatusId,
      name: rawName,
      icon: finalIcon,
      description: duration ? `Duração: ${duration}` : ""
    };
    CONFIG.GAIA.conditions[finalStatusId] = newCond;
    if (Array.isArray(CONFIG.statusEffects) && !CONFIG.statusEffects.some(e => e.id === finalStatusId)) {
      CONFIG.statusEffects.push(newCond);
    }
  }

  // 2. Regra de Unicidade / Substituição: Remove qualquer efeito duplicado anterior
  const existingEffects = actor.effects.filter(e => {
    const n = normalizeStatusId(e.name || "");
    const statuses = Array.isArray(e.statuses) ? e.statuses : (e.statuses instanceof Set ? Array.from(e.statuses) : []);
    const hasStatus = statuses.some(s => normalizeStatusId(s) === finalStatusId || normalizeStatusId(s) === normalizedId);
    return n === normalizedId || hasStatus;
  });

  if (existingEffects.length > 0) {
    await actor.deleteEmbeddedDocuments("ActiveEffect", existingEffects.map(e => e.id));
  }

  // 3. Aplica a Condição usando toggleStatusEffect ou ActiveEffect
  if (typeof actor.toggleStatusEffect === "function" && CONFIG.statusEffects?.some(e => e.id === finalStatusId)) {
    await actor.toggleStatusEffect(finalStatusId, { active: true });
  } else {
    const effectData = {
      name: finalLabel,
      img: finalIcon,
      icon: finalIcon,
      statuses: [finalStatusId],
      description: duration ? `Duração: ${duration}` : ""
    };
    await actor.createEmbeddedDocuments("ActiveEffect", [effectData]);
  }

  // 4. Força atualização visual dos tokens do ator na cena atual
  const activeTokens = typeof actor.getActiveTokens === "function" ? actor.getActiveTokens() : [];
  for (const tok of activeTokens) {
    if (tok.drawEffects) tok.drawEffects();
  }

  ui.notifications?.info(`Condição "${finalLabel}" aplicada a ${actor.name}.`);
}

/**
 * Classe utilitária para prévia e posicionamento interativo de MeasuredTemplate no Canvas.
 */
/**
 * Filtra uma lista de tokens pela regra de disposição (todos, hostis, amigos).
 * @param {Token[]} tokens
 * @param {string} dispositionFilter
 * @param {Actor} [casterActor]
 * @returns {Token[]}
 */
export function filterTokensByDisposition(tokens, dispositionFilter = "all", casterActor = null) {
  if (!tokens || tokens.length === 0) return [];
  if (dispositionFilter === "all" || !dispositionFilter) return tokens;

  const casterToken = casterActor ? canvas.tokens.placeables.find(t => t.actor?.id === casterActor.id) : null;
  const casterDisp = casterToken?.document.disposition ?? (CONST.TOKEN_DISPOSITIONS?.FRIENDLY ?? 1);

  const filtered = tokens.filter(token => {
    const tokenDisp = token.document?.disposition ?? token.disposition;
    if (dispositionFilter === "hostile") {
      if (tokenDisp === (CONST.TOKEN_DISPOSITIONS?.HOSTILE ?? -1)) return true;
      if (casterToken && tokenDisp !== casterDisp && tokenDisp !== (CONST.TOKEN_DISPOSITIONS?.NEUTRAL ?? 0)) return true;
      return false;
    }
    if (dispositionFilter === "friendly") {
      if (tokenDisp === (CONST.TOKEN_DISPOSITIONS?.FRIENDLY ?? 1)) return true;
      if (casterToken && tokenDisp === casterDisp) return true;
      return false;
    }
    return true;
  });

  return filtered;
}

/**
 * Classe utilitária para prévia e posicionamento interativo de Área de Efeito no Canvas.
 * Utiliza overlay PIXI direto no canvas, compatível com a API nativa de Region (Foundry v12/v14+) e MeasuredTemplate (v11/v12/v13).
 */
export class GaiaAbilityTemplate extends PIXI.Container {
  constructor(data = {}) {
    super();
    this.data = {
      shape: data.shape || "circle",
      distance: Number(data.distance ?? 3),
      direction: Number(data.direction ?? 0),
      fillColor: data.fillColor || game.user?.color || "#942ce4",
      targetDisposition: data.targetDisposition || "all"
    };

    this.graphics = new PIXI.Graphics();
    this.addChild(this.graphics);
    this.x = 0;
    this.y = 0;
    this.eventMode = "none";
  }

  /**
   * Constrói a instância da prévia a partir dos dados do template.
   * @param {object} templateData
   * @returns {GaiaAbilityTemplate}
   */
  static fromData(templateData) {
    return new this(templateData);
  }

  /**
   * Redesenha a forma geométrica da área (círculo, cone, linha ou retângulo) na prévia.
   */
  refresh() {
    this.graphics.clear();
    const gridDistance = canvas.scene?.grid?.distance || 1;
    const gridPixels = canvas.scene?.grid?.size || 100;
    const radiusPixels = (this.data.distance / gridDistance) * gridPixels;

    // Converte cor hexadecimal de forma segura e resiliente
    let color = 0x942ce4;
    try {
      if (typeof foundry !== "undefined" && foundry.utils?.Color) {
        color = foundry.utils.Color.from(this.data.fillColor || "#942ce4").valueOf();
      } else if (typeof Color !== "undefined" && Color.from) {
        const c = Color.from(this.data.fillColor || "#942ce4");
        color = typeof c.valueOf === "function" ? c.valueOf() : (c.numeric ?? Number(c));
      } else {
        color = parseInt(String(this.data.fillColor || "942ce4").replace("#", ""), 16) || 0x942ce4;
      }
    } catch {
      color = 0x942ce4;
    }

    this.graphics.lineStyle(2, color, 0.85);
    this.graphics.beginFill(color, 0.25);

    const toRad = (deg) => (deg * Math.PI) / 180;

    if (this.data.shape === "cone") {
      const angle = Math.PI / 3; // 60 graus
      const rad = toRad(this.data.direction - 90);
      const startAngle = rad - angle / 2;
      const endAngle = rad + angle / 2;
      this.graphics.moveTo(0, 0);
      this.graphics.arc(0, 0, radiusPixels, startAngle, endAngle);
      this.graphics.lineTo(0, 0);
    } else if (this.data.shape === "line" || this.data.shape === "ray") {
      const rad = toRad(this.data.direction);
      const endX = Math.cos(rad) * radiusPixels;
      const endY = Math.sin(rad) * radiusPixels;
      this.graphics.lineStyle(4, color, 0.9);
      this.graphics.moveTo(0, 0);
      this.graphics.lineTo(endX, endY);
    } else if (this.data.shape === "rectangle" || this.data.shape === "square" || this.data.shape === "box") {
      this.graphics.drawRect(-radiusPixels, -radiusPixels, radiusPixels * 2, radiusPixels * 2);
    } else {
      // Circle padrão
      this.graphics.drawCircle(0, 0, radiusPixels);
    }

    this.graphics.endFill();
  }

  /**
   * Desenha a prévia do template e rastreia o cursor até o clique para posicionar na cena.
   * @returns {Promise<Document|null>}
   */
  async drawPreview() {
    const initialLayer = canvas.activeLayer;

    this.refresh();
    canvas.stage.addChild(this);

    return this.activatePreviewListeners(initialLayer);
  }

  /**
   * Ativa ouvintes de eventos para mover, rotacionar (scroll) e posicionar (clique).
   * @param {CanvasLayer} initialLayer
   * @returns {Promise<Document|null>}
   */
  activatePreviewListeners(initialLayer) {
    return new Promise((resolve) => {
      const handlers = {};
      let moveTime = 0;
      const viewEl = canvas.app?.canvas || canvas.app?.view || window;

      // 1. Move a prévia com o cursor
      handlers.mm = (event) => {
        const now = Date.now();
        if (now - moveTime <= 16) return;
        moveTime = now;

        let pos = null;
        if (event?.global) {
          pos = canvas.stage.toLocal(event.global);
        } else if (event?.data?.getLocalPosition) {
          pos = event.data.getLocalPosition(canvas.stage);
        }
        if (!pos || isNaN(pos.x)) pos = canvas.mousePosition;
        if (!pos) return;

        const snapped = canvas.grid?.getSnappedPoint ? canvas.grid.getSnappedPoint(pos, { mode: CONST.GRID_SNAPPING_MODES?.CENTER ?? 1 }) : pos;
        this.x = snapped.x;
        this.y = snapped.y;
      };

      const cleanup = () => {
        canvas.stage.off("pointermove", handlers.mm);
        canvas.stage.off("mousemove", handlers.mm);
        canvas.stage.off("pointerdown", handlers.pd);
        canvas.stage.off("mousedown", handlers.pd);

        if (viewEl && viewEl.removeEventListener) {
          viewEl.removeEventListener("contextmenu", handlers.rc);
          viewEl.removeEventListener("wheel", handlers.mw);
        }

        canvas.regions?.releaseAll?.();
        initialLayer?.activate?.();
        if (!this.destroyed) this.destroy({ children: true });
      };

      // 2. Confirma o posicionamento (Clique Esquerdo)
      handlers.lc = async (event) => {
        let pos = null;
        if (event?.global) {
          pos = canvas.stage.toLocal(event.global);
        } else if (event?.data?.getLocalPosition) {
          pos = event.data.getLocalPosition(canvas.stage);
        }
        if (!pos || isNaN(pos.x)) pos = canvas.mousePosition;
        const snapped = pos && canvas.grid?.getSnappedPoint ? canvas.grid.getSnappedPoint(pos, { mode: CONST.GRID_SNAPPING_MODES?.CENTER ?? 1 }) : (pos || { x: this.x, y: this.y });

        cleanup();

        const gridDistance = canvas.scene?.grid?.distance || 1;
        const gridPixels = canvas.scene?.grid?.size || 100;
        const radiusPixels = (this.data.distance / gridDistance) * gridPixels;

        let createdDoc = null;
        const isV14Plus = (game.release?.generation ?? 12) >= 14;

        if (isV14Plus && CONFIG.Region && canvas.regions && canvas.scene.createEmbeddedDocuments) {
          // Foundry v14+: Criação nativa de Região de cena
          let shapeData = { type: "circle", x: snapped.x, y: snapped.y, radius: radiusPixels };
          if (this.data.shape === "rectangle" || this.data.shape === "square" || this.data.shape === "box") {
            shapeData = { type: "rectangle", x: snapped.x, y: snapped.y, width: radiusPixels * 2, height: radiusPixels * 2 };
          }

          const [created] = await canvas.scene.createEmbeddedDocuments("Region", [{
            name: "Área de Efeito",
            color: this.data.fillColor || "#942ce4",
            visibility: CONST.REGION_VISIBILITY?.ALWAYS ?? 0,
            displayMeasurements: true,
            shapes: [shapeData]
          }]);
          createdDoc = created;
        } else {
          // Foundry v11 / v12 / v13: MeasuredTemplate padrão
          let tType = "circle";
          if (this.data.shape === "cone") tType = "cone";
          else if (this.data.shape === "line" || this.data.shape === "ray") tType = "ray";
          else if (this.data.shape === "rectangle" || this.data.shape === "square" || this.data.shape === "box") tType = "rect";

          const templateData = {
            t: tType,
            user: game.user.id,
            distance: this.data.distance,
            direction: this.data.direction,
            x: snapped.x,
            y: snapped.y,
            fillColor: this.data.fillColor || "#942ce4"
          };

          const [created] = await canvas.scene.createEmbeddedDocuments("MeasuredTemplate", [templateData]);
          createdDoc = created;
        }

        resolve(createdDoc || null);
      };

      // 3. Cancela o posicionamento (Clique Direito ou Esc)
      handlers.rc = (event) => {
        if (event) {
          event.preventDefault?.();
          event.stopPropagation?.();
        }
        cleanup();
        resolve(null);
      };

      // 4. Despachante de clique (Ponteiro)
      handlers.pd = (event) => {
        if (event?.button === 2) {
          handlers.rc(event);
        } else if (event?.button === 0 || event?.button === undefined) {
          handlers.lc(event);
        }
      };

      // 5. Rotaciona o template com o Scroll do mouse (para cone / ray)
      handlers.mw = (event) => {
        if (event.ctrlKey || event.altKey) return;
        event.preventDefault();
        event.stopPropagation();
        const delta = canvas.grid?.type > (CONST.GRID_TYPES?.GRIDLESS ?? 0) ? 15 : 5;
        const snap = event.shiftKey ? delta : delta * 2;
        this.data.direction = (this.data.direction + (event.deltaY > 0 ? snap : -snap)) % 360;
        this.refresh();
      };

      // Registra os ouvintes no canvas
      canvas.stage.on("pointermove", handlers.mm);
      canvas.stage.on("pointerdown", handlers.pd);

      if (viewEl && viewEl.addEventListener) {
        viewEl.addEventListener("contextmenu", handlers.rc);
        viewEl.addEventListener("wheel", handlers.mw, { passive: false });
      }
    });
  }
}

/**
 * Retorna os tokens da cena atual que estão contidos na forma geométrica do template de área,
 * aplicando o filtro de disposição (todos, hostis, amigos).
 * @param {MeasuredTemplate|Region|RegionDocument} placedObject - Objeto de template ou região do canvas
 * @param {string} dispositionFilter - "all" | "hostile" | "friendly"
 * @param {Actor} [casterActor] - Ator conjurador (para determinar lealdade relativa)
 * @param {object} [shapeData] - Dados de formato e raio
 * @returns {Token[]}
 */
export function getTokensWithinAoETemplate(placedObject, dispositionFilter = "all", casterActor = null, shapeData = null) {
  if (!canvas.scene || !canvas.tokens || !placedObject) return [];

  const doc = placedObject?.document || placedObject;

  // 1. Suporte a Coleção Nativa Region.tokens (Foundry v12/v14+)
  const regionTokensSet = placedObject?.tokens ?? doc?.tokens;
  if (regionTokensSet && regionTokensSet.size > 0) {
    const regionTokens = Array.from(regionTokensSet)
      .map(td => td.object || canvas.tokens.get(td.id || td._id))
      .filter(t => Boolean(t && !t.document?.hidden && t.actor));
    if (regionTokens.length > 0) {
      return filterTokensByDisposition(regionTokens, dispositionFilter, casterActor);
    }
  }

  // 2. Suporte a Formas de Região (RegionDocument.shapes)
  const shapes = doc?.shapes || placedObject?.shapes || [];
  if (shapes.length > 0) {
    const tokens = canvas.tokens.placeables.filter(t => !t.document.hidden && t.actor);
    const containedTokens = tokens.filter(token => {
      const center = token.center;
      return shapes.some(shape => {
        const shapeType = shape.type || "circle";
        if (shapeType === "circle") {
          const dist = Math.hypot(center.x - shape.x, center.y - shape.y);
          return dist <= shape.radius;
        }
        if (shapeType === "rectangle") {
          const width = shape.width ?? (shape.radius ? shape.radius * 2 : 200);
          const height = shape.height ?? (shape.radius ? shape.radius * 2 : 200);
          const halfW = width / 2;
          const halfH = height / 2;
          return center.x >= (shape.x - halfW) && center.x <= (shape.x + halfW) &&
                 center.y >= (shape.y - halfH) && center.y <= (shape.y + halfH);
        }
        if (shapeType === "polygon" && Array.isArray(shape.points)) {
          const poly = new PIXI.Polygon(shape.points);
          return poly.contains(center.x, center.y);
        }
        return false;
      });
    });
    return filterTokensByDisposition(containedTokens, dispositionFilter, casterActor);
  }

  // 3. Suporte a MeasuredTemplate com PIXI.Polygon / PIXI.Circle Shape
  if (placedObject?.shape) {
    const templatePos = {
      x: placedObject.document?.x ?? placedObject.x ?? 0,
      y: placedObject.document?.y ?? placedObject.y ?? 0
    };
    const tokens = canvas.tokens.placeables.filter(t => !t.document.hidden && t.actor);
    const containedTokens = tokens.filter(token => {
      const center = token.center;
      const localPoint = {
        x: center.x - templatePos.x,
        y: center.y - templatePos.y
      };
      return placedObject.shape.contains(localPoint.x, localPoint.y);
    });
    return filterTokensByDisposition(containedTokens, dispositionFilter, casterActor);
  }

  // 4. Fallback Geral (Cálculo geométrico com base em distâncias e coordenadas globais)
  const firstShape = shapes[0];
  const posX = firstShape?.x ?? doc?.x ?? placedObject?.x ?? 0;
  const posY = firstShape?.y ?? doc?.y ?? placedObject?.y ?? 0;
  const gridDistance = canvas.scene.grid.distance || 1;
  const gridPixels = canvas.scene.grid.size || 100;
  const distMeters = shapeData?.distance || placedObject.distance || 3;
  const radiusPixels = firstShape?.radius ?? ((distMeters / gridDistance) * gridPixels);

  const tokens = canvas.tokens.placeables.filter(t => !t.document.hidden && t.actor);
  const containedTokens = tokens.filter(token => {
    const center = token.center;
    const dx = center.x - posX;
    const dy = center.y - posY;
    return Math.hypot(dx, dy) <= radiusPixels;
  });

  return filterTokensByDisposition(containedTokens, dispositionFilter, casterActor);
}

/**
 * Cria e posiciona um Template / Região na cena correspondente à área da ação.
 * @param {object} aoeData - Dados de areaOfEffect (shape, size, unit, targetDisposition)
 * @param {Actor} [casterActor] - Ator conjurador
 * @returns {Promise<Document|null>}
 */
export async function placeActionAoETemplate(aoeData, casterActor = null) {
  if (!canvas.scene || !aoeData) return null;
  const shape = aoeData.shape || "circle";
  const distance = Number(aoeData.size ?? 3);
  const targetDisposition = aoeData.targetDisposition || "all";

  const template = GaiaAbilityTemplate.fromData({
    shape,
    distance,
    targetDisposition,
    fillColor: game.user?.color || "#942ce4"
  });
  if (!template) return null;

  const placedDoc = await template.drawPreview();
  if (!placedDoc) return null;

  // Auto-seleciona os alvos contidos na área conforme regra de disposição
  const isV14Plus = (game.release?.generation ?? 12) >= 14;
  const placedObject = (isV14Plus && canvas.regions?.get(placedDoc.id)) || canvas.templates?.get(placedDoc.id) || placedDoc;

  if (placedObject) {
    const targets = getTokensWithinAoETemplate(placedObject, targetDisposition, casterActor, { distance, shape });
    if (targets.length > 0) {
      // Marca visualmente no canvas com o retículo de mira (equivalente à tecla 'T')
      targets.forEach((token, idx) => {
        if (typeof token.setTarget === "function") {
          token.setTarget(true, {
            user: game.user,
            releaseOthers: idx === 0,
            groupSelection: true
          });
        }
      });

      // Sincroniza alvos do usuário no Foundry
      game.user.updateTokenTargets(targets.map(t => t.id));

      const dispLabels = {
        all: "Todos",
        hostile: "Hostis/Inimigos",
        friendly: "Aliados"
      };
      const label = dispLabels[targetDisposition] || "Todos";
      ui.notifications?.info(`Área de Efeito: ${targets.length} alvo(s) [${label}] marcado(s)!`);
    } else {
      ui.notifications?.info("Área de Efeito posicionada (nenhum alvo correspondente encontrado dentro da área).");
    }
  }

  return placedDoc;
}

/**
 * Registra todos os ouvintes interativos nos cards de chat de Ação.
 * @param {HTMLElement|JQuery} html - Elemento do chat
 * @param {ChatMessage} message - Mensagem do chat
 */
export function registerActionChatListeners(html, message) {
  const rootEl = html.jquery ? html[0] : html;
  if (!rootEl) return;

  // 1. Rolar Dano da Ação
  rootEl.querySelectorAll("[data-action='rollActionDamage']").forEach(btn => {
    btn.addEventListener("click", async (ev) => {
      ev.preventDefault();
      const formula = btn.dataset.formula || "1d6";
      const dmgType = btn.dataset.damageType || "Físico";

      const speaker = ChatMessage.getSpeaker();
      let speakerActor = null;
      if (speaker.token && canvas?.tokens) {
        speakerActor = canvas.tokens.get(speaker.token)?.actor;
      }
      if (!speakerActor && speaker.actor) {
        speakerActor = game.actors.get(speaker.actor);
      }

      let damageTotal = roll.total;
      let weakenedNotice = "";
      if (speakerActor?.system?.hasWeakened) {
        damageTotal = Math.floor(damageTotal / 2);
        weakenedNotice = ` <span style="font-size: 11px; color: var(--gaia-gold-accent, #c9a34b); font-style: italic;">(Enfraquecido: ${roll.total} &rarr; ${damageTotal})</span>`;
      }

      const targets = getTargetedTokens(null, { fallbackToSelected: true });
      let applyButtons = "";
      if (targets.length > 0) {
        applyButtons = `
          <div class="action-damage-targets-block">
            ${targets.map(t => `
              <div class="action-damage-target-row">
                <span>${t.name}</span>
                <button type="button" class="btn-apply-damage-target" data-action="applyActionDamageDirect" data-target-token-id="${t.id}" data-amount="${damageTotal}">
                  Aplicar ${damageTotal} Dano
                </button>
              </div>
            `).join("")}
          </div>
        `;
      }

      const flavor = `<strong>Dano (${dmgType})</strong>${weakenedNotice}${applyButtons}`;

      await roll.toMessage({
        speaker,
        flavor
      });
    });
  });

  // 2. Aplicar Dano Direto a Alvo Específico
  rootEl.querySelectorAll("[data-action='applyActionDamageDirect']").forEach(btn => {
    btn.addEventListener("click", async (ev) => {
      ev.preventDefault();
      const tokenId = btn.dataset.targetTokenId;
      const amount = Number(btn.dataset.amount ?? 0);
      const token = canvas.tokens?.get(tokenId);
      if (!token || !token.actor) return;

      await applyActionDamage(token.actor, amount);
      btn.disabled = true;
      btn.innerText = "Dano Aplicado";
    });
  });

  // 3. Fazer Teste de Resistência (Individual por Alvo ou em Lote)
  rootEl.querySelectorAll("[data-action='rollTargetCheck'], [data-action='rollActionCheck']").forEach(btn => {
    btn.addEventListener("click", async (ev) => {
      ev.preventDefault();
      const tokenId = btn.dataset.targetTokenId;
      const statKey = btn.dataset.statKey || btn.dataset.stat || "vigor";
      const statCategory = btn.dataset.statCategory || (btn.dataset.stat ? "parameter" : "auto");
      const dc = Number(btn.dataset.dc ?? 10);
      let statLabel = btn.dataset.label || null;

      let actorsToRoll = [];
      if (tokenId) {
        // Alvo individual da linha da tabela de ataque
        const token = canvas.tokens?.get(tokenId);
        if (token?.actor) actorsToRoll = [token.actor];
        else {
          ui.notifications?.warn("Token alvo não encontrado na cena.");
          return;
        }
      } else {
        // Alvos alvejados (Targets com 'T'), selecionados, ou o usuário ativo
        const targets = getTargetedTokens(null, { fallbackToSelected: true });
        actorsToRoll = targets.map(t => t.actor).filter(Boolean);
        if (actorsToRoll.length === 0) {
          const userActor = game.user.character || (message.speaker?.actor ? game.actors.get(message.speaker.actor) : null);
          if (userActor) actorsToRoll = [userActor];
        }
      }

      if (actorsToRoll.length === 0) {
        ui.notifications?.warn("Selecione ou mire em pelo menos um token para realizar o teste de resistência.");
        return;
      }

      const renderTpl = foundry.applications?.handlebars?.renderTemplate || globalThis.renderTemplate;

      for (const actor of actorsToRoll) {
        let paramObj = null;
        let label = statLabel;

        switch (statCategory) {
          case "parameter":
            paramObj = actor.system.parameters?.[statKey] || { value: Number(actor.system.parameters?.[statKey]?.value ?? 0) };
            if (!label) label = CONFIG.GAIA?.parameters?.[statKey] ? game.i18n.localize(CONFIG.GAIA.parameters[statKey]) : statKey;
            break;
          case "knowledge":
            paramObj = actor.system.knowledge?.[statKey] || { value: Number(actor.system.knowledge?.[statKey]?.value ?? 0) };
            if (!label) label = CONFIG.GAIA?.knowledge?.[statKey] ? game.i18n.localize(CONFIG.GAIA.knowledge[statKey]) : statKey;
            break;
          case "defense":
            const mod = Number(actor.system.defesas?.[statKey]?.total ?? actor.system.defesas?.[statKey]?.value ?? 0);
            paramObj = { value: mod };
            if (!label) label = statKey.toUpperCase();
            break;
          default:
            paramObj = actor.system.parameters?.[statKey] 
              || actor.system.knowledge?.[statKey] 
              || { value: Number(actor.system.parameters?.[statKey]?.value ?? actor.system.knowledge?.[statKey]?.value ?? 0) };
            if (!label) {
              label = CONFIG.GAIA?.parameters?.[statKey] 
                ? game.i18n.localize(CONFIG.GAIA.parameters[statKey]) 
                : (CONFIG.GAIA?.knowledge?.[statKey] ? game.i18n.localize(CONFIG.GAIA.knowledge[statKey]) : statKey);
            }
            break;
        }

        const isParam = statCategory === "parameter" || Boolean(CONFIG.GAIA?.parameters?.[statKey]);
        const checkExhaustion = isParam ? (Number(actor.system?.exhaustion) || 0) : 0;
        const roll = await flowParameter(paramObj, "standard", 0, checkExhaustion);
        const check = flowDifficultyCheck(roll, dc);

        const outcomeClass = check.success ? "outcome-success" : "outcome-failure";
        const outcomeTitle = check.success ? `PASSOU no Teste de ${label}!` : `FALHOU no Teste de ${label}!`;

        const flavor = await renderTpl("systems/gaia-preludio/templates/chat/outcome-card.hbs", {
          actor,
          outcomeClass,
          outcomeTitle,
          formula: roll.formula,
          total: roll.total,
          dc
        });

        await roll.toMessage({
          speaker: ChatMessage.getSpeaker({ actor }),
          flavor
        });
      }
    });
  });

  // 4. Aplicar Condição da Ação
  rootEl.querySelectorAll("[data-action='applyActionCondition']").forEach(btn => {
    btn.addEventListener("click", async (ev) => {
      ev.preventDefault();
      const statusName = btn.dataset.status;
      const duration = btn.dataset.duration || "";
      const targets = getTargetedTokens(null, { fallbackToSelected: true });
      if (targets.length === 0) {
        ui.notifications?.warn("Selecione ou mire em pelo menos um alvo para aplicar a condição.");
        return;
      }
      for (const t of targets) {
        if (t.actor) await applyActionCondition(t.actor, statusName, duration);
      }
    });
  });

  // 5. Posicionar Template de Área da Ação
  rootEl.querySelectorAll("[data-action='placeActionTemplate']").forEach(btn => {
    btn.addEventListener("click", async (ev) => {
      ev.preventDefault();
      const shape = btn.dataset.shape || "circle";
      const size = Number(btn.dataset.size ?? 3);
      const targetDisposition = btn.dataset.targetDisposition || "all";
      const actorId = message.speaker?.actor;
      const casterActor = actorId ? game.actors.get(actorId) : null;
      await placeActionAoETemplate({ shape, size, targetDisposition }, casterActor);
    });
  });

  // 6. Rolar Ação a partir do Card de Habilidade/Item no Chat
  rootEl.querySelectorAll("[data-action='rollItemAction']").forEach(btn => {
    btn.addEventListener("click", async (ev) => {
      ev.preventDefault();
      const itemUuid = btn.dataset.itemUuid;
      const itemId = btn.dataset.itemId;
      const actionId = btn.dataset.actionId;
      const actionIndex = Number(btn.dataset.actionIndex);

      let item = null;
      if (itemUuid) {
        try {
          item = await fromUuid(itemUuid);
        } catch (e) {
          item = null;
        }
      }

      const actorId = message.speaker?.actor;
      const tokenId = message.speaker?.token;
      let actor = null;
      if (tokenId && canvas?.tokens) {
        actor = canvas.tokens.get(tokenId)?.actor;
      }
      if (!actor && actorId) {
        actor = game.actors.get(actorId);
      }

      if (!item && actor && itemId) {
        item = actor.items.get(itemId);
      }

      if (!item && itemId) {
        item = game.items.get(itemId);
      }

      if (!item && itemId) {
        for (const act of game.actors) {
          const found = act.items.get(itemId);
          if (found) {
            item = found;
            if (!actor) actor = act;
            break;
          }
        }
      }

      if (!item) {
        ui.notifications?.warn("Item não encontrado.");
        return;
      }

      let act = (item.system.actions || []).find(a => a.id === actionId);
      if (!act && !isNaN(actionIndex)) {
        act = item.system.actions?.[actionIndex];
      }
      if (!act) {
        ui.notifications?.warn("Ação não encontrada no item.");
        return;
      }

      const finalActor = item.actor || actor || (game.user.character ?? null);
      await executeAction(act, { actor: finalActor, item });
    });
  });
}
