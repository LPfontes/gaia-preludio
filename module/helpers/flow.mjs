import { GAIA } from "./config.mjs";

/**
 * Roll.prototype.evaluate() é Assíncrono (Promise)
 * Avalia uma rolagem de dados no Foundry VTT.
 * @param {string} formula - A fórmula da rolagem
 * @param {object} [data={}] - Objeto com variáveis apontadas na fórmula
 * @param {object} [options={}] - Opções passadas ao evaluate (ex: { maximize: true })
 * @returns {Promise<Roll>} Objeto Roll avaliado
 */
export async function flowRoll(formula, data = {}, options = {}) {
  const roll = new Roll(formula, data);
  await roll.evaluate(options);
  return roll;
}

// PT: Cálculos de Parâmetros (com suporte a modificador e penalidade de exaustão)
// EN: Parameter Calculations (with modifier and exhaustion penalty support)
export async function flowParameter(parameter, fitness, modifier = 0, exhaustion = 0) {
  const dice = GAIA.rollTypes[fitness]?.roll ?? GAIA.rollTypes[fitness] ?? "1d12";
  const mod = Number(modifier) || 0;
  const exh = Number(exhaustion) || 0;

  const formulaParts = [dice, "+ @parameter"];
  const data = { parameter: parameter?.value ?? 0 };

  if (mod !== 0) {
    if (mod > 0) formulaParts.push("+ @modifier");
    else formulaParts.push("- @modifier");
    data.modifier = Math.abs(mod);
  }

  if (exh > 0) {
    formulaParts.push("- @exaustao");
    data.exaustao = exh;
  }

  return await flowRoll(formulaParts.join(" "), data);
}

// PT: Cálculo de Dano
// EN: Damage Calculation
export async function flowDamage(damage) {
  // Se damage for um objeto com fórmula em string, rola a fórmula; se for número, insere na variável
  const formula = typeof damage.value === "string" ? damage.value : "@damage";
  return await flowRoll(formula, { damage: damage.value });
}

// PT: Amplificação de Rolagem
// EN: Roll Amplification
export function amplifyRoll(roll, energyPoints) {
  // Extrai o total caso seja um objeto Roll, ou usa o valor numérico direto
  const total = typeof roll === "number" ? roll : (roll?.total ?? 0);
  return total + energyPoints;
}

// PT: Rolagens Máximas
// EN: Maximum Rolls
export async function maxRoll(formula, data = {}) {
  return await flowRoll(formula, data, { maximize: true });
}

// PT: Rolagens Mínimas
// EN: Minimum Rolls
export async function minRoll(formula, data = {}) {
  return await flowRoll(formula, data, { minimize: true });
}

/**
 * ACERTO CRÍTICO / CRITICAL HIT CHECK
 * Valida se um teste de ataque (Físico ou Mágico) resultou em um Acerto Crítico.
 * Regra: Um Acerto Crítico ocorre em Ataques Físicos (Precisão) ou Mágicos (Canalização)
 * quando a diferença entre o teste de ataque e o teste de defesa do alvo for 10 ou mais.
 *
 * @param {Roll|number|{total: number}} attack - Objeto Roll ou total do teste de ataque
 * @param {Roll|number|{total: number}} defense - Objeto Roll ou total do teste de defesa do alvo
 * @param {object} [options={}] - Opções de validação
 * @param {string} [options.attackType] - Tipo de ataque ("physical", "magical", "ataque_fisico", etc.)
 * @param {number} [options.threshold=10] - Diferença mínima necessária para o acerto crítico (padrão: 10)
 * @returns {{ isCritical: boolean, isHit: boolean, difference: number, margin: number, attackTotal: number, defenseTotal: number }}
 *
 * @example
 * const attackRoll = await flowRoll("1d12 + 8");  // Total = 18
 * const defenseRoll = await flowRoll("1d12 + 2"); // Total = 8
 * const result = isCriticalHit(attackRoll, defenseRoll);
 * // Retorna { isCritical: true, isHit: true, difference: 10, margin: 0, attackTotal: 18, defenseTotal: 8 }
 */
export function isCriticalHit(attack, defense, options = {}) {
  const attackTotal = typeof attack === "number" ? attack : (Number(attack?.total) || 0);
  const defenseTotal = typeof defense === "number" ? defense : (Number(defense?.total) || 0);
  const threshold = Number(options.threshold) || 10;

  const difference = attackTotal - defenseTotal;
  const isHit = difference > 0;
  const isCritical = isHit && difference >= threshold;
  const margin = difference - threshold;

  return {
    isCritical,
    isHit,
    difference,
    margin,
    attackTotal,
    defenseTotal
  };
}

/**
 * 1. EMBATES (Clash / Contest)
 * Dois Alvos realizam um teste (Parâmetro ou Conhecimento); quem possuir o maior resultado vence o Embate.
 *
 * @param {Roll|number|{total: number}} roll1 - Rolagem ou resultado total do Alvo 1
 * @param {Roll|number|{total: number}} roll2 - Rolagem ou resultado total do Alvo 2
 * @returns {{ winner: 1|2|0, isTie: boolean, total1: number, total2: number, difference: number }}
 *
 * @example
 * const res = flowClash(rollAlvo1, rollAlvo2);
 * if (res.winner === 1) // Alvo 1 venceu o Embate
 */
export function flowClash(roll1, roll2) {
  const total1 = typeof roll1 === "number" ? roll1 : (Number(roll1?.total) || 0);
  const total2 = typeof roll2 === "number" ? roll2 : (Number(roll2?.total) || 0);

  const difference = Math.abs(total1 - total2);
  const isTie = total1 === total2;
  const winner = isTie ? 0 : (total1 > total2 ? 1 : 2);

  return {
    winner,      // 1: Alvo 1 venceu | 2: Alvo 2 venceu | 0: Empate
    isTie,       // true se houve empate
    total1,      // Resultado total do Alvo 1
    total2,      // Resultado total do Alvo 2
    difference   // Diferença entre os resultados
  };
}
export { flowClash as flowEmbate };

/**
 * 2. TESTES DE DIFICULDADE (Difficulty Check - Dif.)
 * Valida se o resultado total de um teste atinge ou supera a Dificuldade (Dif.) estabelecida.
 *
 * @param {Roll|number|{total: number}} roll - Objeto Roll ou valor total da rolagem
 * @param {number} difficulty - A Dificuldade (Dif.) pré-estabelecida
 * @returns {{ success: boolean, total: number, difficulty: number, margin: number }}
 *
 * @example
 * const check = flowDifficultyCheck(roll, 12);
 * if (check.success) // Passou na Dificuldade (total >= Dif)
 */
export function flowDifficultyCheck(roll, difficulty) {
  const total = typeof roll === "number" ? roll : (Number(roll?.total) || 0);
  const dif = Number(difficulty) || 0;
  const margin = total - dif;
  const success = margin >= 0;

  return {
    success,         // true se passou no teste (total >= Dif)
    total,           // Resultado obtido
    difficulty: dif, // Dificuldade exigida
    margin           // Margem de sucesso/falha (positiva = passou, negativa = falhou)
  };
}
export { flowDifficultyCheck as flowTesteDificuldade };

/**
 * 3. TESTES DE DESTINO (Fate / Destiny Check)
 * Rola um 1d12 puro sem adicionar quaisquer modificadores/atributos e compara com a Dificuldade (Dif.).
 *
 * @param {number} difficulty - A Dificuldade (Dif.) pré-estabelecida
 * @param {object} [options={}] - Opções passadas ao flowRoll
 * @returns {Promise<{ success: boolean, roll: Roll, result: number, difficulty: number, margin: number }>}
 *
 * @example
 * const fate = await flowDestinyCheck(8);
 * console.log(`D12 Puro: ${fate.result} | Passou: ${fate.success}`);
 */
export async function flowDestinyCheck(difficulty, options = {}) {
  const roll = await flowRoll("1d12", {}, options);
  const result = roll.total;
  const dif = Number(difficulty) || 0;
  const margin = result - dif;
  const success = margin >= 0;

  return {
    success,         // true se o d12 puro atingir ou superar a Dif.
    roll,            // Objeto Roll do 1d12
    result,          // Resultado numérico do 1d12 (1 a 12)
    difficulty: dif, // Dificuldade exigida
    margin           // Margem em relação à Dif.
  };
}
export { flowDestinyCheck as flowTesteDestino };


// PT: Cálculo de Defesa (com suporte a penalidade de exaustão)
// EN: Defense Calculation (with exhaustion penalty support)
export async function defense(type, actor, fitness = "standard") {
  const exhaustion = Number(actor?.system?.exhaustion) || 0;

  if (actor?.type === "creature" || actor?.type === "legacyNpc" || type === "defensiveParameters") {
    const defVal = Number(actor?.system?.defensiveParameters ?? 0);
    return await flowParameter({ value: defVal }, fitness, 0, exhaustion);
  }

  if (type === "agility") {
    const agilityParam = actor.system?.parameters?.find(p => {
      const name = String(p.name || "").toLowerCase();
      return name === "agility" || name === "agilidade";
    });
    const agilityVal = Number(agilityParam?.value ?? actor.system?.agility?.value ?? actor.system?.agility ?? 0);
    return await flowParameter({ value: agilityVal }, fitness, 0, exhaustion);
  }

  const dice = GAIA.rollTypes[fitness]?.roll ?? GAIA.rollTypes[fitness] ?? "1d12";
  const blockVal = Number(actor.system?.totalBlock ?? actor.system?.block?.value ?? actor.system?.block ?? 0);
  const formulaParts = [dice, "+ @block"];
  const data = { block: blockVal };

  if (exhaustion > 0) {
    formulaParts.push("- @exaustao");
    data.exaustao = exhaustion;
  }

  return await flowRoll(formulaParts.join(" "), data);
}

/**
 * Calcula o dano final considerando imunidades, resistências, vulnerabilidades e reduções.
 * @param {{ type: string, value: number }} damage - Tipo e valor do dano
 * @param {Actor} target - Documento do Ator alvo
 * @returns {number} O dano final calculado (mínimo 1 se não for imune)
 */
export function calculateDamage(damage, target, source = null) {
  let baseDamage = Number(damage?.value) || 0;
  if (baseDamage <= 0) return 0;

  // Enfraquecido: Ao causar qualquer tipo de dano, esse valor será reduzido pela metade
  if (source?.system?.hasWeakened) {
    baseDamage = Math.floor(baseDamage / 2);
    if (baseDamage <= 0) return 0;
  }

  const targetSystem = target?.system;
  if (!targetSystem) return baseDamage;

  // Sangramento: Ao receber qualquer tipo de dano, o dano é aumentado num valor igual ao PE Máximo
  if (targetSystem.hasBleeding) {
    const maxEnergy = Number(targetSystem.energy?.max ?? 0);
    baseDamage += maxEnergy;
  }

  const targetName = target?.name || "Alvo";
  const damageType = String(damage?.type || "").trim().toLowerCase();

  const {
    damageImmunity = [],
    damageResistance = [],
    damageVulnerability = [],
    damageReduction = []
  } = targetSystem;

  const normalizeType = (t) => {
    const s = String(t || "").trim().toLowerCase();
    const map = {
      físico: "physical",
      fisico: "physical",
      physical: "physical",
      fogo: "fire",
      fire: "fire",
      vento: "wind",
      wind: "wind",
      água: "water",
      agua: "water",
      water: "water",
      terra: "earth",
      earth: "earth",
      trovão: "thunder",
      trovao: "thunder",
      thunder: "thunder",
      elétrico: "thunder",
      eletrico: "thunder",
      gelo: "ice",
      ice: "ice",
      neutro: "neutro",
      neutral: "neutro",
      natureza: "nature",
      nature: "nature",
      profano: "profane",
      profane: "profane",
      luz: "light",
      light: "light",
      trevas: "dark",
      dark: "dark",
      sombra: "dark",
      imaterial: "immaterial",
      immaterial: "immaterial",
      todos: "all",
      all: "all"
    };
    return map[s] || s;
  };

  const normDamageType = normalizeType(damageType);

  // Função auxiliar para comparação de tipo (case-insensitive e normalizada)
  const matchesType = entry => {
    const entryType = normalizeType(entry?.type);
    return entryType === normDamageType || entryType === "all" || normDamageType === "all";
  };


  // 1. Imunidade: cancela todo o dano imediatamente (0)
  const isImmune = damageImmunity.some(matchesType);
  if (isImmune) {
    return 0;
  }

  let finalDamage = baseDamage;

  // 2. Verifica Resistência e Vulnerabilidade
  const hasResistance = damageResistance.some(matchesType);
  const hasVulnerability = damageVulnerability.some(matchesType);

  // Se tiver ambos, eles se anulam mutuamente. Caso contrário, aplica o multiplicador:
  if (hasResistance && !hasVulnerability) {
    finalDamage = Math.ceil(finalDamage / 2);
  } else if (hasVulnerability && !hasResistance) {
    finalDamage = finalDamage * 2;
  }

  // 3. Aplica Redução de Dano (soma todas as reduções aplicáveis)
  const totalReduction = damageReduction
    .filter(matchesType)
    .reduce((sum, entry) => sum + (Number(entry?.value) || 0), 0);

  if (totalReduction > 0) {
    const beforeReduction = finalDamage;
    finalDamage -= totalReduction;
  }

  // 4. O dano nunca é reduzido abaixo de 1 (apenas Imunidade ou dano base zero resultam em 0)
  const clampedDamage = Math.max(1, Math.floor(finalDamage));

  return clampedDamage;
}

/**
 * Escala ordenada das categorias de dados do sistema Gaia: Prelúdio.
 */
export const DICE_CATEGORY_STEPS = [4, 6, 8, 10, 12, 20];

/**
 * AUMENTO / REDUÇÃO DE CATEGORIA DE DADO
 * Ajusta a categoria de um dado de acordo com os passos solicitados.
 * Ordem: d4 -> d6 -> d8 -> d10 -> d12 -> d20.
 * A Categoria de Dado máxima é d20 e a mínima é d4.
 *
 * @param {string|number} dieOrFormula - A fórmula de rolagem (ex: "1d8", "2d6 + 3"), dado ("d8") ou lados (8)
 * @param {number} [steps=1] - Passos a aumentar (positivo) ou reduzir (negativo)
 * @returns {string|number} A nova fórmula de rolagem ou dado ajustado
 *
 * @example
 * modifyDieCategory("1d8", 1)    // Retorna "1d10"
 * modifyDieCategory("1d8", -1)   // Retorna "1d6"
 * modifyDieCategory("d20", 1)    // Retorna "d20" (máximo mantido)
 * modifyDieCategory("d4", -2)    // Retorna "d4" (mínimo mantido)
 * modifyDieCategory("2d6 + 3", 1) // Retorna "2d8 + 3"
 */
export function modifyDieCategory(dieOrFormula, steps = 1) {
  if (dieOrFormula === null || dieOrFormula === undefined) return dieOrFormula;
  const numSteps = Number(steps) || 0;
  if (numSteps === 0) return dieOrFormula;

  // Função interna para alterar os lados de um único dado
  const shiftSides = (sides) => {
    const numericSides = Number(sides);
    const currentIndex = DICE_CATEGORY_STEPS.indexOf(numericSides);

    // Se o dado não estiver na lista padrão (ex: d100, d3), mantém o valor original
    if (currentIndex === -1) return numericSides;

    const targetIndex = Math.min(
      DICE_CATEGORY_STEPS.length - 1,
      Math.max(0, currentIndex + numSteps)
    );

    return DICE_CATEGORY_STEPS[targetIndex];
  };

  // 1. Caso seja um número de lados direto (ex: 8 -> 10)
  if (typeof dieOrFormula === "number") {
    return shiftSides(dieOrFormula);
  }

  const inputStr = String(dieOrFormula).trim();

  // 2. Caso seja uma designação simples de dado em string (ex: "d8" -> "d10")
  if (/^d\d+$/i.test(inputStr)) {
    const currentSides = Number(inputStr.slice(1));
    return `d${shiftSides(currentSides)}`;
  }

  // 3. Caso seja uma fórmula completa (ex: "1d8", "2d6 + 4", "1d12 + 1d8")
  return inputStr.replace(/([0-9]*)d([0-9]+)/gi, (match, count, sides) => {
    const newSides = shiftSides(sides);
    return `${count}d${newSides}`;
  });
}

/**
 * Retorna o nível de Dificuldade (Enum GAIA.difficultyLevels) correspondente a um valor numérico (Dif.).
 *
 * @param {number} dc - O valor numérico da Dificuldade (ex: 5 -> Fácil, 11 -> Elevado)
 * @returns {object|null} Objeto da Dificuldade contendo label, min, max e exemplo
 *
 * @example
 * getDifficultyLevel(8)  // Retorna a Dificuldade "Normal" (7 – 9)
 * getDifficultyLevel(14) // Retorna a Dificuldade "Difícil" (13 – 15)
 */
export function getDifficultyLevel(dc) {
  const numDC = Number(dc) || 0;
  for (const levelObj of Object.values(GAIA.difficultyLevels ?? {})) {
    if (numDC >= levelObj.min && numDC <= levelObj.max) {
      return levelObj;
    }
  }
  if (numDC < 1) return GAIA.difficultyLevels?.simple ?? null;
  if (numDC > 18) return GAIA.difficultyLevels?.exceptional ?? null;
  return null;
}

/**
 * Retorna os valores base de atributos para uma Criatura com base na Dificuldade definida.
 *
 * @param {string} difficulty - Dificuldade ("Fácil", "Normal", "Difícil", "Extrema" ou chaves em inglês/minúsculas)
 * @returns {{ health: number, energy: number, powerPoints: number, parameters: number, features: number, pv: number, pe: number, poder: number, parametros: number, caracteristicas: number }} Atributos base
 *
 * Tabela de Valores:
 * - Fácil:    PV 25  | PE 2  | Poder 1 | Parâmetros 2 | Características 2
 * - Normal:   PV 40  | PE 4  | Poder 2 | Parâmetros 3 | Características 3
 * - Difícil:  PV 80  | PE 8  | Poder 3 | Parâmetros 4 | Características 5
 * - Extrema:  PV 120 | PE 12 | Poder 4 | Parâmetros 5 | Características 6
 */
export function getCreatureStatsByDifficulty(difficulty) {
  const normalizedKey = String(difficulty ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const statsMap = {
    facil: { health: 25, energy: 2, powerPoints: 1, parameters: 2, features: 2 },
    easy: { health: 25, energy: 2, powerPoints: 1, parameters: 2, features: 2 },

    normal: { health: 40, energy: 4, powerPoints: 2, parameters: 3, features: 3 },

    dificil: { health: 80, energy: 8, powerPoints: 3, parameters: 4, features: 5 },
    hard: { health: 80, energy: 8, powerPoints: 3, parameters: 4, features: 5 },

    extrema: { health: 120, energy: 12, powerPoints: 4, parameters: 5, features: 6 },
    extreme: { health: 120, energy: 12, powerPoints: 4, parameters: 5, features: 6 }
  };

  const base = statsMap[normalizedKey] ?? statsMap.normal;

  return {
    ...base,
    pv: base.health,
    pe: base.energy,
    poder: base.powerPoints,
    parametros: base.parameters,
    caracteristicas: base.features
  };
}

/**
 * Calcula os atributos completos de uma Criatura (Homuncularium) combinando os valores base
 * da Dificuldade com os bônus acumulados por Nível de Criatura.
 *
 * @param {string} difficulty - Dificuldade ("Fácil", "Normal", "Difícil", "Extrema")
 * @param {number} level - Nível da Criatura (ex: 0, 1, 6, 12)
 * @returns {object} Atributos totais e bônus calculados
 *
 * Regras Homuncularium:
 * - PV Adicionais por Nível: Fácil (+4/lvl), Normal (+8/lvl), Difícil (+16/lvl), Extrema (+32/lvl)
 * - PE Adicionais: +1 a cada 2 Níveis (Math.floor(lvl / 2))
 * - A cada 6 Níveis: +1 de Poder e +1 Ponto em Parâmetros (Ofensivos ou Defensivos)
 */
export function calculateHomunculusStats(difficulty, level = 0) {
  const base = getCreatureStatsByDifficulty(difficulty);
  const lvl = Math.max(0, Number(level) || 0);

  const normalizedKey = String(difficulty ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const hpPerLevelMap = {
    facil: 4,
    easy: 4,
    normal: 8,
    dificil: 16,
    hard: 16,
    extrema: 32,
    extreme: 32
  };

  const hpPerLevel = hpPerLevelMap[normalizedKey] ?? 8;

  // Bônus calculados por nível
  const bonusHealth = lvl * hpPerLevel;
  const bonusEnergy = Math.floor(lvl / 2);
  const bonus6Levels = Math.floor(lvl / 6);

  const bonusPowerPoints = bonus6Levels;
  const bonusParameters = bonus6Levels;

  // Totais
  const totalHealth = base.health + bonusHealth;
  const totalEnergy = base.energy + bonusEnergy;
  const totalPowerPoints = base.powerPoints + bonusPowerPoints;
  const totalParameters = base.parameters + bonusParameters;
  const totalFeatures = base.features;

  return {
    difficulty,
    level: lvl,

    // Totais gerais
    health: totalHealth,
    energy: totalEnergy,
    powerPoints: totalPowerPoints,
    parameters: totalParameters,
    features: totalFeatures,

    // Bônus adicionais de Nível (Homuncularium)
    bonusHealth,
    bonusEnergy,
    bonusPowerPoints,
    bonusParameters,

    // Valores Base da Dificuldade
    baseHealth: base.health,
    baseEnergy: base.energy,
    basePowerPoints: base.powerPoints,
    baseParameters: base.parameters,
    baseFeatures: base.features,

    // Aliases em Português
    pv: totalHealth,
    pe: totalEnergy,
    poder: totalPowerPoints,
    parametros: totalParameters,
    caracteristicas: totalFeatures,

    pvAdicional: bonusHealth,
    peAdicional: bonusEnergy,
    poderAdicional: bonusPowerPoints,
    parametrosAdicional: bonusParameters
  };
}

export const calculateCreatureStats = calculateHomunculusStats;

/**
 * Calcula os atributos completos de um personagem Legado NPC com base na Dificuldade
 * e nos Níveis de Despertar do grupo de jogadores.
 *
 * @param {string} difficulty - Dificuldade ("Fácil", "Normal", "Difícil", "Extrema")
 * @param {number} level - Nível de Despertar do personagem do grupo de jogadores com maior nível
 * @returns {object} Atributos calculados para o Legado NPC
 */
export function calculateLegacyNpcStats(difficulty, level = 0) {
  const lvl = Math.max(0, Number(level) || 0);

  const normalizedKey = String(difficulty ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const baseMap = {
    facil: { hp: 25, pe: 2, power: 1, parameters: 2, maxAbilities: 2, maxParamCategory: 4, enhancements: "Sem aprimoramentos adicionais" },
    easy: { hp: 25, pe: 2, power: 1, parameters: 2, maxAbilities: 2, maxParamCategory: 4, enhancements: "Sem aprimoramentos adicionais" },

    normal: { hp: 40, pe: 4, power: 2, parameters: 3, maxAbilities: 3, maxParamCategory: 4, enhancements: "Sem aprimoramentos adicionais" },

    dificil: { hp: 80, pe: 8, power: 3, parameters: 4, maxAbilities: 4, maxParamCategory: 6, enhancements: "1 Aprimoramento por habilidade" },
    hard: { hp: 80, pe: 8, power: 3, parameters: 4, maxAbilities: 4, maxParamCategory: 6, enhancements: "1 Aprimoramento por habilidade" },

    extrema: { hp: 120, pe: 12, power: 4, parameters: 5, maxAbilities: 5, maxParamCategory: 6, enhancements: "Todos os Aprimoramentos por habilidade" },
    extreme: { hp: 120, pe: 12, power: 4, parameters: 5, maxAbilities: 5, maxParamCategory: 6, enhancements: "Todos os Aprimoramentos por habilidade" }
  };

  const hpPerLevelMap = {
    facil: 4, easy: 4,
    normal: 8,
    dificil: 16, hard: 16,
    extrema: 32, extreme: 32
  };

  const base = baseMap[normalizedKey] ?? baseMap.normal;
  const hpPerLevel = hpPerLevelMap[normalizedKey] ?? 8;

  // 3º PASSO: Bônus calculados por Nível de Despertar do Grupo
  const bonusHealth = lvl * hpPerLevel;
  const bonusEnergy = Math.floor(lvl / 2);
  const bonus6Levels = Math.floor(lvl / 6);

  // O valor máximo de Poder de um Legado NPC é 6!
  const rawPower = base.power + bonus6Levels;
  const totalPowerPoints = Math.min(6, rawPower);

  const bonusParameters = bonus6Levels;
  const totalParameters = base.parameters + bonusParameters;

  const totalHealth = base.hp + bonusHealth;
  const totalEnergy = base.pe + bonusEnergy;

  // Bônus a cada 3 Níveis de Despertar (Conhecimentos & Maestrias)
  const bonus3Levels = Math.floor(lvl / 3);
  const totalKnowledgePoints = 7 + bonus3Levels;
  const totalMasteries = 2 + bonus3Levels;

  return {
    difficulty,
    level: lvl,

    // Totais
    health: totalHealth,
    energy: totalEnergy,
    powerPoints: totalPowerPoints,
    parameters: totalParameters,
    maxAbilities: base.maxAbilities,
    maxParamCategory: base.maxParamCategory,
    enhancementsDesc: base.enhancements,
    knowledgePoints: totalKnowledgePoints,
    masteries: totalMasteries,

    // Bônus calculados
    bonusHealth,
    bonusEnergy,
    bonusPowerPoints: bonus6Levels,
    bonusParameters,

    // Valores Base da Dificuldade
    baseHealth: base.hp,
    baseEnergy: base.pe,
    basePowerPoints: base.power,
    baseParameters: base.parameters,

    // Aliases em Português
    pv: totalHealth,
    pe: totalEnergy,
    poder: totalPowerPoints,
    parametros: totalParameters,
    habilidadesMax: base.maxAbilities,
    limiteCategoria: base.maxParamCategory,
    aprimoramentosDesc: base.enhancements,
    conhecimentosPontos: totalKnowledgePoints,
    maestrias: totalMasteries
  };
}

/**
 * 4. DADO DE MORTE (Death Die)
 * Caso um Alvo fique Incapacitado durante um combate e inicie seu turno enquanto Incapacitado,
 * deve realizar um Dado de Morte (1d12):
 * - 1 a 6: Sentença do Corruptor (+1 Sentença)
 * - 7 a 12: Dádiva do Artesão (+1 Dádiva)
 * 
 * Regras:
 * - 2 Sentenças: O Alvo morre.
 * - 2 Dádivas: O Alvo estabiliza e não precisa mais realizar o Dado de Morte (permanece Incapacitado).
 * - Ao receber 2 Dádivas ou remover Incapacitado, ambos os contadores são removidos.
 * - Alvo estabilizado regenera 1d4 PV a cada 10 min.
 *
 * @param {Actor} actor - Documento do Ator
 * @param {object} [options={}] - Opções adicionais
 * @returns {Promise<{ roll: Roll, result: number, type: 'sentence'|'gift', sentences: number, gifts: number, isDead: boolean, isStabilized: boolean }|null>}
 */
export async function flowDeathDie(actor, options = {}) {
  if (!actor) return null;

  const currentSentences = Number(actor.system?.death?.sentences ?? 0);
  const currentGifts = Number(actor.system?.death?.gifts ?? 0);
  const isCurrentlyStabilized = Boolean(actor.system?.death?.stabilized);

  if (isCurrentlyStabilized) {
    ui.notifications?.info(`${actor.name} já está estabilizado e não precisa rolar o Dado de Morte.`);
    return null;
  }

  // Rola o 1d12 puro
  const roll = await flowRoll("1d12", {}, options);
  const result = roll.total;

  const isGift = result >= 7; // 7 a 12 = Dádiva do Artesão
  const isSentence = !isGift;  // 1 a 6 = Sentença do Corruptor

  let newSentences = currentSentences + (isSentence ? 1 : 0);
  let newGifts = currentGifts + (isGift ? 1 : 0);

  const isDead = newSentences >= 2;
  const isStabilized = newGifts >= 2;

  // Atualização no ator
  const updates = {};
  if (isDead) {
    updates["system.death.sentences"] = 2;
    updates["system.death.gifts"] = newGifts;
    updates["system.death.stabilized"] = false;
  } else if (isStabilized) {
    // Ao receber duas Dádivas, ambos os efeitos de Dádivas e Sentenças são removidos e estabiliza
    updates["system.death.sentences"] = 0;
    updates["system.death.gifts"] = 0;
    updates["system.death.stabilized"] = true;
  } else {
    updates["system.death.sentences"] = newSentences;
    updates["system.death.gifts"] = newGifts;
    updates["system.death.stabilized"] = false;
  }

  await actor.update(updates);

  // Montagem do card de chat estilizado
  const outcomeTitle = isGift
    ? (isStabilized ? "DÁDIVA DO ARTESÃO - ESTABILIZADO!" : "Dádiva do Artesão (+1)")
    : (isDead ? "SENTENÇA DO CORRUPTOR - MORTE!" : "Sentença do Corruptor (+1)");

  const outcomeClass = isGift ? "gift" : "sentence";

  let stateDescription = "";
  if (isDead) {
    stateDescription = `<div class="death-die-dead-alert"><i class="fa-solid fa-skull"></i> O personagem acumulou 2 Sentenças do Corruptor e MORREU!</div>`;
  } else if (isStabilized) {
    stateDescription = `<div class="death-die-stabilized-alert"><i class="fa-solid fa-heart-pulse"></i> O personagem acumulou 2 Dádivas do Artesão e ESTABILIZOU! Não precisa mais rolar Dado de Morte. A cada 10 minutos recuperará 1d4 PV.</div>`;
  } else {
    stateDescription = `
      <div class="death-die-counters">
        <span><strong>Sentenças:</strong> ${newSentences}/2</span>
        <span><strong>Dádivas:</strong> ${newGifts}/2</span>
      </div>
    `;
  }

  const flavor = `
    <div class="gaia-preludio chat-card death-die-card ${outcomeClass}">
      <div class="death-die-header">
        <span class="death-die-title">
          ${outcomeTitle}
        </span>
        <span class="death-die-badge">Dado de Morte (1d12)</span>
      </div>
      <p class="death-die-desc">
        ${isGift ? `<strong>${actor.name}</strong> obteve um resultado <strong>${result}</strong> e recebeu a benevolência da <em>Dádiva do Artesão</em>.` : `<strong>${actor.name}</strong> obteve um resultado <strong>${result}</strong> e sofreu a punição da <em>Sentença do Corruptor</em>.`}
      </p>
      ${stateDescription}
    </div>
  `;

  await roll.toMessage({
    speaker: ChatMessage.getSpeaker({ actor }),
    flavor
  });

  return {
    roll,
    result,
    type: isGift ? "gift" : "sentence",
    sentences: isDead ? 2 : (isStabilized ? 0 : newSentences),
    gifts: isDead ? newGifts : (isStabilized ? 0 : newGifts),
    isDead,
    isStabilized
  };
}

/**
 * Regenera 1d4 PV de um alvo que esteja estabilizado a cada 10 minutos.
 * @param {Actor} actor - Documento do Ator
 * @returns {Promise<Roll|null>}
 */
export async function flowRegenerateStabilized(actor) {
  if (!actor) return null;
  const isStabilized = Boolean(actor.system?.death?.stabilized);
  if (!isStabilized && Number(actor.system?.health?.value ?? 0) > 0) {
    ui.notifications?.info(`${actor.name} não está estabilizado ou já possui PV positivo.`);
    return null;
  }

  const roll = await flowRoll("1d4");
  let healAmount = roll.total;
  if (actor.system?.hasWeakened) {
    healAmount = Math.floor(healAmount / 2);
  }
  const currentHp = Number(actor.system?.health?.value ?? 0);
  const maxHp = Number(actor.system?.health?.max ?? 30);
  const newHp = Math.min(maxHp, currentHp + healAmount);

  await actor.update({
    "system.health.value": newHp,
    "system.death.stabilized": false,
    "system.death.sentences": 0,
    "system.death.gifts": 0
  });

  const flavor = `
    <div class="gaia-preludio chat-card heal-card" style="border-left: 4px solid var(--gaia-green, #2e8b57); padding: 8px; background: rgba(0,0,0,0.04); border-radius: var(--gaia-radius);">
      <div style="font-family: var(--gaia-font-medieval, Georgia, serif); font-size: 1.05em; font-weight: bold; color: var(--gaia-green, #2e8b57); margin-bottom: 4px;">
        Regeneração Estabilizada (+${healAmount} PV)
      </div>
      <p style="margin: 0; font-size: 12px;">
        <strong>${actor.name}</strong> descansou por 10 minutos estabilizado e regenerou <strong>${healAmount} PV</strong> (${newHp}/${maxHp} PV).
      </p>
    </div>
  `;

  await roll.toMessage({
    speaker: ChatMessage.getSpeaker({ actor }),
    flavor
  });

  return roll;
}


