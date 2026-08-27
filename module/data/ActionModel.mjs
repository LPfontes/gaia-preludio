/**
 * ==============================================================================
 * ACTION DATA MODEL / MODELO DE DADOS DE AÇÃO
 * ==============================================================================
 * PT: Modelo de dados para o objeto de Ação no sistema Gaia: Prelúdio.
 *     Contém definições estruturadas para tipo, ataque, dano, condição, teste e área de efeito.
 * EN: Data model for Action objects in the Gaia: Prelúdio system.
 *     Contains structured definitions for type, attack, damage, condition, check/save, and area of effect.
 */

const { NumberField, ArrayField, SchemaField, StringField, BooleanField } = foundry.data.fields;

/**
 * Data Model para representar uma Ação completa no sistema Gaia: Prelúdio.
 * @extends {foundry.abstract.DataModel}
 */
export class ActionDataModel extends foundry.abstract.DataModel {
  /** @override */
  static defineSchema() {
    return {
      // PT: Identificação e nome da ação
      // EN: Action identification and name
      id: new StringField({ required: false, initial: () => foundry.utils.randomID() }),
      name: new StringField({ required: false, initial: "" }),
      description: new StringField({ required: false, initial: "" }),

      // PT: Custo da ação (ex: 1 PE, 2 PE)
      // EN: Action cost (e.g. 1 PE, 2 PE)
      cost: new StringField({ required: false, initial: "" }),

      // ========================================================================
      // 1. TIPO / CLASSIFICAÇÃO DA AÇÃO
      // ========================================================================
      type: new SchemaField({
        // PT: Tipo de Ação na economia de combate (acaoAtiva, acaoSimples, acaoRapida, acaoAcelerada, acaoVersatil, passiva)
        actionType: new StringField({ required: false, initial: "acaoAtiva" }),

        // PT: Classificação temática da habilidade (ataque_corpo_a_corpo, ataque_distancia, ataque_magico, conjuracao, defesa, suporte, etc.)
        category: new StringField({ required: false, initial: "ataque_corpo_a_corpo" }),

        // PT: Lista de marcadores / tags adicionais de tipo
        tags: new ArrayField(new StringField({ required: false }), { required: false, initial: [] })
      }),

      // ========================================================================
      // 2. ATAQUE / EMBATE
      // ========================================================================
      attack: new SchemaField({
        // PT: Indica se a ação realiza uma rolagem de ataque/embate
        hasAttack: new BooleanField({ required: true, initial: false }),

        // PT: Parâmetro base utilizado no ataque (ex: brutality, precision, agility, arcane, channeling, spirit, vigor, dexterity)
        attribute: new StringField({ required: false, initial: "brutality" }),

        // PT: Conhecimento / Maestria opcional associado
        knowledge: new StringField({ required: false, initial: "" }),

        // PT: Modificador / bônus adicional fixo ou fórmula
        bonus: new StringField({ required: false, initial: "" }),

        // PT: Tipo de rolagem (standard: 1d12, advantage: 2d12kh, disadvantage: 2d12kl, etc.)
        rollType: new StringField({ required: false, initial: "standard" })
      }),

      // ========================================================================
      // 3. DANO
      // ========================================================================
      damage: new SchemaField({
        // PT: Indica se a ação causa dano
        hasDamage: new BooleanField({ required: true, initial: false }),

        // PT: Fórmula ou valor numérico de dano (ex: "1d6 + @brutality", "2d8", "5")
        formula: new StringField({ required: false, initial: "" }),

        // PT: Tipo de dano (physical, fire, wind, water, earth, thunder, ice, nature, profane, light, dark, immaterial)
        type: new StringField({ required: false, initial: "physical" }),

        // PT: Dano crítico / multiplicador ou bônus extra no acerto crítico
        criticalBonus: new StringField({ required: false, initial: "" }),

        // PT: Escalonamento adicional (ex: por nível ou gasto de energia extra)
        scaling: new StringField({ required: false, initial: "" })
      }),

      // ========================================================================
      // 4. CONDIÇÃO / EFEITO DE STATUS
      // ========================================================================
      condition: new SchemaField({
        // PT: Indica se a ação aplica uma condição de status
        hasCondition: new BooleanField({ required: true, initial: false }),

        // PT: Nome ou chave da condição aplicada (ex: sangrando, atordoado, queimando, imobilizado, etc.)
        status: new StringField({ required: false, initial: "" }),

        // PT: Duração da condição (ex: "1 rodada", "Sustentada", "Até o fim do próximo turno")
        duration: new StringField({ required: false, initial: "" }),

        // PT: Descrição detalhada do efeito da condição aplicada
        description: new StringField({ required: false, initial: "" })
      }),

      // ========================================================================
      // 5. TESTE / SALVAGUARDA (DIFICULDADE / RESISTÊNCIA)
      // ========================================================================
      check: new SchemaField({
        // PT: Indica se a ação exige um teste do alvo / resistido
        hasCheck: new BooleanField({ required: true, initial: false }),

        // PT: Categoria do teste (parameter, knowledge, defense, destiny)
        category: new StringField({ required: false, initial: "parameter" }),

        // PT: Parâmetro ou Conhecimento exigido do alvo para resistir (ex: vigor, willpower, agility)
        attribute: new StringField({ required: false, initial: "vigor" }),

        // PT: Nível de dificuldade ou valor numérico de Dificuldade / CD
        difficulty: new NumberField({ required: false, integer: true, min: 0, initial: 10 }),

        // PT: Efeito / consequência caso o alvo obtenha Sucesso no teste (ex: "Metade do dano", "Nega condição")
        onSuccess: new StringField({ required: false, initial: "" }),

        // PT: Efeito / consequência caso o alvo Falhe no teste
        onFailure: new StringField({ required: false, initial: "" })
      }),

      // ========================================================================
      // 6. ÁREA DE EFEITO (AoE)
      // ========================================================================
      areaOfEffect: new SchemaField({
        // PT: Indica se a ação possui área de efeito
        hasArea: new BooleanField({ required: true, initial: false }),

        // PT: Formato geométrico da área (circle, cone, line, rectangle, ellipse, polygon)
        shape: new StringField({ required: false, initial: "circle" }),

        // PT: Tamanho / raio / distância da área de efeito
        size: new NumberField({ required: false, min: 0, initial: 3 }),

        // PT: Unidade de medida ("m" / metros, "grid" / quadrados, "distance")
        unit: new StringField({ required: false, initial: "m" }),

        // PT: Limite ou quantidade de alvos afetados dentro da área (ex: "Todos", "Até 3 alvos")
        targetLimit: new StringField({ required: false, initial: "" })
      })
    };
  }
}
