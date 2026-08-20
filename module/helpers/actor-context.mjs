/**
 * ==============================================================================
 * ACTOR CONTEXT HELPERS / AUXILIARES DE CONTEXTO DO ATOR
 * ==============================================================================
 * Funções utilitárias para formatar, estruturar e preparar os dados do Ator
 * para renderização nos templates Handlebars da ficha de personagem (Legado).
 */

/**
 * Constrói um array de pips/diamantes com seus estados ativos/inativos.
 * @param {number} value - Valor atual preenchido
 * @param {number} [max=6] - Quantidade máxima de pips
 * @returns {Array<{value: number, active: boolean}>}
 */
export function buildPips(value, max = 6) {
  const current = Number(value) || 0;
  return Array.from({ length: max }, (_, i) => ({
    value: i + 1,
    active: current >= i + 1
  }));
}

/**
 * Processa e formata os 8 Parâmetros do sistema, dividindo-os em colunas e gerando pips.
 * @param {object} system - Objeto actor.system
 * @returns {{
 *   all: Array<{key: string, label: string, value: number, pips: Array}>,
 *   col1: Array<{key: string, label: string, value: number, pips: Array}>,
 *   col2: Array<{key: string, label: string, value: number, pips: Array}>
 * }}
 */
export function resolveParameters(system) {
  const paramMap = {};
  for (const p of system.parameters ?? []) {
    if (p.name) paramMap[String(p.name).toLowerCase()] = Number(p.value) || 0;
  }

  const paramKeys = [
    "precision", "brutality", "dexterity", "agility",
    "channeling", "arcane", "spirit", "vigor"
  ];

  const resolve = (key) => {
    const rawLabel = CONFIG.GAIA?.parameters?.[key] ?? key;
    const label = typeof rawLabel === "string" ? game.i18n.localize(rawLabel) : String(rawLabel);
    const val = paramMap[key] ?? paramMap[label.toLowerCase()] ?? 0;
    return { key, label, value: val, pips: buildPips(val, 6) };
  };

  const all = paramKeys.map(resolve);
  return {
    all
  };
}

/**
 * Processa e formata os 14 Conhecimentos do sistema, dividindo-os em colunas e gerando pips.
 * @param {object} system - Objeto actor.system
 * @returns {{
 *   all: Array<{key: string, label: string, value: number, pips: Array}>,
 *   col1: Array<{key: string, label: string, value: number, pips: Array}>,
 *   col2: Array<{key: string, label: string, value: number, pips: Array}>
 * }}
 */
export function resolveKnowledge(system) {
  const knowMap = {};
  for (const k of system.knowledge ?? []) {
    if (k.name) knowMap[String(k.name).toLowerCase()] = Number(k.value) || 0;
  }

  const knowKeys = [
    "charisma", "mystic_knowledge", "exploration", "stealth", "history", "intimidation", "intuition",
    "medicine", "perception", "performance", "religion", "survival", "technology", "willpower"
  ];

  const resolve = (key) => {
    const rawLabel = CONFIG.GAIA?.knowledge?.[key] ?? key;
    const label = typeof rawLabel === "string" ? game.i18n.localize(rawLabel) : String(rawLabel);
    const val = knowMap[key] ?? knowMap[label.toLowerCase()] ?? 0;
    return { key, label, value: val, pips: buildPips(val, 6) };
  };

  const all = knowKeys.map(resolve);
  return {
    all
  };
}

/**
 * Resgata a lista de maestrias desbloqueadas pelo personagem com os rótulos traduzidos.
 * @param {object} system - Objeto actor.system
 * @returns {Array<{key: string, label: string}>}
 */
export function resolveMasteries(system) {
  return (system.masteries ?? []).map(masteryKey => {
    let label = masteryKey;
    for (const mObj of Object.values(CONFIG.GAIA?.masteries ?? {})) {
      if (mObj[masteryKey]) {
        label = game.i18n.localize(mObj[masteryKey]);
        break;
      }
    }
    return { key: masteryKey, label };
  });
}

/**
 * Formata os armamentos equipados do ator para exibição na tabela da ficha.
 * @param {Actor} actor - Documento do Ator
 * @returns {Array<{id: string, name: string, img: string, damage: string, range: string, properties: string}>}
 */
export function resolveEquippedWeapons(actor) {
  return (actor.items ?? [])
    .filter(item => (item.type === "weapon" || item.system?.category === "weapon") && Boolean(item.system?.equipped))
    .map(item => {
      const iSys = item.system ?? {};

      // Formatação do Dano
      let damageText = "-";
      if (iSys.damageType) {
        if (typeof iSys.damageType === "object") {
          const dVal = iSys.damageType.value ?? "";
          const rawType = iSys.damageType.type ?? "";
          const dType = rawType ? (game.i18n.localize(CONFIG.GAIA?.damageTypes?.[rawType] ?? rawType) || rawType) : "";
          damageText = dVal && dType ? `${dVal} ${dType}` : (dVal || dType || "-");
        } else {
          damageText = String(iSys.damageType);
        }
      }

      // Formatação do Alcance
      let rangeText = "-";
      if (iSys.range) {
        if (typeof iSys.range === "object") {
          const rVal = iSys.range.value ?? "";
          const rType = iSys.range.type ? (game.i18n.localize(`GAIA.Range.${iSys.range.type}`) || iSys.range.type) : "";
          rangeText = rVal && rType ? `${rVal} (${rType})` : (rVal || rType || "-");
        } else {
          rangeText = String(iSys.range);
        }
      }

      // Propriedades
      let propsText = "-";
      if (Array.isArray(iSys.properties)) {
        propsText = iSys.properties.length > 0 ? iSys.properties.join(", ") : "-";
      } else if (iSys.properties) {
        propsText = String(iSys.properties);
      }

      return {
        id: item.id,
        name: item.name,
        img: item.img,
        damage: damageText,
        range: rangeText,
        properties: propsText
      };
    });
}

export function prepareParameterBonuses(actor) {
  const bonusResults = {};
  if (!actor.system?.parametersBonus || !Array.isArray(actor.system.parametersBonus)) return bonusResults;

  for (const item of actor.system.parametersBonus) {
    const path = item.attr; // Ex: "health.value" ou "movement"
    const bonus = Number(item.bonus) || 0;
    // 1. Lê o valor original existente no caminho especificado
    const originalValue = Number(foundry.utils.getProperty(actor.system, path)) || 0;
    const totalValue = originalValue + bonus;

    // 2. Aplica o bônus somando ao valor no sistema
    foundry.utils.setProperty(actor.system, path, totalValue);

    // 3. Mapeia a estrutura com o valor original e o bônus
    bonusResults[path] = {
      original: originalValue,
      bonus: bonus,
      total: totalValue
    };
  }

  return bonusResults;
}
export function getAttrTooltip(actor, attrPath, label = "") {
  const bonusInfo = actor.system?.bonusesCalculated?.[attrPath];
  const cleanLabel = label ? `${label}: ` : "";

  if (bonusInfo) {
    const { original, bonus, total } = bonusInfo;
    const bonusSign = bonus >= 0 ? `+${bonus}` : `${bonus}`;
    return `${cleanLabel}Base: ${original} | Bônus: ${bonusSign} | Total: ${total}`;
  }

  const rawBase = foundry.utils.getProperty(actor._source ?? {}, `system.${attrPath}`) 
               ?? foundry.utils.getProperty(actor.system, attrPath) 
               ?? 0;
  return `${cleanLabel}Base: ${rawBase}`;
}

/**
 * Prepara todo o contexto de dados necessário para renderizar a ficha do Legado / Legacy.
 * @param {ActorSheetV2} sheet - Instância da ficha
 * @param {object} context - Contexto base fornecido pelo ActorSheetV2
 * @returns {Promise<object>} Contexto enriquecido para o template
 */
export async function prepareLegacySheetContext(sheet, context) {
  const actor = sheet.actor;
  const system = actor.system;
  const maxExhaustion = 6;

  context.actor = actor;
  context.system = system;
  // Valor de Agilidade e Iniciativa
  const agilityParam = system.parameters?.find(p => {
    const name = String(p.name || "").toLowerCase();
    return name === "agility" || name === "agilidade";
  });
  context.agilityValue = Number(agilityParam?.value ?? system.agility?.value ?? system.agility ?? 0);
  context.initiativeValue = context.agilityValue;
  
  // Pips de Exaustão (1 a 6)
  context.exhaustionPips = buildPips(system.exhaustion, maxExhaustion);

  // Tooltips com Valor Base + Bônus para os atributos da ficha
  context.tooltips = {
    movement: getAttrTooltip(actor, "movement", "Movimento"),
    healthMax: getAttrTooltip(actor, "health.max", "Vida Máxima"),
    passivePerception: getAttrTooltip(actor, "passivePerception", "Percepção Passiva"),
    block: getAttrTooltip(actor, "block", "Bloqueio")
  };

  // Parâmetros (8)
  const params = resolveParameters(system);
  context.parameters = params.all;
  // Conhecimentos (14)
  const knows = resolveKnowledge(system);
  context.knowledge = knows.all;
  // Maestrias
  context.unlockedMasteries = resolveMasteries(system);

  // Armamentos Equipados
  context.equippedWeapons = resolveEquippedWeapons(actor);

  // Categorias do Inventário para o Template
  const items = actor.items ?? [];
  context.inventoryWeapons = items.filter(i => (i.type === "weapon" || i.system?.category === "weapon"));
  context.inventoryArmor = items.filter(i => (i.type === "armor" || ["armor", "vestuary", "shield", "clothing"].includes(i.system?.category)));
  context.inventoryConsumables = items.filter(i => ["potion", "consumable", "toxic"].includes(i.system?.category));
  context.inventoryCommon = items.filter(i => i.type !== "ability" && i.type !== "weapon" && i.type !== "armor" && !["weapon", "armor", "vestuary", "shield", "clothing", "potion", "consumable", "toxic"].includes(i.system?.category));

  // Loga os dados estruturados da ficha no console (F12)
  console.log(`Gaia: Prelúdio | Estrutura de Contexto da Ficha [${actor.name}]:`, context);

  return context;
}

export { prepareLegacySheetContext as prepareLegadoSheetContext };
