/**
 * ==============================================================================
 * GAIA ITEM DOCUMENT / DOCUMENTO DE ITEM GAIA
 * ==============================================================================
 * PT: Extensão da classe base Item para o sistema Gaia: Prelúdio.
 * EN: Extension of the base Item class for the Gaia: Prelúdio system.
 *
 * @extends {Item}
 */
export class GaiaItem extends Item {

  /**
   * PT: Prepara dados derivados do item.
   * EN: Prepares derived item data.
   * @override
   */
  prepareDerivedData() {
    super.prepareDerivedData();
  }

  /**
   * PT: Retorna os dados para fórmulas de rolagem que envolvem este item.
   *     Herda o contexto do ator pai (se o item estiver em um ator) e adiciona os dados do item.
   * EN: Returns data for roll formulas involving this item.
   *     Inherits parent actor context (if item belongs to an actor) and includes item data.
   * @override
   * @returns {Record<string, any>}
   */
  getRollData() {
    /** @type {Record<string, any>} */
    const rollData = {
      ...(this.actor ? this.actor.getRollData() : {}),
      item: { ...this.system }
    };
    return rollData;
  }

  /**
   * PT: Executa uma exibição ou rolagem básica para este item no chat.
   * EN: Executes a basic display or roll for this item in chat.
   * @param {Record<string, any>} [options] - PT: Opções adicionais de mensagem / EN: Additional message options.
   * @returns {Promise<ChatMessage|void>}
   */
  async roll(options = {}) {
    const speaker = ChatMessage.getSpeaker({ actor: this.actor ?? undefined });
    /** @type {any} */
    const system = this.system;
    const description = system?.description || "";
    const content = `<h3>${this.name}</h3><p>${description}</p>`;

    return ChatMessage.create(/** @type {any} */ ({
      speaker,
      content,
      ...options
    }));
  }
}
