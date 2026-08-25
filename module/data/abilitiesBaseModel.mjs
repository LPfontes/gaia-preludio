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
      category: new StringField({ required: false, initial: "" }),
      cost: new StringField({ required: false, initial: "" }),
      typeAction: new StringField({ required: false, initial: "" }),
      type: new StringField({ required: false, initial: "" }),
      types: new ArrayField(new StringField({ required: false }), { required: false, initial: [] }),
      quote: new StringField({ required: false, initial: "" }),
      numberTarget: new StringField({ required: false, initial: "" }),
      range: new StringField({ required: false, initial: "" }),
      level: new NumberField({ required: false, integer: true, initial: 1, min: 1 }),
      pathId: new StringField({ required: false, initial: "" }),
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
      Improvements: new ArrayField(new StringField({ required: true }), { required: true, initial: [] })
    };
  }
}   