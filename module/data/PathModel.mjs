/**
 * ==============================================================================
 * PATH DATA MODEL / MODELO DE DADOS DE CAMINHO
 * ==============================================================================
 * PT: Modelo de dados para Caminhos e conjuntos de Habilidades no sistema Gaia: Prelúdio.
 * EN: Data model for Paths and Ability sets in the Gaia: Prelúdio system.
 */

import { GenericAbilityDataModel, SubAbilityDataModel, ImprovementDataModel, EffectConfigDataModel } from "./AbilityClassesModel.mjs";

const { NumberField, ArrayField, StringField, EmbeddedDataField } = foundry.data.fields;

/**
 * Modelo embutido para as Habilidades de um Caminho.
 * @extends {GenericAbilityDataModel}
 */
export class PathAbilityDataModel extends GenericAbilityDataModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      id: new StringField({ required: false, initial: "" }),
      uuid: new StringField({ required: false, initial: "" }),
      img: new StringField({ required: false, initial: "icons/svg/item-bag.svg" }),
      level: new NumberField({ required: true, integer: true, initial: 1, min: 1 }),
      types: new ArrayField(new StringField({ required: false }), { required: false, initial: [] }),
      quote: new StringField({ required: false, initial: "" }),
      numberTarget: new StringField({ required: false, initial: "" }),
      range: new StringField({ required: false, initial: "" }),
      duration: new StringField({ required: false, initial: "" }),
      subEffects: new ArrayField(
        new EmbeddedDataField(SubAbilityDataModel),
        { required: true, initial: [] }
      ),
      improvements: new ArrayField(
        new EmbeddedDataField(ImprovementDataModel),
        { required: true, initial: [] }
      ),
      activeEffect: new EmbeddedDataField(EffectConfigDataModel)
    };
  }
}

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
        new EmbeddedDataField(PathAbilityDataModel),
        { required: true, initial: [] }
      )
    };
  }
}
