/**
 * ==============================================================================
 * GAIA: PRELÚDIO - ACTION DAMAGE / APLICAÇÃO DE DANO DE AÇÕES
 * ==============================================================================
 * PT: Aplicação direta de dano a Ator ou Token, alertas de nocaute e cards de chat.
 * EN: Direct application of damage to Actor or Token, knockout alerts, and chat cards.
 */

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
