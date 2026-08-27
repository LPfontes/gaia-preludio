/**
 * ==============================================================================
 * STAT ROLLS HELPERS / AUXILIARES DE ROLAGEM DE DADOS
 * ==============================================================================
 * Gerenciamento modular de rolagens de Parâmetros, Conhecimentos, Defesas e
 * Iniciativa com caixa de diálogo assíncrona (DialogV2), atalhos de teclado e
 * integração com o Chat e Combat Tracker.
 */

const { DialogV2 } = foundry.applications.api;
const { renderTemplate } = foundry.applications.handlebars;
const { FormDataExtended } = foundry.applications.ux || foundry.utils;
import { GAIA } from "./config.mjs";
import { flowParameter } from "./flow.mjs";
import { getSelectedOrTargetToken, getTargetedTokens, getSelectedTokens } from "./token-helper.mjs";

/**
 * Função auxiliar para resgatar o valor e o rótulo traduzido de um parâmetro ou conhecimento.
 * @param {object} system - Objeto actor.system
 * @param {"parameters"|"knowledge"} category - Categoria ("parameters" ou "knowledge")
 * @param {string} key - Chave do atributo/perícia
 * @returns {{ value: number, label: string }}
 */
export function getStatEntry(system, category, key) {
  const normKey = String(key || "").toLowerCase();
  const raw = CONFIG.GAIA?.[category]?.[normKey] ?? GAIA?.[category]?.[normKey] ?? normKey;
  const label = typeof raw === "string" ? game.i18n.localize(raw) : String(raw || normKey);

  let value = 0;
  if (Array.isArray(system?.[category])) {
    const list = system[category];
    const entry = list.find(item => {
      const name = String(item.name || item.key || "").toLowerCase();
      return name === normKey || name === label.toLowerCase();
    });
    value = Number(entry?.value) || 0;
  } else if (typeof system?.[category] === "object" && system?.[category] !== null) {
    const entry = system[category][normKey] ?? system[category][key];
    value = Number(typeof entry === "object" ? (entry?.value ?? 0) : entry) || 0;
  }

  return { value, label };
}

/**
 * 1. Extrai e normaliza os dados base da estatística a ser rolada a partir do Ator e do elemento disparador.
 * @param {Actor} actor - Documento do Ator
 * @param {object} [options={}] - Opções de extração
 * @returns {{ key: string, dataKey: string, value: number, label: string, type: string, exhaustionPenalty: number }}
 */
export function extractStatData(actor, { target, type = "parameters", categoryLabel = "", overrideValue, key: customKey } = {}) {
  const system = actor?.system ?? {};
  const rawKey = customKey || target?.dataset?.key || target?.dataset?.type || (type === "initiative" ? "initiative" : "");
  const key = String(rawKey).toLowerCase();

  let value = 0;
  let label = categoryLabel;
  let rawDataKey = target?.getAttribute?.("data-key") || key;
  let dataKey = "";

  switch (type) {
    case "parameters": {
      dataKey = GAIA.parameters?.[rawDataKey] || CONFIG.GAIA?.parameters?.[rawDataKey] || rawDataKey;
      ({ value, label } = getStatEntry(system, "parameters", key));
      if (categoryLabel && categoryLabel !== "Parâmetro" && categoryLabel !== label) {
        label = categoryLabel;
      }
      break;
    }
    case "knowledge": {
      dataKey = GAIA.knowledge?.[rawDataKey] || CONFIG.GAIA?.knowledge?.[rawDataKey] || rawDataKey;
      ({ value, label } = getStatEntry(system, "knowledge", key));
      break;
    }
    case "mastery": {
      let parentKnowledge = target?.dataset?.knowledge || options.knowledgeKey || "";
      let masteryLabel = key;
      let masteryDataKey = "";

      for (const [kKey, mObj] of Object.entries(CONFIG.GAIA?.masteries ?? {})) {
        if (mObj[key]) {
          parentKnowledge = kKey;
          masteryLabel = game.i18n.localize(mObj[key]);
          masteryDataKey = mObj[key];
          break;
        }
      }

      dataKey = masteryDataKey || rawDataKey;
      const { value: knowValue, label: knowLabel } = getStatEntry(system, "knowledge", parentKnowledge);
      value = knowValue;
      label = `Maestria: ${masteryLabel} (${knowLabel})`;
      break;
    }
    case "defense": {
      if (key === "agility") {
        value = getStatEntry(system, "parameters", "agility").value || Number(system.agility?.value ?? system.agility ?? 0);
        label = game.i18n.localize("GAIA.Dialog.AgilityDefense");
        if (label === "GAIA.Dialog.AgilityDefense") label = "Esquiva";
        dataKey = "GAIA.Dialog.AgilityDefense";
      } else {
        value = Number(system.totalBlock ?? system.block?.value ?? system.block ?? 0);
        label = game.i18n.localize("GAIA.Dialog.BlockDefense");
        if (label === "GAIA.Dialog.BlockDefense") label = "Bloqueio";
        dataKey = "GAIA.Dialog.BlockDefense";
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
      dataKey = "GAIA.Dialog.Initiative";
      break;
    }
    default: {
      value = 0;
      label = categoryLabel || "";
      dataKey = rawDataKey;
      break;
    }
  }

  if (overrideValue !== undefined) {
    value = Number(overrideValue) || 0;
  }

  // Verifica penalidade de exaustão
  const isParameterOrBlockTest = type === "parameters" 
    || (type === "defense" && (key === "block" || key === "agility"))
    || (type === "initiative");
  const actorExhaustion = Number(system?.exhaustion) || 0;
  const exhaustionPenalty = isParameterOrBlockTest ? actorExhaustion : 0;

  return { key, dataKey, value, label, type, exhaustionPenalty };
}

/**
 * 2. Abre a caixa de diálogo assíncrona (DialogV2) para configuração da rolagem.
 * @param {object} options - Dados da rolagem para o formulário
 * @returns {Promise<{ fitness: string, modifier: number, rollMode: string } | null>}
 */
export async function promptRollDialog({
  label = "",
  dataKey = "",
  value = 0,
  modifier = 0,
  exhaustionPenalty = 0,
  defaultFitness = "standard"
} = {}) {
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

  const dialogHtml = await renderTemplate("systems/gaia-preludio/templates/dialog/roll-dialog.hbs", {
    title: `${label}`,
    dataKey,
    statValue: value,
    rollTypes,
    modifier,
    exhaustionPenalty,
    hasExhaustion: exhaustionPenalty > 0,
    rollModes
  });

  const dialogResult = await DialogV2.wait({
    classes: ["gaia-preludio", "gaia-dialog", "roll-dialog"],
    window: { title: `Configurar Rolagem - ${label}` },
    position: { width: 400, height: "auto" },
    content: dialogHtml,
    buttons: [
      {
        action: "roll",
        label: "Rolar",
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

  return {
    fitness: dialogResult.fitness || defaultFitness,
    modifier: Number(dialogResult.modifier) || 0,
    rollMode: dialogResult.rollMode || game.settings?.get("core", "rollMode")
  };
}

/**
 * 3. Executa e avalia a rolagem de dados aplicando modificadores e exaustão.
 * @param {object} params
 * @param {number} params.value - Valor base do atributo
 * @param {string} [params.fitness="standard"] - Aptidão (standard, advantage, disadvantage)
 * @param {number} [params.modifier=0] - Modificador situacional
 * @param {number} [params.exhaustionPenalty=0] - Penalidade de exaustão
 * @param {boolean} [params.isBlock=false] - Se é rolagem de bloqueio
 * @returns {Promise<Roll>}
 */
export async function executeStatRoll({
  value = 0,
  fitness = "standard",
  modifier = 0,
  exhaustionPenalty = 0,
  isBlock = false
} = {}) {
  if (isBlock) {
    const dice = CONFIG.GAIA?.rollTypes?.[fitness]?.roll ?? "1d12";
    const formulaParts = [dice, "+ @block"];
    const data = { block: value };

    if (modifier !== 0) {
      if (modifier > 0) formulaParts.push("+ @modifier");
      else formulaParts.push("- @modifier");
      data.modifier = Math.abs(modifier);
    }

    if (exhaustionPenalty > 0) {
      formulaParts.push("- @exaustao");
      data.exaustao = exhaustionPenalty;
    }

    const roll = new Roll(formulaParts.join(" "), data);
    await roll.evaluate();
    return roll;
  }

  return await flowParameter({ value }, fitness, modifier, exhaustionPenalty);
}

/**
 * 4. Monta o flavor e publica a mensagem de rolagem no chat (e atualiza combate se iniciativa).
 * @param {Actor} actor - Documento do Ator
 * @param {Roll} roll - Rolagem avaliada
 * @param {object} options - Opções de formatação e exibição
 * @returns {Promise<ChatMessage>}
 */
export async function postStatRollMessage(actor, roll, {
  label = "",
  fitness = "standard",
  modifier = 0,
  exhaustionPenalty = 0,
  rollMode = "publicroll",
  weaponDamageText = null,
  weaponDamageHtml = null,
  defenseButtonsHtml = null,
  type = "parameters"
} = {}) {
  const rawFitnessLabel = CONFIG.GAIA?.rollTypes?.[fitness]?.label ?? fitness;
  const fitnessLabel = typeof rawFitnessLabel === "string" ? game.i18n.localize(rawFitnessLabel) : String(rawFitnessLabel || fitness);

  const modText = modifier !== 0 ? ` [${modifier > 0 ? "+" : ""}${modifier}]` : "";
  const exhText = exhaustionPenalty > 0 ? ` [Exaustão: -${exhaustionPenalty}]` : "";
  const fitnessText = (fitness && fitness !== "standard" && fitnessLabel && fitnessLabel.toLowerCase() !== "padrão" && fitnessLabel.toLowerCase() !== "standard") ? ` (${fitnessLabel})` : "";
  
  let flavor = `<strong>${label}${modText}${exhText}</strong>${fitnessText}`;

  if (weaponDamageHtml) {
    flavor += weaponDamageHtml;
  } else if (weaponDamageText) {
    flavor += `<div class="weapon-damage-block" style="margin-top: 6px; text-align: center;"><span class="damage-label" style="font-size: 0.8em; font-weight: bold; text-transform: uppercase; color: var(--gaia-text-muted, #888); display: block; margin-bottom: 2px;">Dano da Arma</span><div class="dice-roll"><div class="dice-result"><div class="dice-total">${weaponDamageText}</div></div></div></div>`;
  }

  if (defenseButtonsHtml) {
    const renderedDefenseHtml = typeof defenseButtonsHtml === "function" ? defenseButtonsHtml(roll.total) : defenseButtonsHtml;
    flavor += renderedDefenseHtml;
  }

  const message = await roll.toMessage(
    {
      speaker: ChatMessage.getSpeaker({ actor }),
      flavor
    },
    { rollMode }
  );

  // Se for rolagem de iniciativa e o ator estiver em combate ativo, atualiza o combat tracker
  if (type === "initiative" && game.combat) {
    const combatant = game.combat.combatants.find(c => c.actorId === actor.id);
    if (combatant) {
      await game.combat.setInitiative(combatant.id, roll.total);
    }
  }

  return message;
}

/**
 * Função orquestradora genérica para configurar e executar rolagens de estatísticas do Ator.
 * @param {Actor} actor - Documento do Ator
 * @param {object} options
 * @returns {Promise<Roll | null>} Retorna o objeto Roll avaliado ou null se cancelado
 */
export async function rollStat(actor, options = {}) {
  if (!actor) return null;

  const statData = extractStatData(actor, options);
  const system = actor?.system ?? {};

  // Regra de Incapacitado: todo teste de Parâmetro e Conhecimento tem 1 como resultado fixo
  if (system.isIncapacitated && (statData.type === "parameters" || statData.type === "knowledge" || statData.type === "mastery")) {
    const roll = new Roll("1");
    await roll.evaluate();
    await postStatRollMessage(actor, roll, {
      ...options,
      label: `${statData.label} (Incapacitado - Resultado 1)`,
      fitness: "standard",
      modifier: 0,
      exhaustionPenalty: statData.exhaustionPenalty,
      rollMode: "publicroll",
      type: statData.type
    });
    return roll;
  }

  const hasDarkness = Boolean(system.hasDarkness);
  const hasPenumbra = Boolean(system.hasPenumbra);

  // Define aptidão padrão (padrão é "advantage" se for mastery ou se passado em options.defaultFitness)
  let defaultFitness = options.defaultFitness || (statData.type === "mastery" ? "advantage" : "standard");
  let defaultModifier = Number(options.modifier ?? 0);

  // Regras de Visão / Iluminação (Penumbra e Escuridão):
  const rawKey = String(statData.key || "").toLowerCase();
  if (rawKey === "perception" || rawKey === "percepção" || rawKey === "percepcao") {
    if (hasDarkness) {
      defaultFitness = "disadvantage"; // Escuridão: Inaptidão em testes de Percepção
    } else if (hasPenumbra) {
      defaultModifier -= 1; // Penumbra: -1 em testes de Percepção
    }
  }

  if (hasDarkness && (rawKey === "precision" || rawKey === "channeling" || rawKey === "precisão" || rawKey === "precisao" || rawKey === "canalização" || rawKey === "canalizacao")) {
    defaultModifier -= 1; // Escuridão: -1 em todo teste de Precisão e Canalização
  }

  // Atordoado: Inaptidão em todo teste de Parâmetro
  const hasStunned = Boolean(system.hasStunned);
  if (hasStunned && statData.type === "parameters") {
    defaultFitness = "disadvantage";
  }

  // Caído: Inaptidão em testes de Precisão e Canalização
  const hasProne = Boolean(system.hasProne);
  if (hasProne && (rawKey === "precision" || rawKey === "channeling" || rawKey === "precisão" || rawKey === "precisao" || rawKey === "canalização" || rawKey === "canalizacao")) {
    defaultFitness = "disadvantage";
  }

  // Lentidão: -1 em testes de Defesa (Esquiva / Bloqueio)
  const hasSlowed = Boolean(system.hasSlowed);
  if (hasSlowed && statData.type === "defense") {
    defaultModifier -= 1;
  }

  if (options.event?.shiftKey) defaultFitness = "advantage";
  if (options.event?.altKey || options.event?.ctrlKey) defaultFitness = "disadvantage";

  const dialogResult = await promptRollDialog({
    label: statData.label,
    dataKey: statData.dataKey,
    value: statData.value,
    modifier: defaultModifier,
    exhaustionPenalty: statData.exhaustionPenalty,
    defaultFitness
  });

  if (!dialogResult) return null;

  const isBlock = statData.type === "defense" && statData.key === "block";
  const roll = await executeStatRoll({
    value: statData.value,
    fitness: dialogResult.fitness,
    modifier: dialogResult.modifier,
    exhaustionPenalty: statData.exhaustionPenalty,
    isBlock
  });

  await postStatRollMessage(actor, roll, {
    ...options,
    label: statData.label,
    fitness: dialogResult.fitness,
    modifier: dialogResult.modifier,
    exhaustionPenalty: statData.exhaustionPenalty,
    rollMode: dialogResult.rollMode,
    type: statData.type
  });

  return roll;
}

/**
 * Atalho dedicado para rolar Parâmetros.
 * @param {Actor} actor 
 * @param {object} options 
 * @returns {Promise<Roll | null>}
 */
export async function rollParameter(actor, options = {}) {
  return await rollStat(actor, { ...options, type: "parameters", categoryLabel: options.categoryLabel || "Parâmetro" });
}

/**
 * Atalho dedicado para rolar Conhecimentos.
 * @param {Actor} actor 
 * @param {object} options 
 * @returns {Promise<Roll | null>}
 */
export async function rollKnowledge(actor, options = {}) {
  return await rollStat(actor, { ...options, type: "knowledge", categoryLabel: options.categoryLabel || "Conhecimento" });
}

/**
 * Atalho dedicado para rolar Maestrias (sempre inicia com Aptidão / Vantagem).
 * @param {Actor} actor 
 * @param {object} options 
 * @returns {Promise<Roll | null>}
 */
export async function rollMastery(actor, options = {}) {
  return await rollStat(actor, { ...options, type: "mastery", defaultFitness: "advantage" });
}

/**
 * Atalho dedicado para rolar Defesa (Esquiva ou Bloqueio).
 * @param {Actor} actor 
 * @param {object} options 
 * @returns {Promise<Roll | null>}
 */
export async function rollDefense(actor, options = {}) {
  return await rollStat(actor, { ...options, type: "defense", categoryLabel: options.categoryLabel || "Defesa" });
}

/**
 * Atalho dedicado para rolar Iniciativa.
 * @param {Actor} actor 
 * @param {object} options 
 * @returns {Promise<Roll | null>}
 */
export async function rollInitiative(actor, options = {}) {
  return await rollStat(actor, { ...options, type: "initiative", categoryLabel: options.categoryLabel || "Iniciativa" });
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
  let damageValue = 0;
  let damageType = "";
  const iSys = item.system ?? {};
  if (iSys.damageType) {
    if (typeof iSys.damageType === "object") {
      damageValue = Number(iSys.damageType.value) || 0;
      const rawType = iSys.damageType.type ?? "";
      damageType = rawType;
      const locKey = CONFIG.GAIA?.damageTypesFlat?.[rawType] ?? CONFIG.GAIA?.damageTypes?.[rawType] ?? rawType;
      const dType = rawType ? (game.i18n.localize(locKey) || rawType) : "";
      damageText = damageValue !== 0 && dType ? `${damageValue} ${dType}` : (damageValue || dType || "");
    } else {
      damageText = String(iSys.damageType);
      const match = damageText.match(/(\d+)/);
      if (match) damageValue = parseInt(match[1], 10);
    }
  }

  // Tenta localizar todos os tokens alvos mirados (Target com 'T') ou selecionados
  let targets = typeof getTargetedTokens === "function" ? getTargetedTokens(game.user) : Array.from(game.user?.targets ?? []);
  if (targets.length === 0) {
    const controlled = typeof getSelectedTokens === "function" ? getSelectedTokens(game.user) : (canvas?.tokens?.controlled ?? []);
    targets = controlled.filter(t => t.actor?.id !== actor.id);
  }

  // Constrói o HTML dos botões de rolar defesa dos alvos
  const defenseButtonsHtml = (attackTotal) => {
    if (targets.length > 0) {
      return `
        <div class="weapon-defense-block">
          <span class="defense-label">
            <i class="fa-solid fa-shield-halved"></i> Defesa dos Alvos
          </span>
          <div class="weapon-defense-targets-list">
            ${targets.map(t => `
              <div class="weapon-defense-target-row">
                <span class="weapon-defense-target-name">${t.name}</span>
                <div style="display: flex; gap: 4px;">
                  <button type="button" class="gaia-btn-roll-defense" style="width: auto; padding: 2px 8px; font-size: 0.85em;"
                          data-action="rollTargetDefense" 
                          data-defense-type="agility"
                          data-attack-total="${attackTotal ?? ''}"
                          data-damage-amount="${damageValue}"
                          data-damage-text="${damageText}"
                          data-damage-type="${damageType}"
                          data-target-token-id="${t.id}"
                          data-target-actor-id="${t.actor?.id || ''}">
                    Esquiva
                  </button>
                  <button type="button" class="gaia-btn-roll-defense" style="width: auto; padding: 2px 8px; font-size: 0.85em;"
                          data-action="rollTargetDefense" 
                          data-defense-type="block"
                          data-attack-total="${attackTotal ?? ''}"
                          data-damage-amount="${damageValue}"
                          data-damage-text="${damageText}"
                          data-damage-type="${damageType}"
                          data-target-token-id="${t.id}"
                          data-target-actor-id="${t.actor?.id || ''}">
                    Bloqueio
                  </button>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }

    return `
      <div class="weapon-defense-block">
        <span class="defense-label">
          <i class="fa-solid fa-shield-halved"></i> Defesa do Alvo
        </span>
        <div style="display: flex; gap: 6px; justify-content: center; width: 100%;">
          <button type="button" class="gaia-btn-roll-defense" 
                  data-action="rollTargetDefense" 
                  data-defense-type="agility"
                  data-attack-total="${attackTotal ?? ''}"
                  data-damage-amount="${damageValue}"
                  data-damage-text="${damageText}"
                  data-damage-type="${damageType}">
            Esquiva
          </button>
          <button type="button" class="gaia-btn-roll-defense" 
                  data-action="rollTargetDefense" 
                  data-defense-type="block"
                  data-attack-total="${attackTotal ?? ''}"
                  data-damage-amount="${damageValue}"
                  data-damage-text="${damageText}"
                  data-damage-type="${damageType}">
            Bloqueio
          </button>
        </div>
      </div>
    `;
  };

  // Monta o bloco de dano da arma contendo a listagem de todos os alvos e botão de aplicar ao lado
  let weaponDamageHtml = null;
  if (damageText) {
    let targetsListHtml = "";
    if (targets.length > 0) {
      targetsListHtml = `
        <div class="weapon-damage-targets-list">
          <div style="font-size: 0.8em; font-weight: bold; text-transform: uppercase; color: var(--gaia-text-muted, #888); margin-bottom: 2px; text-align: left;">
            Alvos:
          </div>
          ${targets.map(t => `
            <div class="weapon-damage-target-row">
              <span class="weapon-damage-target-name">${t.name}</span>
              <button type="button" class="gaia-btn-apply-damage" style="width: auto; padding: 2px 10px; font-size: 0.85em; margin-top: 0;"
                      data-action="applyTargetDamage" 
                      data-damage-amount="${damageValue}" 
                      data-damage-text="${damageText}" 
                      data-damage-type="${damageType}" 
                      data-target-token-id="${t.id}" 
                      data-target-actor-id="${t.actor?.id || ''}">
                Aplicar
              </button>
            </div>
          `).join("")}
        </div>
      `;
    } else {
      targetsListHtml = `
        <div style="margin-top: 6px; display: flex; justify-content: center;">
          <button type="button" class="gaia-btn-apply-damage" 
                  data-action="applyTargetDamage" 
                  data-damage-amount="${damageValue}" 
                  data-damage-text="${damageText}"
                  data-damage-type="${damageType}">
             Aplicar Dano no Alvo
          </button>
        </div>
      `;
    }

    weaponDamageHtml = `
      <div class="weapon-damage-block" style="margin-top: 6px; text-align: center;">
        <span class="damage-label" style="font-size: 0.8em; font-weight: bold; text-transform: uppercase; color: var(--gaia-text-muted, #888); display: block; margin-bottom: 2px;">Dano da Arma</span>
        <div class="dice-roll">
          <div class="dice-result">
            <div class="dice-total">${damageText}</div>
          </div>
        </div>
        ${targetsListHtml}
      </div>
    `;
  }

  return await rollStat(actor, {
    event,
    target: target ?? { dataset: { key: attrKey } },
    type: "parameters",
    key: attrKey,
    categoryLabel: `${item.name} (${paramLabel})`,
    overrideValue: totalValue,
    weaponDamageText: damageText || null,
    weaponDamageHtml,
    defenseButtonsHtml
  });
}
