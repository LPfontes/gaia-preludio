/**
 * ==============================================================================
 * GAIA: PRELÚDIO - ACTION COST / CUSTO DE AÇÕES
 * ==============================================================================
 * PT: Gerenciamento e dedução de recursos (PE, PET, PV, PVT) para execução de Ações.
 * EN: Resource management and deduction (PE, PET, PV, PVT) for Action execution.
 */

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
