/**
 * ==============================================================================
 * LEGACY DATA MODEL / MODELO DE DADOS DE LEGADO
 * ==============================================================================
 * PT: Modelo de dados para personagens de Legado / Jogadores, estendendo o modelo base de Actor.
 * EN: Data model for Legacy / Player characters, extending the base Actor model.
 */

import { ActorBaseDataModel } from "./ActorBaseModel.mjs";

const { NumberField, ArrayField, SchemaField, StringField } = foundry.data.fields;

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

      // PT: Quantidade de exaustões (0 a 6)
      // EN: Number of exhaustion entries (0 to 6)
      exhaustion: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),

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
      languages: new ArrayField(
        new StringField({ required: true }),
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