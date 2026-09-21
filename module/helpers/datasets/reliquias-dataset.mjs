// ==============================================================================
// GAIA: O PRELÚDIO - DATASET COMPLETO DE RELÍQUIAS
// ==============================================================================
// PT: Contém as 60 Relíquias de Auroria (Comuns, Incomuns, Raras e Lendárias).
// Baseado no manual oficial "Gaia - O Prelúdio - Manual de Demonstração 2.0".

export const RELIQUIAS_FOLDERS_DATA = [
  {
    "_id": "fldrel0001000000",
    "name": "Relíquias Comuns",
    "type": "Item",
    "sorting": "a",
    "color": "#3f3f3f",
    "_key": "!folders!fldrel0001000000"
  },
  {
    "_id": "fldrel0002000000",
    "name": "Relíquias Incomuns",
    "type": "Item",
    "sorting": "a",
    "color": "#6b6b6b",
    "_key": "!folders!fldrel0002000000"
  },
  {
    "_id": "fldrel0003000000",
    "name": "Relíquias Raras",
    "type": "Item",
    "sorting": "a",
    "color": "#006b59",
    "_key": "!folders!fldrel0003000000"
  },
  {
    "_id": "fldrel0004000000",
    "name": "Relíquias Lendárias",
    "type": "Item",
    "sorting": "a",
    "color": "#888600",
    "_key": "!folders!fldrel0004000000"
  }
];

export const RELIQUIAS_DATA = [
  {
    "_id": "eqrel00010000000",
    "name": "Agulha de Sangue",
    "type": "relic",
    "img": "icons/weapons/daggers/dagger-curved-engraved.svg",
    "itemKey": "agulha_de_sangue",
    "folder": "fldrel0001000000",
    "_key": "!items!eqrel00010000000",
    "system": {
      "name": "Agulha de Sangue",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Comum</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 0</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>Você pode tocar um cadáver com essa Relíquia para interrogá-lo, realizando uma única pergunta ao cadáver, que deverá responder, caso saiba a resposta. O cadáver deve entender o Idioma no qual a pergunta foi feita. Depois de utilizada, essa Relíquia só poderá ser reutilizada após um Repouso Completo.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Uma pequena varinha retorcida, feita de madeira carmesim.</p></blockquote>",
      "price": 0,
      "category": "comum",
      "potency": 0,
      "isBound": false,
      "properties": "",
      "unity": 4,
      "equipped": false,
      "quantity": 1,
      "actions": []
    },
    "effects": []
  },
  {
    "_id": "eqrel00020000000",
    "name": "Armadura Instantânea",
    "type": "relic",
    "img": "icons/equipment/chest/breastplate-metal-engraved.svg",
    "itemKey": "armadura_instantânea",
    "folder": "fldrel0001000000",
    "_key": "!items!eqrel00020000000",
    "system": {
      "name": "Armadura Instantânea",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Comum</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 0</span> <span style='font-size: 0.85em; opacity: 0.8;'><em>* Unidade referente ao tipo de equipamento.</em></span></div><p style='font-size: 0.85em; opacity: 0.8; font-style: italic; margin-bottom: 6px;'>*Referente ao tipo de Armadura.</p><p style='margin-bottom: 8px; line-height: 1.4;'>Uma Armadura à escolha do Narrador. Enquanto não estiver equipada, possui a aparência de um acessório à escolha do usuário. Você pode utilizar uma Ação Simples para equipar ou removê-la.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Uma armadura marcada com um pequeno símbolo místico.</p></blockquote>",
      "price": 0,
      "category": "comum",
      "potency": 0,
      "isBound": false,
      "properties": "",
      "unity": 0,
      "equipped": false,
      "quantity": 1,
      "actions": [
        {
          "id": "act00020000001",
          "name": "Ativar: Armadura Instantânea",
          "description": "*Referente ao tipo de Armadura. Uma Armadura à escolha do Narrador. Enquanto não estiver equipada, possui a aparência de um acessório à escolha do usuário. Você pode utilizar uma Ação Simples para equipar ou removê-la.",
          "cost": "",
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
    "effects": []
  },
  {
    "_id": "eqrel00030000000",
    "name": "Armamento Metamorfo",
    "type": "relic",
    "img": "icons/weapons/swords/sword-broad-glowing-blue.svg",
    "itemKey": "armamento_metamorfo",
    "folder": "fldrel0001000000",
    "_key": "!items!eqrel00030000000",
    "system": {
      "name": "Armamento Metamorfo",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Comum</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 0</span> <span style='font-size: 0.85em; opacity: 0.8;'><em>* Unidade referente ao tipo de equipamento.</em></span></div><p style='font-size: 0.85em; opacity: 0.8; font-style: italic; margin-bottom: 6px;'>*Referente ao tipo de Armamento.</p><p style='margin-bottom: 8px; line-height: 1.4;'>Um Armamento à escolha do Narrador. O Alvo Vinculado a esse Armamento pode utilizar uma  Ação Simples para transformá-lo em um outro tipo de Armamento da Tabela de Armamentos. Armamentos à Distância ainda precisam de projéteis para serem utilizados.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Um armamento marcado com um pequeno símbolo místico.</p></blockquote>",
      "price": 0,
      "category": "comum",
      "potency": 0,
      "isBound": false,
      "properties": "",
      "unity": 0,
      "equipped": false,
      "quantity": 1,
      "actions": [
        {
          "id": "act00030000001",
          "name": "Ativar: Armamento Metamorfo",
          "description": "*Referente ao tipo de Armamento. Um Armamento à escolha do Narrador. O Alvo Vinculado a esse Armamento pode utilizar uma  Ação Simples para transformá-lo em um outro tipo de Armamento da Tabela de Armamentos. Armamentos à Distância ainda precisam de projéteis para serem utilizados.",
          "cost": "",
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
    "effects": []
  },
  {
    "_id": "eqrel00040000000",
    "name": "Bico de Pena Nocturnal",
    "type": "relic",
    "img": "icons/tools/scribal/feather-quill-black.svg",
    "itemKey": "bico_de_pena_nocturnal",
    "folder": "fldrel0001000000",
    "_key": "!items!eqrel00040000000",
    "system": {
      "name": "Bico de Pena Nocturnal",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Comum</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 0</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>Você pode tocar um objeto de até 3kg, gerando um dos seguintes efeitos nele:</p><ul style='margin: 6px 0 10px 20px; padding: 0;'><li>Repetir misticamente um efeito sonoro que já tenha ouvido. Esse</li></ul><p style='margin-bottom: 8px; line-height: 1.4;'>efeito tem alcance de, no máximo, 6 metros.</p><ul style='margin: 6px 0 10px 20px; padding: 0;'><li>Reproduzir misticamente uma imagem, que permanece estática,</li></ul><p style='margin-bottom: 8px; line-height: 1.4;'>com a forma de um objeto, um pergaminho com algo escrito ou um símbolo, por exemplo. Esses efeitos podem ser coloridos, à escolha do Alvo Vinculado. Esses efeitos não possuem duração, mas só podem afetar um objeto por vez.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Criado para performances artísticas, apresentações de rua,  duelos coreografados em peças de teatro, esse bico de pena es teve presente em diversos espetáculos em Noctúrnia, visando utilizar o Véu para espalhar a beleza desde as ruas  da cidade até os caminhos mais remotos  abaixo de Krabesh.</p></blockquote>",
      "price": 0,
      "category": "comum",
      "potency": 0,
      "isBound": false,
      "properties": "",
      "unity": 3,
      "equipped": false,
      "quantity": 1,
      "actions": []
    },
    "effects": []
  },
  {
    "_id": "eqrel00050000000",
    "name": "Bolsa Perpétua",
    "type": "relic",
    "img": "icons/containers/bags/bag-leather-brown.svg",
    "itemKey": "bolsa_perpétua",
    "folder": "fldrel0001000000",
    "_key": "!items!eqrel00050000000",
    "system": {
      "name": "Bolsa Perpétua",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Comum</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 0</span></div><p style='font-size: 0.85em; opacity: 0.8; font-style: italic; margin-bottom: 6px;'>Os valores de Unidade desse item só se aplicam caso você esteja carregando-o, ao</p><p style='margin-bottom: 8px; line-height: 1.4;'>invés de equipando-o. Uma bolsa feita de couro milenar , produzido em Narzepion, que não possui limite de espaço . Você pode  armazenar qualquer objeto não-orgânico de até 1 metro em suas dimensões e 5kg.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Dizem que essas bolsas foram criadas pela Grande Artífice Hou Soujai, referência na fabricação mística de relíquias em Narzepion, na Antiga Auroria. Por que será que ela precisava de tanto espaço?</p></blockquote>",
      "price": 0,
      "category": "comum",
      "potency": 0,
      "isBound": false,
      "properties": "",
      "unity": 14,
      "equipped": false,
      "quantity": 1,
      "actions": []
    },
    "effects": []
  },
  {
    "_id": "eqrel00060000000",
    "name": "Bonecos da Corte da Noite",
    "type": "relic",
    "img": "icons/commodities/treasure/doll-rag.svg",
    "itemKey": "bonecos_da_corte_da_noite",
    "folder": "fldrel0001000000",
    "_key": "!items!eqrel00060000000",
    "system": {
      "name": "Bonecos da Corte da Noite",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Comum</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 0</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>Um boneco feito de um pano escuro com , no máximo , 60 centímetros. Possui detalhes em vermelho, seja m seus olhos ou lábios, que se assemelham a um pequeno ser humanoide desfigurado. Esses bonecos possuem um símbolo em suas costas que demonstram o seu tipo:</p><ul style='margin: 6px 0 10px 20px; padding: 0;'><li><strong>Boca Costurada:</strong> Esse tipo de boneco pode armazenar e replicar</li></ul><p style='margin-bottom: 8px; line-height: 1.4;'>mensagens. Enquanto estiver vinculado a esse boneco, você pode definir um tipo de gatilho, permitindo que o boneco fale e replique uma mensagem específica. Você pode gravar apenas uma mensagem por vez.</p><ul style='margin: 6px 0 10px 20px; padding: 0;'><li><strong>Coração Partido :</strong> esse boneco não fala, mas consegue se</li></ul><p style='margin-bottom: 8px; line-height: 1.4;'>movimentar, mas fica olhando para seus olhos o tempo inteiro, caso você esteja a até  10 metros  dele. Você pode solicitar pequenas tarefas ao boneco. Quando você est iver a mais de 20 metros  do boneco, ele poderá tomar suas próprias ações, sem o seu consentimento, mas nunca se afastará mais de 100 metros do local no qual você se afastou a mais de 20 metros dele.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Contam as lendas que esses bonecos não são originários de Auroria, mas sim de um plano sombrio, onde Seres da Noite os utilizavam como seus pequenos criados. Como não têm vontade, aceitavam todas as suas ordens.</p></blockquote>",
      "price": 0,
      "category": "comum",
      "potency": 0,
      "isBound": false,
      "properties": "",
      "unity": 9,
      "equipped": false,
      "quantity": 1,
      "actions": []
    },
    "effects": []
  },
  {
    "_id": "eqrel00070000000",
    "name": "Botas do Explorador",
    "type": "relic",
    "img": "icons/equipment/feet/boots-leather-brown.svg",
    "itemKey": "botas_do_explorador",
    "folder": "fldrel0001000000",
    "_key": "!items!eqrel00070000000",
    "system": {
      "name": "Botas do Explorador",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Comum</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 0</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>O valor de Unidade deste item só é contabilizado ao carregá-lo, ao invés de equipá-lo. Quando utilizada ao mesmo tempo, este par de botas concede 1 metro à sua Movimentação, além de fazer você ignorar Terreno Difícil.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Um par de botas de couro surrado, tão confortável como pisar em nuvens.</p></blockquote>",
      "price": 0,
      "category": "comum",
      "potency": 0,
      "isBound": false,
      "properties": "",
      "unity": 8,
      "equipped": false,
      "quantity": 1,
      "actions": []
    },
    "effects": []
  },
  {
    "_id": "eqrel00080000000",
    "name": "Cantil de Nosdrak",
    "type": "relic",
    "img": "icons/consumables/drinks/flask-leather-metal.svg",
    "itemKey": "cantil_de_nosdrak",
    "folder": "fldrel0001000000",
    "_key": "!items!eqrel00080000000",
    "system": {
      "name": "Cantil de Nosdrak",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Comum</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 0</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>Um cantil de ferro, revestido por um couro antigo que suporta até três litros de líquidos. A o concluir um Repouso Completo, você poderá encher este cantil com um líquido a escolha que já tenha bebido.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Um dia existiu ao noroeste de Drakar uma cidade chamada  Nosdrak, que recebeu todos os sobreviventes que lutaram na Batalha de Goldabur e lá, realizam um grande festival de 49 dias e 49 noites, comemorando a sua vitória sob as criaturas do Véu, e o que ninguém notou durante todo esse festival, é que a bebida misteriosamente nunca acabava.</p></blockquote>",
      "price": 0,
      "category": "comum",
      "potency": 0,
      "isBound": false,
      "properties": "",
      "unity": 7,
      "equipped": false,
      "quantity": 1,
      "actions": []
    },
    "effects": []
  },
  {
    "_id": "eqrel00090000000",
    "name": "Capa dos Filhos do Véu",
    "type": "relic",
    "img": "icons/equipment/back/cloak-hood-black.svg",
    "itemKey": "capa_dos_filhos_do_véu",
    "folder": "fldrel0001000000",
    "_key": "!items!eqrel00090000000",
    "system": {
      "name": "Capa dos Filhos do Véu",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Comum</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 0</span></div><p style='font-size: 0.85em; opacity: 0.8; font-style: italic; margin-bottom: 6px;'>Os valores de Unidade desse item só se aplicam caso você esteja carregando-o, ao</p><p style='margin-bottom: 8px; line-height: 1.4;'>invés de equipando-o. Uma capa que possui um Feitiço Arcano à escolha do Narrador. Você pode utilizar esse Feitiço Arcano sem custos de Pontos de Energia.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Colecionadores de Relíquias  descrevem esse tipo de acessório como um “orgulho fracassado” de estudiosos do Véu que não tenham despertado o seu próprio Véu às linhas místicas . No seu desespero, acabaram criando diversas dessas Relíquias para sentir pelo menos um pouco da fagulha mística.</p></blockquote>",
      "price": 0,
      "category": "comum",
      "potency": 0,
      "isBound": false,
      "properties": "",
      "unity": 10,
      "equipped": false,
      "quantity": 1,
      "actions": []
    },
    "effects": []
  },
  {
    "_id": "eqrel00100000000",
    "name": "Dados dos Ladrões",
    "type": "relic",
    "img": "icons/sundries/gaming/dice-pair-white.svg",
    "itemKey": "dados_dos_ladrões",
    "folder": "fldrel0001000000",
    "_key": "!items!eqrel00100000000",
    "system": {
      "name": "Dados dos Ladrões",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Comum</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 0</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>Dois dados de doze faces que, quando lançados juntos, sempre terão o resultado definido pelo Alvo Vinculado. Além disso, você pode refazer um teste de Conhecimento que tenha realizado, ficando com o novo resultado. Esse efeito só poderá ser realizado novamente depois de um Repouso Completo. Dados de tonalidade azul marinho, com a numeração de um a onze, no lugar do doze, está a face de um kitari com um dos olhos fechado.</p>",
      "price": 0,
      "category": "comum",
      "potency": 0,
      "isBound": false,
      "properties": "",
      "unity": 1,
      "equipped": false,
      "quantity": 1,
      "actions": []
    },
    "effects": []
  },
  {
    "_id": "eqrel00110000000",
    "name": "Diadema da Primeira Primavera",
    "type": "relic",
    "img": "icons/equipment/head/circlet-nature-vines.svg",
    "itemKey": "diadema_da_primeira_primavera",
    "folder": "fldrel0001000000",
    "_key": "!items!eqrel00110000000",
    "system": {
      "name": "Diadema da Primeira Primavera",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Comum</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 0</span></div><p style='font-size: 0.85em; opacity: 0.8; font-style: italic; margin-bottom: 6px;'>Os valores de Unidade desse item só se aplicam caso você esteja carregando-o, ao</p><p style='margin-bottom: 8px; line-height: 1.4;'>invés de equipando-o. Essa Relíquia concede +1 a testes de Sobrevivência. Você pode utilizar a sua Ação Simples para compreender e falar com animais comuns e criaturas que possuam Características do Livro dos Seres Ferais  ou do Livro dos Seres Primais  por 10 minutos. Depois de utilizada, essa Relíquia só poderá ser reutilizada após um Repouso Completo.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Uma tiara feita de galhos retorcidos ornados com presas de pedra rústica.</p></blockquote>",
      "price": 0,
      "category": "comum",
      "potency": 0,
      "isBound": false,
      "properties": "",
      "unity": 4,
      "equipped": false,
      "quantity": 1,
      "actions": [
        {
          "id": "act00110000001",
          "name": "Ativar: Diadema da Primeira Primavera",
          "description": "Os valores de Unidade desse item só se aplicam caso você esteja carregando-o, ao invés de equipando-o. Essa Relíquia concede +1 a testes de Sobrevivência. Você pode utilizar a sua Ação Simples para compreender e falar com animais comuns e criaturas que possuam Características do Livro dos Seres Ferais  ou do Livro dos Seres Primais  por 10 minutos. Depois de utilizada, essa Relíquia só poderá ser reutilizada após um Repouso Completo.",
          "cost": "",
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
    "effects": []
  },
  {
    "_id": "eqrel00120000000",
    "name": "Diário dos Poetas",
    "type": "relic",
    "img": "icons/sundries/documents/book-open-gold.svg",
    "itemKey": "diário_dos_poetas",
    "folder": "fldrel0001000000",
    "_key": "!items!eqrel00120000000",
    "system": {
      "name": "Diário dos Poetas",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Comum</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 0</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>Toda informação escrita nesse caderno é armazenada  de modo que apenas o usuário, e todos aqueles que ele permitir, possa ler. Caso seja danificado, o caderno se regenerar á se possuir , pelo menos, uma parte inteira.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Um belo caderno adornado, que possui incontáveis páginas, mesmo sendo pequeno e fino.</p></blockquote>",
      "price": 0,
      "category": "comum",
      "potency": 0,
      "isBound": false,
      "properties": "",
      "unity": 7,
      "equipped": false,
      "quantity": 1,
      "actions": []
    },
    "effects": []
  },
  {
    "_id": "eqrel00130000000",
    "name": "Geringonças de Tellub",
    "type": "relic",
    "img": "icons/equipment/hand/glove-leather-green.svg",
    "itemKey": "geringonças_de_tellub",
    "folder": "fldrel0001000000",
    "_key": "!items!eqrel00130000000",
    "system": {
      "name": "Geringonças de Tellub",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Comum</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 0</span></div><p style='font-size: 0.85em; opacity: 0.8; font-style: italic; margin-bottom: 6px;'>Os valores de Unidade desse item só se aplicam caso você esteja carregando-o, ao</p><p style='margin-bottom: 8px; line-height: 1.4;'>invés de equipando-o. Uma luva de couro esverdeado com um pequeno cristal no seu centro. Permite que você utilize uma Ação Simples para disparar fios mágicos, como teias, em uma superfície sólida a até 3 metros de distância. Essas teias se aderem a qualquer superfície sólida , puxando o usuário até o local aderido . Após ser puxado ao local, as teias desaparecem. Além disso, enquanto estiver equipado com esse acessório, você pode utilizar as suas mãos para escalar e se movimentar por qualquer superfície sólida, fixando-se na superfície sem  precisar de testes.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Na Antiga Auroria se conheceu Tellub, um artífice delahk sorridente de Jazaar, que conquistava todos ao seu redor com as suas bugigangas e seus protótipos.</p></blockquote>",
      "price": 0,
      "category": "comum",
      "potency": 0,
      "isBound": false,
      "properties": "",
      "unity": 6,
      "equipped": false,
      "quantity": 1,
      "actions": [
        {
          "id": "act00130000001",
          "name": "Ativar: Geringonças de Tellub",
          "description": "Os valores de Unidade desse item só se aplicam caso você esteja carregando-o, ao invés de equipando-o. Uma luva de couro esverdeado com um pequeno cristal no seu centro. Permite que você utilize uma Ação Simples para disparar fios mágicos, como teias, em uma superfície sólida a até 3 metros de distância. Essas teias se aderem a qualquer superfície sólida , puxando o usuário até o local aderido . Após ser puxado ao local, as teias desaparecem. Além disso, enquanto estiver equipado com esse acessório, você pode utilizar as suas mãos para escalar e se movimentar por qualquer superfície sólida, fixando-se na superfície sem  precisar de testes.",
          "cost": "",
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
    "effects": []
  },
  {
    "_id": "eqrel00140000000",
    "name": "Lamparina Etérea",
    "type": "relic",
    "img": "icons/sundries/lights/lantern-iron-blue.svg",
    "itemKey": "lamparina_etérea",
    "folder": "fldrel0001000000",
    "_key": "!items!eqrel00140000000",
    "system": {
      "name": "Lamparina Etérea",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Comum</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 0</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>Uma lamparina que não precisa de um frasco de óleo para ser utilizada. Acende conforme a vontade do Alvo Vinculado à Relíquia, desde que ele a segure. Diferente de lamparinas comuns, essa lamparina emite uma luz cuja cor fica à escolha do seu Alvo Vinculado, iluminando todo ambiente até 6 metros , impedindo efeitos de Escuridão e Escuridão Mística.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Uma lamparina aparentemente comum, com um símbolo místico no seu interior.</p></blockquote>",
      "price": 0,
      "category": "comum",
      "potency": 0,
      "isBound": false,
      "properties": "",
      "unity": 10,
      "equipped": false,
      "quantity": 1,
      "actions": []
    },
    "effects": []
  },
  {
    "_id": "eqrel00150000000",
    "name": "Lentes Caleidoscópicas",
    "type": "relic",
    "img": "icons/tools/instruments/monocle-gold.svg",
    "itemKey": "lentes_caleidoscópicas",
    "folder": "fldrel0001000000",
    "_key": "!items!eqrel00150000000",
    "system": {
      "name": "Lentes Caleidoscópicas",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Comum</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 0</span></div><p style='font-size: 0.85em; opacity: 0.8; font-style: italic; margin-bottom: 6px;'>Os valores de Unidade desse item só se aplicam caso você esteja carregando-o, ao</p><p style='margin-bottom: 8px; line-height: 1.4;'>invés de equipando-o. Essa Relíquia concede +1 a testes de Intuição ou Percepção, à critério do Narrador. Você pode utilizar a sua Ação Simples  para observar, por 1 minuto, as energias ao arredor de um único Alvo, identificando o seu humor.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Um pequeno monóculo cromático.</p></blockquote>",
      "price": 0,
      "category": "comum",
      "potency": 0,
      "isBound": false,
      "properties": "",
      "unity": 3,
      "equipped": false,
      "quantity": 1,
      "actions": [
        {
          "id": "act00150000001",
          "name": "Ativar: Lentes Caleidoscópicas",
          "description": "Os valores de Unidade desse item só se aplicam caso você esteja carregando-o, ao invés de equipando-o. Essa Relíquia concede +1 a testes de Intuição ou Percepção, à critério do Narrador. Você pode utilizar a sua Ação Simples  para observar, por 1 minuto, as energias ao arredor de um único Alvo, identificando o seu humor.",
          "cost": "",
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
    "effects": []
  },
  {
    "_id": "eqrel00160000000",
    "name": "Máscara das Mil Faces",
    "type": "relic",
    "img": "icons/equipment/head/mask-carved-white.svg",
    "itemKey": "máscara_das_mil_faces",
    "folder": "fldrel0001000000",
    "_key": "!items!eqrel00160000000",
    "system": {
      "name": "Máscara das Mil Faces",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Comum</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 0</span></div><p style='font-size: 0.85em; opacity: 0.8; font-style: italic; margin-bottom: 6px;'>Os valores de Unidade desse item só se aplicam caso você esteja carregando-o, ao</p><p style='margin-bottom: 8px; line-height: 1.4;'>invés de equipando-o. Essa Relíquia concede +1 a testes de Carisma. Ao equipá -la, ela se funde ao seu rosto misticamente, sem modificar a sua aparência. Você pode utilizar a sua Ação Simples para modificar pequenos traços do seu rosto, o suficiente para não ser reconhecido. Esse efeito permanece ativo por 1 hora. Depois de utilizado, esse efeito só poderá ser reutilizado após um Repouso Completo.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Uma máscara simples, de expressão neutra. Ao ser utilizada, ela corresponderá às expectativa s de seus  espectadores, criando uma leve sensação de intimidade com o usuário.</p></blockquote>",
      "price": 0,
      "category": "comum",
      "potency": 0,
      "isBound": false,
      "properties": "",
      "unity": 4,
      "equipped": false,
      "quantity": 1,
      "actions": [
        {
          "id": "act00160000001",
          "name": "Ativar: Máscara das Mil Faces",
          "description": "Os valores de Unidade desse item só se aplicam caso você esteja carregando-o, ao invés de equipando-o. Essa Relíquia concede +1 a testes de Carisma. Ao equipá -la, ela se funde ao seu rosto misticamente, sem modificar a sua aparência. Você pode utilizar a sua Ação Simples para modificar pequenos traços do seu rosto, o suficiente para não ser reconhecido. Esse efeito permanece ativo por 1 hora. Depois de utilizado, esse efeito só poderá ser reutilizado após um Repouso Completo.",
          "cost": "",
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
    "effects": []
  },
  {
    "_id": "eqrel00170000000",
    "name": "O Falso Diabrete",
    "type": "relic",
    "img": "icons/creatures/invertebrates/beetle-horned-brass.svg",
    "itemKey": "o_falso_diabrete",
    "folder": "fldrel0001000000",
    "_key": "!items!eqrel00170000000",
    "system": {
      "name": "O Falso Diabrete",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Comum</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 0</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>Essa Relíquia concede +1 a testes de Intimidação. Você pode utilizar a sua Ação Simples para fazer com que essa Relíquia possa, sorrateiramente, fixar-se a um Alvo a até 1 metro. Quando você estiver distante da Relíquia, você pode identificar a direção na qual ela se encontra.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Um pequeno inseto, feito de palha e cobre, que se fixa e percorre livremente o corpo do usuário, mas prefere seus ombros.</p></blockquote>",
      "price": 0,
      "category": "comum",
      "potency": 0,
      "isBound": false,
      "properties": "",
      "unity": 2,
      "equipped": false,
      "quantity": 1,
      "actions": [
        {
          "id": "act00170000001",
          "name": "Ativar: O Falso Diabrete",
          "description": "Essa Relíquia concede +1 a testes de Intimidação. Você pode utilizar a sua Ação Simples para fazer com que essa Relíquia possa, sorrateiramente, fixar-se a um Alvo a até 1 metro. Quando você estiver distante da Relíquia, você pode identificar a direção na qual ela se encontra.",
          "cost": "",
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
    "effects": []
  },
  {
    "_id": "eqrel00180000000",
    "name": "Rédeas Místicas do Templo Cinzento",
    "type": "relic",
    "img": "icons/commodities/rope/rope-coiled-grey.svg",
    "itemKey": "rédeas_místicas_do_templo_cinzento",
    "folder": "fldrel0001000000",
    "_key": "!items!eqrel00180000000",
    "system": {
      "name": "Rédeas Místicas do Templo Cinzento",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Comum</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 0</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>Você pode utilizar a sua  Ação Ativa para convocar um cavalo semietéreo, que serve de Montaria por 4 horas . Essa Montaria tem efeitos iguais aos de um Cavalo de Carga. Caso a Montaria receba qualquer tipo de  dano, ela será desconvocada. Você pode desconvocar essa montaria a qualquer momento.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Uma pequena corda com símbolos rúnicos , utilizada pela Ordem dos Legionários do Templo Cinzento.</p></blockquote>",
      "price": 0,
      "category": "comum",
      "potency": 0,
      "isBound": false,
      "properties": "",
      "unity": 9,
      "equipped": false,
      "quantity": 1,
      "actions": [
        {
          "id": "act00180000001",
          "name": "Ativar: Rédeas Místicas do Templo Cinzento",
          "description": "Você pode utilizar a sua  Ação Ativa para convocar um cavalo semietéreo, que serve de Montaria por 4 horas . Essa Montaria tem efeitos iguais aos de um Cavalo de Carga. Caso a Montaria receba qualquer tipo de  dano, ela será desconvocada. Você pode desconvocar essa montaria a qualquer momento.",
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
    "effects": []
  },
  {
    "_id": "eqrel00190000000",
    "name": "Trajes Comuns de Tyntanguel",
    "type": "relic",
    "img": "icons/equipment/chest/tunic-simple-brown.svg",
    "itemKey": "trajes_comuns_de_tyntanguel",
    "folder": "fldrel0001000000",
    "_key": "!items!eqrel00190000000",
    "system": {
      "name": "Trajes Comuns de Tyntanguel",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Comum</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 0</span></div><p style='font-size: 0.85em; opacity: 0.8; font-style: italic; margin-bottom: 6px;'>Os valores de Unidade desse item só se aplicam caso você esteja carregando-o, ao</p><p style='margin-bottom: 8px; line-height: 1.4;'>invés de equipando-o. Um traje completo , que muda de aparência de acordo com a vontade do seu usuário. Caso danificado, esse traje se remendará após 6 horas.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Um traje de aparência comum. Realmente não parece ser algo mágico.</p></blockquote>",
      "price": 0,
      "category": "comum",
      "potency": 0,
      "isBound": false,
      "properties": "",
      "unity": 7,
      "equipped": false,
      "quantity": 1,
      "actions": []
    },
    "effects": []
  },
  {
    "_id": "eqrel00200000000",
    "name": "Zapedra",
    "type": "relic",
    "img": "icons/commodities/gems/gem-rough-green.svg",
    "itemKey": "zapedra",
    "folder": "fldrel0001000000",
    "_key": "!items!eqrel00200000000",
    "system": {
      "name": "Zapedra",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Comum</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 0</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>Você se concentra por 1 minuto  para conectar essa Relíquia a uma outra Zapedra que esteja tocando. Você pode utilizar uma Ação Simples para iniciar uma conversa telepática com o Alvo Vinculado à Zapedra conectada à sua. Você pode manter a conversa telepática por 10 minutos, ou até que o Alvo conectado encerre a conexão telepática. Depois de utilizada, essa Relíquia só poderá ser reutilizada após um Repouso Completo.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Uma pequena pedra esverdeada com um símbolo místico no centro, capaz de conectar dois usuários, independente da distância.</p></blockquote>",
      "price": 0,
      "category": "comum",
      "potency": 0,
      "isBound": false,
      "properties": "",
      "unity": 4,
      "equipped": false,
      "quantity": 1,
      "actions": [
        {
          "id": "act00200000001",
          "name": "Ativar: Zapedra",
          "description": "Você se concentra por 1 minuto  para conectar essa Relíquia a uma outra Zapedra que esteja tocando. Você pode utilizar uma Ação Simples para iniciar uma conversa telepática com o Alvo Vinculado à Zapedra conectada à sua. Você pode manter a conversa telepática por 10 minutos, ou até que o Alvo conectado encerre a conexão telepática. Depois de utilizada, essa Relíquia só poderá ser reutilizada após um Repouso Completo.",
          "cost": "",
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
    "effects": []
  },
  {
    "_id": "eqrel00210000000",
    "name": "Amuleto da Sorte",
    "type": "relic",
    "img": "icons/equipment/neck/amulet-round-gold-green.svg",
    "itemKey": "amuleto_da_sorte",
    "folder": "fldrel0002000000",
    "_key": "!items!eqrel00210000000",
    "system": {
      "name": "Amuleto da Sorte",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Incomum</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 1</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>Um acessório à escolha do Narrador, que faz com que , sempre que o seu usuário causar um dano ou regenerar Pontos de Vida por meio de uma rolagem de dados — e o resultado de um desses dados for 1, o usuário poderá rolar novamente esse dado, ficando com o novo resultado.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Existem diversos tipos de amuletos da sorte, alguns utilizam uma moeda, outros, um pedaço de pano, mas o importante é acreditar que isso funciona, certo?</p></blockquote>",
      "price": 0,
      "category": "incomum",
      "potency": 1,
      "isBound": false,
      "properties": "",
      "unity": 4,
      "equipped": false,
      "quantity": 1,
      "actions": []
    },
    "effects": []
  },
  {
    "_id": "eqrel00220000000",
    "name": "Anéis Gêmeos",
    "type": "relic",
    "img": "icons/equipment/finger/ring-band-engraved-blue.svg",
    "itemKey": "anéis_gêmeos",
    "folder": "fldrel0002000000",
    "_key": "!items!eqrel00220000000",
    "system": {
      "name": "Anéis Gêmeos",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Incomum</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 1</span> <span style='font-size: 0.85em; opacity: 0.8;'><em>* 1 Unidade por anel.</em></span></div><p style='margin-bottom: 8px; line-height: 1.4;'>Os valores de Unidade desse item só se aplicam caso você esteja carr egando-o, ao invés de equipando-o. Caso dois Alvos diferentes estejam utilizando esses anéis, um deles poderá utilizar a sua Ação Rápida para trocar de lugar com o outro, caso ele esteja até 8 metros. Depois de utilizada, essa Relíquia só poderá ser reutilizada após um Repouso Completo. O conjunto de anéis aplica um único ponto de Potência em um dos seus usuários quando Vinculado.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Um par de anéis , feitos de  um metal azulado . Possuem um símbolo entalhado, conectando-os misticamente.</p></blockquote>",
      "price": 0,
      "category": "incomum",
      "potency": 1,
      "isBound": false,
      "properties": "",
      "unity": 1,
      "equipped": false,
      "quantity": 1,
      "actions": [
        {
          "id": "act00220000001",
          "name": "Ativar: Anéis Gêmeos",
          "description": "Os valores de Unidade desse item só se aplicam caso você esteja carr egando-o, ao invés de equipando-o. Caso dois Alvos diferentes estejam utilizando esses anéis, um deles poderá utilizar a sua Ação Rápida para trocar de lugar com o outro, caso ele esteja até 8 metros. Depois de utilizada, essa Relíquia só poderá ser reutilizada após um Repouso Completo. O conjunto de anéis aplica um único ponto de Potência em um dos seus usuários quando Vinculado.",
          "cost": "",
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
    "effects": []
  },
  {
    "_id": "eqrel00230000000",
    "name": "Anel de Fortalecimento",
    "type": "relic",
    "img": "icons/equipment/finger/ring-gem-ruby-gold.svg",
    "itemKey": "anel_de_fortalecimento",
    "folder": "fldrel0002000000",
    "_key": "!items!eqrel00230000000",
    "system": {
      "name": "Anel de Fortalecimento",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Incomum</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 1</span></div><p style='font-size: 0.85em; opacity: 0.8; font-style: italic; margin-bottom: 6px;'>Os valores de Unidade desse item só se aplicam caso você esteja carregando-o, ao</p><p style='margin-bottom: 8px; line-height: 1.4;'>invés de equipando-o.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Um acessório que fortalece um Parâmetro à escolha do Narrador. Alvos equipados com esse acessório recebem 1 ponto no Parâmetro escolhido. Esse valor pode ultrapassar o valor máximo de Parâmetros. Os maiores aventureiros da Antiga Auroria utilizavam certos anéis , que faziam com que o seu Véu se despertasse ainda mais.</p></blockquote>",
      "price": 0,
      "category": "incomum",
      "potency": 1,
      "isBound": false,
      "properties": "",
      "unity": 1,
      "equipped": false,
      "quantity": 1,
      "actions": []
    },
    "effects": []
  },
  {
    "_id": "eqrel00240000000",
    "name": "Cajado Restaurador",
    "type": "relic",
    "img": "icons/weapons/staves/staff-ornate-gold.svg",
    "itemKey": "cajado_restaurador",
    "folder": "fldrel0002000000",
    "_key": "!items!eqrel00240000000",
    "system": {
      "name": "Cajado Restaurador",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Incomum</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 1</span> <span style='background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255,255,255,0.3); padding: 2px 6px; border-radius: 4px;'>Catalisador Místico</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>Enquanto estiver em combate, a primeira regeneração de Pontos de Vida realizada por você durante o seu turno é aumentada em 1d8. Esse efeito não afeta Poções.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Um cajado feito a partir de uma madeira antiga, com linhas encrustadas que, ao ser utilizado, exala fagulhas douradas.</p></blockquote>",
      "price": 0,
      "category": "incomum",
      "potency": 1,
      "isBound": false,
      "properties": "Catalisador Místico",
      "unity": 16,
      "equipped": false,
      "quantity": 1,
      "actions": []
    },
    "effects": []
  },
  {
    "_id": "eqrel00250000000",
    "name": "Colar dos Desbravadores dos Mares",
    "type": "relic",
    "img": "icons/equipment/neck/necklace-pearl-blue.svg",
    "itemKey": "colar_dos_desbravadores_dos_mares",
    "folder": "fldrel0002000000",
    "_key": "!items!eqrel00250000000",
    "system": {
      "name": "Colar dos Desbravadores dos Mares",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Incomum</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 1</span></div><p style='font-size: 0.85em; opacity: 0.8; font-style: italic; margin-bottom: 6px;'>Os valores de Unidade desse item só se aplicam caso você esteja carregando-o, ao</p><p style='margin-bottom: 8px; line-height: 1.4;'>invés de equipando-o. Essa Relíquia concede +1 a testes de Exploração. Esse acessório faz com que você possa enxergar e respirar embaixo d'água, além de não ser afetado pelos efeitos de Combate Aquático.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Uma aliança de bravos aventureiros da Antiga Auroria criou diversos colares, que faziam com que seus membros percorressem e enfrentassem os perigos dos mares com mais facilidade.</p></blockquote>",
      "price": 0,
      "category": "incomum",
      "potency": 1,
      "isBound": false,
      "properties": "",
      "unity": 4,
      "equipped": false,
      "quantity": 1,
      "actions": []
    },
    "effects": []
  },
  {
    "_id": "eqrel00260000000",
    "name": "Coração de Kuldrana",
    "type": "relic",
    "img": "icons/equipment/neck/amulet-crystal-blue.svg",
    "itemKey": "coração_de_kuldrana",
    "folder": "fldrel0002000000",
    "_key": "!items!eqrel00260000000",
    "system": {
      "name": "Coração de Kuldrana",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Incomum</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 1</span></div><p style='font-size: 0.85em; opacity: 0.8; font-style: italic; margin-bottom: 6px;'>Os valores de Unidade desse item só se aplicam caso você esteja carregando-o, ao</p><p style='margin-bottom: 8px; line-height: 1.4;'>invés de equipando-o. Um colar que concede os seguintes efeitos:</p><ul style='margin: 6px 0 10px 20px; padding: 0;'><li>+1 em testes de Vontade.</li><li>Imunidade a Frio Elevado e Frio Extremo.</li></ul><p style='margin-bottom: 8px; line-height: 1.4;'>Você ignora uma Condição Mágica ou Efeito Negativo que fosse receber. Depois de utilizado, esse efeito só poderá ser reutilizado após um Repouso Completo.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Um colar importante para o povo ursar, utilizado principalmente pelos seus líderes tribais após rituais de passagem.</p></blockquote>",
      "price": 0,
      "category": "incomum",
      "potency": 1,
      "isBound": false,
      "properties": "",
      "unity": 4,
      "equipped": false,
      "quantity": 1,
      "actions": []
    },
    "effects": []
  },
  {
    "_id": "eqrel00270000000",
    "name": "Flauta do Oasis",
    "type": "relic",
    "img": "icons/tools/instruments/flute-carved-wood.svg",
    "itemKey": "flauta_do_oasis",
    "folder": "fldrel0002000000",
    "_key": "!items!eqrel00270000000",
    "system": {
      "name": "Flauta do Oasis",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Incomum</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 1</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>Essa Relíquia concede +1 a testes de Performance. Ao iniciar um combate, antes da rolagem de Iniciativa, você pode realizar um dos seguintes efeitos:</p><ul style='margin: 6px 0 10px 20px; padding: 0;'><li>Você, e todos os Alvos Aliados a até 4 metros, recebem +1 em todo</li></ul><p style='margin-bottom: 8px; line-height: 1.4;'>teste de Parâmetro na primeira rodada desse combate.</p><ul style='margin: 6px 0 10px 20px; padding: 0;'><li>Todos os Alvos Inimigos a até 4 metros recebem -1 em todo teste</li></ul><p style='margin-bottom: 8px; line-height: 1.4;'>de Parâmetro na primeira rodada desse combate. Depois de utilizada, essa Relíquia só poderá ser reutilizada após um Repouso Completo.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Uma pequena flauta de madeira escura, com pigmentos e cristais esverdeados.</p></blockquote>",
      "price": 0,
      "category": "incomum",
      "potency": 1,
      "isBound": false,
      "properties": "",
      "unity": 8,
      "equipped": false,
      "quantity": 1,
      "actions": []
    },
    "effects": []
  },
  {
    "_id": "eqrel00280000000",
    "name": "Insígnia da Lareira",
    "type": "relic",
    "img": "icons/commodities/treasure/medallion-ruby.svg",
    "itemKey": "insígnia_da_lareira",
    "folder": "fldrel0002000000",
    "_key": "!items!eqrel00280000000",
    "system": {
      "name": "Insígnia da Lareira",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Incomum</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 1</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>Você se concentra por 10 minutos para vincular essa Relíquia a um ponto que esteja tocando. Ao canalizar o Véu por 1 minuto, você poderá se teletransportar para o ponto vinculado à Relíquia. Depois de utilizada, essa Relíquia só poderá ser reutilizada após 5 dias.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Um medalhão de pedra avermelhada, com ornamentos cor de bronze.</p></blockquote>",
      "price": 0,
      "category": "incomum",
      "potency": 1,
      "isBound": false,
      "properties": "",
      "unity": 4,
      "equipped": false,
      "quantity": 1,
      "actions": []
    },
    "effects": []
  },
  {
    "_id": "eqrel00290000000",
    "name": "Manto de Vento e Luar",
    "type": "relic",
    "img": "icons/equipment/back/cloak-layered-grey.svg",
    "itemKey": "manto_de_vento_e_luar",
    "folder": "fldrel0002000000",
    "_key": "!items!eqrel00290000000",
    "system": {
      "name": "Manto de Vento e Luar",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Incomum</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 1</span> <span style='background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255,255,255,0.3); padding: 2px 6px; border-radius: 4px;'>Manto</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>Essa Relíquia concede +1 a testes de Furtividade. Você pode utilizar a sua Ação Simples de modo que, a partir de você, toda a área  a até 3 metros  seja afetada pelo  Efeito Climático Névoa. Enquanto você estiver em um ambiente com Névoa, todo s os Alvos possuirão Inaptidão em testes de Percepção para encontrá-lo. Depois de utilizada, essa Relíquia só poderá ser reutilizada após um Repouso Completo.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Um manto acinzentado e puído. De acordo com o movimento de quem a utiliza, uma névoa sutil aparece e desaparece.</p></blockquote>",
      "price": 0,
      "category": "incomum",
      "potency": 1,
      "isBound": false,
      "properties": "Manto",
      "unity": 5,
      "equipped": false,
      "quantity": 1,
      "actions": [
        {
          "id": "act00290000001",
          "name": "Ativar: Manto de Vento e Luar",
          "description": "Essa Relíquia concede +1 a testes de Furtividade. Você pode utilizar a sua Ação Simples de modo que, a partir de você, toda a área  a até 3 metros  seja afetada pelo  Efeito Climático Névoa. Enquanto você estiver em um ambiente com Névoa, todo s os Alvos possuirão Inaptidão em testes de Percepção para encontrá-lo. Depois de utilizada, essa Relíquia só poderá ser reutilizada após um Repouso Completo.",
          "cost": "",
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
    "effects": []
  },
  {
    "_id": "eqrel00300000000",
    "name": "Os Convites de Siva'Loh",
    "type": "relic",
    "img": "icons/commodities/treasure/token-gold-gem.svg",
    "itemKey": "os_convites_de_sivaloh",
    "folder": "fldrel0002000000",
    "_key": "!items!eqrel00300000000",
    "system": {
      "name": "Os Convites de Siva'Loh",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Incomum</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 1</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>Um pequeno envelope do qual, ao ser aberto , uma barraca simples saltará, montando-se instantaneamente. Você deve escolher até cinco Alvos Aliados, contando com você, que podem entrar na barraca. Criaturas Aliadas podem entrar sem contar no seu limite máximo. Quando você entrar, a barraca desaparecerá do plano atual. Ao entrar, o personagem encontrará uma enorme mansão, com cozinha repleta de alimentos e bebidas, uma sala de jogos personalizada, área de exercícios e estudos, templos,  salas de ensaio artístico e cinco grandes quartos espaçosos.  Todos os cômodos da mansão são confortáveis, climatizados e limpos. Vultos de Legados também est arão presentes na mansão, prontos para prestar qualquer auxílio. Passadas 6 horas dentro da mansão — ou quando o personagem Vinculado à Relíquia desejar — a barraca reaparecerá na dimensão onde foi aberta, expulsando delicadamente quem estiver dentro dela.  Nenhum item ou equipamento pode ser armazenado dentro da mansão, que serão removidos quando o personagem Vinculado desfizer o efeito da Relíquia. Após o reaparecimento da barraca, ela não poderá ser utilizada novamente por 24 horas . essa Relíquia não pode ser utilizada enquanto estiver em combate.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Em tempos perdidos, um  magnata desconhecido comprou parte dos distritos ao norte de Alderium  para construir uma mansão  exuberante. Depois de pronta, foi abandonada, mas, do dia para a noite, desapareceu.</p></blockquote>",
      "price": 0,
      "category": "incomum",
      "potency": 1,
      "isBound": false,
      "properties": "",
      "unity": 1,
      "equipped": false,
      "quantity": 1,
      "actions": []
    },
    "effects": []
  },
  {
    "_id": "eqrel00310000000",
    "name": "Pingente dos Antigos Inquisidores",
    "type": "relic",
    "img": "icons/equipment/neck/pendant-silver-gem-purple.svg",
    "itemKey": "pingente_dos_antigos_inquisidores",
    "folder": "fldrel0002000000",
    "_key": "!items!eqrel00310000000",
    "system": {
      "name": "Pingente dos Antigos Inquisidores",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Incomum</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 1</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>Você consegue sentir toda Conjuração realizada a até 10 metros de você. A qualquer momento, sem custo de Ação, você poderá utilizar essa Relíquia para interromper e cancelar uma Conjuração vigente a até 6 metros. Depois de utilizado, esse efeito só poderá ser reutilizado após um Repouso Completo.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Um antigo pingente de prata e ouro , com uma pequena joia púrpura e linhas vermelhas em seu interior.</p></blockquote>",
      "price": 0,
      "category": "incomum",
      "potency": 1,
      "isBound": false,
      "properties": "",
      "unity": 4,
      "equipped": false,
      "quantity": 1,
      "actions": []
    },
    "effects": []
  },
  {
    "_id": "eqrel00320000000",
    "name": "Sinete das Maravilhas",
    "type": "relic",
    "img": "icons/equipment/finger/ring-signet-gold.svg",
    "itemKey": "sinete_das_maravilhas",
    "folder": "fldrel0002000000",
    "_key": "!items!eqrel00320000000",
    "system": {
      "name": "Sinete das Maravilhas",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Incomum</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 1</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>Essa Relíquia concede +1 a testes de Conhecimento Místico. Você pode utilizar uma Conjuração sua que possua 3 ou menos em seu custo de Pontos de Energia sem gastar os seus Pontos de Energia. Depois de utilizado, esse efeito só poderá ser reutilizado após um Repouso Completo.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Um pequeno sinete, utilizado por conjuradores da Antiga Auroria durante os seus treinamentos.</p></blockquote>",
      "price": 0,
      "category": "incomum",
      "potency": 1,
      "isBound": false,
      "properties": "",
      "unity": 5,
      "equipped": false,
      "quantity": 1,
      "actions": []
    },
    "effects": []
  },
  {
    "_id": "eqrel00330000000",
    "name": "Vassoura Encantada",
    "type": "relic",
    "img": "icons/sundries/survival/broom-straw.svg",
    "itemKey": "vassoura_encantada",
    "folder": "fldrel0002000000",
    "_key": "!items!eqrel00330000000",
    "system": {
      "name": "Vassoura Encantada",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Incomum</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 1</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>Você pode utilizar a sua Ação Ativa para encantar essa vassoura, de modo que ela possa ser utilizada como Montaria por 1 hora. Você pode desconvocá-la a qualquer momento.  Essa Montaria pode transportar até dois Alvos de Categoria de Tamanho Pequeno ou Médio. Essa Montaria pode Voar e possui 9 metros de Movimentação. Depois de utilizada, essa Relíquia só poderá ser reutilizada após um Repouso Completo.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Uma vassoura velha de madeira avermelhada escura, com algumas rachaduras e um leve brilho místico.</p></blockquote>",
      "price": 0,
      "category": "incomum",
      "potency": 1,
      "isBound": false,
      "properties": "",
      "unity": 16,
      "equipped": false,
      "quantity": 1,
      "actions": [
        {
          "id": "act00330000001",
          "name": "Ativar: Vassoura Encantada",
          "description": "Você pode utilizar a sua Ação Ativa para encantar essa vassoura, de modo que ela possa ser utilizada como Montaria por 1 hora. Você pode desconvocá-la a qualquer momento.  Essa Montaria pode transportar até dois Alvos de Categoria de Tamanho Pequeno ou Médio. Essa Montaria pode Voar e possui 9 metros de Movimentação. Depois de utilizada, essa Relíquia só poderá ser reutilizada após um Repouso Completo.",
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
    "effects": []
  },
  {
    "_id": "eqrel00340000000",
    "name": "Pedra Rúnica:  Armadura e Escudo",
    "type": "relic",
    "img": "icons/commodities/treasure/token-gold-gem.svg",
    "itemKey": "pedra_rúnica__armadura_e_escudo",
    "folder": "fldrel0002000000",
    "_key": "!items!eqrel00340000000",
    "system": {
      "name": "Pedra Rúnica:  Armadura e Escudo",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Incomum</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 1</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>Durante 1 minuto , você extrai o poder dessa pedra antiga, aplicando um dos seguintes efeitos — à escolha do Narrador — a uma Armadura ou Escudo que você possua:</p><ul style='margin: 6px 0 10px 20px; padding: 0;'><li><strong>Fortitude:</strong> Enquanto estiver equipado com esse equipamento, todo</li></ul><p style='margin-bottom: 8px; line-height: 1.4;'>Dano Físico recebido é reduzido em 1d8.</p><ul style='margin: 6px 0 10px 20px; padding: 0;'><li><strong>Fortitude Mística :</strong> Enquanto  estiver equipado com esse</li></ul><p style='margin-bottom: 8px; line-height: 1.4;'>equipamento, todo Dano Mágico recebido é reduzido em 1d8.</p><ul style='margin: 6px 0 10px 20px; padding: 0;'><li><strong>Pulso Imaterial:</strong> Caso você receba qualquer tipo de dano enquanto</li></ul><p style='margin-bottom: 8px; line-height: 1.4;'>estiver equipado com esse equipamento, você poderá criar uma onda sônica ao seu redor . Todo Alvo a até 2 metros precisará realizar um teste de Vigor, Dif. 8. Caso falhem, receberão o seu total máximo de Pontos de Energia como Dano Mágico Imaterial, além de ser em empurrados 1d4 metros para trás. esse efeito ocorre apenas uma vez por rodada.</p><ul style='margin: 6px 0 10px 20px; padding: 0;'><li><strong>Salvaguarda:</strong> Enquanto  estiver equipado com esse equipamento,</li></ul><p style='margin-bottom: 8px; line-height: 1.4;'>você possui Prioridade e +1 em testes de Bloqueio. Depois de ter o seu poder extraído, a pedra é destruída, tornando o seu efeito permanente na Armadura ou Escudo. O item afetado se torna uma Relíquia com 1 de Potência. Cada tipo de efeito gerado por Pedra Rúnica : Armadura e Escudo só poderá estar presente  uma vez em uma mesma Armadura ou Escudo. Caso a Armadura ou Escudo já seja uma Relíquia, aumente a sua Potência em 1.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Uma pequena pedra antiga, com um símbolo místico pronto para ser extraído.</p></blockquote>",
      "price": 0,
      "category": "incomum",
      "potency": 1,
      "isBound": false,
      "properties": "",
      "unity": 4,
      "equipped": false,
      "quantity": 1,
      "actions": []
    },
    "effects": []
  },
  {
    "_id": "eqrel00350000000",
    "name": "Pedra Rúnica:  Armamento",
    "type": "relic",
    "img": "icons/commodities/treasure/token-gold-gem.svg",
    "itemKey": "pedra_rúnica__armamento",
    "folder": "fldrel0002000000",
    "_key": "!items!eqrel00350000000",
    "system": {
      "name": "Pedra Rúnica:  Armamento",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Incomum</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 1</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>Durante 1 minuto , você extrai o poder dessa pedra antiga, aplicando um dos seguintes efeitos — à escolha do Narrador — a um Armamento que você possua:</p><ul style='margin: 6px 0 10px 20px; padding: 0;'><li><strong>Dano Elemental:</strong> O Narrador escolhe um tipo de  Dano Mágico</li></ul><p style='margin-bottom: 8px; line-height: 1.4;'>elemental: Fogo, Água, Vento, Terra, Trovão, Gelo, Natureza, Profano, Trevas ou Luz. O primeiro dano causado por esse Armamento em um turno é aumentado em 1d8 como Dano Mágico do tipo elemental atribuído. Caso esse dano seja causado em múltiplos Alvos, o aumento de dano afetará somente um Alvo.</p><ul style='margin: 6px 0 10px 20px; padding: 0;'><li><strong>Drenar:</strong> Ao final de um turno no qual você tenha causado dano em</li></ul><p style='margin-bottom: 8px; line-height: 1.4;'>um Alvo com esse Armamento, você regenerará 1d8 Pontos de Vida. Esse efeito ocorre apenas uma vez por turno.</p><ul style='margin: 6px 0 10px 20px; padding: 0;'><li><strong>Taxa Crítica:</strong> A diferença necessária para que você cause um Acerto</li></ul><p style='margin-bottom: 8px; line-height: 1.4;'>Crítico com esse Armamento é reduzida em 1.</p><ul style='margin: 6px 0 10px 20px; padding: 0;'><li><strong>Retorno Místico:</strong> Caso esse Armamento esteja a até 8 metros de</li></ul><p style='margin-bottom: 8px; line-height: 1.4;'>você, você poderá utilizar uma Ação Simples  para fazer com o equipamento retorne misticamente, desaparecendo do seu local de origem e aparecendo em sua mão. Depois de ter o seu poder extraído, a pedra é destruída, tornando o seu efeito permanente no Armamento. O item afetado se torna uma Relíquia com 1 de Potência. Cada tipo de efeito gerado por Pedra Rúnica : Armamento só poderá estar presente uma vez em um mesmo Armamento. Caso esse Armamento já seja uma Relíquia, aumente a sua Potência em 1.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Uma pequena pedra antiga, com um símbolo místico pronto para ser extraído.</p></blockquote>",
      "price": 0,
      "category": "incomum",
      "potency": 1,
      "isBound": false,
      "properties": "",
      "unity": 4,
      "equipped": false,
      "quantity": 1,
      "actions": [
        {
          "id": "act00350000001",
          "name": "Ativar: Pedra Rúnica:  Armamento",
          "description": "Durante 1 minuto , você extrai o poder dessa pedra antiga, aplicando um dos seguintes efeitos — à escolha do Narrador — a um Armamento que você possua: • Dano Elemental: O Narrador escolhe um tipo de  Dano Mágico elemental: Fogo, Água, Vento, Terra, Trovão, Gelo, Natureza, Profano, Trevas ou Luz. O primeiro dano causado por esse Armamento em um turno é aumentado em 1d8 como Dano Mágico do tipo elemental atribuído. Caso esse dano seja causado em múltiplos Alvos, o aumento de dano afetará somente um Alvo. • Drenar: Ao final de um turno no qual você tenha causado dano em um Alvo com esse Armamento, você regenerará 1d8 Pontos de Vida. Esse efeito ocorre apenas uma vez por turno. • Taxa Crítica: A diferença necessária para que você cause um Acerto Crítico com esse Armamento é reduzida em 1. • Retorno Místico: Caso esse Armamento esteja a até 8 metros de você, você poderá utilizar uma Ação Simples  para fazer com o equipamento retorne misticamente, desaparecendo do seu local de origem e aparecendo em sua mão. Depois de ter o seu poder extraído, a pedra é destruída, tornando o seu efeito permanente no Armamento. O item afetado se torna uma Relíquia com 1 de Potência. Cada tipo de efeito gerado por Pedra Rúnica : Armamento só poderá estar presente uma vez em um mesmo Armamento. Caso esse Armamento já seja uma Relíquia, aumente a sua Potência em 1.",
          "cost": "",
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
    "effects": []
  },
  {
    "_id": "eqrel00360000000",
    "name": "Rouxinol Sangrento",
    "type": "relic",
    "img": "icons/weapons/swords/katana-steel-red.svg",
    "itemKey": "rouxinol_sangrento",
    "folder": "fldrel0003000000",
    "_key": "!items!eqrel00360000000",
    "system": {
      "name": "Rouxinol Sangrento",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Rara</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 2</span> <span style='background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255,255,255,0.3); padding: 2px 6px; border-radius: 4px;'>Espada Longa</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>O Dano Base desse Armamento é 6. Esse Armamento possui a Propriedade adicional Afiado. Ao final de um turno no qual você tenha causado dano em um Alvo com Sangramento, você regenerará um valor de Pontos de Vida equivalente à metade do seu total máximo de Pontos de Energia. Esse efeito ocorre apenas uma vez por turno.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Uma lâmina levemente curvada, de origem Narzepiana. Comumente vista em cerimônias e nas lápides de grandes guerreiros mortos em combate, demonstrando o legado desses combatentes , que um dia utiliza ram a lâmina para ceifar e absorver para si os sentimentos dos seus inimigos.</p></blockquote>",
      "price": 0,
      "category": "rara",
      "potency": 2,
      "isBound": false,
      "properties": "Espada Longa",
      "unity": 20,
      "equipped": false,
      "quantity": 1,
      "actions": [
        {
          "id": "act00360000001",
          "name": "Golpe com Rouxinol Sangrento",
          "description": "Ataque com Rouxinol Sangrento. Dano Base: 6.",
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
            "formula": "6",
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
            "targetLimit": ""
          }
        }
      ]
    },
    "effects": []
  },
  {
    "_id": "eqrel00370000000",
    "name": "Perseguidor da Lua",
    "type": "relic",
    "img": "icons/weapons/miscellaneous/whip-glowing-blue.svg",
    "itemKey": "perseguidor_da_lua",
    "folder": "fldrel0003000000",
    "_key": "!items!eqrel00370000000",
    "system": {
      "name": "Perseguidor da Lua",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Rara</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 2</span> <span style='background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255,255,255,0.3); padding: 2px 6px; border-radius: 4px;'>Berloque de Energia</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>O Dano Base desse Armamento é 3. Esse Armamento possui 2 metros adicionais de alcance. Caso você esteja equipado com outro Berloque de Energia , ele também receberá 2 metros adicionais de alcance. Caso você tenha atingido um Alvo com esse Armamento, e o Resultado Natural do Ataque Mágico (Canalização) tenha sido 10, ou mais, você aplicará Imóvel no Alvo até o final do próximo turno do Alvo. O primeiro dano causado pelo Armamento em um turno é aumentado em 1d10 como Dano Mágico de Natureza.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Diferente de um berloque de energia tradicional, esse armamento foi construído a partir de um cabo brilhoso de prata ornado e retorcido. Ao ser utilizado, tiras de energia se entrelaçam , formando um chicote  azul espectral. Nas noites em que Yeyt está completamente cheia, o brilho desse armamento floresce ainda mais.</p></blockquote>",
      "price": 0,
      "category": "rara",
      "potency": 2,
      "isBound": false,
      "properties": "Berloque de Energia",
      "unity": 5,
      "equipped": false,
      "quantity": 1,
      "actions": [
        {
          "id": "act00370000001",
          "name": "Golpe com Perseguidor da Lua",
          "description": "Ataque com Perseguidor da Lua. Dano Base: 3.",
          "cost": "",
          "type": {
            "actionType": "acaoAtiva",
            "category": "ataque_corpo_a_corpo",
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
            "formula": "3",
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
            "targetLimit": ""
          }
        }
      ]
    },
    "effects": []
  },
  {
    "_id": "eqrel00380000000",
    "name": "Meia-Noite",
    "type": "relic",
    "img": "icons/weapons/bows/longbow-recurve-shadow.svg",
    "itemKey": "meia-noite",
    "folder": "fldrel0003000000",
    "_key": "!items!eqrel00380000000",
    "system": {
      "name": "Meia-Noite",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Rara</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 2</span> <span style='background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255,255,255,0.3); padding: 2px 6px; border-radius: 4px;'>Arco</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>O Dano Base desse Armamento é 5. Esse Armamento materializa um projétil físico ao ser utilizado, portanto não necessita de flechas. Caso você tenha atingido um Alvo com esse Armamento, e o Resultado Natural do Ataque Físico (Precisão) tenha sido 10, ou mais, você aplicará Escuridão Mística  no Alvo. Esse efeito permanece até o final do próximo turno do Alvo. O primeiro dano causado pelo Armamento em um turno é aumentado em 1d10 como Dano Mágico de Trevas.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Um arco de madeira acinzentada. Pequenos reforços de ferro nas suas extremidades fazem com que o vento sussurre algo indistinguível, cada vez que um projétil é disparado.</p></blockquote>",
      "price": 0,
      "category": "rara",
      "potency": 2,
      "isBound": false,
      "properties": "Arco",
      "unity": 17,
      "equipped": false,
      "quantity": 1,
      "actions": [
        {
          "id": "act00380000001",
          "name": "Golpe com Meia-Noite",
          "description": "Ataque com Meia-Noite. Dano Base: 5.",
          "cost": "",
          "type": {
            "actionType": "acaoAtiva",
            "category": "ataque_distancia",
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
            "formula": "5",
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
            "targetLimit": ""
          }
        }
      ]
    },
    "effects": []
  },
  {
    "_id": "eqrel00390000000",
    "name": "Lágrima Negra de Darnawel",
    "type": "relic",
    "img": "icons/weapons/staves/staff-skull-purple.svg",
    "itemKey": "lágrima_negra_de_darnawel",
    "folder": "fldrel0003000000",
    "_key": "!items!eqrel00390000000",
    "system": {
      "name": "Lágrima Negra de Darnawel",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Rara</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 2</span> <span style='background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255,255,255,0.3); padding: 2px 6px; border-radius: 4px;'>Catalisador Místico</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>O Dano Base desse Catalisador Místico é 5. Se você estiver com uma Condição Mágica ao causar dano em um Alvo com esse Armamento, você poderá aplicar essa mesma Condição Mágica no seu Alvo. Sempre que um Alvo realizar um teste de Espírito para remover uma Condição Mágica aplicada por você, e le receberá 1d10 de Dano Mágico Profano. Esse efeito ocorre apenas uma vez por turno.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Um cajado remendado com vinhas secas, possuindo um pequeno cristal púrpura no seu centro, que pulsa lentamente.</p></blockquote>",
      "price": 0,
      "category": "rara",
      "potency": 2,
      "isBound": false,
      "properties": "Catalisador Místico",
      "unity": 16,
      "equipped": false,
      "quantity": 1,
      "actions": [
        {
          "id": "act00390000001",
          "name": "Golpe com Lágrima Negra de Darnawel",
          "description": "Ataque com Lágrima Negra de Darnawel. Dano Base: 5.",
          "cost": "",
          "type": {
            "actionType": "acaoAtiva",
            "category": "ataque_corpo_a_corpo",
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
            "formula": "5",
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
            "targetLimit": ""
          }
        }
      ]
    },
    "effects": []
  },
  {
    "_id": "eqrel00400000000",
    "name": "Lâmina dos Pecadores",
    "type": "relic",
    "img": "icons/weapons/daggers/dagger-ritual-silver.svg",
    "itemKey": "lâmina_dos_pecadores",
    "folder": "fldrel0003000000",
    "_key": "!items!eqrel00400000000",
    "system": {
      "name": "Lâmina dos Pecadores",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Rara</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 2</span> <span style='background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255,255,255,0.3); padding: 2px 6px; border-radius: 4px;'>Adaga</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>O Dano Base desse Armamento é 3. Sempre que você causar dano com esse Armamento, metade do dano será convertido em Dano Imaterial. Sempre que você realizar um Ataque Físico  com esse Armamento contra um Alvo, ele não poderá ser afetado por Aptidão e Prioridade no seu teste de Defesa.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Uma adaga de prata , cuja lâmina escurecida é  envelhecida pelo tempo. Utilizada nos Rituais de Mavalek e confiada aos Legionários Cinzentos, essa arma simboliza a história daqueles que guardam os Portões Sombrios.</p></blockquote>",
      "price": 0,
      "category": "rara",
      "potency": 2,
      "isBound": false,
      "properties": "Adaga",
      "unity": 8,
      "equipped": false,
      "quantity": 1,
      "actions": [
        {
          "id": "act00400000001",
          "name": "Golpe com Lâmina dos Pecadores",
          "description": "Ataque com Lâmina dos Pecadores. Dano Base: 3.",
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
            "formula": "3",
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
            "targetLimit": ""
          }
        }
      ]
    },
    "effects": []
  },
  {
    "_id": "eqrel00410000000",
    "name": "Brasas de Raar'Kreta",
    "type": "relic",
    "img": "icons/commodities/treasure/token-gold-gem.svg",
    "itemKey": "brasas_de_raarkreta",
    "folder": "fldrel0003000000",
    "_key": "!items!eqrel00410000000",
    "system": {
      "name": "Brasas de Raar'Kreta",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Rara</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 2</span> <span style='background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255,255,255,0.3); padding: 2px 6px; border-radius: 4px;'>Machado Pesado</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>O Dano Base desse Armamento é 6. Caso você tenha atingido um Alvo com esse Armamento, e o Resultado Natural do Ataque Físico (Precisão) tenha sido 10, ou mais, você poderá causar metade do dano total desse Armamento como Dano Mágico de Fogo em um novo Alvo a 2 metros do Alvo original. O primeiro dano causado pelo Armamento durante um turno é aumentado em 1d10 como Dano Mágico de Fogo.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Um Machado de Guerra forjado no coração de Drakar, feito de Kuldrana . Exala chamas  vívidas, que aquecem o corpo e o Véu daqueles que o empunham.</p></blockquote>",
      "price": 0,
      "category": "rara",
      "potency": 2,
      "isBound": false,
      "properties": "Machado Pesado",
      "unity": 18,
      "equipped": false,
      "quantity": 1,
      "actions": [
        {
          "id": "act00410000001",
          "name": "Golpe com Brasas de Raar'Kreta",
          "description": "Ataque com Brasas de Raar'Kreta. Dano Base: 6.",
          "cost": "",
          "type": {
            "actionType": "acaoAtiva",
            "category": "ataque_corpo_a_corpo",
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
            "formula": "6",
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
            "targetLimit": ""
          }
        }
      ]
    },
    "effects": []
  },
  {
    "_id": "eqrel00420000000",
    "name": "Glubgar",
    "type": "relic",
    "img": "icons/weapons/guns/gun-pistol-metal.svg",
    "itemKey": "glubgar",
    "folder": "fldrel0003000000",
    "_key": "!items!eqrel00420000000",
    "system": {
      "name": "Glubgar",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Rara</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 2</span> <span style='background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255,255,255,0.3); padding: 2px 6px; border-radius: 4px;'>Revólvermosquete</span> <span style='font-size: 0.85em; opacity: 0.8;'><em>* Unidade: 9 (Revólver) ou 19 (Mosquete).</em></span></div><p style='margin-bottom: 8px; line-height: 1.4;'>Ao equipar esse Armamento, você deverá escolher se será um Revólver ou um Mosquete. Seu Dano Base, enquanto, Revolver é 4. Seu Dano Base, enquanto, Mosquete é 7. Esse Armamento materializa um projétil físico ao ser utilizado, portanto não necessita de munições. Você pode utilizar  uma Ação Simples  para trocar o tipo do Armamento, entre Revólver e Mosquete. O primeiro dano causado pelo Armamento durante um turno é aumentado em 1d10 como Dano Mágico de Água.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Uma pequena caixa azulada. Quando ativada, se molda em um revólver ou em um mosquete. Pelos deuses, quem criou isso?</p></blockquote>",
      "price": 0,
      "category": "rara",
      "potency": 2,
      "isBound": false,
      "properties": "Revólvermosquete",
      "unity": 9,
      "equipped": false,
      "quantity": 1,
      "actions": [
        {
          "id": "act00420000001",
          "name": "Ativar: Glubgar",
          "description": "Ao equipar esse Armamento, você deverá escolher se será um Revólver ou um Mosquete. Seu Dano Base, enquanto, Revolver é 4. Seu Dano Base, enquanto, Mosquete é 7. Esse Armamento materializa um projétil físico ao ser utilizado, portanto não necessita de munições. Você pode utilizar  uma Ação Simples  para trocar o tipo do Armamento, entre Revólver e Mosquete. O primeiro dano causado pelo Armamento durante um turno é aumentado em 1d10 como Dano Mágico de Água.",
          "cost": "",
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
    "effects": []
  },
  {
    "_id": "eqrel00430000000",
    "name": "Cortador de Realidade",
    "type": "relic",
    "img": "icons/weapons/axes/handaxe-stone.svg",
    "itemKey": "cortador_de_realidade",
    "folder": "fldrel0003000000",
    "_key": "!items!eqrel00430000000",
    "system": {
      "name": "Cortador de Realidade",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Rara</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 2</span> <span style='background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255,255,255,0.3); padding: 2px 6px; border-radius: 4px;'>Machado Leve</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>O Dano Base desse Armamento é 4. Quando arremessado,  o dano do Armamento não é afetado pela Regra de Arremesso. Ao atingir um Alvo com esse Armamento, você poderá utilizar a sua Ação Rápida para se teletransportar a 1 metro desse Alvo. O primeiro dano causado pelo Armamento durante um turno é aumentado em 1d10 como Dano Mágico Neutro.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Um machado antigo, feito de presas e partes de animais da fauna Auroriana. Contudo, o seu artesão não imaginava que uma das criaturas tinha sido tocada pelo Véu.</p></blockquote>",
      "price": 0,
      "category": "rara",
      "potency": 2,
      "isBound": false,
      "properties": "Machado Leve",
      "unity": 13,
      "equipped": false,
      "quantity": 1,
      "actions": [
        {
          "id": "act00430000001",
          "name": "Ativar: Cortador de Realidade",
          "description": "O Dano Base desse Armamento é 4. Quando arremessado,  o dano do Armamento não é afetado pela Regra de Arremesso. Ao atingir um Alvo com esse Armamento, você poderá utilizar a sua Ação Rápida para se teletransportar a 1 metro desse Alvo. O primeiro dano causado pelo Armamento durante um turno é aumentado em 1d10 como Dano Mágico Neutro.",
          "cost": "",
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
          "id": "act00430000002",
          "name": "Golpe com Cortador de Realidade",
          "description": "Ataque com Cortador de Realidade. Dano Base: 4.",
          "cost": "",
          "type": {
            "actionType": "acaoAtiva",
            "category": "ataque_corpo_a_corpo",
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
            "formula": "4",
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
            "targetLimit": ""
          }
        }
      ]
    },
    "effects": []
  },
  {
    "_id": "eqrel00440000000",
    "name": "Coração do Mártir",
    "type": "relic",
    "img": "icons/equipment/shield/heater-crystal-gold.svg",
    "itemKey": "coração_do_mártir",
    "folder": "fldrel0003000000",
    "_key": "!items!eqrel00440000000",
    "system": {
      "name": "Coração do Mártir",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Rara</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 2</span> <span style='background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255,255,255,0.3); padding: 2px 6px; border-radius: 4px;'>Escudo</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>Esse escudo concede +2 a Bloqueio. Sempre que você falhar em um teste de Bloqueio, você poderá refazer o teste, ficando com o novo resultado. Esse efeito ocorre apenas uma vez por turno. Caso um Alvo Aliado  a até 3 metros  esteja sendo Alvo de um Ataque Físico  vindo de um projétil ou Ataque Mágico , você poderá redirecionar o ataque a você, testando normalmente contra o ataque. Esse efeito ocorre apenas uma vez por rodada.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Um escudo pesado, feito de metal e uma pedra antiga, carregando a vontade e a glória de antigos guardiões e paladinos.</p></blockquote>",
      "price": 0,
      "category": "rara",
      "potency": 2,
      "isBound": false,
      "properties": "Escudo",
      "unity": 15,
      "equipped": false,
      "quantity": 1,
      "actions": []
    },
    "effects": []
  },
  {
    "_id": "eqrel00450000000",
    "name": "Ataduras do Templo Perdido de Junkai",
    "type": "relic",
    "img": "icons/equipment/hand/handwraot-cloth-black.svg",
    "itemKey": "ataduras_do_templo_perdido_de_junkai",
    "folder": "fldrel0003000000",
    "_key": "!items!eqrel00450000000",
    "system": {
      "name": "Ataduras do Templo Perdido de Junkai",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Rara</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 2</span> <span style='background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255,255,255,0.3); padding: 2px 6px; border-radius: 4px;'>Arma de Punho</span></div><p style='font-size: 0.85em; opacity: 0.8; font-style: italic; margin-bottom: 6px;'>Os valores de Unidade desse item só se aplicam caso você esteja carregando-o, ao</p><p style='margin-bottom: 8px; line-height: 1.4;'>invés de equipando-o. Os seus Ataques Desarmados  causam 1d4 de Dano Físico adicional. Caso você possua a Habilidade de Caminho Mestre do Corpo e Mente, esse valor é substituído por 1d6. A sua Movimentação é aumentada em 2 metros e você passa a possuir Aptidão em testes de Destreza, além de receber apenas metade de danos de Queda. O primeiro dano causado por você com  um Ataque Desarmado durante um turno é aumentado em 1d10 como Dano Mágico de Vento.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Uma faixa ritualística concedida aos artistas marciais que se destacavam no Templo de Junkai. Estas faixas representam o símbolo máximo da sua maestria em combate.</p></blockquote>",
      "price": 0,
      "category": "rara",
      "potency": 2,
      "isBound": false,
      "properties": "Arma de Punho",
      "unity": 5,
      "equipped": false,
      "quantity": 1,
      "actions": []
    },
    "effects": []
  },
  {
    "_id": "eqrel00460000000",
    "name": "Manto dos Estudiosos Oníricos",
    "type": "relic",
    "img": "icons/equipment/back/cloak-fur-brown.svg",
    "itemKey": "manto_dos_estudiosos_oníricos",
    "folder": "fldrel0003000000",
    "_key": "!items!eqrel00460000000",
    "system": {
      "name": "Manto dos Estudiosos Oníricos",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Rara</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 2</span> <span style='background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255,255,255,0.3); padding: 2px 6px; border-radius: 4px;'>Armadura Leve</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>O primeiro Dano Mágico  causado por uma Conjuração sua, durante o seu turno, enquanto estiver equipado com essa Armadura, é aumentado em 1d10. Ao receber um Dano Mágico , você poderá ignorá-lo. Depois de utilizado, Depois de utilizado, esse efeito só poderá ser reutilizado após um Repouso Completo.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Um manto marrom, com uma pequena pelagem banca costurada na sua lateral, contendo o símbolo de um olho distorcido no seu centro.</p></blockquote>",
      "price": 0,
      "category": "rara",
      "potency": 2,
      "isBound": false,
      "properties": "Armadura Leve",
      "unity": 10,
      "equipped": false,
      "quantity": 1,
      "actions": []
    },
    "effects": []
  },
  {
    "_id": "eqrel00470000000",
    "name": "Couraça da Guerra Perdida",
    "type": "relic",
    "img": "icons/equipment/chest/breastplate-cuirass-steel.svg",
    "itemKey": "couraça_da_guerra_perdida",
    "folder": "fldrel0003000000",
    "_key": "!items!eqrel00470000000",
    "system": {
      "name": "Couraça da Guerra Perdida",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Rara</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 2</span> <span style='background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255,255,255,0.3); padding: 2px 6px; border-radius: 4px;'>Armadura Média</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>Ao chegar a zero, ou menos, Pontos de Vida , você poderá evitar ficar Incapacitado, ficando com 1 Ponto de Vida e recebendo um valor de Pontos de Vida Temporários  equivalente ao dobro do seu total máximo de Pontos de Energia. Depois de utilizada, essa Relíquia só poderá ser reutilizada após um Repouso Completo.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Uma couraça de meio corpo acinzentada, com linhas feitas com um minério alaranjado. Dizem que os poucos  drakarianos que sobreviveram a Guerra da Tempestade conseguiram escapar com certas armaduras que lhes concediam uma segunda chance.</p></blockquote>",
      "price": 0,
      "category": "rara",
      "potency": 2,
      "isBound": false,
      "properties": "Armadura Média",
      "unity": 15,
      "equipped": false,
      "quantity": 1,
      "actions": []
    },
    "effects": []
  },
  {
    "_id": "eqrel00480000000",
    "name": "Armadura Completa de Hanelin",
    "type": "relic",
    "img": "icons/equipment/chest/breastplate-plate-steel-noble.svg",
    "itemKey": "armadura_completa_de_hanelin",
    "folder": "fldrel0003000000",
    "_key": "!items!eqrel00480000000",
    "system": {
      "name": "Armadura Completa de Hanelin",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Rara</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 2</span> <span style='background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255,255,255,0.3); padding: 2px 6px; border-radius: 4px;'>Armadura Pesada</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>Essa Armadura Pesada  não aplica Inaptidão a testes de Canalização. Ao final de um turno  no qual você tenha recebido qualquer tipo de dano de um Alvo, você causar á, nesse mesmo Alvo, 1d10 de Dano Mágico Neutro. esse efeito ocorre apenas uma vez por turno, por Alvo. Ao receber um Dano Físico , você poderá ignorar esse Dano Físico. Depois de utilizado, esse efeito só poderá ser reutilizado após um Repouso Completo.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Uma das poucas peças preservadas pelo tempo de algo que, um dia, possivelmente pertenceu a um Cavaleiro Real de Agravian, combatentes honrados, ditos como imbatíveis nas grandes guerras drunarianas.</p></blockquote>",
      "price": 0,
      "category": "rara",
      "potency": 2,
      "isBound": false,
      "properties": "Armadura Pesada",
      "unity": 20,
      "equipped": false,
      "quantity": 1,
      "actions": []
    },
    "effects": []
  },
  {
    "_id": "eqrel00490000000",
    "name": "Pilar de Terra",
    "type": "relic",
    "img": "icons/weapons/hammers/warhammer-stone.svg",
    "itemKey": "pilar_de_terra",
    "folder": "fldrel0003000000",
    "_key": "!items!eqrel00490000000",
    "system": {
      "name": "Pilar de Terra",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Rara</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 2</span> <span style='background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255,255,255,0.3); padding: 2px 6px; border-radius: 4px;'>Martelo de Guerra</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>O Dano Base desse Armamento é 5. Ao atingir um Alvo com esse Armamento, você removerá todos os Pontos de Vida Temporários  do Alvo antes de causar dano a ele. Ao remover pontos de Capacidade com esse Armamento, remova 1 ponto adicional. O primeiro dano causado pelo Armamento durante um turno é aumentado em 1d10 como Dano Mágico de Terra.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Um martelo de guerra criado pelos antigos anões para a fabricação de outras armas. Seu peso é descomunal àqueles que não estão vinculados à Relíquia.</p></blockquote>",
      "price": 0,
      "category": "rara",
      "potency": 2,
      "isBound": false,
      "properties": "Martelo de Guerra",
      "unity": 18,
      "equipped": false,
      "quantity": 1,
      "actions": [
        {
          "id": "act00490000001",
          "name": "Golpe com Pilar de Terra",
          "description": "Ataque com Pilar de Terra. Dano Base: 5.",
          "cost": "",
          "type": {
            "actionType": "acaoAtiva",
            "category": "ataque_corpo_a_corpo",
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
            "formula": "5",
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
            "targetLimit": ""
          }
        }
      ]
    },
    "effects": []
  },
  {
    "_id": "eqrel00500000000",
    "name": "Pedra Rúnica:  Proteção Elemental",
    "type": "relic",
    "img": "icons/commodities/treasure/token-gold-gem.svg",
    "itemKey": "pedra_rúnica__proteção_elemental",
    "folder": "fldrel0003000000",
    "_key": "!items!eqrel00500000000",
    "system": {
      "name": "Pedra Rúnica:  Proteção Elemental",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Rara</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 2</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>Durante 1 minuto , você extrai o poder dessa pedra antiga, aplicando uma Resistência Mágica (Fogo, Água, Vento, Terra, Trovão, Gelo, Natureza, Profano, Trevas ou Luz, à escolha do Narrador) a um Armamento, Armadura ou Escudo que você possua. Depois de ter o seu poder extraído, a pedra é destruída, tornando o seu efeito permanente no Armamento, Armadura ou Escudo. O item afetado se torna uma Relíquia com 2 de Potência. Caso esse Armamento já seja uma Relíquia, aumente em 2 a sua Potência.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Uma pequena pedra antiga , com um símbolo místico pronto para ser extraído.</p></blockquote>",
      "price": 0,
      "category": "rara",
      "potency": 2,
      "isBound": false,
      "properties": "",
      "unity": 4,
      "equipped": false,
      "quantity": 1,
      "actions": []
    },
    "effects": []
  },
  {
    "_id": "eqrel00510000000",
    "name": "Parasita de Cromo Obsidiano",
    "type": "relic",
    "img": "icons/equipment/chest/spine-cyber-metal.svg",
    "itemKey": "parasita_de_cromo_obsidiano",
    "folder": "fldrel0004000000",
    "_key": "!items!eqrel00510000000",
    "system": {
      "name": "Parasita de Cromo Obsidiano",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Lendária</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 3</span> <span style='background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255,255,255,0.3); padding: 2px 6px; border-radius: 4px;'>Armadura</span></div><p style='font-size: 0.85em; opacity: 0.8; font-style: italic; margin-bottom: 6px;'>Os valores de Unidade desse item só se aplicam caso você esteja carregando-o, ao</p><p style='margin-bottom: 8px; line-height: 1.4;'>invés de equipando-o. Um metal maleável, com o formato da coluna de algum ser. Essa Relíquia pode ser equipada com outras Armaduras, mas impede que elas concedam valores de Bloqueio. Você deve utilizar uma Ação Simples  para encaixar e equipar essa Relíquia na sua coluna, para então receber os seus efeitos. O Bloqueio dessa Armadura é 0. Ela não requer valores de Vigor para ser utilizada, nem aplica Inaptidões. Enquanto estiver equipada, a Armadura aplica os seguintes efeitos:</p><ul style='margin: 6px 0 10px 20px; padding: 0;'><li>O seu corpo é fortalecido, recebendo um valor de Bloqueio</li></ul><p style='margin-bottom: 8px; line-height: 1.4;'>equivalente à metade do seu total de pontos de Vigor + 2.</p><ul style='margin: 6px 0 10px 20px; padding: 0;'><li>Ao receber qualquer tipo de dano, você poderá realizar um Teste de</li></ul><p style='margin-bottom: 8px; line-height: 1.4;'>Destino, Dif. 8 . Caso tenha sucesso, você reduzirá o dano pela metade. Não se sabe a origem real desta Relíquia, o que se supõe é que algum experimento com Seres Artificiais teve envolvimento com algo tão... único. Ao equipá-la, você se sentirá invencível. Você é especial.</p>\n        <div style='background: rgba(212, 175, 55, 0.12); border: 1px solid rgba(212, 175, 55, 0.4); border-radius: 6px; padding: 10px; margin-top: 12px;'>\n          <h4 style='margin: 0 0 6px 0; color: #ffd700; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;'>\n            <i class=\"fa-solid fa-crown\"></i> Evocação Lendária\n          </h4>\n          <p style='margin: 0; font-size: 0.9em; line-height: 1.4;'>Você eleva o seu corpo ao máximo, recebendo Aptidão Aprimorada em todos os seus testes de Parâmetro até o final desse turno.</p>\n          <small style='display: block; margin-top: 6px; font-style: italic; opacity: 0.7;'>* Só pode ser evocada durante seu turno sem custo de ação. Recarrega após 48 horas.</small>\n        </div>\n        ",
      "price": 0,
      "category": "lendaria",
      "potency": 3,
      "isBound": false,
      "properties": "Armadura",
      "unity": 10,
      "equipped": false,
      "quantity": 1,
      "actions": [
        {
          "id": "act00510000001",
          "name": "Evocação Lendária: Parasita de Cromo Obsidiano",
          "description": "Você eleva o seu corpo ao máximo, recebendo Aptidão Aprimorada em todos os seus testes de Parâmetro até o final desse turno.",
          "cost": "Recarga: 48h",
          "type": {
            "actionType": "",
            "category": "especial",
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
          "id": "act00510000002",
          "name": "Ativar: Parasita de Cromo Obsidiano",
          "description": "Os valores de Unidade desse item só se aplicam caso você esteja carregando-o, ao invés de equipando-o. Um metal maleável, com o formato da coluna de algum ser. Essa Relíquia pode ser equipada com outras Armaduras, mas impede que elas concedam valores de Bloqueio. Você deve utilizar uma Ação Simples  para encaixar e equipar essa Relíquia na sua coluna, para então receber os seus efeitos. O Bloqueio dessa Armadura é 0. Ela não requer valores de Vigor para ser utilizada, nem aplica Inaptidões. Enquanto estiver equipada, a Armadura aplica os seguintes efeitos: • O seu corpo é fortalecido, recebendo um valor de Bloqueio equivalente à metade do seu total de pontos de Vigor + 2. • Ao receber qualquer tipo de dano, você poderá realizar um Teste de Destino, Dif. 8 . Caso tenha sucesso, você reduzirá o dano pela metade. Não se sabe a origem real desta Relíquia, o que se supõe é que algum experimento com Seres Artificiais teve envolvimento com algo tão... único. Ao equipá-la, você se sentirá invencível. Você é especial.",
          "cost": "",
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
    "effects": []
  },
  {
    "_id": "eqrel00520000000",
    "name": "Solaris",
    "type": "relic",
    "img": "icons/weapons/polearms/spear-glowing-sun.svg",
    "itemKey": "solaris",
    "folder": "fldrel0004000000",
    "_key": "!items!eqrel00520000000",
    "system": {
      "name": "Solaris",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Lendária</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 3</span> <span style='background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255,255,255,0.3); padding: 2px 6px; border-radius: 4px;'>Lança</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>O Dano Base deste Armamento é 5 – 6 (Propriedade: Versatilidade). Você pode utilizar uma Ação Simples  para fazer com que esse Armamento ilumine toda área a até 6 metros ao seu redor, removendo qualquer efeito de Escuridão ou Escuridão Mística. Você pode desfazer esse efeito a qualquer momento, sem custo de Ação. Alvos com Características do Livro dos Seres Abissais recebem 1d20 de Dano Mágico de Luz ao iniciarem o seu turno no alcance da área iluminada por esse efeito. O primeiro dano causado pelo Armamento durante um turno é aumentado em 1d12 como Dano Mágico de Luz.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Um armamento perdido do Plano de Ofir. Seu primeiro dono nomeou-lhe Solaris, pois percebia que a luz emitida por essa lança era tão intensa quando o próprio Sol.</p></blockquote>\n        <div style='background: rgba(212, 175, 55, 0.12); border: 1px solid rgba(212, 175, 55, 0.4); border-radius: 6px; padding: 10px; margin-top: 12px;'>\n          <h4 style='margin: 0 0 6px 0; color: #ffd700; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;'>\n            <i class=\"fa-solid fa-crown\"></i> Evocação Lendária\n          </h4>\n          <p style='margin: 0; font-size: 0.9em; line-height: 1.4;'>Você reveste esse Armamento com energia celestial, arremessando-o na direção de um Alvo a até 10 metros, forçando-o a um teste de Agilidade, Dif. 12. Caso falhe, o Alvo receberá o dobro do seu total de Pontos de Energia como Dano Mágico de Luz. Todos os  Alvos, em linha reta na direção do Alvo desse arremesso , também deverão realizar o teste de Agilidade. Após isso, o Armamento retornará à sua mão.</p>\n          <small style='display: block; margin-top: 6px; font-style: italic; opacity: 0.7;'>* Só pode ser evocada durante seu turno sem custo de ação. Recarrega após 48 horas.</small>\n        </div>\n        ",
      "price": 0,
      "category": "lendaria",
      "potency": 3,
      "isBound": false,
      "properties": "Lança",
      "unity": 20,
      "equipped": false,
      "quantity": 1,
      "actions": [
        {
          "id": "act00520000001",
          "name": "Evocação Lendária: Solaris",
          "description": "Você reveste esse Armamento com energia celestial, arremessando-o na direção de um Alvo a até 10 metros, forçando-o a um teste de Agilidade, Dif. 12. Caso falhe, o Alvo receberá o dobro do seu total de Pontos de Energia como Dano Mágico de Luz. Todos os  Alvos, em linha reta na direção do Alvo desse arremesso , também deverão realizar o teste de Agilidade. Após isso, o Armamento retornará à sua mão.",
          "cost": "Recarga: 48h",
          "type": {
            "actionType": "",
            "category": "especial",
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
            "type": "light",
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
            "hasCheck": true,
            "category": "parameter",
            "attribute": "agility",
            "difficulty": 12,
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
          "id": "act00520000002",
          "name": "Ativar: Solaris",
          "description": "O Dano Base deste Armamento é 5 – 6 (Propriedade: Versatilidade). Você pode utilizar uma Ação Simples  para fazer com que esse Armamento ilumine toda área a até 6 metros ao seu redor, removendo qualquer efeito de Escuridão ou Escuridão Mística. Você pode desfazer esse efeito a qualquer momento, sem custo de Ação. Alvos com Características do Livro dos Seres Abissais recebem 1d20 de Dano Mágico de Luz ao iniciarem o seu turno no alcance da área iluminada por esse efeito. O primeiro dano causado pelo Armamento durante um turno é aumentado em 1d12 como Dano Mágico de Luz.",
          "cost": "",
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
          "id": "act00520000003",
          "name": "Golpe com Solaris",
          "description": "Ataque com Solaris. Dano Base: 5.",
          "cost": "",
          "type": {
            "actionType": "acaoAtiva",
            "category": "ataque_corpo_a_corpo",
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
            "formula": "5",
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
            "targetLimit": ""
          }
        }
      ]
    },
    "effects": []
  },
  {
    "_id": "eqrel00530000000",
    "name": "Trovoada",
    "type": "relic",
    "img": "icons/weapons/swords/sword-short-lightning.svg",
    "itemKey": "trovoada",
    "folder": "fldrel0004000000",
    "_key": "!items!eqrel00530000000",
    "system": {
      "name": "Trovoada",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Lendária</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 3</span> <span style='background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255,255,255,0.3); padding: 2px 6px; border-radius: 4px;'>Espada Curta</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>O Dano Base desse Armamento é 5. Esse Armamento possui a Propriedade adicional Ambidestria. Ao causar dano com esse Armamento em um Alvo, todos os outros Alvos Inimigos  a até 3 metros recebem metade do seu total de Pontos de Energia  como Dano Mágico de Trovão. Esse efeito ocorre apenas uma vez por rodada. O primeiro dano causado pelo Armamento durante um turno é aumentado em 1d12 como Dano Mágico de Trovão. Se você possuir a Relíquia Nebulosa, a Potência dessa Relíquia é reduzida em 1.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Existe uma história antiga em Narzepion, que conta a odisseia de uma zaokan que enfrentou exércitos de inimigos, enquanto tentava salvar a sua amada, destravando ainda mais o seu Véu a cada combate, o que fez com que até mesmo os seus armamentos ganhassem poderes lendários. No fim, ela não conseguiu.</p></blockquote>\n        <div style='background: rgba(212, 175, 55, 0.12); border: 1px solid rgba(212, 175, 55, 0.4); border-radius: 6px; padding: 10px; margin-top: 12px;'>\n          <h4 style='margin: 0 0 6px 0; color: #ffd700; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;'>\n            <i class=\"fa-solid fa-crown\"></i> Evocação Lendária\n          </h4>\n          <p style='margin: 0; font-size: 0.9em; line-height: 1.4;'>Você se teletransporta a um ponto em um local vazio  a até 10 metros, após isso, todo Alvo Inimigo a até 1 metro desse ponto precisa realizar um teste de Vigor, Dif. 12. Caso falhe, o Alvo Inimigo recebe o seu total máximo de Pontos de Energia  como Dano Mágico de Trovão, além de ficar Atordoado.</p>\n          <small style='display: block; margin-top: 6px; font-style: italic; opacity: 0.7;'>* Só pode ser evocada durante seu turno sem custo de ação. Recarrega após 48 horas.</small>\n        </div>\n        ",
      "price": 0,
      "category": "lendaria",
      "potency": 3,
      "isBound": false,
      "properties": "Espada Curta",
      "unity": 15,
      "equipped": false,
      "quantity": 1,
      "actions": [
        {
          "id": "act00530000001",
          "name": "Evocação Lendária: Trovoada",
          "description": "Você se teletransporta a um ponto em um local vazio  a até 10 metros, após isso, todo Alvo Inimigo a até 1 metro desse ponto precisa realizar um teste de Vigor, Dif. 12. Caso falhe, o Alvo Inimigo recebe o seu total máximo de Pontos de Energia  como Dano Mágico de Trovão, além de ficar Atordoado.",
          "cost": "Recarga: 48h",
          "type": {
            "actionType": "",
            "category": "especial",
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
            "type": "thunder",
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
            "hasCheck": true,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 12,
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
          "id": "act00530000002",
          "name": "Golpe com Trovoada",
          "description": "Ataque com Trovoada. Dano Base: 5.",
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
            "formula": "5",
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
            "targetLimit": ""
          }
        }
      ]
    },
    "effects": []
  },
  {
    "_id": "eqrel00540000000",
    "name": "Nebulosa",
    "type": "relic",
    "img": "icons/weapons/swords/sword-short-frost.svg",
    "itemKey": "nebulosa",
    "folder": "fldrel0004000000",
    "_key": "!items!eqrel00540000000",
    "system": {
      "name": "Nebulosa",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Lendária</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 3</span> <span style='background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255,255,255,0.3); padding: 2px 6px; border-radius: 4px;'>Espada Curta</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>O Dano Base desse Armamento é 5. Esse Armamento possui a Propriedade adicional Ambidestria. Enquanto estiver em combate, caso você receba qualquer tipo de dano de um Alvo Inimigo  a até 8 metros, esse mesmo  Alvo receberá o seu total de Pontos de Energia como Dano Mágico de Gelo. Esse efeito ocorre apenas uma vez por rodada, por Alvo. O primeiro dano causado pelo Armamento durante um turno é aumentado em 1d12 como Dano Mágico de Gelo. Se você possuir a Relíquia Trovoada, a Potência dessa Relíquia é reduzida em 1.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Existe uma história antiga em Narzepion, que fala do rapto da filha mais nova de uma das principais famílias yuansus de Yuankan. Dizem que o rapto foi orquestrado por outra família yuansu, buscando culpar membros importantes do povo zaokan. A yuansu foi presa em uma torre afastada de Yuankan esperando sua amada. É contado que, nesse dia, nevou em Yuankan, enquanto as lágrimas da jovem congelaram.</p></blockquote>\n        <div style='background: rgba(212, 175, 55, 0.12); border: 1px solid rgba(212, 175, 55, 0.4); border-radius: 6px; padding: 10px; margin-top: 12px;'>\n          <h4 style='margin: 0 0 6px 0; color: #ffd700; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;'>\n            <i class=\"fa-solid fa-crown\"></i> Evocação Lendária\n          </h4>\n          <p style='margin: 0; font-size: 0.9em; line-height: 1.4;'>Você cria uma energia gélida ao seu redor, forçando todos os Alvo Inimigo a até 1 metro a um teste de Vigor, Dif. 12. Caso falhe, o Alvo não poderá utilizar a sua Ação Simples, nem Movimentação no seu próximo turno, além de ficar Imóvel por 10 minutos. Alvos Inimigos afetados por esse Imóvel poderão realizar um teste de Vigor, Dif. 12, ao final dos seus turnos. Caso tenham sucesso, esse Imóvel será removido.</p>\n          <small style='display: block; margin-top: 6px; font-style: italic; opacity: 0.7;'>* Só pode ser evocada durante seu turno sem custo de ação. Recarrega após 48 horas.</small>\n        </div>\n        ",
      "price": 0,
      "category": "lendaria",
      "potency": 3,
      "isBound": false,
      "properties": "Espada Curta",
      "unity": 15,
      "equipped": false,
      "quantity": 1,
      "actions": [
        {
          "id": "act00540000001",
          "name": "Evocação Lendária: Nebulosa",
          "description": "Você cria uma energia gélida ao seu redor, forçando todos os Alvo Inimigo a até 1 metro a um teste de Vigor, Dif. 12. Caso falhe, o Alvo não poderá utilizar a sua Ação Simples, nem Movimentação no seu próximo turno, além de ficar Imóvel por 10 minutos. Alvos Inimigos afetados por esse Imóvel poderão realizar um teste de Vigor, Dif. 12, ao final dos seus turnos. Caso tenham sucesso, esse Imóvel será removido.",
          "cost": "Recarga: 48h",
          "type": {
            "actionType": "",
            "category": "especial",
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
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "vigor",
            "difficulty": 12,
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
          "id": "act00540000002",
          "name": "Golpe com Nebulosa",
          "description": "Ataque com Nebulosa. Dano Base: 5.",
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
            "formula": "5",
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
            "targetLimit": ""
          }
        }
      ]
    },
    "effects": []
  },
  {
    "_id": "eqrel00550000000",
    "name": "Estrela Vespertina",
    "type": "relic",
    "img": "icons/weapons/maces/mace-flanged-silver.svg",
    "itemKey": "estrela_vespertina",
    "folder": "fldrel0004000000",
    "_key": "!items!eqrel00550000000",
    "system": {
      "name": "Estrela Vespertina",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Lendária</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 3</span> <span style='background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255,255,255,0.3); padding: 2px 6px; border-radius: 4px;'>Maça</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>O Dano Base desse Armamento é 4. Esse Armamento pode utilizar Espírito como potencializador do seu dano, ao invés do Parâmetro original. Enquanto estiver em combate, a primeira regeneração de Pontos de Vida realizada por você durante o seu turno é aumentada em 1d12. Esse efeito não afeta Poções. Além disso, caso você não cause nenhum tipo de dano durante o seu turno, você regenerará 1 Ponto de Energia. Um sacerdote sem nome de um templo de Glimmera enfrentou um grupo de ladrões ao tentarem roubar o seu templo — que abrigava órfãos. A fim de evitar que furtassem a comida e o pouco que tinham, o sacerdote pegou</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>uma pequena maça, deixada por um guarda da cidade. Assim, protegeu as crianças e afugentou os ladrões. Infelizmente, seus ferimentos foram graves demais e o sacerdote sem nome não resistiu. Contudo, ao amanhecer, a maça não possuía nenhum sangue.</p></blockquote>\n        <div style='background: rgba(212, 175, 55, 0.12); border: 1px solid rgba(212, 175, 55, 0.4); border-radius: 6px; padding: 10px; margin-top: 12px;'>\n          <h4 style='margin: 0 0 6px 0; color: #ffd700; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;'>\n            <i class=\"fa-solid fa-crown\"></i> Evocação Lendária\n          </h4>\n          <p style='margin: 0; font-size: 0.9em; line-height: 1.4;'>Ao regenerar os Pontos de Vida de um Alvo, você poderá fazer com que metade da regeneração afete todo s os Alvo Aliado a até 6 metros. Esse efeito ocorre apenas uma vez por turno, por Alvo. Esse efeito não afeta Poções.</p>\n          <small style='display: block; margin-top: 6px; font-style: italic; opacity: 0.7;'>* Só pode ser evocada durante seu turno sem custo de ação. Recarrega após 48 horas.</small>\n        </div>\n        ",
      "price": 0,
      "category": "lendaria",
      "potency": 3,
      "isBound": false,
      "properties": "Maça",
      "unity": 13,
      "equipped": false,
      "quantity": 1,
      "actions": [
        {
          "id": "act00550000001",
          "name": "Evocação Lendária: Estrela Vespertina",
          "description": "Ao regenerar os Pontos de Vida de um Alvo, você poderá fazer com que metade da regeneração afete todo s os Alvo Aliado a até 6 metros. Esse efeito ocorre apenas uma vez por turno, por Alvo. Esse efeito não afeta Poções.",
          "cost": "Recarga: 48h",
          "type": {
            "actionType": "",
            "category": "especial",
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
          "id": "act00550000002",
          "name": "Golpe com Estrela Vespertina",
          "description": "Ataque com Estrela Vespertina. Dano Base: 4.",
          "cost": "",
          "type": {
            "actionType": "acaoAtiva",
            "category": "ataque_corpo_a_corpo",
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
            "formula": "4",
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
            "targetLimit": ""
          }
        }
      ]
    },
    "effects": []
  },
  {
    "_id": "eqrel00560000000",
    "name": "Calgorax",
    "type": "relic",
    "img": "icons/weapons/crossbows/crossbow-heavy-wood.svg",
    "itemKey": "calgorax",
    "folder": "fldrel0004000000",
    "_key": "!items!eqrel00560000000",
    "system": {
      "name": "Calgorax",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Lendária</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 3</span> <span style='background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255,255,255,0.3); padding: 2px 6px; border-radius: 4px;'>Besta Grande</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>O Dano Base desse Armamento é 7. Esse Armamento materializa um projétil físico ao ser utilizado, portanto não necessita de virotes. Caso você tenha atingido um Alvo com esse Armamento, e o Resultado Natural do Ataque Físico (Precisão) tenha sido 10, ou mais, você poderá imediatamente realizar um novo Ataque Físico com esse Armamento. Ataques Físicos com esse Armamento ignoram Cobertura. Esse armamento foi utilizado por diversos caçadores de criaturas por gerações. É o algoz dos mais terríveis seres que pisaram em Auroria. Dizem que partes desse armamento foram criadas com recursos retirados até mesmo dos Dragões Ancestrais, os Fragmentos de Gaenói, tornando-o extremamente poderoso e letal.</p>\n        <div style='background: rgba(212, 175, 55, 0.12); border: 1px solid rgba(212, 175, 55, 0.4); border-radius: 6px; padding: 10px; margin-top: 12px;'>\n          <h4 style='margin: 0 0 6px 0; color: #ffd700; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;'>\n            <i class=\"fa-solid fa-crown\"></i> Evocação Lendária\n          </h4>\n          <p style='margin: 0; font-size: 0.9em; line-height: 1.4;'>Você materializa um número de projéteis igual à metade do seu total de pontos de Precisão + 1, em seguida realiza um Ataque Físico contra um número de Alvos igual ao número de projéteis criados dessa maneira. Alvos só podem ser atacados uma vez por essa  por combate. Um único teste de Precisão é realizado no Ataque Físico.</p>\n          <small style='display: block; margin-top: 6px; font-style: italic; opacity: 0.7;'>* Só pode ser evocada durante seu turno sem custo de ação. Recarrega após 48 horas.</small>\n        </div>\n        ",
      "price": 0,
      "category": "lendaria",
      "potency": 3,
      "isBound": false,
      "properties": "Besta Grande",
      "unity": 19,
      "equipped": false,
      "quantity": 1,
      "actions": [
        {
          "id": "act00560000001",
          "name": "Evocação Lendária: Calgorax",
          "description": "Você materializa um número de projéteis igual à metade do seu total de pontos de Precisão + 1, em seguida realiza um Ataque Físico contra um número de Alvos igual ao número de projéteis criados dessa maneira. Alvos só podem ser atacados uma vez por essa  por combate. Um único teste de Precisão é realizado no Ataque Físico.",
          "cost": "Recarga: 48h",
          "type": {
            "actionType": "",
            "category": "especial",
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
          "id": "act00560000002",
          "name": "Golpe com Calgorax",
          "description": "Ataque com Calgorax. Dano Base: 7.",
          "cost": "",
          "type": {
            "actionType": "acaoAtiva",
            "category": "ataque_distancia",
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
            "formula": "7",
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
            "targetLimit": ""
          }
        }
      ]
    },
    "effects": []
  },
  {
    "_id": "eqrel00570000000",
    "name": "Sibilo",
    "type": "relic",
    "img": "icons/weapons/crossbows/crossbow-hand-black.svg",
    "itemKey": "sibilo",
    "folder": "fldrel0004000000",
    "_key": "!items!eqrel00570000000",
    "system": {
      "name": "Sibilo",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Lendária</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 3</span> <span style='background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255,255,255,0.3); padding: 2px 6px; border-radius: 4px;'>Besta Pequena</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>O Dano Base desse Armamento é 4. Esse Armamento materializa um projétil físico ao ser utilizado, portanto não necessita de virotes. Toda vez que você atingir um Alvo com este Armamento sem causar um Acerto Crítico, a diferença para você causar um Acerto Crítico é reduzida em 1. Esse efeito é reiniciado após você atingir</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>um Alvo com um Acerto Crítico. O primeiro dano causado pelo Armamento durante um turno é aumentado em 1d12 como Dano Imaterial. Os maiores assassinos de Auroria um dia utilizaram essa besta, uma peça formidável criada pelos artesões de Noctúrnia, que competiam com seus pares no Domínio Sombrio, para definir quem era mais mortal.</p></blockquote>\n        <div style='background: rgba(212, 175, 55, 0.12); border: 1px solid rgba(212, 175, 55, 0.4); border-radius: 6px; padding: 10px; margin-top: 12px;'>\n          <h4 style='margin: 0 0 6px 0; color: #ffd700; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;'>\n            <i class=\"fa-solid fa-crown\"></i> Evocação Lendária\n          </h4>\n          <p style='margin: 0; font-size: 0.9em; line-height: 1.4;'>O seu primeiro teste de Precisão nesse turno é realizado com 1d20, ao invés de 1d12.</p>\n          <small style='display: block; margin-top: 6px; font-style: italic; opacity: 0.7;'>* Só pode ser evocada durante seu turno sem custo de ação. Recarrega após 48 horas.</small>\n        </div>\n        ",
      "price": 0,
      "category": "lendaria",
      "potency": 3,
      "isBound": false,
      "properties": "Besta Pequena",
      "unity": 10,
      "equipped": false,
      "quantity": 1,
      "actions": [
        {
          "id": "act00570000001",
          "name": "Evocação Lendária: Sibilo",
          "description": "O seu primeiro teste de Precisão nesse turno é realizado com 1d20, ao invés de 1d12.",
          "cost": "Recarga: 48h",
          "type": {
            "actionType": "",
            "category": "especial",
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
          "id": "act00570000002",
          "name": "Golpe com Sibilo",
          "description": "Ataque com Sibilo. Dano Base: 4.",
          "cost": "",
          "type": {
            "actionType": "acaoAtiva",
            "category": "ataque_distancia",
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
            "formula": "4",
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
            "targetLimit": ""
          }
        }
      ]
    },
    "effects": []
  },
  {
    "_id": "eqrel00580000000",
    "name": "Zymox",
    "type": "relic",
    "img": "icons/weapons/miscellaneous/crystal-wand-purple.svg",
    "itemKey": "zymox",
    "folder": "fldrel0004000000",
    "_key": "!items!eqrel00580000000",
    "system": {
      "name": "Zymox",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Lendária</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 3</span> <span style='background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255,255,255,0.3); padding: 2px 6px; border-radius: 4px;'>Berloque de Energia</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>O Dano Base desse Armamento é 4. Enquanto estiver em combate, e utilizar pelo menos 1 Ponto de Energia, o seu próximo dano será aumentado em um valor igual à metade do seu total máximo de Pontos de Energia . Esse feito ocorre apenas uma vez por turno. Ao afetar um Alvo com a Propriedade Rasga-Véu com esse Armamento, você regenerará 1 Ponto de Energia.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Existe uma organização secreta em Auroria, que criou esse tipo de Armamento com o intuito de caçar Conjuradores. Contudo, diferente da Inquisição Escarlate, essa organização busca remover o Véu de Conjuradores. Essa é uma peça especial dessa organização, tome cuidado, talvez você não devesse ficar com ela.</p></blockquote>\n        <div style='background: rgba(212, 175, 55, 0.12); border: 1px solid rgba(212, 175, 55, 0.4); border-radius: 6px; padding: 10px; margin-top: 12px;'>\n          <h4 style='margin: 0 0 6px 0; color: #ffd700; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;'>\n            <i class=\"fa-solid fa-crown\"></i> Evocação Lendária\n          </h4>\n          <p style='margin: 0; font-size: 0.9em; line-height: 1.4;'>Você realiza um Ataque Mágico com esse Armamento contra um Alvo. Caso tenha sucesso, você poderá utilizar todas as Conjurações que o Alvo possui até o final do combate. Caso uma Conjuração utilizada dessa maneira possua custos de Pontos de Energia , você precisará gastar apenas a metade desse custo para realizar a Conjuração.</p>\n          <small style='display: block; margin-top: 6px; font-style: italic; opacity: 0.7;'>* Só pode ser evocada durante seu turno sem custo de ação. Recarrega após 48 horas.</small>\n        </div>\n        ",
      "price": 0,
      "category": "lendaria",
      "potency": 3,
      "isBound": false,
      "properties": "Berloque de Energia",
      "unity": 5,
      "equipped": false,
      "quantity": 1,
      "actions": [
        {
          "id": "act00580000001",
          "name": "Evocação Lendária: Zymox",
          "description": "Você realiza um Ataque Mágico com esse Armamento contra um Alvo. Caso tenha sucesso, você poderá utilizar todas as Conjurações que o Alvo possui até o final do combate. Caso uma Conjuração utilizada dessa maneira possua custos de Pontos de Energia , você precisará gastar apenas a metade desse custo para realizar a Conjuração.",
          "cost": "Recarga: 48h",
          "type": {
            "actionType": "",
            "category": "especial",
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
          "id": "act00580000002",
          "name": "Golpe com Zymox",
          "description": "Ataque com Zymox. Dano Base: 4.",
          "cost": "",
          "type": {
            "actionType": "acaoAtiva",
            "category": "ataque_corpo_a_corpo",
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
            "formula": "4",
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
            "targetLimit": ""
          }
        }
      ]
    },
    "effects": []
  },
  {
    "_id": "eqrel00590000000",
    "name": "Kaerthal",
    "type": "relic",
    "img": "icons/weapons/hammers/warhammer-stone-vines.svg",
    "itemKey": "kaerthal",
    "folder": "fldrel0004000000",
    "_key": "!items!eqrel00590000000",
    "system": {
      "name": "Kaerthal",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Lendária</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 3</span> <span style='background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255,255,255,0.3); padding: 2px 6px; border-radius: 4px;'>Martelo de Guerra</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>O Dano Base desse Armamento é 6. esse Armamento pode utilizar Vigor como potencializador do seu dano, ao invés do Parâmetro original. Caso você tenha atingido um Alvo com esse Armamento, e o Resultado Natural do Ataque Físico (Precisão) tenha sido 10, ou mais, ele ficará Envenenado e não poderá regenerar Pontos de Vida durante 1 minuto. O primeiro dano causado pelo Armamento durante um turno é aumentado em 1d12 como Dano Mágico de Natureza.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Muito tempo atrás, o mais fiel dos devotos de Nívila clamou para sua deusa por algo capaz de harmonizar o Ciclo e proteger a natureza. À sua frente, inúmeras vinhas se entrelaçaram em torno de uma rocha, formando um grande martelo, que pulsava a energia Primal. Dizem que não é possível encontrar este martelo a menos que o mundo permita , e que  pode surgir em qualquer lugar a qualquer momento — como se a natureza escolhesse seus campeões para empunhar o martelo Kaerthal.</p></blockquote>\n        <div style='background: rgba(212, 175, 55, 0.12); border: 1px solid rgba(212, 175, 55, 0.4); border-radius: 6px; padding: 10px; margin-top: 12px;'>\n          <h4 style='margin: 0 0 6px 0; color: #ffd700; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;'>\n            <i class=\"fa-solid fa-crown\"></i> Evocação Lendária\n          </h4>\n          <p style='margin: 0; font-size: 0.9em; line-height: 1.4;'>Você realiza um violento impacto no solo com esse Armamento, tornando toda a área a até 6 metros um Terreno Difícil permanentemente. Alvos Inimigos  nessa área são envolvidos por forças primais que os forçam a um teste de Espírito, Dif. 12. Caso falhe, o Alvo perderá 1d4 Pontos de Energia , e você regenerará metade desse valor aos seus Pontos de Energia.</p>\n          <small style='display: block; margin-top: 6px; font-style: italic; opacity: 0.7;'>* Só pode ser evocada durante seu turno sem custo de ação. Recarrega após 48 horas.</small>\n        </div>\n        ",
      "price": 0,
      "category": "lendaria",
      "potency": 3,
      "isBound": false,
      "properties": "Martelo de Guerra",
      "unity": 18,
      "equipped": false,
      "quantity": 1,
      "actions": [
        {
          "id": "act00590000001",
          "name": "Evocação Lendária: Kaerthal",
          "description": "Você realiza um violento impacto no solo com esse Armamento, tornando toda a área a até 6 metros um Terreno Difícil permanentemente. Alvos Inimigos  nessa área são envolvidos por forças primais que os forçam a um teste de Espírito, Dif. 12. Caso falhe, o Alvo perderá 1d4 Pontos de Energia , e você regenerará metade desse valor aos seus Pontos de Energia.",
          "cost": "Recarga: 48h",
          "type": {
            "actionType": "",
            "category": "especial",
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
            "duration": "",
            "description": ""
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "spirit",
            "difficulty": 12,
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
          "id": "act00590000002",
          "name": "Golpe com Kaerthal",
          "description": "Ataque com Kaerthal. Dano Base: 6.",
          "cost": "",
          "type": {
            "actionType": "acaoAtiva",
            "category": "ataque_corpo_a_corpo",
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
            "formula": "6",
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
            "targetLimit": ""
          }
        }
      ]
    },
    "effects": []
  },
  {
    "_id": "eqrel00600000000",
    "name": "Olho de Kraun'Gar",
    "type": "relic",
    "img": "icons/commodities/treasure/token-gold-gem.svg",
    "itemKey": "olho_de_kraungar",
    "folder": "fldrel0004000000",
    "_key": "!items!eqrel00600000000",
    "system": {
      "name": "Olho de Kraun'Gar",
      "description": "<div style='display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;'><span style='background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>Lendária</span> <span style='background: rgba(100, 150, 255, 0.2); border: 1px solid #6496ff; padding: 2px 6px; border-radius: 4px;'>Potência 3</span> <span style='background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255,255,255,0.3); padding: 2px 6px; border-radius: 4px;'>Escudo</span></div><p style='margin-bottom: 8px; line-height: 1.4;'>Esse escudo concede +3 a Bloqueio. Ao ser sucedido em um teste de Bloqueio, você poderá causar o seu próprio total máximo de Pontos de Energia  como Dano Mágico de Fogo a todos os Alvos Inimigos a até 2 metros.  esse efeito ocorre apenas uma vez por rodada. Ao falhar em um teste de Bloqueio, você receberá +1 no seu próximo teste de Bloqueio. Esse efeito acumula.  Esse efeito  é reiniciado após você ter sucesso em um teste de Bloqueio.</p><blockquote style='border-left: 3px solid #d4af37; padding-left: 10px; margin: 12px 0; font-style: italic; opacity: 0.85; font-size: 0.9em;'><p>Existe uma lenda entre o povo anão sobre Seran Gorr, um velho ferreiro anão que havia perdido seu filho na guerra. Imerso em vingança, Seran forjou uma espada e banhou-a em uma jazida de Kuldrana, esperando a aprovação de Verkau. Na sua mente, ouviu a voz de seu deus, que lhe perguntava: “Qual o propósito dessa arma? Matar o filho de outro pai?\".  A espada se partiu. Seran voltou à sua oficina e forjou uma armadura, para então visitar a jazida  novamente. Verkau então falou novamente com Seran: \"Qual o propósito dessa armadura? Ignorar tudo que aconteceu?\". Seran novamente retornou à sua forja, imerso em pensamentos. Novamente o anão visitou a jazida,  contudo, antes de Verkau falar, Seran se adiantou: \"Eu forjo este escudo com as lágrimas de meu povo, com as lágrimas de cada pai que perdera seu amado filho . Forjo esse escudo com as lágrimas do colosso Kraun'gar, aquele que a todos protegeu e ainda protege!\". A jazida borbulhou — e dela, uma obra-prima surgiu.</p></blockquote>\n        <div style='background: rgba(212, 175, 55, 0.12); border: 1px solid rgba(212, 175, 55, 0.4); border-radius: 6px; padding: 10px; margin-top: 12px;'>\n          <h4 style='margin: 0 0 6px 0; color: #ffd700; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;'>\n            <i class=\"fa-solid fa-crown\"></i> Evocação Lendária\n          </h4>\n          <p style='margin: 0; font-size: 0.9em; line-height: 1.4;'>Você absorve parte da energia condensada nesse Escudo, recebendo metade do seu total máximo de Pontos de Vida  como Pontos de Vida Temporários, além dos seguintes efeitos, que permanecem ativos por 1 minuto: • Você se torna imune a Lentidão, Imóvel, Fratura e Caído. • Imunidade a quaisquer efeitos que lhe fariam se deslocar involuntariamente, ou que impedisse a sua Movimentação. • Aptidão em testes de Brutalidade.</p>\n          <small style='display: block; margin-top: 6px; font-style: italic; opacity: 0.7;'>* Só pode ser evocada durante seu turno sem custo de ação. Recarrega após 48 horas.</small>\n        </div>\n        ",
      "price": 0,
      "category": "lendaria",
      "potency": 3,
      "isBound": false,
      "properties": "Escudo",
      "unity": 15,
      "equipped": false,
      "quantity": 1,
      "actions": [
        {
          "id": "act00600000001",
          "name": "Evocação Lendária: Olho de Kraun'Gar",
          "description": "Você absorve parte da energia condensada nesse Escudo, recebendo metade do seu total máximo de Pontos de Vida  como Pontos de Vida Temporários, além dos seguintes efeitos, que permanecem ativos por 1 minuto: • Você se torna imune a Lentidão, Imóvel, Fratura e Caído. • Imunidade a quaisquer efeitos que lhe fariam se deslocar involuntariamente, ou que impedisse a sua Movimentação. • Aptidão em testes de Brutalidade.",
          "cost": "Recarga: 48h",
          "type": {
            "actionType": "",
            "category": "especial",
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
    "effects": []
  }
];
