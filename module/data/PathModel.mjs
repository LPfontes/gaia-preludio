/**
 * ==============================================================================
 * PATH DATA MODEL / MODELO DE DADOS DE CAMINHO
 * ==============================================================================
 * PT: Modelo de dados para Caminhos e conjuntos de Habilidades no sistema Gaia: Prelúdio.
 * EN: Data model for Paths and Ability sets in the Gaia: Prelúdio system.
 */

const { NumberField, ArrayField, SchemaField, StringField, BooleanField } = foundry.data.fields;

/**
 * PT: Modelo de dados para o tipo de Item "path" (Caminho).
 * EN: Data model for the "path" Item type.
 * @extends {foundry.abstract.TypeDataModel<any, any>}
 */
export class PathDataModel extends foundry.abstract.TypeDataModel {
  /** @override */
  static defineSchema() {
    return {
      // PT: Descrição detalhada do Caminho
      description: new StringField({ required: false, initial: "" }),

      // PT: Categoria do Caminho (ex: martial, magic, elemental, specialized, etc.)
      category: new StringField({ required: false, initial: "" }),

      // PT: Especializações disponíveis neste Caminho
      specializations: new ArrayField(new StringField({ required: false, initial: "" }), { required: false, initial: [] }),

      // PT: Palavras-chave do Caminho (ex: Marcial, Fogo, Protetor)
      keywords: new ArrayField(new StringField({ required: false, initial: "" }), { required: false, initial: [] }),

      // PT: Sugestões de Parâmetros recomendadas para este Caminho (ex: Brutalidade, Vigor)
      parameterSuggestions: new ArrayField(new StringField({ required: false, initial: "" }), { required: false, initial: [] }),

      // PT: Conjunto de Habilidades pertencentes a este Caminho (cada uma tratada como Item do tipo "ability")
      abilities: new ArrayField(
        new SchemaField({
          id: new StringField({ required: false, initial: "" }),
          uuid: new StringField({ required: false, initial: "" }),
          name: new StringField({ required: true, initial: "Nova Habilidade de Caminho" }),
          type: new StringField({ required: true, initial: "ability" }),
          img: new StringField({ required: false, initial: "icons/svg/item-bag.svg" }),
          level: new NumberField({ required: true, integer: true, initial: 1, min: 1 }),
          description: new StringField({ required: false, initial: "" }),
          category: new StringField({ required: false, initial: "" }),
          cost: new StringField({ required: false, initial: "" }),
          typeAction: new StringField({ required: false, initial: "" }),
          typeAbility: new StringField({ required: false, initial: "" }),
          types: new ArrayField(new StringField({ required: false }), { required: false, initial: [] }),
          quote: new StringField({ required: false, initial: "" }),
          numberTarget: new StringField({ required: false, initial: "" }),
          range: new StringField({ required: false, initial: "" }),
          subEffects: new ArrayField(
            new SchemaField({
              name: new StringField({ required: true, initial: "" }),
              cost: new StringField({ required: false, initial: "" }),
              typeAction: new StringField({ required: false, initial: "" }),
              type: new StringField({ required: false, initial: "" }),
              description: new StringField({ required: false, initial: "" }),
              note: new StringField({ required: false, initial: "" })
            }),
            { required: true, initial: [] }
          ),
          improvements: new ArrayField(
            new SchemaField({
              title: new StringField({ required: true, initial: "" }),
              description: new StringField({ required: false, initial: "" }),
              active: new BooleanField({ required: false, initial: false })
            }),
            { required: true, initial: [] }
          ),
          activeEffect: new SchemaField({
            text: new StringField({ required: false, initial: "" }),
            used: new BooleanField({ required: true, initial: false }),
            recharge: new StringField({ required: true, initial: "full_rest" }),
            trigger: new SchemaField({
              event: new StringField({ required: true, initial: "hp_threshold" }),
              inCombatOnly: new BooleanField({ required: true, initial: true }),
              hpThresholdPercentage: new NumberField({ required: true, initial: 50, min: 1, max: 100 })
            }),
            changes: new ArrayField(
              new SchemaField({
                key: new StringField({ required: true, initial: "all_parameters" }),
                mode: new StringField({ required: true, initial: "ADD" }),
                value: new NumberField({ required: true, initial: 1 }),
                allowExceedMax: new BooleanField({ required: true, initial: true })
              }),
              { required: true, initial: [] }
            ),
            duration: new SchemaField({
              type: new StringField({ required: false, initial: "end_of_combat" }),
              units: new StringField({ required: false, initial: "end_of_combat" })
            })
          })
        }),
        { required: true, initial: [] }
      )
    };
  }
}
