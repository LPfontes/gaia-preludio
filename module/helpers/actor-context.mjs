/**
 * ==============================================================================
 * ACTOR CONTEXT HELPERS / AUXILIARES DE CONTEXTO DO ATOR
 * ==============================================================================
 * FunÃ§Ãµes utilitÃ¡rias para formatar, estruturar e preparar os dados do Ator
 * para renderizaÃ§Ã£o nos templates Handlebars da ficha de personagem (Legado).
 */

import { GAIA } from "./config.mjs";
import { getStatEntry } from "./stat-rolls.mjs";
import { getHomunculariumDamageFormula } from "./homuncularium-rules.mjs";
import {
  PATH_REGISTRY,
  normalizePathKey,
  registerPathDescriptor,
  resolvePathDescriptor
} from "./path-registry.mjs";

/**
 * Lista canÃ´nica dos 21 Legados Oficiais de Auroria.
 */
export const CANONICAL_LEGACIES = [
  "Alraune",
  "AnÃ£o",
  "Daeva",
  "Delahk",
  "Draenum",
  "Elemental",
  "Elfo",
  "Forjado",
  "Humano",
  "Inari",
  "Kahats'za",
  "Kitari",
  "Minotauro",
  "Netune",
  "Orkrash",
  "Seiko",
  "Ursar",
  "Valdrak",
  "VennÃ©li",
  "Yuansu",
  "Zaokan"
];

/**
 * Mapeamento de grafias legadas / variantes para o nome canÃ´nico oficial dos legados.
 */
export const LEGACY_NAME_ALIASES = {
  "kahatsza": "Kahats'za",
  "kahats'za": "Kahats'za",
  "kahatsâ€™za": "Kahats'za",
  "venneli": "VennÃ©li",
  "vennÃ©li": "VennÃ©li"
};

/**
 * Normaliza o nome de um legado para a grafia canÃ´nica oficial.
 * @param {string} name - Nome original ou variante
 * @returns {string} Nome canÃ´nico normalizado
 */
export function normalizeLegacyName(name) {
  if (!name) return "";
  const trimmed = String(name).trim();
  const key = trimmed.toLowerCase();
  return LEGACY_NAME_ALIASES[key] || trimmed;
}

/**
 * ConstrÃ³i um array de pips/diamantes com seus estados ativos/inativos.
 * @param {number} value - Valor atual preenchido
 * @param {number} [max=6] - Quantidade mÃ¡xima de pips
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
 * Processa e formata os 8 ParÃ¢metros do sistema, dividindo-os em colunas e gerando pips.
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
 * Resgata a lista de maestrias desbloqueadas pelo personagem com os rÃ³tulos traduzidos.
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
 * Calcula o dano de um armamento com base na regra oficial de Gaia: PrelÃºdio:
 * "O dano causado por um Armamento Ã© igual ao seu Dano Base,
 * mais o seu Dano Base adicionalmente para cada ponto no seu respectivo ParÃ¢metro."
 * Dano Total = DanoBase + (ParÃ¢metro * DanoBase) = DanoBase * (1 + ParÃ¢metro)
 *
 * @param {Item|object} item - Documento do Item ou dados da arma
 * @param {Actor|null} [actor=null] - Documento do Ator proprietÃ¡rio (opcional, fallback item.actor)
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

  // Ataques do Homuncularium (Golpe Brutal e EvocaÃ§Ã£o MÃ­stica): 1d8 (ou 1d10 em DifÃ­cil/Extrema) por ponto de Poder
  const isHomunculariumAttack = item?.flags?.["gaia-preludio"]?.isHomunculariumAttack ||
    item?.name === "Golpe Brutal" ||
    item?.name === "EvocaÃ§Ã£o MÃ­stica";

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
      damageTitle: `Dano do Homuncularium (${dmg.power} Ã— ${dmg.die}): ${dmg.damageText}`
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

  // O parÃ¢metro que define a escala do dano Ã© o damageParameter.attribute (com fallback para attackParameter.attribute ou "brutality")
  const paramKey = String(iSys.damageParameter?.attribute || iSys.attackParameter?.attribute || "brutality").toLowerCase();

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
    ? `Dano Base: ${baseDamage} + (${paramValue} Ã— ${baseDamage} [${paramLabel}]) = ${totalDamage || baseDamage}${dTypeLocalized ? ` (${dTypeLocalized})` : ""}`
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
 * Formata os armamentos equipados do ator para exibiÃ§Ã£o na tabela da ficha.
 * @param {Actor} actor - Documento do Ator
 * @returns {Array<{id: string, name: string, img: string, damage: string, damageTitle: string, range: string, properties: string, propertiesTitle: string}>}
 */
export function resolveEquippedWeapons(actor) {
  return (actor.items ?? [])
    .filter(item => (item.type === "weapon" || item.system?.category === "weapon") && Boolean(item.system?.equipped))
    .map(item => {
      const iSys = item.system ?? {};

      // FormataÃ§Ã£o do Dano com cÃ¡lculo de ParÃ¢metro
      const { damageText, damageTitle } = calculateWeaponDamage(item, actor);

      // FormataÃ§Ã£o do Alcance
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
    // 1. LÃª o valor original existente no caminho especificado
    const originalValue = Number(foundry.utils.getProperty(actor.system, path)) || 0;
    const totalValue = originalValue + bonus;

    // 2. Aplica o bÃ´nus somando ao valor no sistema
    foundry.utils.setProperty(actor.system, path, totalValue);

    // 3. Mapeia a estrutura com o valor original e o bÃ´nus
    bonusResults[path] = {
      original: originalValue,
      bonus: bonus,
      total: totalValue
    };
  }

  return bonusResults;
}

/**
 * Calcula o bÃ´nus total de bloqueio fornecido por todos os equipamentos/armaduras equipados no Ator.
 * @param {Actor} actor - InstÃ¢ncia do Ator
 * @returns {number} BÃ´nus total de bloqueio dos itens equipados
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
    if (paramBonus) parts.push(`BÃ´nus: ${paramBonus >= 0 ? "+" : ""}${paramBonus}m`);
    if (exhaustion) parts.push(`ExaustÃ£o: -${exhaustion}m`);
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
    if (paramBonus) parts.push(`BÃ´nus: ${paramBonus >= 0 ? "+" : ""}${paramBonus}`);
    parts.push(`Total: ${total}`);
    return `${cleanLabel}${parts.join(" | ")}`;
  }

  if (bonusInfo) {
    const { original, bonus, total } = bonusInfo;
    const bonusSign = bonus >= 0 ? `+${bonus}` : `${bonus}`;
    return `${cleanLabel}Base: ${original} | BÃ´nus: ${bonusSign} | Total: ${total}`;
  }

  const rawBase = foundry.utils.getProperty(actor._source ?? {}, `system.${attrPath}`)
    ?? foundry.utils.getProperty(actor.system, attrPath)
    ?? 0;
  return `${cleanLabel}Base: ${rawBase}`;
}

/**
 * Prepara todo o contexto de dados necessÃ¡rio para renderizar a ficha do Legado / Legacy.
 * @param {ActorSheetV2} sheet - InstÃ¢ncia da ficha
 * @param {object} context - Contexto base fornecido pelo ActorSheetV2
 * @returns {Promise<object>} Contexto enriquecido para o template
 */
/**
 * Enriquece o contexto da ficha de personagem (Legado) dividindo por partes ou completo.
 * @param {ActorSheetV2} sheet - InstÃ¢ncia da Ficha do Ator
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

  // Pips de ExaustÃ£o (1 a 6) e status de Morte por ExaustÃ£o
  const currentExhaustion = Math.clamp(Number(system.exhaustion) || 0, 0, maxExhaustion);
  context.exhaustionPips = buildPips(currentExhaustion, maxExhaustion);
  context.isDeadByExhaustion = currentExhaustion >= 6;

  // Sistema de Dado de Morte (Incapacitado: SentenÃ§as do Corruptor e DÃ¡divas do ArtesÃ£o)
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

  // Tooltips com Valor Base + BÃ´nus para os atributos da ficha
  const visionTotal = system.vision?.total ?? 40;
  const visionPerc = system.vision?.perceptionBonus ?? 0;
  const visionPrecise = system.vision?.precise ?? (visionTotal / 2);
  let visionEnvNotice = "";
  if (system.hasDarkness) {
    visionEnvNotice = " [ESCURIDÃƒO ATIVA: VisÃ£o e alcance mÃ¡x. limitados a 4m, InaptidÃ£o em PercepÃ§Ã£o, PP reduzida pela metade, -1 PrecisÃ£o/CanalizaÃ§Ã£o]";
  } else if (system.hasPenumbra) {
    visionEnvNotice = " [PENUMBRA ATIVA: VisÃ£o e alcance mÃ¡x. limitados a 10m, -1 PercepÃ§Ã£o e PP]";
  }
  const visionTooltip = `Alcance da VisÃ£o: ${visionTotal}m (Base 40m + ${visionPerc}m por PercepÃ§Ã£o) â€¢ VisÃ£o Precisa/Detalhada: atÃ© ${visionPrecise}m${visionEnvNotice}`;

  context.tooltips = {
    movement: getAttrTooltip(actor, "movement", "Movimento"),
    healthMax: getAttrTooltip(actor, "health.max", "Vida MÃ¡xima"),
    passivePerception: `${getAttrTooltip(actor, "passivePerception", "PercepÃ§Ã£o Passiva")}\n${visionTooltip}`,
    vision: visionTooltip,
    block: getAttrTooltip(actor, "block", "Bloqueio"),
    exhaustion: game.i18n.localize("GAIA.Banner.ExhaustionRule")
      || "ExaustÃ£o: Para cada 1 ponto, penalidade de -1 em testes de ParÃ¢metro e Bloqueio, e -1m na MovimentaÃ§Ã£o. Ao atingir 6 pontos, o personagem morre.",
    deathDie: game.i18n.localize("GAIA.DeathDie.RuleTooltip")
      || "Dado de Morte (1d12): 1-6 = SentenÃ§a do Corruptor (2 = Morte) | 7-12 = DÃ¡diva do ArtesÃ£o (2 = Estabilizado). A cada 10 min estabilizado, regenera 1d4 PV."
  };

  // Coleta as opÃ§Ãµes de Legado (Config canÃ´nica dos 21 legados, Itens do Mundo, do Ator e CompÃªndios)
  const items = actor.items ?? [];
  const configLegacies = Object.values(CONFIG.GAIA?.legacies ?? {}).map(normalizeLegacyName);
  const worldLegacies = (game.items?.filter(i => i.type === "legacy") ?? []).map(i => normalizeLegacyName(i.name));
  const actorLegacies = (items.filter(i => i.type === "legacy") ?? []).map(i => normalizeLegacyName(i.name));
  const compendiumLegacies = [];
  for (const pack of (game.packs?.filter(p => p.documentName === "Item") ?? [])) {
    if (pack.index) {
      for (const entry of pack.index) {
        if (entry.type === "legacy" && entry.name) compendiumLegacies.push(normalizeLegacyName(entry.name));
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

  const currentLegacyNormalized = normalizeLegacyName(system.legacy);
  if (currentLegacyNormalized && !allLegacies.includes(currentLegacyNormalized)) {
    allLegacies.push(currentLegacyNormalized);
  }
  allLegacies.sort((a, b) => a.localeCompare(b, "pt-BR"));

  const legacySelectOptions = {};
  for (const name of allLegacies) {
    legacySelectOptions[name] = name;
  }
  context.legacySelectOptions = legacySelectOptions;

  const selectedLegacyName = currentLegacyNormalized || "";
  context.selectedLegacyName = selectedLegacyName;

  let legacyItem = null;
  if (selectedLegacyName) {
    legacyItem = items.find(i => i.type === "legacy" && (
      i.name.toLowerCase() === selectedLegacyName.toLowerCase() ||
      normalizeLegacyName(i.name).toLowerCase() === selectedLegacyName.toLowerCase()
    ));
    if (!legacyItem) {
      legacyItem = game.items?.find(i => i.type === "legacy" && (
        i.name.toLowerCase() === selectedLegacyName.toLowerCase() ||
        normalizeLegacyName(i.name).toLowerCase() === selectedLegacyName.toLowerCase()
      ));
    }
    if (!legacyItem) {
      for (const pack of (game.packs?.filter(p => p.documentName === "Item") ?? [])) {
        if (pack.index) {
          const entry = pack.index.find(e => e.type === "legacy" && (
            e.name?.toLowerCase() === selectedLegacyName.toLowerCase() ||
            normalizeLegacyName(e.name)?.toLowerCase() === selectedLegacyName.toLowerCase()
          ));
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
 * Prepara o contexto para a Aba de Personagem (ParÃ¢metros, Conhecimentos, Maestrias, Defesas).
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
 * Prepara o contexto para a Aba de InventÃ¡rio (Armas, Armaduras, RelÃ­quias, ConsumÃ­veis, Itens Comuns).
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

  // Monitoramento de PotÃªncia de VÃ©u das RelÃ­quias Vinculadas
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

  // PT: Peso total do inventÃ¡rio (soma de Unidades Ã— Quantidade de todos os itens)
  // EN: Total inventory weight (sum of Unity Ã— Quantity for all inventory items)
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
 * Normaliza a chave de origem das Habilidades na Aba de Habilidades.
 * @param {any} value - Valor bruto vindo dos filtros da ficha
 * @returns {"all"|"legacy"|"path"}
 */
function normalizeAbilitySource(value) {
  const key = String(value ?? "").trim().toLowerCase();
  return ["legacy", "path"].includes(key) ? key : "all";
}

/**
 * Normaliza a chave do filtro de Caminho.
 * @param {any} value - Valor bruto vindo dos filtros da ficha
 * @returns {string} `"all"` ou o id do Caminho
 */
function normalizeAbilityPath(value) {
  const key = String(value ?? "").trim();
  return key || "all";
}

/**
 * Formata um Item de Habilidade/CaracterÃ­stica do Ator em um objeto de card de habilidade,
 * com rÃ³tulos localizados, metadados e sub-habilidades jÃ¡ preparados para o template.
 * @param {Item} item - Item pertencente ao Ator
 * @param {Set<string>|null} [collapsedSet=null] - Conjunto de chaves recolhidas
 * @returns {object} Card de habilidade pronto para renderizaÃ§Ã£o
 */
export function formatAbilityOrFeature(item, collapsedSet = null) {
  const config = /** @type {any} */ (CONFIG).GAIA;

  const isFeature = item.type === "feature";
  const rawCategory = String(item.system?.category || "").trim();
  const rawCatNorm = rawCategory.toLowerCase();
  const isGenericType = rawCatNorm === "caracteristica" || rawCatNorm === "caracterÃ­stica" || rawCatNorm === "feature" || rawCatNorm === "ability" || rawCatNorm === "habilidade";

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

  // Evita duplicar categoria caso seja idÃªntica ao primeiro tipo (ex: "Passiva")
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
    pathId: String(item.system?.pathId || "").trim(),
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
}

/**
 * Prepara o contexto para a Aba de Habilidades (Caminho e Legado).
 * @param {Actor} actor - Ator dono da aba
 * @param {object} context - Contexto de renderizaÃ§Ã£o
 * @param {Set<string>|null} [collapsedSet=null] - Conjunto de cards recolhidos
 * @param {{source?: string, path?: string}|null} [filters=null] - Estado dos filtros da aba
 */
export function prepareAbilitiesContext(actor, context, collapsedSet = null, filters = null) {
  const system = actor.system;
  const items = actor.items ?? [];
  const config = /** @type {any} */ (CONFIG).GAIA;

  const activeSource = normalizeAbilitySource(filters?.source);
  const activePath = normalizeAbilityPath(filters?.path);

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

  // PT: Habilidades de Legado embutidas no item de Legado (sem Caminho de origem).
  const legacyCards = rawLegacyAbilities.map((ab, index) => {
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
      source: "legacy",
      sourceLabel: game.i18n.localize("GAIA.Ability.SourceLegacy") || "Legado",
      sourceIcon: "fa-feather-pointed",
      sourceBadge: game.i18n.localize("GAIA.Ability.SourceLegacy") || "Legado",
      legacyIndex: index,
      index,
      id: "",
      img: "icons/svg/book.svg",
      pathId: "",
      pathName: "",
      name: ab.name || "Habilidade de Legado",
      description: ab.description || "",
      cost: ab.cost || "",
      typeAction: ab.typeAction || "",
      actionTypeLabel,
      typeLabel,
      metaRow1: "",
      hasAdditionalTypes: false,
      additionalTypes: "",
      activeEffectText,
      isEffectActive,
      isCollapsed,
      action: ab.action || null,
      formattedSubEffects: [],
      activeImprovements: [],
      hasActiveImprovements: false
    };
  });

  // PT: Habilidades de Caminho sÃ£o itens do tipo "ability"/"feature" embutidos no Ator.
  const actorAbilityItems = items.filter(i => i.type === "ability" || i.type === "feature");
  const pathCards = actorAbilityItems.map(item => {
    const card = formatAbilityOrFeature(item, collapsedSet);
    const activeEffectData = item.system?.activeEffect;
    const hasActiveEffect = typeof activeEffectData === "string"
      ? Boolean(activeEffectData.trim())
      : Boolean(activeEffectData && (activeEffectData.text || (Array.isArray(activeEffectData.changes) && activeEffectData.changes.length)));
    const isEffectActive = (actor.effects ?? []).some(e =>
      !e.disabled && (e.flags?.gaia?.abilityItemId === item.id || (!e.flags?.gaia?.abilityItemId && e.name === item.name))
    );
    return {
      ...card,
      source: "path",
      sourceLabel: game.i18n.localize("GAIA.Ability.SourcePath") || "Caminho",
      sourceIcon: "fa-route",
      sourceBadge: game.i18n.localize("GAIA.Ability.SourcePath") || "Caminho",
      legacyIndex: null,
      pathName: "",
      activeEffectText: typeof activeEffectData === "string" ? activeEffectData : (activeEffectData?.text || ""),
      hasActiveEffect,
      isEffectActive
    };
  });

  // PT: Resolve o Caminho de origem de cada card de Caminho (Documento do Ator, dataset canÃ´nico ou id cru).
  const pathRegistry = new Map(PATH_REGISTRY);
  for (const pathItem of items.filter(i => i.type === "path")) {
    registerPathDescriptor(pathRegistry, { id: pathItem.id, name: pathItem.name });
  }
  for (const card of pathCards) {
    const descriptor = resolvePathDescriptor(pathRegistry, card.pathId);
    card.pathId = descriptor.id;
    card.pathKey = descriptor.key;
    card.pathName = descriptor.name;

    // PT: Um Caminho referenciado por habilidades sem item no Ator entra no registro para virar opÃ§Ã£o do filtro.
    if (card.pathId && !pathRegistry.has(normalizePathKey(card.pathId))) {
      registerPathDescriptor(pathRegistry, { id: card.pathId, name: card.pathName });
    }
  }

  context.abilityCards = [...legacyCards, ...pathCards];
  context.legacyAbilitiesList = legacyCards;
  // PT: MantÃ©m a lista crua formatada para os templates que ainda consomem `abilities`.
  context.abilities = actorAbilityItems.map(item => formatAbilityOrFeature(item, collapsedSet));
  context.features = items.filter(i => i.type === "feature").map(item => formatAbilityOrFeature(item, collapsedSet));

  /**
   * Avalia se um card passa pelos filtros ativos de origem e de Caminho.
   * @param {object} card - Card de habilidade
   * @returns {boolean}
   */
  const matchesFilters = (card) => {
    if (activeSource === "legacy" && card.source !== "legacy") return false;
    if (activeSource === "path" && card.source !== "path") return false;
    if (activePath !== "all" && (card.source !== "path" || card.pathId !== activePath)) return false;
    return true;
  };

  context.filteredAbilityCards = context.abilityCards.filter(matchesFilters);
  context.hasAbilityCards = context.filteredAbilityCards.length > 0;
  context.hasAnyAbilityCards = context.abilityCards.length > 0;

  // PT: OpÃ§Ãµes do filtro de Caminho. Deduplica por nome canÃ´nico para nÃ£o listar
  // o mesmo Caminho duas vezes sÃ³ porque o `pathId` dos itens veio em formatos diferentes.
  const pathOptionsByKey = new Map();
  for (const [registryKey, descriptor] of pathRegistry) {
    if (registryKey !== normalizePathKey(descriptor.id)) continue;
    const dedupeKey = normalizePathKey(descriptor.name) || registryKey;
    const current = pathOptionsByKey.get(dedupeKey);
    if (!current || (descriptor.order || 99) < (current.order || 99)) {
      pathOptionsByKey.set(dedupeKey, descriptor);
    }
  }

  const orderedPaths = Array.from(pathOptionsByKey.values())
    .sort((a, b) => (a.order || 99) - (b.order || 99) || a.name.localeCompare(b.name, "pt"));

  const abilitySourceOptions = [
    { value: "all", label: game.i18n.localize("GAIA.Ability.SourceAll") || "Todas" },
    { value: "path", label: game.i18n.localize("GAIA.Ability.SourcePath") || "Caminho" },
    { value: "legacy", label: game.i18n.localize("GAIA.Ability.SourceLegacy") || "Legado" }
  ];
  context.abilityFilterPaths = orderedPaths.map(path => ({ id: path.id, name: path.name }));
  context.abilitySourceOptions = abilitySourceOptions;
  context.abilitySourceLabels = {
    all: abilitySourceOptions[0].label,
    path: abilitySourceOptions[1].label,
    legacy: abilitySourceOptions[2].label
  };
  context.abilityAllPathsLabel = game.i18n.localize("GAIA.ItemBrowser.AllPaths") || "Todos os Caminhos";
  context.abilityNoMatchLabel = game.i18n.localize("GAIA.Ability.NoAbilitiesMatchingFilters") || "Nenhuma habilidade corresponde aos filtros selecionados.";
  context.abilityEmptyLabel = game.i18n.localize("GAIA.Ability.NoAbilitiesRegistered") || "Nenhuma habilidade cadastrada.";

  // PT: Aplica os rÃ³tulos localizados nos cards e nas badges de origem.
  for (const card of context.abilityCards) {
    if (card.source === "legacy") {
      card.sourceLabel = context.abilitySourceLabels.legacy;
      if (!card.sourceBadge) card.sourceBadge = context.abilitySourceLabels.legacy;
    } else if (card.source === "path") {
      card.sourceLabel = context.abilitySourceLabels.path;
      card.sourceBadge = card.pathName || context.abilitySourceLabels.path;
    }
  }


  context.abilityFilters = {
    source: activeSource,
    path: activePath,
    isSourceAll: activeSource === "all",
    isSourcePath: activeSource === "path",
    isSourceLegacy: activeSource === "legacy",
    isPathAll: activePath === "all",
    showPathFilter: orderedPaths.length > 0
  };
  context.abilityFilterCounts = {
    all: context.abilityCards.length,
    path: context.abilityCards.filter(c => c.source === "path").length,
    legacy: context.abilityCards.filter(c => c.source === "legacy").length,
    visible: context.filteredAbilityCards.length
  };

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
 * Categoriza os Efeitos Ativos de um Documento (Ator ou Item) em passivos, ativos/temporÃ¡rios e inativos.
 * @param {Actor|Item} doc - Documento proprietÃ¡rio dos efeitos
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
      if (effectImg.includes("leaf-glowing-green") || docName.includes("proteÃ§Ã£o da natureza") || docName.includes("protecao da natureza")) {
        displayName = "ProteÃ§Ã£o da Natureza";
      } else if (effectImg.includes("skull-horned-goat-purple") || docName.includes("abraÃ§o da treva") || docName.includes("abraco da treva")) {
        displayName = "AbraÃ§o da Treva";
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

      // Tratamentos especÃ­ficos de regras de GAIA
      if (rawKey === "damageResistance") {
        const typeKey = String(c.value || "").toLowerCase().trim();
        if (!typeKey || typeKey === "1" || !isNaN(Number(typeKey))) return null;
        const locKey = CONFIG.GAIA?.damageTypesFlat?.[typeKey] ?? CONFIG.GAIA?.damageTypes?.[typeKey];
        const typeLoc = locKey ? game.i18n.localize(locKey) : (typeKey ? typeKey.charAt(0).toUpperCase() + typeKey.slice(1) : "Natureza");
        return `ResistÃªncia: ${typeLoc || "Natureza"}`;
      }
      if (rawKey === "conditionImmunity") {
        const cond = String(c.value || "").trim().toLowerCase();
        if (!cond || cond === "1" || !isNaN(Number(cond))) return null;
        let label = cond ? (cond.charAt(0).toUpperCase() + cond.slice(1)) : "Envenenado";
        if (cond === "lentidao" || cond === "lentidÃ£o") label = "LentidÃ£o";
        if (cond === "terreno dificil" || cond === "terrenos dificeis") label = "Terreno DifÃ­cil";
        return `Imunidade: ${label}`;
      }
      if (rawKey === "movement.walk" || rawKey === "movement") {
        return `Deslocamento: ${Number(c.value) > 0 ? `+${c.value}` : c.value}m`;
      }
      if (rawKey === "encumbrance.max" || rawKey === "encumbrance") {
        return `Carga MÃ¡x: ${Number(c.value) > 0 ? `+${c.value}` : c.value}`;
      }
      if (rawKey === "all_parameters") {
        return `Todos ParÃ¢metros: ${Number(c.value) > 0 ? `+${c.value}` : c.value}`;
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
    if (!changesSummary && (displayName.toLowerCase().includes("proteÃ§Ã£o da natureza") || displayName.toLowerCase().includes("protecao da natureza"))) {
      changesSummary = "ResistÃªncia: Natureza, Imunidade: Envenenado";
    }
    if (!changesSummary && displayName.toLowerCase().includes("fortitude ampliada")) {
      changesSummary = "Dado de PV: 1d8 (ou 4 fixo)";
    }
    const normDisplayName = displayName.toLowerCase();
    if (!changesSummary && (normDisplayName.includes("abraÃ§o da treva") || normDisplayName.includes("abraco da treva"))) {
      changesSummary = "ResistÃªncia: Trevas, Imunidade: Enfraquecido";
    }
    if (!changesSummary && normDisplayName.includes("corpo de ferro")) {
      changesSummary = "Imunidade: Envenenado, Sangramento";
    }
    if (!changesSummary && normDisplayName.includes("filho de nolgadan")) {
      changesSummary = "Imunidade: LentidÃ£o, Terreno DifÃ­cil";
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
    categoryLabel = relicCatObj ? game.i18n.localize(relicCatObj.label) : (game.i18n.localize("GAIA.Relic.Name") || "RelÃ­quia");
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
