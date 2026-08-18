/**
 * ==============================================================================
 * TEST SUITE: FLOW.MJS / SUÍTE DE TESTES: FLOW.MJS
 * ==============================================================================
 * PT: Testes unitários para todas as funções do módulo flow.mjs.
 * EN: Unit tests for all functions in the flow.mjs module.
 *
 * Como executar no Foundry VTT (Console F12 ou Macro):
 * ```js
 * const { runFlowTests } = await import('/systems/gaia-preludio/module/tests/testFlow.mjs');
 * await runFlowTests();
 * ```
 */

import {
  flowRoll,
  flowParameter,
  flowDamage,
  amplifyRoll,
  maxRoll,
  minRoll,
  defense,
  calculateDamage
} from "../helpers/flow.mjs";

class TestRunner {
  constructor() {
    this.passed = 0;
    this.failed = 0;
    this.total = 0;
  }

  assert(condition, description, details = {}) {
    this.total++;
    if (condition) {
      this.passed++;
      console.log(`%c  ✔ PASS: ${description}`, "color: #4CAF50; font-weight: bold;");
    } else {
      this.failed++;
      console.error(`  ✖ FAIL: ${description}`, details);
    }
  }

  assertEquals(actual, expected, description) {
    const passed = actual === expected;
    this.assert(passed, description, { expected, actual });
  }

  summary() {
    console.log("\n==========================================");
    if (this.failed === 0) {
      console.log(
        `%c🎉 Todos os ${this.total} testes passaram com sucesso! (${this.passed}/${this.total})`,
        "color: #4CAF50; font-size: 14px; font-weight: bold;"
      );
    } else {
      console.log(
        `%c⚠️ Concluído com falhas: ${this.passed} passaram, ${this.failed} falharam de ${this.total} testes.`,
        "color: #F44336; font-size: 14px; font-weight: bold;"
      );
    }
    console.log("==========================================\n");
    return { total: this.total, passed: this.passed, failed: this.failed };
  }
}

export async function runFlowTests() {
  console.log("%c🧪 Iniciando bateria de testes para flow.mjs...", "color: #2196F3; font-size: 14px; font-weight: bold;");
  const runner = new TestRunner();

  // ============================================================================
  // 1. Testes: flowRoll
  // ============================================================================
  console.group("%c1. flowRoll", "color: #9C27B0; font-weight: bold;");
  try {
    const rollSimple = await flowRoll("1d6 + 2");
    runner.assert(rollSimple instanceof Roll, "Retorna uma instância de Roll");
    runner.assert(typeof rollSimple.total === "number", "Roll possui total numérico");

    const rollData = await flowRoll("@bonus + 5", { bonus: 10 });
    runner.assertEquals(rollData.total, 15, "Substitui variáveis de dados corretamente (@bonus + 5)");

    const rollMax = await flowRoll("1d6 + 2", {}, { maximize: true });
    runner.assertEquals(rollMax.total, 8, "Aplica opções do evaluate ({ maximize: true })");
  } catch (err) {
    runner.assert(false, `Erro inesperado em flowRoll: ${err.message}`);
  }
  console.groupEnd();

  // ============================================================================
  // 2. Testes: flowParameter (Para cada tipo em GAIA.rollTypes)
  // ============================================================================
  console.group("%c2. flowParameter & GAIA.rollTypes", "color: #9C27B0; font-weight: bold;");
  try {
    const paramObj = { value: 3 };

    // 2.1 Standard: 1d12
    const rollStandard = await flowParameter(paramObj, "standard");
    runner.assert(rollStandard instanceof Roll, "standard: Retorna instância de Roll");
    runner.assert(rollStandard.formula.includes("1d12"), "standard: Usa fórmula com 1d12");
    runner.assertEquals(rollStandard.data.parameter, 3, "standard: Injeta @parameter = 3");
    runner.assert(
      rollStandard.total >= 4 && rollStandard.total <= 15,
      `standard: Total dentro do intervalo esperado (1..12 + 3 = ${rollStandard.total})`
    );

    // 2.2 Advantage: 2d12kh
    const rollAdv = await flowParameter(paramObj, "advantage");
    runner.assert(rollAdv instanceof Roll, "advantage: Retorna instância de Roll");
    runner.assert(rollAdv.formula.includes("2d12kh"), "advantage: Usa fórmula com 2d12kh");
    runner.assertEquals(rollAdv.data.parameter, 3, "advantage: Injeta @parameter = 3");
    runner.assert(
      rollAdv.total >= 4 && rollAdv.total <= 15,
      `advantage: Total dentro do intervalo esperado (1..12 + 3 = ${rollAdv.total})`
    );

    // 2.3 Disadvantage: 2d12ll
    const rollDisadv = await flowParameter(paramObj, "disadvantage");
    runner.assert(rollDisadv instanceof Roll, "disadvantage: Retorna instância de Roll");
    runner.assert(rollDisadv.formula.includes("2d12ll"), "disadvantage: Usa fórmula com 2d12ll");
    runner.assertEquals(rollDisadv.data.parameter, 3, "disadvantage: Injeta @parameter = 3");
    runner.assert(
      rollDisadv.total >= 4 && rollDisadv.total <= 15,
      `disadvantage: Total dentro do intervalo esperado (1..12 + 3 = ${rollDisadv.total})`
    );

    // 2.4 Super Advantage: 3d12kh
    const rollSupAdv = await flowParameter(paramObj, "supAdvantage");
    runner.assert(rollSupAdv instanceof Roll, "supAdvantage: Retorna instância de Roll");
    runner.assert(rollSupAdv.formula.includes("3d12kh"), "supAdvantage: Usa fórmula com 3d12kh");
    runner.assertEquals(rollSupAdv.data.parameter, 3, "supAdvantage: Injeta @parameter = 3");
    runner.assert(
      rollSupAdv.total >= 4 && rollSupAdv.total <= 15,
      `supAdvantage: Total dentro do intervalo esperado (1..12 + 3 = ${rollSupAdv.total})`
    );

    // 2.5 Super Disadvantage: 3d12ll
    const rollSupDisadv = await flowParameter(paramObj, "supDisadvantage");
    runner.assert(rollSupDisadv instanceof Roll, "supDisadvantage: Retorna instância de Roll");
    runner.assert(rollSupDisadv.formula.includes("3d12ll"), "supDisadvantage: Usa fórmula com 3d12ll");
    runner.assertEquals(rollSupDisadv.data.parameter, 3, "supDisadvantage: Injeta @parameter = 3");
    runner.assert(
      rollSupDisadv.total >= 4 && rollSupDisadv.total <= 15,
      `supDisadvantage: Total dentro do intervalo esperado (1..12 + 3 = ${rollSupDisadv.total})`
    );

    // 2.6 Parâmetro nulo / undefined
    const rollNoParam = await flowParameter(null, "standard");
    runner.assertEquals(rollNoParam.data.parameter, 0, "Tratamento de parâmetro nulo/undefined injeta 0");
    runner.assert(
      rollNoParam.total >= 1 && rollNoParam.total <= 12,
      `Total com parâmetro nulo é apenas o dado (1..12 = ${rollNoParam.total})`
    );
  } catch (err) {
    runner.assert(false, `Erro inesperado em flowParameter: ${err.message}`);
  }
  console.groupEnd();

  // ============================================================================
  // 3. Testes: flowDamage
  // ============================================================================
  console.group("%c3. flowDamage", "color: #9C27B0; font-weight: bold;");
  try {
    const rollNum = await flowDamage({ value: 8 });
    runner.assertEquals(rollNum.total, 8, "Rola dano numérico fixo");

    const rollFormula = await flowDamage({ value: "2d6 + 3" });
    runner.assert(rollFormula.total >= 5 && rollFormula.total <= 15, "Rola dano com fórmula em string (2d6 + 3)");
  } catch (err) {
    runner.assert(false, `Erro inesperado em flowDamage: ${err.message}`);
  }
  console.groupEnd();

  // ============================================================================
  // 4. Testes: amplifyRoll
  // ============================================================================
  console.group("%c4. amplifyRoll", "color: #9C27B0; font-weight: bold;");
  try {
    const amplifiedNum = amplifyRoll(10, 5);
    runner.assertEquals(amplifiedNum, 15, "Amplifica valor numérico direto (10 + 5 = 15)");

    const mockRoll = { total: 12 };
    const amplifiedRoll = amplifyRoll(mockRoll, 3);
    runner.assertEquals(amplifiedRoll, 15, "Amplifica objeto com propriedade total ({ total: 12 } + 3 = 15)");

    const zeroAmp = amplifyRoll(10, 0);
    runner.assertEquals(zeroAmp, 10, "Amplificação com 0 pontos mantém o total");
  } catch (err) {
    runner.assert(false, `Erro inesperado em amplifyRoll: ${err.message}`);
  }
  console.groupEnd();

  // ============================================================================
  // 5. Testes: maxRoll & minRoll
  // ============================================================================
  console.group("%c5. maxRoll & minRoll", "color: #9C27B0; font-weight: bold;");
  try {
    const maximized = await maxRoll("2d6 + 4");
    runner.assertEquals(maximized.total, 16, "maxRoll maximiza os dados (2d6+4 = 16)");

    const minimized = await minRoll("2d6 + 4");
    runner.assertEquals(minimized.total, 6, "minRoll minimiza os dados (2d6+4 = 6)");
  } catch (err) {
    runner.assert(false, `Erro inesperado em maxRoll/minRoll: ${err.message}`);
  }
  console.groupEnd();

  // ============================================================================
  // 6. Testes: defense
  // ============================================================================
  console.group("%c6. defense", "color: #9C27B0; font-weight: bold;");
  try {
    const mockActor = {
      system: {
        agility: { value: 4 },
        block: { value: 2 }
      }
    };

    const defAgility = await defense("agility", mockActor, "advantage");
    runner.assert(defAgility instanceof Roll, "defense ('agility') retorna Roll");
    runner.assertEquals(
      defAgility.data.parameter,
      mockActor.system.agility.value,
      "Valor de agilidade no Roll.data é igual ao mockActor (4)"
    );
    const agilityDiceTotal = defAgility.dice[0]?.total ?? (defAgility.total - mockActor.system.agility.value);
    runner.assertEquals(
      defAgility.total,
      agilityDiceTotal + mockActor.system.agility.value,
      "Total da rolagem de agilidade soma exatamente o resultado dos dados + valor do mockActor"
    );

    const defBlock = await defense("block", mockActor, "advantage");
    runner.assert(defBlock instanceof Roll, "defense ('block') retorna Roll");
    runner.assertEquals(
      defBlock.data.block,
      mockActor.system.block.value,
      "Valor de bloqueio no Roll.data é igual ao mockActor (2)"
    );
    const blockDiceTotal = defBlock.dice[0]?.total ?? (defBlock.total - mockActor.system.block.value);
    runner.assertEquals(
      defBlock.total,
      blockDiceTotal + mockActor.system.block.value,
      "Total da rolagem de bloqueio soma exatamente o resultado dos dados + valor do mockActor"
    );
  } catch (err) {
    runner.assert(false, `Erro inesperado em defense: ${err.message}`);
  }
  console.groupEnd();

  // ============================================================================
  // 7. Testes: calculateDamage
  // ============================================================================
  console.group("%c7. calculateDamage", "color: #9C27B0; font-weight: bold;");
  try {
    // 7.1 Dano base sem defesas
    const targetSemDefesa = { system: {} };
    runner.assertEquals(
      calculateDamage({ type: "fogo", value: 10 }, targetSemDefesa),
      10,
      "Dano base normal sem modificadores"
    );

    // 7.2 Dano base zero ou negativo
    runner.assertEquals(calculateDamage({ type: "fogo", value: 0 }, targetSemDefesa), 0, "Dano base zero retorna 0");
    runner.assertEquals(calculateDamage({ type: "fogo", value: -5 }, targetSemDefesa), 0, "Dano negativo retorna 0");

    // 7.3 Imunidade (cancela dano completamente para 0)
    const targetImune = {
      system: {
        damageImmunity: [{ type: "fogo" }]
      }
    };
    runner.assertEquals(
      calculateDamage({ type: "fogo", value: 50 }, targetImune),
      0,
      "Imunidade cancela todo o dano (retorna 0)"
    );

    // 7.4 Resistência (dano pela metade, arredondado para cima)
    const targetResistente = {
      system: {
        damageResistance: [{ type: "fogo" }]
      }
    };
    runner.assertEquals(
      calculateDamage({ type: "fogo", value: 10 }, targetResistente),
      5,
      "Resistência divide por 2 (10 -> 5)"
    );
    runner.assertEquals(
      calculateDamage({ type: "fogo", value: 5 }, targetResistente),
      3,
      "Resistência arredonda para cima (5 / 2 = 2.5 -> 3)"
    );

    // 7.5 Vulnerabilidade (dano duplicado)
    const targetVulneravel = {
      system: {
        damageVulnerability: [{ type: "fogo" }]
      }
    };
    runner.assertEquals(
      calculateDamage({ type: "fogo", value: 6 }, targetVulneravel),
      12,
      "Vulnerabilidade dobra o dano (6 * 2 = 12)"
    );

    // 7.6 Resistência + Vulnerabilidade (se anulam mutuamente)
    const targetMisto = {
      system: {
        damageResistance: [{ type: "fogo" }],
        damageVulnerability: [{ type: "fogo" }]
      }
    };
    runner.assertEquals(
      calculateDamage({ type: "fogo", value: 7 }, targetMisto),
      7,
      "Resistência e Vulnerabilidade juntas se anulam"
    );

    // 7.7 Redução de Dano (damageReduction plana)
    const targetReducao = {
      system: {
        damageReduction: [{ type: "fogo", value: 4 }]
      }
    };
    runner.assertEquals(
      calculateDamage({ type: "fogo", value: 10 }, targetReducao),
      6,
      "Redução plana subtrai o valor (10 - 4 = 6)"
    );

    // 7.8 Dano nunca reduzido abaixo de 1 (mesmo que a redução seja maior)
    runner.assertEquals(
      calculateDamage({ type: "fogo", value: 3 }, targetReducao),
      1,
      "Dano com redução maior que o valor nunca fica abaixo de 1 (3 - 4 = 1)"
    );

    // 7.9 Resistência + Redução combinadas
    const targetResistEReducao = {
      system: {
        damageResistance: [{ type: "fogo" }],
        damageReduction: [{ type: "fogo", value: 3 }]
      }
    };
    // 9 / 2 = 4.5 -> ceil(4.5) = 5; 5 - 3 = 2
    runner.assertEquals(
      calculateDamage({ type: "fogo", value: 9 }, targetResistEReducao),
      2,
      "Resistência + Redução combinadas: ceil(9/2) - 3 = 2"
    );

    // 7.10 Múltiplas reduções e tipo "all" / "todos"
    const targetMultiplasReducoes = {
      system: {
        damageReduction: [
          { type: "fogo", value: 2 },
          { type: "all", value: 3 }
        ]
      }
    };
    runner.assertEquals(
      calculateDamage({ type: "fogo", value: 10 }, targetMultiplasReducoes),
      5,
      "Soma reduções específicas e genéricas 'all' (10 - (2 + 3) = 5)"
    );

    // 7.11 Case-insensitivity (ex: 'Fogo' vs 'fogo')
    runner.assertEquals(
      calculateDamage({ type: "FOGO", value: 10 }, targetResistente),
      5,
      "Comparação de tipos de dano não diferencia maiúsculas de minúsculas"
    );
  } catch (err) {
    runner.assert(false, `Erro inesperado em calculateDamage: ${err.message}`);
  }
  console.groupEnd();

  return runner.summary();
}
