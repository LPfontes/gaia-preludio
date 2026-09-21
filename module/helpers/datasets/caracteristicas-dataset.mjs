// ==============================================================================
// GAIA: O PRELÚDIO - DATASET OFICIAL DE CARACTERÍSTICAS DO HOMUNCULARIUM
// ==============================================================================
// Extraído canonicamente a partir dos 9 Livros do Homuncularium.
// Contém todas as Características categorizadas por Livro e Dificuldade.
// ==============================================================================

export const CARACTERISTICAS_FOLDERS_DATA = [
  {
    "_id": "fldfeat010000000",
    "name": "Seres Comuns",
    "type": "Item",
    "sorting": "a",
    "color": "#263238",
    "_key": "!folders!fldfeat010000000"
  },
  {
    "_id": "fldfeat020000000",
    "name": "Seres Ferais",
    "type": "Item",
    "sorting": "a",
    "color": "#1b4332",
    "_key": "!folders!fldfeat020000000"
  },
  {
    "_id": "fldfeat030000000",
    "name": "Seres do Véu",
    "type": "Item",
    "sorting": "a",
    "color": "#3b0764",
    "_key": "!folders!fldfeat030000000"
  },
  {
    "_id": "fldfeat040000000",
    "name": "Seres Não-Vivos",
    "type": "Item",
    "sorting": "a",
    "color": "#1e293b",
    "_key": "!folders!fldfeat040000000"
  },
  {
    "_id": "fldfeat050000000",
    "name": "Seres Elementais",
    "type": "Item",
    "sorting": "a",
    "color": "#7c2d12",
    "_key": "!folders!fldfeat050000000"
  },
  {
    "_id": "fldfeat060000000",
    "name": "Seres Primais",
    "type": "Item",
    "sorting": "a",
    "color": "#2d4a22",
    "_key": "!folders!fldfeat060000000"
  },
  {
    "_id": "fldfeat070000000",
    "name": "Seres Artificiais",
    "type": "Item",
    "sorting": "a",
    "color": "#004d40",
    "_key": "!folders!fldfeat070000000"
  },
  {
    "_id": "fldfeat080000000",
    "name": "Seres Abissais",
    "type": "Item",
    "sorting": "a",
    "color": "#450a0a",
    "_key": "!folders!fldfeat080000000"
  },
  {
    "_id": "fldfeat090000000",
    "name": "Seres Celestiais",
    "type": "Item",
    "sorting": "a",
    "color": "#713f12",
    "_key": "!folders!fldfeat090000000"
  }
];

export const CARACTERISTICAS_DATA = [
  {
    "_id": "feat000100000000",
    "name": "Anfíbio",
    "type": "feature",
    "img": "icons/creatures/abilities/pawprint-tan.svg",
    "folder": "fldfeat010000000",
    "_key": "!items!feat000100000000",
    "system": {
      "name": "Anfíbio",
      "description": "Essa criatura respira e enxerga dentro e fora d’áÁgua, além de não receber penalidades aplicadas por Combate Aquático.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Comuns",
      "tier": "Fácil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat000200000000",
    "name": "Armadura Natural",
    "type": "feature",
    "img": "icons/creatures/abilities/pawprint-tan.svg",
    "folder": "fldfeat010000000",
    "_key": "!items!feat000200000000",
    "system": {
      "name": "Armadura Natural",
      "description": "Essa criatura possui um corpo mais resistente que outras criaturas, reduzindo todo Dano Físico recebido em um valor iÁgual ao dobro do seu Poder.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Comuns",
      "tier": "Fácil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat000300000000",
    "name": "Minúsculo",
    "type": "feature",
    "img": "icons/creatures/abilities/pawprint-tan.svg",
    "folder": "fldfeat010000000",
    "_key": "!items!feat000300000000",
    "system": {
      "name": "Minúsculo",
      "description": "Essa criatura possui um corpo extremamente pequeno, que lhe garante os seguintes efeitos: • +2 metros na sua Movimentação. • Aptidão em testes de Furtividade. em um teste de Defesa, ela poderá Árealizar uma Corrida. Esse efeito ocorre apenas uma vez por turno. • Essa criatura pode utilizar as suas Movimentações em espaços já ocupados por outros Alvos. • Inaptidão em testes de Brutalidade. Essa Característica não pode ser adquirida caso a criatura possua a Característica Corpo Descomunal ou Colosso.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "acaoFinal",
      "typeAbility": "caracteristica",
      "types": [
        "acaoFinal"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Comuns",
      "tier": "Fácil",
      "requirement": "Categoria de Tamanho Pequeno",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat00030000",
          "name": "Minúsculo",
          "description": "Essa criatura possui um corpo extremamente pequeno, que lhe garante os seguintes efeitos: • +2 metros na sua Movimentação. • Aptidão em testes de Furtividade. em um teste de Defesa, ela poderá Árealizar uma Corrida. Esse efeito ocorre apenas uma vez ...",
          "cost": "",
          "type": {
            "actionType": "acaoFinal",
            "category": "defesa",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": false,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat000400000000",
    "name": "Proteção Arcana",
    "type": "feature",
    "img": "icons/creatures/abilities/pawprint-tan.svg",
    "folder": "fldfeat010000000",
    "_key": "!items!feat000400000000",
    "system": {
      "name": "Proteção Arcana",
      "description": "Essa criatura tem o seu corpo envolvido por uma energia arcana, reduzindo todo Dano Mágico recebido em um valor iÁgual ao dobro do seu Poder.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Comuns",
      "tier": "Fácil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat000500000000",
    "name": "Velocidade Aprimorada",
    "type": "feature",
    "img": "icons/creatures/abilities/pawprint-tan.svg",
    "folder": "fldfeat010000000",
    "_key": "!items!feat000500000000",
    "system": {
      "name": "Velocidade Aprimorada",
      "description": "Essa criatura pode utilizar uma Corrida durante o seu turno sem Ela também possui Prioridade em testes de Agilidade.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Comuns",
      "tier": "Fácil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat000600000000",
    "name": "Contra-ataque",
    "type": "feature",
    "img": "icons/creatures/abilities/pawprint-tan.svg",
    "folder": "fldfeat010000000",
    "_key": "!items!feat000600000000",
    "system": {
      "name": "Contra-ataque",
      "description": "Característica para Árealizar um Golpe Brutal ou Evocação do alcance desse ataque. Essa Evocação Mística não custará Pontos de Energia.",
      "category": "caracteristica",
      "cost": "1 PE",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Comuns",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat000700000000",
    "name": "Ignorar Defesas",
    "type": "feature",
    "img": "icons/creatures/abilities/pawprint-tan.svg",
    "folder": "fldfeat010000000",
    "_key": "!items!feat000700000000",
    "system": {
      "name": "Ignorar Defesas",
      "description": "Todo teste de Bloqueio contra essa criatura possui Inaptidão. Ela também possui Prioridade em testes de Precisão e Canalização.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Comuns",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat000800000000",
    "name": "Resistência Incomum",
    "type": "feature",
    "img": "icons/creatures/abilities/pawprint-tan.svg",
    "folder": "fldfeat010000000",
    "_key": "!items!feat000800000000",
    "system": {
      "name": "Resistência Incomum",
      "description": "Essa criatura é imune a Efeitos Negativos e Condições Mágicas que apliquem Inaptidões e reduções em seus Parâmetros. Ela também reduz pela metade todo Dano Crítico que receber.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Comuns",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat000900000000",
    "name": "Sentidos Aprimorados",
    "type": "feature",
    "img": "icons/creatures/abilities/pawprint-tan.svg",
    "folder": "fldfeat010000000",
    "_key": "!items!feat000900000000",
    "system": {
      "name": "Sentidos Aprimorados",
      "description": "Essa criatura possui Infravisão Mística e o valor da sua Percepção Passiva é aumentado em 2. Além disso, ela enxerga todo s os Alvos e objeto s Invisíveis, ilusórios ou a verdadeira forma de um ser, caso ele possua a sua aparência alterada. A criatura também é imune a efeitos vindos de ilusões.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Comuns",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat001000000000",
    "name": "Voar",
    "type": "feature",
    "img": "icons/creatures/abilities/pawprint-tan.svg",
    "folder": "fldfeat010000000",
    "_key": "!items!feat001000000000",
    "system": {
      "name": "Voar",
      "description": "Essa criatura possui um par de asas, ou consegue manipular o Véu de tal forma que é capaz de Árealizar a ação Voar em sua Movimentação.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Comuns",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat001100000000",
    "name": "Ataque Duplo",
    "type": "feature",
    "img": "icons/creatures/abilities/pawprint-tan.svg",
    "folder": "fldfeat010000000",
    "_key": "!items!feat001100000000",
    "system": {
      "name": "Ataque Duplo",
      "description": "Brutais ou duas Evocações Místicas contra um mesmo Alvo. A segunda Evocação Mística Árealizada dessa maneira não possui custos de Pontos de Energia. BIOADAPTAÇÃO Caso a criatura esteja sob o efeito de algum Efeito Negativo, Condição Física ou Condição Mágica, ao utilizar es sa Característica, ela remover á um des ses efeitos, tornando-se imune a esse mesmo efeito até o final do combate. Caso a criatura utilize novamente a Característica, a imunidade será substituída.",
      "category": "caracteristica",
      "cost": "2 PE",
      "typeAction": "acaoRapida",
      "typeAbility": "caracteristica",
      "types": [
        "acaoRapida"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Comuns",
      "tier": "Difícil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat00110000",
          "name": "Ataque Duplo",
          "description": "Brutais ou duas Evocações Místicas contra um mesmo Alvo. A segunda Evocação Mística Árealizada dessa maneira não possui custos de Pontos de Energia. BIOADAPTAÇÃO Caso a criatura esteja sob o efeito de algum Efeito Negativo, Condição Física ou Condiçã...",
          "cost": "2 PE",
          "type": {
            "actionType": "acaoRapida",
            "category": "ataque_magico",
            "tags": [
              "Conjuração"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": false,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": true,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat001200000000",
    "name": "Corpo Descomunal",
    "type": "feature",
    "img": "icons/creatures/abilities/pawprint-tan.svg",
    "folder": "fldfeat010000000",
    "_key": "!items!feat001200000000",
    "system": {
      "name": "Corpo Descomunal",
      "description": "Essa criatura possui um corpo muito maior que outras criaturas, garantindo os seguintes efeitos: • +16 Pontos de Vida máximos adicionais para cada ponto de Poder. • Imunidade a Lentidão e Imóvel. • Os testes de Vigor dessa criatura contra Manobras de Combate recebem um valor adicional iÁgual ao seu total de pontos de Poder. Essa criatura não é afetada pelos efeitos de Agarrar. • Imunidade a quaisquer efeitos que a deslocariam involuntariamente ou que impedissem a sua Movimentação. • Essa criatura falha em todos os testes de Agilidade contra danos e efeitos que afetem uma áÁrea. • Sempre que essa criatura causar dano a algo que possua um efeito de Capacidade, ela removerá 2 pontos de Capacidade, ao invés de 1. • Aptidão Aprimorada em testes de Brutalidade. • Inaptidão Aprimorada em testes de Furtividade. Essa Característica não pode ser adquirida caso a criatura possua a Característica Minúsculo ou Colosso.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Comuns",
      "tier": "Difícil",
      "requirement": "Categoria de Tamanho Enorme",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat001300000000",
    "name": "Invisibilidade",
    "type": "feature",
    "img": "icons/creatures/abilities/pawprint-tan.svg",
    "folder": "fldfeat010000000",
    "_key": "!items!feat001300000000",
    "system": {
      "name": "Invisibilidade",
      "description": "Esta criatura pode ficar Invisível.",
      "category": "caracteristica",
      "cost": "2 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "caracteristica",
      "types": [
        "acaoSimples"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "1 Minuto",
      "level": 1,
      "book": "Seres Comuns",
      "tier": "Difícil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat00130000",
          "name": "Invisibilidade",
          "description": "Esta criatura pode ficar Invisível.",
          "cost": "2 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "ataque_magico",
            "tags": [
              "Conjuração"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": false,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 Minuto",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat001400000000",
    "name": "Véu Abundante",
    "type": "feature",
    "img": "icons/creatures/abilities/pawprint-tan.svg",
    "folder": "fldfeat010000000",
    "_key": "!items!feat001400000000",
    "system": {
      "name": "Véu Abundante",
      "description": "Temporários.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Comuns",
      "tier": "Difícil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat001500000000",
    "name": "Colosso",
    "type": "feature",
    "img": "icons/creatures/abilities/pawprint-tan.svg",
    "folder": "fldfeat010000000",
    "_key": "!items!feat001500000000",
    "system": {
      "name": "Colosso",
      "description": "Essa criatura possui um corpo colossal, garantindo os seguintes efeitos: • +32 Pontos de Vida máximos adicionais para cada ponto de Poder. • A diferença necessária para essa criatura receber um Acerto Crítico é aumentada em 2. • Imunidade a Lentidão, Imóvel, Fratura e Caído. • Os testes de Vigor dessa criatura contra Manobras de Combate recebem um valor adicional iÁgual ao dobro do seu total de pontos de Poder. Essa criatura não é afetada pelos efeitos de Agarrar. • Imunidade a quaisquer efeitos que a deslocariam involuntariamente ou que impedissem a sua Movimentação. • Sempre que essa criatura Árealizar um Ataque Físico contra um Alvo, todos os outros Alvos a até 1 metro do Alvo principal também serão Alvos do Ataque Físico. • Essa criatura falha em todos os testes de Agilidade contra danos e efeitos que afetem uma áÁrea. • Sempre que essa criatura causar dano a algo que possua um efeito de Capacidade, ela removerá 3 pontos de Capacidade, ao invés de 1. • Aptidão Aprimorada e o dobro do seu Poder como valor adicional em testes de Brutalidade ao invés de apenas o seu Poder. • Todo teste de Furtividade dessa criatura tem 1 como o seu Resultado Natural, não podendo receber valor adicionais. Essa Característica não pode ser adquirida caso a criatura possua a Característica Corpo Descomunal ou Minúsculo.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Comuns",
      "tier": "Extrema",
      "requirement": "Categoria de Tamanho Gigante",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat001600000000",
    "name": "Evolução Soberana",
    "type": "feature",
    "img": "icons/creatures/abilities/pawprint-tan.svg",
    "folder": "fldfeat010000000",
    "_key": "!items!feat001600000000",
    "system": {
      "name": "Evolução Soberana",
      "description": "Todos os dados de dano e regeneração de Pontos de Vida dessa criatura t êm a sua Categoria de Dado aumentada em 1. Esse efeito não pode transformar um d12 em um d20. Caso a criatura possu a Características de dificuldade Fácil ou Normal, e elas imponham teste s de Defesa, Vigor ou Espírito, aumente em 2 a dificuldade (Dif.) desses testes.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Comuns",
      "tier": "Extrema",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat001700000000",
    "name": "Vontade Ancestral",
    "type": "feature",
    "img": "icons/creatures/abilities/pawprint-tan.svg",
    "folder": "fldfeat010000000",
    "_key": "!items!feat001700000000",
    "system": {
      "name": "Vontade Ancestral",
      "description": "seu imenso poder para considerar 10 como Resultado Natural desse teste. Esse efeito só pode ser utilizado uma vez por rodada. Imunidade [Danos Físicos e Danos Mágicos] contra um dano que esteja recebendo.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Comuns",
      "tier": "Extrema",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat001800000000",
    "name": "Selvageria",
    "type": "feature",
    "img": "icons/skills/melee/unarmed-claw-animal-green.svg",
    "folder": "fldfeat020000000",
    "_key": "!items!feat001800000000",
    "system": {
      "name": "Selvageria",
      "description": "Criaturas do Homuncularium com, pelo menos, uma Característica deste Livro receberão também es sa Característica adicional. Essa criatura possui dentes extremamente poderosos e/ou garras extremamente afiadas, por isso, caso a criatura tenha sucesso em atingir um Alvo com um Golpe Brutal, e o Resultado Natural do ataque (Precisão) tenha sido 8, ou mais, a criatura aplicará Sangramento no Alvo por 1 hora.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Ferais",
      "tier": "Adicional",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat001900000000",
    "name": "Ataque Selvagem",
    "type": "feature",
    "img": "icons/skills/melee/unarmed-claw-animal-green.svg",
    "folder": "fldfeat020000000",
    "_key": "!items!feat001900000000",
    "system": {
      "name": "Ataque Selvagem",
      "description": "Essa criatura Árealiza um Golpe Brutal contra um Alvo, recebendo Inaptidão nesse Ataque Físico (Precisão). Caso tenha sucesso, o Dano Físico causado pelo Golpe Brutal será afetado por Amplificar.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "acaoAtiva",
      "typeAbility": "caracteristica",
      "types": [
        "acaoAtiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Ferais",
      "tier": "Fácil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat00190000",
          "name": "Ataque Selvagem",
          "description": "Essa criatura Árealiza um Golpe Brutal contra um Alvo, recebendo Inaptidão nesse Ataque Físico (Precisão). Caso tenha sucesso, o Dano Físico causado pelo Golpe Brutal será afetado por Amplificar.",
          "cost": "",
          "type": {
            "actionType": "acaoAtiva",
            "category": "utilidade",
            "tags": []
          },
          "attack": {
            "hasAttack": true,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat002000000000",
    "name": "Corpo Espinhoso",
    "type": "feature",
    "img": "icons/skills/melee/unarmed-claw-animal-green.svg",
    "folder": "fldfeat020000000",
    "_key": "!items!feat002000000000",
    "system": {
      "name": "Corpo Espinhoso",
      "description": "Essa criatura possui diversos espinhos rígidos em seu corpo. Caso a criatura seja atingida por um Ataque Físico ou Ataque Mágico a até 1 metro, e o Alvo que Árealizou es se ataque possua 8, ou menos, como Resultado Natural (Precisão ou Canalização) desse ataque, es se mesmo Alvo receberá o dobro do total de Poder da criatura como Dano Físico. Alvos que afetarem essa criatura com uma Manobra de Combate ativarão essa Característica.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Ferais",
      "tier": "Fácil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat002100000000",
    "name": "Instinto de Sobrevivência",
    "type": "feature",
    "img": "icons/skills/melee/unarmed-claw-animal-green.svg",
    "folder": "fldfeat020000000",
    "_key": "!items!feat002100000000",
    "system": {
      "name": "Instinto de Sobrevivência",
      "description": "Essa criatura age rapidamente, recebendo Aptidão em um teste de Agilidade vigente. Caso ela tenha sucesso nesse teste de Agilidade ela poderá utilizar uma Corrida imediatamente.",
      "category": "caracteristica",
      "cost": "1 PE",
      "typeAction": "acaoRapida",
      "typeAbility": "caracteristica",
      "types": [
        "acaoRapida"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Ferais",
      "tier": "Fácil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat00210000",
          "name": "Instinto de Sobrevivência",
          "description": "Essa criatura age rapidamente, recebendo Aptidão em um teste de Agilidade vigente. Caso ela tenha sucesso nesse teste de Agilidade ela poderá utilizar uma Corrida imediatamente.",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoRapida",
            "category": "utilidade",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": false,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "agility",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat002200000000",
    "name": "Mobilidade",
    "type": "feature",
    "img": "icons/skills/melee/unarmed-claw-animal-green.svg",
    "folder": "fldfeat020000000",
    "_key": "!items!feat002200000000",
    "system": {
      "name": "Mobilidade",
      "description": "Essa criatura é imune a efeitos de Terreno Difícil, além de possuir 2 metros adicionais em sua Movimentação. Ela também consegue escalar qualquer tipo de superfície sólida, sem teste algum, durante as suas Movimentações.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Ferais",
      "tier": "Fácil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat002300000000",
    "name": "Rabada",
    "type": "feature",
    "img": "icons/skills/melee/unarmed-claw-animal-green.svg",
    "folder": "fldfeat020000000",
    "_key": "!items!feat002300000000",
    "system": {
      "name": "Rabada",
      "description": "Essa criatura gira violentamente o seu corpo, tentando atingir com a sua cauda todo s os Alvos a até 1 metro, forçando cada Alvo a um teste de Vigor, Dif. 8. Caso falhe, o Alvo ficará Caído.",
      "category": "caracteristica",
      "cost": "1 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "caracteristica",
      "types": [
        "acaoSimples"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Ferais",
      "tier": "Fácil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat00230000",
          "name": "Rabada",
          "description": "Essa criatura gira violentamente o seu corpo, tentando atingir com a sua cauda todo s os Alvos a até 1 metro, forçando cada Alvo a um teste de Vigor, Dif. 8. Caso falhe, o Alvo ficará Caído.",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "utilidade",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": false,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 8,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat002400000000",
    "name": "Adrenalina Feral",
    "type": "feature",
    "img": "icons/skills/melee/unarmed-claw-animal-green.svg",
    "folder": "fldfeat020000000",
    "_key": "!items!feat002400000000",
    "system": {
      "name": "Adrenalina Feral",
      "description": "Sempre que es sa criatura receber qualquer tipo de dano, ela receberá +1 em seus Parâmetros Ofensivos. O valor máximo recebido dessa forma é iÁgual ao total de Poder da criatura. A criatura perde todos os valores adicionais em seus Parâmetros Ofensivos concedidos por es sa Característica ao ser bem- sucedida em um teste de Parâmetro Ofensivo.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Ferais",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat002500000000",
    "name": "Ataque Inesperado",
    "type": "feature",
    "img": "icons/skills/melee/unarmed-claw-animal-green.svg",
    "folder": "fldfeat020000000",
    "_key": "!items!feat002500000000",
    "system": {
      "name": "Ataque Inesperado",
      "description": "Essa criatura pode Árealizar uma Movimentação e um Golpe Brutal ou Evocação Mística sem custo de Pontos de Energia na sua Iniciativa. Esse Golpe Brutal ou Evocação Mística possui Aptidão no seu teste de Parâmetro (Precisão ou Canalização).",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "acaoAtiva",
      "typeAbility": "caracteristica",
      "types": [
        "acaoAtiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Ferais",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat00250000",
          "name": "Ataque Inesperado",
          "description": "Essa criatura pode Árealizar uma Movimentação e um Golpe Brutal ou Evocação Mística sem custo de Pontos de Energia na sua Iniciativa. Esse Golpe Brutal ou Evocação Mística possui Aptidão no seu teste de Parâmetro (Precisão ou Canalização).",
          "cost": "",
          "type": {
            "actionType": "acaoAtiva",
            "category": "utilidade",
            "tags": []
          },
          "attack": {
            "hasAttack": true,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": false,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat002600000000",
    "name": "Ataques Afiados",
    "type": "feature",
    "img": "icons/skills/melee/unarmed-claw-animal-green.svg",
    "folder": "fldfeat020000000",
    "_key": "!items!feat002600000000",
    "system": {
      "name": "Ataques Afiados",
      "description": "Essa criatura possui dentes ainda mais poderosos e/ou garras ainda mais afiadas, de modo que o Sangramento aplicado por Selvageria seja aplicado em um Resultado Natural de 6, ao invés de 8. Testes para Estabilizar esse Sangramento possuem Inaptidão Aprimorada.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Ferais",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat002700000000",
    "name": "Impacto Feroz",
    "type": "feature",
    "img": "icons/skills/melee/unarmed-claw-animal-green.svg",
    "folder": "fldfeat020000000",
    "_key": "!items!feat002700000000",
    "system": {
      "name": "Impacto Feroz",
      "description": "A criatura Árealiza Golpe Brutal contra um Alvo. Caso o Alvo seja atingido, ele deverá Árealizar um teste Vigor, Dif. 8. Caso falhe, o Alvo também ficará Atordoado.",
      "category": "caracteristica",
      "cost": "1 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "caracteristica",
      "types": [
        "acaoSimples"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Ferais",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat00270000",
          "name": "Impacto Feroz",
          "description": "A criatura Árealiza Golpe Brutal contra um Alvo. Caso o Alvo seja atingido, ele deverá Árealizar um teste Vigor, Dif. 8. Caso falhe, o Alvo também ficará Atordoado.",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "utilidade",
            "tags": []
          },
          "attack": {
            "hasAttack": true,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": false,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat002800000000",
    "name": "Pulverizar",
    "type": "feature",
    "img": "icons/skills/melee/unarmed-claw-animal-green.svg",
    "folder": "fldfeat020000000",
    "_key": "!items!feat002800000000",
    "system": {
      "name": "Pulverizar",
      "description": "Essa criatura bate brutalémente no chão, criando uma onda de impacto que causa 1d8 de Dano Físico para cada ponto de Poder em todos os Alvos a até 1 metro. Alvos dentro do alcance desse impacto podem Árealizar um teste de Vigor, Dif. 8. Caso tenham sucesso, receberão metade do dano causado por essa Característica. Alvos que falharem no teste de Vigor recebem 1 ponto de Fratura.",
      "category": "caracteristica",
      "cost": "2 PE",
      "typeAction": "acaoAtiva",
      "typeAbility": "caracteristica",
      "types": [
        "acaoAtiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Ferais",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat00280000",
          "name": "Pulverizar",
          "description": "Essa criatura bate brutalémente no chão, criando uma onda de impacto que causa 1d8 de Dano Físico para cada ponto de Poder em todos os Alvos a até 1 metro. Alvos dentro do alcance desse impacto podem Árealizar um teste de Vigor, Dif. 8. Caso tenham s...",
          "cost": "2 PE",
          "type": {
            "actionType": "acaoAtiva",
            "category": "utilidade",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "1d8",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 8,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat002900000000",
    "name": "Corpo Robusto",
    "type": "feature",
    "img": "icons/skills/melee/unarmed-claw-animal-green.svg",
    "folder": "fldfeat020000000",
    "_key": "!items!feat002900000000",
    "system": {
      "name": "Corpo Robusto",
      "description": "Essa criatura possui um corpo extremamente resistente, como um casco ou pele muito grossa, concedendo a ela Resistência Física.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Ferais",
      "tier": "Difícil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat003000000000",
    "name": "Dilacerar",
    "type": "feature",
    "img": "icons/skills/melee/unarmed-claw-animal-green.svg",
    "folder": "fldfeat020000000",
    "_key": "!items!feat003000000000",
    "system": {
      "name": "Dilacerar",
      "description": "utilizar essa Característica para aplicar Sangramento nesse Alvo por 1 hora. Caso o alvo já possua Sangramento, transforme es se Sangramento em Hemorragia. Hemorragia: Enquanto estiver com Hemorragia, o Alvo é afetado por Lentidão e o dano adicional causado por Sangramento é dobrado. Para todos os efeitos, Hemorragia é considerada um Sangramento.",
      "category": "caracteristica",
      "cost": "2 PE",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Ferais",
      "tier": "Difícil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat003100000000",
    "name": "Líder do Bando",
    "type": "feature",
    "img": "icons/skills/melee/unarmed-claw-animal-green.svg",
    "folder": "fldfeat020000000",
    "_key": "!items!feat003100000000",
    "system": {
      "name": "Líder do Bando",
      "description": "Essa criatura se destaca das outras, de modo que todo Alvo Aliado da criatura a até 6 metros receba o efeito Amplificar no primeiro dano causado em um turno. A criatura com essa Característica é a fonte desse Amplificar. Além disso, concede +1 nos Parâmetros Ofensivos e Parâmetros Defensivos dos Alvos Aliados. Esse efeito não acumula, mesmo vindo de fontes diferentes.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "presenca",
      "typeAbility": "caracteristica",
      "types": [
        "presenca"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Ferais",
      "tier": "Difícil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat00310000",
          "name": "Líder do Bando",
          "description": "Essa criatura se destaca das outras, de modo que todo Alvo Aliado da criatura a até 6 metros receba o efeito Amplificar no primeiro dano causado em um turno. A criatura com essa Característica é a fonte desse Amplificar. Além disso, concede +1 nos Pa...",
          "cost": "",
          "type": {
            "actionType": "presenca",
            "category": "utilidade",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat003200000000",
    "name": "Predador",
    "type": "feature",
    "img": "icons/skills/melee/unarmed-claw-animal-green.svg",
    "folder": "fldfeat020000000",
    "_key": "!items!feat003200000000",
    "system": {
      "name": "Predador",
      "description": "Caso um Alvo utilize uma Movimentação que o tiraria do alcance do Golpe Brutal dessa criatura, antes da Movimentação a criatura poderá Árealizar um Golpe Brutal contra esse mesmo Alvo. Esse efeito pode ser utilizado uma vez por Alvo, por rodada.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Ferais",
      "tier": "Difícil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat003300000000",
    "name": "Resiliência Bestial",
    "type": "feature",
    "img": "icons/skills/melee/unarmed-claw-animal-green.svg",
    "folder": "fldfeat020000000",
    "_key": "!items!feat003300000000",
    "system": {
      "name": "Resiliência Bestial",
      "description": "Após chegar a zero, ou menos, Pontos de Vida, es sa criatura permanecerá em combate, lutando freneticamente até o final do seu próximo turno, morrendo somente ao finalizar o seu próximo turno. Enquanto estiver afetada por essa Característica, todos os custos de Pontos de Energia da criatura são reduzidos a zero.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "acaoFinal",
      "typeAbility": "caracteristica",
      "types": [
        "acaoFinal"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Ferais",
      "tier": "Difícil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat00330000",
          "name": "Resiliência Bestial",
          "description": "Após chegar a zero, ou menos, Pontos de Vida, es sa criatura permanecerá em combate, lutando freneticamente até o final do seu próximo turno, morrendo somente ao finalizar o seu próximo turno. Enquanto estiver afetada por essa Característica, todos o...",
          "cost": "",
          "type": {
            "actionType": "acaoFinal",
            "category": "utilidade",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": false,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat003400000000",
    "name": "Corpo de Escamas",
    "type": "feature",
    "img": "icons/skills/melee/unarmed-claw-animal-green.svg",
    "folder": "fldfeat020000000",
    "_key": "!items!feat003400000000",
    "system": {
      "name": "Corpo de Escamas",
      "description": "Essa criatura possui um corpo extremamente rígido e esca moso, possuindo X pontos de Capacidade. O valor de X equivale ao Poder dessa criatura. Caso es sa criatura receba um Dano Físico, ela ignorará esse Dano, perdendo também 1 ponto de Capacidade. Com zero pontos de Capacidade o efeito dessa Característica é removido até o final desse combate. Caso essa criatura possua a Característica Corpo Descomunal, o seu total de pontos de Capacidade é aumentado em 3. Caso essa criatura possua a Característica Colosso, o seu total de pontos de Capacidade é aumentado em 6.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Ferais",
      "tier": "Extrema",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat003500000000",
    "name": "Frenesi Selvagem",
    "type": "feature",
    "img": "icons/skills/melee/unarmed-claw-animal-green.svg",
    "folder": "fldfeat020000000",
    "_key": "!items!feat003500000000",
    "system": {
      "name": "Frenesi Selvagem",
      "description": "menos, essa criatura se descontrola, imbuída por um frenesi, recebendo os seguintes efeitos até o final do combate: • Aptidão e Prioridade em todos os seus Parâmetros Ofensivos e Parâmetros Defensivos. • A diferença necessária para essa criatura causar um Acerto Crítico é reduzida em 2. • Imunidade a Caído e a quaisquer efeitos que a deslocar iam involuntariamente ou que impedissem a sua Movimentação. • +3 metros nas suas ações de Movimentação.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Ferais",
      "tier": "Extrema",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat003600000000",
    "name": "Investida Monstruosa",
    "type": "feature",
    "img": "icons/skills/melee/unarmed-claw-animal-green.svg",
    "folder": "fldfeat020000000",
    "_key": "!items!feat003600000000",
    "system": {
      "name": "Investida Monstruosa",
      "description": "Essa criatura utiliza a sua Movimentação para disparar rapidamente na direção de um Alvo, Árealizando um Golpe Brutal contra ele. O Dano Físico causado por esse Golpe Brutal tem a sua Categoria de Dado aumentada em 1. Esse efeito não pode transformar um d12 em um d20. Caso o Alvo dessa Característica tenha sido atingido, ele deverá Árealizar um teste Vigor, Dif. 10. Caso falhe, o Alvo será arremessado 1d6 metros para trás, além de receber 1 ponto de Fratura, Sangramento, Caído e Atordoado. Caso um outro Alvo esteja no trajeto da Movimentação da criatura ao Árealizar essa Característica, ele deverá Árealizar um teste de Vigor, Dif. 10. Caso falha, esse Alvo é arremessado 1d6 metros para trás, ficando Caído.",
      "category": "caracteristica",
      "cost": "5 PE",
      "typeAction": "acaoAtiva",
      "typeAbility": "caracteristica",
      "types": [
        "acaoAtiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Ferais",
      "tier": "Extrema",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat00360000",
          "name": "Investida Monstruosa",
          "description": "Essa criatura utiliza a sua Movimentação para disparar rapidamente na direção de um Alvo, Árealizando um Golpe Brutal contra ele. O Dano Físico causado por esse Golpe Brutal tem a sua Categoria de Dado aumentada em 1. Esse efeito não pode transformar...",
          "cost": "5 PE",
          "type": {
            "actionType": "acaoAtiva",
            "category": "utilidade",
            "tags": []
          },
          "attack": {
            "hasAttack": true,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": true,
            "status": "sangramento",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat003700000000",
    "name": "Metamorfose Aberrante",
    "type": "feature",
    "img": "icons/skills/melee/unarmed-claw-animal-green.svg",
    "folder": "fldfeat020000000",
    "_key": "!items!feat003700000000",
    "system": {
      "name": "Metamorfose Aberrante",
      "description": "Essa criatura força a sua própria evolução, criando um membro adicional no seu corpo (cabeça, braço, perna, etc.), concedendo - lhe um valor de Pontos de Vida Temporários equivalente ao seu próprio total máximo de Pontos de Energia. Para cada membro adicional criado por e ssa Característica, o Golpe Brutal dessa criatura atingirá um Alvo adicional. Não há limites de membros adicionais criados por essa Característica.",
      "category": "caracteristica",
      "cost": "3 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "caracteristica",
      "types": [
        "acaoSimples"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Ferais",
      "tier": "Extrema",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat00370000",
          "name": "Metamorfose Aberrante",
          "description": "Essa criatura força a sua própria evolução, criando um membro adicional no seu corpo (cabeça, braço, perna, etc.), concedendo - lhe um valor de Pontos de Vida Temporários equivalente ao seu próprio total máximo de Pontos de Energia. Para cada membro ...",
          "cost": "3 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "utilidade",
            "tags": []
          },
          "attack": {
            "hasAttack": true,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": false,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": true,
            "formula": "@power",
            "type": "temp",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat003800000000",
    "name": "Rugido Aterrador",
    "type": "feature",
    "img": "icons/skills/melee/unarmed-claw-animal-green.svg",
    "folder": "fldfeat020000000",
    "_key": "!items!feat003800000000",
    "system": {
      "name": "Rugido Aterrador",
      "description": "todas as suas presas, forçando todos os Alvos Inimigos a até 8 metros a Árealizarem um teste de Espírito, Dif. 10. Caso falhe, o Alvo será afetado pelos seguintes efeitos: • Na primeira rodada do combate, o Alvo possuirá Inaptidão Aprimorada em todos os seus testes de Parâmetro contra essa criatura. • Na segunda rodada do combate, o Alvo possuirá Inaptidão em todos os seus testes de Parâmetro contra essa criatura. • Até o final do combate, o Alvo não poderá ser afetado por Prioridade em seus testes de Parâmetros.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Ferais",
      "tier": "Extrema",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat003900000000",
    "name": "Cria do Véu",
    "type": "feature",
    "img": "icons/magic/symbols/rune-sigil-horned-blue.svg",
    "folder": "fldfeat030000000",
    "_key": "!items!feat003900000000",
    "system": {
      "name": "Cria do Véu",
      "description": "Criaturas do Homuncularium com, pelo menos, uma Característica deste Livro receberão também es sa Característica adicional. Essa criatura não utiliza Pontos de Energia ao conjurar Evocação Mística, além de ter acesso a todos os Feitiços Arcanos.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres do Véu",
      "tier": "Adicional",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat004000000000",
    "name": "Atravessar Os Planos",
    "type": "feature",
    "img": "icons/magic/symbols/rune-sigil-horned-blue.svg",
    "folder": "fldfeat030000000",
    "_key": "!items!feat004000000000",
    "system": {
      "name": "Atravessar Os Planos",
      "description": "Áreaparecer, todos os Alvos a até 1 metro desse novo local são forçados a um teste de Vigor, Dif. 8. Caso falhe, o Alvo ficará com Lentidão.",
      "category": "caracteristica",
      "cost": "1 PE",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres do Véu",
      "tier": "Fácil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat004100000000",
    "name": "Decreto do Véu",
    "type": "feature",
    "img": "icons/magic/symbols/rune-sigil-horned-blue.svg",
    "folder": "fldfeat030000000",
    "_key": "!items!feat004100000000",
    "system": {
      "name": "Decreto do Véu",
      "description": "Caso um Alvo utilize uma Conjuração a até 8 metros, essa criatura poderá utilizar essa Característica para alterar as linhas místicas ao seu redor, Árealizando um teste de Poder contra a Canalização desse Alvo. Caso tenha sucesso, a criatura interromperá e anulará a Conjuração Árealizada. recursos utilizados ao tentar Árealizar essa Conjuração, caso ela seja anulada, ainda serão gastos.",
      "category": "caracteristica",
      "cost": "1 PE",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres do Véu",
      "tier": "Fácil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat004200000000",
    "name": "Espelho Entre Os Planos",
    "type": "feature",
    "img": "icons/magic/symbols/rune-sigil-horned-blue.svg",
    "folder": "fldfeat030000000",
    "_key": "!items!feat004200000000",
    "system": {
      "name": "Espelho Entre Os Planos",
      "description": "manipula o Véu, adquirindo as Habilidades de Legado de um Alvo a até 20 metros. Esse efeito permanece ativo até o final do combate.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres do Véu",
      "tier": "Fácil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat004300000000",
    "name": "Perturbar o Véu",
    "type": "feature",
    "img": "icons/magic/symbols/rune-sigil-horned-blue.svg",
    "folder": "fldfeat030000000",
    "_key": "!items!feat004300000000",
    "system": {
      "name": "Perturbar o Véu",
      "description": "Essa criatura possui forças místicas que oprimem o Véu de todo Alvo Inimigo ao seu redor. Caso um Alvo Inimigo inicie o seu turno a até 3 metros dessa criatura, ele perderá 1 Ponto de Energia.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "presenca",
      "typeAbility": "caracteristica",
      "types": [
        "presenca"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres do Véu",
      "tier": "Fácil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat00430000",
          "name": "Perturbar o Véu",
          "description": "Essa criatura possui forças místicas que oprimem o Véu de todo Alvo Inimigo ao seu redor. Caso um Alvo Inimigo inicie o seu turno a até 3 metros dessa criatura, ele perderá 1 Ponto de Energia.",
          "cost": "",
          "type": {
            "actionType": "presenca",
            "category": "ataque_magico",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": false,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat004400000000",
    "name": "Supremacia Arcana",
    "type": "feature",
    "img": "icons/magic/symbols/rune-sigil-horned-blue.svg",
    "folder": "fldfeat030000000",
    "_key": "!items!feat004400000000",
    "system": {
      "name": "Supremacia Arcana",
      "description": "Sempre que es sa criatura receber um Dano Mágico ela regenerará 1 Ponto de Energia. Além disso, ela também receberá +1 de Poder até o final do seu próximo turno. Esse efeito não acumula.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres do Véu",
      "tier": "Fácil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat004500000000",
    "name": "Elevar o Véu",
    "type": "feature",
    "img": "icons/magic/symbols/rune-sigil-horned-blue.svg",
    "folder": "fldfeat030000000",
    "_key": "!items!feat004500000000",
    "system": {
      "name": "Elevar o Véu",
      "description": "Essa criatura manipula o Véu ao seu redor, Árealizando um dos seguintes efeitos: • A próxima Conjuração de Alvo único Árealizada por essa criatura será duplicada, atingindo um novo e diferente Alvo. • A próxima Conjuração dessa criatura terá a sua áÁrea de efeito (caso possua) e alcance dobrados. • Até o final desse turno, todos os testes de Parâmetros da criatura possuem Aptidão.",
      "category": "caracteristica",
      "cost": "2 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "caracteristica",
      "types": [
        "acaoSimples"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres do Véu",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat00450000",
          "name": "Elevar o Véu",
          "description": "Essa criatura manipula o Véu ao seu redor, Árealizando um dos seguintes efeitos: • A próxima Conjuração de Alvo único Árealizada por essa criatura será duplicada, atingindo um novo e diferente Alvo. • A próxima Conjuração dessa criatura terá a sua áÁ...",
          "cost": "2 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "ataque_magico",
            "tags": [
              "Conjuração"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": false,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat004600000000",
    "name": "Manipulador dos Espelhos",
    "type": "feature",
    "img": "icons/magic/symbols/rune-sigil-horned-blue.svg",
    "folder": "fldfeat030000000",
    "_key": "!items!feat004600000000",
    "system": {
      "name": "Manipulador dos Espelhos",
      "description": "Distorcendo a Árealidade ao seu redor, sempre que essa criatura for Alvo de um Ataque Mágico, ela forçará o Alvo que Árealizou esse ataque a um teste de Espírito, Dif. 8. Caso falhe, o Alvo Árealizará esse Ataque Mágico em um Alvo à escolha da criatura, dentro do alcance desse Ataque Mágico. Esse efeito ocorre apenas uma vez por rodada. Essa criatura também pode modificar ilusoriamente toda a região ao seu redor em um raio de 100 metros.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres do Véu",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat004700000000",
    "name": "Mover As Cordas",
    "type": "feature",
    "img": "icons/magic/symbols/rune-sigil-horned-blue.svg",
    "folder": "fldfeat030000000",
    "_key": "!items!feat004700000000",
    "system": {
      "name": "Mover As Cordas",
      "description": "Essa criatura aumenta, ou reduz, em 1d4 o Resultado Natural de um teste de Parâmetro vigente de um Alvo a até 8 metros. Alvos só podem ser afetado por essa Característica uma vez por turno, mesmo vinda de fontes diferentes.",
      "category": "caracteristica",
      "cost": "2 PE",
      "typeAction": "acaoRapida",
      "typeAbility": "caracteristica",
      "types": [
        "acaoRapida"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres do Véu",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat00470000",
          "name": "Mover As Cordas",
          "description": "Essa criatura aumenta, ou reduz, em 1d4 o Resultado Natural de um teste de Parâmetro vigente de um Alvo a até 8 metros. Alvos só podem ser afetado por essa Característica uma vez por turno, mesmo vinda de fontes diferentes.",
          "cost": "2 PE",
          "type": {
            "actionType": "acaoRapida",
            "category": "ataque_magico",
            "tags": [
              "Conjuração"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": false,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat004800000000",
    "name": "Repulsão Arcana",
    "type": "feature",
    "img": "icons/magic/symbols/rune-sigil-horned-blue.svg",
    "folder": "fldfeat030000000",
    "_key": "!items!feat004800000000",
    "system": {
      "name": "Repulsão Arcana",
      "description": "Essa criatura manipula as linhas do Véu, forçando todos os Alvos Inimigos a até 4 metros a um teste de Vigor, Dif. 8. Caso falhe, o Alvo recebe 1d8 de Dano Mágico Neutro para cada ponto de Poder da criatura, além de ser deslocado involuntariamente 6 metros para trás.",
      "category": "caracteristica",
      "cost": "2 PE",
      "typeAction": "acaoAtiva",
      "typeAbility": "caracteristica",
      "types": [
        "acaoAtiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres do Véu",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat00480000",
          "name": "Repulsão Arcana",
          "description": "Essa criatura manipula as linhas do Véu, forçando todos os Alvos Inimigos a até 4 metros a um teste de Vigor, Dif. 8. Caso falhe, o Alvo recebe 1d8 de Dano Mágico Neutro para cada ponto de Poder da criatura, além de ser deslocado involuntariamente 6 ...",
          "cost": "2 PE",
          "type": {
            "actionType": "acaoAtiva",
            "category": "ataque_magico",
            "tags": [
              "Conjuração"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "1d8",
            "type": "immaterial",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 8,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat004900000000",
    "name": "Troca Mística",
    "type": "feature",
    "img": "icons/magic/symbols/rune-sigil-horned-blue.svg",
    "folder": "fldfeat030000000",
    "_key": "!items!feat004900000000",
    "system": {
      "name": "Troca Mística",
      "description": "Iniciativa | Conjuração Após todas as habilidades de Iniciativa, essa criatura força todos os Alvos Inimigos a até 8 metros a um teste de Espírito, Dif. 8. Caso falhe, o Alvo é teletransportado a um novo local vago a até 8 metros, a critério da criatura.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres do Véu",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat005000000000",
    "name": "Aprisionar No Véu",
    "type": "feature",
    "img": "icons/magic/symbols/rune-sigil-horned-blue.svg",
    "folder": "fldfeat030000000",
    "_key": "!items!feat005000000000",
    "system": {
      "name": "Aprisionar No Véu",
      "description": "Foco | Duração: 1 Minuto Essa criatura cria uma mandala mística sob os pés de um Alvo a até 8 metros. Esse Alvo desaparece do plano atual e é enviado a uma das infinitas camadas do Véu. Essa camada do Véu possui a aparência distorcida do local de origem desse Alvo, tendo todas as suas cores invertidas e objetos do local distorcidos, não possuindo nenhum outro ser além desse Alvo. O Alvo afetado por essa Característica ainda permanece na ordem de Iniciativa, de Ações. Alvos afetados por essa Característica poderão Árealizar um teste de Espírito, Dif. 10, ao final dos seus turnos. Caso tenha sucesso, esse Foco será removido da criatura, retornando o Alvo para o seu plano de origem, no mesmo local de onde desapareceu.",
      "category": "caracteristica",
      "cost": "3 PE",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres do Véu",
      "tier": "Difícil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat005100000000",
    "name": "Avatar das Forças Arcanas",
    "type": "feature",
    "img": "icons/magic/symbols/rune-sigil-horned-blue.svg",
    "folder": "fldfeat030000000",
    "_key": "!items!feat005100000000",
    "system": {
      "name": "Avatar das Forças Arcanas",
      "description": "criatura poderá utilizar es sa Característica para Maximizar metade dos dados de dano da Conjuração. LIGAÇÃO MÍSTICA Iniciativa | Conjuração dois Alvos a até 8 metros, que estejam a até 2 metros um do outro. Caso um destes Alvos se afaste mais de 2 metros do outro Alvo vinculado, ele quebrará o vínculo místico, fazendo com que ambos os Alvos da Característica recebam 1d10 de Dano Mágico Neutro para cada ponto de Poder da criatura. Alvos que receberem esse Dano Mágico Neutro deverão Árealizar um teste de Espírito, Dif. 10. Caso falhem, ficarão Atordoado. Esse efeito é removido dos Alvos ao final do combate, ou quando os Alvos tiverem o seu vínculo místico quebrado.",
      "category": "caracteristica",
      "cost": "2 PE",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres do Véu",
      "tier": "Difícil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat005200000000",
    "name": "Matriz Mística",
    "type": "feature",
    "img": "icons/magic/symbols/rune-sigil-horned-blue.svg",
    "folder": "fldfeat030000000",
    "_key": "!items!feat005200000000",
    "system": {
      "name": "Matriz Mística",
      "description": "Essa criatura tem o seu corpo preenchido com o mais puro Véu, recebendo Resistência Mágica [Neutro].",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres do Véu",
      "tier": "Difícil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat005300000000",
    "name": "Mímico dos Planos",
    "type": "feature",
    "img": "icons/magic/symbols/rune-sigil-horned-blue.svg",
    "folder": "fldfeat030000000",
    "_key": "!items!feat005300000000",
    "system": {
      "name": "Mímico dos Planos",
      "description": "Caso um Alvo a até 8 metros Árealize uma Conjuração, essa criatura poderá absorver a Conjuração para si, podendo Árealizá- turno. Aprimoramentos não são adquiridos dessa forma. Esse efeito não acumula. A criatura ainda deverá gastar os Pontos de Energia ou Pontos de Vida da Conjuração.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres do Véu",
      "tier": "Difícil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat005400000000",
    "name": "Caminhante do Véu",
    "type": "feature",
    "img": "icons/magic/symbols/rune-sigil-horned-blue.svg",
    "folder": "fldfeat030000000",
    "_key": "!items!feat005400000000",
    "system": {
      "name": "Caminhante do Véu",
      "description": "menos, as forças do Véu distorcem e potencializam essa criatura, que recebe os seguintes efeitos, até o final do combate: • Todos os custos de Pontos de Energia das Características dessa criatura são reduzidos pela metade. • Uma vez durante o seu turno, essa criatura pode ignorar o custo de de Energia da Conjuração ainda devem ser gastos. • O alcance e a áÁrea de todas as Conjurações dessa criatura são dobrados. • Todo os Danos Mágicos dessa criatura são afetados por Amplificar.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres do Véu",
      "tier": "Extrema",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat005500000000",
    "name": "Campo Gravitacional",
    "type": "feature",
    "img": "icons/magic/symbols/rune-sigil-horned-blue.svg",
    "folder": "fldfeat030000000",
    "_key": "!items!feat005500000000",
    "system": {
      "name": "Campo Gravitacional",
      "description": "Essa criatura altera levemente a gravidade de tudo ao seu redor a até 20 metros. Alvos Inimigos dentro desse alcance não podem Voar e têm a sua Movimentação reduzida em um valor iÁgual ao total de pontos de Poder da criatura. Todos os Alvos Inimigos a até 6 metros dessa criatura devem Árealizar um teste de Vigor, Dif. 10, antes de Árealizar testes de Precisão, Canalização ou Defesa. Caso falhem, possuirão Inaptidão Aprimorada nesse teste. Esse efeito ocorre apenas uma vez por turno, por Alvo.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "presenca",
      "typeAbility": "caracteristica",
      "types": [
        "presenca"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres do Véu",
      "tier": "Extrema",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat00550000",
          "name": "Campo Gravitacional",
          "description": "Essa criatura altera levemente a gravidade de tudo ao seu redor a até 20 metros. Alvos Inimigos dentro desse alcance não podem Voar e têm a sua Movimentação reduzida em um valor iÁgual ao total de pontos de Poder da criatura. Todos os Alvos Inimigos ...",
          "cost": "",
          "type": {
            "actionType": "presenca",
            "category": "defesa",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": false,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat005600000000",
    "name": "Orbe da Destruição",
    "type": "feature",
    "img": "icons/magic/symbols/rune-sigil-horned-blue.svg",
    "folder": "fldfeat030000000",
    "_key": "!items!feat005600000000",
    "system": {
      "name": "Orbe da Destruição",
      "description": "Foco | Duração: 1 Minuto Essa criatura cria um orbe de energia, que flutua ao seu redor. Metade de todo Dano Mágico causado a até 8 metros dessa criatura é armazenado dentro desse orbe. menos, Pontos de Vida, ela esse orbe explodirá, causando a todos os Alvos a até 8 metros o total de Dano Mágico armazenado em forma de Dano Mágico Neutro. Alvos dentro do alcance desse orbe podem Árealizar um teste d e Agilidade, Dif. 10. Caso tenha m sucesso, receber ão metade do dano causado pela Característica.",
      "category": "caracteristica",
      "cost": "5 PE",
      "typeAction": "acaoRapida",
      "typeAbility": "caracteristica",
      "types": [
        "acaoRapida"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres do Véu",
      "tier": "Extrema",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat00560000",
          "name": "Orbe da Destruição",
          "description": "Foco | Duração: 1 Minuto Essa criatura cria um orbe de energia, que flutua ao seu redor. Metade de todo Dano Mágico causado a até 8 metros dessa criatura é armazenado dentro desse orbe. menos, Pontos de Vida, ela esse orbe explodirá, causando a todos...",
          "cost": "5 PE",
          "type": {
            "actionType": "acaoRapida",
            "category": "ataque_magico",
            "tags": [
              "Conjuração"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat005700000000",
    "name": "Proteção Mística",
    "type": "feature",
    "img": "icons/magic/symbols/rune-sigil-horned-blue.svg",
    "folder": "fldfeat030000000",
    "_key": "!items!feat005700000000",
    "system": {
      "name": "Proteção Mística",
      "description": "flutua ao seu redor. As próximas X Conjurações que causem Danos Mágicos, Efeitos Negativos ou Condições Mágicas são ignoradas por esta criatura. O valor de X é equivalente ao Poder da criatura. A criatura pode decidir quando ignorar uma Conjuração com essa Característica. O efeito da Característica é desfeito ao final de um combate, caso a criatura ainda o possua. Caso a criatura possua a Característica Corpo Descomunal, o número de Conjurações ignoradas por essa Característica é aumentado em 3. Caso a criatura possua a Característica Colosso, o número de Conjurações ignoradas por essa Característica é aumentado em 6.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres do Véu",
      "tier": "Extrema",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat005800000000",
    "name": "Quebrar o Véu",
    "type": "feature",
    "img": "icons/magic/symbols/rune-sigil-horned-blue.svg",
    "folder": "fldfeat030000000",
    "_key": "!items!feat005800000000",
    "system": {
      "name": "Quebrar o Véu",
      "description": "Energizando o corpo de um Alvo a até 8 metros, essa criatura força esse mesmo Alvo a um teste de Espírito, Dif. 10. Caso falhe, o Alvo perde um valor de Pontos de Energia equivalente ao total de Poder da criatura. Caso o Resultado Natural (Espírito) desse Alvo tenha sido 8, ou menos, ele também receberá o total de Pontos de Energia da criatura como Dano Mágico Neutro Caso o Alvo não possua Pontos de Energia para serem removidos pelo efeito desta Característica, ele receberá 1d12 de Dano Mágico Neutro para cada ponto de Poder da criatura, além de ficar Atordoado.",
      "category": "caracteristica",
      "cost": "4 PE",
      "typeAction": "acaoAtiva",
      "typeAbility": "caracteristica",
      "types": [
        "acaoAtiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres do Véu",
      "tier": "Extrema",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat00580000",
          "name": "Quebrar o Véu",
          "description": "Energizando o corpo de um Alvo a até 8 metros, essa criatura força esse mesmo Alvo a um teste de Espírito, Dif. 10. Caso falhe, o Alvo perde um valor de Pontos de Energia equivalente ao total de Poder da criatura. Caso o Resultado Natural (Espírito) ...",
          "cost": "4 PE",
          "type": {
            "actionType": "acaoAtiva",
            "category": "ataque_magico",
            "tags": [
              "Conjuração"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "1d12",
            "type": "immaterial",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "spirit",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat005900000000",
    "name": "Corpo Apodrecido",
    "type": "feature",
    "img": "icons/magic/death/skull-energy-purple.svg",
    "folder": "fldfeat040000000",
    "_key": "!items!feat005900000000",
    "system": {
      "name": "Corpo Apodrecido",
      "description": "Criaturas do Homuncularium com, pelo menos, uma Característica deste Livro possuem Resistência Mágica [Profano] e Fraqueza Mágica [Natureza], além de serem imunes a Sangramento e Toxinas.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Não-Vivos",
      "tier": "Adicional",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat006000000000",
    "name": "Amaldiçoar o Véu",
    "type": "feature",
    "img": "icons/magic/death/skull-energy-purple.svg",
    "folder": "fldfeat040000000",
    "_key": "!items!feat006000000000",
    "system": {
      "name": "Amaldiçoar o Véu",
      "description": "uma energia profana, que afeta todos os Alvos Inimigos a até 6 metros, forçando-os a um teste de Espírito, Dif. 8. Caso falhem, terão todos os seus Parâmetros reduzidos em 1, até que concluam um Repouso. Esse efeito não acumula, mesmo vindo de fontes diferentes.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Não-Vivos",
      "tier": "Fácil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat006100000000",
    "name": "Toque Profano",
    "type": "feature",
    "img": "icons/magic/death/skull-energy-purple.svg",
    "folder": "fldfeat040000000",
    "_key": "!items!feat006100000000",
    "system": {
      "name": "Toque Profano",
      "description": "Caso essa criatura tenha sucesso em atingir um Alvo com um Golpe Brutal ou Evocação Mística, e o Resultado Natural do ataque (Precisão ou Canalização) tenha sido 8, ou mais, a criatura fará com que seu Alvo possua Inaptidão no seu próximo teste de Vigor ou Espírito. Caso nenhum teste seja Árealizado, esse efeito permanece ativo por 1 minuto. Possuindo essa Característica, a criatura poderá transformar todos os seus Danos Mágicos Neutros em Danos Mágicos Profanos.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Não-Vivos",
      "tier": "Fácil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat006200000000",
    "name": "Energia Profana",
    "type": "feature",
    "img": "icons/magic/death/skull-energy-purple.svg",
    "folder": "fldfeat040000000",
    "_key": "!items!feat006200000000",
    "system": {
      "name": "Energia Profana",
      "description": "Condição Mágica Essa criatura é cercada por forças profanas. Caso ela cause qualquer tipo de dano em um Alvo, a criatura poderá utilizar essa Característica para aumentar esse dano em 1d8 como Dano Mágico Profano. Alvos que tenha m recebido es se Dano Mágico Profano receberão também Putrefação por 1 minuto. Alvos afetados por es sa Condição Mágica poderão Árealizar um teste de Espírito, Dif. 8, ao final dos seus turnos. Caso tenh am sucesso, essa Condição Mágica será removida. Putrefação: Enquanto estiver com es sa Condição Mágica, você não poderá regenerar Pontos de Vida, nem Pontos de Energia.",
      "category": "caracteristica",
      "cost": "1 PE",
      "typeAction": "acaoRapida",
      "typeAbility": "caracteristica",
      "types": [
        "acaoRapida"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Não-Vivos",
      "tier": "Fácil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat00620000",
          "name": "Energia Profana",
          "description": "Condição Mágica Essa criatura é cercada por forças profanas. Caso ela cause qualquer tipo de dano em um Alvo, a criatura poderá utilizar essa Característica para aumentar esse dano em 1d8 como Dano Mágico Profano. Alvos que tenha m recebido es se Dan...",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoRapida",
            "category": "ataque_magico",
            "tags": [
              "Conjuração"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": true,
            "formula": "@power",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": true,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "spirit",
            "difficulty": 8,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat006300000000",
    "name": "Estaca Óssea",
    "type": "feature",
    "img": "icons/magic/death/skull-energy-purple.svg",
    "folder": "fldfeat040000000",
    "_key": "!items!feat006300000000",
    "system": {
      "name": "Estaca Óssea",
      "description": "Condição Mágica Essa criatura dispara na direção de um Alvo a até 6 metros uma estaca de osso apodrecida, forçando-o a um teste de Defesa, Dif. 8. Caso falhe, o Alvo receberá o dobro de Poder dessa criatura como Dano Físico, além de ser afetado por Ferida Profana. Alvos afetados por es sa Condição Mágica poderão Árealizar um teste de Espírito, Dif. 8, ao final dos seus turnos. Caso tenh am sucesso, essa Condição Mágica será removida. Ferida Profana: Sempre que você utilizar ou perder qualquer valor de Pontos de Energia enquanto estiver com es sa Condição Mágica, você receberá o total de pontos de Poder da criatura que aplicou a Condição Mágica como Dano Mágico Profano. Esse efeito ocorre apenas uma vez por turno.",
      "category": "caracteristica",
      "cost": "1 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "caracteristica",
      "types": [
        "acaoSimples"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Não-Vivos",
      "tier": "Fácil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat00630000",
          "name": "Estaca Óssea",
          "description": "Condição Mágica Essa criatura dispara na direção de um Alvo a até 6 metros uma estaca de osso apodrecida, forçando-o a um teste de Defesa, Dif. 8. Caso falhe, o Alvo receberá o dobro de Poder dessa criatura como Dano Físico, além de ser afetado por F...",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "ataque_magico",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": true,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 8,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat006400000000",
    "name": "Ferida Purulenta",
    "type": "feature",
    "img": "icons/magic/death/skull-energy-purple.svg",
    "folder": "fldfeat040000000",
    "_key": "!items!feat006400000000",
    "system": {
      "name": "Ferida Purulenta",
      "description": "Essa criatura possui feridas putrefatas espalhadas pelo seu corpo. Caso ela seja atingida por um Ataque Físico ou Ataque Mágico até 1 metro, e o Alvo que Árealizou este ataque possua 8, ou menos, como Resultado Natural (Precisão ou Canalização) desse ataque, ele receberá o dobro do total de Poder da criatura como Dano Mágico Profano. Alvos que afetarem essa criatura com uma Manobra de Combate ativarão essa Característica.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Não-Vivos",
      "tier": "Fácil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat006500000000",
    "name": "Agonia Reconfortante",
    "type": "feature",
    "img": "icons/magic/death/skull-energy-purple.svg",
    "folder": "fldfeat040000000",
    "_key": "!items!feat006500000000",
    "system": {
      "name": "Agonia Reconfortante",
      "description": "Caso um Alvo Inimigo a até 4 metros dessa criatura receba qualquer tipo de dano, ela receberá o seu total máximo de Poder como Pontos de Vida Temporários. Esse efeito ocorre apenas uma vez por turno.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Não-Vivos",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat006600000000",
    "name": "Esvair Essência",
    "type": "feature",
    "img": "icons/magic/death/skull-energy-purple.svg",
    "folder": "fldfeat040000000",
    "_key": "!items!feat006600000000",
    "system": {
      "name": "Esvair Essência",
      "description": "utilizar essa Característica para forçá-lo a um teste de Espírito, Dif. 8. Caso falhe, o Alvo perderá 1d4 Pontos de Energia.",
      "category": "caracteristica",
      "cost": "1 PE",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Não-Vivos",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat006700000000",
    "name": "Forma Apavorante",
    "type": "feature",
    "img": "icons/magic/death/skull-energy-purple.svg",
    "folder": "fldfeat040000000",
    "_key": "!items!feat006700000000",
    "system": {
      "name": "Forma Apavorante",
      "description": "Essa criatura tem uma aparência distorcida e apavorante. Por isso, caso um Alvo Inimigo inicie o seu turno a até 3 metros da criatura, ele deverá Árealizar um teste de Espírito, Dif. 8. Caso falhe, o Alvo receberá Inaptidão em todos os seus testes de Parâmetros até o final desse turno.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "presenca",
      "typeAbility": "caracteristica",
      "types": [
        "presenca"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Não-Vivos",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat00670000",
          "name": "Forma Apavorante",
          "description": "Essa criatura tem uma aparência distorcida e apavorante. Por isso, caso um Alvo Inimigo inicie o seu turno a até 3 metros da criatura, ele deverá Árealizar um teste de Espírito, Dif. 8. Caso falhe, o Alvo receberá Inaptidão em todos os seus testes de...",
          "cost": "",
          "type": {
            "actionType": "presenca",
            "category": "utilidade",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": false,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "spirit",
            "difficulty": 8,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat006800000000",
    "name": "Muralha de Ossos",
    "type": "feature",
    "img": "icons/magic/death/skull-energy-purple.svg",
    "folder": "fldfeat040000000",
    "_key": "!items!feat006800000000",
    "system": {
      "name": "Muralha de Ossos",
      "description": "Iniciativa | Conjuração Essa criatura invoca uma Estrutura feita de ossos de 3 metros de altura, 6 metros de comprimento e 1 metro de espessura à sua frente. Todos os Alvos Inimigos que iniciarem o seu turno a até 2 metros dessa Estrutura deverão Árealizar um teste de Vigor, Dif. 8. Caso falhem, receberão 1d8 de Dano Mágico Profano para cada ponto de Poder da criatura. CAPACIDADE Essa Estrutura não possui Pontos de Vida, mas sim 5 pontos de Capacidade. Caso essa Estrutura receba qualquer tipo de dano, ela perderá 1 ponto de Capacidade. Com zero pontos de Capacidade, a Estrutura é destruída.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Não-Vivos",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat006900000000",
    "name": "Sussurros Atormentadores",
    "type": "feature",
    "img": "icons/magic/death/skull-energy-purple.svg",
    "folder": "fldfeat040000000",
    "_key": "!items!feat006900000000",
    "system": {
      "name": "Sussurros Atormentadores",
      "description": "Condição Mágica | Duração: 1 Minuto Essa criatura aplica es sa Condição Mágica em um Alvo a até 6 metros. O Alvo ouve diversas vozes na sua cabeça, nos mais diversos idiomas, reduzindo em 1 todo Resultado Natural dos seus testes de Parâmetros. Alvos afetados por es sa Condição Mágica poderão Árealizar um teste de Espírito, Dif. 8, ao final dos seus turnos. Caso tenh am sucesso, essa Condição Mágica será removida. Caso a Condição Mágica seja removida, seu Alvo deverá rolar 1d12, sendo afetado por um dos efeitos abaixo, de acordo com o resultado do dado, até o final de seu próximo turno: 1. Enfraquecido. 2. Atordoado. 3. Lentidão. 4. Envenenado. 5. Sangramento. 6. Imóvel. 7. Todos os seus testes de Parâmetros são reduzidos em 2. 8. Todos os seus custos de Pontos de Energia são aumentados em 1. 9. Você não pode Árealizar Ações com custos de Pontos de Energia. 10. Você não pode Árealizar Ataques Físicos e Ataques Mágicos. 11. Você não pode Árealizar Ações que afetem você e Alvos Aliados. 12. Nada acontece.",
      "category": "caracteristica",
      "cost": "2 PE",
      "typeAction": "acaoAtiva",
      "typeAbility": "caracteristica",
      "types": [
        "acaoAtiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Não-Vivos",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat00690000",
          "name": "Sussurros Atormentadores",
          "description": "Condição Mágica | Duração: 1 Minuto Essa criatura aplica es sa Condição Mágica em um Alvo a até 6 metros. O Alvo ouve diversas vozes na sua cabeça, nos mais diversos idiomas, reduzindo em 1 todo Resultado Natural dos seus testes de Parâmetros. Alvos ...",
          "cost": "2 PE",
          "type": {
            "actionType": "acaoAtiva",
            "category": "ataque_magico",
            "tags": [
              "Conjuração"
            ]
          },
          "attack": {
            "hasAttack": true,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": false,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": true,
            "status": "sangramento",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "spirit",
            "difficulty": 8,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat007000000000",
    "name": "Energia Fantasma",
    "type": "feature",
    "img": "icons/magic/death/skull-energy-purple.svg",
    "folder": "fldfeat040000000",
    "_key": "!items!feat007000000000",
    "system": {
      "name": "Energia Fantasma",
      "description": "Até o final desse turno, todos os danos causados por essa criatura são considerados Danos Imateriais, ignorando também Aptidões, Prioridade e todos os tipos de Coberturas.",
      "category": "caracteristica",
      "cost": "1 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "caracteristica",
      "types": [
        "acaoSimples"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Não-Vivos",
      "tier": "Difícil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat00700000",
          "name": "Energia Fantasma",
          "description": "Até o final desse turno, todos os danos causados por essa criatura são considerados Danos Imateriais, ignorando também Aptidões, Prioridade e todos os tipos de Coberturas.",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "ataque_magico",
            "tags": [
              "Conjuração"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat007100000000",
    "name": "Eternidade",
    "type": "feature",
    "img": "icons/magic/death/skull-energy-purple.svg",
    "folder": "fldfeat040000000",
    "_key": "!items!feat007100000000",
    "system": {
      "name": "Eternidade",
      "description": "Caso essa criatura chegue a zero, ou menos, Pontos de Vida, ela regenerará metade do seu total máximo de Pontos de Vida. O efeito de ssa Característica ocorre apenas uma vez por combate.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "acaoFinal",
      "typeAbility": "caracteristica",
      "types": [
        "acaoFinal"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Não-Vivos",
      "tier": "Difícil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat00710000",
          "name": "Eternidade",
          "description": "Caso essa criatura chegue a zero, ou menos, Pontos de Vida, ela regenerará metade do seu total máximo de Pontos de Vida. O efeito de ssa Característica ocorre apenas uma vez por combate.",
          "cost": "",
          "type": {
            "actionType": "acaoFinal",
            "category": "suporte",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": false,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": true,
            "formula": "@power",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat007200000000",
    "name": "Gelatinoso",
    "type": "feature",
    "img": "icons/magic/death/skull-energy-purple.svg",
    "folder": "fldfeat040000000",
    "_key": "!items!feat007200000000",
    "system": {
      "name": "Gelatinoso",
      "description": "Essa criatura possui as partes do seu corpo desmembradas e revestidas por um visco pegajoso, que concede sucesso automático em todos os testes de Vigor, além de ser imune a Manobras de Combate. Além disso, essa criatura pode utilizar a sua Movimentação para se movimentar através de um Alvo, fazendo com que ele receba o total máximo de Pontos de Energia dessa criatura como Dano Imaterial. Esse efeito ocorre apenas uma vez por alvo, por turno.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Não-Vivos",
      "tier": "Difícil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat007300000000",
    "name": "Manto dos Mortos",
    "type": "feature",
    "img": "icons/magic/death/skull-energy-purple.svg",
    "folder": "fldfeat040000000",
    "_key": "!items!feat007300000000",
    "system": {
      "name": "Manto dos Mortos",
      "description": "Essa criatura emana uma densa energia sombria, que reveste o seu corpo e tudo ao seu redor. Todos os Alvos Inimigos a até 5 metros são afetados por Escuridão Mística. Além disso, t odos os Alvos Inimigos a até 5 metros da criatura possuem Inaptidão nos seus Dados de Morte, alé m de receberem uma Sentença do Corruptor caso o resultado nesse teste seja 8, ou menos.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "presenca",
      "typeAbility": "caracteristica",
      "types": [
        "presenca"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Não-Vivos",
      "tier": "Difícil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat00730000",
          "name": "Manto dos Mortos",
          "description": "Essa criatura emana uma densa energia sombria, que reveste o seu corpo e tudo ao seu redor. Todos os Alvos Inimigos a até 5 metros são afetados por Escuridão Mística. Além disso, t odos os Alvos Inimigos a até 5 metros da criatura possuem Inaptidão n...",
          "cost": "",
          "type": {
            "actionType": "presenca",
            "category": "utilidade",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": false,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat007400000000",
    "name": "A Colheita",
    "type": "feature",
    "img": "icons/magic/death/skull-energy-purple.svg",
    "folder": "fldfeat040000000",
    "_key": "!items!feat007400000000",
    "system": {
      "name": "A Colheita",
      "description": "Essa criatura canaliza forças obscuras ao seu redor, criando uma mandala aos seus pés e forçando todos os Alvos Inimigos a até 8 metros a um teste de Espírito, Dif. 10. Caso falhem, recebe m 1d12 de Dano Mágico Profano para cada ponto de Poder da criatura. A criatura re cebe uma regeneração de Pontos de Vida equivalente à metade do dano causado por essa Característica.",
      "category": "caracteristica",
      "cost": "5 PE",
      "typeAction": "acaoAtiva",
      "typeAbility": "caracteristica",
      "types": [
        "acaoAtiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Não-Vivos",
      "tier": "Extrema",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat00740000",
          "name": "A Colheita",
          "description": "Essa criatura canaliza forças obscuras ao seu redor, criando uma mandala aos seus pés e forçando todos os Alvos Inimigos a até 8 metros a um teste de Espírito, Dif. 10. Caso falhem, recebe m 1d12 de Dano Mágico Profano para cada ponto de Poder da cri...",
          "cost": "5 PE",
          "type": {
            "actionType": "acaoAtiva",
            "category": "ataque_magico",
            "tags": [
              "Conjuração"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "1d12",
            "type": "immaterial",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "spirit",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat007500000000",
    "name": "Etéreo",
    "type": "feature",
    "img": "icons/magic/death/skull-energy-purple.svg",
    "folder": "fldfeat040000000",
    "_key": "!items!feat007500000000",
    "system": {
      "name": "Etéreo",
      "description": "Essa criatura não possui forma física, atravessando todo e qualquer objeto e Alvo físico. Além disso, possui Imunidade [Dano Físico] e é imune a Manobras de Combate. Todo Dano Mágico causado nessa criatura recebe o efeito de Amplificar. Essa Característica só pode ser obtida por criaturas que possuam apenas Características do Livro dos Seres Não -Vivos, Livro dos Seres Comuns ou ambos.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Não-Vivos",
      "tier": "Extrema",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat007600000000",
    "name": "Horda de Esqueletos",
    "type": "feature",
    "img": "icons/magic/death/skull-energy-purple.svg",
    "folder": "fldfeat040000000",
    "_key": "!items!feat007600000000",
    "system": {
      "name": "Horda de Esqueletos",
      "description": "Iniciativa | Conjuração os restos mortais de criaturas ao seu redor. Dessas criaturas, surgem um número de Esqueletos Rastejantes iÁgual ao seu total de Poder, em locais diferentes a até 6 metros. Sempre que essa criatura iniciar o seu turno ela poderá Áreanimar um novo Esqueleto Rastejante. Esses Esqueletos Rastejantes podem final do turno da criatura. Caso a criatura que convocou es ses Esqueletos Rastejantes morra, todos os Esqueletos Rastejantes convocados por ela se desfazem em uma pilha de pó. Esqueletos Rastejantes não possuem Níveis de Criatura.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "acaoAtiva",
      "typeAbility": "caracteristica",
      "types": [
        "acaoAtiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Não-Vivos",
      "tier": "Extrema",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat00760000",
          "name": "Horda de Esqueletos",
          "description": "Iniciativa | Conjuração os restos mortais de criaturas ao seu redor. Dessas criaturas, surgem um número de Esqueletos Rastejantes iÁgual ao seu total de Poder, em locais diferentes a até 6 metros. Sempre que essa criatura iniciar o seu turno ela pode...",
          "cost": "",
          "type": {
            "actionType": "acaoAtiva",
            "category": "utilidade",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": false,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat007700000000",
    "name": "Esqueleto Rastejante",
    "type": "feature",
    "img": "icons/magic/death/skull-energy-purple.svg",
    "folder": "fldfeat040000000",
    "_key": "!items!feat007700000000",
    "system": {
      "name": "Esqueleto Rastejante",
      "description": "PV: 50 | Poder: 3 Parâmetros Ofensivos: 3 | Parâmetros Defensivos: 0 Categoria de Tamanho Médio Livros Características Comuns Ignorar Defesas Comuns Resistência Incomum Não-Vivos Ferida Purulenta Adicionais Não-Vivos Corpo Apodrecido",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Não-Vivos",
      "tier": "Extrema",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat007800000000",
    "name": "Obeliscos da Não-vida",
    "type": "feature",
    "img": "icons/magic/death/skull-energy-purple.svg",
    "folder": "fldfeat040000000",
    "_key": "!items!feat007800000000",
    "system": {
      "name": "Obeliscos da Não-vida",
      "description": "menos, essa criatura é imbuída por forças profanas, convocando 3 Estruturas que ocupam o espaço de 1 metro em locais diferentes a até 8 metros. Essa criatura não pode ter os seus Pontos de Vida menores que 1 enquanto uma dessas Estruturas ainda existir. Caso um Alvo Inimigo se aproxime ou inicie o seu turno a até 2 metros de uma dessas Estruturas, ele deverá Árealizar um teste de Espírito, Dif. 10. Caso falhe, esse Alvo Inimigo é afetado por Atordoado e Lentidão. Alvos só podem ser afetado uma vez por turno por esse efeito. CAPACIDADE As Estruturas convocadas por essa Característica não possuem Pontos de Vida, mas sim 5 pontos de Capacidade. Caso uma Estrutura convocada por essa Característica receba qualquer tipo de dano, ela perderá 1 ponto de Capacidade. Com zero pontos de Capacidade, a Estrutura é destruída.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Não-Vivos",
      "tier": "Extrema",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat007900000000",
    "name": "Vínculo Maldito",
    "type": "feature",
    "img": "icons/magic/death/skull-energy-purple.svg",
    "folder": "fldfeat040000000",
    "_key": "!items!feat007900000000",
    "system": {
      "name": "Vínculo Maldito",
      "description": "Condição Mágica | Foco | Duração: 1 Minuto Essa criatura aplica es sa Condição Mágica a um Alvo a até 8 metros. Sempre que essa criatura receber qualquer tipo de dano de um Alvo Inimigo, o Alvo afetado pela Condição Mágica receberá o total máximo de Pontos de Energia da criatura como Dano Mágico Profano. Esse efeito ocorre apenas uma vez por turno. Alvos afetados por essa Condição Mágica poderão Árealizar um teste de Espírito, Dif. 10, ao final dos seus turnos. Caso tenham sucesso, essa Condição Mágica será removida.",
      "category": "caracteristica",
      "cost": "3 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "caracteristica",
      "types": [
        "acaoSimples"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Não-Vivos",
      "tier": "Extrema",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat00790000",
          "name": "Vínculo Maldito",
          "description": "Condição Mágica | Foco | Duração: 1 Minuto Essa criatura aplica es sa Condição Mágica a um Alvo a até 8 metros. Sempre que essa criatura receber qualquer tipo de dano de um Alvo Inimigo, o Alvo afetado pela Condição Mágica receberá o total máximo de ...",
          "cost": "3 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "ataque_magico",
            "tags": [
              "Conjuração"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": true,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "spirit",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat008000000000",
    "name": "Núcleo Elemental",
    "type": "feature",
    "img": "icons/magic/fire/flame-burning-yellow-orange.svg",
    "folder": "fldfeat050000000",
    "_key": "!items!feat008000000000",
    "system": {
      "name": "Núcleo Elemental",
      "description": "Criaturas do Homuncularium com, pelo menos, uma Característica deste Livro receberão também essa Característica adicional. A criatura possui um Núcleo Elemental pré-definido pelo Narrador, concedendo -a uma Resistência Mágica e uma Fraqueza Mágica, ambas referentes ao elemento escolhido: Todo Dano Mágico Neutro causado pelas Características deste Livro e pela Evocação Mística da criatura é transformada no Dano Mágico elemental referente ao Núcleo Elemental da criatura. Criaturas de Dificuldade Difícil e Extrema podem possuir um Núcleo Elemental adicional. Nesse caso, sempre que ela utilizar uma Característica deste Livro que cause Dano Mágico Neutro, ela deverá escolher um dos seus Núcleos Elementais para transformar o dano.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Elementais",
      "tier": "Adicional",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat008100000000",
    "name": "Furor Elemental",
    "type": "feature",
    "img": "icons/magic/fire/flame-burning-yellow-orange.svg",
    "folder": "fldfeat050000000",
    "_key": "!items!feat008100000000",
    "system": {
      "name": "Furor Elemental",
      "description": "explode, causando 1d8 de Dano Mágico Neutro para cada ponto de Poder em todos os Alvos a até 5 metros. Alvos dentro do alcance des sa Característica podem Árealizar um teste de Agilidade, Dif. 8. C aso tenha m sucesso, receber ão metade do dano causado pela Característica.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Elementais",
      "tier": "Fácil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat008200000000",
    "name": "Matriz Elemental",
    "type": "feature",
    "img": "icons/magic/fire/flame-burning-yellow-orange.svg",
    "folder": "fldfeat050000000",
    "_key": "!items!feat008200000000",
    "system": {
      "name": "Matriz Elemental",
      "description": "Essa criatura recebe um dos seguintes efeitos, baseado no elemento do seu Núcleo Elemental: • Fogo: Após rolar os dados de dano de um Dano Mágico, essa criatura pode selecionar quantos dados quiser para rolá -los novamente, ficando com os novos resultados. Esse efeito só pode ser Árealizado uma vez por turno. • ÁÁgua: Alvos que Árealizarem testes de Defesa contra essa criatura não podem ser afetados por efeitos de Aptidão e Prioridade nesse teste. • Vento: Essa criatura recebe o seu total de pontos de Poder como metros adicionais em sua Movimentação. • Terra: Essa criatura reduz pela metade o primeiro dano recebido em uma rodada. Esse efeito ocorre em todas as rodadas de um combate. • Trovão: Todos os Ataques Mágicos dessa criatura atingem um Alvo adicional. Um único teste de Canalização é necessário. Caso atingido, o Alvo adicional recebe metade do dano causado ao Alvo primário por esse Ataque Mágico. • Gelo: Sempre que essa criatura Árealizar um Ataque Mágico, e o seu Resultado Natural (Canalização) seja 10, ou mais, e ela acerte o Alvo deste ataque, ele não poderá Árealizar a sua Movimentação até o final de seu próximo turno.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Elementais",
      "tier": "Fácil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat008300000000",
    "name": "Potência Elemental",
    "type": "feature",
    "img": "icons/magic/fire/flame-burning-yellow-orange.svg",
    "folder": "fldfeat050000000",
    "_key": "!items!feat008300000000",
    "system": {
      "name": "Potência Elemental",
      "description": "Essa criatura manifesta ainda mais as suas forças elementais, permitindo que o próximo Dano Mágico causado por ela seja afetado por Amplificar. Caso não seja utilizado, esse efeito é removido no início do próximo turno da criatura. Núcleo Elemental Resistência Mágica Fraqueza Mágica Fogo Fogo ÁÁgua ÁÁgua ÁÁgua Trovão Vento Vento Gelo Terra Terra Vento Trovão Trovão Terra Gelo Gelo Fogo",
      "category": "caracteristica",
      "cost": "1 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "caracteristica",
      "types": [
        "acaoSimples"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Elementais",
      "tier": "Fácil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat00830000",
          "name": "Potência Elemental",
          "description": "Essa criatura manifesta ainda mais as suas forças elementais, permitindo que o próximo Dano Mágico causado por ela seja afetado por Amplificar. Caso não seja utilizado, esse efeito é removido no início do próximo turno da criatura. Núcleo Elemental R...",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "ataque_magico",
            "tags": [
              "Conjuração"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat008400000000",
    "name": "Subversão Elemental",
    "type": "feature",
    "img": "icons/magic/fire/flame-burning-yellow-orange.svg",
    "folder": "fldfeat050000000",
    "_key": "!items!feat008400000000",
    "system": {
      "name": "Subversão Elemental",
      "description": "Caso essa criatura fosse receber um Dano Mágico, ela pode utilizar essa Característica para alterar o tipo de Dano Mágico causado para o elemento do seu Núcleo Elemental.",
      "category": "caracteristica",
      "cost": "1 PE",
      "typeAction": "acaoRapida",
      "typeAbility": "caracteristica",
      "types": [
        "acaoRapida"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Elementais",
      "tier": "Fácil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat00840000",
          "name": "Subversão Elemental",
          "description": "Caso essa criatura fosse receber um Dano Mágico, ela pode utilizar essa Característica para alterar o tipo de Dano Mágico causado para o elemento do seu Núcleo Elemental.",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoRapida",
            "category": "ataque_magico",
            "tags": [
              "Conjuração"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat008500000000",
    "name": "Armadilhas Elementais",
    "type": "feature",
    "img": "icons/magic/fire/flame-burning-yellow-orange.svg",
    "folder": "fldfeat050000000",
    "_key": "!items!feat008500000000",
    "system": {
      "name": "Armadilhas Elementais",
      "description": "Iniciativa | Conjuração Elementais equivalente ao seu total de Poder a até 8 metros. Esses fragmentos são Invisíveis, ocupam uma áÁrea de 1 metro e não podem ficar sobrepostos. Alvos que utilizarem uma Movimentação sobre a áÁrea de um Fragmento Elemental receberão 1d6 de Dano Mágico Neutro por ponto de Poder da criatura que conjurou o Fragmento Elemental.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Elementais",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat008600000000",
    "name": "Aura Elemental",
    "type": "feature",
    "img": "icons/magic/fire/flame-burning-yellow-orange.svg",
    "folder": "fldfeat050000000",
    "_key": "!items!feat008600000000",
    "system": {
      "name": "Aura Elemental",
      "description": "Essa criatura emana uma energia elemental descontrolada, causando o dobro do total de pontos de Poder da criatura como Dano Mágico Neutro a todos os Alvos Inimigos que finalizarem o seu turno a até 3 metros dela.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "presenca",
      "typeAbility": "caracteristica",
      "types": [
        "presenca"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Elementais",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat00860000",
          "name": "Aura Elemental",
          "description": "Essa criatura emana uma energia elemental descontrolada, causando o dobro do total de pontos de Poder da criatura como Dano Mágico Neutro a todos os Alvos Inimigos que finalizarem o seu turno a até 3 metros dela.",
          "cost": "",
          "type": {
            "actionType": "presenca",
            "category": "ataque_magico",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat008700000000",
    "name": "Esfera Elemental",
    "type": "feature",
    "img": "icons/magic/fire/flame-burning-yellow-orange.svg",
    "folder": "fldfeat050000000",
    "_key": "!items!feat008700000000",
    "system": {
      "name": "Esfera Elemental",
      "description": "Essa criatura condensa o Véu e as forças elementais do seu corpo, criando uma explosão elemental em um ponto a até 8 metros. Todos os Alvos a até 3 metros da explosão recebem 1d8 de Dano Mágico Neutro para cada ponto de Poder da criatura. Alvos dentro do alcance da explosão podem Árealizar um teste de Agilidade, Dif. 8. Caso tenha m sucesso, receber ão metade do dano causado pela Característica. EVOCAÇÃO ELEMENTAL Essa criatura possui Imunidade ao elemento do seu Núcleo Elemental. elemental, forçando um Alvo a até 8 metros a um teste de Defesa, Dif. 8. Caso falhe, ele receberá o total máximo de Pontos de Energia dessa criatura como Dano Mágico Neutro.",
      "category": "caracteristica",
      "cost": "2 PE",
      "typeAction": "acaoFinal",
      "typeAbility": "caracteristica",
      "types": [
        "acaoFinal"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Elementais",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat00870000",
          "name": "Esfera Elemental",
          "description": "Essa criatura condensa o Véu e as forças elementais do seu corpo, criando uma explosão elemental em um ponto a até 8 metros. Todos os Alvos a até 3 metros da explosão recebem 1d8 de Dano Mágico Neutro para cada ponto de Poder da criatura. Alvos dentr...",
          "cost": "2 PE",
          "type": {
            "actionType": "acaoFinal",
            "category": "ataque_magico",
            "tags": [
              "Conjuração"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "1d8",
            "type": "immaterial",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "agility",
            "difficulty": 8,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat008800000000",
    "name": "Obstáculo Elemental",
    "type": "feature",
    "img": "icons/magic/fire/flame-burning-yellow-orange.svg",
    "folder": "fldfeat050000000",
    "_key": "!items!feat008800000000",
    "system": {
      "name": "Obstáculo Elemental",
      "description": "Caso um Alvo esteja utilizando uma Movimentação a até 8 metros, essa criatura pode utilizar essa Característica para criar um objeto místico no trajeto do Alvo, forçando -o a um teste de Agilidade, Dif. 8. Caso falhe, ele receberá 1d6 de Dano Mágico Neutro para cada ponto de Poder da criatura, além de ter a sua Movimentação interrompida, sem poder utilizar novas Movimentações nesse turno.",
      "category": "caracteristica",
      "cost": "2 PE",
      "typeAction": "acaoRapida",
      "typeAbility": "caracteristica",
      "types": [
        "acaoRapida"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Elementais",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat00880000",
          "name": "Obstáculo Elemental",
          "description": "Caso um Alvo esteja utilizando uma Movimentação a até 8 metros, essa criatura pode utilizar essa Característica para criar um objeto místico no trajeto do Alvo, forçando -o a um teste de Agilidade, Dif. 8. Caso falhe, ele receberá 1d6 de Dano Mágico ...",
          "cost": "2 PE",
          "type": {
            "actionType": "acaoRapida",
            "category": "ataque_magico",
            "tags": [
              "Conjuração"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "1d6",
            "type": "immaterial",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "agility",
            "difficulty": 8,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat008900000000",
    "name": "Enfraquecimento Elemental",
    "type": "feature",
    "img": "icons/magic/fire/flame-burning-yellow-orange.svg",
    "folder": "fldfeat050000000",
    "_key": "!items!feat008900000000",
    "system": {
      "name": "Enfraquecimento Elemental",
      "description": "Essa criatura tenta enfraquecer as resistências elementais de um número de Alvos iÁgual ao seu total de Poder a até 8 metros, forçando-os a um teste de Espírito, Dif. 10. Caso falhem, receberão uma Fraqueza Elemental do mesmo elemento do Núcleo Elemental da criatura. Essa Fraqueza Elemental é removida dos Alvos caso eles recebam um Dano Mágico do mesmo elemento do Núcleo Elemental da criatura. Alvos que não receberem esse Dano Mágico terão esse efeito removido em 1 minuto.",
      "category": "caracteristica",
      "cost": "3 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "caracteristica",
      "types": [
        "acaoSimples"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Elementais",
      "tier": "Difícil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat00890000",
          "name": "Enfraquecimento Elemental",
          "description": "Essa criatura tenta enfraquecer as resistências elementais de um número de Alvos iÁgual ao seu total de Poder a até 8 metros, forçando-os a um teste de Espírito, Dif. 10. Caso falhem, receberão uma Fraqueza Elemental do mesmo elemento do Núcleo Eleme...",
          "cost": "3 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "ataque_magico",
            "tags": [
              "Conjuração"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "spirit",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat009000000000",
    "name": "Marca Elemental",
    "type": "feature",
    "img": "icons/magic/fire/flame-burning-yellow-orange.svg",
    "folder": "fldfeat050000000",
    "_key": "!items!feat009000000000",
    "system": {
      "name": "Marca Elemental",
      "description": "Iniciativa | Conjuração Condição Mágica Essa criatura aplica es sa Condição Mágica em um número de Alvos iÁgual ao seu total de Poder a até 8 metros. Enquanto estiverem com esta Condição Mágica, se receberem um Dano Elemental referente ao Núcleo Elemental da criatura, esses Alvos perderão um valor adicional de Pontos de Vida equivalente ao seu próprio total máximo de Pontos de Energia. Esse efeito ocorre apenas uma vez por turno, por Alvo. Alvos afetados por es sa Condição Mágica poderão Árealizar um teste de Espírito, Dif. 10, ao final dos seus turnos. Caso tenham sucesso, essa Condição Mágica será removida.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Elementais",
      "tier": "Difícil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat009100000000",
    "name": "Corpo Elemental",
    "type": "feature",
    "img": "icons/magic/fire/flame-burning-yellow-orange.svg",
    "folder": "fldfeat050000000",
    "_key": "!items!feat009100000000",
    "system": {
      "name": "Corpo Elemental",
      "description": "Essa criatura quase não possui um corpo físico, portanto, todo Ataque Físico e Ataque Mágico contra a criatura deve ser Árealizado somente com o Resultado Natural do d12, sem adicionais de Precisão ou Canalização.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Elementais",
      "tier": "Difícil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat009200000000",
    "name": "Forças Elementais",
    "type": "feature",
    "img": "icons/magic/fire/flame-burning-yellow-orange.svg",
    "folder": "fldfeat050000000",
    "_key": "!items!feat009200000000",
    "system": {
      "name": "Forças Elementais",
      "description": "Caso essa criatura receba qualquer tipo de dano, ela poderá utilizar essa Característica para gerar uma pequena explosão elemental, causando o seu próprio total máximo de Pontos de Energia como Dano Mágico Neutro em todos os Alvos a até 3 metros.",
      "category": "caracteristica",
      "cost": "2 PE",
      "typeAction": "acaoRapida",
      "typeAbility": "caracteristica",
      "types": [
        "acaoRapida"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Elementais",
      "tier": "Difícil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat00920000",
          "name": "Forças Elementais",
          "description": "Caso essa criatura receba qualquer tipo de dano, ela poderá utilizar essa Característica para gerar uma pequena explosão elemental, causando o seu próprio total máximo de Pontos de Energia como Dano Mágico Neutro em todos os Alvos a até 3 metros.",
          "cost": "2 PE",
          "type": {
            "actionType": "acaoRapida",
            "category": "ataque_magico",
            "tags": [
              "Conjuração"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat009300000000",
    "name": "Zona Elemental",
    "type": "feature",
    "img": "icons/magic/fire/flame-burning-yellow-orange.svg",
    "folder": "fldfeat050000000",
    "_key": "!items!feat009300000000",
    "system": {
      "name": "Zona Elemental",
      "description": "Foco | Duração: 10 Minutos Essa criatura canaliza uma zona elemental centrada em um ponto em uma superfície a até 8 metros, que afeta toda a áÁrea a até 3 metros do ponto de origem. Alvos Inimigos que iniciarem o seu turno, ou utilizarem uma Movimentação através da áÁrea afetada pela Característica, receberão 1d10 de Dano Mágico Neutro por ponto de Poder da criatura. A áÁrea afetada por essa Característica é considerada um Terreno Difícil. Alvos só podem ser afeta dos pelo dano dessa Característica uma vez por turno.",
      "category": "caracteristica",
      "cost": "3 PE",
      "typeAction": "acaoAtiva",
      "typeAbility": "caracteristica",
      "types": [
        "acaoAtiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Elementais",
      "tier": "Difícil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat00930000",
          "name": "Zona Elemental",
          "description": "Foco | Duração: 10 Minutos Essa criatura canaliza uma zona elemental centrada em um ponto em uma superfície a até 8 metros, que afeta toda a áÁrea a até 3 metros do ponto de origem. Alvos Inimigos que iniciarem o seu turno, ou utilizarem uma Moviment...",
          "cost": "3 PE",
          "type": {
            "actionType": "acaoAtiva",
            "category": "ataque_magico",
            "tags": [
              "Conjuração"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "1d10",
            "type": "immaterial",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat009400000000",
    "name": "Cataclisma Elemental: Fogo",
    "type": "feature",
    "img": "icons/magic/fire/flame-burning-yellow-orange.svg",
    "folder": "fldfeat050000000",
    "_key": "!items!feat009400000000",
    "system": {
      "name": "Cataclisma Elemental: Fogo",
      "description": "menos, essa criatura evoca os poderes elementais que transbordam dentro de si, tornando-se um aspecto do próprio elemento, recebendo os seguintes efeitos até o final do combate: • A temperatura des sa criatura é extremamente alta, por isso, todo Alvo que iniciar o seu turno a até 5 metros da criatura recebe o total de PE da criatura como Dano Mágico de Fogo. • Alvos que receberem Dano Mágico de Fogo dessa criatura também recebem Queimadura por 1 minuto. Alvos afetados por Queimadura poderão Árealizar um teste de Vigor, Dif. 10, ao final dos seus turnos. Caso tenham sucesso, Queimadura será removido. Queimadura: O primeiro Dano Mágico de Fogo que você receber em um turno é aumentado em 1d20. Essa criatura, assim como outras criaturas com Núcleo Elemental de Fogo, não é afetada pelos efeitos gerados por esta Característica. Os efeitos des sa Característica podem ser desfeitos a qualquer momento p ela criatura, ou caso ela chegue a zero, ou menos, Pontos de Vida.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Elementais",
      "tier": "Extrema",
      "requirement": "Núcleo Elemental: Fogo",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat009500000000",
    "name": "Cataclisma Elemental: Áágua",
    "type": "feature",
    "img": "icons/magic/fire/flame-burning-yellow-orange.svg",
    "folder": "fldfeat050000000",
    "_key": "!items!feat009500000000",
    "system": {
      "name": "Cataclisma Elemental: Áágua",
      "description": "menos, essa criatura evoca os poderes elementais que transbordam dentro de si, tornando-se um aspecto do próprio elemento, recebendo os seguintes efeitos até o final do combate: • A criatura gera um uma gigantesca bolha mística de áÁgua, envolvendo tudo ao seu redor em um raio de 20 metros. Todos os Alvos dentro da bolha ficam submersos, sendo afetados pelos efeitos de Combate Aquático. • Todos os Alvos que iniciarem o seu turno dentro da bolha dever ão Árealizar um teste de Vigor, Dif. 10. Caso falhem, perderão um valor de Pontos de Vida equivalente ao seu próprio total máximo de Pontos de Energia, por conta da pressão gerada p ela bolha. Es se dano não pode ser reduzido, nem prevenido. Essa criatura, assim como outras criaturas com Núcleo Elemental de ÁÁgua, não é afetada pelos efeitos gerados por esta Característica. Os efeitos des sa Característica podem ser desfeitos a qualquer momento p ela criatura, ou caso ela chegue a zero, ou menos, Pontos de Vida.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Elementais",
      "tier": "Extrema",
      "requirement": "Núcleo Elemental: ÁÁgua",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat009600000000",
    "name": "Cataclisma Elemental: Vento",
    "type": "feature",
    "img": "icons/magic/fire/flame-burning-yellow-orange.svg",
    "folder": "fldfeat050000000",
    "_key": "!items!feat009600000000",
    "system": {
      "name": "Cataclisma Elemental: Vento",
      "description": "menos, essa criatura evoca os poderes elementais que transbordam dentro de si, tornando-se um aspecto do próprio elemento, recebendo os seguintes efeitos até o final do combate: • A criatura gera uma ventania descontrolada, formando diversos tornados místicos no início dos turnos da criatura. Esses tornados vão na direção de todos os Alvos a até 20 metros. Alvos dentro do alcance dos tornados dever ão Árealizar um teste de Agilidade, Dif. 10. Caso falhem, são arremessados 2d12 metros para cima. • Alvos que iniciarem o seu turno a até 20 metros da criatura deverão Árealizar um teste de Vigor, Dif. 10. Caso falhem, ser ão movimentados para uma direção a até 8 metros, à escolha da criatura. Essa criatura, assim como outras criaturas com Núcleo Elemental de Vento, não é afetada pelos efeitos gerados por esta Característica. Os efeitos des sa Característica podem ser desfeitos a qualquer momento p ela criatura, ou caso ela chegue a zero, ou menos, Pontos de Vida.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Elementais",
      "tier": "Extrema",
      "requirement": "Núcleo Elemental: Vento",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat009700000000",
    "name": "Cataclisma Elemental: Terra",
    "type": "feature",
    "img": "icons/magic/fire/flame-burning-yellow-orange.svg",
    "folder": "fldfeat050000000",
    "_key": "!items!feat009700000000",
    "system": {
      "name": "Cataclisma Elemental: Terra",
      "description": "menos, essa criatura evoca os poderes elementais que transbordam dentro de si, tornando-se um aspecto do próprio elemento, recebendo os seguintes efeitos até o final do combate: • A criatura distorce todo o solo ao seu redor em um raio de 20 metros, tornando-o um Terreno Difícil. Alvos que iniciarem o seu turno dentro do Terreno Difícil deverão Árealizar um teste de Vigor, Dif. 10. Caso falhem, ficarão Caídos. • Sempre que um Alvo atingir a criatura com um Ataque Físico, e o Resultado Natural do teste de Precisão do Alvo seja 8, ou menos, ele não causará dano à criatura, mesmo que acerte o ataque. Essa criatura, assim como outras criaturas com Núcleo Elemental de Terra, não é afetada pelos efeitos gerados por esta Característica. Os efeitos des sa Característica podem ser desfeitos a qualquer momento p ela criatura, ou caso ela chegue a zero, ou menos, Pontos de Vida.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Elementais",
      "tier": "Extrema",
      "requirement": "Núcleo Elemental: Terra",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat009800000000",
    "name": "Cataclisma Elemental: Trovão",
    "type": "feature",
    "img": "icons/magic/fire/flame-burning-yellow-orange.svg",
    "folder": "fldfeat050000000",
    "_key": "!items!feat009800000000",
    "system": {
      "name": "Cataclisma Elemental: Trovão",
      "description": "menos, essa criatura evoca os poderes elementais que transbordam dentro de si, tornando-se um aspecto do próprio elemento, recebendo os seguintes efeitos até o final do combate: • A criatura gera uma tormenta de raios, afetando uma região ao seu redor em um raio de 20 metros. Alvos que iniciar em o seu turno dentro da tormenta devem Árealizar um teste de Agilidade, Dif. 10. Caso falhem, raios místicos atingirão esses Alvos, causando o total máximo de Pontos de Energia da criatura como Dano Mágico de Trovão, também aplicando Atordoado nesses Alvos. • Sempre que um Alvo atingir a criatura com um Ataque Mágico, e o Resultado Natural do teste de Canalização do Alvo seja 8, ou menos, ele não causará dano à criatura, mesmo que acerte o ataque. Essa criatura, assim como outras criaturas com Núcleo Elemental de Trovão, não é afetada pelos efeitos gerados por essa Característica. Os efeitos des sa Característica podem ser desfeitos a qualquer momento p ela criatura, ou caso ela chegue a zero, ou menos, Pontos de Vida.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Elementais",
      "tier": "Extrema",
      "requirement": "Núcleo Elemental: Trovão",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat009900000000",
    "name": "Cataclisma Elemental: Gelo",
    "type": "feature",
    "img": "icons/magic/fire/flame-burning-yellow-orange.svg",
    "folder": "fldfeat050000000",
    "_key": "!items!feat009900000000",
    "system": {
      "name": "Cataclisma Elemental: Gelo",
      "description": "menos, essa criatura evoca os poderes elementais que transbordam dentro de si, tornando-se um aspecto do próprio elemento, recebendo os seguintes efeitos até o final do combate: • A criatura gera uma nevasca mística, cobrindo toda uma região ao seu redor em um raio de 20 metros com Escuridão Mística. Alvos que iniciarem o seu turno dentro des sa nevasca devem Árealizar um teste de Espírito, Dif. 10. Caso falhem, receberão 1 ponto de Fratura e 1 ponto de Cristalizado. Sempre que um Alvo iniciar o seu turno, ele perderá 1 PE para cada ponto de Cristalizado que possua. • Alvos dentro do alcance dessa nevasca mística não podem manter Focos, além disso, precisam Árealizar um Teste de Destino, Dif. 8, Essa criatura, assim como outras criaturas com Núcleo Elemental de Gelo, não é afetada pelos efeitos gerados por es sa Característica. Os efeitos des sa Característica podem ser desfeitos a qualquer momento p ela criatura, ou caso ela chegue a zero, ou menos, Pontos de Vida.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Elementais",
      "tier": "Extrema",
      "requirement": "Núcleo Elemental: Gelo",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat010000000000",
    "name": "Nascido da Natureza",
    "type": "feature",
    "img": "icons/magic/nature/leaf-glowing-green.svg",
    "folder": "fldfeat060000000",
    "_key": "!items!feat010000000000",
    "system": {
      "name": "Nascido da Natureza",
      "description": "Criaturas do Homuncularium com, pelo menos, uma Característica deste Livro possuem Resistência Mágica [Natureza] e Fraqueza Mágica [Profano], além de serem imunes a Envenenado e Toxinas.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Primais",
      "tier": "Adicional",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat010100000000",
    "name": "Esporos Primevos",
    "type": "feature",
    "img": "icons/magic/nature/leaf-glowing-green.svg",
    "folder": "fldfeat060000000",
    "_key": "!items!feat010100000000",
    "system": {
      "name": "Esporos Primevos",
      "description": "criatura lança esporos venenosos ao ar, forçando todos os Alvos Inimigos a até 3 metros a um teste de Vigor, Dif. 8. Caso falhem, não poder ão ter os seus Pontos de Vida e Pontos de Energia regenerados até concluírem um Repouso.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Primais",
      "tier": "Fácil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat010200000000",
    "name": "Esvanecer Energias",
    "type": "feature",
    "img": "icons/magic/nature/leaf-glowing-green.svg",
    "folder": "fldfeat060000000",
    "_key": "!items!feat010200000000",
    "system": {
      "name": "Esvanecer Energias",
      "description": "Condição Mágica | Duração: 1 Minuto Essa criatura aplica es sa Condição Mágica a um Alvo a até 6 metros, fazendo com que todas as Ações desse Alvo, que custem Pontos de Energia, tenham os seus custos aumentados em 1. Alvos afetados por es sa Condição Mágica poderão Árealizar um teste de Espírito, Dif. 8, ao final dos seus turnos. Caso tenh am sucesso, essa Condição Mágica será removida.",
      "category": "caracteristica",
      "cost": "1 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "caracteristica",
      "types": [
        "acaoSimples"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Primais",
      "tier": "Fácil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat01020000",
          "name": "Esvanecer Energias",
          "description": "Condição Mágica | Duração: 1 Minuto Essa criatura aplica es sa Condição Mágica a um Alvo a até 6 metros, fazendo com que todas as Ações desse Alvo, que custem Pontos de Energia, tenham os seus custos aumentados em 1. Alvos afetados por es sa Condição...",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "ataque_magico",
            "tags": [
              "Conjuração"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": false,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": true,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "spirit",
            "difficulty": 8,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat010300000000",
    "name": "Nuvem de Pestilência",
    "type": "feature",
    "img": "icons/magic/nature/leaf-glowing-green.svg",
    "folder": "fldfeat060000000",
    "_key": "!items!feat010300000000",
    "system": {
      "name": "Nuvem de Pestilência",
      "description": "essa criatura pode utilizar essa Característica para criar uma nuvem tóxica a partir do Alvo do ataque, forçando-o, e a todos os outros Alvos a até 3 metros, a um teste de Vigor, Dif. 8. Caso falhem, ficarão Envenenados por 1 hora. REGENERAÇÃO PRIMAL de Vida equivalente ao dobro do seu total de Poder, desde que possua, pelo menos, 1 Ponto de Vida.",
      "category": "caracteristica",
      "cost": "1 PE",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Primais",
      "tier": "Fácil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat010400000000",
    "name": "Venenoso",
    "type": "feature",
    "img": "icons/magic/nature/leaf-glowing-green.svg",
    "folder": "fldfeat060000000",
    "_key": "!items!feat010400000000",
    "system": {
      "name": "Venenoso",
      "description": "Caso essa criatura tenha sucesso em atingir um Alvo com um Golpe Brutal ou Evocação Mística, e o Resultado Natural do ataque (Precisão ou Canalização) tenha sido 8, ou mais, a criatura aplicará Envenenado no Alvo por 1 hora. Com essa Característica, a criatura pode transformar todos os seus Danos Mágicos Neutros em Danos Mágicos de Natureza.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Primais",
      "tier": "Fácil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat010500000000",
    "name": "Carapaça Venenosa",
    "type": "feature",
    "img": "icons/magic/nature/leaf-glowing-green.svg",
    "folder": "fldfeat060000000",
    "_key": "!items!feat010500000000",
    "system": {
      "name": "Carapaça Venenosa",
      "description": "Essa criatura é revestida por fungos místicos e propriedades primais antigas, por isso, todos os Alvos que se aproximarem, ou que iniciarem o seu turno, a até 3 metros da criatura devem Árealizar um teste de Vigor, Dif. 8. Caso falhem, ficarão Envenenados por 1 hora.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "presenca",
      "typeAbility": "caracteristica",
      "types": [
        "presenca"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Primais",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat01050000",
          "name": "Carapaça Venenosa",
          "description": "Essa criatura é revestida por fungos místicos e propriedades primais antigas, por isso, todos os Alvos que se aproximarem, ou que iniciarem o seu turno, a até 3 metros da criatura devem Árealizar um teste de Vigor, Dif. 8. Caso falhem, ficarão Envene...",
          "cost": "",
          "type": {
            "actionType": "presenca",
            "category": "utilidade",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": false,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": true,
            "status": "envenenado",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 8,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat010600000000",
    "name": "Energias Tóxicas",
    "type": "feature",
    "img": "icons/magic/nature/leaf-glowing-green.svg",
    "folder": "fldfeat060000000",
    "_key": "!items!feat010600000000",
    "system": {
      "name": "Energias Tóxicas",
      "description": "Sempre que essa criatura causar um Dano Mágico de Natureza em um Alvo, ele ficará Intoxicado por 1 minuto. Intoxicado: Você não pode receber efeitos vindos de Poções e possui -1 em todo teste de Vigor. Alvos que possuam, pelo menos, uma Característica do Livro dos Seres Primais são imunes a esse efeito.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Primais",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat010700000000",
    "name": "Esporos Debilitantes",
    "type": "feature",
    "img": "icons/magic/nature/leaf-glowing-green.svg",
    "folder": "fldfeat060000000",
    "_key": "!items!feat010700000000",
    "system": {
      "name": "Esporos Debilitantes",
      "description": "metros, aplicando Lentidão a todos os Alvos dentro desse alcance. Esse Efeito Negativo permanece ativo por 1 minuto. Alvos afetado por esse Efeito Negativo poderão Árealizar um teste de Vigor, Dif. 10, ao final dos seus turnos. Caso tenham sucesso, esse Efeito Negativo será removido. Alvos que possuam, pelo menos, uma Característica do Livro dos Seres Primais são imunes a esse efeito.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Primais",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat010800000000",
    "name": "Florescer a Dor",
    "type": "feature",
    "img": "icons/magic/nature/leaf-glowing-green.svg",
    "folder": "fldfeat060000000",
    "_key": "!items!feat010800000000",
    "system": {
      "name": "Florescer a Dor",
      "description": "Essa criatura força todos os Alvos Inimigos a até 6 metros a um teste de Vigor, Dif. 8. Caso falhem, ficarão Envenenado. Alvos Inimigos que tenham falhado no teste de Vigor e já estejam Envenenados, receberão o seu próprio total máximo de Pontos de Energia como Dano Mágico de Natureza, além de receber -1 no seu próximo teste de Parâmetro. Esse efeito não acumula, mesmo vindo de fontes diferentes.",
      "category": "caracteristica",
      "cost": "2 PE",
      "typeAction": "acaoAtiva",
      "typeAbility": "caracteristica",
      "types": [
        "acaoAtiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Primais",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat01080000",
          "name": "Florescer a Dor",
          "description": "Essa criatura força todos os Alvos Inimigos a até 6 metros a um teste de Vigor, Dif. 8. Caso falhem, ficarão Envenenado. Alvos Inimigos que tenham falhado no teste de Vigor e já estejam Envenenados, receberão o seu próprio total máximo de Pontos de E...",
          "cost": "2 PE",
          "type": {
            "actionType": "acaoAtiva",
            "category": "ataque_magico",
            "tags": [
              "Conjuração"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": true,
            "status": "envenenado",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 8,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat010900000000",
    "name": "Equilibrar o Ciclo",
    "type": "feature",
    "img": "icons/magic/nature/leaf-glowing-green.svg",
    "folder": "fldfeat060000000",
    "_key": "!items!feat010900000000",
    "system": {
      "name": "Equilibrar o Ciclo",
      "description": "Caso um Alvo Inimigo a até 6 metros esteja recebendo uma regeneração de Pontos de Vida, essa criatura fará com que outro Alvo Inimigo a até 8 metros do Alvo dessa regeneração receba metade do valor da regeneração como Dano Mágico de Natureza.",
      "category": "caracteristica",
      "cost": "2 PE",
      "typeAction": "acaoRapida",
      "typeAbility": "caracteristica",
      "types": [
        "acaoRapida"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Primais",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat01090000",
          "name": "Equilibrar o Ciclo",
          "description": "Caso um Alvo Inimigo a até 6 metros esteja recebendo uma regeneração de Pontos de Vida, essa criatura fará com que outro Alvo Inimigo a até 8 metros do Alvo dessa regeneração receba metade do valor da regeneração como Dano Mágico de Natureza.",
          "cost": "2 PE",
          "type": {
            "actionType": "acaoRapida",
            "category": "ataque_magico",
            "tags": [
              "Conjuração"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat011000000000",
    "name": "Arauto da Praga",
    "type": "feature",
    "img": "icons/magic/nature/leaf-glowing-green.svg",
    "folder": "fldfeat060000000",
    "_key": "!items!feat011000000000",
    "system": {
      "name": "Arauto da Praga",
      "description": "O corpo des sa criatura é tomado por substâncias tóxicas da natureza, que exalam uma energia corrosiva. Alvos Inimigos que iniciarem o seu turno a até 5 metros da criatura devem Árealizar um teste de Vigor, Dif. 10. Caso falhem, receberão o seu próprio total de Pontos de Energia como Dano Mágico de Natureza e ficarão Envenenados por 1 minuto. Alvos Inimigos que receberem esse dano enquanto estiverem Envenenado, também receberão Inaptidão em todos os seus testes de Parâmetros até o final desse turno.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Primais",
      "tier": "Difícil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat011100000000",
    "name": "Canto das Rosas Oníricas",
    "type": "feature",
    "img": "icons/magic/nature/leaf-glowing-green.svg",
    "folder": "fldfeat060000000",
    "_key": "!items!feat011100000000",
    "system": {
      "name": "Canto das Rosas Oníricas",
      "description": "Essa criatura exala um aroma doce e reconfortante, tornando todos os Alvos Inimigos a até 5 metros da criatura sonolentos. Todos os testes de Parâmetros e Conhecimentos Árealizados por Alvos Inimigos dentro do alcance da Característica são considerados falhas, caso o Resultado Natural desse teste seja 6, ou menos. Alvos que possuam, pelo menos, uma Característica do Livro dos Seres Primais são imunes a esse efeito.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "presenca",
      "typeAbility": "caracteristica",
      "types": [
        "presenca"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Primais",
      "tier": "Difícil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat01110000",
          "name": "Canto das Rosas Oníricas",
          "description": "Essa criatura exala um aroma doce e reconfortante, tornando todos os Alvos Inimigos a até 5 metros da criatura sonolentos. Todos os testes de Parâmetros e Conhecimentos Árealizados por Alvos Inimigos dentro do alcance da Característica são considerad...",
          "cost": "",
          "type": {
            "actionType": "presenca",
            "category": "utilidade",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": false,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat011200000000",
    "name": "Vinhas da Natureza",
    "type": "feature",
    "img": "icons/magic/nature/leaf-glowing-green.svg",
    "folder": "fldfeat060000000",
    "_key": "!items!feat011200000000",
    "system": {
      "name": "Vinhas da Natureza",
      "description": "Essa criatura dispara diversas vinhas, a partir do seu corpo, na direção de todos os Alvos Inimigos a até 6 metros, forçando-os a um teste de Agilidade, Dif. 10. Caso falhem, são presos por essas vinhas, ficando Imóveis e recebendo Inaptidão em testes de Defesa. Alvos Inimigos que iniciarem o seu turno com es sas vinhas deverão Árealizar um teste Vigor, Dif. 10. Caso falhem, a criatura causará 1d6 de Dano Mágico de Natureza por ponto de Poder no Alvo Inimigo. Caso o Alvo tenha sucesso n o teste de Vigor, ele quebrará as vinhas, removendo os efeitos da Característica. Alvos Inimigos que não possuírem es sas vinhas podem tentar quebrar as vinhas de Alvos afetados p ela Característica, Árealizando um teste de Brutalidade, Dif. 10. Alvos não podem ser afetados mais de uma vez ao mesmo tempo por essa Característica, mesmo vindo de fontes diferentes.",
      "category": "caracteristica",
      "cost": "2 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "caracteristica",
      "types": [
        "acaoSimples"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "1 Minuto",
      "level": 1,
      "book": "Seres Primais",
      "tier": "Difícil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat01120000",
          "name": "Vinhas da Natureza",
          "description": "Essa criatura dispara diversas vinhas, a partir do seu corpo, na direção de todos os Alvos Inimigos a até 6 metros, forçando-os a um teste de Agilidade, Dif. 10. Caso falhem, são presos por essas vinhas, ficando Imóveis e recebendo Inaptidão em teste...",
          "cost": "2 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "ataque_magico",
            "tags": [
              "Conjuração"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "1d6",
            "type": "immaterial",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 Minuto",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "agility",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat011300000000",
    "name": "Fungo Corrosivo",
    "type": "feature",
    "img": "icons/magic/nature/leaf-glowing-green.svg",
    "folder": "fldfeat060000000",
    "_key": "!items!feat011300000000",
    "system": {
      "name": "Fungo Corrosivo",
      "description": "Essa criatura possui substâncias antigas tão tóxicas que degradam até mesmo o metal, portanto, que sempre que ela for atingida por um Armamento corpo a corpo, a criatura fará com que ele seja afetado pelo efeito Corroído. Sempre que esta criatura atingir um Alvo com um Dano Mágico de Natureza, e este Alvo esteja utilizando uma Armadura, ela é afetada por Corroído. Corroído: Armamentos afetados têm o seu Dano Base reduzido pela metade. Armaduras afetadas têm o seu total de pontos de Bloqueio reduzido pela metade. Esse efeito permanece ativo por 1 hora em um equipamento.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Primais",
      "tier": "Difícil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat011400000000",
    "name": "Peçonha",
    "type": "feature",
    "img": "icons/magic/nature/leaf-glowing-green.svg",
    "folder": "fldfeat060000000",
    "_key": "!items!feat011400000000",
    "system": {
      "name": "Peçonha",
      "description": "Essa criatura dispara uma rajada peçonhenta em um ponto em uma superfície a até 6 metros. Toda a áÁrea a até 3 metros desse ponto de origem se torna um Terreno Difícil por 10 minutos. Alvos que tenha entrado, ou iniciado o se u turno, nessa áÁrea ficarão por Enjoados por 1 minuto. Alvos afetados por Enjoado poderão Árealizar um teste de Vigor, Dif. 10, ao final dos seus turnos. Caso tenham sucesso, esse efeito será removido. Enjoado: Você possui -2 em todos os seus testes de Precisão, Canalização e Defesa. Alvos que possuam, pelo menos, uma Característica do Livro dos Seres Primais são imunes a esse efeito.",
      "category": "caracteristica",
      "cost": "3 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "caracteristica",
      "types": [
        "acaoSimples"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Primais",
      "tier": "Difícil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat01140000",
          "name": "Peçonha",
          "description": "Essa criatura dispara uma rajada peçonhenta em um ponto em uma superfície a até 6 metros. Toda a áÁrea a até 3 metros desse ponto de origem se torna um Terreno Difícil por 10 minutos. Alvos que tenha entrado, ou iniciado o se u turno, nessa áÁrea fic...",
          "cost": "3 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "ataque_magico",
            "tags": [
              "Conjuração"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": false,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat011500000000",
    "name": "Acelerar o Inevitável",
    "type": "feature",
    "img": "icons/magic/nature/leaf-glowing-green.svg",
    "folder": "fldfeat060000000",
    "_key": "!items!feat011500000000",
    "system": {
      "name": "Acelerar o Inevitável",
      "description": "Foco | Duração: 1 Minuto Essa criatura canaliza um ponto em uma superfície a até 8 metros, espalhando uma áÁrea Primal por 3 metros a partir desse ponto. Caso Alvos Inimigos dentro dessa áÁrea que recebam qualquer tipo de dano que não seja um Dano Imaterial, metade desse dano também será causado em todos os outros Alvos Inimigos dentro da áÁrea des sa Característica. O dano causado dessa forma é considerado um Dano Imaterial. O efeito nes sa áÁrea afeta um mesmo Alvo Inimigo apenas uma vez por rodada. Alvos Inimig os que receberem es se dano podem Árealizar um teste de Vigor, Dif. 10. Caso tenham sucesso, receberão apenas metade do dano causado por essa Característica.",
      "category": "caracteristica",
      "cost": "5 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "caracteristica",
      "types": [
        "acaoSimples"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Primais",
      "tier": "Extrema",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat01150000",
          "name": "Acelerar o Inevitável",
          "description": "Foco | Duração: 1 Minuto Essa criatura canaliza um ponto em uma superfície a até 8 metros, espalhando uma áÁrea Primal por 3 metros a partir desse ponto. Caso Alvos Inimigos dentro dessa áÁrea que recebam qualquer tipo de dano que não seja um Dano Im...",
          "cost": "5 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "ataque_magico",
            "tags": [
              "Conjuração"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat011600000000",
    "name": "A Solidão da Floresta",
    "type": "feature",
    "img": "icons/magic/nature/leaf-glowing-green.svg",
    "folder": "fldfeat060000000",
    "_key": "!items!feat011600000000",
    "system": {
      "name": "A Solidão da Floresta",
      "description": "têm os seus sentidos distorcidos, não podendo ouvir nem enxergar seres que não possuem Características do Homuncularium, além de perderem a sua própria voz. Esse efeito permanece por 1 minuto. Alvos Inimigos afetados por essa Característica poderão Árealizar um teste de Espírito, Dif. 10, ao final dos seus turnos. Caso remover esse efeito, o Alvo Inimigo é afetado por Atordoado e Enfraquecido.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Primais",
      "tier": "Extrema",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat011700000000",
    "name": "Maldição do Apodrecimento",
    "type": "feature",
    "img": "icons/magic/nature/leaf-glowing-green.svg",
    "folder": "fldfeat060000000",
    "_key": "!items!feat011700000000",
    "system": {
      "name": "Maldição do Apodrecimento",
      "description": "produzirá diversos sons malditos a todos os Alvos Inimigos a até 20 metros, forçando-os a um teste de Espírito, Dif. 10. Caso falhem, são afetados pelos seguintes efeitos: • Apodrecer a Natureza: Todos os Itens Consumíveis do Alvo perdem os seus efeitos permanentemente. • Apodrecer a Vida: Todas as Rações de Viagem e alimentos do Alvo apodrecem imediatamente. Além disso, toda áÁgua e qualquer outro líquido que ele carregue consigo se transforma em areia. • Apodrecer o Corpo: As vestimentas e equipamentos do Alvo começam a cheirar mal, cheiro que não pode ser removido. • Apodrecer o Metal: Todos os equipamentos do Alvo recebem o efeito Corrosivo, da Característica Fungo Corrosivo, que permanece até o final da duração da maldição. Essa maldição permanece no Alvo um número de dias iÁgual ao total de pontos de Poder da criatura. Sempre que o Alvo afetado concluir um Repouso Completo, ele poderá Árealizar um teste de Espírito, Dif. 10. Caso tenha sucesso, ele removerá os efeitos de Apodrecer o Corpo e Apodrecer o Metal.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Primais",
      "tier": "Extrema",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat011800000000",
    "name": "O Úúltimo Ritual",
    "type": "feature",
    "img": "icons/magic/nature/leaf-glowing-green.svg",
    "folder": "fldfeat060000000",
    "_key": "!items!feat011800000000",
    "system": {
      "name": "O Úúltimo Ritual",
      "description": "Essa criatura corrompe as forças de Xaec, Yeyt, e Zoth, canalizando em si um poder antigo proibido. N o início do seu próximo turno, todos os Alvos Inimigos a até 8 metros receberão a metade do seu próprio total máximo de Pontos de Vida como Dano Imaterial. Alvos Inimigos dentro do alcance des sa Característica podem Árealizar um teste de Espírito, Dif. 10. Caso tenham sucesso, receberão apenas metade do dano causado pela Característica. Essa Característica não pode ser interrompida nem anulada.",
      "category": "caracteristica",
      "cost": "5 PE",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Primais",
      "tier": "Extrema",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat011900000000",
    "name": "Portador dos Desígnios Ancestrais",
    "type": "feature",
    "img": "icons/magic/nature/leaf-glowing-green.svg",
    "folder": "fldfeat060000000",
    "_key": "!items!feat011900000000",
    "system": {
      "name": "Portador dos Desígnios Ancestrais",
      "description": "menos, essa criatura se transforma em um avatar sombrio das forças das florestas, recebendo os seguintes efeitos até o final do combate: • A Categoria de Dado de todo dano e regeneração de Pontos de Vida de Alvos Inimigos a até 8 metros é reduzida em 1. Exemplo: Caso uma Habilidade de Caminho ou Característica sua Árealize o seu efeito com d8, ao invés disso, ela Árealizará este efeito com d6. Essa Característica não afeta Habilidades de Caminho e Características que utilizam d4. • O Arcanismo, a Brutalidade e a Destreza de todos os Alvos Inimigos a até 8 metros é reduzido pela metade. • Testes de Vigor e Espírito Árealizados por Alvos Inimigos a até 8 metros não podem ser afetados por Aptidão nem Aptidão Aprimorada. • Sempre que um Alvo Inimigo a até 8 metros perder 1 Ponto de Energia pelo efeito de Envenenado, a criatura recebe um valor de Pontos de Vida Temporários equivalente ao seu total máximo de Pontos de Energia.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Primais",
      "tier": "Extrema",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat012000000000",
    "name": "Armamentos Naturais",
    "type": "feature",
    "img": "icons/commodities/tech/sensor-eye.svg",
    "folder": "fldfeat070000000",
    "_key": "!items!feat012000000000",
    "system": {
      "name": "Armamentos Naturais",
      "description": "Criaturas do Homuncularium com, pelo menos, uma Característica deste Livro possuem uma das seguintes Propriedades em seus Ataques Físicos e Ataques Mágicos: • Afiado Contundente Extensão • Impacto Perfurar Prioridade",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Artificiais",
      "tier": "Adicional",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat012100000000",
    "name": "Experimento",
    "type": "feature",
    "img": "icons/commodities/tech/sensor-eye.svg",
    "folder": "fldfeat070000000",
    "_key": "!items!feat012100000000",
    "system": {
      "name": "Experimento",
      "description": "Criaturas artificias têm acesso a um tipo exclusivo de Característica, denominada Experimento: um poder do Domínio Sombrio que afeta diretamente a estrutura corporal da criatura. Criaturas podem possuir apenas uma Característica do tipo Experimento.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Artificiais",
      "tier": "Adicional",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat012200000000",
    "name": "Experimento",
    "type": "feature",
    "img": "icons/commodities/tech/sensor-eye.svg",
    "folder": "fldfeat070000000",
    "_key": "!items!feat012200000000",
    "system": {
      "name": "Experimento",
      "description": "• Essas criaturas não podem possuir Pontos de Vida Temporários. • Essas criaturas não possuem Pontos de Vida, mas sim u m total de Capacidade descrito na Característica de Experimento. • Danos dobrados pelo efeito de Acerto Crítico removem 2 pontos da Capacidade dessa criatura. • Qualquer valor de regeneração de Pontos de Vida nessa criatura regenera 1 ponto da sua Capacidade. • Caso essa criatura possua a Característica Corpo Descomunal, o seu total de pontos de Capacidade é aumentado em 3. • Caso essa criatura possua a Característica Colosso, o seu total de pontos de Capacidade é aumentado em 6. • Caso essa criatura possua um efeito de Cólera, o efeito é Árealizado ao chegar à metade do seu total de pontos de Capacidade.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Artificiais",
      "tier": "Adicional",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat012300000000",
    "name": "Absorver o Véu",
    "type": "feature",
    "img": "icons/commodities/tech/sensor-eye.svg",
    "folder": "fldfeat070000000",
    "_key": "!items!feat012300000000",
    "system": {
      "name": "Absorver o Véu",
      "description": "O corpo des sa criatura é energizado por linhas misteriosas, que consomem as energias místicas ao seu redor, tornando-a imune a danos nos seus Pontos de Energia. Caso a criatura receba um Dano Mágico, ela poderá Árealizar um Teste de Destino, Dif. 10. Caso tenha sucesso, ela reduzirá esse Dano Mágico pela metade. Caso a criatura possua uma Característica de Experimento e passe no Teste de Destino, ela não perderá o ponto de Capacidade ao receber o Dano Mágico reduzido. ADAPTAÇÃO ARTIFICIAL Sempre que es sa criatura falhar em um teste de Parâmetro Ofensivo, ela receberá +1 em seus Parâmetros Ofensivos. Ela perde todos os valores adicionais nos seus Parâmetros Ofensivos concedidos pela Característica ao ser bem-sucedida em um teste de Parâmetro Ofensivo. Sempre que essa criatura falhar em um teste de Parâmetro Defensivo, ela receberá +1 em seus Parâmetros Defensivos. Ela perde todos os valores adicionais nos seus Parâmetros Defensivos concedidos pela Característica ao ser bem-sucedida em um teste de Parâmetro Defensivo. Os valores de Parâmetros concedidos pela Característica acumulam.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Artificiais",
      "tier": "Fácil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat012400000000",
    "name": "Energia Corrompida",
    "type": "feature",
    "img": "icons/commodities/tech/sensor-eye.svg",
    "folder": "fldfeat070000000",
    "_key": "!items!feat012400000000",
    "system": {
      "name": "Energia Corrompida",
      "description": "qualquer tipo de dano de um Alvo, ela causará o dobro do seu total de pontos de Poder como Dano Imaterial nesse mesmo Alvo. Esse efeito ocorre apenas uma vez por turno, por Alvo.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "acaoFinal",
      "typeAbility": "caracteristica",
      "types": [
        "acaoFinal"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Artificiais",
      "tier": "Fácil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat01240000",
          "name": "Energia Corrompida",
          "description": "qualquer tipo de dano de um Alvo, ela causará o dobro do seu total de pontos de Poder como Dano Imaterial nesse mesmo Alvo. Esse efeito ocorre apenas uma vez por turno, por Alvo.",
          "cost": "",
          "type": {
            "actionType": "acaoFinal",
            "category": "utilidade",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat012500000000",
    "name": "Negar a Carne",
    "type": "feature",
    "img": "icons/commodities/tech/sensor-eye.svg",
    "folder": "fldfeat070000000",
    "_key": "!items!feat012500000000",
    "system": {
      "name": "Negar a Carne",
      "description": "O corpo des sa criatura é composto por placas metálicas orgânicas, tornando-a imune a Fratura, além de não precisar respirar. Caso a criatura receba um Dano Físico, ela poderá Árealizar um Teste de Destino, Dif. 10. Caso tenha sucesso, ela reduzirá esse Dano Físico pela metade. Caso a criatura possua uma Característica de Experimento e passe no Teste de Destino, ela não perderá o ponto de Capacidade ao receber o Dano Físico reduzido.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Artificiais",
      "tier": "Fácil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat012600000000",
    "name": "Parasita Enfraquecedor",
    "type": "feature",
    "img": "icons/commodities/tech/sensor-eye.svg",
    "folder": "fldfeat070000000",
    "_key": "!items!feat012600000000",
    "system": {
      "name": "Parasita Enfraquecedor",
      "description": "qualquer tipo de dano de um Alvo, ela poderá forçá-lo a um teste de Vigor, Dif. 8. Caso falhe, esse Alvo ficará Enfraquecido.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "acaoFinal",
      "typeAbility": "caracteristica",
      "types": [
        "acaoFinal"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Artificiais",
      "tier": "Fácil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat01260000",
          "name": "Parasita Enfraquecedor",
          "description": "qualquer tipo de dano de um Alvo, ela poderá forçá-lo a um teste de Vigor, Dif. 8. Caso falhe, esse Alvo ficará Enfraquecido.",
          "cost": "",
          "type": {
            "actionType": "acaoFinal",
            "category": "utilidade",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 8,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat012700000000",
    "name": "A Fera Superior",
    "type": "feature",
    "img": "icons/commodities/tech/sensor-eye.svg",
    "folder": "fldfeat070000000",
    "_key": "!items!feat012700000000",
    "system": {
      "name": "A Fera Superior",
      "description": "Essa criatura se adapta, tornando -se um ser ainda mais feroz e recebendo os seguintes efeitos:",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Artificiais",
      "tier": "Normal",
      "requirement": "Uma Característica do Livro dos Seres Ferais",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat012800000000",
    "name": "Fragmentos Afiados",
    "type": "feature",
    "img": "icons/commodities/tech/sensor-eye.svg",
    "folder": "fldfeat070000000",
    "_key": "!items!feat012800000000",
    "system": {
      "name": "Fragmentos Afiados",
      "description": "Esta criatura cria, a partir do seu corpo, pequenos estilhaços metálicos, que são direcionados a todos os Alvos Inimigos a até 6 metros, forçando- os a um teste de Defesa, Dif. 8. Caso falhem, são afetados por Sangramento por 1 hora.",
      "category": "caracteristica",
      "cost": "1 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "caracteristica",
      "types": [
        "acaoSimples"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Artificiais",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat01280000",
          "name": "Fragmentos Afiados",
          "description": "Esta criatura cria, a partir do seu corpo, pequenos estilhaços metálicos, que são direcionados a todos os Alvos Inimigos a até 6 metros, forçando- os a um teste de Defesa, Dif. 8. Caso falhem, são afetados por Sangramento por 1 hora.",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "defesa",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": false,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": true,
            "status": "sangramento",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 8,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat012900000000",
    "name": "Evolução Feral",
    "type": "feature",
    "img": "icons/commodities/tech/sensor-eye.svg",
    "folder": "fldfeat070000000",
    "_key": "!items!feat012900000000",
    "system": {
      "name": "Evolução Feral",
      "description": "Sempre que um Alvo Inimigo receber dano, e este dano estiver sido aumentado pelo efeito de Sangramento, todos os outros Alvos Inimigos a até 6 metros do Alvo desse dano, que também possuam Sangramento, recebem o total de Poder dessa criatura como Dano Imaterial. Alvos podem receber esse Dano Imaterial somente uma vez por rodada.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Artificiais",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat013000000000",
    "name": "A Não-vida Superior",
    "type": "feature",
    "img": "icons/commodities/tech/sensor-eye.svg",
    "folder": "fldfeat070000000",
    "_key": "!items!feat013000000000",
    "system": {
      "name": "A Não-vida Superior",
      "description": "Essa criatura se adapta, tornando -se um receptáculo das forças profanas e recebendo os seguintes efeitos:",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Artificiais",
      "tier": "Normal",
      "requirement": "Uma Característica do Livro dos Seres Não-Vivos",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat013100000000",
    "name": "Simular Corrosão Mística",
    "type": "feature",
    "img": "icons/commodities/tech/sensor-eye.svg",
    "folder": "fldfeat070000000",
    "_key": "!items!feat013100000000",
    "system": {
      "name": "Simular Corrosão Mística",
      "description": "Essa criatura emana uma energia corrompida, forçando todos os Alvos Inimigos a até 6 metros a um teste de Espírito, Dif. 8. Caso falhem, terão todos os seus danos e regenerações de Pontos de Vida reduzidos em um valor iÁgual ao dobro do Poder da criatura até o final do seu próximo turno. Esse efeito não acumula, mesmo vindo de fontes diferentes.",
      "category": "caracteristica",
      "cost": "1 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "caracteristica",
      "types": [
        "acaoSimples"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Artificiais",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat01310000",
          "name": "Simular Corrosão Mística",
          "description": "Essa criatura emana uma energia corrompida, forçando todos os Alvos Inimigos a até 6 metros a um teste de Espírito, Dif. 8. Caso falhem, terão todos os seus danos e regenerações de Pontos de Vida reduzidos em um valor iÁgual ao dobro do Poder da cria...",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "suporte",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "spirit",
            "difficulty": 8,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat013200000000",
    "name": "Evolução Não-viva",
    "type": "feature",
    "img": "icons/commodities/tech/sensor-eye.svg",
    "folder": "fldfeat070000000",
    "_key": "!items!feat013200000000",
    "system": {
      "name": "Evolução Não-viva",
      "description": "Sempre que um Alvo a até 6 metros chegar a zero, ou menos, Pontos de Vida, essa criatura receberá o seu total de Pontos de Energia como Pontos de Vida Temporários. Caso a criatura possua uma Característica do tipo Experimento, ao invés disso, ela receberá 1 ponto na sua Capacidade máxima.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Artificiais",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat013300000000",
    "name": "O Elemento Superior",
    "type": "feature",
    "img": "icons/commodities/tech/sensor-eye.svg",
    "folder": "fldfeat070000000",
    "_key": "!items!feat013300000000",
    "system": {
      "name": "O Elemento Superior",
      "description": "Essa criatura se adapta, aprimorando o uso das forças elementais e recebendo os seguintes efeitos:",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Artificiais",
      "tier": "Normal",
      "requirement": "Uma Característica do Livro dos Seres Elementais",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat013400000000",
    "name": "Revestimento Nulo",
    "type": "feature",
    "img": "icons/commodities/tech/sensor-eye.svg",
    "folder": "fldfeat070000000",
    "_key": "!items!feat013400000000",
    "system": {
      "name": "Revestimento Nulo",
      "description": "Essa criatura altera as propriedades do seu corpo até o início do seu próximo turno, de modo que, ao receber qualquer tipo de dano, uma onda de energia seja criada a partir do seu corpo, forçando todos os Alvos Inimigos a até 6 metros a um teste de Vigor, Dif. 8. Caso falhem, os Alvos perdem 1 Ponto de Energia.",
      "category": "caracteristica",
      "cost": "1 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "caracteristica",
      "types": [
        "acaoSimples"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Artificiais",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat01340000",
          "name": "Revestimento Nulo",
          "description": "Essa criatura altera as propriedades do seu corpo até o início do seu próximo turno, de modo que, ao receber qualquer tipo de dano, uma onda de energia seja criada a partir do seu corpo, forçando todos os Alvos Inimigos a até 6 metros a um teste de V...",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "utilidade",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 8,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat013500000000",
    "name": "Evolução Elemental",
    "type": "feature",
    "img": "icons/commodities/tech/sensor-eye.svg",
    "folder": "fldfeat070000000",
    "_key": "!items!feat013500000000",
    "system": {
      "name": "Evolução Elemental",
      "description": "Escolha um dos Núcleos Elementais dessa criatura para ser convertido para Imaterial. Esse Núcleo Elemental transformado ainda conta como seu elemento original para efeitos relacionados às suas próprias Características. Além disso, essa criatura possui Resistência Mágica [Imaterial]. Esse efeito ignora a regra de Danos Imateriais.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Artificiais",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat013600000000",
    "name": "O Primal Superior",
    "type": "feature",
    "img": "icons/commodities/tech/sensor-eye.svg",
    "folder": "fldfeat070000000",
    "_key": "!items!feat013600000000",
    "system": {
      "name": "O Primal Superior",
      "description": "Essa criatura se adapta, tornando -se um receptáculo das forças da natureza e recebendo os seguintes efeitos:",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Artificiais",
      "tier": "Normal",
      "requirement": "Uma Característica do Livro dos Seres Primais",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat013700000000",
    "name": "Infectar",
    "type": "feature",
    "img": "icons/commodities/tech/sensor-eye.svg",
    "folder": "fldfeat070000000",
    "_key": "!items!feat013700000000",
    "system": {
      "name": "Infectar",
      "description": "Essa criatura utiliza o poder da sua substância parasítica para que, até o início do seu próximo turno, caso a criatura cause qualquer tipo de dano a um Alvo, ele ficará Infectado por 1 minuto. Infectado: Sempre que você gastar ou perder Pontos de Energia, você receberá o seu total de Pontos de Energia como Dano Imaterial. Esse efeito ocorre apenas uma vez por turno. Alvos afetados por Infectado poderão Árealizar um teste de Vigor, Dif. 8, ao final dos seus turnos. Caso tenham sucesso, esse efeito será removido.",
      "category": "caracteristica",
      "cost": "1 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "caracteristica",
      "types": [
        "acaoSimples"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Artificiais",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat01370000",
          "name": "Infectar",
          "description": "Essa criatura utiliza o poder da sua substância parasítica para que, até o início do seu próximo turno, caso a criatura cause qualquer tipo de dano a um Alvo, ele ficará Infectado por 1 minuto. Infectado: Sempre que você gastar ou perder Pontos de En...",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "utilidade",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 8,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat013800000000",
    "name": "Evolução Primal",
    "type": "feature",
    "img": "icons/commodities/tech/sensor-eye.svg",
    "folder": "fldfeat070000000",
    "_key": "!items!feat013800000000",
    "system": {
      "name": "Evolução Primal",
      "description": "Sempre que um Alvo a até 6 metros perder Pontos de Energia pelo efeito de Envenenado, essa criatura regenerará 1 Ponto de Energia e receberá Aptidão no seu próximo teste de Parâmetro.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Artificiais",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat013900000000",
    "name": "O Véu Superior",
    "type": "feature",
    "img": "icons/commodities/tech/sensor-eye.svg",
    "folder": "fldfeat070000000",
    "_key": "!items!feat013900000000",
    "system": {
      "name": "O Véu Superior",
      "description": "Essa criatura se adapta, condensando o seu Véu da melhor forma possível e recebendo os seguintes efeitos:",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Artificiais",
      "tier": "Normal",
      "requirement": "Uma Característica do Livro dos Seres do Véu",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat014000000000",
    "name": "Adaptar o Véu",
    "type": "feature",
    "img": "icons/commodities/tech/sensor-eye.svg",
    "folder": "fldfeat070000000",
    "_key": "!items!feat014000000000",
    "system": {
      "name": "Adaptar o Véu",
      "description": "final do seu próximo turno. Esse efeito ocorre apenas uma vez por turno. Esse efeito acumula.",
      "category": "caracteristica",
      "cost": "1 PE",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Artificiais",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat014100000000",
    "name": "Evolução Arcana",
    "type": "feature",
    "img": "icons/commodities/tech/sensor-eye.svg",
    "folder": "fldfeat070000000",
    "_key": "!items!feat014100000000",
    "system": {
      "name": "Evolução Arcana",
      "description": "Todas as Características do tipo Conjuração dessa criatura não são consideradas Conjurações para efeitos de Alvos Inimigos. Alvos Inimigos a até 6 metros da criatura não podem regenerar Pontos de Energia.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Artificiais",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat014200000000",
    "name": "Experimento de Caerngron",
    "type": "feature",
    "img": "icons/commodities/tech/sensor-eye.svg",
    "folder": "fldfeat070000000",
    "_key": "!items!feat014200000000",
    "system": {
      "name": "Experimento de Caerngron",
      "description": "Experimento Essa criatura não possui Pontos de Vida, mas um total de pontos de Capacidade iÁgual ao seu próprio total máximo de Pontos de Energia. Caso a criatura receba qualquer tipo de dano, el a perderá 1 ponto de Capacidade. Com zero pontos de Capacidade, ela é desfeita em uma poça de óleo corrompido. Caso um Alvo Inimigo a até 6 metros da criatura Árealize uma forçará esse Alvo a aumentar o seu custo em 2. O Alvo pode optar por não aumentar o custo de Pontos de Energia, fazendo c om que a criatura emita um som ensurdecedor, causando o seu próprio total máximo de Pontos de Energia como Dano Imaterial a todos os Alvos Inimigos a até 6 metros.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "acaoAtiva",
      "typeAbility": "caracteristica",
      "types": [
        "acaoAtiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Artificiais",
      "tier": "Difícil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat01420000",
          "name": "Experimento de Caerngron",
          "description": "Experimento Essa criatura não possui Pontos de Vida, mas um total de pontos de Capacidade iÁgual ao seu próprio total máximo de Pontos de Energia. Caso a criatura receba qualquer tipo de dano, el a perderá 1 ponto de Capacidade. Com zero pontos de Ca...",
          "cost": "",
          "type": {
            "actionType": "acaoAtiva",
            "category": "utilidade",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat014300000000",
    "name": "Experimento de Mortumbárea",
    "type": "feature",
    "img": "icons/commodities/tech/sensor-eye.svg",
    "folder": "fldfeat070000000",
    "_key": "!items!feat014300000000",
    "system": {
      "name": "Experimento de Mortumbárea",
      "description": "Experimento Essa criatura não possui Pontos de Vida, mas um total de pontos de Capacidade iÁgual ao seu próprio total máximo de Pontos de Energia. Caso a criatura receba qualquer tipo de dano, el a perderá 1 ponto de Capacidade. Com zero pontos de Capacidade, ela é desfeita em uma poça de óleo corrompido. Essa criatura tem sucesso automático em todos os testes de Espírito. Todos os Alvos Inimigos a até 6 metros da criatura não podem utilizar Habilidades de Caminho e Características com custos de Pontos de Energia maiores que 2.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Artificiais",
      "tier": "Difícil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat014400000000",
    "name": "Experimento de Nistragard",
    "type": "feature",
    "img": "icons/commodities/tech/sensor-eye.svg",
    "folder": "fldfeat070000000",
    "_key": "!items!feat014400000000",
    "system": {
      "name": "Experimento de Nistragard",
      "description": "Experimento Essa criatura não possui Pontos de Vida, mas um total de pontos de Capacidade iÁgual ao seu próprio total máximo de Pontos de Energia. Caso a criatura receba qualquer tipo de dano, el a perderá 1 ponto de Capacidade. Com zero pontos de Capacidade, ela é desfeita em uma poça de óleo corrompido. Sempre que essa criatura atingir um Alvo com um Ataque Físico ou Ataque Mágico ela poderá forçá-lo a um teste de Espírito, Dif. 10. Caso falhe, o Alvo terá 1 ponto de um dos seus Parâmetros removido, à escolha da criatura. A criatura recebe esse ponto em seus Parâmetros ou Poder, de acordo com o Parâmetro removido, respeitando os seus valores máximos na mesma categoria de Parâmetros. A criatura perde os pontos adquiridos por essa Característica ao chegar a zero pontos de Capacidade, retornando os Parâmetros aos respectivos Alvos. Caso a criatura permaneça viva, os efeitos dessa Característica desaparecem em 1 hora.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Artificiais",
      "tier": "Difícil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat014500000000",
    "name": "O Abissal Superior",
    "type": "feature",
    "img": "icons/commodities/tech/sensor-eye.svg",
    "folder": "fldfeat070000000",
    "_key": "!items!feat014500000000",
    "system": {
      "name": "O Abissal Superior",
      "description": "Essa criatura se adapta, tornando -se um receptáculo das forças sombrias e recebendo os seguintes efeitos: SIMULAÇÃO SOMBRIA Essa criatura modifica o seu corpo, de modo que, até o final do seu próximo turno, caso um Alvo Inimigo a até 6 metros falhe em um teste de Vigor ou Espírito, ele receberá o total máximo de Pontos de Energia dessa criatura como Dano Imaterial.",
      "category": "caracteristica",
      "cost": "2 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "caracteristica",
      "types": [
        "acaoSimples"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Artificiais",
      "tier": "Difícil",
      "requirement": "Uma Característica do Livro dos Seres Abissais",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat01450000",
          "name": "O Abissal Superior",
          "description": "Essa criatura se adapta, tornando -se um receptáculo das forças sombrias e recebendo os seguintes efeitos: SIMULAÇÃO SOMBRIA Essa criatura modifica o seu corpo, de modo que, até o final do seu próximo turno, caso um Alvo Inimigo a até 6 metros falhe ...",
          "cost": "2 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "utilidade",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat014600000000",
    "name": "Evolução Abissal",
    "type": "feature",
    "img": "icons/commodities/tech/sensor-eye.svg",
    "folder": "fldfeat070000000",
    "_key": "!items!feat014600000000",
    "system": {
      "name": "Evolução Abissal",
      "description": "Sempre que essa criatura Árealizar um Ataque Físico ou Ataque Mágico contra um Alvo, ela poderá substituir o teste de Defesa do Alvo por um teste de Vigor ou Espírito.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Artificiais",
      "tier": "Difícil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat014700000000",
    "name": "O Celestial Superior",
    "type": "feature",
    "img": "icons/commodities/tech/sensor-eye.svg",
    "folder": "fldfeat070000000",
    "_key": "!items!feat014700000000",
    "system": {
      "name": "O Celestial Superior",
      "description": "Essa criatura se adapta, tornando -se um receptáculo das forças celestiais e recebendo os seguintes efeitos:",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Artificiais",
      "tier": "Difícil",
      "requirement": "Uma Característica do Livro dos Seres Celestiais",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat014800000000",
    "name": "Ajuste Pecaminoso",
    "type": "feature",
    "img": "icons/commodities/tech/sensor-eye.svg",
    "folder": "fldfeat070000000",
    "_key": "!items!feat014800000000",
    "system": {
      "name": "Ajuste Pecaminoso",
      "description": "Essa criatura remove de si mesma uma Condição Mágica, Sangramento ou Envenenado. O efeito removido é aplicado a um Alvo a até 6 metros da criatura. A duração do efeito aplicado dessa maneira é iÁgual à sua duração normal.",
      "category": "caracteristica",
      "cost": "2 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "caracteristica",
      "types": [
        "acaoSimples"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Artificiais",
      "tier": "Difícil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat01480000",
          "name": "Ajuste Pecaminoso",
          "description": "Essa criatura remove de si mesma uma Condição Mágica, Sangramento ou Envenenado. O efeito removido é aplicado a um Alvo a até 6 metros da criatura. A duração do efeito aplicado dessa maneira é iÁgual à sua duração normal.",
          "cost": "2 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "utilidade",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": false,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": true,
            "status": "sangramento",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat014900000000",
    "name": "Evolução Celestial",
    "type": "feature",
    "img": "icons/commodities/tech/sensor-eye.svg",
    "folder": "fldfeat070000000",
    "_key": "!items!feat014900000000",
    "system": {
      "name": "Evolução Celestial",
      "description": "Caso um Alvo tenha sucesso em um teste de Parâmetro contra um efeito aplicado por essa criatura ou em um Embate contra ela, o próximo teste de Parâmetro desse Alvo deverá ser Árealizado somente com o Resultado Natural do d12, sem os seus valores adicionais naquele Parâmetro.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Artificiais",
      "tier": "Difícil",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat015000000000",
    "name": "A Criatura Perfeita",
    "type": "feature",
    "img": "icons/commodities/tech/sensor-eye.svg",
    "folder": "fldfeat070000000",
    "_key": "!items!feat015000000000",
    "system": {
      "name": "A Criatura Perfeita",
      "description": "Capacidade caso seja um Experimento), ou menos, o corpo desta criatura se sobrecarrega, criando uma onda de energia distorcida. Alvos Inimigos a até 20 metros, que estejam Vinculados a uma Relíquia, têm esse vínculo interrompido. Esse efeito afeta todas as Relíquias de um Alvo Inimigo. Essa criatura também recebe os seguintes efeitos, até o final do combate: • Quando a criatura receber um Dano Físico, ela receberá Imunidade [Dano Físico ] e perderá qualquer efeito de Imunidade [Dano Mágico]. • Quando a criatura receber um Dano Mágico, ela receberá Imunidade [Dano Mágico] e perderá qualquer efeito de Imunidade [Dano Físico]. • Caso a criatura seja um Experimento, ela só poderá perder 1 ponto de Capacidade por turno. CRIAÇÃO ARTIFICIAL Essa criatura desprende parte do seu corpo, que se transforma na cópia de um Alvo Inimigo a até 8 metros, transformada em metal corroído e a substância parasítica. Essa cópia reconhece a criatura como um Alvo Aliado. Essa Criação Artificial possui todos os Parâmetros, Conhecimentos e Habilidades de Caminho do Alvo Inimigo copiado, criando até mesmo cópias dos seus equipamentos feitas de metal corroído. A Criação Artificial possui um turno completo ao final do turno da criatura. Criações Artificiais não possuem Pontos de Vida, mas um total de pontos de Capacidade iÁgual ao dobro do Poder da criatura que a criou. Caso a Criação Artificial receba qualquer tipo de dano, el a perderá 1 ponto de Capacidade. Com zero pontos de Capacidade ela é desfeita em uma poça de óleo corrompido. Caso a criatura que criou a cópia morra, ou a Criação Artificial chegue a zero pontos de Capacidade, ela e os equipamentos copiados são desfeitos em uma poça de óleo corrompido.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "acaoAtiva",
      "typeAbility": "caracteristica",
      "types": [
        "acaoAtiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Artificiais",
      "tier": "Extrema",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat01500000",
          "name": "A Criatura Perfeita",
          "description": "Capacidade caso seja um Experimento), ou menos, o corpo desta criatura se sobrecarrega, criando uma onda de energia distorcida. Alvos Inimigos a até 20 metros, que estejam Vinculados a uma Relíquia, têm esse vínculo interrompido. Esse efeito afeta to...",
          "cost": "",
          "type": {
            "actionType": "acaoAtiva",
            "category": "ataque_magico",
            "tags": [
              "Redução"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat015100000000",
    "name": "Impacto Mental",
    "type": "feature",
    "img": "icons/commodities/tech/sensor-eye.svg",
    "folder": "fldfeat070000000",
    "_key": "!items!feat015100000000",
    "system": {
      "name": "Impacto Mental",
      "description": "Essa criatura se conecta à mente de um Alvo a até 8 metros, causando nele 1d12 de Dano Imaterial para cada ponto de Poder. O Alvo dessa Característica pode Árealizar um teste de Espírito, Dif. 10, para receber apenas metade desse dano. Alvos que tenham falhado no teste de Espírito deverão rolar 1d4, não podendo Árealizar uma das seguintes Ações até o final do seu próximo turno, referente ao resultado no d4: Movimentação e Corrida.",
      "category": "caracteristica",
      "cost": "4 PE",
      "typeAction": "acaoAtiva",
      "typeAbility": "caracteristica",
      "types": [
        "acaoAtiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Artificiais",
      "tier": "Extrema",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat01510000",
          "name": "Impacto Mental",
          "description": "Essa criatura se conecta à mente de um Alvo a até 8 metros, causando nele 1d12 de Dano Imaterial para cada ponto de Poder. O Alvo dessa Característica pode Árealizar um teste de Espírito, Dif. 10, para receber apenas metade desse dano. Alvos que tenh...",
          "cost": "4 PE",
          "type": {
            "actionType": "acaoAtiva",
            "category": "utilidade",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "1d12",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "spirit",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat015200000000",
    "name": "Hospedeiro de Zakar’thul",
    "type": "feature",
    "img": "icons/commodities/tech/sensor-eye.svg",
    "folder": "fldfeat070000000",
    "_key": "!items!feat015200000000",
    "system": {
      "name": "Hospedeiro de Zakar’thul",
      "description": "seja um Experimento), essa criatura utiliza as suas úúúltimas forças para tentar contaminar todos ao seu redor com a sua substância parasítica, forçando todos os Alvos Inimigos a até 20 metros a um teste de Vigor, Dif. 10. Caso falhem, são contaminados com um parasita artificial. Sempre que um Alvo contaminado por esse parasita receber uma Sentença do Corruptor (Dado de Morte), ele também receberá 1 Estágio de Evolução. Esse efeito não pode ser removido e é cumulativo. Com 3 Estágios de Evolução, todos os seus custos de Pontos de Energia são aumentados em 1. Com 6 Estágios de Evolução, todos os seus danos e regenerações de Pontos de Vida são reduzidos em um valor iÁgual ao total de Estágios de Contaminação. Com 9 Estágios de Evolução, todos os Resultados Naturais dos seus testes são reduzidos em 1. Com 10 Estágios de Evolução o Alvo morre automaticamente, sendo transformado em uma Cria de Zakar’thul (CÓDICE DE CRIATURA). Alvos com Estágios de Evolução podem escolher receber 1 ponto de Exaustão ao concluir um Repouso Completo, para que não sejam afetados pelos efeitos dos Estágios de Evolução por 6 horas. Essa Exaustão é aplicada após a remoção de Exaustão aplicada pelo Repouso Completo. Essa Exaustão não pode ser prevenida ou removida por outros efeitos que não sejam um Repouso Completo. Especial: Por sistema, esse parasita não pode ser removido. Contudo, caso o Narrador ache interessante, ele poderá criar meios especiais para que um personagem afetado possa removê-lo. O Narrador pode livremente descrever pequenas mudanças no corpo de um personagem afetado pelo parasita, atrelando as mudanças a cada Estágio de Evolução que o personagem possua.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Artificiais",
      "tier": "Extrema",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat015300000000",
    "name": "Proliferar a Legião",
    "type": "feature",
    "img": "icons/commodities/tech/sensor-eye.svg",
    "folder": "fldfeat070000000",
    "_key": "!items!feat015300000000",
    "system": {
      "name": "Proliferar a Legião",
      "description": "Esta criatura extrai do seu corpo uma massa de energia acinzentada, que segue na direção de todos os Alvos Inimigos a até 8 metros, forçando-os a um teste de Vigor, Dif. 10. Caso falhem, recebem o seu próprio total máximo de Pontos de Energia como Dano Imaterial e 1 ponto de Contágio. que receberem qualquer tipo de dano da criatura também receberão 1 ponto de Contágio. Alvos com 3 pontos de Contágio terão o seu turno controlado pela criatura. Enquanto estiverem com pontos de Contágio, Alvos poderão Árealizar um teste de Vigor, Dif. 10, ao final dos seus turnos. caso tenham sucesso, removerão 1 ponto de Contágio. Todos os pontos de Contágio aplicados pela criatura são removidos caso ela morra.",
      "category": "caracteristica",
      "cost": "4 PE",
      "typeAction": "acaoFinal",
      "typeAbility": "caracteristica",
      "types": [
        "acaoFinal"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Artificiais",
      "tier": "Extrema",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat01530000",
          "name": "Proliferar a Legião",
          "description": "Esta criatura extrai do seu corpo uma massa de energia acinzentada, que segue na direção de todos os Alvos Inimigos a até 8 metros, forçando-os a um teste de Vigor, Dif. 10. Caso falhem, recebem o seu próprio total máximo de Pontos de Energia como Da...",
          "cost": "4 PE",
          "type": {
            "actionType": "acaoFinal",
            "category": "utilidade",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat015400000000",
    "name": "Carapaça Demoníaca",
    "type": "feature",
    "img": "icons/magic/unholy/strike-body-explode-disintegrate.svg",
    "folder": "fldfeat080000000",
    "_key": "!items!feat015400000000",
    "system": {
      "name": "Carapaça Demoníaca",
      "description": "Sempre que essa criatura receber uma Condição Mágica de um Alvo, ela causará o dobro do seu total de pontos de Poder como Dano Mágico de Trevas nesse mesmo Alvo. A criatura também possui Aptidão em testes de Vigor e Espírito.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Abissais",
      "tier": "Fácil",
      "requirement": "",
      "subEffects": [],
      "improvements": [
        {
          "title": "Ascensão Abissal",
          "description": "A Aptidão concedida pela Característica é transformada em Aptidão Aprimorada.",
          "active": false
        }
      ],
      "actions": []
    }
  },
  {
    "_id": "feat015500000000",
    "name": "Herdeiro Abissal",
    "type": "feature",
    "img": "icons/magic/unholy/strike-body-explode-disintegrate.svg",
    "folder": "fldfeat080000000",
    "_key": "!items!feat015500000000",
    "system": {
      "name": "Herdeiro Abissal",
      "description": "Caso essa criatura tenha sucesso em atingir um Alvo com um Golpe Brutal ou Evocação Mística, e o Resultado Natural do ataque (Precisão ou Canalização) tenha sido 10, ou mais, a criatura aplicará Enfraquecido no Alvo. Com essa Característica, a criatura pode transformar todos os seus Danos Mágicos Neutros em Danos Mágicos de Trevas.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Abissais",
      "tier": "Fácil",
      "requirement": "",
      "subEffects": [],
      "improvements": [
        {
          "title": "Ascensão Abissal",
          "description": "O efeito des sa Característica passa a ser Árealizado em um Resultado Natural (Precisão ou Canalização) de 8, ou mais. LIGAÇÃO ABISSAL 1 PE | Ação Rápida | Conjuração Condição Mágica | Foco | Duração: 1 Minuto Ação causar qualquer tipo de dano a um Alvo, essa criatura pode se conectar ao Véu do Alvo, podendo utilizar os Pontos de Energia do Alvo nos seus próprios custos de Pontos de Energia até o final do seu próximo turno. Essa criatura pode utilizar um valor máximo de Pontos de Energia do Alvo equivalente ao seu total de pontos de Poder. ASCENSÃO ABISSAL Remova o custo de Pontos de Energia dessa Característica. Além disso, a Ação Rápida utilizada para Árealizá -la é transform ada em uma Ação Acelerada.",
          "active": false
        }
      ],
      "actions": []
    }
  },
  {
    "_id": "feat015600000000",
    "name": "Retribuição Sombria",
    "type": "feature",
    "img": "icons/magic/unholy/strike-body-explode-disintegrate.svg",
    "folder": "fldfeat080000000",
    "_key": "!items!feat015600000000",
    "system": {
      "name": "Retribuição Sombria",
      "description": "forçará esse mesmo Alvo a um teste de Espírito, Dif.8. Caso falhe, ele será afetado por Escuridão Mística por 1 minuto. Alvos afetado por essa Escuridão Mística poderão Árealizar um teste de Espírito, Dif. 8, ao final dos seus turnos. C aso tenha m sucesso, essa Escuridão Mística será removida.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Abissais",
      "tier": "Fácil",
      "requirement": "",
      "subEffects": [],
      "improvements": [
        {
          "title": "Ascensão Abissal",
          "description": "Os testes de Espírito dessa Característica possuem Inaptidão.",
          "active": false
        }
      ],
      "actions": []
    }
  },
  {
    "_id": "feat015700000000",
    "name": "Tentáculos Abissais",
    "type": "feature",
    "img": "icons/magic/unholy/strike-body-explode-disintegrate.svg",
    "folder": "fldfeat080000000",
    "_key": "!items!feat015700000000",
    "system": {
      "name": "Tentáculos Abissais",
      "description": "Essa criatura conjura diversos tentáculos espectrais a até 6 metros, que seguem na direção de um número de Alvos iÁgual ao total de Poder da criatura, forçando cada Alvo a um teste de Vigor, Dif. 8. Caso falhem, a criatura poderá desloca -los involuntariamente para um novo local a até 6 metros, além de serem afetados por Lentidão. Caso um Alvo esteja sob o efeito Voar ao falhar no teste de Vigor dessa Característica, ele perderá esse efeito por 10 Minutos.",
      "category": "caracteristica",
      "cost": "1 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "caracteristica",
      "types": [
        "acaoSimples"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Abissais",
      "tier": "Fácil",
      "requirement": "",
      "subEffects": [],
      "improvements": [
        {
          "title": "Ascensão Abissal",
          "description": "O teste de Vigor dessa Característica possui Inaptidão.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_feat01570000",
          "name": "Tentáculos Abissais",
          "description": "Essa criatura conjura diversos tentáculos espectrais a até 6 metros, que seguem na direção de um número de Alvos iÁgual ao total de Poder da criatura, forçando cada Alvo a um teste de Vigor, Dif. 8. Caso falhem, a criatura poderá desloca -los involun...",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "ataque_magico",
            "tags": [
              "Conjuração"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": false,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": true,
            "status": "lentidao",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 8,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat015800000000",
    "name": "Amedrontar",
    "type": "feature",
    "img": "icons/magic/unholy/strike-body-explode-disintegrate.svg",
    "folder": "fldfeat080000000",
    "_key": "!items!feat015800000000",
    "system": {
      "name": "Amedrontar",
      "description": "Condição Mágica | Duração: 1 Minuto Essa criatura aplica es sa Condição Mágica em um Alvo a até 6 metros, de modo que ele possua Inaptidão em todos os seus testes de Precisão, Canalização e Defesa contra essa criatura. Alvos afetados por essa Condição Mágica não podem utilizar a sua Movimentação na direção da criatura. Alvos afetados por es sa Condição Mágica poderão Árealizar um teste de Espírito, Dif. 8, ao final dos seus turnos. Caso tenh am sucesso, essa Condição Mágica será removida.",
      "category": "caracteristica",
      "cost": "1 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "caracteristica",
      "types": [
        "acaoSimples"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Abissais",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [
        {
          "title": "Ascensão Abissal",
          "description": "O número de Alvos dessa Característica é aumentado em um valor iÁgual à metade do total de Poder desta criatura.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_feat01580000",
          "name": "Amedrontar",
          "description": "Condição Mágica | Duração: 1 Minuto Essa criatura aplica es sa Condição Mágica em um Alvo a até 6 metros, de modo que ele possua Inaptidão em todos os seus testes de Precisão, Canalização e Defesa contra essa criatura. Alvos afetados por essa Condiçã...",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "ataque_magico",
            "tags": [
              "Conjuração"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": false,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": true,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "spirit",
            "difficulty": 8,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat015900000000",
    "name": "Artimanha Abissal",
    "type": "feature",
    "img": "icons/magic/unholy/strike-body-explode-disintegrate.svg",
    "folder": "fldfeat080000000",
    "_key": "!items!feat015900000000",
    "system": {
      "name": "Artimanha Abissal",
      "description": "Essa criatura cria símbolos abissais em todos os Alvos Inimigos a até 8 metros, forçando -os a um teste de Espírito, Dif. 8. Caso tenham sucesso, receberão 1d8 de Dano Mágico de Trevas para cada ponto de Poder da criatura. Caso tenha m falhado no teste de Espírito, terão o seu próximo custo de Pontos de Energia ignorado. Custos de Pontos de Energia variáveis não são afetados por esse efeito. Caso não seja utilizado, o efeito é removido em 1 minuto. O custo de Pontos de Energia ignorado por es se efeito é removido dos Pontos de Energia de um Alvo Inimigo diferente a até 8 metros, a critério da criatura.",
      "category": "caracteristica",
      "cost": "2 PE",
      "typeAction": "acaoAtiva",
      "typeAbility": "caracteristica",
      "types": [
        "acaoAtiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Abissais",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [
        {
          "title": "Ascensão Abissal",
          "description": "O teste de Espírito dessa Característica possui Inaptidão.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_feat01590000",
          "name": "Artimanha Abissal",
          "description": "Essa criatura cria símbolos abissais em todos os Alvos Inimigos a até 8 metros, forçando -os a um teste de Espírito, Dif. 8. Caso tenham sucesso, receberão 1d8 de Dano Mágico de Trevas para cada ponto de Poder da criatura. Caso tenha m falhado no tes...",
          "cost": "2 PE",
          "type": {
            "actionType": "acaoAtiva",
            "category": "ataque_magico",
            "tags": [
              "Conjuração"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "1d8",
            "type": "immaterial",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "spirit",
            "difficulty": 8,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat016000000000",
    "name": "Gatilho Demoníaco",
    "type": "feature",
    "img": "icons/magic/unholy/strike-body-explode-disintegrate.svg",
    "folder": "fldfeat080000000",
    "_key": "!items!feat016000000000",
    "system": {
      "name": "Gatilho Demoníaco",
      "description": "uma risada macabra, forçando o Alvo que causou o úúltimo dano na criatura a um teste de Espírito, Dif. 8. Caso falhe, a criatura teste de Parâmetro para resistir ao s seus efeitos, o Alvo falhará automaticamente.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "acaoAtiva",
      "typeAbility": "caracteristica",
      "types": [
        "acaoAtiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Abissais",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [
        {
          "title": "Ascensão Abissal",
          "description": "O teste de Espírito dessa Característica possui Inaptidão. PERTURBAÇÃO SOMBRIA Iniciativa Independente da ordem de Iniciativa, e ssa Característica é Árealizada antes de qualquer outra Habilidade de Iniciativa. Essa criatura força todos os Alvos Inimigos a até 8 metros a um teste de Espírito, Dif. 8. Caso falhem, não poder ão utilizar habilidades de Iniciativa nesse combate. Caso um Alvo Inimigo possua es sa Característica, ambos Árealizam um Embate de Poder — o Alvo com o maior resultado Árealiza a Característica primeiro. ASCENSÃO ABISSAL O teste de Espírito dessa Característica possui Inaptidão.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_feat01600000",
          "name": "Gatilho Demoníaco",
          "description": "uma risada macabra, forçando o Alvo que causou o úúltimo dano na criatura a um teste de Espírito, Dif. 8. Caso falhe, a criatura teste de Parâmetro para resistir ao s seus efeitos, o Alvo falhará automaticamente.",
          "cost": "",
          "type": {
            "actionType": "acaoAtiva",
            "category": "utilidade",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "spirit",
            "difficulty": 8,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat016100000000",
    "name": "Repressão Sombria",
    "type": "feature",
    "img": "icons/magic/unholy/strike-body-explode-disintegrate.svg",
    "folder": "fldfeat080000000",
    "_key": "!items!feat016100000000",
    "system": {
      "name": "Repressão Sombria",
      "description": "essa criatura forçará esse mesmo Alvo a um teste de Espírito, Dif. 8. Caso falhe, o Alvo receberá 1d8 de Dano Mágico de Trevas para cada ponto de Poder da criatura.",
      "category": "caracteristica",
      "cost": "1 PE",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Abissais",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [
        {
          "title": "Ascensão Abissal",
          "description": "O teste de Espírito dessa Característica possui Inaptidão.",
          "active": false
        }
      ],
      "actions": []
    }
  },
  {
    "_id": "feat016200000000",
    "name": "Anfitrião dos Pesadelos",
    "type": "feature",
    "img": "icons/magic/unholy/strike-body-explode-disintegrate.svg",
    "folder": "fldfeat080000000",
    "_key": "!items!feat016200000000",
    "system": {
      "name": "Anfitrião dos Pesadelos",
      "description": "todos os Alvos Inimigos a até 8 metros a um teste de Espírito, Dif. 10. Caso falhem, começam a ter pesadelos com essa criatura. Todo Repouso passa a precisar de 2 horas adicionais para ser Árealizado, além disso, de todos os seus custos de Pontos de Energia de Habilidades de Caminho são aumentados em 2. Você, ocasionalémente, passa a acreditar ver a criatura, por isso, a sua mente perturbada tira a sua paciência com Alvos Aliados com facilidade, de modo que qualquer pergunta, discussão ou cr ítica o tire do sério, podendo até me smo fazer com que você ataque um Alvo Aliado. Os efeitos dessa Característica permanecem em um Alvo por um número de dias equivalente ao total de Poder da criatura. Caso o Alvo derrote uma criatura com, pelo menos, uma Característica do Livro dos Seres Abissais, esse efeito é removido.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Abissais",
      "tier": "Difícil",
      "requirement": "",
      "subEffects": [],
      "improvements": [
        {
          "title": "Ascensão Abissal",
          "description": "Sempre que um Alvo afetado pelos efeitos dessa Característica concluir um Repouso, ele deverá Árealizar um teste de Espírito, Dif. 10. Caso falhe, o Alvo recebe 1 ponto de Exaustão.",
          "active": false
        }
      ],
      "actions": []
    }
  },
  {
    "_id": "feat016300000000",
    "name": "Aposta Maldita",
    "type": "feature",
    "img": "icons/magic/unholy/strike-body-explode-disintegrate.svg",
    "folder": "fldfeat080000000",
    "_key": "!items!feat016300000000",
    "system": {
      "name": "Aposta Maldita",
      "description": "Foco | Duração: 1 Minuto Essa criatura se vincula a um Alvo a até 8 metros, de modo que, todo final de turno da criatura, ela pode forçar o Alvo vinculado a um teste de Espírito contra o Poder da criatura. Quem falhar o Embate receberá 1d10 de Dano Mágico de Trevas para cada ponto de Poder da criatura.",
      "category": "caracteristica",
      "cost": "2 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "caracteristica",
      "types": [
        "acaoSimples"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Abissais",
      "tier": "Difícil",
      "requirement": "",
      "subEffects": [],
      "improvements": [
        {
          "title": "Ascensão Abissal",
          "description": "Remove o custo de Pontos de Energia dessa Característica. Além disso, a Ação Simples utilizada para Árealizá -la é transformada em uma Ação Acelerada.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_feat01630000",
          "name": "Aposta Maldita",
          "description": "Foco | Duração: 1 Minuto Essa criatura se vincula a um Alvo a até 8 metros, de modo que, todo final de turno da criatura, ela pode forçar o Alvo vinculado a um teste de Espírito contra o Poder da criatura. Quem falhar o Embate receberá 1d10 de Dano M...",
          "cost": "2 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "ataque_magico",
            "tags": [
              "Conjuração"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "1d10",
            "type": "immaterial",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "spirit",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat016400000000",
    "name": "Artifício Sombrio",
    "type": "feature",
    "img": "icons/magic/unholy/strike-body-explode-disintegrate.svg",
    "folder": "fldfeat080000000",
    "_key": "!items!feat016400000000",
    "system": {
      "name": "Artifício Sombrio",
      "description": "Essa criatura modifica a essência de um Alvo a até 8 metros de uma das seguintes formas: • Caso o Alvo esteja recebendo Aptidão ou Aptidão Aprimorada em um teste vigente, substitua-a por Inaptidão. • Caso esse Alvo esteja recebendo Inaptidão ou Inaptidão Aprimorada em um teste vigente, substitua-a por Aptidão.",
      "category": "caracteristica",
      "cost": "1 PE",
      "typeAction": "acaoRapida",
      "typeAbility": "caracteristica",
      "types": [
        "acaoRapida"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Abissais",
      "tier": "Difícil",
      "requirement": "",
      "subEffects": [],
      "improvements": [
        {
          "title": "Ascensão Abissal",
          "description": "Remove o custo de Pontos de Energia desta Característica. Além disso, a Ação Rápida utilizada para Árealizá -la é transformada em uma Ação Acelerada.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_feat01640000",
          "name": "Artifício Sombrio",
          "description": "Essa criatura modifica a essência de um Alvo a até 8 metros de uma das seguintes formas: • Caso o Alvo esteja recebendo Aptidão ou Aptidão Aprimorada em um teste vigente, substitua-a por Inaptidão. • Caso esse Alvo esteja recebendo Inaptidão ou Inapt...",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoRapida",
            "category": "ataque_magico",
            "tags": [
              "Conjuração"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": false,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat016500000000",
    "name": "O Úúltimo Lamento",
    "type": "feature",
    "img": "icons/magic/unholy/strike-body-explode-disintegrate.svg",
    "folder": "fldfeat080000000",
    "_key": "!items!feat016500000000",
    "system": {
      "name": "O Úúltimo Lamento",
      "description": "Essa criatura convoca as forças dos Arquidemônios, direcionando-as a todos os Alvos Inimigos a até 20 metros. Até o final do combate, sempre que um Alvo afetado por essa Característica iniciar o seu turno, ele deverá Árealizar um teste de Espírito, Dif. 10. Caso falhe, o Alvo receberá 1 Marca do Lamento. Esse efeito acumula e permanece por 1 minuto. Caso um Alvo possua 10 Marcas do Lamento, o Alvo tem os seus Pontos de Vida atuais reduzidos a zero. Caso a criatura morra, todas as Marcas do Lamento aplicadas por ela desaparecem.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "acaoAtiva",
      "typeAbility": "caracteristica",
      "types": [
        "acaoAtiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Abissais",
      "tier": "Difícil",
      "requirement": "",
      "subEffects": [],
      "improvements": [
        {
          "title": "Ascensão Abissal",
          "description": "Alvos que falharem no teste de Espírito dessa Característica passam a receber 2 Marcas do Lamento.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_feat01650000",
          "name": "O Úúltimo Lamento",
          "description": "Essa criatura convoca as forças dos Arquidemônios, direcionando-as a todos os Alvos Inimigos a até 20 metros. Até o final do combate, sempre que um Alvo afetado por essa Característica iniciar o seu turno, ele deverá Árealizar um teste de Espírito, D...",
          "cost": "",
          "type": {
            "actionType": "acaoAtiva",
            "category": "utilidade",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": false,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "spirit",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat016600000000",
    "name": "Prestígio Abissal",
    "type": "feature",
    "img": "icons/magic/unholy/strike-body-explode-disintegrate.svg",
    "folder": "fldfeat080000000",
    "_key": "!items!feat016600000000",
    "system": {
      "name": "Prestígio Abissal",
      "description": "Sempre que essa criatura tiver sucesso em um teste de Parâmetro, ela regenerará um valor de Pontos de Vida equivalente ao dobro do seu total de Poder. escolher rolar novamente um, ou mais, dados de dano causado, ficando com os novos resultados. Esse efeito só pode ser Árealizado uma vez por turno.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Abissais",
      "tier": "Difícil",
      "requirement": "",
      "subEffects": [],
      "improvements": [
        {
          "title": "Ascensão Abissal",
          "description": "Uma vez por rodada, essa criatura pode receber Aptidão e Prioridade em um teste de Parâmetro. Caso o teste ao qual essa Aptidão foi aplicada seja uma falha, a criatura poderá utilizar este efeito novamente em uma mesma rodada.",
          "active": false
        }
      ],
      "actions": []
    }
  },
  {
    "_id": "feat016700000000",
    "name": "Emissária da Cidadela das Correntes",
    "type": "feature",
    "img": "icons/magic/unholy/strike-body-explode-disintegrate.svg",
    "folder": "fldfeat080000000",
    "_key": "!items!feat016700000000",
    "system": {
      "name": "Emissária da Cidadela das Correntes",
      "description": "seu redor até 100 metros, transformando -a em uma réplica de uma cidadela nefasta na qual estão os maiores medos dos Alvos Inimigos em combate. Esse efeito é desfeito a critério da criatura, ou quando ela morrer. A criatura exige um tributo à Senhora das Correntes, de modo equivalente ao dobro do total de Poder da criatura. Caso ela atinja um Alvo com um Ataque Físico ou Ataque Mágico, ela envolverá esse mesmo Alvo com uma corrente mística corrompida, forçando -o a um teste de Espírito, Dif. 10. Caso falhe, o Alvo verá a criatura como um Alvo Aliado, lutando fielmente contra os Alvos Inimigos da criatura por 1 minuto. Somente um Alvo pode ser mantido sob esse efeito por vez. Alvos afetados por es se efeito poder ão Árealizar um teste de Espírito, Dif. 10, ao final dos seus turnos. Caso tenham sucesso, esse efeito será removido. O efeito é removido caso a criatura morra.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "acaoSimples",
      "typeAbility": "caracteristica",
      "types": [
        "acaoSimples"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Abissais",
      "tier": "Extrema",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_feat01670000",
          "name": "Emissária da Cidadela das Correntes",
          "description": "seu redor até 100 metros, transformando -a em uma réplica de uma cidadela nefasta na qual estão os maiores medos dos Alvos Inimigos em combate. Esse efeito é desfeito a critério da criatura, ou quando ela morrer. A criatura exige um tributo à Senhora...",
          "cost": "",
          "type": {
            "actionType": "acaoSimples",
            "category": "ataque_magico",
            "tags": []
          },
          "attack": {
            "hasAttack": true,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": false,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "spirit",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat016800000000",
    "name": "Emissário das Cordilheiras sem Fim",
    "type": "feature",
    "img": "icons/magic/unholy/strike-body-explode-disintegrate.svg",
    "folder": "fldfeat080000000",
    "_key": "!items!feat016800000000",
    "system": {
      "name": "Emissário das Cordilheiras sem Fim",
      "description": "seu redor até 100 metros, transformando -a em uma réplica do cume de uma grande montanha, onde corpos começam a cair do céu junto a uma chuva pútrida. Esse efeito é desfeito a critério da criatura, ou quando ela morrer. A criatura exige um tributo ao Titã da Tormenta, recebendo +1 de Poder ao final de um turno no qual tenha recebido qualquer tipo de dano. O valor máximo recebido dessa forma é iÁgual ao dobro do total de Poder da criatura. Este valor é removido ao final do próximo turno desta criatura. Este efeito acumula. Toda vez que a criatura atingir um Alvo com um Ataque Físico ou Ataque Mágico sem causar um Acerto Crítico, a diferença para que ela cause um Acerto Crítico é reduzida em 1. Esse efeito é reiniciado após você atingir um Alvo com um Acerto Crítico",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Abissais",
      "tier": "Extrema",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat016900000000",
    "name": "Emissária das Fossas da Perdição",
    "type": "feature",
    "img": "icons/magic/unholy/strike-body-explode-disintegrate.svg",
    "folder": "fldfeat080000000",
    "_key": "!items!feat016900000000",
    "system": {
      "name": "Emissária das Fossas da Perdição",
      "description": "seu redor até 100 metros, transformando -a em uma réplica de um grande abismo, preenchido por um líquido avermelhado, de onde apenas uma pequena superfície de terra é criada sob a criatura e tudo a até 20 metros dela. Bolhas estouram a partir do líquido, soltando gritos de terror. Esse efeito é desfeito a critério da criatura, ou quando ela morrer. A criatura exige um tributo à Ceifadora, portanto, ao iniciar o seu turno, todos os Alvos Inimigos a até 8 metros devem Árealizar um teste de Espírito, Dif. 10. Caso falhem, receberão 1 ponto de Ganância. Para cada ponto de Ganância, os Alvos têm o seu Parâmetro de maior valor reduzido em 1. Alvos que possuírem dois Parâmetros com o mesmo valor ao serem afetados por Ganância, deverão escolher o Parâmetro que será reduzido. Pontos de Ganância permanecem por 1 minuto em um Alvo. Sempre que um Alvo receber 1 ponto de Ganância, a criatura recebe Aptidão no seu próximo teste de Parâmetro. Esse efeito não acumula.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Abissais",
      "tier": "Extrema",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat017000000000",
    "name": "Emissário do Pântano dos Condenados",
    "type": "feature",
    "img": "icons/magic/unholy/strike-body-explode-disintegrate.svg",
    "folder": "fldfeat080000000",
    "_key": "!items!feat017000000000",
    "system": {
      "name": "Emissário do Pântano dos Condenados",
      "description": "seu redor até 100 metros, transformando -a em uma réplica de um pântano de cheiro pút rido, onde corpos apodrecidos são devorados por insetos. Esse efeito é desfeito a critério da criatura, ou quando ela morrer. A criatura exige um tributo ao Barão da Podridão, recebendo um valor de Pontos de Vida Temporários equivalente ao seu próprio total máximo de Pontos de Energia ao final de um turno no qual tenha causado qualquer tipo de dano a um Alvo. Esse efeito ocorre apenas uma vez por turno. completo, a cria tura vomita um lodo apodrecido em todos os Alvos a até 6 metros, forçando-os a um teste de Vigor, Dif. 10. Caso falhem, recebem o total máximo de Pontos de Energia da criatura como Dano Mágico de Trevas, além de não poderem regenerar Pontos de Vida por 1 minuto.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Abissais",
      "tier": "Extrema",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat017100000000",
    "name": "Emissário da Planície do Silêncio",
    "type": "feature",
    "img": "icons/magic/unholy/strike-body-explode-disintegrate.svg",
    "folder": "fldfeat080000000",
    "_key": "!items!feat017100000000",
    "system": {
      "name": "Emissário da Planície do Silêncio",
      "description": "seu redor até 100 metros, transformando -a em uma réplica de uma planície desolada e totalémente desprovida de cor, onde nenhum som pode ser emitido. Esse efeito é desfeito a critério da criatura, ou quando ela morrer. tipo de dano de um Alvo, a criatura sussurra na mente desse Alvo, forçando-o a um teste de Espírito, Dif. 10. Caso falhe, ele ficará levemente adormecido, tendo qualquer Foco removido, além de minuto. Enquanto estiver levemente adormecido, caso precise Árealizar um teste de Defesa, terá 1 como Resultado Natural nesse teste. Alvos afetados por esse efeito poderão Árealizar um teste de Espírito, Dif. 10, ao final dos seus turnos. Caso tenham sucesso, esse efeito será removido. Caso o Alvo desse efeito perca qualquer valor de Pontos de Vida, Pontos de Energia, ou seja, removido. Sempre que essa criatura causar qualquer tipo de dano em um Alvo, ela poderá Árealizar um Teste de Destino, Dif. 10. Caso tenha sucesso, esse dano será anulado e o Alvo receberá 1 ponto de Exaustão. Esse efeito ocorre apenas uma vez por turno, por Alvo.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Abissais",
      "tier": "Extrema",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat017200000000",
    "name": "Emissário da Selva dos Empalados",
    "type": "feature",
    "img": "icons/magic/unholy/strike-body-explode-disintegrate.svg",
    "folder": "fldfeat080000000",
    "_key": "!items!feat017200000000",
    "system": {
      "name": "Emissário da Selva dos Empalados",
      "description": "seu redor até 100 metros, transformando -a em uma réplica de uma selva, de árvores mortas petrificadas, possuindo os semblantes de conhecidos dos Alvos nessa áÁrea, além de uma névoa com cheir o de enxofre. Esse efeito é desfeito a critério da criatura, ou quando ela morrer. A criatura exige um tributo ao Caos Insaciável. Sempre que esta criatura falhe em um teste de Vigor ou Espírito, ela causará o seu próprio total máximo de Pontos de Energia como Dano Mágico de Trevas em todos os Alvos Inimigos a até 10 metros. Esse efeito ocorre apenas uma vez por turno. Caso a criatura falhe em um teste de Precisão ou Canalização, ela poderá refazer o teste. Esse efeito pode ser utilizado um número de vezes em uma mesma rodada iÁgual ao total de Poder da criatura.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Abissais",
      "tier": "Extrema",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat017300000000",
    "name": "Emissário do Templo da Inexistência",
    "type": "feature",
    "img": "icons/magic/unholy/strike-body-explode-disintegrate.svg",
    "folder": "fldfeat080000000",
    "_key": "!items!feat017300000000",
    "system": {
      "name": "Emissário do Templo da Inexistência",
      "description": "seu redor até 100 metros, transformando -a em uma réplica de um templo destruído no centro de um gigantesco cemitério, cheio de corpos desmembrados e costurados por seres feitos de névoa. Esse efeito é desfeito a critério da criatura, ou quando ela morrer. A criatura exige um tributo ao Escárnio da Realidade. Alvos Inimigos a até 8 metros são afetado pelos seguintes efeitos: • Você não pode receber Pontos de Vida Temporários. • Você não pode receber Pontos de Energia Temporários. • Todos os seus custos de Pontos de Energia são aumentados em 2. • Você não pode regenerar Pontos de Energia. • Você não pode ter os seus Parâmetros aumentados. • Você não pode receber Aptidões. Sempre que u m Alvo Inimigo a até 20 metros dessa criatura Árealize uma Habilidade de Caminho que conceda um efeito a outro Alvo Inimigo da criatura, ela também receberá esse efeito. Regenerações de Pontos de Vida não são afetadas por esse efeito.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Abissais",
      "tier": "Extrema",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat017400000000",
    "name": "Farol de Ofir",
    "type": "feature",
    "img": "icons/magic/holy/prayer-hands-glowing-yellow.svg",
    "folder": "fldfeat090000000",
    "_key": "!items!feat017400000000",
    "system": {
      "name": "Farol de Ofir",
      "description": "A grandiosidade dessa criatura faz com que, sempre que um Alvo Inimigo tenha sucesso em um teste de Parâmetro contra es sa criatura, ele receberá -1 em todos os seus testes de Parâmetros. Esse efeito não acumula, mesmo vindo de fontes diferentes. Esse efeito permanece ativo até o final do próximo turno do Alvo Inimigo.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Celestiais",
      "tier": "Fácil",
      "requirement": "",
      "subEffects": [],
      "improvements": [
        {
          "title": "Ascensão Celestial",
          "description": "A penalidade aplicada pela Característica passa a ser -2.",
          "active": false
        }
      ],
      "actions": []
    }
  },
  {
    "_id": "feat017500000000",
    "name": "Herdeiro Celestial",
    "type": "feature",
    "img": "icons/magic/holy/prayer-hands-glowing-yellow.svg",
    "folder": "fldfeat090000000",
    "_key": "!items!feat017500000000",
    "system": {
      "name": "Herdeiro Celestial",
      "description": "Caso essa criatura tenha sucesso em atingir um Alvo com um Golpe Brutal ou Evocação Mística, e o Resultado Natural do ataque (Precisão ou Canalização) tenha sido 10, ou mais, a criatura aplicará Atordoado no Alvo. Com essa Característica, a criatura pode transformar todos os seus Danos Mágicos Neutros em Danos Mágicos de Luz.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Celestiais",
      "tier": "Fácil",
      "requirement": "",
      "subEffects": [],
      "improvements": [
        {
          "title": "Ascensão Celestial",
          "description": "O efeito des sa Característica passa a ser Árealizado em um Resultado Natural (Precisão ou Canalização) de 8, ou mais.",
          "active": false
        }
      ],
      "actions": []
    }
  },
  {
    "_id": "feat017600000000",
    "name": "Presença da Humildade",
    "type": "feature",
    "img": "icons/magic/holy/prayer-hands-glowing-yellow.svg",
    "folder": "fldfeat090000000",
    "_key": "!items!feat017600000000",
    "system": {
      "name": "Presença da Humildade",
      "description": "Emanando a sua presença celestial, essa criatura faz com que todos os Alvos Inimigos a até 8 metros não possam ser afetados por Efeitos Positivos, Maximizar ou Amplificar. Sempre que essa criatura falhar em um teste de Defesa, o Alvo que a forçou ao teste possuirá Inaptidão no seu próximo teste de Parâmetro. Caso o Parâmetro afetado por esse efeito já possua Inaptidão, ela será transformada em Inaptidão Aprimorada.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "presenca",
      "typeAbility": "caracteristica",
      "types": [
        "presenca"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Celestiais",
      "tier": "Fácil",
      "requirement": "",
      "subEffects": [],
      "improvements": [
        {
          "title": "Ascensão Celestial",
          "description": "A criatura faz com que todo Alvo Inimigo a até 8 metros também não possa ser afetado por Transformações ou Focos. PURIFICAÇÃO CELESTE 1 PE | Ação Simples | Conjuração Essa criatura cria símbolos celestiais em um Alvo a até 8 metros, removendo qualquer valor de Pontos de Vida Temporários e Pontos de Energia Temporários dele. Após utilizar esse efeito, o próximo dano causado ao Alvo será aumentado em um valor iÁgual ao total máximo de Pontos de Energia do Alvo. ASCENSÃO CELESTIAL Remove o custo de Pontos de Energia dessa Característica. Além disso, a Ação Simples utilizada para Árealizá -la é transformada em uma Ação Acelerada.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_feat01760000",
          "name": "Presença da Humildade",
          "description": "Emanando a sua presença celestial, essa criatura faz com que todos os Alvos Inimigos a até 8 metros não possam ser afetados por Efeitos Positivos, Maximizar ou Amplificar. Sempre que essa criatura falhar em um teste de Defesa, o Alvo que a forçou ao ...",
          "cost": "",
          "type": {
            "actionType": "presenca",
            "category": "defesa",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": false,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat017700000000",
    "name": "Resplendor da Cidade Radiante",
    "type": "feature",
    "img": "icons/magic/holy/prayer-hands-glowing-yellow.svg",
    "folder": "fldfeat090000000",
    "_key": "!items!feat017700000000",
    "system": {
      "name": "Resplendor da Cidade Radiante",
      "description": "Característica para liberar uma onda de energia dourada, forçando todos os Alvos Inimigos a até 4 metros a Árealizarem um teste de Vigor, Dif. 8. Caso falhem, ficarão Caídos e com Lentidão.",
      "category": "caracteristica",
      "cost": "1 PE",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Celestiais",
      "tier": "Fácil",
      "requirement": "",
      "subEffects": [],
      "improvements": [
        {
          "title": "Ascensão Celestial",
          "description": "O teste de Vigor dessa Característica possui Inaptidão.",
          "active": false
        }
      ],
      "actions": []
    }
  },
  {
    "_id": "feat017800000000",
    "name": "A Outra Face",
    "type": "feature",
    "img": "icons/magic/holy/prayer-hands-glowing-yellow.svg",
    "folder": "fldfeat090000000",
    "_key": "!items!feat017800000000",
    "system": {
      "name": "A Outra Face",
      "description": "Essa criatura é revestida por uma energia celestial, que faz com que a metade de toda regeneração de Pontos de Vida Árealizada ou recebida por um Alvo Inimigo a até 8 metros também a afete. Esse efeito ocorre apenas uma vez por turno.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "presenca",
      "typeAbility": "caracteristica",
      "types": [
        "presenca"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Celestiais",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [
        {
          "title": "Ascensão Celestial",
          "description": "Essa Presença pode ser mantida em conjunto com outra Presença.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_feat01780000",
          "name": "A Outra Face",
          "description": "Essa criatura é revestida por uma energia celestial, que faz com que a metade de toda regeneração de Pontos de Vida Árealizada ou recebida por um Alvo Inimigo a até 8 metros também a afete. Esse efeito ocorre apenas uma vez por turno.",
          "cost": "",
          "type": {
            "actionType": "presenca",
            "category": "suporte",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": false,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat017900000000",
    "name": "Decreto do Reino Celeste",
    "type": "feature",
    "img": "icons/magic/holy/prayer-hands-glowing-yellow.svg",
    "folder": "fldfeat090000000",
    "_key": "!items!feat017900000000",
    "system": {
      "name": "Decreto do Reino Celeste",
      "description": "Essa criatura evoca as forças celestiais sob um Alvo a até 8 metros, forçando -o a um teste de Vigor, Dif. 8. Caso falhe, ele recebe o seu próprio total máximo de Pontos de Energia como Dano Mágico de Luz. A criatura recebe um valor de Pontos de Vida Temporários equivalente ao total de Dano Mágico de Luz causado pela Característica.",
      "category": "caracteristica",
      "cost": "1 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "caracteristica",
      "types": [
        "acaoSimples"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Celestiais",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [
        {
          "title": "Ascensão Celestial",
          "description": "O teste de Vigor dessa Característica possui Inaptidão.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_feat01790000",
          "name": "Decreto do Reino Celeste",
          "description": "Essa criatura evoca as forças celestiais sob um Alvo a até 8 metros, forçando -o a um teste de Vigor, Dif. 8. Caso falhe, ele recebe o seu próprio total máximo de Pontos de Energia como Dano Mágico de Luz. A criatura recebe um valor de Pontos de Vida...",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "ataque_magico",
            "tags": [
              "Conjuração"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": true,
            "formula": "@power",
            "type": "temp",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 8,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat018000000000",
    "name": "O Mensageiro",
    "type": "feature",
    "img": "icons/magic/holy/prayer-hands-glowing-yellow.svg",
    "folder": "fldfeat090000000",
    "_key": "!items!feat018000000000",
    "system": {
      "name": "O Mensageiro",
      "description": "Inimigos a até 8 metros a um teste de Espírito, Dif. 8. Caso falhem, terão o seu resultado de Iniciativa substituído para 1.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Celestiais",
      "tier": "Normal",
      "requirement": "",
      "subEffects": [],
      "improvements": [
        {
          "title": "Ascensão Celestial",
          "description": "O teste de Espírito dessa Característica possui Inaptidão. ONDULAÇÃO CELESTIAL 2 PE | Ação Ativa | Conjuração Essa criatura condensa uma energia celestial ao seu redor, que afeta todos os Alvos Inimigos a até 8 metros, forçando-os a um teste de Espírito, Dif. 8. Caso falhem, recebem 1d8 de Dano Mágico de Luz para cada ponto de Poder da criatura. Alvos que forem bem -sucedidos no teste de Espírito, não poderão Árealizar Habilidades de Caminho que possuam custos de Pontos de Energia até o final do seu próximo turno. ASCENSÃO CELESTIAL O teste de Espírito dessa Característica possui Inaptidão.",
          "active": false
        }
      ],
      "actions": []
    }
  },
  {
    "_id": "feat018100000000",
    "name": "As Chaves e o Cubo",
    "type": "feature",
    "img": "icons/magic/holy/prayer-hands-glowing-yellow.svg",
    "folder": "fldfeat090000000",
    "_key": "!items!feat018100000000",
    "system": {
      "name": "As Chaves e o Cubo",
      "description": "Diversos glifos divinos começam a aparecer no corpo de ssa criatura, que são direcionados a um Alvo a até 8 metros, forçando-o a um teste de Vigor e Espírito, ambos de Dif. 10: Caso o Alvo falhe no teste de Vigor, o próximo dano causado por ele fará com que todos os seus Alvos Aliados a até 8 metros recebam o seu próprio total máximo de Pontos de Energia como Dano Mágico de Luz. Caso o Alvo falhe no teste de Espírito, ele perderá os efeitos das suas Habilidades de Legado até receber um novo Nível de Despertar. Essa Característica não pode ser interrompida ou anulada.",
      "category": "caracteristica",
      "cost": "3 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "caracteristica",
      "types": [
        "acaoSimples"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Celestiais",
      "tier": "Difícil",
      "requirement": "",
      "subEffects": [],
      "improvements": [
        {
          "title": "Ascensão Celestial",
          "description": "Os testes de Vigor e Espírito dessa Característica possuem Inaptidão.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_feat01810000",
          "name": "As Chaves e o Cubo",
          "description": "Diversos glifos divinos começam a aparecer no corpo de ssa criatura, que são direcionados a um Alvo a até 8 metros, forçando-o a um teste de Vigor e Espírito, ambos de Dif. 10: Caso o Alvo falhe no teste de Vigor, o próximo dano causado por ele fará ...",
          "cost": "3 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "ataque_magico",
            "tags": [
              "Conjuração"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat018200000000",
    "name": "A Palavra Impronunciável",
    "type": "feature",
    "img": "icons/magic/holy/prayer-hands-glowing-yellow.svg",
    "folder": "fldfeat090000000",
    "_key": "!items!feat018200000000",
    "system": {
      "name": "A Palavra Impronunciável",
      "description": "turno, todos os Alvos Inimigos a até 20 metros que não esteja Incapacitado recebe 1 ponto de Oferenda. Alvos afetados por essa Característica podem sacrificar um valor de Pontos de Vida ou Pontos de Energia para ignorar o ponto de Oferenda que receberia: • Pontos de Vida: O Alvo sacrifica um valor de Pontos de Vida equivalente ao total máximo de Pontos de Energia da criatura. • Pontos de Energia: O Alvo sacrifica um valor de Pontos de Energia equivalente ao Poder da criatura. A cada 2 pontos de Oferenda que um Alvo possua, esse Alvo receberá 1 ponto de Exaustão. Caso a criatura morra, todos os Alvos que possuam pontos de Oferenda aplicados por ela perdem esse efeito. Caso contrário, pontos de Oferenda permanecem por 24 horas. efeito permanecem no Alvo.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Celestiais",
      "tier": "Difícil",
      "requirement": "",
      "subEffects": [],
      "improvements": [
        {
          "title": "Ascensão Celestial",
          "description": "Essa criatura regenera metade do valor de Pontos de Vida e Pontos de Energia sacrificados por um Alvo para ignorar o ponto de Oferenda desta Característica.",
          "active": false
        }
      ],
      "actions": []
    }
  },
  {
    "_id": "feat018300000000",
    "name": "A Úúltima Trombeta",
    "type": "feature",
    "img": "icons/magic/holy/prayer-hands-glowing-yellow.svg",
    "folder": "fldfeat090000000",
    "_key": "!items!feat018300000000",
    "system": {
      "name": "A Úúltima Trombeta",
      "description": "Independente da ordem de Iniciativa, e ssa Característica é Árealizada antes de qualquer outra Habilidade de Iniciativa. Essa criatura faz com que até duas habilidades de Iniciativa Árealizadas por Alvos Inimigos nesse combate também sejam Árealizadas pela criatura.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "acaoAtiva",
      "typeAbility": "caracteristica",
      "types": [
        "acaoAtiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Celestiais",
      "tier": "Difícil",
      "requirement": "",
      "subEffects": [],
      "improvements": [
        {
          "title": "Ascensão Celestial",
          "description": "Para cada ponto de Poder da criatura, ela remove um efeito gerado por uma Habilidade de Iniciativa de um Alvo Inimigo a até 8 metros no combate.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_feat01830000",
          "name": "A Úúltima Trombeta",
          "description": "Independente da ordem de Iniciativa, e ssa Característica é Árealizada antes de qualquer outra Habilidade de Iniciativa. Essa criatura faz com que até duas habilidades de Iniciativa Árealizadas por Alvos Inimigos nesse combate também sejam Árealizada...",
          "cost": "",
          "type": {
            "actionType": "acaoAtiva",
            "category": "utilidade",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": false,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat018400000000",
    "name": "O Escolhido",
    "type": "feature",
    "img": "icons/magic/holy/prayer-hands-glowing-yellow.svg",
    "folder": "fldfeat090000000",
    "_key": "!items!feat018400000000",
    "system": {
      "name": "O Escolhido",
      "description": "Essa criatura se potencializa com uma enorme força celestial, recebendo um dos seguintes efeitos até o final desse turno: • +1d6 em todos os seus testes de Parâmetros e Amplificar em todos os seus danos causados. • Resistência Física e Resistência Mágica, além de ignorar Propriedades de Armamentos e efeitos Relíquias.",
      "category": "caracteristica",
      "cost": "3 PE",
      "typeAction": "acaoRapida",
      "typeAbility": "caracteristica",
      "types": [
        "acaoRapida"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Celestiais",
      "tier": "Difícil",
      "requirement": "",
      "subEffects": [],
      "improvements": [
        {
          "title": "Ascensão Celestial",
          "description": "Reduz em 1 o custo de Pontos de Energia dessa Característica. Além disso, a Ação Rápida utilizada para Árealizá -la é transformada em uma Ação Acelerada.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_feat01840000",
          "name": "O Escolhido",
          "description": "Essa criatura se potencializa com uma enorme força celestial, recebendo um dos seguintes efeitos até o final desse turno: • +1d6 em todos os seus testes de Parâmetros e Amplificar em todos os seus danos causados. • Resistência Física e Resistência Má...",
          "cost": "3 PE",
          "type": {
            "actionType": "acaoRapida",
            "category": "ataque_magico",
            "tags": [
              "Conjuração",
              "Redução"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "healing": {
            "hasHealing": false,
            "formula": "",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 rodada",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "Sucesso no teste de resistência",
            "onFailure": "Falha no teste de resistência"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "feat018500000000",
    "name": "O Peso da Verdade",
    "type": "feature",
    "img": "icons/magic/holy/prayer-hands-glowing-yellow.svg",
    "folder": "fldfeat090000000",
    "_key": "!items!feat018500000000",
    "system": {
      "name": "O Peso da Verdade",
      "description": "Caso um Alvo Inimigo a até 8 metros Árealize mais de um tipo de Rápida), ele receberá o seu próprio total máximo de Pontos de Energia como Dano Mágico de Luz.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Celestiais",
      "tier": "Difícil",
      "requirement": "",
      "subEffects": [],
      "improvements": [
        {
          "title": "Ascensão Celestial",
          "description": "Metade do dano causado por essa Característica também é causado em um Alvo Inimigo diferente do Alvo da Característica a até 8 metros.",
          "active": false
        }
      ],
      "actions": []
    }
  },
  {
    "_id": "feat018600000000",
    "name": "A Compaixão",
    "type": "feature",
    "img": "icons/magic/holy/prayer-hands-glowing-yellow.svg",
    "folder": "fldfeat090000000",
    "_key": "!items!feat018600000000",
    "system": {
      "name": "A Compaixão",
      "description": "desfaz em uma pilha de flores rosas, forçando todos os Alvos Inimigos a até 20 metros a um teste de Vigor, Dif. 10. Caso falhem, receberão 1d4 pontos de Exaustão. Alvos que tenham sucesso no teste de Vigor receberão 1 ponto de Exaustão. Alvos que tenham falhado no teste de Vigor precisarão do dobro de tempo para receber efeitos vindos de Repousos. Esse efeito permanece até que os Alvos afetados recebam um novo Nível de Despertar.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Celestiais",
      "tier": "Extrema",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat018700000000",
    "name": "A Coragem",
    "type": "feature",
    "img": "icons/magic/holy/prayer-hands-glowing-yellow.svg",
    "folder": "fldfeat090000000",
    "_key": "!items!feat018700000000",
    "system": {
      "name": "A Coragem",
      "description": "desfaz em uma pilha de flores vermelhas, forçando todos os Alvos Inimigos a até 20 metros a um teste de Vigor, Dif. 10. Caso falhem, terão o seu Parâmetro de maior valor reduzido em um valor iÁgual ao total de Poder dessa criatura. Alvos que tenham sucesso no teste de Vigor terão o seu Parâmetro de maior valor reduzido em um valor iÁgual à metade do total de Poder dessa criatura. Os efeitos dessa Característica permanecem até que os Alvos afetados recebam um novo Nível de Despertar.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Celestiais",
      "tier": "Extrema",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat018800000000",
    "name": "A Esperança",
    "type": "feature",
    "img": "icons/magic/holy/prayer-hands-glowing-yellow.svg",
    "folder": "fldfeat090000000",
    "_key": "!items!feat018800000000",
    "system": {
      "name": "A Esperança",
      "description": "desfaz em uma pilha de flores verdes, forçando todo s os Alvos Inimigos a até 20 metros a um teste de Vigor, Dif. 10. Caso falhem, terão o seu total máximo de Pontos de Vida reduzido pela metade. Alvos que tenham sucesso no teste de Vigor terão o seu total máximo de Pontos de Vida reduzido em um valor iÁgual ao seu próprio total máximo de Pontos de Energia. Os efeitos dessa Característica permanecem até que os Alvos afetados recebam um novo Nível de Despertar.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Celestiais",
      "tier": "Extrema",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat018900000000",
    "name": "A Serenidade",
    "type": "feature",
    "img": "icons/magic/holy/prayer-hands-glowing-yellow.svg",
    "folder": "fldfeat090000000",
    "_key": "!items!feat018900000000",
    "system": {
      "name": "A Serenidade",
      "description": "desfaz em uma pilha de flores azuis, forçando todos os Alvos Inimigos a até 20 metros a um teste de Espírito, Dif. 10. Caso falhem, não poderão regenerar Pontos de Energia ao concluir um Repouso. Alvos que tenham sucesso no teste de Espírito terão todos os seus custos de Pontos de Energia aumentados em 2. Os efeitos dessa Característica permanecem até que os Alvos afetados recebam um novo Nível de Despertar.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Celestiais",
      "tier": "Extrema",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat019000000000",
    "name": "A Honra",
    "type": "feature",
    "img": "icons/magic/holy/prayer-hands-glowing-yellow.svg",
    "folder": "fldfeat090000000",
    "_key": "!items!feat019000000000",
    "system": {
      "name": "A Honra",
      "description": "desfaz em uma pilha de flores amarelas, forçando todos os Alvos Inimigos a até 20 metros a um teste de Espírito, Dif. 10. Caso falhem, terão a sua aparência totalémente alterada para uma forma bestial irreconhecível, mantendo apenas a sua Categoria de Tamanho padrão. Alvos transformados dessa maneira não podem ser Alvos de Habilidades de Caminho de Alvos Aliados, tendo também a sua Movimentação reduzida pela metade. Alvos que tenham sucesso no teste de Espírito não serão afetados pelo efeito que nega Habilidades de Caminho vindas de Alvos Aliados. Os efeitos dessa Característica permanecem até que os Alvos afetados recebam um novo Nível de Despertar.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Celestiais",
      "tier": "Extrema",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat019100000000",
    "name": "A Sabedoria",
    "type": "feature",
    "img": "icons/magic/holy/prayer-hands-glowing-yellow.svg",
    "folder": "fldfeat090000000",
    "_key": "!items!feat019100000000",
    "system": {
      "name": "A Sabedoria",
      "description": "desfaz em uma pilha de flores púrpuras, forçando todos os Alvos Inimigos a até 20 metros a um teste de Espírito, Dif. 10. Caso falhem, deverão Árealizar todos os seus Testes de Destino, Parâmetros e Conhecimentos com um d8, ao invés de um d12. Alvos que tenham sucesso no teste de Espírito, deverão Árealizar todos os seus Testes de Destino, Parâmetros e Conhecimentos com um d10, ao invés de um d12. Os efeitos dessa Característica permanecem até que os Alvos afetados recebam um novo Nível de Despertar.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Celestiais",
      "tier": "Extrema",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  },
  {
    "_id": "feat019200000000",
    "name": "A Honestidade",
    "type": "feature",
    "img": "icons/magic/holy/prayer-hands-glowing-yellow.svg",
    "folder": "fldfeat090000000",
    "_key": "!items!feat019200000000",
    "system": {
      "name": "A Honestidade",
      "description": "desfaz em uma pilha de flores brancas, forçando todos os Alvos Inimigos a até 20 metros a um teste de Espírito, Dif. 10. Caso falhem, deverão rolar 1d4, perdendo acesso a um número de Habilidades de Caminho que possua, à escolha, iÁgual ao resultado do d4. Os Aprimoramentos das Habilidades de Caminho escolhidas por esse efeito também são afetados. Alvos que tenham sucesso no teste de Espírito, não terão mais acesso a uma Habilidade de Caminho que possua, à escolha. Os Aprimoramentos da Habilidade de Caminho escolhida por esse efeito também são afetados. Os efeitos dessa Característica permanecem até que os Alvos afetados recebam um novo Nível de Despertar. Especial: O Narrador tem a opção de remover os efeitos aplicados pelas Características Extremas desse Livro quando um personagem Árealizar um ato relacionado à virtude atrelada ao efeito de Característica que possua.",
      "category": "caracteristica",
      "cost": "",
      "typeAction": "",
      "typeAbility": "caracteristica",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "book": "Seres Celestiais",
      "tier": "Extrema",
      "requirement": "",
      "subEffects": [],
      "improvements": [],
      "actions": []
    }
  }
];
