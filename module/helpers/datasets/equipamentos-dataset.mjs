// ==============================================================================
// GAIA: O PRELÚDIO - DATASET COMPLETO DE EQUIPAMENTOS, ARMAS E PROTEÇÕES
// ==============================================================================

export const ARMAS_FOLDERS_DATA = [
  {
    "_id": "fldar00010000000",
    "name": "Armamento Leve",
    "type": "Item",
    "sorting": "a",
    "color": "#0f172a",
    "_key": "!folders!fldar00010000000"
  },
  {
    "_id": "fldar00020000000",
    "name": "Armamento Pesado",
    "type": "Item",
    "sorting": "a",
    "color": "#0f172a",
    "_key": "!folders!fldar00020000000"
  },
  {
    "_id": "fldar00030000000",
    "name": "Armamento à Distância",
    "type": "Item",
    "sorting": "a",
    "color": "#0f172a",
    "_key": "!folders!fldar00030000000"
  },
  {
    "_id": "fldar00040000000",
    "name": "Armamento Mágico",
    "type": "Item",
    "sorting": "a",
    "color": "#0f172a",
    "_key": "!folders!fldar00040000000"
  }
];

export const ARMAS_DATA = [
  {
    "_id": "eqarm_golpe_brutal",
    "name": "Golpe Brutal",
    "type": "weapon",
    "img": "systems/gaia-preludio/assets/golpe-brutal.jpg",
    "itemKey": "golpe_brutal",
    "system": {
      "name": "Golpe Brutal",
      "description": "A criatura realiza um Ataque Físico com alguma parte do seu corpo contra um Alvo a até 1 metro. Caso tenha sucesso, causará no Alvo 1d8 de Dano Físico para cada ponto de Poder que possua (1d10 para Dificuldade Difícil ou Extrema).<br><br>Ao realizar esse Ataque Físico, a criatura poderá utilizar a sua Ação Simples, Ação Rápida ou 1 Ponto de Energia para aumentar o alcance desse Ataque Físico em 3 metros.<br><br><em>Esse tipo de ataque não é considerado um Ataque Desarmado.</em>",
      "price": 0,
      "category": "Armamento Natural",
      "unity": 0,
      "equipped": true,
      "quantity": 1,
      "weaponType": "light",
      "damageType": {
        "value": 1,
        "type": "physical"
      },
      "attackParameter": {
        "value": 0,
        "attribute": "precision"
      },
      "range": {
        "value": 1,
        "type": "melee"
      },
      "properties": [
        {
          "name": "Ataque Físico",
          "description": "Ataque corporal direto (não considerado Ataque Desarmado)."
        },
        {
          "name": "Alcance Estendido",
          "description": "Pode gastar Ação Simples, Ação Rápida ou 1 PE para +3 metros de alcance."
        }
      ],
      "actions": [
        {
          "id": "golpe-brutal-base",
          "name": "Golpe Brutal",
          "description": "A criatura realiza um Ataque Físico contra um Alvo a até 1 metro. Causa 1d8 de Dano Físico por ponto de Poder (1d10 em Difícil/Extrema).",
          "cost": "",
          "type": {
            "actionType": "acaoAtiva",
            "category": "ataque_corpo_a_corpo",
            "tags": ["ataque_fisico"]
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
            "formula": "1d8",
            "type": "physical",
            "criticalBonus": "",
            "scaling": "1 dado por ponto de Poder"
          }
        },
        {
          "id": "golpe-brutal-alcance",
          "name": "Golpe Brutal (Alcance Estendido)",
          "description": "Ataque Físico com alcance aumentado para 4 metros ao custo de 1 PE, Ação Simples ou Ação Rápida. Causa 1d8 de Dano Físico por ponto de Poder (1d10 em Difícil/Extrema).",
          "cost": "1 PE / Ação Simples / Rápida",
          "type": {
            "actionType": "acaoAtiva",
            "category": "ataque_corpo_a_corpo",
            "tags": ["ataque_fisico", "alcance_estendido"]
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
            "formula": "1d8",
            "type": "physical",
            "criticalBonus": "",
            "scaling": "1 dado por ponto de Poder"
          }
        }
      ]
    }
  },
  {
    "_id": "eqarm_evocacao_mistica",
    "name": "Evocação Mística",
    "type": "weapon",
    "img": "systems/gaia-preludio/assets/evocacao-mistica.jpg",
    "itemKey": "evocacao_mistica",
    "system": {
      "name": "Evocação Mística",
      "description": "A criatura canaliza o Véu ao seu redor e realiza Ataque Mágico contra um Alvo a até 8 metros. Caso tenha sucesso, causará no Alvo 1d8 de Dano Mágico Neutro para cada ponto de Poder que possua (1d10 para Dificuldade Difícil ou Extrema).",
      "price": 0,
      "category": "Armamento Mágico",
      "unity": 0,
      "equipped": true,
      "quantity": 1,
      "weaponType": "ranged",
      "damageType": {
        "value": 1,
        "type": "neutro"
      },
      "attackParameter": {
        "value": 0,
        "attribute": "channeling"
      },
      "range": {
        "value": 8,
        "type": "ranged"
      },
      "properties": [
        {
          "name": "Ataque Mágico",
          "description": "Canalização mística do Véu."
        },
        {
          "name": "Conjuração",
          "description": "Custa 1 Ponto de Energia."
        }
      ],
      "actions": [
        {
          "id": "evocacao-mistica-base",
          "name": "Evocação Mística",
          "description": "A criatura canaliza o Véu ao seu redor e realiza Ataque Mágico contra um Alvo a até 8 metros. Causa 1d8 de Dano Mágico Neutro por ponto de Poder (1d10 em Difícil/Extrema).",
          "cost": "1 PE",
          "type": {
            "actionType": "acaoAtiva",
            "category": "ataque_magico",
            "tags": ["ataque_magico", "conjuracao"]
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
            "formula": "1d8",
            "type": "neutro",
            "criticalBonus": "",
            "scaling": "1 dado por ponto de Poder"
          }
        }
      ]
    }
  },
  {
    "_id": "eqarm00010000000",
    "name": "Adaga",
    "type": "weapon",
    "img": "modules/gaia-compendium-manager/assets/equipamentos/Adaga.png",
    "itemKey": "adaga",
    "folder": "fldar00010000000",
    "_key": "!items!eqarm00010000000",
    "system": {
      "name": "Adaga",
      "description": "Lâmina curta e ágil, ideal para estocadas rápidas e manobras furtivas. Pode ser facilmente ocultada e usada em conjunto com outra arma.",
      "price": 5,
      "category": "Armamento Leve",
      "unity": 2,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "weaponType": "light",
      "damageType": {
        "value": 2,
        "type": "physical"
      },
      "attackParameter": {
        "value": 0,
        "attribute": "dexterity"
      },
      "range": {
        "value": 1,
        "type": "melee"
      },
      "properties": [
        {
          "name": "Ambidestria",
          "description": "Esse Armamento não gera Inaptidão em testes de Precisão ou Canalização causados por Empunhadura Dupla, enquanto equipado com outro Armamento simultaneamente."
        },
        {
          "name": "Perfurar",
          "description": "A diferença para você causar um Acerto Crítico com esse Armamento é reduzida em 1."
        }
      ],
      "empunhadura": "Uma mão",
      "parametro": "Destreza",
      "alcance": "1 metro",
      "preco_compra_mp": 5,
      "preco_venda_mp": 8,
      "unidade": 2
    }
  },
  {
    "_id": "eqarm00020000000",
    "name": "Arco Longo",
    "type": "weapon",
    "img": "modules/gaia-compendium-manager/assets/equipamentos/Arco Longo.png",
    "itemKey": "arco_longo",
    "folder": "fldar00030000000",
    "_key": "!items!eqarm00020000000",
    "system": {
      "name": "Arco Longo",
      "description": "Arco recurvo de longo alcance. Dispara flechas a distâncias consideráveis com alta precisão e poder de penetração.",
      "price": 25,
      "category": "Armamento à Distância",
      "unity": 4,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "weaponType": "light",
      "damageType": {
        "value": 4,
        "type": "physical"
      },
      "attackParameter": {
        "value": 0,
        "attribute": "dexterity"
      },
      "range": {
        "value": 16,
        "type": "melee"
      },
      "properties": [
        {
          "name": "Perfurar",
          "description": "A diferença para você causar um Acerto Crítico com esse Armamento é reduzida em 1."
        },
        {
          "name": "Flechas",
          "description": "Esse Armamento utiliza Flechas como munição. Não é necessário recarregá-lo."
        }
      ],
      "empunhadura": "Duas mãos",
      "parametro": "Destreza",
      "alcance": "16 metros",
      "preco_compra_mp": 25,
      "preco_venda_mp": 20,
      "unidade": 4
    }
  },
  {
    "_id": "eqarm00030000000",
    "name": "Berloque de Energia",
    "type": "weapon",
    "img": "modules/gaia-compendium-manager/assets/equipamentos/Berloque de Energia.png",
    "itemKey": "berloque_de_energia",
    "folder": "fldar00040000000",
    "_key": "!items!eqarm00030000000",
    "system": {
      "name": "Berloque de Energia",
      "description": "Amuleto ou foco mágico compacto que canaliza as energias arcanas do portador para golpear o Véu e drenar a energia de seus oponentes.",
      "price": 12,
      "category": "Armamento Mágico",
      "unity": 2,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "weaponType": "light",
      "damageType": {
        "value": 2,
        "type": "physical"
      },
      "attackParameter": {
        "value": 0,
        "attribute": "brutality"
      },
      "range": {
        "value": 1,
        "type": "melee"
      },
      "properties": [
        {
          "name": "Ambidestria",
          "description": "Esse Armamento não gera Inaptidão em testes de Precisão ou Canalização causados por Empunhadura Dupla, enquanto equipado com outro Armamento simultaneamente."
        },
        {
          "name": "Rasga-Véu",
          "description": "Caso você tenha atingido um Alvo com esse Armamento, e o Resultado Natural deste ataque tenha sido 10, ou mais, você removerá 1 Ponto de Energia do Alvo."
        }
      ],
      "empunhadura": "Uma mão",
      "parametro": "Arcanismo",
      "alcance": "1 metro",
      "preco_compra_mp": 12,
      "preco_venda_mp": 8,
      "unidade": 2
    }
  },
  {
    "_id": "eqarm00040000000",
    "name": "Besta Grande",
    "type": "weapon",
    "img": "modules/gaia-compendium-manager/assets/equipamentos/Besta Grande.png",
    "itemKey": "besta_grande",
    "folder": "fldar00030000000",
    "_key": "!items!eqarm00040000000",
    "system": {
      "name": "Besta Grande",
      "description": "Besta pesada de grande potência montada com arco reforçado. Dispara virotes com imensa força de perfuração.",
      "price": 30,
      "category": "Armamento à Distância",
      "unity": 5,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "weaponType": "light",
      "damageType": {
        "value": 5,
        "type": "physical"
      },
      "attackParameter": {
        "value": 0,
        "attribute": "dexterity"
      },
      "range": {
        "value": 12,
        "type": "melee"
      },
      "properties": [
        {
          "name": "Traspassar",
          "description": "Caso você tenha atingido um Alvo com esse Armamento, e o Resultado Natural deste ataque tenha sido 10, ou mais, você aumentará o dano causado pelo Armamento em um valor igual ao Dano Base do Armamento."
        },
        {
          "name": "Virotes",
          "description": "Esse Armamento utiliza Virotes como munição. O mecanismo desse armamento é automatizado, simplificando o seu uso sem a necessidade de recarga."
        }
      ],
      "empunhadura": "Duas mãos",
      "parametro": "Destreza",
      "alcance": "12 metros",
      "preco_compra_mp": 30,
      "preco_venda_mp": 25,
      "unidade": 5
    }
  },
  {
    "_id": "eqarm00050000000",
    "name": "Besta Pequena",
    "type": "weapon",
    "img": "modules/gaia-compendium-manager/assets/equipamentos/Besta Pequena.png",
    "itemKey": "besta_pequena",
    "folder": "fldar00030000000",
    "_key": "!items!eqarm00050000000",
    "system": {
      "name": "Besta Pequena",
      "description": "Besta de mão leve e compacta. Permite disparos rápidos e uso com uma única mão, exigindo virotes e ação de recarga.",
      "price": 15,
      "category": "Armamento à Distância",
      "unity": 2,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "weaponType": "light",
      "damageType": {
        "value": 2,
        "type": "physical"
      },
      "attackParameter": {
        "value": 0,
        "attribute": "dexterity"
      },
      "range": {
        "value": 8,
        "type": "melee"
      },
      "properties": [
        {
          "name": "Ambidestria",
          "description": "Esse Armamento não gera Inaptidão em testes de Precisão ou Canalização causados por Empunhadura Dupla, enquanto equipado com outro Armamento simultaneamente."
        },
        {
          "name": "Virotes",
          "description": "Esse Armamento utiliza Virotes como munição. O mecanismo desse armamento é automatizado, simplificando o seu uso sem a necessidade de recarga."
        }
      ],
      "empunhadura": "Uma mão",
      "parametro": "Destreza",
      "alcance": "8 metros",
      "preco_compra_mp": 15,
      "preco_venda_mp": 10,
      "unidade": 2
    }
  },
  {
    "_id": "eqarm00060000000",
    "name": "Catalisador Místico",
    "type": "weapon",
    "img": "modules/gaia-compendium-manager/assets/equipamentos/Catalisador Místico.png",
    "itemKey": "catalisador_mistico",
    "folder": "fldar00040000000",
    "_key": "!items!eqarm00060000000",
    "system": {
      "name": "Catalisador Místico",
      "description": "Grandes cajados de madeira sintética ou natural infundidos com Tecnomagia e pequenos minérios que canalizam e condensam o Véu ao seu redor. Equipados com duas mãos.",
      "price": 30,
      "category": "Armamento Mágico",
      "unity": 4,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "weaponType": "light",
      "damageType": {
        "value": 4,
        "type": "physical"
      },
      "attackParameter": {
        "value": 0,
        "attribute": "brutality"
      },
      "range": {
        "value": 6,
        "type": "melee"
      },
      "properties": [
        {
          "name": "Abalo Místico",
          "description": "Caso você tenha atingido um Alvo com esse Armamento, e o Resultado Natural deste ataque tenha sido 10, ou mais, você aplicará Inaptidão no próximo teste de Parâmetro do Alvo."
        }
      ],
      "empunhadura": "Duas mãos",
      "parametro": "Arcanismo",
      "alcance": "6 metros",
      "preco_compra_mp": 30,
      "preco_venda_mp": 30,
      "unidade": 4
    }
  },
  {
    "_id": "eqarm00070000000",
    "name": "Espada Curta",
    "type": "weapon",
    "img": "modules/gaia-compendium-manager/assets/equipamentos/Espada Curta.png",
    "itemKey": "espada_curta",
    "folder": "fldar00010000000",
    "_key": "!items!eqarm00070000000",
    "system": {
      "name": "Espada Curta",
      "description": "Uma espada de corte e estocada de manejo rápido, equilibrada tanto para guerreiros brutais quanto para combatentes destros.",
      "price": 15,
      "category": "Armamento Leve",
      "unity": 3,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "weaponType": "light",
      "damageType": {
        "value": 3,
        "type": "physical"
      },
      "attackParameter": {
        "value": 0,
        "attribute": "dexterity"
      },
      "range": {
        "value": 1,
        "type": "melee"
      },
      "properties": [
        {
          "name": "Prioridade",
          "description": "Ataques Físicos realizados com esse Armamento possuem Prioridade em testes de Precisão."
        }
      ],
      "empunhadura": "Uma mão",
      "parametro": "Brutalidade / Destreza",
      "alcance": "1 metro",
      "preco_compra_mp": 15,
      "preco_venda_mp": 15,
      "unidade": 3
    }
  },
  {
    "_id": "eqarm00080000000",
    "name": "Espada Longa",
    "type": "weapon",
    "img": "modules/gaia-compendium-manager/assets/equipamentos/Espada Longa.png",
    "itemKey": "espada_longa",
    "folder": "fldar00020000000",
    "_key": "!items!eqarm00080000000",
    "system": {
      "name": "Espada Longa",
      "description": "Espada imponente e clássica de combate marcial, conferindo grande poder ofensivo e vantagem na velocidade dos golpes.",
      "price": 30,
      "category": "Armamento Pesado",
      "unity": 5,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "weaponType": "heavy",
      "damageType": {
        "value": 5,
        "type": "physical"
      },
      "attackParameter": {
        "value": 0,
        "attribute": "dexterity"
      },
      "range": {
        "value": 1,
        "type": "melee"
      },
      "properties": [
        {
          "name": "Prioridade",
          "description": "Ataques Físicos realizados com esse Armamento possuem Prioridade em testes de Precisão."
        }
      ],
      "empunhadura": "Uma mão ou duas mãos",
      "parametro": "Brutalidade / Destreza",
      "alcance": "1 metro",
      "preco_compra_mp": 30,
      "preco_venda_mp": 28,
      "unidade": 5
    }
  },
  {
    "_id": "eqarm00090000000",
    "name": "Lança",
    "type": "weapon",
    "img": "modules/gaia-compendium-manager/assets/equipamentos/Lança.png",
    "itemKey": "lanca",
    "folder": "fldar00020000000",
    "_key": "!items!eqarm00090000000",
    "system": {
      "name": "Lança",
      "description": "Arma de haste longa com ponta afiada, capaz de atingir inimigos a distâncias maiores (4 metros) e ser utilizada com uma ou duas mãos.",
      "price": 20,
      "category": "Armamento Pesado",
      "unity": 4,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "weaponType": "heavy",
      "damageType": {
        "value": 4,
        "type": "physical"
      },
      "attackParameter": {
        "value": 0,
        "attribute": "dexterity"
      },
      "range": {
        "value": 4,
        "type": "melee"
      },
      "properties": [
        {
          "name": "Extensão",
          "description": "O alcance de Ataques Físicos e Arremessos realizados com esse Armamento é aumentado em 2 metros."
        },
        {
          "name": "Versatilidade",
          "description": "Você pode utilizar esse Armamento tanto com uma quanto com duas mãos. Enquanto estiver empunhado em uma única mão, esse Armamento possui seu Dano Base reduzido em 1. O Armamento ainda é considerado um Armamento Pesado, mesmo quando for utilizado em uma mão."
        }
      ],
      "empunhadura": "Uma mão ou duas mãos (Versátil)",
      "parametro": "Brutalidade / Destreza",
      "alcance": "4 metros",
      "preco_compra_mp": 20,
      "preco_venda_mp": 22,
      "unidade": 4
    }
  },
  {
    "_id": "eqarm000a0000000",
    "name": "Maça",
    "type": "weapon",
    "img": "modules/gaia-compendium-manager/assets/equipamentos/Maça.png",
    "itemKey": "maca",
    "folder": "fldar00010000000",
    "_key": "!items!eqarm000a0000000",
    "system": {
      "name": "Maça",
      "description": "Armamento com maior concentração de seu peso na ponta da haste, oferecendo alto impacto contra armaduras e ossos.",
      "price": 10,
      "category": "Armamento Leve",
      "unity": 2,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "weaponType": "light",
      "damageType": {
        "value": 2,
        "type": "physical"
      },
      "attackParameter": {
        "value": 0,
        "attribute": "brutality"
      },
      "range": {
        "value": 1,
        "type": "melee"
      },
      "properties": [
        {
          "name": "Impacto",
          "description": "Caso você tenha atingido um Alvo com esse Armamento, e o Resultado Natural deste ataque tenha sido 10, ou mais, você aplicará Lentidão no Alvo."
        }
      ],
      "empunhadura": "Uma mão",
      "parametro": "Brutalidade",
      "alcance": "1 metro",
      "preco_compra_mp": 10,
      "preco_venda_mp": 10,
      "unidade": 2
    }
  },
  {
    "_id": "eqarm000b0000000",
    "name": "Machado Leve",
    "type": "weapon",
    "img": "modules/gaia-compendium-manager/assets/equipamentos/Machado Leve.png",
    "itemKey": "machado_leve",
    "folder": "fldar00010000000",
    "_key": "!items!eqarm000b0000000",
    "system": {
      "name": "Machado Leve",
      "description": "Machadinha balanceada de lâmina afiada, capaz de provocar ferimentos sangrentos e cortes profundos.",
      "price": 10,
      "category": "Armamento Leve",
      "unity": 3,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "weaponType": "light",
      "damageType": {
        "value": 3,
        "type": "physical"
      },
      "attackParameter": {
        "value": 0,
        "attribute": "brutality"
      },
      "range": {
        "value": 1,
        "type": "melee"
      },
      "properties": [
        {
          "name": "Afiado",
          "description": "Caso você tenha atingido um Alvo com esse Armamento, e o Resultado Natural deste ataque tenha sido 10, ou mais, você aplicará Sangramento no Alvo por 1 hora."
        }
      ],
      "empunhadura": "Uma mão",
      "parametro": "Brutalidade",
      "alcance": "1 metro",
      "preco_compra_mp": 10,
      "preco_venda_mp": 10,
      "unidade": 3
    }
  },
  {
    "_id": "eqarm000c0000000",
    "name": "Machado Pesado",
    "type": "weapon",
    "img": "modules/gaia-compendium-manager/assets/equipamentos/Machado Pesado.png",
    "itemKey": "machado_pesado",
    "folder": "fldar00020000000",
    "_key": "!items!eqarm000c0000000",
    "system": {
      "name": "Machado Pesado",
      "description": "Machado de grande porte com lâmina pesada, desenvolvido para desferir golpes devastadores capazes de transpassar múltiplos inimigos.",
      "price": 25,
      "category": "Armamento Pesado",
      "unity": 5,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "weaponType": "heavy",
      "damageType": {
        "value": 5,
        "type": "physical"
      },
      "attackParameter": {
        "value": 0,
        "attribute": "brutality"
      },
      "range": {
        "value": 1,
        "type": "melee"
      },
      "properties": [
        {
          "name": "Traspassar",
          "description": "Caso você tenha atingido um Alvo com esse Armamento, e o Resultado Natural deste ataque tenha sido 10, ou mais, você aumentará o dano causado pelo Armamento em um valor igual ao Dano Base do Armamento."
        }
      ],
      "empunhadura": "Duas mãos",
      "parametro": "Brutalidade",
      "alcance": "1 metro",
      "preco_compra_mp": 25,
      "preco_venda_mp": 18,
      "unidade": 5
    }
  },
  {
    "_id": "eqarm000d0000000",
    "name": "Martelo de Guerra",
    "type": "weapon",
    "img": "modules/gaia-compendium-manager/assets/equipamentos/Martelo de Guerra.png",
    "itemKey": "martelo_de_guerra",
    "folder": "fldar00020000000",
    "_key": "!items!eqarm000d0000000",
    "system": {
      "name": "Martelo de Guerra",
      "description": "Martelo maciço forjado para quebrar defesas e causar fraturas graves com a força bruta de seus impactos.",
      "price": 25,
      "category": "Armamento Pesado",
      "unity": 4,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "weaponType": "heavy",
      "damageType": {
        "value": 4,
        "type": "physical"
      },
      "attackParameter": {
        "value": 0,
        "attribute": "brutality"
      },
      "range": {
        "value": 1,
        "type": "melee"
      },
      "properties": [
        {
          "name": "Contundente",
          "description": "Caso você tenha atingido um Alvo com esse Armamento, e o Resultado Natural deste ataque tenha sido 10, ou mais, você aplicará neste Alvo 1 ponto de Fratura."
        }
      ],
      "empunhadura": "Duas mãos",
      "parametro": "Brutalidade",
      "alcance": "1 metro",
      "preco_compra_mp": 25,
      "preco_venda_mp": 18,
      "unidade": 4
    }
  },
  {
    "_id": "eqarm000e0000000",
    "name": "Mosquete",
    "type": "weapon",
    "img": "icons/weapons/guns/rifle-musket-flintlock.svg",
    "itemKey": "mosquete",
    "folder": "fldar00030000000",
    "_key": "!items!eqarm000e0000000",
    "system": {
      "name": "Mosquete",
      "description": "Arma de fogo longa de cano longo alimentada por pólvora e munições. Causa o maior dano à distância do sistema a alcances longos (20 metros).",
      "price": 50,
      "category": "Armamento à Distância",
      "unity": 6,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "weaponType": "light",
      "damageType": {
        "value": 6,
        "type": "physical"
      },
      "attackParameter": {
        "value": 0,
        "attribute": "dexterity"
      },
      "range": {
        "value": 20,
        "type": "melee"
      },
      "properties": [
        {
          "name": "Tambor",
          "description": "Esse Armamento possui um armazenamento que acopla até 2 Munições. Cada Ataque Físico realizado por esse Armamento consome uma Munição. Você deverá utilizar uma Ação Simples para recarregar um Tambor com Munições."
        }
      ],
      "empunhadura": "Duas mãos",
      "parametro": "Destreza",
      "alcance": "20 metros",
      "preco_compra_mp": 50,
      "preco_venda_mp": 25,
      "unidade": 6
    }
  },
  {
    "_id": "eqarm000f0000000",
    "name": "Revólver",
    "type": "weapon",
    "img": "icons/weapons/guns/gun-flintlock-pistol.svg",
    "itemKey": "revolver",
    "folder": "fldar00030000000",
    "_key": "!items!eqarm000f0000000",
    "system": {
      "name": "Revólver",
      "description": "Armamentos de fogo portáteis que utilizam pólvora para disparar projéteis com maior potência do que alternativas semelhantes. Equipados com uma única mão. Utiliza Munições.",
      "price": 30,
      "category": "Armamento à Distância",
      "unity": 3,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "weaponType": "light",
      "damageType": {
        "value": 3,
        "type": "physical"
      },
      "attackParameter": {
        "value": 0,
        "attribute": "dexterity"
      },
      "range": {
        "value": 10,
        "type": "melee"
      },
      "properties": [
        {
          "name": "Tambor",
          "description": "Esse Armamento possui um armazenamento que acopla até 2 Munições. Cada Ataque Físico realizado por esse Armamento consome uma Munição. Você deverá utilizar uma Ação Simples para recarregar um Tambor com Munições."
        }
      ],
      "empunhadura": "Uma mão",
      "parametro": "Destreza",
      "alcance": "10 metros",
      "preco_compra_mp": 30,
      "preco_venda_mp": 10,
      "unidade": 3
    }
  }
];

export const PROTECOES_FOLDERS_DATA = [
  {
    "_id": "fldpr00010000000",
    "name": "Armaduras",
    "type": "Item",
    "sorting": "a",
    "color": "#1e293b",
    "_key": "!folders!fldpr00010000000"
  },
  {
    "_id": "fldpr00020000000",
    "name": "Escudos",
    "type": "Item",
    "sorting": "a",
    "color": "#1e293b",
    "_key": "!folders!fldpr00020000000"
  }
];

export const PROTECOES_DATA = [
  {
    "_id": "eqprt00010000000",
    "name": "Armadura Leve",
    "type": "armor",
    "img": "icons/equipment/chest/breastplate-cuirass-steel.svg",
    "itemKey": "armadura_leve",
    "folder": "fldpr00010000000",
    "_key": "!items!eqprt00010000000",
    "system": {
      "name": "Armadura Leve",
      "description": "Vestes protetoras que oferecem defesa sem sacrificar mobilidade, frequentemente feitas de camadas de tecidos reforçados ou couro flexível. Concede Bloqueio 1 sem penalidades.",
      "price": 18,
      "category": "Armadura",
      "unity": 1,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "block": 1,
      "armorType": "light",
      "requirement": {
        "type": "vigor",
        "value": 1
      },
      "bloqueio": 1,
      "requisito": "Vigor: 1",
      "inaptidao": [],
      "tempo_equipar": "1 minuto",
      "preco_compra_mp": 18,
      "preco_venda_mp": 10,
      "unidade": 1
    }
  },
  {
    "_id": "eqprt00020000000",
    "name": "Armadura Média",
    "type": "armor",
    "img": "icons/equipment/chest/breastplate-cuirass-steel.svg",
    "itemKey": "armadura_media",
    "folder": "fldpr00010000000",
    "_key": "!items!eqprt00020000000",
    "system": {
      "name": "Armadura Média",
      "description": "Proteção corporal mais robusta que armaduras leves, mas limita certos movimentos. Sua confecção geralmente é de couro tratado ou lâminas articuladas. Concede Bloqueio 2, mas aplica Inaptidão em Canalização e Destreza.",
      "price": 36,
      "category": "Armadura",
      "unity": 2,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "block": 2,
      "armorType": "medium",
      "requirement": {
        "type": "vigor",
        "value": 2
      },
      "bloqueio": 2,
      "requisito": "Vigor: 2",
      "inaptidao": [
        "Canalização",
        "Destreza"
      ],
      "tempo_equipar": "5 minutos",
      "preco_compra_mp": 36,
      "preco_venda_mp": 15,
      "unidade": 2
    }
  },
  {
    "_id": "eqprt00030000000",
    "name": "Armadura Pesada",
    "type": "armor",
    "img": "icons/equipment/chest/breastplate-cuirass-steel.svg",
    "itemKey": "armadura_pesada",
    "folder": "fldpr00010000000",
    "_key": "!items!eqprt00030000000",
    "system": {
      "name": "Armadura Pesada",
      "description": "Armaduras de placas inteiriças de aço/metal fundido de grande eficácia defensiva, porém exigentes. Concede Bloqueio 3, mas impõe Inaptidão em Agilidade, Canalização, Destreza e Furtividade.",
      "price": 72,
      "category": "Armadura",
      "unity": 3,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "block": 3,
      "armorType": "heavy",
      "requirement": {
        "type": "vigor",
        "value": 3
      },
      "bloqueio": 3,
      "requisito": "Vigor: 3",
      "inaptidao": [
        "Agilidade",
        "Canalização",
        "Destreza",
        "Furtividade"
      ],
      "tempo_equipar": "15 minutos",
      "preco_compra_mp": 72,
      "preco_venda_mp": 20,
      "unidade": 3
    }
  },
  {
    "_id": "eqprt00040000000",
    "name": "Escudo",
    "type": "armor",
    "img": "modules/gaia-compendium-manager/assets/equipamentos/Escudo.png",
    "itemKey": "escudo",
    "folder": "fldpr00020000000",
    "_key": "!items!eqprt00040000000",
    "system": {
      "name": "Escudo",
      "description": "Empunhado em uma das mãos. Concede +1 em testes de Bloqueio. Aplica Inaptidão em testes de Canalização enquanto empunhado.",
      "price": 15,
      "category": "Escudo",
      "unity": 1,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "block": 1,
      "armorType": "shield",
      "requirement": {
        "type": "vigor",
        "value": 0
      },
      "bloqueio": 1,
      "requisito": "Sem Requisito de Vigor",
      "inaptidao": [
        "Canalização"
      ],
      "tempo_equipar": "1 Ação Simples",
      "preco_compra_mp": 15,
      "preco_venda_mp": 15,
      "unidade": 1
    }
  }
];

export const ITENS_FOLDERS_DATA = [
  {
    "_id": "fldit00010000000",
    "name": "Poções e Elixires",
    "type": "Item",
    "sorting": "a",
    "color": "#064e3b",
    "_key": "!folders!fldit00010000000"
  },
  {
    "_id": "fldit00020000000",
    "name": "Toxinas e Antídotos",
    "type": "Item",
    "sorting": "a",
    "color": "#064e3b",
    "_key": "!folders!fldit00020000000"
  },
  {
    "_id": "fldit00030000000",
    "name": "Alimentos e Provisões",
    "type": "Item",
    "sorting": "a",
    "color": "#064e3b",
    "_key": "!folders!fldit00030000000"
  },
  {
    "_id": "fldit00040000000",
    "name": "Vestuário e Roupas",
    "type": "Item",
    "sorting": "a",
    "color": "#064e3b",
    "_key": "!folders!fldit00040000000"
  },
  {
    "_id": "fldit00050000000",
    "name": "Bolsas e Recipientes",
    "type": "Item",
    "sorting": "a",
    "color": "#064e3b",
    "_key": "!folders!fldit00050000000"
  },
  {
    "_id": "fldit00060000000",
    "name": "Equipamentos de Viagem e Ferramentas",
    "type": "Item",
    "sorting": "a",
    "color": "#064e3b",
    "_key": "!folders!fldit00060000000"
  },
  {
    "_id": "fldit00070000000",
    "name": "Matérias-Primas e Alquimia",
    "type": "Item",
    "sorting": "a",
    "color": "#064e3b",
    "_key": "!folders!fldit00070000000"
  },
  {
    "_id": "fldit00080000000",
    "name": "Outros Itens",
    "type": "Item",
    "sorting": "a",
    "color": "#064e3b",
    "_key": "!folders!fldit00080000000"
  }
];

export const ITENS_DATA = [
  {
    "_id": "eqitm00010000000",
    "name": "Alarme",
    "type": "equipment",
    "img": "icons/commodities/treasure/token-gold-gem.svg",
    "itemKey": "alarme",
    "folder": "fldit00080000000",
    "_key": "!items!eqitm00010000000",
    "system": {
      "name": "Alarme",
      "description": "Uma confecção de barbante e pequenos sinos que pode ser instalada em um local para alertar de presenças indesejadas. Reutilizável.",
      "price": 10,
      "category": "Item Utilizável",
      "unity": 5,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 10,
      "preco_venda_mp": 5,
      "unidade": 5
    }
  },
  {
    "_id": "eqitm00020000000",
    "name": "Algibeira",
    "type": "equipment",
    "img": "icons/equipment/backpack/backpack-leather-camo.svg",
    "itemKey": "algibeira",
    "folder": "fldit00050000000",
    "_key": "!items!eqitm00020000000",
    "system": {
      "name": "Algibeira",
      "description": "Bolsa discreta para guardar objetos de pequeno porte como joias e moedas. O uso deste item faz com que moedas não ocupem Unidade.",
      "price": 2,
      "category": "Itens Mundanos",
      "unity": 2,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 2,
      "preco_venda_mp": 2,
      "unidade": 2
    }
  },
  {
    "_id": "eqitm00030000000",
    "name": "Aljava de Flechas",
    "type": "equipment",
    "img": "icons/equipment/backpack/backpack-leather-camo.svg",
    "itemKey": "aljava_de_flechas",
    "folder": "fldit00050000000",
    "_key": "!items!eqitm00030000000",
    "system": {
      "name": "Aljava de Flechas",
      "description": "Suporte para guardar até 40 Flechas. Flechas armazenadas neste item não ocupam Unidade.",
      "price": 7,
      "category": "Itens Mundanos",
      "unity": 12,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 7,
      "preco_venda_mp": 12,
      "unidade": 12
    }
  },
  {
    "_id": "eqitm00040000000",
    "name": "Aljava de Virotes",
    "type": "equipment",
    "img": "icons/equipment/backpack/backpack-leather-camo.svg",
    "itemKey": "aljava_de_virotes",
    "folder": "fldit00050000000",
    "_key": "!items!eqitm00040000000",
    "system": {
      "name": "Aljava de Virotes",
      "description": "Suporte para guardar até 40 Virotes. Virotes armazenados neste item não ocupam Unidade.",
      "price": 6,
      "category": "Itens Mundanos",
      "unity": 8,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 6,
      "preco_venda_mp": 8,
      "unidade": 8
    }
  },
  {
    "_id": "eqitm00050000000",
    "name": "Ampulheta",
    "type": "equipment",
    "img": "icons/commodities/treasure/token-gold-gem.svg",
    "itemKey": "ampulheta",
    "folder": "fldit00060000000",
    "_key": "!items!eqitm00050000000",
    "system": {
      "name": "Ampulheta",
      "description": "Dispositivo tradicional para medir a passagem do tempo com precisão razoável.",
      "price": 5,
      "category": "Itens Mundanos",
      "unity": 3,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 5,
      "preco_venda_mp": 3,
      "unidade": 3
    }
  },
  {
    "_id": "eqitm00060000000",
    "name": "Antídoto Místico",
    "type": "equipment",
    "img": "icons/consumables/potions/bottle-bulb-corked-poison-green.svg",
    "itemKey": "antidoto_mistico",
    "folder": "fldit00020000000",
    "_key": "!items!eqitm00060000000",
    "system": {
      "name": "Antídoto Místico",
      "description": "Ao beber, remove simultaneamente a condição Envenenado (ou efeito de toxina) e uma Condição Mágica.",
      "price": 30,
      "category": "Antídoto",
      "unity": 10,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "Antídoto",
      "preco_compra_mp": 30,
      "preco_venda_mp": 18,
      "unidade": 10
    }
  },
  {
    "_id": "eqitm00070000000",
    "name": "Armadilha de Caça",
    "type": "equipment",
    "img": "icons/commodities/treasure/token-gold-gem.svg",
    "itemKey": "armadilha_de_caca",
    "folder": "fldit00060000000",
    "_key": "!items!eqitm00070000000",
    "system": {
      "name": "Armadilha de Caça",
      "description": "Mecanismo para a captura de animais. Leva 1 minuto para ser armado e seu ponto de ativação ocupa 1 metro de largura e comprimento. Ao pisar, o alvo fica Imóvel até se libertar com teste de Parâmetro (definido pelo Narrador).",
      "price": 14,
      "category": "Itens Mundanos",
      "unity": 15,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 14,
      "preco_venda_mp": 15,
      "unidade": 15
    }
  },
  {
    "_id": "eqitm00080000000",
    "name": "Bainha / Coldre",
    "type": "equipment",
    "img": "icons/equipment/backpack/backpack-leather-camo.svg",
    "itemKey": "bainha_coldre",
    "folder": "fldit00050000000",
    "_key": "!items!eqitm00080000000",
    "system": {
      "name": "Bainha / Coldre",
      "description": "Compartimento portátil para transportar armamentos. Um Armamento armazenado em uma Bainha ou Coldre não ocupa Unidade.",
      "price": 4,
      "category": "Itens Mundanos",
      "unity": 6,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 4,
      "preco_venda_mp": 6,
      "unidade": 6
    }
  },
  {
    "_id": "eqitm00090000000",
    "name": "Balde",
    "type": "equipment",
    "img": "icons/commodities/treasure/token-gold-gem.svg",
    "itemKey": "balde",
    "folder": "fldit00060000000",
    "_key": "!items!eqitm00090000000",
    "system": {
      "name": "Balde",
      "description": "Recipiente aberto que comporta até 10 litros de líquidos.",
      "price": 2,
      "category": "Itens Mundanos",
      "unity": 11,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 2,
      "preco_venda_mp": 11,
      "unidade": 11
    }
  },
  {
    "_id": "eqitm000a0000000",
    "name": "Bola de Fogo Engarrafada",
    "type": "equipment",
    "img": "icons/commodities/treasure/token-gold-gem.svg",
    "itemKey": "bola_de_fogo_engarrafada",
    "folder": "fldit00080000000",
    "_key": "!items!eqitm000a0000000",
    "system": {
      "name": "Bola de Fogo Engarrafada",
      "description": "Ao quebrar o frasco, uma bola ígnea surge na mão do usuário. Requer teste de Canalização para atingir o alvo: causa 2d8 de Dano Mágico de Fogo, aumentando em +1d8 por ponto de Arcanismo.",
      "price": 20,
      "category": "Item Utilizável / Consumível",
      "unity": 2,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 20,
      "preco_venda_mp": 15,
      "unidade": 2
    }
  },
  {
    "_id": "eqitm000b0000000",
    "name": "Bolsa",
    "type": "equipment",
    "img": "icons/equipment/backpack/backpack-leather-camo.svg",
    "itemKey": "bolsa",
    "folder": "fldit00050000000",
    "_key": "!items!eqitm000b0000000",
    "system": {
      "name": "Bolsa",
      "description": "Recipiente portátil para itens. Os valores de Unidade só se aplicam caso você esteja carregando na mão. Enquanto equipada no corpo, aumenta em +20 seus pontos de Unidade máxima (não acumula com outras Bolsas).",
      "price": 8,
      "category": "Itens Mundanos",
      "unity": 14,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 8,
      "preco_venda_mp": 14,
      "unidade": 14
    }
  },
  {
    "_id": "eqitm000c0000000",
    "name": "Bolsa de Munições",
    "type": "equipment",
    "img": "icons/equipment/backpack/backpack-leather-camo.svg",
    "itemKey": "bolsa_de_municoes",
    "folder": "fldit00050000000",
    "_key": "!items!eqitm000c0000000",
    "system": {
      "name": "Bolsa de Munições",
      "description": "Suporte para guardar até 40 Munições. Munições armazenadas neste item não ocupam Unidade.",
      "price": 4,
      "category": "Itens Mundanos",
      "unity": 5,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 4,
      "preco_venda_mp": 5,
      "unidade": 5
    }
  },
  {
    "_id": "eqitm000d0000000",
    "name": "Botas / Sandálias / Sapatos",
    "type": "equipment",
    "img": "icons/equipment/chest/shirt-tunic-plain-brown.svg",
    "itemKey": "botas_sapatos",
    "folder": "fldit00040000000",
    "_key": "!items!eqitm000d0000000",
    "system": {
      "name": "Botas / Sandálias / Sapatos",
      "description": "Calçados de couro, pano ou madeira para uso diário. Não ocupam espaço de Unidade enquanto vestidos.",
      "price": 2,
      "category": "Vestuário",
      "unity": 1,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 2,
      "preco_venda_mp": 1,
      "unidade": 1
    }
  },
  {
    "_id": "eqitm000e0000000",
    "name": "Bússola",
    "type": "equipment",
    "img": "icons/commodities/treasure/token-gold-gem.svg",
    "itemKey": "bussola",
    "folder": "fldit00060000000",
    "_key": "!items!eqitm000e0000000",
    "system": {
      "name": "Bússola",
      "description": "Pequeno dispositivo que sempre aponta a direção do norte magnético de Auroria.",
      "price": 8,
      "category": "Itens Mundanos",
      "unity": 4,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 8,
      "preco_venda_mp": 4,
      "unidade": 4
    }
  },
  {
    "_id": "eqitm000f0000000",
    "name": "Caixa de Fogo",
    "type": "equipment",
    "img": "icons/commodities/treasure/token-gold-gem.svg",
    "itemKey": "caixa_de_fogo",
    "folder": "fldit00060000000",
    "_key": "!items!eqitm000f0000000",
    "system": {
      "name": "Caixa de Fogo",
      "description": "Facilita a geração de fogo, eliminando a necessidade de testes para acender fogueiras, tochas e outras fontes semelhantes.",
      "price": 3,
      "category": "Itens Mundanos",
      "unity": 4,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 3,
      "preco_venda_mp": 4,
      "unidade": 4
    }
  },
  {
    "_id": "eqitm00100000000",
    "name": "Calças / Saias",
    "type": "equipment",
    "img": "icons/equipment/chest/shirt-tunic-plain-brown.svg",
    "itemKey": "calcas_saias",
    "folder": "fldit00040000000",
    "_key": "!items!eqitm00100000000",
    "system": {
      "name": "Calças / Saias",
      "description": "Peças inferiores de vestuário individual confeccionadas em tecidos comuns. Unidade 0 enquanto vestidas.",
      "price": 2,
      "category": "Vestuário",
      "unity": 1,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 2,
      "preco_venda_mp": 1,
      "unidade": 1
    }
  },
  {
    "_id": "eqitm00110000000",
    "name": "Camisas / Coletes",
    "type": "equipment",
    "img": "icons/equipment/chest/shirt-tunic-plain-brown.svg",
    "itemKey": "camisas_coletes",
    "folder": "fldit00040000000",
    "_key": "!items!eqitm00110000000",
    "system": {
      "name": "Camisas / Coletes",
      "description": "Peças superiores de vestuário leve. Unidade 0 enquanto vestidas.",
      "price": 2,
      "category": "Vestuário",
      "unity": 1,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 2,
      "preco_venda_mp": 1,
      "unidade": 1
    }
  },
  {
    "_id": "eqitm00120000000",
    "name": "Cantil",
    "type": "equipment",
    "img": "icons/commodities/treasure/token-gold-gem.svg",
    "itemKey": "cantil",
    "folder": "fldit00060000000",
    "_key": "!items!eqitm00120000000",
    "system": {
      "name": "Cantil",
      "description": "Recipiente resistente que comporta até 3 litros de um líquido qualquer.",
      "price": 6,
      "category": "Itens Mundanos",
      "unity": 7,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 6,
      "preco_venda_mp": 7,
      "unidade": 7
    }
  },
  {
    "_id": "eqitm00130000000",
    "name": "Carne",
    "type": "equipment",
    "img": "icons/consumables/food/meat-steak-raw-brown.svg",
    "itemKey": "carne",
    "folder": "fldit00030000000",
    "_key": "!items!eqitm00130000000",
    "system": {
      "name": "Carne",
      "description": "Alimento derivado de aves, caças, peixes e animais domésticos.",
      "price": 2,
      "category": "Ingrediente",
      "unity": 2,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 2,
      "preco_venda_mp": 1,
      "unidade": 2
    }
  },
  {
    "_id": "eqitm00140000000",
    "name": "Cereais",
    "type": "equipment",
    "img": "icons/consumables/food/meat-steak-raw-brown.svg",
    "itemKey": "cereais",
    "folder": "fldit00030000000",
    "_key": "!items!eqitm00140000000",
    "system": {
      "name": "Cereais",
      "description": "Culturas agrícolas comestíveis colhidas para alimentação ou fermentação.",
      "price": 2,
      "category": "Ingrediente",
      "unity": 2,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 2,
      "preco_venda_mp": 1,
      "unidade": 2
    }
  },
  {
    "_id": "eqitm00150000000",
    "name": "Conjunto de Desarme",
    "type": "equipment",
    "img": "icons/commodities/treasure/token-gold-gem.svg",
    "itemKey": "conjunto_de_desarme",
    "folder": "fldit00060000000",
    "_key": "!items!eqitm00150000000",
    "system": {
      "name": "Conjunto de Desarme",
      "description": "Uma série de ferramentas que adicionam +2 em testes de Tecnologia para desativar armadilhas e sabotar trancas. Reutilizável.",
      "price": 10,
      "category": "Item Utilizável",
      "unity": 10,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 10,
      "preco_venda_mp": 10,
      "unidade": 10
    }
  },
  {
    "_id": "eqitm00160000000",
    "name": "Conjunto de Jogos",
    "type": "equipment",
    "img": "icons/commodities/treasure/token-gold-gem.svg",
    "itemKey": "conjunto_de_jogos",
    "folder": "fldit00060000000",
    "_key": "!items!eqitm00160000000",
    "system": {
      "name": "Conjunto de Jogos",
      "description": "Conjunto de baralhos, tabuleiro, dados ou outras peças de jogos para entretenimento durante viagens e descansos.",
      "price": 10,
      "category": "Itens Mundanos",
      "unity": 9,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 10,
      "preco_venda_mp": 9,
      "unidade": 9
    }
  },
  {
    "_id": "eqitm00170000000",
    "name": "Conjunto de Roupas Completo",
    "type": "equipment",
    "img": "icons/equipment/chest/shirt-tunic-plain-brown.svg",
    "itemKey": "conjunto_de_roupas",
    "folder": "fldit00040000000",
    "_key": "!items!eqitm00170000000",
    "system": {
      "name": "Conjunto de Roupas Completo",
      "description": "Indumentária civil completa (peça superior, inferior, calçado e cinto) em tecidos regulares.",
      "price": 5,
      "category": "Vestuário",
      "unity": 1,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 5,
      "preco_venda_mp": 2,
      "unidade": 1
    }
  },
  {
    "_id": "eqitm00180000000",
    "name": "Corda de Cânhamo (6 Metros)",
    "type": "equipment",
    "img": "icons/tools/crafting/rope-coiled-grey.svg",
    "itemKey": "corda_de_canhamo_6m",
    "folder": "fldit00060000000",
    "_key": "!items!eqitm00180000000",
    "system": {
      "name": "Corda de Cânhamo (6 Metros)",
      "description": "Uma corda de fibra trançada de 6 metros. É necessário um teste de Brutalidade Dif. 10 para ser arrebentada.",
      "price": 12,
      "category": "Itens Mundanos",
      "unity": 11,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 12,
      "preco_venda_mp": 11,
      "unidade": 11
    }
  },
  {
    "_id": "eqitm00190000000",
    "name": "Corrente (6 Metros)",
    "type": "equipment",
    "img": "icons/tools/crafting/rope-coiled-grey.svg",
    "itemKey": "corrente_6m",
    "folder": "fldit00060000000",
    "_key": "!items!eqitm00190000000",
    "system": {
      "name": "Corrente (6 Metros)",
      "description": "Feita de elos de metal forjado de 6 metros, mais resistente do que corda plana. É necessário um teste de Brutalidade Dif. 12 para ser arrebentada.",
      "price": 18,
      "category": "Itens Mundanos",
      "unity": 16,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 18,
      "preco_venda_mp": 16,
      "unidade": 16
    }
  },
  {
    "_id": "eqitm001a0000000",
    "name": "Couro",
    "type": "equipment",
    "img": "icons/commodities/metal/ingot-iron.svg",
    "itemKey": "couro",
    "folder": "fldit00070000000",
    "_key": "!items!eqitm001a0000000",
    "system": {
      "name": "Couro",
      "description": "Pelegos, peles tratadas e escamas da fauna de Auroria para confecção de armaduras e recipientes.",
      "price": 2,
      "category": "Ingrediente",
      "unity": 6,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 2,
      "preco_venda_mp": 1,
      "unidade": 6
    }
  },
  {
    "_id": "eqitm001b0000000",
    "name": "Desespero Engarrafado",
    "type": "equipment",
    "img": "icons/commodities/treasure/token-gold-gem.svg",
    "itemKey": "desespero_engarrafado",
    "folder": "fldit00080000000",
    "_key": "!items!eqitm001b0000000",
    "system": {
      "name": "Desespero Engarrafado",
      "description": "Ao quebrar sobre um alvo, induz torpor e melancolia profunda. O alvo fica perturbado e evita atacar o personagem que arremessou o frasco.",
      "price": 30,
      "category": "Item Utilizável / Consumível",
      "unity": 2,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 30,
      "preco_venda_mp": 20,
      "unidade": 2
    }
  },
  {
    "_id": "eqitm001c0000000",
    "name": "Elixir da Vida e Energia",
    "type": "equipment",
    "img": "icons/consumables/potions/potion-tube-corked-red.svg",
    "itemKey": "elixir_da_vida_e_energia",
    "folder": "fldit00010000000",
    "_key": "!items!eqitm001c0000000",
    "system": {
      "name": "Elixir da Vida e Energia",
      "description": "Regenera Vigor + 2d4 Pontos de Vida e recupera 1d4 Pontos de Energia.",
      "price": 30,
      "category": "Elixir",
      "unity": 10,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "Elixir",
      "preco_compra_mp": 30,
      "preco_venda_mp": 18,
      "unidade": 10
    }
  },
  {
    "_id": "eqitm001d0000000",
    "name": "Elixir da Vitalidade Pura",
    "type": "equipment",
    "img": "icons/consumables/potions/potion-tube-corked-red.svg",
    "itemKey": "elixir_da_vitalidade_pura",
    "folder": "fldit00010000000",
    "_key": "!items!eqitm001d0000000",
    "system": {
      "name": "Elixir da Vitalidade Pura",
      "description": "Regenera Vigor + 2d4 Pontos de Vida e recupera 2d6 Pontos de Energia.",
      "price": 35,
      "category": "Elixir",
      "unity": 10,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "Elixir",
      "preco_compra_mp": 35,
      "preco_venda_mp": 20,
      "unidade": 10
    }
  },
  {
    "_id": "eqitm001e0000000",
    "name": "Elixir de Purificação Completa",
    "type": "equipment",
    "img": "icons/consumables/potions/potion-tube-corked-red.svg",
    "itemKey": "elixir_de_purificacao_completa",
    "folder": "fldit00010000000",
    "_key": "!items!eqitm001e0000000",
    "system": {
      "name": "Elixir de Purificação Completa",
      "description": "Purifica o organismo, removendo Envenenado e efeitos de toxinas, e anulando o próximo envenenamento nas próximas 24 horas.",
      "price": 55,
      "category": "Elixir",
      "unity": 10,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "Elixir",
      "preco_compra_mp": 55,
      "preco_venda_mp": 30,
      "unidade": 10
    }
  },
  {
    "_id": "eqitm001f0000000",
    "name": "Elixir de Revigoramento Arcano",
    "type": "equipment",
    "img": "icons/consumables/potions/potion-tube-corked-red.svg",
    "itemKey": "elixir_de_revigoramento_arcano",
    "folder": "fldit00010000000",
    "_key": "!items!eqitm001f0000000",
    "system": {
      "name": "Elixir de Revigoramento Arcano",
      "description": "Remove todas as Condições Mágicas e regenera 1d4 Pontos de Energia.",
      "price": 30,
      "category": "Elixir",
      "unity": 10,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "Elixir",
      "preco_compra_mp": 30,
      "preco_venda_mp": 18,
      "unidade": 10
    }
  },
  {
    "_id": "eqitm00200000000",
    "name": "Equipamento de Pescaria",
    "type": "equipment",
    "img": "icons/commodities/treasure/token-gold-gem.svg",
    "itemKey": "equipamento_de_pescaria",
    "folder": "fldit00060000000",
    "_key": "!items!eqitm00200000000",
    "system": {
      "name": "Equipamento de Pescaria",
      "description": "Anzóis, linha e vara de pesca. Pescar requer testes de Sobrevivência.",
      "price": 14,
      "category": "Itens Mundanos",
      "unity": 18,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 14,
      "preco_venda_mp": 18,
      "unidade": 18
    }
  },
  {
    "_id": "eqitm00210000000",
    "name": "Ferramentas de Escrita",
    "type": "equipment",
    "img": "icons/commodities/treasure/token-gold-gem.svg",
    "itemKey": "ferramentas_de_escrita",
    "folder": "fldit00060000000",
    "_key": "!items!eqitm00210000000",
    "system": {
      "name": "Ferramentas de Escrita",
      "description": "Tinteiros, penas e canetas. Recursos suficientes para render diversas páginas de escrita.",
      "price": 7,
      "category": "Itens Mundanos",
      "unity": 8,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 7,
      "preco_venda_mp": 8,
      "unidade": 8
    }
  },
  {
    "_id": "eqitm00220000000",
    "name": "Ferro",
    "type": "equipment",
    "img": "icons/commodities/metal/ingot-iron.svg",
    "itemKey": "ferro",
    "folder": "fldit00070000000",
    "_key": "!items!eqitm00220000000",
    "system": {
      "name": "Ferro",
      "description": "Minério bruto essencial para ferraria e fabricação de armas e ferramentas.",
      "price": 2,
      "category": "Ingrediente",
      "unity": 4,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 2,
      "preco_venda_mp": 1,
      "unidade": 4
    }
  },
  {
    "_id": "eqitm00230000000",
    "name": "Fibra",
    "type": "equipment",
    "img": "icons/commodities/metal/ingot-iron.svg",
    "itemKey": "fibra",
    "folder": "fldit00070000000",
    "_key": "!items!eqitm00230000000",
    "system": {
      "name": "Fibra",
      "description": "Fibras naturais não processadas (linho, cânhamo, algodão) para tecelagem de cordas e tecidos.",
      "price": 1,
      "category": "Ingrediente",
      "unity": 4,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 1,
      "preco_venda_mp": 1,
      "unidade": 4
    }
  },
  {
    "_id": "eqitm00240000000",
    "name": "Foelys",
    "type": "equipment",
    "img": "icons/commodities/metal/ingot-iron.svg",
    "itemKey": "foelys",
    "folder": "fldit00070000000",
    "_key": "!items!eqitm00240000000",
    "system": {
      "name": "Foelys",
      "description": "Extrato vegetal aromático e revigorante utilizado na destilação de tônicos alquímicos.",
      "price": 5,
      "category": "Ingrediente",
      "unity": 2,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 5,
      "preco_venda_mp": 2,
      "unidade": 2
    }
  },
  {
    "_id": "eqitm00250000000",
    "name": "Frasco de Explosão Arcana",
    "type": "equipment",
    "img": "icons/commodities/treasure/token-gold-gem.svg",
    "itemKey": "frasco_de_explosao_arcana",
    "folder": "fldit00080000000",
    "_key": "!items!eqitm00250000000",
    "system": {
      "name": "Frasco de Explosão Arcana",
      "description": "Explode ao impacto em uma área de 3x3 metros, liberando energia mágica do Véu. Alvos na área devem superar teste de Agilidade Dif. 8 ou recebem o dano da explosão.",
      "price": 20,
      "category": "Item Utilizável / Consumível",
      "unity": 2,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 20,
      "preco_venda_mp": 15,
      "unidade": 2
    }
  },
  {
    "_id": "eqitm00260000000",
    "name": "Frasco de Óleo",
    "type": "equipment",
    "img": "icons/commodities/treasure/token-gold-gem.svg",
    "itemKey": "frasco_de_oleo",
    "folder": "fldit00070000000",
    "_key": "!items!eqitm00260000000",
    "system": {
      "name": "Frasco de Óleo",
      "description": "Frasco de óleo inflamável. Alimenta uma lamparina por 8 horas ou serve como combustível em chamas.",
      "price": 3,
      "category": "Itens Mundanos",
      "unity": 3,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 3,
      "preco_venda_mp": 3,
      "unidade": 3
    }
  },
  {
    "_id": "eqitm00270000000",
    "name": "Frasco de Perfume",
    "type": "equipment",
    "img": "icons/commodities/treasure/token-gold-gem.svg",
    "itemKey": "frasco_de_perfume",
    "folder": "fldit00070000000",
    "_key": "!items!eqitm00270000000",
    "system": {
      "name": "Frasco de Perfume",
      "description": "Loção ou fragrância usada para fins estéticos, disfarçar odores ou etiqueta social.",
      "price": 8,
      "category": "Itens Mundanos",
      "unity": 3,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 8,
      "preco_venda_mp": 3,
      "unidade": 3
    }
  },
  {
    "_id": "eqitm00280000000",
    "name": "Frasco Vazio",
    "type": "equipment",
    "img": "icons/commodities/treasure/token-gold-gem.svg",
    "itemKey": "frasco_vazio",
    "folder": "fldit00050000000",
    "_key": "!items!eqitm00280000000",
    "system": {
      "name": "Frasco Vazio",
      "description": "Recipiente pequeno e delicado usado para reter substâncias, poções, toxinas e soluções diversas.",
      "price": 2,
      "category": "Itens Mundanos",
      "unity": 3,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 2,
      "preco_venda_mp": 3,
      "unidade": 3
    }
  },
  {
    "_id": "eqitm00290000000",
    "name": "Frutas",
    "type": "equipment",
    "img": "icons/consumables/food/meat-steak-raw-brown.svg",
    "itemKey": "frutas",
    "folder": "fldit00030000000",
    "_key": "!items!eqitm00290000000",
    "system": {
      "name": "Frutas",
      "description": "Frutos frescos colhidos da flora nativa para consumo ou preparo de conservas.",
      "price": 2,
      "category": "Ingrediente",
      "unity": 2,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 2,
      "preco_venda_mp": 1,
      "unidade": 2
    }
  },
  {
    "_id": "eqitm002a0000000",
    "name": "Gibão",
    "type": "equipment",
    "img": "icons/equipment/chest/shirt-tunic-plain-brown.svg",
    "itemKey": "gibao",
    "folder": "fldit00040000000",
    "_key": "!items!eqitm002a0000000",
    "system": {
      "name": "Gibão",
      "description": "Traje reforçado de couro ajustado ao tronco, frequentemente usado por baixo de proteções.",
      "price": 3,
      "category": "Vestuário",
      "unity": 1,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 3,
      "preco_venda_mp": 1,
      "unidade": 1
    }
  },
  {
    "_id": "eqitm002b0000000",
    "name": "Grãos",
    "type": "equipment",
    "img": "icons/consumables/food/meat-steak-raw-brown.svg",
    "itemKey": "graos",
    "folder": "fldit00030000000",
    "_key": "!items!eqitm002b0000000",
    "system": {
      "name": "Grãos",
      "description": "Sementes secas (feijão, ervilha, lentilha) de longa durabilidade para viagens.",
      "price": 2,
      "category": "Ingrediente",
      "unity": 2,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 2,
      "preco_venda_mp": 1,
      "unidade": 2
    }
  },
  {
    "_id": "eqitm002c0000000",
    "name": "Instrumento Musical",
    "type": "equipment",
    "img": "icons/commodities/treasure/token-gold-gem.svg",
    "itemKey": "instrumento_musical",
    "folder": "fldit00080000000",
    "_key": "!items!eqitm002c0000000",
    "system": {
      "name": "Instrumento Musical",
      "description": "Ferramenta musical de sopro, percussiva ou de cordas. Utilizar requer testes de Performance.",
      "price": 15,
      "category": "Itens Mundanos",
      "unity": 12,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 15,
      "preco_venda_mp": 12,
      "unidade": 12
    }
  },
  {
    "_id": "eqitm002d0000000",
    "name": "Jev",
    "type": "equipment",
    "img": "icons/commodities/metal/ingot-iron.svg",
    "itemKey": "jev",
    "folder": "fldit00070000000",
    "_key": "!items!eqitm002d0000000",
    "system": {
      "name": "Jev",
      "description": "Matéria orgânica/cristalina extraída de criaturas do Véu com reflexos prismáticos, usada em infusões místicas.",
      "price": 5,
      "category": "Ingrediente",
      "unity": 2,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 5,
      "preco_venda_mp": 2,
      "unidade": 2
    }
  },
  {
    "_id": "eqitm002e0000000",
    "name": "Kot",
    "type": "equipment",
    "img": "icons/commodities/metal/ingot-iron.svg",
    "itemKey": "kot",
    "folder": "fldit00070000000",
    "_key": "!items!eqitm002e0000000",
    "system": {
      "name": "Kot",
      "description": "Resquício biológico palpitante coletado de criaturas ligadas ao Ciclo natural, usado na forja viva e alquimia.",
      "price": 5,
      "category": "Ingrediente",
      "unity": 2,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 5,
      "preco_venda_mp": 2,
      "unidade": 2
    }
  },
  {
    "_id": "eqitm002f0000000",
    "name": "Lamparina",
    "type": "equipment",
    "img": "icons/tools/crafting/rope-coiled-grey.svg",
    "itemKey": "lamparina",
    "folder": "fldit00060000000",
    "_key": "!items!eqitm002f0000000",
    "system": {
      "name": "Lamparina",
      "description": "Fonte de luz reutilizável que dura 8 horas quando abastecida por um frasco de óleo. Ilumina todo o ambiente até 8 metros, impedindo efeitos de Escuridão.",
      "price": 8,
      "category": "Itens Mundanos",
      "unity": 10,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 8,
      "preco_venda_mp": 10,
      "unidade": 10
    }
  },
  {
    "_id": "eqitm00300000000",
    "name": "Livreto em Branco",
    "type": "equipment",
    "img": "icons/commodities/treasure/token-gold-gem.svg",
    "itemKey": "livreto_em_branco",
    "folder": "fldit00080000000",
    "_key": "!items!eqitm00300000000",
    "system": {
      "name": "Livreto em Branco",
      "description": "Pequeno aglomerado encadernado de folhas em branco para anotações e desenhos.",
      "price": 4,
      "category": "Itens Mundanos",
      "unity": 7,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 4,
      "preco_venda_mp": 7,
      "unidade": 7
    }
  },
  {
    "_id": "eqitm00310000000",
    "name": "Luneta",
    "type": "equipment",
    "img": "icons/commodities/treasure/token-gold-gem.svg",
    "itemKey": "luneta",
    "folder": "fldit00060000000",
    "_key": "!items!eqitm00310000000",
    "system": {
      "name": "Luneta",
      "description": "Ferramenta óptica de valor inestimável, principalmente em alto-mar. Permite enxergar longas distâncias com nitidez.",
      "price": 13,
      "category": "Itens Mundanos",
      "unity": 9,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 13,
      "preco_venda_mp": 9,
      "unidade": 9
    }
  },
  {
    "_id": "eqitm00320000000",
    "name": "Menya",
    "type": "equipment",
    "img": "icons/commodities/metal/ingot-iron.svg",
    "itemKey": "menya",
    "folder": "fldit00070000000",
    "_key": "!items!eqitm00320000000",
    "system": {
      "name": "Menya",
      "description": "Extrato estimulante de uso frequente até mesmo em comidas, possui propriedades estimulantes que revigoram o fôlego.",
      "price": 15,
      "category": "Extrato / Estimulante",
      "unity": 2,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "Extrato / Estimulante",
      "preco_compra_mp": 15,
      "preco_venda_mp": 10,
      "unidade": 2
    }
  },
  {
    "_id": "eqitm00330000000",
    "name": "Mochila",
    "type": "equipment",
    "img": "icons/equipment/backpack/backpack-leather-camo.svg",
    "itemKey": "mochila",
    "folder": "fldit00050000000",
    "_key": "!items!eqitm00330000000",
    "system": {
      "name": "Mochila",
      "description": "Acessório de armazenagem de grande porte. Os pontos de Unidade só contam quando transportada à mão. Enquanto equipada nas costas, aumenta seus pontos de Unidade em +40 (não acumula com outras Mochilas).",
      "price": 16,
      "category": "Itens Mundanos",
      "unity": 18,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 16,
      "preco_venda_mp": 18,
      "unidade": 18
    }
  },
  {
    "_id": "eqitm00340000000",
    "name": "Pá",
    "type": "equipment",
    "img": "icons/commodities/treasure/token-gold-gem.svg",
    "itemKey": "pa",
    "folder": "fldit00060000000",
    "_key": "!items!eqitm00340000000",
    "system": {
      "name": "Pá",
      "description": "Usada para cavar o solo, abrir valas e mover destroços e detritos.",
      "price": 2,
      "category": "Itens Mundanos",
      "unity": 16,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 2,
      "preco_venda_mp": 16,
      "unidade": 16
    }
  },
  {
    "_id": "eqitm00350000000",
    "name": "Pergaminho",
    "type": "equipment",
    "img": "icons/commodities/treasure/token-gold-gem.svg",
    "itemKey": "pergaminho",
    "folder": "fldit00080000000",
    "_key": "!items!eqitm00350000000",
    "system": {
      "name": "Pergaminho",
      "description": "Um pergaminho em branco, frente e verso, para escrita de mapas, contratos ou feitiços.",
      "price": 1,
      "category": "Itens Mundanos",
      "unity": 1,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 1,
      "preco_venda_mp": 1,
      "unidade": 1
    }
  },
  {
    "_id": "eqitm00360000000",
    "name": "Poção da Regeneração Suprema",
    "type": "equipment",
    "img": "icons/consumables/potions/potion-tube-corked-red.svg",
    "itemKey": "pocao_da_regeneracao_suprema",
    "folder": "fldit00010000000",
    "_key": "!items!eqitm00360000000",
    "system": {
      "name": "Poção da Regeneração Suprema",
      "description": "Regenera (4 × Vigor) + 2d12 Pontos de Vida e remove Envenenado ou o efeito de uma Toxina.",
      "price": 55,
      "category": "Poção",
      "unity": 10,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "Poção",
      "preco_compra_mp": 55,
      "preco_venda_mp": 30,
      "unidade": 10
    }
  },
  {
    "_id": "eqitm00370000000",
    "name": "Poção da Vida e Energia Avançada",
    "type": "equipment",
    "img": "icons/consumables/potions/potion-tube-corked-red.svg",
    "itemKey": "pocao_da_vida_e_energia_avancada",
    "folder": "fldit00010000000",
    "_key": "!items!eqitm00370000000",
    "system": {
      "name": "Poção da Vida e Energia Avançada",
      "description": "Regenera (2 × Vigor) + 2d8 Pontos de Vida e recupera 2d6 Pontos de Energia.",
      "price": 65,
      "category": "Poção",
      "unity": 10,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "Poção",
      "preco_compra_mp": 65,
      "preco_venda_mp": 35,
      "unidade": 10
    }
  },
  {
    "_id": "eqitm00380000000",
    "name": "Poção da Vitalidade Suprema",
    "type": "equipment",
    "img": "icons/consumables/potions/potion-tube-corked-red.svg",
    "itemKey": "pocao_da_vitalidade_suprema",
    "folder": "fldit00010000000",
    "_key": "!items!eqitm00380000000",
    "system": {
      "name": "Poção da Vitalidade Suprema",
      "description": "Regenera (2 × Vigor) + 2d8 Pontos de Vida e recupera 1d4 Pontos de Energia.",
      "price": 40,
      "category": "Poção",
      "unity": 10,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "Poção",
      "preco_compra_mp": 40,
      "preco_venda_mp": 25,
      "unidade": 10
    }
  },
  {
    "_id": "eqitm00390000000",
    "name": "Poção de Antídoto",
    "type": "equipment",
    "img": "icons/consumables/potions/potion-tube-corked-red.svg",
    "itemKey": "pocao_de_antidoto",
    "folder": "fldit00010000000",
    "_key": "!items!eqitm00390000000",
    "system": {
      "name": "Poção de Antídoto",
      "description": "Ao beber, remove imediatamente a condição Envenenado ou o efeito de uma Toxina ativa.",
      "price": 15,
      "category": "Poção",
      "unity": 3,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "Poção",
      "preco_compra_mp": 15,
      "preco_venda_mp": 10,
      "unidade": 3
    }
  },
  {
    "_id": "eqitm003a0000000",
    "name": "Poção de Crisol Cerúleo",
    "type": "equipment",
    "img": "icons/consumables/potions/potion-tube-corked-red.svg",
    "itemKey": "pocao_de_crisol_ceruleo",
    "folder": "fldit00010000000",
    "_key": "!items!eqitm003a0000000",
    "system": {
      "name": "Poção de Crisol Cerúleo",
      "description": "Remove Envenenado e todos os efeitos de Toxinas, além de anular o próximo Envenenado ou efeito tóxico que recebesse dentro de 1 hora.",
      "price": 40,
      "category": "Poção Avançada",
      "unity": 3,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "Poção Avançada",
      "preco_compra_mp": 40,
      "preco_venda_mp": 25,
      "unidade": 3
    }
  },
  {
    "_id": "eqitm003b0000000",
    "name": "Poção de Energia Púrpura",
    "type": "equipment",
    "img": "icons/consumables/potions/potion-tube-corked-red.svg",
    "itemKey": "pocao_de_energia_purpura",
    "folder": "fldit00010000000",
    "_key": "!items!eqitm003b0000000",
    "system": {
      "name": "Poção de Energia Púrpura",
      "description": "Remove todas as Condições Mágicas ativas e regenera 2d6 Pontos de Energia.",
      "price": 55,
      "category": "Poção",
      "unity": 10,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "Poção",
      "preco_compra_mp": 55,
      "preco_venda_mp": 30,
      "unidade": 10
    }
  },
  {
    "_id": "eqitm003c0000000",
    "name": "Porta Mapas",
    "type": "equipment",
    "img": "icons/commodities/treasure/token-gold-gem.svg",
    "itemKey": "porta_mapas",
    "folder": "fldit00050000000",
    "_key": "!items!eqitm003c0000000",
    "system": {
      "name": "Porta Mapas",
      "description": "Recipiente tubular feito para guardar, transportar e proteger mapas e documentos de elementos externos provindos de ambientes que poderiam danificá-los.",
      "price": 5,
      "category": "Itens Mundanos",
      "unity": 6,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 5,
      "preco_venda_mp": 6,
      "unidade": 6
    }
  },
  {
    "_id": "eqitm003d0000000",
    "name": "Pressão Gravitas",
    "type": "equipment",
    "img": "icons/commodities/treasure/token-gold-gem.svg",
    "itemKey": "pressao_gravitas",
    "folder": "fldit00080000000",
    "_key": "!items!eqitm003d0000000",
    "system": {
      "name": "Pressão Gravitas",
      "description": "Cria uma zona de compressão gravitacional intensa em uma área de 5x5 metros, tornando o local Terreno Difícil e desacelerando movimentos.",
      "price": 30,
      "category": "Item Utilizável / Consumível",
      "unity": 2,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 30,
      "preco_venda_mp": 20,
      "unidade": 2
    }
  },
  {
    "_id": "eqitm003e0000000",
    "name": "Ração de Viagem",
    "type": "equipment",
    "img": "icons/consumables/food/meat-steak-raw-brown.svg",
    "itemKey": "racao_de_viagem",
    "folder": "fldit00030000000",
    "_key": "!items!eqitm003e0000000",
    "system": {
      "name": "Ração de Viagem",
      "description": "Porções de comida duradoura (carne-seca, grãos e frutas secas) que sustentam um Legado por 8 horas. Estragam após 5 dias (ou 1 dia se molhadas).",
      "price": 2,
      "category": "Itens Mundanos",
      "unity": 4,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 2,
      "preco_venda_mp": 4,
      "unidade": 4
    }
  },
  {
    "_id": "eqitm003f0000000",
    "name": "Saco de Dormir",
    "type": "equipment",
    "img": "icons/tools/crafting/rope-coiled-grey.svg",
    "itemKey": "saco_de_dormir",
    "folder": "fldit00060000000",
    "_key": "!items!eqitm003f0000000",
    "system": {
      "name": "Saco de Dormir",
      "description": "Cama transportável para uso em viagens. Oferece conforto em acampamentos e ambientes selvagens.",
      "price": 6,
      "category": "Itens Mundanos",
      "unity": 13,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 6,
      "preco_venda_mp": 13,
      "unidade": 13
    }
  },
  {
    "_id": "eqitm00400000000",
    "name": "Sela",
    "type": "equipment",
    "img": "icons/commodities/treasure/token-gold-gem.svg",
    "itemKey": "sela",
    "folder": "fldit00080000000",
    "_key": "!items!eqitm00400000000",
    "system": {
      "name": "Sela",
      "description": "Acessório de couro para viagens em Montarias. Quando equipada na montaria, aumenta a capacidade de Unidade dela em +50. Unidade do item só conta se transportada à mão.",
      "price": 8,
      "category": "Itens Mundanos",
      "unity": 19,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 8,
      "preco_venda_mp": 19,
      "unidade": 19
    }
  },
  {
    "_id": "eqitm00410000000",
    "name": "Sucata",
    "type": "equipment",
    "img": "icons/commodities/metal/ingot-iron.svg",
    "itemKey": "sucata",
    "folder": "fldit00070000000",
    "_key": "!items!eqitm00410000000",
    "system": {
      "name": "Sucata",
      "description": "Fragmentos de metais e peças reaproveitáveis descartadas em oficinas.",
      "price": 1,
      "category": "Ingrediente",
      "unity": 2,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 1,
      "preco_venda_mp": 1,
      "unidade": 2
    }
  },
  {
    "_id": "eqitm00420000000",
    "name": "Tenda",
    "type": "equipment",
    "img": "icons/tools/crafting/rope-coiled-grey.svg",
    "itemKey": "tenda",
    "folder": "fldit00060000000",
    "_key": "!items!eqitm00420000000",
    "system": {
      "name": "Tenda",
      "description": "Abrigo desmontável com capacidade para até dois indivíduos, fornecendo abrigo contra intempéries climáticas em campo aberto.",
      "price": 12,
      "category": "Itens Mundanos",
      "unity": 17,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 12,
      "preco_venda_mp": 17,
      "unidade": 17
    }
  },
  {
    "_id": "eqitm00430000000",
    "name": "Tocha",
    "type": "equipment",
    "img": "icons/tools/crafting/rope-coiled-grey.svg",
    "itemKey": "tocha",
    "folder": "fldit00060000000",
    "_key": "!items!eqitm00430000000",
    "system": {
      "name": "Tocha",
      "description": "Bastão que queima por 2 horas, iluminando um raio de até 4 metros e removendo a Escuridão.",
      "price": 2,
      "category": "Itens Mundanos",
      "unity": 8,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 2,
      "preco_venda_mp": 8,
      "unidade": 8
    }
  },
  {
    "_id": "eqitm00440000000",
    "name": "Toxina Debilitante",
    "type": "equipment",
    "img": "icons/consumables/potions/bottle-bulb-corked-poison-green.svg",
    "itemKey": "toxina_debilitante",
    "folder": "fldit00020000000",
    "_key": "!items!eqitm00440000000",
    "system": {
      "name": "Toxina Debilitante",
      "description": "Aplicada em armamento ou projétil. Ao causar dano, aplica a condição Envenenado no alvo por 1 hora.",
      "price": 15,
      "category": "Toxina",
      "unity": 3,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "Toxina",
      "preco_compra_mp": 15,
      "preco_venda_mp": 10,
      "unidade": 3
    }
  },
  {
    "_id": "eqitm00450000000",
    "name": "Toxina Entorpecente",
    "type": "equipment",
    "img": "icons/consumables/potions/bottle-bulb-corked-poison-green.svg",
    "itemKey": "toxina_entorpecente",
    "folder": "fldit00020000000",
    "_key": "!items!eqitm00450000000",
    "system": {
      "name": "Toxina Entorpecente",
      "description": "Aplicada em armamento ou projétil. Ao causar dano, aplica a condição Lentidão no alvo por 1 hora.",
      "price": 15,
      "category": "Toxina",
      "unity": 3,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "Toxina",
      "preco_compra_mp": 15,
      "preco_venda_mp": 10,
      "unidade": 3
    }
  },
  {
    "_id": "eqitm00460000000",
    "name": "Utensílios de Cozinha",
    "type": "equipment",
    "img": "icons/commodities/treasure/token-gold-gem.svg",
    "itemKey": "utensilios_de_cozinha",
    "folder": "fldit00060000000",
    "_key": "!items!eqitm00460000000",
    "system": {
      "name": "Utensílios de Cozinha",
      "description": "Panelas, pratos, tigelas e talheres para preparação e cozimento de alimentos durante expedições.",
      "price": 6,
      "category": "Itens Mundanos",
      "unity": 12,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 6,
      "preco_venda_mp": 12,
      "unidade": 12
    }
  },
  {
    "_id": "eqitm00470000000",
    "name": "Vestimenta Contra o Calor",
    "type": "equipment",
    "img": "icons/commodities/treasure/token-gold-gem.svg",
    "itemKey": "vestimenta_contra_o_calor",
    "folder": "fldit00040000000",
    "_key": "!items!eqitm00470000000",
    "system": {
      "name": "Vestimenta Contra o Calor",
      "description": "Vestimentas especiais que convertem Calor Extremo em Calor Elevado, e Calor Elevado em Temperatura Neutra.",
      "price": 8,
      "category": "Itens Mundanos / Vestuário",
      "unity": 10,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 8,
      "preco_venda_mp": 10,
      "unidade": 10
    }
  },
  {
    "_id": "eqitm00480000000",
    "name": "Vestimenta Contra o Frio",
    "type": "equipment",
    "img": "icons/commodities/treasure/token-gold-gem.svg",
    "itemKey": "vestimenta_contra_o_frio",
    "folder": "fldit00040000000",
    "_key": "!items!eqitm00480000000",
    "system": {
      "name": "Vestimenta Contra o Frio",
      "description": "Vestimentas especiais que convertem Frio Extremo em Frio Elevado, e Frio Elevado em Temperatura Neutra.",
      "price": 8,
      "category": "Itens Mundanos / Vestuário",
      "unity": 10,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 8,
      "preco_venda_mp": 10,
      "unidade": 10
    }
  },
  {
    "_id": "eqitm00490000000",
    "name": "Voragem Celeste",
    "type": "equipment",
    "img": "icons/commodities/treasure/token-gold-gem.svg",
    "itemKey": "voragem_celeste",
    "folder": "fldit00080000000",
    "_key": "!items!eqitm00490000000",
    "system": {
      "name": "Voragem Celeste",
      "description": "Ao ser quebrado, manifesta uma fenda planar que causa 4d8 de Dano Mágico no alvo designado. Criaturas abaixo do porte Grande atingidas recebem 2 pontos de Fratura.",
      "price": 100,
      "category": "Item Utilizável / Consumível",
      "unity": 3,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 100,
      "preco_venda_mp": 50,
      "unidade": 3
    }
  },
  {
    "_id": "eqitm004a0000000",
    "name": "Zap!",
    "type": "equipment",
    "img": "icons/commodities/metal/ingot-iron.svg",
    "itemKey": "zap",
    "folder": "fldit00070000000",
    "_key": "!items!eqitm004a0000000",
    "system": {
      "name": "Zap!",
      "description": "Frasco arremessável com glifos arcanos elétricos. Causa 2d8 de Dano Mágico [Elemental Trovão] no impacto.",
      "price": 20,
      "category": "Item Utilizável / Consumível",
      "unity": 2,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 20,
      "preco_venda_mp": 15,
      "unidade": 2
    }
  },
  {
    "_id": "eqitm004b0000000",
    "name": "Zye",
    "type": "equipment",
    "img": "icons/commodities/metal/ingot-iron.svg",
    "itemKey": "zye",
    "folder": "fldit00070000000",
    "_key": "!items!eqitm004b0000000",
    "system": {
      "name": "Zye",
      "description": "Estilhaço planar com aspecto translúcido e reflexivo, ingrediente chave para elixires e catalisadores avançados.",
      "price": 5,
      "category": "Ingrediente",
      "unity": 2,
      "equipped": false,
      "quantity": 1,
      "actions": [],
      "tipo": "",
      "preco_compra_mp": 5,
      "preco_venda_mp": 2,
      "unidade": 2
    }
  }
];
