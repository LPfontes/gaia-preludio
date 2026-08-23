import { BaseDataModel } from "./baseModel.mjs";

const { NumberField, ArrayField, SchemaField, StringField, BooleanField } = foundry.data.fields;

/**
 * Data Model para Habilidades do sistema Gaia: Prelúdio.
 * @extends {BaseDataModel}
 */
export class AbilityBaseModel extends BaseDataModel {
  /** @override */
  static defineSchema() {
    return {
      ...super.defineSchema(),
      category: new StringField({ required: true, initial: "other" }),
      cost: new StringField({ required: true, initial: "1 PE" }),
      typeAction: new StringField({ required: true, initial: "acaoAtiva" }),
      type: new StringField({ required: true, initial: "conjuracao" }),
      types: new ArrayField(new StringField({ required: true }), { required: true, initial: ["conjuracao"] }),
      quote: new StringField({ required: false, initial: "" }),
      numberTarget: new StringField({ required: true, initial: "1 Alvo" }),
      range: new StringField({ required: true, initial: "8 metros" }),
      subEffects: new ArrayField(
        new SchemaField({
          name: new StringField({ required: true, initial: "" }),
          cost: new StringField({ required: false, initial: "" }),
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
      Improvements: new ArrayField(new StringField({ required: true }), { required: true, initial: [] })
    };
  }
}   