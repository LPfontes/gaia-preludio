import { BaseDataModel } from "./baseModel.mjs";

const { NumberField, ArrayField, SchemaField, StringField } = foundry.data.fields;

/**
 * @extends {BaseDataModel}
 */
export class AbilityBaseModel extends BaseDataModel {
  /** @override */
  static defineSchema() {
    return {
      ...super.defineSchema(),
      category: new StringField({ required: true, initial: "other" }),
      cost: new StringField({ required: true, initial: "" }),
      typeAction: new StringField({ required: true, initial: "" }),
      type: new StringField({ required: true, initial: "" }),
      numberTarget: new NumberField({ required: true, initial: 1 }), 
      range: new StringField({ required: true, initial: "" }),
      Improvements: new ArrayField(new StringField({ required: true }), { required: true, initial: [] })
      
    };
  }
}   