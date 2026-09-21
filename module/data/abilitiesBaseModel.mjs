import { GenericAbilityDataModel, SubAbilityDataModel, ImprovementDataModel, getGenericAbilitySchema } from "./AbilityClassesModel.mjs";

const { NumberField, ArrayField, StringField, EmbeddedDataField } = foundry.data.fields;

/**
 * Data Model para Habilidades do sistema Gaia: Prelúdio.
 * @extends {foundry.abstract.TypeDataModel}
 */
export class AbilityBaseModel extends foundry.abstract.TypeDataModel {
  /** @override */
  static defineSchema() {
    return {
      ...getGenericAbilitySchema(),
      requirement: new StringField({ required: false, initial: "" }),
      types: new ArrayField(new StringField({ required: false }), { required: false, initial: [] }),
      quote: new StringField({ required: false, initial: "" }),
      numberTarget: new StringField({ required: false, initial: "" }),
      range: new StringField({ required: false, initial: "" }),
      duration: new StringField({ required: false, initial: "" }),
      level: new NumberField({ required: false, integer: true, initial: 1, min: 1 }),
      pathId: new StringField({ required: false, initial: "" }),

      subEffects: new ArrayField(
        new EmbeddedDataField(SubAbilityDataModel),
        { required: true, initial: [] }
      ),
      improvements: new ArrayField(
        new EmbeddedDataField(ImprovementDataModel),
        { required: true, initial: [] }
      )
    };
  }
}

/**
 * Data Model para Características (Features) do sistema Gaia: Prelúdio.
 * Herda todos os campos e estruturas de Habilidade.
 * @extends {AbilityBaseModel}
 */
export class FeatureDataModel extends AbilityBaseModel {}
