/**
 * ==============================================================================
 * GAIA ACTOR DOCUMENT / DOCUMENTO DE ATOR GAIA
 * ==============================================================================
 * PT: Extensão da classe base Actor para o sistema Gaia: Prelúdio.
 * EN: Extension of the base Actor class for the Gaia: Prelúdio system.
 *
 * @extends {Actor}
 */
export class GaiaActor extends Actor {

  /**
   * PT: Executa a preparação inicial de dados do Actor antes de preparar documentos embutidos (Items, ActiveEffects).
   * EN: Performs initial Actor data preparation before embedded documents (Items, ActiveEffects) are prepared.
   * @override
   */
  prepareBaseData() {
    super.prepareBaseData();
  }

  /**
   * PT: Prepara dados derivados do Actor após a preparação de documentos embutidos e ActiveEffects.
   * EN: Prepares derived Actor data after embedded documents and ActiveEffects have been prepared.
   * @override
   */
  prepareDerivedData() {
    super.prepareDerivedData();
    /** @type {any} */
    const system = this.system;

    this._prepareCharacterData(system);
  }

  /**
   * PT: Sanitiza e valida limites de recursos básicos do personagem (vida, energia).
   * EN: Sanitizes and validates basic character resource limits (health, energy).
   * @param {any} system - PT: Objeto de dados do sistema / EN: System data object.
   * @protected
   */
  _prepareCharacterData(system) {
    if (!system) return;

    if (system.health && typeof system.health.value === "number") {
      system.health.value = Math.clamp(system.health.value, 0, system.health.max ?? 0);
    }
    if (system.energy && typeof system.energy.value === "number") {
      system.energy.value = Math.clamp(system.energy.value, 0, system.energy.max ?? 0);
    }
  }

  /**
   * PT: Retorna os dados disponíveis para comandos de rolagem de dados (inline rolls, macros, etc.).
   * EN: Returns data available for dice roll commands (inline rolls, macros, etc.).
   * @override
   * @returns {Record<string, any>}
   */
  getRollData() {
    /** @type {Record<string, any>} */
    const data = { ...super.getRollData() };
    /** @type {any} */
    const system = this.system;

    // PT: Mapeia parâmetros (atributos) para acesso simplificado em fórmulas (ex: @params.strength)
    // EN: Maps parameters (attributes) for simplified formula access (e.g. @params.strength)
    if (system?.parameters && Array.isArray(system.parameters)) {
      data.params = {};
      for (const param of system.parameters) {
        if (param.name) {
          const key = param.name.toLowerCase().replace(/\s+/g, "_");
          data.params[key] = param.value;
        }
      }
    }

    // PT: Mapeia conhecimentos (perícias) para acesso simplificado em fórmulas (ex: @knowledge.arcana)
    // EN: Maps knowledge (skills) for simplified formula access (e.g. @knowledge.arcana)
    if (system?.knowledge && Array.isArray(system.knowledge)) {
      data.knowledge = {};
      for (const item of system.knowledge) {
        if (item.name) {
          const key = item.name.toLowerCase().replace(/\s+/g, "_");
          data.knowledge[key] = item.value;
        }
      }
    }

    return data;
  }
}
