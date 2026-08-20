/**
 * ==============================================================================
 * EQUIPMENT DATA MODELS / MODELOS DE DADOS DE EQUIPAMENTO
 * ==============================================================================
 * PT: Modelos de dados para Itens: Equipamento Base, Armadura e Arma.
 * EN: Data models for Items: Base Equipment, Armor, and Weapon.
 */

const { NumberField, ArrayField, SchemaField, StringField, BooleanField } = foundry.data.fields;

/**
 * PT: Modelo de dados base para todos os tipos de equipamentos e itens comuns.
 * EN: Base data model for all equipment types and common inventory items.
 * @extends {foundry.abstract.TypeDataModel<any, any>}
 */
export class EquipmentBaseDataModel extends foundry.abstract.TypeDataModel {
  /** @override */
  static defineSchema() {
    return {
      // PT: Nome do equipamento
      // EN: Equipment name
      name: new StringField({ required: true }),

      // PT: Descrição detalhada do item
      // EN: Detailed description of the item
      description: new StringField({ required: false, initial: "" }),

      // PT: Preço ou custo do item em moedas
      // EN: Price or coin cost of the item
      price: new NumberField({ required: true, initial: 0, integer: true, min: 0 }),

      // PT: Categoria do equipamento (weapon, armor, accessory, consumable, etc.)
      // EN: Equipment category (weapon, armor, accessory, consumable, etc.)
      category: new StringField({ required: true, initial: "other" }),

      // PT: Unidades / peso / espaço ocupado pelo item
      // EN: Units / weight / inventory slots occupied by the item
      unity: new NumberField({ required: true, initial: 1, min: 0 }),
      // PT: Indica se o item está equipado
      // EN: Indicates if the item is equipped
      equipped: new BooleanField({ required: true, initial: false }),
      // PT: Quantidade do item
      // EN: Quantity of the item
      quantity: new NumberField({ required: true, initial: 1, integer: true, min: 1 })

    };
  }
}

/**
 * PT: Modelo de dados para Armaduras e proteções, estendendo o equipamento base.
 * EN: Data model for Armors and protection items, extending base equipment.
 * @extends {EquipmentBaseDataModel}
 */
export class ArmorDataModel extends EquipmentBaseDataModel {
  /** @override */
  static defineSchema() {
    return {
      // PT: Herda os campos base de equipamento (name, description, price, category, unity)
      // EN: Inherits base equipment fields (name, description, price, category, unity)
      ...super.defineSchema(),

      // PT: Valor de bloqueio / proteção adicional fornecido pela armadura
      // EN: Defensive block / protection value provided by the armor
      block: new NumberField({ required: true, integer: true, initial: 0, min: 0 })
    };
  }
}

/**
 * PT: Modelo de dados para Armas e instrumentos de combate, estendendo o equipamento base.
 * EN: Data model for Weapons and combat implements, extending base equipment.
 * @extends {EquipmentBaseDataModel}
 */
export class WeaponDataModel extends EquipmentBaseDataModel {
  /** @override */
  static defineSchema() {
    return {
      // PT: Herda os campos base de equipamento (name, description, price, category, unity)
      // EN: Inherits base equipment fields (name, description, price, category, unity)
      ...super.defineSchema(),

      // PT: Classificação da arma (light, heavy, ranged)
      // EN: Weapon type classification (light, heavy, ranged)
      weaponType: new StringField({ required: true, initial: "light" }),

      // PT: Informações de dano (valor base e tipo de dano como slashing, piercing, fire, etc.)
      // EN: Damage information (base value and damage type like slashing, piercing, fire, etc.)
      damageType: new SchemaField({
        value: new NumberField({ required: true, integer: true, initial: 1, min: 0 }),
        type: new StringField({ required: true, initial: "slashing" })
      }),

      // PT: Parâmetro / Atributo utilizado para calcular o teste de ataque
      // EN: Parameter / Attribute used to calculate the attack roll
      attackParameter: new SchemaField({
        value: new NumberField({ required: true, integer: true, initial: 0 }),
        attribute: new StringField({ required: true, initial: "strength" })
      }),

      // PT: Alcance da arma (distância máxima e tipo corpo a corpo/distância)
      // EN: Weapon range (effective range value and melee/ranged classification)
      range: new SchemaField({
        value: new NumberField({ required: true, integer: true, initial: 1, min: 0 }),
        type: new StringField({ required: true, initial: "melee" })
      }),

      // PT: Lista de propriedades especiais da arma (ex: versátil, pesada, arremesso)
      // EN: List of special weapon properties (e.g. versatile, heavy, thrown)
      properties: new ArrayField(new StringField({ required: true }), { required: true, initial: [] })
    };
  }
}

