/**
 * ==============================================================================
 * ABILITY CLASSES DATA MODEL / MODELOS DE DADOS DE Habilidades
 * ==============================================================================
 * PT: Modelos de dados reutilizáveis para a hierarquia de habilidades.
 * EN: Reusable data models for the abilities hierarchy.
 */

import { BaseDataModel } from "./baseModel.mjs";
import { ActionDataModel } from "./ActionModel.mjs";

const { NumberField, ArrayField, SchemaField, StringField, BooleanField, EmbeddedDataField } = foundry.data.fields;

/**
 * Modelo de dados para Efeitos Ativos embutidos.
 * @extends {foundry.abstract.DataModel}
 */
export class EffectConfigDataModel extends foundry.abstract.DataModel {
  static defineSchema() {
    return {
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
    };
  }
}

/**
 * Modelo de dados para Melhorias (Improvements).
 * @extends {foundry.abstract.DataModel}
 */
export class ImprovementDataModel extends foundry.abstract.DataModel {
  static defineSchema() {
    return {
      title: new StringField({ required: true, initial: "" }),
      description: new StringField({ required: false, initial: "" }),
      active: new BooleanField({ required: false, initial: false })
    };
  }
}

/**
 * Função utilitária para obter o schema genérico de habilidades.
 * Permite que classes TypeDataModel reaproveitem este schema sem herdar de DataModel.
 */
export function getGenericAbilitySchema() {
  const { StringField, ArrayField, EmbeddedDataField } = foundry.data.fields;
  return {
    name: new StringField({ required: true }),
    description: new StringField({ required: false, initial: "" }),
    actions: new ArrayField(
      new EmbeddedDataField(ActionDataModel),
      { required: true, initial: [] }
    ),
    category: new StringField({ required: false, initial: "" }),
    cost: new StringField({ required: false, initial: "" }),
    typeAction: new StringField({ required: false, initial: "" }),
    type: new StringField({ required: false, initial: "" }),
    typeAbility: new StringField({ required: false, initial: "" }),
  };
}

/**
 * Modelo de dados Genérico para Habilidades.
 * Usado exclusivamente em EmbeddedDataFields.
 * @extends {foundry.abstract.DataModel}
 */
export class GenericAbilityDataModel extends foundry.abstract.DataModel {
  static defineSchema() {
    return getGenericAbilitySchema();
  }
}

/**
 * Modelo de dados para Sub-Habilidades (subEffects).
 * @extends {GenericAbilityDataModel}
 */
export class SubAbilityDataModel extends GenericAbilityDataModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      note: new StringField({ required: false, initial: "" })
    };
  }
}
