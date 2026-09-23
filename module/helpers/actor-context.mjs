/**
 * ==============================================================================
 * ACTOR CONTEXT HELPERS / AUXILIARES DE CONTEXTO DO ATOR
 * ==============================================================================
 * Funções utilitárias para formatar, estruturar e preparar os dados do Ator
 * para renderização nos templates Handlebars da ficha de personagem (Legado).
 */

import { GAIA } from "./config.mjs";
import { getStatEntry } from "./stat-rolls.mjs";
import { getHomunculariumDamageFormula } from "./homuncularium-rules.mjs";

/**
 * Lista canônica dos 21 Legados Oficiais de Auroria.
 */
export const CANONICAL_LEGACIES = [
  "Alraune",
  "Anão",
  "Daeva",
  "Delahk",
  "Draenum",
  "Elemental",
  "Elfo",
  "Forjado",
  "Humano",
  "Inari",
  "Kahatsza",
  "Kitari",
  "Minotauro",
  "Netune",
  "Orkrash",
  "Seiko",
  "Ursar",
  "Valdrak",
  "Venneli",
  "Yuansu",
  "Zaokan"
];

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
    let knowledgeKey = "";
    let knowledgeLabel = "";

    for (const [kKey, mObj] of Object.entries(CONFIG.GAIA?.masteries ?? {})) {
      if (mObj[masteryKey]) {
        label = game.i18n.localize(mObj[masteryKey]);
        knowledgeKey = kKey;
        const kRaw = CONFIG.GAIA?.knowledge?.[kKey] ?? kKey;
        knowledgeLabel = typeof kRaw === "string" ? game.i18n.localize(kRaw) : kKey;
        break;
      }
    }
    return { key: masteryKey, label, knowledgeKey, knowledgeLabel };
  });
}

/**
 * Calcula o dano de um armamento com base na regra oficial de Gaia: Prelúdio:
 * "O dano causado por um Armamento é igual ao seu Dano Base,
 * mais o seu Dano Base adicionalmente para cada ponto no seu respectivo Parâmetro."
 * Dano Total = DanoBase + (Parâmetro * DanoBase) = DanoBase * (1 + Parâmetro)
 *
 * @param {Item|object} item - Documento do Item ou dados da arma
 * @param {Actor|null} [actor=null] - Documento do Ator proprietário (opcional, fallback item.actor)
 * @returns {{
 *   baseDamage: number,
 *   paramValue: number,
 *   paramLabel: string,
 *   paramKey: string,
 *   totalDamage: number,
 *   damageType: string,
 *   damageText: string,
 *   damageTitle: string
 * }}
 */
export function calculateWeaponDamage(item, actor = null) {
  const iSys = item?.system ?? {};
  const effectiveActor = actor || item?.actor || null;

  // Ataques do Homuncularium (Golpe Brutal e Evocação Mística): 1d8 (ou 1d10 em Difícil/Extrema) por ponto de Poder
  const isHomunculariumAttack = item?.flags?.["gaia-preludio"]?.isHomunculariumAttack ||
    item?.name === "Golpe Brutal" ||
    item?.name === "Evocação Mística";

  if (isHomunculariumAttack) {
    const dmg = getHomunculariumDamageFormula(effectiveActor, item);
    return {
      baseDamage: 1,
      paramValue: dmg.power,
      paramLabel: "Poder",
      paramKey: "powerPoints",
      totalDamage: 0,
      isFormula: true,
      formula: dmg.formula,
      damageType: dmg.damageType,
      damageTypeLabel: dmg.damageTypeLabel,
      damageText: dmg.damageText,
      damageTitle: `Dano do Homuncularium (${dmg.power} × ${dmg.die}): ${dmg.damageText}`
    };
  }

  let baseDamage = 0;
  let damageType = "";
  if (iSys.damageType) {
    if (typeof iSys.damageType === "object") {
      baseDamage = Number(iSys.damageType.value) || 0;
      damageType = iSys.damageType.type ?? "";
    } else {
      const match = String(iSys.damageType).match(/(\d+)/);
      if (match) baseDamage = parseInt(match[1], 10);
      damageType = String(iSys.damageType).replace(/^\d+\s*/, "").trim();
    }
  } else if (iSys.damage) {
    const match = String(iSys.damage).match(/(\d+)/);
    if (match) baseDamage = parseInt(match[1], 10);
  }

  const paramKey = String(iSys.attackParameter?.attribute || "precision").toLowerCase();

  let paramValue = 0;
  let paramLabel = paramKey;
  if (effectiveActor?.system) {
    const statEntry = getStatEntry(effectiveActor.system, "parameters", paramKey);
    paramValue = Math.max(0, Number(statEntry.value) || 0);
    paramLabel = statEntry.label || paramKey;
  }

  const totalDamage = baseDamage > 0 ? baseDamage + (paramValue * baseDamage) : 0;
  const locKey = CONFIG.GAIA?.damageTypesFlat?.[damageType] ?? CONFIG.GAIA?.damageTypes?.[damageType] ?? damageType;
  const dTypeLocalized = damageType ? (game.i18n.localize(locKey) || damageType) : "";

  let damageText = "-";
  if (totalDamage > 0) {
    damageText = dTypeLocalized ? `${totalDamage} ${dTypeLocalized}` : String(totalDamage);
  } else if (baseDamage > 0) {
    damageText = dTypeLocalized ? `${baseDamage} ${dTypeLocalized}` : String(baseDamage);
  }

  const damageTitle = baseDamage > 0
    ? `Dano Base: ${baseDamage} + (${paramValue} × ${baseDamage} [${paramLabel}]) = ${totalDamage || baseDamage}${dTypeLocalized ? ` (${dTypeLocalized})` : ""}`
    : "";

  return {
    baseDamage,
    paramValue,
    paramLabel,
    paramKey,
    totalDamage,
    damageType,
    damageText,
    damageTitle
  };
}

/**
 * Formata os armamentos equipados do ator para exibição na tabela da ficha.
 * @param {Actor} actor - Documento do Ator
 * @returns {Array<{id: string, name: string, img: string, damage: string, damageTitle: string, range: string, properties: string, propertiesTitle: string}>}
 */
export function resolveEquippedWeapons(actor) {
  return (actor.items ?? [])
    .filter(item => (item.type === "weapon" || item.system?.category === "weapon") && Boolean(item.system?.equipped))
    .map(item => {
      const iSys = item.system ?? {};

      // Formatação do Dano com cálculo de Parâmetro
      const { damageText, damageTitle } = calculateWeaponDamage(item, actor);

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
        damageTitle,
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

  if (attrPath === "movement") {
    const rawBase = Number(foundry.utils.getProperty(actor._source ?? {}, "system.movement") ?? actor.system?.movement ?? 0);
    const paramBonus = bonusInfo?.bonus ?? 0;
    const exhaustion = Number(actor.system?.exhaustion) || 0;
    const total = Math.max(0, rawBase + paramBonus - exhaustion);
    const parts = [`Base: ${rawBase}m`];
    if (paramBonus) parts.push(`Bônus: ${paramBonus >= 0 ? "+" : ""}${paramBonus}m`);
    if (exhaustion) parts.push(`Exaustão: -${exhaustion}m`);
    parts.push(`Total: ${total}m`);
    return `${cleanLabel}${parts.join(" | ")}`;
  }

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
/**
 * Enriquece o contexto da ficha de personagem (Legado) dividindo por partes ou completo.
 * @param {ActorSheetV2} sheet - Instância da Ficha do Ator
 * @param {object} context - Contexto base fornecido pelo ActorSheetV2
 * @returns {Promise<object>} Contexto enriquecido para o template
 */
export async function prepareLegacySheetContext(sheet, context) {
  const actor = sheet.actor;
  context.actor = actor;
  context.system = actor.system;

  prepareSidebarContext(actor, context);
  preparePersonagemContext(actor, context);
  prepareInventoryContext(actor, context);
  prepareAbilitiesContext(actor, context);
  prepareBioContext(actor, context);
  prepareEffectsContext(actor, context);

  return context;
}

/**
 * Prepara o contexto para a Sidebar / Banner do Ator.
 */
export function prepareSidebarContext(actor, context) {
  const system = actor.system;
  const maxExhaustion = 6;

  // Valor de Agilidade e Iniciativa
  const agilityParam = system.parameters?.find(p => {
    const name = String(p.name || "").toLowerCase();
    return name === "agility" || name === "agilidade";
  });
  context.agilityValue = Number(agilityParam?.value ?? system.agility?.value ?? system.agility ?? 0);
  context.initiativeValue = context.agilityValue;

  // Pips de Exaustão (1 a 6) e status de Morte por Exaustão
  const currentExhaustion = Math.clamp(Number(system.exhaustion) || 0, 0, maxExhaustion);
  context.exhaustionPips = buildPips(currentExhaustion, maxExhaustion);
  context.isDeadByExhaustion = currentExhaustion >= 6;

  // Sistema de Dado de Morte (Incapacitado: Sentenças do Corruptor e Dádivas do Artesão)
  const deathSentences = Number(system.death?.sentences ?? 0);
  const deathGifts = Number(system.death?.gifts ?? 0);
  const isStabilized = Boolean(system.death?.stabilized);
  const hp = Number(system.health?.value ?? 0);
  const hasIncapacitatedCondition = actor.effects?.some(e =>
    String(e.name || "").toLowerCase() === "incapacitado" ||
    e.statuses?.has?.("incapacitado") ||
    (Array.isArray(e.statuses) && e.statuses.includes("incapacitado"))
  );
  const isIncapacitated = hp <= 0 || Boolean(hasIncapacitatedCondition);
  const isDeadByDeathDie = deathSentences >= 2;

  context.isIncapacitated = isIncapacitated;
  context.isDeadByDeathDie = isDeadByDeathDie;
  context.isDead = context.isDeadByExhaustion || isDeadByDeathDie;
  context.isStabilized = isStabilized;
  context.showDeathCard = isIncapacitated || isStabilized || deathSentences > 0 || deathGifts > 0;
  context.deathSentencesPips = buildPips(deathSentences, 2);
  context.deathGiftsPips = buildPips(deathGifts, 2);

  // Tooltips com Valor Base + Bônus para os atributos da ficha
  const visionTotal = system.vision?.total ?? 40;
  const visionPerc = system.vision?.perceptionBonus ?? 0;
  const visionPrecise = system.vision?.precise ?? (visionTotal / 2);
  let visionEnvNotice = "";
  if (system.hasDarkness) {
    visionEnvNotice = " [ESCURIDÃO ATIVA: Visão e alcance máx. limitados a 4m, Inaptidão em Percepção, PP reduzida pela metade, -1 Precisão/Canalização]";
  } else if (system.hasPenumbra) {
    visionEnvNotice = " [PENUMBRA ATIVA: Visão e alcance máx. limitados a 10m, -1 Percepção e PP]";
  }
  const visionTooltip = `Alcance da Visão: ${visionTotal}m (Base 40m + ${visionPerc}m por Percepção) • Visão Precisa/Detalhada: até ${visionPrecise}m${visionEnvNotice}`;

  context.tooltips = {
    movement: getAttrTooltip(actor, "movement", "Movimento"),
    healthMax: getAttrTooltip(actor, "health.max", "Vida Máxima"),
    passivePerception: `${getAttrTooltip(actor, "passivePerception", "Percepção Passiva")}\n${visionTooltip}`,
    vision: visionTooltip,
    block: getAttrTooltip(actor, "block", "Bloqueio"),
    exhaustion: game.i18n.localize("GAIA.Banner.ExhaustionRule")
      || "Exaustão: Para cada 1 ponto, penalidade de -1 em testes de Parâmetro e Bloqueio, e -1m na Movimentação. Ao atingir 6 pontos, o personagem morre.",
    deathDie: game.i18n.localize("GAIA.DeathDie.RuleTooltip")
      || "Dado de Morte (1d12): 1-6 = Sentença do Corruptor (2 = Morte) | 7-12 = Dádiva do Artesão (2 = Estabilizado). A cada 10 min estabilizado, regenera 1d4 PV."
  };

  // Coleta as opções de Legado (Config canônica dos 21 legados, Itens do Mundo, do Ator e Compêndios)
  const items = actor.items ?? [];
  const configLegacies = Object.values(CONFIG.GAIA?.legacies ?? {});
  const worldLegacies = (game.items?.filter(i => i.type === "legacy") ?? []).map(i => i.name);
  const actorLegacies = (items.filter(i => i.type === "legacy") ?? []).map(i => i.name);
  const compendiumLegacies = [];
  for (const pack of (game.packs?.filter(p => p.documentName === "Item") ?? [])) {
    if (pack.index) {
      for (const entry of pack.index) {
        if (entry.type === "legacy" && entry.name) compendiumLegacies.push(entry.name);
      }
    }
  }

  const allLegacies = Array.from(new Set([
    ...CANONICAL_LEGACIES,
    ...configLegacies,
    ...worldLegacies,
    ...actorLegacies,
    ...compendiumLegacies
  ])).filter(Boolean);

  if (system.legacy && !allLegacies.includes(system.legacy)) {
    allLegacies.push(system.legacy);
  }
  allLegacies.sort((a, b) => a.localeCompare(b, "pt-BR"));

  const legacySelectOptions = {};
  for (const name of allLegacies) {
    legacySelectOptions[name] = name;
  }
  context.legacySelectOptions = legacySelectOptions;

  const selectedLegacyName = system.legacy || "";
  context.selectedLegacyName = selectedLegacyName;

  let legacyItem = null;
  if (selectedLegacyName) {
    legacyItem = items.find(i => i.type === "legacy" && i.name.toLowerCase() === selectedLegacyName.toLowerCase());
    if (!legacyItem) {
      legacyItem = game.items?.find(i => i.type === "legacy" && i.name.toLowerCase() === selectedLegacyName.toLowerCase());
    }
    if (!legacyItem) {
      for (const pack of (game.packs?.filter(p => p.documentName === "Item") ?? [])) {
        if (pack.index) {
          const entry = pack.index.find(e => e.type === "legacy" && e.name?.toLowerCase() === selectedLegacyName.toLowerCase());
          if (entry) {
            legacyItem = pack.get(entry._id) || entry;
            break;
          }
        }
      }
    }
  }
  if (!legacyItem) {
    legacyItem = items.find(i => i.type === "legacy");
  }
  context.legacyItem = legacyItem;

  return context;
}

/**
 * Prepara o contexto para a Aba de Personagem (Parâmetros, Conhecimentos, Maestrias, Defesas).
 */
export function preparePersonagemContext(actor, context) {
  const system = actor.system;
  context.parameters = resolveParameters(system).all;
  context.knowledge = resolveKnowledge(system).all;
  context.unlockedMasteries = resolveMasteries(system);
  context.equippedWeapons = resolveEquippedWeapons(actor);
  return context;
}

/**
 * Prepara o contexto para a Aba de Inventário (Armas, Armaduras, Relíquias, Consumíveis, Itens Comuns).
 */
export function prepareInventoryContext(actor, context) {
  const items = actor.items ?? [];
  const formatItem = (item) => formatInventoryItem(item, actor);
  context.inventoryWeapons = items.filter(i => (i.type === "weapon" || i.system?.category === "weapon")).map(formatItem);
  context.inventoryArmor = items.filter(i => (i.type === "armor" || ["armor", "vestuary", "shield", "clothing"].includes(i.system?.category))).map(formatItem);
  context.inventoryRelics = items.filter(i => (i.type === "relic" || i.system?.category === "relic")).map(formatItem);
  context.inventoryConsumables = items.filter(i => ["potion", "consumable", "toxic"].includes(i.system?.category)).map(formatItem);
  const nonInventoryTypes = ["ability", "legacy", "path", "feature", "weapon", "armor", "relic"];
  context.inventoryCommon = items.filter(i => !nonInventoryTypes.includes(i.type) && !["weapon", "armor", "vestuary", "shield", "clothing", "potion", "consumable", "toxic", "relic"].includes(i.system?.category)).map(formatItem);

  // Monitoramento de Potência de Véu das Relíquias Vinculadas
  const boundRelics = items.filter(i => (i.type === "relic" || i.system?.category === "relic") && Boolean(i.system?.isBound));
  const maxBoundPotency = CONFIG.GAIA?.maxBoundRelicPotency ?? 5;
  const totalBoundPotency = boundRelics.reduce((sum, r) => sum + (Number(r.system?.potency) || 0), 0);
  const isRelicOverloaded = totalBoundPotency > maxBoundPotency;
  const relicOverloadAmount = isRelicOverloaded ? totalBoundPotency - maxBoundPotency : 0;

  context.boundRelics = boundRelics;
  context.totalBoundPotency = totalBoundPotency;
  context.maxBoundPotency = maxBoundPotency;
  context.isRelicOverloaded = isRelicOverloaded;
  context.relicOverloadAmount = relicOverloadAmount;
  context.relicPotencyPips = buildPips(Math.min(totalBoundPotency, maxBoundPotency), maxBoundPotency);

  // PT: Peso total do inventário (soma de Unidades × Quantidade de todos os itens)
  // EN: Total inventory weight (sum of Unity × Quantity for all inventory items)
  const allInventoryItems = [
    ...context.inventoryWeapons,
    ...context.inventoryArmor,
    ...context.inventoryRelics,
    ...context.inventoryConsumables,
    ...context.inventoryCommon
  ];
  const totalInventoryUnity = allInventoryItems.reduce((sum, item) => {
    const u = Number(item.unity);
    const q = Number(item.quantity ?? 1);
    return sum + (isNaN(u) ? 0 : u * q);
  }, 0);
  context.totalInventoryUnity = totalInventoryUnity;

  return context;
}

/**
 * Prepara o contexto para a Aba de Habilidades (Caminho e Legado).
 */
export function prepareAbilitiesContext(actor, context, collapsedSet = null) {
  const system = actor.system;
  const items = actor.items ?? [];
  const config = /** @type {any} */ (CONFIG).GAIA;

  const selectedLegacyName = system.legacy || "";
  let legacyItem = null;
  if (selectedLegacyName) {
    legacyItem = items.find(i => i.type === "legacy" && i.name.toLowerCase() === selectedLegacyName.toLowerCase());
    if (!legacyItem) {
      legacyItem = game.items?.find(i => i.type === "legacy" && i.name.toLowerCase() === selectedLegacyName.toLowerCase());
    }
    if (!legacyItem) {
      for (const pack of (game.packs?.filter(p => p.documentName === "Item") ?? [])) {
        if (pack.index) {
          const entry = pack.index.find(e => e.type === "legacy" && e.name?.toLowerCase() === selectedLegacyName.toLowerCase());
          if (entry) {
            legacyItem = pack.get(entry._id) || entry;
            break;
          }
        }
      }
    }
  }
  if (!legacyItem) {
    legacyItem = items.find(i => i.type === "legacy");
  }

  let rawLegacyAbilities = [];
  if (legacyItem?.system?.legacyAbilities && Array.isArray(legacyItem.system.legacyAbilities)) {
    rawLegacyAbilities = legacyItem.system.legacyAbilities;
  } else if (Array.isArray(system.legacyAbilities)) {
    rawLegacyAbilities = system.legacyAbilities;
  }

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

    const isEffectActive = (actor.effects ?? []).some(e => !e.disabled && (e.name === ab.name || e.flags?.gaia?.abilityName === ab.name));
    const idKey = String(index);
    const nameKey = String(ab.name || "").trim();
    const isCollapsed = Boolean(collapsedSet?.has(idKey) || collapsedSet?.has(nameKey));

    return {
      index,
      name: ab.name || "Habilidade de Legado",
      description: ab.description || "",
      cost: ab.cost || "",
      typeAction: ab.typeAction || "",
      actionTypeLabel,
      typeLabel,
      activeEffectText,
      isEffectActive,
      isCollapsed
    };
  });

  const formatAbilityOrFeature = (item) => {
    const isFeature = item.type === "feature";
    const rawCategory = String(item.system?.category || "").trim();
    const rawCatNorm = rawCategory.toLowerCase();
    const isGenericType = rawCatNorm === "caracteristica" || rawCatNorm === "característica" || rawCatNorm === "feature" || rawCatNorm === "ability" || rawCatNorm === "habilidade";

    const categoryDict = isFeature ? config?.featureCategories : config?.abilityCategories;
    let categoryLabel = "";
    if (rawCategory && !isGenericType) {
      categoryLabel = categoryDict?.[rawCatNorm] ? game.i18n.localize(categoryDict[rawCatNorm]) : rawCategory;
    }

    const rawTypes = Array.isArray(item.system?.types) && item.system.types.length > 0
      ? item.system.types
      : (item.system?.type ? [item.system.type] : []);
    const localizedTypes = rawTypes.map(t => config?.abilitiesTypes?.[t] ? game.i18n.localize(config.abilitiesTypes[t]) : t).filter(Boolean);
    const firstType = localizedTypes[0] || "";
    const additionalTypes = localizedTypes.slice(1).join(" / ");

    // Evita duplicar categoria caso seja idêntica ao primeiro tipo (ex: "Passiva")
    if (categoryLabel && firstType && categoryLabel.toLowerCase() === firstType.toLowerCase()) {
      categoryLabel = "";
    }

    const rawAction = item.system?.typeAction || "";
    const actionLabel = rawAction && config?.actionType?.[rawAction]
      ? game.i18n.localize(config.actionType[rawAction])
      : (rawAction || "");

    const cost = item.system?.cost || "";

    // Monta spans estilizados para a meta-row-1
    const metaSpanParts = [];
    if (cost) metaSpanParts.push(`<span class="meta-cost">${cost}</span>`);
    if (actionLabel) metaSpanParts.push(`<span class="meta-action">${actionLabel}</span>`);
    if (categoryLabel) metaSpanParts.push(`<span class="meta-category">${categoryLabel}</span>`);
    if (firstType) metaSpanParts.push(`<span class="meta-type">${firstType}</span>`);

    const dividerHtml = `<span class="meta-divider">|</span>`;
    const metaRow1 = metaSpanParts.join(` ${dividerHtml} `);

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
      type: item.type,
      isFeature,
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
      formattedSubEffects,
      isCollapsed: Boolean(collapsedSet?.has(item.id) || collapsedSet?.has(item.name?.trim()))
    };
  };

  context.abilities = items.filter(i => i.type === "ability" || i.type === "feature").map(formatAbilityOrFeature);
  context.features = items.filter(i => i.type === "feature").map(formatAbilityOrFeature);

  return context;
}

/**
 * Prepara o contexto para a Aba de Biografia e Idiomas.
 */
export function prepareBioContext(actor, context) {
  const config = /** @type {any} */ (CONFIG).GAIA;
  const rawLangs = actor.system?.languages ?? [];
  context.languagesList = rawLangs.map(langKey => {
    const key = String(langKey).toLowerCase();
    let label = langKey;
    let categoryLabel = "";
    if (config?.allLanguages?.[key]) {
      label = game.i18n.localize(config.allLanguages[key].label);
      categoryLabel = game.i18n.localize(config.allLanguages[key].categoryLabel || "");
    } else if (key === "comum") {
      label = game.i18n.localize("GAIA.Language.Comum") || "Comum";
    }
    return {
      key: langKey,
      label,
      categoryLabel
    };
  });
  return context;
}

/**
 * Prepara o contexto para a Aba de Efeitos Ativos e Passivos.
 */
export function prepareEffectsContext(actor, context) {
  context.effects = prepareActiveEffectCategories(actor);
  return context;
}

/**
 * Categoriza os Efeitos Ativos de um Documento (Ator ou Item) em passivos, ativos/temporários e inativos.
 * @param {Actor|Item} doc - Documento proprietário dos efeitos
 * @returns {{
 *   passive: { type: string, label: string, effects: Array<object> },
 *   active: { type: string, label: string, effects: Array<object> },
 *   inactive: { type: string, label: string, effects: Array<object> }
 * }}
 */
export function prepareActiveEffectCategories(doc) {
  const effects = doc?.effects ?? [];
  const entries = [];
  const active = [];
  const inactive = [];

  for (const effect of effects) {
    const effectImg = String(effect.img || effect.icon || "").toLowerCase();
    let displayName = effect.name || "Efeito Sem Nome";
    const docName = String(doc?.name || "").toLowerCase();

    if (displayName === "Novo Efeito") {
      if (effectImg.includes("leaf-glowing-green") || docName.includes("proteção da natureza") || docName.includes("protecao da natureza")) {
        displayName = "Proteção da Natureza";
      } else if (effectImg.includes("skull-horned-goat-purple") || docName.includes("abraço da treva") || docName.includes("abraco da treva")) {
        displayName = "Abraço da Treva";
      } else if (effectImg.includes("breastplate-helmet-metal") || docName.includes("corpo de ferro")) {
        displayName = "Corpo de Ferro";
      } else if (effectImg.includes("weapons-crossed-axes-bull") || docName.includes("filho de nolgadan")) {
        displayName = "Filho de Nolgadan";
      }
    }

    const validChanges = (effect.changes || []).map(c => {
      if (!c.key && !c.value) return null;
      const rawKey = c.key?.replace(/^system\./, "") || c.key || "";
      if (!rawKey && !c.value) return null;

      // Tratamentos específicos de regras de GAIA
      if (rawKey === "damageResistance") {
        const typeKey = String(c.value || "").toLowerCase().trim();
        if (!typeKey || typeKey === "1" || !isNaN(Number(typeKey))) return null;
        const locKey = CONFIG.GAIA?.damageTypesFlat?.[typeKey] ?? CONFIG.GAIA?.damageTypes?.[typeKey];
        const typeLoc = locKey ? game.i18n.localize(locKey) : (typeKey ? typeKey.charAt(0).toUpperCase() + typeKey.slice(1) : "Natureza");
        return `Resistência: ${typeLoc || "Natureza"}`;
      }
      if (rawKey === "conditionImmunity") {
        const cond = String(c.value || "").trim().toLowerCase();
        if (!cond || cond === "1" || !isNaN(Number(cond))) return null;
        let label = cond ? (cond.charAt(0).toUpperCase() + cond.slice(1)) : "Envenenado";
        if (cond === "lentidao" || cond === "lentidão") label = "Lentidão";
        if (cond === "terreno dificil" || cond === "terrenos dificeis") label = "Terreno Difícil";
        return `Imunidade: ${label}`;
      }
      if (rawKey === "movement.walk" || rawKey === "movement") {
        return `Deslocamento: ${Number(c.value) > 0 ? `+${c.value}` : c.value}m`;
      }
      if (rawKey === "encumbrance.max" || rawKey === "encumbrance") {
        return `Carga Máx: ${Number(c.value) > 0 ? `+${c.value}` : c.value}`;
      }
      if (rawKey === "all_parameters") {
        return `Todos Parâmetros: ${Number(c.value) > 0 ? `+${c.value}` : c.value}`;
      }
      if (rawKey === "hpDie") {
        return `Dado de PV: ${c.value}`;
      }
      if (rawKey === "hpFixed") {
        return `PV Fixo: ${c.value}`;
      }

      const keyLabel = CONFIG.GAIA?.parameters?.[rawKey]
        ? game.i18n.localize(CONFIG.GAIA.parameters[rawKey])
        : (CONFIG.GAIA?.ChangeKey?.[rawKey] ? game.i18n.localize(CONFIG.GAIA.ChangeKey[rawKey]) : rawKey);

      if (!keyLabel && !c.value) return null;
      const numVal = Number(c.value);
      const modSign = !isNaN(numVal) && numVal > 0 ? `+${c.value}` : String(c.value ?? "");

      if (keyLabel && modSign) return `${keyLabel}: ${modSign}`;
      if (keyLabel) return keyLabel;
      if (modSign) return modSign;
      return null;
    }).filter(Boolean);

    let changesSummary = validChanges.join(", ");
    if (!changesSummary && (displayName.toLowerCase().includes("proteção da natureza") || displayName.toLowerCase().includes("protecao da natureza"))) {
      changesSummary = "Resistência: Natureza, Imunidade: Envenenado";
    }
    if (!changesSummary && displayName.toLowerCase().includes("fortitude ampliada")) {
      changesSummary = "Dado de PV: 1d8 (ou 4 fixo)";
    }
    const normDisplayName = displayName.toLowerCase();
    if (!changesSummary && (normDisplayName.includes("abraço da treva") || normDisplayName.includes("abraco da treva"))) {
      changesSummary = "Resistência: Trevas, Imunidade: Enfraquecido";
    }
    if (!changesSummary && normDisplayName.includes("corpo de ferro")) {
      changesSummary = "Imunidade: Envenenado, Sangramento";
    }
    if (!changesSummary && normDisplayName.includes("filho de nolgadan")) {
      changesSummary = "Imunidade: Lentidão, Terreno Difícil";
    }

    const rawDurationLabel = String(effect.duration?.label ?? "").trim();
    const isNoneDuration = !rawDurationLabel || rawDurationLabel.toLowerCase() === "none" || rawDurationLabel.toLowerCase() === "nenhum";
    let durationText = "";
    if (!isNoneDuration) {
      durationText = rawDurationLabel;
    } else if (effect.duration?.seconds) {
      durationText = `${effect.duration.seconds}s`;
    } else if (effect.duration?.rounds) {
      durationText = `${effect.duration.rounds} rodadas`;
    }

    const formattedEffect = {
      id: effect.id,
      name: displayName,
      img: effect.img || effect.icon || "icons/svg/aura.svg",
      disabled: Boolean(effect.disabled),
      isSuppressed: Boolean(effect.isSuppressed),
      sourceName: effect.sourceName || (effect.parent?.name ?? ""),
      durationText,
      changes: changesSummary
    };

    entries.push(formattedEffect);
    if (effect.disabled) {
      inactive.push(formattedEffect);
    } else {
      active.push(formattedEffect);
    }
  }

  return {
    entries,
    active: { effects: active, count: active.length },
    inactive: { effects: inactive, count: inactive.length },
    all: entries,
    length: entries.length
  };
}

export function formatInventoryItem(item, actor = null) {
  const iSys = item.system ?? {};
  const effectiveActor = actor || item.actor || null;

  let damageText = "-";
  let damageTitle = "";
  if (item.type === "weapon" || iSys.category === "weapon" || Boolean(iSys.attackParameter)) {
    const calc = calculateWeaponDamage(item, effectiveActor);
    damageText = calc.damageText;
    damageTitle = calc.damageTitle;
  } else if (iSys.damageType) {
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
  let categoryLabel = "-";
  if (item.type === "relic" || rawCat === "relic" || config?.relicCategories?.[rawCat]) {
    const relicCatObj = config?.relicCategories?.[rawCat];
    categoryLabel = relicCatObj ? game.i18n.localize(relicCatObj.label) : (game.i18n.localize("GAIA.Relic.Name") || "Relíquia");
  } else if (config?.equipmentCategories?.[rawCat]) {
    categoryLabel = game.i18n.localize(config.equipmentCategories[rawCat]);
  } else if (rawCat && game.i18n.has(`GAIA.EquipmentCategory.${rawCat}`)) {
    categoryLabel = game.i18n.localize(`GAIA.EquipmentCategory.${rawCat}`);
  } else if (rawCat && game.i18n.has(`TYPES.Item.${rawCat}`)) {
    categoryLabel = game.i18n.localize(`TYPES.Item.${rawCat}`);
  } else if (rawCat === "legacy") {
    categoryLabel = game.i18n.localize("GAIA.title.Legacy") || "Legado";
  } else if (rawCat) {
    categoryLabel = rawCat;
  }

  const defaultPotency = config?.relicCategories?.[rawCat]?.potency ?? 0;
  const potency = Number(iSys.potency ?? defaultPotency);

  return {
    id: item.id,
    name: item.name,
    img: item.img,
    type: item.type,
    system: iSys,
    equipped: Boolean(iSys.equipped),
    isBound: Boolean(iSys.isBound),
    potency,
    quantity: iSys.quantity ?? 1,
    unity: iSys.unity || "-",
    price: iSys.price || "-",
    block: iSys.block ?? "-",
    damage: damageText,
    damageTitle,
    range: rangeText,
    properties: propsText,
    propertiesTitle: propsTitle,
    categoryLabel
  };
}

