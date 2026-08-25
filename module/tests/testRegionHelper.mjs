/**
 * ==============================================================================
 * TEST SUITE: REGION HELPER / SUÍTE DE TESTES DO AUXILIAR DE REGIÕES
 * ==============================================================================
 * Testes unitários para as funções do módulo `region-helper.mjs`:
 * - convertToPixels
 * - createRegionShape (circle, rectangle, cone, line, ellipse, polygon)
 * - createRegion
 *
 * Como executar no Foundry VTT (Console F12 ou Macro):
 * ```js
 * const { runRegionTests } = await import('/systems/gaia-preludio/module/tests/testRegionHelper.mjs');
 * await runRegionTests();
 * ```
 */

import {
  convertToPixels,
  createRegionShape,
  createRegion
} from "../helpers/region-helper.mjs";

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
        `%c🎉 Todos os ${this.total} testes do Region Helper passaram! (${this.passed}/${this.total})`,
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

/**
 * Executa a suíte de testes para criação e cálculo de Regiões.
 */
export async function runRegionTests() {
  console.log("%c🧪 Iniciando Suíte de Testes: Region Helper", "color: #2196F3; font-size: 16px; font-weight: bold;");
  const runner = new TestRunner();

  const mockScene = {
    grid: { size: 100, distance: 1 }
  };

  // --------------------------------------------------------------------------
  // TESTE 1: Conversão de Unidades para Pixels
  // --------------------------------------------------------------------------
  console.log("\n--- Teste 1: Conversão para Pixels ---");
  const pxFromDistance = convertToPixels(6, mockScene, "distance");
  runner.assertEquals(pxFromDistance, 600, "6m a 100px/m deve converter para 600px.");

  const pxDirect = convertToPixels(350, mockScene, "pixels");
  runner.assertEquals(pxDirect, 350, "Unidade 'pixels' deve manter 350px.");

  // --------------------------------------------------------------------------
  // TESTE 2: Geometria de Círculo
  // --------------------------------------------------------------------------
  console.log("\n--- Teste 2: Shape Círculo ---");
  const circleShape = createRegionShape(5, "circle", { x: 500, y: 500, scene: mockScene });
  runner.assertEquals(circleShape.type, "circle", "Tipo deve ser 'circle'.");
  runner.assertEquals(circleShape.radius, 500, "Raio de 5m deve ser 500px.");
  runner.assertEquals(circleShape.x, 500, "Coordenada X central deve ser 500.");

  // --------------------------------------------------------------------------
  // TESTE 3: Geometria de Retângulo
  // --------------------------------------------------------------------------
  console.log("\n--- Teste 3: Shape Retângulo ---");
  const rectShape = createRegionShape({ width: 4, height: 2 }, "retangulo", { x: 300, y: 300, scene: mockScene });
  runner.assertEquals(rectShape.type, "rectangle", "Tipo deve ser 'rectangle'.");
  runner.assertEquals(rectShape.width, 400, "Largura de 4m deve ser 400px.");
  runner.assertEquals(rectShape.height, 200, "Altura de 2m deve ser 200px.");

  // --------------------------------------------------------------------------
  // TESTE 4: Geometria de Cone (Polígono)
  // --------------------------------------------------------------------------
  console.log("\n--- Teste 4: Shape Cone ---");
  const coneShape = createRegionShape(10, "cone", { x: 100, y: 100, rotation: 0, coneAngle: 60, scene: mockScene });
  runner.assertEquals(coneShape.type, "polygon", "Cone deve ser gerado como 'polygon'.");
  runner.assert(coneShape.points.length > 6, "Cone deve possuir vértices calculados para a abertura.");

  // --------------------------------------------------------------------------
  // TESTE 5: Função Principal createRegion (payload data)
  // --------------------------------------------------------------------------
  console.log("\n--- Teste 5: Construção do Documento de Região ---");
  const regionData = await createRegion(5, "circulo", {
    name: "Aura Solar",
    color: "#ffaa00",
    x: 200,
    y: 200,
    scene: mockScene,
    create: false // apenas constrói payload
  });

  runner.assertEquals(regionData.name, "Aura Solar", "Nome da região deve ser 'Aura Solar'.");
  runner.assertEquals(regionData.color, "#ffaa00", "Cor hexadecimal deve ser '#ffaa00'.");
  runner.assertEquals(regionData.shapes.length, 1, "Deve conter 1 shape.");
  runner.assertEquals(regionData.shapes[0].type, "circle", "Shape interno deve ser um círculo.");

  return runner.summary();
}
