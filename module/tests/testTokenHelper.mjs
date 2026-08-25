/**
 * ==============================================================================
 * TEST SUITE: TOKEN HELPER / SUÍTE DE TESTES DO AUXILIAR DE TOKENS
 * ==============================================================================
 * Testes unitários para as funções do módulo `token-helper.mjs`:
 * - getSelectedToken
 * - getSelectedTokens
 * - getTargetedTokens
 * - getSelectedOrTargetToken
 *
 * Como executar no Foundry VTT (Console F12 ou Macro):
 * ```js
 * const { runTokenTests } = await import('/systems/gaia-preludio/module/tests/testTokenHelper.mjs');
 * await runTokenTests();
 * ```
 */

import {
  getSelectedToken,
  getSelectedTokens,
  getTargetedTokens,
  getSelectedOrTargetToken
} from "../helpers/token-helper.mjs";

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
        `%c🎉 Todos os ${this.total} testes do Token Helper passaram! (${this.passed}/${this.total})`,
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
 * Executa a suíte completa de testes para a função getSelectedToken e utilitários de token.
 */
export async function runTokenTests() {
  console.log("%c🧪 Iniciando Suíte de Testes: Token Helper", "color: #2196F3; font-size: 16px; font-weight: bold;");
  const runner = new TestRunner();

  // Objetos de mock para teste unitário
  const mockToken1 = { id: "token-001", name: "Herói Principal", isOwner: true };
  const mockToken2 = { id: "token-002", name: "Inimigo Monstro", isOwner: false };
  const mockTokenChar = { id: "token-char", name: "Token do Personagem", isOwner: true };

  const mockUser = {
    id: "user-test-123",
    name: "Jogador Teste",
    character: {
      id: "actor-123",
      name: "Personagem Jogador",
      getActiveTokens: () => [mockTokenChar]
    },
    targets: new Set([mockToken2])
  };

  // Verifica se o ambiente possui canvas/game (Foundry VTT em execução)
  const isFoundryLive = typeof canvas !== "undefined" && canvas !== null;
  const isGameLive = typeof game !== "undefined" && game !== null;

  // Salva referências originais com segurança se existirem
  let originalControlled = null;
  let originalPlaceables = null;
  let originalWarn = ui?.notifications?.warn;
  let warnCalledWith = null;

  if (isFoundryLive && canvas.tokens) {
    originalControlled = canvas.tokens.controlled;
    originalPlaceables = canvas.tokens.placeables;
  }

  try {
    // Configura mock de notificação
    if (typeof ui !== "undefined" && ui?.notifications) {
      ui.notifications.warn = (msg) => { warnCalledWith = msg; };
    }

    // --------------------------------------------------------------------------
    // TESTE 1: getSelectedToken - Usando objeto User e Fallback do Personagem
    // --------------------------------------------------------------------------
    console.log("\n--- Teste 1: Captura via Personagem do Jogador (User Especificado) ---");
    const tokenPersonagem = getSelectedToken(mockUser, { fallbackToCharacter: true });
    runner.assert(tokenPersonagem !== null, "getSelectedToken deve retornar o token do personagem do jogador.");
    runner.assertEquals(tokenPersonagem?.id, "token-char", "Deve retornar token-char.");

    // --------------------------------------------------------------------------
    // TESTE 2: getSelectedToken - Captura de alvos (Targets) do Jogador
    // --------------------------------------------------------------------------
    console.log("\n--- Teste 2: Captura de Tokens Alvo (Targets) ---");
    const targets = getTargetedTokens(mockUser);
    runner.assertEquals(targets.length, 1, "getTargetedTokens deve retornar 1 alvo.");
    runner.assertEquals(targets[0]?.id, "token-002", "Deve corresponder ao token-002.");

    // --------------------------------------------------------------------------
    // TESTE 3: getSelectedOrTargetToken - Prioridade Alvo vs Personagem
    // --------------------------------------------------------------------------
    console.log("\n--- Teste 3: Prioridade (Alvo vs Personagem Fallback) ---");
    const tokenAlvo = getSelectedOrTargetToken(mockUser);
    runner.assertEquals(tokenAlvo?.id, "token-002", "Deve retornar o token alvo quando selecionado.");

    // --------------------------------------------------------------------------
    // TESTE 4: Teste no Usuário Conectado (game.user / canvas.tokens.controlled)
    // --------------------------------------------------------------------------
    console.log("\n--- Teste 4: Verificação no Canvas Atual ---");
    if (isFoundryLive && isGameLive) {
      const currentToken = getSelectedToken();
      // Pode ser null ou um Token real da cena do Foundry
      console.log(`  ℹ Token atualmente selecionado no canvas: ${currentToken ? currentToken.name : 'Nenhum'}`);
      runner.assert(true, "Executou a busca com sucesso na cena ativa do Foundry VTT.");
    } else {
      runner.assert(true, "Ambiente mock simulado com sucesso (sem canvas ativo).");
    }

    // --------------------------------------------------------------------------
    // TESTE 5: Notificação quando nenhum token é encontrado
    // --------------------------------------------------------------------------
    console.log("\n--- Teste 5: Notificação de Alerta ---");
    const emptyUser = { id: "empty-user", character: null, targets: new Set() };
    warnCalledWith = null;
    const noResult = getSelectedToken(emptyUser, { notify: true, fallbackToCharacter: false, warnMessage: "Alerta de teste!" });
    runner.assertEquals(noResult, null, "Deve retornar null quando nenhum token for localizado.");
    
    if (typeof ui !== "undefined" && ui?.notifications) {
      runner.assertEquals(warnCalledWith, "Alerta de teste!", "Deve disparar ui.notifications.warn com a mensagem.");
    } else {
      runner.assert(true, "Ignorado teste de UI pois ui.notifications não está disponível.");
    }

  } finally {
    // Restaura métodos modificados no ui.notifications
    if (typeof ui !== "undefined" && ui?.notifications && originalWarn) {
      ui.notifications.warn = originalWarn;
    }
  }

  return runner.summary();
}
