/**
 * ==============================================================================
 * ITEM ACTION DIALOG / AÇÕES RÁPIDAS DE ITEM
 * ==============================================================================
 */

const { DialogV2 } = foundry.applications.api;

/**
 * Exibe um pequeno diálogo interativo para um item com 2 opções: "Enviar no Chat" e "Rolar Ataque".
 * @param {Actor} actor - Documento do Ator
 * @param {Item} item - Documento do Item
 * @param {object} [options={}] - Opções adicionais (event, target)
 * @returns {Promise<any>}
 */
export async function promptItemActionDialog(actor, item, { event, target } = {}) {
  if (!actor || !item) return null;

  const isWeapon = item.type === "weapon" || item.system?.category === "weapon" || Boolean(item.system?.attackParameter);
  
  // Resgata ações estruturadas (ActionDataModel) do item
  const actions = [];
  if (Array.isArray(item.system?.actions)) {
    actions.push(...item.system.actions);
  }
  if (item.system?.action && typeof item.system.action === "object" && (item.system.action.name || item.system.action.attack?.hasAttack || item.system.action.damage?.hasDamage)) {
    actions.push(item.system.action);
  }
  if (Array.isArray(item.system?.legacyAbilities)) {
    for (const la of item.system.legacyAbilities) {
      if (la.action && (la.action.name || la.action.attack?.hasAttack || la.action.damage?.hasDamage)) {
        actions.push(la.action);
      }
    }
  }

  const buttons = [
    {
      action: "sendChat",
      label: "Enviar no Chat",
      icon: "fa-solid fa-comment",
      callback: () => "sendChat"
    }
  ];

  if (isWeapon) {
    buttons.push({
      action: "rollAttack",
      label: "Rolar Ataque",
      icon: "fa-solid fa-dice-d20",
      default: actions.length === 0,
      callback: () => "rollAttack"
    });
  }

  // Adiciona botões dinâmicos para cada Ação configurada
  actions.forEach((act, idx) => {
    const actName = act.name || `Ação ${idx + 1}`;
    const costText = act.cost ? ` (${act.cost})` : "";
    buttons.push({
      action: `action_${idx}`,
      label: `${actName}${costText}`,
      default: idx === 0 && !isWeapon,
      callback: () => `action_${idx}`
    });
  });

  const result = await DialogV2.wait({
    classes: ["gaia-preludio", "gaia-dialog", "item-action-dialog"],
    window: { title: item.name },
    position: { width: Math.max(340, 160 * Math.min(buttons.length, 3)), height: "auto" },
    content: `
      <div style="text-align: center; padding: 10px 4px; font-weight: 500; font-size: 0.95rem; color: var(--gaia-text-parchment);">
        Escolha a ação para <strong>${item.name}</strong>:
      </div>
    `,
    buttons,
    rejectClose: false
  });

  if (!result) return null;

  if (result === "sendChat") {
    return await item.roll?.() ?? null;
  } 
  
  if (result === "rollAttack") {
    const { rollWeaponAttack } = await import("../stat-rolls.mjs");
    return await rollWeaponAttack(actor, item, { event, target });
  }

  if (typeof result === "string" && result.startsWith("action_")) {
    const idx = parseInt(result.replace("action_", ""), 10);
    const act = actions[idx];
    if (act) {
      return await item.rollAction(act, { event, target });
    }
  }

  return null;
}
