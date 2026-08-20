/**
 * ==============================================================================
 * GAIA ACTOR DOCUMENT / DOCUMENTO DE ATOR GAIA
 * ==============================================================================
 * PT: Extensão da classe base Actor para o sistema Gaia: Prelúdio.
 * EN: Extension of the base Actor class for the Gaia: Prelúdio system.
 *
 * @extends {Actor}
 */
import { prepareParameterBonuses } from "../helpers/actor-context.mjs";
import { promptAwakeningGuideDialog } from "../helpers/dialogs.mjs";

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
   * PT: Intercepta atualizações antes de salvar no banco de dados para utilizar o valor original nos atributos com bônus.
   * EN: Intercepts updates before saving to database to store the original value for attributes with bonuses.
   * @override
   */
  _preUpdate(changed, options, user) {
    super._preUpdate(changed, options, user);

    const bonuses = this.system?.bonusesCalculated;
    if (bonuses && (changed.system || Object.keys(changed).some(k => k.startsWith("system.")))) {
      for (const [attrPath, bonusInfo] of Object.entries(bonuses)) {
        if (!bonusInfo || !bonusInfo.bonus) continue;

        const fullPath = attrPath.startsWith("system.") ? attrPath : `system.${attrPath}`;
        if (foundry.utils.hasProperty(changed, fullPath)) {
          if (options.saveOriginal) continue;

          const submittedVal = foundry.utils.getProperty(changed, fullPath);
          if (typeof submittedVal === "number") {
            let originalVal = submittedVal;
            if (submittedVal === bonusInfo.total) {
              originalVal = bonusInfo.original;
            } else if (submittedVal >= bonusInfo.bonus) {
              originalVal = submittedVal - bonusInfo.bonus;
            }
            foundry.utils.setProperty(changed, fullPath, Math.max(0, originalVal));
          }
        }
      }
    }
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
    // Bônus de Parâmetros
    system.bonusesCalculated = prepareParameterBonuses(this);

    this._prepareCharacterData(system);

    // Exibe a estrutura completa do Ator/Personagem no console (F12)
    console.log(`Gaia: Prelúdio | Estrutura do Personagem [${this.name}]:`, this);
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
  /**
   * Sobrescreve a janela padrão de criação de Ator para o diálogo de Identificação.
   * @param {object} data - Dados iniciais
   * @param {object} options - Opções de criação
   * @returns {Promise<Actor|null>}
   */
  static async createDialog(data = {}, options = {}) {
    const { DialogV2 } = foundry.applications.api;

    const title = game.i18n.localize("GAIA.CreateActor.Title");
    const nameLabel = game.i18n.localize("GAIA.CreateActor.NameLabel");
    const namePlaceholder = game.i18n.localize("GAIA.CreateActor.NamePlaceholder");
    const typeLabel = game.i18n.localize("GAIA.CreateActor.TypeLabel");
    const typeLegacy = game.i18n.localize("GAIA.CreateActor.TypeLegacy");
    const typeCreature = game.i18n.localize("GAIA.CreateActor.TypeCreature");
    const typeNpc = game.i18n.localize("GAIA.CreateActor.TypeNpc");
    const defaultName = game.i18n.localize("GAIA.CreateActor.DefaultName");
    const submitLabel = game.i18n.localize("GAIA.CreateActor.Submit");

    // Diálogo focado exclusivamente na Identificação inicial do Personagem / Criatura
    const content = `
      <div class="gaia-dialog-create-actor">
        <div class="form-group">
          <label>${nameLabel}</label>
          <input type="text" name="name" placeholder="${namePlaceholder}" autofocus />
        </div>
        <div class="form-group">
          <label>${typeLabel}</label>
          <select name="type">
            <option value="legacy">${typeLegacy}</option>
            <option value="creature">${typeCreature}</option>
            <option value="legacyNpc">${typeNpc}</option>
          </select>
        </div>
      </div>
    `;

    const result = await DialogV2.prompt({
      classes: ["gaia-dialog", "gaia-dialog-create-actor"],
      window: { title },
      content,
      position: { width: "auto", height: "auto" },
      ok: {
        label: submitLabel,
        icon: "fa-solid fa-check",
        callback: (event, button, dialog) => {
          const form = button.form;
          return {
            name: form.elements.name?.value?.trim() || defaultName,
            type: form.elements.type?.value || "legacy"
          };
        }
      },
      rejectClose: false
    });

    if (!result) return null; // Usuário cancelou ou fechou a janela

    // Cria o Ator com os dados escolhidos na janela
    const actor = await this.create({
      name: result.name,
      type: result.type,
      ...data
    }, options);

    // Se for um personagem do tipo Legado, abre em seguida o Guia de Despertar Inicial
    if (result.type === "legacy") {
      promptAwakeningGuideDialog(actor);
    }

    return actor;
  }
}
