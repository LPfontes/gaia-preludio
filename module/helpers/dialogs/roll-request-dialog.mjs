/**
 * ==============================================================================
 * ROLL REQUEST DIALOG & LISTENERS / PEDIDOS DE TESTE DO NARRADOR
 * ==============================================================================
 */

const { DialogV2 } = foundry.applications.api;
const { renderTemplate } = foundry.applications.handlebars;
const { FormDataExtended } = foundry.applications.ux || foundry.utils;

/**
 * Exibe caixa de diálogo DialogV2 para o Narrador criar um Pedido de Teste para os jogadores.
 * @returns {Promise<ChatMessage|null>}
 */
export async function promptRollRequestDialog() {
  const config = /** @type {any} */ (CONFIG).GAIA;

  // Monta lista de parâmetros
  const parameters = Object.entries(config?.parameters ?? {}).map(([key, labelKey]) => ({
    key,
    label: typeof labelKey === "string" ? game.i18n.localize(labelKey) : key
  }));

  // Monta lista de conhecimentos
  const knowledge = Object.entries(config?.knowledge ?? {}).map(([key, labelKey]) => ({
    key,
    label: typeof labelKey === "string" ? game.i18n.localize(labelKey) : key
  }));

  // Monta opções de Dificuldade baseadas no Enum GAIA.difficultyLevels
  const difficultyLevels = Object.values(config?.difficultyLevels ?? {}).map((levelObj) => ({
    dc: levelObj.max,
    label: game.i18n.localize(levelObj.label ?? levelObj.key),
    selected: levelObj.key === "normal"
  }));

  // Tipos de Rolagem (Aptidão)
  const rollTypes = Object.entries(config?.rollTypes ?? {}).map(([key, obj]) => ({
    key,
    label: typeof obj.label === "string" ? game.i18n.localize(obj.label) : key,
    selected: key === "standard"
  }));

  const content = await renderTemplate("systems/gaia-preludio/templates/dialog/roll-request-dialog.hbs", {
    parameters,
    knowledge,
    difficultyLevels,
    rollTypes
  });

  const dialogTitle = game.i18n.localize("GAIA.RollRequest.DialogTitle");
  const sendLabel = game.i18n.localize("GAIA.RollRequest.SendButton");
  const cancelLabel = game.i18n.localize("GAIA.RollRequest.CancelButton");

  const result = await DialogV2.wait({
    classes: ["gaia-preludio", "gaia-dialog", "roll-request-dialog"],
    window: { title: dialogTitle },
    position: { width: 440, height: "auto" },
    content,
    buttons: [
      {
        action: "send",
        label: sendLabel,
        icon: "fa-solid fa-paper-plane",
        default: true,
        callback: async (event, button, dialog) => {
          const form = dialog.element.querySelector("form") || dialog.element;
          const data = new FormDataExtended(form).object;

          const category = String(data.category || "parameters");
          const statKey = String(data.statKey || "precision");
          const customDC = Number(data.customDC);
          const dc = !isNaN(customDC) && customDC > 0 ? customDC : (Number(data.difficulty) || 9);
          const fitness = String(data.fitness || "standard");
          const note = String(data.note || "").trim();

          // Descobre o rótulo amigável do teste
          let statLabel = statKey;
          if (category === "parameters") {
            const raw = config?.parameters?.[statKey] ?? statKey;
            statLabel = typeof raw === "string" ? game.i18n.localize(raw) : String(raw);
          } else if (category === "knowledge") {
            const raw = config?.knowledge?.[statKey] ?? statKey;
            statLabel = typeof raw === "string" ? game.i18n.localize(raw) : String(raw);
          } else if (category === "defense") {
            statLabel = statKey === "agility" 
              ? game.i18n.localize("GAIA.RollRequest.EvasionAgility") 
              : game.i18n.localize("GAIA.RollRequest.BlockArmor");
          } else if (category === "destiny") {
            statLabel = game.i18n.localize("GAIA.RollRequest.CategoryDestiny");
          }

          const levelInfo = config?.getDifficultyLevel ? config.getDifficultyLevel(dc) : null;
          const levelLabel = levelInfo?.label ? game.i18n.localize(levelInfo.label) : `Dif. ${dc}`;

          const cardTitleText = game.i18n.localize("GAIA.RollRequest.CardTitle");
          const requestedCheckText = game.i18n.localize("GAIA.RollRequest.RequestedCheck");
          const difficultyLabelText = game.i18n.localize("GAIA.RollRequest.DifficultyLabel");
          const btnText = game.i18n.format("GAIA.RollRequest.RollButton", { label: statLabel, dc });
          const narratorAlias = game.i18n.localize("GAIA.RollRequest.NarratorAlias");

          // Monta o cartão do Chat
          const chatContent = `
            <div class="gaia-chat-card roll-request-card">
              <div class="roll-request-header">
                <i class="fa-solid fa-scroll"></i> ${cardTitleText}
              </div>
              <div class="roll-request-stat">
                <strong>${requestedCheckText}</strong> ${statLabel}
              </div>
              <div class="roll-request-dc">
                <strong>${difficultyLabelText}</strong> Dif. ${dc} (${levelLabel})
              </div>
              ${note ? `<div class="roll-request-note">"${note}"</div>` : ''}
              <button type="button" class="gaia-btn-roll-request" 
                      data-action="rollRequest"
                      data-category="${category}"
                      data-stat-key="${statKey}"
                      data-dc="${dc}"
                      data-fitness="${fitness}"
                      data-label="${statLabel}">
                ${btnText}
              </button>
            </div>
          `;

          return await ChatMessage.create({
            speaker: ChatMessage.getSpeaker({ alias: narratorAlias }),
            content: chatContent,
            style: CONST.CHAT_MESSAGE_STYLES?.OTHER ?? 0
          });
        }
      },
      {
        action: "cancel",
        label: cancelLabel,
        icon: "fa-solid fa-xmark",
        callback: () => null
      }
    ],
    rejectClose: false
  });

  return result;
}

/**
 * Registra os ouvintes de clique interativo para responder aos Pedidos de Teste no Chat.
 */
export function registerRollRequestListeners() {
  Hooks.on("renderChatMessageHTML", (message, html) => {
    const rootEl = html.jquery ? html[0] : html;
    
    // 1. Ouvinte para Pedidos de Teste do Narrador (rollRequest)
    const btn = rootEl.querySelector ? rootEl.querySelector("[data-action='rollRequest']") : null;
    if (btn) {
      btn.addEventListener("click", async (event) => {
        event.preventDefault();
        const dataset = btn.dataset;
        const category = dataset.category || "parameters";
        const statKey = dataset.statKey || "precision";
        const dc = Number(dataset.dc) || 9;
        const fitness = dataset.fitness || "standard";
        const statLabel = dataset.label || statKey;

        const { flowParameter, flowDifficultyCheck, flowDestinyCheck, defense } = await import("../flow.mjs");
        const { getStatEntry } = await import("../stat-rolls.mjs");

        // Resgata o ator do jogador
        const actor = game.user.character || canvas.tokens?.controlled[0]?.actor;
        if (!actor) {
          ui.notifications.warn(game.i18n.localize("GAIA.RollRequest.WarnSelectActor"));
          return;
        }

        let roll = null;

        if (category === "destiny") {
          const result = await flowDestinyCheck(dc);
          roll = result.roll;
        } else if (category === "defense") {
          roll = await defense(statKey, actor, fitness);
        } else {
          const statEntry = getStatEntry(actor.system, category, statKey);
          roll = await flowParameter({ value: statEntry.value }, fitness);
        }

        // Valida o resultado contra a Dif. solicitada
        const check = flowDifficultyCheck(roll, dc);

        const outcomeClass = check.success ? "outcome-success" : "outcome-failure";
        const outcomeTitle = game.i18n.format(
          check.success ? "GAIA.RollRequest.OutcomePassed" : "GAIA.RollRequest.OutcomeFailed",
          { name: actor.name, label: statLabel }
        );
        const resultLabelText = game.i18n.localize("GAIA.RollRequest.ResultLabel");
        const marginLabelText = game.i18n.localize("GAIA.RollRequest.MarginLabel");

        const outcomeHtml = `
          <div class="gaia-outcome-card ${outcomeClass}">
            <div class="outcome-title">${outcomeTitle}</div>
            <div class="outcome-details">
              <strong>${resultLabelText}</strong> ${check.total} vs <strong>Dif. ${dc}</strong> (${marginLabelText} ${check.margin >= 0 ? '+' : ''}${check.margin})
            </div>
          </div>
        `;

        await roll.toMessage({
          speaker: ChatMessage.getSpeaker({ actor }),
          flavor: outcomeHtml
        });
      });
    }

    // 2. Ouvinte para Botões de Rolagem de Defesa do Alvo de Ataques (rollTargetDefense)
    const defenseBtns = rootEl.querySelectorAll ? rootEl.querySelectorAll("[data-action='rollTargetDefense']") : [];
    defenseBtns.forEach(defBtn => {
      defBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        const defenseType = defBtn.dataset.defenseType || "agility";
        const targetTokenId = defBtn.dataset.targetTokenId;
        const targetActorId = defBtn.dataset.targetActorId;

        // Resgata o dano configurado a partir do dataset do botão de defesa
        let damageAmount = Number(defBtn.dataset.damageAmount);
        let damageText = defBtn.dataset.damageText || "";
        let damageType = defBtn.dataset.damageType || "";
        if (isNaN(damageAmount) || damageAmount <= 0) {
          const match = damageText.match(/(\d+)/);
          if (match) damageAmount = parseInt(match[1], 10);
        }

        // Resgata o total do ataque a partir do dataset do botão ou das rolagens da mensagem
        let attackTotal = Number(defBtn.dataset.attackTotal);
        if (isNaN(attackTotal) || attackTotal <= 0) {
          attackTotal = message.rolls?.[0]?.total ?? null;
        }

        // Procura o Ator do Alvo
        let targetActor = null;
        if (targetTokenId && canvas?.tokens) {
          const token = canvas.tokens.get(targetTokenId);
          if (token?.actor) targetActor = token.actor;
        }
        if (!targetActor && targetActorId) {
          targetActor = game.actors.get(targetActorId);
        }
        if (!targetActor) {
          const { getSelectedOrTargetToken } = await import("../token-helper.mjs");
          const token = getSelectedOrTargetToken(null, { notify: true, warnMessage: "Selecione ou mire em um token alvo para rolar a defesa." });
          targetActor = token?.actor ?? null;
        }

        if (!targetActor) return;

        // Dispara a rolagem de defesa (Defesa com Parâmetros Defensivos, ou Esquiva/Bloqueio) para o Ator Alvo
        const isNpcOrCreature = targetActor.type === "creature" || targetActor.type === "legacyNpc";
        const effDefenseType = isNpcOrCreature ? "defensiveParameters" : defenseType;
        const categoryLabel = isNpcOrCreature
          ? "Defesa (Parâmetros Defensivos)"
          : (defenseType === "agility" ? "Defesa (Esquiva / Agilidade)" : "Defesa (Bloqueio)");

        const { rollStat } = await import("../stat-rolls.mjs");
        const defenseRoll = await rollStat(targetActor, {
          event,
          type: "defense",
          key: effDefenseType,
          categoryLabel
        });

        // Se a defesa foi rolada e temos o total do ataque, valida Acerto, Erro, Empate ou Crítico
        if (defenseRoll && attackTotal !== null && !isNaN(attackTotal)) {
          const { isCriticalHit } = await import("../flow.mjs");
          const critResult = isCriticalHit(attackTotal, defenseRoll);

          let outcomeStatus = "";

          switch (true) {
            case critResult.isCritical:
              outcomeStatus = "Crítico";
              break;
            case critResult.isHit:
              outcomeStatus = "Acerto";
              break;
            case critResult.difference === 0:
              outcomeStatus = "Empate";
              break;
            default:
              outcomeStatus = "Errou";
              break;
          }

          let applyDamageBtnHtml = "";
          if (critResult.isHit || critResult.isCritical) {
            const damageDisplay = damageText ? ` (${damageText})` : (damageAmount > 0 ? ` (${damageAmount})` : "");
            applyDamageBtnHtml = `
              <div style="margin-top: 8px; display: flex; justify-content: center;">
                <button type="button" class="gaia-btn-apply-damage" 
                        data-action="applyTargetDamage" 
                        data-damage-amount="${damageAmount || ''}" 
                        data-damage-text="${damageText}" 
                        data-damage-type="${damageType}" 
                        data-target-token-id="${targetTokenId}" 
                        data-target-actor-id="${targetActorId || targetActor?.id}">
                  Aplicar Dano${damageDisplay}
                </button>
              </div>
            `;
          }

          const diffSign = critResult.difference > 0 ? "+" : "";
          const outcomeHtml = `
            <div class="gaia-chat-card outcome-card" style="padding: 8px; background: rgba(0,0,0,0.15); margin-top: 6px;">
              <div style="font-weight: bold; font-size: 1.5em; display: flex; align-items: center; gap: 6px; color: var(--gaia-purple-dark);">
                ${outcomeStatus}
              </div>
              <div style="font-size: 1.2em; margin-top: 6px; color: var(--gaia-text-parchment);">
                <div style="display: flex; align-items: center; gap: 6px;">
                  <strong>Ataque:</strong> ${critResult.attackTotal} vs <strong>Defesa:</strong> ${critResult.defenseTotal}
                </div>
                <div style="display: flex; align-items: center; gap: 6px; font-weight: bold;">(Diferença: ${diffSign}${critResult.difference})</div>
              </div>
              ${applyDamageBtnHtml}
            </div>
          `;

          await ChatMessage.create({
            speaker: ChatMessage.getSpeaker({ actor: targetActor }),
            content: outcomeHtml,
            style: CONST.CHAT_MESSAGE_STYLES?.OTHER ?? 0
          });
        }
      });
    });

    // 3. Ouvinte para Botão de Aplicar Dano no Alvo (applyTargetDamage)
    const applyDamageBtns = rootEl.querySelectorAll ? rootEl.querySelectorAll("[data-action='applyTargetDamage']") : [];
    applyDamageBtns.forEach(applyBtn => {
      applyBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        const targetTokenId = applyBtn.dataset.targetTokenId;
        const targetActorId = applyBtn.dataset.targetActorId;
        let amount = Number(applyBtn.dataset.damageAmount);
        const damageText = applyBtn.dataset.damageText || "";
        let damageType = applyBtn.dataset.damageType || "";

        if (isNaN(amount) || amount <= 0) {
          const match = damageText.match(/(\d+)/);
          if (match) amount = parseInt(match[1], 10);
        }

        if (isNaN(amount) || amount <= 0) {
          const promptVal = window.prompt("Quantidade de dano a aplicar:", "1");
          if (!promptVal) return;
          amount = Number(promptVal) || 0;
        }

        if (amount <= 0) return;

        if (!damageType && damageText) {
          const typeMatch = damageText.replace(/^\d+\s*/, "").trim();
          if (typeMatch) damageType = typeMatch;
        }

        let targetActor = null;
        if (targetTokenId && canvas?.tokens) {
          const token = canvas.tokens.get(targetTokenId);
          if (token?.actor) targetActor = token.actor;
        }
        if (!targetActor && targetActorId) {
          targetActor = game.actors.get(targetActorId);
        }
        if (!targetActor) {
          const { getSelectedOrTargetToken } = await import("../token-helper.mjs");
          const token = getSelectedOrTargetToken(null, { notify: true, warnMessage: "Selecione ou mire em um token alvo para aplicar o dano." });
          targetActor = token?.actor ?? null;
        }

        if (!targetActor) {
          ui.notifications.warn("Nenhum alvo selecionado ou mirado para aplicar dano.");
          return;
        }

        const { calculateDamage } = await import("../flow.mjs");
        const finalDamage = calculateDamage({ type: damageType, value: amount }, targetActor);

        if (finalDamage === 0) {
          ui.notifications.info(`${targetActor.name} é imune a dano ${damageType || ''} (0 de dano recebido).`);
          applyBtn.disabled = true;
          applyBtn.innerHTML = "Imune (0 Dano)";

          const immuneCardHtml = `
            <div class="gaia-chat-card damage-applied-card immune">
              <div class="damage-applied-header">
                <div class="damage-applied-title">
                  <i class="fa-solid fa-shield"></i> Dano Anulado (Imunidade)
                </div>
                <span class="damage-applied-badge">
                  ${damageType ? damageType.toUpperCase() : 'IMUNE'}
                </span>
              </div>
              <div class="damage-applied-target">
                ${targetActor.img ? `<img src="${targetActor.img}" class="damage-target-avatar" />` : ''}
                <div class="damage-target-info">
                  <div class="damage-target-name">${targetActor.name}</div>
                  <div class="damage-target-amount">
                    É imune a dano <strong>${damageType || ''}</strong> (0 de dano sofrido).
                  </div>
                </div>
              </div>
            </div>
          `;

          await ChatMessage.create({
            speaker: ChatMessage.getSpeaker({ actor: targetActor }),
            content: immuneCardHtml,
            style: CONST.CHAT_MESSAGE_STYLES?.OTHER ?? 0
          });
          return;
        }

        const { applyActionDamage } = await import("../action-flow/index.mjs");
        await applyActionDamage(targetActor, finalDamage, { damageType, baseDamage: amount });

        applyBtn.disabled = true;
        applyBtn.innerHTML = `Dano Aplicado (${finalDamage})`;
      });
    });

    // 4. Ouvinte para Ações Estruturadas (ActionDataModel)
    import("../action-flow/index.mjs").then(({ registerActionChatListeners }) => {
      registerActionChatListeners(rootEl, message);
    });
  });
}
