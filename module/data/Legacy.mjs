/**
 * ==============================================================================
 * LEGACY DATA MODEL / MODELO DE DADOS DE LEGADO
 * ==============================================================================
 * PT: Modelo de dados para personagens de Legado / Jogadores, estendendo o modelo base de Actor.
 * EN: Data model for Legacy / Player characters, extending the base Actor model.
 */

import { ActorBaseDataModel } from "./ActorBaseModel.mjs";
import { ActionDataModel } from "./ActionModel.mjs";
import { GenericAbilityDataModel, EffectConfigDataModel } from "./AbilityClassesModel.mjs";

const { NumberField, ArrayField, SchemaField, StringField, BooleanField, EmbeddedDataField } = foundry.data.fields;

/**
 * Modelo embutido para as Habilidades de Legado.
 * @extends {GenericAbilityDataModel}
 */
export class LegacyAbilityDataModel extends GenericAbilityDataModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      // name, description, actions are inherited from BaseDataModel (via GenericAbilityDataModel)
      activeEffect: new EmbeddedDataField(EffectConfigDataModel)
    };
  }
}

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
      origin: new StringField({ required: false, initial: "" }),
      traditions: new StringField({ required: false, initial: "" }),
      inWorld: new StringField({ required: false, initial: "" }),
      origem: new StringField({ required: false, initial: "" }),
      tradicoes: new StringField({ required: false, initial: "" }),
      no_mundo: new StringField({ required: false, initial: "" }),
      legacyAbilities: new ArrayField(
        new EmbeddedDataField(LegacyAbilityDataModel),
        { required: true, initial: [] }
      )
    };
  }

  /** @override */
  static migrateData(source) {
    super.migrateData(source);
    if (!source.origin && source.origem) source.origin = source.origem;
    if (!source.traditions && source.tradicoes) source.traditions = source.tradicoes;
    if (!source.inWorld && source.no_mundo) source.inWorld = source.no_mundo;
    if (!source.origem && source.origin) source.origem = source.origin;
    if (!source.tradicoes && source.traditions) source.tradicoes = source.traditions;
    if (!source.no_mundo && source.inWorld) source.no_mundo = source.inWorld;
    return source;
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