/**
 * ==============================================================================
 * ACTOR BASE DATA MODEL / MODELO DE DADOS BASE DE ATOR
 * ==============================================================================
 * PT: Modelo de dados base para todos os Atores do sistema (Personagens, Legados, Criaturas).
 * EN: Base data model for all Actors in the system (Characters, Legacies, Creatures).
 *
 * PT: Campos herdados de baseDataModel:
 * EN: Inherited fields from baseDataModel:
 *   - name (String): Nome do ator / Actor name
 *   - description (String): Descrição / Description
 */

import { baseDataModel } from "./baseModel.mjs";

const { NumberField, ArrayField, SchemaField, StringField } = foundry.data.fields;

/**
 * @extends {baseDataModel}
 */
class actorBaseDataModel extends baseDataModel {
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
        value: new NumberField({ required: true, integer: true, min: 0, initial: 10 }),
        max: new NumberField({ required: true, integer: true, min: 0, initial: 10 })
      }),

      // PT: Energia / mana / estamina (atual e máximo)
      // EN: Energy / mana / stamina (current and maximum)
      energy: new SchemaField({
        value: new NumberField({ required: true, integer: true, min: 0, initial: 5 }),
        max: new NumberField({ required: true, integer: true, min: 0, initial: 5 })
      }),

      // PT: Deslocamento / velocidade de movimento em combate
      // EN: Movement speed / travel displacement in combat
      movement: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),

      // PT: Valor de bloqueio defensivo
      // EN: Defensive block value
      block: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),

      // PT: Percepção passiva do personagem
      // EN: Passive perception of the character
      passivePerception: new NumberField({ required: true, integer: true, initial: 10 }),

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
      // PT: Notas do personagem
      // EN: Character notes
      notes: new StringField({ required: false, initial: "" })
    };
  }
}

export { actorBaseDataModel };