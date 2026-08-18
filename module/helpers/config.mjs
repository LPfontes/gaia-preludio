/**
 * ==============================================================================
 * GAIA CONFIGURATION & ENUMS / CONFIGURAÇÕES E ENUMS GAIA
 * ==============================================================================
 * PT: Objeto de configuração e Enums globais do sistema Gaia: Prelúdio.
 *     Disponibilizado globalmente em `CONFIG.GAIA` no hook 'init'.
 * EN: Global configuration object and Enums for the Gaia: Prelúdio system.
 *     Made available globally at `CONFIG.GAIA` during the 'init' hook.
 */
export const GAIA = {};

/**
 * PT: Parâmetros / Atributos base do sistema.
 * EN: Base parameters / Attributes of the system.
 * @enum {string}
 */
GAIA.parameters = {
  precision: "GAIA.Parameter.Precision",
  brutality: "GAIA.Parameter.Brutality",
  dexterity: "GAIA.Parameter.Dexterity",
  agility: "GAIA.Parameter.Agility",
  channeling: "GAIA.Parameter.Channeling",
  arcane: "GAIA.Parameter.Arcane",
  spirit: "GAIA.Parameter.Spirit",
  vigor: "GAIA.Parameter.Vigor"
};

/**
 * PT: Conhecimentos (Perícias) do sistema Gaia: Prelúdio.
 * EN: Knowledge (Skills) of the Gaia: Prelúdio system.
 * @enum {string}
 */
GAIA.knowledge = {
  charisma: "GAIA.Knowledge.Charisma",
  mystic_knowledge: "GAIA.Knowledge.MysticKnowledge",
  exploration: "GAIA.Knowledge.Exploration",
  stealth: "GAIA.Knowledge.Stealth",
  history: "GAIA.Knowledge.History",
  intimidation: "GAIA.Knowledge.Intimidation",
  intuition: "GAIA.Knowledge.Intuition",
  medicine: "GAIA.Knowledge.Medicine",
  perception: "GAIA.Knowledge.Perception",
  performance: "GAIA.Knowledge.Performance",
  religion: "GAIA.Knowledge.Religion",
  survival: "GAIA.Knowledge.Survival",
  technology: "GAIA.Knowledge.Technology",
  willpower: "GAIA.Knowledge.Willpower"
};

/**
 * PT: Maestrias organizadas por Conhecimento (3 para cada conhecimento).
 * EN: Masteries grouped by Knowledge (3 for each knowledge category).
 */
GAIA.masteries = {
  charisma: {
    fast_talk: "GAIA.Mastery.FastTalk",
    oratory: "GAIA.Mastery.Oratory",
    persuasion: "GAIA.Mastery.Persuasion"
  },
  mystic_knowledge: {
    ancient_language: "GAIA.Mastery.AncientLanguage",
    mystic_mechanisms: "GAIA.Mastery.MysticMechanisms",
    planes: "GAIA.Mastery.Planes"
  },
  exploration: {
    animal_driving: "GAIA.Mastery.AnimalDriving",
    mechanical_driving: "GAIA.Mastery.MechanicalDriving",
    navigation: "GAIA.Mastery.Navigation"
  },
  stealth: {
    disguise: "GAIA.Mastery.Disguise",
    dissimulation: "GAIA.Mastery.Dissimulation",
    concealment: "GAIA.Mastery.Concealment"
  },
  history: {
    aurorian_language: "GAIA.Mastery.AurorianLanguage",
    culture: "GAIA.Mastery.Culture",
    locations: "GAIA.Mastery.Locations"
  },
  intimidation: {
    frighten: "GAIA.Mastery.Frighten",
    coerce: "GAIA.Mastery.Coerce",
    taunt: "GAIA.Mastery.Taunt"
  },
  intuition: {
    understanding: "GAIA.Mastery.Understanding",
    instinct: "GAIA.Mastery.Instinct",
    deduction: "GAIA.Mastery.Deduction"
  },
  medicine: {
    anatomy: "GAIA.Mastery.Anatomy",
    diseases: "GAIA.Mastery.Diseases",
    first_aid: "GAIA.Mastery.FirstAid"
  },
  perception: {
    investigation: "GAIA.Mastery.Investigation",
    perspicacity: "GAIA.Mastery.Perspicacity",
    vigilance: "GAIA.Mastery.Vigilance"
  },
  performance: {
    acting: "GAIA.Mastery.Acting",
    aesthetics: "GAIA.Mastery.Aesthetics",
    rhythm: "GAIA.Mastery.Rhythm"
  },
  religion: {
    customs: "GAIA.Mastery.Customs",
    divine_history: "GAIA.Mastery.DivineHistory",
    symbology: "GAIA.Mastery.Symbology"
  },
  survival: {
    shelters: "GAIA.Mastery.Shelters",
    animals: "GAIA.Mastery.Animals",
    plants: "GAIA.Mastery.Plants"
  },
  technology: {
    improvisation: "GAIA.Mastery.Improvisation",
    physical_mechanisms: "GAIA.Mastery.PhysicalMechanisms",
    sabotage: "GAIA.Mastery.Sabotage"
  },
  willpower: {
    self_control: "GAIA.Mastery.SelfControl",
    courage: "GAIA.Mastery.Courage",
    determination: "GAIA.Mastery.Determination"
  }
};

/**
 * PT: Lista plana de todas as maestrias para busca rápida e mapeamento direto.
 * EN: Flat map of all masteries for fast lookup and direct mapping.
 */
GAIA.allMasteries = Object.entries(GAIA.masteries).reduce((acc, [knowledgeKey, group]) => {
  for (const [masteryKey, labelKey] of Object.entries(group)) {
    acc[masteryKey] = {
      label: labelKey,
      knowledge: knowledgeKey
    };
  }
  return acc;
}, /** @type {Record<string, {label: string, knowledge: string}>} */ ({}));

/**
 * PT: Tipos de Armas.
 * EN: Weapon Types.
 * @enum {string}
 */
GAIA.weaponTypes = {
  light: "GAIA.WeaponType.Light",
  medium: "GAIA.WeaponType.Medium",
  heavy: "GAIA.WeaponType.Heavy",
  ranged: "GAIA.WeaponType.Ranged",
  magical: "GAIA.WeaponType.Magical"
};

/**
 * PT: Tipos de Dano.
 * EN: Damage Types.
 * @enum {string|object}
 */
GAIA.damageTypes = {
  physical: "GAIA.DamageType.Physical",
  magical: {
    elemental: {
      fire: "GAIA.DamageType.Fire",
      wind: "GAIA.DamageType.Wind",
      water: "GAIA.DamageType.Water",
      earth: "GAIA.DamageType.Earth",
      thunder: "GAIA.DamageType.Thunder",
      ice: "GAIA.DamageType.Ice",
      
    },
    neutro: "GAIA.DamageType.Neutro",
    nature: "GAIA.DamageType.Nature",
    profane: "GAIA.DamageType.Profane",
    light: "GAIA.DamageType.Light",
    dark: "GAIA.DamageType.Dark"
    
  },
  Immaterials: "GAIA.DamageType.Immaterials",
  
};

/**
 * PT: Categorias de Equipamento.
 * EN: Equipment Categories.
 * @enum {string}
 */
GAIA.equipmentCategories = {
  weapon: "GAIA.EquipmentCategory.Weapon",
  armor: "GAIA.EquipmentCategory.Armor",
  shield: "GAIA.EquipmentCategory.Shield",
  common: "GAIA.EquipmentCategory.Common",
  utilitarian: "GAIA.EquipmentCategory.Utilitarian",
  potion: "GAIA.EquipmentCategory.Potion",
  toxic: "GAIA.EquipmentCategory.Toxic",
  vehicle: "GAIA.EquipmentCategory.Vehicle",
  vestuary: "GAIA.EquipmentCategory.Vestuary",
  rides: "GAIA.EquipmentCategory.Rides"
};
/**
 * PT: Tipos de Rolagem.
 * EN: Roll Types.
 * @enum {string}
 */
GAIA.rollTypes = {
  standard:{roll:"1d12",label:"GAIA.RollType.Standard"},
  advantage:{roll:"2d12kh",label:"GAIA.RollType.Advantage"},
  disadvantage:{roll:"2d12kl",label:"GAIA.RollType.Disadvantage"},
  supAdvantage:{roll:"3d12kh",label:"GAIA.RollType.SupAdvantage"},
  supDisadvantage:{roll:"3d12kl",label:"GAIA.RollType.SupDisadvantage"},
}

