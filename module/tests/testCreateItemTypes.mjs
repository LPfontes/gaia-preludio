// testCreateItemTypes.mjs
/**
 * Test script to create one item of each registered item type (equipment, armor, weapon).
 *
 * Usage:
 *   In the Foundry console (F12) or a macro, import this module and call `testCreateItemTypes()`.
 *   Example macro code:
 *   ```js
 *   import './module/tests/testCreateItemTypes.mjs';
 *   testCreateItemTypes();
 *   ```
 *
 * This will create three Items in the current World (as the GM) and log the results.
 */
export async function testCreateItemTypes() {
  // Helper to create an item and log the outcome
  async function createItem(type, data) {
    try {
      const item = await Item.create({ type, ...data });
      console.log(`✅ Created ${type} item:`, item);
    } catch (err) {
      console.error(`❌ Failed to create ${type} item:`, err);
    }
  }

  // Equipment (base) item – uses the schema defined in EquipmentBaseDataModel
  await createItem("equipment", {
    name: "Espada Simples",
    system: {
      description: "Uma espada de ferro simples.",
      price: 10,
      category: "Arma",
      unity: 1
    }
  });

  // Armor item – extends equipment with a "block" field
  await createItem("armor", {
    name: "Armadura de Couro",
    system: {
      description: "Proteção leve de couro.",
      price: 20,
      category: "Armadura",
      unity: 1,
      block: 2
    }
  });

  // Weapon item – extends equipment with several extra fields
  await createItem("weapon", {
    name: "Machado de Batalha",
    system: {
      description: "Machado pesado para combate corpo a corpo.",
      price: 35,
      category: "Arma",
      unity: 1,
      weaponType: "Pesada",
      damageType: { value: 8, type: "slashing" },
      attackParameter: { value: 2, attribute: "strength" },
      range: { value: 5, type: "melee" },
      properties: ["versatile", "heavy"]
    }
  });
}


