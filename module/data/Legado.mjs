/**
 * ==============================================================================
 * LEGADO (LEGACY) DATA MODEL / MODELO DE DADOS DE LEGADO
 * ==============================================================================
 * PT: Modelo de dados para personagens de Legado / Jogadores, estendendo o modelo base de Actor.
 * EN: Data model for Legacy / Player characters, extending the base Actor model.
 *
 * PT: Campos herdados de actorBaseDataModel e baseDataModel:
 * EN: Inherited fields from actorBaseDataModel and baseDataModel:
 *   - name (String): Nome do personagem / Character name
 *   - description (String): Descrição e biografia / Description and biography
 *   - nivel (Number): Nível do personagem / Character level
 *   - health ({value, max}): Pontos de vida / Health points
 *   - energy ({value, max}): Energia / Energy
 *   - movement (Number): Deslocamento / Movement speed
 *   - block (Number): Bloqueio / Block defense
 *   - passivePerception (Number): Percepção passiva / Passive perception
 *   - inventario (Array<String>): Itens no inventário / Inventory items
 *   - damageResistance, damageImmunity, damageVulnerability
 */

import { actorBaseDataModel } from "./ActorBaseModel.mjs";

const { NumberField, ArrayField, SchemaField, StringField } = foundry.data.fields;

/**
 * @extends {actorBaseDataModel}
 */
class legadoDataModel extends actorBaseDataModel {
  /** @override */
  static defineSchema() {
    return {
      // PT: Inclui todos os campos herdados do modelo base de ator
      // EN: Includes all fields inherited from the parent actor base model
      ...super.defineSchema(),
      
      // PT: Identificador / Legado do personagem
      // EN: Legacy identifier / subtype of the character
      legado: new StringField({ required: true, initial: "" }),
      // PT:Quantidade de exaustões
      // EN: Number of exaustion entries
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
      )
    };
  }
}

export { legadoDataModel };
