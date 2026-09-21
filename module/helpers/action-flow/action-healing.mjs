/**
 * ==============================================================================
 * GAIA: PRELÚDIO - ACTION HEALING / APLICAÇÃO DE CURA DE AÇÕES
 * ==============================================================================
 * PT: Aplicação direta de cura a Ator ou Token, restauração de PV/PE e cards de chat.
 * EN: Direct application of healing to Actor or Token, HP/PE restoration, and chat cards.
 */

/**
 * Aplica cura diretamente a um Ator ou Token e registra no Chat.
 * @param {Actor|TokenDocument|Token} target - Alvo da cura
 * @param {number} amount - Quantidade de cura a aplicar
 * @param {object} [options={}] - Opções adicionais (healType, baseHealing, sendToChat)
 * @returns {Promise<ChatMessage|null>}
 */
export async function applyActionHealing(target, amount, options = {}) {
  const actor = target?.actor || target;
  if (!actor || typeof amount !== "number" || isNaN(amount)) return null;

  const healType = options.healType || "pv";
  const currentHp = Number(actor.system?.health?.value ?? 0);
  const maxHp = Number(actor.system?.health?.max ?? 0);
  const currentPe = Number(actor.system?.energy?.value ?? 0);
  const maxPe = Number(actor.system?.energy?.max ?? 0);
  const currentTemp = Number(actor.system?.health?.temp ?? 0);

  const updates = {};
  let effectiveAmount = amount;
  let typeLabel = "PV";
  let badgeLabel = "CURA (PV)";
  let isRevived = false;

  if (healType === "pe") {
    typeLabel = "PE";
    badgeLabel = "ENERGIA (PE)";
    const newPe = maxPe > 0 ? Math.min(maxPe, currentPe + amount) : currentPe + amount;
    effectiveAmount = Math.max(0, newPe - currentPe);
    updates["system.energy.value"] = newPe;
  } else if (healType === "temp") {
    typeLabel = "PV Temporário";
    badgeLabel = "PV TEMP";
    const newTemp = Math.max(currentTemp, amount);
    effectiveAmount = newTemp;
    updates["system.health.temp"] = newTemp;
  } else {
    // Padrão: PV
    typeLabel = "PV";
    badgeLabel = "CURA (PV)";
    const newHp = maxHp > 0 ? Math.min(maxHp, currentHp + amount) : currentHp + amount;
    effectiveAmount = Math.max(0, newHp - currentHp);
    updates["system.health.value"] = newHp;

    if (currentHp <= 0 && newHp > 0) {
      isRevived = true;
      updates["system.death.sentences"] = 0;
      updates["system.death.gifts"] = 0;
      updates["system.death.stabilized"] = false;
    }
  }

  await actor.update(updates);

  // Se options.sendToChat !== false, gera o card informativo no Chat
  if (options.sendToChat !== false) {
    const baseAmount = Number(options.baseHealing) || amount;
    const hasMod = baseAmount !== amount && baseAmount > 0;

    const healingCardHtml = `
      <div class="gaia-chat-card healing-applied-card">
        <div class="healing-applied-header">
          <div class="healing-applied-title">
            <i class="fa-solid fa-heart-pulse"></i> Cura Aplicada
          </div>
          <span class="healing-applied-badge">
            ${badgeLabel}
          </span>
        </div>
        <div class="healing-applied-target">
          ${actor.img ? `<img src="${actor.img}" class="healing-target-avatar" />` : ""}
          <div class="healing-target-info">
            <div class="healing-target-name">${actor.name}</div>
            <div class="healing-target-amount">
              Recuperou <strong class="healing-highlight">+${effectiveAmount}</strong> ${typeLabel}${hasMod ? ` <span class="healing-base-info">(Base: ${baseAmount})</span>` : ""}
            </div>
          </div>
        </div>
        
        ${isRevived ? `<div class="healing-revived-alert"><i class="fa-solid fa-hand-holding-medical"></i> O personagem recuperou a consciência e não está mais incapacitado!</div>` : ""}
      </div>
    `;

    return await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      content: healingCardHtml,
      style: CONST.CHAT_MESSAGE_STYLES?.OTHER ?? 0
    });
  }

  return null;
}
