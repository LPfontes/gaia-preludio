// Catálogo Oficial dos 5 Caminhos canônicos do sistema Gaia: Prelúdio
// Contém todas as 49 Habilidades de Caminho com identificadores únicos, descrições,
// sub-efeitos, aprimoramentos e seus respectivos caminhos integrados para compêndios do Foundry VTT.

export const HABILIDADES_CAMINHO_FOLDERS_DATA = [
  {
    "_id": "fldhc00010000000",
    "name": "Andarilho",
    "type": "Item",
    "sorting": "a",
    "color": "#020599",
    "_key": "!folders!fldhc00010000000"
  },
  {
    "_id": "fldhc00020000000",
    "name": "Combatente",
    "type": "Item",
    "sorting": "a",
    "color": "#020599",
    "_key": "!folders!fldhc00020000000"
  },
  {
    "_id": "fldhc00030000000",
    "name": "Devoto",
    "type": "Item",
    "sorting": "a",
    "color": "#020599",
    "_key": "!folders!fldhc00030000000"
  },
  {
    "_id": "fldhc00040000000",
    "name": "Feiticeiro",
    "type": "Item",
    "sorting": "a",
    "color": "#020599",
    "_key": "!folders!fldhc00040000000"
  },
  {
    "_id": "fldhc00050000000",
    "name": "Ladino",
    "type": "Item",
    "sorting": "a",
    "color": "#020599",
    "_key": "!folders!fldhc00050000000"
  }
];

export const FEITICOS_ARCANOS_DATA = [
  {
    "_id": "spell00010000000",
    "name": "Absorver Idioma",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/feiticos/Absorver Idioma.png",
    "system": {
      "name": "Absorver Idioma",
      "category": "feitico_arcano",
      "cost": "1 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "feitico",
      "types": [
        "conjuracao",
        "foco"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "10 Minutos",
      "level": 1,
      "pathId": "",
      "description": "Você desenha um símbolo no ar, realizando um Feitiço Arcano.\nVocê passa a ser fluente em um Idioma sendo falado por um Alvo a até 6 metros de você, por 10 minutos.",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_absorver_idioma",
          "name": "Absorver Idioma",
          "description": "Passa a ser fluente no idioma falado por um Alvo a até 6 metros por 10 minutos.",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "conjuracao",
            "tags": [
              "conjuracao",
              "foco"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 6,
            "unit": "m",
            "targetLimit": "1"
          }
        }
      ]
    },
    "_key": "!items!spell00010000000"
  },
  {
    "_id": "spell00020000000",
    "name": "Alteração Física",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/feiticos/Alteração Física.png",
    "system": {
      "name": "Alteração Física",
      "category": "feitico_arcano",
      "cost": "1 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "feitico",
      "types": [
        "conjuracao",
        "foco"
      ],
      "quote": "",
      "numberTarget": "Pessoal",
      "range": "Pessoal",
      "duration": "10 Minutos",
      "level": 1,
      "pathId": "",
      "description": "Você desenha um símbolo no ar, realizando um Feitiço Arcano.\nVocê cria uma ilusão sobre você, alterando a sua aparência. Você pode escolher a aparência de outro Legado, desde que respeite a altura máxima do Legado transformado. Você não adquire novas Habilidades de Legado dessa forma.\nAs suas vestes se adaptam à alteração corporal realizada pela ilusão dessa habilidade.\nEsse efeito permanece por 10 minutos.",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_alteracao_fisica",
          "name": "Alteração Física",
          "description": "Cria uma ilusão alterando aparência física e vestes por 10 minutos (pode assumir aparência de outro Legado respeitando a altura máxima).",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "conjuracao",
            "tags": [
              "conjuracao",
              "foco"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 0,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    },
    "_key": "!items!spell00020000000"
  },
  {
    "_id": "spell00030000000",
    "name": "Banquete Místico",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/feiticos/Banquete Místico.png",
    "system": {
      "name": "Banquete Místico",
      "category": "feitico_arcano",
      "cost": "1 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "feitico",
      "types": [
        "conjuracao"
      ],
      "quote": "",
      "numberTarget": "1 Punhado de plantas",
      "range": "Toque",
      "duration": "1 Minuto (frutas) / 4 Horas (saciedade)",
      "level": 1,
      "pathId": "",
      "description": "Você desenha um símbolo no ar, realizando um Feitiço Arcano.\nVocê toca um punhado de plantas, transformando-as em 1d12 frutas aleatórias encontradas por Auroria.\nEssas frutas possuem propriedades do Véu, fazendo com que, ao comer, um Alvo se satisfaça e não precise se alimentar por 4 horas. Esse efeito não acumula.\nCaso não sejam consumidas dentro de 1 minuto, as frutas se desfazem misticamente.",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_banquete_mistico",
          "name": "Banquete Místico",
          "description": "Transforma plantas em 1d12 frutas aleatórias. Quem consumir uma fruta se sacia por 4 horas. Frutas duram 1 minuto se não comidas.",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "conjuracao",
            "tags": [
              "conjuracao"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "1d12",
            "type": "nature",
            "criticalBonus": "",
            "scaling": "Quantidade de frutas geradas"
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 0,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    },
    "_key": "!items!spell00030000000"
  },
  {
    "_id": "spell00040000000",
    "name": "Esvanecer O Véu",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/feiticos/Esvanecer O Véu.png",
    "system": {
      "name": "Esvanecer O Véu",
      "category": "feitico_arcano",
      "cost": "1 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "feitico",
      "types": [
        "conjuracao"
      ],
      "quote": "",
      "numberTarget": "Todos na área",
      "range": "5 metros",
      "duration": "Instantânea",
      "level": 1,
      "pathId": "",
      "description": "Você desenha um símbolo no ar, realizando um Feitiço Arcano.\nA partir de você, toda ilusão, alteração física e invisibilidade a até 5 metros é desfeita.",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_esvanecer_veu",
          "name": "Esvanecer o Véu",
          "description": "Desfaz toda ilusão, alteração física e invisibilidade em um raio de até 5 metros a partir de você.",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "conjuracao",
            "tags": [
              "conjuracao"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 5,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    },
    "_key": "!items!spell00040000000"
  },
  {
    "_id": "spell00050000000",
    "name": "Divinação",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/feiticos/Divinação.png",
    "system": {
      "name": "Divinação",
      "category": "feitico_arcano",
      "cost": "1 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "feitico",
      "types": [
        "conjuracao",
        "foco"
      ],
      "quote": "",
      "numberTarget": "1 Local visitado",
      "range": "Pessoal",
      "duration": "10 Minutos",
      "level": 1,
      "pathId": "",
      "description": "Você desenha um símbolo no ar, realizando um Feitiço Arcano.\nVocê se liga às linhas do Véu, podendo observar um pequeno local que você já tenha visitado (um quarto, sala, saguão, por exemplo) por até 10 minutos.",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_divinacao",
          "name": "Divinação",
          "description": "Liga-se às linhas do Véu para observar um pequeno local já visitado por até 10 minutos.",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "conjuracao",
            "tags": [
              "conjuracao",
              "foco"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 0,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    },
    "_key": "!items!spell00050000000"
  },
  {
    "_id": "spell00060000000",
    "name": "Evocar Névoa",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/feiticos/Evocar Névoa.png",
    "system": {
      "name": "Evocar Névoa",
      "category": "feitico_arcano",
      "cost": "1 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "feitico",
      "types": [
        "conjuracao",
        "foco"
      ],
      "quote": "",
      "numberTarget": "Área (Raio de 2m)",
      "range": "6 metros",
      "duration": "10 Minutos",
      "level": 1,
      "pathId": "",
      "description": "Você desenha um símbolo no ar, realizando um Feitiço Arcano.\nVocê canaliza, em um ponto a até 6 metros, uma névoa mística, que envolve todo ambiente ao seu redor a até 2 metros, por 10 minutos. Alvos dentro do alcance dessa névoa são afetados por Escuridão.",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_evocar_nevoa",
          "name": "Evocar Névoa",
          "description": "Canaliza em até 6m uma névoa mística em raio de 2m por 10 minutos. Alvos dentro são afetados por Escuridão.",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "conjuracao",
            "tags": [
              "conjuracao",
              "foco"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": true,
            "status": "Escuridão",
            "duration": "10 Minutos",
            "description": "Alvos dentro da névoa são afetados por Escuridão."
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 2,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    },
    "_key": "!items!spell00060000000"
  },
  {
    "_id": "spell00070000000",
    "name": "Familiar",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/feiticos/Familiar.png",
    "system": {
      "name": "Familiar",
      "category": "feitico_arcano",
      "cost": "1 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "feitico",
      "types": [
        "conjuracao",
        "foco"
      ],
      "quote": "",
      "numberTarget": "1 Criatura",
      "range": "Ao seu lado",
      "duration": "Até o próximo Repouso",
      "level": 1,
      "pathId": "",
      "description": "Você desenha um símbolo no ar, realizando um Feitiço Arcano.\nVocê convoca ao seu lado uma criatura mística (de aparência à sua escolha), de Categoria de Tamanho Pequeno, da fauna de Auroria, que permanecerá com você até o seu próximo Repouso. Essa criatura não é considerada uma criatura do Homuncularium.\nEsse Familiar é racional, podendo agir livremente, caso necessário, mas sempre seguirá as suas ordens. O seu Familiar possui todos os Idiomas que você possui.\nCom uma Ação Simples, você poderá entrar em contato com o Véu do seu Familiar, podendo ouvir, falar e enxergar pelo seu Familiar por 1 minuto, independente da distância, podendo encerrar esse efeito a qualquer momento.\nEnquanto conectado dessa forma, você não poderá realizar nenhum tipo de Ação e Movimentação, perdendo também todos os seus sentidos.\n\nFAMILIAR\nPV: 10\nMovimentação: 6 Metros\nAo convocar o seu Familiar, você pode atribuir uma das Características abaixo à criatura:\n• Anfíbio\n• Sentidos Aprimorados\n• Voar\n\nCaso o Familiar chegue a zero, ou menos, Pontos de Vida, ele será desconvocado. Você pode desconvocar o seu Familiar a qualquer momento, sem custo de Ação.",
      "subEffects": [
        {
          "name": "Conectar ao Familiar",
          "cost": "",
          "typeAction": "acaoSimples",
          "typeAbility": "foco",
          "description": "Com uma Ação Simples, você entra em contato com o Véu do seu Familiar, podendo ouvir, falar e enxergar através dele por 1 minuto, independente da distância. Enquanto conectado, você não pode realizar ações ou movimentação e perde todos os seus próprios sentidos.",
          "note": "",
          "actions": []
        }
      ],
      "improvements": [],
      "actions": [
        {
          "id": "act_convocar_familiar",
          "name": "Convocar Familiar",
          "description": "Convoca ao seu lado uma criatura Pequena (PV 10, Movimentação 6m) com Anfíbio, Sentidos Aprimorados ou Voar até o próximo Repouso.",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "conjuracao",
            "tags": [
              "conjuracao",
              "foco"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 0,
            "unit": "m",
            "targetLimit": ""
          }
        },
        {
          "id": "act_conectar_familiar",
          "name": "Conectar aos Sentidos do Familiar",
          "description": "Ação Simples para ver, ouvir e falar através do familiar por 1 minuto. Seu corpo perde sentidos e não pode agir.",
          "cost": "",
          "type": {
            "actionType": "acaoSimples",
            "category": "suporte",
            "tags": [
              "foco"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 0,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    },
    "_key": "!items!spell00070000000"
  },
  {
    "_id": "spell00080000000",
    "name": "Ilusão Menor",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/feiticos/Ilusão Menor.png",
    "system": {
      "name": "Ilusão Menor",
      "category": "feitico_arcano",
      "cost": "1 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "feitico",
      "types": [
        "conjuracao",
        "foco"
      ],
      "quote": "",
      "numberTarget": "1 Efeito / Objeto / Símbolo",
      "range": "6 metros",
      "duration": "10 Minutos",
      "level": 1,
      "pathId": "",
      "description": "Você desenha um símbolo no ar, realizando um Feitiço Arcano.\nVocê cria uma das pequenas ilusões a seguir, que permanece por 10 minutos:\n• Um efeito sensorial em um local a até 6 metros, que produzirá sons ou odores à sua escolha.\n• Um objeto inofensivo que caiba na palma de sua mão.\n• Um pequeno símbolo em um objeto ou superfície a até 6 metros.",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_ilusao_menor",
          "name": "Ilusão Menor",
          "description": "Cria efeito sensorial (som/odor), objeto inofensivo que cabe na mão, ou símbolo em objeto/superfície por 10 minutos a até 6m.",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "conjuracao",
            "tags": [
              "conjuracao",
              "foco"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 6,
            "unit": "m",
            "targetLimit": "1"
          }
        }
      ]
    },
    "_key": "!items!spell00080000000"
  },
  {
    "_id": "spell00090000000",
    "name": "Leveza",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/feiticos/Leveza.png",
    "system": {
      "name": "Leveza",
      "category": "feitico_arcano",
      "cost": "1 PE",
      "typeAction": "acaoRapida",
      "typeAbility": "feitico",
      "types": [
        "conjuracao",
        "foco"
      ],
      "quote": "",
      "numberTarget": "Canalização + 1",
      "range": "6 metros",
      "duration": "1 Minuto",
      "level": 1,
      "pathId": "",
      "description": "Você desenha um símbolo no ar, realizando um Feitiço Arcano.\nVocê faz com que um total de Alvos igual ao seu total de pontos de Canalização + 1 a até 6 metros sejam afetados pela leveza do Véu, fazendo com que, por 1 minuto, esses Alvos não possam receber danos e Fraturas vindos de Quedas.",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_leveza",
          "name": "Leveza",
          "description": "Alvos a até 6 metros (Canalização + 1) não podem receber danos nem Fraturas por Quedas durante 1 minuto.",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoRapida",
            "category": "conjuracao",
            "tags": [
              "conjuracao",
              "foco"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 Minuto",
            "description": "Imunidade a dano e Fraturas decorrentes de queda."
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 6,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    },
    "_key": "!items!spell00090000000"
  },
  {
    "_id": "spell00100000000",
    "name": "Levitar",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/feiticos/Levitar.png",
    "system": {
      "name": "Levitar",
      "category": "feitico_arcano",
      "cost": "1 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "feitico",
      "types": [
        "conjuracao",
        "foco"
      ],
      "quote": "",
      "numberTarget": "Canalização + 1",
      "range": "6 metros",
      "duration": "10 Minutos",
      "level": 1,
      "pathId": "",
      "description": "Você desenha um símbolo no ar, realizando um Feitiço Arcano.\nVocê faz com que um total de Alvos igual ao seu total de pontos de Canalização + 1 a até 6 metros comecem a levitar a uma altura de 30 centímetros da superfície atual, podendo utilizar a sua Movimentação enquanto levitando, ignorando também locais com Terreno Difícil.\nEsse efeito permanece por 10 minutos.",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_levitar",
          "name": "Levitar",
          "description": "Alvos a até 6m (Canalização + 1) levitam 30cm do chão por 10 minutos, podendo mover-se normalmente e ignorando Terreno Difícil.",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "conjuracao",
            "tags": [
              "conjuracao",
              "foco"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "10 Minutos",
            "description": "Levitação a 30cm; ignora Terreno Difícil."
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 6,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    },
    "_key": "!items!spell00100000000"
  },
  {
    "_id": "spell00110000000",
    "name": "Marca Mística",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/feiticos/Marca Mística.png",
    "system": {
      "name": "Marca Mística",
      "category": "feitico_arcano",
      "cost": "1 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "feitico",
      "types": [
        "conjuracao"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "10 Minutos",
      "level": 1,
      "pathId": "",
      "description": "Você desenha um símbolo no ar, realizando um Feitiço Arcano.\nVocê marca misticamente um Alvo a até 6 metros, fazendo com que você possa identificar a localização exata desse Alvo em um raio de 100 metros, por 10 minutos.",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_marca_mistica",
          "name": "Marca Mística",
          "description": "Marca um Alvo a até 6 metros. Identifica sua localização exata em um raio de até 100 metros por 10 minutos.",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "conjuracao",
            "tags": [
              "conjuracao"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "10 Minutos",
            "description": "Localização identificável em até 100m."
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 6,
            "unit": "m",
            "targetLimit": "1"
          }
        }
      ]
    },
    "_key": "!items!spell00110000000"
  },
  {
    "_id": "spell00120000000",
    "name": "Moldar",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/feiticos/Moldar.png",
    "system": {
      "name": "Moldar",
      "category": "feitico_arcano",
      "cost": "1 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "feitico",
      "types": [
        "conjuracao",
        "foco"
      ],
      "quote": "",
      "numberTarget": "1 Objeto mundano",
      "range": "Toque",
      "duration": "Enquanto tocar / Permanente (reparo)",
      "level": 1,
      "pathId": "",
      "description": "Você desenha um símbolo no ar, realizando um Feitiço Arcano.\nEnquanto você estiver tocando um objeto mundano de até 1 metro de altura e largura, você poderá modificar a forma física desse objeto. Ao parar de tocar esse objeto, ele retornará à sua forma original.\nVocê também pode utilizar essa habilidade para reparar um pequeno objeto mundano, desde que a parte danificada não seja maior que 30 centímetros. Esse efeito de reparo é permanente.",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_moldar",
          "name": "Moldar",
          "description": "Modifica forma de objeto mundano de até 1m enquanto tocá-lo (retorna ao soltar), ou repara permanentemente dano de até 30cm.",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "conjuracao",
            "tags": [
              "conjuracao",
              "foco"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 0,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    },
    "_key": "!items!spell00120000000"
  },
  {
    "_id": "spell00130000000",
    "name": "Orbe De Luz",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/feiticos/Orbe De Luz.png",
    "system": {
      "name": "Orbe De Luz",
      "category": "feitico_arcano",
      "cost": "1 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "feitico",
      "types": [
        "conjuracao"
      ],
      "quote": "",
      "numberTarget": "Área (Raio de 3m ao redor do orbe)",
      "range": "1 metro",
      "duration": "10 Minutos",
      "level": 1,
      "pathId": "",
      "description": "Você desenha um símbolo no ar, realizando um Feitiço Arcano.\nVocê invoca um orbe de luz mística, que permanece a 1 metro de você, por 10 minutos.\nTodo ambiente com Penumbra, Escuridão e Escuridão Mística a até 3 metros deste orbe é iluminado, tendo os seus efeitos removidos enquanto estiver dentro do alcance desse orbe.\nVocê pode manter um único orbe de luz por vez.",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_orbe_de_luz",
          "name": "Orbe de Luz",
          "description": "Invoca orbe a 1m de você por 10 minutos. Ilumina e remove Penumbra, Escuridão e Escuridão Mística em um raio de até 3 metros (máximo 1 orbe ativo).",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "conjuracao",
            "tags": [
              "conjuracao"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "10 Minutos",
            "description": "Dissipa Penumbra, Escuridão e Escuridão Mística em 3m."
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
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
    },
    "_key": "!items!spell00130000000"
  },
  {
    "_id": "spell00140000000",
    "name": "Sentido Arcano",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/feiticos/Sentido Arcano.png",
    "system": {
      "name": "Sentido Arcano",
      "category": "feitico_arcano",
      "cost": "1 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "feitico",
      "types": [
        "conjuracao",
        "foco"
      ],
      "quote": "",
      "numberTarget": "1 Ponto em superfície",
      "range": "1 metro (Sensor: 10 metros)",
      "duration": "Foco ativo",
      "level": 1,
      "pathId": "",
      "description": "Você desenha um símbolo no ar, realizando um Feitiço Arcano.\nEscolha um ponto em uma superfície a até 1 metro:\nEnquanto estiver com esse Foco ativo, caso um Alvo se aproximar a até 10 metros do ponto escolhido nessa habilidade, você sentirá uma perturbação mística, sabendo que algo se aproximou do ponto.",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_sentido_arcano",
          "name": "Sentido Arcano",
          "description": "Vincula um ponto a até 1m. Enquanto o Foco estiver ativo, você sente quando qualquer Alvo se aproximar a até 10 metros dele.",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "conjuracao",
            "tags": [
              "conjuracao",
              "foco"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 10,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    },
    "_key": "!items!spell00140000000"
  },
  {
    "_id": "spell00150000000",
    "name": "Telecinese",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/feiticos/Telecinese.png",
    "system": {
      "name": "Telecinese",
      "category": "feitico_arcano",
      "cost": "1 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "feitico",
      "types": [
        "conjuracao"
      ],
      "quote": "",
      "numberTarget": "1 Objeto / Porta / Recipiente",
      "range": "6 metros",
      "duration": "Instantânea",
      "level": 1,
      "pathId": "",
      "description": "Você desenha um símbolo no ar, realizando um Feitiço Arcano.\nVocê realiza um dos seguintes efeitos, a até 6 metros:\n• Levitar e mover um objeto de até 20 kg, que esteja a até 6 metros, para um novo local a 6 metros.\n• Abrir ou fechar uma porta, janela ou recipiente destrancado.",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_telecinese",
          "name": "Telecinese",
          "description": "A até 6m: levita e move objeto de até 20 kg para um local a até 6m, ou abre/fecha porta, janela ou recipiente destrancado.",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "conjuracao",
            "tags": [
              "conjuracao"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 6,
            "unit": "m",
            "targetLimit": "1"
          }
        }
      ]
    },
    "_key": "!items!spell00150000000"
  },
  {
    "_id": "spell00160000000",
    "name": "Telepatia",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/feiticos/Telepatia.png",
    "system": {
      "name": "Telepatia",
      "category": "feitico_arcano",
      "cost": "1 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "feitico",
      "types": [
        "conjuracao"
      ],
      "quote": "",
      "numberTarget": "Canalização + 1",
      "range": "4 metros (máx. 8 metros)",
      "duration": "1 Minuto",
      "level": 1,
      "pathId": "",
      "description": "Você desenha um símbolo no ar, realizando um Feitiço Arcano.\nVocê faz com que um total de Alvos igual ao seu total de pontos de Canalização + 1 a até 4 metros possam se comunicar mentalmente uns com os outros, sem consumir qualquer tipo de ação. Caso você se afaste mais de 8 metros de um Alvo dessa habilidade, o efeito será removido desse Alvo.\nEsse efeito permanece por 1 minuto.",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_telepatia",
          "name": "Telepatia",
          "description": "Conecta mentalmente Canalização + 1 alvos a até 4m por 1 minuto sem consumir ação (desfaz se afastar mais de 8m).",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "conjuracao",
            "tags": [
              "conjuracao"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "1 Minuto",
            "description": "Comunicação mental sem custo de ação."
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 4,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    },
    "_key": "!items!spell00160000000"
  },
  {
    "_id": "spell00170000000",
    "name": "Truque Místico",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/feiticos/Truque Místico.png",
    "system": {
      "name": "Truque Místico",
      "category": "feitico_arcano",
      "cost": "1 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "feitico",
      "types": [
        "conjuracao"
      ],
      "quote": "",
      "numberTarget": "1 Alvo / Objeto / Pessoal",
      "range": "6 metros / Pessoal",
      "duration": "Variada (Instantânea a 10 Minutos)",
      "level": 1,
      "pathId": "",
      "description": "Você desenha um símbolo no ar, realizando um Feitiço Arcano.\nVocê realiza um dos seguintes efeitos:\n• Abrir ou fechar uma tranca ou recipiente destrancado a até 6 metros.\n• Acender ou apagar uma tocha, vela ou fogueira a até 6 metros.\n• Modificar a sua voz, ou até mesmo fazer com que ela ressoe até 6 metros de você. Este efeito permanece por 1 minuto.\n• Alterar a cor dos seus olhos ou cabelos. Esse efeito permanece por 10 minutos.",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_truque_mistico",
          "name": "Truque Místico",
          "description": "Abre/fecha tranca ou recipiente (6m), acende/apaga fogo (6m), modifica voz por 1 min (6m), ou altera cor de olhos/cabelo por 10 min.",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "conjuracao",
            "tags": [
              "conjuracao"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 6,
            "unit": "m",
            "targetLimit": "1"
          }
        }
      ]
    },
    "_key": "!items!spell00170000000"
  },
  {
    "_id": "spell00180000000",
    "name": "Visão Verdadeira",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/feiticos/Visão Verdadeira.png",
    "system": {
      "name": "Visão Verdadeira",
      "category": "feitico_arcano",
      "cost": "1 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "feitico",
      "types": [
        "conjuracao",
        "foco"
      ],
      "quote": "",
      "numberTarget": "Pessoal",
      "range": "Pessoal",
      "duration": "10 Minutos",
      "level": 1,
      "pathId": "",
      "description": "Você desenha um símbolo no ar, realizando um Feitiço Arcano.\nVocê passa a enxergar, por 10 minutos, todo Alvo Invisível, transformado ou ilusão, enxergando a sua forma original.",
      "subEffects": [],
      "improvements": [],
      "actions": [
        {
          "id": "act_visao_verdadeira",
          "name": "Visão Verdadeira",
          "description": "Enxerga todo Alvo Invisível, transformado ou ilusão em sua forma original por 10 minutos.",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "conjuracao",
            "tags": [
              "conjuracao",
              "foco"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "10 Minutos",
            "description": "Enxerga invisíveis, transformados e ilusões na forma original."
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 0,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    },
    "_key": "!items!spell00180000000"
  }
];

export const HABILIDADES_CAMINHO_DATA = [
  {
    "_id": "ab00010000000000",
    "name": "Companheiro Feral",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Companheiro Feral.png",
    "folder": "fldhc00010000000",
    "_key": "!items!ab00010000000000",
    "system": {
      "name": "Companheiro Feral",
      "category": "ofensiva",
      "cost": "",
      "typeAction": "",
      "typeAbility": "habilidade",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "pathId": "andarilho",
      "description": "Você desperta o potencial de se conectar com criaturas de Auroria.\nAo adquirir essa habilidade, você aprende a domar criaturas, podendo possuir uma Criatura Aliada, isto é, um Alvo Aliado que lutará por você e por seus aliados. Você pode possuir apenas uma Criatura Aliada por vez.\nCaso você que já possua uma Criatura Aliada e queira domar outra criatura, a Criatura Aliada anterior perderá todos os seus efeitos de Criatura Aliada, não podendo ser domada novamente.\nVocê também possui as seguintes técnicas:",
      "subEffects": [
        {
          "name": "Domar Criatura",
          "cost": "",
          "typeAction": "acaoSimples",
          "typeAbility": "passiva",
          "description": "Essa técnica só funciona contra criaturas às quais você não tenha causado danos e que possuam um Nível de Criatura igual, ou menor que o seu Nível de Despertar. Somente criaturas de Dificuldade Fácil e que possuam, pelo menos, uma Característica do Livro dos Seres Ferais podem ser afetadas por essa técnica.\nVocê e uma criatura a até 2 metros realizam um Teste de Destino. Caso ambos os resultados sejam pares, ou ímpares, você domará a criatura, tornando-a sua Criatura Aliada.",
          "note": "",
          "actions": []
        },
        {
          "name": "Ataque Sincronizado",
          "cost": "",
          "typeAction": "",
          "typeAbility": "passiva",
          "description": "Sempre que você realizar um Ataque Físico ou um Ataque Mágico contra um Alvo e o seu Resultado Natural (Precisão ou Canalização) seja 10, ou mais, o próximo Golpe Brutal ou Evocação Mística da sua Criatura Aliada nesse mesmo Alvo durante esse turno possuirá Aptidão.",
          "note": "",
          "actions": []
        },
        {
          "name": "Regra Especial de Criatura Aliada",
          "cost": "",
          "typeAction": "",
          "typeAbility": "passiva",
          "description": "A Criatura Aliada não pode realizar Características de Iniciativa, mas possui um turno completo durante o seu turno, podendo utilizar sua Ação Ativa, Ação Simples, Ação Rápida e Movimentação.\nCaso você fique Incapacitado, a Criatura Aliada não poderá realizar nenhum tipo de Ação ou Movimentação até você ficar com, pelo menos, 1 Ponto de Vida.\nA Criatura Aliada passa a possuir as mesmas regras de morte de um personagem, ficando Incapacitada caso chegue a zero, ou menos, Pontos de Vida, recebendo pontos de Exaustão e Pontos de Vida Negativos. Ela também é afetada pela regra do Dado de Morte, enquanto Incapacitada.",
          "note": "",
          "actions": []
        },
        {
          "name": "Evoluindo Uma Criatura Aliada",
          "cost": "",
          "typeAction": "",
          "typeAbility": "passiva",
          "description": "Sempre que você adquirir Níveis de Despertar, a sua Criatura Aliada também evoluirá com o padrão de evolução do Homuncularium (NÍVEIS DE CRIATURA E VALORES ADICIONAIS).",
          "note": "",
          "actions": []
        },
        {
          "name": "Personagem Nível 1",
          "cost": "",
          "typeAction": "",
          "typeAbility": "passiva",
          "description": "Caso esta habilidade seja adquirida no momento da criação do seu personagem, você poderá moldar a sua Criatura Aliada (Fácil) junto com o seu Narrador.",
          "note": "",
          "actions": []
        }
      ],
      "improvements": [
        {
          "title": "A) Sincronia Selvagem",
          "description": "O Ataque Sincronizado passa a ser realizado caso o Resultado Natural (Precisão ou Canalização) seja 8, ou mais.",
          "active": false
        },
        {
          "title": "B) Fortalecer Companheiro",
          "description": "Aumente em 1 a Categoria de Dado do dano causado pelo Golpe Brutal e a Evocação Mística da sua Criatura Aliada.",
          "active": false
        }
      ],
      "actions": []
    }
  },
  {
    "_id": "ab00030000000000",
    "name": "Descendente Dos Filhos Da Floresta",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Descendente Dos Filhos Da Floresta.png",
    "folder": "fldhc00010000000",
    "_key": "!items!ab00030000000000",
    "system": {
      "name": "Descendente Dos Filhos Da Floresta",
      "category": "ofensiva",
      "cost": "",
      "typeAction": "acaoSimples",
      "typeAbility": "habilidade",
      "types": [
        "iniciativa"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Até o próximo Repouso",
      "level": 1,
      "pathId": "andarilho",
      "description": "Você se entrega ao mundo primitivo, transformando-se numa criatura de Auroria.\nVocê pode realizar essa habilidade como Ação Simples ou Iniciativa, recebendo uma Transformação com base na ação escolhida:",
      "subEffects": [
        {
          "name": "Animal Selvagem",
          "cost": "",
          "typeAction": "acaoSimples",
          "typeAbility": "passiva",
          "description": "Você se transforma por completo em um animal selvagem da fauna de Auroria (desde que tenha a autorização do Narrador). Esse animal deve possuir a mesma Categoria de Tamanho que a sua.\nCaso você possua equipamentos e pertences ao se transformar, eles serão transformados em pequenas marcas místicas, que se espalham pelo seu corpo, retornando à sua forma original ao desfazer a transformação.\nVocê também recebe uma das seguintes Características à sua escolha ao se transformar nessa criatura: Anfíbio (Seres Comuns), Mobilidade (Seres Ferais) ou Voar (Seres Comuns).\nEnquanto transformado em Animal Selvagem, você perde todo Efeito Positivo e Foco ativo. Além disso, você não poderá utilizar Habilidades de Caminhos enquanto transformado.\nEsse tipo de transformação não possui duração, sendo removida caso você realize um Repouso.",
          "note": "",
          "actions": []
        },
        {
          "name": "Criatura Do Homuncularium",
          "cost": "",
          "typeAction": "iniciativa",
          "type": "iniciativa",
          "description": "Ao iniciar um combate, você transforma uma parte do seu corpo, adquirindo duas Características à sua escolha entre o Livro dos Seres Comuns e o Livro dos Seres Ferais de Dificuldade Fácil.\nEssa Transformação permanece até o final de um combate.\nVocê pode desfazer qualquer uma das Transformações acima com uma Ação Simples.",
          "note": "",
          "actions": []
        }
      ],
      "improvements": [
        {
          "title": "A) Aprimorar Transformação",
          "description": "Você recebe 1 Característica adicional ao utilizar qualquer uma das Transformações dessa habilidade.",
          "active": false
        },
        {
          "title": "B) Maestria Primitiva",
          "description": "Você recebe 1 Característica adicional ao utilizar qualquer uma das Transformações dessa habilidade.",
          "active": false
        }
      ],
      "actions": []
    }
  },
  {
    "_id": "ab00060000000000",
    "name": "Perturbação Lúgubre",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Perturbação Lúgubre.png",
    "folder": "fldhc00010000000",
    "_key": "!items!ab00060000000000",
    "system": {
      "name": "Perturbação Lúgubre",
      "category": "ofensiva",
      "cost": "2 PE",
      "typeAction": "acaoAtiva",
      "typeAbility": "habilidade",
      "types": [
        "conjuracao"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 Metros",
      "duration": "Até passar no teste de Espírito",
      "level": 1,
      "pathId": "andarilho",
      "description": "Você cria um símbolo num alvo que, lentamente, começa a ruir de dentro para fora.\nVocê aplica e ssa Condição Mágica em um Alvo a até 6 metros, fazendo com que, sempre que este Alvo receber qualquer tipo de dano enquanto estiver com essa Condição Mágica, esse dano será aumentado em 1d8 como Dano Imaterial. Esse efeito ocorre apenas uma vez por turno, por Alvo.\nAlvos afetados por essa Condição Mágica não podem regenerar Pontos de Vida e Pontos de Energia enquanto ela não for removida.\nAlvos afetados por essa Condição Mágica poderão realizar um teste de Espírito, Dif. 8, no final dos seus turnos. Caso tenham sucesso, removerão essa Condição Mágica.",
      "subEffects": [],
      "improvements": [
        {
          "title": "A) Forças Malditas",
          "description": "A dificuldade ( Dif.) do teste de Espírito dessa habilidade é aumentada em 2.",
          "active": false
        },
        {
          "title": "B) Conectar o Fim",
          "description": "Aumenta em 1 o número de Alvos dessa habilidade. Este valor é aumentado em 1 para cada 3 pontos de Canalização que você possua.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_04bd3863d6d0",
          "name": "Perturbação Lúgubre (Conjurar)",
          "description": "Aplica Condição Mágica a até 6m. Dano recebido sofre +1d8 Dano Imaterial. Não regenera PV nem PE.",
          "cost": "2 PE",
          "type": {
            "actionType": "acaoAtiva",
            "category": "conjuracao",
            "tags": [
              "conjuracao"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": true,
            "status": "Perturbação Lúgubre",
            "duration": "1 Minuto",
            "description": "Dano sofrido aumentado em 1d8 Dano Imaterial. Não regenera PV nem PE."
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 6,
            "unit": "m",
            "targetLimit": ""
          }
        },
        {
          "id": "act_d1ec59c17900",
          "name": "Dano Imaterial Adicional",
          "description": "Dano adicional de 1d8 Imaterial sempre que o alvo afetado sofrer dano (1x por turno).",
          "cost": "",
          "type": {
            "actionType": "",
            "category": "conjuracao",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        },
        {
          "id": "act_43350e4824af",
          "name": "Teste de Espírito (Resistir)",
          "description": "Teste de Espírito Dif. 8 no final dos turnos do alvo para remover a Condição Mágica.",
          "cost": "",
          "type": {
            "actionType": "",
            "category": "defesa",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "spirit",
            "difficulty": 8,
            "onSuccess": "Remove a Condição Mágica Perturbação Lúgubre.",
            "onFailure": "Permanece sob efeito de Perturbação Lúgubre."
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
    "_id": "ab00070000000000",
    "name": "Forças Do Ciclo",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Forças Do Ciclo.png",
    "folder": "fldhc00010000000",
    "_key": "!items!ab00070000000000",
    "system": {
      "name": "Forças Do Ciclo",
      "category": "ofensiva",
      "cost": "1 PE",
      "typeAction": "acaoAtiva",
      "typeAbility": "habilidade",
      "types": [
        "ataque_magico",
        "conjuracao"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 Metros",
      "duration": "Até passar no teste de Espírito",
      "level": 1,
      "pathId": "andarilho",
      "description": "Você canaliza as energias do Ciclo criando uma esfera de energia.\nVocê realiza um Ataque Mágico contra um Alvo a até 6 metros.\nCaso acerte, você causará nes se Alvo um Dano Mágico de Natureza ou Dano Mágico Profano de valor igual ao seu total máximo de Pontos de Energia.\nO Alvo que recebeu esse dano também é afetado por Tributo por 1 minuto.\nSempre que um Alvo com essa Condição Mágica gastar Pontos de Energia, o conjurador dessa Condição Mágica poderá realizar um teste de Canalização, Dif. 10. Caso tenha sucesso, o conjurador dessa Condição Mágica regenerará 1 Ponto de Energia de um Alvo Aliado a até 6 metros. Esse efeito só pode ocorrer uma vez por turno.\nAlvos afetados por essa Condição Mágica poderão realizar um teste de Espírito, Dif. 8, no final dos seus turnos. Caso tenham sucesso, removerão essa Condição Mágica.",
      "subEffects": [],
      "improvements": [
        {
          "title": "A) Dominação das Forças do Ciclo",
          "description": "A dificuldade ( Dif.) do teste de Espírito dessa habilidade é aumentada em 2.",
          "active": false
        },
        {
          "title": "B) Sinergia Natural",
          "description": "A dificuldade (Dif.) do teste de Canalização dessa habilidade é reduzida em 2.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_3e1c229ec3f4",
          "name": "Ataque do Ciclo (Natureza)",
          "description": "Ataque Mágico a até 6 metros causando Dano de Natureza igual ao total máximo de PE e aplicando Tributo por 1 minuto.",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoAtiva",
            "category": "ataque_magico",
            "tags": [
              "conjuracao"
            ]
          },
          "attack": {
            "hasAttack": true,
            "attribute": "channeling",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "@energy.max",
            "type": "nature",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": true,
            "status": "Tributo",
            "duration": "1 Minuto",
            "description": "Ao gastar PE, conjurador pode testar Canalização para curar 1 PE de aliado."
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        },
        {
          "id": "act_6d8d011d37fa",
          "name": "Ataque do Ciclo (Profano)",
          "description": "Ataque Mágico a até 6 metros causando Dano Profano igual ao total máximo de PE e aplicando Tributo.",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoAtiva",
            "category": "ataque_magico",
            "tags": [
              "conjuracao"
            ]
          },
          "attack": {
            "hasAttack": true,
            "attribute": "channeling",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "@energy.max",
            "type": "profane",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": true,
            "status": "Tributo",
            "duration": "1 Minuto",
            "description": "Afetado por Tributo por 1 minuto."
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        },
        {
          "id": "act_188cbfffc403",
          "name": "Drenar Tributo (Canalização)",
          "description": "Quando o alvo com Tributo gasta PE, realize teste de Canalização Dif. 10 para regenerar 1 PE de aliado a 6m.",
          "cost": "",
          "type": {
            "actionType": "",
            "category": "conjuracao",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "channeling",
            "difficulty": 10,
            "onSuccess": "Regenera 1 Ponto de Energia de um aliado a até 6 metros.",
            "onFailure": "Não regenera PE."
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        },
        {
          "id": "act_2b1986811f29",
          "name": "Teste de Espírito (Resistir Tributo)",
          "description": "Teste de Espírito Dif. 8 no final dos turnos do alvo para remover o Tributo.",
          "cost": "",
          "type": {
            "actionType": "",
            "category": "defesa",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "spirit",
            "difficulty": 8,
            "onSuccess": "Remove a Condição Mágica Tributo.",
            "onFailure": "Permanece sob efeito de Tributo."
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
    "_id": "ab00080000000000",
    "name": "Enfeitiçar",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Enfeitiçar.png",
    "folder": "fldhc00010000000",
    "_key": "!items!ab00080000000000",
    "system": {
      "name": "Enfeitiçar",
      "category": "defensiva",
      "cost": "2 PE",
      "typeAction": "acaoAtiva",
      "typeAbility": "habilidade",
      "types": [
        "conjuracao",
        "foco"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 Metros",
      "duration": "Até passar no teste de Espírito",
      "level": 1,
      "pathId": "andarilho",
      "description": "Seus olhos mudam de cor, fazendo com que a mente de um ser desprevenido possa ser moldada à sua vontade.\nVocê aplica essa Condição Mágica a um Alvo a até 6 metros, fazendo com que ele o considere um Alvo Aliado, além de fazer com que es se Alvo não realize ações ofensivas que causem Efeitos Negativos, Condições Mágicas ou dano contra você.\nVocê possui Aptidão em testes de Conhecimentos contra o Alvo sob efeito dessa Condição Mágica.\nO Alvo sob efeito dessa Condição Mágica poderá realizar um teste de Espírito, Dif. 8, ao fina l dos seus turnos. Caso tenha sucesso, a Condição Mágica será removida.\nCaso um efeito vindo de você cause qualquer tipo de dano, Condição Mágica, Condição Física ou Efeito Negativo no Alvo afetado por essa Condição Mágica, ela será removida.",
      "subEffects": [],
      "improvements": [
        {
          "title": "A) Poder da Mente",
          "description": "A dificuldade ( Dif.) do teste de Espírito dessa habilidade é aumentada em 2.",
          "active": false
        },
        {
          "title": "B) Mestre Enfeitiçador",
          "description": "Essa habilidade não é mais considerada uma habilidade de Foco. Além disso, o seu custo de PE é reduzido em 1.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_90e5d00abb15",
          "name": "Enfeitiçar Alvo",
          "description": "Aplica Condição Mágica a até 6m. Alvo o considera aliado e não realiza ações ofensivas contra você. Aptidão em Conhecimentos contra ele.",
          "cost": "2 PE",
          "type": {
            "actionType": "acaoAtiva",
            "category": "conjuracao",
            "tags": [
              "conjuracao",
              "foco"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": true,
            "status": "Enfeitiçado",
            "duration": "1 Minuto",
            "description": "Considera conjurador aliado. Conjurador tem Aptidão em testes de Conhecimentos contra o alvo."
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        },
        {
          "id": "act_6c5db96776cf",
          "name": "Teste de Espírito (Resistir)",
          "description": "Teste de Espírito Dif. 8 no final dos turnos do alvo para remover o efeito.",
          "cost": "",
          "type": {
            "actionType": "",
            "category": "defesa",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "spirit",
            "difficulty": 8,
            "onSuccess": "Remove a Condição Mágica Enfeitiçado.",
            "onFailure": "Permanece Enfeitiçado."
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
    "_id": "ab00090000000000",
    "name": "Grilhões Primais",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Grilhões Primais.png",
    "folder": "fldhc00010000000",
    "_key": "!items!ab00090000000000",
    "system": {
      "name": "Grilhões Primais",
      "category": "defensiva",
      "cost": "1 PE",
      "typeAction": "acaoRapida",
      "typeAbility": "habilidade",
      "types": [
        "conjuracao"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 Metros",
      "duration": "Até o final do turno do Alvo",
      "level": 1,
      "pathId": "andarilho",
      "description": "Você toca o chão e clama pelas forças primitivas da natureza, que respondem com poderosas vinhas, as quais tentam prender o seu alvo temporariamente.\nVocê cria vinhas que forçam um Alvo a até 6 metros a um teste de Vigor, Dif. 8. Caso falhe, o Alvo ficará Imóvel. Es se Imóvel é removido no final do turno deste Alvo.\nEnquanto com es se Imóvel, este Alvo também possuirá -1 em todos os seus testes de Defesa.",
      "subEffects": [],
      "improvements": [
        {
          "title": "A) Grilhões Ancestrais",
          "description": "A dificuldade ( Dif.) do teste de Vigor dessa habilidade é aumentada em 2.",
          "active": false
        },
        {
          "title": "B) Controle Primal",
          "description": "O teste de Vigor dessa habilidade possui Inaptidão.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_f2699905cccb",
          "name": "Lançar Grilhões Primais",
          "description": "Vinhas forçam alvo a até 6m a teste de Vigor Dif. 8. Falha: Imóvel até o fim do turno e -1 em Defesa.",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoRapida",
            "category": "conjuracao",
            "tags": [
              "conjuracao"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": true,
            "status": "Imóvel",
            "duration": "Fim do turno",
            "description": "Imóvel e -1 em todos os testes de Defesa."
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 8,
            "onSuccess": "Evita as vinhas.",
            "onFailure": "Fica Imóvel até o final do turno e recebe -1 em testes de Defesa."
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
    "_id": "ab00100000000000",
    "name": "Explorador De Auroria",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Explorador De Auroria.png",
    "folder": "fldhc00010000000",
    "_key": "!items!ab00100000000000",
    "system": {
      "name": "Explorador De Auroria",
      "category": "defensiva",
      "cost": "",
      "typeAction": "",
      "typeAbility": "habilidade",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "8 Metros",
      "duration": "Até o final do combate",
      "level": 1,
      "pathId": "andarilho",
      "description": "Você aprendeu os segredos de determinados tipos de criaturas de Auroria, tornando-se o seu maior predador.\nVocê consegue identificar os Livros, Parâmetros Ofensivos, Parâmetros Defensivos e Poder de toda criatura do Homuncularium a até 8 metros, recebendo também a seguinte técnica:",
      "subEffects": [
        {
          "name": "Adaptação Selvagem",
          "cost": "",
          "typeAction": "livre",
          "typeAbility": "passiva",
          "description": "Essa técnica só pode ser realizada uma vez por combate.\nCaso um Alvo Aliado a até 8 metros seja afetado por uma Característica que não seja uma Característica Adicional ou Cólera, sem custo de Ação, você poderá escolher não ser mais afetado pelos efeitos dessa mesma Característica até o final desse combate.",
          "note": "",
          "actions": []
        },
        {
          "name": "Técnicas de Sobrevivência",
          "cost": "",
          "typeAction": "",
          "typeAbility": "passiva",
          "description": "Ao adquirir essa habilidade, você também receberá uma das Técnicas de Sobrevivência à sua escolha:\n• Você ignora a regra de 2 horas adicionais ao receber os efeitos vindos de Repousos, caso esteja repousando em local desconfortável.\n• Você é imune aos efeitos aplicados pelo Combate Aquático.\n• Você passa automaticamente no teste da ação Estabilizar.\n• Você possui Infravisão.",
          "note": "",
          "actions": []
        }
      ],
      "improvements": [
        {
          "title": "A) Conhecimento Selvagem",
          "description": "Criaturas afetadas pela sua Adaptação Selvagem também têm a Categoria de Dado dos seus Golpes Brutais e Evocações Místicas reduzida em 1 por 1 minuto.",
          "active": false
        },
        {
          "title": "B) Sobrevivencialista",
          "description": "Adquiria duas novas Técnica de Sobrevivência dessa habilidade que você ainda não possui.",
          "active": false
        }
      ],
      "actions": []
    }
  },
  {
    "_id": "ab00110000000000",
    "name": "Invólucro Cinzento",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Invólucro Cinzento.png",
    "folder": "fldhc00010000000",
    "_key": "!items!ab00110000000000",
    "system": {
      "name": "Invólucro Cinzento",
      "category": "auxiliadora",
      "cost": "1 PE",
      "typeAction": "acaoRapida",
      "typeAbility": "habilidade",
      "types": [
        "conjuracao"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Conforme efeito",
      "duration": "Instantânea",
      "level": 1,
      "pathId": "andarilho",
      "description": "Você drena as forças ao seu redor, redirecionando um poder corrompido a outro alvo.\nAo receber um Efeito Negativo ou Condição Mágica de um Alvo, você poderá forçar esse mesmo Alvo a um teste de Espírito, Dif. 8. Caso falhe, o Alvo receberá o mesmo Efeito Negativo ou Condição Mágica aplicado em você.",
      "subEffects": [],
      "improvements": [
        {
          "title": "A) Sussurros da Floresta",
          "description": "A dificuldade ( Dif.) do teste de Espírito dessa habilidade é aumentada em 2.",
          "active": false
        },
        {
          "title": "B) Prática Maldita",
          "description": "Caso você já tenha utilizado essa habilidade em uma rodada, você poderá utilizar essa habilidade uma vez adicional nessa mesma rodada.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_46aa9d1d7733",
          "name": "Refletir Malefício (Espírito)",
          "description": "Ao receber Efeito Negativo ou Condição Mágica, força agressor a teste de Espírito Dif. 8 para receber o mesmo efeito.",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoRapida",
            "category": "conjuracao",
            "tags": [
              "conjuracao"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "spirit",
            "difficulty": 8,
            "onSuccess": "Alvo resiste ao reflexo do malefício.",
            "onFailure": "Alvo recebe o mesmo Efeito Negativo ou Condição Mágica aplicado no conjurador."
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
    "_id": "ab00120000000000",
    "name": "Decreto Lunar",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Decreto Lunar.png",
    "folder": "fldhc00010000000",
    "_key": "!items!ab00120000000000",
    "system": {
      "name": "Decreto Lunar",
      "category": "auxiliadora",
      "cost": "2 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "habilidade",
      "types": [
        "conjuracao",
        "foco"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 Metros",
      "duration": "1 Minuto",
      "level": 1,
      "pathId": "andarilho",
      "description": "Você reveste o corpo de um alvo com uma energia prateada.\nVocê evoca o poder das Luas, aplicando um dos seguintes efeitos em um Alvo a até 6 metros:",
      "subEffects": [
        {
          "name": "Lua Crescente",
          "cost": "2 PE",
          "typeAction": "acaoSimples",
          "type": "suporte",
          "description": "Efeito Positivo\nUma vez por rodada, antes que você realize um teste de Parâmetro ou Bloqueio, você poderá aplicar Aptidão nesse teste.",
          "note": "",
          "actions": [
            {
              "id": "act_lua_crescente",
              "name": "Lua Crescente",
              "description": "Aplica o Efeito Positivo 'Lua Crescente' em um Alvo a até 6 metros por 1 minuto. Uma vez por rodada, antes de realizar um teste de Parâmetro ou Bloqueio, o alvo pode aplicar Aptidão nesse teste.",
              "cost": "2 PE",
              "type": {
                "actionType": "acaoSimples",
                "category": "suporte",
                "tags": [
                  "conjuracao",
                  "foco"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "channeling",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard"
              },
              "damage": {
                "hasDamage": false,
                "formula": "",
                "type": "light",
                "criticalBonus": "",
                "scaling": ""
              },
              "condition": {
                "hasCondition": true,
                "status": "Lua Crescente",
                "duration": "1 Minuto",
                "description": "Efeito Positivo: Uma vez por rodada, antes de realizar um teste de Parâmetro ou Bloqueio, pode aplicar Aptidão nesse teste."
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "spirit",
                "difficulty": 8,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 6,
                "unit": "m",
                "targetLimit": "1"
              }
            }
          ]
        },
        {
          "name": "Lua Minguante",
          "cost": "2 PE",
          "typeAction": "acaoSimples",
          "type": "conjuracao",
          "description": "Condição Mágica\nUma vez por rodada, antes que você realize um teste de Parâmetro ou Bloqueio, o Alvo que aplicou essa Condição Mágica poderá aplicar Inaptidão nesse teste. O Alvo afetado por essa Condição Mágica poderá realizar um teste de Espírito, Dif. 8, no final dos seus turnos. Caso tenha sucesso, essa Condição Mágica será removida.",
          "note": "",
          "actions": [
            {
              "id": "act_lua_minguante",
              "name": "Lua Minguante",
              "description": "Aplica a Condição Mágica 'Lua Minguante' em um Alvo a até 6 metros por 1 minuto. Uma vez por rodada, antes que o alvo realize teste de Parâmetro ou Bloqueio, o aplicador pode aplicar Inaptidão nesse teste. Teste de Espírito Dif. 8 no final dos turnos do alvo para remover.",
              "cost": "2 PE",
              "type": {
                "actionType": "acaoSimples",
                "category": "conjuracao",
                "tags": [
                  "conjuracao",
                  "foco"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "channeling",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard"
              },
              "damage": {
                "hasDamage": false,
                "formula": "",
                "type": "dark",
                "criticalBonus": "",
                "scaling": ""
              },
              "condition": {
                "hasCondition": true,
                "status": "Lua Minguante",
                "duration": "1 Minuto",
                "description": "Condição Mágica: Uma vez por rodada, o aplicador pode aplicar Inaptidão em um teste de Parâmetro ou Bloqueio seu. Teste de Espírito Dif. 8 no fim do seu turno para remover."
              },
              "check": {
                "hasCheck": true,
                "category": "parameter",
                "attribute": "spirit",
                "difficulty": 8,
                "onSuccess": "Remove a Condição Mágica Lua Minguante",
                "onFailure": "Permanece sob efeito de Lua Minguante"
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 6,
                "unit": "m",
                "targetLimit": "1"
              }
            },
            {
              "id": "act_resistir_lua_minguante",
              "name": "Resistir: Lua Minguante",
              "description": "Teste de Espírito Dif. 8 no final do turno do alvo afetado para remover a Condição Mágica Lua Minguante (Dif. 10 com Aprimoramento Augúrio Lunar).",
              "cost": "",
              "type": {
                "actionType": "",
                "category": "defesa",
                "tags": []
              },
              "attack": {
                "hasAttack": false,
                "attribute": "spirit",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard"
              },
              "damage": {
                "hasDamage": false,
                "formula": "",
                "type": "immaterial",
                "criticalBonus": "",
                "scaling": ""
              },
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": true,
                "category": "parameter",
                "attribute": "spirit",
                "difficulty": 8,
                "onSuccess": "Remove a Condição Mágica Lua Minguante",
                "onFailure": "Permanece sob efeito de Lua Minguante"
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 0,
                "unit": "m",
                "targetLimit": ""
              }
            }
          ]
        }
      ],
      "improvements": [
        {
          "title": "A) Presente das Três Guardiãs",
          "description": "Sempre que você aplicar esse Efeito Positivo em um Alvo, você também receberá esse Efeito Positivo.",
          "active": false
        },
        {
          "title": "B) Augúrio Lunar",
          "description": "A dificuldade ( Dif.) do teste de Espírito da Lua Minguante é aumentada em 2.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_lua_crescente",
          "name": "Lua Crescente",
          "description": "Aplica o Efeito Positivo 'Lua Crescente' em um Alvo a até 6 metros por 1 minuto. Uma vez por rodada, antes de realizar um teste de Parâmetro ou Bloqueio, o alvo pode aplicar Aptidão nesse teste.",
          "cost": "2 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "suporte",
            "tags": [
              "conjuracao",
              "foco"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "channeling",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": false,
            "formula": "",
            "type": "light",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": true,
            "status": "Lua Crescente",
            "duration": "1 Minuto",
            "description": "Efeito Positivo: Uma vez por rodada, antes de realizar um teste de Parâmetro ou Bloqueio, pode aplicar Aptidão nesse teste."
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "spirit",
            "difficulty": 8,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 6,
            "unit": "m",
            "targetLimit": "1"
          }
        },
        {
          "id": "act_lua_minguante",
          "name": "Lua Minguante",
          "description": "Aplica a Condição Mágica 'Lua Minguante' em um Alvo a até 6 metros por 1 minuto. Uma vez por rodada, antes que o alvo realize teste de Parâmetro ou Bloqueio, o aplicador pode aplicar Inaptidão nesse teste. Teste de Espírito Dif. 8 no final dos turnos do alvo para remover.",
          "cost": "2 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "conjuracao",
            "tags": [
              "conjuracao",
              "foco"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "channeling",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": false,
            "formula": "",
            "type": "dark",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": true,
            "status": "Lua Minguante",
            "duration": "1 Minuto",
            "description": "Condição Mágica: Uma vez por rodada, o aplicador pode aplicar Inaptidão em um teste de Parâmetro ou Bloqueio seu. Teste de Espírito Dif. 8 no fim do seu turno para remover."
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "spirit",
            "difficulty": 8,
            "onSuccess": "Remove a Condição Mágica Lua Minguante",
            "onFailure": "Permanece sob efeito de Lua Minguante"
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 6,
            "unit": "m",
            "targetLimit": "1"
          }
        },
        {
          "id": "act_resistir_lua_minguante",
          "name": "Resistir: Lua Minguante",
          "description": "Teste de Espírito Dif. 8 no final do turno do alvo afetado para remover a Condição Mágica Lua Minguante (Dif. 10 com Aprimoramento Augúrio Lunar).",
          "cost": "",
          "type": {
            "actionType": "",
            "category": "defesa",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "spirit",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": false,
            "formula": "",
            "type": "immaterial",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "spirit",
            "difficulty": 8,
            "onSuccess": "Remove a Condição Mágica Lua Minguante",
            "onFailure": "Permanece sob efeito de Lua Minguante"
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 0,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "ab00130000000000",
    "name": "Técnica Musical",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Técnica Musical.png",
    "folder": "fldhc00010000000",
    "_key": "!items!ab00130000000000",
    "system": {
      "name": "Técnica Musical",
      "category": "auxiliadora",
      "cost": "1 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "habilidade",
      "types": [
        "conjuracao"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "4 Metros",
      "duration": "Instantânea",
      "level": 1,
      "pathId": "andarilho",
      "description": "Seja com um instrumento ou com um canto, você começa a realizar uma melodia que auxilia os seus aliados.\nVocê exala uma melodia que afeta você e todos os Alvos Aliados a até 4 metros, aplicando um dos seguintes efeitos:",
      "subEffects": [
        {
          "name": "Verso",
          "cost": "1 PE",
          "typeAction": "acaoSimples",
          "typeAbility": "passiva",
          "description": "A sua próxima Movimentação é aumentada em 2 metros.",
          "note": "",
          "actions": [
            {
              "id": "act_musica_verso",
              "name": "Técnica Musical: Verso",
              "description": "A sua próxima Movimentação é aumentada em 2 metros (não acumula).",
              "cost": "1 PE",
              "type": {
                "actionType": "acaoSimples",
                "category": "suporte",
                "tags": []
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard",
                "defenseTarget": "evasion"
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
                "status": "Verso (+2m Movimento)",
                "duration": "Próxima Movimentação",
                "description": "Próxima Movimentação aumentada em 2 metros."
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": true,
                "shape": "circle",
                "size": 4,
                "unit": "m",
                "targetDisposition": "friendly",
                "targetLimit": ""
              }
            }
          ]
        },
        {
          "name": "Refrão",
          "cost": "1 PE",
          "typeAction": "acaoSimples",
          "typeAbility": "passiva",
          "description": "Você recebe +1 no seu próximo teste de Parâmetro ou Bloqueio.",
          "note": "",
          "actions": [
            {
              "id": "act_musica_refrao",
              "name": "Técnica Musical: Refrão",
              "description": "Você recebe +1 no seu próximo teste de Parâmetro ou Bloqueio (não acumula).",
              "cost": "1 PE",
              "type": {
                "actionType": "acaoSimples",
                "category": "suporte",
                "tags": []
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard",
                "defenseTarget": "evasion"
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
                "status": "Refrão (+1 Teste)",
                "duration": "Próximo Teste",
                "description": "+1 no próximo teste de Parâmetro ou Bloqueio."
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": true,
                "shape": "circle",
                "size": 4,
                "unit": "m",
                "targetDisposition": "friendly",
                "targetLimit": ""
              }
            }
          ]
        },
        {
          "name": "Ponte",
          "cost": "1 PE",
          "typeAction": "acaoSimples",
          "typeAbility": "passiva",
          "description": "Você regenera um valor de Pontos de Vida equivalente à metade do seu total máximo de Pontos de Energia.\nOs efeitos de Verso e Refrão não acumulam, mesmo vindos de fontes diferentes.",
          "note": "",
          "actions": [
            {
              "id": "act_musica_ponte",
              "name": "Técnica Musical: Ponte",
              "description": "Você regenera Pontos de Vida equivalente à metade do seu total máximo de Pontos de Energia.",
              "cost": "1 PE",
              "type": {
                "actionType": "acaoSimples",
                "category": "suporte",
                "tags": []
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard",
                "defenseTarget": "evasion"
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
                "formula": "Math.floor(@energy.max / 2)",
                "type": "pv",
                "criticalBonus": "",
                "scaling": ""
              },
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": true,
                "shape": "circle",
                "size": 4,
                "unit": "m",
                "targetDisposition": "friendly",
                "targetLimit": ""
              }
            }
          ]
        }
      ],
      "improvements": [
        {
          "title": "A) Técnica Mística",
          "description": "Ao utilizar essa habilidade em combate, você poderá realizar um Teste de Destino, Dif. 10. Caso tenha sucesso, você regenerará 1 Ponto de Energia.",
          "active": false
        },
        {
          "title": "B) Execução Rápida",
          "description": "A Ação Simples utilizada para realizar essa habilidade é transformada em uma Ação Acelerada.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_musica_verso",
          "name": "Técnica Musical: Verso",
          "description": "A sua próxima Movimentação é aumentada em 2 metros (não acumula).",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "suporte",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard",
            "defenseTarget": "evasion"
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
            "status": "Verso (+2m Movimento)",
            "duration": "Próxima Movimentação",
            "description": "Próxima Movimentação aumentada em 2 metros."
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 4,
            "unit": "m",
            "targetDisposition": "friendly",
            "targetLimit": ""
          }
        },
        {
          "id": "act_musica_refrao",
          "name": "Técnica Musical: Refrão",
          "description": "Você recebe +1 no seu próximo teste de Parâmetro ou Bloqueio (não acumula).",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "suporte",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard",
            "defenseTarget": "evasion"
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
            "status": "Refrão (+1 Teste)",
            "duration": "Próximo Teste",
            "description": "+1 no próximo teste de Parâmetro ou Bloqueio."
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 4,
            "unit": "m",
            "targetDisposition": "friendly",
            "targetLimit": ""
          }
        },
        {
          "id": "act_musica_ponte",
          "name": "Técnica Musical: Ponte",
          "description": "Você regenera Pontos de Vida equivalente à metade do seu total máximo de Pontos de Energia.",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "suporte",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard",
            "defenseTarget": "evasion"
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
            "formula": "Math.floor(@energy.max / 2)",
            "type": "pv",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 4,
            "unit": "m",
            "targetDisposition": "friendly",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "ab00160000000000",
    "name": "Adrenalina",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Adrenalina.png",
    "folder": "fldhc00020000000",
    "_key": "!items!ab00160000000000",
    "system": {
      "name": "Adrenalina",
      "category": "ofensiva",
      "cost": "1 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "habilidade",
      "types": [],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Até o final do combate",
      "level": 1,
      "pathId": "combatente",
      "description": "Uma fúria descomunal transborda de você.\nAté o final de um combate, o primeiro Dano Físico causado por você em um turno é aumentado em um valor igual ao seu total de pontos de Brutalidade. Esse efeito não acumula.\nEnquanto esse efeito estiver ativo, a sua Movimentação não pode ser reduzida.",
      "subEffects": [],
      "improvements": [
        {
          "title": "A) Mestre da Guerra",
          "description": "Caso um Alvo Inimigo cause qualquer tipo de dano aos seus Pontos de Vida, você receberá +1 e Prioridade no seu próximo teste de Precisão. Esse efeito não acumula.",
          "active": false
        },
        {
          "title": "B) Movimentação Frenética",
          "description": "Enquanto o efeito dessa habilidade estiver ativo, a sua Movimentação é aumentada em 2 metros.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_33bbab8efc1a",
          "name": "Ativar Adrenalina",
          "description": "Até o fim do combate, o primeiro Dano Físico do turno aumenta no valor de Brutalidade. Movimentação não pode ser reduzida.",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "suporte",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "@parameters.brutality.value",
            "type": "physical",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
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
    "_id": "ab00170000000000",
    "name": "Discípulo Do Corpo E Da Mente",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Discípulo Do Corpo E Da Mente.png",
    "folder": "fldhc00020000000",
    "_key": "!items!ab00170000000000",
    "system": {
      "name": "Discípulo Do Corpo E Da Mente",
      "category": "ofensiva",
      "cost": "",
      "typeAction": "",
      "typeAbility": "habilidade",
      "types": [
        "passiva",
        "ataque_corpo_a_corpo"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Passiva",
      "level": 1,
      "pathId": "combatente",
      "description": "Você aprimorou as suas técnicas de combate, transformando seus punhos e pernas em ferramentas mortais contra os seus inimigos.\nVocê altera a regra de dano dos seus Ataques Desarmados, fazendo com que todos os Danos Físicos causados pelos seus Ataques Desarmados passem a ser 1d4 ao invés do dano padrão. Esse valor é aumentado em 1d4 para cada ponto de Brutalidade ou Destreza (à sua escolha).\nVocê também recebe a seguinte técnica:",
      "subEffects": [
        {
          "name": "Sequência Marcial",
          "cost": "1 PE",
          "typeAction": "livre",
          "type": "ataque_corpo_a_corpo",
          "description": "Ao atingir um Alvo com um Ataque Desarmado, você poderá utilizar essa técnica para realizar um único Ataque Extra, na forma de um Ataque Desarmado, contra um Alvo dentro do alcance do seu Ataque Desarmado.\nEssa técnica só pode ser utilizada uma vez por rodada.",
          "note": "",
          "actions": [
            {
              "id": "act_sequencia_marcial",
              "name": "Sequência Marcial (Ataque Extra)",
              "description": "Ao atingir um alvo com Ataque Desarmado, gasta 1 PE para realizar um único Ataque Extra desarmado contra um alvo no alcance (1x por rodada).",
              "cost": "1 PE",
              "type": {
                "actionType": "",
                "category": "ataque_corpo_a_corpo",
                "tags": []
              },
              "attack": {
                "hasAttack": true,
                "attribute": "brutality",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard",
                "defenseTarget": "evasion"
              },
              "damage": {
                "hasDamage": true,
                "formula": "1d4",
                "type": "physical",
                "criticalBonus": "",
                "scaling": "+1d4 por Brutalidade ou Destreza"
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
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 3,
                "unit": "m",
                "targetDisposition": "all",
                "targetLimit": ""
              }
            }
          ]
        }
      ],
      "improvements": [
        {
          "title": "A) Corpo Marcial",
          "description": "Escolha uma das Propriedades a seguir ao iniciar um combate: Impacto, Perfurar ou Prioridade. Os seus Ataques Desarmados passam a possuir a Propriedade escolhida até o final do combate.",
          "active": false
        },
        {
          "title": "B) Despertar do Corpo e Mente",
          "description": "Ao atingir um Alvo com um Ataque Desarmado, caso o Resultado Natural (Precisão) desse ataque tenha sido 10, ou mais, você regenerará 1 Ponto de Energia. Esse efeito ocorre apenas uma vez por rodada.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_4e1f617ba452",
          "name": "Golpe Desarmado",
          "description": "Ataque Desarmado com 1d4 de Dano Físico (+1d4 por ponto de Brutalidade ou Destreza).",
          "cost": "",
          "type": {
            "actionType": "acaoAtiva",
            "category": "ataque_corpo_a_corpo",
            "tags": []
          },
          "attack": {
            "hasAttack": true,
            "attribute": "precision",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "1d4",
            "type": "physical",
            "criticalBonus": "",
            "scaling": "+1d4 por ponto de Brutalidade ou Destreza"
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        },
        {
          "id": "act_sequencia_marcial",
          "name": "Sequência Marcial (Ataque Extra)",
          "description": "Ao atingir um alvo com Ataque Desarmado, gasta 1 PE para realizar um único Ataque Extra desarmado contra um alvo no alcance (1x por rodada).",
          "cost": "1 PE",
          "type": {
            "actionType": "",
            "category": "ataque_corpo_a_corpo",
            "tags": []
          },
          "attack": {
            "hasAttack": true,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard",
            "defenseTarget": "evasion"
          },
          "damage": {
            "hasDamage": true,
            "formula": "1d4",
            "type": "physical",
            "criticalBonus": "",
            "scaling": "+1d4 por Brutalidade ou Destreza"
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
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetDisposition": "all",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "ab00180000000000",
    "name": "Perseguidor Do Véu",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Perseguidor Do Véu.png",
    "folder": "fldhc00020000000",
    "_key": "!items!ab00180000000000",
    "system": {
      "name": "Perseguidor Do Véu",
      "category": "ofensiva",
      "cost": "",
      "typeAction": "",
      "typeAbility": "habilidade",
      "types": [
        "passiva",
        "ataque_corpo_a_corpo"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 metros",
      "duration": "Passiva",
      "level": 1,
      "pathId": "combatente",
      "description": "Você se adaptou para expurgar as forças do Véu, impedindo que criaturas místicas e conjuradores continuem destruindo Auroria.\nEnquanto estiver em combate, ao realizar um Ataque Físico contra um Alvo que tenha realizado uma Conjuração a até 6 metros de você durante essa, ou a última rodada, você receberá Aptidão nesse Ataque Físico.\nAo adquirir essa habilidade, você passa a sentir toda Conjuração realizada em um raio de 10 metros de você.",
      "subEffects": [],
      "improvements": [
        {
          "title": "A) Resguardo Escarlate",
          "description": "Enquanto estiver em combate, o primeiro teste de Espírito que você realizar em uma rodada possuirá Aptidão.",
          "active": false
        },
        {
          "title": "B) Oprimir Conjuradores",
          "description": "Enquanto estiver em combate, o primeiro Ataque Mágico contra você durante uma rodada possuirá Inaptidão (Canalização).",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_perseguidor_sentido",
          "name": "Sentir Conjurações",
          "description": "Sente toda Conjuração realizada em um raio de 10 metros. Recebe Aptidão em Ataque Físico contra quem conjurou a até 6m nesta ou na última rodada.",
          "cost": "",
          "type": {
            "actionType": "",
            "category": "ataque_corpo_a_corpo",
            "tags": [
              "passiva"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 10,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "ab00190000000000",
    "name": "Encantamentos Rúnicos",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Encantamentos Rúnicos.png",
    "folder": "fldhc00020000000",
    "_key": "!items!ab00190000000000",
    "system": {
      "name": "Encantamentos Rúnicos",
      "category": "ofensiva",
      "cost": "2 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "habilidade",
      "types": [
        "foco"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "1 Minuto",
      "level": 1,
      "pathId": "combatente",
      "description": "Canalizando o Véu ao seu redor, você imbui um novo efeito místico ao seu equipamento.\nVocê encanta um Armadura, Escudo ou Armamento equipado por você com um dos seguintes efeitos à sua escolha, com base no tipo de equipamento:",
      "subEffects": [
        {
          "name": "Armaduras ou Escudos",
          "cost": "",
          "typeAction": "",
          "type": "defesa",
          "description": "• Proteção Rúnica: Enquanto estiver equipado com esse equipamento, todo dano recebido é reduzido em 1d6.\n• Baluarte Mágico: Você recebe +1 em testes de Bloqueio com esse equipamento. Além disso, você não pode ter os seus testes de Bloqueio e valores de Bloqueio reduzidos (exceto por Exaustão).",
          "note": "",
          "actions": []
        },
        {
          "name": "Armamentos",
          "cost": "",
          "typeAction": "",
          "type": "ataque_corpo_a_corpo",
          "description": "• Encantamento Elemental: Escolha um tipo de Dano Mágico elemental: Fogo, Água, Vento, Terra, Trovão, Gelo, Natureza, Profano, Trevas ou Luz. O dano causado por esse Armamento em um turno é aumentado em 1d6 como Dano Mágico do tipo elemental atribuído.\n• Lâmina Arcana: Você recebe +1 em testes de Precisão com este equipamento, além de não pode ter os seus testes de Precisão e valores de Precisão reduzidos (exceto por Exaustão).",
          "note": "",
          "actions": []
        }
      ],
      "improvements": [
        {
          "title": "A) Praticidade Mística",
          "description": "A Ação Simples utilizada para realizar essa habilidade é transformada em uma Ação Acelerada.",
          "active": false
        },
        {
          "title": "B) Duplicar Encantamento",
          "description": "Ao utilizar essa habilidade, você aplicará um efeito adicional em um mesmo equipamento, ou em um equipamento diferente. O mesmo equipamento não pode possuir mais de uma vez o mesmo efeito aplicado por essa habilidade.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_872bcd3a590a",
          "name": "Encantamento Elemental (Arma)",
          "description": "Adiciona +1d6 Dano Mágico elemental por turno ao armamento encantado (Fogo, Água, Vento, Terra, Trovão, Gelo, Natureza, Profano, Trevas ou Luz).",
          "cost": "2 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "suporte",
            "tags": [
              "foco"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "1d6",
            "type": "fire",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
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
    "_id": "ab00200000000000",
    "name": "Ensinamentos Do Templo Cinzento",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Ensinamentos Do Templo Cinzento.png",
    "folder": "fldhc00020000000",
    "_key": "!items!ab00200000000000",
    "system": {
      "name": "Ensinamentos Do Templo Cinzento",
      "category": "ofensiva",
      "cost": "",
      "typeAction": "",
      "typeAbility": "habilidade",
      "types": [
        "passiva",
        "conjuracao"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Passiva",
      "level": 1,
      "pathId": "combatente",
      "description": "Você desperta um poder antigo, quase esquecido pelo tempo.\nAo adquirir essa habilidade você receberá as seguintes técnicas místicas:",
      "subEffects": [
        {
          "name": "Avanço Místico",
          "cost": "1 PE",
          "typeAction": "acaoRapida",
          "type": "conjuracao",
          "description": "Após atingir um Alvo Inimigo com um Ataque Físico você poderá utilizar essa técnica mística para se teletransportar para um novo local vazio a até 3 metros, fazendo com que um Alvo Inimigo, a até 3 metros desse novo local, receba a metade do seu total máximo de Pontos de Energia como Dano Mágico Neutro.",
          "note": "",
          "actions": [
            {
              "id": "act_avanco_mistico",
              "name": "Avanço Místico",
              "description": "Após atingir um inimigo com Ataque Físico, teletransporta até 3 metros e causa metade do PE Máximo como Dano Mágico Neutro a um inimigo a até 3m do novo local.",
              "cost": "1 PE",
              "type": {
                "actionType": "acaoRapida",
                "category": "conjuracao",
                "tags": [
                  "conjuracao"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard",
                "defenseTarget": "evasion"
              },
              "damage": {
                "hasDamage": true,
                "formula": "Math.floor(@energy.max / 2)",
                "type": "neutro",
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
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": true,
                "shape": "circle",
                "size": 3,
                "unit": "m",
                "targetDisposition": "hostile",
                "targetLimit": "1"
              }
            }
          ]
        },
        {
          "name": "Energizar",
          "cost": "",
          "typeAction": "",
          "typeAbility": "passiva",
          "description": "Você pode aumentar o alcance dos seus Ataques Físicos em até 2 metros, criando impactos no ar ao atacar.",
          "note": "",
          "actions": [
            {
              "id": "act_energizar",
              "name": "Energizar",
              "description": "Aumenta o alcance dos seus Ataques Físicos em até 2 metros, criando impactos no ar ao atacar.",
              "cost": "",
              "type": {
                "actionType": "",
                "category": "suporte",
                "tags": []
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard",
                "defenseTarget": "evasion"
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
                "status": "Energizado (+2m Alcance)",
                "duration": "Ativo",
                "description": "+2 metros de alcance em Ataques Físicos."
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 3,
                "unit": "m",
                "targetDisposition": "all",
                "targetLimit": ""
              }
            }
          ]
        },
        {
          "name": "Truque Arcano",
          "cost": "",
          "typeAction": "",
          "typeAbility": "passiva",
          "description": "Você tem acesso a um Feitiço Arcano (FEITIÇOS ARCANOS) à sua escolha.\nApós concluir um Repouso Completo você poderá substituir esse Feitiço Arcano por outro Feitiço Arcano.",
          "note": "",
          "actions": []
        }
      ],
      "improvements": [
        {
          "title": "A) Reação Mística",
          "description": "A Ação Rápida utilizada em Avanço Místico é transformada em uma Ação Acelerada.",
          "active": false
        },
        {
          "title": "B) Energia Cinzenta",
          "description": "O Dano Mágico Neutro causado pelo Avanço Místico agora atinge todos os Alvos Inimigos a até 3 metros, ao invés de apenas um Alvo Inimigo.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_avanco_mistico",
          "name": "Avanço Místico",
          "description": "Após atingir um inimigo com Ataque Físico, teletransporta até 3 metros e causa metade do PE Máximo como Dano Mágico Neutro a um inimigo a até 3m do novo local.",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoRapida",
            "category": "conjuracao",
            "tags": [
              "conjuracao"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard",
            "defenseTarget": "evasion"
          },
          "damage": {
            "hasDamage": true,
            "formula": "Math.floor(@energy.max / 2)",
            "type": "neutro",
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
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetDisposition": "hostile",
            "targetLimit": "1"
          }
        },
        {
          "id": "act_energizar",
          "name": "Energizar",
          "description": "Aumenta o alcance dos seus Ataques Físicos em até 2 metros, criando impactos no ar ao atacar.",
          "cost": "",
          "type": {
            "actionType": "",
            "category": "suporte",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard",
            "defenseTarget": "evasion"
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
            "status": "Energizado (+2m Alcance)",
            "duration": "Ativo",
            "description": "+2 metros de alcance em Ataques Físicos."
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetDisposition": "all",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "ab00210000000000",
    "name": "Perito Com Armamentos Corpo A Corpo",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Perito Com Armamentos Corpo A Corpo.png",
    "folder": "fldhc00020000000",
    "_key": "!items!ab00210000000000",
    "system": {
      "name": "Perito Com Armamentos Corpo A Corpo",
      "category": "ofensiva",
      "cost": "",
      "typeAction": "",
      "typeAbility": "habilidade",
      "types": [
        "passiva",
        "ataque_corpo_a_corpo"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Conforme armamento",
      "duration": "Passiva",
      "level": 1,
      "pathId": "combatente",
      "description": "Você representa ao máximo o que é ser um mestre das armas.\nAo adquirir essa habilidade você receberá as seguintes técnicas:",
      "subEffects": [
        {
          "name": "Manejo Com Armamentos",
          "cost": "",
          "typeAction": "",
          "typeAbility": "passiva",
          "description": "Somente com Armamentos Leves\nVocê deixa de receber a Inaptidão gerada pela regra de Empunhadura Dupla ao equipar dois Armamentos Leves ao mesmo tempo.\nAlém disso, uma vez durante o seu turno, você pode trocar um Armamento equipado por outro Armamento que possua, sem custo de Ação.",
          "note": "",
          "actions": []
        },
        {
          "name": "Manejo Com Armamentos Pesados",
          "cost": "",
          "typeAction": "",
          "typeAbility": "passiva",
          "description": "Somente com Armamentos Pesados\nO Dano Base dos seus Armamentos Pesados equipados é aumentado em 1.",
          "note": "",
          "actions": []
        },
        {
          "name": "Ciclone De Aço",
          "cost": "2 PE",
          "typeAction": "acaoAtiva",
          "type": "ataque_corpo_a_corpo",
          "description": "Somente com Armamentos Leves ou Pesados\nVocê gira rapidamente o seu corpo, causando o total de Dano Físico do seu Armamento equipado em todos os Alvos dentro do alcance desse Armamento. Caso você esteja equipado com dois Armamentos Leves, os danos desses Armamentos Leves serão somados nessa técnica.\nAlvos dentro do alcance dessa técnica podem realizar um teste de Defesa, Dif. 8. Caso tenham sucesso, receberão metade do dano causado pela técnica.",
          "note": "",
          "actions": [
            {
              "id": "act_ciclone_de_aco",
              "name": "Ciclone De Aço",
              "description": "Gira rapidamente, causando o total de Dano Físico do armamento equipado em todos os alvos dentro do alcance. Teste de Defesa Dif. 8 para metade do dano.",
              "cost": "2 PE",
              "type": {
                "actionType": "acaoAtiva",
                "category": "ataque_corpo_a_corpo",
                "tags": []
              },
              "attack": {
                "hasAttack": false,
                "attribute": "brutality",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard",
                "defenseTarget": "evasion"
              },
              "damage": {
                "hasDamage": true,
                "formula": "1d8",
                "type": "physical",
                "criticalBonus": "",
                "scaling": "Dano do Armamento Equipado"
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
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": true,
                "category": "defense",
                "attribute": "vigor",
                "difficulty": 8,
                "onSuccess": "Metade do dano",
                "onFailure": "Dano total"
              },
              "areaOfEffect": {
                "hasArea": true,
                "shape": "circle",
                "size": 2,
                "unit": "m",
                "targetDisposition": "hostile",
                "targetLimit": "Todos"
              }
            }
          ]
        }
      ],
      "improvements": [
        {
          "title": "A) Técnica Inescapável",
          "description": "A dificuldade (Dif.) do teste de Defesa do Ciclone de Aço é aumentada em 2.",
          "active": false
        },
        {
          "title": "B) Impacto de Aço",
          "description": "Um Alvo que tenha falhado no teste de Defesa de Ciclone de Aço ficará Caído.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_ciclone_de_aco",
          "name": "Ciclone De Aço",
          "description": "Gira rapidamente, causando o total de Dano Físico do armamento equipado em todos os alvos dentro do alcance. Teste de Defesa Dif. 8 para metade do dano.",
          "cost": "2 PE",
          "type": {
            "actionType": "acaoAtiva",
            "category": "ataque_corpo_a_corpo",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "brutality",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard",
            "defenseTarget": "evasion"
          },
          "damage": {
            "hasDamage": true,
            "formula": "1d8",
            "type": "physical",
            "criticalBonus": "",
            "scaling": "Dano do Armamento Equipado"
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
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "defense",
            "attribute": "vigor",
            "difficulty": 8,
            "onSuccess": "Metade do dano",
            "onFailure": "Dano total"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 2,
            "unit": "m",
            "targetDisposition": "hostile",
            "targetLimit": "Todos"
          }
        }
      ]
    }
  },
  {
    "_id": "ab00220000000000",
    "name": "Punição Escarlate",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Punição Escarlate.png",
    "folder": "fldhc00020000000",
    "_key": "!items!ab00220000000000",
    "system": {
      "name": "Punição Escarlate",
      "category": "ofensiva",
      "cost": "1 PE",
      "typeAction": "acaoRapida",
      "typeAbility": "habilidade",
      "types": [
        "ataque_corpo_a_corpo"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Ao atingir com Ataque Físico",
      "duration": "1 Minuto",
      "level": 1,
      "pathId": "combatente",
      "description": "Você energiza o seu corpo com uma energia carmesim, que logo punirá os seus alvos.\nAo atingir um Alvo com um Ataque Físico, você poderá utilizar essa habilidade para aplicar Penitente nesse mesmo Alvo. Esse efeito permanece por 1 minuto.\nAlvos afetado por esse efeito poderão realizar um teste de Espírito, Dif. 8, ao final dos seus turnos. Caso tenham sucesso, esse efeito será removido.\nPenitente: Caso realize uma Conjuração, você receberá o seu próprio total máximo de Pontos de Energia como Dano Imaterial. Esse efeito ocorre apenas uma vez por rodada.",
      "subEffects": [],
      "improvements": [
        {
          "title": "A) Penitência Maior",
          "description": "A dificuldade (Dif.) dos testes de Espírito dessa habilidade é aumentada em 2.",
          "active": false
        },
        {
          "title": "B) O Propósito",
          "description": "A Ação Rápida utilizada para realizar essa habilidade é transformada em uma Ação Acelerada.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_punicao_escarlate",
          "name": "Punição Escarlate",
          "description": "Ao atingir com Ataque Físico, gasta 1 PE para aplicar Penitente no Alvo por 1 minuto.",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoRapida",
            "category": "ataque_corpo_a_corpo",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": true,
            "status": "Penitente",
            "duration": "1 Minuto",
            "description": "Caso realize Conjuração, recebe o total máximo de PE como Dano Imaterial (1x/rodada)."
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 0,
            "unit": "m",
            "targetLimit": ""
          }
        },
        {
          "id": "act_dano_penitente",
          "name": "Dano Penitente",
          "description": "Causa o total máximo de PE do alvo como Dano Imaterial se ele realizar Conjuração.",
          "cost": "",
          "type": {
            "actionType": "",
            "category": "ataque_corpo_a_corpo",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "@energy.max",
            "type": "immaterial",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 0,
            "unit": "m",
            "targetLimit": ""
          }
        },
        {
          "id": "act_teste_espirito_resistir",
          "name": "Teste de Espírito (Resistir)",
          "description": "Teste de Espírito Dif. 8 no final dos turnos do alvo para remover o efeito.",
          "cost": "",
          "type": {
            "actionType": "",
            "category": "defesa",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "spirit",
            "difficulty": 8,
            "onSuccess": "Remove o efeito Penitente",
            "onFailure": "Permanece sob efeito Penitente"
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 0,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "ab00230000000000",
    "name": "Calor Da Batalha",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Calor Da Batalha.png",
    "folder": "fldhc00020000000",
    "_key": "!items!ab00230000000000",
    "system": {
      "name": "Calor Da Batalha",
      "category": "defensiva",
      "cost": "",
      "typeAction": "",
      "typeAbility": "habilidade",
      "types": [
        "iniciativa",
        "suporte"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Até o final do combate",
      "level": 1,
      "pathId": "combatente",
      "description": "Com um perigo eminente, você prepara o seu corpo para o combate.\nAo iniciar um combate, você recebe um valor de Pontos de Vida Temporários igual ao seu total máximo de Pontos de Energia. Esse valor é aumentado em 2 para cada ponto de Vigor. Caso não sejam removidos durante o combate, os Pontos de Vida Temporários concedidos por essa habilidade serão removidos no final do combate.\nAlém disso, você tem acesso à seguinte técnica ao utilizar essa habilidade:",
      "subEffects": [
        {
          "name": "Recuperar O Fôlego",
          "cost": "",
          "typeAction": "acaoSimples",
          "type": "suporte",
          "description": "Enquanto estiver em combate, você pode utilizar essa técnica para regenerar 1d4 Pontos de Vida e 1 Ponto de Energia. O valor de Pontos de Vida regenerados é aumentado em 1d4 para cada ponto de Vigor.\nEssa técnica só pode ser realizada uma vez por combate.",
          "note": "",
          "actions": [
            {
              "id": "act_recuperar_folego",
              "name": "Recuperar O Fôlego",
              "description": "Enquanto estiver em combate, você pode utilizar essa técnica para regenerar 1d4 Pontos de Vida e 1 Ponto de Energia. O valor de Pontos de Vida regenerados é aumentado em 1d4 para cada ponto de Vigor.\nEssa técnica só pode ser realizada uma vez por combate.",
              "cost": "",
              "type": {
                "actionType": "acaoSimples",
                "category": "suporte",
                "tags": []
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard",
                "defenseTarget": "evasion"
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
                "formula": "1d4",
                "type": "pv",
                "criticalBonus": "",
                "scaling": "+1d4 por ponto de Vigor"
              },
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 3,
                "unit": "m",
                "targetDisposition": "all",
                "targetLimit": ""
              }
            },
            {
              "id": "act_recuperar_pe",
              "name": "Recuperar Energia (PE)",
              "description": "Regenera 1 Ponto de Energia ao utilizar Recuperar o Fôlego.",
              "cost": "",
              "type": {
                "actionType": "",
                "category": "suporte",
                "tags": []
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard",
                "defenseTarget": "evasion"
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
                "formula": "1",
                "type": "pe",
                "criticalBonus": "",
                "scaling": ""
              },
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 3,
                "unit": "m",
                "targetDisposition": "all",
                "targetLimit": ""
              }
            },
            {
              "id": "act_recuperar_folego_aprimorado",
              "name": "Recuperar O Fôlego (Aprimorado: 1d6)",
              "description": "Com Técnica de Regeneração ativa: regenera 1d6 Pontos de Vida (+1d6 por ponto de Vigor) e 1 Ponto de Energia (1x por combate).",
              "cost": "",
              "type": {
                "actionType": "acaoSimples",
                "category": "suporte",
                "tags": []
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard",
                "defenseTarget": "evasion"
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
                "formula": "1d6",
                "type": "pv",
                "criticalBonus": "",
                "scaling": "+1d6 por ponto de Vigor"
              },
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 3,
                "unit": "m",
                "targetDisposition": "all",
                "targetLimit": ""
              }
            }
          ]
        }
      ],
      "improvements": [
        {
          "title": "A) Resistência Lendária de Neros",
          "description": "Você possui Aptidão em testes de Vigor.",
          "active": false
        },
        {
          "title": "B) Técnica de Regeneração",
          "description": "Aumente em 1 a Categoria de Dado da regeneração de Pontos de Vida de Recuperar o Fôlego.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_recuperar_folego",
          "name": "Recuperar O Fôlego",
          "description": "Enquanto estiver em combate, você pode utilizar essa técnica para regenerar 1d4 Pontos de Vida e 1 Ponto de Energia. O valor de Pontos de Vida regenerados é aumentado em 1d4 para cada ponto de Vigor.\nEssa técnica só pode ser realizada uma vez por combate.",
          "cost": "",
          "type": {
            "actionType": "acaoSimples",
            "category": "suporte",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard",
            "defenseTarget": "evasion"
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
            "formula": "1d4",
            "type": "pv",
            "criticalBonus": "",
            "scaling": "+1d4 por ponto de Vigor"
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetDisposition": "all",
            "targetLimit": ""
          }
        },
        {
          "id": "act_recuperar_pe",
          "name": "Recuperar Energia (PE)",
          "description": "Regenera 1 Ponto de Energia ao utilizar Recuperar o Fôlego.",
          "cost": "",
          "type": {
            "actionType": "",
            "category": "suporte",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard",
            "defenseTarget": "evasion"
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
            "formula": "1",
            "type": "pe",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetDisposition": "all",
            "targetLimit": ""
          }
        },
        {
          "id": "act_recuperar_folego_aprimorado",
          "name": "Recuperar O Fôlego (Aprimorado: 1d6)",
          "description": "Com Técnica de Regeneração ativa: regenera 1d6 Pontos de Vida (+1d6 por ponto de Vigor) e 1 Ponto de Energia (1x por combate).",
          "cost": "",
          "type": {
            "actionType": "acaoSimples",
            "category": "suporte",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard",
            "defenseTarget": "evasion"
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
            "formula": "1d6",
            "type": "pv",
            "criticalBonus": "",
            "scaling": "+1d6 por ponto de Vigor"
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetDisposition": "all",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "ab00240000000000",
    "name": "Técnicas Marciais",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Técnicas Marciais.png",
    "folder": "fldhc00020000000",
    "_key": "!items!ab00240000000000",
    "system": {
      "name": "Técnicas Marciais",
      "category": "ofensiva",
      "cost": "1 PE",
      "typeAction": "acaoRapida",
      "typeAbility": "habilidade",
      "types": [
        "ataque_corpo_a_corpo"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "1 metro",
      "duration": "Instantânea",
      "level": 1,
      "pathId": "combatente",
      "description": "Você consegue identificar o momento perfeito para encaixar uma técnica no seu oponente.\nApós atingir um Alvo a até 1 metro com um Ataque Físico vindo de um Ataque Desarmado, Armamento Leve ou Armamento Pesado, você poderá utilizar essa habilidade para realizar imediatamente uma Manobra de Combate contra esse mesmo Alvo, sem custo de Ação Ativa. Caso esse Ataque Físico seja com dois Armamentos ou Ataques Desarmados, a Manobra de Combate deverá ser realizada após o segundo golpe.\nCaso você utilize essa habilidade após atingir um Alvo com um Ataque Desarmado, você receberá Aptidão no teste de Parâmetro para aplicar a Manobra de Combate.",
      "subEffects": [],
      "improvements": [
        {
          "title": "A) Fluidez de Combate",
          "description": "Remove o custo de PE dessa habilidade.",
          "active": false
        },
        {
          "title": "B) Perito em Manobras",
          "description": "Transforma a Aptidão dessa habilidade em Aptidão Aprimorada.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_tecnicas_marciais",
          "name": "Técnicas Marciais",
          "description": "Após atingir com Ataque Físico (Desarmado, Leve ou Pesado), realiza Manobra de Combate sem custo de Ação Ativa (+Aptidão se Desarmado).",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoRapida",
            "category": "ataque_corpo_a_corpo",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 1,
            "unit": "m",
            "targetLimit": "1"
          }
        }
      ]
    }
  },
  {
    "_id": "ab00250000000000",
    "name": "Perito Com Equipamentos Defensivos",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Perito Com Equipamentos Defensivos.png",
    "folder": "fldhc00020000000",
    "_key": "!items!ab00250000000000",
    "system": {
      "name": "Perito Com Equipamentos Defensivos",
      "category": "defensiva",
      "cost": "",
      "typeAction": "",
      "typeAbility": "habilidade",
      "types": [
        "passiva",
        "defesa"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Passiva",
      "level": 1,
      "pathId": "combatente",
      "description": "Você agora se torna imparável com os seus equipamentos defensivos.\nVocê não é mais afetado por Inaptidões vindas de Armaduras.\nVocê ainda recebe Inaptidão em testes de Parâmetros, caso não possua o valor de Vigor necessário para equipar uma Armadura.\nAlém disso, ao adquirir essa habilidade você receberá as seguintes técnicas, enquanto estiver utilizando um Escudo:",
      "subEffects": [
        {
          "name": "Postura Defensiva",
          "cost": "",
          "typeAction": "acaoSimples",
          "type": "defesa",
          "description": "Você adota uma postura defensiva até o início do seu próximo turno, recebendo +1 de Bloqueio, além de não ser afetado por efeitos que o deslocariam involuntariamente. Enquanto estiver com esse efeito, você possui Inaptidão em todo teste de Precisão.",
          "note": "",
          "actions": [
            {
              "id": "act_postura_defensiva",
              "name": "Postura Defensiva",
              "description": "Adota postura defensiva até início do próximo turno: +1 de Bloqueio e imune a deslocamento involuntário. Inaptidão em testes de Precisão.",
              "cost": "",
              "type": {
                "actionType": "acaoSimples",
                "category": "defesa",
                "tags": []
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard",
                "defenseTarget": "evasion"
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
                "status": "Postura Defensiva (+1 Bloqueio)",
                "duration": "Até início do próximo turno",
                "description": "+1 Bloqueio, imune a deslocamento involuntário, Inaptidão em Precisão."
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 3,
                "unit": "m",
                "targetDisposition": "all",
                "targetLimit": ""
              }
            }
          ]
        },
        {
          "name": "Proteger",
          "cost": "1 PE",
          "typeAction": "acaoRapida",
          "type": "defesa",
          "description": "Quando um Alvo Inimigo realizar um Ataque Físico ou Ataque Mágico contra um Alvo que não seja você, e você estiver a até 1 metro desse Alvo Inimigo ou do Alvo que está sendo atacado, você poderá utilizar essa técnica para ser o Alvo do ataque.",
          "note": "",
          "actions": [
            {
              "id": "act_proteger",
              "name": "Proteger",
              "description": "Quando um inimigo realizar Ataque Físico ou Mágico contra um aliado a até 1m de você ou do inimigo, intercepta e se torna o alvo do ataque.",
              "cost": "1 PE",
              "type": {
                "actionType": "acaoRapida",
                "category": "defesa",
                "tags": [
                  "reacao"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard",
                "defenseTarget": "evasion"
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
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 1,
                "unit": "m",
                "targetDisposition": "friendly",
                "targetLimit": "1"
              }
            }
          ]
        }
      ],
      "improvements": [
        {
          "title": "A) Treinamento de Ferro",
          "description": "Você não é afetado por Caído. Além disso, enquanto estiver equipado com um Escudo, a diferença necessária para você receber um Acerto Crítico é aumentada em 2.",
          "active": false
        },
        {
          "title": "B) Escudeiro",
          "description": "Caso você já tenha utilizado Proteger em uma rodada, você poderá utilizar essa técnica uma segunda vez nessa mesma rodada.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_postura_defensiva",
          "name": "Postura Defensiva",
          "description": "Adota postura defensiva até início do próximo turno: +1 de Bloqueio e imune a deslocamento involuntário. Inaptidão em testes de Precisão.",
          "cost": "",
          "type": {
            "actionType": "acaoSimples",
            "category": "defesa",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard",
            "defenseTarget": "evasion"
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
            "status": "Postura Defensiva (+1 Bloqueio)",
            "duration": "Até início do próximo turno",
            "description": "+1 Bloqueio, imune a deslocamento involuntário, Inaptidão em Precisão."
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetDisposition": "all",
            "targetLimit": ""
          }
        },
        {
          "id": "act_proteger",
          "name": "Proteger",
          "description": "Quando um inimigo realizar Ataque Físico ou Mágico contra um aliado a até 1m de você ou do inimigo, intercepta e se torna o alvo do ataque.",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoRapida",
            "category": "defesa",
            "tags": [
              "reacao"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard",
            "defenseTarget": "evasion"
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
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 1,
            "unit": "m",
            "targetDisposition": "friendly",
            "targetLimit": "1"
          }
        }
      ]
    }
  },
  {
    "_id": "ab00280000000000",
    "name": "Lampejo Celestial",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Lampejo Celestial.png",
    "folder": "fldhc00030000000",
    "_key": "!items!ab00280000000000",
    "system": {
      "name": "Lampejo Celestial",
      "category": "ofensiva",
      "cost": "",
      "typeAction": "",
      "typeAbility": "habilidade",
      "types": [
        "conjuracao"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 Metros",
      "duration": "Até o final do turno dos Alvos",
      "level": 1,
      "pathId": "devoto",
      "description": "Após ferir um alvo, uma pequena luz cai sobre ele: um aviso dos seres de Ofir.\nCaso você atinja um Alvo com um Ataque Físico ou Ataque Mágico, e o Resultado Natural (Precisão ou Canalização) d o ataque tenha sido 10, ou mais, você aumentará o seu dano em um valor igual à metade do seu total máximo de Pontos de Energia como Dano Mágico de Luz.\nEsse efeito ocorre apenas uma vez por turno.",
      "subEffects": [],
      "improvements": [
        {
          "title": "A) Favor de Ofir",
          "description": "O efeito des sa habilidade passa a ser realizado com um Resultado Natural de 8.",
          "active": false
        },
        {
          "title": "B) Dádiva Celestial",
          "description": "Ao final de um turno no qual você tenha causado um Dano Mágico de Luz a um Alvo, você regenerará um valor de Pontos de Vida equivalente ao dobro do seu total de pontos de Espírito. Esse efeito ocorre apenas uma vez por turno.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_2eb7878b1809",
          "name": "Dano de Lampejo Celestial",
          "description": "Ao acertar ataque com d12 natural 10+, causa metade do PE máx como Dano Mágico de Luz (1x por turno).",
          "cost": "",
          "type": {
            "actionType": "",
            "category": "conjuracao",
            "tags": [
              "conjuracao"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "Math.floor(@energy.max / 2)",
            "type": "light",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
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
    "_id": "ab00290000000000",
    "name": "Poder Abissal",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Poder Abissal.png",
    "folder": "fldhc00030000000",
    "_key": "!items!ab00290000000000",
    "system": {
      "name": "Poder Abissal",
      "category": "ofensiva",
      "cost": "2 PE",
      "typeAction": "acaoAtiva",
      "typeAbility": "habilidade",
      "types": [
        "conjuracao",
        "foco"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 Metros",
      "duration": "Até passar no teste de Espírito",
      "level": 1,
      "pathId": "devoto",
      "description": "Linhas sombrias cortam o ar rumo ao inimigo, determinadas a feri-lo.\nVocê aplica a força do Abismo sobre um Alvo a até 6 metros, forçando-o a realizar um teste de Espírito, Dif. 8. Caso falhe, o Alvo receberá o seu total máximo de Pontos de Energia como Dano Mágico de Trevas. Esse dano será aplicado novamente nesse mesmo Alvo sempre que você iniciar o seu turno enquanto estiver com esse Foco.\nAlvos afetados por esse dano poderão realizar um teste de Espírito, Dif. 8, no final dos seus turnos. Caso tenham sucesso, esse Foco será removido.",
      "subEffects": [],
      "improvements": [
        {
          "title": "A) Peso Abissal",
          "description": "A dificuldade ( Dif.) do s testes de Espírito dessa habilidade é aumentada em 2.",
          "active": false
        },
        {
          "title": "B) Influência Sombria",
          "description": "Os testes de Espírito dessa habilidade possuem Inaptidão.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_b56358545fba",
          "name": "Invocar Poder Abissal",
          "description": "Força alvo a até 6m a teste de Espírito Dif. 8. Falha: recebe total de PE máximo como Dano de Trevas no início de cada turno com Foco.",
          "cost": "2 PE",
          "type": {
            "actionType": "acaoAtiva",
            "category": "conjuracao",
            "tags": [
              "conjuracao",
              "foco"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "@energy.max",
            "type": "dark",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "spirit",
            "difficulty": 8,
            "onSuccess": "Evita o dano e encerra o Foco",
            "onFailure": "Recebe o total máximo de PE como Dano Mágico de Trevas"
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        },
        {
          "id": "act_20aa2aae986d",
          "name": "Teste de Espírito (Resistir)",
          "description": "Teste de Espírito Dif. 8 no final dos turnos do alvo para remover o Foco.",
          "cost": "",
          "type": {
            "actionType": "",
            "category": "defesa",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "spirit",
            "difficulty": 8,
            "onSuccess": "Remove o Foco da habilidade",
            "onFailure": "Permanece sob efeito do Poder Abissal"
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
    "_id": "ab00300000000000",
    "name": "Barreira Protetora",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Barreira Protetora.png",
    "folder": "fldhc00030000000",
    "_key": "!items!ab00300000000000",
    "system": {
      "name": "Barreira Protetora",
      "category": "defensiva",
      "cost": "1 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "habilidade",
      "types": [
        "conjuracao"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 Metros",
      "duration": "Até o final do combate",
      "level": 1,
      "pathId": "devoto",
      "description": "Linhas de energia envolvem e protegem um alvo próximo.\nVocê reveste o Véu de um Alvo até 6 metros, concedendo 1d4 Pontos de Vida Temporários a este Alvo. Esse valor é aumentado em 1d4 para cada ponto de Espírito.\nMetade desse valor é Maximizado caso o Alvo dessa habilidade esteja com menos da metade do seu próprio total máximo de Pontos de Vida.",
      "subEffects": [],
      "improvements": [
        {
          "title": "A) Barreira Vinculada",
          "description": "Você recebe metade do valor de Pontos de Vida Temporários concedidos pela habilidade ao utilizar em um Alvo que não seja você. Esse efeito ocorre apenas uma vez por turno.",
          "active": false
        },
        {
          "title": "B) Proteção Célere",
          "description": "A Ação Simples utilizada para realizar essa habilidade é transformada em uma Ação Acelerada.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_480a2ede61d9",
          "name": "Barreira Protetora",
          "description": "Concede 1d4 PVT (+1d4 por ponto de Espírito) a alvo a até 6 metros. Metade maximizada se alvo < 50% PV.",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "conjuracao",
            "tags": [
              "conjuracao"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "1d4",
            "type": "light",
            "criticalBonus": "",
            "scaling": "+1d4 por ponto de Espírito"
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
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
    "_id": "ab00310000000000",
    "name": "Aspecto Da Grandeza",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Aspecto Da Grandeza.png",
    "folder": "fldhc00030000000",
    "_key": "!items!ab00310000000000",
    "system": {
      "name": "Aspecto Da Grandeza",
      "category": "auxiliadora",
      "cost": "",
      "typeAction": "",
      "typeAbility": "habilidade",
      "types": [
        "iniciativa",
        "conjuracao"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 Metros",
      "duration": "Até o final do combate",
      "level": 1,
      "pathId": "devoto",
      "description": "Você eleva o Véu de um aliado, criando novas oportunidades.\nVocê aplica es se Efeito Positivo em um Alvo a até 6 metros, de modo que, até o final desse combate, o primeiro dano ou regeneração de Pontos de Vida realizado pelo Alvo durante uma rodada seja aumentado em um valor igual ao seu total de pontos de Espírito + 1. Esse efeito não afeta Poções.",
      "subEffects": [],
      "improvements": [
        {
          "title": "A) Aperfeiçoar Aspecto",
          "description": "O dano ou regeneração de Pontos de Vida afetado por essa habilidade não pode ser reduzido por outros efeitos. Além disso, você pode utilizar essa habilidade mesmo que já tenha utilizado duas habilidades de Iniciativa.",
          "active": false
        },
        {
          "title": "B) Exalar Grandeza",
          "description": "Aumenta em 1 o número de Alvos dessa habilidade. Es se valor é aumentado em 1 para cada 3 pontos de Espírito que você possua.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_1d25181c2184",
          "name": "Abençoar Alvo",
          "description": "No início do combate, concede Efeito Positivo a até 6m: primeiro dano ou cura da rodada aumentado em Espírito + 1.",
          "cost": "",
          "type": {
            "actionType": "",
            "category": "conjuracao",
            "tags": [
              "conjuracao"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": true,
            "status": "Aspecto da Grandeza",
            "duration": "Até o fim do combate",
            "description": "Primeiro dano ou cura de cada rodada aumentado em Espírito + 1."
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        },
        {
          "id": "act_82c17921546a",
          "name": "Bônus de Dano/Cura",
          "description": "Adiciona Espírito + 1 ao primeiro dano ou cura da rodada.",
          "cost": "",
          "type": {
            "actionType": "",
            "category": "conjuracao",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "@parameters.spirit.value + 1",
            "type": "light",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
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
    "_id": "ab00320000000000",
    "name": "Bênção Radiante",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Bênção Radiante.png",
    "folder": "fldhc00030000000",
    "_key": "!items!ab00320000000000",
    "system": {
      "name": "Bênção Radiante",
      "category": "auxiliadora",
      "cost": "2 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "habilidade",
      "types": [
        "conjuracao",
        "foco"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 Metros",
      "duration": "1 Minuto",
      "level": 1,
      "pathId": "devoto",
      "description": "Uma marca radiante surge num alvo aliado, protegendo-o.\nVocê aplica es se Efeito Positivo em um Alvo Aliado a até 6 metros, de modo que, caso esse Alvo Aliado receba qualquer tipo de dano, o Alvo que causou o dano receb a a metade do total máximo de Pontos de Energia do Alvo que aplicou esse Efeito Positivo como Dano Mágico de Luz. Esse efeito ocorre apenas uma vez por turno, por Alvo.",
      "subEffects": [],
      "improvements": [
        {
          "title": "A) Ensinamentos Radiantes",
          "description": "A Ação Simples utilizada para realizar essa habilidade é transformada em uma Ação Acelerada.",
          "active": false
        },
        {
          "title": "B) Fortalecer Bênção",
          "description": "O Foco dessa habilidade não pode ser removido por Alvos Inimigos, nem por Atordoado. Além disso, reduz em 1 o custo de PE dessa habilidade.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_83affe531d90",
          "name": "Aplicar Bênção Radiante",
          "description": "Aplica em aliado a até 6 metros. Se receber dano, agressor sofre retaliação de Luz.",
          "cost": "2 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "suporte",
            "tags": [
              "conjuracao",
              "foco"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": true,
            "status": "Bênção Radiante",
            "duration": "1 Minuto",
            "description": "Ao sofrer dano, retalia metade do PE máximo do aplicador como Luz."
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        },
        {
          "id": "act_12d7d0ed03ad",
          "name": "Retaliação de Luz",
          "description": "Causa metade do total máximo de PE como Dano Mágico de Luz ao agressor.",
          "cost": "",
          "type": {
            "actionType": "",
            "category": "conjuracao",
            "tags": [
              "conjuracao"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "Math.floor(@energy.max / 2)",
            "type": "light",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
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
    "_id": "ab00330000000000",
    "name": "Centelha De Édona",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Centelha De Édona.png",
    "folder": "fldhc00030000000",
    "_key": "!items!ab00330000000000",
    "system": {
      "name": "Centelha De Édona",
      "category": "auxiliadora",
      "cost": "2 PE",
      "typeAction": "acaoAtiva",
      "typeAbility": "habilidade",
      "types": [
        "conjuracao",
        "suporte"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 Metros",
      "duration": "1 Minuto",
      "level": 1,
      "pathId": "devoto",
      "description": "Você cria uma pequena mandala mística com um dos símbolos divinos de Édona sobre um alvo, bonificando-o com uma centelha do poder dos Deuses de Édona.\nVocê aplica, em um Alvo a até 6 metros, esse Efeito Positivo, escolhendo uma das Centelhas a seguir:\nCom uma Ação Rápida e 1 Ponto de Energia, você pode trocar o efeito de Centelha de um Alvo a até 6 metros que possua esse Efeito Positivo aplicado por você. A duração dessa habilidade não é reiniciada ao utilizar esse efeito.",
      "subEffects": [
        {
          "name": "Centelha Da Balança",
          "cost": "2 PE",
          "typeAction": "acaoAtiva",
          "type": "suporte",
          "description": "Os seus Parâmetros não poderão ser reduzidos por Habilidades de Caminho e Características. Caso os seus Parâmetros possuam alguma redução ao receber esse Efeito Positivo, essa redução é removida.\nOs efeitos das suas Habilidades de Caminho não podem ser interrompidos ou anulados por nenhum efeito de Habilidade de Caminho ou Características.",
          "note": "",
          "actions": [
            {
              "id": "act_centelha_balanca",
              "name": "Centelha Da Balança",
              "description": "Aplica Efeito Positivo a até 6m: Parâmetros não podem ser reduzidos; reduções ativas são removidas. Habilidades não podem ser anuladas/interrompidas.",
              "cost": "2 PE",
              "type": {
                "actionType": "acaoAtiva",
                "category": "suporte",
                "tags": [
                  "conjuracao"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "spirit",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard",
                "defenseTarget": "evasion"
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
                "status": "Centelha da Balança",
                "duration": "Até fim do combate",
                "description": "Parâmetros imunes a redução; habilidades imunes a anulação/interrupção."
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 6,
                "unit": "m",
                "targetDisposition": "friendly",
                "targetLimit": "1"
              }
            }
          ]
        },
        {
          "name": "Centelha Da Ordem",
          "cost": "2 PE",
          "typeAction": "acaoAtiva",
          "type": "suporte",
          "description": "A primeira regeneração de Pontos de Vida que você receber durante uma rodada é aumentada em 1.\nO primeiro dano que você receber durante uma rodada é reduzido em 1.\nEsses valores são aumentados em 1 para cada ponto de Espírito do Alvo que aplicou esse Efeito Positivo.",
          "note": "",
          "actions": [
            {
              "id": "act_centelha_ordem",
              "name": "Centelha Da Ordem",
              "description": "Aplica Efeito Positivo a até 6m: 1ª cura recebida na rodada aumentada em 1 (+Espírito); 1º dano recebido reduzido em 1 (+Espírito).",
              "cost": "2 PE",
              "type": {
                "actionType": "acaoAtiva",
                "category": "suporte",
                "tags": [
                  "conjuracao"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "spirit",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard",
                "defenseTarget": "evasion"
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
                "status": "Centelha da Ordem",
                "duration": "Até fim do combate",
                "description": "1ª cura +1 (+Espírito); 1º dano recebido -1 (-Espírito)."
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 6,
                "unit": "m",
                "targetDisposition": "friendly",
                "targetLimit": "1"
              }
            }
          ]
        },
        {
          "name": "Centelha Do Caos",
          "cost": "2 PE",
          "typeAction": "acaoAtiva",
          "type": "suporte",
          "description": "O primeiro dano que você causar durante uma rodada é aumentado em 1.\nNo final de um turno que você tenha recebido qualquer tipo de dano nos seus Pontos de Vida, o Alvo que lhe causou esse dano receberá 1 de Dano Imaterial. Esse efeito ocorre apenas uma vez por rodada.\nEsses valores são aumentados em 1 para cada ponto de Espírito do Alvo que aplicou esse Efeito Positivo.",
          "note": "",
          "actions": [
            {
              "id": "act_centelha_caos",
              "name": "Centelha Do Caos",
              "description": "Aplica Efeito Positivo a até 6m: 1º dano causado na rodada aumentado em 1 (+Espírito); ao sofrer dano em PV, agressor sofre 1 (+Espírito) Dano Imaterial (1x/rodada).",
              "cost": "2 PE",
              "type": {
                "actionType": "acaoAtiva",
                "category": "suporte",
                "tags": [
                  "conjuracao"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "spirit",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard",
                "defenseTarget": "evasion"
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
                "status": "Centelha do Caos",
                "duration": "Até fim do combate",
                "description": "1º dano causado +1 (+Espírito); retaliação de 1 (+Espírito) Dano Imaterial ao sofrer dano em PV."
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 6,
                "unit": "m",
                "targetDisposition": "friendly",
                "targetLimit": "1"
              }
            }
          ]
        }
      ],
      "improvements": [
        {
          "title": "A) Presente Divino",
          "description": "Alvos podem ser afetados por esse Efeito Positivo mais de uma vez, mesmo que já possuam esse Efeito Positivo. Um Alvo só pode ser afetado por um mesmo efeito de Centelha por vez.",
          "active": false
        },
        {
          "title": "B) Receptáculo de Édona",
          "description": "Sempre que você aplicar esse Efeito Positivo em um Alvo, você também receberá esse Efeito Positivo, podendo escolher o seu efeito de Centelha. Caso você já possua esse Efeito Positivo, você poderá trocar o seu efeito de Centelha.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_centelha_balanca",
          "name": "Centelha Da Balança",
          "description": "Aplica Efeito Positivo a até 6m: Parâmetros não podem ser reduzidos; reduções ativas são removidas. Habilidades não podem ser anuladas/interrompidas.",
          "cost": "2 PE",
          "type": {
            "actionType": "acaoAtiva",
            "category": "suporte",
            "tags": [
              "conjuracao"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "spirit",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard",
            "defenseTarget": "evasion"
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
            "status": "Centelha da Balança",
            "duration": "Até fim do combate",
            "description": "Parâmetros imunes a redução; habilidades imunes a anulação/interrupção."
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 6,
            "unit": "m",
            "targetDisposition": "friendly",
            "targetLimit": "1"
          }
        },
        {
          "id": "act_centelha_ordem",
          "name": "Centelha Da Ordem",
          "description": "Aplica Efeito Positivo a até 6m: 1ª cura recebida na rodada aumentada em 1 (+Espírito); 1º dano recebido reduzido em 1 (+Espírito).",
          "cost": "2 PE",
          "type": {
            "actionType": "acaoAtiva",
            "category": "suporte",
            "tags": [
              "conjuracao"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "spirit",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard",
            "defenseTarget": "evasion"
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
            "status": "Centelha da Ordem",
            "duration": "Até fim do combate",
            "description": "1ª cura +1 (+Espírito); 1º dano recebido -1 (-Espírito)."
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 6,
            "unit": "m",
            "targetDisposition": "friendly",
            "targetLimit": "1"
          }
        },
        {
          "id": "act_centelha_caos",
          "name": "Centelha Do Caos",
          "description": "Aplica Efeito Positivo a até 6m: 1º dano causado na rodada aumentado em 1 (+Espírito); ao sofrer dano em PV, agressor sofre 1 (+Espírito) Dano Imaterial (1x/rodada).",
          "cost": "2 PE",
          "type": {
            "actionType": "acaoAtiva",
            "category": "suporte",
            "tags": [
              "conjuracao"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "spirit",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard",
            "defenseTarget": "evasion"
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
            "status": "Centelha do Caos",
            "duration": "Até fim do combate",
            "description": "1º dano causado +1 (+Espírito); retaliação de 1 (+Espírito) Dano Imaterial ao sofrer dano em PV."
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 6,
            "unit": "m",
            "targetDisposition": "friendly",
            "targetLimit": "1"
          }
        },
        {
          "id": "act_trocar_centelha",
          "name": "Trocar Centelha",
          "description": "Com uma Ação Rápida e 1 PE, troca o efeito de Centelha de um alvo a até 6 metros que possua esse Efeito Positivo aplicado por você.",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoRapida",
            "category": "suporte",
            "tags": [
              "conjuracao"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "spirit",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard",
            "defenseTarget": "evasion"
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
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 6,
            "unit": "m",
            "targetDisposition": "friendly",
            "targetLimit": "1"
          }
        }
      ]
    }
  },
  {
    "_id": "ab00331000000000",
    "name": "Dádiva De Édona",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Dádiva De Édona.png",
    "folder": "fldhc00030000000",
    "_key": "!items!ab00331000000000",
    "system": {
      "name": "Dádiva De Édona",
      "category": "auxiliadora",
      "cost": "",
      "typeAction": "",
      "typeAbility": "habilidade",
      "types": [
        "passiva",
        "suporte"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Até o próximo Repouso Completo",
      "level": 1,
      "pathId": "devoto",
      "description": "Édona vela por você — acredite, os deuses estão mais próximos do que se imagina.\nAo concluir um Repouso Completo, você é agraciado pelas forças que emergem do plano da Balança, da Ordem ou do Caos, recebendo um dos seguintes efeitos à sua escolha, até o seu próximo Repouso Completo:",
      "subEffects": [
        {
          "name": "Balança",
          "cost": "",
          "typeAction": "",
          "type": "suporte",
          "description": "Ao ter sucesso em um teste de Parâmetro contra um Alvo, este mesmo Alvo receberá -1 no seu próximo teste de Parâmetro. Esse efeito não acumula, mesmo vindo de fontes diferentes.",
          "note": "",
          "actions": []
        },
        {
          "name": "Ordem",
          "cost": "",
          "typeAction": "",
          "type": "suporte",
          "description": "O seu primeiro custo de Pontos de Energia em uma rodada é reduzido em 1. Além disso, você é imune a efeitos de Alvos Inimigos que removam os seus Pontos de Energia. Você ainda é afetado por Envenenado.",
          "note": "",
          "actions": []
        },
        {
          "name": "Caos",
          "cost": "",
          "typeAction": "",
          "type": "suporte",
          "description": "Ao causar qualquer tipo de dano em um Alvo, você fará com que, até o final do próximo turno desse Alvo, todo custo de PE do Alvo seja aumentado em 1. Esse efeito não acumula, mesmo vindo de fontes diferentes.",
          "note": "",
          "actions": []
        }
      ],
      "improvements": [
        {
          "title": "A) Ampliar Dádiva",
          "description": "O efeito concedido por essa habilidade agora pode ocorrer a cada Repouso, ao invés de um Repouso Completo. Somente um dos efeitos dessa habilidade pode ser mantido até o seu próximo Repouso Completo.",
          "active": false
        },
        {
          "title": "B) Abraçar o Panteão",
          "description": "Você recebe um efeito adicional ao ser afetado por essa habilidade.",
          "active": false
        }
      ],
      "actions": []
    }
  },
  {
    "_id": "ab00340000000000",
    "name": "Elo Espiritual",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Elo Espiritual.png",
    "folder": "fldhc00030000000",
    "_key": "!items!ab00340000000000",
    "system": {
      "name": "Elo Espiritual",
      "category": "auxiliadora",
      "cost": "2 PE",
      "typeAction": "acaoAtiva",
      "typeAbility": "habilidade",
      "types": [
        "conjuracao",
        "foco"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 Metros",
      "duration": "1 Minuto",
      "level": 1,
      "pathId": "devoto",
      "description": "Você condensa o seu Véu, conectando-o temporariamente a outro ser.\nVocê aplica es se Efeito Positivo em um Alvo Aliado a até 6 metros que não seja você, concedendo a ele 2 Pontos de Energia Temporários.\nEnquanto estiver com es se Efeito Positivo, sempre que o Alvo Aliado realizar um teste de Espírito a até 6 metros, você poderá utilizar a sua Ação Rápida para substituir o total de pontos de Espírito do Alvo Aliado pelo seu total de pontos de Espírito até o final do turno.\nAo perder es se Efeito Positivo, o Alvo Aliado também perde os Pontos de Energia Temporários gerados por essa habilidade, caso não sejam utilizados.",
      "subEffects": [],
      "improvements": [
        {
          "title": "A) Conexão Célere",
          "description": "A Ação Ativa utilizada para realizar essa habilidade é transformada em uma Ação Acelerada.",
          "active": false
        },
        {
          "title": "B) Lampejo Espiritual",
          "description": "Caso você já tenha utilizado a Ação Rápida do efeito dessa habilidade em uma rodada, você poderá utilizá-lo uma segunda vez nessa mesma rodada.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_9909eec6c757",
          "name": "Vincular Elo",
          "description": "Concede 2 Pontos de Energia Temporários a um aliado a até 6 metros.",
          "cost": "2 PE",
          "type": {
            "actionType": "acaoAtiva",
            "category": "suporte",
            "tags": [
              "conjuracao",
              "foco"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": true,
            "status": "Elo Espiritual",
            "duration": "1 Minuto",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
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
    "_id": "ab00350000000000",
    "name": "Revitalizar",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Revitalizar.png",
    "folder": "fldhc00030000000",
    "_key": "!items!ab00350000000000",
    "system": {
      "name": "Revitalizar",
      "category": "auxiliadora",
      "cost": "1 PE",
      "typeAction": "acaoAtiva",
      "typeAbility": "habilidade",
      "types": [
        "conjuracao",
        "suporte"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "8 Metros",
      "duration": "Instantânea",
      "level": 1,
      "pathId": "devoto",
      "description": "Com um toque místico, você cicatriza os ferimentos do alvo.\nVocê regenera 1d6 Ponto de Vida de um Alvo a até 8 metros. Esse valor é aumentado em 1d6 para cada ponto de Espírito.\nAo regenerar os Pontos de Vida de um Alvo com essa habilidade, você também poderá utilizar o seguinte efeito:",
      "subEffects": [
        {
          "name": "Consagrar",
          "cost": "2 PE",
          "typeAction": "livre",
          "type": "suporte",
          "description": "Remova desse mesmo Alvo: Sangramento ou Envenenado.\nConsagrar só pode ser utilizado uma vez por turno.",
          "note": "",
          "actions": [
            {
              "id": "act_consagrar",
              "name": "Consagrar",
              "description": "Ao regenerar PV com Revitalizar, remove do mesmo alvo a condição Sangramento ou Envenenado (1x por turno).",
              "cost": "2 PE",
              "type": {
                "actionType": "",
                "category": "suporte",
                "tags": [
                  "conjuracao"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard",
                "defenseTarget": "evasion"
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
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 8,
                "unit": "m",
                "targetDisposition": "friendly",
                "targetLimit": "1"
              }
            }
          ]
        }
      ],
      "improvements": [
        {
          "title": "A) Toque Vital",
          "description": "Após rolar os dados de regeneração de Pontos de Vida dessa habilidade, você poderá selecionar quantos dados quiser para rolá-los novamente, ficando com os novos resultados. Esse efeito só poderá ser realizado uma vez por turno.",
          "active": false
        },
        {
          "title": "B) Purificador",
          "description": "Reduz em 1 o custo de PE de Consagrar.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_c5576dc741d3",
          "name": "Revitalizar (Cura)",
          "description": "Regenera 1d6 PV (+1d6 por ponto de Espírito) de um alvo a até 8 metros.",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoAtiva",
            "category": "conjuracao",
            "tags": [
              "conjuracao"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          },
          "healing": {
            "hasHealing": true,
            "formula": "1d6",
            "type": "pv",
            "criticalBonus": "",
            "scaling": "+1d6 por ponto de Espírito"
          }
        },
        {
          "id": "act_consagrar",
          "name": "Consagrar",
          "description": "Ao regenerar PV com Revitalizar, remove do mesmo alvo a condição Sangramento ou Envenenado (1x por turno).",
          "cost": "2 PE",
          "type": {
            "actionType": "",
            "category": "suporte",
            "tags": [
              "conjuracao"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard",
            "defenseTarget": "evasion"
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
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 8,
            "unit": "m",
            "targetDisposition": "friendly",
            "targetLimit": "1"
          }
        }
      ]
    }
  },
  {
    "_id": "ab00370000000000",
    "name": "Presente Do Abismo",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Presente Do Abismo.png",
    "folder": "fldhc00030000000",
    "_key": "!items!ab00370000000000",
    "system": {
      "name": "Presente Do Abismo",
      "category": "auxiliadora",
      "cost": "2 PE",
      "typeAction": "acaoRapida",
      "typeAbility": "habilidade",
      "types": [
        "conjuracao"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 Metros",
      "duration": "Instantânea",
      "level": 1,
      "pathId": "devoto",
      "description": "Você aceita o favor do Abismo e, com isso, um grande poder é direcionado a um alvo.\nCaso um Alvo a até 6 metros cause um dano, ou regeneração de Pontos de Vida, com dados a serem rolados, antes da rolagem desses dados, você poderá utilizar essa habilidade para Maximizar metade des ses dados. Caso esse dano, ou regeneração de Pontos de Vida, possua diferentes tipos de dado a serem rolados, você poderá escolher os da dos afetados pelo efeito.\nCaso um dano ou regeneração de Pontos de Vida afetado por essa habilidade não possua nenhum dado a ser rolado, você aumentará o valor desse dano, ou regeneração de Pontos de Vida, em um valor igual à metade do seu total máximo de Pontos de Energia.\nOs efeitos dessa habilidade não afetam Poções.\nOs efeitos dessa habilidade não acumulam, mesmo vindos de fontes diferentes.",
      "subEffects": [],
      "improvements": [
        {
          "title": "A) Escolhido das Trevas",
          "description": "Caso você já tenha utilizado essa habilidade em uma rodada, você poderá utilizá-la uma segunda vez nessa mesma rodada.",
          "active": false
        },
        {
          "title": "B) Sinergia Abissal",
          "description": "Ao utilizar esta habilidade em um Alvo que não seja você, o seu próximo dano ou regeneração de Pontos de Vida a até 1 minuto é afetado pelo efeito dessa habilidade. Esse efeito não acumula.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_80cc3f536db3",
          "name": "Aumento de Dano/Cura Fixo",
          "description": "Aumenta o dano ou cura em metade do total máximo de PE (caso não role dados).",
          "cost": "2 PE",
          "type": {
            "actionType": "acaoRapida",
            "category": "conjuracao",
            "tags": [
              "conjuracao"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "Math.floor(@energy.max / 2)",
            "type": "dark",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
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
    "_id": "ab00380000000000",
    "name": "Esfera Espiral Soberana",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Esfera Espiral Soberana.png",
    "folder": "fldhc00040000000",
    "_key": "!items!ab00380000000000",
    "system": {
      "name": "Esfera Espiral Soberana",
      "category": "ofensiva",
      "cost": "2 PE",
      "typeAction": "acaoAtiva",
      "typeAbility": "habilidade",
      "types": [
        "conjuracao"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "8 Metros",
      "duration": "Instantânea",
      "level": 1,
      "pathId": "feiticeiro",
      "description": "Você canaliza poder arcano bruto nas suas mãos, que logo é moldado numa grande esfera de energia destrutiva.\nVocê canaliza uma explosão mística, centrada em um ponto a até 8 metros. Todo Alvo a até 3 metros da explosão recebe 1d8 de Dano Mágico Neutro. Esse valor é aumentado em 1d8 para cada ponto de Arcanismo.\nAlvos dentro do alcance dessa explosão devem realizar um teste de Agilidade, Dif. 8. Caso tenham sucesso, receberão metade do dano causado pela habilidade.",
      "subEffects": [],
      "improvements": [
        {
          "title": "A) Destruição Arcana",
          "description": "A dificuldade (Dif.) do teste de Agilidade dessa habilidade é aumentada em 2.",
          "active": false
        },
        {
          "title": "B) Perfurar os Céus",
          "description": "Aumente em 1 a Categoria de Dado do dano causado por essa habilidade. EXPLOSÃO DE SANGUE X PV | Ação Ativa | Conjuração Você cria um símbolo desconhecido no corpo de um alvo, destruindo-o de dentro para fora. Você ferve o sangue de um Alvo a até 6 metros, forçando-o a um teste de Vigor, Dif. 8. Caso falhe, o Alvo receberá 1d8 de Dano Imaterial. Esse valor é aumentado em 1d8 para cada ponto de Arcanismo. Caso o Resultado Natural (Vigor) des se Alvo tenha sido 6, ou menos, e o Alvo tenha falhado no teste de Vigor, o Alvo será afetado por Sangramento por 1 hora. Além disso, ao adquirir essa habilidade, caso um Alvo a até 6 metros receba qualquer tipo de dano enquanto estiver com Sangramento, você poderá receber uma regeneração de Pontos de Vida equivalente à metade do seu total máximo de Pontos de Energia. Esse efeito ocorre apenas uma vez por rodada. X PV: O custo de Pontos de Vida para realizar os efeitos dessa habilidade é equivalente ao seu total máximo de Pontos de Energia. A P R I M O R A M E N T O S",
          "active": false
        },
        {
          "title": "A) Manipular Força Vital",
          "description": "A dificuldade (Dif.) do teste de Vigor dessa habilidade é aumentada em 2.",
          "active": false
        },
        {
          "title": "B) Pressão Sangrenta",
          "description": "O teste de Vigor dessa habilidade possui Inaptidão.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_3938f8182d02",
          "name": "Esfera Espiral Soberana",
          "description": "Explosão mística em raio de 3m a até 8m: 1d8 Dano Mágico Neutro (+1d8 por Arcanismo). Teste de Agilidade Dif. 8 para metade.",
          "cost": "2 PE",
          "type": {
            "actionType": "acaoAtiva",
            "category": "conjuracao",
            "tags": [
              "conjuracao"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "1d8",
            "type": "neutro",
            "criticalBonus": "",
            "scaling": "+1d8 por ponto de Arcanismo"
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "agility",
            "difficulty": 8,
            "onSuccess": "Recebe metade do dano",
            "onFailure": "Recebe dano total"
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
    "_id": "ab00390000000000",
    "name": "Moldar Elemento",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Moldar Elemento.png",
    "folder": "fldhc00040000000",
    "_key": "!items!ab00390000000000",
    "system": {
      "name": "Moldar Elemento",
      "category": "ofensiva",
      "cost": "2 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "habilidade",
      "types": [
        "conjuracao"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "8 Metros",
      "duration": "1 Minuto",
      "level": 1,
      "pathId": "feiticeiro",
      "description": "Você envolve o seu próprio Véu com forças elementais, modificando a sua essência.\nVocê aplica a si mesmo esse Efeito Positivo, escolhendo um dos elementos a seguir: Fogo, Água, Vento, Terra, Trovão ou Gelo.\nSempre que você causar um Dano Mágico Neutro com um Armamento Mágico, ou através de uma Habilidade de Caminho ou Característica, você pode rá transformar es se Dano Mágico Neutro em um Dano Mágico do elemento escolhido nesse Efeito Positivo.\nUma vez por rodada, ao causar um Dano Mágico com um Armamento Mágico, ou através de uma Habilidade de Caminho do mesmo tipo elemental escolhido nesse Efeito Positivo em um, ou mais, Alvos, você poderá realizar um dos seguintes efeitos com base no tipo de Dano Mágico elemental causado:\n• Fogo\nVocê aumenta o valor desse Dano Mágico de Fogo em um valor igual à metade do seu total máximo de Pontos de Energia.\n• Água\nUm Alvo que tenha sido atingido por esse Dano Mágico de Água é deslocado involuntariamente 3 metros para trás.\n• Vento\nVocê pode realizar uma Corrida sem custo de Ação nesse turno.\n• Terra\nVocê recebe um valor de Pontos de Vida Temporários equivalente à metade do seu total máximo de Pontos de Energia.\n• Trovão\nO Alvo que for atingido por esse Dano Mágico de Trovão perde 1 Ponto de Energia.\n• Gelo\nO Alvo que for atingido por esse Dano Mágico de Gelo ficará com Lentidão.\nEnquanto estiver com esse Efeito Positivo, você também poderá realizar pequenos truques elementais (com a autorização do Narrador) referente ao elemento escolhido na habilidade.",
      "subEffects": [],
      "improvements": [
        {
          "title": "A) Sagacidade Elemental",
          "description": "A Ação Simples utilizada para realizar essa habilidade é transformada em uma Ação Acelerada.",
          "active": false
        },
        {
          "title": "B) Iniciado Elemental",
          "description": "Ao iniciar o seu turno, você poderá trocar o elemento escolhido nessa habilidade.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_7110c26a1bfb",
          "name": "Moldar Elemento (Ativar)",
          "description": "Transforma Dano Neutro em Fogo, Água, Vento, Terra, Trovão ou Gelo por 1 minuto.",
          "cost": "2 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "conjuracao",
            "tags": [
              "conjuracao"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": true,
            "status": "Moldar Elemento",
            "duration": "1 Minuto",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        },
        {
          "id": "act_092c8cf682b9",
          "name": "Efeito Fogo (+Dano PE/2)",
          "description": "Aumenta o Dano de Fogo em metade do seu total máximo de PE.",
          "cost": "",
          "type": {
            "actionType": "",
            "category": "conjuracao",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "Math.floor(@energy.max / 2)",
            "type": "fire",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        },
        {
          "id": "act_255963c68264",
          "name": "Efeito Gelo (Lentidão)",
          "description": "Alvo atingido por Dano de Gelo fica com Lentidão.",
          "cost": "",
          "type": {
            "actionType": "",
            "category": "conjuracao",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": true,
            "status": "Lentidão",
            "duration": "1 rodada",
            "description": "-1 em testes de Defesa e Movimentação reduzida pela metade."
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
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
    "_id": "ab00400000000000",
    "name": "Campo Elemental",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Campo Elemental.png",
    "folder": "fldhc00040000000",
    "_key": "!items!ab00400000000000",
    "system": {
      "name": "Campo Elemental",
      "category": "ofensiva",
      "cost": "1 PE",
      "typeAction": "acaoAtiva",
      "typeAbility": "habilidade",
      "types": [
        "conjuracao",
        "foco"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "8 Metros",
      "duration": "1 Minuto",
      "level": 1,
      "pathId": "feiticeiro",
      "description": "Você evoca o seu poder elemental para criar uma zona elemental destrutiva.\nAo utilizar essa habilidade, você deve escolher um dos elementos a seguir: Fogo, Água, Vento, Terra, Trovão ou Gelo.\nVocê evoca o poder elemental escolhido, centrado em um ponto numa superfície a até 8 metros, que afeta toda a área a até 3 metros do ponto central. Caso um Alvo inicie o seu turno ou utilize uma Movimentação através da área afetada p ela habilidade, esse Alvo receberá 1d6 de Dano Mágico do elemento escolhido. Esse valor é aumentado em 1d6 para cada ponto de Arcanismo.\nUm Alvo só poderá ser afetado pelo dano dessa habilidade uma vez por turno.",
      "subEffects": [],
      "improvements": [
        {
          "title": "A) Zona Caótica",
          "description": "A área afetada pelo efeito dessa habilidade é considerada um Terreno Difícil. Alvos não podem utilizar Corrida na área afetada pelo Terreno Difícil.",
          "active": false
        },
        {
          "title": "B) Maestria Elemental",
          "description": "Essa habilidade não é mais considerada um Foco, mas você só pode manter um Campo Elemental por vez. vez. Além disso, a área afetada por esta habilidade é aumenta em 2 metros.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_5ab2e9bb3175",
          "name": "Criar Campo Elemental",
          "description": "Área elemental de 3m a até 8m: iniciar turno ou mover pela área causa 1d6 Dano Mágico (+1d6 por Arcanismo).",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoAtiva",
            "category": "conjuracao",
            "tags": [
              "conjuracao",
              "foco"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "1d6",
            "type": "fire",
            "criticalBonus": "",
            "scaling": "+1d6 por ponto de Arcanismo"
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
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
    "_id": "ab00410000000000",
    "name": "Perito Com Armamentos Mágicos",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Perito Com Armamentos Mágicos.png",
    "folder": "fldhc00040000000",
    "_key": "!items!ab00410000000000",
    "system": {
      "name": "Perito Com Armamentos Mágicos",
      "category": "ofensiva",
      "cost": "",
      "typeAction": "",
      "typeAbility": "habilidade",
      "types": [
        "passiva",
        "ataque_magico"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Passiva",
      "level": 1,
      "pathId": "feiticeiro",
      "description": "Requer: Armamento Mágico\nVocê aprende a extrair o potencial máximo dos seus armamentos mágicos.\nAo adquirir essa habilidade, você potencializa os seus Armamentos Mágicos equipados:",
      "subEffects": [
        {
          "name": "Catalisador Místico",
          "cost": "",
          "typeAction": "",
          "type": "ataque_magico",
          "description": "Ao acionar a Propriedade Abalo Místico desse Armamento Mágico, o seu próximo Ataque Mágico possuirá Aptidão. Esse efeito ocorre apenas uma vez por rodada.",
          "note": "",
          "actions": []
        },
        {
          "name": "Berloque de Energia",
          "cost": "",
          "typeAction": "",
          "type": "suporte",
          "description": "Ao acionar a Propriedade Rasga-Véu desse Armamento Mágico, você receberá 1 Ponto de Energia Temporário. Você só poderá receber 2 Pontos de Energia Temporários por esse efeito, por rodada.",
          "note": "",
          "actions": []
        }
      ],
      "improvements": [
        {
          "title": "A) Sinergia Mística",
          "description": "Ao atingir um Alvo com um Ataque Mágico vindo de um Armamento Mágico, a sua próxima Conjuração com custo de PE dentro de 1 minuto terá o seu custo reduzido em 1. Esse efeito não acumula.",
          "active": false
        },
        {
          "title": "B) Maestria com Armamentos Mágicos",
          "description": "Os seus Ataques Mágicos com Armamentos Mágicos ignoram Aptidões e Prioridades em testes de Defesa.",
          "active": false
        }
      ],
      "actions": []
    }
  },
  {
    "_id": "ab00420000000000",
    "name": "Rituais Sangrentos",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Rituais Sangrentos.png",
    "folder": "fldhc00040000000",
    "_key": "!items!ab00420000000000",
    "system": {
      "name": "Rituais Sangrentos",
      "category": "ofensiva",
      "cost": "X PV",
      "typeAction": "",
      "typeAbility": "habilidade",
      "types": [
        "conjuracao"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 Metros",
      "duration": "Até passar no teste de Espírito",
      "level": 1,
      "pathId": "feiticeiro",
      "description": "Você toca camadas do Véu que muitos preferem esquecer — mas para você, todo poder tem seu propósito.\nVocê acessa um poder considerado tabu por muitos, aprendendo as seguintes Conjurações:\nX PV: O custo de Pontos de Vida para realizar os efeitos dessa habilidade é equivalente ao seu total máximo de Pontos de Energia.",
      "subEffects": [
        {
          "name": "Poder Carmesim",
          "cost": "X PV",
          "typeAction": "acaoSimples",
          "type": "conjuracao",
          "description": "Você aumenta em 1 um dos seus Parâmetros até o início do seu próximo turno. Esse valor pode ultrapassar o valor máximo de um Parâmetro.",
          "note": "",
          "actions": [
            {
              "id": "act_poder_carmesim",
              "name": "Poder Carmesim",
              "description": "Gasta X PV (PE Máximo: @energy.max) para aumentar em 1 um dos seus Parâmetros até o início do próximo turno (pode ultrapassar o máximo).",
              "cost": "X PV",
              "type": {
                "actionType": "acaoSimples",
                "category": "conjuracao",
                "tags": [
                  "conjuracao"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard",
                "defenseTarget": "evasion"
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
                "status": "Poder Carmesim (+1 Parâmetro)",
                "duration": "Até início do próximo turno",
                "description": "+1 em um Parâmetro à escolha."
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 3,
                "unit": "m",
                "targetDisposition": "all",
                "targetLimit": ""
              }
            }
          ]
        },
        {
          "name": "Ligação de Sangue",
          "cost": "X PV",
          "typeAction": "acaoRapida",
          "type": "conjuracao",
          "description": "Caso você cause qualquer tipo de dano a um Alvo, você poderá utilizar essa habilidade para fazer com que esse Alvo também receba essa Condição Mágica.\nVocê pode utilizar os Pontos de Vida de Alvos a até 6 metros com esta Condição Mágica (quando aplicada por você) no lugar dos seus próprios Pontos de Vida em custos de X PV das suas Habilidades de Caminho.\nVocê pode utilizar esse efeito apenas uma vez por rodada.\nAlvos afetados por essa Condição Mágica poderão realizar um teste de Espírito, Dif. 8, ao final dos seus turnos. Caso tenham sucesso, essa Condição Mágica será removida.",
          "note": "",
          "actions": [
            {
              "id": "act_ligacao_sangue",
              "name": "Ligação de Sangue",
              "description": "Ao causar qualquer tipo de dano a um alvo, gasta X PV para aplicar a Condição Mágica Ligação de Sangue (permite usar os PV do alvo a até 6m para custos de X PV). 1x por rodada.",
              "cost": "X PV",
              "type": {
                "actionType": "acaoRapida",
                "category": "conjuracao",
                "tags": [
                  "conjuracao"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard",
                "defenseTarget": "evasion"
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
                "status": "Ligação de Sangue",
                "duration": "Até passar em Resistência",
                "description": "Permite ao conjurador usar PV do alvo para custos de X PV."
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 6,
                "unit": "m",
                "targetDisposition": "all",
                "targetLimit": "1"
              }
            }
          ]
        }
      ],
      "improvements": [
        {
          "title": "A) Vislumbre Shatraq",
          "description": "A dificuldade (Dif.) do teste de Espírito da Ligação de Sangue é aumentada em 2.",
          "active": false
        },
        {
          "title": "B) Técnica Sangrenta",
          "description": "A Ação Rápida utilizada em Ligação de Sangue é transformada em uma Ação Acelerada.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_537d75fedb50",
          "name": "Teste de Espírito (Resistir)",
          "description": "Teste de Espírito Dif. 8 no final dos turnos do alvo para remover a Condição Mágica.",
          "cost": "",
          "type": {
            "actionType": "",
            "category": "defesa",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "spirit",
            "difficulty": 8,
            "onSuccess": "Remove a Condição Mágica Ligação de Sangue.",
            "onFailure": "Permanece com Ligação de Sangue."
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        },
        {
          "id": "act_poder_carmesim",
          "name": "Poder Carmesim",
          "description": "Gasta X PV (PE Máximo: @energy.max) para aumentar em 1 um dos seus Parâmetros até o início do próximo turno (pode ultrapassar o máximo).",
          "cost": "X PV",
          "type": {
            "actionType": "acaoSimples",
            "category": "conjuracao",
            "tags": [
              "conjuracao"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard",
            "defenseTarget": "evasion"
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
            "status": "Poder Carmesim (+1 Parâmetro)",
            "duration": "Até início do próximo turno",
            "description": "+1 em um Parâmetro à escolha."
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetDisposition": "all",
            "targetLimit": ""
          }
        },
        {
          "id": "act_ligacao_sangue",
          "name": "Ligação de Sangue",
          "description": "Ao causar qualquer tipo de dano a um alvo, gasta X PV para aplicar a Condição Mágica Ligação de Sangue (permite usar os PV do alvo a até 6m para custos de X PV). 1x por rodada.",
          "cost": "X PV",
          "type": {
            "actionType": "acaoRapida",
            "category": "conjuracao",
            "tags": [
              "conjuracao"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard",
            "defenseTarget": "evasion"
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
            "status": "Ligação de Sangue",
            "duration": "Até passar em Resistência",
            "description": "Permite ao conjurador usar PV do alvo para custos de X PV."
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 6,
            "unit": "m",
            "targetDisposition": "all",
            "targetLimit": "1"
          }
        }
      ]
    }
  },
  {
    "_id": "ab00460000000000",
    "name": "Feitiçaria",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Feitiçaria.png",
    "folder": "fldhc00040000000",
    "_key": "!items!ab00460000000000",
    "system": {
      "name": "Feitiçaria",
      "category": "auxiliadora",
      "cost": "",
      "typeAction": "",
      "typeAbility": "habilidade",
      "types": [
        "conjuracao"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "8 Metros",
      "duration": "1 Minuto",
      "level": 1,
      "pathId": "feiticeiro",
      "description": "Você desperta cada vez mais, abrindo as portas arcanas do Véu.\nVocê desvenda uma nova camada do Véu, recebendo acesso a 5 Feitiços Arcanos à sua escolha. Após concluir um Repouso Completo, você poderá substituir os seus Feitiços Arcanos atuais por outros Feitiços Arcanos.\nAlém disso, você também adquire as seguintes Conjurações:",
      "subEffects": [
        {
          "name": "Rajada De Energia",
          "cost": "1 PE",
          "typeAction": "acaoAtiva",
          "type": "ataque_magico",
          "description": "Você realiza um Ataque Mágico contra um Alvo a até 8 metros. Caso acerte, você causará 1d8 de Dano Mágico Neutro no Alvo. Esse valor é aumentado em 1d8 para cada ponto de Arcanismo.",
          "note": "",
          "actions": [
            {
              "id": "act_rajada_energia",
              "name": "Rajada De Energia",
              "description": "Ataque Mágico a até 8 metros. Caso acerte, causa 1d8 de Dano Mágico Neutro (+1d8 por ponto de Arcanismo).",
              "cost": "1 PE",
              "type": {
                "actionType": "acaoAtiva",
                "category": "ataque_magico",
                "tags": [
                  "conjuracao"
                ]
              },
              "attack": {
                "hasAttack": true,
                "attribute": "arcane",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard",
                "defenseTarget": "evasion"
              },
              "damage": {
                "hasDamage": true,
                "formula": "1d8",
                "type": "neutro",
                "criticalBonus": "",
                "scaling": "+1d8 por ponto de Arcanismo"
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
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 8,
                "unit": "m",
                "targetDisposition": "hostile",
                "targetLimit": "1"
              }
            }
          ]
        },
        {
          "name": "Controlar O Véu",
          "cost": "1 PE",
          "typeAction": "livre",
          "type": "conjuracao",
          "description": "Junto a uma Conjuração realizada por você, você faz com que esta Conjuração não possa causar Danos Mágicos, Efeitos Negativos, Condições Físicas e Condições Mágicas em Alvos Aliados.",
          "note": "",
          "actions": [
            {
              "id": "act_controlar_veu",
              "name": "Controlar O Véu",
              "description": "Junto a uma Conjuração realizada por você, faz com que esta Conjuração não possa causar Danos Mágicos, Efeitos Negativos, Condições Físicas ou Mágicas em Aliados.",
              "cost": "1 PE",
              "type": {
                "actionType": "",
                "category": "suporte",
                "tags": [
                  "conjuracao"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard",
                "defenseTarget": "evasion"
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
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 3,
                "unit": "m",
                "targetDisposition": "friendly",
                "targetLimit": ""
              }
            }
          ]
        },
        {
          "name": "Armadura Arcana",
          "cost": "2 PE",
          "typeAction": "acaoSimples",
          "type": "defesa",
          "description": "Você reveste o seu corpo com uma membrana mística, aplicando 2 Cargas do efeito Armadura Arcana. O número máximo de Cargas é 2.\nAo receber qualquer tipo de dano, esse dano será reduzido pela metade e uma Carga desse efeito será removida. O efeito dessa habilidade é aplicado antes de qualquer outra redução de danos.\nCom zero Cargas, esse efeito é removido.",
          "note": "",
          "actions": [
            {
              "id": "act_armadura_arcana",
              "name": "Armadura Arcana",
              "description": "Reveste seu corpo com membrana mística, aplicando 2 Cargas de Armadura Arcana. Ao sofrer dano, o dano é reduzido pela metade e remove 1 Carga.",
              "cost": "2 PE",
              "type": {
                "actionType": "acaoSimples",
                "category": "defesa",
                "tags": [
                  "conjuracao"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard",
                "defenseTarget": "evasion"
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
                "status": "Armadura Arcana (2 Cargas)",
                "duration": "Até esgotar cargas",
                "description": "Reduz dano pela metade e consome 1 carga (máx 2 cargas)."
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 3,
                "unit": "m",
                "targetDisposition": "all",
                "targetLimit": ""
              }
            }
          ]
        }
      ],
      "improvements": [
        {
          "title": "A) Revestimento Rápido",
          "description": "A Ação Simples utilizada em Armadura Arcana é transformada em uma Ação Acelerada.",
          "active": false
        },
        {
          "title": "B) Maestria Mística",
          "description": "Remove o custo de Pontos de Energia da Rajada de Energia.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_rajada_energia",
          "name": "Rajada De Energia",
          "description": "Ataque Mágico a até 8 metros. Caso acerte, causa 1d8 de Dano Mágico Neutro (+1d8 por ponto de Arcanismo).",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoAtiva",
            "category": "ataque_magico",
            "tags": [
              "conjuracao"
            ]
          },
          "attack": {
            "hasAttack": true,
            "attribute": "arcane",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard",
            "defenseTarget": "evasion"
          },
          "damage": {
            "hasDamage": true,
            "formula": "1d8",
            "type": "neutro",
            "criticalBonus": "",
            "scaling": "+1d8 por ponto de Arcanismo"
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
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 8,
            "unit": "m",
            "targetDisposition": "hostile",
            "targetLimit": "1"
          }
        },
        {
          "id": "act_controlar_veu",
          "name": "Controlar O Véu",
          "description": "Junto a uma Conjuração realizada por você, faz com que esta Conjuração não possa causar Danos Mágicos, Efeitos Negativos, Condições Físicas ou Mágicas em Aliados.",
          "cost": "1 PE",
          "type": {
            "actionType": "",
            "category": "suporte",
            "tags": [
              "conjuracao"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard",
            "defenseTarget": "evasion"
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
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetDisposition": "friendly",
            "targetLimit": ""
          }
        },
        {
          "id": "act_armadura_arcana",
          "name": "Armadura Arcana",
          "description": "Reveste seu corpo com membrana mística, aplicando 2 Cargas de Armadura Arcana. Ao sofrer dano, o dano é reduzido pela metade e remove 1 Carga.",
          "cost": "2 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "defesa",
            "tags": [
              "conjuracao"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard",
            "defenseTarget": "evasion"
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
            "status": "Armadura Arcana (2 Cargas)",
            "duration": "Até esgotar cargas",
            "description": "Reduz dano pela metade e consome 1 carga (máx 2 cargas)."
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetDisposition": "all",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "ab00500000000000",
    "name": "Manipular A Fenda",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Manipular A Fenda.png",
    "folder": "fldhc00040000000",
    "_key": "!items!ab00500000000000",
    "system": {
      "name": "Manipular A Fenda",
      "category": "auxiliadora",
      "cost": "2 PE",
      "typeAction": "acaoRapida",
      "typeAbility": "habilidade",
      "types": [
        "conjuracao"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 Metros",
      "duration": "Instantânea",
      "level": 1,
      "pathId": "feiticeiro",
      "description": "Você distorce o Véu à sua volta, manipulando o destino de um alvo.\nCaso um Alvo a até 6 metros tenha sucesso ou falhe em um teste de Parâmetro, ou Bloqueio, você poderá utilizar essa habilidade para fazer com que esse mesmo Alvo refaça o teste de Parâmetro, ou Bloqueio.\nAlvos só pode m ser afetado s por essa habilidade uma vez por turno, mesmo vindo de fontes diferentes.",
      "subEffects": [],
      "improvements": [
        {
          "title": "A) Complexidade de Unala",
          "description": "Caso você já tenha utilizado essa habilidade em uma rodada, você poderá utilizá-la uma segunda vez nessa mesma rodada.",
          "active": false
        },
        {
          "title": "B) Manipular o Destino",
          "description": "O novo teste de Parâmetro ou Bloqueio concedido por essa habilidade receberá +1 ou -1, à sua escolha.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_manipular_fenda",
          "name": "Manipular A Fenda",
          "description": "Caso um Alvo a até 6 metros tenha sucesso ou falhe em um teste de Parâmetro ou Bloqueio, faz com que ele refaça o teste (1x por turno por alvo).",
          "cost": "2 PE",
          "type": {
            "actionType": "acaoRapida",
            "category": "suporte",
            "tags": [
              "conjuracao"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "arcane",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard",
            "defenseTarget": "evasion"
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
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 6,
            "unit": "m",
            "targetDisposition": "all",
            "targetLimit": "1"
          }
        }
      ]
    }
  },
  {
    "_id": "ab00510000000000",
    "name": "Toque Do Véu",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Toque Do Véu.png",
    "folder": "fldhc00040000000",
    "_key": "!items!ab00510000000000",
    "system": {
      "name": "Toque Do Véu",
      "category": "auxiliadora",
      "cost": "",
      "typeAction": "",
      "typeAbility": "habilidade",
      "types": [
        "passiva",
        "suporte"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Toque",
      "duration": "Até o próximo Repouso",
      "level": 1,
      "pathId": "feiticeiro",
      "description": "Requer: Armamento Mágico\nVocê aprendeu a utilizar o seu Armamento Mágico para infundir e aprimorar certos equipamentos.\nApós completar um Repouso, você pode concentrar a energia do seu Armamento Mágico para aprimorar uma Armadura, Escudo ou Armamento que esteja tocando com um dos seguintes efeitos abaixo, referente ao tipo de equipamento. Esse efeito permanece até o seu próximo Repouso.",
      "subEffects": [
        {
          "name": "Armaduras ou Escudos",
          "cost": "",
          "typeAction": "",
          "type": "defesa",
          "description": "Enquanto estiver equipado com esse equipamento, você possui Prioridade em testes de Bloqueio.",
          "note": "",
          "actions": []
        },
        {
          "name": "Armamentos",
          "cost": "",
          "typeAction": "",
          "type": "suporte",
          "description": "Você aprimora as Propriedades existentes em um Armamento:\n• Abalo Místico Aprimorado: Reduz em 2 o valor do Resultado Natural.\n• Afiado Aprimorado: Reduz em 2 o valor do Resultado Natural.\n• Contundente Aprimorado: Reduz em 2 o valor do Resultado Natural.\n• Extensão Aprimorada: Aumenta em 2 metros adicionais.\n• Impacto Aprimorado: Reduz em 2 o valor do Resultado Natural.\n• Perfurar Aprimorado: A diferença para você causar um Acerto Crítico com esse Armamento é reduzida em 1 adicional.\n• Prioridade Aprimorada: Ao vencer um Embate por conta da Prioridade concedida por esse Armamento, você receberá +1 no seu próximo teste de Precisão.\n• Rasga-Véu Aprimorado: Reduz em 2 o valor do Resultado Natural.\n• Traspassar Aprimorado: Reduz em 2 o valor do Resultado Natural.",
          "note": "",
          "actions": []
        }
      ],
      "improvements": [
        {
          "title": "A) Mestre Artesão",
          "description": "Você aumenta o número de equipamentos afetados por essa habilidade em um valor igual ao seu total de pontos de Canalização.",
          "active": false
        },
        {
          "title": "B) Moldar Propriedades",
          "description": "Ao aprimorar um Armamento, você também poderá modificá-lo, aplicando uma das seguintes Propriedades ao Armamento: Afiado, Impacto, Perfurar, Prioridade, Rasga-Véu ou Traspassar. Um Armamento não pode possuir duas Propriedades iguais. Um Armamento não pode ser afetado por esse mesmo efeito mais de uma vez, mesmo vindo de fontes diferentes. Esse efeito é permanente.",
          "active": false
        }
      ],
      "actions": []
    }
  },
  {
    "_id": "ab00530000000000",
    "name": "Velocidade Mística",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Velocidade Mística.png",
    "folder": "fldhc00040000000",
    "_key": "!items!ab00530000000000",
    "system": {
      "name": "Velocidade Mística",
      "category": "auxiliadora",
      "cost": "",
      "typeAction": "",
      "typeAbility": "habilidade",
      "types": [
        "iniciativa",
        "conjuracao"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 Metros",
      "duration": "1ª Rodada",
      "level": 1,
      "pathId": "feiticeiro",
      "description": "Você acelera seus aliados, impulsionando o Véu de todos.\nVocê faz com que todos os Alvos Aliados a até 6 metros recebam +1d4 na sua rolagem de Iniciativa.\nAlvos afetados por essa habilidade também recebem uma Corrida adicional, que deverá ser utilizada, sem custo de Ação, no seu primeiro turno nesse combate.\nAlvos afetados por essa habilidade podem escolher não ser afetados por qualquer um dos efeitos dessa habilidade.\nUm Alvo não pode ser afetado mais de uma vez pelo efeito dessa habilidade, mesmo vindo de fontes diferentes.",
      "subEffects": [],
      "improvements": [
        {
          "title": "A) Aceleração Arcana",
          "description": "Transforme a Corrida concedida por essa habilidade em uma Movimentação.",
          "active": false
        },
        {
          "title": "B) Triunfo Temporal",
          "description": "Aumente em 1 a Categoria de Dado dessa habilidade.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_02210c772020",
          "name": "Velocidade Mística",
          "description": "+1d4 na rolagem de Iniciativa para aliados a até 6m e 1 Corrida adicional grátis no 1º turno.",
          "cost": "",
          "type": {
            "actionType": "",
            "category": "conjuracao",
            "tags": [
              "conjuracao"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": true,
            "formula": "1d4",
            "type": "neutro",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 6,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "ab00540000000000",
    "name": "Armadilhas Místicas",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Armadilhas Místicas.png",
    "folder": "fldhc00050000000",
    "_key": "!items!ab00540000000000",
    "system": {
      "name": "Armadilhas Místicas",
      "category": "ofensiva",
      "cost": "2 PE",
      "typeAction": "acaoAtiva",
      "typeAbility": "habilidade",
      "types": [
        "conjuracao"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 Metros",
      "duration": "1 Minuto",
      "level": 1,
      "pathId": "ladino",
      "description": "Você desenha uma mandala mística em um local.\nAo utilizar essa habilidade, escolha entre Armadilha Atordoante, Armadilha Grudenta ou Armadilha Tóxica.\nVocê conjura, em um ponto numa superfície a até 6 metros, uma mandala mística Invisível, que se torna uma Armadilha Mística por 1 minuto. Esse ponto não pode estar sendo ocupado por um Alvo.\nEssa Armadilha Mística ocupa 1 metro de largura e comprimento. Não é possível aplicar duas ou mais Armadilhas Místicas em um mesmo espaço.\nCaso um Alvo pise em uma Armadilha Mística, ela se ativará, gerando o efeito escolhido:\nVocê também pode ativar uma Armadilha Mística sua com uma Ação Rápida.",
      "subEffects": [
        {
          "name": "Armadilha Atordoante",
          "cost": "2 PE",
          "typeAction": "acaoAtiva",
          "type": "conjuracao",
          "description": "Quando ativada, essa armadilha gera um poderoso impacto, que força todos os Alvos a até 2 metros a um teste de Vigor, Dif. 8. Caso falhem, Alvos atingidos ficarão Atordoados.",
          "note": "",
          "actions": [
            {
              "id": "act_armadilha_atordoante",
              "name": "Armadilha Atordoante",
              "description": "Conjura em até 6m (ou ativa em 2m). Impacto místico que força todos os Alvos a até 2m a um teste de Vigor Dif. 8. Falha: Atordoado.",
              "cost": "2 PE",
              "type": {
                "actionType": "acaoAtiva",
                "category": "conjuracao",
                "tags": [
                  "conjuracao"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "agility",
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
              "condition": {
                "hasCondition": true,
                "status": "Atordoado",
                "duration": "",
                "description": "Alvos que falharem no teste de Vigor Dif. 8 ficam Atordoados."
              },
              "check": {
                "hasCheck": true,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 8,
                "onSuccess": "Não fica Atordoado",
                "onFailure": "Fica Atordoado"
              },
              "areaOfEffect": {
                "hasArea": true,
                "shape": "circle",
                "size": 2,
                "unit": "m",
                "targetLimit": "Todos na área"
              }
            }
          ]
        },
        {
          "name": "Armadilha Grudenta",
          "cost": "2 PE",
          "typeAction": "acaoAtiva",
          "type": "conjuracao",
          "description": "Quando ativada, essa armadilha lança um líquido místico, que afeta toda superfície em um raio de 2 metros ao seu redor, interrompendo Movimentações quando for ativada. O local com esse líquido é agora considerado um Terreno Difícil. Esse efeito permanece sob o local por 10 minutos.",
          "note": "",
          "actions": [
            {
              "id": "act_armadilha_grudenta",
              "name": "Armadilha Grudenta",
              "description": "Conjura em até 6m (ou ativa em 2m). Lança líquido místico em raio de 2m: interrompe movimentações imediatamente e torna a área Terreno Difícil por 10 minutos.",
              "cost": "2 PE",
              "type": {
                "actionType": "acaoAtiva",
                "category": "conjuracao",
                "tags": [
                  "conjuracao"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "agility",
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
              "condition": {
                "hasCondition": true,
                "status": "Terreno Difícil",
                "duration": "10 Minutos",
                "description": "Superfície em raio de 2m torna-se Terreno Difícil por 10 minutos. Movimentações são interrompidas na ativação."
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "agility",
                "difficulty": 8,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": true,
                "shape": "circle",
                "size": 2,
                "unit": "m",
                "targetLimit": "Superfície / Todos"
              }
            }
          ]
        },
        {
          "name": "Armadilha Tóxica",
          "cost": "2 PE",
          "typeAction": "acaoAtiva",
          "type": "conjuracao",
          "description": "Quando ativada, essa armadilha lança fragmentos místicos na direção de todos os Alvos em um raio de 2 metros do seu ponto de origem, forçando-os a um teste de Espírito, Dif. 8. Caso falhem, Alvos atingidos ficarão Envenenados por 1 hora.",
          "note": "",
          "actions": [
            {
              "id": "act_armadilha_toxica",
              "name": "Armadilha Tóxica",
              "description": "Conjura em até 6m (ou ativa em 2m). Lança fragmentos místicos em raio de 2m: força todos a um teste de Espírito Dif. 8. Falha: Envenenado por 1 hora.",
              "cost": "2 PE",
              "type": {
                "actionType": "acaoAtiva",
                "category": "conjuracao",
                "tags": [
                  "conjuracao"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "agility",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard"
              },
              "damage": {
                "hasDamage": false,
                "formula": "",
                "type": "nature",
                "criticalBonus": "",
                "scaling": ""
              },
              "condition": {
                "hasCondition": true,
                "status": "Envenenado",
                "duration": "1 Hora",
                "description": "Alvos que falharem no teste de Espírito Dif. 8 ficam Envenenados por 1 hora."
              },
              "check": {
                "hasCheck": true,
                "category": "parameter",
                "attribute": "spirit",
                "difficulty": 8,
                "onSuccess": "Não fica Envenenado",
                "onFailure": "Fica Envenenado por 1 hora"
              },
              "areaOfEffect": {
                "hasArea": true,
                "shape": "circle",
                "size": 2,
                "unit": "m",
                "targetLimit": "Todos na área"
              }
            }
          ]
        }
      ],
      "improvements": [
        {
          "title": "A) Véu Criador",
          "description": "A Ação Ativa utilizada para realizar essa habilidade é transformada em uma Ação Acelerada.",
          "active": false
        },
        {
          "title": "B) Surpresa Mística",
          "description": "A Ação Rápida do efeito de ativação das armadilhas dessa habilidade é transformada em uma Ação Acelerada.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_armadilha_atordoante",
          "name": "Armadilha Atordoante",
          "description": "Conjura em até 6m (ou ativa em 2m). Impacto místico que força todos os Alvos a até 2m a um teste de Vigor Dif. 8. Falha: Atordoado.",
          "cost": "2 PE",
          "type": {
            "actionType": "acaoAtiva",
            "category": "conjuracao",
            "tags": [
              "conjuracao"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "agility",
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
          "condition": {
            "hasCondition": true,
            "status": "Atordoado",
            "duration": "",
            "description": "Alvos que falharem no teste de Vigor Dif. 8 ficam Atordoados."
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 8,
            "onSuccess": "Não fica Atordoado",
            "onFailure": "Fica Atordoado"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 2,
            "unit": "m",
            "targetLimit": "Todos na área"
          }
        },
        {
          "id": "act_armadilha_grudenta",
          "name": "Armadilha Grudenta",
          "description": "Conjura em até 6m (ou ativa em 2m). Lança líquido místico em raio de 2m: interrompe movimentações imediatamente e torna a área Terreno Difícil por 10 minutos.",
          "cost": "2 PE",
          "type": {
            "actionType": "acaoAtiva",
            "category": "conjuracao",
            "tags": [
              "conjuracao"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "agility",
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
          "condition": {
            "hasCondition": true,
            "status": "Terreno Difícil",
            "duration": "10 Minutos",
            "description": "Superfície em raio de 2m torna-se Terreno Difícil por 10 minutos. Movimentações são interrompidas na ativação."
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "agility",
            "difficulty": 8,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 2,
            "unit": "m",
            "targetLimit": "Superfície / Todos"
          }
        },
        {
          "id": "act_armadilha_toxica",
          "name": "Armadilha Tóxica",
          "description": "Conjura em até 6m (ou ativa em 2m). Lança fragmentos místicos em raio de 2m: força todos a um teste de Espírito Dif. 8. Falha: Envenenado por 1 hora.",
          "cost": "2 PE",
          "type": {
            "actionType": "acaoAtiva",
            "category": "conjuracao",
            "tags": [
              "conjuracao"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "agility",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": false,
            "formula": "",
            "type": "nature",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": true,
            "status": "Envenenado",
            "duration": "1 Hora",
            "description": "Alvos que falharem no teste de Espírito Dif. 8 ficam Envenenados por 1 hora."
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "spirit",
            "difficulty": 8,
            "onSuccess": "Não fica Envenenado",
            "onFailure": "Fica Envenenado por 1 hora"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 2,
            "unit": "m",
            "targetLimit": "Todos na área"
          }
        },
        {
          "id": "act_detonar_armadilha",
          "name": "Detonar Armadilha",
          "description": "Gasta uma Ação Rápida para detonar manualmente uma de suas Armadilhas Místicas ativas (Ação Acelerada com Aprimoramento Surpresa Mística).",
          "cost": "",
          "type": {
            "actionType": "acaoRapida",
            "category": "conjuracao",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "agility",
            "knowledge": "",
            "bonus": "",
            "rollType": "standard"
          },
          "damage": {
            "hasDamage": false,
            "formula": "",
            "type": "immaterial",
            "criticalBonus": "",
            "scaling": ""
          },
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 8,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 0,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "ab00550000000000",
    "name": "Disparo Debilitante",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Disparo Debilitante.png",
    "folder": "fldhc00050000000",
    "_key": "!items!ab00550000000000",
    "system": {
      "name": "Disparo Debilitante",
      "category": "ofensiva",
      "cost": "1 PE",
      "typeAction": "acaoAtiva",
      "typeAbility": "habilidade",
      "types": [
        "ataque_distancia"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Conforme armamento",
      "duration": "Conforme técnica",
      "level": 1,
      "pathId": "ladino",
      "description": "Somente com Armamentos à Distância\nVocê mira precisamente com o seu armamento, tentando atingir um ponto específico do seu alvo.\nVocê realiza um Ataque Físico contra um Alvo dentro do alcance de seu Armamento à Distância equipado. Caso tenha sucesso, você aplicará no Alvo dessa habilidade um dos seguintes efeitos, à sua escolha.\nCaso o Ataque Físico realizado nesta habilidade seja realizado com dois Armamentos à Distância, somente o primeiro disparo realizado poderá aplicar os efeitos abaixo.",
      "subEffects": [
        {
          "name": "Parte Inferior",
          "cost": "1 PE",
          "typeAction": "acaoAtiva",
          "type": "ataque_distancia",
          "description": "Você acerta a parte inferior do Alvo, forçando-o a um teste de Vigor, Dif. 8. Caso falhe, você aplicará Caído no Alvo.",
          "note": "",
          "actions": [
            {
              "id": "act_disparo_inferior",
              "name": "Disparo Debilitante: Parte Inferior",
              "description": "Ataque Físico à Distância. Ao atingir, força o Alvo a um teste de Vigor Dif. 8. Caso falhe, aplica Caído.",
              "cost": "1 PE",
              "type": {
                "actionType": "acaoAtiva",
                "category": "ataque_distancia",
                "tags": [
                  "ataque_distancia"
                ]
              },
              "attack": {
                "hasAttack": true,
                "attribute": "precision",
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
              "condition": {
                "hasCondition": true,
                "status": "Caído",
                "duration": "",
                "description": "Alvo falha no teste de Vigor Dif. 8 e fica Caído."
              },
              "check": {
                "hasCheck": true,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 8,
                "onSuccess": "Não fica Caído",
                "onFailure": "Fica Caído"
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 0,
                "unit": "m",
                "targetLimit": "1"
              }
            }
          ]
        },
        {
          "name": "Parte Superior",
          "cost": "1 PE",
          "typeAction": "acaoAtiva",
          "type": "ataque_distancia",
          "description": "Você acerta a parte superior do Alvo, forçando-o a um teste de Vigor, Dif. 8. Caso falhe, o Alvo terá Inaptidão no seu próximo teste de Precisão ou Canalização.",
          "note": "",
          "actions": [
            {
              "id": "act_disparo_superior",
              "name": "Disparo Debilitante: Parte Superior",
              "description": "Ataque Físico à Distância. Ao atingir, força o Alvo a um teste de Vigor Dif. 8. Caso falhe, o Alvo terá Inaptidão no próximo teste de Precisão ou Canalização.",
              "cost": "1 PE",
              "type": {
                "actionType": "acaoAtiva",
                "category": "ataque_distancia",
                "tags": [
                  "ataque_distancia"
                ]
              },
              "attack": {
                "hasAttack": true,
                "attribute": "precision",
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
              "condition": {
                "hasCondition": true,
                "status": "Inaptidão",
                "duration": "Próximo teste",
                "description": "Inaptidão no próximo teste de Precisão ou Canalização."
              },
              "check": {
                "hasCheck": true,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 8,
                "onSuccess": "Não recebe Inaptidão",
                "onFailure": "Inaptidão no próximo teste de Precisão ou Canalização"
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 0,
                "unit": "m",
                "targetLimit": "1"
              }
            }
          ]
        },
        {
          "name": "Parte Vital",
          "cost": "1 PE",
          "typeAction": "acaoAtiva",
          "type": "ataque_distancia",
          "description": "Você acerta um ponto vital do Alvo, forçando-o a um teste de Vigor, Dif. 8. Caso falhe, o Alvo é afetado por Sangramento por 1 hora.",
          "note": "",
          "actions": [
            {
              "id": "act_disparo_vital",
              "name": "Disparo Debilitante: Parte Vital",
              "description": "Ataque Físico à Distância. Ao atingir, força o Alvo a um teste de Vigor Dif. 8. Caso falhe, o Alvo é afetado por Sangramento por 1 hora.",
              "cost": "1 PE",
              "type": {
                "actionType": "acaoAtiva",
                "category": "ataque_distancia",
                "tags": [
                  "ataque_distancia"
                ]
              },
              "attack": {
                "hasAttack": true,
                "attribute": "precision",
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
              "condition": {
                "hasCondition": true,
                "status": "Sangramento",
                "duration": "1 Hora",
                "description": "Alvo afetado por Sangramento por 1 hora."
              },
              "check": {
                "hasCheck": true,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 8,
                "onSuccess": "Não recebe Sangramento",
                "onFailure": "Afetado por Sangramento por 1 hora"
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 0,
                "unit": "m",
                "targetLimit": "1"
              }
            }
          ]
        }
      ],
      "improvements": [
        {
          "title": "A) Pontos Expostos",
          "description": "As dificuldades (Dif.) dos testes de Vigor dessa habilidade são aumentadas em 2.",
          "active": false
        },
        {
          "title": "B) Disparo Preciso",
          "description": "Ao atingir um Alvo com o Ataque Físico desta habilidade, você receberá +1 no seu próximo teste de Precisão contra esse mesmo Alvo. Este efeito não acumula.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_disparo_inferior",
          "name": "Disparo Debilitante: Parte Inferior",
          "description": "Ataque Físico à Distância. Ao atingir, força o Alvo a um teste de Vigor Dif. 8. Caso falhe, aplica Caído.",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoAtiva",
            "category": "ataque_distancia",
            "tags": [
              "ataque_distancia"
            ]
          },
          "attack": {
            "hasAttack": true,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": true,
            "status": "Caído",
            "duration": "",
            "description": "Alvo falha no teste de Vigor Dif. 8 e fica Caído."
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 8,
            "onSuccess": "Não fica Caído",
            "onFailure": "Fica Caído"
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 0,
            "unit": "m",
            "targetLimit": "1"
          }
        },
        {
          "id": "act_disparo_superior",
          "name": "Disparo Debilitante: Parte Superior",
          "description": "Ataque Físico à Distância. Ao atingir, força o Alvo a um teste de Vigor Dif. 8. Caso falhe, o Alvo terá Inaptidão no próximo teste de Precisão ou Canalização.",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoAtiva",
            "category": "ataque_distancia",
            "tags": [
              "ataque_distancia"
            ]
          },
          "attack": {
            "hasAttack": true,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": true,
            "status": "Inaptidão",
            "duration": "Próximo teste",
            "description": "Inaptidão no próximo teste de Precisão ou Canalização."
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 8,
            "onSuccess": "Não recebe Inaptidão",
            "onFailure": "Inaptidão no próximo teste de Precisão ou Canalização"
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 0,
            "unit": "m",
            "targetLimit": "1"
          }
        },
        {
          "id": "act_disparo_vital",
          "name": "Disparo Debilitante: Parte Vital",
          "description": "Ataque Físico à Distância. Ao atingir, força o Alvo a um teste de Vigor Dif. 8. Caso falhe, o Alvo é afetado por Sangramento por 1 hora.",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoAtiva",
            "category": "ataque_distancia",
            "tags": [
              "ataque_distancia"
            ]
          },
          "attack": {
            "hasAttack": true,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": true,
            "status": "Sangramento",
            "duration": "1 Hora",
            "description": "Alvo afetado por Sangramento por 1 hora."
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 8,
            "onSuccess": "Não recebe Sangramento",
            "onFailure": "Afetado por Sangramento por 1 hora"
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 0,
            "unit": "m",
            "targetLimit": "1"
          }
        }
      ]
    }
  },
  {
    "_id": "ab00590000000000",
    "name": "Emboscar",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Emboscar.png",
    "folder": "fldhc00050000000",
    "_key": "!items!ab00590000000000",
    "system": {
      "name": "Emboscar",
      "category": "ofensiva",
      "cost": "",
      "typeAction": "",
      "typeAbility": "habilidade",
      "types": [
        "iniciativa"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "1ª Rodada",
      "level": 1,
      "pathId": "ladino",
      "description": "Você analisa um combate prestes a ocorrer, escolhendo a melhor forma de agir.\nDurante a Iniciativa, você pode realizar uma Corrida.\nAlém disso, você possui Aptidão nos seus testes de Precisão, Canalização e Defesa na primeira rodada desse combate.",
      "subEffects": [],
      "improvements": [
        {
          "title": "A) Oportunista",
          "description": "A Corrida concedida por essa habilidade é transformada em uma Movimentação. Na primeira rodada desse combate você também recebe Prioridade em testes de Precisão, Canalização e Defesa.",
          "active": false
        },
        {
          "title": "B) Segunda Chance",
          "description": "Você poderá refazer, uma única vez, um teste de Precisão, Canalização ou Defesa realizado na primeira rodada desse combate.",
          "active": false
        }
      ],
      "actions": []
    }
  },
  {
    "_id": "ab00600000000000",
    "name": "Estilo Único",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Estilo Único.png",
    "folder": "fldhc00050000000",
    "_key": "!items!ab00600000000000",
    "system": {
      "name": "Estilo Único",
      "category": "ofensiva",
      "cost": "",
      "typeAction": "",
      "typeAbility": "habilidade",
      "types": [
        "passiva",
        "ataque_corpo_a_corpo"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Passiva",
      "level": 1,
      "pathId": "ladino",
      "description": "Você se tornou um com os seus armamentos, criando um estilo de combate único.\nAo adquirir essa habilidade você receberá as seguintes técnicas:",
      "subEffects": [
        {
          "name": "Combate Híbrido",
          "cost": "",
          "typeAction": "",
          "typeAbility": "passiva",
          "description": "Você deixa de receber a Inaptidão gerada pela regra de Empunhadura Dupla ao equipar um Armamento Leve e um Armamento à Distância de uma mão ao mesmo tempo.\nNo final do seu turno, sem custo de Ação, você pode recarregar um Armamento equipado por você que possua a Propriedade Tambor.",
          "note": "",
          "actions": []
        },
        {
          "name": "Esgrimista",
          "cost": "",
          "typeAction": "acaoAtiva",
          "typeAbility": "passiva",
          "description": "Enquanto você estiver equipado com apenas um Armamento Leve, possuindo a outra mão livre, sempre que realizar um Ataque Físico com esse Armamento Leve, você pode realizar dois golpes, podendo escolher Alvos diferentes. Efeitos que seriam aplicados somente no primeiro golpe de um Ataque Físico também serão aplicados somente no primeiro golpe dessa técnica.",
          "note": "",
          "actions": [
            {
              "id": "act_592cf2dcc7df",
              "name": "Esgrimista (Ataque Duplo)",
              "description": "Realiza dois golpes com Armamento Leve e mão livre.",
              "cost": "",
              "type": {
                "actionType": "acaoAtiva",
                "category": "ataque_corpo_a_corpo",
                "tags": []
              },
              "attack": {
                "hasAttack": true,
                "attribute": "precision",
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
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
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
        },
        {
          "name": "Combo",
          "cost": "",
          "typeAction": "",
          "typeAbility": "passiva",
          "description": "Caso você tenha sucesso em um teste de Precisão contra a Defesa de um Alvo, você receberá +1 em Precisão até o final desse turno. Esse efeito não acumula.",
          "note": "",
          "actions": []
        }
      ],
      "improvements": [
        {
          "title": "A) Aprendizado Instantâneo",
          "description": "Caso você realize Ataque Físico com o efeito de Combate Híbrido ou Esgrimista, e falhe no primeiro golpe, o segundo golpe receberá Aptidão.",
          "active": false
        },
        {
          "title": "B) Sequência",
          "description": "Aumente em 1 o valor de Precisão recebido por Combo.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_592cf2dcc7df",
          "name": "Esgrimista (Ataque Duplo)",
          "description": "Realiza dois golpes com Armamento Leve e mão livre.",
          "cost": "",
          "type": {
            "actionType": "acaoAtiva",
            "category": "ataque_corpo_a_corpo",
            "tags": []
          },
          "attack": {
            "hasAttack": true,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
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
    "_id": "ab00620000000000",
    "name": "Revidar",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Revidar.png",
    "folder": "fldhc00050000000",
    "_key": "!items!ab00620000000000",
    "system": {
      "name": "Revidar",
      "category": "ofensiva",
      "cost": "2 PE",
      "typeAction": "acaoRapida",
      "typeAbility": "habilidade",
      "types": [
        "defesa"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Conforme armamento",
      "duration": "Até o final do turno",
      "level": 1,
      "pathId": "ladino",
      "description": "Você contra-ataca rapidamente um alvo que lhe atacou.\nCaso você tenha sido Alvo de um Ataque Físico ou Ataque Mágico, no final des se turno, você poderá realizar um Ataque Físico ou Ataque Mágico contra o Alvo que realizou o ataque.\nCaso você tenha sucesso no teste de Agilidade contra este Ataque Físico ou Ataque Mágico, você receberá +1 em Precisão e Canalização até o final desse turno.",
      "subEffects": [],
      "improvements": [
        {
          "title": "A) Movimentação Vingativa",
          "description": "Antes de realizar o Ataque Físico ou Ataque Mágico com essa habilidade, você poderá utilizar uma Movimentação em direção ao Alvo dessa habilidade.",
          "active": false
        },
        {
          "title": "B) Vingança Precisa",
          "description": "Aumente em 1 o valor de Precisão e Canalização recebido por essa habilidade.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_69b66168f442",
          "name": "Contra-Ataque Físico",
          "description": "Contra-ataque físico no final do turno de quem lhe atacou.",
          "cost": "2 PE",
          "type": {
            "actionType": "acaoRapida",
            "category": "ataque_corpo_a_corpo",
            "tags": []
          },
          "attack": {
            "hasAttack": true,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        },
        {
          "id": "act_0c58576f4e8f",
          "name": "Contra-Ataque Mágico",
          "description": "Contra-ataque mágico no final do turno de quem lhe atacou.",
          "cost": "2 PE",
          "type": {
            "actionType": "acaoRapida",
            "category": "ataque_magico",
            "tags": []
          },
          "attack": {
            "hasAttack": true,
            "attribute": "channeling",
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
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        },
        {
          "id": "act_211683504279",
          "name": "Defesa Reativa (Agilidade)",
          "description": "Ao passar no teste de Agilidade contra o ataque, recebe +1 em Precisão e Canalização até o final do turno.",
          "cost": "",
          "type": {
            "actionType": "",
            "category": "defesa",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "agility",
            "difficulty": 0,
            "onSuccess": "+1 em Precisão e Canalização até o final do turno",
            "onFailure": ""
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
    "_id": "ab00630000000000",
    "name": "Ladinagem",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Ladinagem.png",
    "folder": "fldhc00050000000",
    "_key": "!items!ab00630000000000",
    "system": {
      "name": "Ladinagem",
      "category": "ofensiva",
      "cost": "",
      "typeAction": "",
      "typeAbility": "habilidade",
      "types": [
        "passiva",
        "ataque_corpo_a_corpo"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Conforme armamento",
      "duration": "Passiva",
      "level": 1,
      "pathId": "ladino",
      "description": "Você surpreende os alvos dos seus ataques, e quando estiverem desprevenidos...\nAo adquirir essa habilidade você receberá as seguintes técnicas:",
      "subEffects": [
        {
          "name": "Maestria Assassina",
          "cost": "",
          "typeAction": "",
          "typeAbility": "passiva",
          "description": "Ao receber Aptidão em um Ataque Físico, o dano causado por esse Ataque Físico será aumentado em 1d4. Esse valor é aumentado em 1d4 adicional para cada 2 pontos de Destreza.\nCaso o Ataque Físico realizado nessa habilidade seja realizado com dois Armamentos, ou com dois Ataques Desarmados, somente o primeiro golpe receberá o efeito dessa técnica.\nEssa técnica só poderá ser utilizada uma vez por turno.",
          "note": "",
          "actions": []
        },
        {
          "name": "Perito Em Arremesso",
          "cost": "",
          "typeAction": "",
          "typeAbility": "passiva",
          "description": "Você modifica a Regra de Arremesso, fazendo com que o dano causado por um Ataque Físico originado pelo arremesso de um Armamento Leve deixe de ser reduzido pela metade, causando o seu dano total.",
          "note": "",
          "actions": []
        },
        {
          "name": "Sem Escapatória",
          "cost": "",
          "typeAction": "reacao",
          "type": "ataque_corpo_a_corpo",
          "description": "Caso um Alvo realize uma Movimentação que o colocaria fora do alcance do seu Armamento ou Ataque Desarmado, você poderá realizar um Ataque Extra contra esse mesmo Alvo, antes que a movimentação ocorra. Você pode utilizar esse efeito apenas uma vez por rodada.",
          "note": "",
          "actions": []
        }
      ],
      "improvements": [
        {
          "title": "A) Corte Mortal de Lyferion",
          "description": "A diferença para você causar um Acerto Crítico é permanentemente reduzida em 1.",
          "active": false
        },
        {
          "title": "B) Debilitar",
          "description": "Ao atingir um Alvo com o Ataque Extra de Sem Escapatória, você aplicará Inaptidão no próximo teste de Parâmetro deste Alvo.",
          "active": false
        }
      ],
      "actions": []
    }
  },
  {
    "_id": "ab00650000000000",
    "name": "Manto Das Sombras",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Manto Das Sombras.png",
    "folder": "fldhc00050000000",
    "_key": "!items!ab00650000000000",
    "system": {
      "name": "Manto Das Sombras",
      "category": "ofensiva",
      "cost": "2 PE",
      "typeAction": "acaoAtiva",
      "typeAbility": "habilidade",
      "types": [
        "conjuracao"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "1 Minuto",
      "level": 1,
      "pathId": "ladino",
      "description": "Você é revestido por uma energia sombria, que faz com que o seu corpo, e tudo que você carrega consigo, desapareça, misturando-se com o Véu.\nAo adquirir essa habilidade, você passa a poder ficar Invisível.\nAlém disso, caso você atinja um Alvo com um Ataque Físico ou Ataque Mágico, e o Resultado Natural (Precisão ou Canalização) deste ataque tenha sido 10, ou mais, você poderá gastar 1 PE para ficar Invisível. Esse efeito ocorre apenas uma vez por turno.",
      "subEffects": [],
      "improvements": [
        {
          "title": "A) Caminhante das Sombras",
          "description": "O efeito des sa habilidade passa a ser realizado com um Resultado Natural de 8, ou mais, ao invés de 10.",
          "active": false
        },
        {
          "title": "B) Truques de Nistragard",
          "description": "Ao ter o efeito de Invisível dessa habilidade removido, você receberá Aptidão no seu próximo teste de Agilidade realizado dentro de até 1 minuto.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_058882fec184",
          "name": "Ativar Manto das Sombras",
          "description": "Fica Invisível e Furtivo imediatamente por 1 minuto.",
          "cost": "2 PE",
          "type": {
            "actionType": "acaoAtiva",
            "category": "conjuracao",
            "tags": [
              "conjuracao"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": true,
            "status": "Invisível",
            "duration": "1 Minuto",
            "description": "Invisível e Furtivo. Teste imediato de Furtividade."
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        },
        {
          "id": "act_c5c218a40fb5",
          "name": "Desvanecer no Crítico (10+)",
          "description": "Gasta 1 PE para ficar Invisível ao acertar ataque com d12 natural 10+ (1x por turno).",
          "cost": "1 PE",
          "type": {
            "actionType": "",
            "category": "conjuracao",
            "tags": [
              "conjuracao"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": true,
            "status": "Invisível",
            "duration": "1 Minuto",
            "description": ""
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
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
    "_id": "ab00660000000000",
    "name": "Perito Com Armamentos À Distância",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Perito Com Armamentos À Distância.png",
    "folder": "fldhc00050000000",
    "_key": "!items!ab00660000000000",
    "system": {
      "name": "Perito Com Armamentos À Distância",
      "category": "ofensiva",
      "cost": "",
      "typeAction": "",
      "typeAbility": "habilidade",
      "types": [
        "passiva",
        "ataque_distancia"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Conforme armamento",
      "duration": "Passiva",
      "level": 1,
      "pathId": "ladino",
      "description": "Somente com Armamentos à Distância\nVocê treinou arduamente para saber a melhor forma de utilizar esses armamentos.\nAo adquirir essa habilidade você receberá as seguintes técnicas, enquanto estiver utilizando um Armamento à Distância:",
      "subEffects": [
        {
          "name": "Mirar",
          "cost": "",
          "typeAction": "acaoSimples",
          "type": "ataque_distancia",
          "description": "Você mira rapidamente em um Alvo, recebendo +1 de Precisão nos seus Ataques Físicos com Armamentos à Distância contra esse Alvo, até o final desse turno.",
          "note": "",
          "actions": []
        },
        {
          "name": "Arquearia",
          "cost": "",
          "typeAction": "",
          "typeAbility": "passiva",
          "description": "Arcos, Bestas Pequenas e Bestas Grandes equipadas por você possuem a Propriedade Prioridade.",
          "note": "",
          "actions": []
        },
        {
          "name": "Manejo Com Armamentos À Distância",
          "cost": "",
          "typeAction": "",
          "typeAbility": "passiva",
          "description": "Você deixa de receber a Inaptidão gerada pela regra de Empunhadura Dupla ao equipar duas Bestas Pequenas, dois Revólveres, ou um de cada ao mesmo tempo.",
          "note": "",
          "actions": []
        },
        {
          "name": "Perito Com Recarga",
          "cost": "",
          "typeAction": "livre",
          "typeAbility": "passiva",
          "description": "No final do seu turno, sem custo de Ação, você pode recarregar até dois Armamentos equipados por você, que possuam Propriedade Tambor.",
          "note": "",
          "actions": []
        }
      ],
      "improvements": [
        {
          "title": "A) Olhos de Águia",
          "description": "Os seus Ataques Físicos com Arcos, Bestas Pequenas e Bestas Grandes ignoram Aptidões e Prioridades em testes de Defesa.",
          "active": false
        },
        {
          "title": "B) Técnica do Atirador",
          "description": "Alvos atingidos por seus Ataques Físicos com Revólveres e Mosquetes recebem -1 no seu próximo teste de Defesa. Esse efeito não acumula, mesmo vindo de fontes diferentes.",
          "active": false
        }
      ],
      "actions": []
    }
  },
  {
    "_id": "ab00690000000000",
    "name": "Reflexo Enganador",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Reflexo Enganador.png",
    "folder": "fldhc00050000000",
    "_key": "!items!ab00690000000000",
    "system": {
      "name": "Reflexo Enganador",
      "category": "defensiva",
      "cost": "2 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "habilidade",
      "types": [
        "conjuracao",
        "defesa",
        "foco"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "1 Metro",
      "duration": "1 Minuto",
      "level": 1,
      "pathId": "ladino",
      "description": "Com um movimento sutil, você manipula o Véu, criando uma cópia sua.\nVocê cria uma cópia ilusória sua em uma superfície a até 1 metro, que fala e age igual a você, mas permanece no mesmo local até o final da duração dessa habilidade.\nCaso um Alvo Inimigo a até 4 metros da ilusão inicie o seu turno, esse Alvo Inimigo deverá realizar um teste de Espírito, Dif. 8. Caso falhe, a próxima ação ofensiva realizada por esse Alvo Inimigo deverá ter a ilusão como Alvo, ao invés de você ou de seus Alvos Aliados. Caso a ação utilizada possua uma área de efeito, o ponto central deverá ser a ilusão.\nA ilusão criada por essa habilidade não possui nenhum tipo de Ação ou Parâmetros, mas pode realizar testes de Defesa normalmente. Essa ilusão falha automaticamente contra qualquer outro tipo de teste de Parâmetro.",
      "subEffects": [
        {
          "name": "Capacidade",
          "cost": "",
          "typeAction": "",
          "type": "defesa",
          "description": "A ilusão criada por esta habilidade não possui Pontos de Vida, mas sim 1 ponto de Capacidade.\nCaso essa ilusão receba qualquer tipo de dano, ela perderá 1 ponto de Capacidade. Com zero pontos de Capacidade, a ilusão desaparece.",
          "note": "",
          "actions": []
        }
      ],
      "improvements": [
        {
          "title": "A) Titereiro Místico",
          "description": "A Ação Simples utilizada para realizar essa habilidade é transformada em uma Ação Acelerada.",
          "active": false
        },
        {
          "title": "B) Aprimorar Ilusão",
          "description": "A dificuldade (Dif.) do teste de Espírito dessa habilidade é aumentada em 2.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_075ced7f65d9",
          "name": "Criar Cópia Ilusória",
          "description": "Cria cópia ilusória a até 1m com 1 ponto de Capacidade que atrai ações ofensivas inimigas.",
          "cost": "2 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "conjuracao",
            "tags": [
              "conjuracao",
              "foco",
              "defesa"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": true,
            "status": "Reflexo Enganador",
            "duration": "1 Minuto",
            "description": "Cria cópia com 1 ponto de Capacidade a até 1m que atrai ações ofensivas inimigas."
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        },
        {
          "id": "act_74e48928cfa0",
          "name": "Desviar Atenção (Espírito)",
          "description": "Inimigo a até 4m que iniciar turno deve passar em Espírito Dif. 8 ou mirar a ilusão.",
          "cost": "",
          "type": {
            "actionType": "",
            "category": "defesa",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "spirit",
            "difficulty": 8,
            "onSuccess": "Percebe a farsa e age livremente",
            "onFailure": "Próxima ação ofensiva deve ter a ilusão como alvo"
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 4,
            "unit": "m",
            "targetLimit": ""
          }
        }
      ]
    }
  },
  {
    "_id": "ab00700000000000",
    "name": "Marca Sombria",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/caminhos/Marca Sombria.png",
    "folder": "fldhc00050000000",
    "_key": "!items!ab00700000000000",
    "system": {
      "name": "Marca Sombria",
      "category": "auxiliadora",
      "cost": "2 PE",
      "typeAction": "acaoSimples",
      "typeAbility": "habilidade",
      "types": [
        "conjuracao",
        "foco"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "6 Metros",
      "duration": "Até passar no teste de Espírito",
      "level": 1,
      "pathId": "ladino",
      "description": "Você cria e mantém um símbolo místico sombrio sobre um alvo.\nVocê aplica essa Condição Mágica em um Alvo a até 6 metros, fazendo com que esse Alvo seja afetado por Escuridão.\nAlvos afetados por essa Condição Mágica poderão realizar um teste de Espírito, Dif. 8, no final dos seus turnos. Caso tenham sucesso, essa Condição Mágica será removida.",
      "subEffects": [],
      "improvements": [
        {
          "title": "A) Símbolo Sombrio",
          "description": "A dificuldade ( Dif.) do teste de Espírito dessa habilidade é aumentada em 2.",
          "active": false
        },
        {
          "title": "B) Cicatriz Sombria",
          "description": "O teste de Espírito dessa habilidade possui Inaptidão.",
          "active": false
        }
      ],
      "actions": [
        {
          "id": "act_a28dacbe65ff",
          "name": "Aplicar Marca Sombria",
          "description": "Aplica Condição Mágica em alvo a até 6m: afetado por Escuridão (Inaptidão em Percepção, visão 4m, -1 Precisão/Canalização).",
          "cost": "2 PE",
          "type": {
            "actionType": "acaoSimples",
            "category": "conjuracao",
            "tags": [
              "conjuracao",
              "foco"
            ]
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": true,
            "status": "Escuridão",
            "duration": "1 Minuto",
            "description": "Inaptidão em Percepção, visão 4 metros, -1 em Precisão e Canalização."
          },
          "check": {
            "hasCheck": false,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 10,
            "onSuccess": "",
            "onFailure": ""
          },
          "areaOfEffect": {
            "hasArea": false,
            "shape": "circle",
            "size": 3,
            "unit": "m",
            "targetLimit": ""
          }
        },
        {
          "id": "act_bf5529c18383",
          "name": "Teste de Espírito (Resistir)",
          "description": "Teste de Espírito Dif. 8 no final dos turnos do alvo para remover a Condição Mágica.",
          "cost": "",
          "type": {
            "actionType": "",
            "category": "defesa",
            "tags": []
          },
          "attack": {
            "hasAttack": false,
            "attribute": "precision",
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
          "condition": {
            "hasCondition": false,
            "status": "",
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "spirit",
            "difficulty": 8,
            "onSuccess": "Remove a Condição Mágica",
            "onFailure": "Permanece sob efeito de Escuridão"
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
  }
];

export const CAMINHOS_DATA = [
  {
    "_id": "path000100000000",
    "name": "O Caminho Do Andarilho",
    "type": "path",
    "img": "modules/gaia-compendium-manager/assets/caminhos/andarilho.png",
    "system": {
      "description": "“Eu não os entendo. Temos tantas possibilidades lá fora: um céu estrelado \nbanhado pela bênção das Três Luas, o cheiro fresco do campo, mas \npreferem vir aqui. Eles sabem que meu o companheiro, Temorog, não pode \nentrar nesses lugares, mas mesmo assim insistem e , por isso, ele terá que \nficar nestes estábulos gélidos novamente. \nQuerem bebidas? Posso fazer. Comida? Também consigo! Abrigo? \nDuvidarão que eu saiba erguer o melhor abrigo sob os céus dos seis \ncontinentes? Tudo bem... admito que, aquela vez ao lado do Lago Sombrio \nde Drakar , não tive a melhor das ideias, mas eu queria mesmo estudar \naquela criatura... Bom, aqui estamos, vivos, não? Eu tenho as melhores \nideias! Depois vir ão de joelhos , pedindo para eu c antar nossas histórias \nfantásticas por aí, com seus olhos brilhando acompanhando cada melodia \nda minha bela voz. \nMas sem problemas, pelo menos espero que aqui tenha aquela água escura \nque Zathryd me deu uma vez e, amanhã, espero lembrar de tudo para poder \ncantar de novo ‘Eu aviseeeeei’ enquanto retiro No’kan de dentro d e um \nbarril. De novo.” - Pharfena, a Melodicista\n\nPrimeiramente, antes de mais nada e depois não diga que não avisei: sempre carregue uma bolsa. É sério, você deve estar preparado para qualquer impasse, pois acredite, enfrentaremos muitos. Lidamos com cada desafio que o mundo nos revela — da selva viva à fera sem nome, da beleza ao pesadelo — tudo em nome da sobrevivência.\nNosso Véu é uma bênção tecida pelas raízes da natureza e tingida pelo desejo de liberdade. Não há fera que resista ao s nossos charmes. Mas, caso alguma consiga, é sempre bom saber onde está se metendo, com quem está se metendo e, principalmente, como lidar com a confusão na qual acabou se metendo. Não gastamos esforços para tentar entender o que somos, mas sim como é a nossa conexão com o mundo.\nOs laços com Auroria são inquebráveis e nós, Andarilhos, usamos tudo que ela tem a nos oferecer. Quando você chegar montado numa criatura escamada cuspindo fogo, não lhe chamarão de “garoto ou garota da fogueira”. Eles não sobreviver ão sem nós, disso você pode ter certeza.",
      "category": "primal",
      "specializations": [
        "<span class='spec-name'>Bardo.</span> <span class='spec-desc'>O menestrel, a trovadora, o contador de histórias de Auroria, que utiliza o Véu junto de seu instrumento musical.</span>",
        "<span class='spec-name'>Caçador.</span> <span class='spec-desc'>Um especialista que domina as feras  selvagens de Auroria, fazendo com que elas os ajudem na sua caçada.</span>",
        "<span class='spec-name'>Emissário.</span> <span class='spec-desc'>Um aventureiro que se conectou com as forças do Ciclo, lidando com a vida e a morte ao seu redor.</span>",
        "<span class='spec-name'>Druida.</span> <span class='spec-desc'>Um conjurador primal , vinculado às criaturas da natureza e em pacto com as Luas, as Três Guardiãs.</span>",
        "<span class='spec-name'>Ritualista.</span> <span class='spec-desc'>Um acólito dos rituais obscuros da floresta , que herda a manipulação de forças debilitantes.</span>"
      ],
      "keywords": [
        "Criatura Aliada",
        "Transformação",
        "Versatilidade"
      ],
      "parameterSuggestions": [
        "Canalização",
        "Espírito."
      ],
      "abilities": [
        {
          "id": "ab00010000000000",
          "name": "Companheiro Feral",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Companheiro Feral.png",
          "level": 1,
          "category": "ofensiva",
          "cost": "",
          "typeAction": "",
          "typeAbility": "passiva",
          "types": [
            "passiva"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "Pessoal",
          "duration": "Permanente",
          "description": "Você desperta o potencial de se conectar com criaturas de Auroria.\nAo adquirir essa habilidade, você aprende a domar criaturas, podendo possuir uma Criatura Aliada, isto é, um Alvo Aliado que lutará por você e por seus aliados. Você pode possuir apenas uma Criatura Aliada por vez.\nCaso você que já possua uma Criatura Aliada e queira domar outra criatura, a Criatura Aliada anterior perderá todos os seus efeitos de Criatura Aliada, não podendo ser domada novamente.\nVocê também possui as seguintes técnicas:",
          "subEffects": [
            {
              "name": "Domar Criatura",
              "cost": "",
              "typeAction": "acaoSimples",
              "typeAbility": "passiva",
              "description": "Essa técnica só funciona contra criaturas às quais você não tenha causado danos e que possuam um Nível de Criatura igual, ou menor que o seu Nível de Despertar. Somente criaturas de Dificuldade Fácil e que possuam, pelo menos, uma Característica do Livro dos Seres Ferais podem ser afetadas por essa técnica.\nVocê e uma criatura a até 2 metros realizam um Teste de Destino. Caso ambos os resultados sejam pares, ou ímpares, você domará a criatura, tornando-a sua Criatura Aliada.",
              "note": "",
              "actions": []
            },
            {
              "name": "Ataque Sincronizado",
              "cost": "",
              "typeAction": "",
              "typeAbility": "passiva",
              "description": "Sempre que você realizar um Ataque Físico ou um Ataque Mágico contra um Alvo e o seu Resultado Natural (Precisão ou Canalização) seja 10, ou mais, o próximo Golpe Brutal ou Evocação Mística da sua Criatura Aliada nesse mesmo Alvo durante esse turno possuirá Aptidão.",
              "note": "",
              "actions": []
            },
            {
              "name": "Regra Especial de Criatura Aliada",
              "cost": "",
              "typeAction": "",
              "typeAbility": "passiva",
              "description": "A Criatura Aliada não pode realizar Características de Iniciativa, mas possui um turno completo durante o seu turno, podendo utilizar sua Ação Ativa, Ação Simples, Ação Rápida e Movimentação.\nCaso você fique Incapacitado, a Criatura Aliada não poderá realizar nenhum tipo de Ação ou Movimentação até você ficar com, pelo menos, 1 Ponto de Vida.\nA Criatura Aliada passa a possuir as mesmas regras de morte de um personagem, ficando Incapacitada caso chegue a zero, ou menos, Pontos de Vida, recebendo pontos de Exaustão e Pontos de Vida Negativos. Ela também é afetada pela regra do Dado de Morte, enquanto Incapacitada.",
              "note": "",
              "actions": []
            },
            {
              "name": "Evoluindo Uma Criatura Aliada",
              "cost": "",
              "typeAction": "",
              "typeAbility": "passiva",
              "description": "Sempre que você adquirir Níveis de Despertar, a sua Criatura Aliada também evoluirá com o padrão de evolução do Homuncularium (NÍVEIS DE CRIATURA E VALORES ADICIONAIS).",
              "note": "",
              "actions": []
            },
            {
              "name": "Personagem Nível 1",
              "cost": "",
              "typeAction": "",
              "typeAbility": "passiva",
              "description": "Caso esta habilidade seja adquirida no momento da criação do seu personagem, você poderá moldar a sua Criatura Aliada (Fácil) junto com o seu Narrador.",
              "note": "",
              "actions": []
            }
          ],
          "improvements": [
            {
              "title": "A) Sincronia Selvagem",
              "description": "O Ataque Sincronizado passa a ser realizado caso o Resultado Natural (Precisão ou Canalização) seja 8, ou mais.",
              "active": false
            },
            {
              "title": "B) Fortalecer Companheiro",
              "description": "Aumente em 1 a Categoria de Dado do dano causado pelo Golpe Brutal e a Evocação Mística da sua Criatura Aliada.",
              "active": false
            }
          ],
          "actions": []
        },
        {
          "id": "ab00030000000000",
          "name": "Descendente Dos Filhos Da Floresta",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Descendente Dos Filhos Da Floresta.png",
          "level": 1,
          "category": "ofensiva",
          "cost": "",
          "typeAction": "acaoSimples",
          "typeAbility": "iniciativa",
          "types": [
            "iniciativa"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "Pessoal",
          "duration": "Até o próximo Repouso",
          "description": "Você se entrega ao mundo primitivo, transformando-se numa criatura de Auroria.\nVocê pode realizar essa habilidade como Ação Simples ou Iniciativa, recebendo uma Transformação com base na ação escolhida:",
          "subEffects": [
            {
              "name": "Animal Selvagem",
              "cost": "",
              "typeAction": "acaoSimples",
              "typeAbility": "passiva",
              "description": "Você se transforma por completo em um animal selvagem da fauna de Auroria (desde que tenha a autorização do Narrador). Esse animal deve possuir a mesma Categoria de Tamanho que a sua.\nCaso você possua equipamentos e pertences ao se transformar, eles serão transformados em pequenas marcas místicas, que se espalham pelo seu corpo, retornando à sua forma original ao desfazer a transformação.\nVocê também recebe uma das seguintes Características à sua escolha ao se transformar nessa criatura: Anfíbio (Seres Comuns), Mobilidade (Seres Ferais) ou Voar (Seres Comuns).\nEnquanto transformado em Animal Selvagem, você perde todo Efeito Positivo e Foco ativo. Além disso, você não poderá utilizar Habilidades de Caminhos enquanto transformado.\nEsse tipo de transformação não possui duração, sendo removida caso você realize um Repouso.",
              "note": "",
              "actions": []
            },
            {
              "name": "Criatura Do Homuncularium",
              "cost": "",
              "typeAction": "iniciativa",
              "type": "iniciativa",
              "description": "Ao iniciar um combate, você transforma uma parte do seu corpo, adquirindo duas Características à sua escolha entre o Livro dos Seres Comuns e o Livro dos Seres Ferais de Dificuldade Fácil.\nEssa Transformação permanece até o final de um combate.\nVocê pode desfazer qualquer uma das Transformações acima com uma Ação Simples.",
              "note": "",
              "actions": []
            }
          ],
          "improvements": [
            {
              "title": "A) Aprimorar Transformação",
              "description": "Você recebe 1 Característica adicional ao utilizar qualquer uma das Transformações dessa habilidade.",
              "active": false
            },
            {
              "title": "B) Maestria Primitiva",
              "description": "Você recebe 1 Característica adicional ao utilizar qualquer uma das Transformações dessa habilidade.",
              "active": false
            }
          ],
          "actions": []
        },
        {
          "id": "ab00060000000000",
          "name": "Perturbação Lúgubre",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Perturbação Lúgubre.png",
          "level": 1,
          "category": "ofensiva",
          "cost": "2 PE",
          "typeAction": "acaoAtiva",
          "typeAbility": "conjuracao",
          "types": [
            "conjuracao"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "6 Metros",
          "duration": "Até passar no teste de Espírito",
          "description": "Você cria um símbolo num alvo que, lentamente, começa a ruir de dentro para fora.\nVocê aplica e ssa Condição Mágica em um Alvo a até 6 metros, fazendo com que, sempre que este Alvo receber qualquer tipo de dano enquanto estiver com essa Condição Mágica, esse dano será aumentado em 1d8 como Dano Imaterial. Esse efeito ocorre apenas uma vez por turno, por Alvo.\nAlvos afetados por essa Condição Mágica não podem regenerar Pontos de Vida e Pontos de Energia enquanto ela não for removida.\nAlvos afetados por essa Condição Mágica poderão realizar um teste de Espírito, Dif. 8, no final dos seus turnos. Caso tenham sucesso, removerão essa Condição Mágica.",
          "subEffects": [],
          "improvements": [
            {
              "title": "A) Forças Malditas",
              "description": "A dificuldade ( Dif.) do teste de Espírito dessa habilidade é aumentada em 2.",
              "active": false
            },
            {
              "title": "B) Conectar o Fim",
              "description": "Aumenta em 1 o número de Alvos dessa habilidade. Este valor é aumentado em 1 para cada 3 pontos de Canalização que você possua.",
              "active": false
            }
          ],
          "actions": [
            {
              "id": "act_04bd3863d6d0",
              "name": "Perturbação Lúgubre (Conjurar)",
              "description": "Aplica Condição Mágica a até 6m. Dano recebido sofre +1d8 Dano Imaterial. Não regenera PV nem PE.",
              "cost": "2 PE",
              "type": {
                "actionType": "acaoAtiva",
                "category": "conjuracao",
                "tags": [
                  "conjuracao"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
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
              "condition": {
                "hasCondition": true,
                "status": "Perturbação Lúgubre",
                "duration": "1 Minuto",
                "description": "Dano sofrido aumentado em 1d8 Dano Imaterial. Não regenera PV nem PE."
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": true,
                "shape": "circle",
                "size": 6,
                "unit": "m",
                "targetLimit": ""
              }
            },
            {
              "id": "act_d1ec59c17900",
              "name": "Dano Imaterial Adicional",
              "description": "Dano adicional de 1d8 Imaterial sempre que o alvo afetado sofrer dano (1x por turno).",
              "cost": "",
              "type": {
                "actionType": "",
                "category": "conjuracao",
                "tags": []
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
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
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 3,
                "unit": "m",
                "targetLimit": ""
              }
            },
            {
              "id": "act_43350e4824af",
              "name": "Teste de Espírito (Resistir)",
              "description": "Teste de Espírito Dif. 8 no final dos turnos do alvo para remover a Condição Mágica.",
              "cost": "",
              "type": {
                "actionType": "",
                "category": "defesa",
                "tags": []
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
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
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": true,
                "category": "parameter",
                "attribute": "spirit",
                "difficulty": 8,
                "onSuccess": "Remove a Condição Mágica Perturbação Lúgubre.",
                "onFailure": "Permanece sob efeito de Perturbação Lúgubre."
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
        },
        {
          "id": "ab00070000000000",
          "name": "Forças Do Ciclo",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Forças Do Ciclo.png",
          "level": 1,
          "category": "ofensiva",
          "cost": "1 PE",
          "typeAction": "acaoAtiva",
          "typeAbility": "ataque_magico",
          "types": [
            "ataque_magico",
            "conjuracao"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "6 Metros",
          "duration": "Até passar no teste de Espírito",
          "description": "Você canaliza as energias do Ciclo criando uma esfera de energia.\nVocê realiza um Ataque Mágico contra um Alvo a até 6 metros.\nCaso acerte, você causará nes se Alvo um Dano Mágico de Natureza ou Dano Mágico Profano de valor igual ao seu total máximo de Pontos de Energia.\nO Alvo que recebeu esse dano também é afetado por Tributo por 1 minuto.\nSempre que um Alvo com essa Condição Mágica gastar Pontos de Energia, o conjurador dessa Condição Mágica poderá realizar um teste de Canalização, Dif. 10. Caso tenha sucesso, o conjurador dessa Condição Mágica regenerará 1 Ponto de Energia de um Alvo Aliado a até 6 metros. Esse efeito só pode ocorrer uma vez por turno.\nAlvos afetados por essa Condição Mágica poderão realizar um teste de Espírito, Dif. 8, no final dos seus turnos. Caso tenham sucesso, removerão essa Condição Mágica.",
          "subEffects": [],
          "improvements": [
            {
              "title": "A) Dominação das Forças do Ciclo",
              "description": "A dificuldade ( Dif.) do teste de Espírito dessa habilidade é aumentada em 2.",
              "active": false
            },
            {
              "title": "B) Sinergia Natural",
              "description": "A dificuldade (Dif.) do teste de Canalização dessa habilidade é reduzida em 2.",
              "active": false
            }
          ],
          "actions": [
            {
              "id": "act_3e1c229ec3f4",
              "name": "Ataque do Ciclo (Natureza)",
              "description": "Ataque Mágico a até 6 metros causando Dano de Natureza igual ao total máximo de PE e aplicando Tributo por 1 minuto.",
              "cost": "1 PE",
              "type": {
                "actionType": "acaoAtiva",
                "category": "ataque_magico",
                "tags": [
                  "conjuracao"
                ]
              },
              "attack": {
                "hasAttack": true,
                "attribute": "channeling",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard"
              },
              "damage": {
                "hasDamage": true,
                "formula": "@energy.max",
                "type": "nature",
                "criticalBonus": "",
                "scaling": ""
              },
              "condition": {
                "hasCondition": true,
                "status": "Tributo",
                "duration": "1 Minuto",
                "description": "Ao gastar PE, conjurador pode testar Canalização para curar 1 PE de aliado."
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 3,
                "unit": "m",
                "targetLimit": ""
              }
            },
            {
              "id": "act_6d8d011d37fa",
              "name": "Ataque do Ciclo (Profano)",
              "description": "Ataque Mágico a até 6 metros causando Dano Profano igual ao total máximo de PE e aplicando Tributo.",
              "cost": "1 PE",
              "type": {
                "actionType": "acaoAtiva",
                "category": "ataque_magico",
                "tags": [
                  "conjuracao"
                ]
              },
              "attack": {
                "hasAttack": true,
                "attribute": "channeling",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard"
              },
              "damage": {
                "hasDamage": true,
                "formula": "@energy.max",
                "type": "profane",
                "criticalBonus": "",
                "scaling": ""
              },
              "condition": {
                "hasCondition": true,
                "status": "Tributo",
                "duration": "1 Minuto",
                "description": "Afetado por Tributo por 1 minuto."
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 3,
                "unit": "m",
                "targetLimit": ""
              }
            },
            {
              "id": "act_188cbfffc403",
              "name": "Drenar Tributo (Canalização)",
              "description": "Quando o alvo com Tributo gasta PE, realize teste de Canalização Dif. 10 para regenerar 1 PE de aliado a 6m.",
              "cost": "",
              "type": {
                "actionType": "",
                "category": "conjuracao",
                "tags": []
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
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
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": true,
                "category": "parameter",
                "attribute": "channeling",
                "difficulty": 10,
                "onSuccess": "Regenera 1 Ponto de Energia de um aliado a até 6 metros.",
                "onFailure": "Não regenera PE."
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 3,
                "unit": "m",
                "targetLimit": ""
              }
            },
            {
              "id": "act_2b1986811f29",
              "name": "Teste de Espírito (Resistir Tributo)",
              "description": "Teste de Espírito Dif. 8 no final dos turnos do alvo para remover o Tributo.",
              "cost": "",
              "type": {
                "actionType": "",
                "category": "defesa",
                "tags": []
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
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
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": true,
                "category": "parameter",
                "attribute": "spirit",
                "difficulty": 8,
                "onSuccess": "Remove a Condição Mágica Tributo.",
                "onFailure": "Permanece sob efeito de Tributo."
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
        },
        {
          "id": "ab00080000000000",
          "name": "Enfeitiçar",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Enfeitiçar.png",
          "level": 1,
          "category": "defensiva",
          "cost": "2 PE",
          "typeAction": "acaoAtiva",
          "typeAbility": "conjuracao",
          "types": [
            "conjuracao",
            "foco"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "6 Metros",
          "duration": "Até passar no teste de Espírito",
          "description": "Seus olhos mudam de cor, fazendo com que a mente de um ser desprevenido possa ser moldada à sua vontade.\nVocê aplica essa Condição Mágica a um Alvo a até 6 metros, fazendo com que ele o considere um Alvo Aliado, além de fazer com que es se Alvo não realize ações ofensivas que causem Efeitos Negativos, Condições Mágicas ou dano contra você.\nVocê possui Aptidão em testes de Conhecimentos contra o Alvo sob efeito dessa Condição Mágica.\nO Alvo sob efeito dessa Condição Mágica poderá realizar um teste de Espírito, Dif. 8, ao fina l dos seus turnos. Caso tenha sucesso, a Condição Mágica será removida.\nCaso um efeito vindo de você cause qualquer tipo de dano, Condição Mágica, Condição Física ou Efeito Negativo no Alvo afetado por essa Condição Mágica, ela será removida.",
          "subEffects": [],
          "improvements": [
            {
              "title": "A) Poder da Mente",
              "description": "A dificuldade ( Dif.) do teste de Espírito dessa habilidade é aumentada em 2.",
              "active": false
            },
            {
              "title": "B) Mestre Enfeitiçador",
              "description": "Essa habilidade não é mais considerada uma habilidade de Foco. Além disso, o seu custo de PE é reduzido em 1.",
              "active": false
            }
          ],
          "actions": [
            {
              "id": "act_90e5d00abb15",
              "name": "Enfeitiçar Alvo",
              "description": "Aplica Condição Mágica a até 6m. Alvo o considera aliado e não realiza ações ofensivas contra você. Aptidão em Conhecimentos contra ele.",
              "cost": "2 PE",
              "type": {
                "actionType": "acaoAtiva",
                "category": "conjuracao",
                "tags": [
                  "conjuracao",
                  "foco"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
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
              "condition": {
                "hasCondition": true,
                "status": "Enfeitiçado",
                "duration": "1 Minuto",
                "description": "Considera conjurador aliado. Conjurador tem Aptidão em testes de Conhecimentos contra o alvo."
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 3,
                "unit": "m",
                "targetLimit": ""
              }
            },
            {
              "id": "act_6c5db96776cf",
              "name": "Teste de Espírito (Resistir)",
              "description": "Teste de Espírito Dif. 8 no final dos turnos do alvo para remover o efeito.",
              "cost": "",
              "type": {
                "actionType": "",
                "category": "defesa",
                "tags": []
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
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
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": true,
                "category": "parameter",
                "attribute": "spirit",
                "difficulty": 8,
                "onSuccess": "Remove a Condição Mágica Enfeitiçado.",
                "onFailure": "Permanece Enfeitiçado."
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
        },
        {
          "id": "ab00090000000000",
          "name": "Grilhões Primais",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Grilhões Primais.png",
          "level": 1,
          "category": "defensiva",
          "cost": "1 PE",
          "typeAction": "acaoRapida",
          "typeAbility": "conjuracao",
          "types": [
            "conjuracao"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "6 Metros",
          "duration": "Até o final do turno do Alvo",
          "description": "Você toca o chão e clama pelas forças primitivas da natureza, que respondem com poderosas vinhas, as quais tentam prender o seu alvo temporariamente.\nVocê cria vinhas que forçam um Alvo a até 6 metros a um teste de Vigor, Dif. 8. Caso falhe, o Alvo ficará Imóvel. Es se Imóvel é removido no final do turno deste Alvo.\nEnquanto com es se Imóvel, este Alvo também possuirá -1 em todos os seus testes de Defesa.",
          "subEffects": [],
          "improvements": [
            {
              "title": "A) Grilhões Ancestrais",
              "description": "A dificuldade ( Dif.) do teste de Vigor dessa habilidade é aumentada em 2.",
              "active": false
            },
            {
              "title": "B) Controle Primal",
              "description": "O teste de Vigor dessa habilidade possui Inaptidão.",
              "active": false
            }
          ],
          "actions": [
            {
              "id": "act_f2699905cccb",
              "name": "Lançar Grilhões Primais",
              "description": "Vinhas forçam alvo a até 6m a teste de Vigor Dif. 8. Falha: Imóvel até o fim do turno e -1 em Defesa.",
              "cost": "1 PE",
              "type": {
                "actionType": "acaoRapida",
                "category": "conjuracao",
                "tags": [
                  "conjuracao"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
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
              "condition": {
                "hasCondition": true,
                "status": "Imóvel",
                "duration": "Fim do turno",
                "description": "Imóvel e -1 em todos os testes de Defesa."
              },
              "check": {
                "hasCheck": true,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 8,
                "onSuccess": "Evita as vinhas.",
                "onFailure": "Fica Imóvel até o final do turno e recebe -1 em testes de Defesa."
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
        },
        {
          "id": "ab00100000000000",
          "name": "Explorador De Auroria",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Explorador De Auroria.png",
          "level": 1,
          "category": "defensiva",
          "cost": "",
          "typeAction": "",
          "typeAbility": "passiva",
          "types": [
            "passiva"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "8 Metros",
          "duration": "Até o final do combate",
          "description": "Você aprendeu os segredos de determinados tipos de criaturas de Auroria, tornando-se o seu maior predador.\nVocê consegue identificar os Livros, Parâmetros Ofensivos, Parâmetros Defensivos e Poder de toda criatura do Homuncularium a até 8 metros, recebendo também a seguinte técnica:",
          "subEffects": [
            {
              "name": "Adaptação Selvagem",
              "cost": "",
              "typeAction": "livre",
              "typeAbility": "passiva",
              "description": "Essa técnica só pode ser realizada uma vez por combate.\nCaso um Alvo Aliado a até 8 metros seja afetado por uma Característica que não seja uma Característica Adicional ou Cólera, sem custo de Ação, você poderá escolher não ser mais afetado pelos efeitos dessa mesma Característica até o final desse combate.",
              "note": "",
              "actions": []
            },
            {
              "name": "Técnicas de Sobrevivência",
              "cost": "",
              "typeAction": "",
              "typeAbility": "passiva",
              "description": "Ao adquirir essa habilidade, você também receberá uma das Técnicas de Sobrevivência à sua escolha:\n• Você ignora a regra de 2 horas adicionais ao receber os efeitos vindos de Repousos, caso esteja repousando em local desconfortável.\n• Você é imune aos efeitos aplicados pelo Combate Aquático.\n• Você passa automaticamente no teste da ação Estabilizar.\n• Você possui Infravisão.",
              "note": "",
              "actions": []
            }
          ],
          "improvements": [
            {
              "title": "A) Conhecimento Selvagem",
              "description": "Criaturas afetadas pela sua Adaptação Selvagem também têm a Categoria de Dado dos seus Golpes Brutais e Evocações Místicas reduzida em 1 por 1 minuto.",
              "active": false
            },
            {
              "title": "B) Sobrevivencialista",
              "description": "Adquiria duas novas Técnica de Sobrevivência dessa habilidade que você ainda não possui.",
              "active": false
            }
          ],
          "actions": []
        },
        {
          "id": "ab00110000000000",
          "name": "Invólucro Cinzento",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Invólucro Cinzento.png",
          "level": 1,
          "category": "auxiliadora",
          "cost": "1 PE",
          "typeAction": "acaoRapida",
          "typeAbility": "conjuracao",
          "types": [
            "conjuracao"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "Conforme efeito",
          "duration": "Instantânea",
          "description": "Você drena as forças ao seu redor, redirecionando um poder corrompido a outro alvo.\nAo receber um Efeito Negativo ou Condição Mágica de um Alvo, você poderá forçar esse mesmo Alvo a um teste de Espírito, Dif. 8. Caso falhe, o Alvo receberá o mesmo Efeito Negativo ou Condição Mágica aplicado em você.",
          "subEffects": [],
          "improvements": [
            {
              "title": "A) Sussurros da Floresta",
              "description": "A dificuldade ( Dif.) do teste de Espírito dessa habilidade é aumentada em 2.",
              "active": false
            },
            {
              "title": "B) Prática Maldita",
              "description": "Caso você já tenha utilizado essa habilidade em uma rodada, você poderá utilizar essa habilidade uma vez adicional nessa mesma rodada.",
              "active": false
            }
          ],
          "actions": [
            {
              "id": "act_46aa9d1d7733",
              "name": "Refletir Malefício (Espírito)",
              "description": "Ao receber Efeito Negativo ou Condição Mágica, força agressor a teste de Espírito Dif. 8 para receber o mesmo efeito.",
              "cost": "1 PE",
              "type": {
                "actionType": "acaoRapida",
                "category": "conjuracao",
                "tags": [
                  "conjuracao"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
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
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": true,
                "category": "parameter",
                "attribute": "spirit",
                "difficulty": 8,
                "onSuccess": "Alvo resiste ao reflexo do malefício.",
                "onFailure": "Alvo recebe o mesmo Efeito Negativo ou Condição Mágica aplicado no conjurador."
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
        },
        {
          "id": "ab00120000000000",
          "name": "Decreto Lunar",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Decreto Lunar.png",
          "level": 1,
          "category": "auxiliadora",
          "cost": "2 PE",
          "typeAction": "acaoSimples",
          "typeAbility": "conjuracao",
          "types": [
            "conjuracao",
            "foco"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "6 Metros",
          "duration": "1 Minuto",
          "description": "Você reveste o corpo de um alvo com uma energia prateada.\nVocê evoca o poder das Luas, aplicando um dos seguintes efeitos em um Alvo a até 6 metros:",
          "subEffects": [
            {
              "name": "Lua Crescente",
              "cost": "2 PE",
              "typeAction": "acaoSimples",
              "type": "suporte",
              "description": "Efeito Positivo\nUma vez por rodada, antes que você realize um teste de Parâmetro ou Bloqueio, você poderá aplicar Aptidão nesse teste.",
              "note": "",
              "actions": [
                {
                  "id": "act_lua_crescente",
                  "name": "Lua Crescente",
                  "description": "Aplica o Efeito Positivo 'Lua Crescente' em um Alvo a até 6 metros por 1 minuto. Uma vez por rodada, antes de realizar um teste de Parâmetro ou Bloqueio, o alvo pode aplicar Aptidão nesse teste.",
                  "cost": "2 PE",
                  "type": {
                    "actionType": "acaoSimples",
                    "category": "suporte",
                    "tags": [
                      "conjuracao",
                      "foco"
                    ]
                  },
                  "attack": {
                    "hasAttack": false,
                    "attribute": "channeling",
                    "knowledge": "",
                    "bonus": "",
                    "rollType": "standard"
                  },
                  "damage": {
                    "hasDamage": false,
                    "formula": "",
                    "type": "light",
                    "criticalBonus": "",
                    "scaling": ""
                  },
                  "condition": {
                    "hasCondition": true,
                    "status": "Lua Crescente",
                    "duration": "1 Minuto",
                    "description": "Efeito Positivo: Uma vez por rodada, antes de realizar um teste de Parâmetro ou Bloqueio, pode aplicar Aptidão nesse teste."
                  },
                  "check": {
                    "hasCheck": false,
                    "category": "parameter",
                    "attribute": "spirit",
                    "difficulty": 8,
                    "onSuccess": "",
                    "onFailure": ""
                  },
                  "areaOfEffect": {
                    "hasArea": false,
                    "shape": "circle",
                    "size": 6,
                    "unit": "m",
                    "targetLimit": "1"
                  }
                }
              ]
            },
            {
              "name": "Lua Minguante",
              "cost": "2 PE",
              "typeAction": "acaoSimples",
              "type": "conjuracao",
              "description": "Condição Mágica\nUma vez por rodada, antes que você realize um teste de Parâmetro ou Bloqueio, o Alvo que aplicou essa Condição Mágica poderá aplicar Inaptidão nesse teste. O Alvo afetado por essa Condição Mágica poderá realizar um teste de Espírito, Dif. 8, no final dos seus turnos. Caso tenha sucesso, essa Condição Mágica será removida.",
              "note": "",
              "actions": [
                {
                  "id": "act_lua_minguante",
                  "name": "Lua Minguante",
                  "description": "Aplica a Condição Mágica 'Lua Minguante' em um Alvo a até 6 metros por 1 minuto. Uma vez por rodada, antes que o alvo realize teste de Parâmetro ou Bloqueio, o aplicador pode aplicar Inaptidão nesse teste. Teste de Espírito Dif. 8 no final dos turnos do alvo para remover.",
                  "cost": "2 PE",
                  "type": {
                    "actionType": "acaoSimples",
                    "category": "conjuracao",
                    "tags": [
                      "conjuracao",
                      "foco"
                    ]
                  },
                  "attack": {
                    "hasAttack": false,
                    "attribute": "channeling",
                    "knowledge": "",
                    "bonus": "",
                    "rollType": "standard"
                  },
                  "damage": {
                    "hasDamage": false,
                    "formula": "",
                    "type": "dark",
                    "criticalBonus": "",
                    "scaling": ""
                  },
                  "condition": {
                    "hasCondition": true,
                    "status": "Lua Minguante",
                    "duration": "1 Minuto",
                    "description": "Condição Mágica: Uma vez por rodada, o aplicador pode aplicar Inaptidão em um teste de Parâmetro ou Bloqueio seu. Teste de Espírito Dif. 8 no fim do seu turno para remover."
                  },
                  "check": {
                    "hasCheck": true,
                    "category": "parameter",
                    "attribute": "spirit",
                    "difficulty": 8,
                    "onSuccess": "Remove a Condição Mágica Lua Minguante",
                    "onFailure": "Permanece sob efeito de Lua Minguante"
                  },
                  "areaOfEffect": {
                    "hasArea": false,
                    "shape": "circle",
                    "size": 6,
                    "unit": "m",
                    "targetLimit": "1"
                  }
                },
                {
                  "id": "act_resistir_lua_minguante",
                  "name": "Resistir: Lua Minguante",
                  "description": "Teste de Espírito Dif. 8 no final do turno do alvo afetado para remover a Condição Mágica Lua Minguante (Dif. 10 com Aprimoramento Augúrio Lunar).",
                  "cost": "",
                  "type": {
                    "actionType": "",
                    "category": "defesa",
                    "tags": []
                  },
                  "attack": {
                    "hasAttack": false,
                    "attribute": "spirit",
                    "knowledge": "",
                    "bonus": "",
                    "rollType": "standard"
                  },
                  "damage": {
                    "hasDamage": false,
                    "formula": "",
                    "type": "immaterial",
                    "criticalBonus": "",
                    "scaling": ""
                  },
                  "condition": {
                    "hasCondition": false,
                    "status": "",
                    "duration": "",
                    "description": ""
                  },
                  "check": {
                    "hasCheck": true,
                    "category": "parameter",
                    "attribute": "spirit",
                    "difficulty": 8,
                    "onSuccess": "Remove a Condição Mágica Lua Minguante",
                    "onFailure": "Permanece sob efeito de Lua Minguante"
                  },
                  "areaOfEffect": {
                    "hasArea": false,
                    "shape": "circle",
                    "size": 0,
                    "unit": "m",
                    "targetLimit": ""
                  }
                }
              ]
            }
          ],
          "improvements": [
            {
              "title": "A) Presente das Três Guardiãs",
              "description": "Sempre que você aplicar esse Efeito Positivo em um Alvo, você também receberá esse Efeito Positivo.",
              "active": false
            },
            {
              "title": "B) Augúrio Lunar",
              "description": "A dificuldade ( Dif.) do teste de Espírito da Lua Minguante é aumentada em 2.",
              "active": false
            }
          ],
          "actions": [
            {
              "id": "act_lua_crescente",
              "name": "Lua Crescente",
              "description": "Aplica o Efeito Positivo 'Lua Crescente' em um Alvo a até 6 metros por 1 minuto. Uma vez por rodada, antes de realizar um teste de Parâmetro ou Bloqueio, o alvo pode aplicar Aptidão nesse teste.",
              "cost": "2 PE",
              "type": {
                "actionType": "acaoSimples",
                "category": "suporte",
                "tags": [
                  "conjuracao",
                  "foco"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "channeling",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard"
              },
              "damage": {
                "hasDamage": false,
                "formula": "",
                "type": "light",
                "criticalBonus": "",
                "scaling": ""
              },
              "condition": {
                "hasCondition": true,
                "status": "Lua Crescente",
                "duration": "1 Minuto",
                "description": "Efeito Positivo: Uma vez por rodada, antes de realizar um teste de Parâmetro ou Bloqueio, pode aplicar Aptidão nesse teste."
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "spirit",
                "difficulty": 8,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 6,
                "unit": "m",
                "targetLimit": "1"
              }
            },
            {
              "id": "act_lua_minguante",
              "name": "Lua Minguante",
              "description": "Aplica a Condição Mágica 'Lua Minguante' em um Alvo a até 6 metros por 1 minuto. Uma vez por rodada, antes que o alvo realize teste de Parâmetro ou Bloqueio, o aplicador pode aplicar Inaptidão nesse teste. Teste de Espírito Dif. 8 no final dos turnos do alvo para remover.",
              "cost": "2 PE",
              "type": {
                "actionType": "acaoSimples",
                "category": "conjuracao",
                "tags": [
                  "conjuracao",
                  "foco"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "channeling",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard"
              },
              "damage": {
                "hasDamage": false,
                "formula": "",
                "type": "dark",
                "criticalBonus": "",
                "scaling": ""
              },
              "condition": {
                "hasCondition": true,
                "status": "Lua Minguante",
                "duration": "1 Minuto",
                "description": "Condição Mágica: Uma vez por rodada, o aplicador pode aplicar Inaptidão em um teste de Parâmetro ou Bloqueio seu. Teste de Espírito Dif. 8 no fim do seu turno para remover."
              },
              "check": {
                "hasCheck": true,
                "category": "parameter",
                "attribute": "spirit",
                "difficulty": 8,
                "onSuccess": "Remove a Condição Mágica Lua Minguante",
                "onFailure": "Permanece sob efeito de Lua Minguante"
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 6,
                "unit": "m",
                "targetLimit": "1"
              }
            },
            {
              "id": "act_resistir_lua_minguante",
              "name": "Resistir: Lua Minguante",
              "description": "Teste de Espírito Dif. 8 no final do turno do alvo afetado para remover a Condição Mágica Lua Minguante (Dif. 10 com Aprimoramento Augúrio Lunar).",
              "cost": "",
              "type": {
                "actionType": "",
                "category": "defesa",
                "tags": []
              },
              "attack": {
                "hasAttack": false,
                "attribute": "spirit",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard"
              },
              "damage": {
                "hasDamage": false,
                "formula": "",
                "type": "immaterial",
                "criticalBonus": "",
                "scaling": ""
              },
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": true,
                "category": "parameter",
                "attribute": "spirit",
                "difficulty": 8,
                "onSuccess": "Remove a Condição Mágica Lua Minguante",
                "onFailure": "Permanece sob efeito de Lua Minguante"
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 0,
                "unit": "m",
                "targetLimit": ""
              }
            }
          ]
        },
        {
          "id": "ab00130000000000",
          "name": "Técnica Musical",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Técnica Musical.png",
          "level": 1,
          "category": "auxiliadora",
          "cost": "1 PE",
          "typeAction": "acaoSimples",
          "typeAbility": "conjuracao",
          "types": [
            "conjuracao"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "4 Metros",
          "duration": "Instantânea",
          "description": "Seja com um instrumento ou com um canto, você começa a realizar uma melodia que auxilia os seus aliados.\nVocê exala uma melodia que afeta você e todos os Alvos Aliados a até 4 metros, aplicando um dos seguintes efeitos:",
          "subEffects": [
            {
              "name": "Verso",
              "cost": "1 PE",
              "typeAction": "acaoSimples",
              "typeAbility": "passiva",
              "description": "A sua próxima Movimentação é aumentada em 2 metros.",
              "note": "",
              "actions": []
            },
            {
              "name": "Refrão",
              "cost": "1 PE",
              "typeAction": "acaoSimples",
              "typeAbility": "passiva",
              "description": "Você recebe +1 no seu próximo teste de Parâmetro ou Bloqueio.",
              "note": "",
              "actions": []
            },
            {
              "name": "Ponte",
              "cost": "1 PE",
              "typeAction": "acaoSimples",
              "typeAbility": "passiva",
              "description": "Você regenera um valor de Pontos de Vida equivalente à metade do seu total máximo de Pontos de Energia.\nOs efeitos de Verso e Refrão não acumulam, mesmo vindos de fontes diferentes.",
              "note": "",
              "actions": []
            }
          ],
          "improvements": [
            {
              "title": "A) Técnica Mística",
              "description": "Ao utilizar essa habilidade em combate, você poderá realizar um Teste de Destino, Dif. 10. Caso tenha sucesso, você regenerará 1 Ponto de Energia.",
              "active": false
            },
            {
              "title": "B) Execução Rápida",
              "description": "A Ação Simples utilizada para realizar essa habilidade é transformada em uma Ação Acelerada.",
              "active": false
            }
          ],
          "actions": []
        }
      ]
    },
    "_key": "!items!path000100000000"
  },
  {
    "_id": "path000200000000",
    "name": "O Caminho Do Combatente",
    "type": "path",
    "img": "modules/gaia-compendium-manager/assets/caminhos/O Caminho Do Combatente.png",
    "system": {
      "description": "“Eu olho para a mesa, as cadeiras, as canecas, e para aqueles que estão à \nmesa, sentados nas cadeiras e erguendo as canecas. Nos seus sorrisos vejo \na minha felicidade... a vida é simples. \nA c ada inimigo derrotado, cada luta vencida, vejo que a minha \ndeterminação sobrepujou a de meus adversários. Muitos lutam por honra, \nglória, dever ou dívida . E u luto para que essas canecas sempre estejam \ncheias, sendo bebidas por aqueles que são importantes para mim. Essa é a \nvida que escolhi. \nColoque uma arma nas minhas mãos e derrubar ei todos os meus \noponentes. Coloque um escudo na minha mão e protegerei todos os meus \naliados. Coloque a fúria no meu coração e devastarei deuses e exércitos. \nJá está ficando tarde, amanhã o sol estará no céu novamente e uma nova \njornada começará. Para onde? Não sei. Deixaremos os ventos soprarem e a \ntrilha se formar a cada passo dado. Como disse, a vida é simples.” - No’kan, O Campeão de Varmark",
      "category": "marcial",
      "specializations": [
        "<span class='spec-name'>Artista Marcial.</span> <span class='spec-desc'>Discípulo das antigas artes marciais, aquele que faz uso do fluxo do mundo para fortalecer o seu corpo e a sua mente, tornando-se um com o universo.</span>",
        "<span class='spec-name'>Guardião.</span> <span class='spec-desc'>Um defensor que conta com técnicas que utilizam o seu escudo para proteger a todos.</span>",
        "<span class='spec-name'>Inquisidor.</span> <span class='spec-desc'>Um guerreiro implacável que castiga severamente e neutraliza qualquer conjurador que ouse manipular os poderes proibidos do Véu.</span>",
        "<span class='spec-name'>Legionário Místico.</span> <span class='spec-desc'>Aquele que faz uso das camadas do Véu a seu favor para energizar e elevar o seu poder.</span>",
        "<span class='spec-name'>Soberano.</span> <span class='spec-desc'>Um mestre com armamentos corpo a corpo , que utiliza técnicas devastadoras para massacrar os seus oponentes.</span>"
      ],
      "keywords": [
        "Armamentos",
        "Vitalidade",
        "Ataque Físico."
      ],
      "parameterSuggestions": [
        "Brutalidade",
        "Vigor",
        "Precisão"
      ],
      "abilities": [
        {
          "id": "ab00160000000000",
          "name": "Adrenalina",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Adrenalina.png",
          "level": 1,
          "category": "ofensiva",
          "cost": "1 PE",
          "typeAction": "acaoSimples",
          "typeAbility": "habilidade",
          "types": [],
          "quote": "",
          "numberTarget": "1",
          "range": "Pessoal",
          "duration": "Até o final do combate",
          "description": "Uma fúria descomunal transborda de você.\nAté o final de um combate, o primeiro Dano Físico causado por você em um turno é aumentado em um valor igual ao seu total de pontos de Brutalidade. Esse efeito não acumula.\nEnquanto esse efeito estiver ativo, a sua Movimentação não pode ser reduzida.",
          "subEffects": [],
          "improvements": [
            {
              "title": "A) Mestre da Guerra",
              "description": "Caso um Alvo Inimigo cause qualquer tipo de dano aos seus Pontos de Vida, você receberá +1 e Prioridade no seu próximo teste de Precisão. Esse efeito não acumula.",
              "active": false
            },
            {
              "title": "B) Movimentação Frenética",
              "description": "Enquanto o efeito dessa habilidade estiver ativo, a sua Movimentação é aumentada em 2 metros.",
              "active": false
            }
          ],
          "actions": [
            {
              "id": "act_33bbab8efc1a",
              "name": "Ativar Adrenalina",
              "description": "Até o fim do combate, o primeiro Dano Físico do turno aumenta no valor de Brutalidade. Movimentação não pode ser reduzida.",
              "cost": "1 PE",
              "type": {
                "actionType": "acaoSimples",
                "category": "suporte",
                "tags": []
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard"
              },
              "damage": {
                "hasDamage": true,
                "formula": "@parameters.brutality.value",
                "type": "physical",
                "criticalBonus": "",
                "scaling": ""
              },
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
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
        },
        {
          "id": "ab00170000000000",
          "name": "Discípulo Do Corpo E Da Mente",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Discípulo Do Corpo E Da Mente.png",
          "level": 1,
          "category": "ofensiva",
          "cost": "",
          "typeAction": "",
          "typeAbility": "passiva",
          "types": [
            "passiva",
            "ataque_corpo_a_corpo"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "Pessoal",
          "duration": "Passiva",
          "description": "Você aprimorou as suas técnicas de combate, transformando seus punhos e pernas em ferramentas mortais contra os seus inimigos.\nVocê altera a regra de dano dos seus Ataques Desarmados, fazendo com que todos os Danos Físicos causados pelos seus Ataques Desarmados passem a ser 1d4 ao invés do dano padrão. Esse valor é aumentado em 1d4 para cada ponto de Brutalidade ou Destreza (à sua escolha).\nVocê também recebe a seguinte técnica:",
          "subEffects": [
            {
              "name": "Sequência Marcial",
              "cost": "1 PE",
              "typeAction": "livre",
              "type": "ataque_corpo_a_corpo",
              "description": "Ao atingir um Alvo com um Ataque Desarmado, você poderá utilizar essa técnica para realizar um único Ataque Extra, na forma de um Ataque Desarmado, contra um Alvo dentro do alcance do seu Ataque Desarmado.\nEssa técnica só pode ser utilizada uma vez por rodada.",
              "note": "",
              "actions": []
            }
          ],
          "improvements": [
            {
              "title": "A) Corpo Marcial",
              "description": "Escolha uma das Propriedades a seguir ao iniciar um combate: Impacto, Perfurar ou Prioridade. Os seus Ataques Desarmados passam a possuir a Propriedade escolhida até o final do combate.",
              "active": false
            },
            {
              "title": "B) Despertar do Corpo e Mente",
              "description": "Ao atingir um Alvo com um Ataque Desarmado, caso o Resultado Natural (Precisão) desse ataque tenha sido 10, ou mais, você regenerará 1 Ponto de Energia. Esse efeito ocorre apenas uma vez por rodada.",
              "active": false
            }
          ],
          "actions": [
            {
              "id": "act_4e1f617ba452",
              "name": "Golpe Desarmado",
              "description": "Ataque Desarmado com 1d4 de Dano Físico (+1d4 por ponto de Brutalidade ou Destreza).",
              "cost": "",
              "type": {
                "actionType": "acaoAtiva",
                "category": "ataque_corpo_a_corpo",
                "tags": []
              },
              "attack": {
                "hasAttack": true,
                "attribute": "precision",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard"
              },
              "damage": {
                "hasDamage": true,
                "formula": "1d4",
                "type": "physical",
                "criticalBonus": "",
                "scaling": "+1d4 por ponto de Brutalidade ou Destreza"
              },
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
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
        },
        {
          "id": "ab00180000000000",
          "name": "Perseguidor Do Véu",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Perseguidor Do Véu.png",
          "level": 1,
          "category": "ofensiva",
          "cost": "",
          "typeAction": "",
          "typeAbility": "habilidade",
          "types": [
            "passiva",
            "ataque_corpo_a_corpo"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "6 metros",
          "duration": "Passiva",
          "description": "Você se adaptou para expurgar as forças do Véu, impedindo que criaturas místicas e conjuradores continuem destruindo Auroria.\nEnquanto estiver em combate, ao realizar um Ataque Físico contra um Alvo que tenha realizado uma Conjuração a até 6 metros de você durante essa, ou a última rodada, você receberá Aptidão nesse Ataque Físico.\nAo adquirir essa habilidade, você passa a sentir toda Conjuração realizada em um raio de 10 metros de você.",
          "subEffects": [],
          "improvements": [
            {
              "title": "A) Resguardo Escarlate",
              "description": "Enquanto estiver em combate, o primeiro teste de Espírito que você realizar em uma rodada possuirá Aptidão.",
              "active": false
            },
            {
              "title": "B) Oprimir Conjuradores",
              "description": "Enquanto estiver em combate, o primeiro Ataque Mágico contra você durante uma rodada possuirá Inaptidão (Canalização).",
              "active": false
            }
          ],
          "actions": [
            {
              "id": "act_perseguidor_sentido",
              "name": "Sentir Conjurações",
              "description": "Sente toda Conjuração realizada em um raio de 10 metros. Recebe Aptidão em Ataque Físico contra quem conjurou a até 6m nesta ou na última rodada.",
              "cost": "",
              "type": {
                "actionType": "",
                "category": "ataque_corpo_a_corpo",
                "tags": [
                  "passiva"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
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
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": true,
                "shape": "circle",
                "size": 10,
                "unit": "m",
                "targetLimit": ""
              }
            }
          ]
        },
        {
          "id": "ab00190000000000",
          "name": "Encantamentos Rúnicos",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Encantamentos Rúnicos.png",
          "level": 1,
          "category": "ofensiva",
          "cost": "2 PE",
          "typeAction": "acaoSimples",
          "typeAbility": "foco",
          "types": [
            "foco"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "Pessoal",
          "duration": "1 Minuto",
          "description": "Canalizando o Véu ao seu redor, você imbui um novo efeito místico ao seu equipamento.\nVocê encanta um Armadura, Escudo ou Armamento equipado por você com um dos seguintes efeitos à sua escolha, com base no tipo de equipamento:",
          "subEffects": [
            {
              "name": "Armaduras ou Escudos",
              "cost": "",
              "typeAction": "",
              "type": "defesa",
              "description": "• Proteção Rúnica: Enquanto estiver equipado com esse equipamento, todo dano recebido é reduzido em 1d6.\n• Baluarte Mágico: Você recebe +1 em testes de Bloqueio com esse equipamento. Além disso, você não pode ter os seus testes de Bloqueio e valores de Bloqueio reduzidos (exceto por Exaustão).",
              "note": "",
              "actions": []
            },
            {
              "name": "Armamentos",
              "cost": "",
              "typeAction": "",
              "type": "ataque_corpo_a_corpo",
              "description": "• Encantamento Elemental: Escolha um tipo de Dano Mágico elemental: Fogo, Água, Vento, Terra, Trovão, Gelo, Natureza, Profano, Trevas ou Luz. O dano causado por esse Armamento em um turno é aumentado em 1d6 como Dano Mágico do tipo elemental atribuído.\n• Lâmina Arcana: Você recebe +1 em testes de Precisão com este equipamento, além de não pode ter os seus testes de Precisão e valores de Precisão reduzidos (exceto por Exaustão).",
              "note": "",
              "actions": []
            }
          ],
          "improvements": [
            {
              "title": "A) Praticidade Mística",
              "description": "A Ação Simples utilizada para realizar essa habilidade é transformada em uma Ação Acelerada.",
              "active": false
            },
            {
              "title": "B) Duplicar Encantamento",
              "description": "Ao utilizar essa habilidade, você aplicará um efeito adicional em um mesmo equipamento, ou em um equipamento diferente. O mesmo equipamento não pode possuir mais de uma vez o mesmo efeito aplicado por essa habilidade.",
              "active": false
            }
          ],
          "actions": [
            {
              "id": "act_872bcd3a590a",
              "name": "Encantamento Elemental (Arma)",
              "description": "Adiciona +1d6 Dano Mágico elemental por turno ao armamento encantado (Fogo, Água, Vento, Terra, Trovão, Gelo, Natureza, Profano, Trevas ou Luz).",
              "cost": "2 PE",
              "type": {
                "actionType": "acaoSimples",
                "category": "suporte",
                "tags": [
                  "foco"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard"
              },
              "damage": {
                "hasDamage": true,
                "formula": "1d6",
                "type": "fire",
                "criticalBonus": "",
                "scaling": ""
              },
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
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
        },
        {
          "id": "ab00200000000000",
          "name": "Ensinamentos Do Templo Cinzento",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Ensinamentos Do Templo Cinzento.png",
          "level": 1,
          "category": "ofensiva",
          "cost": "",
          "typeAction": "",
          "typeAbility": "passiva",
          "types": [
            "passiva",
            "conjuracao"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "Pessoal",
          "duration": "Passiva",
          "description": "Você desperta um poder antigo, quase esquecido pelo tempo.\nAo adquirir essa habilidade você receberá as seguintes técnicas místicas:",
          "subEffects": [
            {
              "name": "Avanço Místico",
              "cost": "1 PE",
              "typeAction": "acaoRapida",
              "type": "conjuracao",
              "description": "Após atingir um Alvo Inimigo com um Ataque Físico você poderá utilizar essa técnica mística para se teletransportar para um novo local vazio a até 3 metros, fazendo com que um Alvo Inimigo, a até 3 metros desse novo local, receba a metade do seu total máximo de Pontos de Energia como Dano Mágico Neutro.",
              "note": "",
              "actions": []
            },
            {
              "name": "Energizar",
              "cost": "",
              "typeAction": "",
              "typeAbility": "passiva",
              "description": "Você pode aumentar o alcance dos seus Ataques Físicos em até 2 metros, criando impactos no ar ao atacar.",
              "note": "",
              "actions": []
            },
            {
              "name": "Truque Arcano",
              "cost": "",
              "typeAction": "",
              "typeAbility": "passiva",
              "description": "Você tem acesso a um Feitiço Arcano (FEITIÇOS ARCANOS) à sua escolha.\nApós concluir um Repouso Completo você poderá substituir esse Feitiço Arcano por outro Feitiço Arcano.",
              "note": "",
              "actions": []
            }
          ],
          "improvements": [
            {
              "title": "A) Reação Mística",
              "description": "A Ação Rápida utilizada em Avanço Místico é transformada em uma Ação Acelerada.",
              "active": false
            },
            {
              "title": "B) Energia Cinzenta",
              "description": "O Dano Mágico Neutro causado pelo Avanço Místico agora atinge todos os Alvos Inimigos a até 3 metros, ao invés de apenas um Alvo Inimigo.",
              "active": false
            }
          ],
          "actions": []
        },
        {
          "id": "ab00210000000000",
          "name": "Perito Com Armamentos Corpo A Corpo",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Perito Com Armamentos Corpo A Corpo.png",
          "level": 1,
          "category": "ofensiva",
          "cost": "",
          "typeAction": "",
          "typeAbility": "passiva",
          "types": [
            "passiva",
            "ataque_corpo_a_corpo"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "Conforme armamento",
          "duration": "Passiva",
          "description": "Você representa ao máximo o que é ser um mestre das armas.\nAo adquirir essa habilidade você receberá as seguintes técnicas:",
          "subEffects": [
            {
              "name": "Manejo Com Armamentos",
              "cost": "",
              "typeAction": "",
              "typeAbility": "passiva",
              "description": "Somente com Armamentos Leves\nVocê deixa de receber a Inaptidão gerada pela regra de Empunhadura Dupla ao equipar dois Armamentos Leves ao mesmo tempo.\nAlém disso, uma vez durante o seu turno, você pode trocar um Armamento equipado por outro Armamento que possua, sem custo de Ação.",
              "note": "",
              "actions": []
            },
            {
              "name": "Manejo Com Armamentos Pesados",
              "cost": "",
              "typeAction": "",
              "typeAbility": "passiva",
              "description": "Somente com Armamentos Pesados\nO Dano Base dos seus Armamentos Pesados equipados é aumentado em 1.",
              "note": "",
              "actions": []
            },
            {
              "name": "Ciclone De Aço",
              "cost": "2 PE",
              "typeAction": "acaoAtiva",
              "type": "ataque_corpo_a_corpo",
              "description": "Somente com Armamentos Leves ou Pesados\nVocê gira rapidamente o seu corpo, causando o total de Dano Físico do seu Armamento equipado em todos os Alvos dentro do alcance desse Armamento. Caso você esteja equipado com dois Armamentos Leves, os danos desses Armamentos Leves serão somados nessa técnica.\nAlvos dentro do alcance dessa técnica podem realizar um teste de Defesa, Dif. 8. Caso tenham sucesso, receberão metade do dano causado pela técnica.",
              "note": "",
              "actions": []
            }
          ],
          "improvements": [
            {
              "title": "A) Técnica Inescapável",
              "description": "A dificuldade (Dif.) do teste de Defesa do Ciclone de Aço é aumentada em 2.",
              "active": false
            },
            {
              "title": "B) Impacto de Aço",
              "description": "Um Alvo que tenha falhado no teste de Defesa de Ciclone de Aço ficará Caído.",
              "active": false
            }
          ],
          "actions": []
        },
        {
          "id": "ab00220000000000",
          "name": "Punição Escarlate",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Punição Escarlate.png",
          "level": 1,
          "category": "ofensiva",
          "cost": "1 PE",
          "typeAction": "acaoRapida",
          "typeAbility": "habilidade",
          "types": [
            "ataque_corpo_a_corpo"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "Ao atingir com Ataque Físico",
          "duration": "1 Minuto",
          "description": "Você energiza o seu corpo com uma energia carmesim, que logo punirá os seus alvos.\nAo atingir um Alvo com um Ataque Físico, você poderá utilizar essa habilidade para aplicar Penitente nesse mesmo Alvo. Esse efeito permanece por 1 minuto.\nAlvos afetado por esse efeito poderão realizar um teste de Espírito, Dif. 8, ao final dos seus turnos. Caso tenham sucesso, esse efeito será removido.\nPenitente: Caso realize uma Conjuração, você receberá o seu próprio total máximo de Pontos de Energia como Dano Imaterial. Esse efeito ocorre apenas uma vez por rodada.",
          "subEffects": [],
          "improvements": [
            {
              "title": "A) Penitência Maior",
              "description": "A dificuldade (Dif.) dos testes de Espírito dessa habilidade é aumentada em 2.",
              "active": false
            },
            {
              "title": "B) O Propósito",
              "description": "A Ação Rápida utilizada para realizar essa habilidade é transformada em uma Ação Acelerada.",
              "active": false
            }
          ],
          "actions": [
            {
              "id": "act_punicao_escarlate",
              "name": "Punição Escarlate",
              "description": "Ao atingir com Ataque Físico, gasta 1 PE para aplicar Penitente no Alvo por 1 minuto.",
              "cost": "1 PE",
              "type": {
                "actionType": "acaoRapida",
                "category": "ataque_corpo_a_corpo",
                "tags": []
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
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
              "condition": {
                "hasCondition": true,
                "status": "Penitente",
                "duration": "1 Minuto",
                "description": "Caso realize Conjuração, recebe o total máximo de PE como Dano Imaterial (1x/rodada)."
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 0,
                "unit": "m",
                "targetLimit": ""
              }
            },
            {
              "id": "act_dano_penitente",
              "name": "Dano Penitente",
              "description": "Causa o total máximo de PE do alvo como Dano Imaterial se ele realizar Conjuração.",
              "cost": "",
              "type": {
                "actionType": "",
                "category": "ataque_corpo_a_corpo",
                "tags": []
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard"
              },
              "damage": {
                "hasDamage": true,
                "formula": "@energy.max",
                "type": "immaterial",
                "criticalBonus": "",
                "scaling": ""
              },
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 0,
                "unit": "m",
                "targetLimit": ""
              }
            },
            {
              "id": "act_teste_espirito_resistir",
              "name": "Teste de Espírito (Resistir)",
              "description": "Teste de Espírito Dif. 8 no final dos turnos do alvo para remover o efeito.",
              "cost": "",
              "type": {
                "actionType": "",
                "category": "defesa",
                "tags": []
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
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
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": true,
                "category": "parameter",
                "attribute": "spirit",
                "difficulty": 8,
                "onSuccess": "Remove o efeito Penitente",
                "onFailure": "Permanece sob efeito Penitente"
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 0,
                "unit": "m",
                "targetLimit": ""
              }
            }
          ]
        },
        {
          "id": "ab00230000000000",
          "name": "Calor Da Batalha",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Calor Da Batalha.png",
          "level": 1,
          "category": "defensiva",
          "cost": "",
          "typeAction": "",
          "typeAbility": "iniciativa",
          "types": [
            "iniciativa",
            "suporte"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "Pessoal",
          "duration": "Até o final do combate",
          "description": "Com um perigo eminente, você prepara o seu corpo para o combate.\nAo iniciar um combate, você recebe um valor de Pontos de Vida Temporários igual ao seu total máximo de Pontos de Energia. Esse valor é aumentado em 2 para cada ponto de Vigor. Caso não sejam removidos durante o combate, os Pontos de Vida Temporários concedidos por essa habilidade serão removidos no final do combate.\nAlém disso, você tem acesso à seguinte técnica ao utilizar essa habilidade:",
          "subEffects": [
            {
              "name": "Recuperar O Fôlego",
              "cost": "",
              "typeAction": "acaoSimples",
              "type": "suporte",
              "description": "Enquanto estiver em combate, você pode utilizar essa técnica para regenerar 1d4 Pontos de Vida e 1 Ponto de Energia. O valor de Pontos de Vida regenerados é aumentado em 1d4 para cada ponto de Vigor.\nEssa técnica só pode ser realizada uma vez por combate.",
              "note": "",
              "actions": [
                {
                  "id": "act_recuperar_folego",
                  "name": "Recuperar O Fôlego",
                  "description": "Enquanto estiver em combate, você pode utilizar essa técnica para regenerar 1d4 Pontos de Vida e 1 Ponto de Energia. O valor de Pontos de Vida regenerados é aumentado em 1d4 para cada ponto de Vigor.\nEssa técnica só pode ser realizada uma vez por combate.",
                  "cost": "",
                  "type": {
                    "actionType": "acaoSimples",
                    "category": "suporte",
                    "tags": []
                  },
                  "attack": {
                    "hasAttack": false,
                    "attribute": "precision",
                    "knowledge": "",
                    "bonus": "",
                    "rollType": "standard",
                    "defenseTarget": "evasion"
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
                    "formula": "1d4",
                    "type": "pv",
                    "criticalBonus": "",
                    "scaling": "+1d4 por ponto de Vigor"
                  },
                  "condition": {
                    "hasCondition": false,
                    "status": "",
                    "duration": "",
                    "description": ""
                  },
                  "check": {
                    "hasCheck": false,
                    "category": "parameter",
                    "attribute": "vigor",
                    "difficulty": 10,
                    "onSuccess": "",
                    "onFailure": ""
                  },
                  "areaOfEffect": {
                    "hasArea": false,
                    "shape": "circle",
                    "size": 3,
                    "unit": "m",
                    "targetDisposition": "all",
                    "targetLimit": ""
                  }
                },
                {
                  "id": "act_recuperar_pe",
                  "name": "Recuperar Energia (PE)",
                  "description": "Regenera 1 Ponto de Energia ao utilizar Recuperar o Fôlego.",
                  "cost": "",
                  "type": {
                    "actionType": "",
                    "category": "suporte",
                    "tags": []
                  },
                  "attack": {
                    "hasAttack": false,
                    "attribute": "precision",
                    "knowledge": "",
                    "bonus": "",
                    "rollType": "standard",
                    "defenseTarget": "evasion"
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
                    "formula": "1",
                    "type": "pe",
                    "criticalBonus": "",
                    "scaling": ""
                  },
                  "condition": {
                    "hasCondition": false,
                    "status": "",
                    "duration": "",
                    "description": ""
                  },
                  "check": {
                    "hasCheck": false,
                    "category": "parameter",
                    "attribute": "vigor",
                    "difficulty": 10,
                    "onSuccess": "",
                    "onFailure": ""
                  },
                  "areaOfEffect": {
                    "hasArea": false,
                    "shape": "circle",
                    "size": 3,
                    "unit": "m",
                    "targetDisposition": "all",
                    "targetLimit": ""
                  }
                },
                {
                  "id": "act_recuperar_folego_aprimorado",
                  "name": "Recuperar O Fôlego (Aprimorado: 1d6)",
                  "description": "Com Técnica de Regeneração ativa: regenera 1d6 Pontos de Vida (+1d6 por ponto de Vigor) e 1 Ponto de Energia (1x por combate).",
                  "cost": "",
                  "type": {
                    "actionType": "acaoSimples",
                    "category": "suporte",
                    "tags": []
                  },
                  "attack": {
                    "hasAttack": false,
                    "attribute": "precision",
                    "knowledge": "",
                    "bonus": "",
                    "rollType": "standard",
                    "defenseTarget": "evasion"
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
                    "formula": "1d6",
                    "type": "pv",
                    "criticalBonus": "",
                    "scaling": "+1d6 por ponto de Vigor"
                  },
                  "condition": {
                    "hasCondition": false,
                    "status": "",
                    "duration": "",
                    "description": ""
                  },
                  "check": {
                    "hasCheck": false,
                    "category": "parameter",
                    "attribute": "vigor",
                    "difficulty": 10,
                    "onSuccess": "",
                    "onFailure": ""
                  },
                  "areaOfEffect": {
                    "hasArea": false,
                    "shape": "circle",
                    "size": 3,
                    "unit": "m",
                    "targetDisposition": "all",
                    "targetLimit": ""
                  }
                }
              ]
            }
          ],
          "improvements": [
            {
              "title": "A) Resistência Lendária de Neros",
              "description": "Você possui Aptidão em testes de Vigor.",
              "active": false
            },
            {
              "title": "B) Técnica de Regeneração",
              "description": "Aumente em 1 a Categoria de Dado da regeneração de Pontos de Vida de Recuperar o Fôlego.",
              "active": false
            }
          ],
          "actions": [
            {
              "id": "act_recuperar_folego",
              "name": "Recuperar O Fôlego",
              "description": "Enquanto estiver em combate, você pode utilizar essa técnica para regenerar 1d4 Pontos de Vida e 1 Ponto de Energia. O valor de Pontos de Vida regenerados é aumentado em 1d4 para cada ponto de Vigor.\nEssa técnica só pode ser realizada uma vez por combate.",
              "cost": "",
              "type": {
                "actionType": "acaoSimples",
                "category": "suporte",
                "tags": []
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard",
                "defenseTarget": "evasion"
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
                "formula": "1d4",
                "type": "pv",
                "criticalBonus": "",
                "scaling": "+1d4 por ponto de Vigor"
              },
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 3,
                "unit": "m",
                "targetDisposition": "all",
                "targetLimit": ""
              }
            },
            {
              "id": "act_recuperar_pe",
              "name": "Recuperar Energia (PE)",
              "description": "Regenera 1 Ponto de Energia ao utilizar Recuperar o Fôlego.",
              "cost": "",
              "type": {
                "actionType": "",
                "category": "suporte",
                "tags": []
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard",
                "defenseTarget": "evasion"
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
                "formula": "1",
                "type": "pe",
                "criticalBonus": "",
                "scaling": ""
              },
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 3,
                "unit": "m",
                "targetDisposition": "all",
                "targetLimit": ""
              }
            },
            {
              "id": "act_recuperar_folego_aprimorado",
              "name": "Recuperar O Fôlego (Aprimorado: 1d6)",
              "description": "Com Técnica de Regeneração ativa: regenera 1d6 Pontos de Vida (+1d6 por ponto de Vigor) e 1 Ponto de Energia (1x por combate).",
              "cost": "",
              "type": {
                "actionType": "acaoSimples",
                "category": "suporte",
                "tags": []
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard",
                "defenseTarget": "evasion"
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
                "formula": "1d6",
                "type": "pv",
                "criticalBonus": "",
                "scaling": "+1d6 por ponto de Vigor"
              },
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 3,
                "unit": "m",
                "targetDisposition": "all",
                "targetLimit": ""
              }
            }
          ]
        },
        {
          "id": "ab00240000000000",
          "name": "Técnicas Marciais",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Técnicas Marciais.png",
          "level": 1,
          "category": "ofensiva",
          "cost": "1 PE",
          "typeAction": "acaoRapida",
          "typeAbility": "habilidade",
          "types": [
            "ataque_corpo_a_corpo"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "1 metro",
          "duration": "Instantânea",
          "description": "Você consegue identificar o momento perfeito para encaixar uma técnica no seu oponente.\nApós atingir um Alvo a até 1 metro com um Ataque Físico vindo de um Ataque Desarmado, Armamento Leve ou Armamento Pesado, você poderá utilizar essa habilidade para realizar imediatamente uma Manobra de Combate contra esse mesmo Alvo, sem custo de Ação Ativa. Caso esse Ataque Físico seja com dois Armamentos ou Ataques Desarmados, a Manobra de Combate deverá ser realizada após o segundo golpe.\nCaso você utilize essa habilidade após atingir um Alvo com um Ataque Desarmado, você receberá Aptidão no teste de Parâmetro para aplicar a Manobra de Combate.",
          "subEffects": [],
          "improvements": [
            {
              "title": "A) Fluidez de Combate",
              "description": "Remove o custo de PE dessa habilidade.",
              "active": false
            },
            {
              "title": "B) Perito em Manobras",
              "description": "Transforma a Aptidão dessa habilidade em Aptidão Aprimorada.",
              "active": false
            }
          ],
          "actions": [
            {
              "id": "act_tecnicas_marciais",
              "name": "Técnicas Marciais",
              "description": "Após atingir com Ataque Físico (Desarmado, Leve ou Pesado), realiza Manobra de Combate sem custo de Ação Ativa (+Aptidão se Desarmado).",
              "cost": "1 PE",
              "type": {
                "actionType": "acaoRapida",
                "category": "ataque_corpo_a_corpo",
                "tags": []
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
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
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 1,
                "unit": "m",
                "targetLimit": "1"
              }
            }
          ]
        },
        {
          "id": "ab00250000000000",
          "name": "Perito Com Equipamentos Defensivos",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Perito Com Equipamentos Defensivos.png",
          "level": 1,
          "category": "defensiva",
          "cost": "",
          "typeAction": "",
          "typeAbility": "passiva",
          "types": [
            "passiva",
            "defesa"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "Pessoal",
          "duration": "Passiva",
          "description": "Você agora se torna imparável com os seus equipamentos defensivos.\nVocê não é mais afetado por Inaptidões vindas de Armaduras.\nVocê ainda recebe Inaptidão em testes de Parâmetros, caso não possua o valor de Vigor necessário para equipar uma Armadura.\nAlém disso, ao adquirir essa habilidade você receberá as seguintes técnicas, enquanto estiver utilizando um Escudo:",
          "subEffects": [
            {
              "name": "Postura Defensiva",
              "cost": "",
              "typeAction": "acaoSimples",
              "type": "defesa",
              "description": "Você adota uma postura defensiva até o início do seu próximo turno, recebendo +1 de Bloqueio, além de não ser afetado por efeitos que o deslocariam involuntariamente. Enquanto estiver com esse efeito, você possui Inaptidão em todo teste de Precisão.",
              "note": "",
              "actions": []
            },
            {
              "name": "Proteger",
              "cost": "1 PE",
              "typeAction": "acaoRapida",
              "type": "defesa",
              "description": "Quando um Alvo Inimigo realizar um Ataque Físico ou Ataque Mágico contra um Alvo que não seja você, e você estiver a até 1 metro desse Alvo Inimigo ou do Alvo que está sendo atacado, você poderá utilizar essa técnica para ser o Alvo do ataque.",
              "note": "",
              "actions": []
            }
          ],
          "improvements": [
            {
              "title": "A) Treinamento de Ferro",
              "description": "Você não é afetado por Caído. Além disso, enquanto estiver equipado com um Escudo, a diferença necessária para você receber um Acerto Crítico é aumentada em 2.",
              "active": false
            },
            {
              "title": "B) Escudeiro",
              "description": "Caso você já tenha utilizado Proteger em uma rodada, você poderá utilizar essa técnica uma segunda vez nessa mesma rodada.",
              "active": false
            }
          ],
          "actions": []
        }
      ]
    },
    "_key": "!items!path000200000000"
  },
  {
    "_id": "path000300000000",
    "name": "O Caminho Do Devoto",
    "type": "path",
    "img": "modules/gaia-compendium-manager/assets/caminhos/devoto.png",
    "system": {
      "description": "“Eu gosto de caminhadas e peregrinações, mas finalmente encontramos \numa taverna para descansar, e cansaço é o que não falta. Espero que não \ntenha que dormir novamente com uma das três músicas do repertório de \nPharfena. Que Aysla a ajude... \nPode parecer heresia, mas , às vezes, gosto de imaginar que os deuses \ntambém tiveram momentos assim, na Torre dos Imortais. Vinte e um irmãos \ne irmãs compartilhando o mesmo teto, a mesma cidade. Esses \npensamentos me fazem sentir mais próxima a eles. \nVejo fragmentos da criação em cada mortal que vaga por es te mundo, e \naquece meu coração saber que todos temos aquele que nos observa e \nalenta. Eu os protejo, meu grupo, assi m como eles me protegem . P osso \ncurar os enfermos e dar força aos que estão ao meu lado, e esse poder deve \nter algum propósito, assim como todas as coisas que os deuses criaram. Me \nperdi novamente em pensamentos ... desde que sa í em jornada , tenho \nencontrado cada vez mais dúvidas. \nO melhor a fazer nes ses momentos talvez seja impedir Cobalthus de se \nperder dentro de si mesmo…” - Rhonoa, a Centelha da Resistência",
      "category": "divino",
      "specializations": [
        "<span class='spec-name'>Avatar.</span> <span class='spec-desc'>A verdadeira ligação mortal com o plano de Édona, trazendo o peso e a verdade dos deuses que um dia andaram sobre Auroria.</span>",
        "<span class='spec-name'>Espiritualista.</span> <span class='spec-desc'>Representantes das forças espirituais, que trazem consigo a conexão entre as energias dos vivos e  do Limbo.</span>",
        "<span class='spec-name'>Oculto.</span> <span class='spec-desc'>Um servo das trevas, que brande a vontade sombria do Abismo a seu favor.</span>",
        "<span class='spec-name'>Paladino.</span> <span class='spec-desc'>Um servo da luz, que brande a força celestial de Ofir a seu favor.</span>",
        "<span class='spec-name'>Sacerdote.</span> <span class='spec-desc'>Especialista em restaurar a vida e a energia dos seus aliados em combate.</span>"
      ],
      "keywords": [
        "Proteção",
        "Bonificação",
        "Regeneração."
      ],
      "parameterSuggestions": [
        "Canalização",
        "Espírito."
      ],
      "abilities": [
        {
          "id": "ab00280000000000",
          "name": "Lampejo Celestial",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Lampejo Celestial.png",
          "level": 1,
          "category": "ofensiva",
          "cost": "",
          "typeAction": "",
          "typeAbility": "conjuracao",
          "types": [
            "conjuracao"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "6 Metros",
          "duration": "Até o final do turno dos Alvos",
          "description": "Após ferir um alvo, uma pequena luz cai sobre ele: um aviso dos seres de Ofir.\nCaso você atinja um Alvo com um Ataque Físico ou Ataque Mágico, e o Resultado Natural (Precisão ou Canalização) d o ataque tenha sido 10, ou mais, você aumentará o seu dano em um valor igual à metade do seu total máximo de Pontos de Energia como Dano Mágico de Luz.\nEsse efeito ocorre apenas uma vez por turno.",
          "subEffects": [],
          "improvements": [
            {
              "title": "A) Favor de Ofir",
              "description": "O efeito des sa habilidade passa a ser realizado com um Resultado Natural de 8.",
              "active": false
            },
            {
              "title": "B) Dádiva Celestial",
              "description": "Ao final de um turno no qual você tenha causado um Dano Mágico de Luz a um Alvo, você regenerará um valor de Pontos de Vida equivalente ao dobro do seu total de pontos de Espírito. Esse efeito ocorre apenas uma vez por turno.",
              "active": false
            }
          ],
          "actions": [
            {
              "id": "act_2eb7878b1809",
              "name": "Dano de Lampejo Celestial",
              "description": "Ao acertar ataque com d12 natural 10+, causa metade do PE máx como Dano Mágico de Luz (1x por turno).",
              "cost": "",
              "type": {
                "actionType": "",
                "category": "conjuracao",
                "tags": [
                  "conjuracao"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard"
              },
              "damage": {
                "hasDamage": true,
                "formula": "Math.floor(@energy.max / 2)",
                "type": "light",
                "criticalBonus": "",
                "scaling": ""
              },
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
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
        },
        {
          "id": "ab00290000000000",
          "name": "Poder Abissal",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Poder Abissal.png",
          "level": 1,
          "category": "ofensiva",
          "cost": "2 PE",
          "typeAction": "acaoAtiva",
          "typeAbility": "conjuracao",
          "types": [
            "conjuracao",
            "foco"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "6 Metros",
          "duration": "Até passar no teste de Espírito",
          "description": "Linhas sombrias cortam o ar rumo ao inimigo, determinadas a feri-lo.\nVocê aplica a força do Abismo sobre um Alvo a até 6 metros, forçando-o a realizar um teste de Espírito, Dif. 8. Caso falhe, o Alvo receberá o seu total máximo de Pontos de Energia como Dano Mágico de Trevas. Esse dano será aplicado novamente nesse mesmo Alvo sempre que você iniciar o seu turno enquanto estiver com esse Foco.\nAlvos afetados por esse dano poderão realizar um teste de Espírito, Dif. 8, no final dos seus turnos. Caso tenham sucesso, esse Foco será removido.",
          "subEffects": [],
          "improvements": [
            {
              "title": "A) Peso Abissal",
              "description": "A dificuldade ( Dif.) do s testes de Espírito dessa habilidade é aumentada em 2.",
              "active": false
            },
            {
              "title": "B) Influência Sombria",
              "description": "Os testes de Espírito dessa habilidade possuem Inaptidão.",
              "active": false
            }
          ],
          "actions": [
            {
              "id": "act_b56358545fba",
              "name": "Invocar Poder Abissal",
              "description": "Força alvo a até 6m a teste de Espírito Dif. 8. Falha: recebe total de PE máximo como Dano de Trevas no início de cada turno com Foco.",
              "cost": "2 PE",
              "type": {
                "actionType": "acaoAtiva",
                "category": "conjuracao",
                "tags": [
                  "conjuracao",
                  "foco"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard"
              },
              "damage": {
                "hasDamage": true,
                "formula": "@energy.max",
                "type": "dark",
                "criticalBonus": "",
                "scaling": ""
              },
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": true,
                "category": "parameter",
                "attribute": "spirit",
                "difficulty": 8,
                "onSuccess": "Evita o dano e encerra o Foco",
                "onFailure": "Recebe o total máximo de PE como Dano Mágico de Trevas"
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 3,
                "unit": "m",
                "targetLimit": ""
              }
            },
            {
              "id": "act_20aa2aae986d",
              "name": "Teste de Espírito (Resistir)",
              "description": "Teste de Espírito Dif. 8 no final dos turnos do alvo para remover o Foco.",
              "cost": "",
              "type": {
                "actionType": "",
                "category": "defesa",
                "tags": []
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
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
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": true,
                "category": "parameter",
                "attribute": "spirit",
                "difficulty": 8,
                "onSuccess": "Remove o Foco da habilidade",
                "onFailure": "Permanece sob efeito do Poder Abissal"
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
        },
        {
          "id": "ab00300000000000",
          "name": "Barreira Protetora",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Barreira Protetora.png",
          "level": 1,
          "category": "defensiva",
          "cost": "1 PE",
          "typeAction": "acaoSimples",
          "typeAbility": "conjuracao",
          "types": [
            "conjuracao"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "6 Metros",
          "duration": "Até o final do combate",
          "description": "Linhas de energia envolvem e protegem um alvo próximo.\nVocê reveste o Véu de um Alvo até 6 metros, concedendo 1d4 Pontos de Vida Temporários a este Alvo. Esse valor é aumentado em 1d4 para cada ponto de Espírito.\nMetade desse valor é Maximizado caso o Alvo dessa habilidade esteja com menos da metade do seu próprio total máximo de Pontos de Vida.",
          "subEffects": [],
          "improvements": [
            {
              "title": "A) Barreira Vinculada",
              "description": "Você recebe metade do valor de Pontos de Vida Temporários concedidos pela habilidade ao utilizar em um Alvo que não seja você. Esse efeito ocorre apenas uma vez por turno.",
              "active": false
            },
            {
              "title": "B) Proteção Célere",
              "description": "A Ação Simples utilizada para realizar essa habilidade é transformada em uma Ação Acelerada.",
              "active": false
            }
          ],
          "actions": [
            {
              "id": "act_480a2ede61d9",
              "name": "Barreira Protetora",
              "description": "Concede 1d4 PVT (+1d4 por ponto de Espírito) a alvo a até 6 metros. Metade maximizada se alvo < 50% PV.",
              "cost": "1 PE",
              "type": {
                "actionType": "acaoSimples",
                "category": "conjuracao",
                "tags": [
                  "conjuracao"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard"
              },
              "damage": {
                "hasDamage": true,
                "formula": "1d4",
                "type": "light",
                "criticalBonus": "",
                "scaling": "+1d4 por ponto de Espírito"
              },
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
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
        },
        {
          "id": "ab00310000000000",
          "name": "Aspecto Da Grandeza",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Aspecto Da Grandeza.png",
          "level": 1,
          "category": "auxiliadora",
          "cost": "",
          "typeAction": "",
          "typeAbility": "iniciativa",
          "types": [
            "iniciativa",
            "conjuracao"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "6 Metros",
          "duration": "Até o final do combate",
          "description": "Você eleva o Véu de um aliado, criando novas oportunidades.\nVocê aplica es se Efeito Positivo em um Alvo a até 6 metros, de modo que, até o final desse combate, o primeiro dano ou regeneração de Pontos de Vida realizado pelo Alvo durante uma rodada seja aumentado em um valor igual ao seu total de pontos de Espírito + 1. Esse efeito não afeta Poções.",
          "subEffects": [],
          "improvements": [
            {
              "title": "A) Aperfeiçoar Aspecto",
              "description": "O dano ou regeneração de Pontos de Vida afetado por essa habilidade não pode ser reduzido por outros efeitos. Além disso, você pode utilizar essa habilidade mesmo que já tenha utilizado duas habilidades de Iniciativa.",
              "active": false
            },
            {
              "title": "B) Exalar Grandeza",
              "description": "Aumenta em 1 o número de Alvos dessa habilidade. Es se valor é aumentado em 1 para cada 3 pontos de Espírito que você possua.",
              "active": false
            }
          ],
          "actions": [
            {
              "id": "act_1d25181c2184",
              "name": "Abençoar Alvo",
              "description": "No início do combate, concede Efeito Positivo a até 6m: primeiro dano ou cura da rodada aumentado em Espírito + 1.",
              "cost": "",
              "type": {
                "actionType": "",
                "category": "conjuracao",
                "tags": [
                  "conjuracao"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
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
              "condition": {
                "hasCondition": true,
                "status": "Aspecto da Grandeza",
                "duration": "Até o fim do combate",
                "description": "Primeiro dano ou cura de cada rodada aumentado em Espírito + 1."
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 3,
                "unit": "m",
                "targetLimit": ""
              }
            },
            {
              "id": "act_82c17921546a",
              "name": "Bônus de Dano/Cura",
              "description": "Adiciona Espírito + 1 ao primeiro dano ou cura da rodada.",
              "cost": "",
              "type": {
                "actionType": "",
                "category": "conjuracao",
                "tags": []
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard"
              },
              "damage": {
                "hasDamage": true,
                "formula": "@parameters.spirit.value + 1",
                "type": "light",
                "criticalBonus": "",
                "scaling": ""
              },
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
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
        },
        {
          "id": "ab00320000000000",
          "name": "Bênção Radiante",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Bênção Radiante.png",
          "level": 1,
          "category": "auxiliadora",
          "cost": "2 PE",
          "typeAction": "acaoSimples",
          "typeAbility": "conjuracao",
          "types": [
            "conjuracao",
            "foco"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "6 Metros",
          "duration": "1 Minuto",
          "description": "Uma marca radiante surge num alvo aliado, protegendo-o.\nVocê aplica es se Efeito Positivo em um Alvo Aliado a até 6 metros, de modo que, caso esse Alvo Aliado receba qualquer tipo de dano, o Alvo que causou o dano receb a a metade do total máximo de Pontos de Energia do Alvo que aplicou esse Efeito Positivo como Dano Mágico de Luz. Esse efeito ocorre apenas uma vez por turno, por Alvo.",
          "subEffects": [],
          "improvements": [
            {
              "title": "A) Ensinamentos Radiantes",
              "description": "A Ação Simples utilizada para realizar essa habilidade é transformada em uma Ação Acelerada.",
              "active": false
            },
            {
              "title": "B) Fortalecer Bênção",
              "description": "O Foco dessa habilidade não pode ser removido por Alvos Inimigos, nem por Atordoado. Além disso, reduz em 1 o custo de PE dessa habilidade.",
              "active": false
            }
          ],
          "actions": [
            {
              "id": "act_83affe531d90",
              "name": "Aplicar Bênção Radiante",
              "description": "Aplica em aliado a até 6 metros. Se receber dano, agressor sofre retaliação de Luz.",
              "cost": "2 PE",
              "type": {
                "actionType": "acaoSimples",
                "category": "suporte",
                "tags": [
                  "conjuracao",
                  "foco"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
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
              "condition": {
                "hasCondition": true,
                "status": "Bênção Radiante",
                "duration": "1 Minuto",
                "description": "Ao sofrer dano, retalia metade do PE máximo do aplicador como Luz."
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 3,
                "unit": "m",
                "targetLimit": ""
              }
            },
            {
              "id": "act_12d7d0ed03ad",
              "name": "Retaliação de Luz",
              "description": "Causa metade do total máximo de PE como Dano Mágico de Luz ao agressor.",
              "cost": "",
              "type": {
                "actionType": "",
                "category": "conjuracao",
                "tags": [
                  "conjuracao",
                  "reacao"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard"
              },
              "damage": {
                "hasDamage": true,
                "formula": "Math.floor(@energy.max / 2)",
                "type": "light",
                "criticalBonus": "",
                "scaling": ""
              },
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
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
        },
        {
          "id": "ab00330000000000",
          "name": "Centelha De Édona",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Centelha De Édona.png",
          "level": 1,
          "category": "auxiliadora",
          "cost": "2 PE",
          "typeAction": "acaoAtiva",
          "typeAbility": "conjuracao",
          "types": [
            "conjuracao",
            "suporte"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "6 Metros",
          "duration": "1 Minuto",
          "description": "Você cria uma pequena mandala mística com um dos símbolos divinos de Édona sobre um alvo, bonificando-o com uma centelha do poder dos Deuses de Édona.\nVocê aplica, em um Alvo a até 6 metros, esse Efeito Positivo, escolhendo uma das Centelhas a seguir:\nCom uma Ação Rápida e 1 Ponto de Energia, você pode trocar o efeito de Centelha de um Alvo a até 6 metros que possua esse Efeito Positivo aplicado por você. A duração dessa habilidade não é reiniciada ao utilizar esse efeito.",
          "subEffects": [
            {
              "name": "Centelha Da Balança",
              "cost": "2 PE",
              "typeAction": "acaoAtiva",
              "type": "suporte",
              "description": "Os seus Parâmetros não poderão ser reduzidos por Habilidades de Caminho e Características. Caso os seus Parâmetros possuam alguma redução ao receber esse Efeito Positivo, essa redução é removida.\nOs efeitos das suas Habilidades de Caminho não podem ser interrompidos ou anulados por nenhum efeito de Habilidade de Caminho ou Características.",
              "note": "",
              "actions": []
            },
            {
              "name": "Centelha Da Ordem",
              "cost": "2 PE",
              "typeAction": "acaoAtiva",
              "type": "suporte",
              "description": "A primeira regeneração de Pontos de Vida que você receber durante uma rodada é aumentada em 1.\nO primeiro dano que você receber durante uma rodada é reduzido em 1.\nEsses valores são aumentados em 1 para cada ponto de Espírito do Alvo que aplicou esse Efeito Positivo.",
              "note": "",
              "actions": []
            },
            {
              "name": "Centelha Do Caos",
              "cost": "2 PE",
              "typeAction": "acaoAtiva",
              "type": "suporte",
              "description": "O primeiro dano que você causar durante uma rodada é aumentado em 1.\nNo final de um turno que você tenha recebido qualquer tipo de dano nos seus Pontos de Vida, o Alvo que lhe causou esse dano receberá 1 de Dano Imaterial. Esse efeito ocorre apenas uma vez por rodada.\nEsses valores são aumentados em 1 para cada ponto de Espírito do Alvo que aplicou esse Efeito Positivo.",
              "note": "",
              "actions": []
            }
          ],
          "improvements": [
            {
              "title": "A) Presente Divino",
              "description": "Alvos podem ser afetados por esse Efeito Positivo mais de uma vez, mesmo que já possuam esse Efeito Positivo. Um Alvo só pode ser afetado por um mesmo efeito de Centelha por vez.",
              "active": false
            },
            {
              "title": "B) Receptáculo de Édona",
              "description": "Sempre que você aplicar esse Efeito Positivo em um Alvo, você também receberá esse Efeito Positivo, podendo escolher o seu efeito de Centelha. Caso você já possua esse Efeito Positivo, você poderá trocar o seu efeito de Centelha.",
              "active": false
            }
          ],
          "actions": []
        },
        {
          "id": "ab00331000000000",
          "name": "Dádiva De Édona",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Dádiva De Édona.png",
          "level": 1,
          "category": "auxiliadora",
          "cost": "",
          "typeAction": "",
          "typeAbility": "passiva",
          "types": [
            "passiva",
            "suporte"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "Pessoal",
          "duration": "Até o próximo Repouso Completo",
          "description": "Édona vela por você — acredite, os deuses estão mais próximos do que se imagina.\nAo concluir um Repouso Completo, você é agraciado pelas forças que emergem do plano da Balança, da Ordem ou do Caos, recebendo um dos seguintes efeitos à sua escolha, até o seu próximo Repouso Completo:",
          "subEffects": [
            {
              "name": "Balança",
              "cost": "",
              "typeAction": "",
              "type": "suporte",
              "description": "Ao ter sucesso em um teste de Parâmetro contra um Alvo, este mesmo Alvo receberá -1 no seu próximo teste de Parâmetro. Esse efeito não acumula, mesmo vindo de fontes diferentes.",
              "note": "",
              "actions": []
            },
            {
              "name": "Ordem",
              "cost": "",
              "typeAction": "",
              "type": "suporte",
              "description": "O seu primeiro custo de Pontos de Energia em uma rodada é reduzido em 1. Além disso, você é imune a efeitos de Alvos Inimigos que removam os seus Pontos de Energia. Você ainda é afetado por Envenenado.",
              "note": "",
              "actions": []
            },
            {
              "name": "Caos",
              "cost": "",
              "typeAction": "",
              "type": "suporte",
              "description": "Ao causar qualquer tipo de dano em um Alvo, você fará com que, até o final do próximo turno desse Alvo, todo custo de PE do Alvo seja aumentado em 1. Esse efeito não acumula, mesmo vindo de fontes diferentes.",
              "note": "",
              "actions": []
            }
          ],
          "improvements": [
            {
              "title": "A) Ampliar Dádiva",
              "description": "O efeito concedido por essa habilidade agora pode ocorrer a cada Repouso, ao invés de um Repouso Completo. Somente um dos efeitos dessa habilidade pode ser mantido até o seu próximo Repouso Completo.",
              "active": false
            },
            {
              "title": "B) Abraçar o Panteão",
              "description": "Você recebe um efeito adicional ao ser afetado por essa habilidade.",
              "active": false
            }
          ],
          "actions": []
        },
        {
          "id": "ab00340000000000",
          "name": "Elo Espiritual",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Elo Espiritual.png",
          "level": 1,
          "category": "auxiliadora",
          "cost": "2 PE",
          "typeAction": "acaoAtiva",
          "typeAbility": "conjuracao",
          "types": [
            "conjuracao",
            "foco"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "6 Metros",
          "duration": "1 Minuto",
          "description": "Você condensa o seu Véu, conectando-o temporariamente a outro ser.\nVocê aplica es se Efeito Positivo em um Alvo Aliado a até 6 metros que não seja você, concedendo a ele 2 Pontos de Energia Temporários.\nEnquanto estiver com es se Efeito Positivo, sempre que o Alvo Aliado realizar um teste de Espírito a até 6 metros, você poderá utilizar a sua Ação Rápida para substituir o total de pontos de Espírito do Alvo Aliado pelo seu total de pontos de Espírito até o final do turno.\nAo perder es se Efeito Positivo, o Alvo Aliado também perde os Pontos de Energia Temporários gerados por essa habilidade, caso não sejam utilizados.",
          "subEffects": [],
          "improvements": [
            {
              "title": "A) Conexão Célere",
              "description": "A Ação Ativa utilizada para realizar essa habilidade é transformada em uma Ação Acelerada.",
              "active": false
            },
            {
              "title": "B) Lampejo Espiritual",
              "description": "Caso você já tenha utilizado a Ação Rápida do efeito dessa habilidade em uma rodada, você poderá utilizá-lo uma segunda vez nessa mesma rodada.",
              "active": false
            }
          ],
          "actions": [
            {
              "id": "act_9909eec6c757",
              "name": "Vincular Elo",
              "description": "Concede 2 Pontos de Energia Temporários a um aliado a até 6 metros.",
              "cost": "2 PE",
              "type": {
                "actionType": "acaoAtiva",
                "category": "suporte",
                "tags": [
                  "conjuracao",
                  "foco"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
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
              "condition": {
                "hasCondition": true,
                "status": "Elo Espiritual",
                "duration": "1 Minuto",
                "description": ""
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
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
        },
        {
          "id": "ab00350000000000",
          "name": "Revitalizar",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Revitalizar.png",
          "level": 1,
          "category": "auxiliadora",
          "cost": "1 PE",
          "typeAction": "acaoAtiva",
          "typeAbility": "conjuracao",
          "types": [
            "conjuracao",
            "suporte"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "8 Metros",
          "duration": "Instantânea",
          "description": "Com um toque místico, você cicatriza os ferimentos do alvo.\nVocê regenera 1d6 Ponto de Vida de um Alvo a até 8 metros. Esse valor é aumentado em 1d6 para cada ponto de Espírito.\nAo regenerar os Pontos de Vida de um Alvo com essa habilidade, você também poderá utilizar o seguinte efeito:",
          "subEffects": [
            {
              "name": "Consagrar",
              "cost": "2 PE",
              "typeAction": "livre",
              "type": "suporte",
              "description": "Remova desse mesmo Alvo: Sangramento ou Envenenado.\nConsagrar só pode ser utilizado uma vez por turno.",
              "note": "",
              "actions": []
            }
          ],
          "improvements": [
            {
              "title": "A) Toque Vital",
              "description": "Após rolar os dados de regeneração de Pontos de Vida dessa habilidade, você poderá selecionar quantos dados quiser para rolá-los novamente, ficando com os novos resultados. Esse efeito só poderá ser realizado uma vez por turno.",
              "active": false
            },
            {
              "title": "B) Purificador",
              "description": "Reduz em 1 o custo de PE de Consagrar.",
              "active": false
            }
          ],
          "actions": [
            {
              "id": "act_c5576dc741d3",
              "name": "Revitalizar (Cura)",
              "description": "Regenera 1d6 PV (+1d6 por ponto de Espírito) de um alvo a até 8 metros.",
              "cost": "1 PE",
              "type": {
                "actionType": "acaoAtiva",
                "category": "conjuracao",
                "tags": [
                  "conjuracao"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard"
              },
              "damage": {
                "hasDamage": true,
                "formula": "1d6",
                "type": "nature",
                "criticalBonus": "",
                "scaling": "+1d6 por ponto de Espírito"
              },
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
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
        },
        {
          "id": "ab00370000000000",
          "name": "Presente Do Abismo",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Presente Do Abismo.png",
          "level": 1,
          "category": "auxiliadora",
          "cost": "2 PE",
          "typeAction": "acaoRapida",
          "typeAbility": "conjuracao",
          "types": [
            "conjuracao"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "6 Metros",
          "duration": "Instantânea",
          "description": "Você aceita o favor do Abismo e, com isso, um grande poder é direcionado a um alvo.\nCaso um Alvo a até 6 metros cause um dano, ou regeneração de Pontos de Vida, com dados a serem rolados, antes da rolagem desses dados, você poderá utilizar essa habilidade para Maximizar metade des ses dados. Caso esse dano, ou regeneração de Pontos de Vida, possua diferentes tipos de dado a serem rolados, você poderá escolher os da dos afetados pelo efeito.\nCaso um dano ou regeneração de Pontos de Vida afetado por essa habilidade não possua nenhum dado a ser rolado, você aumentará o valor desse dano, ou regeneração de Pontos de Vida, em um valor igual à metade do seu total máximo de Pontos de Energia.\nOs efeitos dessa habilidade não afetam Poções.\nOs efeitos dessa habilidade não acumulam, mesmo vindos de fontes diferentes.",
          "subEffects": [],
          "improvements": [
            {
              "title": "A) Escolhido das Trevas",
              "description": "Caso você já tenha utilizado essa habilidade em uma rodada, você poderá utilizá-la uma segunda vez nessa mesma rodada.",
              "active": false
            },
            {
              "title": "B) Sinergia Abissal",
              "description": "Ao utilizar esta habilidade em um Alvo que não seja você, o seu próximo dano ou regeneração de Pontos de Vida a até 1 minuto é afetado pelo efeito dessa habilidade. Esse efeito não acumula.",
              "active": false
            }
          ],
          "actions": [
            {
              "id": "act_80cc3f536db3",
              "name": "Aumento de Dano/Cura Fixo",
              "description": "Aumenta o dano ou cura em metade do total máximo de PE (caso não role dados).",
              "cost": "2 PE",
              "type": {
                "actionType": "acaoRapida",
                "category": "conjuracao",
                "tags": [
                  "conjuracao"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard"
              },
              "damage": {
                "hasDamage": true,
                "formula": "Math.floor(@energy.max / 2)",
                "type": "dark",
                "criticalBonus": "",
                "scaling": ""
              },
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
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
      ]
    },
    "_key": "!items!path000300000000"
  },
  {
    "_id": "path000400000000",
    "name": "O Caminho Do Feiticeiro",
    "type": "path",
    "img": "modules/gaia-compendium-manager/assets/caminhos/feiticeiro.png",
    "system": {
      "description": "“Eu olho para as pessoas e me pergunto se elas sabem o que habita no \nnosso Véu. A vida parece rasa , até olharmos para o infinito e ele olha r de \nvolta, sorrindo, abraçando a nossa existência. \nEstou aqui, nes se lugar, com todos aqueles que confio e , mesmo assim, a \nvida é cinza. Mais um a caneca chega à mesa, mas , se fo sse a minha \nvontade, poderia transformá-la numa coroa reluzente... ou numa esfera \ncorrompida, sedenta por destruição. Mas irei... não agora, não é a hora. \nRhonoa mantém a minha mente no lugar, m as foi o Véu que sussurrou \ncertezas, tornando cada gole dessa cerveja um sopro de vida. \nExistem aqueles que temem a nossa existência, caçando-nos em cada canto \ndo mundo, mas o fazem apenas por não entenderem que o Véu é o que nos \ndá a vida. Sou ínfimo diante das infinitas possibilidades. Talvez eu devesse \nconversar mais com No’kan, ele não entende meu dom, mas conhece o \nsignificado de poder. \nDepois de me perder de novo em pensamentos, seria agora uma boa hora \nde perguntar se querem mais uma cerveja? Zathryd está quieta demais, ou \nmelhor, sóbria demais, e não sabemos quando será a próxima vez que \nestaremos assim, despreocupados. Não quero que este momento acabe.” - Cobalthus, o Tecelão da Realidade",
      "category": "arcano",
      "specializations": [
        "<span class='spec-name'>Arcanista.</span> <span class='spec-desc'>Evocador da pura força do Véu, utilizando-o para potencializar suas forças místicas.</span>",
        "<span class='spec-name'>Artífice.</span> <span class='spec-desc'>Aquele que une as forças místicas com aparatos que potencializam as suas habilidades e os seus aliados.</span>",
        "<span class='spec-name'>Elementalista.</span> <span class='spec-desc'>Conjurador das forças elementais do Véu, que combina a fúria dos elementos para obter efeitos únicos e destrutivos.</span>",
        "<span class='spec-name'>Fiandeiro de Sangue .</span> <span class='spec-desc'>Um feiticeiro que abraça os  antigos segredos da poderosa , e proibida , Magia de Sangue , utilizando-os para se fortalecer enquanto drena a própria força vital.</span>",
        "<span class='spec-name'>Regulador.</span> <span class='spec-desc'>Um manipulador das forças temporais, alterando a realidade ao seu redor.</span>"
      ],
      "keywords": [
        "Conjuração",
        "Ataque Mágico",
        "Feitiços Arcanos."
      ],
      "parameterSuggestions": [
        "Arcanismo",
        "Canalização",
        "Vigor."
      ],
      "abilities": [
        {
          "id": "ab00380000000000",
          "name": "Esfera Espiral Soberana",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Esfera Espiral Soberana.png",
          "level": 1,
          "category": "ofensiva",
          "cost": "2 PE",
          "typeAction": "acaoAtiva",
          "typeAbility": "conjuracao",
          "types": [
            "conjuracao"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "8 Metros",
          "duration": "Instantânea",
          "description": "Você canaliza poder arcano bruto nas suas mãos, que logo é moldado numa grande esfera de energia destrutiva.\nVocê canaliza uma explosão mística, centrada em um ponto a até 8 metros. Todo Alvo a até 3 metros da explosão recebe 1d8 de Dano Mágico Neutro. Esse valor é aumentado em 1d8 para cada ponto de Arcanismo.\nAlvos dentro do alcance dessa explosão devem realizar um teste de Agilidade, Dif. 8. Caso tenham sucesso, receberão metade do dano causado pela habilidade.",
          "subEffects": [],
          "improvements": [
            {
              "title": "A) Destruição Arcana",
              "description": "A dificuldade (Dif.) do teste de Agilidade dessa habilidade é aumentada em 2.",
              "active": false
            },
            {
              "title": "B) Perfurar os Céus",
              "description": "Aumente em 1 a Categoria de Dado do dano causado por essa habilidade. EXPLOSÃO DE SANGUE X PV | Ação Ativa | Conjuração Você cria um símbolo desconhecido no corpo de um alvo, destruindo-o de dentro para fora. Você ferve o sangue de um Alvo a até 6 metros, forçando-o a um teste de Vigor, Dif. 8. Caso falhe, o Alvo receberá 1d8 de Dano Imaterial. Esse valor é aumentado em 1d8 para cada ponto de Arcanismo. Caso o Resultado Natural (Vigor) des se Alvo tenha sido 6, ou menos, e o Alvo tenha falhado no teste de Vigor, o Alvo será afetado por Sangramento por 1 hora. Além disso, ao adquirir essa habilidade, caso um Alvo a até 6 metros receba qualquer tipo de dano enquanto estiver com Sangramento, você poderá receber uma regeneração de Pontos de Vida equivalente à metade do seu total máximo de Pontos de Energia. Esse efeito ocorre apenas uma vez por rodada. X PV: O custo de Pontos de Vida para realizar os efeitos dessa habilidade é equivalente ao seu total máximo de Pontos de Energia. A P R I M O R A M E N T O S",
              "active": false
            },
            {
              "title": "A) Manipular Força Vital",
              "description": "A dificuldade (Dif.) do teste de Vigor dessa habilidade é aumentada em 2.",
              "active": false
            },
            {
              "title": "B) Pressão Sangrenta",
              "description": "O teste de Vigor dessa habilidade possui Inaptidão.",
              "active": false
            }
          ],
          "actions": [
            {
              "id": "act_3938f8182d02",
              "name": "Esfera Espiral Soberana",
              "description": "Explosão mística em raio de 3m a até 8m: 1d8 Dano Mágico Neutro (+1d8 por Arcanismo). Teste de Agilidade Dif. 8 para metade.",
              "cost": "2 PE",
              "type": {
                "actionType": "acaoAtiva",
                "category": "conjuracao",
                "tags": [
                  "conjuracao"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard"
              },
              "damage": {
                "hasDamage": true,
                "formula": "1d8",
                "type": "neutro",
                "criticalBonus": "",
                "scaling": "+1d8 por ponto de Arcanismo"
              },
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": true,
                "category": "parameter",
                "attribute": "agility",
                "difficulty": 8,
                "onSuccess": "Recebe metade do dano",
                "onFailure": "Recebe dano total"
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
        },
        {
          "id": "ab00390000000000",
          "name": "Moldar Elemento",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Moldar Elemento.png",
          "level": 1,
          "category": "ofensiva",
          "cost": "2 PE",
          "typeAction": "acaoSimples",
          "typeAbility": "conjuracao",
          "types": [
            "conjuracao"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "8 Metros",
          "duration": "1 Minuto",
          "description": "Você envolve o seu próprio Véu com forças elementais, modificando a sua essência.\nVocê aplica a si mesmo esse Efeito Positivo, escolhendo um dos elementos a seguir: Fogo, Água, Vento, Terra, Trovão ou Gelo.\nSempre que você causar um Dano Mágico Neutro com um Armamento Mágico, ou através de uma Habilidade de Caminho ou Característica, você pode rá transformar es se Dano Mágico Neutro em um Dano Mágico do elemento escolhido nesse Efeito Positivo.\nUma vez por rodada, ao causar um Dano Mágico com um Armamento Mágico, ou através de uma Habilidade de Caminho do mesmo tipo elemental escolhido nesse Efeito Positivo em um, ou mais, Alvos, você poderá realizar um dos seguintes efeitos com base no tipo de Dano Mágico elemental causado:\n• Fogo\nVocê aumenta o valor desse Dano Mágico de Fogo em um valor igual à metade do seu total máximo de Pontos de Energia.\n• Água\nUm Alvo que tenha sido atingido por esse Dano Mágico de Água é deslocado involuntariamente 3 metros para trás.\n• Vento\nVocê pode realizar uma Corrida sem custo de Ação nesse turno.\n• Terra\nVocê recebe um valor de Pontos de Vida Temporários equivalente à metade do seu total máximo de Pontos de Energia.\n• Trovão\nO Alvo que for atingido por esse Dano Mágico de Trovão perde 1 Ponto de Energia.\n• Gelo\nO Alvo que for atingido por esse Dano Mágico de Gelo ficará com Lentidão.\nEnquanto estiver com esse Efeito Positivo, você também poderá realizar pequenos truques elementais (com a autorização do Narrador) referente ao elemento escolhido na habilidade.",
          "subEffects": [],
          "improvements": [
            {
              "title": "A) Sagacidade Elemental",
              "description": "A Ação Simples utilizada para realizar essa habilidade é transformada em uma Ação Acelerada.",
              "active": false
            },
            {
              "title": "B) Iniciado Elemental",
              "description": "Ao iniciar o seu turno, você poderá trocar o elemento escolhido nessa habilidade.",
              "active": false
            }
          ],
          "actions": [
            {
              "id": "act_7110c26a1bfb",
              "name": "Moldar Elemento (Ativar)",
              "description": "Transforma Dano Neutro em Fogo, Água, Vento, Terra, Trovão ou Gelo por 1 minuto.",
              "cost": "2 PE",
              "type": {
                "actionType": "acaoSimples",
                "category": "conjuracao",
                "tags": [
                  "conjuracao"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
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
              "condition": {
                "hasCondition": true,
                "status": "Moldar Elemento",
                "duration": "1 Minuto",
                "description": ""
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 3,
                "unit": "m",
                "targetLimit": ""
              }
            },
            {
              "id": "act_092c8cf682b9",
              "name": "Efeito Fogo (+Dano PE/2)",
              "description": "Aumenta o Dano de Fogo em metade do seu total máximo de PE.",
              "cost": "",
              "type": {
                "actionType": "",
                "category": "conjuracao",
                "tags": []
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard"
              },
              "damage": {
                "hasDamage": true,
                "formula": "Math.floor(@energy.max / 2)",
                "type": "fire",
                "criticalBonus": "",
                "scaling": ""
              },
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 3,
                "unit": "m",
                "targetLimit": ""
              }
            },
            {
              "id": "act_255963c68264",
              "name": "Efeito Gelo (Lentidão)",
              "description": "Alvo atingido por Dano de Gelo fica com Lentidão.",
              "cost": "",
              "type": {
                "actionType": "",
                "category": "conjuracao",
                "tags": []
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
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
              "condition": {
                "hasCondition": true,
                "status": "Lentidão",
                "duration": "1 rodada",
                "description": "-1 em testes de Defesa e Movimentação reduzida pela metade."
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
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
        },
        {
          "id": "ab00400000000000",
          "name": "Campo Elemental",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Campo Elemental.png",
          "level": 1,
          "category": "ofensiva",
          "cost": "1 PE",
          "typeAction": "acaoAtiva",
          "typeAbility": "conjuracao",
          "types": [
            "conjuracao",
            "foco"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "8 Metros",
          "duration": "1 Minuto",
          "description": "Você evoca o seu poder elemental para criar uma zona elemental destrutiva.\nAo utilizar essa habilidade, você deve escolher um dos elementos a seguir: Fogo, Água, Vento, Terra, Trovão ou Gelo.\nVocê evoca o poder elemental escolhido, centrado em um ponto numa superfície a até 8 metros, que afeta toda a área a até 3 metros do ponto central. Caso um Alvo inicie o seu turno ou utilize uma Movimentação através da área afetada p ela habilidade, esse Alvo receberá 1d6 de Dano Mágico do elemento escolhido. Esse valor é aumentado em 1d6 para cada ponto de Arcanismo.\nUm Alvo só poderá ser afetado pelo dano dessa habilidade uma vez por turno.",
          "subEffects": [],
          "improvements": [
            {
              "title": "A) Zona Caótica",
              "description": "A área afetada pelo efeito dessa habilidade é considerada um Terreno Difícil. Alvos não podem utilizar Corrida na área afetada pelo Terreno Difícil.",
              "active": false
            },
            {
              "title": "B) Maestria Elemental",
              "description": "Essa habilidade não é mais considerada um Foco, mas você só pode manter um Campo Elemental por vez. vez. Além disso, a área afetada por esta habilidade é aumenta em 2 metros.",
              "active": false
            }
          ],
          "actions": [
            {
              "id": "act_5ab2e9bb3175",
              "name": "Criar Campo Elemental",
              "description": "Área elemental de 3m a até 8m: iniciar turno ou mover pela área causa 1d6 Dano Mágico (+1d6 por Arcanismo).",
              "cost": "1 PE",
              "type": {
                "actionType": "acaoAtiva",
                "category": "conjuracao",
                "tags": [
                  "conjuracao",
                  "foco"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard"
              },
              "damage": {
                "hasDamage": true,
                "formula": "1d6",
                "type": "fire",
                "criticalBonus": "",
                "scaling": "+1d6 por ponto de Arcanismo"
              },
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
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
        },
        {
          "id": "ab00410000000000",
          "name": "Perito Com Armamentos Mágicos",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Perito Com Armamentos Mágicos.png",
          "level": 1,
          "category": "ofensiva",
          "cost": "",
          "typeAction": "",
          "typeAbility": "passiva",
          "types": [
            "passiva",
            "ataque_magico"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "Pessoal",
          "duration": "Passiva",
          "description": "Requer: Armamento Mágico\nVocê aprende a extrair o potencial máximo dos seus armamentos mágicos.\nAo adquirir essa habilidade, você potencializa os seus Armamentos Mágicos equipados:",
          "subEffects": [
            {
              "name": "Catalisador Místico",
              "cost": "",
              "typeAction": "",
              "type": "ataque_magico",
              "description": "Ao acionar a Propriedade Abalo Místico desse Armamento Mágico, o seu próximo Ataque Mágico possuirá Aptidão. Esse efeito ocorre apenas uma vez por rodada.",
              "note": "",
              "actions": []
            },
            {
              "name": "Berloque de Energia",
              "cost": "",
              "typeAction": "",
              "type": "suporte",
              "description": "Ao acionar a Propriedade Rasga-Véu desse Armamento Mágico, você receberá 1 Ponto de Energia Temporário. Você só poderá receber 2 Pontos de Energia Temporários por esse efeito, por rodada.",
              "note": "",
              "actions": []
            }
          ],
          "improvements": [
            {
              "title": "A) Sinergia Mística",
              "description": "Ao atingir um Alvo com um Ataque Mágico vindo de um Armamento Mágico, a sua próxima Conjuração com custo de PE dentro de 1 minuto terá o seu custo reduzido em 1. Esse efeito não acumula.",
              "active": false
            },
            {
              "title": "B) Maestria com Armamentos Mágicos",
              "description": "Os seus Ataques Mágicos com Armamentos Mágicos ignoram Aptidões e Prioridades em testes de Defesa.",
              "active": false
            }
          ],
          "actions": []
        },
        {
          "id": "ab00420000000000",
          "name": "Rituais Sangrentos",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Rituais Sangrentos.png",
          "level": 1,
          "category": "ofensiva",
          "cost": "X PV",
          "typeAction": "",
          "typeAbility": "conjuracao",
          "types": [
            "conjuracao"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "6 Metros",
          "duration": "Até passar no teste de Espírito",
          "description": "Você toca camadas do Véu que muitos preferem esquecer — mas para você, todo poder tem seu propósito.\nVocê acessa um poder considerado tabu por muitos, aprendendo as seguintes Conjurações:\nX PV: O custo de Pontos de Vida para realizar os efeitos dessa habilidade é equivalente ao seu total máximo de Pontos de Energia.",
          "subEffects": [
            {
              "name": "Poder Carmesim",
              "cost": "X PV",
              "typeAction": "acaoSimples",
              "type": "conjuracao",
              "description": "Você aumenta em 1 um dos seus Parâmetros até o início do seu próximo turno. Esse valor pode ultrapassar o valor máximo de um Parâmetro.",
              "note": "",
              "actions": []
            },
            {
              "name": "Ligação de Sangue",
              "cost": "X PV",
              "typeAction": "acaoRapida",
              "type": "conjuracao",
              "description": "Caso você cause qualquer tipo de dano a um Alvo, você poderá utilizar essa habilidade para fazer com que esse Alvo também receba essa Condição Mágica.\nVocê pode utilizar os Pontos de Vida de Alvos a até 6 metros com esta Condição Mágica (quando aplicada por você) no lugar dos seus próprios Pontos de Vida em custos de X PV das suas Habilidades de Caminho.\nVocê pode utilizar esse efeito apenas uma vez por rodada.\nAlvos afetados por essa Condição Mágica poderão realizar um teste de Espírito, Dif. 8, ao final dos seus turnos. Caso tenham sucesso, essa Condição Mágica será removida.",
              "note": "",
              "actions": []
            }
          ],
          "improvements": [
            {
              "title": "A) Vislumbre Shatraq",
              "description": "A dificuldade (Dif.) do teste de Espírito da Ligação de Sangue é aumentada em 2.",
              "active": false
            },
            {
              "title": "B) Técnica Sangrenta",
              "description": "A Ação Rápida utilizada em Ligação de Sangue é transformada em uma Ação Acelerada.",
              "active": false
            }
          ],
          "actions": [
            {
              "id": "act_537d75fedb50",
              "name": "Teste de Espírito (Resistir)",
              "description": "Teste de Espírito Dif. 8 no final dos turnos do alvo para remover a Condição Mágica.",
              "cost": "",
              "type": {
                "actionType": "",
                "category": "defesa",
                "tags": []
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
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
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": true,
                "category": "parameter",
                "attribute": "spirit",
                "difficulty": 8,
                "onSuccess": "Remove a Condição Mágica Ligação de Sangue.",
                "onFailure": "Permanece com Ligação de Sangue."
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
        },
        {
          "id": "ab00460000000000",
          "name": "Feitiçaria",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Feitiçaria.png",
          "level": 1,
          "category": "auxiliadora",
          "cost": "",
          "typeAction": "",
          "typeAbility": "conjuracao",
          "types": [
            "conjuracao"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "8 Metros",
          "duration": "1 Minuto",
          "description": "Você desperta cada vez mais, abrindo as portas arcanas do Véu.\nVocê desvenda uma nova camada do Véu, recebendo acesso a 5 Feitiços Arcanos à sua escolha. Após concluir um Repouso Completo, você poderá substituir os seus Feitiços Arcanos atuais por outros Feitiços Arcanos.\nAlém disso, você também adquire as seguintes Conjurações:",
          "subEffects": [
            {
              "name": "Rajada De Energia",
              "cost": "1 PE",
              "typeAction": "acaoAtiva",
              "type": "ataque_magico",
              "description": "Você realiza um Ataque Mágico contra um Alvo a até 8 metros. Caso acerte, você causará 1d8 de Dano Mágico Neutro no Alvo. Esse valor é aumentado em 1d8 para cada ponto de Arcanismo.",
              "note": "",
              "actions": []
            },
            {
              "name": "Controlar O Véu",
              "cost": "1 PE",
              "typeAction": "livre",
              "type": "conjuracao",
              "description": "Junto a uma Conjuração realizada por você, você faz com que esta Conjuração não possa causar Danos Mágicos, Efeitos Negativos, Condições Físicas e Condições Mágicas em Alvos Aliados.",
              "note": "",
              "actions": []
            },
            {
              "name": "Armadura Arcana",
              "cost": "2 PE",
              "typeAction": "acaoSimples",
              "type": "defesa",
              "description": "Você reveste o seu corpo com uma membrana mística, aplicando 2 Cargas do efeito Armadura Arcana. O número máximo de Cargas é 2.\nAo receber qualquer tipo de dano, esse dano será reduzido pela metade e uma Carga desse efeito será removida. O efeito dessa habilidade é aplicado antes de qualquer outra redução de danos.\nCom zero Cargas, esse efeito é removido.",
              "note": "",
              "actions": []
            }
          ],
          "improvements": [
            {
              "title": "A) Revestimento Rápido",
              "description": "A Ação Simples utilizada em Armadura Arcana é transformada em uma Ação Acelerada.",
              "active": false
            },
            {
              "title": "B) Maestria Mística",
              "description": "Remove o custo de Pontos de Energia da Rajada de Energia.",
              "active": false
            }
          ],
          "actions": []
        },
        {
          "id": "ab00500000000000",
          "name": "Manipular A Fenda",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Manipular A Fenda.png",
          "level": 1,
          "category": "auxiliadora",
          "cost": "2 PE",
          "typeAction": "acaoRapida",
          "typeAbility": "conjuracao",
          "types": [
            "conjuracao"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "6 Metros",
          "duration": "Instantânea",
          "description": "Você distorce o Véu à sua volta, manipulando o destino de um alvo.\nCaso um Alvo a até 6 metros tenha sucesso ou falhe em um teste de Parâmetro, ou Bloqueio, você poderá utilizar essa habilidade para fazer com que esse mesmo Alvo refaça o teste de Parâmetro, ou Bloqueio.\nAlvos só pode m ser afetado s por essa habilidade uma vez por turno, mesmo vindo de fontes diferentes.",
          "subEffects": [],
          "improvements": [
            {
              "title": "A) Complexidade de Unala",
              "description": "Caso você já tenha utilizado essa habilidade em uma rodada, você poderá utilizá-la uma segunda vez nessa mesma rodada.",
              "active": false
            },
            {
              "title": "B) Manipular o Destino",
              "description": "O novo teste de Parâmetro ou Bloqueio concedido por essa habilidade receberá +1 ou -1, à sua escolha.",
              "active": false
            }
          ],
          "actions": []
        },
        {
          "id": "ab00510000000000",
          "name": "Toque Do Véu",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Toque Do Véu.png",
          "level": 1,
          "category": "auxiliadora",
          "cost": "",
          "typeAction": "",
          "typeAbility": "passiva",
          "types": [
            "passiva",
            "suporte"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "Toque",
          "duration": "Até o próximo Repouso",
          "description": "Requer: Armamento Mágico\nVocê aprendeu a utilizar o seu Armamento Mágico para infundir e aprimorar certos equipamentos.\nApós completar um Repouso, você pode concentrar a energia do seu Armamento Mágico para aprimorar uma Armadura, Escudo ou Armamento que esteja tocando com um dos seguintes efeitos abaixo, referente ao tipo de equipamento. Esse efeito permanece até o seu próximo Repouso.",
          "subEffects": [
            {
              "name": "Armaduras ou Escudos",
              "cost": "",
              "typeAction": "",
              "type": "defesa",
              "description": "Enquanto estiver equipado com esse equipamento, você possui Prioridade em testes de Bloqueio.",
              "note": "",
              "actions": []
            },
            {
              "name": "Armamentos",
              "cost": "",
              "typeAction": "",
              "type": "suporte",
              "description": "Você aprimora as Propriedades existentes em um Armamento:\n• Abalo Místico Aprimorado: Reduz em 2 o valor do Resultado Natural.\n• Afiado Aprimorado: Reduz em 2 o valor do Resultado Natural.\n• Contundente Aprimorado: Reduz em 2 o valor do Resultado Natural.\n• Extensão Aprimorada: Aumenta em 2 metros adicionais.\n• Impacto Aprimorado: Reduz em 2 o valor do Resultado Natural.\n• Perfurar Aprimorado: A diferença para você causar um Acerto Crítico com esse Armamento é reduzida em 1 adicional.\n• Prioridade Aprimorada: Ao vencer um Embate por conta da Prioridade concedida por esse Armamento, você receberá +1 no seu próximo teste de Precisão.\n• Rasga-Véu Aprimorado: Reduz em 2 o valor do Resultado Natural.\n• Traspassar Aprimorado: Reduz em 2 o valor do Resultado Natural.",
              "note": "",
              "actions": []
            }
          ],
          "improvements": [
            {
              "title": "A) Mestre Artesão",
              "description": "Você aumenta o número de equipamentos afetados por essa habilidade em um valor igual ao seu total de pontos de Canalização.",
              "active": false
            },
            {
              "title": "B) Moldar Propriedades",
              "description": "Ao aprimorar um Armamento, você também poderá modificá-lo, aplicando uma das seguintes Propriedades ao Armamento: Afiado, Impacto, Perfurar, Prioridade, Rasga-Véu ou Traspassar. Um Armamento não pode possuir duas Propriedades iguais. Um Armamento não pode ser afetado por esse mesmo efeito mais de uma vez, mesmo vindo de fontes diferentes. Esse efeito é permanente.",
              "active": false
            }
          ],
          "actions": []
        },
        {
          "id": "ab00530000000000",
          "name": "Velocidade Mística",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Velocidade Mística.png",
          "level": 1,
          "category": "auxiliadora",
          "cost": "",
          "typeAction": "",
          "typeAbility": "iniciativa",
          "types": [
            "iniciativa",
            "conjuracao"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "6 Metros",
          "duration": "1ª Rodada",
          "description": "Você acelera seus aliados, impulsionando o Véu de todos.\nVocê faz com que todos os Alvos Aliados a até 6 metros recebam +1d4 na sua rolagem de Iniciativa.\nAlvos afetados por essa habilidade também recebem uma Corrida adicional, que deverá ser utilizada, sem custo de Ação, no seu primeiro turno nesse combate.\nAlvos afetados por essa habilidade podem escolher não ser afetados por qualquer um dos efeitos dessa habilidade.\nUm Alvo não pode ser afetado mais de uma vez pelo efeito dessa habilidade, mesmo vindo de fontes diferentes.",
          "subEffects": [],
          "improvements": [
            {
              "title": "A) Aceleração Arcana",
              "description": "Transforme a Corrida concedida por essa habilidade em uma Movimentação.",
              "active": false
            },
            {
              "title": "B) Triunfo Temporal",
              "description": "Aumente em 1 a Categoria de Dado dessa habilidade.",
              "active": false
            }
          ],
          "actions": [
            {
              "id": "act_02210c772020",
              "name": "Velocidade Mística",
              "description": "+1d4 na rolagem de Iniciativa para aliados a até 6m e 1 Corrida adicional grátis no 1º turno.",
              "cost": "",
              "type": {
                "actionType": "",
                "category": "conjuracao",
                "tags": [
                  "conjuracao"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard"
              },
              "damage": {
                "hasDamage": true,
                "formula": "1d4",
                "type": "neutro",
                "criticalBonus": "",
                "scaling": ""
              },
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": true,
                "shape": "circle",
                "size": 6,
                "unit": "m",
                "targetLimit": ""
              }
            }
          ]
        }
      ]
    },
    "_key": "!items!path000400000000"
  },
  {
    "_id": "path000500000000",
    "name": "O Caminho Do Ladino",
    "type": "path",
    "img": "modules/gaia-compendium-manager/assets/caminhos/ladino.png",
    "system": {
      "description": "“E mais uma vez, como em tantas outras tavernas, encontro um grupo reunido em meio ao barulho de canecas e histórias. Hoje acho que o nome de um deles é Jo’an, ou algo do tipo. Não que importe. \n\nCobalthus está me olhando com aquela cara de novo, perdido. Devo pegar mais uma caneca? Em momentos como esse, eu sempre me aproximo de estranhos e conto uma história, Pharfena exalta nossas conquistas de mentira, eles ficam impressionados e me ofereço para pagar a rodada, alguns estranham, outros aceitam, outros ainda ficam meio perdidos, sem acreditar na ‘boa ação’, mas, no fim, todos se perdem entre conversas e canecas. \n\nAntes de nos despedir, sempre ofereço uma última rodada, por minha conta. Eles não entendem. Já vão indo? Que pena… Eles também nunca entendem quando vão pagar a conta e encontram um grande vazio nos seus bolsos. Mais um tolo, mais um ouro. \n\nPharfena? No’kan? Rhonoa? Cobalthus? Onde estão? Como sempre, foram na frente sem mim. O que será desta vez? Salvar conjuradores de Inquisidores? Caçar algum Caminhante do Véu? Cair ‘sem querer’ numa ruína antiga? Mais uma aventura começa, e minha lâmina está nervosa. \n\nEi! Esperem por mim!”\n- Zathryd, a Neblina\n\nMuitos acreditam que o Caminho do Ladino se resume a roubar, assassinar, participar de operações de cunho duvidoso, masterizar a arte de tornar deplorável a vida dos outros, por fazerem pouco caso de uma simples adaga... e talvez eles estejam certos. \n\nSomos versados na astúcia – enquanto alguns moldam o seu Véu para produzir feitos espalhafatosos, nós usamos o nosso como o manto da noite e das sombras, calculando cada oportunidade para saborear a doce vitória. Se soubessem quantas foram as pessoas que já acolhi sob minha tutela para ensinar as nossas artes – quem são essas pessoas – talvez os aurorianos mudassem a sua visão sobre a realidade. Sobre nós ou sobre suas vidinhas patéticas e sem emoção. \n\nSomos a lâmina necessária, mas não cortejada, que dança com a morte nas noites de neblina. Trilhar o Caminho do Ladino é árduo, mas, sem nós, qualquer trabalho é fadado ao fracasso.",
      "category": "subterfugio",
      "specializations": [
        "<span class='spec-name'>Assassino.</span> <span class='spec-desc'>Seres ágeis e mortais, com técnicas poderosas que podem aniquilar os seus inimigos mesmo antes deles perceberem.</span>",
        "<span class='spec-name'>Atirador.</span> <span class='spec-desc'>Especialistas em armamentos à distância, capazes de tirar o máximo proveito e de utilizar técnicas avançadas com esses equipamentos.</span>",
        "<span class='spec-name'>Duelista.</span> <span class='spec-desc'>Possuem um estilo de combate rápido e sagaz, sendo mestres em ler o combate e aproveitar as oportunidades ao seu favor.</span>",
        "<span class='spec-name'>Sombra.</span> <span class='spec-desc'>Aliados das sombras, que utilizam habilidades furtivas, tornando-se mestres do subterfúgio.</span>",
        "<span class='spec-name'>Trapaceiro.</span> <span class='spec-desc'>Ao invés de utilizar a força e o combate direto, esse aventureiro cheio de truques prefere pegar emprestado habilidades e outros recursos dos seus oponentes.</span>"
      ],
      "keywords": [
        "Armamentos",
        "Ocultação",
        "Oportunista",
        "Controle."
      ],
      "parameterSuggestions": [
        "Agilidade",
        "Precisão",
        "Destreza"
      ],
      "abilities": [
        {
          "id": "ab00540000000000",
          "name": "Armadilhas Místicas",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Armadilhas Místicas.png",
          "level": 1,
          "category": "ofensiva",
          "cost": "2 PE",
          "typeAction": "acaoAtiva",
          "typeAbility": "conjuracao",
          "types": [
            "conjuracao"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "6 Metros",
          "duration": "1 Minuto",
          "description": "Você desenha uma mandala mística em um local.\nAo utilizar essa habilidade, escolha entre Armadilha Atordoante, Armadilha Grudenta ou Armadilha Tóxica.\nVocê conjura, em um ponto numa superfície a até 6 metros, uma mandala mística Invisível, que se torna uma Armadilha Mística por 1 minuto. Esse ponto não pode estar sendo ocupado por um Alvo.\nEssa Armadilha Mística ocupa 1 metro de largura e comprimento. Não é possível aplicar duas ou mais Armadilhas Místicas em um mesmo espaço.\nCaso um Alvo pise em uma Armadilha Mística, ela se ativará, gerando o efeito escolhido:\nVocê também pode ativar uma Armadilha Mística sua com uma Ação Rápida.",
          "subEffects": [
            {
              "name": "Armadilha Atordoante",
              "cost": "2 PE",
              "typeAction": "acaoAtiva",
              "type": "conjuracao",
              "description": "Quando ativada, essa armadilha gera um poderoso impacto, que força todos os Alvos a até 2 metros a um teste de Vigor, Dif. 8. Caso falhem, Alvos atingidos ficarão Atordoados.",
              "note": "",
              "actions": [
                {
                  "id": "act_armadilha_atordoante",
                  "name": "Armadilha Atordoante",
                  "description": "Conjura em até 6m (ou ativa em 2m). Impacto místico que força todos os Alvos a até 2m a um teste de Vigor Dif. 8. Falha: Atordoado.",
                  "cost": "2 PE",
                  "type": {
                    "actionType": "acaoAtiva",
                    "category": "conjuracao",
                    "tags": [
                      "conjuracao"
                    ]
                  },
                  "attack": {
                    "hasAttack": false,
                    "attribute": "agility",
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
                  "condition": {
                    "hasCondition": true,
                    "status": "Atordoado",
                    "duration": "",
                    "description": "Alvos que falharem no teste de Vigor Dif. 8 ficam Atordoados."
                  },
                  "check": {
                    "hasCheck": true,
                    "category": "parameter",
                    "attribute": "vigor",
                    "difficulty": 8,
                    "onSuccess": "Não fica Atordoado",
                    "onFailure": "Fica Atordoado"
                  },
                  "areaOfEffect": {
                    "hasArea": true,
                    "shape": "circle",
                    "size": 2,
                    "unit": "m",
                    "targetLimit": "Todos na área"
                  }
                }
              ]
            },
            {
              "name": "Armadilha Grudenta",
              "cost": "2 PE",
              "typeAction": "acaoAtiva",
              "type": "conjuracao",
              "description": "Quando ativada, essa armadilha lança um líquido místico, que afeta toda superfície em um raio de 2 metros ao seu redor, interrompendo Movimentações quando for ativada. O local com esse líquido é agora considerado um Terreno Difícil. Esse efeito permanece sob o local por 10 minutos.",
              "note": "",
              "actions": [
                {
                  "id": "act_armadilha_grudenta",
                  "name": "Armadilha Grudenta",
                  "description": "Conjura em até 6m (ou ativa em 2m). Lança líquido místico em raio de 2m: interrompe movimentações imediatamente e torna a área Terreno Difícil por 10 minutos.",
                  "cost": "2 PE",
                  "type": {
                    "actionType": "acaoAtiva",
                    "category": "conjuracao",
                    "tags": [
                      "conjuracao"
                    ]
                  },
                  "attack": {
                    "hasAttack": false,
                    "attribute": "agility",
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
                  "condition": {
                    "hasCondition": true,
                    "status": "Terreno Difícil",
                    "duration": "10 Minutos",
                    "description": "Superfície em raio de 2m torna-se Terreno Difícil por 10 minutos. Movimentações são interrompidas na ativação."
                  },
                  "check": {
                    "hasCheck": false,
                    "category": "parameter",
                    "attribute": "agility",
                    "difficulty": 8,
                    "onSuccess": "",
                    "onFailure": ""
                  },
                  "areaOfEffect": {
                    "hasArea": true,
                    "shape": "circle",
                    "size": 2,
                    "unit": "m",
                    "targetLimit": "Superfície / Todos"
                  }
                }
              ]
            },
            {
              "name": "Armadilha Tóxica",
              "cost": "2 PE",
              "typeAction": "acaoAtiva",
              "type": "conjuracao",
              "description": "Quando ativada, essa armadilha lança fragmentos místicos na direção de todos os Alvos em um raio de 2 metros do seu ponto de origem, forçando-os a um teste de Espírito, Dif. 8. Caso falhem, Alvos atingidos ficarão Envenenados por 1 hora.",
              "note": "",
              "actions": [
                {
                  "id": "act_armadilha_toxica",
                  "name": "Armadilha Tóxica",
                  "description": "Conjura em até 6m (ou ativa em 2m). Lança fragmentos místicos em raio de 2m: força todos a um teste de Espírito Dif. 8. Falha: Envenenado por 1 hora.",
                  "cost": "2 PE",
                  "type": {
                    "actionType": "acaoAtiva",
                    "category": "conjuracao",
                    "tags": [
                      "conjuracao"
                    ]
                  },
                  "attack": {
                    "hasAttack": false,
                    "attribute": "agility",
                    "knowledge": "",
                    "bonus": "",
                    "rollType": "standard"
                  },
                  "damage": {
                    "hasDamage": false,
                    "formula": "",
                    "type": "nature",
                    "criticalBonus": "",
                    "scaling": ""
                  },
                  "condition": {
                    "hasCondition": true,
                    "status": "Envenenado",
                    "duration": "1 Hora",
                    "description": "Alvos que falharem no teste de Espírito Dif. 8 ficam Envenenados por 1 hora."
                  },
                  "check": {
                    "hasCheck": true,
                    "category": "parameter",
                    "attribute": "spirit",
                    "difficulty": 8,
                    "onSuccess": "Não fica Envenenado",
                    "onFailure": "Fica Envenenado por 1 hora"
                  },
                  "areaOfEffect": {
                    "hasArea": true,
                    "shape": "circle",
                    "size": 2,
                    "unit": "m",
                    "targetLimit": "Todos na área"
                  }
                }
              ]
            }
          ],
          "improvements": [
            {
              "title": "A) Véu Criador",
              "description": "A Ação Ativa utilizada para realizar essa habilidade é transformada em uma Ação Acelerada.",
              "active": false
            },
            {
              "title": "B) Surpresa Mística",
              "description": "A Ação Rápida do efeito de ativação das armadilhas dessa habilidade é transformada em uma Ação Acelerada.",
              "active": false
            }
          ],
          "actions": [
            {
              "id": "act_armadilha_atordoante",
              "name": "Armadilha Atordoante",
              "description": "Conjura em até 6m (ou ativa em 2m). Impacto místico que força todos os Alvos a até 2m a um teste de Vigor Dif. 8. Falha: Atordoado.",
              "cost": "2 PE",
              "type": {
                "actionType": "acaoAtiva",
                "category": "conjuracao",
                "tags": [
                  "conjuracao"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "agility",
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
              "condition": {
                "hasCondition": true,
                "status": "Atordoado",
                "duration": "",
                "description": "Alvos que falharem no teste de Vigor Dif. 8 ficam Atordoados."
              },
              "check": {
                "hasCheck": true,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 8,
                "onSuccess": "Não fica Atordoado",
                "onFailure": "Fica Atordoado"
              },
              "areaOfEffect": {
                "hasArea": true,
                "shape": "circle",
                "size": 2,
                "unit": "m",
                "targetLimit": "Todos na área"
              }
            },
            {
              "id": "act_armadilha_grudenta",
              "name": "Armadilha Grudenta",
              "description": "Conjura em até 6m (ou ativa em 2m). Lança líquido místico em raio de 2m: interrompe movimentações imediatamente e torna a área Terreno Difícil por 10 minutos.",
              "cost": "2 PE",
              "type": {
                "actionType": "acaoAtiva",
                "category": "conjuracao",
                "tags": [
                  "conjuracao"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "agility",
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
              "condition": {
                "hasCondition": true,
                "status": "Terreno Difícil",
                "duration": "10 Minutos",
                "description": "Superfície em raio de 2m torna-se Terreno Difícil por 10 minutos. Movimentações são interrompidas na ativação."
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "agility",
                "difficulty": 8,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": true,
                "shape": "circle",
                "size": 2,
                "unit": "m",
                "targetLimit": "Superfície / Todos"
              }
            },
            {
              "id": "act_armadilha_toxica",
              "name": "Armadilha Tóxica",
              "description": "Conjura em até 6m (ou ativa em 2m). Lança fragmentos místicos em raio de 2m: força todos a um teste de Espírito Dif. 8. Falha: Envenenado por 1 hora.",
              "cost": "2 PE",
              "type": {
                "actionType": "acaoAtiva",
                "category": "conjuracao",
                "tags": [
                  "conjuracao"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "agility",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard"
              },
              "damage": {
                "hasDamage": false,
                "formula": "",
                "type": "nature",
                "criticalBonus": "",
                "scaling": ""
              },
              "condition": {
                "hasCondition": true,
                "status": "Envenenado",
                "duration": "1 Hora",
                "description": "Alvos que falharem no teste de Espírito Dif. 8 ficam Envenenados por 1 hora."
              },
              "check": {
                "hasCheck": true,
                "category": "parameter",
                "attribute": "spirit",
                "difficulty": 8,
                "onSuccess": "Não fica Envenenado",
                "onFailure": "Fica Envenenado por 1 hora"
              },
              "areaOfEffect": {
                "hasArea": true,
                "shape": "circle",
                "size": 2,
                "unit": "m",
                "targetLimit": "Todos na área"
              }
            },
            {
              "id": "act_detonar_armadilha",
              "name": "Detonar Armadilha",
              "description": "Gasta uma Ação Rápida para detonar manualmente uma de suas Armadilhas Místicas ativas (Ação Acelerada com Aprimoramento Surpresa Mística).",
              "cost": "",
              "type": {
                "actionType": "acaoRapida",
                "category": "conjuracao",
                "tags": []
              },
              "attack": {
                "hasAttack": false,
                "attribute": "agility",
                "knowledge": "",
                "bonus": "",
                "rollType": "standard"
              },
              "damage": {
                "hasDamage": false,
                "formula": "",
                "type": "immaterial",
                "criticalBonus": "",
                "scaling": ""
              },
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 8,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 0,
                "unit": "m",
                "targetLimit": ""
              }
            }
          ]
        },
        {
          "id": "ab00550000000000",
          "name": "Disparo Debilitante",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Disparo Debilitante.png",
          "level": 1,
          "category": "ofensiva",
          "cost": "1 PE",
          "typeAction": "acaoAtiva",
          "typeAbility": "ataque_distancia",
          "types": [
            "ataque_distancia"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "Conforme armamento",
          "duration": "Conforme técnica",
          "description": "Somente com Armamentos à Distância\nVocê mira precisamente com o seu armamento, tentando atingir um ponto específico do seu alvo.\nVocê realiza um Ataque Físico contra um Alvo dentro do alcance de seu Armamento à Distância equipado. Caso tenha sucesso, você aplicará no Alvo dessa habilidade um dos seguintes efeitos, à sua escolha.\nCaso o Ataque Físico realizado nesta habilidade seja realizado com dois Armamentos à Distância, somente o primeiro disparo realizado poderá aplicar os efeitos abaixo.",
          "subEffects": [
            {
              "name": "Parte Inferior",
              "cost": "1 PE",
              "typeAction": "acaoAtiva",
              "type": "ataque_distancia",
              "description": "Você acerta a parte inferior do Alvo, forçando-o a um teste de Vigor, Dif. 8. Caso falhe, você aplicará Caído no Alvo.",
              "note": "",
              "actions": [
                {
                  "id": "act_disparo_inferior",
                  "name": "Disparo Debilitante: Parte Inferior",
                  "description": "Ataque Físico à Distância. Ao atingir, força o Alvo a um teste de Vigor Dif. 8. Caso falhe, aplica Caído.",
                  "cost": "1 PE",
                  "type": {
                    "actionType": "acaoAtiva",
                    "category": "ataque_distancia",
                    "tags": [
                      "ataque_distancia"
                    ]
                  },
                  "attack": {
                    "hasAttack": true,
                    "attribute": "precision",
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
                  "condition": {
                    "hasCondition": true,
                    "status": "Caído",
                    "duration": "",
                    "description": "Alvo falha no teste de Vigor Dif. 8 e fica Caído."
                  },
                  "check": {
                    "hasCheck": true,
                    "category": "parameter",
                    "attribute": "vigor",
                    "difficulty": 8,
                    "onSuccess": "Não fica Caído",
                    "onFailure": "Fica Caído"
                  },
                  "areaOfEffect": {
                    "hasArea": false,
                    "shape": "circle",
                    "size": 0,
                    "unit": "m",
                    "targetLimit": "1"
                  }
                }
              ]
            },
            {
              "name": "Parte Superior",
              "cost": "1 PE",
              "typeAction": "acaoAtiva",
              "type": "ataque_distancia",
              "description": "Você acerta a parte superior do Alvo, forçando-o a um teste de Vigor, Dif. 8. Caso falhe, o Alvo terá Inaptidão no seu próximo teste de Precisão ou Canalização.",
              "note": "",
              "actions": [
                {
                  "id": "act_disparo_superior",
                  "name": "Disparo Debilitante: Parte Superior",
                  "description": "Ataque Físico à Distância. Ao atingir, força o Alvo a um teste de Vigor Dif. 8. Caso falhe, o Alvo terá Inaptidão no próximo teste de Precisão ou Canalização.",
                  "cost": "1 PE",
                  "type": {
                    "actionType": "acaoAtiva",
                    "category": "ataque_distancia",
                    "tags": [
                      "ataque_distancia"
                    ]
                  },
                  "attack": {
                    "hasAttack": true,
                    "attribute": "precision",
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
                  "condition": {
                    "hasCondition": true,
                    "status": "Inaptidão",
                    "duration": "Próximo teste",
                    "description": "Inaptidão no próximo teste de Precisão ou Canalização."
                  },
                  "check": {
                    "hasCheck": true,
                    "category": "parameter",
                    "attribute": "vigor",
                    "difficulty": 8,
                    "onSuccess": "Não recebe Inaptidão",
                    "onFailure": "Inaptidão no próximo teste de Precisão ou Canalização"
                  },
                  "areaOfEffect": {
                    "hasArea": false,
                    "shape": "circle",
                    "size": 0,
                    "unit": "m",
                    "targetLimit": "1"
                  }
                }
              ]
            },
            {
              "name": "Parte Vital",
              "cost": "1 PE",
              "typeAction": "acaoAtiva",
              "type": "ataque_distancia",
              "description": "Você acerta um ponto vital do Alvo, forçando-o a um teste de Vigor, Dif. 8. Caso falhe, o Alvo é afetado por Sangramento por 1 hora.",
              "note": "",
              "actions": [
                {
                  "id": "act_disparo_vital",
                  "name": "Disparo Debilitante: Parte Vital",
                  "description": "Ataque Físico à Distância. Ao atingir, força o Alvo a um teste de Vigor Dif. 8. Caso falhe, o Alvo é afetado por Sangramento por 1 hora.",
                  "cost": "1 PE",
                  "type": {
                    "actionType": "acaoAtiva",
                    "category": "ataque_distancia",
                    "tags": [
                      "ataque_distancia"
                    ]
                  },
                  "attack": {
                    "hasAttack": true,
                    "attribute": "precision",
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
                  "condition": {
                    "hasCondition": true,
                    "status": "Sangramento",
                    "duration": "1 Hora",
                    "description": "Alvo afetado por Sangramento por 1 hora."
                  },
                  "check": {
                    "hasCheck": true,
                    "category": "parameter",
                    "attribute": "vigor",
                    "difficulty": 8,
                    "onSuccess": "Não recebe Sangramento",
                    "onFailure": "Afetado por Sangramento por 1 hora"
                  },
                  "areaOfEffect": {
                    "hasArea": false,
                    "shape": "circle",
                    "size": 0,
                    "unit": "m",
                    "targetLimit": "1"
                  }
                }
              ]
            }
          ],
          "improvements": [
            {
              "title": "A) Pontos Expostos",
              "description": "As dificuldades (Dif.) dos testes de Vigor dessa habilidade são aumentadas em 2.",
              "active": false
            },
            {
              "title": "B) Disparo Preciso",
              "description": "Ao atingir um Alvo com o Ataque Físico desta habilidade, você receberá +1 no seu próximo teste de Precisão contra esse mesmo Alvo. Este efeito não acumula.",
              "active": false
            }
          ],
          "actions": [
            {
              "id": "act_disparo_inferior",
              "name": "Disparo Debilitante: Parte Inferior",
              "description": "Ataque Físico à Distância. Ao atingir, força o Alvo a um teste de Vigor Dif. 8. Caso falhe, aplica Caído.",
              "cost": "1 PE",
              "type": {
                "actionType": "acaoAtiva",
                "category": "ataque_distancia",
                "tags": [
                  "ataque_distancia"
                ]
              },
              "attack": {
                "hasAttack": true,
                "attribute": "precision",
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
              "condition": {
                "hasCondition": true,
                "status": "Caído",
                "duration": "",
                "description": "Alvo falha no teste de Vigor Dif. 8 e fica Caído."
              },
              "check": {
                "hasCheck": true,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 8,
                "onSuccess": "Não fica Caído",
                "onFailure": "Fica Caído"
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 0,
                "unit": "m",
                "targetLimit": "1"
              }
            },
            {
              "id": "act_disparo_superior",
              "name": "Disparo Debilitante: Parte Superior",
              "description": "Ataque Físico à Distância. Ao atingir, força o Alvo a um teste de Vigor Dif. 8. Caso falhe, o Alvo terá Inaptidão no próximo teste de Precisão ou Canalização.",
              "cost": "1 PE",
              "type": {
                "actionType": "acaoAtiva",
                "category": "ataque_distancia",
                "tags": [
                  "ataque_distancia"
                ]
              },
              "attack": {
                "hasAttack": true,
                "attribute": "precision",
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
              "condition": {
                "hasCondition": true,
                "status": "Inaptidão",
                "duration": "Próximo teste",
                "description": "Inaptidão no próximo teste de Precisão ou Canalização."
              },
              "check": {
                "hasCheck": true,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 8,
                "onSuccess": "Não recebe Inaptidão",
                "onFailure": "Inaptidão no próximo teste de Precisão ou Canalização"
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 0,
                "unit": "m",
                "targetLimit": "1"
              }
            },
            {
              "id": "act_disparo_vital",
              "name": "Disparo Debilitante: Parte Vital",
              "description": "Ataque Físico à Distância. Ao atingir, força o Alvo a um teste de Vigor Dif. 8. Caso falhe, o Alvo é afetado por Sangramento por 1 hora.",
              "cost": "1 PE",
              "type": {
                "actionType": "acaoAtiva",
                "category": "ataque_distancia",
                "tags": [
                  "ataque_distancia"
                ]
              },
              "attack": {
                "hasAttack": true,
                "attribute": "precision",
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
              "condition": {
                "hasCondition": true,
                "status": "Sangramento",
                "duration": "1 Hora",
                "description": "Alvo afetado por Sangramento por 1 hora."
              },
              "check": {
                "hasCheck": true,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 8,
                "onSuccess": "Não recebe Sangramento",
                "onFailure": "Afetado por Sangramento por 1 hora"
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 0,
                "unit": "m",
                "targetLimit": "1"
              }
            }
          ]
        },
        {
          "id": "ab00590000000000",
          "name": "Emboscar",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Emboscar.png",
          "level": 1,
          "category": "ofensiva",
          "cost": "",
          "typeAction": "",
          "typeAbility": "iniciativa",
          "types": [
            "iniciativa"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "Pessoal",
          "duration": "1ª Rodada",
          "description": "Você analisa um combate prestes a ocorrer, escolhendo a melhor forma de agir.\nDurante a Iniciativa, você pode realizar uma Corrida.\nAlém disso, você possui Aptidão nos seus testes de Precisão, Canalização e Defesa na primeira rodada desse combate.",
          "subEffects": [],
          "improvements": [
            {
              "title": "A) Oportunista",
              "description": "A Corrida concedida por essa habilidade é transformada em uma Movimentação. Na primeira rodada desse combate você também recebe Prioridade em testes de Precisão, Canalização e Defesa.",
              "active": false
            },
            {
              "title": "B) Segunda Chance",
              "description": "Você poderá refazer, uma única vez, um teste de Precisão, Canalização ou Defesa realizado na primeira rodada desse combate.",
              "active": false
            }
          ],
          "actions": []
        },
        {
          "id": "ab00600000000000",
          "name": "Estilo Único",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Estilo Único.png",
          "level": 1,
          "category": "ofensiva",
          "cost": "",
          "typeAction": "",
          "typeAbility": "passiva",
          "types": [
            "passiva",
            "ataque_corpo_a_corpo"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "Pessoal",
          "duration": "Passiva",
          "description": "Você se tornou um com os seus armamentos, criando um estilo de combate único.\nAo adquirir essa habilidade você receberá as seguintes técnicas:",
          "subEffects": [
            {
              "name": "Combate Híbrido",
              "cost": "",
              "typeAction": "",
              "typeAbility": "passiva",
              "description": "Você deixa de receber a Inaptidão gerada pela regra de Empunhadura Dupla ao equipar um Armamento Leve e um Armamento à Distância de uma mão ao mesmo tempo.\nNo final do seu turno, sem custo de Ação, você pode recarregar um Armamento equipado por você que possua a Propriedade Tambor.",
              "note": "",
              "actions": []
            },
            {
              "name": "Esgrimista",
              "cost": "",
              "typeAction": "acaoAtiva",
              "typeAbility": "passiva",
              "description": "Enquanto você estiver equipado com apenas um Armamento Leve, possuindo a outra mão livre, sempre que realizar um Ataque Físico com esse Armamento Leve, você pode realizar dois golpes, podendo escolher Alvos diferentes. Efeitos que seriam aplicados somente no primeiro golpe de um Ataque Físico também serão aplicados somente no primeiro golpe dessa técnica.",
              "note": "",
              "actions": [
                {
                  "id": "act_592cf2dcc7df",
                  "name": "Esgrimista (Ataque Duplo)",
                  "description": "Realiza dois golpes com Armamento Leve e mão livre.",
                  "cost": "",
                  "type": {
                    "actionType": "acaoAtiva",
                    "category": "ataque_corpo_a_corpo",
                    "tags": []
                  },
                  "attack": {
                    "hasAttack": true,
                    "attribute": "precision",
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
                  "condition": {
                    "hasCondition": false,
                    "status": "",
                    "duration": "",
                    "description": ""
                  },
                  "check": {
                    "hasCheck": false,
                    "category": "parameter",
                    "attribute": "vigor",
                    "difficulty": 10,
                    "onSuccess": "",
                    "onFailure": ""
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
            },
            {
              "name": "Combo",
              "cost": "",
              "typeAction": "",
              "typeAbility": "passiva",
              "description": "Caso você tenha sucesso em um teste de Precisão contra a Defesa de um Alvo, você receberá +1 em Precisão até o final desse turno. Esse efeito não acumula.",
              "note": "",
              "actions": []
            }
          ],
          "improvements": [
            {
              "title": "A) Aprendizado Instantâneo",
              "description": "Caso você realize Ataque Físico com o efeito de Combate Híbrido ou Esgrimista, e falhe no primeiro golpe, o segundo golpe receberá Aptidão.",
              "active": false
            },
            {
              "title": "B) Sequência",
              "description": "Aumente em 1 o valor de Precisão recebido por Combo.",
              "active": false
            }
          ],
          "actions": [
            {
              "id": "act_592cf2dcc7df",
              "name": "Esgrimista (Ataque Duplo)",
              "description": "Realiza dois golpes com Armamento Leve e mão livre.",
              "cost": "",
              "type": {
                "actionType": "acaoAtiva",
                "category": "ataque_corpo_a_corpo",
                "tags": []
              },
              "attack": {
                "hasAttack": true,
                "attribute": "precision",
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
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
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
        },
        {
          "id": "ab00620000000000",
          "name": "Revidar",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Revidar.png",
          "level": 1,
          "category": "ofensiva",
          "cost": "2 PE",
          "typeAction": "acaoRapida",
          "typeAbility": "defesa",
          "types": [
            "defesa"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "Conforme armamento",
          "duration": "Até o final do turno",
          "description": "Você contra-ataca rapidamente um alvo que lhe atacou.\nCaso você tenha sido Alvo de um Ataque Físico ou Ataque Mágico, no final des se turno, você poderá realizar um Ataque Físico ou Ataque Mágico contra o Alvo que realizou o ataque.\nCaso você tenha sucesso no teste de Agilidade contra este Ataque Físico ou Ataque Mágico, você receberá +1 em Precisão e Canalização até o final desse turno.",
          "subEffects": [],
          "improvements": [
            {
              "title": "A) Movimentação Vingativa",
              "description": "Antes de realizar o Ataque Físico ou Ataque Mágico com essa habilidade, você poderá utilizar uma Movimentação em direção ao Alvo dessa habilidade.",
              "active": false
            },
            {
              "title": "B) Vingança Precisa",
              "description": "Aumente em 1 o valor de Precisão e Canalização recebido por essa habilidade.",
              "active": false
            }
          ],
          "actions": [
            {
              "id": "act_69b66168f442",
              "name": "Contra-Ataque Físico",
              "description": "Contra-ataque físico no final do turno de quem lhe atacou.",
              "cost": "2 PE",
              "type": {
                "actionType": "acaoRapida",
                "category": "ataque_corpo_a_corpo",
                "tags": []
              },
              "attack": {
                "hasAttack": true,
                "attribute": "precision",
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
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 3,
                "unit": "m",
                "targetLimit": ""
              }
            },
            {
              "id": "act_0c58576f4e8f",
              "name": "Contra-Ataque Mágico",
              "description": "Contra-ataque mágico no final do turno de quem lhe atacou.",
              "cost": "2 PE",
              "type": {
                "actionType": "acaoRapida",
                "category": "ataque_magico",
                "tags": []
              },
              "attack": {
                "hasAttack": true,
                "attribute": "channeling",
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
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 3,
                "unit": "m",
                "targetLimit": ""
              }
            },
            {
              "id": "act_211683504279",
              "name": "Defesa Reativa (Agilidade)",
              "description": "Ao passar no teste de Agilidade contra o ataque, recebe +1 em Precisão e Canalização até o final do turno.",
              "cost": "",
              "type": {
                "actionType": "",
                "category": "defesa",
                "tags": []
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
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
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": true,
                "category": "parameter",
                "attribute": "agility",
                "difficulty": 0,
                "onSuccess": "+1 em Precisão e Canalização até o final do turno",
                "onFailure": ""
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
        },
        {
          "id": "ab00630000000000",
          "name": "Ladinagem",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Ladinagem.png",
          "level": 1,
          "category": "ofensiva",
          "cost": "",
          "typeAction": "",
          "typeAbility": "passiva",
          "types": [
            "passiva",
            "ataque_corpo_a_corpo"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "Conforme armamento",
          "duration": "Passiva",
          "description": "Você surpreende os alvos dos seus ataques, e quando estiverem desprevenidos...\nAo adquirir essa habilidade você receberá as seguintes técnicas:",
          "subEffects": [
            {
              "name": "Maestria Assassina",
              "cost": "",
              "typeAction": "",
              "typeAbility": "passiva",
              "description": "Ao receber Aptidão em um Ataque Físico, o dano causado por esse Ataque Físico será aumentado em 1d4. Esse valor é aumentado em 1d4 adicional para cada 2 pontos de Destreza.\nCaso o Ataque Físico realizado nessa habilidade seja realizado com dois Armamentos, ou com dois Ataques Desarmados, somente o primeiro golpe receberá o efeito dessa técnica.\nEssa técnica só poderá ser utilizada uma vez por turno.",
              "note": "",
              "actions": []
            },
            {
              "name": "Perito Em Arremesso",
              "cost": "",
              "typeAction": "",
              "typeAbility": "passiva",
              "description": "Você modifica a Regra de Arremesso, fazendo com que o dano causado por um Ataque Físico originado pelo arremesso de um Armamento Leve deixe de ser reduzido pela metade, causando o seu dano total.",
              "note": "",
              "actions": []
            },
            {
              "name": "Sem Escapatória",
              "cost": "",
              "typeAction": "reacao",
              "type": "ataque_corpo_a_corpo",
              "description": "Caso um Alvo realize uma Movimentação que o colocaria fora do alcance do seu Armamento ou Ataque Desarmado, você poderá realizar um Ataque Extra contra esse mesmo Alvo, antes que a movimentação ocorra. Você pode utilizar esse efeito apenas uma vez por rodada.",
              "note": "",
              "actions": []
            }
          ],
          "improvements": [
            {
              "title": "A) Corte Mortal de Lyferion",
              "description": "A diferença para você causar um Acerto Crítico é permanentemente reduzida em 1.",
              "active": false
            },
            {
              "title": "B) Debilitar",
              "description": "Ao atingir um Alvo com o Ataque Extra de Sem Escapatória, você aplicará Inaptidão no próximo teste de Parâmetro deste Alvo.",
              "active": false
            }
          ],
          "actions": []
        },
        {
          "id": "ab00650000000000",
          "name": "Manto Das Sombras",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Manto Das Sombras.png",
          "level": 1,
          "category": "ofensiva",
          "cost": "2 PE",
          "typeAction": "acaoAtiva",
          "typeAbility": "conjuracao",
          "types": [
            "conjuracao"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "Pessoal",
          "duration": "1 Minuto",
          "description": "Você é revestido por uma energia sombria, que faz com que o seu corpo, e tudo que você carrega consigo, desapareça, misturando-se com o Véu.\nAo adquirir essa habilidade, você passa a poder ficar Invisível.\nAlém disso, caso você atinja um Alvo com um Ataque Físico ou Ataque Mágico, e o Resultado Natural (Precisão ou Canalização) deste ataque tenha sido 10, ou mais, você poderá gastar 1 PE para ficar Invisível. Esse efeito ocorre apenas uma vez por turno.",
          "subEffects": [],
          "improvements": [
            {
              "title": "A) Caminhante das Sombras",
              "description": "O efeito des sa habilidade passa a ser realizado com um Resultado Natural de 8, ou mais, ao invés de 10.",
              "active": false
            },
            {
              "title": "B) Truques de Nistragard",
              "description": "Ao ter o efeito de Invisível dessa habilidade removido, você receberá Aptidão no seu próximo teste de Agilidade realizado dentro de até 1 minuto.",
              "active": false
            }
          ],
          "actions": [
            {
              "id": "act_058882fec184",
              "name": "Ativar Manto das Sombras",
              "description": "Fica Invisível e Furtivo imediatamente por 1 minuto.",
              "cost": "2 PE",
              "type": {
                "actionType": "acaoAtiva",
                "category": "conjuracao",
                "tags": [
                  "conjuracao"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
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
              "condition": {
                "hasCondition": true,
                "status": "Invisível",
                "duration": "1 Minuto",
                "description": "Invisível e Furtivo. Teste imediato de Furtividade."
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 3,
                "unit": "m",
                "targetLimit": ""
              }
            },
            {
              "id": "act_c5c218a40fb5",
              "name": "Desvanecer no Crítico (10+)",
              "description": "Gasta 1 PE para ficar Invisível ao acertar ataque com d12 natural 10+ (1x por turno).",
              "cost": "1 PE",
              "type": {
                "actionType": "",
                "category": "conjuracao",
                "tags": [
                  "conjuracao"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
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
              "condition": {
                "hasCondition": true,
                "status": "Invisível",
                "duration": "1 Minuto",
                "description": ""
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
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
        },
        {
          "id": "ab00660000000000",
          "name": "Perito Com Armamentos À Distância",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Perito Com Armamentos À Distância.png",
          "level": 1,
          "category": "ofensiva",
          "cost": "",
          "typeAction": "",
          "typeAbility": "passiva",
          "types": [
            "passiva",
            "ataque_distancia"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "Conforme armamento",
          "duration": "Passiva",
          "description": "Somente com Armamentos à Distância\nVocê treinou arduamente para saber a melhor forma de utilizar esses armamentos.\nAo adquirir essa habilidade você receberá as seguintes técnicas, enquanto estiver utilizando um Armamento à Distância:",
          "subEffects": [
            {
              "name": "Mirar",
              "cost": "",
              "typeAction": "acaoSimples",
              "type": "ataque_distancia",
              "description": "Você mira rapidamente em um Alvo, recebendo +1 de Precisão nos seus Ataques Físicos com Armamentos à Distância contra esse Alvo, até o final desse turno.",
              "note": "",
              "actions": []
            },
            {
              "name": "Arquearia",
              "cost": "",
              "typeAction": "",
              "typeAbility": "passiva",
              "description": "Arcos, Bestas Pequenas e Bestas Grandes equipadas por você possuem a Propriedade Prioridade.",
              "note": "",
              "actions": []
            },
            {
              "name": "Manejo Com Armamentos À Distância",
              "cost": "",
              "typeAction": "",
              "typeAbility": "passiva",
              "description": "Você deixa de receber a Inaptidão gerada pela regra de Empunhadura Dupla ao equipar duas Bestas Pequenas, dois Revólveres, ou um de cada ao mesmo tempo.",
              "note": "",
              "actions": []
            },
            {
              "name": "Perito Com Recarga",
              "cost": "",
              "typeAction": "livre",
              "typeAbility": "passiva",
              "description": "No final do seu turno, sem custo de Ação, você pode recarregar até dois Armamentos equipados por você, que possuam Propriedade Tambor.",
              "note": "",
              "actions": []
            }
          ],
          "improvements": [
            {
              "title": "A) Olhos de Águia",
              "description": "Os seus Ataques Físicos com Arcos, Bestas Pequenas e Bestas Grandes ignoram Aptidões e Prioridades em testes de Defesa.",
              "active": false
            },
            {
              "title": "B) Técnica do Atirador",
              "description": "Alvos atingidos por seus Ataques Físicos com Revólveres e Mosquetes recebem -1 no seu próximo teste de Defesa. Esse efeito não acumula, mesmo vindo de fontes diferentes.",
              "active": false
            }
          ],
          "actions": []
        },
        {
          "id": "ab00690000000000",
          "name": "Reflexo Enganador",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Reflexo Enganador.png",
          "level": 1,
          "category": "defensiva",
          "cost": "2 PE",
          "typeAction": "acaoSimples",
          "typeAbility": "conjuracao",
          "types": [
            "conjuracao",
            "defesa",
            "foco"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "1 Metro",
          "duration": "1 Minuto",
          "description": "Com um movimento sutil, você manipula o Véu, criando uma cópia sua.\nVocê cria uma cópia ilusória sua em uma superfície a até 1 metro, que fala e age igual a você, mas permanece no mesmo local até o final da duração dessa habilidade.\nCaso um Alvo Inimigo a até 4 metros da ilusão inicie o seu turno, esse Alvo Inimigo deverá realizar um teste de Espírito, Dif. 8. Caso falhe, a próxima ação ofensiva realizada por esse Alvo Inimigo deverá ter a ilusão como Alvo, ao invés de você ou de seus Alvos Aliados. Caso a ação utilizada possua uma área de efeito, o ponto central deverá ser a ilusão.\nA ilusão criada por essa habilidade não possui nenhum tipo de Ação ou Parâmetros, mas pode realizar testes de Defesa normalmente. Essa ilusão falha automaticamente contra qualquer outro tipo de teste de Parâmetro.",
          "subEffects": [
            {
              "name": "Capacidade",
              "cost": "",
              "typeAction": "",
              "type": "defesa",
              "description": "A ilusão criada por esta habilidade não possui Pontos de Vida, mas sim 1 ponto de Capacidade.\nCaso essa ilusão receba qualquer tipo de dano, ela perderá 1 ponto de Capacidade. Com zero pontos de Capacidade, a ilusão desaparece.",
              "note": "",
              "actions": []
            }
          ],
          "improvements": [
            {
              "title": "A) Titereiro Místico",
              "description": "A Ação Simples utilizada para realizar essa habilidade é transformada em uma Ação Acelerada.",
              "active": false
            },
            {
              "title": "B) Aprimorar Ilusão",
              "description": "A dificuldade (Dif.) do teste de Espírito dessa habilidade é aumentada em 2.",
              "active": false
            }
          ],
          "actions": [
            {
              "id": "act_075ced7f65d9",
              "name": "Criar Cópia Ilusória",
              "description": "Cria cópia ilusória a até 1m com 1 ponto de Capacidade que atrai ações ofensivas inimigas.",
              "cost": "2 PE",
              "type": {
                "actionType": "acaoSimples",
                "category": "conjuracao",
                "tags": [
                  "conjuracao",
                  "foco",
                  "defesa"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
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
              "condition": {
                "hasCondition": true,
                "status": "Reflexo Enganador",
                "duration": "1 Minuto",
                "description": "Cria cópia com 1 ponto de Capacidade a até 1m que atrai ações ofensivas inimigas."
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 3,
                "unit": "m",
                "targetLimit": ""
              }
            },
            {
              "id": "act_74e48928cfa0",
              "name": "Desviar Atenção (Espírito)",
              "description": "Inimigo a até 4m que iniciar turno deve passar em Espírito Dif. 8 ou mirar a ilusão.",
              "cost": "",
              "type": {
                "actionType": "",
                "category": "defesa",
                "tags": []
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
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
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": true,
                "category": "parameter",
                "attribute": "spirit",
                "difficulty": 8,
                "onSuccess": "Percebe a farsa e age livremente",
                "onFailure": "Próxima ação ofensiva deve ter a ilusão como alvo"
              },
              "areaOfEffect": {
                "hasArea": true,
                "shape": "circle",
                "size": 4,
                "unit": "m",
                "targetLimit": ""
              }
            }
          ]
        },
        {
          "id": "ab00700000000000",
          "name": "Marca Sombria",
          "type": "ability",
          "img": "modules/gaia-compendium-manager/assets/caminhos/Marca Sombria.png",
          "level": 1,
          "category": "auxiliadora",
          "cost": "2 PE",
          "typeAction": "acaoSimples",
          "typeAbility": "conjuracao",
          "types": [
            "conjuracao",
            "foco"
          ],
          "quote": "",
          "numberTarget": "1",
          "range": "6 Metros",
          "duration": "Até passar no teste de Espírito",
          "description": "Você cria e mantém um símbolo místico sombrio sobre um alvo.\nVocê aplica essa Condição Mágica em um Alvo a até 6 metros, fazendo com que esse Alvo seja afetado por Escuridão.\nAlvos afetados por essa Condição Mágica poderão realizar um teste de Espírito, Dif. 8, no final dos seus turnos. Caso tenham sucesso, essa Condição Mágica será removida.",
          "subEffects": [],
          "improvements": [
            {
              "title": "A) Símbolo Sombrio",
              "description": "A dificuldade ( Dif.) do teste de Espírito dessa habilidade é aumentada em 2.",
              "active": false
            },
            {
              "title": "B) Cicatriz Sombria",
              "description": "O teste de Espírito dessa habilidade possui Inaptidão.",
              "active": false
            }
          ],
          "actions": [
            {
              "id": "act_a28dacbe65ff",
              "name": "Aplicar Marca Sombria",
              "description": "Aplica Condição Mágica em alvo a até 6m: afetado por Escuridão (Inaptidão em Percepção, visão 4m, -1 Precisão/Canalização).",
              "cost": "2 PE",
              "type": {
                "actionType": "acaoSimples",
                "category": "conjuracao",
                "tags": [
                  "conjuracao",
                  "foco"
                ]
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
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
              "condition": {
                "hasCondition": true,
                "status": "Escuridão",
                "duration": "1 Minuto",
                "description": "Inaptidão em Percepção, visão 4 metros, -1 em Precisão e Canalização."
              },
              "check": {
                "hasCheck": false,
                "category": "parameter",
                "attribute": "vigor",
                "difficulty": 10,
                "onSuccess": "",
                "onFailure": ""
              },
              "areaOfEffect": {
                "hasArea": false,
                "shape": "circle",
                "size": 3,
                "unit": "m",
                "targetLimit": ""
              }
            },
            {
              "id": "act_bf5529c18383",
              "name": "Teste de Espírito (Resistir)",
              "description": "Teste de Espírito Dif. 8 no final dos turnos do alvo para remover a Condição Mágica.",
              "cost": "",
              "type": {
                "actionType": "",
                "category": "defesa",
                "tags": []
              },
              "attack": {
                "hasAttack": false,
                "attribute": "precision",
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
              "condition": {
                "hasCondition": false,
                "status": "",
                "duration": "",
                "description": ""
              },
              "check": {
                "hasCheck": true,
                "category": "parameter",
                "attribute": "spirit",
                "difficulty": 8,
                "onSuccess": "Remove a Condição Mágica",
                "onFailure": "Permanece sob efeito de Escuridão"
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
      ]
    },
    "_key": "!items!path000500000000"
  }
];
