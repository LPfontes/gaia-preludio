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
import { promptAwakeningGuideDialog, promptCreatureWizardDialog, promptLegacyNpcWizardDialog } from "../helpers/dialogs/index.mjs";
import { calculateHomunculusStats, calculateLegacyNpcStats } from "../helpers/flow.mjs";
import { getBookFolderForFeature, ensureHomunculariumAttacks, syncHomunculariumAttackFormulas } from "../helpers/homuncularium-rules.mjs";

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
  /**
   * Indica se o ator possui a habilidade Fortitude Ampliada (Anão, item ou efeito ativo).
   * @type {boolean}
   */
  get hasFortitudeAmpliada() {
    // 1. Efeitos ativos
    if (this.effects?.some(e => !e.disabled && (String(e.name || "").toLowerCase().includes("fortitude ampliada") || (e.changes || []).some(c => c.key === "system.hpDie" && c.value === "1d8")))) {
      return true;
    }
    // 2. Itens do ator (habilidade)
    if (this.items?.some(i => String(i.name || "").toLowerCase().includes("fortitude ampliada"))) {
      return true;
    }
    // 3. Legado do ator (Anão / Anao)
    const leg = String(this.system?.legacy || "").toLowerCase();
    if (leg.includes("anão") || leg.includes("anao")) {
      return true;
    }
    // 4. Lista de habilidades de legado
    const legacyAbilities = this.system?.legacyAbilities || this.items?.find(i => i.type === "legacy")?.system?.legacyAbilities;
    if (Array.isArray(legacyAbilities) && legacyAbilities.some(a => String(a.name || "").toLowerCase().includes("fortitude ampliada"))) {
      return true;
    }
    return false;
  }

  /**
   * Dado de PV utilizado na criação e em Níveis de Despertar (1d8 para Fortitude Ampliada, senão 1d6).
   * @type {string}
   */
  get hpDie() {
    return this.hasFortitudeAmpliada ? "1d8" : "1d6";
  }

  /**
   * Valor fixo de PV por nível (4 para Fortitude Ampliada, senão 3).
   * @type {number}
   */
  get fixedHp() {
    return this.hasFortitudeAmpliada ? 4 : 3;
  }

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

    // PT: Recalcula automaticamente os stats de Criatura do Homuncularium ao alterar Nível ou Dificuldade,
    // preservando e aceitando alterações manuais feitas na ficha.
    // EN: Automatically recalculates Homuncularium creature stats when Level or Difficulty changes,
    // while preserving and accepting manual edits made on the sheet.
    if (
      !options.skipHomunculumRecalc &&
      (this.type === "creature" || this.type === "legacyNpc")
    ) {
      const hasNivelProp = foundry.utils.hasProperty(changed, "system.nivel");
      const hasDiffProp = foundry.utils.hasProperty(changed, "system.difficulty");

      const oldLevel = Number(this.system?.nivel ?? 0);
      const newLevel = hasNivelProp ? Number(foundry.utils.getProperty(changed, "system.nivel")) : oldLevel;

      const oldDifficulty = String(this.system?.difficulty ?? "").trim();
      const rawNewDifficulty = hasDiffProp ? String(foundry.utils.getProperty(changed, "system.difficulty")).trim() : oldDifficulty;

      const effOldDifficulty = oldDifficulty || "Normal";
      const effNewDifficulty = rawNewDifficulty || oldDifficulty || "Normal";

      const levelChanged = hasNivelProp && !isNaN(newLevel) && newLevel !== oldLevel;
      const difficultyChanged = hasDiffProp && rawNewDifficulty !== oldDifficulty;

      // Identifica se os campos foram deliberadamente alterados pelo usuário nesta mesma operação
      // (evita falso-positivo de campos enviados pelo formulário com o mesmo valor atual)
      const currentHpMax = Number(this.system?.health?.max ?? 0);
      const hasHpMaxProp = foundry.utils.hasProperty(changed, "system.health.max");
      const submittedHpMax = hasHpMaxProp ? Number(foundry.utils.getProperty(changed, "system.health.max")) : null;
      const isHpMaxManualEdit = hasHpMaxProp && !isNaN(submittedHpMax) && submittedHpMax !== currentHpMax;

      const currentHpVal = Number(this.system?.health?.value ?? 0);
      const hasHpValProp = foundry.utils.hasProperty(changed, "system.health.value");
      const submittedHpVal = hasHpValProp ? Number(foundry.utils.getProperty(changed, "system.health.value")) : null;
      const isHpValManualEdit = hasHpValProp && !isNaN(submittedHpVal) && submittedHpVal !== currentHpVal;

      const currentEnergyMax = Number(this.system?.energy?.max ?? 0);
      const hasEnergyMaxProp = foundry.utils.hasProperty(changed, "system.energy.max");
      const submittedEnergyMax = hasEnergyMaxProp ? Number(foundry.utils.getProperty(changed, "system.energy.max")) : null;
      const isEnergyMaxManualEdit = hasEnergyMaxProp && !isNaN(submittedEnergyMax) && submittedEnergyMax !== currentEnergyMax;

      const currentEnergyVal = Number(this.system?.energy?.value ?? 0);
      const hasEnergyValProp = foundry.utils.hasProperty(changed, "system.energy.value");
      const submittedEnergyVal = hasEnergyValProp ? Number(foundry.utils.getProperty(changed, "system.energy.value")) : null;
      const isEnergyValManualEdit = hasEnergyValProp && !isNaN(submittedEnergyVal) && submittedEnergyVal !== currentEnergyVal;

      const currentPower = Number(this.system?.powerPoints ?? 0);
      const hasPowerProp = foundry.utils.hasProperty(changed, "system.powerPoints");
      const submittedPower = hasPowerProp ? Number(foundry.utils.getProperty(changed, "system.powerPoints")) : null;
      const isPowerManualEdit = hasPowerProp && !isNaN(submittedPower) && submittedPower !== currentPower;

      // Executa o recálculo se o Nível ou a Dificuldade realmente mudaram
      if (levelChanged || difficultyChanged) {
        const isLegacyNpc = this.type === "legacyNpc";
        const calcFunc = isLegacyNpc ? calculateLegacyNpcStats : calculateHomunculusStats;

        const statsOld = calcFunc(effOldDifficulty, oldLevel);
        const statsNew = calcFunc(effNewDifficulty, newLevel);

        if (statsNew) {
          // 1. Pontos de Vida Máximos (health.max)
          if (!isHpMaxManualEdit) {
            let newHpMax;
            if (statsOld && currentHpMax > 0) {
              const deltaHp = statsNew.health - statsOld.health;
              newHpMax = Math.max(1, currentHpMax + deltaHp);
            } else {
              newHpMax = statsNew.health;
            }
            foundry.utils.setProperty(changed, "system.health.max", newHpMax);

            // Ajusta o PV atual caso não tenha sido editado manualmente
            if (!isHpValManualEdit) {
              if (currentHpVal >= currentHpMax || currentHpVal === 0) {
                foundry.utils.setProperty(changed, "system.health.value", newHpMax);
              } else {
                const deltaHp = statsNew.health - (statsOld?.health ?? statsNew.health);
                if (deltaHp > 0) {
                  foundry.utils.setProperty(changed, "system.health.value", currentHpVal + deltaHp);
                } else if (deltaHp < 0) {
                  foundry.utils.setProperty(changed, "system.health.value", Math.min(newHpMax, currentHpVal));
                }
              }
            }
          }

          // 2. Pontos de Energia Máximos (energy.max)
          if (!isEnergyMaxManualEdit) {
            let newEnergyMax;
            if (statsOld && currentEnergyMax > 0) {
              const deltaEnergy = statsNew.energy - statsOld.energy;
              newEnergyMax = Math.max(0, currentEnergyMax + deltaEnergy);
            } else {
              newEnergyMax = statsNew.energy;
            }
            foundry.utils.setProperty(changed, "system.energy.max", newEnergyMax);

            // Ajusta a Energia atual caso não tenha sido editada manualmente
            if (!isEnergyValManualEdit) {
              if (currentEnergyVal >= currentEnergyMax || currentEnergyVal === 0) {
                foundry.utils.setProperty(changed, "system.energy.value", newEnergyMax);
              } else {
                const deltaEnergy = statsNew.energy - (statsOld?.energy ?? statsNew.energy);
                if (deltaEnergy > 0) {
                  foundry.utils.setProperty(changed, "system.energy.value", currentEnergyVal + deltaEnergy);
                } else if (deltaEnergy < 0) {
                  foundry.utils.setProperty(changed, "system.energy.value", Math.min(newEnergyMax, currentEnergyVal));
                }
              }
            }
          }

          // 3. Pontos de Poder (powerPoints)
          if (!isPowerManualEdit) {
            let newPower;
            if (statsOld && currentPower > 0) {
              const deltaPower = statsNew.powerPoints - statsOld.powerPoints;
              newPower = Math.max(0, currentPower + deltaPower);
            } else {
              newPower = statsNew.powerPoints;
            }
            foundry.utils.setProperty(changed, "system.powerPoints", newPower);
          }

          // 4. Notificação de novos pontos de Parâmetros
          if (statsOld && levelChanged) {
            const deltaParams = statsNew.parameters - statsOld.parameters;
            if (deltaParams > 0) {
              ui?.notifications?.info(
                `Criatura subiu para o Nível ${newLevel} e ganhou +${deltaParams} ponto(s) de Parâmetros. Distribua manualmente entre Ofensivos e Defensivos na ficha.`
              );
            }
          }
        }
      }
    }

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
        foundry.utils.setProperty(changed, "system.health.temp", 0);
      }
    }

    // PT: Registra o delta de PV e PV Temporário para números flutuantes no canvas (Scrolling Text)
    const hasHpChange = foundry.utils.hasProperty(changed, "system.health.value");
    const hasTempChange = foundry.utils.hasProperty(changed, "system.health.temp");
    if (hasHpChange || hasTempChange) {
      const oldHpVal = Number(this.system?.health?.value ?? 0);
      const newHpVal = hasHpChange ? Number(foundry.utils.getProperty(changed, "system.health.value")) : oldHpVal;
      const oldTempVal = Number(this.system?.health?.temp ?? 0);
      const newTempVal = hasTempChange ? Number(foundry.utils.getProperty(changed, "system.health.temp")) : oldTempVal;

      options.gaiaHealthDelta = {
        hpDiff: newHpVal - oldHpVal,
        tempDiff: newTempVal - oldTempVal
      };
    }
  }

  /**
   * PT: Chamado após uma atualização ser processada pelo servidor.
   * Exibe números flutuantes (scrolling text) para dano ou cura e processa gatilhos de sistema.
   * @override
   */
  _onUpdate(changed, options, userId) {
    super._onUpdate(changed, options, userId);

    if (options.gaiaHealthDelta) {
      this._showScrollingHealthText(options.gaiaHealthDelta);
    }

    if (game.user.id === userId && (this.type === "creature" || this.type === "legacyNpc")) {
      const hasHomunculumStatChange =
        foundry.utils.hasProperty(changed, "system.nivel") ||
        foundry.utils.hasProperty(changed, "system.difficulty") ||
        foundry.utils.hasProperty(changed, "system.powerPoints");

      if (hasHomunculumStatChange) {
        ensureHomunculariumAttacks(this).then(() => {
          syncHomunculariumAttackFormulas(this);
        }).catch(console.error);
      }
    }
  }

  /**
   * PT: Exibe números flutuantes de dano e cura sobre os tokens vinculados no canvas.
   * @param {{ hpDiff?: number, tempDiff?: number }} delta
   * @protected
   */
  _showScrollingHealthText({ hpDiff = 0, tempDiff = 0 } = {}) {
    if (!canvas?.ready || !canvas.interface) return;
    const tokens = this.getActiveTokens();
    if (!tokens.length) return;

    for (const token of tokens) {
      if (!token.visible) continue;

      // 1. Dano (-) ou Cura (+) de Vida
      if (hpDiff !== 0) {
        const isDamage = hpDiff < 0;
        const text = isDamage ? `${hpDiff}` : `+${hpDiff}`;
        // Dano em vermelho escarlate, Cura em verde esmeralda
        const color = isDamage ? 0xef4444 : 0x22c55e;

        canvas.interface.createScrollingText(token.center, text, {
          anchor: isDamage ? (CONST.TEXT_ANCHOR_POINTS?.TOP ?? 2) : (CONST.TEXT_ANCHOR_POINTS?.BOTTOM ?? 1),
          direction: isDamage ? (CONST.TEXT_SCROLL_DIRECTIONS?.DOWN ?? 2) : (CONST.TEXT_SCROLL_DIRECTIONS?.UP ?? 1),
          duration: 2000,
          fontSize: 28,
          stroke: 0x000000,
          strokeThickness: 4,
          jitter: 0.25,
          fill: color
        });
      }

      // 2. Ganho ou Perda de PV Temporário
      if (tempDiff !== 0) {
        const isLoss = tempDiff < 0;
        const text = isLoss ? `${tempDiff} Temp` : `+${tempDiff} Temp`;
        // Laranja para perda de PV temp, Azul ciano para ganho de PV temp
        const color = isLoss ? 0xf97316 : 0x38bdf8;

        canvas.interface.createScrollingText(token.center, text, {
          anchor: CONST.TEXT_ANCHOR_POINTS?.CENTER ?? 0,
          direction: isLoss ? (CONST.TEXT_SCROLL_DIRECTIONS?.DOWN ?? 2) : (CONST.TEXT_SCROLL_DIRECTIONS?.UP ?? 1),
          duration: 2000,
          fontSize: 22,
          stroke: 0x000000,
          strokeThickness: 4,
          jitter: 0.25,
          fill: color
        });
      }
    }
  }

  /**
   * PT: Chamado após documentos embutidos serem criados neste ator.
   * EN: Called after embedded documents are created in this actor.
   * @override
   */
  _onCreateDescendantDocuments(parent, collection, documents, data, options, userId) {
    super._onCreateDescendantDocuments(parent, collection, documents, data, options, userId);

    if (game.user.id === userId && collection === "items" && (this.type === "creature" || this.type === "legacyNpc")) {
      const hasHomunculumItemAdded = documents.some(
        doc => (doc.type === "feature" || doc.type === "ability") && getBookFolderForFeature(doc) !== null
      );
      if (hasHomunculumItemAdded) {
        ensureHomunculariumAttacks(this);
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

    // Automação de Fortitude Ampliada (Anão / 1d8 de PV ou 4 fixo)
    system.hasFortitudeAmpliada = this.hasFortitudeAmpliada;
    system.hpDie = this.hpDie;
    system.fixedHp = this.fixedHp;

    // Bônus de Parâmetros
    system.bonusesCalculated = prepareParameterBonuses(this);

    // Bônus de Bloqueio por Equipamentos/Armaduras Equipadas
    const equipmentBlockBonus = calculateEquipmentBlockBonus(this);
    system.equipmentBlockBonus = equipmentBlockBonus;
    system.totalBlock = (Number(system.block) || 0) + equipmentBlockBonus;

    // PT: Aplica bônus acumulados de características configuráveis (ex: Adrenalina Feral)
    if (this.type === "creature" || this.type === "legacyNpc") {
      const featureBonuses = {
        offensiveParameters: 0,
        defensiveParameters: 0,
        movement: 0,
        block: 0
      };

      for (const item of this.items) {
        if (item.type !== "feature" && item.type !== "ability") continue;
        const mod = item.flags?.["gaia-preludio"]?.featureModifier;
        if (!mod || !mod.target) continue;
        const val = Number(mod.value) || 0;
        if (val > 0 && featureBonuses[mod.target] !== undefined) {
          featureBonuses[mod.target] += val;
        }
      }

      system.featureBonuses = featureBonuses;
      if (featureBonuses.offensiveParameters) {
        system.offensiveParameters = (Number(system.offensiveParameters) || 0) + featureBonuses.offensiveParameters;
      }
      if (featureBonuses.defensiveParameters) {
        system.defensiveParameters = (Number(system.defensiveParameters) || 0) + featureBonuses.defensiveParameters;
      }
      if (featureBonuses.movement) {
        system.movement = (Number(system.movement) || 0) + featureBonuses.movement;
      }
      if (featureBonuses.block) {
        system.block = (Number(system.block) || 0) + featureBonuses.block;
        system.totalBlock = (Number(system.totalBlock) || 0) + featureBonuses.block;
      }
    }

    // PT: Condições Especiais: Atordoado, Enfraquecido, Lentidão, Caído, Envenenado, Fratura, Imóvel, Sangramento
    // EN: Special Conditions: Stunned, Weakened, Slowed, Prone, Poisoned, Fracture, Immobilized, Bleeding
    // PT: Integração de Resistências e Imunidades a Condições vindas de Efeitos Ativos
    // PT: Lê as resistências armazenadas e sanitiza entradas inválidas que o Foundry pode injetar
    // EN: Read stored resistances and sanitize invalid entries that Foundry may inject via ActiveEffects on ArrayFields
    // (e.g. { type: "1" }, { type: "" }, { type: "5" } injetados pelo engine quando ch.value é numérico/padrão)
    const rawResistances = (Array.isArray(system.damageResistance) ? [...system.damageResistance] : [])
      .filter(r => {
        const t = String(r?.type ?? r ?? "").toLowerCase().trim();
        return t && t !== "1" && isNaN(Number(t));
      });
    const activeResistances = [];
    const conditionImmunities = new Set(
      (Array.isArray(system.conditionImmunity) ? system.conditionImmunity : [])
        .map(c => String(c?.type ?? c ?? "").toLowerCase().trim())
        .filter(t => t && t !== "1" && isNaN(Number(t)))
    );

    for (const effect of (this.effects ?? [])) {
      if (effect.disabled) continue;
      const effectName = String(effect.name || "").toLowerCase();
      
      for (const ch of (effect.changes ?? [])) {
        if (ch.key === "system.damageResistance" && ch.value) {
          const val = String(ch.value).toLowerCase().trim();
          if (val && val !== "1" && isNaN(Number(val))) {
            activeResistances.push(val);
          }
        }
        if (ch.key === "system.conditionImmunity" && ch.value) {
          const val = String(ch.value).toLowerCase().trim();
          if (val && val !== "1" && isNaN(Number(val))) {
            conditionImmunities.add(val);
          }
        }
      }

      const effectImg = String(effect.img || effect.icon || "").toLowerCase();
      if (effectName.includes("proteção da natureza") || effectName.includes("protecao da natureza") || (effectName === "novo efeito" && effectImg.includes("leaf-glowing-green"))) {
        activeResistances.push("nature");
        conditionImmunities.add("envenenado");
      }
      if (effectName.includes("abraço da treva") || effectName.includes("abraco da treva") || (effectName === "novo efeito" && effectImg.includes("skull-horned-goat-purple"))) {
        activeResistances.push("dark");
        conditionImmunities.add("enfraquecido");
      }
      if (effectName.includes("corpo de ferro") || (effectName === "novo efeito" && effectImg.includes("breastplate-helmet-metal"))) {
        conditionImmunities.add("envenenado");
        conditionImmunities.add("sangramento");
      }
      if (effectName.includes("filho de nolgadan") || (effectName === "novo efeito" && effectImg.includes("weapons-crossed-axes-bull"))) {
        conditionImmunities.add("lentidao");
        conditionImmunities.add("terreno dificil");
      }
    }

    for (const rType of activeResistances) {
      if (!rawResistances.some(r => String(r?.type || r).toLowerCase().trim() === rType)) {
        rawResistances.push({ type: rType });
      }
    }
    system.damageResistance = rawResistances.map(r => typeof r === "string" ? { type: r } : r);
    system.conditionImmunities = Array.from(conditionImmunities);
    const isImmunePoison = conditionImmunities.has("envenenado") || conditionImmunities.has("poisoned");
    const isImmuneWeakened = conditionImmunities.has("enfraquecido") || conditionImmunities.has("weakened");
    const isImmuneSlowed = conditionImmunities.has("lentidao") || conditionImmunities.has("lentidão") || conditionImmunities.has("slowed");
    const isImmuneBleeding = conditionImmunities.has("sangramento") || conditionImmunities.has("bleeding");
    const isImmuneDifficultTerrain = conditionImmunities.has("terreno dificil") || conditionImmunities.has("terrenos dificeis") || conditionImmunities.has("difficult-terrain") ;

    system.isImmunePoison = isImmunePoison;
    system.isImmuneWeakened = isImmuneWeakened;
    system.isImmuneSlowed = isImmuneSlowed;
    system.isImmuneBleeding = isImmuneBleeding;
    system.isImmuneDifficultTerrain = conditionImmunities.has("terreno dificil") || conditionImmunities.has("terrenos dificeis");

    const hasStunned = Boolean(
      this.statuses?.has?.("atordoado") || 
      this.statuses?.has?.("stunned") || 
      this.effects?.some(e => {
        const n = String(e.name || "").toLowerCase();
        return n === "atordoado" || n === "stunned";
      })
    );
    const hasWeakened = !isImmuneWeakened && Boolean(
      this.statuses?.has?.("enfraquecido") || 
      this.statuses?.has?.("weakened") || 
      this.effects?.some(e => {
        const n = String(e.name || "").toLowerCase();
        return n === "enfraquecido" || n === "weakened";
      })
    );
    const hasSlowed = !isImmuneSlowed && Boolean(
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
    const hasPoisoned = !isImmunePoison && Boolean(
      this.statuses?.has?.("envenenado") || 
      this.statuses?.has?.("poisoned") || 
      this.effects?.some(e => {
        if (e.disabled) return false;
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
    const hasBleeding = !isImmuneBleeding && Boolean(
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

    // Recursos vitais com acesso estruturado e atalhos diretos (@energy.max, @pe, @health.max, @pv)
    data.energy = {
      value: Number(system?.energy?.value ?? 0),
      max: Number(system?.energy?.max ?? 0),
      temp: Number(system?.energy?.temp ?? 0)
    };
    data.health = {
      value: Number(system?.health?.value ?? 0),
      max: Number(system?.health?.max ?? 0),
      temp: Number(system?.health?.temp ?? 0)
    };
    data.pe = data.energy.value;
    data.maxPe = data.energy.max;
    data.pv = data.health.value;
    data.maxPv = data.health.max;
    data.nivel = Number(system?.nivel ?? 1);
    data.level = data.nivel;

    const paramTranslation = {
      brutalidade: "brutality",
      precisao: "precision",
      precisão: "precision",
      agilidade: "agility",
      destreza: "dexterity",
      arcanismo: "arcane",
      canalizacao: "channeling",
      canalização: "channeling",
      espirito: "spirit",
      espírito: "spirit",
      vigor: "vigor"
    };

    // PT: Mapeia parâmetros (atributos) para acesso simplificado em fórmulas (ex: @params.vigor, @brutality, @vigor)
    // EN: Maps parameters (attributes) for simplified formula access (e.g. @params.vigor, @brutality, @vigor)
    data.params = data.params || {};
    if (system?.parameters && Array.isArray(system.parameters)) {
      for (const param of system.parameters) {
        if (param.name) {
          const rawKey = param.name.toLowerCase().trim().replace(/\s+/g, "_");
          const normKey = rawKey.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          const val = Number(param.value ?? 0);
          data.params[rawKey] = val;
          data.params[normKey] = val;
          data[rawKey] = val;
          data[normKey] = val;
          const engKey = paramTranslation[normKey];
          if (engKey) {
            data.params[engKey] = val;
            data[engKey] = val;
          }
        }
      }
    }

    // PT: Mapeia conhecimentos (perícias) para acesso simplificado em fórmulas (ex: @knowledge.arcana)
    // EN: Maps knowledge (skills) for simplified formula access (e.g. @knowledge.arcana)
    data.knowledge = data.knowledge || {};
    if (system?.knowledge && Array.isArray(system.knowledge)) {
      for (const item of system.knowledge) {
        if (item.name) {
          const key = item.name.toLowerCase().trim().replace(/\s+/g, "_");
          const normKey = key.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          const val = Number(item.value ?? 0);
          data.knowledge[key] = val;
          data.knowledge[normKey] = val;
          data[key] = val;
          data[normKey] = val;
        }
      }
    }

    if (this.type === "creature" || this.type === "legacyNpc") {
      data.initiative = Number(system?.defensiveParameters ?? 0);
    } else {
      data.initiative = Number(data.agility ?? 0);
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
