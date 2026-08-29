/**
 * ==============================================================================
 * GAIA ITEM DOCUMENT / DOCUMENTO DE ITEM GAIA
 * ==============================================================================
 * PT: Extensão da classe base Item para o sistema Gaia: Prelúdio.
 * EN: Extension of the base Item class for the Gaia: Prelúdio system.
 *
 * @extends {Item}
 */
export class GaiaItem extends Item {

  /**
   * PT: Prepara dados derivados do item.
   * EN: Prepares derived item data.
   * @override
   */
  prepareDerivedData() {
    super.prepareDerivedData();
  }

  /**
   * PT: Retorna os dados para fórmulas de rolagem que envolvem este item.
   *     Herda o contexto do ator pai (se o item estiver em um ator) e adiciona os dados do item.
   * EN: Returns data for roll formulas involving this item.
   *     Inherits parent actor context (if item belongs to an actor) and includes item data.
   * @override
   * @returns {Record<string, any>}
   */
  getRollData() {
    /** @type {Record<string, any>} */
    const rollData = {
      ...(this.actor ? this.actor.getRollData() : {}),
      item: { ...this.system }
    };
    return rollData;
  }

  /**
   * PT: Executa uma exibição ou rolagem básica para este item no chat.
   * EN: Executes a basic display or roll for this item in chat.
   * @param {Record<string, any>} [options] - PT: Opções adicionais de mensagem / EN: Additional message options.
   * @returns {Promise<ChatMessage|void>}
   */
  async roll(options = {}) {
    const speaker = ChatMessage.getSpeaker({ actor: this.actor ?? undefined });
    /** @type {any} */
    const system = this.system;

    let content = "";

    if (this.type === "ability" || this.type === "feature") {
      const config = /** @type {any} */ (CONFIG).GAIA;
      const cost = system.cost || "";
      const actionLabel = config?.actionType?.[system.typeAction] ? game.i18n.localize(config.actionType[system.typeAction]) : (system.typeAction || "");
      const categoryDict = this.type === "feature" ? (config?.featureCategories || {}) : (config?.abilityCategories || {});
      const categoryLabel = categoryDict[system.category] ? game.i18n.localize(categoryDict[system.category]) : (system.category || "");
      const rawTypes = Array.isArray(system.types) && system.types.length > 0
        ? system.types
        : (system.type ? [system.type] : [""]);
      const localizedTypes = rawTypes.map(t => config?.abilitiesTypes?.[t] ? game.i18n.localize(config.abilitiesTypes[t]) : t).filter(Boolean);
      const firstType = localizedTypes[0] || "";
      const additionalTypes = localizedTypes.slice(1).join(" / ");
      const additionalTypesHTML = localizedTypes.length > 1 ? `${additionalTypes}` : "";
      const metaParts = [cost, actionLabel, categoryLabel, firstType].filter(Boolean);
      const metaRow1 = metaParts.join(" | ");
      const quote = system.quote ? `<div class="ability-quote"><em>${system.quote}</em></div>` : "";
      const requirement = system.requirement ? `<div><strong>Requerimento:</strong> ${system.requirement}</div>` : "";
      const target = system.numberTarget ? `<div><strong>Alvo:</strong> ${system.numberTarget}</div>` : "";
      const range = system.range ? `<div><strong>Alcance:</strong> ${system.range}</div>` : "";

      let actionsHTML = "";
      if (Array.isArray(system.actions) && system.actions.length > 0) {
        actionsHTML = `
          <div class="ability-actions-section">
            <div class="ability-actions-title">• AÇÕES •</div>
            ${system.actions.map((act, idx) => `
              <div class="ability-action-item">
                <div class="ability-action-header-row">
                  <div class="ability-action-info">
                    <span class="ability-action-name">${act.name || "Ação"}</span>
                    ${act.cost ? `<span class="badge cost-badge">${act.cost}</span>` : ""}
                  </div>
                  <button type="button" class="btn-roll-ability-action" data-action="rollItemAction" data-item-uuid="${this.uuid}" data-item-id="${this.id}" data-action-id="${act.id || ''}" data-action-index="${idx}" title="Rolar ${act.name || 'Ação'}">
                    <i class="fa-solid fa-dice-d20"></i>
                  </button>
                </div>
                ${act.description ? `<div class="ability-action-desc">${act.description}</div>` : ""}
              </div>
            `).join("")}
          </div>
        `;
      }

      let subEffectsHTML = "";
      if (Array.isArray(system.subEffects) && system.subEffects.length > 0) {
        subEffectsHTML = system.subEffects.map(sub => `
          <div class="subeffect-chat-block">
            <div style="font-weight:bold; color:var(-gaia-purple); text-transform:uppercase;">${sub.name || ""} ${sub.cost ? `<span style="float:right;">${sub.cost}</span>` : ""}</div>
            <div style="border-top:1px solid #1a1a3a; margin:4px 0;"></div>
            <div>${sub.description || ""}</div>
            ${sub.note ? `<div style="font-size:12px; color:#4a2c82; font-weight:600; margin-top:2px;">${sub.note}</div>` : ""}
          </div>
        `).join("");
      }

      let improvementsHTML = "";
      const activeImps = Array.isArray(system.improvements)
        ? system.improvements.filter(imp => typeof imp === "object" ? Boolean(imp.active) : false)
        : [];
      if (activeImps.length > 0) {
        const list = activeImps.map((imp, idx) => {
          const letter = String.fromCharCode(65 + (idx % 26));
          const title = imp.title || "";
          const desc = imp.description || "";
          return `<div class="improvement-chat-item"><strong>${letter}) ${title}:</strong> ${desc}</div>`;
        }).join("");
        improvementsHTML = `
          <div class="improvements-chat-section">
            <div class="improvements-chat-title">• APRIMORAMENTOS •</div>
            ${list}
          </div>
        `;
      }

      content = `
        <div class="gaia-ability-chat-card">
          <div class="ability-name">${this.name}</div>
          <div class="ability-meta-bar">
            <div class="meta-row-1">${metaRow1}</div>
            ${additionalTypesHTML}
          </div>
          ${quote}
          <div class="ability-body">
            ${system.description ? `<p>${system.description}</p>` : ""}
            ${requirement}
            ${target}
            ${range}
          </div>
          ${actionsHTML}
          ${subEffectsHTML}
          ${improvementsHTML}
        </div>
      `;
    } else if (this.type === "weapon" || system.category === "weapon") {
      const config = /** @type {any} */ (CONFIG).GAIA;

      // Formatação do Dano
      let damageText = "-";
      if (system.damageType) {
        if (typeof system.damageType === "object") {
          const dVal = system.damageType.value ?? "";
          const rawType = system.damageType.type ?? "";
          const locKey = config?.damageTypesFlat?.[rawType] ?? config?.damageTypes?.[rawType] ?? rawType;
          const dType = rawType ? (game.i18n.localize(locKey) || rawType) : "";
          damageText = dVal !== "" && dType ? `${dVal} ${dType}` : (dVal || dType || "-");
        } else {
          damageText = String(system.damageType);
        }
      }

      // Formatação do Alcance
      let rangeText = "-";
      if (system.range) {
        if (typeof system.range === "object") {
          const rVal = system.range.value ?? "";
          rangeText = rVal !== "" && rVal !== null ? String(rVal) : "-";
        } else {
          rangeText = String(system.range);
        }
      }

      // Parâmetro de Ataque
      const attrKey = String(system.attackParameter?.attribute || "precision").toLowerCase();
      const rawParam = config?.parameters?.[attrKey] ?? attrKey;
      const paramLabel = typeof rawParam === "string" ? game.i18n.localize(rawParam) : attrKey;

      const description = system.description ? `<p style="margin-top: 6px; text-align: left; font-size: 0.95em;">${system.description}</p>` : "";

      let actionsHTML = "";
      if (Array.isArray(system.actions) && system.actions.length > 0) {
        actionsHTML = `
          <div class="ability-actions-section" style="margin-top: 8px;">
            <div class="ability-actions-title">• AÇÕES •</div>
            ${system.actions.map((act, idx) => `
              <div class="ability-action-item">
                <div class="ability-action-header-row">
                  <div class="ability-action-info">
                    <span class="ability-action-name">${act.name || "Ação"}</span>
                    ${act.cost ? `<span class="badge cost-badge">${act.cost}</span>` : ""}
                  </div>
                  <button type="button" class="btn-roll-ability-action" data-action="rollItemAction" data-item-uuid="${this.uuid}" data-item-id="${this.id}" data-action-id="${act.id || ''}" data-action-index="${idx}" title="Rolar ${act.name || 'Ação'}">
                    <i class="fa-solid fa-dice-d20"></i>
                  </button>
                </div>
                ${act.description ? `<div class="ability-action-desc">${act.description}</div>` : ""}
              </div>
            `).join("")}
          </div>
        `;
      }

      content = `
        <div class="gaia-weapon-chat-card" style="padding: 6px;">
          <h3 style="margin: 0 0 6px 0; font-family: var(--gaia-font-medieval, 'Cinzel', Georgia, serif); font-size: 1.1em; color: var(--gaia-text-parchment, #000); border-bottom: 1px solid var(--gaia-border-gold, #8c7355); padding-bottom: 4px; display: flex; align-items: center; gap: 8px;">
            <img src="${this.img}" style="width: 28px; height: 28px; object-fit: cover; border: 1px solid var(--gaia-border-frame, #574c43); border-radius: var(--gaia-radius);" />
            <span>${this.name}</span>
          </h3>
          <div class="weapon-meta-bar" style="font-size: 0.9em; font-weight: bold; text-align: center; margin-bottom: 6px;">
            <span><strong>Parâmetro:</strong> ${paramLabel}</span> | 
            <span><strong>Alcance:</strong> ${rangeText}</span>
          </div>
          ${description}
          <div class="dice-roll">
            <div class="dice-result">
              <div class="dice-total">${damageText}</div>
            </div>
          </div>
          ${actionsHTML}
        </div>
      `;
    } else {
      const description = system?.description || "";
      let actionsHTML = "";
      if (Array.isArray(system?.actions) && system.actions.length > 0) {
        actionsHTML = `
          <div class="ability-actions-section" style="margin-top: 8px;">
            <div class="ability-actions-title">• AÇÕES •</div>
            ${system.actions.map((act, idx) => `
              <div class="ability-action-item">
                <div class="ability-action-header-row">
                  <div class="ability-action-info">
                    <span class="ability-action-name">${act.name || "Ação"}</span>
                    ${act.cost ? `<span class="badge cost-badge">${act.cost}</span>` : ""}
                  </div>
                  <button type="button" class="btn-roll-ability-action" data-action="rollItemAction" data-item-uuid="${this.uuid}" data-item-id="${this.id}" data-action-id="${act.id || ''}" data-action-index="${idx}" title="Rolar ${act.name || 'Ação'}">
                    <i class="fa-solid fa-dice-d20"></i>
                  </button>
                </div>
                ${act.description ? `<div class="ability-action-desc">${act.description}</div>` : ""}
              </div>
            `).join("")}
          </div>
        `;
      }
      content = `<h3>${this.name}</h3><p>${description}</p>${actionsHTML}`;
    }

    return ChatMessage.create(/** @type {any} */({
      speaker,
      content,
      ...options
    }));
  }

  /**
   * Envia uma Sub-Habilidade específica para o chat.
   * @param {object|number|string} subEffect - Objeto do sub-efeito ou seu índice na array subEffects
   * @param {object} [options] - Opções adicionais para a mensagem do chat
   */
  async rollSubEffect(subEffect, options = {}) {
    const speaker = ChatMessage.getSpeaker({ actor: this.actor, item: this });
    let sub = typeof subEffect === "number" ? this.system?.subEffects?.[subEffect] : subEffect;
    if (!sub && (typeof subEffect === "string" || typeof subEffect === "number")) {
      const idx = Number(subEffect);
      if (!isNaN(idx)) sub = this.system?.subEffects?.[idx];
    }
    if (!sub) return null;

    const config = /** @type {any} */ (CONFIG).GAIA;
    const actionLabel = sub.typeAction && config?.actionType?.[sub.typeAction]
      ? game.i18n.localize(config.actionType[sub.typeAction])
      : (sub.typeAction || "");

    const typeLabel = sub.type && config?.abilitiesTypes?.[sub.type]
      ? game.i18n.localize(config.abilitiesTypes[sub.type])
      : (sub.type || "");

    const cost = sub.cost || "";
    const name = sub.name || "Sub-Habilidade";
    const description = sub.description || "";
    const note = sub.note || "";

    const metaParts = [];
    if (cost) metaParts.push(`<i class="fas fa-bolt"></i> ${cost}`);
    if (actionLabel) metaParts.push(actionLabel);
    if (typeLabel) metaParts.push(typeLabel);
    const metaBar = metaParts.length > 0 ? `<div class="ability-meta-bar"><div class="meta-row-1">${metaParts.join(" | ")}</div></div>` : "";

    const content = `
      <div class="gaia-ability-chat-card gaia-subeffect-chat-card">
        <div class="ability-name" style="font-size: 1.1em; color: var(--gaia-purple-dark, #5d1c8f); border-bottom: 1px solid var(--gaia-purple-dark, #5d1c8f); padding-bottom: 2px; margin-bottom: 4px;">
          ${name}
        </div>
        <div class="subeffect-parent-item" style="font-size: 11px; font-weight: 600; color: #666; margin-bottom: 4px;">
          <i class="fas fa-bookmark" style="font-size: 10px;"></i> ${this.name}
        </div>
        ${metaBar}
        <div class="ability-body" style="margin-top: 6px;">
          ${description ? `<p>${description}</p>` : ""}
          ${note ? `<div class="subeffect-chat-note" style="font-size:12px; color:var(--gaia-purple-dark, #5d1c8f); font-weight:600; margin-top:4px;"><i class="fas fa-info-circle"></i> ${note}</div>` : ""}
        </div>
      </div>
    `;

    return ChatMessage.create(/** @type {any} */({
      speaker,
      content,
      ...options
    }));
  }

  /**
   * Executa e envia uma Ação (ActionDataModel) específica com rolagens interativas e efeitos.
   * @param {object|number|string} action - Objeto da ação ou índice na array de ações
   * @param {object} [options] - Opções adicionais para a execução
   * @returns {Promise<ChatMessage|null>}
   */
  async rollAction(action, options = {}) {
    let act = typeof action === "number" ? this.system?.actions?.[action] : action;
    if (!act && (typeof action === "string" || typeof action === "number")) {
      const idx = Number(action);
      if (!isNaN(idx)) act = this.system?.actions?.[idx];
    }
    if (!act) return null;

    const { executeAction } = await import("../helpers/action-flow/index.mjs");
    return executeAction(act, {
      item: this,
      actor: this.actor,
      ...options
    });
  }
}
