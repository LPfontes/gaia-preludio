/**
 * ==============================================================================
 * GAIA: PRELÚDIO - ACTION CONDITION / CONDIÇÕES DE AÇÕES
 * ==============================================================================
 * PT: Normalização de identificadores e aplicação de condições / ActiveEffects.
 * EN: Identifier normalization and application of conditions / ActiveEffects.
 */

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

  // 1. Busca a condição registrada em GAIA.conditions ou CONFIG.statusEffects
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
  const finalIcon = registered?.img || registered?.icon || "icons/svg/aura.svg";
  const finalLabel = registered ? (game.i18n?.localize?.(registered.name) || registered.name || rawName) : rawName;

  // Garante registro em CONFIG.GAIA.conditions e CONFIG.statusEffects para o HUD
  if (CONFIG.GAIA?.conditions && !CONFIG.GAIA.conditions[finalStatusId]) {
    const newCond = {
      id: finalStatusId,
      name: rawName,
      img: finalIcon,
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
