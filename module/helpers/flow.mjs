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

export async function flowParameter(parameter, fitness) {
  const dice = GAIA.rollTypes[fitness]?.roll ?? GAIA.rollTypes[fitness] ?? "1d12";
  return await flowRoll(`${dice} + @parameter`, { parameter: parameter?.value ?? 0 });
}

export async function flowDamage(damage) {
  // Se damage for um objeto com fórmula em string, rola a fórmula; se for número, insere na variável
  const formula = typeof damage.value === "string" ? damage.value : "@damage";
  return await flowRoll(formula, { damage: damage.value });
}

export function amplifyRoll(roll, energyPoints) {
  // Extrai o total caso seja um objeto Roll, ou usa o valor numérico direto
  const total = typeof roll === "number" ? roll : (roll?.total ?? 0);
  return total + energyPoints;
}

export async function maxRoll(formula, data = {}) {
  return await flowRoll(formula, data, { maximize: true });
}

export async function minRoll(formula, data = {}) {
  return await flowRoll(formula, data, { minimize: true });
}

export async function defense(type, actor, fitness = "standard") {
  if (type === "agility") {
    const agilityParam = actor.system?.parameters?.find(p => {
      const name = String(p.name || "").toLowerCase();
      return name === "agility" || name === "agilidade";
    });
    const agilityVal = Number(agilityParam?.value ?? actor.system?.agility?.value ?? actor.system?.agility ?? 0);
    return await flowParameter({ value: agilityVal }, fitness);
  }
  
  const dice = GAIA.rollTypes[fitness]?.roll ?? GAIA.rollTypes[fitness] ?? "1d12";
  const blockVal = Number(actor.system?.block?.value ?? actor.system?.block ?? 0);
  return await flowRoll(`${dice} + @block`, { block: blockVal });
}

/**
 * Calcula o dano final considerando imunidades, resistências, vulnerabilidades e reduções.
 * @param {{ type: string, value: number }} damage - Tipo e valor do dano
 * @param {Actor} target - Documento do Ator alvo
 * @returns {number} O dano final calculado (mínimo 1 se não for imune)
 */
export function calculateDamage(damage, target) {
  const baseDamage = Number(damage?.value) || 0;
  if (baseDamage <= 0) return 0;

  const targetSystem = target?.system;
  if (!targetSystem) return baseDamage;

  const damageType = String(damage?.type || "").trim().toLowerCase();

  const {
    damageImmunity = [],
    damageResistance = [],
    damageVulnerability = [],
    damageReduction = []
  } = targetSystem;

  // Função auxiliar para comparação de tipo (case-insensitive)
  const matchesType = entry => {
    const entryType = String(entry?.type || "").trim().toLowerCase();
    return entryType === damageType || entryType === "all" || entryType === "todos";
  };

  // 1. Imunidade: cancela todo o dano imediatamente (0)
  const isImmune = damageImmunity.some(matchesType);
  if (isImmune) return 0;

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
    finalDamage -= totalReduction;
  }

  // 4. O dano nunca é reduzido abaixo de 1 (apenas Imunidade ou dano base zero resultam em 0)
  return Math.max(1, Math.floor(finalDamage));
}
