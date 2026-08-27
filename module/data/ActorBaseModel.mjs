/**
 * ==============================================================================
 * ACTOR BASE DATA MODEL / MODELO DE DADOS BASE DE ATOR
 * ==============================================================================
 * PT: Modelo de dados base para todos os Atores do sistema (Personagens, Legados, Criaturas).
 * EN: Base data model for all Actors in the system (Characters, Legacies, Creatures).
 *
 * PT: Campos herdados de BaseDataModel:
 * EN: Inherited fields from BaseDataModel:
 *   - name (String): Nome do ator / Actor name
 *   - description (String): Descrição / Description
 */

import { BaseDataModel } from "./baseModel.mjs";

const { NumberField, ArrayField, SchemaField, StringField, BooleanField } = foundry.data.fields;

/**
 * @extends {BaseDataModel}
 */
class ActorBaseDataModel extends BaseDataModel {
  /** @override */
  static defineSchema() {
    return {
      // PT: Inclui todos os campos herdados do modelo raiz (name, description)
      // EN: Includes all fields inherited from the root model (name, description)
      ...super.defineSchema(),

      // PT: Nível do personagem ou criatura
      // EN: Level of the character or creature
      nivel: new NumberField({ required: true, integer: true, min: 0, initial: 1 }),

      // PT: Pontos de vida (atual e máximo)
      // EN: Health points (current and maximum)
      health: new SchemaField({
        value: new NumberField({ required: true, integer: true, initial: 30 }),
        max: new NumberField({ required: true, integer: true, min: 0, initial: 30 }),
        temp: new NumberField({ required: false, integer: true, min: 0, initial: 0 })
      }),

      // PT: Sistema de Dado de Morte (Incapacitado: Sentenças do Corruptor e Dádivas do Artesão)
      // EN: Death Die system (Incapacitated: Corruption Sentences and Artisan Gifts)
      death: new SchemaField({
        sentences: new NumberField({ required: true, integer: true, min: 0, max: 2, initial: 0 }),
        gifts: new NumberField({ required: true, integer: true, min: 0, max: 2, initial: 0 }),
        stabilized: new BooleanField({ required: true, initial: false })
      }),

      // PT: Tamanho do personagem ou criatura
      // EN: Size of the character or creature
      size: new StringField({ required: true, initial: "medium" }),

      // PT: Energia / mana / estamina (atual, máximo e temporário)
      // EN: Energy / mana / stamina (current, maximum, and temporary)
      energy: new SchemaField({
        value: new NumberField({ required: true, integer: true, min: 0, initial: 5 }),
        max: new NumberField({ required: true, integer: true, min: 0, initial: 5 }),
        temp: new NumberField({ required: false, integer: true, min: 0, initial: 0 })
      }),
      
      // PT: Quantidade de exaustões (0 a 6)
      // EN: Number of exhaustion entries (0 to 6)
      exhaustion: new NumberField({ required: true, integer: true, min: 0, max: 6, initial: 0 }),
      // PT: Deslocamento / velocidade de movimento em combate
      // EN: Movement speed / travel displacement in combat
      movement: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),

      // PT: Valor de bloqueio defensivo
      // EN: Defensive block value
      block: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),

      // PT: Percepção passiva do personagem
      // EN: Passive perception of the character
      passivePerception: new NumberField({ required: true, integer: true, initial: 6 }),

      // PT: Lista de itens ou IDs contidos no inventário
      // EN: Inventory item references or IDs
      inventario: new ArrayField(new StringField({ required: true }), { required: true, initial: [] }),

      // PT: Lista de resistências a dano (tipo + valor)
      // EN: List of damage resistances (type + amount)
      damageResistance: new ArrayField(
        new SchemaField({
          type: new StringField({ required: true })
        }),
        { required: true, initial: [] }
      ),

      damageReduction: new ArrayField(
        new SchemaField({
          type: new StringField({ required: true }),
          value: new NumberField({ required: true, integer: true, initial: 0 })
        }),
        { required: true, initial: [] }
      ),

      // PT: Lista de imunidades completas a tipos de dano
      // EN: List of complete damage immunities
      damageImmunity: new ArrayField(
        new SchemaField({
          type: new StringField({ required: true })
        }),
        { required: true, initial: [] }
      ),

      // PT: Lista de vulnerabilidades a tipos de dano (dano adicional recebido)
      // EN: List of damage vulnerabilities (extra damage taken)
      damageVulnerability: new ArrayField(
        new SchemaField({
          type: new StringField({ required: true })
        }),
        { required: true, initial: [] }
      ),
      // PT: Idiomas do personagem
      // EN: Languages of the character
      languages: new ArrayField(
        new StringField({ required: true }),
        { required: true, initial: [] }
      ),
      // PT: Visão do personagem
      // EN: Vision of the character
      vision: new ArrayField(
        new StringField({ required: true }),
        { required: true, initial: ["normal"] }
      ),
      // PT: Notas do personagem
      // EN: Character notes
      notes: new StringField({ required: false, initial: "" }),
      parametersBonus: new ArrayField(
        new SchemaField({
          attr: new StringField({ required: true }),
          bonus: new NumberField({ required: true, integer: true, initial: 0 })
        }),
        { required: false, initial: [] }
      )
    };
  }
}

export { ActorBaseDataModel };