/**
 * ==============================================================================
 * GAIA: PRELÚDIO - TOKEN HELPER / AUXILIAR DE TOKENS E JOGADORES
 * ==============================================================================
 * Funções utilitárias para capturar tokens selecionados, controlados e alvos de
 * jogadores no Foundry Virtual Tabletop.
 */

/**
 * Captura o token selecionado/controlado de um jogador na cena ativa.
 * 
 * @param {User|string|null} [user=null] - Instância de User ou ID do jogador. Se omitido, usa game.user.
 * @param {object} [options={}] - Opções de busca e tratamento.
 * @param {boolean} [options.fallbackToCharacter=true] - Se true e o jogador não tiver token selecionado, busca o token do seu Personagem (game.user.character) na cena.
 * @param {boolean} [options.notify=false] - Se true, exibe um aviso (ui.notifications.warn) caso nenhum token seja encontrado.
 * @param {string} [options.warnMessage] - Mensagem personalizada de aviso caso nenhum token seja selecionado.
 * @returns {TokenDocument|Token|null} O objeto Token selecionado ou null se nenhum for encontrado.
 */
export function getSelectedToken(user = null, options = {}) {
  const {
    fallbackToCharacter = true,
    notify = false,
    warnMessage = "Nenhum token está selecionado."
  } = options;

  // Resolve o objeto User
  const targetUser = typeof user === "string" 
    ? game.users.get(user) 
    : (user ?? game.user);

  if (!targetUser) {
    if (notify) ui.notifications?.warn("Jogador não encontrado.");
    return null;
  }

  let token = null;

  // 1. Se o usuário for o usuário local (game.user), obtém o token atualmente selecionado/controlado na tela
  if (targetUser.id === game.user?.id) {
    token = canvas?.tokens?.controlled?.[0] ?? null;
  }

  // 2. Fallback: se ativado, busca o token ativo do Personagem (Actor) atribuído ao jogador na cena
  if (!token && fallbackToCharacter && targetUser.character && canvas?.scene) {
    const characterTokens = targetUser.character.getActiveTokens(true, false);
    if (characterTokens.length > 0) {
      token = characterTokens[0];
    }
  }

  // 3. Fallback secundário: busca qualquer token na cena em que o usuário seja proprietário (isOwner)
  if (!token && fallbackToCharacter && canvas?.tokens?.placeables) {
    token = canvas.tokens.placeables.find(t => t.isOwner && !t.document.hidden) ?? null;
  }

  if (!token && notify) {
    ui.notifications?.warn(warnMessage);
  }

  return token;
}

/**
 * Captura TODOS os tokens selecionados/controlados por um jogador.
 * 
 * @param {User|string|null} [user=null] - Instância de User ou ID do jogador. Se omitido, usa game.user.
 * @param {object} [options={}] - Opções adicionais.
 * @param {boolean} [options.notify=false] - Exibe aviso se a lista estiver vazia.
 * @returns {Array<Token>} Array de objetos Token selecionados.
 */
export function getSelectedTokens(user = null, options = {}) {
  const { notify = false, warnMessage = "Nenhum token selecionado." } = options;

  const targetUser = typeof user === "string" 
    ? game.users.get(user) 
    : (user ?? game.user);

  if (!targetUser) return [];

  let tokens = [];

  if (targetUser.id === game.user.id) {
    tokens = canvas?.tokens?.controlled ?? [];
  } else if (targetUser.character && canvas?.scene) {
    tokens = targetUser.character.getActiveTokens(true, false);
  }

  if (tokens.length === 0 && notify) {
    ui.notifications?.warn(warnMessage);
  }

  return tokens;
}

/**
 * Captura os tokens marcados como alvo (Targets / tecla 'T') por um jogador.
 * 
 * @param {User|string|null} [user=null] - Instância de User ou ID do jogador. Se omitido, usa game.user.
 * @returns {Array<Token>} Array com os tokens marcados como alvo.
 */
export function getTargetedTokens(user = null) {
  const targetUser = typeof user === "string" 
    ? game.users.get(user) 
    : (user ?? game.user);

  if (!targetUser) return [];
  return Array.from(targetUser.targets ?? []);
}

/**
 * Captura o token prioritário do jogador: retorna o token controlado; se não houver,
 * retorna o token marcado como alvo; se não houver, retorna o token do personagem do jogador.
 * 
 * @param {User|string|null} [user=null] - O jogador de referência.
 * @param {object} [options={}] - Opções (ex: notify: true).
 * @returns {Token|null}
 */
export function getSelectedOrTargetToken(user = null, options = {}) {
  const controlled = getSelectedToken(user, { fallbackToCharacter: false });
  if (controlled) return controlled;

  const targets = getTargetedTokens(user);
  if (targets.length > 0) return targets[0];

  return getSelectedToken(user, { fallbackToCharacter: true, notify: options.notify });
}
