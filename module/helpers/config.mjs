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
 * PT: Tipos de Armadura.
 * EN: Armor Types.
 * @enum {string}
 */
GAIA.armorTypes = {
  robes: "GAIA.ArmorType.Robes",
  light: "GAIA.ArmorType.Light",
  medium: "GAIA.ArmorType.Medium",
  heavy: "GAIA.ArmorType.Heavy",
  shield: "GAIA.ArmorType.Shield"
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

GAIA.damageTypesFlat = {
  physical: "GAIA.DamageType.Physical",
  fire: "GAIA.DamageType.Fire",
  wind: "GAIA.DamageType.Wind",
  water: "GAIA.DamageType.Water",
  earth: "GAIA.DamageType.Earth",
  thunder: "GAIA.DamageType.Thunder",
  ice: "GAIA.DamageType.Ice",
  neutro: "GAIA.DamageType.Neutro",
  nature: "GAIA.DamageType.Nature",
  profane: "GAIA.DamageType.Profane",
  light: "GAIA.DamageType.Light",
  dark: "GAIA.DamageType.Dark",
  immaterial: "GAIA.DamageType.Immaterials"
};

/**
 * PT: Categorias de Equipamento.
 * EN: Equipment Categories.
 * @enum {string}
 */
GAIA.equipmentCategories = {
  common: "GAIA.EquipmentCategory.Common",
  utilitarian: "GAIA.EquipmentCategory.Utilitarian",
  potion: "GAIA.EquipmentCategory.Potion",
  toxic: "GAIA.EquipmentCategory.Toxic",
  vehicle: "GAIA.EquipmentCategory.Vehicle",
  vestuary: "GAIA.EquipmentCategory.Vestuary",
  rides: "GAIA.EquipmentCategory.Rides"
};
GAIA.weaponCategories ={
  light: "GAIA.WeaponCategory.light",
  heavy: "GAIA.WeaponCategory.heavy",
  ranged: "GAIA.WeaponCategory.ranged",
  magical: "GAIA.WeaponCategory.magical",
  special: "GAIA.WeaponCategory.special",
  improvized: "GAIA.WeaponCategory.improvized",
};

/**
 * PT: Categorias e Potências de Relíquias.
 * EN: Relic Categories and Potencies.
 */
GAIA.relicCategories = {
  comum: { label: "GAIA.RelicCategory.Common", potency: 0 },
  incomum: { label: "GAIA.RelicCategory.Uncommon", potency: 1 },
  rara: { label: "GAIA.RelicCategory.Rare", potency: 2 },
  lendaria: { label: "GAIA.RelicCategory.Legendary", potency: 3 }
};

/**
 * PT: Limite máximo padrão de pontos de Potência de Relíquias Vinculadas por personagem.
 * EN: Default maximum limit of bound relic potency points per character.
 */
GAIA.maxBoundRelicPotency = 5;
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
};
GAIA.creaturesType = {
  comum: "GAIA.CreatureType.comum",
  ferais: "GAIA.CreatureType.ferais",
  veu: "GAIA.CreatureType.veu",
  naovivo: "GAIA.CreatureType.naovivo",
  elemental: "GAIA.CreatureType.elemental",
  primas: "GAIA.CreatureType.primas",
  artifical: "GAIA.CreatureType.artifical",
  abisssal: "GAIA.CreatureType.abisssal",
  celestial: "GAIA.CreatureType.celestial"
};

GAIA.abilitiesTypes = {
  conjuracao: "GAIA.AbilitiesTypes.conjuracao",
  ataque_corpo_a_corpo: "GAIA.AbilitiesTypes.ataque_corpo_a_corpo",
  ataque_magico: "GAIA.AbilitiesTypes.ataque_magico",
  ataque_distancia: "GAIA.AbilitiesTypes.ataque_distancia",
  defesa: "GAIA.AbilitiesTypes.defesa",
  suporte: "GAIA.AbilitiesTypes.suporte",
  iniciativa: "GAIA.AbilitiesTypes.iniciativa",
  movimento: "GAIA.AbilitiesTypes.movimento",
  passiva: "GAIA.AbilitiesTypes.passiva",
  foco: "GAIA.AbilitiesTypes.foco",
  transformacao: "GAIA.AbilitiesTypes.transformacao"
};
GAIA.actionType = {
  acaoAtiva: "GAIA.ActionType.acaoAtiva",
  acaoSimples: "GAIA.ActionType.acaoSimples",
  acaoRapida: "GAIA.ActionType.acaoRapida",
  acaoAcelerada: "GAIA.ActionType.acaoAcelerada",
  acaoVersatil: "GAIA.ActionType.acaoVersatil"
};

GAIA.abilityCategories = {
  ofensiva: "GAIA.AbilityCategories.ofensiva",
  defensiva: "GAIA.AbilityCategories.defensiva",
  auxiliadora: "GAIA.AbilityCategories.auxiliadora",
  other: "GAIA.AbilityCategories.other"
};

/**
 * PT: Categorias de Características (Features).
 * EN: Feature Categories.
 * @enum {string}
 */
GAIA.featureCategories = {
  presenca: "GAIA.FeatureCategories.presenca",
  colera: "GAIA.FeatureCategories.colera",
  reducao: "GAIA.FeatureCategories.reducao",
  ofensiva: "GAIA.AbilityCategories.ofensiva",
  defensiva: "GAIA.AbilityCategories.defensiva",
  auxiliadora: "GAIA.AbilityCategories.auxiliadora",
  passiva: "GAIA.FeatureCategories.passiva",
  geral: "GAIA.FeatureCategories.geral"
};

/**
 * PT: Idiomas do sistema Gaia: Prelúdio organizados por categoria (Idiomas Antigos e Idiomas Aurorianos).
 * EN: Languages of the Gaia: Prelúdio system grouped by category (Ancient Languages and Aurorian Languages).
 * @enum {object}
 */
GAIA.languages = {
  ancient: {
    abissal: "GAIA.Language.Abissal",
    ancestral: "GAIA.Language.Ancestral",
    celestial: "GAIA.Language.Celestial",
    mistico: "GAIA.Language.Mistico",
    primae: "GAIA.Language.Primae",
    umbral: "GAIA.Language.Umbral"
  },
  aurorian: {
    elfico: "GAIA.Language.Elfico",
    krash_tar: "GAIA.Language.Krashtar",
    narzepiano: "GAIA.Language.Narzepiano",
    oceanico: "GAIA.Language.Oceanico",
    runnare: "GAIA.Language.Runnare",
    verto: "GAIA.Language.Verto"
  }
};

/**
 * PT: Mapeamento plano de todos os idiomas para busca rápida, tradução e descrições.
 * EN: Flat map of all languages for fast lookup, translation, and descriptions.
 */
GAIA.allLanguages = {
  abissal: {
    label: "GAIA.Language.Abissal",
    category: "ancient",
    categoryLabel: "GAIA.LanguageCategory.Ancient",
    description: "GAIA.LanguageDesc.Abissal"
  },
  ancestral: {
    label: "GAIA.Language.Ancestral",
    category: "ancient",
    categoryLabel: "GAIA.LanguageCategory.Ancient",
    description: "GAIA.LanguageDesc.Ancestral"
  },
  celestial: {
    label: "GAIA.Language.Celestial",
    category: "ancient",
    categoryLabel: "GAIA.LanguageCategory.Ancient",
    description: "GAIA.LanguageDesc.Celestial"
  },
  mistico: {
    label: "GAIA.Language.Mistico",
    category: "ancient",
    categoryLabel: "GAIA.LanguageCategory.Ancient",
    description: "GAIA.LanguageDesc.Mistico"
  },
  primae: {
    label: "GAIA.Language.Primae",
    category: "ancient",
    categoryLabel: "GAIA.LanguageCategory.Ancient",
    description: "GAIA.LanguageDesc.Primae"
  },
  umbral: {
    label: "GAIA.Language.Umbral",
    category: "ancient",
    categoryLabel: "GAIA.LanguageCategory.Ancient",
    description: "GAIA.LanguageDesc.Umbral"
  },
  elfico: {
    label: "GAIA.Language.Elfico",
    category: "aurorian",
    categoryLabel: "GAIA.LanguageCategory.Aurorian",
    description: "GAIA.LanguageDesc.Elfico"
  },
  krash_tar: {
    label: "GAIA.Language.Krashtar",
    category: "aurorian",
    categoryLabel: "GAIA.LanguageCategory.Aurorian",
    description: "GAIA.LanguageDesc.Krashtar"
  },
  narzepiano: {
    label: "GAIA.Language.Narzepiano",
    category: "aurorian",
    categoryLabel: "GAIA.LanguageCategory.Aurorian",
    description: "GAIA.LanguageDesc.Narzepiano"
  },
  oceanico: {
    label: "GAIA.Language.Oceanico",
    category: "aurorian",
    categoryLabel: "GAIA.LanguageCategory.Aurorian",
    description: "GAIA.LanguageDesc.Oceanico"
  },
  runnare: {
    label: "GAIA.Language.Runnare",
    category: "aurorian",
    categoryLabel: "GAIA.LanguageCategory.Aurorian",
    description: "GAIA.LanguageDesc.Runnare"
  },
  verto: {
    label: "GAIA.Language.Verto",
    category: "aurorian",
    categoryLabel: "GAIA.LanguageCategory.Aurorian",
    description: "GAIA.LanguageDesc.Verto"
  }
};

/**
 * PT: Níveis de Dificuldade (Dif.) do sistema Gaia: Prelúdio.
 * EN: Difficulty Levels and DC Ranges for the Gaia: Prelúdio system.
 * @enum {object}
 */
GAIA.difficultyLevels = {
  simple: {
    key: "simple",
    label: "GAIA.DifficultyLevel.Simple",
    min: 1,
    max: 3,
    example: "GAIA.DifficultyExample.Simple"
  },
  easy: {
    key: "easy",
    label: "GAIA.DifficultyLevel.Easy",
    min: 4,
    max: 6,
    example: "GAIA.DifficultyExample.Easy"
  },
  normal: {
    key: "normal",
    label: "GAIA.DifficultyLevel.Normal",
    min: 7,
    max: 9,
    example: "GAIA.DifficultyExample.Normal"
  },
  elevated: {
    key: "elevated",
    label: "GAIA.DifficultyLevel.Elevated",
    min: 10,
    max: 12,
    example: "GAIA.DifficultyExample.Elevated"
  },
  hard: {
    key: "hard",
    label: "GAIA.DifficultyLevel.Hard",
    min: 13,
    max: 15,
    example: "GAIA.DifficultyExample.Hard"
  },
  exceptional: {
    key: "exceptional",
    label: "GAIA.DifficultyLevel.Exceptional",
    min: 16,
    max: 18,
    example: "GAIA.DifficultyExample.Exceptional"
  }
};

/**
 * PT: Condições e Efeitos de Status do sistema Gaia: Prelúdio.
 * EN: Conditions and Status Effects for the Gaia: Prelúdio system.
 */
GAIA.conditions = {
  penumbra: {
    id: "penumbra",
    name: "GAIA.Condition.Penumbra",
    img: "systems/gaia-preludio/assets/conditions/penumbra.webp",
    icon: "systems/gaia-preludio/assets/conditions/penumbra.webp",
    description: "GAIA.Condition.PenumbraDesc"
  },
  escuridao: {
    id: "escuridao",
    name: "GAIA.Condition.Escuridao",
    img: "systems/gaia-preludio/assets/conditions/penumbra.webp",
    icon: "systems/gaia-preludio/assets/conditions/penumbra.webp",
    description: "GAIA.Condition.EscuridaoDesc"
  },
  atordoado: {
    id: "atordoado",
    name: "GAIA.Condition.Atordoado",
    img: "systems/gaia-preludio/assets/conditions/atordoado.webp",
    icon: "systems/gaia-preludio/assets/conditions/atordoado.webp",
    description: "GAIA.Condition.AtordoadoDesc"
  },
  enfraquecido: {
    id: "enfraquecido",
    name: "GAIA.Condition.Enfraquecido",
    img: "systems/gaia-preludio/assets/conditions/enfraquecido.webp",
    icon: "systems/gaia-preludio/assets/conditions/enfraquecido.webp",
    description: "GAIA.Condition.EnfraquecidoDesc"
  },
  lentidao: {
    id: "lentidao",
    name: "GAIA.Condition.Lentidao",
    img: "systems/gaia-preludio/assets/conditions/lentidao.webp",
    icon: "systems/gaia-preludio/assets/conditions/lentidao.webp",
    description: "GAIA.Condition.LentidaoDesc"
  },
  incapacitado: {
    id: "incapacitado",
    name: "GAIA.Condition.Incapacitado",
    img: "systems/gaia-preludio/assets/conditions/incapacitado.webp",
    icon: "systems/gaia-preludio/assets/conditions/incapacitado.webp",
    description: "GAIA.Condition.IncapacitadoDesc"
  },
  caido: {
    id: "caido",
    name: "GAIA.Condition.Caido",
    img: "systems/gaia-preludio/assets/conditions/caido.webp",
    icon: "systems/gaia-preludio/assets/conditions/caido.webp",
    description: "GAIA.Condition.CaidoDesc"
  },
  envenenado: {
    id: "envenenado",
    name: "GAIA.Condition.Envenenado",
    img: "systems/gaia-preludio/assets/conditions/envenenado.webp",
    icon: "systems/gaia-preludio/assets/conditions/envenenado.webp",
    description: "GAIA.Condition.EnvenenadoDesc"
  },
  fratura: {
    id: "fratura",
    name: "GAIA.Condition.Fratura",
    img: "systems/gaia-preludio/assets/conditions/fratura.webp",
    icon: "systems/gaia-preludio/assets/conditions/fratura.webp",
    description: "GAIA.Condition.FraturaDesc"
  },
  imovel: {
    id: "imovel",
    name: "GAIA.Condition.Imovel",
    img: "systems/gaia-preludio/assets/conditions/imovel.webp",
    icon: "systems/gaia-preludio/assets/conditions/imovel.webp",
    description: "GAIA.Condition.ImovelDesc"
  },
  sangramento: {
    id: "sangramento",
    name: "GAIA.Condition.Sangramento",
    img: "systems/gaia-preludio/assets/conditions/sangramento.webp",
    icon: "systems/gaia-preludio/assets/conditions/sangramento.webp",
    description: "GAIA.Condition.SangramentoDesc"
  }
};



