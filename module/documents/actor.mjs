/**
 * ==============================================================================
 * GAIA ACTOR DOCUMENT / DOCUMENTO DE ATOR GAIA
 * ==============================================================================
 * PT: Extensão da classe base Actor para o sistema Gaia: Prelúdio.
 * EN: Extension of the base Actor class for the Gaia: Prelúdio system.
 *
 * @extends {Actor}
 */
import { prepareParameterBonuses, calculateEquipmentBlockBonus } from "../helpers/actor-context.mjs";
import { promptAwakeningGuideDialog, promptCreatureWizardDialog, promptLegacyNpcWizardDialog } from "../helpers/dialogs.mjs";

export class GaiaActor extends Actor {

  /**
   * PT: Executado antes da criação do documento para definir vínculos e padrões do protótipo de token.
   * EN: Executed before document creation to set prototype token links and defaults.
   * @override
   */
  async _preCreate(data, options, user) {
    await super._preCreate(data, options, user);

    // PT: Para Personagens (Legado), vincula a ficha ao token por padrão e ativa visão com o alcance calculado
    // EN: For Characters (Legacy), link token to actor by default and enable vision with calculated range
    if (this.type === "legacy") {
      const visionRange = this.system?.visionTotal ?? 40;
      const prototypeToken = {
        actorLink: true,
        disposition: CONST.TOKEN_DISPOSITIONS.FRIENDLY,
        sight: {
          enabled: true,
          range: visionRange
        }
      };
      this.updateSource({ prototypeToken });
    }
  }

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

    // PT: Limpa Sentenças, Dádivas e Estabilização ao recuperar PV (> 0)
    // EN: Clears Sentences, Gifts, and Stabilization upon recovering HP (> 0)
    const oldHp = Number(this.system?.health?.value ?? 0);
    const newHp = foundry.utils.getProperty(changed, "system.health.value");
    if (typeof newHp === "number") {
      if (newHp > 0) {
        foundry.utils.setProperty(changed, "system.death.sentences", 0);
        foundry.utils.setProperty(changed, "system.death.gifts", 0);
        foundry.utils.setProperty(changed, "system.death.stabilized", false);
      } else if (newHp <= 0 && oldHp > 0 && !this.system?.isIncapacitated) {
        // PT: Ao ficar Incapacitado, ganha 1 ponto de Exaustão e zera PV Temporário
        // EN: Upon becoming Incapacitated, gain 1 point of Exhaustion and zero Temp HP
        const currentExh = Number(this.system?.exhaustion ?? 0);
        foundry.utils.setProperty(changed, "system.exhaustion", Math.min(6, currentExh + 1));
        foundry.utils.setProperty(changed, "system.health.temp", 0);
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

    // PT: Sanitiza e normaliza pontos de Exaustão (0 a 6)
    // EN: Sanitizes and normalizes Exhaustion points (0 to 6)
    system.exhaustion = Math.clamp(Number(system.exhaustion) || 0, 0, 6);
    system.isDeadByExhaustion = system.exhaustion >= 6;
    system.exhaustionPenalty = system.exhaustion;

    // PT: Estado de Incapacitado e Dado de Morte (Sentenças do Corruptor & Dádivas do Artesão)
    // EN: Incapacitated state and Death Die (Corruption Sentences & Artisan Gifts)
    const hp = Number(system.health?.value ?? 0);
    const hasIncapacitatedCondition = this.effects?.some(e => 
      String(e.name || "").toLowerCase() === "incapacitado" || 
      e.statuses?.has?.("incapacitado") || 
      (Array.isArray(e.statuses) && e.statuses.includes("incapacitado"))
    );
    system.isIncapacitated = hp <= 0 || Boolean(hasIncapacitatedCondition);
    system.isDeadByDeathDie = Number(system.death?.sentences ?? 0) >= 2;
    system.isStabilized = Boolean(system.death?.stabilized);
    system.needsDeathDie = system.isIncapacitated && !system.isStabilized && !system.isDeadByDeathDie && !system.isDeadByExhaustion;

    if (system.isIncapacitated) {
      if (system.health) system.health.temp = 0; // Perde Pontos de Vida Temporários
    }

    // Bônus de Parâmetros
    system.bonusesCalculated = prepareParameterBonuses(this);

    // Bônus de Bloqueio por Equipamentos/Armaduras Equipadas
    const equipmentBlockBonus = calculateEquipmentBlockBonus(this);
    system.equipmentBlockBonus = equipmentBlockBonus;
    system.totalBlock = (Number(system.block) || 0) + equipmentBlockBonus;

    // PT: Condições Especiais: Atordoado, Enfraquecido, Lentidão, Caído, Envenenado, Fratura, Imóvel, Sangramento
    // EN: Special Conditions: Stunned, Weakened, Slowed, Prone, Poisoned, Fracture, Immobilized, Bleeding
    const hasStunned = Boolean(
      this.statuses?.has?.("atordoado") || 
      this.statuses?.has?.("stunned") || 
      this.effects?.some(e => {
        const n = String(e.name || "").toLowerCase();
        return n === "atordoado" || n === "stunned";
      })
    );
    const hasWeakened = Boolean(
      this.statuses?.has?.("enfraquecido") || 
      this.statuses?.has?.("weakened") || 
      this.effects?.some(e => {
        const n = String(e.name || "").toLowerCase();
        return n === "enfraquecido" || n === "weakened";
      })
    );
    const hasSlowed = Boolean(
      this.statuses?.has?.("lentidao") || 
      this.statuses?.has?.("lentidão") || 
      this.statuses?.has?.("slowed") || 
      this.effects?.some(e => {
        const n = String(e.name || "").toLowerCase();
        return n === "lentidão" || n === "lentidao" || n === "slowed";
      })
    );
    const hasProne = Boolean(
      this.statuses?.has?.("caido") || 
      this.statuses?.has?.("caído") || 
      this.statuses?.has?.("prone") || 
      this.effects?.some(e => {
        const n = String(e.name || "").toLowerCase();
        return n === "caído" || n === "caido" || n === "prone";
      })
    );
    const hasPoisoned = Boolean(
      this.statuses?.has?.("envenenado") || 
      this.statuses?.has?.("poisoned") || 
      this.effects?.some(e => {
        const n = String(e.name || "").toLowerCase();
        return n === "envenenado" || n === "poisoned";
      })
    );
    const hasImmobilized = Boolean(
      this.statuses?.has?.("imovel") || 
      this.statuses?.has?.("imóvel") || 
      this.statuses?.has?.("immobilized") || 
      this.effects?.some(e => {
        const n = String(e.name || "").toLowerCase();
        return n === "imóvel" || n === "imovel" || n === "immobilized";
      })
    );
    const hasBleeding = Boolean(
      this.statuses?.has?.("sangramento") || 
      this.statuses?.has?.("bleeding") || 
      this.effects?.some(e => {
        const n = String(e.name || "").toLowerCase();
        return n === "sangramento" || n === "bleeding";
      })
    );

    // Contagem de Fraturas (Fratura: a cada 2 pontos, todos os Parâmetros são reduzidos em 1)
    const fractureEffect = this.effects?.find(e => {
      const n = String(e.name || "").toLowerCase();
      return n.includes("fratura") || n.includes("fracture");
    });
    const fracturePoints = Number(
      this.system?.fractures ?? 
      this.system?.fraturas ?? 
      this.system?.fracture ?? 
      fractureEffect?.flags?.gaia?.points ?? 
      0
    );
    const fracturePenalty = Math.floor(fracturePoints / 2);

    system.hasStunned = hasStunned;
    system.hasWeakened = hasWeakened;
    system.hasSlowed = hasSlowed;
    system.hasProne = hasProne;
    system.hasPoisoned = hasPoisoned;
    system.hasImmobilized = hasImmobilized;
    system.hasBleeding = hasBleeding;
    system.fractures = fracturePoints;
    system.fracturePenalty = fracturePenalty;

    // Se tiver penalidade de Fratura, aplica redução nos Parâmetros
    if (fracturePenalty > 0 && Array.isArray(system.parameters)) {
      for (const p of system.parameters) {
        if (typeof p.value === "number") {
          p.value = Math.max(0, p.value - fracturePenalty);
        }
      }
    }

    // PT: Movimentação Total (Deslocamento base; 0 se Incapacitado ou Imóvel; reduzida pela metade sob Lentidão)
    // EN: Total Movement (Base speed; 0 if Incapacitated or Immobilized; halved under Slowed)
    const baseMovement = Number(system.movement) || 0;
    let totalMovement = Math.max(0, baseMovement - system.exhaustion);
    if (system.isIncapacitated || hasImmobilized) {
      totalMovement = 0;
    } else if (hasSlowed) {
      totalMovement = Math.floor(totalMovement / 2);
    }
    system.totalMovement = totalMovement;

    // PT: Efeitos de Visão e Ambiente (Penumbra e Escuridão)
    // EN: Vision and Environmental Effects (Dim Light/Penumbra and Darkness)
    const hasPenumbra = Boolean(
      this.statuses?.has?.("penumbra") || 
      this.effects?.some(e => String(e.name || "").toLowerCase() === "penumbra")
    );
    const hasDarkness = Boolean(
      this.statuses?.has?.("escuridao") || 
      this.statuses?.has?.("darkness") || 
      this.effects?.some(e => {
        const n = String(e.name || "").toLowerCase();
        return n === "escuridão" || n === "escuridao" || n === "darkness";
      })
    );

    system.hasPenumbra = hasPenumbra;
    system.hasDarkness = hasDarkness;

    // PT: Alcance da Visão (Base 40m + 10m por ponto de Percepção; Penumbra limita a 10m; Escuridão limita a 4m)
    // EN: Vision Range (Base 40m + 10m per Perception point; Penumbra caps at 10m; Darkness caps at 4m)
    let perceptionScore = 0;
    if (Array.isArray(system.knowledge)) {
      const percEntry = system.knowledge.find(k => {
        const n = String(k.name || k.key || "").toLowerCase();
        return n === "perception" || n === "percepção";
      });
      perceptionScore = Number(percEntry?.value ?? 0);
    } else if (system.knowledge && typeof system.knowledge === "object") {
      perceptionScore = Number(system.knowledge.perception?.value ?? system.knowledge.perception ?? 0);
    } else if (system.perception !== undefined) {
      perceptionScore = Number(system.perception?.value ?? system.perception ?? 0);
    }

    let visionTotal = Math.max(0, 40 + (10 * perceptionScore));
    if (hasDarkness) {
      visionTotal = Math.min(visionTotal, 4);
    } else if (hasPenumbra) {
      visionTotal = Math.min(visionTotal, 10);
    }

    const visionPrecise = visionTotal / 2;
    const maxActionRange = hasDarkness ? 4 : (hasPenumbra ? 10 : null);
    system.maxActionRange = maxActionRange;

    system.vision = {
      base: 40,
      perception: perceptionScore,
      perceptionBonus: 10 * perceptionScore,
      total: visionTotal,
      precise: visionPrecise,
      hasPenumbra,
      hasDarkness,
      maxActionRange
    };
    system.visionTotal = visionTotal;
    system.visionPrecise = visionPrecise;

    // PT: Ajuste da Percepção Passiva (Penumbra: -1 | Escuridão: metade)
    // EN: Passive Perception Adjustment (Penumbra: -1 | Darkness: halved)
    if (system.passivePerception !== undefined) {
      const rawPassive = Number(system.passivePerception) || 0;
      if (hasDarkness) {
        system.passivePerception = Math.floor(rawPassive / 2);
      } else if (hasPenumbra) {
        system.passivePerception = Math.max(0, rawPassive - 1);
      }
    }

    // PT: Sincroniza o alcance da visão no protótipo de token do ator e no token da cena
    // EN: Synchronizes vision range in actor's prototype token and active scene token
    if (this.prototypeToken?.sight?.enabled) {
      this.prototypeToken.sight.range = visionTotal;
    }
    if (this.token?.sight?.enabled) {
      this.token.sight.range = visionTotal;
    }

    this._prepareCharacterData(system);

  }

  /**
   * PT: Sanitiza e valida limites de recursos básicos do personagem (vida, energia, exaustão).
   * EN: Sanitizes and validates basic character resource limits (health, energy, exhaustion).
   * @param {any} system - PT: Objeto de dados do sistema / EN: System data object.
   * @protected
   */
  _prepareCharacterData(system) {
    if (!system) return;

    if (system.health && typeof system.health.value === "number") {
      system.health.value = Math.clamp(system.health.value, 0, system.health.max ?? 0);
    }
    if (system.health && typeof system.health.temp === "number") {
      system.health.temp = Math.max(0, system.health.temp);
    }
    if (system.energy && typeof system.energy.value === "number") {
      system.energy.value = Math.clamp(system.energy.value, 0, system.energy.max ?? 0);
    }
    if (system.energy && typeof system.energy.temp === "number") {
      system.energy.temp = Math.max(0, system.energy.temp);
    }
    if (typeof system.exhaustion === "number") {
      system.exhaustion = Math.clamp(system.exhaustion, 0, 6);
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

    // Triggers standard creation wizard dialogs depending on actor type
    if (result.type === "legacy") {
      promptAwakeningGuideDialog(actor);
    } else if (result.type === "creature") {
      promptCreatureWizardDialog(actor);
    } else if (result.type === "legacyNpc") {
      promptLegacyNpcWizardDialog(actor);
    }

    return actor;
  }
}
