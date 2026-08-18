const { ActorSheetV2 } = foundry.applications.sheets;
const { HandlebarsApplicationMixin } = foundry.applications.api;
import { flowParameter, defense } from "../../../helpers/flow.mjs";

export class LegadoSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
  static DEFAULT_OPTIONS = {
    classes: ["gaia-preludio", "sheet", "actor"],
    position: { width: 1200, height: 900 },
    tag: "form",
    form: {
      submitOnChange: true,
      closeOnSubmit: false
    },
    actions: {
      setExhaustion: LegadoSheet.#onSetExhaustion,
      addResistance: LegadoSheet.#onAddResistance,
      removeResistance: LegadoSheet.#onRemoveResistance,
      addImmunity: LegadoSheet.#onAddImmunity,
      removeImmunity: LegadoSheet.#onRemoveImmunity,
      addReduction: LegadoSheet.#onAddReduction,
      removeReduction: LegadoSheet.#onRemoveReduction,
      setParameterPip: LegadoSheet.#onSetParameterPip,
      setKnowledgePip: LegadoSheet.#onSetKnowledgePip,
      addMastery: LegadoSheet.#onAddMastery,
      rollParameter: LegadoSheet.#onRollParameter,
      rollKnowledge: LegadoSheet.#onRollKnowledge,
      rollDefense: LegadoSheet.#onRollDefense,
      rollInitiative: LegadoSheet.#onRollInitiative,
      removeMastery: LegadoSheet.#onRemoveMastery
    }
  };

  static PARTS = {
    main: { template: "systems/gaia-preludio/templates/actor/legado.hbs" }
  };

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const system = this.actor.system;
    const maxExhaustion = 5;
    const maxParametersValue = 6;
    context.actor = this.actor;
    context.system = system;

    // Resgata o valor de agilidade dos parâmetros ou campo direto
    const agilityParam = system.parameters?.find(p => {
      const name = String(p.name || "").toLowerCase();
      return name === "agility" || name === "agilidade";
    });
    context.agilityValue = Number(agilityParam?.value ?? system.agility?.value ?? system.agility ?? 0);
    context.initiativeValue = context.agilityValue;

    // Prepara os 5 pips de exaustão
    const exhaustionLevel = Number(system.exhaustion) || 0;
    context.exhaustionPips = Array.from({ length: maxExhaustion }, (_, i) => ({
      value: i + 1,
      active: exhaustionLevel >= i + 1
    }));

    const buildPips = (val) => Array.from({ length: maxParametersValue }, (_, i) => ({
      value: i + 1,
      active: Number(val) >= i + 1
    }));

    // --- 1. PARÂMETROS (8 Parâmetros divididos em 2 colunas de 4) ---
    const paramMap = {};
    for (const p of system.parameters ?? []) {
      if (p.name) paramMap[String(p.name).toLowerCase()] = Number(p.value) || 0;
    }

    const paramCol1Keys = ["precision", "brutality", "dexterity", "agility"];
    const paramCol2Keys = ["channeling", "arcane", "spirit", "vigor"];

    const resolveParam = (key) => {
      const label = game.i18n.localize(CONFIG.GAIA.parameters[key] ?? key);
      const val = paramMap[key] ?? paramMap[label.toLowerCase()] ?? 0;
      return { key, label, value: val, pips: buildPips(val) };
    };

    context.parametersCol1 = paramCol1Keys.map(resolveParam);
    context.parametersCol2 = paramCol2Keys.map(resolveParam);

    // --- 2. CONHECIMENTOS (14 Conhecimentos divididos em 2 colunas de 7) ---
    const knowMap = {};
    for (const k of system.knowledge ?? []) {
      if (k.name) knowMap[String(k.name).toLowerCase()] = Number(k.value) || 0;
    }

    const knowCol1Keys = ["charisma", "mystic_knowledge", "exploration", "stealth", "history", "intimidation", "intuition"];
    const knowCol2Keys = ["medicine", "perception", "performance", "religion", "survival", "technology", "willpower"];

    const resolveKnowledge = (key) => {
      const label = game.i18n.localize(CONFIG.GAIA.knowledge[key] ?? key);
      const val = knowMap[key] ?? knowMap[label.toLowerCase()] ?? 0;
      return { key, label, value: val, pips: buildPips(val) };
    };

    context.knowledgeCol1 = knowCol1Keys.map(resolveKnowledge);
    context.knowledgeCol2 = knowCol2Keys.map(resolveKnowledge);

    // --- 3. MAESTRIAS ---
    context.unlockedMasteries = (system.masteries ?? []).map(masteryKey => {
      let label = masteryKey;
      for (const mObj of Object.values(CONFIG.GAIA.masteries ?? {})) {
        if (mObj[masteryKey]) {
          label = game.i18n.localize(mObj[masteryKey]);
          break;
        }
      }
      return { key: masteryKey, label };
    });

    return context;
  }

  /**
   * Manipula o clique em um diamante de exaustão.
   */
  static async #onSetExhaustion(event, target) {
    const value = Number(target.dataset.value);
    const current = Number(this.actor.system.exhaustion) || 0;
    const next = current === value ? value - 1 : value;
    await this.actor.update({ "system.exhaustion": Math.max(0, next) });
  }

  /**
   * Define o nível de um Parâmetro (1 a 6).
   */
  static async #onSetParameterPip(event, target) {
    const paramKey = String(target.dataset.param || "").toLowerCase();
    const value = Number(target.dataset.value);
    const list = [...(this.actor.system.parameters ?? [])];

    let entry = list.find(p => String(p.name || "").toLowerCase() === paramKey);
    if (!entry) {
      entry = { name: paramKey, value: 0 };
      list.push(entry);
    }

    entry.value = entry.value === value ? value - 1 : value;
    await this.actor.update({ "system.parameters": list });
  }

  /**
   * Define o nível de um Conhecimento (0 a 6).
   */
  static async #onSetKnowledgePip(event, target) {
    const knowKey = String(target.dataset.knowledge || "").toLowerCase();
    const value = Number(target.dataset.value);
    const list = [...(this.actor.system.knowledge ?? [])];

    let entry = list.find(k => String(k.name || "").toLowerCase() === knowKey);
    if (!entry) {
      entry = { name: knowKey, value: 0 };
      list.push(entry);
    }

    entry.value = entry.value === value ? value - 1 : value;
    await this.actor.update({ "system.knowledge": list });
  }

  /**
   * Abre diálogo para adicionar uma nova maestria ou adiciona diretamente.
   */
  static async #onAddMastery(event, target) {
    // Opções de maestrias disponíveis em CONFIG.GAIA.masteries
    const currentMasteries = new Set(this.actor.system.masteries ?? []);
    let optionsHtml = "";

    for (const [kKey, mObj] of Object.entries(CONFIG.GAIA.masteries ?? {})) {
      const kLabel = game.i18n.localize(CONFIG.GAIA.knowledge[kKey] ?? kKey);
      optionsHtml += `<optgroup label="${kLabel}">`;
      for (const [mKey, locString] of Object.entries(mObj)) {
        if (!currentMasteries.has(mKey)) {
          const mLabel = game.i18n.localize(locString);
          optionsHtml += `<option value="${mKey}">${mLabel}</option>`;
        }
      }
      optionsHtml += `</optgroup>`;
    }

    new Dialog({
      title: "Adicionar Maestria",
      content: `
        <div style="margin-bottom: 10px;">
          <label style="display:block; margin-bottom: 4px; font-weight: bold;">Selecione a Maestria:</label>
          <select id="gaia-mastery-select" style="width: 100%;">
            ${optionsHtml}
          </select>
        </div>
      `,
      buttons: {
        add: {
          icon: '<i class="fas fa-check"></i>',
          label: "Adicionar",
          callback: async (html) => {
            const selected = html.find("#gaia-mastery-select").val();
            if (selected) {
              const list = [...(this.actor.system.masteries ?? [])];
              if (!list.includes(selected)) {
                list.push(selected);
                await this.actor.update({ "system.masteries": list });
              }
            }
          }
        },
        cancel: {
          icon: '<i class="fas fa-times"></i>',
          label: "Cancelar"
        }
      },
      default: "add"
    }).render(true);
  }

  /**
   * Remove uma maestria da lista.
   */
  static async #onRemoveMastery(event, target) {
    const index = Number(target.dataset.index);
    const list = [...(this.actor.system.masteries ?? [])];
    list.splice(index, 1);
    await this.actor.update({ "system.masteries": list });
  }

  /**
   * Adiciona uma nova resistência a dano.
   */
  static async #onAddResistance(event, target) {
    const list = [...(this.actor.system.damageResistance ?? [])];
    list.push({ type: "" });
    await this.actor.update({ "system.damageResistance": list });
  }

  /**
   * Remove uma resistência a dano.
   */
  static async #onRemoveResistance(event, target) {
    const index = Number(target.dataset.index);
    const list = [...(this.actor.system.damageResistance ?? [])];
    list.splice(index, 1);
    await this.actor.update({ "system.damageResistance": list });
  }

  /**
   * Adiciona uma nova imunidade a dano.
   */
  static async #onAddImmunity(event, target) {
    const list = [...(this.actor.system.damageImmunity ?? [])];
    list.push({ type: "" });
    await this.actor.update({ "system.damageImmunity": list });
  }

  /**
   * Remove uma imunidade a dano.
   */
  static async #onRemoveImmunity(event, target) {
    const index = Number(target.dataset.index);
    const list = [...(this.actor.system.damageImmunity ?? [])];
    list.splice(index, 1);
    await this.actor.update({ "system.damageImmunity": list });
  }

  /**
   * Adiciona uma nova redução de dano.
   */
  static async #onAddReduction(event, target) {
    const list = [...(this.actor.system.damageReduction ?? [])];
    list.push({ type: "", value: 1 });
    await this.actor.update({ "system.damageReduction": list });
  }

  /**
   * Remove uma redução de dano.
   */
  static async #onRemoveReduction(event, target) {
    const index = Number(target.dataset.index);
    const list = [...(this.actor.system.damageReduction ?? [])];
    list.splice(index, 1);
    await this.actor.update({ "system.damageReduction": list });
  }
  /**
   * Função genérica para rolar qualquer atributo (Parâmetro ou Conhecimento) utilizando flowParameter.
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   * @param {"parameters"|"knowledge"} type - Nome da lista de dados no actor.system e grupo no CONFIG.GAIA
   * @param {string} categoryLabel - Rótulo exibido no cabeçalho do chat (ex: "Parâmetro", "Conhecimento")
   */
  async _rollStat(event, target, type, categoryLabel) {
    const key = String(target.dataset.key || "").toLowerCase();
    const list = this.actor.system[type] ?? [];

    // 1. Localiza a entrada na lista do ator ou assume fallback com valor 0
    const entry = list.find(item => String(item.name || "").toLowerCase() === key);
    const value = Number(entry?.value) || 0;
    const statObj = { value };

    // 2. Define o tipo de rolagem (standard, ou vantagem/desvantagem com Shift/Alt/Ctrl)
    let fitness = "standard";
    if (event.shiftKey) fitness = "advantage";
    if (event.altKey || event.ctrlKey) fitness = "disadvantage";

    // 3. Obtém o nome traduzido do atributo e do tipo de rolagem
    const configGroup = CONFIG.GAIA[type] ?? {};
    const label = game.i18n.localize(configGroup[key] ?? key);
    const fitnessLabel = game.i18n.localize(CONFIG.GAIA.rollTypes[fitness]?.label ?? fitness);

    // 4. Executa a rolagem assíncrona
    const roll = await flowParameter(statObj, fitness);

    // 5. Exibe a rolagem formatada no chat do Foundry VTT
    await roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      flavor: `<strong>Teste de ${categoryLabel}:</strong> ${label} (${fitnessLabel})`
    });

    return roll;
  }

  /**
   * Executa a rolagem de um Parâmetro.
   */
  static async #onRollParameter(event, target) {
    return await this._rollStat(event, target, "parameters", "Parâmetro");
  }

  /**
   * Executa a rolagem de um Conhecimento.
   */
  static async #onRollKnowledge(event, target) {
    return await this._rollStat(event, target, "knowledge", "Conhecimento");
  }

  /**
   * Executa a rolagem de Defesa (Bloqueio ou Agilidade) utilizando a função defense.
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async #onRollDefense(event, target) {
    const defenseType = String(target.dataset.type || "block").toLowerCase();

    // 1. Define aptidão por modificador de teclado
    let fitness = "standard";
    if (event.shiftKey) fitness = "advantage";
    if (event.altKey || event.ctrlKey) fitness = "disadvantage";

    // 2. Executa a rolagem de defesa
    const roll = await defense(defenseType, this.actor, fitness);

    // 3. Rótulos traduzidos
    const label = defenseType === "agility" ? "Defesa de Agilidade" : "Defesa de Bloqueio";
    const fitnessLabel = game.i18n.localize(CONFIG.GAIA.rollTypes[fitness]?.label ?? fitness);

    // 4. Envia para o chat do Foundry
    await roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      flavor: `${label} (${fitnessLabel})`
    });

    return roll;
  }

  /**
   * Executa a rolagem de Iniciativa (baseada em Agilidade) utilizando flowParameter.
   * Atualiza o combatente no Combat Tracker caso o ator esteja em combate ativo.
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async #onRollInitiative(event, target) {
    // 1. Define aptidão por modificador de teclado
    let fitness = "standard";
    if (event.shiftKey) fitness = "advantage";
    if (event.altKey || event.ctrlKey) fitness = "disadvantage";

    // 2. Resgata valor de agilidade do ator
    const agilityParam = this.actor.system?.parameters?.find(p => {
      const name = String(p.name || "").toLowerCase();
      return name === "agility" || name === "agilidade";
    });
    const agilityVal = Number(agilityParam?.value ?? this.actor.system?.agility?.value ?? this.actor.system?.agility ?? 0);

    // 3. Executa a rolagem
    const roll = await flowParameter({ value: agilityVal }, fitness);
    const fitnessLabel = game.i18n.localize(CONFIG.GAIA.rollTypes[fitness]?.label ?? fitness);

    // 4. Envia mensagem para o chat
    await roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      flavor: `<strong>Teste de Iniciativa</strong> (${fitnessLabel})`
    });

    // 5. Se o ator estiver no combate ativo do Foundry, atualiza o valor da iniciativa
    if (game.combat) {
      const combatant = game.combat.combatants.find(c => c.actorId === this.actor.id);
      if (combatant) {
        await game.combat.setInitiative(combatant.id, roll.total);
      }
    }

    return roll;
  }
}