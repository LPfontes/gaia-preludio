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
          const locKey = CONFIG.GAIA?.damageTypesFlat?.[rawType] ?? CONFIG.GAIA?.damageTypes?.[rawType] ?? rawType;
          const dType = rawType ? (game.i18n.localize(locKey) || rawType) : "";
          damageText = dVal !== "" && dType ? `${dVal} ${dType}` : (dVal || dType || "-");
        } else {
          damageText = String(iSys.damageType);
        }
      }

      // Formatação do Alcance
      let rangeText = "-";
      if (iSys.range) {
        if (typeof iSys.range === "object") {
          const rVal = iSys.range.value ?? "";
          rangeText = rVal !== "" && rVal !== null ? String(rVal) : "-";
        } else {
          rangeText = String(iSys.range);
        }
      }

      // Propriedades e Tooltip (Title)
      let propsText = "-";
      let propsTitle = "";
      if (Array.isArray(iSys.properties)) {
        const names = [];
        const titles = [];
        for (const p of iSys.properties) {
          if (typeof p === "string") {
            names.push(p);
            titles.push(p);
          } else if (p && typeof p === "object") {
            const name = p.name || p.label || p.title || "";
            const desc = p.description || "";
            if (name) {
              names.push(name);
              titles.push(desc ? `${name}: ${desc}` : name);
            }
          }
        }
        propsText = names.length > 0 ? names.join(", ") : "-";
        propsTitle = titles.join("\n");
      } else if (iSys.properties) {
        propsText = String(iSys.properties);
        propsTitle = propsText;
      }

      return {
        id: item.id,
        name: item.name,
        img: item.img,
        damage: damageText,
        range: rangeText,
        properties: propsText,
        propertiesTitle: propsTitle
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

/**
 * Calcula o bônus total de bloqueio fornecido por todos os equipamentos/armaduras equipados no Ator.
 * @param {Actor} actor - Instância do Ator
 * @returns {number} Bônus total de bloqueio dos itens equipados
 */
export function calculateEquipmentBlockBonus(actor) {
  if (!actor || !actor.items) return 0;
  return actor.items.reduce((total, item) => {
    const isEquipped = Boolean(item.system?.equipped);
    if (!isEquipped) return total;
    const blockVal = Number(item.system?.block ?? item.system?.blockBonus ?? 0);
    return total + (isNaN(blockVal) ? 0 : blockVal);
  }, 0);
}

export function getAttrTooltip(actor, attrPath, label = "") {
  const bonusInfo = actor.system?.bonusesCalculated?.[attrPath];
  const cleanLabel = label ? `${label}: ` : "";

  if (attrPath === "block") {
    const rawBase = Number(foundry.utils.getProperty(actor._source ?? {}, "system.block") ?? actor.system?.block ?? 0);
    const equipBonus = calculateEquipmentBlockBonus(actor);
    const paramBonus = bonusInfo?.bonus ?? 0;
    const total = rawBase + equipBonus + paramBonus;
    const parts = [`Base: ${rawBase}`];
    if (equipBonus) parts.push(`Equipamentos: +${equipBonus}`);
    if (paramBonus) parts.push(`Bônus: ${paramBonus >= 0 ? "+" : ""}${paramBonus}`);
    parts.push(`Total: ${total}`);
    return `${cleanLabel}${parts.join(" | ")}`;
  }

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

  // Categorias do Inventário e Habilidades para o Template
  const items = actor.items ?? [];
  
  // Coleta as opções de Legado (Itens do tipo 'legacy')
  const worldLegacies = (game.items?.filter(i => i.type === "legacy") ?? []).map(i => i.name);
  const actorLegacies = (items.filter(i => i.type === "legacy") ?? []).map(i => i.name);
  const allLegacies = Array.from(new Set([...worldLegacies, ...actorLegacies])).filter(Boolean);

  if (system.legacy && !allLegacies.includes(system.legacy)) {
    allLegacies.push(system.legacy);
  }

  allLegacies.sort((a, b) => a.localeCompare(b));

  const legacySelectOptions = {};
  for (const name of allLegacies) {
    legacySelectOptions[name] = name;
  }
  context.legacySelectOptions = legacySelectOptions;

  // Busca o item de Legado correspondente ao Legado selecionado para extrair suas habilidades
  const selectedLegacyName = system.legacy || "";
  context.selectedLegacyName = selectedLegacyName;

  let legacyItem = null;
  if (selectedLegacyName) {
    legacyItem = items.find(i => i.type === "legacy" && i.name.toLowerCase() === selectedLegacyName.toLowerCase());
    if (!legacyItem) {
      legacyItem = game.items?.find(i => i.type === "legacy" && i.name.toLowerCase() === selectedLegacyName.toLowerCase());
    }
  }

  let rawLegacyAbilities = [];
  if (legacyItem?.system?.legacyAbilities && Array.isArray(legacyItem.system.legacyAbilities)) {
    rawLegacyAbilities = legacyItem.system.legacyAbilities;
  } else if (Array.isArray(system.legacyAbilities)) {
    rawLegacyAbilities = system.legacyAbilities;
  }

  const config = /** @type {any} */ (CONFIG).GAIA;

  context.legacyAbilitiesList = rawLegacyAbilities.map((ab, index) => {
    const activeEffect = ab.activeEffect;
    let activeEffectText = "";
    if (typeof activeEffect === "string") {
      activeEffectText = activeEffect;
    } else if (activeEffect && typeof activeEffect === "object") {
      activeEffectText = typeof activeEffect.text === "string" ? activeEffect.text : "";
    }

    const rawAction = ab.typeAction || "";
    const actionTypeLabel = rawAction && config?.actionType?.[rawAction]
      ? game.i18n.localize(config.actionType[rawAction])
      : (rawAction || "");

    const rawType = ab.type || ab.typeAbility || "";
    const typeLabel = rawType && config?.abilitiesTypes?.[rawType]
      ? game.i18n.localize(config.abilitiesTypes[rawType])
      : (rawType !== "ability" ? rawType : "");

    return {
      index,
      name: ab.name || "Habilidade de Legado",
      description: ab.description || "",
      cost: ab.cost || "",
      typeAction: ab.typeAction || "",
      actionTypeLabel,
      typeLabel,
      activeEffectText
    };
  });
  context.abilities = items.filter(i => i.type === "ability").map(item => {
    const rawCategory = item.system?.category || "";
    const categoryLabel = rawCategory && config?.abilityCategories?.[rawCategory]
      ? game.i18n.localize(config.abilityCategories[rawCategory])
      : (rawCategory || "");

    const rawTypes = Array.isArray(item.system?.types) && item.system.types.length > 0 
      ? item.system.types 
      : (item.system?.type ? [item.system.type] : []);
    const localizedTypes = rawTypes.map(t => config?.abilitiesTypes?.[t] ? game.i18n.localize(config.abilitiesTypes[t]) : t).filter(Boolean);
    const firstType = localizedTypes[0] || "";
    const additionalTypes = localizedTypes.slice(1).join(" / ");

    const rawAction = item.system?.typeAction || "";
    const actionLabel = rawAction && config?.actionType?.[rawAction] 
      ? game.i18n.localize(config.actionType[rawAction]) 
      : (rawAction || "");

    const cost = item.system?.cost || "";
    const metaParts = [cost, actionLabel, categoryLabel, firstType].filter(Boolean);
    const metaRow1 = metaParts.join(" | ");

    const rawImprovements = Array.isArray(item.system?.improvements) ? item.system.improvements : [];
    const activeImprovements = rawImprovements.filter(imp => typeof imp === "object" && Boolean(imp.active));

    const rawSubEffects = Array.isArray(item.system?.subEffects) ? item.system.subEffects : [];
    const formattedSubEffects = rawSubEffects.map(sub => {
      const actionTypeRaw = sub.typeAction && config?.actionType?.[sub.typeAction]
        ? game.i18n.localize(config.actionType[sub.typeAction])
        : (sub.typeAction || "");
      const typeRaw = sub.type && config?.abilitiesTypes?.[sub.type]
        ? game.i18n.localize(config.abilitiesTypes[sub.type])
        : (sub.type || "");
      return {
        ...sub,
        actionTypeLabel: actionTypeRaw,
        typeLabel: typeRaw
      };
    });

    return {
      id: item.id,
      name: item.name,
      img: item.img,
      system: item.system,
      categoryLabel,
      firstType,
      additionalTypes,
      hasAdditionalTypes: localizedTypes.length > 1,
      actionLabel,
      cost,
      metaRow1,
      activeImprovements,
      hasActiveImprovements: activeImprovements.length > 0,
      formattedSubEffects
    };
  });

  const formatItem = (item) => formatInventoryItem(item);
  context.inventoryWeapons = items.filter(i => (i.type === "weapon" || i.system?.category === "weapon")).map(formatItem);
  context.inventoryArmor = items.filter(i => (i.type === "armor" || ["armor", "vestuary", "shield", "clothing"].includes(i.system?.category))).map(formatItem);
  context.inventoryConsumables = items.filter(i => ["potion", "consumable", "toxic"].includes(i.system?.category)).map(formatItem);
  context.inventoryCommon = items.filter(i => i.type !== "ability" && i.type !== "weapon" && i.type !== "armor" && !["weapon", "armor", "vestuary", "shield", "clothing", "potion", "consumable", "toxic"].includes(i.system?.category)).map(formatItem);

  // Loga os dados estruturados da ficha no console (F12)
  console.log(`Gaia: Prelúdio | Estrutura de Contexto da Ficha [${actor.name}]:`, context);

  return context;
}

export function formatInventoryItem(item) {
  const iSys = item.system ?? {};

  let damageText = "-";
  if (iSys.damageType) {
    if (typeof iSys.damageType === "object") {
      const dVal = iSys.damageType.value ?? "";
      const rawType = iSys.damageType.type ?? "";
      const locKey = CONFIG.GAIA?.damageTypesFlat?.[rawType] ?? CONFIG.GAIA?.damageTypes?.[rawType] ?? rawType;
      const dType = rawType ? (game.i18n.localize(locKey) || rawType) : "";
      damageText = dVal !== "" && dType ? `${dVal} ${dType}` : (dVal || dType || "-");
    } else {
      damageText = String(iSys.damageType);
    }
  } else if (iSys.damage) {
    damageText = String(iSys.damage);
  }

  let rangeText = "-";
  if (iSys.range) {
    if (typeof iSys.range === "object") {
      const rVal = iSys.range.value ?? "";
      rangeText = rVal !== "" && rVal !== null ? String(rVal) : "-";
    } else {
      rangeText = String(iSys.range);
    }
  }

  let propsText = "-";
  let propsTitle = "";
  if (Array.isArray(iSys.properties)) {
    const names = [];
    const titles = [];
    for (const p of iSys.properties) {
      if (typeof p === "string") {
        names.push(p);
        titles.push(p);
      } else if (p && typeof p === "object") {
        const name = p.name || p.label || p.title || "";
        const desc = p.description || "";
        if (name) {
          names.push(name);
          titles.push(desc ? `${name}: ${desc}` : name);
        }
      }
    }
    propsText = names.length > 0 ? names.join(", ") : "-";
    propsTitle = titles.join("\n");
  } else if (iSys.properties) {
    propsText = String(iSys.properties);
    propsTitle = propsText;
  }

  const rawCat = iSys.category || item.type;
  const config = /** @type {any} */ (CONFIG).GAIA;
  const categoryLabel = config?.equipmentCategories?.[rawCat]
    ? game.i18n.localize(config.equipmentCategories[rawCat])
    : (rawCat || "-");

  return {
    id: item.id,
    name: item.name,
    img: item.img,
    type: item.type,
    system: iSys,
    equipped: Boolean(iSys.equipped),
    quantity: iSys.quantity ?? 1,
    unity: iSys.unity || "-",
    price: iSys.price || "-",
    block: iSys.block ?? "-",
    damage: damageText,
    range: rangeText,
    properties: propsText,
    propertiesTitle: propsTitle,
    categoryLabel
  };
}

