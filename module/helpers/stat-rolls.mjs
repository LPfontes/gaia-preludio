/**
 * ==============================================================================
 * STAT ROLLS HELPERS / AUXILIARES DE ROLAGEM DE DADOS
 * ==============================================================================
 * Gerenciamento completo de rolagens de Parâmetros, Conhecimentos, Defesas e
 * Iniciativa com caixa de diálogo assíncrona (DialogV2), atalhos de teclado e
 * integração com o Chat e Combat Tracker.
 */

const { DialogV2 } = foundry.applications.api;
const { renderTemplate } = foundry.applications.handlebars;
const { FormDataExtended } = foundry.applications.ux || foundry.utils;
import { flowParameter } from "./flow.mjs";
import { getSelectedOrTargetToken } from "./token-helper.mjs";

/**
 * Função auxiliar para resgatar o valor e o rótulo traduzido de um parâmetro ou conhecimento.
 * @param {object} system - Objeto actor.system
 * @param {"parameters"|"knowledge"} category - Categoria ("parameters" ou "knowledge")
 * @param {string} key - Chave do atributo/perícia
 * @returns {{ value: number, label: string }}
 */
export function getStatEntry(system, category, key) {
  const normKey = String(key || "").toLowerCase();
  const list = system?.[category] ?? [];
  const entry = list.find(item => String(item.name || "").toLowerCase() === normKey);
  const value = Number(entry?.value) || 0;
  const raw = CONFIG.GAIA?.[category]?.[normKey] ?? normKey;
  const label = typeof raw === "string" ? game.i18n.localize(raw) : String(raw || normKey);
  return { value, label };
}

/**
 * Função genérica para configurar e executar rolagens de estatísticas do Ator.
 * @param {Actor} actor - Documento do Ator
 * @param {object} options
 * @param {PointerEvent|Event} options.event - Evento de clique do mouse (para atalhos Shift/Alt/Ctrl)
 * @param {HTMLElement} options.target - Elemento HTML que disparou a ação
 * @param {"parameters"|"knowledge"|"defense"|"initiative"} options.type - Categoria da rolagem
 * @param {string} options.categoryLabel - Rótulo da categoria (ex: "Parâmetro", "Conhecimento")
 * @returns {Promise<Roll | null>} Retorna o objeto Roll avaliado ou null se cancelado
 */
export async function rollStat(actor, { event, target, type, categoryLabel, overrideValue, key: customKey, weaponDamageText, defenseButtonsHtml } = {}) {
  if (!actor) return null;

  const key = String(customKey || target?.dataset?.key || target?.dataset?.type || (type === "initiative" ? "initiative" : "")).toLowerCase();
  const system = actor.system;

  let value = 0;
  let label = categoryLabel;

  // 1. Resgate do valor base e rótulo dependendo do tipo
  switch (type) {
    case "parameters":
    case "knowledge": {
      ({ value, label } = getStatEntry(system, type, key));
      break;
    }
    case "defense": {
      if (key === "agility") {
        value = getStatEntry(system, "parameters", "agility").value || Number(system.agility?.value ?? system.agility ?? 0);
        label = game.i18n.localize("GAIA.Dialog.AgilityDefense");
        if (label === "GAIA.Dialog.AgilityDefense") label = "Esquiva (Agilidade)";
      } else {
        value = Number(system.totalBlock ?? system.block?.value ?? system.block ?? 0);
        label = game.i18n.localize("GAIA.Dialog.BlockDefense");
        if (label === "GAIA.Dialog.BlockDefense") label = "Bloqueio";
      }
      break;
    }
    case "initiative": {
      if (system.defensiveParameters !== undefined && (actor.type === "creature" || actor.type === "legacyNpc")) {
        value = Number(system.defensiveParameters) || 0;
      } else {
        value = getStatEntry(system, "parameters", "agility").value || Number(system.agility?.value ?? system.agility ?? 0);
      }
      label = game.i18n.localize("GAIA.Dialog.Initiative");
      if (label === "GAIA.Dialog.Initiative") label = "Iniciativa";
      break;
    }
    default: {
      value = 0;
      label = categoryLabel || "";
      break;
    }
  }

  if (overrideValue !== undefined) {
    value = Number(overrideValue) || 0;
  }
  if (categoryLabel) {
    label = categoryLabel;
  }

  // 2. Define a aptidão padrão por atalho de teclado
  let defaultFitness = "standard";
  if (event?.shiftKey) defaultFitness = "advantage";
  if (event?.altKey || event?.ctrlKey) defaultFitness = "disadvantage";

  // 3. Prepara as opções de tipo de rolagem e modos de visibilidade
  const rollTypes = Object.entries(CONFIG.GAIA?.rollTypes ?? {}).map(([rKey, rObj]) => {
    const rawLabel = typeof rObj === "object" && rObj !== null ? (rObj.label ?? rKey) : rObj;
    const rollFormula = typeof rObj === "object" && rObj !== null ? (rObj.roll ?? "1d12") : "1d12";
    const locLabel = typeof rawLabel === "string" ? game.i18n.localize(rawLabel) : String(rKey);
    return {
      key: rKey,
      label: `${locLabel} (${rollFormula})`,
      selected: rKey === defaultFitness
    };
  });

  const currentRollMode = game.settings?.get("core", "rollMode") || "publicroll";
  const rollModeMap = CONFIG.ChatMessage?.modes ?? {
    publicroll: "CHAT.RollPublic",
    gmroll: "CHAT.RollPrivate",
    blindroll: "CHAT.RollBlind",
    selfroll: "CHAT.RollSelf"
  };

  const rollModes = Object.entries(rollModeMap).map(([mKey, mVal]) => {
    const locKey = typeof mVal === "string" ? mVal : (mVal?.label ?? mKey);
    const mLabel = typeof locKey === "string" ? game.i18n.localize(locKey) : String(mKey);
    return {
      key: mKey,
      label: mLabel,
      selected: mKey === currentRollMode
    };
  });

  // 4. Renderiza o template de configuração da rolagem
  const dialogHtml = await renderTemplate("systems/gaia-preludio/templates/dialog/roll-dialog.hbs", {
    title: `${label}`,
    statValue: value,
    rollTypes,
    modifier: 0,
    rollModes
  });

  // 5. Exibe a caixa de diálogo assíncrona com DialogV2
  const dialogResult = await DialogV2.wait({
    classes: ["gaia-preludio", "gaia-dialog", "roll-dialog"],
    window: { title: `Configurar Rolagem - ${label}` },
    position: { width: 400, height: "auto" },
    content: dialogHtml,
    buttons: [
      {
        action: "roll",
        label: "Rolar",
        icon: "fa-solid fa-dice-d12",
        default: true,
        callback: (event, button, dialog) => {
          const form = dialog.element.querySelector("form");
          return new FormDataExtended(form).object;
        }
      },
      {
        action: "cancel",
        label: "Cancelar",
        icon: "fa-solid fa-xmark",
        callback: () => null
      }
    ],
    rejectClose: false
  });

  if (dialogResult === "cancel" || !dialogResult) return null;

  const fitness = dialogResult.fitness || defaultFitness;
  const modifier = Number(dialogResult.modifier) || 0;
  const messageMode = dialogResult.rollMode || game.settings?.get("core", "rollMode");

  // 6. Executa a rolagem
  let roll;
  if (type === "defense" && key === "block") {
    const dice = CONFIG.GAIA?.rollTypes?.[fitness]?.roll ?? "1d12";
    const modText = modifier !== 0 ? (modifier > 0 ? ` + ${modifier}` : ` - ${Math.abs(modifier)}`) : "";
    roll = new Roll(`${dice} + @block${modText}`, { block: value });
    await roll.evaluate();
  } else {
    roll = await flowParameter({ value }, fitness, modifier);
  }

  const rawFitnessLabel = CONFIG.GAIA?.rollTypes?.[fitness]?.label ?? fitness;
  const fitnessLabel = typeof rawFitnessLabel === "string" ? game.i18n.localize(rawFitnessLabel) : String(rawFitnessLabel || fitness);

  // 7. Monta o título do card no chat
  const modText = modifier !== 0 ? ` [${modifier > 0 ? "+" : ""}${modifier}]` : "";
  const fitnessText = (fitness && fitness !== "standard" && fitnessLabel && fitnessLabel.toLowerCase() !== "padrão" && fitnessLabel.toLowerCase() !== "standard") ? ` (${fitnessLabel})` : "";
  let flavor = `<strong>${label}${modText}</strong>${fitnessText}`;

  if (weaponDamageText) {
    flavor += `<div class="weapon-damage-block" style="margin-top: 6px; text-align: center;"><span class="damage-label" style="font-size: 0.8em; font-weight: bold; text-transform: uppercase; color: var(--gaia-text-muted, #888); display: block; margin-bottom: 2px;">Dano da Arma</span><div class="dice-roll"><div class="dice-result"><div class="dice-total">${weaponDamageText}</div></div></div></div>`;
  }

  if (defenseButtonsHtml) {
    const renderedDefenseHtml = typeof defenseButtonsHtml === "function" ? defenseButtonsHtml(roll.total) : defenseButtonsHtml;
    flavor += renderedDefenseHtml;
  }

  // 8. Exibe a rolagem formatada no chat do Foundry VTT
  await roll.toMessage(
    {
      speaker: ChatMessage.getSpeaker({ actor }),
      flavor
    },
    { messageMode }
  );

  // 9. Se for rolagem de iniciativa e o ator estiver em combate ativo, atualiza o combat tracker
  if (type === "initiative" && game.combat) {
    const combatant = game.combat.combatants.find(c => c.actorId === actor.id);
    if (combatant) {
      await game.combat.setInitiative(combatant.id, roll.total);
    }
  }

  return roll;
}

/**
 * Executa a rolagem de ataque de um armamento utilizando o Parâmetro configurado em item.system.attackParameter.attribute.
 * @param {Actor} actor - Documento do Ator
 * @param {Item} item - Documento do Item de Arma
 * @param {object} [options={}] - Opções do evento (event, target)
 * @returns {Promise<Roll | null>}
 */
export async function rollWeaponAttack(actor, item, { event, target } = {}) {
  if (!actor || !item) return null;

  // Resgata o atributo de ataque configurado na arma (ex: "precision", "brutality", etc.)
  const attrKey = String(item.system?.attackParameter?.attribute || "precision").toLowerCase();
  const bonus = Number(item.system?.attackParameter?.value) || 0;

  // Busca o valor base e rótulo do parâmetro no Ator
  const { value: paramValue, label: paramLabel } = getStatEntry(actor.system, "parameters", attrKey);
  const totalValue = paramValue + bonus;

  // Formatação do Dano da Arma
  let damageText = "";
  const iSys = item.system ?? {};
  if (iSys.damageType) {
    if (typeof iSys.damageType === "object") {
      const dVal = iSys.damageType.value ?? "";
      const rawType = iSys.damageType.type ?? "";
      const locKey = CONFIG.GAIA?.damageTypesFlat?.[rawType] ?? CONFIG.GAIA?.damageTypes?.[rawType] ?? rawType;
      const dType = rawType ? (game.i18n.localize(locKey) || rawType) : "";
      damageText = dVal !== "" && dType ? `${dVal} ${dType}` : (dVal || dType || "");
    } else {
      damageText = String(iSys.damageType);
    }
  }

  // Tenta localizar o token do alvo mirado (Target) ou selecionado
  const targetToken = (typeof getSelectedOrTargetToken === "function" ? getSelectedOrTargetToken(null, { fallbackToCharacter: false }) : null)
    || Array.from(game.user?.targets ?? [])[0]
    || null;

  const targetTokenId = targetToken?.id ?? "";
  const targetActorId = targetToken?.actor?.id ?? "";
  const targetName = targetToken?.name ?? targetToken?.actor?.name ?? "";

  // Constrói o HTML dos botões de rolar defesa do alvo
  const defenseButtonsHtml = (attackTotal) => `
    <div class="weapon-defense-block">
      <span class="defense-label">
        <i class="fa-solid fa-shield-halved"></i> Defesa do Alvo ${targetName ? `(${targetName})` : ''}
      </span>
      <div style="display: flex; gap: 6px; justify-content: center; width: 100%;" >
        <button type="button" class="gaia-btn-roll-defense" 
                data-action="rollTargetDefense" 
                data-defense-type="agility"
                data-attack-total="${attackTotal ?? ''}"
                data-target-token-id="${targetTokenId}"
                data-target-actor-id="${targetActorId}">
          Esquiva
        </button>
        <button type="button" class="gaia-btn-roll-defense" 
                data-action="rollTargetDefense" 
                data-defense-type="block"
                data-attack-total="${attackTotal ?? ''}"
                data-target-token-id="${targetTokenId}"
                data-target-actor-id="${targetActorId}">
          Bloqueio
        </button>
      </div>
    </div>
  `;

  return await rollStat(actor, {
    event,
    target: target ?? { dataset: { key: attrKey } },
    type: "parameters",
    key: attrKey,
    categoryLabel: `${item.name} (${paramLabel})`,
    overrideValue: totalValue,
    weaponDamageText: damageText || null,
    defenseButtonsHtml
  });
}
