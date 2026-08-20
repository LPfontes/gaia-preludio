/**
 * ==============================================================================
 * CREATURE DATA MODEL / MODELO DE DADOS DE CRIATURA
 * ==============================================================================
 * PT: Modelo de dados para criaturas e monstros, estendendo o modelo base de Actor.
 * EN: Data model for creatures and monsters, extending the base Actor model.
 *
 * PT: Campos herdados de ActorBaseDataModel e BaseDataModel:
 * EN: Inherited fields from ActorBaseDataModel and BaseDataModel:
 *   - name (String): Nome da criatura / Creature name
 *   - description (String): Descrição / Description
 *   - nivel (Number): Nível ou ND / Level or Challenge Rating
 *   - health ({value, max}): Pontos de vida / Health points
 *   - energy ({value, max}): Energia / Energy
 *   - movement (Number): Deslocamento / Movement speed
 *   - block (Number): Bloqueio / Block defense
 *   - passivePerception (Number): Percepção passiva / Passive perception
 *   - inventario (Array<String>): Itens no inventário / Inventory items
 *   - damageResistance (Array<{type, value}>): Resistências a dano / Damage resistances
 *   - damageImmunity (Array<{type, value}>): Imunidades a dano / Damage immunities
 *   - damageVulnerability (Array<{type, value}>): Vulnerabilidades a dano / Damage vulnerabilities
 */

import { ActorBaseDataModel } from "./ActorBaseModel.mjs";

const { NumberField, ArrayField, StringField } = foundry.data.fields;

/**
 * @extends {ActorBaseDataModel}
 */
class CreatureDataModel extends ActorBaseDataModel {
  /** @override */
  static defineSchema() {
    return {
      // PT: Inclui todos os campos do modelo base de Actor
      // EN: Includes all fields inherited from the parent actor base model
      ...super.defineSchema(),
      difficulty: new StringField({ required: true }),
      // PT: Parâmetros ofensivos da criatura (bônus de ataque / poder de ataque)
      // EN: Offensive parameters of the creature (attack bonus / offensive power)
      offensiveParameters: new NumberField({ required: true, initial: 0, integer: true }),

      // PT: Parâmetros defensivos da criatura (bônus de defesa / esquiva)
      // EN: Defensive parameters of the creature (defense bonus / evasion)
      defensiveParameters: new NumberField({ required: true, initial: 0, integer: true }),

      // PT: Modificador / valor brutal para ataques ou proezas físicas
      // EN: Brutal modifier / value for attacks or feats of physical brute force
      brutal: new NumberField({ required: true, integer: true, initial: 0 }),

      // PT: Capacidade de evocação mística / poder arcano inato
      // EN: Mystical evocation capability / innate arcane power
      mysticalEvocation: new NumberField({ required: true, integer: true, initial: 0 }),

      // PT: Referências livros de monstros
      // EN: Monster book references
      monsterBooks: new ArrayField(new StringField({ required: true }), { required: true, initial: [] }),

      // PT: Lista de ações, habilidades especiais ou características da criatura
      // EN: List of actions, special abilities or creature traits
      skills: new ArrayField(new StringField({ required: true }), { required: true, initial: [] })
    };
  }
}

export { CreatureDataModel };