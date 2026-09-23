import { CARACTERISTICAS_DATA, CARACTERISTICAS_FOLDERS_DATA } from "./datasets/caracteristicas-dataset.mjs";

/**
 * ==============================================================================
 * REGRAS DO HOMUNCULARIUM - CARACTERÍSTICAS ADICIONAIS DE LIVRO
 * ==============================================================================
 * Regra Oficial: Criaturas do Homuncularium com, pelo menos, uma Característica
 * de um determinado Livro recebem automaticamente a Característica Adicional
 * bônus do respectivo livro.
 */

export const HOMUNCULARIUM_BOOKS = {
  "fldfeat020000000": {
    folderId: "fldfeat020000000",
    bookName: "Seres Ferais",
    bonusFeatureId: "feat001800000000",
    bonusFeatureName: "Selvageria",
    icon: "modules/gaia-compendium-manager/assets/caracteristicas/Seres Ferais.png"
  },
  "fldfeat030000000": {
    folderId: "fldfeat030000000",
    bookName: "Seres do Véu",
    bonusFeatureId: "feat003900000000",
    bonusFeatureName: "Cria do Véu",
    icon: "modules/gaia-compendium-manager/assets/caracteristicas/Seres do Veu.png"
  },
  "fldfeat040000000": {
    folderId: "fldfeat040000000",
    bookName: "Seres Não-Vivos",
    bonusFeatureId: "feat005900000000",
    bonusFeatureName: "Corpo Apodrecido",
    icon: "modules/gaia-compendium-manager/assets/caracteristicas/Seres Nao-Vivos.png"
  },
  "fldfeat050000000": {
    folderId: "fldfeat050000000",
    bookName: "Seres Elementais",
    bonusFeatureId: "feat008000000000",
    bonusFeatureName: "Núcleo Elemental",
    icon: "modules/gaia-compendium-manager/assets/caracteristicas/Seres Elementais.png"
  },
  "fldfeat060000000": {
    folderId: "fldfeat060000000",
    bookName: "Seres Primais",
    bonusFeatureId: "feat010000000000",
    bonusFeatureName: "Nascido da Natureza",
    icon: "modules/gaia-compendium-manager/assets/caracteristicas/Seres Primais.png"
  },
  "fldfeat070000000": {
    folderId: "fldfeat070000000",
    bookName: "Seres Artificiais",
    bonusFeatureId: "feat012000000000",
    bonusFeatureName: "Armamentos Naturais",
    icon: "modules/gaia-compendium-manager/assets/caracteristicas/Seres Artificiais.png"
  },
  "fldfeat080000000": {
    folderId: "fldfeat080000000",
    bookName: "Seres Abissais",
    bonusFeatureId: "feat020300000000",
    bonusFeatureName: "Ascensão Abissal",
    icon: "modules/gaia-compendium-manager/assets/caracteristicas/Seres Abissais.png"
  },
  "fldfeat090000000": {
    folderId: "fldfeat090000000",
    bookName: "Seres Celestiais",
    bonusFeatureId: "feat020600000000",
    bonusFeatureName: "Ascensão Celestial",
    icon: "modules/gaia-compendium-manager/assets/caracteristicas/Seres Celestiais.png"
  }
};

/** Cache de resolução rápida: ID ou Nome normalizado -> Folder ID */
const _featureToFolderCache = new Map();
for (const item of CARACTERISTICAS_DATA) {
  if (item._id && item.folder) _featureToFolderCache.set(item._id, item.folder);
  if (item.name && item.folder) _featureToFolderCache.set(item.name.trim().toLowerCase(), item.folder);
}

/**
 * Identifica o ID da pasta (Livro) a que pertence uma determinada Característica.
 * @param {object} feature - Objeto de característica (item, document, ou item indexado)
 * @returns {string|null} ID da pasta do Livro ou null
 */
export function getBookFolderForFeature(feature) {
  if (!feature) return null;

  // 1. Verificação direta por folder
  if (feature.folder && HOMUNCULARIUM_BOOKS[feature.folder]) {
    return feature.folder;
  }

  // 2. Verificação por ID
  const featId = feature._id || feature.id;
  if (featId && _featureToFolderCache.has(featId)) {
    return _featureToFolderCache.get(featId);
  }

  // 3. Verificação por UUID (extrai o ID final se terminar em feat...)
  if (feature.uuid) {
    const match = feature.uuid.match(/feat\d+/);
    if (match && _featureToFolderCache.has(match[0])) {
      return _featureToFolderCache.get(match[0]);
    }
  }

  // 4. Verificação por nome
  const featName = (feature.name || feature.system?.name || "").trim().toLowerCase();
  if (featName && _featureToFolderCache.has(featName)) {
    return _featureToFolderCache.get(featName);
  }

  // 5. Verificação por campo book
  const bookName = (feature.system?.book || "").trim().toLowerCase();
  if (bookName) {
    for (const [folderId, book] of Object.entries(HOMUNCULARIUM_BOOKS)) {
      if (book.bookName.toLowerCase() === bookName) return folderId;
    }
  }

  return null;
}

/**
 * Calcula as Características Adicionais bônus devidas a uma criatura com base na lista de características fornecidas.
 * @param {Array<object>} features - Lista de características selecionadas ou presentes
 * @returns {Array<{ folderId: string, bookName: string, bonusFeatureId: string, bonusFeatureName: string, uuid: string, img: string, itemData: object }>}
 */
export function calculateHomunculariumBookBonuses(features = []) {
  if (!Array.isArray(features) || features.length === 0) return [];

  // Mapeia quais livros estão presentes
  const detectedFolders = new Set();

  for (const feat of features) {
    const folderId = getBookFolderForFeature(feat);
    if (folderId && HOMUNCULARIUM_BOOKS[folderId]) {
      detectedFolders.add(folderId);
    }
  }

  const bonuses = [];

  for (const folderId of detectedFolders) {
    const book = HOMUNCULARIUM_BOOKS[folderId];
    if (!book) continue;

    // Obtém o documento base do dataset
    const baseItemData = CARACTERISTICAS_DATA.find(i => i._id === book.bonusFeatureId) || null;
    const uuid = `Compendium.gaia-compendium-manager.caracteristicas.Item.${book.bonusFeatureId}`;
    const img = book.icon || baseItemData?.img || "icons/svg/aura.svg";

    bonuses.push({
      folderId: book.folderId,
      bookName: book.bookName,
      bonusFeatureId: book.bonusFeatureId,
      bonusFeatureName: book.bonusFeatureName,
      name: book.bonusFeatureName,
      uuid,
      img,
      isBookBonus: true,
      itemData: baseItemData ? (globalThis.foundry?.utils?.deepClone ? globalThis.foundry.utils.deepClone(baseItemData) : JSON.parse(JSON.stringify(baseItemData))) : null
    });
  }

  return bonuses;
}

/**
 * Obtém os documentos completos para as características adicionais dos livros.
 * Tenta carregar do compêndio via fromUuid, com fallback para os dados canônicos em CARACTERISTICAS_DATA.
 * @param {Array<object>} bonusList - Lista retornada por calculateHomunculariumBookBonuses
 * @returns {Promise<Array<object>>} Dados de documentos de Item prontos para createEmbeddedDocuments
 */
export async function resolveBookBonusItemDocs(bonusList = []) {
  const docs = [];

  for (const bonus of bonusList) {
    let docObj = null;

    // Tenta carregar via compêndio
    try {
      if (typeof fromUuid === "function" && bonus.uuid) {
        const compDoc = await fromUuid(bonus.uuid);
        if (compDoc) {
          docObj = compDoc.toObject();
        }
      }
    } catch {
      // Ignora erro e utiliza o dataset local
    }

    // Fallback: CARACTERISTICAS_DATA
    if (!docObj && bonus.itemData) {
      docObj = globalThis.foundry?.utils?.deepClone
        ? globalThis.foundry.utils.deepClone(bonus.itemData)
        : JSON.parse(JSON.stringify(bonus.itemData));
      delete docObj._key;
      // Garante que o tipo seja "ability" para o sistema Gaia: Prelúdio
      docObj.type = "ability";
      if (!docObj.system) docObj.system = {};
      docObj.system.category = "caracteristica";
      docObj.system.typeAbility = "caracteristica";
    }

    if (docObj) {
      // Marca sinalizador de característica adicional de livro
      docObj.flags = docObj.flags || {};
      docObj.flags["gaia-preludio"] = docObj.flags["gaia-preludio"] || {};
      docObj.flags["gaia-preludio"].isBookBonus = true;
      docObj.flags["gaia-preludio"].bookName = bonus.bookName;
      docs.push(docObj);
    }
  }

  return docs;
}

/**
 * ==============================================================================
 * ATAQUES DO HOMUNCULARIUM - GOLPE BRUTAL E EVOCAÇÃO MÍSTICA
 * ==============================================================================
 * Regra Oficial: Todo personagem ou criatura que possua, pelo menos, uma
 * Característica do Homuncularium terá acesso a dois tipos de ataques diferentes:
 * Golpe Brutal e Evocação Mística.
 */

/**
 * Calcula a fórmula dinâmica de dano e metadados para ataques do Homuncularium (Golpe Brutal e Evocação Mística).
 * Regra Oficial: 1d8 de dano para cada ponto de Poder (ou 1d10 em Dificuldade Difícil ou Extrema).
 * @param {Actor|null} actor - Documento do Ator proprietário
 * @param {Item|string|null} [itemOrType=null] - Item ou identificador do tipo ("golpeBrutal" ou "evocacaoMistica")
 * @returns {{
 *   power: number,
 *   die: string,
 *   formula: string,
 *   damageType: string,
 *   damageTypeLabel: string,
 *   damageText: string
 * }}
 */
export function getHomunculariumDamageFormula(actor, itemOrType = null) {
  const power = Math.max(1, Number(actor?.system?.powerPoints ?? 1));
  const rawDiff = String(actor?.system?.difficulty ?? "").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const useD10 = rawDiff === "dificil" || rawDiff === "extrema";
  const die = useD10 ? "d10" : "d8";
  const formula = `${power}${die}`;

  const itemName = typeof itemOrType === "string" ? itemOrType : (itemOrType?.name ?? "");
  const itemAttackType = typeof itemOrType === "object" ? itemOrType?.flags?.["gaia-preludio"]?.attackType : itemOrType;
  const isEvocacao = itemAttackType === "evocacaoMistica" ||
    itemName.toLowerCase().includes("evocação") ||
    itemName.toLowerCase().includes("evocacao");

  const rawType = (typeof itemOrType === "object" && itemOrType?.system?.damageType?.type)
    ? itemOrType.system.damageType.type
    : (isEvocacao ? "neutro" : "physical");

  const config = globalThis.CONFIG?.GAIA;
  const locKey = config?.damageTypesFlat?.[rawType] ?? config?.damageTypes?.[rawType] ?? rawType;
  const damageTypeLabel = rawType ? (game.i18n.localize(locKey) || rawType) : "";
  const damageText = `${formula} ${damageTypeLabel}`.trim();

  return {
    power,
    die,
    formula,
    damageType: rawType,
    damageTypeLabel,
    damageText
  };
}

/**
 * Retorna a definição completa de dados do Item padrão para um ataque do Homuncularium.
 * @param {"golpeBrutal"|"evocacaoMistica"} attackType - Tipo de ataque
 * @param {Actor|null} [actor=null] - Documento do Ator proprietário para cálculo dinâmico de dados
 * @returns {object} Objeto de dados do Item (type: "weapon")
 */
export function getHomunculariumAttackData(attackType, actor = null) {
  const dmg = getHomunculariumDamageFormula(actor, attackType);
  const formula = dmg.formula;

  if (attackType === "golpeBrutal") {
    return {
      name: "Golpe Brutal",
      type: "weapon",
      img: "systems/gaia-preludio/assets/golpe-brutal.jpg",
      flags: {
        "gaia-preludio": {
          isHomunculariumAttack: true,
          attackType: "golpeBrutal"
        }
      },
      system: {
        name: "Golpe Brutal",
        description: "A criatura realiza um Ataque Físico com alguma parte do seu corpo contra um Alvo a até 1 metro. Caso tenha sucesso, causará no Alvo 1d8 de Dano Físico para cada ponto de Poder que possua (1d10 para Dificuldade Difícil ou Extrema).<br><br>Ao realizar esse Ataque Físico, a criatura poderá utilizar a sua Ação Simples, Ação Rápida ou 1 Ponto de Energia para aumentar o alcance desse Ataque Físico em 3 metros.<br><br><em>Esse tipo de ataque não é considerado um Ataque Desarmado.</em>",
        price: 0,
        category: "Armamento Natural",
        unity: 0,
        equipped: true,
        quantity: 1,
        weaponType: "light",
        damageType: {
          value: 1,
          type: "physical"
        },
        attackParameter: {
          value: 0,
          attribute: "precision"
        },
        range: {
          value: 1,
          type: "melee"
        },
        properties: [
          {
            name: "Ataque Físico",
            description: "Ataque corporal direto (não considerado Ataque Desarmado)."
          },
          {
            name: "Alcance Estendido",
            description: "Pode gastar Ação Simples, Ação Rápida ou 1 PE para +3 metros de alcance."
          }
        ],
        actions: [
          {
            id: "golpe-brutal-base",
            name: "Golpe Brutal",
            description: `A criatura realiza um Ataque Físico contra um Alvo a até 1 metro. Causa ${formula} de Dano Físico.`,
            cost: "",
            type: {
              actionType: "acaoAtiva",
              category: "ataque_corpo_a_corpo",
              tags: ["ataque_fisico"]
            },
            attack: {
              hasAttack: true,
              attribute: "precision",
              knowledge: "",
              bonus: "",
              rollType: "standard"
            },
            damage: {
              hasDamage: true,
              formula: formula,
              type: "physical",
              criticalBonus: "",
              scaling: "1 dado por ponto de Poder"
            }
          },
          {
            id: "golpe-brutal-alcance",
            name: "Golpe Brutal Estendido",
            description: `Ataque Físico com alcance aumentado para 4 metros ao custo de 1 PE, Ação Simples ou Ação Rápida. Causa ${formula} de Dano Físico.`,
            cost: "1 PE",
            type: {
              actionType: "acaoAtiva",
              category: "ataque_corpo_a_corpo",
              tags: ["ataque_fisico", "alcance_estendido"]
            },
            attack: {
              hasAttack: true,
              attribute: "precision",
              knowledge: "",
              bonus: "",
              rollType: "standard"
            },
            damage: {
              hasDamage: true,
              formula: formula,
              type: "physical",
              criticalBonus: "",
              scaling: "1 dado por ponto de Poder"
            }
          }
        ]
      }
    };
  }

  // Evocação Mística
  return {
    name: "Evocação Mística",
    type: "weapon",
    img: "systems/gaia-preludio/assets/evocacao-mistica.jpg",
    flags: {
      "gaia-preludio": {
        isHomunculariumAttack: true,
        attackType: "evocacaoMistica"
      }
    },
    system: {
      name: "Evocação Mística",
      description: "A criatura canaliza o Véu ao seu redor e realiza Ataque Mágico contra um Alvo a até 8 metros. Caso tenha sucesso, causará no Alvo 1d8 de Dano Mágico Neutro para cada ponto de Poder que possua (1d10 para Dificuldade Difícil ou Extrema).",
      price: 0,
      category: "Armamento Mágico",
      unity: 0,
      equipped: true,
      quantity: 1,
      weaponType: "ranged",
      damageType: {
        value: 1,
        type: "neutro"
      },
      attackParameter: {
        value: 0,
        attribute: "channeling"
      },
      range: {
        value: 8,
        type: "ranged"
      },
      properties: [
        {
          name: "Ataque Mágico",
          description: "Canalização mística do Véu."
        },
        {
          name: "Conjuração",
          description: "Custa 1 Ponto de Energia."
        }
      ],
      actions: [
        {
          id: "evocacao-mistica-base",
          name: "Evocação Mística",
          description: `A criatura canaliza o Véu ao seu redor e realiza Ataque Mágico contra um Alvo a até 8 metros. Causa ${formula} de Dano Mágico Neutro.`,
          cost: "1 PE",
          type: {
            actionType: "acaoAtiva",
            category: "ataque_magico",
            tags: ["ataque_magico", "conjuracao"]
          },
          attack: {
            hasAttack: true,
            attribute: "channeling",
            knowledge: "",
            bonus: "",
            rollType: "standard"
          },
          damage: {
            hasDamage: true,
            formula: formula,
            type: "neutro",
            criticalBonus: "",
            scaling: "1 dado por ponto de Poder"
          }
        }
      ]
    }
  };
}

/**
 * Garante que o Ator possua os itens padrão "Golpe Brutal" e "Evocação Mística"
 * caso possua ao menos 1 Característica do Homuncularium.
 * @param {Actor} actor - Ator a ser verificado
 * @returns {Promise<Array<Item>>}
 */
export async function ensureHomunculariumAttacks(actor) {
  if (!actor?.items) return [];

  const features = actor.items.filter(i => i.type === "feature" || i.type === "ability");
  const hasHomunculariumFeature = features.some(feat => getBookFolderForFeature(feat) !== null);
  if (!hasHomunculariumFeature) return [];

  const existingGolpe = actor.items.find(i =>
    i.type === "weapon" && (i.name === "Golpe Brutal" || i.flags?.["gaia-preludio"]?.attackType === "golpeBrutal")
  );
  const existingEvocacao = actor.items.find(i =>
    i.type === "weapon" && (i.name === "Evocação Mística" || i.flags?.["gaia-preludio"]?.attackType === "evocacaoMistica")
  );

  const toCreate = [];
  if (!existingGolpe) {
    toCreate.push(getHomunculariumAttackData("golpeBrutal", actor));
  }
  if (!existingEvocacao) {
    toCreate.push(getHomunculariumAttackData("evocacaoMistica", actor));
  }

  if (toCreate.length > 0) {
    return await actor.createEmbeddedDocuments("Item", toCreate);
  }
  return [];
}

/**
 * Sincroniza a fórmula de dano dos itens Golpe Brutal e Evocação Mística quando
 * o Poder ou Dificuldade da criatura for alterado.
 * @param {Actor} actor - Ator proprietário
 * @returns {Promise<void>}
 */
export async function syncHomunculariumAttackFormulas(actor) {
  if (!actor?.items) return;
  const updates = [];
  for (const item of actor.items) {
    if (item.type !== "weapon") continue;
    const isGolpe = item.name === "Golpe Brutal" || item.flags?.["gaia-preludio"]?.attackType === "golpeBrutal";
    const isEvocacao = item.name === "Evocação Mística" || item.flags?.["gaia-preludio"]?.attackType === "evocacaoMistica";
    if (!isGolpe && !isEvocacao) continue;

    const dmg = getHomunculariumDamageFormula(actor, isGolpe ? "golpeBrutal" : "evocacaoMistica");
    const currentActions = item.system?.actions ?? [];
    let changed = false;
    const newActions = currentActions.map(act => {
      if (act.damage?.hasDamage && act.damage.formula !== dmg.formula) {
        changed = true;
        return {
          ...act,
          description: act.description ? act.description.replace(/\d+d(8|10)/g, dmg.formula) : act.description,
          damage: {
            ...act.damage,
            formula: dmg.formula,
            type: act.damage.type || dmg.damageType
          }
        };
      }
      return act;
    });

    if (changed) {
      updates.push({
        _id: item.id,
        "system.actions": newActions
      });
    }
  }

  if (updates.length > 0) {
    await actor.updateEmbeddedDocuments("Item", updates);
  }
}
