/**
 * ==============================================================================
 * RELIC DATA MODEL / MODELO DE DADOS DE RELÍQUIA
 * ==============================================================================
 * PT: Modelo de dados para Relíquias: itens com habilidades e força de Véu (Potência de 0 a 3).
 * EN: Data model for Relics: unique items with abilities and Veil strength (Potency from 0 to 3).
 */

import { ActionDataModel } from "./ActionModel.mjs";
import { EquipmentBaseDataModel } from "./EquipmentModel.mjs";

const { NumberField, ArrayField, StringField, BooleanField, EmbeddedDataField } = foundry.data.fields;

/**
 * PT: Modelo de dados para Relíquias do sistema Gaia: Prelúdio.
 * EN: Data model for Relics in the Gaia: Prelúdio system.
 * @extends {EquipmentBaseDataModel}
 */
export class RelicDataModel extends EquipmentBaseDataModel {
  /** @override */
  static defineSchema() {
    return {
      // PT: Herda os campos base de equipamento (name, description, price, unity, equipped, quantity, actions)
      // EN: Inherits base equipment fields (name, description, price, unity, equipped, quantity, actions)
      ...super.defineSchema(),

      // PT: Categoria da relíquia (comum, incomum, rara, lendaria)
      // EN: Relic category (common, uncommon, rare, legendary)
      category: new StringField({
        required: true,
        initial: "comum",
        choices: ["comum", "incomum", "rara", "lendaria"]
      }),

      // PT: Valor de Potência de Véu da Relíquia (0: Comum, 1: Incomum, 2: Rara, 3: Lendária)
      // EN: Veil Potency value of the Relic (0: Common, 1: Uncommon, 2: Rare, 3: Legendary)
      potency: new NumberField({
        required: true,
        integer: true,
        initial: 0,
        min: 0,
        max: 3
      }),

      // PT: Indica se a relíquia está atualmente vinculada ao personagem (consome limite de 5 de Potência)
      // EN: Indicates if the relic is currently bound to the character (consumes 5 Potency limit)
      isBound: new BooleanField({
        required: true,
        initial: false
      }),

      // PT: Propriedades, notas ou palavras-chave especiais da Relíquia
      // EN: Special properties, notes, or keywords of the Relic
      properties: new StringField({
        required: false,
        initial: ""
      })
    };
  }

  /**
   * Prepara os dados derivados da Relíquia, garantindo coerência entre categoria e potência padrão se não alterada manualmente.
   * @override
   */
  prepareDerivedData() {
    super.prepareDerivedData();
    // Se a potência for inválida ou não definida, resolve pelo padrão da categoria
    if (this.potency === undefined || this.potency === null) {
      switch (this.category) {
        case "lendaria": this.potency = 3; break;
        case "rara": this.potency = 2; break;
        case "incomum": this.potency = 1; break;
        case "comum":
        default: this.potency = 0; break;
      }
    }
  }
}
