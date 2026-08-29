/**
 * ==============================================================================
 * GAIA: PRELÚDIO - ACTION CARD BUILDER / CONSTRUTOR DE CARDS DE AÇÃO
 * ==============================================================================
 * PT: Construção de blocos HTML, badges, seções de dano, testes e cards para o Chat.
 * EN: Construction of HTML blocks, badges, damage sections, checks, and Chat cards.
 */

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
