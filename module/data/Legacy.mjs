/**
 * ==============================================================================
 * LEGACY DATA MODEL / MODELO DE DADOS DE LEGADO
 * ==============================================================================
 * PT: Modelo de dados para personagens de Legado / Jogadores, estendendo o modelo base de Actor.
 * EN: Data model for Legacy / Player characters, extending the base Actor model.
 */

import { ActorBaseDataModel } from "./ActorBaseModel.mjs";
import { ActionDataModel } from "./ActionModel.mjs";

const { NumberField, ArrayField, SchemaField, StringField, BooleanField, EmbeddedDataField } = foundry.data.fields;

/**
 * @extends {ActorBaseDataModel}
 */
export class LegacyDataModel extends ActorBaseDataModel {
  /** @override */
  static defineSchema() {
    return {
      ...super.defineSchema(),

      // PT: Identificador / Legado do personagem
      // EN: Legacy identifier / subtype of the character
      legacy: new StringField({ required: true, initial: "" }),

      // PT: Lista de parâmetros / atributos base do personagem (nome/chave e valor)
      // EN: List of character base parameters / attributes (name/key and value)
      parameters: new ArrayField(
        new SchemaField({
          name: new StringField({ required: true }),
          value: new NumberField({ required: true, integer: true, initial: 0 })
        }),
        { required: true, initial: [] }
      ),

      // PT: Lista de conhecimentos / perícias adquiridas (nome/chave e valor)
      // EN: List of acquired knowledge entries / skills (name/key and value)
      knowledge: new ArrayField(
        new SchemaField({
          name: new StringField({ required: true }),
          value: new NumberField({ required: true, integer: true, initial: 0 })
        }),
        { required: true, initial: [] }
      ),

      // PT: Lista de IDs das maestrias desbloqueadas pelo personagem
      // EN: List of mastery IDs unlocked by the character
      masteries: new ArrayField(
        new StringField({ required: true }),
        { required: true, initial: [] }
      ),
      // PT: Informações detalhadas do Legado (Aparência, Altura, Expectativa de Vida e Habilidades)
      // EN: Detailed Legacy information (Appearance, Height, Life Expectancy, and Legacy Abilities)
      appearance: new StringField({ required: false, initial: "" }),
      height: new StringField({ required: false, initial: "" }),
      lifeExpectancy: new StringField({ required: false, initial: "" }),
      legacyAbilities: new ArrayField(
        new SchemaField({
          name: new StringField({ required: true, initial: "" }),
          description: new StringField({ required: false, initial: "" }),
          actions: new ArrayField(new EmbeddedDataField(ActionDataModel), { required: true, initial: [] }),
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
export class LegacyNpcDataModel extends LegacyDataModel {
  /** @override */
  static defineSchema() {
    return {
      ...super.defineSchema(),
      difficulty: new StringField({ required: true }),
      powerPoints: new NumberField({ required: true, integer: true, initial: 0 }),
      // PT: Parâmetros ofensivos da criatura (bônus de ataque / poder de ataque)
      // EN: Offensive parameters of the creature (attack bonus / offensive power)
      offensiveParameters: new NumberField({ required: true, initial: 0, integer: true }),

      // PT: Parâmetros defensivos da criatura (bônus de defesa / esquiva)
      // EN: Defensive parameters of the creature (defense bonus / evasion)
      defensiveParameters: new NumberField({ required: true, initial: 0, integer: true }),
    };
  }
}

export { LegacyNpcDataModel as LegacyNPCDataModel };