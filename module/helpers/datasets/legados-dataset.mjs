// ==============================================================================
// GAIA: O PRELÚDIO - DATASET COMPLETO DOS LEGADOS DE AURORIA
// ==============================================================================
// Extraído e estruturado canonicamente a partir do livro de regras Gaia: Prelúdio.
// Habilidades divididas entre Efeitos Automáticos (transfer: true), Ações e Passivas Puras (apenas texto).
// ==============================================================================

export const LEGADOS_FOLDERS_DATA = [
  {
    "_id": "fldlg00010000000",
    "name": "Aenólia",
    "type": "Item",
    "sorting": "a",
    "color": "#14532d",
    "_key": "!folders!fldlg00010000000"
  },
  {
    "_id": "fldlg00020000000",
    "name": "Drakar",
    "type": "Item",
    "sorting": "a",
    "color": "#1e3a5f",
    "_key": "!folders!fldlg00020000000"
  },
  {
    "_id": "fldlg00030000000",
    "name": "Drunar",
    "type": "Item",
    "sorting": "a",
    "color": "#713f12",
    "_key": "!folders!fldlg00030000000"
  },
  {
    "_id": "fldlg00040000000",
    "name": "Krabesh",
    "type": "Item",
    "sorting": "a",
    "color": "#5c3d1e",
    "_key": "!folders!fldlg00040000000"
  },
  {
    "_id": "fldlg00050000000",
    "name": "Narzepion",
    "type": "Item",
    "sorting": "a",
    "color": "#2e1065",
    "_key": "!folders!fldlg00050000000"
  },
  {
    "_id": "fldlg00060000000",
    "name": "Vértonie",
    "type": "Item",
    "sorting": "a",
    "color": "#581c1c",
    "_key": "!folders!fldlg00060000000"
  }
];

export const LEGADOS_DATA = [
  {
    "_id": "lg00010000000000",
    "name": "Alraune",
    "type": "legacy",
    "img": "icons/magic/nature/leaf-glowing-green.svg",
    "legadoKey": "alraune",
    "folder": "fldlg00010000000",
    "_key": "!items!lg00010000000000",
    "system": {
      "name": "Alraune",
      "height": "Entre 1,20m e 2 metros de altura.",
      "lifeExpectancy": "Alraunes podem viver por tempo indeterminado. Devido ao seu nascimento incomum, não podem se reproduzir como outros povos, mas ainda se desenvolvem e amadurecem como outros Legados. São considerados adultos por volta dos seus 15 anos.",
      "appearance": "Diferentemente de outros Legados, alraunes desenvolvem seus corpos como um reflexo de suas vontades, experiências e influências, tanto de outros Legados quanto da flora local. Aqueles que crescem em Krabesh podem apresentar espinhos, em Drakar podem possuir corpos altos e finos, ou até mesmo fungos e raízes distorcidas quando criados em Aenólia, entre outras características referentes à natureza do local de seu amadurecimento.\nDevido a isso, é quase impossível existirem dois alraunes iguais. Suas feições podem apresentar traços masculinos ou femininos, de ambos ou de nenhum dos dois. Suas colorações são vastas e refletem sua personalidade.",
      "description": "Os alraunes são seres intrigantes e de comportamento imprevisível, agindo como se suas mentes estivessem sempre distantes, imersas em seus sonhos. Sua profunda ligação com sua Primogênita, Darnawel; com as forças do Primal e do Profano, assim como com tudo que suas raízes tocam e tudo aquilo que passa por suas cascas, talvez escondam coisas de um mundo antigo, algo que talvez outros Legados não possam assimilar.\nDevido ao seu surgimento relativamente recente, tendem a possuir muita curiosidade pela cultura dos outros Legados, encantando-se a cada nova descoberta e com todas as mudanças que testemunham. Da mesma maneira que o Ciclo ensina que tudo é o fim, e que todo fim é um novo começo, ele também ensina que se deve aproveitar a vida enquanto for possível.",
      "legacyAbilities": [
        {
          "name": "Filhos de Darnawel",
          "description": "O seu corpo é feito de plantas e vinhas, por isso, você não precisa se alimentar, necessitando apenas água para sobreviver. Você pode criar pequenos efeitos inofensivos, que tenham ligação com a natureza, como: desabrochar flores, mimetizar som de animais, criar lufadas de vento, entre outros, desde que sejam autorizados pelo Narrador.",
          "actions": []
        },
        {
          "name": "Proteção da Natureza",
          "description": "Você possui Resistência Mágica [Natureza] e não é afetado por Envenenado.",
          "actions": [],
          "activeEffect": {
            "text": "Resistência Mágica [Natureza] e imunidade à condição Envenenado.",
            "trigger": {
              "event": "automatic"
            },
            "duration": {
              "type": "permanent"
            },
            "changes": [
              {
                "key": "system.damageResistance",
                "mode": 2,
                "value": "nature"
              },
              {
                "key": "system.conditionImmunity",
                "mode": 2,
                "value": "envenenado"
              }
            ]
          }
        },
        {
          "name": "Essência Revigorante",
          "description": "Você pode utilizar a sua Ação Simples para regenerar um valor de Pontos de Vida equivalente ao dobro do seu total máximo de Pontos de Energia. Esse efeito só poderá ser realizado novamente após concluir um Repouso Completo.",
          "actions": [
            {
              "id": "act_essencia_revigorante",
              "name": "Essência Revigorante",
              "description": "Regenera um valor de Pontos de Vida equivalente ao dobro do seu total máximo de Pontos de Energia (1x por Repouso Completo).",
              "cost": "",
              "type": {
                "actionType": "acaoSimples",
                "category": "suporte",
                "tags": [
                  "cura",
                  "repouso"
                ]
              },
              "attack": {
                "hasAttack": false
              },
              "damage": {
                "hasDamage": false
              },
              "healing": {
                "hasHealing": true,
                "formula": "2 * @pe.max",
                "type": "pv"
              },
              "condition": {
                "hasCondition": false
              },
              "check": {
                "hasCheck": false
              },
              "areaOfEffect": {
                "hasArea": false
              }
            }
          ]
        }
      ],
      "continente": "Aenólia",
      "altura": "Entre 1,20m e 2 metros de altura.",
      "expectativa_de_vida": "Alraunes podem viver por tempo indeterminado. Devido ao seu nascimento incomum, não podem se reproduzir como outros povos, mas ainda se desenvolvem e amadurecem como outros Legados. São considerados adultos por volta dos seus 15 anos.",
      "aparencia": "Diferentemente de outros Legados, alraunes desenvolvem seus corpos como um reflexo de suas vontades, experiências e influências, tanto de outros Legados quanto da flora local. Aqueles que crescem em Krabesh podem apresentar espinhos, em Drakar podem possuir corpos altos e finos, ou até mesmo fungos e raízes distorcidas quando criados em Aenólia, entre outras características referentes à natureza do local de seu amadurecimento.\nDevido a isso, é quase impossível existirem dois alraunes iguais. Suas feições podem apresentar traços masculinos ou femininos, de ambos ou de nenhum dos dois. Suas colorações são vastas e refletem sua personalidade.",
      "descricao": "Os alraunes são seres intrigantes e de comportamento imprevisível, agindo como se suas mentes estivessem sempre distantes, imersas em seus sonhos. Sua profunda ligação com sua Primogênita, Darnawel; com as forças do Primal e do Profano, assim como com tudo que suas raízes tocam e tudo aquilo que passa por suas cascas, talvez escondam coisas de um mundo antigo, algo que talvez outros Legados não possam assimilar.\nDevido ao seu surgimento relativamente recente, tendem a possuir muita curiosidade pela cultura dos outros Legados, encantando-se a cada nova descoberta e com todas as mudanças que testemunham. Da mesma maneira que o Ciclo ensina que tudo é o fim, e que todo fim é um novo começo, ele também ensina que se deve aproveitar a vida enquanto for possível.",
      "origem": "Observando às incessantes falhas de Norduk de preencher o vazio de Auroria com vida, Nívila decidiu se juntar ao irmão. Derramando seu sangue no solo, deu origem a Darnawel, sua Primogênita e a primeira árvore do mundo, um ser frondoso, que produzia os frutos usados para alimentar as fracas criações de Norduk. Por sua vez, à medida que não conseguiam mais sustentar a sua vida, as criaturas tinham seus corpos dragados pela árvore, nutrindo-a, e sem saber, obedecendo às leis do ainda desconhecido Eterno Ciclo.\nAs raízes da Darnawel se espalharam por toda Arba'shatrah. Dos ramos de Darnawel, Nívila criou pequenos seres, aos quais chamou de dríades, que espalhariam suas sementes pelo mundo, nutrindo toda a criação. Quando os eventos da queda da Torre dos Imortais se iniciaram, as criações de Nívila estavam ocupadas realizando o seu propósito, por isso, o abalo causado pelos conflitos quebrou o vínculo das dríades mais distantes com Darnawel. Para sobreviver, elas devoraram o Véu ao seu redor, originando o Primal. As dríades que ainda mantinham conexão com a Primogênita fundiram-se às árvores criadas a partir das sementes de Darnawel, protegendo-as da devastação que os impactos da guerra geraram.\nTanto Darnawel quanto suas dríades permaneceram adormecidas desde os tempos antigos. Quando a Ruptura assolou o mundo, a Primeira Árvore respondeu ao chamado divino, criando uma espécie diferente de dríade. Uma com forma humanoide, para que, com sua voz forte e audível, pudesse gritar para o mundo as súplicas silenciosas que Darnawel não conseguia. Diferentes das dríades que possuíam a função de nutrir a natureza, esses novos seres, chamados de alraunes, não carregariam sementes ou espalhariam o Véu Primal. Carregariam lanças e espadas, para que pudessem defender apropriadamente o mundo dele mesmo.",
      "tradicoes": "Devido à sua origem única através de Darnawel e por sua relação com ela, os alraunes não desenvolveram diferenças sociais entre si, logo, não necessitaram de uma hierarquia elaborada. Para os alraunes, Darnawel é a sua eterna progenitora, líder, general e conselheira. Para se comunicar com seus filhos ou com outros Legados, assim como proteger sua floresta, Darnawel cria corpos ocos de madeira, que carregam sua consciência, a partir de qualquer árvore do mundo.\nFazer parte do Ciclo é mais do que apenas uma crença, é uma verdade incontestável. Para isso, uma vida deve ser paga com uma morte. Uma das maiores honras para um alraune fiel ao Ciclo é ser sacrificado em seu nome, pois, assim como a natureza se renova constantemente, o mundo também deve mudar. Durante o primeiro dia da primavera, os alraunes realizam um ritual de sacrifício, onde o alraune mais velho deve entregar sua vida para o alraune mais novo, para que assim suas almas sejam unidas. Após esse processo, aquele novo ser deve enterrar o corpo do mais velho, para que assim surja uma nova árvore no mundo. Aqueles que passam por esse processo são conhecidos como renascido: aquele que nasceu duas vezes.\nUm costume se criou entre os alraunes, originado do dito: 'amar é compartilhar uma parte de si'. Ao realizar uma jornada com o intuito de retornar, ou caso precise momentaneamente se ausentar, aquele que se despede presenteia com uma parte de si àqueles que permanecerão. Seja um ramo de sua cabeça, uma flor de seu peito, ou outras partes de si. Esses presentes estranhamente não deterioram, pois dizem que a própria Darnawel os conserva, sinalizando que aquele que partiu está vivo e seguro. Contudo, caso sua conexão com o mundo desapareça, o presente rapidamente murchará. Quando retornam, o presente é devolvido e retornado ao devido lugar.\nSua cultura vê a ganância com maus olhos, abominando a maioria dos objetos que não possuem alguma função objetiva. A ideia de utilizar moedas, que nada mais são que objetos que simbolizam uma troca, pulando de dono em dono ou trancafiados em depósitos, nada mais é que uma estagnação do Ciclo. Diante das demandas do mundo, mesmo a contragosto, armazenam o pouco de tesouros que encontram em suas florestas para poder lidar com o restante do mundo, pois sabem que seus costumes não são adotados fora de sua sociedade. Normalmente buscam quitar suas dívidas com serviços ou com as mercadorias que produzem. Existem aqueles que não nutrem respeito pelas tradições e sejam contaminados pelo ouro. Eles são livres para saírem de Darnawel, mas sem a esperança de um dia voltar e serem recebidos de braços abertos, tendo apenas o Vento Primordial como companhia.",
      "no_mundo": "Ligados ao Primal e sendo um Legado relativamente desconhecido, os alraunes ainda estão se adaptando ao mundo. Eles não se envolveram em conflitos com outros povos através da história, mais próximos ao ideal de guardiões silenciosos e discretos. Podem enfrentar dificuldades sociais com viajantes de outros Legados, como se sempre fossem considerados estrangeiros, sendo até mesmo confundidos com monstros em alguns locais, mas uma vez que semeiam as sementes da amizade, são considerados mais que bem-vindos, pois sua chegada exala esperança para os corações feridos.\nAlguns boatos dizem que os alraunes estão ligados à criação alquímica da Essência Imortal, assunto considerado tabu entre seu povo. Somente eles sabem a natureza de tal produto, que teoricamente pode dar vida eterna a quem a utiliza ou amarrar a alma dos mortos novamente aos seus corpos, gerando a estagnação do Ciclo. Mas essas são apenas especulações, talvez seja, na verdade, apenas um veneno mortal, uma bebida quente para se aquecer no inverno, ou qualquer outra lorota contada aos viajantes para manter os curiosos perdidos, mas ainda assim ninguém nunca conseguiu comprovar qualquer uma das teorias.\nAlguns alraunes são enviados a diversos locais para compreender, combater ou desenvolver as manifestações do Primal e da natureza, trabalhando arduamente como guias para que os povos não se percam pelo caminho e corrompam deliberadamente o mundo e todas as suas bênçãos. Costumam desempenhar o papel de guerreiros e protetores da natureza, mas um ou outro se desvia de seus deveres, permitindo-os se tornar qualquer coisa que a sua recém-descoberta vontade de viver os guie.",
      "nomes_comuns_origem": [
        "Dambae",
        "Ephos",
        "Freloa",
        "Vrek",
        "Zenko",
        "Zinnea"
      ],
      "abilities": [
        "hl00010000000000",
        "hl00020000000000",
        "hl00030000000000"
      ],
      "origin": "Observando às incessantes falhas de Norduk de preencher o vazio de Auroria com vida, Nívila decidiu se juntar ao irmão. Derramando seu sangue no solo, deu origem a Darnawel, sua Primogênita e a primeira árvore do mundo, um ser frondoso, que produzia os frutos usados para alimentar as fracas criações de Norduk. Por sua vez, à medida que não conseguiam mais sustentar a sua vida, as criaturas tinham seus corpos dragados pela árvore, nutrindo-a, e sem saber, obedecendo às leis do ainda desconhecido Eterno Ciclo.\nAs raízes da Darnawel se espalharam por toda Arba'shatrah. Dos ramos de Darnawel, Nívila criou pequenos seres, aos quais chamou de dríades, que espalhariam suas sementes pelo mundo, nutrindo toda a criação. Quando os eventos da queda da Torre dos Imortais se iniciaram, as criações de Nívila estavam ocupadas realizando o seu propósito, por isso, o abalo causado pelos conflitos quebrou o vínculo das dríades mais distantes com Darnawel. Para sobreviver, elas devoraram o Véu ao seu redor, originando o Primal. As dríades que ainda mantinham conexão com a Primogênita fundiram-se às árvores criadas a partir das sementes de Darnawel, protegendo-as da devastação que os impactos da guerra geraram.\nTanto Darnawel quanto suas dríades permaneceram adormecidas desde os tempos antigos. Quando a Ruptura assolou o mundo, a Primeira Árvore respondeu ao chamado divino, criando uma espécie diferente de dríade. Uma com forma humanoide, para que, com sua voz forte e audível, pudesse gritar para o mundo as súplicas silenciosas que Darnawel não conseguia. Diferentes das dríades que possuíam a função de nutrir a natureza, esses novos seres, chamados de alraunes, não carregariam sementes ou espalhariam o Véu Primal. Carregariam lanças e espadas, para que pudessem defender apropriadamente o mundo dele mesmo.",
      "traditions": "Devido à sua origem única através de Darnawel e por sua relação com ela, os alraunes não desenvolveram diferenças sociais entre si, logo, não necessitaram de uma hierarquia elaborada. Para os alraunes, Darnawel é a sua eterna progenitora, líder, general e conselheira. Para se comunicar com seus filhos ou com outros Legados, assim como proteger sua floresta, Darnawel cria corpos ocos de madeira, que carregam sua consciência, a partir de qualquer árvore do mundo.\nFazer parte do Ciclo é mais do que apenas uma crença, é uma verdade incontestável. Para isso, uma vida deve ser paga com uma morte. Uma das maiores honras para um alraune fiel ao Ciclo é ser sacrificado em seu nome, pois, assim como a natureza se renova constantemente, o mundo também deve mudar. Durante o primeiro dia da primavera, os alraunes realizam um ritual de sacrifício, onde o alraune mais velho deve entregar sua vida para o alraune mais novo, para que assim suas almas sejam unidas. Após esse processo, aquele novo ser deve enterrar o corpo do mais velho, para que assim surja uma nova árvore no mundo. Aqueles que passam por esse processo são conhecidos como renascido: aquele que nasceu duas vezes.\nUm costume se criou entre os alraunes, originado do dito: 'amar é compartilhar uma parte de si'. Ao realizar uma jornada com o intuito de retornar, ou caso precise momentaneamente se ausentar, aquele que se despede presenteia com uma parte de si àqueles que permanecerão. Seja um ramo de sua cabeça, uma flor de seu peito, ou outras partes de si. Esses presentes estranhamente não deterioram, pois dizem que a própria Darnawel os conserva, sinalizando que aquele que partiu está vivo e seguro. Contudo, caso sua conexão com o mundo desapareça, o presente rapidamente murchará. Quando retornam, o presente é devolvido e retornado ao devido lugar.\nSua cultura vê a ganância com maus olhos, abominando a maioria dos objetos que não possuem alguma função objetiva. A ideia de utilizar moedas, que nada mais são que objetos que simbolizam uma troca, pulando de dono em dono ou trancafiados em depósitos, nada mais é que uma estagnação do Ciclo. Diante das demandas do mundo, mesmo a contragosto, armazenam o pouco de tesouros que encontram em suas florestas para poder lidar com o restante do mundo, pois sabem que seus costumes não são adotados fora de sua sociedade. Normalmente buscam quitar suas dívidas com serviços ou com as mercadorias que produzem. Existem aqueles que não nutrem respeito pelas tradições e sejam contaminados pelo ouro. Eles são livres para saírem de Darnawel, mas sem a esperança de um dia voltar e serem recebidos de braços abertos, tendo apenas o Vento Primordial como companhia.",
      "inWorld": "Ligados ao Primal e sendo um Legado relativamente desconhecido, os alraunes ainda estão se adaptando ao mundo. Eles não se envolveram em conflitos com outros povos através da história, mais próximos ao ideal de guardiões silenciosos e discretos. Podem enfrentar dificuldades sociais com viajantes de outros Legados, como se sempre fossem considerados estrangeiros, sendo até mesmo confundidos com monstros em alguns locais, mas uma vez que semeiam as sementes da amizade, são considerados mais que bem-vindos, pois sua chegada exala esperança para os corações feridos.\nAlguns boatos dizem que os alraunes estão ligados à criação alquímica da Essência Imortal, assunto considerado tabu entre seu povo. Somente eles sabem a natureza de tal produto, que teoricamente pode dar vida eterna a quem a utiliza ou amarrar a alma dos mortos novamente aos seus corpos, gerando a estagnação do Ciclo. Mas essas são apenas especulações, talvez seja, na verdade, apenas um veneno mortal, uma bebida quente para se aquecer no inverno, ou qualquer outra lorota contada aos viajantes para manter os curiosos perdidos, mas ainda assim ninguém nunca conseguiu comprovar qualquer uma das teorias.\nAlguns alraunes são enviados a diversos locais para compreender, combater ou desenvolver as manifestações do Primal e da natureza, trabalhando arduamente como guias para que os povos não se percam pelo caminho e corrompam deliberadamente o mundo e todas as suas bênçãos. Costumam desempenhar o papel de guerreiros e protetores da natureza, mas um ou outro se desvia de seus deveres, permitindo-os se tornar qualquer coisa que a sua recém-descoberta vontade de viver os guie."
    }
  },
  {
    "_id": "lg00020000000000",
    "name": "Anão",
    "type": "legacy",
    "img": "icons/skills/trades/smithing-anvil-silver.svg",
    "legadoKey": "anao",
    "folder": "fldlg00020000000",
    "_key": "!items!lg00020000000000",
    "system": {
      "name": "Anão",
      "height": "Entre 1,10m e 1,40 metros de altura.",
      "lifeExpectancy": "Anões podem viver até 150 anos, participando dos ritos de passagem de seus clãs e tornando senhores de si por volta de seus 14 anos.",
      "appearance": "Teimosos por natureza e rabugentos por opção, os anões possuem corpos pequenos atarracados, sólidos como as rochas que fazem parte da sua cultura. Sua pele varia entre o bege e o negro, com raros casos apresentando uma tonalidade acinzentada. Olhos firmes e narizes largos, se orgulham de suas frondosas barbas, que também estão presentes em algumas anãs.\nA descendência de um anão independe do clã de seus pais. Anunciada pela cor de seus cabelos, que mantêm a sua tonalidade durante toda a vida, um anão pode apresentar semelhanças com um dos três grandes anões lendários, fundadores de seus respectivos clãs:\n• O clã Horr descende de Horrgaek, a Campeã Obsidiana, possuindo cabelos pretos.\n• O clã Khor descende de Khorrgrin, o Sábio das Runas, possuindo cabelos brancos ou loiros.\n• O clã Gorr descende de Gorrag, o Escultor de Montanhas, possuindo cabelos castanhos ou ruivos.",
      "description": "Os filhos e filhas de Verkau possuem um profundo respeito e orgulho por sua origem, portanto, qualquer tipo de insulto ao seu povo é entendido como um insulto pessoal. Anões normalmente não escondem suas vontades, opiniões ou emoções, o que os torna na maioria das vezes companheiros leais que enfrentariam tudo e todos por seus aliados.\nDiferente do que muitos pensam, possuem um senso de humor apurado, que escondem com seus semblantes carrancudos. Sempre acompanhados de uma boa cerveja e uma ótima conversa sobre os mais diferentes assuntos, basta exaltar as conquistas enânicas e logo terá um anão como seu melhor amigo. Entretanto, não pense que são tolos e fáceis de enganar. Os perigos do norte afiaram sua astúcia, e não será uma conversa mansa e rebuscada que dobrará a vontade de um anão.",
      "legacyAbilities": [
        {
          "name": "Herança dos Três Irmãos",
          "description": "Você precisa de metade de comida e água para sobreviver, além ignorar a regra de 2 horas adicionais vindos de Repousos caso esteja repousando em um local desconfortável. Você também possui Infravisão.",
          "actions": []
        },
        {
          "name": "Modelador Natural",
          "description": "Enquanto você estiver tocando um objeto mundano de, no máximo, 1 metro de altura e largura, você poderá modificar a forma física desse objeto. Você também poderá utilizar esse efeito para reparar um pequeno objeto mundano, contanto que a parte danificada não seja maior que 30 centímetros. Esse efeito de reparo é permanente, ou até que seja quebrado novamente.",
          "actions": []
        },
        {
          "name": "Fortitude Ampliada",
          "description": "O dado que você utiliza ao calcular seus Pontos de Vida, ao criar um personagem e ao receber Níveis de Despertar, é 1d8, ao invés de 1d6. Caso você opte pelo valor fixo nessa rolagem, considere 4, ao invés de 3.",
          "actions": [],
          "activeEffect": {
            "text": "O dado de PV na criação e por Nível de Despertar passa a ser 1d8 (ou 4 fixo).",
            "trigger": {
              "event": "automatic"
            },
            "duration": {
              "type": "permanent"
            },
            "changes": [
              {
                "key": "system.hpDie",
                "mode": 2,
                "value": "1d8"
              },
              {
                "key": "system.hpFixed",
                "mode": 2,
                "value": "4"
              }
            ]
          }
        }
      ],
      "continente": "Drakar",
      "altura": "Entre 1,10m e 1,40 metros de altura.",
      "expectativa_de_vida": "Anões podem viver até 150 anos, participando dos ritos de passagem de seus clãs e tornando senhores de si por volta de seus 14 anos.",
      "aparencia": "Teimosos por natureza e rabugentos por opção, os anões possuem corpos pequenos atarracados, sólidos como as rochas que fazem parte da sua cultura. Sua pele varia entre o bege e o negro, com raros casos apresentando uma tonalidade acinzentada. Olhos firmes e narizes largos, se orgulham de suas frondosas barbas, que também estão presentes em algumas anãs.\nA descendência de um anão independe do clã de seus pais. Anunciada pela cor de seus cabelos, que mantêm a sua tonalidade durante toda a vida, um anão pode apresentar semelhanças com um dos três grandes anões lendários, fundadores de seus respectivos clãs:\n• O clã Horr descende de Horrgaek, a Campeã Obsidiana, possuindo cabelos pretos.\n• O clã Khor descende de Khorrgrin, o Sábio das Runas, possuindo cabelos brancos ou loiros.\n• O clã Gorr descende de Gorrag, o Escultor de Montanhas, possuindo cabelos castanhos ou ruivos.",
      "descricao": "Os filhos e filhas de Verkau possuem um profundo respeito e orgulho por sua origem, portanto, qualquer tipo de insulto ao seu povo é entendido como um insulto pessoal. Anões normalmente não escondem suas vontades, opiniões ou emoções, o que os torna na maioria das vezes companheiros leais que enfrentariam tudo e todos por seus aliados.\nDiferente do que muitos pensam, possuem um senso de humor apurado, que escondem com seus semblantes carrancudos. Sempre acompanhados de uma boa cerveja e uma ótima conversa sobre os mais diferentes assuntos, basta exaltar as conquistas enânicas e logo terá um anão como seu melhor amigo. Entretanto, não pense que são tolos e fáceis de enganar. Os perigos do norte afiaram sua astúcia, e não será uma conversa mansa e rebuscada que dobrará a vontade de um anão.",
      "origem": "Verkau era constantemente consultado por seus irmãos, ajudando-os a criar seus Legados. Quando não estava ajudando os outros, a divindade se isolava em sua oficina, construindo sua maior invenção: Kraun'gar, um colosso de rocha e ferro, tão grande de rasgava as nuvens, com a função de construir muralhas em torno de Arba'shatrah. Para auxiliar Kraun'gar em sua tarefa, Verkau também criou os primeiros anões: Horrgaek, Khorrgrin e Gorrad. Cada um herdou um aspecto da genialidade de seu criador: Horrgaek era uma estrategista nata Khorrgrin caminhou ao lado dos conjuradores, ajudando-os a compreender o Véu, enquanto Gorrag apreciava a inovação, orientando o colosso na sua tarefa de construir as muralhas e tantos outros afazeres na cidade.\nQuando estourou a guerra em Arba'shatrah, os anões escolheram a liberdade, rebelando-se contra a deusa Anatael. Ao mesmo tempo em que protegia a Torre dos Imortais, a sua função fundamental, Kraun'gar tentava proteger seu povo, principalmente de Kalash'ligotann, o Primogênito de Koyona que, na sua fúria, tentava devorar tudo, até mesmo seus aliados. O colosso não pôde prevenir a destruição da Torre dos Imortais e, numa tentativa desesperada, tentou, em vão, amparar a sua queda. A torre divina acabou tombando Em cima de Kraun'gar, deixando-o gravemente ferido.\nApós a guerra, os três anões responderam ao chamado do povo valdrak. Kraun'gar, ferido, carregou tanto o povo anão quanto os povos valdrak e daeva rumo ao norte. Nos seus momentos finais, o colosso seu corpo em ruínas - vagou pela região, a cada passo uma parte sua se desprendia, que caíam no chão, formando montanhas - até perecer no extremo norte, entregando-se ao silêncio do eterno descanso. O sangue âmbar do colosso perfurou a terra, originando a Kuldrana.\nO povo anão conta com orgulho essa história, d aquele que foi ordenado a proteger o mundo e manteve seu desígnio até o último passo, doando sua vida para que tantas outras se perpetuassem.",
      "tradicoes": "Cada clã enânico possui seus deveres e preside um poder dentro de sua sociedade. O clã Horr preside a Câmara da Guerra, protegendo seu povo de perigos internos ou externos. O clã Khor preside a Câmara das Leis, criando-as e aplicando-as, com o intuito de manter a ordem nos seus domínios. O clã Gorr preside a Câmara das Moedas, atarefada com toda e qualquer questão econômica. O povo anão é liderado pela Trindade de Ferro, composta por um representante de cada um dos clãs enânicos.\nMembros do clã Horr devem raspar seus cabelos até serem aprovados através da Obzanthurr. Essa tradição consiste em testes únicos, criados para cada um dos candidatos, com base em suas ambições. Após serem oficialmente reconhecidos como um Horr, recebem uma marca no rosto, simbolizando sua maior qualidade - coragem, bravura, liderança, etc. O clã Horr ensina que todos devem reconhecer suas falhas para que possam evoluir e que, através do esforço, nunca existirá fraqueza.\nAqueles que pertencem ao clã Khor possuem marcas rúnicas entalhadas na sua pele após o nascimento. Quando os anciões do clã reconhecem as capacidades do jovem Khor, permitem-no realizar o Runedhan, uma sobreposição de suas marcas rúnicas, relacionadas à sua especialidade, renome ou ambições. O clã Khor cultiva a sabedoria e ensina que todo conhecimento deve ser compreendido e preservado.\nO clã Gorr exige de seus semelhantes o Batismo da Forma, um ritual no qual o anão deve mergulhar seus braços em um poço de Kuldrana. Caso Verkau aceite o jovem Gorr, linhas cor de âmbar surgirão em seus braços, como veios de Kuldrana. Em raros casos, a Kuldrana rejeita o candidato, queimando gravemente os braços ou até mesmo inutilizando-os. É dito que a Kuldrana enxerga a maldade no anão, negando-se a abençoá-lo. O clã Gorr ensina a explorar o inimaginável, que toda criação possui seu propósito e que toda inovação é digna.",
      "no_mundo": "Quando Kraun'gar se fez pequena demais para o povo anão, uma parcela de seu povo se dispersou pelo mundo, procurando o seu lugar em Auroria em busca de uma vida tranquila e, muitas vezes, solitária. Muitos anões são bem recebidos em diversos lugares devido às façanhas tecnológicas de seu povo, mesmo que nem todos saibam ao menos trocar a roda de uma carroça.\nGrande parte da população enânica ainda vive em Drakar, pois sua ligação com Kraun'gar ainda é forte. Mantendo vivas as suas tradições, suas lendas são passadas de geração para geração, para todos os filhos e filhas de Verkau. Desde a Revolução do Ferro do Clã Gorr, que trouxe uma nova perspectiva para seus avanços tecnológicos, às batalhas que os Horr travaram contra os Valdraks, garantindo a independência de seu povo, ou então quando membros do Khorr compreenderam os fundamentos do Véu, o que possibilitou a criação da anti-conjuração usada contra os Asseclas dos Falsos Deuses, séculos antes da Ruptura. Talvez por causa dessas e de outras tantas histórias, os anões sempre são destaque em uma conversa de fogueira, pois quando um anão abre sua boca para contar algo, todos sabem que uma história épica será proferida de seus lábios.\nOs anões ainda sofrem pelas intempéries do continente, amenizada pelo rico comércio com o restante do mundo, principalmente com o povo humano, com o qual firmaram contrato com o seu primeiro rei Asgalok no qual, em troca de recursos, ajudariam a reconstruir Alderium, dívida que até hoje está sendo paga. Esse acordo, consequentemente, foi fundamental para a vitória drunariana contra os Valdraks durante a Guerra da Tempestade, criando inimizades no Norte, originando uma profunda rixa com os Valdraks.",
      "nomes_comuns_origem": [
        "Bartag",
        "Gourgark",
        "Hortun",
        "Kaledor",
        "Ynngra"
      ],
      "abilities": [
        "hl00040000000000",
        "hl00050000000000",
        "hl00060000000000"
      ],
      "origin": "Verkau era constantemente consultado por seus irmãos, ajudando-os a criar seus Legados. Quando não estava ajudando os outros, a divindade se isolava em sua oficina, construindo sua maior invenção: Kraun'gar, um colosso de rocha e ferro, tão grande de rasgava as nuvens, com a função de construir muralhas em torno de Arba'shatrah. Para auxiliar Kraun'gar em sua tarefa, Verkau também criou os primeiros anões: Horrgaek, Khorrgrin e Gorrad. Cada um herdou um aspecto da genialidade de seu criador: Horrgaek era uma estrategista nata Khorrgrin caminhou ao lado dos conjuradores, ajudando-os a compreender o Véu, enquanto Gorrag apreciava a inovação, orientando o colosso na sua tarefa de construir as muralhas e tantos outros afazeres na cidade.\nQuando estourou a guerra em Arba'shatrah, os anões escolheram a liberdade, rebelando-se contra a deusa Anatael. Ao mesmo tempo em que protegia a Torre dos Imortais, a sua função fundamental, Kraun'gar tentava proteger seu povo, principalmente de Kalash'ligotann, o Primogênito de Koyona que, na sua fúria, tentava devorar tudo, até mesmo seus aliados. O colosso não pôde prevenir a destruição da Torre dos Imortais e, numa tentativa desesperada, tentou, em vão, amparar a sua queda. A torre divina acabou tombando Em cima de Kraun'gar, deixando-o gravemente ferido.\nApós a guerra, os três anões responderam ao chamado do povo valdrak. Kraun'gar, ferido, carregou tanto o povo anão quanto os povos valdrak e daeva rumo ao norte. Nos seus momentos finais, o colosso seu corpo em ruínas - vagou pela região, a cada passo uma parte sua se desprendia, que caíam no chão, formando montanhas - até perecer no extremo norte, entregando-se ao silêncio do eterno descanso. O sangue âmbar do colosso perfurou a terra, originando a Kuldrana.\nO povo anão conta com orgulho essa história, d aquele que foi ordenado a proteger o mundo e manteve seu desígnio até o último passo, doando sua vida para que tantas outras se perpetuassem.",
      "traditions": "Cada clã enânico possui seus deveres e preside um poder dentro de sua sociedade. O clã Horr preside a Câmara da Guerra, protegendo seu povo de perigos internos ou externos. O clã Khor preside a Câmara das Leis, criando-as e aplicando-as, com o intuito de manter a ordem nos seus domínios. O clã Gorr preside a Câmara das Moedas, atarefada com toda e qualquer questão econômica. O povo anão é liderado pela Trindade de Ferro, composta por um representante de cada um dos clãs enânicos.\nMembros do clã Horr devem raspar seus cabelos até serem aprovados através da Obzanthurr. Essa tradição consiste em testes únicos, criados para cada um dos candidatos, com base em suas ambições. Após serem oficialmente reconhecidos como um Horr, recebem uma marca no rosto, simbolizando sua maior qualidade - coragem, bravura, liderança, etc. O clã Horr ensina que todos devem reconhecer suas falhas para que possam evoluir e que, através do esforço, nunca existirá fraqueza.\nAqueles que pertencem ao clã Khor possuem marcas rúnicas entalhadas na sua pele após o nascimento. Quando os anciões do clã reconhecem as capacidades do jovem Khor, permitem-no realizar o Runedhan, uma sobreposição de suas marcas rúnicas, relacionadas à sua especialidade, renome ou ambições. O clã Khor cultiva a sabedoria e ensina que todo conhecimento deve ser compreendido e preservado.\nO clã Gorr exige de seus semelhantes o Batismo da Forma, um ritual no qual o anão deve mergulhar seus braços em um poço de Kuldrana. Caso Verkau aceite o jovem Gorr, linhas cor de âmbar surgirão em seus braços, como veios de Kuldrana. Em raros casos, a Kuldrana rejeita o candidato, queimando gravemente os braços ou até mesmo inutilizando-os. É dito que a Kuldrana enxerga a maldade no anão, negando-se a abençoá-lo. O clã Gorr ensina a explorar o inimaginável, que toda criação possui seu propósito e que toda inovação é digna.",
      "inWorld": "Quando Kraun'gar se fez pequena demais para o povo anão, uma parcela de seu povo se dispersou pelo mundo, procurando o seu lugar em Auroria em busca de uma vida tranquila e, muitas vezes, solitária. Muitos anões são bem recebidos em diversos lugares devido às façanhas tecnológicas de seu povo, mesmo que nem todos saibam ao menos trocar a roda de uma carroça.\nGrande parte da população enânica ainda vive em Drakar, pois sua ligação com Kraun'gar ainda é forte. Mantendo vivas as suas tradições, suas lendas são passadas de geração para geração, para todos os filhos e filhas de Verkau. Desde a Revolução do Ferro do Clã Gorr, que trouxe uma nova perspectiva para seus avanços tecnológicos, às batalhas que os Horr travaram contra os Valdraks, garantindo a independência de seu povo, ou então quando membros do Khorr compreenderam os fundamentos do Véu, o que possibilitou a criação da anti-conjuração usada contra os Asseclas dos Falsos Deuses, séculos antes da Ruptura. Talvez por causa dessas e de outras tantas histórias, os anões sempre são destaque em uma conversa de fogueira, pois quando um anão abre sua boca para contar algo, todos sabem que uma história épica será proferida de seus lábios.\nOs anões ainda sofrem pelas intempéries do continente, amenizada pelo rico comércio com o restante do mundo, principalmente com o povo humano, com o qual firmaram contrato com o seu primeiro rei Asgalok no qual, em troca de recursos, ajudariam a reconstruir Alderium, dívida que até hoje está sendo paga. Esse acordo, consequentemente, foi fundamental para a vitória drunariana contra os Valdraks durante a Guerra da Tempestade, criando inimizades no Norte, originando uma profunda rixa com os Valdraks."
    }
  },
  {
    "_id": "lg00030000000000",
    "name": "Daeva",
    "type": "legacy",
    "img": "icons/magic/death/skull-horned-goat-purple.svg",
    "legadoKey": "daeva",
    "folder": "fldlg00020000000",
    "_key": "!items!lg00030000000000",
    "system": {
      "name": "Daeva",
      "height": "Entre 1,70m e 2 metros de altura.",
      "lifeExpectancy": "Daevas podem viver por até 120 anos. Entre os Daevas, cada um de seu povo é responsável pelos seus atos, mas apenas são considerados adultos a partir de seus 16 anos.",
      "appearance": "No seu corpo, o eterno duelo se manifesta em oposições entre partes mortais e partes abissais. Isso se deve a seu criador, Athranamad, ter barganhado com o Abismo, permitindo que seus filhos herdassem traços demoníacos. Na sua parte mortal, sua pele é acinzentada, arroxeada ou avermelhada, com imperfeições e rachaduras semelhantes a marcas de flagelação, presentes desde o nascimento. Seus cabelos variam entre pretos, ruivos ou brancos. Já a sua parte abissal é uma versão corrompida e deformada de sua contraparte mortal, geralmente apresentando um único chifre, pele repuxada, pupilas em fenda, orelhas alongadas, caudas pontiagudas ou outras características abissais.",
      "description": "Para os daevas, não existe o proibido, apenas o que ainda não foi compreendido. O oculto sacia suas dúvidas e alimenta seus desejos. Devido à constante associação ao mau encarnado, alguns decidem apenas abraçar a fama, tornando-se o monstro que outros acreditam existir. Na sua jornada vitalícia contra a ignorância, cercam-se de pessoas confiáveis, que possam prover algum conforto para suas almas atormentadas.\nDaevas buscam o domínio da herança de Athranamad e o controle de seus traços abissais, geralmente renegando o Abismo como conceito, enquanto abraçam a sua dádiva, utilizando-a como seu próprio poder numa luta eterna pelo controle de si. Traiçoeiros, honrados, zombeteiros ou gentis, mas, acima de tudo, imprevisíveis e únicos, revelando qual lado, mortal ou abissal, predomina naquele ser.",
      "legacyAbilities": [
        {
          "name": "Essência Abissal",
          "description": "Intensificando suas características corrompidas, você pode modificar levemente a sua aparência, salientando os seus aspectos abissais, como o tom de sua voz, a cor de seus olhos, pequenos espinhos pelo seu corpo ou pequenos focos de chamas sombrías, por exemplo.",
          "actions": []
        },
        {
          "name": "Abraço da Treva",
          "description": "Você possui Resistência Mágica [Trevas] e não é afetado por Enfraquecido.",
          "actions": [],
          "activeEffect": {
            "text": "Resistência Mágica [Trevas] e imunidade à condição Enfraquecido.",
            "trigger": {
              "event": "automatic"
            },
            "duration": {
              "type": "permanent"
            },
            "changes": [
              {
                "key": "system.damageResistance",
                "mode": 2,
                "value": "dark"
              },
              {
                "key": "system.conditionImmunity",
                "mode": 2,
                "value": "enfraquecido"
              }
            ]
          }
        },
        {
          "name": "Pacto Originário",
          "description": "Ao criar um daeva, escolha um Parâmetro: Você é imune a efeitos de Habilidades de Caminho e Características que apliquem Inaptidão no Parâmetro escolhido. Habilidades de Caminho e Características que apliquem Inaptidão em si mesmo não são afetadas por este efeito.",
          "actions": []
        }
      ],
      "continente": "Drakar",
      "altura": "Entre 1,70m e 2 metros de altura.",
      "expectativa_de_vida": "Daevas podem viver por até 120 anos. Entre os Daevas, cada um de seu povo é responsável pelos seus atos, mas apenas são considerados adultos a partir de seus 16 anos.",
      "aparencia": "No seu corpo, o eterno duelo se manifesta em oposições entre partes mortais e partes abissais. Isso se deve a seu criador, Athranamad, ter barganhado com o Abismo, permitindo que seus filhos herdassem traços demoníacos. Na sua parte mortal, sua pele é acinzentada, arroxeada ou avermelhada, com imperfeições e rachaduras semelhantes a marcas de flagelação, presentes desde o nascimento. Seus cabelos variam entre pretos, ruivos ou brancos. Já a sua parte abissal é uma versão corrompida e deformada de sua contraparte mortal, geralmente apresentando um único chifre, pele repuxada, pupilas em fenda, orelhas alongadas, caudas pontiagudas ou outras características abissais.",
      "descricao": "Para os daevas, não existe o proibido, apenas o que ainda não foi compreendido. O oculto sacia suas dúvidas e alimenta seus desejos. Devido à constante associação ao mau encarnado, alguns decidem apenas abraçar a fama, tornando-se o monstro que outros acreditam existir. Na sua jornada vitalícia contra a ignorância, cercam-se de pessoas confiáveis, que possam prover algum conforto para suas almas atormentadas.\nDaevas buscam o domínio da herança de Athranamad e o controle de seus traços abissais, geralmente renegando o Abismo como conceito, enquanto abraçam a sua dádiva, utilizando-a como seu próprio poder numa luta eterna pelo controle de si. Traiçoeiros, honrados, zombeteiros ou gentis, mas, acima de tudo, imprevisíveis e únicos, revelando qual lado, mortal ou abissal, predomina naquele ser.",
      "origem": "Quando Gaia entrou em sono profundo, dividindo suas dádivas entre seus filhos, o seu pecado fundamental também tomou forma, criando um deus não planejado. Começou como um rumor, a sombra de algo que espreitava sob a luz pálida das Luas e se escondia abaixo da terra, sussurrando verdades brutais aos ouvidos dos Primordiais. Esse vigésimo primeiro deus era Athranamad, que em segredo, por escolha ou não - comungava com as forças do Abismo, forjando abaixo dos olhos dos outros deuses seu Legado sob os moldes dos Arquidemônios.\nQuando foi descoberto, teve seus crimes julgados, sendo condenado à destruição. Contudo, ao invés disso, foi fragmentado pelas mãos de Kalgoras e cada parte de seu corpo foi escondida dos outros deuses. Com receio do que poderia acontecer, por não saber a origem ou o que escondia Athranamad em suas criações, Gruneak jurou guiar o Legado da divindade corrompida, para a surpresa de seus irmãos e irmãs, nomeando-os de daeva, os quais teriam os valdraks como seus carcereiros.\nMesmo com os laços entre daevas, Athranamad e Abismo cortados, sua essência já pertencia ao caos. Mesmo com todas as tentativas de anular a influência de Athranamad em Arba'shatrah, nada poderia ser feito, pois a Dúvida não é um poder, um ser, algo que possa ser morto, mas sim um veneno que se alastra na existência, indestrutível, pode ser apenas contido. Tanto Primordiais quanto deuses já não podiam mais esconder aquilo que se enraizara na parte mais profunda de seus corações, sendo esse o primeiro passo para o fim.\nDomados como cães pelos valdraks, os daevas serviram como pontas de lança na guerra em Arba'shatrah. Ambos os povos foram criados apenas para servir como ferramentas, mas a diferença era que um povo aceitava e se orgulhava disto, o outro não. Com o fim da guerra, os daevas acompanharam valdraks e anões em direção ao norte do novo mundo. Com a proliferação da Veldrana e a escassez de comida, os daevas foram expulsos de Trunetak, a capital valdrakiana, encontrando no leste os picos que futuramente chamariam de lar, Azraj.",
      "tradicoes": "Os daevas não possuem exatamente um governante, mas representantes distritais, ou isso é o que as outras nações acreditam. Em segredo, são liderados pelo Senhor, um daeva que mantém seu povo unido, visando proporcionar melhores condições para sua pequena nação. Devido à Kuldrana Azraj possui um clima ameno, possibilitando que sobrevivam com base na agricultura, principal produto de exportação, vendendo suas frutas e verduras para o restante do continente.\nOs daevas são amaldiçoados com o fardo de precisar controlar, literalmente, seus demônios. Para isso, utilizam diversos ritos pessoais, mas principalmente a meditação. Os anciões daevas submetem os mais jovens a testes de controle, verificando a integridade de sua sanidade e mantendo seus terrores sob controle. Os em estado mais crítico são enterrados vivos por tempo indeterminado, em posição vertical, com apenas a cabeça exposta à superfície. Privados de movimento, dependem unicamente da força de suas mentes para conquistarem a salvação de seus corpos. Aqueles que falharem serão abatidos, pois ainda são escravos do Abismo.\nO isolamento intencional do povo daêvola os fez desenvolver um gosto especial pela filosofia e pela arte, principalmente pintura, dramaturgia e poesia. Normalmente, assinam suas obras com pseudônimos, tendo suas peças vendidas e encenadas, principalmente, nos grandes teatros narzepianos. Da mesma maneira, suas pinturas são estimadas pela nobreza ao redor do mundo, devido à delicadeza e expressividade empregada em cada obra, como se pudessem ler a essência do autor em traços e palavras tão belas. Além disso, se provaram excelentes atores, fundando a Traggória, um estilo teatral trágico e mudo, utilizando seus talentos naturais de acentuar seus semblantes abissais para expressar as mais diversas emoções.\nO ritual funerário daêvola pode parecer grotesco aos olhos de estrangeiros. Eles acreditam que toda a sua vida é uma disputa pela integridade de sua essência e, na morte, devem se livrar de sua contraparte demoníaca para serem abraçados pelo Limbo de forma pura. Para isso, seus cadáveres têm suas contrapartes demoníacas arrancadas e pelos raspados, mesmo que isso deforme seus corpos, somente serão enterrados ou cremados.",
      "no_mundo": "Fora de Drakar, os Daevas costumam ser hostilizados, seja pelos leigos devido à sua aparência, seja por aquele que conhecem um pouco de história, devido à sua essência. Seus dons abissais nunca são vistos com bons olhos, mas, ainda assim, são úteis para a maioria dos trabalhos, dando origem a uma relação fria entre os daevas e os outros Legados.\nPara um daeva, é necessário controlar as trevas no coração e, devido a isso, receiam interagir com outros povos, justamente pelo preconceito com o seu povo. Por mais que, historicamente, possuam a mesma divindade como patrona, daevas e valdraks nunca foram realmente unidos. A Guerra da Tempestade, na qual, assim como os anões, os daevas conquistaram sua independência, tornou a relação entre os filhos de Athranamad e de Gruneak mais frias do que nunca.\nA dramaturgia daêvola exalta os feitos de seus semelhantes, principalmente as histórias que remontam os feitos de Zar'kavek, o Avatar de Athranamad que lutou contra Keldanas durante a Ruptura, ou Azzathra, uma caçadora de demônios que salvou diversas pessoas durante suas jornadas. Essas peças teatrais abrem espaço para que outros daevas possam, timidamente, conectar-se com outros povos e, por isso, não é mais incomum avistá-los em outras nações. Em contrapartida, alguns se entregam ao Abismo, piorando ainda mais sua reputação, originando os Infernantes, daevas especializados em caçar demônios e daevas desordeiros, assegurando que as conquistas diárias de seu povo não sejam maculadas pelo descontrole daqueles que perderam suas lutas contra seus próprios demônios.",
      "nomes_comuns_origem": [
        "Dou'tha'tr",
        "Eal'zelix",
        "Nu'ther",
        "Y'rahvek",
        "Zevra'k"
      ],
      "abilities": [
        "hl00070000000000",
        "hl00080000000000",
        "hl00090000000000"
      ],
      "origin": "Quando Gaia entrou em sono profundo, dividindo suas dádivas entre seus filhos, o seu pecado fundamental também tomou forma, criando um deus não planejado. Começou como um rumor, a sombra de algo que espreitava sob a luz pálida das Luas e se escondia abaixo da terra, sussurrando verdades brutais aos ouvidos dos Primordiais. Esse vigésimo primeiro deus era Athranamad, que em segredo, por escolha ou não - comungava com as forças do Abismo, forjando abaixo dos olhos dos outros deuses seu Legado sob os moldes dos Arquidemônios.\nQuando foi descoberto, teve seus crimes julgados, sendo condenado à destruição. Contudo, ao invés disso, foi fragmentado pelas mãos de Kalgoras e cada parte de seu corpo foi escondida dos outros deuses. Com receio do que poderia acontecer, por não saber a origem ou o que escondia Athranamad em suas criações, Gruneak jurou guiar o Legado da divindade corrompida, para a surpresa de seus irmãos e irmãs, nomeando-os de daeva, os quais teriam os valdraks como seus carcereiros.\nMesmo com os laços entre daevas, Athranamad e Abismo cortados, sua essência já pertencia ao caos. Mesmo com todas as tentativas de anular a influência de Athranamad em Arba'shatrah, nada poderia ser feito, pois a Dúvida não é um poder, um ser, algo que possa ser morto, mas sim um veneno que se alastra na existência, indestrutível, pode ser apenas contido. Tanto Primordiais quanto deuses já não podiam mais esconder aquilo que se enraizara na parte mais profunda de seus corações, sendo esse o primeiro passo para o fim.\nDomados como cães pelos valdraks, os daevas serviram como pontas de lança na guerra em Arba'shatrah. Ambos os povos foram criados apenas para servir como ferramentas, mas a diferença era que um povo aceitava e se orgulhava disto, o outro não. Com o fim da guerra, os daevas acompanharam valdraks e anões em direção ao norte do novo mundo. Com a proliferação da Veldrana e a escassez de comida, os daevas foram expulsos de Trunetak, a capital valdrakiana, encontrando no leste os picos que futuramente chamariam de lar, Azraj.",
      "traditions": "Os daevas não possuem exatamente um governante, mas representantes distritais, ou isso é o que as outras nações acreditam. Em segredo, são liderados pelo Senhor, um daeva que mantém seu povo unido, visando proporcionar melhores condições para sua pequena nação. Devido à Kuldrana Azraj possui um clima ameno, possibilitando que sobrevivam com base na agricultura, principal produto de exportação, vendendo suas frutas e verduras para o restante do continente.\nOs daevas são amaldiçoados com o fardo de precisar controlar, literalmente, seus demônios. Para isso, utilizam diversos ritos pessoais, mas principalmente a meditação. Os anciões daevas submetem os mais jovens a testes de controle, verificando a integridade de sua sanidade e mantendo seus terrores sob controle. Os em estado mais crítico são enterrados vivos por tempo indeterminado, em posição vertical, com apenas a cabeça exposta à superfície. Privados de movimento, dependem unicamente da força de suas mentes para conquistarem a salvação de seus corpos. Aqueles que falharem serão abatidos, pois ainda são escravos do Abismo.\nO isolamento intencional do povo daêvola os fez desenvolver um gosto especial pela filosofia e pela arte, principalmente pintura, dramaturgia e poesia. Normalmente, assinam suas obras com pseudônimos, tendo suas peças vendidas e encenadas, principalmente, nos grandes teatros narzepianos. Da mesma maneira, suas pinturas são estimadas pela nobreza ao redor do mundo, devido à delicadeza e expressividade empregada em cada obra, como se pudessem ler a essência do autor em traços e palavras tão belas. Além disso, se provaram excelentes atores, fundando a Traggória, um estilo teatral trágico e mudo, utilizando seus talentos naturais de acentuar seus semblantes abissais para expressar as mais diversas emoções.\nO ritual funerário daêvola pode parecer grotesco aos olhos de estrangeiros. Eles acreditam que toda a sua vida é uma disputa pela integridade de sua essência e, na morte, devem se livrar de sua contraparte demoníaca para serem abraçados pelo Limbo de forma pura. Para isso, seus cadáveres têm suas contrapartes demoníacas arrancadas e pelos raspados, mesmo que isso deforme seus corpos, somente serão enterrados ou cremados.",
      "inWorld": "Fora de Drakar, os Daevas costumam ser hostilizados, seja pelos leigos devido à sua aparência, seja por aquele que conhecem um pouco de história, devido à sua essência. Seus dons abissais nunca são vistos com bons olhos, mas, ainda assim, são úteis para a maioria dos trabalhos, dando origem a uma relação fria entre os daevas e os outros Legados.\nPara um daeva, é necessário controlar as trevas no coração e, devido a isso, receiam interagir com outros povos, justamente pelo preconceito com o seu povo. Por mais que, historicamente, possuam a mesma divindade como patrona, daevas e valdraks nunca foram realmente unidos. A Guerra da Tempestade, na qual, assim como os anões, os daevas conquistaram sua independência, tornou a relação entre os filhos de Athranamad e de Gruneak mais frias do que nunca.\nA dramaturgia daêvola exalta os feitos de seus semelhantes, principalmente as histórias que remontam os feitos de Zar'kavek, o Avatar de Athranamad que lutou contra Keldanas durante a Ruptura, ou Azzathra, uma caçadora de demônios que salvou diversas pessoas durante suas jornadas. Essas peças teatrais abrem espaço para que outros daevas possam, timidamente, conectar-se com outros povos e, por isso, não é mais incomum avistá-los em outras nações. Em contrapartida, alguns se entregam ao Abismo, piorando ainda mais sua reputação, originando os Infernantes, daevas especializados em caçar demônios e daevas desordeiros, assegurando que as conquistas diárias de seu povo não sejam maculadas pelo descontrole daqueles que perderam suas lutas contra seus próprios demônios."
    }
  },
  {
    "_id": "lg00040000000000",
    "name": "Delahk",
    "type": "legacy",
    "img": "icons/commodities/gems/gem-shattered-diamond-green.svg",
    "legadoKey": "delahk",
    "folder": "fldlg00040000000",
    "_key": "!items!lg00040000000000",
    "system": {
      "name": "Delahk",
      "height": "Entre 1,50m e 1,80 metros de altura.",
      "lifeExpectancy": "Delahks podem viver até os 70 anos, sendo considerados adultos com 14 anos. Diferentemente de outros Legados, que de maneira geral podem se reproduzir com Legados diferentes, delahks apenas podem gerar descendentes ao se relacionarem com outro delahk, tornando a adoção uma prática comum entre seu povo.",
      "appearance": "Seres reptilianos, nascidos das escamas e sorrisos de sua grande divindade Pris'ma. De pele escamosa, sempre esboçando um ar suave, esse povo vívido possui uma pele que varia de tons terrosos, avermelhados, esverdeados ou acinzentados, a até mesmo tons azuis ou brancos. Possuem olhos que parecem joias preciosas, tão brilhantes quanto os seus espólios. Existe apenas uma pequena diferença entre machos e fêmeas: os machos geralmente contam com pequenos espinhos salientes, que adornam os seus maxilares, similar às barbas de outros legados, enquanto as fêmeas possuem caudas mais longas e finas.",
      "description": "'Algo perdido deve sempre ser agraciado com a busca'. Um dos incontáveis ditados delahks. Não é raro vê-los ostentando joias e adornos em seus narizes, supercílios, lábios, braços, pernas, caudas e em tantas outras partes. Para esse povo, riqueza não é apenas as moedas no seu bolso, mas também desfrutar da bênção de estarem vivos e toda a alegria que o mundo pode proporcionar. Sua paixão pela riqueza além do ouro os fez criar um gosto pelo comércio, pela troca, por terem em suas mãos tantos objetos com tantas histórias, e repassá-las para tantos outros. Através dessas trocas, esperam um dia encontrar pistas de sua cidade perdida, Ya'ará. Mas para alguns delahks, isso é bobagem e o ato de acumular tesouros é a verdadeira forma de viver. Mesmo que muitos não possuam acesso a tais riquezas, a ideia de possuí-las os move em direção à conquista de uma vida plena e feliz.",
      "legacyAbilities": [
        {
          "name": "Versatilidade",
          "description": "Você pode utilizar as suas mãos e seus pés para escalar e se movimentar por qualquer superfície sólida, fixando-se nessa superfície sem teste algum.",
          "actions": []
        },
        {
          "name": "Miragem",
          "description": "Com uma Ação Simples, você pode criar uma das pequenas ilusões a seguir, que permanecerá ativa por 10 minutos:\n• Um efeito sensorial em um local dentro 6 metros, que produzirá sons ou odores à sua escolha.\n• Um objeto inofensivo, que caiba em sua mão.\n• Um pequeno símbolo em um objeto ou superfície dentro de 6 metros.\nEssa ilusão é desfeita caso você realize uma nova ilusão com essa habilidade.",
          "actions": [
            {
              "id": "act_miragem",
              "name": "Miragem",
              "description": "Cria uma pequena ilusão sensorial (som/odor a 6m), objeto inofensivo de mão ou símbolo que dura 10 minutos.",
              "cost": "",
              "type": {
                "actionType": "acaoSimples",
                "category": "suporte",
                "tags": [
                  "ilusao"
                ]
              },
              "attack": {
                "hasAttack": false
              },
              "damage": {
                "hasDamage": false
              },
              "healing": {
                "hasHealing": false
              },
              "condition": {
                "hasCondition": false
              },
              "check": {
                "hasCheck": false
              },
              "areaOfEffect": {
                "hasArea": false
              }
            }
          ]
        },
        {
          "name": "Malabarismo",
          "description": "Durante seu turno, sem custo de Ação, você poderá sacar, trocar ou guardar um Armamento, utilizar ou passar um item para um Alvo dentro de 1 metro. Esse efeito ocorre apenas uma vez por turno.\nAlém disso, você pode utilizar a sua cauda para outras pequenas ações inofensivas, desde que sejam autorizadas pelo Narrador.",
          "actions": [
            {
              "id": "act_malabarismo",
              "name": "Malabarismo",
              "description": "1x por turno, sem custo de ação: sacar, trocar ou guardar armamento, ou utilizar/passar item para alvo a até 1 metro.",
              "cost": "",
              "type": {
                "actionType": "acaoRapida",
                "category": "utilidade",
                "tags": [
                  "manobra"
                ]
              },
              "attack": {
                "hasAttack": false
              },
              "damage": {
                "hasDamage": false
              },
              "healing": {
                "hasHealing": false
              },
              "condition": {
                "hasCondition": false
              },
              "check": {
                "hasCheck": false
              },
              "areaOfEffect": {
                "hasArea": false
              }
            }
          ]
        }
      ],
      "continente": "Krabesh",
      "altura": "Entre 1,50m e 1,80 metros de altura.",
      "expectativa_de_vida": "Delahks podem viver até os 70 anos, sendo considerados adultos com 14 anos. Diferentemente de outros Legados, que de maneira geral podem se reproduzir com Legados diferentes, delahks apenas podem gerar descendentes ao se relacionarem com outro delahk, tornando a adoção uma prática comum entre seu povo.",
      "aparencia": "Seres reptilianos, nascidos das escamas e sorrisos de sua grande divindade Pris'ma. De pele escamosa, sempre esboçando um ar suave, esse povo vívido possui uma pele que varia de tons terrosos, avermelhados, esverdeados ou acinzentados, a até mesmo tons azuis ou brancos. Possuem olhos que parecem joias preciosas, tão brilhantes quanto os seus espólios. Existe apenas uma pequena diferença entre machos e fêmeas: os machos geralmente contam com pequenos espinhos salientes, que adornam os seus maxilares, similar às barbas de outros legados, enquanto as fêmeas possuem caudas mais longas e finas.",
      "descricao": "'Algo perdido deve sempre ser agraciado com a busca'. Um dos incontáveis ditados delahks. Não é raro vê-los ostentando joias e adornos em seus narizes, supercílios, lábios, braços, pernas, caudas e em tantas outras partes. Para esse povo, riqueza não é apenas as moedas no seu bolso, mas também desfrutar da bênção de estarem vivos e toda a alegria que o mundo pode proporcionar. Sua paixão pela riqueza além do ouro os fez criar um gosto pelo comércio, pela troca, por terem em suas mãos tantos objetos com tantas histórias, e repassá-las para tantos outros. Através dessas trocas, esperam um dia encontrar pistas de sua cidade perdida, Ya'ará. Mas para alguns delahks, isso é bobagem e o ato de acumular tesouros é a verdadeira forma de viver. Mesmo que muitos não possuam acesso a tais riquezas, a ideia de possuí-las os move em direção à conquista de uma vida plena e feliz.",
      "origem": "Acometida pela ilusão de ter a sua mente invadida constantemente por ideias surreais, Pris'ma decidiu nunca mais dormir, nunca mais sonhar, pois sua imaginação era como uma besta voraz, que lhe devorava a calma. A divindade então removeu suas pálpebras, transformando-as em espelhos que guardariam a sua imaginação, seus sonhos e sua memória. Sempre que possível, ou necessário, Pris'ma entrava nos espelhos, onde podia viver suas fantasias e criar seu próprio mundo. Contudo, sempre que retornava a Arba'shatrah, as memórias criadas nesse mundo ficavam para trás. Dentro do espelho, Pris'ma primeiro criou um campo florido, depois lagos e montanhas, então uma cidade, chamada Ya'ara, junto de seu primeiro habitante, Ladaq, por fim, criou seres escamosos semelhantes a ele, os quais chamara de delahks. Alguns desses conseguiram atravessar o espelho e adentrar Arba'shatrah, passando a conviver com os demais Legados da primeira cidade, mesmo que sua criadora não lembrasse de tê-los criado. Durante a guerra de Arba'shatrah, quando a Dúvida sorrateiramente adentrou a mente dos Primordiais, os delahks se refugiaram em Ya'ará, localizada na Floresta de Ak'dala, ao leste. Quando a guerra terminou, ofereceram abrigo aos povos kitari, orkrash e draenum. A paz durou, possivelmente, séculos, mas, quando o Rei Solasta adentrou na camada mais profunda da cidade, onde era guardado o núcleo que sustentava a cidade, tudo fora condenado. Ao tocá-lo, a ira de Pris'ma recaiu sobre a sua existência, revogando o seu presente - Ya'ará. Como uma miragem, a cidade desaparecera. Ao mesmo tempo, toda a Floresta de Ak'dala se transformara num infinito deserto. Desamparados e confusos com a nova realidade, os delahks reforçaram seus laços com o povo kitari, fundando juntos a cidade de Jazaar, um novo lugar que poderiam chamar de lar.",
      "tradicoes": "Delahks se organizam em tribos com numerosos membros, sem a necessidade de laços de sangue, conhecidas apenas como Famílias. Não existe um modelo padrão para essas famílias, podendo ser liderados por um patriarca, uma matriarca, um conselho, ou apenas agrupamentos sem lideranças. A grande maioria dessas famílias são leais ao Soberano do Deserto, sendo as mais conhecidas a Família Zandakarr, fundadora da Companhia Mercante Zandakari; a Família Hassad, um grupo nômade, que vaga pelo deserto com suas casas no dorso de grandes criaturas e que oferecem seus serviços de transporte; e a Família Farash, dona de uma reputação questionável, especializada em tráfico de escravos, comercio de relíquias e outros tipos de mercadorias ilegais vendidas pelo submundo. Distante de Jazaar, em Thurgraak, é realizado o Ritual da Revelação. Quando um delahk completa seus 14 anos, ele deverá peregrinar até Thurgraak para confrontar o Espelho das Areias, um presente da sua criadora Pris'ma. Diante do espelho, o objeto revela a natureza da alma do delahk. Caso seu coração abrigue uma maldade sem igual, pesadelos consumirão a sua mente, deixando no lugar uma casca vazia, sem sentimentos ou vontades, com o destino de servir o templo por toda a vida que lhe restar. Caso o jovem delahk possua uma alma minimamente decente, Pris'ma o presenteará com um tesouro em algum momento de suas vidas. Esses tesouros não são necessariamente materiais, e a grandiosidade do tesouro depende da grandiosidade de suas almas. O povo delahk é muito supersticioso, acreditando que as palavras possuem o poder de transformar sonhos em realidade. Devido a isso, ao longo das eras, formularam diversos ditados para as mais diversas situações, que nunca devem ser utilizadas de forma leviana. Os mais tradicionais, usados geralmente em despedidas ou desejos de boa viagem, são: 'Que as areias de Krabesh o protejam', 'Que a água de seu cantil seja sempre pura', 'Que a amargura não tenha morada no seu sorriso', e por fim, 'Que Pris'ma guie seus passos'. Seu apreço por tesouros os fez criar o costume de lamber objetos para determinar o seu valor. Essa prática inclusive foi determinante para a criação do sistema monetário, visto que, segundo Vezershak - criador das moedas - o ouro possuía um gosto mais agradável que a prata.",
      "no_mundo": "Possivelmente um dos Legados mais populosos de Auroria, delahks são curiosos inveterados. O mundo se tornou parte da rota das suas vidas, preenchendo os mais diversos espaços, nos mais diversos ofícios. Recebidos em diversos lugares como importantes amigos e, pelo preço certo, fingem que são, sempre com uma aparente alegria, suavizando o clima do local. A grande verdade é que muitos acreditam que todo delahk possui uma grande fortuna, e que agradar um delahk pode providenciar algumas moedas a mais. Fora de Krabesh, geralmente estão ligados a grandes cidades e seus núcleos comerciais, atuando, ou não, como representantes de Jazaar na sua expansão comercial, assim como na busca de tesouros exóticos. As contribuições do sistema comercial criados pelos delahks afeta todo o mundo civilizado - mesmo que não tenham sido criados com as melhores das intenções - atribuindo valores em simples pedaços de metal que não possuíam tanta serventia, vendendo a ilusão de poder e riqueza. Contudo, não esperavam que sua mentira se tornasse realidade e, agora, o mundo é governado pelo dinheiro. Diferente de outros povos, delahks não nutriram desavenças ou conflitos com outros povos através da história. Talvez isso tenha sido fundamental para Jazaar ser tão pacífica diante dos olhos do restante do mundo, mesmo que, dentro de suas muralhas, isso não seja necessariamente verdade. Esse povo sempre preferiu meios que, a longo prazo, tragam algum benefício, como instaurar rotas comerciais, propagandear seus mercados, ou buscar objetos valiosos, mesmo que eles não necessariamente vivenciem o resultado de seus esforços.",
      "nomes_comuns_origem": [
        "Anisha",
        "Darun",
        "Er'kel",
        "Kavesh",
        "Sarkhan"
      ],
      "abilities": [
        "hl000a0000000000",
        "hl000b0000000000",
        "hl000c0000000000"
      ],
      "origin": "Acometida pela ilusão de ter a sua mente invadida constantemente por ideias surreais, Pris'ma decidiu nunca mais dormir, nunca mais sonhar, pois sua imaginação era como uma besta voraz, que lhe devorava a calma. A divindade então removeu suas pálpebras, transformando-as em espelhos que guardariam a sua imaginação, seus sonhos e sua memória. Sempre que possível, ou necessário, Pris'ma entrava nos espelhos, onde podia viver suas fantasias e criar seu próprio mundo. Contudo, sempre que retornava a Arba'shatrah, as memórias criadas nesse mundo ficavam para trás. Dentro do espelho, Pris'ma primeiro criou um campo florido, depois lagos e montanhas, então uma cidade, chamada Ya'ara, junto de seu primeiro habitante, Ladaq, por fim, criou seres escamosos semelhantes a ele, os quais chamara de delahks. Alguns desses conseguiram atravessar o espelho e adentrar Arba'shatrah, passando a conviver com os demais Legados da primeira cidade, mesmo que sua criadora não lembrasse de tê-los criado. Durante a guerra de Arba'shatrah, quando a Dúvida sorrateiramente adentrou a mente dos Primordiais, os delahks se refugiaram em Ya'ará, localizada na Floresta de Ak'dala, ao leste. Quando a guerra terminou, ofereceram abrigo aos povos kitari, orkrash e draenum. A paz durou, possivelmente, séculos, mas, quando o Rei Solasta adentrou na camada mais profunda da cidade, onde era guardado o núcleo que sustentava a cidade, tudo fora condenado. Ao tocá-lo, a ira de Pris'ma recaiu sobre a sua existência, revogando o seu presente - Ya'ará. Como uma miragem, a cidade desaparecera. Ao mesmo tempo, toda a Floresta de Ak'dala se transformara num infinito deserto. Desamparados e confusos com a nova realidade, os delahks reforçaram seus laços com o povo kitari, fundando juntos a cidade de Jazaar, um novo lugar que poderiam chamar de lar.",
      "traditions": "Delahks se organizam em tribos com numerosos membros, sem a necessidade de laços de sangue, conhecidas apenas como Famílias. Não existe um modelo padrão para essas famílias, podendo ser liderados por um patriarca, uma matriarca, um conselho, ou apenas agrupamentos sem lideranças. A grande maioria dessas famílias são leais ao Soberano do Deserto, sendo as mais conhecidas a Família Zandakarr, fundadora da Companhia Mercante Zandakari; a Família Hassad, um grupo nômade, que vaga pelo deserto com suas casas no dorso de grandes criaturas e que oferecem seus serviços de transporte; e a Família Farash, dona de uma reputação questionável, especializada em tráfico de escravos, comercio de relíquias e outros tipos de mercadorias ilegais vendidas pelo submundo. Distante de Jazaar, em Thurgraak, é realizado o Ritual da Revelação. Quando um delahk completa seus 14 anos, ele deverá peregrinar até Thurgraak para confrontar o Espelho das Areias, um presente da sua criadora Pris'ma. Diante do espelho, o objeto revela a natureza da alma do delahk. Caso seu coração abrigue uma maldade sem igual, pesadelos consumirão a sua mente, deixando no lugar uma casca vazia, sem sentimentos ou vontades, com o destino de servir o templo por toda a vida que lhe restar. Caso o jovem delahk possua uma alma minimamente decente, Pris'ma o presenteará com um tesouro em algum momento de suas vidas. Esses tesouros não são necessariamente materiais, e a grandiosidade do tesouro depende da grandiosidade de suas almas. O povo delahk é muito supersticioso, acreditando que as palavras possuem o poder de transformar sonhos em realidade. Devido a isso, ao longo das eras, formularam diversos ditados para as mais diversas situações, que nunca devem ser utilizadas de forma leviana. Os mais tradicionais, usados geralmente em despedidas ou desejos de boa viagem, são: 'Que as areias de Krabesh o protejam', 'Que a água de seu cantil seja sempre pura', 'Que a amargura não tenha morada no seu sorriso', e por fim, 'Que Pris'ma guie seus passos'. Seu apreço por tesouros os fez criar o costume de lamber objetos para determinar o seu valor. Essa prática inclusive foi determinante para a criação do sistema monetário, visto que, segundo Vezershak - criador das moedas - o ouro possuía um gosto mais agradável que a prata.",
      "inWorld": "Possivelmente um dos Legados mais populosos de Auroria, delahks são curiosos inveterados. O mundo se tornou parte da rota das suas vidas, preenchendo os mais diversos espaços, nos mais diversos ofícios. Recebidos em diversos lugares como importantes amigos e, pelo preço certo, fingem que são, sempre com uma aparente alegria, suavizando o clima do local. A grande verdade é que muitos acreditam que todo delahk possui uma grande fortuna, e que agradar um delahk pode providenciar algumas moedas a mais. Fora de Krabesh, geralmente estão ligados a grandes cidades e seus núcleos comerciais, atuando, ou não, como representantes de Jazaar na sua expansão comercial, assim como na busca de tesouros exóticos. As contribuições do sistema comercial criados pelos delahks afeta todo o mundo civilizado - mesmo que não tenham sido criados com as melhores das intenções - atribuindo valores em simples pedaços de metal que não possuíam tanta serventia, vendendo a ilusão de poder e riqueza. Contudo, não esperavam que sua mentira se tornasse realidade e, agora, o mundo é governado pelo dinheiro. Diferente de outros povos, delahks não nutriram desavenças ou conflitos com outros povos através da história. Talvez isso tenha sido fundamental para Jazaar ser tão pacífica diante dos olhos do restante do mundo, mesmo que, dentro de suas muralhas, isso não seja necessariamente verdade. Esse povo sempre preferiu meios que, a longo prazo, tragam algum benefício, como instaurar rotas comerciais, propagandear seus mercados, ou buscar objetos valiosos, mesmo que eles não necessariamente vivenciem o resultado de seus esforços."
    }
  },
  {
    "_id": "lg00050000000000",
    "name": "Draenum",
    "type": "legacy",
    "img": "icons/magic/unholy/silhouette-robe-glowing-purple.svg",
    "legadoKey": "draenum",
    "folder": "fldlg00040000000",
    "_key": "!items!lg00050000000000",
    "system": {
      "name": "Draenum",
      "height": "Entre 1,60m e 1,80 metros de altura.",
      "lifeExpectancy": "Draenuns podem viver até os 150 anos e são considerados independentes, para a maioria de suas ações, aos 17 anos.",
      "appearance": "Os draenuns nascem com uma das suas mãos retorcida e alongada, como uma garra, e orelhas pontudas e alongadas. Sua pele escura possui tons de roxo, azul ou cinza, além de finas linhas cor de obsidiana espalhadas pelo corpo, formando padrões únicos. Seus olhos podem ser avermelhados, púrpuras ou alaranjados e seus cabelos possuem tonalidades brancas, cinzas, azuis, roxas ou pretas. Dizem que, quando um draenum morre, as linhas obsidianas que marcam sua pele se despedem de seus corpos, indo ao encontro do solo, como se os seus corpos fossem purificados.",
      "description": "Abraçados pelo manto noturno e protegendo o mundo do desconhecido, os draenuns travam batalhas silenciosas contra os Seres da Noite, criaturas oriundas do Domínio Sombrio, que vagam pelas galerias subterrâneas de Noctúrnia, em algum lugar abaixo do Deserto de Ak'dala. Tendo sua essência tingida pela escuridão e sendo influenciados pelo Domínio Sombrio, os draenuns normalmente são vistos como apáticos e aparentemente vazios. Sua sociedade os ensina a ser polidos e engenhosos, num eterno conflito entre abraçar suas emoções e escondê-las no canto mais profundo dos seus corações, pois acreditam que o descontrole emocional induz ao erro.",
      "legacyAbilities": [
        {
          "name": "Presente das Sombras",
          "description": "Você pode utilizar as linhas obsidianas de sua pele para manipular as sombras ao seu redor, podendo realizar pequenos truques com elas dentro de 3 metros, como abrir uma porta destrancada, segurar um cálice, entre outros pequenos efeitos inofensivos, desde que sejam autorizados pelo Narrador.",
          "actions": []
        },
        {
          "name": "Herança da Eterna Escuridão",
          "description": "Você possui Infravisão Mística.",
          "actions": []
        },
        {
          "name": "Manto Noturno",
          "description": "Caso seja o alvo de uma Condição Mágica, você poderá realizar o teste de Espírito para removê-la antes de recebê-la. Caso tenha sucesso, você não receberá a Condição Mágica.",
          "actions": [
            {
              "id": "act_manto_noturno",
              "name": "Manto Noturno",
              "description": "Ao ser alvo de uma Condição Mágica, realiza imediatamente o teste de Espírito para anulá-la antes de recebê-la.",
              "cost": "",
              "type": {
                "actionType": "reacao",
                "category": "defesa",
                "tags": [
                  "reacao",
                  "resistencia"
                ]
              },
              "attack": {
                "hasAttack": false
              },
              "damage": {
                "hasDamage": false
              },
              "healing": {
                "hasHealing": false
              },
              "condition": {
                "hasCondition": false
              },
              "check": {
                "hasCheck": true,
                "category": "parameter",
                "attribute": "spirit",
                "difficulty": 10,
                "onSuccess": "Não recebe a Condição Mágica",
                "onFailure": "Recebe a Condição Mágica normalmente"
              },
              "areaOfEffect": {
                "hasArea": false
              }
            }
          ]
        }
      ],
      "continente": "Krabesh",
      "altura": "Entre 1,60m e 1,80 metros de altura.",
      "expectativa_de_vida": "Draenuns podem viver até os 150 anos e são considerados independentes, para a maioria de suas ações, aos 17 anos.",
      "aparencia": "Os draenuns nascem com uma das suas mãos retorcida e alongada, como uma garra, e orelhas pontudas e alongadas. Sua pele escura possui tons de roxo, azul ou cinza, além de finas linhas cor de obsidiana espalhadas pelo corpo, formando padrões únicos. Seus olhos podem ser avermelhados, púrpuras ou alaranjados e seus cabelos possuem tonalidades brancas, cinzas, azuis, roxas ou pretas. Dizem que, quando um draenum morre, as linhas obsidianas que marcam sua pele se despedem de seus corpos, indo ao encontro do solo, como se os seus corpos fossem purificados.",
      "descricao": "Abraçados pelo manto noturno e protegendo o mundo do desconhecido, os draenuns travam batalhas silenciosas contra os Seres da Noite, criaturas oriundas do Domínio Sombrio, que vagam pelas galerias subterrâneas de Noctúrnia, em algum lugar abaixo do Deserto de Ak'dala. Tendo sua essência tingida pela escuridão e sendo influenciados pelo Domínio Sombrio, os draenuns normalmente são vistos como apáticos e aparentemente vazios. Sua sociedade os ensina a ser polidos e engenhosos, num eterno conflito entre abraçar suas emoções e escondê-las no canto mais profundo dos seus corações, pois acreditam que o descontrole emocional induz ao erro.",
      "origem": "Dentre todas as divindades de Édona, Aether, a Eterna Noite, sem dúvidas era a mais obstinada com suas vontades. Irreverente e sempre distante de seus irmãos, agia sozinha, de forma egoísta. Com o tempo, foi esquecida. Esse esquecimento lhe garantiu liberdade, criando seu legado aos poucos, detalhe por detalhe. Nomeados de draenum, eram conhecidos como o Legado das Sombras pelos outros povos, pois sua presença era estranha, como se fossem visitantes de um lugar distante. Não demorou muito para os draenuns crescerem em números, estabelecendo relações de poder entre si e subdividindo-se em clãs, tendo Lenore, sua Primogênita, como porta-voz da Eterna Noite. Seja pela guerra ou a queda da Torre dos Imortais, todos os povos experimentaram o gosto amargo dos sentimentos negativos, principalmente o desespero e a impotência. Sendo a guardiã dos segredos, Aether tentou selar esses sentimentos negativos, buscando livrar tanto deuses quanto mortais dessa dor. Entretanto, o processo criou, inconscientemente, um reflexo distorcido de Auroria, que ficou conhecido como o Domínio Sombrio. Na tentativa de aliviar o fardo de sua criadora, os draenuns repousaram suas mãos no corpo da divindade, tentando absorver parte da energia negativa. Esse ato corrompeu os seus corpos, deformando a mão que tocava a divindade, e desestabilizando suas emoções, fazendo surgir linhas negras em seus corpos marcas de sua ligação com o Domínio Sombrio. Após o fim da guerra, desamparados, recorreram ao Rei Solasta, seu único aliado, observando nele o brilho que haviam perdido. Sendo aceitos na comitiva para Ya'ará, presenciaram de perto, e com pesar, o fim do Rei Solasta. Após o desvanecer de Ya'ará, ouviram o fraco chamado das sombras, sussurros orientando-os para o subterrâneo, onde encontraram fissuras que eram ligadas a um plano específico, revelando seu destino perpétuo de resguardar o mundo da influência do Domínio Sombrio.",
      "tradicoes": "A sociedade draenúrica é dividida em clãs, cada um com suas leis, costumes e ordenações, liderados pelo patriarca ou matriarca mais velhos. Do nascimento até sua morte, um draenum permanece em seu clã de origem, exceto em raros casos, como possuir a permissão de criar um novo clã. Caso indivíduos de clãs diferentes se relacionem, seus filhos pertencerão ao clã que possui maior tradição ou renome. Todos os clãs são subservientes ao monarca draenum, que sempre pertence ao clã Lenore, fundado pela Primogênita draenum. Seguindo os passos de Lenore - conhecida como Coração de Mármore e buscando governar com efetividade, os líderes dos clãs draenuns são submetidos ao Ritual de Mavalek, nome dado em homenagem ao primeiro Legionário Cinzento e criador do Poço dos Pecados, uma fonte de águas místicas, localizada na catedral de Noctúrnia. Para realizar o ritual, é necessário mergulhar nas águas do Poço dos Pecados junto a uma adaga de prata. Esse processo preserva a racionalidade, mas as linhas obsidiana de seu corpo e suas emoções são retiradas e trancafiadas nessa adaga, maculando o nobre metal. Caso a lâmina da adaga escureça, o ritual é validado. Em eras passadas, os Legionários Místicos da Legião do Templo Cinzento eram submetidos ao Ritual de Mavalek, mas desde a marginalização da organização, essa tradição lhes foi negada. Atualmente, surgiram os Imaculados, aqueles que abrem mão de seus clãs e suas posses, submetendo-se ao Ritual de Mavalek para servirem como guardiões reais, guardas da cidade ou guardas pessoais de algum nobre. As adagas de prata dos Imaculados são propriedade de seus senhores, e devolver sua adaga significa dispensar seus serviços. O povo draenúrico aprecia muito um bom jogo. Contudo, os Jogos da Corte são mais que uma tradição, eles definem vidas e futuros, fomentando o poder entre os clãs. Um dos jogos mais comuns é o Jogo das Mentiras, no qual o desafiado deve proferir três afirmações e o desafiante deve dizer quais são mentiras. O desafiante escolhe uma recompensa, enquanto o desafiado escolhe uma punição ou tributo a ser pago, desde que possua igual valor à recompensa solicitada, como, por exemplo, apostar a troca de posição de seus clãs e, caso perca, o seu clã se tornará vassalo do vencedor. O perdedor pode impor uma condição, caso tenha vencido em uma das afirmações.",
      "no_mundo": "Um povo outrora desconhecido, isolado no subterrâneo, apenas rumores ou menções em lendas krabeshianas. Foi apenas quando Fengral o Avatar de Aether - uniu-se à campanha contra Keldanas, que o mundo pôde conhecer os draenuns. Desde então, não nutriram muitas inimizades ou amizades notáveis com outros povos além de Krabesh. Inaris e anões foram os únicos povos que puderam acessar Noctúrnia sem auxílio - inaris podem ver através das miragens que escondem as entradas de Noctúrnia, e as galerias subterrâneas de Noctúrnia, de alguma forma, se conectaram aos túneis de Kraun'gar. Esses detalhes estabeleceram uma relação amistosa entre os povos, mesmo que de forma preventiva. A cada dia, mais e mais draenuns se espalham pelo mundo e, quando fora dos limites de Noctúrnia, geralmente são reservados e cautelosos, como se estivessem perdidos. Costumam estranhar o fato de despertarem a curiosidade alheia e, como tudo que é diferente, muitas vezes são hostilizados e tratados como ameaças. Contudo, nada que a etiqueta da corte e seu ar galante não resolva. Não é incomum vê-los na companhia de nobres ou pessoas poderosas. Existem poucos motivos razoáveis para um jovem draenum atravessar os Portões Sombrios de Noctúrnia. seja buscando escapar das situações insustentáveis que ele ou seus antepassados geraram através dos Jogos da Corte, ou por uma indomável vontade pessoal. Uma vez livres pelo mundo, o peso de saber que talvez nunca mais possam saborear um bom vinho nocturniano sempre pesará em suas decisões.",
      "nomes_comuns_origem": [
        "Aezoth",
        "Ereldra",
        "Giulav",
        "Lerant",
        "Phoebe",
        "Valzt"
      ],
      "abilities": [
        "hl000d0000000000",
        "hl000e0000000000",
        "hl000f0000000000"
      ],
      "origin": "Dentre todas as divindades de Édona, Aether, a Eterna Noite, sem dúvidas era a mais obstinada com suas vontades. Irreverente e sempre distante de seus irmãos, agia sozinha, de forma egoísta. Com o tempo, foi esquecida. Esse esquecimento lhe garantiu liberdade, criando seu legado aos poucos, detalhe por detalhe. Nomeados de draenum, eram conhecidos como o Legado das Sombras pelos outros povos, pois sua presença era estranha, como se fossem visitantes de um lugar distante. Não demorou muito para os draenuns crescerem em números, estabelecendo relações de poder entre si e subdividindo-se em clãs, tendo Lenore, sua Primogênita, como porta-voz da Eterna Noite. Seja pela guerra ou a queda da Torre dos Imortais, todos os povos experimentaram o gosto amargo dos sentimentos negativos, principalmente o desespero e a impotência. Sendo a guardiã dos segredos, Aether tentou selar esses sentimentos negativos, buscando livrar tanto deuses quanto mortais dessa dor. Entretanto, o processo criou, inconscientemente, um reflexo distorcido de Auroria, que ficou conhecido como o Domínio Sombrio. Na tentativa de aliviar o fardo de sua criadora, os draenuns repousaram suas mãos no corpo da divindade, tentando absorver parte da energia negativa. Esse ato corrompeu os seus corpos, deformando a mão que tocava a divindade, e desestabilizando suas emoções, fazendo surgir linhas negras em seus corpos marcas de sua ligação com o Domínio Sombrio. Após o fim da guerra, desamparados, recorreram ao Rei Solasta, seu único aliado, observando nele o brilho que haviam perdido. Sendo aceitos na comitiva para Ya'ará, presenciaram de perto, e com pesar, o fim do Rei Solasta. Após o desvanecer de Ya'ará, ouviram o fraco chamado das sombras, sussurros orientando-os para o subterrâneo, onde encontraram fissuras que eram ligadas a um plano específico, revelando seu destino perpétuo de resguardar o mundo da influência do Domínio Sombrio.",
      "traditions": "A sociedade draenúrica é dividida em clãs, cada um com suas leis, costumes e ordenações, liderados pelo patriarca ou matriarca mais velhos. Do nascimento até sua morte, um draenum permanece em seu clã de origem, exceto em raros casos, como possuir a permissão de criar um novo clã. Caso indivíduos de clãs diferentes se relacionem, seus filhos pertencerão ao clã que possui maior tradição ou renome. Todos os clãs são subservientes ao monarca draenum, que sempre pertence ao clã Lenore, fundado pela Primogênita draenum. Seguindo os passos de Lenore - conhecida como Coração de Mármore e buscando governar com efetividade, os líderes dos clãs draenuns são submetidos ao Ritual de Mavalek, nome dado em homenagem ao primeiro Legionário Cinzento e criador do Poço dos Pecados, uma fonte de águas místicas, localizada na catedral de Noctúrnia. Para realizar o ritual, é necessário mergulhar nas águas do Poço dos Pecados junto a uma adaga de prata. Esse processo preserva a racionalidade, mas as linhas obsidiana de seu corpo e suas emoções são retiradas e trancafiadas nessa adaga, maculando o nobre metal. Caso a lâmina da adaga escureça, o ritual é validado. Em eras passadas, os Legionários Místicos da Legião do Templo Cinzento eram submetidos ao Ritual de Mavalek, mas desde a marginalização da organização, essa tradição lhes foi negada. Atualmente, surgiram os Imaculados, aqueles que abrem mão de seus clãs e suas posses, submetendo-se ao Ritual de Mavalek para servirem como guardiões reais, guardas da cidade ou guardas pessoais de algum nobre. As adagas de prata dos Imaculados são propriedade de seus senhores, e devolver sua adaga significa dispensar seus serviços. O povo draenúrico aprecia muito um bom jogo. Contudo, os Jogos da Corte são mais que uma tradição, eles definem vidas e futuros, fomentando o poder entre os clãs. Um dos jogos mais comuns é o Jogo das Mentiras, no qual o desafiado deve proferir três afirmações e o desafiante deve dizer quais são mentiras. O desafiante escolhe uma recompensa, enquanto o desafiado escolhe uma punição ou tributo a ser pago, desde que possua igual valor à recompensa solicitada, como, por exemplo, apostar a troca de posição de seus clãs e, caso perca, o seu clã se tornará vassalo do vencedor. O perdedor pode impor uma condição, caso tenha vencido em uma das afirmações.",
      "inWorld": "Um povo outrora desconhecido, isolado no subterrâneo, apenas rumores ou menções em lendas krabeshianas. Foi apenas quando Fengral o Avatar de Aether - uniu-se à campanha contra Keldanas, que o mundo pôde conhecer os draenuns. Desde então, não nutriram muitas inimizades ou amizades notáveis com outros povos além de Krabesh. Inaris e anões foram os únicos povos que puderam acessar Noctúrnia sem auxílio - inaris podem ver através das miragens que escondem as entradas de Noctúrnia, e as galerias subterrâneas de Noctúrnia, de alguma forma, se conectaram aos túneis de Kraun'gar. Esses detalhes estabeleceram uma relação amistosa entre os povos, mesmo que de forma preventiva. A cada dia, mais e mais draenuns se espalham pelo mundo e, quando fora dos limites de Noctúrnia, geralmente são reservados e cautelosos, como se estivessem perdidos. Costumam estranhar o fato de despertarem a curiosidade alheia e, como tudo que é diferente, muitas vezes são hostilizados e tratados como ameaças. Contudo, nada que a etiqueta da corte e seu ar galante não resolva. Não é incomum vê-los na companhia de nobres ou pessoas poderosas. Existem poucos motivos razoáveis para um jovem draenum atravessar os Portões Sombrios de Noctúrnia. seja buscando escapar das situações insustentáveis que ele ou seus antepassados geraram através dos Jogos da Corte, ou por uma indomável vontade pessoal. Uma vez livres pelo mundo, o peso de saber que talvez nunca mais possam saborear um bom vinho nocturniano sempre pesará em suas decisões."
    }
  },
  {
    "_id": "lg00060000000000",
    "name": "Elemental",
    "type": "legacy",
    "img": "icons/magic/elemental/elemental-air-fire-water-earth.svg",
    "legadoKey": "elemental",
    "folder": "fldlg00060000000",
    "_key": "!items!lg00060000000000",
    "system": {
      "name": "Elemental",
      "height": "Entre 1,40 m e 2,10 metros de altura.",
      "lifeExpectancy": "Elementais podem viver por tempo indeterminado. Devido ao seu nascimento incomum, não podem se reproduzir como outros povos, surgindo no mundo já adultos.",
      "appearance": "Forjados a partir de fragmentos do Véu Elemental, tomam forma humanoide como receptáculos místicos. Cada um surge no mundo para cumprir um propósito. Símbolos, feições singulares, proporções distintas e gemas incrustadas podem adornar suas formas, refletindo a natureza de seu elemento.\nA aparência dos elementais revela a afinidade de cada um com seu elemento. Os de Água possuem tons azulados, com veias visíveis pulsando um sangue da cor do oceano. Os de Fogo ardem em vermelhidão, com a pele marcada por fissuras e deformações. Os de Vento têm a pele cinzenta, atravessada por suaves linhas místicas. Já os de Terra ostentam tons terrosos, com protuberâncias rochosas e uma pele áspera. Os de Trovão exibem tons púrpura, com membros levemente alongados e uma pele rachada. Por fim, os nascidos do Gelo são cianos, com a pele fina, translúcida e cristalina.",
      "description": "Para os elementais, a efemeridade da vida assume um significado singular. Sem um passado ao qual possam se ancorar, nem um futuro que lhes prometa horizontes, resta-lhes o presente um sopro de existência que precisam preencher com sentido. Nascidos sem precedentes, amadurecem depressa, como se o próprio mundo exigisse deles pressa em compreender o porquê de estarem vivos.\nBuscando respostas, moldam suas identidades através do contato com outros povos, tentando absorver fragmentos de seu propósito entre outras culturas. Pois sabem, em sua essência, que quando sua função neste mundo se cumprir, dissipam-se - como se jamais tivessem existido. Alguns, tomados pelo terror de um destino vazio e sem lembranças, tentam desafiar o inevitável, mas mesmo que vivam séculos, cedo ou tarde, retornam à inexistência de onde vieram.",
      "legacyAbilities": [
        {
          "name": "Essência Elemental",
          "description": "Escolha um elemento: Fogo, Água, Vento, Terra, Trovão ou Gelo. Você pode criar pequenos efeitos elementais inofensivos, referentes ao seu elemento, como: moldar uma chama em sua mão, congelar uma taça, etc., desde que sejam autorizados pelo Narrador.",
          "actions": []
        },
        {
          "name": "Um com o Elemento",
          "description": "Você possui Resistência Mágica referente ao seu elemento em Essência Elemental. Caso um Alvo Inimigo lhe cause um Dano Mágico do mesmo elemento da sua Essência Elemental, você receberá 1 Ponto de Energia Temporário. Esse efeito ocorre apenas uma vez por rodada.",
          "actions": [],
          "activeEffect": {
            "text": "Resistência Mágica elemental referente à sua Essência Elemental.",
            "trigger": {
              "event": "automatic"
            },
            "duration": {
              "type": "permanent"
            },
            "changes": [
              {
                "key": "system.damageResistance",
                "mode": 2,
                "value": "elemental"
              }
            ]
          }
        },
        {
          "name": "Encarnação Elemental",
          "description": "Enquanto estiver em combate, ao receber qualquer tipo de dano de um Alvo, você poderá causar, nesse mesmo Alvo, metade do seu total máximo de Pontos de Energia como Dano Mágico elemental, referente à sua Essência Elemental. Esse efeito ocorre apenas uma vez por rodada.",
          "actions": [
            {
              "id": "act_encarnacao_elemental",
              "name": "Encarnação Elemental",
              "description": "Reação ao receber dano em combate: causa metade do seu PE máximo como Dano Mágico elemental no agressor (1x por rodada).",
              "cost": "",
              "type": {
                "actionType": "reacao",
                "category": "ataque_magico",
                "tags": [
                  "dano_magico",
                  "retaliacao"
                ]
              },
              "attack": {
                "hasAttack": false
              },
              "damage": {
                "hasDamage": true,
                "formula": "floor(@pe.max / 2)",
                "type": "immaterial",
                "criticalBonus": ""
              },
              "healing": {
                "hasHealing": false
              },
              "condition": {
                "hasCondition": false
              },
              "check": {
                "hasCheck": false
              },
              "areaOfEffect": {
                "hasArea": false
              }
            }
          ]
        }
      ],
      "continente": "Vértonie",
      "altura": "Entre 1,40 m e 2,10 metros de altura.",
      "expectativa_de_vida": "Elementais podem viver por tempo indeterminado. Devido ao seu nascimento incomum, não podem se reproduzir como outros povos, surgindo no mundo já adultos.",
      "aparencia": "Forjados a partir de fragmentos do Véu Elemental, tomam forma humanoide como receptáculos místicos. Cada um surge no mundo para cumprir um propósito. Símbolos, feições singulares, proporções distintas e gemas incrustadas podem adornar suas formas, refletindo a natureza de seu elemento.\nA aparência dos elementais revela a afinidade de cada um com seu elemento. Os de Água possuem tons azulados, com veias visíveis pulsando um sangue da cor do oceano. Os de Fogo ardem em vermelhidão, com a pele marcada por fissuras e deformações. Os de Vento têm a pele cinzenta, atravessada por suaves linhas místicas. Já os de Terra ostentam tons terrosos, com protuberâncias rochosas e uma pele áspera. Os de Trovão exibem tons púrpura, com membros levemente alongados e uma pele rachada. Por fim, os nascidos do Gelo são cianos, com a pele fina, translúcida e cristalina.",
      "descricao": "Para os elementais, a efemeridade da vida assume um significado singular. Sem um passado ao qual possam se ancorar, nem um futuro que lhes prometa horizontes, resta-lhes o presente um sopro de existência que precisam preencher com sentido. Nascidos sem precedentes, amadurecem depressa, como se o próprio mundo exigisse deles pressa em compreender o porquê de estarem vivos.\nBuscando respostas, moldam suas identidades através do contato com outros povos, tentando absorver fragmentos de seu propósito entre outras culturas. Pois sabem, em sua essência, que quando sua função neste mundo se cumprir, dissipam-se - como se jamais tivessem existido. Alguns, tomados pelo terror de um destino vazio e sem lembranças, tentam desafiar o inevitável, mas mesmo que vivam séculos, cedo ou tarde, retornam à inexistência de onde vieram.",
      "origem": "Zalúnea, incapaz de criar, sentia-se sufocava por sua própria impotência, presa em um silêncio que reprimia suas emoções. O único refúgio onde entrava paz eram as planícies a oeste de Arba'shatrah. Em certo momento, consumida pelo desprezo que nutria por si mesma, seu coração não suportou mais. De volta às planícies, ela cantou, chorou e gritou, tentando expulsar o desejo de apenas definhar. Dessa catarse nasceu Gaenói, o Primogênito elemental - uma entidade de poder tão devastador que Zalúnea foi obrigada a fragmentá-lo. Cada parte de Gaenói passou a conter um aspecto de sua essência, dando origem aos seis elementos fundamentais. Esses fragmentos, uma vez domados, tomaram a forma dos dragões elementais ancestrais.\nEventualmente, os dragões tornaram-se conscientes e passaram a coexistir com os povos da Primeira Cidade, dando origem ao fogo, vento, água, terra, gelo e trovão. Seus feitos extraordinários despertaram a inveja dos outros deuses. Porém, ao conviver com os mortais, os dragões também absorveram suas angústias e temores emoções que se intensificaram com o prenúncio da guerra. Quando o conflito finalmente irrompeu, os deuses da ordem usaram os dragões como armas contra os rebeldes. Das cicatrizes das batalhas, surgiram os primeiros elementais - seres confusos e vulneráveis, que acabaram divididos entre servir à ordem e aos insurgentes.\nApós a queda da Torre dos Imortais, os dragões, tomados pelo arrependimento por sua ingenuidade e pelos danos causados, decidiram auxiliar os mortais, oferecendo-lhes alento em um mundo agora negligenciado pelos deuses. Contudo, o local onde Gaenói nasceu jamais se recuperou. O Véu ali permanece instável, propiciando o surgimento contínuo de elementais até os dias atuais. Essa terra, marcada pela sua origem e pela ruína, foi considerada a sua terra natal e viria a ser conhecido como Vértonie - as outrora serenas Planícies do Oeste.",
      "tradicoes": "Embora não constituam uma nação formal com seus semelhantes espalhados por toda Auroria os elementais encontraram em Rompe-Céu um local que podem chamar de lar. Sua sociedade não se organiza sob normas, nem sob um senso coletivo forte, assemelhando-se mais a um grupo de indivíduos que coexistem, cada qual voltado à sua própria jornada. Em geral, vivem voltados para o presente, sem vínculos profundos entre si, além da origem em comum.\nO nascimento de um elemental é um fenômeno raro e, por muito tempo, envolto em mistério. Sua vinda ao mundo costuma estar associada a distúrbios elementais provocados pela instabilidade do Véu em uma determinada região ou ser. Cada elemental carrega consigo uma vocação inata, um propósito que está ligado à natureza de seu surgimento. Cumprida essa missão mesmo sem que ele compreenda exatamente qual seja, o elemental desaparece.\nAs personalidades dos elementais costumam refletir o elemento que os compõe, e cada um deles desenvolve rituais ou manias peculiares, expressão sua ligação com sua essência. Por exemplo: um elemental da Água pode derramar o primeiro gole de sua bebida no chão como forma de respeito; um elemental do Fogo pode traçar um círculo com óleo inflamável ao seu redor para meditar; um elemental do Vento entretém-se girando objetos entre os dedos; um elemental da Terra pode carregar consigo um punhado de solo do lugar onde nasceu; um elemental do Trovão pode estalar os dedos ou batucar incessantemente em superfícies; um elemental do Gelo, por sua vez, pode preferir roupas de tecidos finos, que deixem a pele exposta. Esses gestos, muitas vezes involuntários, são manifestações de uma conexão profunda e inconsciente com os elementos que os definem.\nPara os elementais, o mundo natural não é separado de si mesmos os elementos são extensões de sua existência. Para fortalecer essa conexão, performam danças, cantos e gestos rituais que mimetizem seus respectivos elementos. Tais expressões não são aprendidas nem coreografadas: surgem instintivamente, como parte de sua essência. Em raras ocasiões em que dois ou mais elementais se encontram, algo extraordinário acontece: seus movimentos se harmonizam de forma espontânea, criando uma performance de beleza e sincronia tão profunda que parece desafiar as leis da realidade.",
      "no_mundo": "Quando os fragmentos de Gaenói se espalharam pelo mundo, cada dragão estabeleceu sua influência sobre um dos seis continentes: Aelbaag, a Água Primordial, sustenta as abundantes florestas de Aenólia; Keltarak, o Fogo Primordial, inspira o progresso e a criatividade em Drunar; Mayz'zot, o Vento Primordial, é o responsável pelas Brumas Místicas que encobrem Narzepion; Urlakron, a Terra Primordial, torna possível a vida no inóspito deserto de Krabesh; Ykelth, o Trovão Primordial, cruza os céus de Vértonie, tentando curar seu solo corrompido; Perpherth, o Gelo Primordial, desafia os habitantes de Drakar, impondo obstáculos que os fortalecem.\nOs elementais normalmente surgem com um propósito oculto, quase sempre ligados ao elemento do dragão ancestral que rege a terra onde nasceram. Em Vértonie, muitos desses seres se veem em meio a conflitos com Vennélis e Kahats'zas, enquanto buscam restaurar o equilíbrio de um continente devastado. Nessa missão, frequentemente encontram nos forjados aliados leais e compreensivos.\nHistoricamente, os elementais foram perseguidos pelos povos do mundo, vistos como presságios de calamidades e agentes do caos. Essa visão começou a mudar apenas quando Garat, um elemental da Terra, participou de uma das reuniões do Grande Chamado e compartilhou com o mundo a verdadeira origem dos elementais, desmentindo mitos e diminuindo a hostilidade contra seu povo. Ao cumprir esse papel vital, Garat desapareceu do mundo, tendo completado sua vocação.\nO destino de um elemental permanece um enigma, entrelaçado aos fios instáveis da existência. Sabendo que podem desaparecer a qualquer momento, vivem intensamente, guiados por sua Essência Elemental, buscando conexão com seu próprio elemento ou até com outros. Muitos acreditam que, em tempos antigos, todos os elementos estavam unidos, e esse eco de união ainda pulsa em seus corações.",
      "nomes_comuns_origem": [
        "Costumam ter nomes semelhantes aos povos da região onde nascem."
      ],
      "abilities": [
        "hl00100000000000",
        "hl00110000000000",
        "hl00120000000000"
      ],
      "origin": "Zalúnea, incapaz de criar, sentia-se sufocava por sua própria impotência, presa em um silêncio que reprimia suas emoções. O único refúgio onde entrava paz eram as planícies a oeste de Arba'shatrah. Em certo momento, consumida pelo desprezo que nutria por si mesma, seu coração não suportou mais. De volta às planícies, ela cantou, chorou e gritou, tentando expulsar o desejo de apenas definhar. Dessa catarse nasceu Gaenói, o Primogênito elemental - uma entidade de poder tão devastador que Zalúnea foi obrigada a fragmentá-lo. Cada parte de Gaenói passou a conter um aspecto de sua essência, dando origem aos seis elementos fundamentais. Esses fragmentos, uma vez domados, tomaram a forma dos dragões elementais ancestrais.\nEventualmente, os dragões tornaram-se conscientes e passaram a coexistir com os povos da Primeira Cidade, dando origem ao fogo, vento, água, terra, gelo e trovão. Seus feitos extraordinários despertaram a inveja dos outros deuses. Porém, ao conviver com os mortais, os dragões também absorveram suas angústias e temores emoções que se intensificaram com o prenúncio da guerra. Quando o conflito finalmente irrompeu, os deuses da ordem usaram os dragões como armas contra os rebeldes. Das cicatrizes das batalhas, surgiram os primeiros elementais - seres confusos e vulneráveis, que acabaram divididos entre servir à ordem e aos insurgentes.\nApós a queda da Torre dos Imortais, os dragões, tomados pelo arrependimento por sua ingenuidade e pelos danos causados, decidiram auxiliar os mortais, oferecendo-lhes alento em um mundo agora negligenciado pelos deuses. Contudo, o local onde Gaenói nasceu jamais se recuperou. O Véu ali permanece instável, propiciando o surgimento contínuo de elementais até os dias atuais. Essa terra, marcada pela sua origem e pela ruína, foi considerada a sua terra natal e viria a ser conhecido como Vértonie - as outrora serenas Planícies do Oeste.",
      "traditions": "Embora não constituam uma nação formal com seus semelhantes espalhados por toda Auroria os elementais encontraram em Rompe-Céu um local que podem chamar de lar. Sua sociedade não se organiza sob normas, nem sob um senso coletivo forte, assemelhando-se mais a um grupo de indivíduos que coexistem, cada qual voltado à sua própria jornada. Em geral, vivem voltados para o presente, sem vínculos profundos entre si, além da origem em comum.\nO nascimento de um elemental é um fenômeno raro e, por muito tempo, envolto em mistério. Sua vinda ao mundo costuma estar associada a distúrbios elementais provocados pela instabilidade do Véu em uma determinada região ou ser. Cada elemental carrega consigo uma vocação inata, um propósito que está ligado à natureza de seu surgimento. Cumprida essa missão mesmo sem que ele compreenda exatamente qual seja, o elemental desaparece.\nAs personalidades dos elementais costumam refletir o elemento que os compõe, e cada um deles desenvolve rituais ou manias peculiares, expressão sua ligação com sua essência. Por exemplo: um elemental da Água pode derramar o primeiro gole de sua bebida no chão como forma de respeito; um elemental do Fogo pode traçar um círculo com óleo inflamável ao seu redor para meditar; um elemental do Vento entretém-se girando objetos entre os dedos; um elemental da Terra pode carregar consigo um punhado de solo do lugar onde nasceu; um elemental do Trovão pode estalar os dedos ou batucar incessantemente em superfícies; um elemental do Gelo, por sua vez, pode preferir roupas de tecidos finos, que deixem a pele exposta. Esses gestos, muitas vezes involuntários, são manifestações de uma conexão profunda e inconsciente com os elementos que os definem.\nPara os elementais, o mundo natural não é separado de si mesmos os elementos são extensões de sua existência. Para fortalecer essa conexão, performam danças, cantos e gestos rituais que mimetizem seus respectivos elementos. Tais expressões não são aprendidas nem coreografadas: surgem instintivamente, como parte de sua essência. Em raras ocasiões em que dois ou mais elementais se encontram, algo extraordinário acontece: seus movimentos se harmonizam de forma espontânea, criando uma performance de beleza e sincronia tão profunda que parece desafiar as leis da realidade.",
      "inWorld": "Quando os fragmentos de Gaenói se espalharam pelo mundo, cada dragão estabeleceu sua influência sobre um dos seis continentes: Aelbaag, a Água Primordial, sustenta as abundantes florestas de Aenólia; Keltarak, o Fogo Primordial, inspira o progresso e a criatividade em Drunar; Mayz'zot, o Vento Primordial, é o responsável pelas Brumas Místicas que encobrem Narzepion; Urlakron, a Terra Primordial, torna possível a vida no inóspito deserto de Krabesh; Ykelth, o Trovão Primordial, cruza os céus de Vértonie, tentando curar seu solo corrompido; Perpherth, o Gelo Primordial, desafia os habitantes de Drakar, impondo obstáculos que os fortalecem.\nOs elementais normalmente surgem com um propósito oculto, quase sempre ligados ao elemento do dragão ancestral que rege a terra onde nasceram. Em Vértonie, muitos desses seres se veem em meio a conflitos com Vennélis e Kahats'zas, enquanto buscam restaurar o equilíbrio de um continente devastado. Nessa missão, frequentemente encontram nos forjados aliados leais e compreensivos.\nHistoricamente, os elementais foram perseguidos pelos povos do mundo, vistos como presságios de calamidades e agentes do caos. Essa visão começou a mudar apenas quando Garat, um elemental da Terra, participou de uma das reuniões do Grande Chamado e compartilhou com o mundo a verdadeira origem dos elementais, desmentindo mitos e diminuindo a hostilidade contra seu povo. Ao cumprir esse papel vital, Garat desapareceu do mundo, tendo completado sua vocação.\nO destino de um elemental permanece um enigma, entrelaçado aos fios instáveis da existência. Sabendo que podem desaparecer a qualquer momento, vivem intensamente, guiados por sua Essência Elemental, buscando conexão com seu próprio elemento ou até com outros. Muitos acreditam que, em tempos antigos, todos os elementos estavam unidos, e esse eco de união ainda pulsa em seus corações."
    }
  },
  {
    "_id": "lg00070000000000",
    "name": "Elfo",
    "type": "legacy",
    "img": "icons/skills/archery/bow-wood-green.svg",
    "legadoKey": "elfo",
    "folder": "fldlg00010000000",
    "_key": "!items!lg00070000000000",
    "system": {
      "name": "Elfo",
      "height": "Entre 1,60 e 1,90 metros de altura.",
      "lifeExpectancy": "Elfos podem viver por 300 anos, adquirindo sua independência e considerados adultos aos 20 anos.",
      "appearance": "As obras-primas de Aysla possuem rostos afinados, longas e pontiagudas orelhas e uma beleza invejável. De maneira geral, seus corpos são magros e esbeltos, muitas vezes vistos como andrógenos. As possibilidades de tons de pele variam do bege ao negro, em alguns casos, possuem leves tons amarelados, azulados ou esverdeados. Para a cor de seus cabelos, existe um arco-íris de possibilidades.",
      "description": "Elfos são estudiosos versados nos mais diversos tipos de conhecimentos, utilizando sua criatividade para aprimorar não apenas suas mentes, mas também sua compreensão do Véu e como aplicá-la de maneira eficiente. Aprofundam-se principalmente nos campos das ciências naturais e da tecnologia. Muitos confundem sua genialidade com arrogância, mas poucos realmente conhecem o caminho árduo que cada elfo trilhou para conquistar o seu lugar no mundo.\nTalvez pela herança de sua criadora, costumam ser extremamente vaidosos, possuindo forte apego aos seus brasões de família, símbolos de orgulho e linhagem. Louvam a etiqueta e a boa educação, pois até o mais miserável elfo tende a possuir mais estudo que a grande maioria dos cidadãos aurorianos. Normalmente, apreciam muito a alta costura com adornos apropriados, considerando tatuagens uma mancha na perfeição das criações de Aysla, sendo reservadas, portanto, apenas para os delinquentes e exilados.",
      "legacyAbilities": [
        {
          "name": "Sabedoria Antiga",
          "description": "Você inicia com 3 pontos adicionais a serem distribuídos nos seus Conhecimentos. O seu limite máximo na distribuição inicial dos seus Conhecimentos ainda é 2.",
          "actions": []
        },
        {
          "name": "Herança de Haladar",
          "description": "Com uma Ação Simples, você passa a compreender um Idioma sendo falado por um Alvo dentro de 6 metros, podendo também falar este mesmo Idioma por 10 minutos. Você pode manter somente um Idioma por vez com esse efeito.",
          "actions": [
            {
              "id": "act_heranca_haladar",
              "name": "Herança de Haladar",
              "description": "Compreende e fala por 10 minutos um idioma ouvido de um alvo a até 6 metros.",
              "cost": "",
              "type": {
                "actionType": "acaoSimples",
                "category": "suporte",
                "tags": [
                  "idioma"
                ]
              },
              "attack": {
                "hasAttack": false
              },
              "damage": {
                "hasDamage": false
              },
              "healing": {
                "hasHealing": false
              },
              "condition": {
                "hasCondition": false
              },
              "check": {
                "hasCheck": false
              },
              "areaOfEffect": {
                "hasArea": false
              }
            }
          ]
        },
        {
          "name": "Pensamento Célere",
          "description": "Caso você falhe em teste de Parâmetro, você receberá +1 no seu próximo teste de Parâmetro. Esse efeito não acumula e, caso não seja utilizado, é removido em 1 minuto.",
          "actions": [
            {
              "id": "act_pensamento_celere",
              "name": "Pensamento Célere",
              "description": "Ao falhar em um teste de Parâmetro, concede +1 no seu próximo teste de Parâmetro dentro de 1 minuto.",
              "cost": "",
              "type": {
                "actionType": "reacao",
                "category": "suporte",
                "tags": [
                  "bonus"
                ]
              },
              "attack": {
                "hasAttack": false
              },
              "damage": {
                "hasDamage": false
              },
              "healing": {
                "hasHealing": false
              },
              "condition": {
                "hasCondition": false
              },
              "check": {
                "hasCheck": false
              },
              "areaOfEffect": {
                "hasArea": false
              }
            }
          ]
        }
      ],
      "continente": "Aenólia",
      "altura": "Entre 1,60 e 1,90 metros de altura.",
      "expectativa_de_vida": "Elfos podem viver por 300 anos, adquirindo sua independência e considerados adultos aos 20 anos.",
      "aparencia": "As obras-primas de Aysla possuem rostos afinados, longas e pontiagudas orelhas e uma beleza invejável. De maneira geral, seus corpos são magros e esbeltos, muitas vezes vistos como andrógenos. As possibilidades de tons de pele variam do bege ao negro, em alguns casos, possuem leves tons amarelados, azulados ou esverdeados. Para a cor de seus cabelos, existe um arco-íris de possibilidades.",
      "descricao": "Elfos são estudiosos versados nos mais diversos tipos de conhecimentos, utilizando sua criatividade para aprimorar não apenas suas mentes, mas também sua compreensão do Véu e como aplicá-la de maneira eficiente. Aprofundam-se principalmente nos campos das ciências naturais e da tecnologia. Muitos confundem sua genialidade com arrogância, mas poucos realmente conhecem o caminho árduo que cada elfo trilhou para conquistar o seu lugar no mundo.\nTalvez pela herança de sua criadora, costumam ser extremamente vaidosos, possuindo forte apego aos seus brasões de família, símbolos de orgulho e linhagem. Louvam a etiqueta e a boa educação, pois até o mais miserável elfo tende a possuir mais estudo que a grande maioria dos cidadãos aurorianos. Normalmente, apreciam muito a alta costura com adornos apropriados, considerando tatuagens uma mancha na perfeição das criações de Aysla, sendo reservadas, portanto, apenas para os delinquentes e exilados.",
      "origem": "Aysla, intrigada com os ursares e as dríades, os únicos seres criados até aquele momento, tentou se comunicar com os primeiros ursares, mas foi inútil. Faltava expressão, comunicação, personalidade, individualidade qualquer coisa que pudesse preencher a casca vazia que eram os primeiros seres criados, em nada diferentes dos mais simples animais. Após algumas tentativas, despertou a racionalidade nos Primogênitos ursares e, no processo, criou o primeiro idioma. Com base nisso, aconselhou seus irmãos e irmãs, para que todos os Primordiais também fossem dotados de racionalidade. Para exemplificar sua sugestão, criou seu Primogênito, Haladar, meticulosamente pensado para expressar o máximo dos ideais de sua criadora a racionalidade e a arte.\nCom o auxílio de Haladar, Aysla ajudou os deuses a modelar as bases da compreensão e expressão dos Primordiais, criando os fundamentos da matemática, filosofia, física, biologia, etc. Aysla, então, replicou sua criação banhada em sabedoria, nomeando-os elfos, para que mais mentes pudessem contribuir no avanço de seus estudos.\nDurante a guerra que anunciava a queda Torre dos Imortais, Haladar tentou intervir, buscando uma maneira de resolver os problemas, bons termos que agradassem ambos os lados, mas suas tentativas foram em vão. Uma parte do Primogênito queria proteger o seu povo, e a outra queria ajudar Aysla na guerra. Encurralado pela própria indecisão, criou uma cópia exata sua. Haladar e um grupo de bravos elfos permaneceram ao lado de sua criadora, na defesa da Torre dos Imortais, enquanto a sua cópia guiou o restante do seu povo ao sul.\nFora do alcance dos olhos do mundo, aos poucos expandiram seus domínios, ocultos entre as árvores e apagando seus rastros. Haladar temia que o conhecimento de seu povo fosse roubado. Para isso, criou o idioma Élfico, reescrevendo todos os livros de seu povo e queimando os originais, originando um seleto grupo de elfos que teriam como função registrar a história do mundo, os Eraneos.",
      "tradicoes": "A sociedade élfica é governada por cinco grandes famílias élficas, cada uma com sua especialidade: os Leyltarin, especialistas bélicos; os Themar, responsáveis pela educação; os Phaeran, que criaram e gerenciam a Tecnomagia; os Navash, que nutrem a relação élfica com a natureza e os Bellestraiko, que representam o ideal élfico de todas as formas. Um Bellestraiko sempre preside o conselho.\nPara um elfo, o conceito de família não vem de seus laços de sangue ou relações parentais, mas sim da vocação. Além das cinco principais famílias, existem outras 73 famílias menores, vassalas. Cada família menor desempenha uma função específica, como, por exemplo, as famílias Feralan e Aefex, alfaiates e pescadores, respectivamente. Novas famílias poderão ser criadas, conforme a necessidade. Uma vez parte de uma família, espera-se do elfo dar continuidade aos negócios familiares. Contudo, caso um indivíduo apresente uma vocação diferente daquela de sua família biológica, ele poderá ser remanejado para uma família que condiga com seus talentos, assumindo o novo sobrenome. Além das famílias tradicionais, existem dois tipos de famílias especiais: alguns abandonam suas especialidades para se tornarem aventureiros, unindo-se aos Tessarian. De maneira similar, os despatriados, exilados ou deserdados, juntam-se aos Nefarian.\nA moda élfica é exuberante, não importando a classe social. Roupas com cores vivas, destacando o brasão de sua família, harmonizadas por colares, pulseiras, brincos, ornamentos nas orelhas, tecidos e peças de outras nações. Alguns alfaiates e joalheiros são famosos por criarem tendências exóticas. Caso um artesão capture o olho de algum nobre, é de bom tom que ele anote a sua opinião em um pergaminho assinado, que será emoldurado e exposto na loja do artesão, como recomendação de seus produtos.\nO conhecimento élfico não é famoso apenas pelo seu robusto sistema educacional. Também contam com um grande acervo de livros em suas bibliotecas, que cresce a cada dia com novos saberes dos mais diversos locais. São também responsáveis pela criação da Tecnomagia, uma união do místico, do tecnológico e do natural, seguindo suas crenças de harmonia com a natureza. A Tecnomagia é amplamente utilizada a favor da qualidade de vida de seu povo: iluminação noturna, dirigíveis e facilidades cotidianas, são lugar-comum no dia a dia élfico. Não é surpresa que a sociedade élfica seja considerada a mais avançada do mundo.",
      "no_mundo": "O povo élfico se destacou no mundo por diversos motivos, mas principalmente pela criação da Tecnomagia, revolução que causou e ainda causa - inveja e ataques à sua sociedade. Elfos são nacionalistas, orgulhosos pelos feitos de seu povo e, acima de tudo, certificarem-se de que os outros povos compreendam isso. Não é incomum as cidades aurorianas possuírem uma espécie de catálogo que lista cada família élfica e sua vocação. Em alguns locais, as pessoas não dizem 'preciso de um alfaiate', mas sim 'preciso de um Farelan', significando que elas buscam o melhor. Por isso, não é incomum ver elfos nos mais diversos lugares do mundo desempenhando suas vocações, seja temporariamente ou não.\nÀ exceção de zaokans e kahats'zas, que, historicamente, possuem atritos devido a desentendimentos acerca da Tecnomagia, as filhas e filhos de Aysla raramente desenvolveram conflitos com outras nações, pois, sempre guiados por sua finesse social, nutrem boas relações com o restante do mundo. O sucesso de suas relações internacionais são mérito da família Bellestraiko, que muitas vezes são enviados como porta-vozes em missões diplomáticas. Entretanto, caso sua nação entre em um conflito, o grande poderio de seus exércitos, assim como seus aliados juramentados, faria seus oponentes repensarem seus atos.\nIncentivados a constantemente abraçarem seus sonhos e aperfeiçoarem seus talentos, os elfos vivem sua longa vida sem urgências. Para garantir que seus costumes permaneçam inalterados, eles observam atentamente uns aos outros, com olhos ocultos pela neblina das noites, observando cada passo de possíveis transgressores. Em busca de manter intacta toda a reputação arduamente criada através dos séculos, renegam outras culturas dentro de seus salões, pois, uma cidade élfica deve permanecer sob controle dos elfos.",
      "nomes_comuns_origem": [
        "Daraell",
        "Elnodir",
        "Rhaenom",
        "Yerel",
        "Aerin",
        "Calen"
      ],
      "abilities": [
        "hl00130000000000",
        "hl00140000000000",
        "hl00150000000000"
      ],
      "origin": "Aysla, intrigada com os ursares e as dríades, os únicos seres criados até aquele momento, tentou se comunicar com os primeiros ursares, mas foi inútil. Faltava expressão, comunicação, personalidade, individualidade qualquer coisa que pudesse preencher a casca vazia que eram os primeiros seres criados, em nada diferentes dos mais simples animais. Após algumas tentativas, despertou a racionalidade nos Primogênitos ursares e, no processo, criou o primeiro idioma. Com base nisso, aconselhou seus irmãos e irmãs, para que todos os Primordiais também fossem dotados de racionalidade. Para exemplificar sua sugestão, criou seu Primogênito, Haladar, meticulosamente pensado para expressar o máximo dos ideais de sua criadora a racionalidade e a arte.\nCom o auxílio de Haladar, Aysla ajudou os deuses a modelar as bases da compreensão e expressão dos Primordiais, criando os fundamentos da matemática, filosofia, física, biologia, etc. Aysla, então, replicou sua criação banhada em sabedoria, nomeando-os elfos, para que mais mentes pudessem contribuir no avanço de seus estudos.\nDurante a guerra que anunciava a queda Torre dos Imortais, Haladar tentou intervir, buscando uma maneira de resolver os problemas, bons termos que agradassem ambos os lados, mas suas tentativas foram em vão. Uma parte do Primogênito queria proteger o seu povo, e a outra queria ajudar Aysla na guerra. Encurralado pela própria indecisão, criou uma cópia exata sua. Haladar e um grupo de bravos elfos permaneceram ao lado de sua criadora, na defesa da Torre dos Imortais, enquanto a sua cópia guiou o restante do seu povo ao sul.\nFora do alcance dos olhos do mundo, aos poucos expandiram seus domínios, ocultos entre as árvores e apagando seus rastros. Haladar temia que o conhecimento de seu povo fosse roubado. Para isso, criou o idioma Élfico, reescrevendo todos os livros de seu povo e queimando os originais, originando um seleto grupo de elfos que teriam como função registrar a história do mundo, os Eraneos.",
      "traditions": "A sociedade élfica é governada por cinco grandes famílias élficas, cada uma com sua especialidade: os Leyltarin, especialistas bélicos; os Themar, responsáveis pela educação; os Phaeran, que criaram e gerenciam a Tecnomagia; os Navash, que nutrem a relação élfica com a natureza e os Bellestraiko, que representam o ideal élfico de todas as formas. Um Bellestraiko sempre preside o conselho.\nPara um elfo, o conceito de família não vem de seus laços de sangue ou relações parentais, mas sim da vocação. Além das cinco principais famílias, existem outras 73 famílias menores, vassalas. Cada família menor desempenha uma função específica, como, por exemplo, as famílias Feralan e Aefex, alfaiates e pescadores, respectivamente. Novas famílias poderão ser criadas, conforme a necessidade. Uma vez parte de uma família, espera-se do elfo dar continuidade aos negócios familiares. Contudo, caso um indivíduo apresente uma vocação diferente daquela de sua família biológica, ele poderá ser remanejado para uma família que condiga com seus talentos, assumindo o novo sobrenome. Além das famílias tradicionais, existem dois tipos de famílias especiais: alguns abandonam suas especialidades para se tornarem aventureiros, unindo-se aos Tessarian. De maneira similar, os despatriados, exilados ou deserdados, juntam-se aos Nefarian.\nA moda élfica é exuberante, não importando a classe social. Roupas com cores vivas, destacando o brasão de sua família, harmonizadas por colares, pulseiras, brincos, ornamentos nas orelhas, tecidos e peças de outras nações. Alguns alfaiates e joalheiros são famosos por criarem tendências exóticas. Caso um artesão capture o olho de algum nobre, é de bom tom que ele anote a sua opinião em um pergaminho assinado, que será emoldurado e exposto na loja do artesão, como recomendação de seus produtos.\nO conhecimento élfico não é famoso apenas pelo seu robusto sistema educacional. Também contam com um grande acervo de livros em suas bibliotecas, que cresce a cada dia com novos saberes dos mais diversos locais. São também responsáveis pela criação da Tecnomagia, uma união do místico, do tecnológico e do natural, seguindo suas crenças de harmonia com a natureza. A Tecnomagia é amplamente utilizada a favor da qualidade de vida de seu povo: iluminação noturna, dirigíveis e facilidades cotidianas, são lugar-comum no dia a dia élfico. Não é surpresa que a sociedade élfica seja considerada a mais avançada do mundo.",
      "inWorld": "O povo élfico se destacou no mundo por diversos motivos, mas principalmente pela criação da Tecnomagia, revolução que causou e ainda causa - inveja e ataques à sua sociedade. Elfos são nacionalistas, orgulhosos pelos feitos de seu povo e, acima de tudo, certificarem-se de que os outros povos compreendam isso. Não é incomum as cidades aurorianas possuírem uma espécie de catálogo que lista cada família élfica e sua vocação. Em alguns locais, as pessoas não dizem 'preciso de um alfaiate', mas sim 'preciso de um Farelan', significando que elas buscam o melhor. Por isso, não é incomum ver elfos nos mais diversos lugares do mundo desempenhando suas vocações, seja temporariamente ou não.\nÀ exceção de zaokans e kahats'zas, que, historicamente, possuem atritos devido a desentendimentos acerca da Tecnomagia, as filhas e filhos de Aysla raramente desenvolveram conflitos com outras nações, pois, sempre guiados por sua finesse social, nutrem boas relações com o restante do mundo. O sucesso de suas relações internacionais são mérito da família Bellestraiko, que muitas vezes são enviados como porta-vozes em missões diplomáticas. Entretanto, caso sua nação entre em um conflito, o grande poderio de seus exércitos, assim como seus aliados juramentados, faria seus oponentes repensarem seus atos.\nIncentivados a constantemente abraçarem seus sonhos e aperfeiçoarem seus talentos, os elfos vivem sua longa vida sem urgências. Para garantir que seus costumes permaneçam inalterados, eles observam atentamente uns aos outros, com olhos ocultos pela neblina das noites, observando cada passo de possíveis transgressores. Em busca de manter intacta toda a reputação arduamente criada através dos séculos, renegam outras culturas dentro de seus salões, pois, uma cidade élfica deve permanecer sob controle dos elfos."
    }
  },
  {
    "_id": "lg00080000000000",
    "name": "Forjado",
    "type": "legacy",
    "img": "icons/equipment/chest/breastplate-helmet-metal.svg",
    "legadoKey": "forjado",
    "folder": "fldlg00060000000",
    "_key": "!items!lg00080000000000",
    "system": {
      "name": "Forjado",
      "height": "Entre 75 centímetros e 2,70 metros de altura, dependendo do tipo de armadura.",
      "lifeExpectancy": "Forjados não morrem por idade, surgindo no mundo já adultos, mas constroem suas personalidades através do tempo. Devido ao fato de serem armaduras reanimadas, não podem se reproduzir como outros povos.",
      "appearance": "Os forjados são armaduras reanimadas, movidas por um intenso fluxo de Véu condensado, que lhes confere mobilidade e consciência. Não se sabe ao certo se a verdadeira identidade de um forjado reside na armadura, na energia que a habita, ou na fusão enigmática de ambos. De seus elmos, vaza uma centelha luminosa — cuja cor varia entre indivíduos — e é a partir dessa energia que percebem o mundo: é a sua visão, seu tato, sua audição.\nFisicamente, assumem a forma de armaduras completas, herdando traços culturais, cores e estilos característicos dos povos de Auroria. No entanto, diferem de armaduras comuns por apresentarem partes repuxadas e retorcidas, preenchendo lacunas e segmentações com precisão quase orgânica — conferindo ao corpo um aspecto mais coeso e uniforme. Sua estrutura física espelha a dos demais Legados, o que significa que podem ser desmembrados e decapitados com as mesmas consequências fatais.",
      "description": "O som metálico de seus passos ecoa no vasto mar de incertezas que compõe suas existências. A curiosidade sobre o sentido da vida — algo tão comum entre os outros povos — é, para os forjados, uma busca silenciosa, pois seu foco recai sobre a tentativa de compreender o rumo que suas novas vidas, desprovidas de passado, tomarão. Qual é o seu papel neste mundo? Onde — ou quando — poderão preencher o vazio deixado por um destino fragmentado?\nSeres intrigantes por natureza, os forjados manifestam uma diversidade impressionante de personalidades. Sentem-se deslocados do mundo pela sua dificuldade em entender a si mesmos e às complexas dinâmicas sociais daqueles ao seu redor. Não carregam heranças, nem perpetuam crenças — apenas se apegam àquilo que consideram verdadeiramente significativo, trilhando caminhos incertos em uma teia mutável de possibilidades.",
      "legacyAbilities": [
        {
          "name": "Adaptação do Metal",
          "description": "Você não precisa se alimentar nem respirar. Você também ignora a regra de 2 horas adicionais em Repousos, caso repouse em um local desconfortável.",
          "actions": []
        },
        {
          "name": "Armadura Viva",
          "description": "Você não pode equipar Armaduras. Para qualquer efeito de Habilidades de Caminho você sempre estará equipado com uma Armadura.\nPor 30 minutos, você pode tocar uma Armadura para destruí-la, recebendo para si seus valores de Bloqueio, desde que possua o requisito de Vigor necessário. Você não recebe Inaptidões vindas dessa Armadura.\nCaso a Armadura seja uma Relíquia, você só poderá receber os seus valores de Bloqueio e efeitos da Relíquia caso você esteja Vinculado (VINCULANDO-SE A UMA RELÍQUIA) a ela, recebendo também o seu valor de Potência.\nCaso você realize esse processo em uma nova Armadura, o Bloqueio, efeitos e pontos de Potência atuais serão substituídos.",
          "actions": []
        },
        {
          "name": "Corpo de Ferro",
          "description": "Você é imune a Envenenado e Sangramento.",
          "actions": [],
          "activeEffect": {
            "text": "Imunidade às condições Envenenado e Sangramento.",
            "trigger": {
              "event": "automatic"
            },
            "duration": {
              "type": "permanent"
            },
            "changes": [
              {
                "key": "system.conditionImmunity",
                "mode": 2,
                "value": "envenenado"
              },
              {
                "key": "system.conditionImmunity",
                "mode": 2,
                "value": "sangramento"
              }
            ]
          }
        }
      ],
      "continente": "Vértonie",
      "altura": "Entre 75 centímetros e 2,70 metros de altura, dependendo do tipo de armadura.",
      "expectativa_de_vida": "Forjados não morrem por idade, surgindo no mundo já adultos, mas constroem suas personalidades através do tempo. Devido ao fato de serem armaduras reanimadas, não podem se reproduzir como outros povos.",
      "aparencia": "Os forjados são armaduras reanimadas, movidas por um intenso fluxo de Véu condensado, que lhes confere mobilidade e consciência. Não se sabe ao certo se a verdadeira identidade de um forjado reside na armadura, na energia que a habita, ou na fusão enigmática de ambos. De seus elmos, vaza uma centelha luminosa — cuja cor varia entre indivíduos — e é a partir dessa energia que percebem o mundo: é a sua visão, seu tato, sua audição.\nFisicamente, assumem a forma de armaduras completas, herdando traços culturais, cores e estilos característicos dos povos de Auroria. No entanto, diferem de armaduras comuns por apresentarem partes repuxadas e retorcidas, preenchendo lacunas e segmentações com precisão quase orgânica — conferindo ao corpo um aspecto mais coeso e uniforme. Sua estrutura física espelha a dos demais Legados, o que significa que podem ser desmembrados e decapitados com as mesmas consequências fatais.",
      "descricao": "O som metálico de seus passos ecoa no vasto mar de incertezas que compõe suas existências. A curiosidade sobre o sentido da vida — algo tão comum entre os outros povos — é, para os forjados, uma busca silenciosa, pois seu foco recai sobre a tentativa de compreender o rumo que suas novas vidas, desprovidas de passado, tomarão. Qual é o seu papel neste mundo? Onde — ou quando — poderão preencher o vazio deixado por um destino fragmentado?\nSeres intrigantes por natureza, os forjados manifestam uma diversidade impressionante de personalidades. Sentem-se deslocados do mundo pela sua dificuldade em entender a si mesmos e às complexas dinâmicas sociais daqueles ao seu redor. Não carregam heranças, nem perpetuam crenças — apenas se apegam àquilo que consideram verdadeiramente significativo, trilhando caminhos incertos em uma teia mutável de possibilidades.",
      "origem": "A fala de Exatir era suave e carismática, capaz de acalmar todos que a ouviam. No entanto, por trás de sua expressão serena, escondiam-se mais do que segredos. Essa divindade testemunhara eras: a fundação da Primeira Cidade, a criação dos Legados, os conflitos, a revolta, a queda, a morte e o renascimento. Viu o fim da estagnação e a aurora de um novo tempo. Exatir contemplava o fluxo do Tempo, convencido de que seu momento de agir ainda não havia chegado. Sabia que o mundo necessitaria de seu auxílio após o fim de Arba'shatrah.\nQuando as chamas da guerra se extinguiram, Exatir vagou pelos campos desolados até encontrar dois seres — tão feridos que se mantinham vivos apenas pela recusa de morrer. A divindade então lhes ofereceu uma escolha: aceitar o fim e seguir o curso natural dos eventos, ou renascer sob uma nova forma. Diante da resposta, Exatir uniu o Véu de ambos, selando-o em vestes brancas de aço. Assim nasceu o Primogênito forjado — aquele que o mundo viria a conhecer como o Anfitrião.\nPor eras, o Anfitrião percorreu mundo, alheio à sua origem. Ajudou os povos a superar suas dificuldades, ergueu cidades e protegeu muitas outras. Presenciou a ascensão e queda de civilizações agora esquecidas pelo tempo. Porém, sobrecarregado por sentimentos e memórias que não lhe pertenciam, sua jornada o levou de volta ao ponto de partida: Vértonie — mergulhada em um caos muito maior do que aquele que lembrava. Cansado de tanta dor, o Anfitrião afastou-se do mundo e se isolou no extremo oeste de Vértonie.\nAnos se passaram. E quando rumores de armaduras vazias vagando pelo mundo chegaram até ele, o velho forjado sentiu renascer dentro de si o senso de propósito. Decidiu, então, erguer uma fortaleza — um refúgio para todos os que buscassem abrigo e proteção. Ali, na Fortaleza Adamantina, ele esperou pacientemente, século após século, sentado em seu salão de festas. Mas ninguém veio. Aproximava-se o milênio da fundação da Fortaleza, no ano 58 a.A., quando, já sem esperança, o Anfitrião se levantou para fechar o portão para sempre. Porém, ao tocar a maçaneta, ouviu — ainda que distantes — suaves sons metálicos ecoando. Se tivesse lábios, talvez, pela primeira vez, eles se curvariam num sorriso.",
      "tradicoes": "O surgimento de um forjado é frequentemente interpretado como um evento sobrenatural — até mesmo divino. Na esperança de que seus mortos retornem à vida nessa forma, alguns povos velam seus entes queridos trajando armaduras ornamentadas, como se preparassem seus corpos para a reencarnação. Embora essa crença não seja totalmente infundada, ela raramente reflete a realidade: um forjado raramente é quem se espera que ele tenha sido. A profanação de túmulos — covas abertas e cadáveres desaparecidos, geralmente obra de ladrões — contribuiu para alimentar esse mito, fortalecendo a ilusão de que os mortos haviam, de fato, retornado à vida como forjados.\nPor outro lado, até poucos anos antes da Ruptura, havia quem acreditasse que os forjados sequer estavam vivos. Muitos aurorianos os viam apenas como cascas animadas, incapazes de sentir amor ou compreender a morte — marcas fundamentais da mortalidade. Por isso, eram tratados como instrumentos, ferramentas úteis, mas desprovidas de alma. Alguns forjados, em busca de aceitação, assumiram esse papel com resignação. Ainda assim, não eram raros os casos em que um forjado demonstrava vestígios de uma vida anterior: manias, expressões, modos de andar, pequenos hábitos como dobrar um pano de certa maneira — fragmentos de um passado esquecido, ecoando por entre as placas de metal.\nA busca incessante por um sentido para sua existência pesa sobre a consciência dos forjados. Esse vazio leva muitos a se apegar a pessoas, grupos, lugares ou ideais que lhes ofereçam propósito — mesmo sabendo que, quando tudo terminar, talvez sejam os únicos a permanecer de pé. Por isso, não há uma cultura unificada dos forjados, tampouco um povo. Em vez disso, são absorvidos pelas sociedades que os acolhem, adotando os nomes e os destinos que lhes são dados.\nContudo, uma das poucas expressões culturais verdadeiramente exclusivas dos forjados é a figura dos Pretores: juristas ambulantes reconhecidos na maioria dos continentes, autorizados a presidir julgamentos e mediar disputas com imparcialidade. Guiados diretamente pelo Anfitrião, esses Pretores atuam também com seus porta-vozes em assembleias oficiais.",
      "no_mundo": "Sua existência permanece envolta em incertezas, uma questão ainda sem consenso entre estudiosos. Para alguns, eles são apenas simulacros da vida — construções animadas, desprovidas de alma — e, por isso, não deveriam gozar dos mesmos direitos que os seres vivos. Já outros os veem como reencarnações legítimas, com identidade, memória e espírito, devendo, portanto, ser tratados como qualquer outro cidadão auroriano. Diante dessa ambiguidade, o papel dos Pretores se torna cada vez mais relevante, atuando como mediadores na redefinição das relações entre os feitos de carne e os de aço.\nEnquanto Legado neutro, os forjados não mantêm filiação formal com nenhum povo. Isso torna difícil afirmar se possuem ou não desavenças com outras culturas, já que sequer são considerados um 'povo', no sentido tradicional. Ainda que sua presença tenha se tornado comum no mundo, o número de forjados permanece relativamente baixo. Tentativas de organização foram feitas — como a iniciativa de alguns indivíduos que tentaram reunir seus semelhantes na cidade portuária de Lurin, em Drunar — mas todas fracassaram pela baixa adesão. O resultado foi uma cidade com uma concentração incomum de forjados, mas sem coesão política ou cultural que os una de fato.\nNa prática, a ausência de um lar que possam verdadeiramente chamar de seu, somada ao desinteresse generalizado por estabelecer um, transformou os forjados em seres essencialmente livres. Livres para vagar por Auroria e explorar novas formas de existência; livres para escolher os vínculos que desejam criar — seja como aventureiros, como Pretores ou em qualquer outro caminho que encontrem sentido.",
      "nomes_comuns_origem": [
        "Costumam ter nomes semelhantes aos povos da região onde nascem."
      ],
      "abilities": [
        "hl00160000000000",
        "hl00170000000000",
        "hl00180000000000"
      ],
      "origin": "A fala de Exatir era suave e carismática, capaz de acalmar todos que a ouviam. No entanto, por trás de sua expressão serena, escondiam-se mais do que segredos. Essa divindade testemunhara eras: a fundação da Primeira Cidade, a criação dos Legados, os conflitos, a revolta, a queda, a morte e o renascimento. Viu o fim da estagnação e a aurora de um novo tempo. Exatir contemplava o fluxo do Tempo, convencido de que seu momento de agir ainda não havia chegado. Sabia que o mundo necessitaria de seu auxílio após o fim de Arba'shatrah.\nQuando as chamas da guerra se extinguiram, Exatir vagou pelos campos desolados até encontrar dois seres — tão feridos que se mantinham vivos apenas pela recusa de morrer. A divindade então lhes ofereceu uma escolha: aceitar o fim e seguir o curso natural dos eventos, ou renascer sob uma nova forma. Diante da resposta, Exatir uniu o Véu de ambos, selando-o em vestes brancas de aço. Assim nasceu o Primogênito forjado — aquele que o mundo viria a conhecer como o Anfitrião.\nPor eras, o Anfitrião percorreu mundo, alheio à sua origem. Ajudou os povos a superar suas dificuldades, ergueu cidades e protegeu muitas outras. Presenciou a ascensão e queda de civilizações agora esquecidas pelo tempo. Porém, sobrecarregado por sentimentos e memórias que não lhe pertenciam, sua jornada o levou de volta ao ponto de partida: Vértonie — mergulhada em um caos muito maior do que aquele que lembrava. Cansado de tanta dor, o Anfitrião afastou-se do mundo e se isolou no extremo oeste de Vértonie.\nAnos se passaram. E quando rumores de armaduras vazias vagando pelo mundo chegaram até ele, o velho forjado sentiu renascer dentro de si o senso de propósito. Decidiu, então, erguer uma fortaleza — um refúgio para todos os que buscassem abrigo e proteção. Ali, na Fortaleza Adamantina, ele esperou pacientemente, século após século, sentado em seu salão de festas. Mas ninguém veio. Aproximava-se o milênio da fundação da Fortaleza, no ano 58 a.A., quando, já sem esperança, o Anfitrião se levantou para fechar o portão para sempre. Porém, ao tocar a maçaneta, ouviu — ainda que distantes — suaves sons metálicos ecoando. Se tivesse lábios, talvez, pela primeira vez, eles se curvariam num sorriso.",
      "traditions": "O surgimento de um forjado é frequentemente interpretado como um evento sobrenatural — até mesmo divino. Na esperança de que seus mortos retornem à vida nessa forma, alguns povos velam seus entes queridos trajando armaduras ornamentadas, como se preparassem seus corpos para a reencarnação. Embora essa crença não seja totalmente infundada, ela raramente reflete a realidade: um forjado raramente é quem se espera que ele tenha sido. A profanação de túmulos — covas abertas e cadáveres desaparecidos, geralmente obra de ladrões — contribuiu para alimentar esse mito, fortalecendo a ilusão de que os mortos haviam, de fato, retornado à vida como forjados.\nPor outro lado, até poucos anos antes da Ruptura, havia quem acreditasse que os forjados sequer estavam vivos. Muitos aurorianos os viam apenas como cascas animadas, incapazes de sentir amor ou compreender a morte — marcas fundamentais da mortalidade. Por isso, eram tratados como instrumentos, ferramentas úteis, mas desprovidas de alma. Alguns forjados, em busca de aceitação, assumiram esse papel com resignação. Ainda assim, não eram raros os casos em que um forjado demonstrava vestígios de uma vida anterior: manias, expressões, modos de andar, pequenos hábitos como dobrar um pano de certa maneira — fragmentos de um passado esquecido, ecoando por entre as placas de metal.\nA busca incessante por um sentido para sua existência pesa sobre a consciência dos forjados. Esse vazio leva muitos a se apegar a pessoas, grupos, lugares ou ideais que lhes ofereçam propósito — mesmo sabendo que, quando tudo terminar, talvez sejam os únicos a permanecer de pé. Por isso, não há uma cultura unificada dos forjados, tampouco um povo. Em vez disso, são absorvidos pelas sociedades que os acolhem, adotando os nomes e os destinos que lhes são dados.\nContudo, uma das poucas expressões culturais verdadeiramente exclusivas dos forjados é a figura dos Pretores: juristas ambulantes reconhecidos na maioria dos continentes, autorizados a presidir julgamentos e mediar disputas com imparcialidade. Guiados diretamente pelo Anfitrião, esses Pretores atuam também com seus porta-vozes em assembleias oficiais.",
      "inWorld": "Sua existência permanece envolta em incertezas, uma questão ainda sem consenso entre estudiosos. Para alguns, eles são apenas simulacros da vida — construções animadas, desprovidas de alma — e, por isso, não deveriam gozar dos mesmos direitos que os seres vivos. Já outros os veem como reencarnações legítimas, com identidade, memória e espírito, devendo, portanto, ser tratados como qualquer outro cidadão auroriano. Diante dessa ambiguidade, o papel dos Pretores se torna cada vez mais relevante, atuando como mediadores na redefinição das relações entre os feitos de carne e os de aço.\nEnquanto Legado neutro, os forjados não mantêm filiação formal com nenhum povo. Isso torna difícil afirmar se possuem ou não desavenças com outras culturas, já que sequer são considerados um 'povo', no sentido tradicional. Ainda que sua presença tenha se tornado comum no mundo, o número de forjados permanece relativamente baixo. Tentativas de organização foram feitas — como a iniciativa de alguns indivíduos que tentaram reunir seus semelhantes na cidade portuária de Lurin, em Drunar — mas todas fracassaram pela baixa adesão. O resultado foi uma cidade com uma concentração incomum de forjados, mas sem coesão política ou cultural que os una de fato.\nNa prática, a ausência de um lar que possam verdadeiramente chamar de seu, somada ao desinteresse generalizado por estabelecer um, transformou os forjados em seres essencialmente livres. Livres para vagar por Auroria e explorar novas formas de existência; livres para escolher os vínculos que desejam criar — seja como aventureiros, como Pretores ou em qualquer outro caminho que encontrem sentido."
    }
  },
  {
    "_id": "lg00090000000000",
    "name": "Humano",
    "type": "legacy",
    "img": "icons/environment/people/group.svg",
    "legadoKey": "humano",
    "folder": "fldlg00030000000",
    "_key": "!items!lg00090000000000",
    "system": {
      "name": "Humano",
      "height": "Entre 1,50m e 1,90 metros de altura.",
      "lifeExpectancy": "Humanos podem viver até os 80 anos e são considerados adultos com 16 anos.",
      "appearance": "Os humanos possuem uma ampla variedade de traços físicos, desde o formato de seus rostos, o formato dos olhos, os tipos de cabelos e suas tonalidades como o branco, castanho, loiro, ruivo até o preto, assim como seu tom de pele, que possui todas as tonalidades entre o bege e o negro. Seus olhos normalmente são castanhos, mas alguns podem ser verdes ou azuis, e em raros casos, cinzas ou púrpuras.",
      "description": "Sem correntes que os prendam, nem sonhos que não possam concretizar, o destino de cada humano pertence apenas a si mesmos. Sendo o Legado mais populoso de Auroria, humanos são versáteis e ambiciosos, capazes de superar quaisquer adversidades, adaptando-se - ou até mesmo determinando - às revoluções do Tempo e os paradigmas das novas eras.\nSonhadores por natureza e conquistadores por prática, os humanos perpetuam suas tradições e reinados ao longo dos séculos, esperando que outros povos também conheçam seus feitos. Sua cultura é receptiva: cada canto do mundo possui um traço humano, e cada parte do mundo possui sua morada no reino humano. Para os filhos e filhas de Glimmera, não importam locais ou situações, quaisquer lugares podem se tornar seu lar, pois, enquanto possuírem um ideal forte e um sonho a ser alcançado, suas vidas possuirão sentido.",
      "legacyAbilities": [
        {
          "name": "Especialista",
          "description": "Você inicia com um ponto de Maestria adicional. Essa Maestria adicional não poderá ser aplicada em um mesmo Conhecimento que você já possua uma Maestria ao criar um novo personagem.",
          "actions": []
        },
        {
          "name": "Aprimorar Resultados",
          "description": "Ao realizar um teste de Parâmetro ou Conhecimento, e o seu Resultado Natural for 10, ou mais, considere-o um 12.",
          "actions": []
        },
        {
          "name": "Determinação",
          "description": "A sua regra do Dado de Morte é modificada. Você recebe uma Dádiva do Artesão com um 5 no teste, ao invés de 7.",
          "actions": []
        }
      ],
      "continente": "Drunar",
      "altura": "Entre 1,50m e 1,90 metros de altura.",
      "expectativa_de_vida": "Humanos podem viver até os 80 anos e são considerados adultos com 16 anos.",
      "aparencia": "Os humanos possuem uma ampla variedade de traços físicos, desde o formato de seus rostos, o formato dos olhos, os tipos de cabelos e suas tonalidades como o branco, castanho, loiro, ruivo até o preto, assim como seu tom de pele, que possui todas as tonalidades entre o bege e o negro. Seus olhos normalmente são castanhos, mas alguns podem ser verdes ou azuis, e em raros casos, cinzas ou púrpuras.",
      "descricao": "Sem correntes que os prendam, nem sonhos que não possam concretizar, o destino de cada humano pertence apenas a si mesmos. Sendo o Legado mais populoso de Auroria, humanos são versáteis e ambiciosos, capazes de superar quaisquer adversidades, adaptando-se - ou até mesmo determinando - às revoluções do Tempo e os paradigmas das novas eras.\nSonhadores por natureza e conquistadores por prática, os humanos perpetuam suas tradições e reinados ao longo dos séculos, esperando que outros povos também conheçam seus feitos. Sua cultura é receptiva: cada canto do mundo possui um traço humano, e cada parte do mundo possui sua morada no reino humano. Para os filhos e filhas de Glimmera, não importam locais ou situações, quaisquer lugares podem se tornar seu lar, pois, enquanto possuírem um ideal forte e um sonho a ser alcançado, suas vidas possuirão sentido.",
      "origem": "Para Glimmera, sua patrona e criadora, não era importante o formato ou dons, mas sim a vontade de viver e superar os obstáculos que o mundo poderia impor. Sendo uma das últimas a finalizar a sua tarefa, tomando como exemplo as criações de seus irmãos e irmãs, decidiu moldar algo sem vícios, estigmas ou deveres sem carregar o peso da vontade de sua criadora. Os humanos não foram criados com um princípio de liberdade, mas com a possibilidade de conquistar seus objetivos através da sua própria determinação. Aeryz, a Primeira Humana, possuía um intenso amor por tudo que foi criado, sendo também amada por todos. Quando a guerra em Arba'shatrah se iniciou, a Primogênita sentia as dores de cada golpe que Primordiais desferiam uns nos outros. Decidida a acabar com a insanidade instaurada, não escolheu lados, mas sim o próprio caminho. Solicitando uma audiência com os deuses, a filha de Glimmera argumentava que, nessa situação, apenas a aniquilação ou a liberdade eram possíveis. Naquele momento, as vinte divindades presentes, como um ato de amor por suas criações, aceitaram o pedido daquela humana, cortando a ligação entre Auroria e Édona. Naquele momento, a Torre dos Imortais perdera sua indestrutibilidade, sendo destruída pela guerra e finalizando o conflito. Após a queda da Torre dos Imortais, os humanos permaneceram próximos às ruínas da torre. Com isso, testemunharam o nascimento dos Shatraqs, que, sem esforços, escravizaram os humanos por eras. Com liberdade cerceada, os humanos se espalharam por Drunar, formando tribos, todas governadas por um Arauto. Após o desaparecimento repentino dos Shatraqs, o futuro de cada humano era incerto, mas fértil, e diferente dos outros povos, possuíam a fraca luz distante das ruínas da torre para guiá-los. A paz não durou muito tempo, contudo, os desejos individuais geraram conflitos, tendo a ordem reestabelecida apenas décadas depois, quando Alfer, um dos descendentes de Aeryz, vestiu sua coroa de chamas, autoproclamando-se rei e unindo as tribos humanas em um grande império.",
      "tradicoes": "Mesmo que as eras passem, sempre existirá um rei ou rainha humano, independentemente de sua linhagem e, caso uma linhagem acabe, a Coroa de Alfer brilhará diante do novo governante predestinado, o único humano que possui um destino determinado. A partir da Ruptura, e a reconstrução do reino humano, seus governantes - independente do gênero - assumem o título 'Asgalok' quando coroados, somado ao nome de sua família. A palavra Asgalok é um símbolo de poder e legitimidade, referente a Asgalok Ybaria, o Avatar de Glimmera que havia lutado contra Keldanas durante os eventos da Ruptura. Os humanos são conhecidos por seus diversos festivais, pois, aparentemente, qualquer ocasião é motivo o suficiente para festejar. Seu calendário é repleto de datas importantes: o aniversário do rei atual, a troca de estações, heróis importantes do passado, etc. Os festivais mais importantes são o Festival da Fartura uma grande festa que pode durar dias. Cada cidade humana possui o seu próprio festival, comemorando a fundação daquela cidade e promovendo seus produtos locais como o Festival do Queijo na cidade de Fennis ou Festival do Chá e das Flores em Gueniver. Cada região organiza suas datas, para que nenhum festival aconteça simultaneamente, fomentando principalmente o turismo e o comércio local. Esse povo costuma criar superstições peculiares, às vezes sem fundamentos ou origem conhecida. Costumes e tradições são repassados pelas gerações, como manter uma vela acesa em suas casas para afastar assombrações, assoprar para trás quando pressentem algo ruim, pisar no sal derramado para conseguir um parceiro, não se barbear em feriados, entre inúmeras outras crenças. Antes mesmo da Era das Dúvidas, o fogo guiava os humanos, possibilitando o progresso de seu povo. Uma vez por ano, o rei dos humanos invoca o Fogo Primordial, Keltarak, que acende o braseiro em frente ao Castelo de Alfer com a Chama do Progresso. Durante essa cerimônia, são escolhidos os representantes de cada distrito da cidade, que compartilham a Chama do Progresso com o rei e são encarregados de retornar aos seus lares e compartilhar a chama com seus vizinhos, até que todas as casas acendam suas lareiras com ela. Keltarak também surge na morte dos governantes, consumindo seus corpos com suas chamas, aquecendo a Coroa de Alfer após isso, para que então a coroa possa brilhar intensamente diante do novo monarca.",
      "no_mundo": "Desde a Era da Conquista, os humanos se espalharam por todos os continentes, seja como liderança local, mercenários, curandeiros, artesãos, ou simplesmente mão de obra, tornando-os fáceis de encontrar por toda Auroria. A imprevisibilidade humana pode gerar certa desconfiança em outros povos, que logo se desfaz, pois, quando menos se espera, eles adentram em suas culturas, compartilhando o pão e o cerveja de cada dia, como se nunca tivessem sido estranhos. Existe um ditado sobre os humanos: 'Não existe paz ou conflito no qual um humano não esteja envolvido'. Ao longo dos séculos, os humanos acumularam aliados e inimigos e, até mesmo, aqueles que são ambos ao mesmo tempo. Seus aliados mais notáveis são os anões, os minotauros, os vennélis e os inaris. Por outro lado, possuem conflitos, principalmente, com kitaris, valdraks, yuansus e kahats'zas. O povo humano não costuma respeitar outras figuras de poder totalitárias além de seu rei ou rainha. Além disso, desde o surgimento da Inquisição Escarlate e as ações do Cenáculo, foi instaurado um certo preconceito contra conjuradores - reforçado pelos eventos de Tyntanguel. Cada canto do mundo possui alguma influência humana que nem sempre é positiva. Os filhos e filhas de Glimmera orquestraram para que o mundo se tornasse dependente de seu idioma, estabelecendo o idioma comum; criaram o Conselho Auroriano, um importante grupo de mediação de conflitos; além de criar o Grande Chamado, evento que une as nações a favor da paz. Com isso, os humanos puderam ditar suas regras no mundo abaixo da percepção dos outros povos e, conforme os anos avançavam, menos os outros povos podiam fazer contra os tratados e acordos humanos.",
      "nomes_comuns_origem": [
        "Agatha",
        "Diana",
        "Flynn",
        "Josias",
        "Maria",
        "Oliver"
      ],
      "abilities": [
        "hl00190000000000",
        "hl001a0000000000",
        "hl001b0000000000"
      ],
      "origin": "Para Glimmera, sua patrona e criadora, não era importante o formato ou dons, mas sim a vontade de viver e superar os obstáculos que o mundo poderia impor. Sendo uma das últimas a finalizar a sua tarefa, tomando como exemplo as criações de seus irmãos e irmãs, decidiu moldar algo sem vícios, estigmas ou deveres sem carregar o peso da vontade de sua criadora. Os humanos não foram criados com um princípio de liberdade, mas com a possibilidade de conquistar seus objetivos através da sua própria determinação. Aeryz, a Primeira Humana, possuía um intenso amor por tudo que foi criado, sendo também amada por todos. Quando a guerra em Arba'shatrah se iniciou, a Primogênita sentia as dores de cada golpe que Primordiais desferiam uns nos outros. Decidida a acabar com a insanidade instaurada, não escolheu lados, mas sim o próprio caminho. Solicitando uma audiência com os deuses, a filha de Glimmera argumentava que, nessa situação, apenas a aniquilação ou a liberdade eram possíveis. Naquele momento, as vinte divindades presentes, como um ato de amor por suas criações, aceitaram o pedido daquela humana, cortando a ligação entre Auroria e Édona. Naquele momento, a Torre dos Imortais perdera sua indestrutibilidade, sendo destruída pela guerra e finalizando o conflito. Após a queda da Torre dos Imortais, os humanos permaneceram próximos às ruínas da torre. Com isso, testemunharam o nascimento dos Shatraqs, que, sem esforços, escravizaram os humanos por eras. Com liberdade cerceada, os humanos se espalharam por Drunar, formando tribos, todas governadas por um Arauto. Após o desaparecimento repentino dos Shatraqs, o futuro de cada humano era incerto, mas fértil, e diferente dos outros povos, possuíam a fraca luz distante das ruínas da torre para guiá-los. A paz não durou muito tempo, contudo, os desejos individuais geraram conflitos, tendo a ordem reestabelecida apenas décadas depois, quando Alfer, um dos descendentes de Aeryz, vestiu sua coroa de chamas, autoproclamando-se rei e unindo as tribos humanas em um grande império.",
      "traditions": "Mesmo que as eras passem, sempre existirá um rei ou rainha humano, independentemente de sua linhagem e, caso uma linhagem acabe, a Coroa de Alfer brilhará diante do novo governante predestinado, o único humano que possui um destino determinado. A partir da Ruptura, e a reconstrução do reino humano, seus governantes - independente do gênero - assumem o título 'Asgalok' quando coroados, somado ao nome de sua família. A palavra Asgalok é um símbolo de poder e legitimidade, referente a Asgalok Ybaria, o Avatar de Glimmera que havia lutado contra Keldanas durante os eventos da Ruptura. Os humanos são conhecidos por seus diversos festivais, pois, aparentemente, qualquer ocasião é motivo o suficiente para festejar. Seu calendário é repleto de datas importantes: o aniversário do rei atual, a troca de estações, heróis importantes do passado, etc. Os festivais mais importantes são o Festival da Fartura uma grande festa que pode durar dias. Cada cidade humana possui o seu próprio festival, comemorando a fundação daquela cidade e promovendo seus produtos locais como o Festival do Queijo na cidade de Fennis ou Festival do Chá e das Flores em Gueniver. Cada região organiza suas datas, para que nenhum festival aconteça simultaneamente, fomentando principalmente o turismo e o comércio local. Esse povo costuma criar superstições peculiares, às vezes sem fundamentos ou origem conhecida. Costumes e tradições são repassados pelas gerações, como manter uma vela acesa em suas casas para afastar assombrações, assoprar para trás quando pressentem algo ruim, pisar no sal derramado para conseguir um parceiro, não se barbear em feriados, entre inúmeras outras crenças. Antes mesmo da Era das Dúvidas, o fogo guiava os humanos, possibilitando o progresso de seu povo. Uma vez por ano, o rei dos humanos invoca o Fogo Primordial, Keltarak, que acende o braseiro em frente ao Castelo de Alfer com a Chama do Progresso. Durante essa cerimônia, são escolhidos os representantes de cada distrito da cidade, que compartilham a Chama do Progresso com o rei e são encarregados de retornar aos seus lares e compartilhar a chama com seus vizinhos, até que todas as casas acendam suas lareiras com ela. Keltarak também surge na morte dos governantes, consumindo seus corpos com suas chamas, aquecendo a Coroa de Alfer após isso, para que então a coroa possa brilhar intensamente diante do novo monarca.",
      "inWorld": "Desde a Era da Conquista, os humanos se espalharam por todos os continentes, seja como liderança local, mercenários, curandeiros, artesãos, ou simplesmente mão de obra, tornando-os fáceis de encontrar por toda Auroria. A imprevisibilidade humana pode gerar certa desconfiança em outros povos, que logo se desfaz, pois, quando menos se espera, eles adentram em suas culturas, compartilhando o pão e o cerveja de cada dia, como se nunca tivessem sido estranhos. Existe um ditado sobre os humanos: 'Não existe paz ou conflito no qual um humano não esteja envolvido'. Ao longo dos séculos, os humanos acumularam aliados e inimigos e, até mesmo, aqueles que são ambos ao mesmo tempo. Seus aliados mais notáveis são os anões, os minotauros, os vennélis e os inaris. Por outro lado, possuem conflitos, principalmente, com kitaris, valdraks, yuansus e kahats'zas. O povo humano não costuma respeitar outras figuras de poder totalitárias além de seu rei ou rainha. Além disso, desde o surgimento da Inquisição Escarlate e as ações do Cenáculo, foi instaurado um certo preconceito contra conjuradores - reforçado pelos eventos de Tyntanguel. Cada canto do mundo possui alguma influência humana que nem sempre é positiva. Os filhos e filhas de Glimmera orquestraram para que o mundo se tornasse dependente de seu idioma, estabelecendo o idioma comum; criaram o Conselho Auroriano, um importante grupo de mediação de conflitos; além de criar o Grande Chamado, evento que une as nações a favor da paz. Com isso, os humanos puderam ditar suas regras no mundo abaixo da percepção dos outros povos e, conforme os anos avançavam, menos os outros povos podiam fazer contra os tratados e acordos humanos."
    }
  },
  {
    "_id": "lg000a0000000000",
    "name": "Inari",
    "type": "legacy",
    "img": "icons/creatures/mammals/fox-tailed-glowing-blue.svg",
    "legadoKey": "inari",
    "folder": "fldlg00050000000",
    "_key": "!items!lg000a0000000000",
    "system": {
      "name": "Inari",
      "height": "Entre 75 cm e 1,00 metro de altura.",
      "lifeExpectancy": "Inaris podem viver até os 150 anos, sendo considerados adultos aos 15 anos.",
      "appearance": "Esses pequenos seres, com características procionídeas, possuem um olhar firme e, possivelmente, intimidador, dependendo de seu humor. Sua pelagem possui tons predominantemente brancos, pretos, cinzas, laranjas, castanhos ou vermelhos. Seu rosto, peito e cauda, possuem variações na intensidade dessas cores. Seus olhos possuem tons semelhantes à sua pelagem, quando se conectam ao mundo, revelando as suas verdades, seus olhos adquirem uma tonalidade púrpura.\nPossuem um forte apreço por suas caudas, sejam elas longas ou curtas, felpudas ou com pelos baixos. Nas suas caudas, geralmente, penduram ornamentos com símbolos de seu clã, sua patente entre os Sentinelas do Horizonte ou até mesmo da guilda que participam.",
      "description": "Os olhos que nunca descansam, a espada ainda não desembainhada. Protegidos pela Bruma Mística, os inaris permanecem atentos a toda e qualquer oscilação do espaço. A força desse povo é constantemente subestimada devido à sua estatura, mas o mundo aprendeu a respeitá-los e por vezes temê-los. Inaris possuem um estilo de vida simples, apegando-se apenas ao necessário, tendo a disciplina necessária para, normalmente, não cair nas garras da cobiça.\nMembros de famílias grandes e com numerosos irmãos, despertam para a responsabilidade desde cedo. Seu temperamento costuma variar de acordo com o tamanho de suas responsabilidades, não sendo incomum confundi-los com pequenos anciões rabugentos, mesmo com pouca idade.",
      "legacyAbilities": [
        {
          "name": "Sempre Alerta",
          "description": "A sua Percepção Passiva passa a ser 8. A regra de Percepção Passiva é aplicada em você até mesmo enquanto estiver dormindo.",
          "actions": []
        },
        {
          "name": "Sagacidade Mística",
          "description": "Com uma Ação Simples, você passa a enxergar, por 10 minutos, todo Alvo Invisível, transformado ou ilusório, enxergando a sua forma original. Depois de utilizado, esse efeito só poderá ser utilizado novamente após você concluir um Repouso.",
          "actions": [
            {
              "id": "act_sagacidade_mistica",
              "name": "Sagacidade Mística",
              "description": "Enxerga a forma original de alvos invisíveis, metamorfoseados ou ilusórios por 10 minutos (1x por Repouso).",
              "cost": "",
              "type": {
                "actionType": "acaoSimples",
                "category": "utilidade",
                "tags": [
                  "visao",
                  "repouso"
                ]
              },
              "attack": {
                "hasAttack": false
              },
              "damage": {
                "hasDamage": false
              },
              "healing": {
                "hasHealing": false
              },
              "condition": {
                "hasCondition": false
              },
              "check": {
                "hasCheck": false
              },
              "areaOfEffect": {
                "hasArea": false
              }
            }
          ]
        },
        {
          "name": "Instinto Natural",
          "description": "Você possui Aptidão em testes de Agilidade nas suas rolagens de Iniciativa. Além disso, você possui 2 metros adicionais na sua Movimentação.",
          "actions": [],
          "activeEffect": {
            "text": "Aptidão em rolagens de Iniciativa (Agilidade) e +2 metros na Movimentação.",
            "trigger": {
              "event": "automatic"
            },
            "duration": {
              "type": "permanent"
            },
            "changes": [
              {
                "key": "system.movement.walk",
                "mode": 2,
                "value": "2"
              }
            ]
          }
        }
      ],
      "continente": "Narzepion",
      "altura": "Entre 75 cm e 1,00 metro de altura.",
      "expectativa_de_vida": "Inaris podem viver até os 150 anos, sendo considerados adultos aos 15 anos.",
      "aparencia": "Esses pequenos seres, com características procionídeas, possuem um olhar firme e, possivelmente, intimidador, dependendo de seu humor. Sua pelagem possui tons predominantemente brancos, pretos, cinzas, laranjas, castanhos ou vermelhos. Seu rosto, peito e cauda, possuem variações na intensidade dessas cores. Seus olhos possuem tons semelhantes à sua pelagem, quando se conectam ao mundo, revelando as suas verdades, seus olhos adquirem uma tonalidade púrpura.\nPossuem um forte apreço por suas caudas, sejam elas longas ou curtas, felpudas ou com pelos baixos. Nas suas caudas, geralmente, penduram ornamentos com símbolos de seu clã, sua patente entre os Sentinelas do Horizonte ou até mesmo da guilda que participam.",
      "descricao": "Os olhos que nunca descansam, a espada ainda não desembainhada. Protegidos pela Bruma Mística, os inaris permanecem atentos a toda e qualquer oscilação do espaço. A força desse povo é constantemente subestimada devido à sua estatura, mas o mundo aprendeu a respeitá-los e por vezes temê-los. Inaris possuem um estilo de vida simples, apegando-se apenas ao necessário, tendo a disciplina necessária para, normalmente, não cair nas garras da cobiça.\nMembros de famílias grandes e com numerosos irmãos, despertam para a responsabilidade desde cedo. Seu temperamento costuma variar de acordo com o tamanho de suas responsabilidades, não sendo incomum confundi-los com pequenos anciões rabugentos, mesmo com pouca idade.",
      "origem": "Quando o mundo começou a tomar forma, Yachai previu a ruína de Arba'shatrah. Viu que uma guerra dividiria o mundo, fragmentaria o próprio solo, mas que, mesmo com toda a destruição, o mundo prosperaria. A partir de seu próprio corpo, Yachai criou um ser que contemplaria tais mudanças: Hirawa, seu Primogênito, um ser felpudo, grande e gordo, de sorriso simpático. De Hirawa, nasceram os inaris, versões menores, mais ágeis e com grandes olhos, que rapidamente se multiplicaram, tornando-se o Legado mais populoso da Primeira Cidade. Yachai podia ver e ouvir através dos olhos e ouvidos de cada uma de suas criações.\nOs inaris foram incumbidos com as tarefas de vigiar a cidade e guardar a entrada da Torre dos Imortais e, posteriormente, investigar os focos de revolta. Iniciada a guerra, foram os primeiros a serem atacados pelo exército rebelde. Devido ao grande número de inaris, eles conseguiram resistir tempo o suficiente para a chegada da vanguarda vennéli, que logo correu ao seu socorro, inaugurando, assim, a primeira grande batalha entre os rebeldes e aqueles fiéis aos deuses.\nCom o fim de Arba'shatrah, as criações de Yachai deixaram de possuir propósito, refugiando-se então na montanha mais alta desse novo mundo fragmentado. Durante o percurso, poucos sobreviveram - para reestabelecer seu povo, esconderam-se nas fissuras da montanha e entre as árvores próximas a sua base, estabelecendo o Monte Junkai como seu lar.\nContudo, seu esconderijo durou apenas alguns séculos. Devido a um descuido, foram descobertos pelo povo yuansu, que já possuía um grande império. Talvez por admiração, destino ou temor, os inaris juraram lealdade a Bai Nu, a Primogênita yuansu, passando a fazer parte do Império Yuansani.",
      "tradicoes": "Os inaris possuem diversos clãs, compostos por famílias numerosas que se ajudam mutuamente. Estão espalhados em diversas cidades e vilarejos narzepianos, e alguns poucos presentes em outros continentes. Cada clã possui seu símbolo e sua importância, sendo o principal o clã Nagari - uma espécie de nobreza inárica que reside no Palácio dos Quatro Ventos e é responsável pela administração e organização das festividades do seu povo. Devido ao seu povo fazer parte do Império Yuansani, sua organização é limitada a representantes distritais e um representante geral, sempre do clã Nagari, que participa do Conselho das Brumas.\nA cultura inárica estima técnica e precisão, ideais que se refletem no Kenshu, uma dança tradicional delicada, mas intensa. As coreografias do Kenshu são complexas: movimentos de espadas e leques ornam a dança, e apenas um pé pode tocar o chão de cada vez, enquanto executam saltos e giros. A dança é normalmente realizada em duplas ou grupos, lembrando uma batalha simulada, acompanhada por instrumentos tradicionais, como o som ritmado e vigoroso de grandes tambores ornamentados, instrumentos com 12 cordas ou flautas que podem medir até 50cm - entre muitos outros.\nNo centésimo dia do ano, o clã Nagari realiza o Batsuri, um festival com vários propósitos, entre os quais, estão o reencontro de famílias, despedidas, celebração de novas vidas e casamentos, etc. Nesse dia, é realizado um grande banquete com muita música e danças tradicionais. No centro do evento, é armado um altar, que é preenchido com os pertences de entes queridos, que faleceram desde o último Batsuri, para que, pela última vez, estejam entre amigos, podendo então repousar no Limbo sem arrependimentos ou tristezas. Esse evento pode durar até sete dias e noites, dependendo da quantidade de comemorações planejadas. Mesmo longe de casa, muitos inaris reproduzem a tradição, realizando uma pequena versão do Batsuri entre seus companheiros, com uma duração mais curta, mas de igual importância.\nA disciplina e o dever são valores importantes para o povo inari. Como resultado dessa visão, foi criada uma organização paramilitar, chamada Sentinelas do Horizonte, um grupo composto por exímios atiradores, que possui como missão preservar a ordem, através da discrição, utilizando seu árduo treinamento militar para impor a harmonia entre os povos, quando necessário. A honra de um Sentinela do Horizonte deve ser inquestionável. Aqueles que se desvirtuam da ordem, são prontamente expulsos, tornando-se párias aos olhos do povo inari.",
      "no_mundo": "Tendo como morada o misterioso continente de Narzepion, esses pequenos seres são um dos pilares do equilíbrio dentro da sociedade narzepiana. São sempre neutros nos conflitos, pois seu ofício é a manutenção do equilíbrio e o respeito a ele, não tomam lados, a não ser que um dos envolvidos rompa a harmonia que tanto estimam.\nSão muito bem-vistos por outros povos, criando fortes laços com eles, seja pela curiosidade que atraem ou pela sua fibra moral invejável. É incontestável o respeito que transmitem a todos, com a elegância aprendida com os yuansus ou a bravura absorvida dos zaokans. Curiosamente, alguns conseguiram se aproximar dos isolados draenuns, criando uma nova e inesperada subcultura eloquente e dissimulada, tendo Noctúrnia como o lar de muitos dos Inaris que se desviaram do caminho.\nEntendendo as necessidades do novo mundo, alguns inaris expandem a vigília de seu povo, mesmo que existam poucos espalhados pelos diversos continentes, aventuram-se em busca de respostas, para que possam solucionar conflitos, tanto aqueles da sua terra natal, quanto os de outras localidades às quais criam apego.",
      "nomes_comuns_origem": [
        "Jyhun",
        "Hawang",
        "Hotaru",
        "Naori",
        "Yultan",
        "Kauri"
      ],
      "abilities": [
        "hl001c0000000000",
        "hl001d0000000000",
        "hl001e0000000000"
      ],
      "origin": "Quando o mundo começou a tomar forma, Yachai previu a ruína de Arba'shatrah. Viu que uma guerra dividiria o mundo, fragmentaria o próprio solo, mas que, mesmo com toda a destruição, o mundo prosperaria. A partir de seu próprio corpo, Yachai criou um ser que contemplaria tais mudanças: Hirawa, seu Primogênito, um ser felpudo, grande e gordo, de sorriso simpático. De Hirawa, nasceram os inaris, versões menores, mais ágeis e com grandes olhos, que rapidamente se multiplicaram, tornando-se o Legado mais populoso da Primeira Cidade. Yachai podia ver e ouvir através dos olhos e ouvidos de cada uma de suas criações.\nOs inaris foram incumbidos com as tarefas de vigiar a cidade e guardar a entrada da Torre dos Imortais e, posteriormente, investigar os focos de revolta. Iniciada a guerra, foram os primeiros a serem atacados pelo exército rebelde. Devido ao grande número de inaris, eles conseguiram resistir tempo o suficiente para a chegada da vanguarda vennéli, que logo correu ao seu socorro, inaugurando, assim, a primeira grande batalha entre os rebeldes e aqueles fiéis aos deuses.\nCom o fim de Arba'shatrah, as criações de Yachai deixaram de possuir propósito, refugiando-se então na montanha mais alta desse novo mundo fragmentado. Durante o percurso, poucos sobreviveram - para reestabelecer seu povo, esconderam-se nas fissuras da montanha e entre as árvores próximas a sua base, estabelecendo o Monte Junkai como seu lar.\nContudo, seu esconderijo durou apenas alguns séculos. Devido a um descuido, foram descobertos pelo povo yuansu, que já possuía um grande império. Talvez por admiração, destino ou temor, os inaris juraram lealdade a Bai Nu, a Primogênita yuansu, passando a fazer parte do Império Yuansani.",
      "traditions": "Os inaris possuem diversos clãs, compostos por famílias numerosas que se ajudam mutuamente. Estão espalhados em diversas cidades e vilarejos narzepianos, e alguns poucos presentes em outros continentes. Cada clã possui seu símbolo e sua importância, sendo o principal o clã Nagari - uma espécie de nobreza inárica que reside no Palácio dos Quatro Ventos e é responsável pela administração e organização das festividades do seu povo. Devido ao seu povo fazer parte do Império Yuansani, sua organização é limitada a representantes distritais e um representante geral, sempre do clã Nagari, que participa do Conselho das Brumas.\nA cultura inárica estima técnica e precisão, ideais que se refletem no Kenshu, uma dança tradicional delicada, mas intensa. As coreografias do Kenshu são complexas: movimentos de espadas e leques ornam a dança, e apenas um pé pode tocar o chão de cada vez, enquanto executam saltos e giros. A dança é normalmente realizada em duplas ou grupos, lembrando uma batalha simulada, acompanhada por instrumentos tradicionais, como o som ritmado e vigoroso de grandes tambores ornamentados, instrumentos com 12 cordas ou flautas que podem medir até 50cm - entre muitos outros.\nNo centésimo dia do ano, o clã Nagari realiza o Batsuri, um festival com vários propósitos, entre os quais, estão o reencontro de famílias, despedidas, celebração de novas vidas e casamentos, etc. Nesse dia, é realizado um grande banquete com muita música e danças tradicionais. No centro do evento, é armado um altar, que é preenchido com os pertences de entes queridos, que faleceram desde o último Batsuri, para que, pela última vez, estejam entre amigos, podendo então repousar no Limbo sem arrependimentos ou tristezas. Esse evento pode durar até sete dias e noites, dependendo da quantidade de comemorações planejadas. Mesmo longe de casa, muitos inaris reproduzem a tradição, realizando uma pequena versão do Batsuri entre seus companheiros, com uma duração mais curta, mas de igual importância.\nA disciplina e o dever são valores importantes para o povo inari. Como resultado dessa visão, foi criada uma organização paramilitar, chamada Sentinelas do Horizonte, um grupo composto por exímios atiradores, que possui como missão preservar a ordem, através da discrição, utilizando seu árduo treinamento militar para impor a harmonia entre os povos, quando necessário. A honra de um Sentinela do Horizonte deve ser inquestionável. Aqueles que se desvirtuam da ordem, são prontamente expulsos, tornando-se párias aos olhos do povo inari.",
      "inWorld": "Tendo como morada o misterioso continente de Narzepion, esses pequenos seres são um dos pilares do equilíbrio dentro da sociedade narzepiana. São sempre neutros nos conflitos, pois seu ofício é a manutenção do equilíbrio e o respeito a ele, não tomam lados, a não ser que um dos envolvidos rompa a harmonia que tanto estimam.\nSão muito bem-vistos por outros povos, criando fortes laços com eles, seja pela curiosidade que atraem ou pela sua fibra moral invejável. É incontestável o respeito que transmitem a todos, com a elegância aprendida com os yuansus ou a bravura absorvida dos zaokans. Curiosamente, alguns conseguiram se aproximar dos isolados draenuns, criando uma nova e inesperada subcultura eloquente e dissimulada, tendo Noctúrnia como o lar de muitos dos Inaris que se desviaram do caminho.\nEntendendo as necessidades do novo mundo, alguns inaris expandem a vigília de seu povo, mesmo que existam poucos espalhados pelos diversos continentes, aventuram-se em busca de respostas, para que possam solucionar conflitos, tanto aqueles da sua terra natal, quanto os de outras localidades às quais criam apego."
    }
  },
  {
    "_id": "lg000b0000000000",
    "name": "Kahats'za",
    "type": "legacy",
    "img": "icons/magic/symbols/runes-star-pentagram-blue.svg",
    "legadoKey": "kahatsza",
    "folder": "fldlg00060000000",
    "_key": "!items!lg000b0000000000",
    "system": {
      "name": "Kahats'za",
      "height": "Entre 1,50m e 1,80 metros de altura.",
      "lifeExpectancy": "Kahats'zas podem viver até os 80 anos, sendo considerados adultos com 16 anos.",
      "appearance": "Aqueles que, movidos por uma sede insaciável de poder, perseguem os ecos mais profundos do Véu na esperança de compreender o incompreensível, invariavelmente pagam um preço alto. Lidar com o mais profundo Véu custou caro, flagelando a essência destes seres. Assim, os kahats'zas possuem corpos distorcidos. Seus crânios são levemente alongados, assim como os queixos, moldando rostos esguios e losangulares. Em cada lado da face, protuberâncias cartilaginosas semirrígidas emergem em formas variadas, comumente lembrando chifres curvados para baixo.\nSua pele possui tons entre o azul profundo, o cinza e o cinza-azulado, refletindo o desgaste de seus corpos à medida que se aprofundam no Véu. Os cabelos, essencialmente brancos, podem apresentar tons esverdeados ou arroxeados. Esse povo possui olhos como um fragmento do universo, acompanhando o tom de suas peles, mas mais vibrantes e luminosos.",
      "description": "Imersos nas artes místicas, os kahats'zas tornaram-se mestres do Véu, conduzindo estudos profundos e complexos que os transformaram em referência incontestável nesse campo. Entretanto, nem todos retornam dessas explorações incólumes — alguns se perdem em camadas do Véu mais densas do que suas mentes podem suportar. Ainda assim, entre os kahats'zas, o sacrifício individual é frequentemente visto como um preço aceitável pelo avanço coletivo. Tendo ocupado o epicentro Ruptura, agora buscam redenção aos olhos do mundo, tentando sepultar os erros do passado e reconstruir sua reputação. Muitos escolheram se recolher em Vértonie, onde o Véu pulsa com força singular, vívido e encantador, oferecendo-lhes tanto refúgio quanto inspiração.\nNão demonstram apego a bens materiais, a menos que sirvam a um propósito maior — seja no aprimoramento de seus rituais, seja na continuidade de suas pesquisas. Apesar disso, os traumas da Ruptura ainda ecoam entre eles. Alguns kahats'zas tentam, em vão, renegar suas raízes, incapazes de suportar o peso do que já foram. Mas o Véu, uma vez entrelaçado à essência, jamais se desfaz. A ligação é eterna — e a herança, inevitável.",
      "legacyAbilities": [
        {
          "name": "Detectar Magia",
          "description": "Você pode se concentrar por 1 minuto para sentir as linhas do Véu ao seu redor, conseguindo identificar se alguma Conjuração foi realizada no ambiente nas últimas 12 horas. Você também sabe identificar o intuito da Conjuração — controle, destruição, etc.",
          "actions": [
            {
              "id": "act_detectar_magia",
              "name": "Detectar Magia",
              "description": "Concentra-se por 1 minuto para identificar conjurações realizadas nas últimas 12 horas e seu propósito.",
              "cost": "",
              "type": {
                "actionType": "acaoAtiva",
                "category": "utilidade",
                "tags": [
                  "deteccao",
                  "conjuracao"
                ]
              },
              "attack": {
                "hasAttack": false
              },
              "damage": {
                "hasDamage": false
              },
              "healing": {
                "hasHealing": false
              },
              "condition": {
                "hasCondition": false
              },
              "check": {
                "hasCheck": false
              },
              "areaOfEffect": {
                "hasArea": false
              }
            }
          ]
        },
        {
          "name": "Conectado com o Véu",
          "description": "Com uma Ação Simples, você poderá realizar um dos seguintes efeitos:\n• Levitar e mover objetos de até 20 kg, que estejam a 6 metros para um novo local a 6 metros.\n• Abrir ou fechar uma tranca ou recipiente destrancado dentro de 6 metros.\n• Acender ou apagar uma tocha, vela ou fogueira dentro de 6 metros.\n• Modificar a sua voz, ou até mesmo fazer com que ela ressoe a até 6 metros de você. Esse efeito permanece ativo por 1 minuto.",
          "actions": [
            {
              "id": "act_conectado_veu",
              "name": "Conectado com o Véu",
              "description": "Executa telecinese leve (20 kg a 6m), manipulação de trancas, controle de fogo ou voz ressonante.",
              "cost": "",
              "type": {
                "actionType": "acaoSimples",
                "category": "utilidade",
                "tags": [
                  "telecinese",
                  "magia"
                ]
              },
              "attack": {
                "hasAttack": false
              },
              "damage": {
                "hasDamage": false
              },
              "healing": {
                "hasHealing": false
              },
              "condition": {
                "hasCondition": false
              },
              "check": {
                "hasCheck": false
              },
              "areaOfEffect": {
                "hasArea": false
              }
            }
          ]
        },
        {
          "name": "Magia Antiga",
          "description": "Ao perder qualquer valor de Pontos de Vida, o seu próximo custo de Pontos de Energia será reduzido em 1. Esse efeito não acumula e permanece ativo por 1 minuto, caso não seja utilizado.",
          "actions": []
        }
      ],
      "continente": "Vértonie",
      "altura": "Entre 1,50m e 1,80 metros de altura.",
      "expectativa_de_vida": "Kahats'zas podem viver até os 80 anos, sendo considerados adultos com 16 anos.",
      "aparencia": "Aqueles que, movidos por uma sede insaciável de poder, perseguem os ecos mais profundos do Véu na esperança de compreender o incompreensível, invariavelmente pagam um preço alto. Lidar com o mais profundo Véu custou caro, flagelando a essência destes seres. Assim, os kahats'zas possuem corpos distorcidos. Seus crânios são levemente alongados, assim como os queixos, moldando rostos esguios e losangulares. Em cada lado da face, protuberâncias cartilaginosas semirrígidas emergem em formas variadas, comumente lembrando chifres curvados para baixo.\nSua pele possui tons entre o azul profundo, o cinza e o cinza-azulado, refletindo o desgaste de seus corpos à medida que se aprofundam no Véu. Os cabelos, essencialmente brancos, podem apresentar tons esverdeados ou arroxeados. Esse povo possui olhos como um fragmento do universo, acompanhando o tom de suas peles, mas mais vibrantes e luminosos.",
      "descricao": "Imersos nas artes místicas, os kahats'zas tornaram-se mestres do Véu, conduzindo estudos profundos e complexos que os transformaram em referência incontestável nesse campo. Entretanto, nem todos retornam dessas explorações incólumes — alguns se perdem em camadas do Véu mais densas do que suas mentes podem suportar. Ainda assim, entre os kahats'zas, o sacrifício individual é frequentemente visto como um preço aceitável pelo avanço coletivo. Tendo ocupado o epicentro Ruptura, agora buscam redenção aos olhos do mundo, tentando sepultar os erros do passado e reconstruir sua reputação. Muitos escolheram se recolher em Vértonie, onde o Véu pulsa com força singular, vívido e encantador, oferecendo-lhes tanto refúgio quanto inspiração.\nNão demonstram apego a bens materiais, a menos que sirvam a um propósito maior — seja no aprimoramento de seus rituais, seja na continuidade de suas pesquisas. Apesar disso, os traumas da Ruptura ainda ecoam entre eles. Alguns kahats'zas tentam, em vão, renegar suas raízes, incapazes de suportar o peso do que já foram. Mas o Véu, uma vez entrelaçado à essência, jamais se desfaz. A ligação é eterna — e a herança, inevitável.",
      "origem": "O exílio desesperado da Grande Mãe revelou seus mais profundos temores: a suspeita de que toda realidade fosse construída sobre uma mentira. Consumida pela solidão, deu origem a duas entidades — Kýria e Anatael — para que, unidas, pudessem moldar o mundo. Kýria herdou de Gaia a ânsia pela liberdade, o que a levou a desvendar os segredos do Véu — a força que lhe permitiria controlar sua realidade e, com isso, se afastar de Anatael. Apesar da presença de Exatir, designado para mediar os conflitos entre as divindades, as Primeiras-Irmãs tornavam-se cada vez mais antagônicas. No auge da discórdia, Kýria, tomada pela fúria, golpeou Anatael. Essa, ao tentar se defender, teve sua espada despedaçada — e assim se registrou o primeiro ato de violência na história de Auroria.\nEm seus experimentos com o Véu, Kýria criou os kahats'zas, seres dotados com a capacidade de conjurar por conta própria, tendo Enk'zul como seu Primogênito. Ao testemunhar a subserviência dos mortais aos deuses, Enk'zul decidiu compartilhar seu conhecimento do Véu com outros povos — o que provocou a ira de Anatael. Em resposta, ela proibiu a prática da conjuração, decisão que foi umas das motivações para os povos se rebelarem contra os deuses, lançando Arba'shatrah à guerra.\nApós o conflito, os poucos kahats'zas sobreviventes escolheram Vértonie como refúgio. Para eles, apenas os verdadeiros mestres do Véu seriam capazes de habitar aquela terra instável, marcada pelo nascimento do Primogênito elemental, Gaenói. Acreditavam que sua presença ali acalmaria o desequilíbrio do local, permitindo-lhes viver em segurança enquanto aprofundavam seus estudos.\nContudo, a intensidade e a ousadia de suas pesquisas começaram a distorcer ainda mais a região, revelando sua localização e reacendendo os conflitos com os vennélis — filhos de Anatael. Para se proteger, os kahats'zas ergueram Ark'num, uma cidadela escondida em uma dimensão paralela a Auroria. Determinados a resistir, direcionaram seus estudos para conjurações ofensivas, desenvolvendo no processo seu gosto pelo poder e, pouco a pouco, tornando-se exatamente os monstros que os vennélis sempre alegaram que eles eram.",
      "tradicoes": "Os kahats'zas classificaram o Véu em doze categorias fundamentais conhecidas como Esferas, sendo elas: Esfera Arcana (Neutro), Esfera Edônica (Divino), Esfera Ancestral (Espiritual), Esfera Dracônica (Elemental), Esfera Natural (Primal), Esfera Decadente (Profano), Esfera Radiante (Luz), Esfera Sombria (Trevas), Esfera Virtuosa (Corporal), Esfera Ilusória (Sensorial), Esfera Paradoxal (Temporal) e Esfera Oculta (Imaterial). Cada Esfera representa um campo de estudo com lógica própria e formas únicas de manifestação. Embora funcionem como áreas isoladas, é comum que pesquisas avancem sobre mais de uma Esfera simultaneamente. Por exemplo, os estudos sobre a morte normalmente envolvem as Esferas Ancestral, Decaída e Edônica.\nAlém dessa, há ainda a Esfera Nula, que não possui um campo de estudo definido. Seu papel é administrativo, responsável pela organização interna de Ark'num, incluindo educação, segurança e bem-estar social. Os representantes de cada Esfera, chamados de Patronos, e juntos formam a Assembleia Arkadiana, o órgão governante da cidadela kahatszana.\nExtraoficialmente, a Esfera Nula também conduz um processo arriscado e controverso conhecido como Despertar Artificial — uma tentativa de romper, à força, as travas do Véu de um indivíduo. Nesse ritual, o candidato é submetido a sucessivas infusões violentas de Véu, aumentando sua intensidade gradualmente. Poucos sobrevivem, e os que resistem são marcados com mandalas místicas que estabilizam o corpo e acalmam o fluxo do Véu infundido. Apesar de sua brutalidade, muitos kahats'zas encaram esse risco como um preço aceitável para alcançar, nem que seja por um instante, as linhas ocultas da trama infinita do Véu.\nApós a Ruptura, causada por Keldanas, a reputação dos kahats'zas foi arruinada, sendo associados com os Asseclas dos Falsos Deuses e aos perigosos Caminhantes do Véu. Como resposta, os Patronos fundaram a Ordem da Esfera Prismática, uma organização dedicada a restaurar a imagem de seu povo. Essa Ordem tem dois objetivos principais: por Auroria para enfrentar as aberrações do Véu e instruir conjuradores promissores, ensinando-os a praticar com segurança. Seus membros, chamados de Axiomantes, utilizam um estilo de combate que mescla as técnicas místico-marcial da Legião do Templo Cinzento com a anticonjuração dos Inquisidores. Graças a seus esforços, os kahats'zas conquistaram certa tolerância por parte dos demais povos, sendo vistos, cada vez mais, como agentes respeitáveis de Ark'num.",
      "no_mundo": "Embora Ark'num tenha se consolidado como o maior centro de estudo do Véu em toda Auroria — recebendo, inclusive, conjuradores de outros Legados — as relações externas da capital kahatszana sempre foram frágeis. Desde a Ruptura, evento que marcou toda a história de Auroria, o povo kahats'za carrega o fardo do preconceito. São frequentemente associados ao uso da Magia de Sangue e aos temidos Shatraqs, atraindo poucos aliados e acumulando muitos inimigos. Por isso, precisam constantemente provar seu valor e reafirmar sua legitimidade diante dos demais povos.\nParte dessa hostilidade decorre da antiga rivalidade com os vennélis, alimentada por campanhas propagandísticas contra os direitos dos kahats'zas — um conflito que remonta à primeira conjuração realizada, ainda nos tempos de Arba'shatrah. Os elfos os acusam de terem roubado os princípios da Tecnomagia para desenvolver seus Armamentos Místicos — dispositivos que canalizam e amplificam o Véu em conjurações. No entanto, essa acusação carece de base factual, já que tais avanços foram fruto de uma colaboração entre os povos.\nDiante dessa realidade marcada por desconfiança e hostilidade — às vezes até justificadas, devido a abusos do passado — é raro encontrar kahats'zas viajando sozinhos ou em grupos compostos apenas por seus semelhantes. A exceção são os membros da Ordem da Esfera Vazia, que gozam de certo respeito institucional. No mais, preferem se unir a outros Legados, o que lhes confere maior segurança e legitimidade perante o mundo.",
      "nomes_comuns_origem": [
        "Ardozzen",
        "Enk'ren",
        "Ill'nar",
        "Lifrak",
        "Vanzzir"
      ],
      "abilities": [
        "hl001f0000000000",
        "hl00200000000000",
        "hl00210000000000"
      ],
      "origin": "O exílio desesperado da Grande Mãe revelou seus mais profundos temores: a suspeita de que toda realidade fosse construída sobre uma mentira. Consumida pela solidão, deu origem a duas entidades — Kýria e Anatael — para que, unidas, pudessem moldar o mundo. Kýria herdou de Gaia a ânsia pela liberdade, o que a levou a desvendar os segredos do Véu — a força que lhe permitiria controlar sua realidade e, com isso, se afastar de Anatael. Apesar da presença de Exatir, designado para mediar os conflitos entre as divindades, as Primeiras-Irmãs tornavam-se cada vez mais antagônicas. No auge da discórdia, Kýria, tomada pela fúria, golpeou Anatael. Essa, ao tentar se defender, teve sua espada despedaçada — e assim se registrou o primeiro ato de violência na história de Auroria.\nEm seus experimentos com o Véu, Kýria criou os kahats'zas, seres dotados com a capacidade de conjurar por conta própria, tendo Enk'zul como seu Primogênito. Ao testemunhar a subserviência dos mortais aos deuses, Enk'zul decidiu compartilhar seu conhecimento do Véu com outros povos — o que provocou a ira de Anatael. Em resposta, ela proibiu a prática da conjuração, decisão que foi umas das motivações para os povos se rebelarem contra os deuses, lançando Arba'shatrah à guerra.\nApós o conflito, os poucos kahats'zas sobreviventes escolheram Vértonie como refúgio. Para eles, apenas os verdadeiros mestres do Véu seriam capazes de habitar aquela terra instável, marcada pelo nascimento do Primogênito elemental, Gaenói. Acreditavam que sua presença ali acalmaria o desequilíbrio do local, permitindo-lhes viver em segurança enquanto aprofundavam seus estudos.\nContudo, a intensidade e a ousadia de suas pesquisas começaram a distorcer ainda mais a região, revelando sua localização e reacendendo os conflitos com os vennélis — filhos de Anatael. Para se proteger, os kahats'zas ergueram Ark'num, uma cidadela escondida em uma dimensão paralela a Auroria. Determinados a resistir, direcionaram seus estudos para conjurações ofensivas, desenvolvendo no processo seu gosto pelo poder e, pouco a pouco, tornando-se exatamente os monstros que os vennélis sempre alegaram que eles eram.",
      "traditions": "Os kahats'zas classificaram o Véu em doze categorias fundamentais conhecidas como Esferas, sendo elas: Esfera Arcana (Neutro), Esfera Edônica (Divino), Esfera Ancestral (Espiritual), Esfera Dracônica (Elemental), Esfera Natural (Primal), Esfera Decadente (Profano), Esfera Radiante (Luz), Esfera Sombria (Trevas), Esfera Virtuosa (Corporal), Esfera Ilusória (Sensorial), Esfera Paradoxal (Temporal) e Esfera Oculta (Imaterial). Cada Esfera representa um campo de estudo com lógica própria e formas únicas de manifestação. Embora funcionem como áreas isoladas, é comum que pesquisas avancem sobre mais de uma Esfera simultaneamente. Por exemplo, os estudos sobre a morte normalmente envolvem as Esferas Ancestral, Decaída e Edônica.\nAlém dessa, há ainda a Esfera Nula, que não possui um campo de estudo definido. Seu papel é administrativo, responsável pela organização interna de Ark'num, incluindo educação, segurança e bem-estar social. Os representantes de cada Esfera, chamados de Patronos, e juntos formam a Assembleia Arkadiana, o órgão governante da cidadela kahatszana.\nExtraoficialmente, a Esfera Nula também conduz um processo arriscado e controverso conhecido como Despertar Artificial — uma tentativa de romper, à força, as travas do Véu de um indivíduo. Nesse ritual, o candidato é submetido a sucessivas infusões violentas de Véu, aumentando sua intensidade gradualmente. Poucos sobrevivem, e os que resistem são marcados com mandalas místicas que estabilizam o corpo e acalmam o fluxo do Véu infundido. Apesar de sua brutalidade, muitos kahats'zas encaram esse risco como um preço aceitável para alcançar, nem que seja por um instante, as linhas ocultas da trama infinita do Véu.\nApós a Ruptura, causada por Keldanas, a reputação dos kahats'zas foi arruinada, sendo associados com os Asseclas dos Falsos Deuses e aos perigosos Caminhantes do Véu. Como resposta, os Patronos fundaram a Ordem da Esfera Prismática, uma organização dedicada a restaurar a imagem de seu povo. Essa Ordem tem dois objetivos principais: por Auroria para enfrentar as aberrações do Véu e instruir conjuradores promissores, ensinando-os a praticar com segurança. Seus membros, chamados de Axiomantes, utilizam um estilo de combate que mescla as técnicas místico-marcial da Legião do Templo Cinzento com a anticonjuração dos Inquisidores. Graças a seus esforços, os kahats'zas conquistaram certa tolerância por parte dos demais povos, sendo vistos, cada vez mais, como agentes respeitáveis de Ark'num.",
      "inWorld": "Embora Ark'num tenha se consolidado como o maior centro de estudo do Véu em toda Auroria — recebendo, inclusive, conjuradores de outros Legados — as relações externas da capital kahatszana sempre foram frágeis. Desde a Ruptura, evento que marcou toda a história de Auroria, o povo kahats'za carrega o fardo do preconceito. São frequentemente associados ao uso da Magia de Sangue e aos temidos Shatraqs, atraindo poucos aliados e acumulando muitos inimigos. Por isso, precisam constantemente provar seu valor e reafirmar sua legitimidade diante dos demais povos.\nParte dessa hostilidade decorre da antiga rivalidade com os vennélis, alimentada por campanhas propagandísticas contra os direitos dos kahats'zas — um conflito que remonta à primeira conjuração realizada, ainda nos tempos de Arba'shatrah. Os elfos os acusam de terem roubado os princípios da Tecnomagia para desenvolver seus Armamentos Místicos — dispositivos que canalizam e amplificam o Véu em conjurações. No entanto, essa acusação carece de base factual, já que tais avanços foram fruto de uma colaboração entre os povos.\nDiante dessa realidade marcada por desconfiança e hostilidade — às vezes até justificadas, devido a abusos do passado — é raro encontrar kahats'zas viajando sozinhos ou em grupos compostos apenas por seus semelhantes. A exceção são os membros da Ordem da Esfera Vazia, que gozam de certo respeito institucional. No mais, preferem se unir a outros Legados, o que lhes confere maior segurança e legitimidade perante o mundo."
    }
  },
  {
    "_id": "lg000c0000000000",
    "name": "Kitari",
    "type": "legacy",
    "img": "icons/skills/social/diplomacy-handshake.svg",
    "legadoKey": "kitari",
    "folder": "fldlg00040000000",
    "_key": "!items!lg000c0000000000",
    "system": {
      "name": "Kitari",
      "height": "Entre 1,50m e 2 metros de altura.",
      "lifeExpectancy": "Kitaris podem viver até os 100 anos e são considerados adultos aos 18 anos.",
      "appearance": "Soberanos das areias de Ak'dala e co-fundadores da paradisíaca Jazaar, os kitaris possuem características de todos os tipos de felinos, como orelhas felpudas, pelagem rasteira, ou volumosa em alguns casos, e longas caudas condizentes com sua pelagem. O padrão de marcas e pelagem de seu corpo varia entre branco, preto, caramelo, marrom ou cinza, podendo possuir mesclas, pintas ou tons rajados, criando os mais diversos padrões, e seus olhos possuem tons vibrantes, geralmente verdes, amarelos, castanhos ou azuis. Kitaris masculinos podem apresentar barbas finas ou jubas que envolvem seus pescoços e o topo de suas cabeças, enquanto kitaris femininas podem possuir uma longa pelagem que surge do topo de suas cabeças até sua nuca, semelhante a cabelos.",
      "description": "À mercê da sorte, dançam entre a seriedade e a despreocupação, muitas vezes são práticos e diretos, resolvendo conflitos antes mesmo de serem criados, enquanto em outras tantas ocasiões, apenas relaxam, aproveitando os prazeres que a vida pode proporcionar, como jogos de azar, dança, joias, boa comida, roupas confortáveis e elegantes ou uma inesperada brisa refrescante a atravessar suas pelagens. Para um kitari, as coisas provavelmente darão certo, de alguma maneira. Talvez esse sentimento tenha surgido de uma brincadeira de Fif'nir para agitar a existência do seu Legado, que se aproveita disso para brincar com as emoções alheias com suas conversas labirínticas.",
      "legacyAbilities": [
        {
          "name": "Mobilidade Felina",
          "description": "Você possui um corpo ágil, modificando a regra de Saltar, fazendo com que você dobre os valores concedidos pelo Salto à Distância e o Salto em Altura.",
          "actions": []
        },
        {
          "name": "Improviso Natural",
          "description": "Todo dano de Queda recebido é reduzido pela metade. Você também ignora metade dos pontos de Fratura recebidos por danos de Queda.",
          "actions": []
        },
        {
          "name": "Sorte",
          "description": "Sempre que você obter 1 como Resultado Natural de um teste de Parâmetro, você poderá realizar novamente esse mesmo teste.",
          "actions": []
        }
      ],
      "continente": "Krabesh",
      "altura": "Entre 1,50m e 2 metros de altura.",
      "expectativa_de_vida": "Kitaris podem viver até os 100 anos e são considerados adultos aos 18 anos.",
      "aparencia": "Soberanos das areias de Ak'dala e co-fundadores da paradisíaca Jazaar, os kitaris possuem características de todos os tipos de felinos, como orelhas felpudas, pelagem rasteira, ou volumosa em alguns casos, e longas caudas condizentes com sua pelagem. O padrão de marcas e pelagem de seu corpo varia entre branco, preto, caramelo, marrom ou cinza, podendo possuir mesclas, pintas ou tons rajados, criando os mais diversos padrões, e seus olhos possuem tons vibrantes, geralmente verdes, amarelos, castanhos ou azuis. Kitaris masculinos podem apresentar barbas finas ou jubas que envolvem seus pescoços e o topo de suas cabeças, enquanto kitaris femininas podem possuir uma longa pelagem que surge do topo de suas cabeças até sua nuca, semelhante a cabelos.",
      "descricao": "À mercê da sorte, dançam entre a seriedade e a despreocupação, muitas vezes são práticos e diretos, resolvendo conflitos antes mesmo de serem criados, enquanto em outras tantas ocasiões, apenas relaxam, aproveitando os prazeres que a vida pode proporcionar, como jogos de azar, dança, joias, boa comida, roupas confortáveis e elegantes ou uma inesperada brisa refrescante a atravessar suas pelagens. Para um kitari, as coisas provavelmente darão certo, de alguma maneira. Talvez esse sentimento tenha surgido de uma brincadeira de Fif'nir para agitar a existência do seu Legado, que se aproveita disso para brincar com as emoções alheias com suas conversas labirínticas.",
      "origem": "Fif'nir passava seus dias perambulando Arba'shatrah. Quando questionavam sua ociosidade, apenas respondia: 'Fif'nir está ocupado com coisas maiores', embaralhando a mente de seus irmãos e irmãs. Passado algum tempo, um estrondoso rugido ressoou por Arba'shatrah, anunciando o Primogênito de Fif'nir - o Rei Solasta - acompanhado de seus semelhantes, os kitaris. Por instinto, toda a população da cidade divina curvou-se diante do primeiro Rei. O carisma do Rei Solasta foi fundamental para angariar apoio contra os deuses da Ordem, enfraquecendo as forças inimigas, mas mesmo ele não podia prever a represália divina, sendo forçado a escolher entre seu povo e a guerra. O Rei Solasta se negou a participar da guerra, ao invés disso, convocou todos aqueles que lhe eram leais e, guiados pelos delahks, os kitaris marcharam rumo a Ya'ará. Posteriormente, foram seguidos por draenuns e orkrashs, que buscavam um recomeço. Mesmo com a aparente paz, algo incomodava o Rei kitari. Sussurros penetravam sua mente como um lamento. Após investigar, descobriu que a misteriosa voz vinha da galeria mais profunda de Ya'ará. Seguindo-a, encontrou um espelho, que se tornava mais brilhante à medida que Solasta se aproximava. Ao tocá-lo, era como ele pudesse conectar-se à criação, desde o vazio antes de tudo até o vazio após o fim. No fim de sua visão, havia uma esfera flamejante que bania todas as preocupações. Ao almejar tal esfera para si, Pris'ma surgiu na sua frente para puni-lo, transformando-o numa réplica daquilo que tanto desejara. Quando Solasta se transformou numa esfera flamejante, tudo que sua luz tocava era transformado em cinzas, dando origem ao Deserto de Ak'dala. Fif'nir interveio em favor dos mortais, evitando uma calamidade ainda maior: ao mesmo tempo que protegia todos os habitantes de Ya'ará, conteve a expansão de Solasta e o lançou ao céu, que passou a orbitar Auroria ao lado das Três Guardiãs, as Luas. A nova forma de Solasta foi nomeada Sol e, consequentemente, esse evento instaurou o início da Era Dourada, banindo as trevas do mundo. Após isso, em meio à vastidão das areias, kitaris e delahks uniram-se para criar a Joia do Deserto, Jazaar, seu novo lar, banhado pela luz de seu eterno rei.",
      "tradicoes": "Tanto kitaris quanto toda Krabesh são governados por um único ser, o Soberano do Deserto. Essa figura é uma reencarnação do Primogênito kitari, o Rei Solasta, que herda a sabedoria e a memória das suas vidas passadas, mas nem sempre com a mesma personalidade ou ideais. Soberanos do Deserto são reconhecidos por sua pelagem semelhante a fios de ouro, que cobre todo o seu corpo e pelo rápido amadurecimento, tornando-se adultos com menos de 1 ano, contudo, seus corpos são severamente castigados pelo tempo. Por isso, o reinado mais longo já registrado por um Soberano durou apenas 7 anos. Durante a ausência de um Soberano, o continente é governado pelo Principado, os descendentes do Soberano do Deserto anterior, que possuem manchas douradas em sua pelagem. Após a posse do novo Soberano, o Principado deve ceder o poder e auxiliar na administração de Krabesh. Sempre que um novo Soberano reencarna, ocorre um eclipse solar, que pode ser observado no mundo todo. Os kitaris acreditam que isso ocorre porque o Rei Solasta se ausenta do céu para dar vida ao seu novo avatar. Durante esse dia, é comemorado o Dia do Sol, onde todos se pintam com tinta dourada para exaltar as virtudes do Sol presente em cada um. Além disso, são realizados banquetes, danças e cantorias em nome de Solasta, enaltecendo a vida e a sorte de estarem vivos, orando para que a prosperidade não os abandone. Os kitaris atribuem vários fatores de suas vidas a Fif'nir, como a sorte de conquistar riquezas e uma vida repleta de emoções, ou o azar de não possuir poder para mudar a sua realidade e, com isso, tornaram-se muito supersticiosos, constantemente consultando videntes para descobrir seus objetos, cores, ou qualquer outra coisa que represente sua sorte particular. Essas crenças são refletidas na sua preferência por usar trajes exuberantes e coloridos, principalmente com cores quentes, além de diversas joias, independentemente de serem verdadeiras ou falsas, pois acreditam que essas coisas trazem alegria e afastam o azar.",
      "no_mundo": "Os kitaris possuem uma fama dúbia. Ao mesmo tempo em que apresentam diversas virtudes, também transmitem a sensação de sempre estarem escondendo algo. Sua real natureza é mal compreendida e falsamente atribuída, estigmas gerados pela tradição de não se envolver em guerras externas, criando a impressão de serem cativantes e acolhedores, mas ao mesmo tempo acomodados, o que nem de perto é a verdade, visto que a vida em Jazaar tende a beneficiar apenas os astutos. A união dos povos de Krabesh é tão forte que grande parte de suas culturas se tornaram uma só, com atribuições dos três Legados; a astúcia kitari, a sabedoria orkrash e a ambição delahk. Contudo, draenuns ainda são considerados forasteiros, um tratamento semelhante ao restante do mundo. Não nutrem grandes amizades ou inimizades com outros povos, apenas discordâncias com humanos e vennélis, que tradicionalmente tendem a não reconhecer outros governantes, ou fazer pouco caso de outras lideranças. Suas relações diplomáticas são claras e simples: cada continente possui sua soberania, cada cidade tem sua autoridade, cada líder sabe o que é melhor para seu povo, devido a isso, Krabesh nunca entrou em guerra com outros povos, e todos os estrangeiros são tratados da mesma forma. Muitos kitaris atendem o chamado à aventura, encantados com as infinitas possibilidades vendidas pelas histórias contadas por viajantes sobre o mundo além do deserto. Em busca de novos tesouros ou aventuras, esses kitaris apenas vagam sem rumo pelo mundo, para então coincidentemente encontrarem aquilo que precisam, enquanto outros passam toda sua vida em Jazaar, mesmo com a criminalidade e outras dificuldades, ignorando a existência dos outros continentes, cegos por sua fé nos Soberanos do Deserto.",
      "nomes_comuns_origem": [
        "Ays'rah",
        "Ja'zah",
        "Ka'shen",
        "Naaj'dar",
        "Qa'zir"
      ],
      "abilities": [
        "hl00220000000000",
        "hl00230000000000",
        "hl00240000000000"
      ],
      "origin": "Fif'nir passava seus dias perambulando Arba'shatrah. Quando questionavam sua ociosidade, apenas respondia: 'Fif'nir está ocupado com coisas maiores', embaralhando a mente de seus irmãos e irmãs. Passado algum tempo, um estrondoso rugido ressoou por Arba'shatrah, anunciando o Primogênito de Fif'nir - o Rei Solasta - acompanhado de seus semelhantes, os kitaris. Por instinto, toda a população da cidade divina curvou-se diante do primeiro Rei. O carisma do Rei Solasta foi fundamental para angariar apoio contra os deuses da Ordem, enfraquecendo as forças inimigas, mas mesmo ele não podia prever a represália divina, sendo forçado a escolher entre seu povo e a guerra. O Rei Solasta se negou a participar da guerra, ao invés disso, convocou todos aqueles que lhe eram leais e, guiados pelos delahks, os kitaris marcharam rumo a Ya'ará. Posteriormente, foram seguidos por draenuns e orkrashs, que buscavam um recomeço. Mesmo com a aparente paz, algo incomodava o Rei kitari. Sussurros penetravam sua mente como um lamento. Após investigar, descobriu que a misteriosa voz vinha da galeria mais profunda de Ya'ará. Seguindo-a, encontrou um espelho, que se tornava mais brilhante à medida que Solasta se aproximava. Ao tocá-lo, era como ele pudesse conectar-se à criação, desde o vazio antes de tudo até o vazio após o fim. No fim de sua visão, havia uma esfera flamejante que bania todas as preocupações. Ao almejar tal esfera para si, Pris'ma surgiu na sua frente para puni-lo, transformando-o numa réplica daquilo que tanto desejara. Quando Solasta se transformou numa esfera flamejante, tudo que sua luz tocava era transformado em cinzas, dando origem ao Deserto de Ak'dala. Fif'nir interveio em favor dos mortais, evitando uma calamidade ainda maior: ao mesmo tempo que protegia todos os habitantes de Ya'ará, conteve a expansão de Solasta e o lançou ao céu, que passou a orbitar Auroria ao lado das Três Guardiãs, as Luas. A nova forma de Solasta foi nomeada Sol e, consequentemente, esse evento instaurou o início da Era Dourada, banindo as trevas do mundo. Após isso, em meio à vastidão das areias, kitaris e delahks uniram-se para criar a Joia do Deserto, Jazaar, seu novo lar, banhado pela luz de seu eterno rei.",
      "traditions": "Tanto kitaris quanto toda Krabesh são governados por um único ser, o Soberano do Deserto. Essa figura é uma reencarnação do Primogênito kitari, o Rei Solasta, que herda a sabedoria e a memória das suas vidas passadas, mas nem sempre com a mesma personalidade ou ideais. Soberanos do Deserto são reconhecidos por sua pelagem semelhante a fios de ouro, que cobre todo o seu corpo e pelo rápido amadurecimento, tornando-se adultos com menos de 1 ano, contudo, seus corpos são severamente castigados pelo tempo. Por isso, o reinado mais longo já registrado por um Soberano durou apenas 7 anos. Durante a ausência de um Soberano, o continente é governado pelo Principado, os descendentes do Soberano do Deserto anterior, que possuem manchas douradas em sua pelagem. Após a posse do novo Soberano, o Principado deve ceder o poder e auxiliar na administração de Krabesh. Sempre que um novo Soberano reencarna, ocorre um eclipse solar, que pode ser observado no mundo todo. Os kitaris acreditam que isso ocorre porque o Rei Solasta se ausenta do céu para dar vida ao seu novo avatar. Durante esse dia, é comemorado o Dia do Sol, onde todos se pintam com tinta dourada para exaltar as virtudes do Sol presente em cada um. Além disso, são realizados banquetes, danças e cantorias em nome de Solasta, enaltecendo a vida e a sorte de estarem vivos, orando para que a prosperidade não os abandone. Os kitaris atribuem vários fatores de suas vidas a Fif'nir, como a sorte de conquistar riquezas e uma vida repleta de emoções, ou o azar de não possuir poder para mudar a sua realidade e, com isso, tornaram-se muito supersticiosos, constantemente consultando videntes para descobrir seus objetos, cores, ou qualquer outra coisa que represente sua sorte particular. Essas crenças são refletidas na sua preferência por usar trajes exuberantes e coloridos, principalmente com cores quentes, além de diversas joias, independentemente de serem verdadeiras ou falsas, pois acreditam que essas coisas trazem alegria e afastam o azar.",
      "inWorld": "Os kitaris possuem uma fama dúbia. Ao mesmo tempo em que apresentam diversas virtudes, também transmitem a sensação de sempre estarem escondendo algo. Sua real natureza é mal compreendida e falsamente atribuída, estigmas gerados pela tradição de não se envolver em guerras externas, criando a impressão de serem cativantes e acolhedores, mas ao mesmo tempo acomodados, o que nem de perto é a verdade, visto que a vida em Jazaar tende a beneficiar apenas os astutos. A união dos povos de Krabesh é tão forte que grande parte de suas culturas se tornaram uma só, com atribuições dos três Legados; a astúcia kitari, a sabedoria orkrash e a ambição delahk. Contudo, draenuns ainda são considerados forasteiros, um tratamento semelhante ao restante do mundo. Não nutrem grandes amizades ou inimizades com outros povos, apenas discordâncias com humanos e vennélis, que tradicionalmente tendem a não reconhecer outros governantes, ou fazer pouco caso de outras lideranças. Suas relações diplomáticas são claras e simples: cada continente possui sua soberania, cada cidade tem sua autoridade, cada líder sabe o que é melhor para seu povo, devido a isso, Krabesh nunca entrou em guerra com outros povos, e todos os estrangeiros são tratados da mesma forma. Muitos kitaris atendem o chamado à aventura, encantados com as infinitas possibilidades vendidas pelas histórias contadas por viajantes sobre o mundo além do deserto. Em busca de novos tesouros ou aventuras, esses kitaris apenas vagam sem rumo pelo mundo, para então coincidentemente encontrarem aquilo que precisam, enquanto outros passam toda sua vida em Jazaar, mesmo com a criminalidade e outras dificuldades, ignorando a existência dos outros continentes, cegos por sua fé nos Soberanos do Deserto."
    }
  },
  {
    "_id": "lg000d0000000000",
    "name": "Minotauro",
    "type": "legacy",
    "img": "icons/skills/melee/weapons-crossed-axes-bull.svg",
    "legadoKey": "minotauro",
    "folder": "fldlg00010000000",
    "_key": "!items!lg000d0000000000",
    "system": {
      "name": "Minotauro",
      "height": "Entre 1,80 e 2,30 metros de altura.",
      "lifeExpectancy": "Minotauros podem viver por 200 anos e são considerados adultos aos 20 anos.",
      "appearance": "Robustos e perseverantes como somente touros humanoides podem ser, possuem um par de chifres com uma vasta variedade de formatos, caudas bovinas e cascos ao invés de pés, livres para desbravar cada canto de Auroria. Sua pelagem geralmente é castanha, mas também podem apresentar tons pretos, brancos, caramelo ou uma mescla desses. Sua ligação com as estrelas lhes concedeu olhos das mais variadas cores, como azul celeste, púrpura, dourado ou, em alguns raros casos, cores mais comuns como castanho ou preto.",
      "description": "As Luas e as estrelas não são apenas decorações no céu para os minotauros, são parte da sua essência. A dupla origem desse povo, primeiro por Dahaki, depois pelas Luas, os fez criar uma perspectiva única do mundo: perseverantes em seus objetivos, a liberdade guia suas vidas e, nunca presos a um destino sufocante, escolheram o mundo inteiro como seu jardim. Pode parecer pura arrogância, mas, para eles, uma vida sem algemas é o único modo possível de viver.\nO acúmulo de práticas, experiências e costumes tornaram os minotauros não apenas temíveis, mas também sábios e engenhosos dentro e fora dos campos de batalha. Conquistadores dos Quatro Mares aurorianos, sob a proteção das Três Guardiãs, enfrentam de frente qualquer obstáculo, sempre desejando que sua estrela-guia brilhe intensamente.",
      "legacyAbilities": [
        {
          "name": "Nômade",
          "description": "Você nunca esquece o caminho de trilhas, estradas ou ruínas que já tenha percorrido. Com uma Ação Simples, você se conecta a um pequeno local que você já tenha visitado (um quarto, sala, saguão, por exemplo), podendo enxergar tudo nesse local por 10 minutos. Você poderá desfazer esse efeito a qualquer momento. Depois de utilizada, essa habilidade só poderá ser utilizada novamente após você concluir um Repouso.",
          "actions": [
            {
              "id": "act_nomade",
              "name": "Nômade",
              "description": "Conecta-se a um local previamente visitado, enxergando tudo por 10 minutos (1x por Repouso).",
              "cost": "",
              "type": {
                "actionType": "acaoSimples",
                "category": "utilidade",
                "tags": [
                  "clarividencia",
                  "repouso"
                ]
              },
              "attack": {
                "hasAttack": false
              },
              "damage": {
                "hasDamage": false
              },
              "healing": {
                "hasHealing": false
              },
              "condition": {
                "hasCondition": false
              },
              "check": {
                "hasCheck": false
              },
              "areaOfEffect": {
                "hasArea": false
              }
            }
          ]
        },
        {
          "name": "Filho de Nolgadan",
          "description": "Você é imune a Lentidão e a Terrenos Difíceis.",
          "actions": [],
          "activeEffect": {
            "text": "Imunidade à condição Lentidão e a Terrenos Difíceis.",
            "trigger": {
              "event": "automatic"
            },
            "duration": {
              "type": "permanent"
            },
            "changes": [
              {
                "key": "system.conditionImmunity",
                "mode": 2,
                "value": "lentidao"
              },
              {
                "key": "system.conditionImmunity",
                "mode": 2,
                "value": "terreno dificil"
              }
            ]
          }
        },
        {
          "name": "Corrida Aprimorada",
          "description": "O total de Metros percorrido em sua Corrida é dobrado.",
          "actions": []
        }
      ],
      "continente": "Aenólia",
      "altura": "Entre 1,80 e 2,30 metros de altura.",
      "expectativa_de_vida": "Minotauros podem viver por 200 anos e são considerados adultos aos 20 anos.",
      "aparencia": "Robustos e perseverantes como somente touros humanoides podem ser, possuem um par de chifres com uma vasta variedade de formatos, caudas bovinas e cascos ao invés de pés, livres para desbravar cada canto de Auroria. Sua pelagem geralmente é castanha, mas também podem apresentar tons pretos, brancos, caramelo ou uma mescla desses. Sua ligação com as estrelas lhes concedeu olhos das mais variadas cores, como azul celeste, púrpura, dourado ou, em alguns raros casos, cores mais comuns como castanho ou preto.",
      "descricao": "As Luas e as estrelas não são apenas decorações no céu para os minotauros, são parte da sua essência. A dupla origem desse povo, primeiro por Dahaki, depois pelas Luas, os fez criar uma perspectiva única do mundo: perseverantes em seus objetivos, a liberdade guia suas vidas e, nunca presos a um destino sufocante, escolheram o mundo inteiro como seu jardim. Pode parecer pura arrogância, mas, para eles, uma vida sem algemas é o único modo possível de viver.\nO acúmulo de práticas, experiências e costumes tornaram os minotauros não apenas temíveis, mas também sábios e engenhosos dentro e fora dos campos de batalha. Conquistadores dos Quatro Mares aurorianos, sob a proteção das Três Guardiãs, enfrentam de frente qualquer obstáculo, sempre desejando que sua estrela-guia brilhe intensamente.",
      "origem": "Dahaki sempre admirou o céu. Inalcançável, sublime, distante... como se o chamasse, revelando caminhos para algo maior. Apaixonado pelas Três Guardiãs, as Luas, obteve delas sua inspiração para criar aquele que nasceria com a impetuosidade de romper qualquer limite. Em honra às suas musas celestiais, concedeu ao seu Primogênito, Nogaldan, três bênçãos sagradas: de Xaec, a Dama Sábia, a sabedoria que revela os caminhos; de Yeyt, a Dama Gentil, a coragem para escolher o caminho; e de Zoth, a Dama Guerreira, a bravura necessária para enfrentar as consequências de suas escolhas.\nNogaldan era afetado por visões nebulosas de um mundo que não conhecia eventos contraditórios ou realidades distantes, como sussurros. Contudo, uma dessas visões o perturbou mais que todas as outras: deuses e Primordiais tramavam uma guerra, que culminaria na queda de Arba'shatrah. Desesperado, alertou a todos que podia sobre o eminente fim. Alguns acreditaram, muitos não, fomentando uma revolta que ainda não existia, fazendo-os se questionarem sobre o mundo. O que começou como um boato logo ganhou forma, dando início à guerra pela liberdade.\nQuando Nogaldan percebeu o que fez, clamou pelo perdão de seu criador, que, em lágrimas, abraçou seu Primogênito. Dahaki então percebeu que ninguém é verdadeiramente livre, todos estão presos a algo. Mesmo sabendo o caminho que Nogaldan poderia trilhar, quis descobrir o que uma criação dos deuses faria se possuísse verdadeira liberdade, sem amarras ou guias. Perdido, o Primogênito ofereceu a sua existência, como sacrifício para servir de exemplo, buscando acabar com os conflitos. Com pesar no coração, Dahaki aceitou. Após um discurso acalorado, quando a divindade destruiria seu amado filho, a luz das Três Guardiãs interveio. Envolvendo Nogaldan em seu brilho prateado, puxaram-no para o céu, estilhaçando seu corpo em milhões de pequenas luzes, que preencheriam o céu ao seu lado, criando as estrelas. A partir da luz dessas estrelas, um novo Legado foi criado, os filhos das Luas e de Dahaki, aqueles que herdariam as três bênçãos confiadas a Nogaldan: os minotauros. Durante a guerra em Arba'shatrah, os jovens minotauros se recusaram a participar de tamanha discórdia, buscando refúgio no sul, seguindo os rastros de uma estrela brilhante, Daharidar.",
      "tradicoes": "Os líderes das tribos minotáuricas são escolhidos através de eleições populares com votos declarados, que ocorrem a cada 10 anos, na crença de que aquele mais preparado deve governar. Os líderes eleitos devem decidir entre si o novo líder da capital, Dromodan, e, consequentemente, da nação minotaurica. Quando escolhido, o novo líder da nação define um novo líder para sua tribo original.\nApós o nascimento de um minotauro, a criança deverá ser apresentada ao céu noturno, as estrelas e as Luas. De acordo com a lua mais brilhante naquela noite, é amarrada uma fita no tornozelo do recém-nascido, com a cor de uma das Luas: verde para Xaec, azul para Yeyt e vermelho para Zoth. Os Minotauros costumas usá-las por toda a sua vida, renovando-as quando necessário. É possível que mais de uma lua abençoe um minotauro e, caso as três Luas brilhem intensamente, é esperado um futuro grandioso, assim como o da maioria dos grandes nomes que marcaram a história minotaurica. Nos raríssimos casos em que as Luas não estejam no céu, entende-se que o nascimento é sinal de mau agouro, e a criança costuma ser evitada ou, até mesmo, sacrificada. Quando morrem, seus corpos são cremados e oferecidos para sua lua-guia, para que suas almas se transformem em fumaça e subam ao céu, repousando ao lado das estrelas e das Luas no eterno silêncio.\nOrgulhosos de seus chifres, possuem o costume de adorná-los e entalhá-los, com representações de sua tribo, da lua que lhes guia, de suas inspirações, sua ocupação ou quaisquer coisas que possuam algum sentido profundo para o minotauro. Após entalhar os chifres, costumam preencher os vincos com uma mistura especial, que consiste em pó de conchas trituradas, seiva de árvore e extratos de ervas, para dar o pigmento de sua lua patrona, criando uma tinta especial, semelhante a tinta usada pelo povo netunes. Por mais que o povo de Dahaki possua muitos avanços tecnológicos, ainda mais devido ao seu contato com os elfos, dão muito valor às suas tradições, criando um contraste entre os majestosos galeões, um complexo observatório e arquitetura requintada, ao mesmo tempo que utilizam seus adornos tribais e vestes simples, mas funcionais. Isso se traduz mais precisamente no artesanato, possuindo bordados reconhecidos mundialmente, lhes garantindo uma participação na moda élfica.",
      "no_mundo": "O povo minotáurico possui exploradores natos, não sendo coincidência terem sido os primeiros a navegar pelos mares de Auroria. Também se destacam pelos diversos meios de transporte terrestre e pela construção das estradas nos quais são utilizados, assim como sua parceria com os humanos na criação das Rotas Imperiais. Em sua expansão, firmaram parcerias com os elfos, netunes e alraunes, possibilitando a cooperação entre as nações de Aenólia e fomentando o comércio. Como símbolo dessa união, a cidade de Rios Cruzados foi fundada. Em meio ao mar, uma rixa milenar foi estabelecida quando tripulação minotaurica atracou pela primeira vez no litoral narzepiano. Recepcionados por zaokans, o relacionamento dos minotauros com os nativos iniciou tranquilo e produtivo, mas logo se transformou em um pesadelo. Os minotauros escravizados, temendo por suas vidas, foram obrigados a ensinar a arte naval e explicar como haviam atravessado as brumas do continente para seus captores.\nApesar de todos os acordos e tratados terem criado a fama de que o povo minotáurico é leal e justo, a realidade se mostra outra. Sua nação não é uma unidade absoluta. São extremamente territoriais, protagonizando diversas batalhas, tanto em Aenólia quanto em outros continentes. Além disso, assim como seus rivais zaokans, estabeleceram postos avançados sob o pretexto de manutenção das estradas que criaram, ocupando diversos portos pelo mundo.\nOs minotauros sempre foram e sempre serão - livres, conquistando seu lugar no mundo, exercendo a paixão de seu povo: navegar pelo mundo, desimpedidos, tendo como guia as Luas e as estrelas, enquanto aguardam os bardos cantarem seus nomes.",
      "nomes_comuns_origem": [
        "Ayse",
        "Azlain",
        "Bahar",
        "Hadan",
        "Rinoa",
        "Taborr"
      ],
      "abilities": [
        "hl00250000000000",
        "hl00260000000000",
        "hl00270000000000"
      ],
      "origin": "Dahaki sempre admirou o céu. Inalcançável, sublime, distante... como se o chamasse, revelando caminhos para algo maior. Apaixonado pelas Três Guardiãs, as Luas, obteve delas sua inspiração para criar aquele que nasceria com a impetuosidade de romper qualquer limite. Em honra às suas musas celestiais, concedeu ao seu Primogênito, Nogaldan, três bênçãos sagradas: de Xaec, a Dama Sábia, a sabedoria que revela os caminhos; de Yeyt, a Dama Gentil, a coragem para escolher o caminho; e de Zoth, a Dama Guerreira, a bravura necessária para enfrentar as consequências de suas escolhas.\nNogaldan era afetado por visões nebulosas de um mundo que não conhecia eventos contraditórios ou realidades distantes, como sussurros. Contudo, uma dessas visões o perturbou mais que todas as outras: deuses e Primordiais tramavam uma guerra, que culminaria na queda de Arba'shatrah. Desesperado, alertou a todos que podia sobre o eminente fim. Alguns acreditaram, muitos não, fomentando uma revolta que ainda não existia, fazendo-os se questionarem sobre o mundo. O que começou como um boato logo ganhou forma, dando início à guerra pela liberdade.\nQuando Nogaldan percebeu o que fez, clamou pelo perdão de seu criador, que, em lágrimas, abraçou seu Primogênito. Dahaki então percebeu que ninguém é verdadeiramente livre, todos estão presos a algo. Mesmo sabendo o caminho que Nogaldan poderia trilhar, quis descobrir o que uma criação dos deuses faria se possuísse verdadeira liberdade, sem amarras ou guias. Perdido, o Primogênito ofereceu a sua existência, como sacrifício para servir de exemplo, buscando acabar com os conflitos. Com pesar no coração, Dahaki aceitou. Após um discurso acalorado, quando a divindade destruiria seu amado filho, a luz das Três Guardiãs interveio. Envolvendo Nogaldan em seu brilho prateado, puxaram-no para o céu, estilhaçando seu corpo em milhões de pequenas luzes, que preencheriam o céu ao seu lado, criando as estrelas. A partir da luz dessas estrelas, um novo Legado foi criado, os filhos das Luas e de Dahaki, aqueles que herdariam as três bênçãos confiadas a Nogaldan: os minotauros. Durante a guerra em Arba'shatrah, os jovens minotauros se recusaram a participar de tamanha discórdia, buscando refúgio no sul, seguindo os rastros de uma estrela brilhante, Daharidar.",
      "traditions": "Os líderes das tribos minotáuricas são escolhidos através de eleições populares com votos declarados, que ocorrem a cada 10 anos, na crença de que aquele mais preparado deve governar. Os líderes eleitos devem decidir entre si o novo líder da capital, Dromodan, e, consequentemente, da nação minotaurica. Quando escolhido, o novo líder da nação define um novo líder para sua tribo original.\nApós o nascimento de um minotauro, a criança deverá ser apresentada ao céu noturno, as estrelas e as Luas. De acordo com a lua mais brilhante naquela noite, é amarrada uma fita no tornozelo do recém-nascido, com a cor de uma das Luas: verde para Xaec, azul para Yeyt e vermelho para Zoth. Os Minotauros costumas usá-las por toda a sua vida, renovando-as quando necessário. É possível que mais de uma lua abençoe um minotauro e, caso as três Luas brilhem intensamente, é esperado um futuro grandioso, assim como o da maioria dos grandes nomes que marcaram a história minotaurica. Nos raríssimos casos em que as Luas não estejam no céu, entende-se que o nascimento é sinal de mau agouro, e a criança costuma ser evitada ou, até mesmo, sacrificada. Quando morrem, seus corpos são cremados e oferecidos para sua lua-guia, para que suas almas se transformem em fumaça e subam ao céu, repousando ao lado das estrelas e das Luas no eterno silêncio.\nOrgulhosos de seus chifres, possuem o costume de adorná-los e entalhá-los, com representações de sua tribo, da lua que lhes guia, de suas inspirações, sua ocupação ou quaisquer coisas que possuam algum sentido profundo para o minotauro. Após entalhar os chifres, costumam preencher os vincos com uma mistura especial, que consiste em pó de conchas trituradas, seiva de árvore e extratos de ervas, para dar o pigmento de sua lua patrona, criando uma tinta especial, semelhante a tinta usada pelo povo netunes. Por mais que o povo de Dahaki possua muitos avanços tecnológicos, ainda mais devido ao seu contato com os elfos, dão muito valor às suas tradições, criando um contraste entre os majestosos galeões, um complexo observatório e arquitetura requintada, ao mesmo tempo que utilizam seus adornos tribais e vestes simples, mas funcionais. Isso se traduz mais precisamente no artesanato, possuindo bordados reconhecidos mundialmente, lhes garantindo uma participação na moda élfica.",
      "inWorld": "O povo minotáurico possui exploradores natos, não sendo coincidência terem sido os primeiros a navegar pelos mares de Auroria. Também se destacam pelos diversos meios de transporte terrestre e pela construção das estradas nos quais são utilizados, assim como sua parceria com os humanos na criação das Rotas Imperiais. Em sua expansão, firmaram parcerias com os elfos, netunes e alraunes, possibilitando a cooperação entre as nações de Aenólia e fomentando o comércio. Como símbolo dessa união, a cidade de Rios Cruzados foi fundada. Em meio ao mar, uma rixa milenar foi estabelecida quando tripulação minotaurica atracou pela primeira vez no litoral narzepiano. Recepcionados por zaokans, o relacionamento dos minotauros com os nativos iniciou tranquilo e produtivo, mas logo se transformou em um pesadelo. Os minotauros escravizados, temendo por suas vidas, foram obrigados a ensinar a arte naval e explicar como haviam atravessado as brumas do continente para seus captores.\nApesar de todos os acordos e tratados terem criado a fama de que o povo minotáurico é leal e justo, a realidade se mostra outra. Sua nação não é uma unidade absoluta. São extremamente territoriais, protagonizando diversas batalhas, tanto em Aenólia quanto em outros continentes. Além disso, assim como seus rivais zaokans, estabeleceram postos avançados sob o pretexto de manutenção das estradas que criaram, ocupando diversos portos pelo mundo.\nOs minotauros sempre foram e sempre serão - livres, conquistando seu lugar no mundo, exercendo a paixão de seu povo: navegar pelo mundo, desimpedidos, tendo como guia as Luas e as estrelas, enquanto aguardam os bardos cantarem seus nomes."
    }
  },
  {
    "_id": "lg000e0000000000",
    "name": "Netune",
    "type": "legacy",
    "img": "icons/environment/settlement/ship-sailing.svg",
    "legadoKey": "netune",
    "folder": "fldlg00010000000",
    "_key": "!items!lg000e0000000000",
    "system": {
      "name": "Netune",
      "height": "Entre 1,60 e 2 metros de altura.",
      "lifeExpectancy": "Netunes podem viver por 170 anos e são considerados aptos para desbravar o mundo aos 16 anos.",
      "appearance": "Seus corpos possuem inúmeras finas e pequenas escamas, que se assemelham à pele humana, possuindo cores vibrantes, cobrindo todas as cores do arco-íris. Possuem guelras localizadas nos seus pescoços, permitindo-os respirar na água, e narizes para a terra firme. Alguns ainda podem apresentar pequenas barbatanas nas suas panturrilhas ou antebraços. Caso entrem na água, adaptam suas pernas para formar uma longa e elegante cauda, que herda o padrão de suas escamas.",
      "description": "A dádiva dos mares lhes atribui força e flexibilidade, que contrastam com a sua exuberância. Às vezes são vistos como bárbaros ou primitivos, o que não é, nem de longe, uma verdade. Sua nação é fundamentada na coragem, um povo que não se permite fraquejar, assim como Kalash'ligotann, o Primogênito netune, o caçador perfeito, que eternamente protege os oceanos.\nNetunes possuem um forte apego à sua linhagem de caçadores, portanto estão sempre aprimorando suas habilidades, tanto em terra firme como nos vastos oceanos. Competitivos e orgulhosos, buscam na superação de si mesmos suas conquistas, sendo causa de orgulho ao seu povo o fato de nunca terem se curvado para outros povos. Costumam se desafiar em jogos, seja de caça, conhecimentos ou provações de poder, prática considerada necessária para moldar a fibra moral de seus semelhantes.",
      "legacyAbilities": [
        {
          "name": "Adaptação dos Oceanos",
          "description": "Você respira e enxerga normalmente dentro e fora d'água, além de não receber as penalidades aplicadas por Combate Aquático. Em terra, você adapta o seu corpo, transformando a sua cauda em um par de pernas humanoides.",
          "actions": []
        },
        {
          "name": "Conexão Psíquica",
          "description": "Sem custo de Ação, você consegue se comunicar mentalmente com um Alvo dentro de 6 metros. Esse efeito permanece ativo por 1 minuto, ou até que você se comunique mentalmente com outro Alvo com esse efeito.",
          "actions": [
            {
              "id": "act_conexao_psiquica",
              "name": "Conexão Psíquica",
              "description": "Comunicação mental telepática com um alvo a até 6 metros durante 1 minuto.",
              "cost": "",
              "type": {
                "actionType": "acaoRapida",
                "category": "suporte",
                "tags": [
                  "telepatia"
                ]
              },
              "attack": {
                "hasAttack": false
              },
              "damage": {
                "hasDamage": false
              },
              "healing": {
                "hasHealing": false
              },
              "condition": {
                "hasCondition": false
              },
              "check": {
                "hasCheck": false
              },
              "areaOfEffect": {
                "hasArea": false
              }
            }
          ]
        },
        {
          "name": "Recompensa da Caçada",
          "description": "Enquanto estiver em combate, ao final de um turno que você tenha causado qualquer tipo de dano nos Pontos de Vida de um Alvo ou tenha utilizado Pontos de Energia, você poderá realizar um Teste de Destino, Dif. 10. Caso tenha sucesso, você regenerará 1 Ponto de Energia.",
          "actions": [
            {
              "id": "act_recompensa_cacada",
              "name": "Recompensa da Caçada",
              "description": "No final do seu turno após causar dano em PV ou gastar PE: Teste de Destino Dif. 10 para recuperar 1 PE.",
              "cost": "",
              "type": {
                "actionType": "reacao",
                "category": "suporte",
                "tags": [
                  "energia",
                  "destino"
                ]
              },
              "attack": {
                "hasAttack": false
              },
              "damage": {
                "hasDamage": false
              },
              "healing": {
                "hasHealing": true,
                "formula": "1",
                "type": "pe"
              },
              "condition": {
                "hasCondition": false
              },
              "check": {
                "hasCheck": true,
                "category": "destiny",
                "attribute": "destiny",
                "difficulty": 10,
                "onSuccess": "Regenera 1 Ponto de Energia",
                "onFailure": "Não recupera PE"
              },
              "areaOfEffect": {
                "hasArea": false
              }
            }
          ]
        }
      ],
      "continente": "Aenólia",
      "altura": "Entre 1,60 e 2 metros de altura.",
      "expectativa_de_vida": "Netunes podem viver por 170 anos e são considerados aptos para desbravar o mundo aos 16 anos.",
      "aparencia": "Seus corpos possuem inúmeras finas e pequenas escamas, que se assemelham à pele humana, possuindo cores vibrantes, cobrindo todas as cores do arco-íris. Possuem guelras localizadas nos seus pescoços, permitindo-os respirar na água, e narizes para a terra firme. Alguns ainda podem apresentar pequenas barbatanas nas suas panturrilhas ou antebraços. Caso entrem na água, adaptam suas pernas para formar uma longa e elegante cauda, que herda o padrão de suas escamas.",
      "descricao": "A dádiva dos mares lhes atribui força e flexibilidade, que contrastam com a sua exuberância. Às vezes são vistos como bárbaros ou primitivos, o que não é, nem de longe, uma verdade. Sua nação é fundamentada na coragem, um povo que não se permite fraquejar, assim como Kalash'ligotann, o Primogênito netune, o caçador perfeito, que eternamente protege os oceanos.\nNetunes possuem um forte apego à sua linhagem de caçadores, portanto estão sempre aprimorando suas habilidades, tanto em terra firme como nos vastos oceanos. Competitivos e orgulhosos, buscam na superação de si mesmos suas conquistas, sendo causa de orgulho ao seu povo o fato de nunca terem se curvado para outros povos. Costumam se desafiar em jogos, seja de caça, conhecimentos ou provações de poder, prática considerada necessária para moldar a fibra moral de seus semelhantes.",
      "origem": "Nem todos aceitavam transgressões ou se conformavam com afrontas constantes. Para Koyona, fraqueza era a desculpa dos covardes. Deparando-se com os conflitos de suas irmãs, aconselhou Anatael, a líder do panteão divino, a assumir uma postura firme diante das insubordinações de Kýria, dizendo que sua compaixão um dia traria a ruína de tudo, mas Anatael não deu ouvidos. Tomada pela fúria, decidiu ela mesma tomar as devidas medidas para manter a ordem em Arba'shatrah, criando uma criatura com a capacidade de adaptar-se a qualquer situação: sua boca possuía inúmeras fileiras de dentes, um corpo escamoso inabalável e tentáculos poderosos, com uma aparência tão apavorante que remetia aos piores pesadelos, dando forma a Kalash'ligotann, seu Primogênito.\nA fúria do Primogênito de Koyona era tanta que arrancava pedaços de sua própria carne, fazendo seu sangue escorrer pelas avenidas da grande cidade, acumulando-se fora dos limites de Arba'shatrah e dando origem a um mar de sangue. Desses pedaços de carne, Koyona deu forma aos netunes, seres extremamente belos, que herdaram tão pouquíssimos traços de seu Primogênito. Quando Anatael enfim aceitou os fatos, a guerra já havia começado, e as primeiras espadas empunhadas foram as dos netunes, que se lançaram à guerra. Em resposta, as criações de Gruneak tomaram a frente das forças rebeldes, inaugurando conflito.\nFindada a guerra, os netunes tomaram como destino o Sul, dirigindo-se à atual Aenólia. Em sua nova casa, cercados pelo sangue de seu Primogênito, logo notaram que nenhuma vida poderia existir naquele líquido espesso. A Água Primordial, Aelba'ag, ofereceu seu auxílio para purificar os mares, transformando o sangue em uma água salgada como o suor, permitindo o nascimento da vida marítima.",
      "tradicoes": "Os reis e rainhas Netunes são conhecidos como Ligotann'ue, perpetuando sua linhagem através do sangue, pois é dito que se originou do próprio Kalash'ligotann, o Primogênito netune. A família real reside em Nettum, mas decide a maioria dos assuntos de sua nação. Cada líder de vilarejo responde diretamente ao monarca.\nA história do mundo esqueceu Kalash'ligotann, mas os netunes não. Tido como um caçador implacável, seu nome poderia ser traduzido como Primeiro Caçador. A adoração a essa figura deu origem a um grupo de caçadores de elite respeitado ou temido por toda Auroria. Conhecidos como Kalash, ou apenas 'caçadores', esse grupo possui privilégios especiais dentro da sociedade netune, entre eles, total liberdade para agir e praticar seus rituais. Um dos seus costumes é o Yanangoo, o ritual utilizado para selecionar novos membros. Os candidatos devem caçar alguma criatura temível e, ao abatê-la, destrinchá-la em alto mar, oferecendo o sangue da criatura a Kalash'ligotann. Quanto maior a força da criatura, maior o prestígio do novo Kalash.\nA pintura corporal possui um profundo significado para esse povo. Os padrões de suas pinturas foram criados pelos anciões devotos de Koyona, os Bakwará, que significa 'sábio'. A partir das imagens formadas pelo movimento das ondas e pelo sangue seco deixados no solo, os Bakwará entendem os padrões como presságios do Destino, e desde então essas pinturas servem para reforçar um presságio positivo, ou para protegê-los de algum infortúnio. A tinta utilizada é confeccionada a partir de conchas trituradas, seiva de árvore e ervas, que dão o pigmento, utilizando o Véu para fixá-las, tornando-as semipermanentes, inodoras e resistentes à água. Cada pintura é específica e imbuída com significado, seja guerra, grandes caçadas, hierarquia, exílio, vocação, etc.\nO povo netune não é feito apenas de força marcial. Possui também seu lado delicado e belo, expresso principalmente pela dança e canto. Durante suas festividades, formam-se rodas de dança, tendo seu centro reservado para qualquer um que queira se expressar, estabelecendo um diálogo cantado entre a roda e o centro. Existem diversos tipos de rodas de dança, cada uma com músicas, ritmos e danças apropriadas, sendo os mais comuns: exaltar as realizações do sepultado em funerais, preparação para batalhas ou grandes caçadas, eventos diplomáticos e ano novo. Durante esses eventos, com exceção de funerais e eventos diplomáticos, não é incomum algum netune assumir o centro para declarar seu amor ou desafiar alguém para alguma competição. O intimado deve se unir ao centro e responder à provocação.",
      "no_mundo": "O isolamento inicial netúneo teve origem na sua raiva e preconceito, nascido em Arba'shatrah. Com o tempo, perceberam que as mágoas antigas da guerra nunca foram suas, portanto, gradualmente abriram espaço para interações com outros povos, mesmo que timidamente, encontrando nos minotauros uma conexão especial devido ao profundo respeito às suas origens e pelo mar. Os minotauros aprenderam a produzir a tinta especial dos Bakwarás. Por sua vez, os netunes aprenderam a apreciar as estrelas e as Luas, parceria anualmente comemorada nas praias da Cauda de Nettumbai, apreciando o espetáculo natural dos corais estrelados. Sua relação com elfos e alraunes são respeitosas, mas mornas: a pompa élfica não combina tanto com eles e a reclusão alraúnea não abre muitas brechas para interação.\nAlgumas rixas foram criadas com estrangeiros considerados invasores, pois sua desconfiança natural, às vezes, leva-os a agirem antes de pensar. Por isso, são vistos como figuras estranhas, uma 'beleza selvagem' por assim dizer, de comportamento taciturno, mas que se transforma totalmente ao lado de seus amigos. Acostumados a caçar em bandos, não é comum encontrar um netune solitário. Quando os netunes criam laços com alguém, provavelmente oferecerão um forte aperto de mãos, um abraço, um beijo em cada bochecha e uma bebida para o novo companheiro de bando.\nAlguns preferem o sossego de Nettum, onde podem entoar seus cantos e permanecer perto de suas famílias e amigos, mas nada os impede de se lançarem no mundo em busca de aventuras ou novas presas. Aqueles que partem em jornada preferem trabalhar como mercenários, marinheiros, exploradores ou algo que possa remeter suas origens e, devido a isso, dificilmente são vistos em Drakar ou Krabesh.",
      "nomes_comuns_origem": [
        "Angiê",
        "Aruana",
        "Iandar",
        "Kenai",
        "Yandra",
        "Yakekan"
      ],
      "abilities": [
        "hl00280000000000",
        "hl00290000000000",
        "hl002a0000000000"
      ],
      "origin": "Nem todos aceitavam transgressões ou se conformavam com afrontas constantes. Para Koyona, fraqueza era a desculpa dos covardes. Deparando-se com os conflitos de suas irmãs, aconselhou Anatael, a líder do panteão divino, a assumir uma postura firme diante das insubordinações de Kýria, dizendo que sua compaixão um dia traria a ruína de tudo, mas Anatael não deu ouvidos. Tomada pela fúria, decidiu ela mesma tomar as devidas medidas para manter a ordem em Arba'shatrah, criando uma criatura com a capacidade de adaptar-se a qualquer situação: sua boca possuía inúmeras fileiras de dentes, um corpo escamoso inabalável e tentáculos poderosos, com uma aparência tão apavorante que remetia aos piores pesadelos, dando forma a Kalash'ligotann, seu Primogênito.\nA fúria do Primogênito de Koyona era tanta que arrancava pedaços de sua própria carne, fazendo seu sangue escorrer pelas avenidas da grande cidade, acumulando-se fora dos limites de Arba'shatrah e dando origem a um mar de sangue. Desses pedaços de carne, Koyona deu forma aos netunes, seres extremamente belos, que herdaram tão pouquíssimos traços de seu Primogênito. Quando Anatael enfim aceitou os fatos, a guerra já havia começado, e as primeiras espadas empunhadas foram as dos netunes, que se lançaram à guerra. Em resposta, as criações de Gruneak tomaram a frente das forças rebeldes, inaugurando conflito.\nFindada a guerra, os netunes tomaram como destino o Sul, dirigindo-se à atual Aenólia. Em sua nova casa, cercados pelo sangue de seu Primogênito, logo notaram que nenhuma vida poderia existir naquele líquido espesso. A Água Primordial, Aelba'ag, ofereceu seu auxílio para purificar os mares, transformando o sangue em uma água salgada como o suor, permitindo o nascimento da vida marítima.",
      "traditions": "Os reis e rainhas Netunes são conhecidos como Ligotann'ue, perpetuando sua linhagem através do sangue, pois é dito que se originou do próprio Kalash'ligotann, o Primogênito netune. A família real reside em Nettum, mas decide a maioria dos assuntos de sua nação. Cada líder de vilarejo responde diretamente ao monarca.\nA história do mundo esqueceu Kalash'ligotann, mas os netunes não. Tido como um caçador implacável, seu nome poderia ser traduzido como Primeiro Caçador. A adoração a essa figura deu origem a um grupo de caçadores de elite respeitado ou temido por toda Auroria. Conhecidos como Kalash, ou apenas 'caçadores', esse grupo possui privilégios especiais dentro da sociedade netune, entre eles, total liberdade para agir e praticar seus rituais. Um dos seus costumes é o Yanangoo, o ritual utilizado para selecionar novos membros. Os candidatos devem caçar alguma criatura temível e, ao abatê-la, destrinchá-la em alto mar, oferecendo o sangue da criatura a Kalash'ligotann. Quanto maior a força da criatura, maior o prestígio do novo Kalash.\nA pintura corporal possui um profundo significado para esse povo. Os padrões de suas pinturas foram criados pelos anciões devotos de Koyona, os Bakwará, que significa 'sábio'. A partir das imagens formadas pelo movimento das ondas e pelo sangue seco deixados no solo, os Bakwará entendem os padrões como presságios do Destino, e desde então essas pinturas servem para reforçar um presságio positivo, ou para protegê-los de algum infortúnio. A tinta utilizada é confeccionada a partir de conchas trituradas, seiva de árvore e ervas, que dão o pigmento, utilizando o Véu para fixá-las, tornando-as semipermanentes, inodoras e resistentes à água. Cada pintura é específica e imbuída com significado, seja guerra, grandes caçadas, hierarquia, exílio, vocação, etc.\nO povo netune não é feito apenas de força marcial. Possui também seu lado delicado e belo, expresso principalmente pela dança e canto. Durante suas festividades, formam-se rodas de dança, tendo seu centro reservado para qualquer um que queira se expressar, estabelecendo um diálogo cantado entre a roda e o centro. Existem diversos tipos de rodas de dança, cada uma com músicas, ritmos e danças apropriadas, sendo os mais comuns: exaltar as realizações do sepultado em funerais, preparação para batalhas ou grandes caçadas, eventos diplomáticos e ano novo. Durante esses eventos, com exceção de funerais e eventos diplomáticos, não é incomum algum netune assumir o centro para declarar seu amor ou desafiar alguém para alguma competição. O intimado deve se unir ao centro e responder à provocação.",
      "inWorld": "O isolamento inicial netúneo teve origem na sua raiva e preconceito, nascido em Arba'shatrah. Com o tempo, perceberam que as mágoas antigas da guerra nunca foram suas, portanto, gradualmente abriram espaço para interações com outros povos, mesmo que timidamente, encontrando nos minotauros uma conexão especial devido ao profundo respeito às suas origens e pelo mar. Os minotauros aprenderam a produzir a tinta especial dos Bakwarás. Por sua vez, os netunes aprenderam a apreciar as estrelas e as Luas, parceria anualmente comemorada nas praias da Cauda de Nettumbai, apreciando o espetáculo natural dos corais estrelados. Sua relação com elfos e alraunes são respeitosas, mas mornas: a pompa élfica não combina tanto com eles e a reclusão alraúnea não abre muitas brechas para interação.\nAlgumas rixas foram criadas com estrangeiros considerados invasores, pois sua desconfiança natural, às vezes, leva-os a agirem antes de pensar. Por isso, são vistos como figuras estranhas, uma 'beleza selvagem' por assim dizer, de comportamento taciturno, mas que se transforma totalmente ao lado de seus amigos. Acostumados a caçar em bandos, não é comum encontrar um netune solitário. Quando os netunes criam laços com alguém, provavelmente oferecerão um forte aperto de mãos, um abraço, um beijo em cada bochecha e uma bebida para o novo companheiro de bando.\nAlguns preferem o sossego de Nettum, onde podem entoar seus cantos e permanecer perto de suas famílias e amigos, mas nada os impede de se lançarem no mundo em busca de aventuras ou novas presas. Aqueles que partem em jornada preferem trabalhar como mercenários, marinheiros, exploradores ou algo que possa remeter suas origens e, devido a isso, dificilmente são vistos em Drakar ou Krabesh."
    }
  },
  {
    "_id": "lg000f0000000000",
    "name": "Orkrash",
    "type": "legacy",
    "img": "icons/skills/melee/unarmed-punch-fist.svg",
    "legadoKey": "orkrash",
    "folder": "fldlg00040000000",
    "_key": "!items!lg000f0000000000",
    "system": {
      "name": "Orkrash",
      "height": "Entre 1,80m e 2,20 metros de altura.",
      "lifeExpectancy": "Orkrashs podendo viver até os 180 anos, sendo considerados adultos aos 15 anos.",
      "appearance": "Seus corpos são grandes e densos, sua pele possui tons terrosos, podendo ser amarelada, avermelhada, amarronzada ou acinzentada, com caninos inferiores protuberantes e ossos largos. Possuem írises de cor avermelhada, dourada ou alaranjada, como as brasas da fúria dos antigos. Seus cabelos podem ser brancos, castanhos, ruivos ou pretos. Aqueles ligados às suas origens manifestam características físicas únicas, referentes aos Primogênitos orkrashs.",
      "description": "Grandes e destemidos, os orkrashs vivem em tribos dispersas pelo Deserto de Ak'dala, onde podem praticar seus ritos sem a interferência daqueles que esqueceram o seu próprio passado. O poder das palavras perpetua os saberes antigos, cada fragmento de vida faz parte de algo maior, de modo que tudo tenha seu lugar, como parte de um todo. O tom pesado de suas vozes reverbera como o uivo de uma besta voraz, clamando pela força, sagacidade, sabedoria, espiritualidade e resiliência de seus Primogênitos, protegendo tudo aquilo que amam sem hesitar. Buscam manter vivas suas tradições ao evocar a fúria abrasante de seus ancestrais, louvando todos aqueles que se foram e guiando aqueles que virão.",
      "legacyAbilities": [
        {
          "name": "Agraciado pelos Rituais",
          "description": "Ao iniciar um Repouso Completo, você poderá realizar um pequeno ritual, que fará com que você, e todos os seus Alvos Aliados dentro de 20 metros, recebam os efeitos desse Repouso Completo em 4 horas, ao invés de 6 horas.",
          "actions": []
        },
        {
          "name": "Marca Ritualística",
          "description": "Com uma Ação Simples, você poderá marcar um local em uma superfície dentro de 1 metro. Caso um Alvo se aproxime de 10 metros desse local, você sentirá uma perturbação mística, sabendo que algo se aproximou do local. Esse efeito permanece ativo por 4 horas. Somente um local poderá ser marcado por vez.",
          "actions": [
            {
              "id": "act_marca_ritualistica",
              "name": "Marca Ritualística",
              "description": "Inscreve uma marca de alarme por 4 horas. Alerta quando qualquer criatura se aproximar a até 10 metros.",
              "cost": "",
              "type": {
                "actionType": "acaoSimples",
                "category": "utilidade",
                "tags": [
                  "alarme",
                  "ritual"
                ]
              },
              "attack": {
                "hasAttack": false
              },
              "damage": {
                "hasDamage": false
              },
              "healing": {
                "hasHealing": false
              },
              "condition": {
                "hasCondition": false
              },
              "check": {
                "hasCheck": false
              },
              "areaOfEffect": {
                "hasArea": true,
                "shape": "circle",
                "size": 10,
                "unit": "m"
              }
            }
          ]
        },
        {
          "name": "Fúria dos Antigos",
          "description": "Enquanto estiver em combate, ao chegar na metade, ou menos, do seu total máximo de Pontos de Vida, você poderá receber 1 ponto em todos os seus Parâmetros até o final desse combate. Esse ponto adicional pode ultrapassar o valor máximo de um Parâmetro. Esse efeito só poderá ser realizado novamente após concluir um Repouso Completo.",
          "actions": [
            {
              "id": "act_furia_antigos",
              "name": "Fúria dos Antigos",
              "description": "Ao ficar com metade ou menos do PV máximo em combate: recebe +1 em todos os Parâmetros até o fim do combate (1x por Repouso Completo).",
              "cost": "",
              "type": {
                "actionType": "reacao",
                "category": "suporte",
                "tags": [
                  "buff",
                  "combate"
                ]
              },
              "attack": {
                "hasAttack": false
              },
              "damage": {
                "hasDamage": false
              },
              "healing": {
                "hasHealing": false
              },
              "condition": {
                "hasCondition": false
              },
              "check": {
                "hasCheck": false
              },
              "areaOfEffect": {
                "hasArea": false
              }
            }
          ]
        }
      ],
      "continente": "Krabesh",
      "altura": "Entre 1,80m e 2,20 metros de altura.",
      "expectativa_de_vida": "Orkrashs podendo viver até os 180 anos, sendo considerados adultos aos 15 anos.",
      "aparencia": "Seus corpos são grandes e densos, sua pele possui tons terrosos, podendo ser amarelada, avermelhada, amarronzada ou acinzentada, com caninos inferiores protuberantes e ossos largos. Possuem írises de cor avermelhada, dourada ou alaranjada, como as brasas da fúria dos antigos. Seus cabelos podem ser brancos, castanhos, ruivos ou pretos. Aqueles ligados às suas origens manifestam características físicas únicas, referentes aos Primogênitos orkrashs.",
      "descricao": "Grandes e destemidos, os orkrashs vivem em tribos dispersas pelo Deserto de Ak'dala, onde podem praticar seus ritos sem a interferência daqueles que esqueceram o seu próprio passado. O poder das palavras perpetua os saberes antigos, cada fragmento de vida faz parte de algo maior, de modo que tudo tenha seu lugar, como parte de um todo. O tom pesado de suas vozes reverbera como o uivo de uma besta voraz, clamando pela força, sagacidade, sabedoria, espiritualidade e resiliência de seus Primogênitos, protegendo tudo aquilo que amam sem hesitar. Buscam manter vivas suas tradições ao evocar a fúria abrasante de seus ancestrais, louvando todos aqueles que se foram e guiando aqueles que virão.",
      "origem": "A descoberta da existência de forças que regulam o universo, os Aspectos, aterrorizou o deus Rakhantorr. Prevendo a catástrofe que acometeria Auroria, Rakhantorr orquestrou planos que preparariam os povos para a chegada eminente dos Aspectos, abraçando o inevitável e disposto a fazer os sacrifícios necessários. Baseando-se na manipulação do Véu de Kýria, que distorcia o mundo através da vontade, Rakhantorr criou a Palavra do Mundo, uma forma específica de afetar os seres através da intenção e das palavras. A partir disso e de sua compreensão dos Aspectos, Rakhantorr criou seus Primogênitos: Szatragash, a Sagacidade da Dúvida; Enaya, a Sabedoria do Tempo; Gaurak, o Poder do Destino; Phelavox, a Espiritualidade do Desejo e Atraxalan, a Resiliência do Ciclo. O primeiro passo do plano de Rakhantorr foi revelar a existência de Athranamad, acelerando o inevitável. Começada a guerra, cada filho de Rakhantorr escolheu seu lado: Phelavox auxiliou os vennélis, Gaurak e Szatragash uniram forças com os kahats'zas, enquanto Enaya, tendo Atraxalan ao seu lado, não tomou lados, pois havia sido condenada pelo seu criador a observar a história ser escrita através do sacrifício de seus irmãos. Com o fim da guerra, o Rei Solasta acolheu os Primogênitos de Rakhantorr sobreviventes, Enaya e Atraxalan, oferendo estadia em Ya'ará. O Tempo transformou a amizade de Atraxalan e Enaya em amor, estabelecendo sua linhagem no mundo. Já em idade avançada, no mirante mais belo, rodeados pelos seus inúmeros descendentes, Atraxalan e Enaya evocavam pela última vez a Palavra do Mundo, abençoando seus filhos, e os filhos de seus filhos, com as últimas intenções e virtudes dos Primogênitos de Rakhantorr. Kzara, umas das filhas dos Primogênitos, realizou então o Primeiro Ritual, unindo as almas dos Primogênitos como uma só, devolvendo-os para seu criador e, pela primeira vez, proferido com orgulho e gratidão, Kzara nomeou seu povo orkrash.",
      "tradicoes": "Para os orkrashs, as palavras possuem poder. Durante a gestação, os familiares e amigos falam palavras positivas para a gestante e seu filho, evocando as intenções de seus Primogênitos. Devido a isso, os recém-nascidos podem apresentar a marca de um dos Primogênitos: a sagacidade de Szatragash transformas as pupilas em fendas; a força de Gaurak causa cicatrizes nos ombros e braços; a espiritualidade de Phelavox deposita uma pequena joia na testa; a resiliência de Atraxalan torna seus caninos inferiores mais protuberantes e a sabedoria de Enaya empalidece as írises. Aqueles que não possuem marcas são chamados de Kurvash, sendo marginalizados ou até mesmo abandonados. Contudo, ainda é possível que sejam marcados em algum momento de suas vidas, caso se conectem aos Primogênitos e realizem feitos que os agradem. O povo orkrash possui uma sociedade simples e tribal, geralmente guiada pelos ideais de Enaya. Cada uma das tribos é independente, com suas próprias particularidades e compreensões acerca de seus Primogênitos. Por exemplo, tribos mais bélicas seguem os ideais de Gaurak, enquanto as mais pacíficas, adotam os ideais de Phelavox. O que era apenas um encontro entre as tribos a Garaudan Morgorr, ou Celebração dos Escolhidos no idioma comum - ganhou enormes proporções desde a criação do Grande Chamado, pois, além de servir como uma oportunidade para as tribos trocarem informações, resolver conflitos e exaltar os ancestrais, o Garaudan Morgorr também passou a servir para eleger o representante do povo orkrash. Essa escolha é feita através de uma série de provações anunciadas pelos anciões, referentes a cada um dos Primogênitos orkrash. Após definido um representante, o escolhido recebe a marca dos Primogênitos, legitimando-o como um líder capaz. Por mais que saibam falar, escrever e ler alguns idiomas do mundo, cultivam a tradição oral para perpetuar sua cultura, costumes, histórias e mitos, pois acreditam que a experiência de ouvir, viver, reproduzir, criar, presenciar ou relembrar torna mais potente tudo aquilo que está sendo feito, pois tudo que é esquecido não merece ser lembrado.",
      "no_mundo": "Os orkrash nutrem bons laços de amizade e respeito com os povos da capital Jazaar. A tribo Mor'gatal, por exemplo, são considerados os mercenários ideais. Sempre honram seus acordos e possuem uma alta taxa de sucesso, tornando-os essenciais para a manutenção da ordem em Jazaar. Por outro lado, mesmo com culturas tão antagônicas, orkrashs e draenuns criaram laços: historicamente, os orkrashs protegem a superfície de invasores e caçadores de relíquias, enquanto draenuns protegem o subterrâneo do desconhecido. Mesmo que a ameaça subterrânea tenha se calado, a relação entre os dois povos permanece. Fora de Krabesh, possuem tribos espalhadas em todos os continentes, pelos mais diversos motivos, mas, sempre que possível, estarão presentes no Garaudan Morgorr. Alguns os veem como bestas primitivas, devido ao seu estilo de vida mais simples, longe de tecnologias complexas, enquanto outros os enxergam como brutos, uma impressão criada devido ao seu comportamento rudimentar e sem floreios. Essa fama gerou uma aproximação entre orkrashs e valdraks, pois ambos os povos respeitam a força e a integridade. Com os novos tempos, novas crenças surgiram, e alguns abandonaram o caminho dos rituais, crescendo cada vez mais o número de Kurvashs. Contudo, ainda escutam, lá no fundo, a Palavra do Mundo, onde quer que estejam, pois os orkrashs sempre possuirão aqueles que os resguardam, e a história não pode ser apagada, apenas esquecida.",
      "nomes_comuns_origem": [
        "Dakk",
        "Garakh",
        "Gonk",
        "Orgha",
        "Orok",
        "Shakd"
      ],
      "abilities": [
        "hl002b0000000000",
        "hl002c0000000000",
        "hl002d0000000000"
      ],
      "origin": "A descoberta da existência de forças que regulam o universo, os Aspectos, aterrorizou o deus Rakhantorr. Prevendo a catástrofe que acometeria Auroria, Rakhantorr orquestrou planos que preparariam os povos para a chegada eminente dos Aspectos, abraçando o inevitável e disposto a fazer os sacrifícios necessários. Baseando-se na manipulação do Véu de Kýria, que distorcia o mundo através da vontade, Rakhantorr criou a Palavra do Mundo, uma forma específica de afetar os seres através da intenção e das palavras. A partir disso e de sua compreensão dos Aspectos, Rakhantorr criou seus Primogênitos: Szatragash, a Sagacidade da Dúvida; Enaya, a Sabedoria do Tempo; Gaurak, o Poder do Destino; Phelavox, a Espiritualidade do Desejo e Atraxalan, a Resiliência do Ciclo. O primeiro passo do plano de Rakhantorr foi revelar a existência de Athranamad, acelerando o inevitável. Começada a guerra, cada filho de Rakhantorr escolheu seu lado: Phelavox auxiliou os vennélis, Gaurak e Szatragash uniram forças com os kahats'zas, enquanto Enaya, tendo Atraxalan ao seu lado, não tomou lados, pois havia sido condenada pelo seu criador a observar a história ser escrita através do sacrifício de seus irmãos. Com o fim da guerra, o Rei Solasta acolheu os Primogênitos de Rakhantorr sobreviventes, Enaya e Atraxalan, oferendo estadia em Ya'ará. O Tempo transformou a amizade de Atraxalan e Enaya em amor, estabelecendo sua linhagem no mundo. Já em idade avançada, no mirante mais belo, rodeados pelos seus inúmeros descendentes, Atraxalan e Enaya evocavam pela última vez a Palavra do Mundo, abençoando seus filhos, e os filhos de seus filhos, com as últimas intenções e virtudes dos Primogênitos de Rakhantorr. Kzara, umas das filhas dos Primogênitos, realizou então o Primeiro Ritual, unindo as almas dos Primogênitos como uma só, devolvendo-os para seu criador e, pela primeira vez, proferido com orgulho e gratidão, Kzara nomeou seu povo orkrash.",
      "traditions": "Para os orkrashs, as palavras possuem poder. Durante a gestação, os familiares e amigos falam palavras positivas para a gestante e seu filho, evocando as intenções de seus Primogênitos. Devido a isso, os recém-nascidos podem apresentar a marca de um dos Primogênitos: a sagacidade de Szatragash transformas as pupilas em fendas; a força de Gaurak causa cicatrizes nos ombros e braços; a espiritualidade de Phelavox deposita uma pequena joia na testa; a resiliência de Atraxalan torna seus caninos inferiores mais protuberantes e a sabedoria de Enaya empalidece as írises. Aqueles que não possuem marcas são chamados de Kurvash, sendo marginalizados ou até mesmo abandonados. Contudo, ainda é possível que sejam marcados em algum momento de suas vidas, caso se conectem aos Primogênitos e realizem feitos que os agradem. O povo orkrash possui uma sociedade simples e tribal, geralmente guiada pelos ideais de Enaya. Cada uma das tribos é independente, com suas próprias particularidades e compreensões acerca de seus Primogênitos. Por exemplo, tribos mais bélicas seguem os ideais de Gaurak, enquanto as mais pacíficas, adotam os ideais de Phelavox. O que era apenas um encontro entre as tribos a Garaudan Morgorr, ou Celebração dos Escolhidos no idioma comum - ganhou enormes proporções desde a criação do Grande Chamado, pois, além de servir como uma oportunidade para as tribos trocarem informações, resolver conflitos e exaltar os ancestrais, o Garaudan Morgorr também passou a servir para eleger o representante do povo orkrash. Essa escolha é feita através de uma série de provações anunciadas pelos anciões, referentes a cada um dos Primogênitos orkrash. Após definido um representante, o escolhido recebe a marca dos Primogênitos, legitimando-o como um líder capaz. Por mais que saibam falar, escrever e ler alguns idiomas do mundo, cultivam a tradição oral para perpetuar sua cultura, costumes, histórias e mitos, pois acreditam que a experiência de ouvir, viver, reproduzir, criar, presenciar ou relembrar torna mais potente tudo aquilo que está sendo feito, pois tudo que é esquecido não merece ser lembrado.",
      "inWorld": "Os orkrash nutrem bons laços de amizade e respeito com os povos da capital Jazaar. A tribo Mor'gatal, por exemplo, são considerados os mercenários ideais. Sempre honram seus acordos e possuem uma alta taxa de sucesso, tornando-os essenciais para a manutenção da ordem em Jazaar. Por outro lado, mesmo com culturas tão antagônicas, orkrashs e draenuns criaram laços: historicamente, os orkrashs protegem a superfície de invasores e caçadores de relíquias, enquanto draenuns protegem o subterrâneo do desconhecido. Mesmo que a ameaça subterrânea tenha se calado, a relação entre os dois povos permanece. Fora de Krabesh, possuem tribos espalhadas em todos os continentes, pelos mais diversos motivos, mas, sempre que possível, estarão presentes no Garaudan Morgorr. Alguns os veem como bestas primitivas, devido ao seu estilo de vida mais simples, longe de tecnologias complexas, enquanto outros os enxergam como brutos, uma impressão criada devido ao seu comportamento rudimentar e sem floreios. Essa fama gerou uma aproximação entre orkrashs e valdraks, pois ambos os povos respeitam a força e a integridade. Com os novos tempos, novas crenças surgiram, e alguns abandonaram o caminho dos rituais, crescendo cada vez mais o número de Kurvashs. Contudo, ainda escutam, lá no fundo, a Palavra do Mundo, onde quer que estejam, pois os orkrashs sempre possuirão aqueles que os resguardam, e a história não pode ser apagada, apenas esquecida."
    }
  },
  {
    "_id": "lg00100000000000",
    "name": "Seiko",
    "type": "legacy",
    "img": "icons/magic/light/eye-white-glowing.svg",
    "legadoKey": "seiko",
    "folder": "fldlg00050000000",
    "_key": "!items!lg00100000000000",
    "system": {
      "name": "Seiko",
      "height": "Entre 1,40 m e 1,70 metros de altura.",
      "lifeExpectancy": "Seikos podem viver até os 250 anos, sendo considerados adultos aos 23 anos.",
      "appearance": "Esses seres humanoides possuem características vulpinas, carregando consigo o misticismo do mundo. Possuem narizes afinados e longas orelhas felpudas, assim como uma cauda volumosa e cabelos que acompanham o tom de sua pelagem. Seikos possuem uma pelagem que envolve todo o seu corpo, podendo ser de tons brancos, negros, castanhos, alaranjados ou acinzentados que, de acordo com cada estação, pode sofrer mudanças: sua pelagem se torna espessa no inverno, brilhante na primavera, fina no verão e opaca no outono.\nCarregam consigo a força espiritual do desconhecido, manifestada por seus olhos enigmáticos, totalmente brancos, conectados às incertezas da vida após a morte, o Limbo. Alguns, contudo, não possuem uma conexão tão forte com o limbo, possuindo olhos parecidos com os de outros Legados.",
      "description": "Conectados ao Limbo, a morte constantemente lhes sussurra palavras gentis, ressignificando a dor da despedida em algo belo e necessário, que deve ser compreendido como o curso natural de todas as coisas. Alinhados com algo maior, os seikos se mantêm firmes nos seus deveres como a ponte entre Auroria e o Limbo. Contudo, sua negligência pode engolir o mundo numa espiral de incertezas acerca da vida, da morte, e o que vem após o fim. Tudo que existe um dia será transmutado em algo novo, para então ser novamente mudado quando entregue aos braços do Limbo.\nA calma aparente dos seikos destoa do turbilhão de pensamentos acerca de seus deveres e tradições. O velho mundo permanece estagnado, imutável, assim como as estações de Narzepion, impossibilitando a mudança, pois ela se mostra traiçoeira e falha. Afinal, o que somos e quem somos, além de um conglomerado de sonhos engaiolados?",
      "legacyAbilities": [
        {
          "name": "Vontade das Brumas",
          "description": "Você pode tocar um Alvo morto para visualizar fragmentos de sua memória. A quantidade e a clareza dessas memórias serão definidas pelo Narrador.",
          "actions": []
        },
        {
          "name": "Espelho da Alma",
          "description": "Com uma Ação Simples, você pode alterar a sua forma por completo, tornando-se um animal terrestre da fauna selvagem de Auroria desde que seja autorizada pelo Narrador. Esse animal deverá ter a mesma Categoria de Tamanho que a sua. Caso você possua equipamentos e pertences ao modificar a sua forma, eles serão transformados em pequenas marcas místicas, que se espalham pelo seu corpo, retornando à sua forma original quando esse efeito for desfeito.\nEnquanto estiver com a forma alterada, você perde todo Efeito Positivo e Foco ativo, além de não poder utilizar Habilidades de Caminhos. Essa forma não possui duração, mas você poderá desfazê-la com uma Ação Simples. Ao realizar um Repouso a forma é desfeita.\nVocê também poderá utilizar essa habilidade para apenas alterar a cor dos seus olhos ou pelos. Dessa forma, o efeito permanece ativo por 10 minutos.",
          "actions": [
            {
              "id": "act_espelho_alma",
              "name": "Espelho da Alma",
              "description": "Metamorfoseia-se em animal selvagem terrestre de mesmo tamanho ou altera cor dos olhos/pelos por 10 min.",
              "cost": "",
              "type": {
                "actionType": "acaoSimples",
                "category": "utilidade",
                "tags": [
                  "metamorfose"
                ]
              },
              "attack": {
                "hasAttack": false
              },
              "damage": {
                "hasDamage": false
              },
              "healing": {
                "hasHealing": false
              },
              "condition": {
                "hasCondition": false
              },
              "check": {
                "hasCheck": false
              },
              "areaOfEffect": {
                "hasArea": false
              }
            }
          ]
        },
        {
          "name": "Resguardo de Energia",
          "description": "Você é imune a efeitos de Alvos Inimigos que removam os seus Pontos de Energia. Você ainda é afetado por Envenenado.",
          "actions": []
        }
      ],
      "continente": "Narzepion",
      "altura": "Entre 1,40 m e 1,70 metros de altura.",
      "expectativa_de_vida": "Seikos podem viver até os 250 anos, sendo considerados adultos aos 23 anos.",
      "aparencia": "Esses seres humanoides possuem características vulpinas, carregando consigo o misticismo do mundo. Possuem narizes afinados e longas orelhas felpudas, assim como uma cauda volumosa e cabelos que acompanham o tom de sua pelagem. Seikos possuem uma pelagem que envolve todo o seu corpo, podendo ser de tons brancos, negros, castanhos, alaranjados ou acinzentados que, de acordo com cada estação, pode sofrer mudanças: sua pelagem se torna espessa no inverno, brilhante na primavera, fina no verão e opaca no outono.\nCarregam consigo a força espiritual do desconhecido, manifestada por seus olhos enigmáticos, totalmente brancos, conectados às incertezas da vida após a morte, o Limbo. Alguns, contudo, não possuem uma conexão tão forte com o limbo, possuindo olhos parecidos com os de outros Legados.",
      "descricao": "Conectados ao Limbo, a morte constantemente lhes sussurra palavras gentis, ressignificando a dor da despedida em algo belo e necessário, que deve ser compreendido como o curso natural de todas as coisas. Alinhados com algo maior, os seikos se mantêm firmes nos seus deveres como a ponte entre Auroria e o Limbo. Contudo, sua negligência pode engolir o mundo numa espiral de incertezas acerca da vida, da morte, e o que vem após o fim. Tudo que existe um dia será transmutado em algo novo, para então ser novamente mudado quando entregue aos braços do Limbo.\nA calma aparente dos seikos destoa do turbilhão de pensamentos acerca de seus deveres e tradições. O velho mundo permanece estagnado, imutável, assim como as estações de Narzepion, impossibilitando a mudança, pois ela se mostra traiçoeira e falha. Afinal, o que somos e quem somos, além de um conglomerado de sonhos engaiolados?",
      "origem": "Quieta e contemplativa, Setsuya acreditava que toda existência possuía um propósito e, caso algo o perdesse, era necessário ressignificar tal existência em algo novo. Preenchida com esse ideal, Setsuya criou o Limbo seu Primogênito uma dimensão invisível e dotada de consciência, que coabita Auroria. É responsável por absorver o Véu sem vida, transmutando-o em algo novo. O toque sutil do Limbo em Auroria originou a renovação periódica do mundo, conhecida como estações do ano, que futuramente seriam assimiladas e auxiliadas por outras entidades, deuses e culturas, como Mayzz'ot, o Vento Primordial, que providencia a passagem das estações ou Pris'ma que providenciaria a estação da colheita, por exemplo. Para servir ao propósito do Limbo, Setsuya criou os seikos, seres conectados ao seu Primogênito, e que o auxiliariam no seu propósito.\nOs seikos descobriram que todo ser possuía uma concentração única de Véu, originada pela vontade dos deuses, que carrega suas memórias, seus sentimentos, seus desejos e suas ambições: a alma. Durante a guerra de Arba'shatrah, os seikos não tomaram lados, concentrando seus esforços em sobreviver e preservar essas almas no Limbo, para que, um dia, pudessem retornar ao mundo como algo novo. A partir desse momento, o Limbo passou a ser compreendido como o Plano dos Mortos.\nApós a queda da Torre dos Imortais, os seikos pediram a ajuda de Mayzz'ot para criar uma proteção em torno de sua nova morada, Narzepion. Queriam uma proteção que fosse capaz de preservar o destino de seus habitantes, a fim de protegê-los dos perigos. O Vento Primordial atendeu ao pedido, mas não da forma que os seikos esperavam: ao criar as Brumas Místicas, as estações estagnaram e as almas não eram mais naturalmente absorvidas pelo Limbo, mas sim pelas brumas, enquanto seus cadáveres vagavam pelo continente, em busca de suas almas. Devido a esse fenômeno, o povo seiko uniu-se ao Império Yuansani para retomar o controle do continente, tornando-se seus conselheiros.",
      "tradicoes": "O povo seikino possui uma cultura, em sua grande parte, imutável, sendo instruídos desde jovens a cumprir o seu papel na sociedade, de acordo com os ideais do seu templo natal. Cada Templo das Estações possui diversos clãs afiliados, liderados respectivamente pelo Senhor do Inverno, Senhor da Primavera, Senhor do Verão e Senhor do Outono, que são destinados a tal posto desde seu nascimento. Seikos não possuem uma liderança unificada, o mais próximo a isso é o Senhor do Inverno, que preside o Conselho das Brumas. Seikos estrangeiros são compreendidos como parte do templo referente à estação na qual que nasceram.\nPor causa às Brumas Místicas, quando um narzepiano falece, seu corpo deve ser cremado e suas cinzas lançadas ao vento, para que sua alma alcance o Limbo. Caso contrário, eles podem se tornar Gorkais, violentas criaturas não-vivas, que vagam pelas brumas, simulando as memórias e a voz dos cadáveres, enganando as pessoas e então atacando-as e devorando-as. Para confrontar esse fenômeno, os seikos possuem os Kyoshin, devotos de Setsuya - especialistas em lidar com os mortos.\nDesde seu nascimento, seikos possuem uma ligação especial com as estações do ano, que os guia e norteia seus princípios. Os nativos de cada estação tendem a apresentar comportamentos em comum: os filhos do inverno são calmos e pragmáticos, enfrentando as intempéries do mundo com dignidade; aqueles nascidos na primavera são empáticos e criativos, encorajados a não se deixar abater pelas dificuldades e imbuídos de bondade; as proles do verão tendem a ser calorosos, protetores e corajosos, lutando contra os males do mundo; e aqueles guiados pelo outono são sábios e introspectivos, capazes de ver além das brumas, buscando compreender o mundo.\nCom base no calendário auroriano, o aniversário de cada seiko é comemorado no primeiro dia de sua respectiva estação, e isso gera grandes celebrações. Seikos estrangeiros nem sempre seguem essa tradição, comemorando seu aniversário no exato dia que nasceram.",
      "no_mundo": "Cada porção da população seiko se aproximou dos povos vizinhos a seus templos, tornando-os bastante diferentes entre si. O Templo do Inverno se tornou próximo ao povo zaokino, o Templo do Verão, ao povo yuansani e o Templo da Primavera, ao povo inárico, enquanto o Templo do Outono permanece isolado. Como fundadores do Conselho das Brumas, sua participação no Império Yuansani é oblíqua e divide a vontade de seu povo: uns apoiam abertamente o império, enquanto outros, principalmente os filhos do inverno, demonstram uma certa insatisfação com o governo atual, mas mantêm suas verdadeiras opiniões veladas.\nOs povos estrangeiros costumam transformar a espiritualidade do povo seiko em mercadoria e, a contragosto dos mais antigos, estrangeiros viajam até os Templos da Estações em busca de sabedoria, iluminação, redenção ou inspiração. Em resposta, os seikos decidiram lucrar com o fenômeno, produzindo filosofias e artes sem sentido para zombar dos estrangeiros, mas a brincadeira ganhou enormes proporções, tornando-se um movimento filosófico e artístico de fato, chamado de O Caminho. Devido a esse Caminho, o povo seiko passou a ser taxado de gurus espirituais. Por isso, nenhuma nação ousa antagonizá-los, pois isso geraria uma enorme desaprovação popular.\nDevido à sua sociedade metódica e restritiva, seikos narzepianos não costumam se aventuram pelo mundo. Caso aconteça, provavelmente estão a serviço de algum yuansu. Caso um seiko queira desbravar o mundo, deve primeiro receber a aprovação de seu templo de origem. Uma vez aprovados, devem manter a harmonia espiritual de Auroria. Nem sempre isso acontece e, uma vez livres de suas obrigações nos templos, tendem a aproveitar sua liberdade. Já seikos estrangeiros, mesmo aqueles que nunca tenham tido contato com sua cultura narzepiana, como por instinto, conectam-se ao Limbo e às estações, como se fossem uma reencarnação de seikos passados.",
      "nomes_comuns_origem": [
        "Ogami",
        "Izumi",
        "Sasaki",
        "Seki",
        "Tsugaru",
        "Yuuki"
      ],
      "abilities": [
        "hl002e0000000000",
        "hl002f0000000000",
        "hl00300000000000"
      ],
      "origin": "Quieta e contemplativa, Setsuya acreditava que toda existência possuía um propósito e, caso algo o perdesse, era necessário ressignificar tal existência em algo novo. Preenchida com esse ideal, Setsuya criou o Limbo seu Primogênito uma dimensão invisível e dotada de consciência, que coabita Auroria. É responsável por absorver o Véu sem vida, transmutando-o em algo novo. O toque sutil do Limbo em Auroria originou a renovação periódica do mundo, conhecida como estações do ano, que futuramente seriam assimiladas e auxiliadas por outras entidades, deuses e culturas, como Mayzz'ot, o Vento Primordial, que providencia a passagem das estações ou Pris'ma que providenciaria a estação da colheita, por exemplo. Para servir ao propósito do Limbo, Setsuya criou os seikos, seres conectados ao seu Primogênito, e que o auxiliariam no seu propósito.\nOs seikos descobriram que todo ser possuía uma concentração única de Véu, originada pela vontade dos deuses, que carrega suas memórias, seus sentimentos, seus desejos e suas ambições: a alma. Durante a guerra de Arba'shatrah, os seikos não tomaram lados, concentrando seus esforços em sobreviver e preservar essas almas no Limbo, para que, um dia, pudessem retornar ao mundo como algo novo. A partir desse momento, o Limbo passou a ser compreendido como o Plano dos Mortos.\nApós a queda da Torre dos Imortais, os seikos pediram a ajuda de Mayzz'ot para criar uma proteção em torno de sua nova morada, Narzepion. Queriam uma proteção que fosse capaz de preservar o destino de seus habitantes, a fim de protegê-los dos perigos. O Vento Primordial atendeu ao pedido, mas não da forma que os seikos esperavam: ao criar as Brumas Místicas, as estações estagnaram e as almas não eram mais naturalmente absorvidas pelo Limbo, mas sim pelas brumas, enquanto seus cadáveres vagavam pelo continente, em busca de suas almas. Devido a esse fenômeno, o povo seiko uniu-se ao Império Yuansani para retomar o controle do continente, tornando-se seus conselheiros.",
      "traditions": "O povo seikino possui uma cultura, em sua grande parte, imutável, sendo instruídos desde jovens a cumprir o seu papel na sociedade, de acordo com os ideais do seu templo natal. Cada Templo das Estações possui diversos clãs afiliados, liderados respectivamente pelo Senhor do Inverno, Senhor da Primavera, Senhor do Verão e Senhor do Outono, que são destinados a tal posto desde seu nascimento. Seikos não possuem uma liderança unificada, o mais próximo a isso é o Senhor do Inverno, que preside o Conselho das Brumas. Seikos estrangeiros são compreendidos como parte do templo referente à estação na qual que nasceram.\nPor causa às Brumas Místicas, quando um narzepiano falece, seu corpo deve ser cremado e suas cinzas lançadas ao vento, para que sua alma alcance o Limbo. Caso contrário, eles podem se tornar Gorkais, violentas criaturas não-vivas, que vagam pelas brumas, simulando as memórias e a voz dos cadáveres, enganando as pessoas e então atacando-as e devorando-as. Para confrontar esse fenômeno, os seikos possuem os Kyoshin, devotos de Setsuya - especialistas em lidar com os mortos.\nDesde seu nascimento, seikos possuem uma ligação especial com as estações do ano, que os guia e norteia seus princípios. Os nativos de cada estação tendem a apresentar comportamentos em comum: os filhos do inverno são calmos e pragmáticos, enfrentando as intempéries do mundo com dignidade; aqueles nascidos na primavera são empáticos e criativos, encorajados a não se deixar abater pelas dificuldades e imbuídos de bondade; as proles do verão tendem a ser calorosos, protetores e corajosos, lutando contra os males do mundo; e aqueles guiados pelo outono são sábios e introspectivos, capazes de ver além das brumas, buscando compreender o mundo.\nCom base no calendário auroriano, o aniversário de cada seiko é comemorado no primeiro dia de sua respectiva estação, e isso gera grandes celebrações. Seikos estrangeiros nem sempre seguem essa tradição, comemorando seu aniversário no exato dia que nasceram.",
      "inWorld": "Cada porção da população seiko se aproximou dos povos vizinhos a seus templos, tornando-os bastante diferentes entre si. O Templo do Inverno se tornou próximo ao povo zaokino, o Templo do Verão, ao povo yuansani e o Templo da Primavera, ao povo inárico, enquanto o Templo do Outono permanece isolado. Como fundadores do Conselho das Brumas, sua participação no Império Yuansani é oblíqua e divide a vontade de seu povo: uns apoiam abertamente o império, enquanto outros, principalmente os filhos do inverno, demonstram uma certa insatisfação com o governo atual, mas mantêm suas verdadeiras opiniões veladas.\nOs povos estrangeiros costumam transformar a espiritualidade do povo seiko em mercadoria e, a contragosto dos mais antigos, estrangeiros viajam até os Templos da Estações em busca de sabedoria, iluminação, redenção ou inspiração. Em resposta, os seikos decidiram lucrar com o fenômeno, produzindo filosofias e artes sem sentido para zombar dos estrangeiros, mas a brincadeira ganhou enormes proporções, tornando-se um movimento filosófico e artístico de fato, chamado de O Caminho. Devido a esse Caminho, o povo seiko passou a ser taxado de gurus espirituais. Por isso, nenhuma nação ousa antagonizá-los, pois isso geraria uma enorme desaprovação popular.\nDevido à sua sociedade metódica e restritiva, seikos narzepianos não costumam se aventuram pelo mundo. Caso aconteça, provavelmente estão a serviço de algum yuansu. Caso um seiko queira desbravar o mundo, deve primeiro receber a aprovação de seu templo de origem. Uma vez aprovados, devem manter a harmonia espiritual de Auroria. Nem sempre isso acontece e, uma vez livres de suas obrigações nos templos, tendem a aproveitar sua liberdade. Já seikos estrangeiros, mesmo aqueles que nunca tenham tido contato com sua cultura narzepiana, como por instinto, conectam-se ao Limbo e às estações, como se fossem uma reencarnação de seikos passados."
    }
  },
  {
    "_id": "lg00110000000000",
    "name": "Ursar",
    "type": "legacy",
    "img": "icons/creatures/mammals/bear-paw-print-white.svg",
    "legadoKey": "ursar",
    "folder": "fldlg00020000000",
    "_key": "!items!lg00110000000000",
    "system": {
      "name": "Ursar",
      "height": "Entre 1,80m e 2,30 metros de altura.",
      "lifeExpectancy": "Ursares podem viver por 180 anos, livres para abraçar seus destinos aos 20 anos.",
      "appearance": "Grandes ursos bípedes, geralmente com uma pelagem branca como a neve, mas também podem apresentar tons castanhos, negros ou mesclados, principalmente nas subtribos estabelecidas fora de Drakar. A cor de suas írises pode refletir seu estado emocional, como o vermelho para raiva, lilás para amor, ciano para compaixão, entre outras cores e emoções. Mesmo que a variação da cor de seus olhos seja natural, os ursares sabem suprimir suas emoções, tornando o seu estado emocional não tão simples de ser lido.",
      "description": "Agarrados às suas esperanças e perseverantes frente às intempéries da vida, os ursares vagam pelo continente congelado e pelo mundo, buscando proporcionar alívio a corações desamparados, a fim de tornar a existência mais suportável. O mundo já sofreu demais e nem todos precisam aguentar o fardo sozinhos. Os ursares tentam compreender os sentimentos dos outros, oferecendo seus concelhos e uma conversa calorosa e despretensiosa ao redor de uma fogueira.\nMuitos confundem o seu pacifismo com fraqueza ou covardia, mas, quando necessário, provam-se temíveis em combate, lutando até o seu último suspiro. Suas vozes de trovão serão as primeiras a ecoarem pelos salões, sempre exigindo paz. As suas resoluções de conflitos não são cegas: os ursares escolhem muito bem suas lutas, as causas que defenderão e, quando necessário, mancharão suas mãos com sangue e lágrimas em nome da paz.",
      "legacyAbilities": [
        {
          "name": "Virtude do Primeiro Povo",
          "description": "Ao tocar o corpo de um Alvo, você poderá ler e acalmar as suas emoções.",
          "actions": []
        },
        {
          "name": "Energia Pacífica",
          "description": "Enquanto estiver em combate, o primeiro teste de Precisão ou Canalização de um Alvo Inimigo contra você será reduzido em 1. Esse efeito ocorre apenas uma vez por Alvo Inimigo em um mesmo combate.",
          "actions": []
        },
        {
          "name": "Presente de Norduk",
          "description": "Ao concluir um Repouso Completo, você receberá um valor de Pontos de Vida Temporários equivalente ao dobro do seu total máximo de Pontos de Energia.",
          "actions": [
            {
              "id": "act_presente_norduk",
              "name": "Presente de Norduk",
              "description": "Ao concluir um Repouso Completo, recebe Pontos de Vida Temporários = 2 * PE Máximo.",
              "cost": "",
              "type": {
                "actionType": "acaoSimples",
                "category": "suporte",
                "tags": [
                  "pv_temporario",
                  "repouso"
                ]
              },
              "attack": {
                "hasAttack": false
              },
              "damage": {
                "hasDamage": false
              },
              "healing": {
                "hasHealing": true,
                "formula": "2 * @pe.max",
                "type": "temp"
              },
              "condition": {
                "hasCondition": false
              },
              "check": {
                "hasCheck": false
              },
              "areaOfEffect": {
                "hasArea": false
              }
            }
          ]
        }
      ],
      "continente": "Drakar",
      "altura": "Entre 1,80m e 2,30 metros de altura.",
      "expectativa_de_vida": "Ursares podem viver por 180 anos, livres para abraçar seus destinos aos 20 anos.",
      "aparencia": "Grandes ursos bípedes, geralmente com uma pelagem branca como a neve, mas também podem apresentar tons castanhos, negros ou mesclados, principalmente nas subtribos estabelecidas fora de Drakar. A cor de suas írises pode refletir seu estado emocional, como o vermelho para raiva, lilás para amor, ciano para compaixão, entre outras cores e emoções. Mesmo que a variação da cor de seus olhos seja natural, os ursares sabem suprimir suas emoções, tornando o seu estado emocional não tão simples de ser lido.",
      "descricao": "Agarrados às suas esperanças e perseverantes frente às intempéries da vida, os ursares vagam pelo continente congelado e pelo mundo, buscando proporcionar alívio a corações desamparados, a fim de tornar a existência mais suportável. O mundo já sofreu demais e nem todos precisam aguentar o fardo sozinhos. Os ursares tentam compreender os sentimentos dos outros, oferecendo seus concelhos e uma conversa calorosa e despretensiosa ao redor de uma fogueira.\nMuitos confundem o seu pacifismo com fraqueza ou covardia, mas, quando necessário, provam-se temíveis em combate, lutando até o seu último suspiro. Suas vozes de trovão serão as primeiras a ecoarem pelos salões, sempre exigindo paz. As suas resoluções de conflitos não são cegas: os ursares escolhem muito bem suas lutas, as causas que defenderão e, quando necessário, mancharão suas mãos com sangue e lágrimas em nome da paz.",
      "origem": "Submerso em seus pensamentos, alheio ao mundo, Norduk, o filho mais novo, guardava o último desejo de Gaia: a esperança que traria harmonia a tudo que surgiria. Confrontado pela grande tela branca da criação, aos poucos moldava o Véu. Tentou criar aqueles que seriam os emissários de seu amor, mas suas criações definhavam momentos após serem geradas. Sua irmã, Nívila, admirada com seus esforços, juntou-se a ele na busca de desvendar a criação e, juntos, permitiram que o primeiro Legado fosse criado, os ursares. No início, eram pequenos e fracos, mas, aos poucos, conforme auxiliavam os deuses de Édona nas suas tarefas e recebiam suas bênçãos, tornaram-se fortes e respeitáveis. Passaram a ser um brilho de esperança em meio ao caos de tudo aquilo que ainda não possuía nome, com sentimentos tão puros que transbordavam por seus olhos.\nDurante a guerra de Arba'shatrah, muitas mortes foram evitadas, de ambos os lados, pelos ursares. Após a separação dos continentes, Norduk reuniu seus filhos e filhas para apresentar-lhes o mundo e perguntou-os onde seus corações desejavam permanecer. Os ursares seguiram os passos de seu Primogênito: Tharlok, o Branco, previu violência no norte, sentindo que deveria mediar seus conflitos.\nAo chegar na futura Drakar, a comitiva de Tharlok enfrentou diversas provações e perigos. Num determinado momento, depararam-se com um rio de Kuldrana, que impedia a passagem. Ao tentar contorná-la, encontraram um vulcão, de onde ressoava uma triste melodia, evocando os traumas da guerra de Arba'shatrah. Desestabilizados pelo medo, arremessaram sua lanças em direção ao vulcão, mas, em um ato de coragem e amor, cada lança foi interceptada pelas costas de Tharlok, que via no vulcão a essência de seu velho amigo, Kraun'gar. Como forma de se perdoarem, e serem perdoados por Tharlok, juraram proteger o vulcão, fazendo dele sua morada, agora com o nome de Raar'kreta.",
      "tradicoes": "As tribos ursarinas funcionam como grandes comunidades familiares, sem grandes distinções sociais entre seus membros. Cada tribo é liderada por um Tulivouraani, ou Voz do Vulcão ursares que ouvem a voz de Raar'kreta e possuem um Coração de Kuldrana, relíquias passadas de geração em geração, e que devem ser renovadas na Kuldrana originada pelo vulcão, anunciando o surgimento de um novo líder.\nAs caravanas ursarinas são famosas pelo mundo, principalmente por significarem auxílio e esperança. Utilizando grandes veículos a tração animal que podem rapidamente se transformar em acampamentos aconchegantes-, por onde passam, compartilham a sua comida e as suas histórias com os povos locais, aceitando quaisquer doações em troca. Sua culinária merece um destaque especial, principalmente seus ensopados revigorantes, ricos em propriedades medicinais e perfeitos para enfrentar o frio. Essas caravanas são lideradas pelos Tolvaani, ou Voz da Esperança, que carregam consigo um Coração de Kuldrana similar aos Tulivouraani. Em Drakar, diante de um Tolvaani, a neve se abre, deixando momentaneamente um rastro verdejante por onde passam.\nQuando sentem um afeto profundo por alguém - seja esse laço de natureza romântica ou simplesmente afetuosa - é comum que ofereçam presentes feitos por suas próprias mãos, como uma forma sincera de demonstrar carinho. Da mesma maneira, valorizam imensamente receber algo que carregue o toque pessoal de quem lhes é caro. Quando algo é feito de forma artesanal, eles o enxergam como um presente único, cuidadosamente pensado e criado especialmente para eles não como um gesto de obrigação, mas uma expressão genuína de afeto. Embora, à primeira vista, esses presentes possam parecer simples ou até triviais, para um ursar, é o significado que carrega o verdadeiro valor.\nQuando suas vidas chegam ao fim, é costume honrar seus nomes e eternizar seus atos de bondade. Com esse intuito, foi criada a Thargalia, um tipo especial de sepultamento. Nesse rito, todos aqueles que possuíam alguma afeição pelo ursar devem perfurar as costas do cadáver com uma lança, após isso, o corpo deverá ser cremado. Em alguns casos, ao invés de lanças, são cravadas adagas em seu peito, simbolizando algum rancor ou inimizade, pondo um fim às suas mágoas. Como agradecimento pela vida que puderam passar juntos, suas alegrias, suas conquistas, entre outros, as cinzas do ursar falecido geralmente são recolhidas por peregrinos ursares, que espalharão as cinzas ao longo do caminho de suas caravanas.",
      "no_mundo": "Talvez um dos povos mais queridos de toda Auroria, os ursares nunca iniciaram guerra alguma, mas colocaram um fim em muitas, sendo os responsáveis por evitar que Drakar se afogasse em seu próprio sangue. Talvez pelo desejo das pessoas em acreditar que exista algo ou alguém - que seja dotado de nobre bondade, ou pela natureza calorosa do povo ursar, esse povo é recebido com alegria pelos outros povos. Para alguns ursares, isso é um grande incômodo, já que muitos esperam que eles resolvam os seus problemas.\nContudo, desde a Ruptura, isso vem mudando aos poucos. Talvez pela influência de outros povos ou apenas uma má índole natural de alguns, os ursares, como povo, perderam um pouco de sua credibilidade, pois uma quantidade considerável de ursares começaram a cometer crimes, lutar em guerras, matando e assaltando inocentes, manchando a fama benevolente desse povo.\nTalvez até os mais puros e bondosos possam ser corrompidos e ninguém esteja livre da maldade. Os ursares, assim como qualquer outro Legado, são mortais e possuem suas falhas. Mas talvez ainda exista alguma esperança para o mundo, assim como pregava Tharlok: 'não existem pessoas naturalmente más, mas sim aqueles que tiveram a sua felicidade roubada'.",
      "nomes_comuns_origem": [
        "Kron",
        "Gazmir",
        "Galatea",
        "Harmin",
        "Ilae",
        "Nirdal"
      ],
      "abilities": [
        "hl00310000000000",
        "hl00320000000000",
        "hl00330000000000"
      ],
      "origin": "Submerso em seus pensamentos, alheio ao mundo, Norduk, o filho mais novo, guardava o último desejo de Gaia: a esperança que traria harmonia a tudo que surgiria. Confrontado pela grande tela branca da criação, aos poucos moldava o Véu. Tentou criar aqueles que seriam os emissários de seu amor, mas suas criações definhavam momentos após serem geradas. Sua irmã, Nívila, admirada com seus esforços, juntou-se a ele na busca de desvendar a criação e, juntos, permitiram que o primeiro Legado fosse criado, os ursares. No início, eram pequenos e fracos, mas, aos poucos, conforme auxiliavam os deuses de Édona nas suas tarefas e recebiam suas bênçãos, tornaram-se fortes e respeitáveis. Passaram a ser um brilho de esperança em meio ao caos de tudo aquilo que ainda não possuía nome, com sentimentos tão puros que transbordavam por seus olhos.\nDurante a guerra de Arba'shatrah, muitas mortes foram evitadas, de ambos os lados, pelos ursares. Após a separação dos continentes, Norduk reuniu seus filhos e filhas para apresentar-lhes o mundo e perguntou-os onde seus corações desejavam permanecer. Os ursares seguiram os passos de seu Primogênito: Tharlok, o Branco, previu violência no norte, sentindo que deveria mediar seus conflitos.\nAo chegar na futura Drakar, a comitiva de Tharlok enfrentou diversas provações e perigos. Num determinado momento, depararam-se com um rio de Kuldrana, que impedia a passagem. Ao tentar contorná-la, encontraram um vulcão, de onde ressoava uma triste melodia, evocando os traumas da guerra de Arba'shatrah. Desestabilizados pelo medo, arremessaram sua lanças em direção ao vulcão, mas, em um ato de coragem e amor, cada lança foi interceptada pelas costas de Tharlok, que via no vulcão a essência de seu velho amigo, Kraun'gar. Como forma de se perdoarem, e serem perdoados por Tharlok, juraram proteger o vulcão, fazendo dele sua morada, agora com o nome de Raar'kreta.",
      "traditions": "As tribos ursarinas funcionam como grandes comunidades familiares, sem grandes distinções sociais entre seus membros. Cada tribo é liderada por um Tulivouraani, ou Voz do Vulcão ursares que ouvem a voz de Raar'kreta e possuem um Coração de Kuldrana, relíquias passadas de geração em geração, e que devem ser renovadas na Kuldrana originada pelo vulcão, anunciando o surgimento de um novo líder.\nAs caravanas ursarinas são famosas pelo mundo, principalmente por significarem auxílio e esperança. Utilizando grandes veículos a tração animal que podem rapidamente se transformar em acampamentos aconchegantes-, por onde passam, compartilham a sua comida e as suas histórias com os povos locais, aceitando quaisquer doações em troca. Sua culinária merece um destaque especial, principalmente seus ensopados revigorantes, ricos em propriedades medicinais e perfeitos para enfrentar o frio. Essas caravanas são lideradas pelos Tolvaani, ou Voz da Esperança, que carregam consigo um Coração de Kuldrana similar aos Tulivouraani. Em Drakar, diante de um Tolvaani, a neve se abre, deixando momentaneamente um rastro verdejante por onde passam.\nQuando sentem um afeto profundo por alguém - seja esse laço de natureza romântica ou simplesmente afetuosa - é comum que ofereçam presentes feitos por suas próprias mãos, como uma forma sincera de demonstrar carinho. Da mesma maneira, valorizam imensamente receber algo que carregue o toque pessoal de quem lhes é caro. Quando algo é feito de forma artesanal, eles o enxergam como um presente único, cuidadosamente pensado e criado especialmente para eles não como um gesto de obrigação, mas uma expressão genuína de afeto. Embora, à primeira vista, esses presentes possam parecer simples ou até triviais, para um ursar, é o significado que carrega o verdadeiro valor.\nQuando suas vidas chegam ao fim, é costume honrar seus nomes e eternizar seus atos de bondade. Com esse intuito, foi criada a Thargalia, um tipo especial de sepultamento. Nesse rito, todos aqueles que possuíam alguma afeição pelo ursar devem perfurar as costas do cadáver com uma lança, após isso, o corpo deverá ser cremado. Em alguns casos, ao invés de lanças, são cravadas adagas em seu peito, simbolizando algum rancor ou inimizade, pondo um fim às suas mágoas. Como agradecimento pela vida que puderam passar juntos, suas alegrias, suas conquistas, entre outros, as cinzas do ursar falecido geralmente são recolhidas por peregrinos ursares, que espalharão as cinzas ao longo do caminho de suas caravanas.",
      "inWorld": "Talvez um dos povos mais queridos de toda Auroria, os ursares nunca iniciaram guerra alguma, mas colocaram um fim em muitas, sendo os responsáveis por evitar que Drakar se afogasse em seu próprio sangue. Talvez pelo desejo das pessoas em acreditar que exista algo ou alguém - que seja dotado de nobre bondade, ou pela natureza calorosa do povo ursar, esse povo é recebido com alegria pelos outros povos. Para alguns ursares, isso é um grande incômodo, já que muitos esperam que eles resolvam os seus problemas.\nContudo, desde a Ruptura, isso vem mudando aos poucos. Talvez pela influência de outros povos ou apenas uma má índole natural de alguns, os ursares, como povo, perderam um pouco de sua credibilidade, pois uma quantidade considerável de ursares começaram a cometer crimes, lutar em guerras, matando e assaltando inocentes, manchando a fama benevolente desse povo.\nTalvez até os mais puros e bondosos possam ser corrompidos e ninguém esteja livre da maldade. Os ursares, assim como qualquer outro Legado, são mortais e possuem suas falhas. Mas talvez ainda exista alguma esperança para o mundo, assim como pregava Tharlok: 'não existem pessoas naturalmente más, mas sim aqueles que tiveram a sua felicidade roubada'."
    }
  },
  {
    "_id": "lg00120000000000",
    "name": "Valdrak",
    "type": "legacy",
    "img": "icons/skills/melee/unarmed-claw-dragon.svg",
    "legadoKey": "valdrak",
    "folder": "fldlg00020000000",
    "_key": "!items!lg00120000000000",
    "system": {
      "name": "Valdrak",
      "height": "Entre 2,30m e 2,70 metros de altura.",
      "lifeExpectancy": "Valdraks podem viver até os 130 anos, podendo iniciar sua Faargala seu rito de passagem a partir dos 10 anos, tornando-se adultos por volta dos 16 anos.",
      "appearance": "Valdraks destacam-se pelos seus enormes, potentes e resistentes corpos, sendo fisicamente o maior Legado de Auroria. Sua pele, normalmente, é pálida e seca, com tons azulados, acinzentados ou negros. Seus olhos podem ser acinzentados, azuis-celestes ou âmbar, com cabelos pretos, brancos, loiros ou ruivos.",
      "description": "A guerra transforma todos em bestas violentas e sanguinárias, mas apenas os mais sábios aprendem como manejar seus impulsos a seu favor, pois o deus da guerra não perdoa os fracos. Os valdraks são corajosos e orgulhosos de sua força. Em uma busca constante pela vitória e pelo ápice de seu poder, não espere que admitam a derrota antes de estarem mortos. O poder não é baseado apenas na força física, mas sim qualquer vantagem que possa ser usada, pois o importante é vencer os desafios e se provar o melhor e mais apto.\nPor mais que pareçam apenas gigantes movidos pela guerra, os valdraks possuem um grande apreço pelos seus antepassados, família, companheiros e nação, chorando por suas perdas e se alegrando com as novas vidas. O tempo foi fundamental para esse povo, pois, somente após sua derrota na Guerra da Tempestade, puderam olhar o mundo como ele é de fato. Mesmo que isso crie conflitos entre seus iguais, a guerra não é apenas aço e sangue, mas também cada vitória cotidiana.",
      "legacyAbilities": [
        {
          "name": "Força de Gruneak",
          "description": "O seu corpo possui uma força descomunal, possuindo um total de 120 pontos de Unidade, ao invés de 100. A sua base de valor da regra ERGUER E MOVIMENTAR OBJETOS é dobrada. O valor aumentado a cada ponto de Brutalidade não é alterado por essa habilidade.",
          "actions": [],
          "activeEffect": {
            "text": "Carga Máxima aumentada para 120 Unidades e dobro da capacidade de erguer/movimentar objetos.",
            "trigger": {
              "event": "automatic"
            },
            "duration": {
              "type": "permanent"
            },
            "changes": [
              {
                "key": "system.encumbrance.max",
                "mode": 2,
                "value": "120"
              }
            ]
          }
        },
        {
          "name": "Resiliência",
          "description": "Você é imune a qualquer efeito que o faria se deslocar involuntariamente.",
          "actions": []
        },
        {
          "name": "Incansável",
          "description": "Você ignora 1 ponto de Exaustão recebido. Esse efeito só poderá ser realizado novamente após concluir um Repouso Completo.",
          "actions": [
            {
              "id": "act_incansavel",
              "name": "Incansável",
              "description": "Ignora 1 ponto de Exaustão recebido (1x por Repouso Completo).",
              "cost": "",
              "type": {
                "actionType": "reacao",
                "category": "defesa",
                "tags": [
                  "exaustao",
                  "repouso"
                ]
              },
              "attack": {
                "hasAttack": false
              },
              "damage": {
                "hasDamage": false
              },
              "healing": {
                "hasHealing": false
              },
              "condition": {
                "hasCondition": false
              },
              "check": {
                "hasCheck": false
              },
              "areaOfEffect": {
                "hasArea": false
              }
            }
          ]
        }
      ],
      "continente": "Drakar",
      "altura": "Entre 2,30m e 2,70 metros de altura.",
      "expectativa_de_vida": "Valdraks podem viver até os 130 anos, podendo iniciar sua Faargala seu rito de passagem a partir dos 10 anos, tornando-se adultos por volta dos 16 anos.",
      "aparencia": "Valdraks destacam-se pelos seus enormes, potentes e resistentes corpos, sendo fisicamente o maior Legado de Auroria. Sua pele, normalmente, é pálida e seca, com tons azulados, acinzentados ou negros. Seus olhos podem ser acinzentados, azuis-celestes ou âmbar, com cabelos pretos, brancos, loiros ou ruivos.",
      "descricao": "A guerra transforma todos em bestas violentas e sanguinárias, mas apenas os mais sábios aprendem como manejar seus impulsos a seu favor, pois o deus da guerra não perdoa os fracos. Os valdraks são corajosos e orgulhosos de sua força. Em uma busca constante pela vitória e pelo ápice de seu poder, não espere que admitam a derrota antes de estarem mortos. O poder não é baseado apenas na força física, mas sim qualquer vantagem que possa ser usada, pois o importante é vencer os desafios e se provar o melhor e mais apto.\nPor mais que pareçam apenas gigantes movidos pela guerra, os valdraks possuem um grande apreço pelos seus antepassados, família, companheiros e nação, chorando por suas perdas e se alegrando com as novas vidas. O tempo foi fundamental para esse povo, pois, somente após sua derrota na Guerra da Tempestade, puderam olhar o mundo como ele é de fato. Mesmo que isso crie conflitos entre seus iguais, a guerra não é apenas aço e sangue, mas também cada vitória cotidiana.",
      "origem": "O primeiro ato das divindades, ainda confusas com o seu nascimento, foi tanto um ato de violência quanto de preservação. A deusa Kýria, em desespero, lançou-se contra Anatael e, naquele momento, o símbolo de superação e fervor, Gruneak, entendeu algo que talvez somente ele pudesse perceber: a violência é a única forma de enfrentar os perigos do mundo, superar suas dores e seus medos. Recluso em um dos cantos de Édona, Gruneak forjou com sangue e suor aqueles que carregariam sua vontade, e duelou com cada uma de suas criações para testar sua força. Apenas quando uma de suas criações conseguiu ferir a divindade, Gruneak sorriu, aniquilando todas as outras. Havia encontrado o seu campeão, considerando-o o seu Primogênito e nomeando-o Farkas. Do sangue de Farkas, Gruneak deu origem a uma legião de valdraks.\nO objetivo de Gruneak era proteger Arba'shatrah de qualquer tipo de ameaça, até dos próprios Primordiais. E foi o que de fato aconteceu. Um exército opressor de valdraks tomou a frente da primeira guerra pela liberdade. Cada valdrak possuía um daeva como escudeiro, superando as forças de Anatael. Mesmo sendo poucos, seu exército foi fundamental para a vitória pela liberdade dos povos.\nQuando a guerra acabou e a Torre dos Imortais caiu, Farkas e seu povo foram ordenados por seu criador a marchar rumo ao norte, junto de anões e daevas. Lutando contra as ameaças do lugar e a insubordinação dos outros povos, os valdraks dominaram a região, banhando sua alma em conquistas e despedidas. Mas, lentamente, a terra perdia sua cor, congelando os rios e cobrindo suas planícies, antes tão verdejantes e, sem qualquer tipo de anúncio, a Veldrana engoliu a região.",
      "tradicoes": "A linhagem real de Trunetak descende diretamente de Farkas, o primeiro valdrak. Caso o governante morra, os herdeiros devem lutar entre si, restando apenas um, mas isso não significa necessariamente matar irmãos e irmãs, mas sim retirar seus títulos reais. A realeza é auxiliada pela Mão de Drakar, um grupo de cinco comandantes leais ao governante, que podem ser de outros Legados, permanecendo ao lado do rei ou rainha apenas aqueles que são considerados leais e fortes.\nNo dia que um valdrak completa 10 anos, se inicia sua Faargala, uma jornada para encontrar sua vocação. Durante essa jornada, que pode levar anos, carregam o símbolo de Trunetak - que garante passagem entre as nações. Aqueles que os aceitam como aprendizes possuem completa liberdade para agir conforme suas tradições, sem qualquer tipo de represália do povo valdrak. Quando retornam, caso possuam êxito, são reintegrados à sociedade, marcados com o símbolo de Gruneak em sua pele e considerados adultos. Entretanto, caso fracassem, são deixados ao seu próprio destino, como uma vergonha para seu povo. Muitos se limitam a Drakar, adquirindo a aprovação dos povos do continente congelado, mas aqueles mais ambiciosos, viajam para fora de Drakar ou migram por mais de uma nação.\nExtremamente competitivos, muitos dos conflitos são resolvidos de duas formas: o Kazkorun é composto de competições não letais, já o Kazgorak são desafios nos quais um dos participantes não sobreviverá. Por tradição, o desafiado escolhe o desafio, e seu resultado deve ser respeitado por todos. Os competidores devem honrar seus oponentes dando o melhor de si, pois subestimar um oponente é o primeiro passo para a derrota.\nO povo valdrakiano possui uma voz potente, que ecoa como um trovão. No canto Thursang, ou 'Canto do Trovão', utilizam-se sons guturais e graves entendidos como o 'Som da Morte' enquanto o Hjorsang, ou 'Canto do Vento', utiliza sons agudos e notas longas representando o 'Som da Vida'. Existe também o Hjorthursang, ou 'Canto do Vento e do Trovão', que mistura os dois estilos em uma espécie de diálogo sonoro, e é geralmente utilizado em comemorações. Normalmente, essas canções são acompanhadas por tambores e flautas.",
      "no_mundo": "Lentamente, através dos séculos, os valdraks reconquistaram parte da confiança dos outros povos de Drakar, tratando-os não mais como vassalos, mas como iguais. Uma certa relação de respeito foi construída: por um lado, os valdraks honraram suas tradições, reconhecendo a vitória de anões, daevas e ursares, legitimando suas independências, esses, por sua vez, depositaram um voto de confiança nos valdraks, tendo os ursares como mediadores desse tratado de cooperação drakariana.\nAssim foi iniciada a chamada 'Era dos Fracos', uma decadência tão grande que colapsou grande parte de sua sociedade, obrigando-os a se curvar aos vencedores, mas dividindo a opinião de seu povo entre os saudosistas da 'Era de Ouro Valdrak' e aqueles que desejam respeitar suas tradições e evoluírem, deixando o passado para trás. Humilhados, não possuíam outra escolha a não ser aprender com outras nações outras formas de poder. Através de uma repaginação da Faargala, outras culturas e sabedorias adentraram suas muralhas, assim como sua cultura pôde alcançar outras nações, renovando suas políticas opressoras para os novos tempos, trocando força bruta por estratégia.\nOs valdraks se espalham pelo mundo, movidos principalmente por sua Faargala e, consequentemente, renovam sua sociedade com novos saberes, despertando inclusive um interesse por sua própria história, observando nas ruínas o seu passado. Os filhos de Gruneak não costumam se amargurar com o passado caso sejam lembrados de suas derrotas, provavelmente exaltarão os vencedores, pois a única derrota definitiva é a morte, assim como seu Primogênito, Farkas, que foi derrotado apenas pelo Tempo.",
      "nomes_comuns_origem": [
        "Helga",
        "Keörd",
        "Kraegar",
        "Svenn",
        "Yorfinn"
      ],
      "abilities": [
        "hl00340000000000",
        "hl00350000000000",
        "hl00360000000000"
      ],
      "origin": "O primeiro ato das divindades, ainda confusas com o seu nascimento, foi tanto um ato de violência quanto de preservação. A deusa Kýria, em desespero, lançou-se contra Anatael e, naquele momento, o símbolo de superação e fervor, Gruneak, entendeu algo que talvez somente ele pudesse perceber: a violência é a única forma de enfrentar os perigos do mundo, superar suas dores e seus medos. Recluso em um dos cantos de Édona, Gruneak forjou com sangue e suor aqueles que carregariam sua vontade, e duelou com cada uma de suas criações para testar sua força. Apenas quando uma de suas criações conseguiu ferir a divindade, Gruneak sorriu, aniquilando todas as outras. Havia encontrado o seu campeão, considerando-o o seu Primogênito e nomeando-o Farkas. Do sangue de Farkas, Gruneak deu origem a uma legião de valdraks.\nO objetivo de Gruneak era proteger Arba'shatrah de qualquer tipo de ameaça, até dos próprios Primordiais. E foi o que de fato aconteceu. Um exército opressor de valdraks tomou a frente da primeira guerra pela liberdade. Cada valdrak possuía um daeva como escudeiro, superando as forças de Anatael. Mesmo sendo poucos, seu exército foi fundamental para a vitória pela liberdade dos povos.\nQuando a guerra acabou e a Torre dos Imortais caiu, Farkas e seu povo foram ordenados por seu criador a marchar rumo ao norte, junto de anões e daevas. Lutando contra as ameaças do lugar e a insubordinação dos outros povos, os valdraks dominaram a região, banhando sua alma em conquistas e despedidas. Mas, lentamente, a terra perdia sua cor, congelando os rios e cobrindo suas planícies, antes tão verdejantes e, sem qualquer tipo de anúncio, a Veldrana engoliu a região.",
      "traditions": "A linhagem real de Trunetak descende diretamente de Farkas, o primeiro valdrak. Caso o governante morra, os herdeiros devem lutar entre si, restando apenas um, mas isso não significa necessariamente matar irmãos e irmãs, mas sim retirar seus títulos reais. A realeza é auxiliada pela Mão de Drakar, um grupo de cinco comandantes leais ao governante, que podem ser de outros Legados, permanecendo ao lado do rei ou rainha apenas aqueles que são considerados leais e fortes.\nNo dia que um valdrak completa 10 anos, se inicia sua Faargala, uma jornada para encontrar sua vocação. Durante essa jornada, que pode levar anos, carregam o símbolo de Trunetak - que garante passagem entre as nações. Aqueles que os aceitam como aprendizes possuem completa liberdade para agir conforme suas tradições, sem qualquer tipo de represália do povo valdrak. Quando retornam, caso possuam êxito, são reintegrados à sociedade, marcados com o símbolo de Gruneak em sua pele e considerados adultos. Entretanto, caso fracassem, são deixados ao seu próprio destino, como uma vergonha para seu povo. Muitos se limitam a Drakar, adquirindo a aprovação dos povos do continente congelado, mas aqueles mais ambiciosos, viajam para fora de Drakar ou migram por mais de uma nação.\nExtremamente competitivos, muitos dos conflitos são resolvidos de duas formas: o Kazkorun é composto de competições não letais, já o Kazgorak são desafios nos quais um dos participantes não sobreviverá. Por tradição, o desafiado escolhe o desafio, e seu resultado deve ser respeitado por todos. Os competidores devem honrar seus oponentes dando o melhor de si, pois subestimar um oponente é o primeiro passo para a derrota.\nO povo valdrakiano possui uma voz potente, que ecoa como um trovão. No canto Thursang, ou 'Canto do Trovão', utilizam-se sons guturais e graves entendidos como o 'Som da Morte' enquanto o Hjorsang, ou 'Canto do Vento', utiliza sons agudos e notas longas representando o 'Som da Vida'. Existe também o Hjorthursang, ou 'Canto do Vento e do Trovão', que mistura os dois estilos em uma espécie de diálogo sonoro, e é geralmente utilizado em comemorações. Normalmente, essas canções são acompanhadas por tambores e flautas.",
      "inWorld": "Lentamente, através dos séculos, os valdraks reconquistaram parte da confiança dos outros povos de Drakar, tratando-os não mais como vassalos, mas como iguais. Uma certa relação de respeito foi construída: por um lado, os valdraks honraram suas tradições, reconhecendo a vitória de anões, daevas e ursares, legitimando suas independências, esses, por sua vez, depositaram um voto de confiança nos valdraks, tendo os ursares como mediadores desse tratado de cooperação drakariana.\nAssim foi iniciada a chamada 'Era dos Fracos', uma decadência tão grande que colapsou grande parte de sua sociedade, obrigando-os a se curvar aos vencedores, mas dividindo a opinião de seu povo entre os saudosistas da 'Era de Ouro Valdrak' e aqueles que desejam respeitar suas tradições e evoluírem, deixando o passado para trás. Humilhados, não possuíam outra escolha a não ser aprender com outras nações outras formas de poder. Através de uma repaginação da Faargala, outras culturas e sabedorias adentraram suas muralhas, assim como sua cultura pôde alcançar outras nações, renovando suas políticas opressoras para os novos tempos, trocando força bruta por estratégia.\nOs valdraks se espalham pelo mundo, movidos principalmente por sua Faargala e, consequentemente, renovam sua sociedade com novos saberes, despertando inclusive um interesse por sua própria história, observando nas ruínas o seu passado. Os filhos de Gruneak não costumam se amargurar com o passado caso sejam lembrados de suas derrotas, provavelmente exaltarão os vencedores, pois a única derrota definitiva é a morte, assim como seu Primogênito, Farkas, que foi derrotado apenas pelo Tempo."
    }
  },
  {
    "_id": "lg00130000000000",
    "name": "Vennéli",
    "type": "legacy",
    "img": "icons/equipment/shield/crest-shield-gold.svg",
    "legadoKey": "venneli",
    "folder": "fldlg00060000000",
    "_key": "!items!lg00130000000000",
    "system": {
      "name": "Vennéli",
      "height": "Entre 1,60m e 1,90 metros de altura.",
      "lifeExpectancy": "Vennélis podem viver até os 120 anos, sendo considerados adultos com 16 anos.",
      "appearance": "Símbolos vivos da ordem e do dever, carregam no sangue os ideais da sua deusa criadora, Anatael. São bastiões da justiça, protegendo o mundo, até dos próprios excessos. Sua pele é rígida, reflete a nobreza de sua jornada. Apresentando tonalidades que evocam metais nobres — cobalto, prata, platina, ouro ou cobre — em uma variedade de intensidades. Porém, não possuem o brilho ou a textura desses metais.\nComo dádiva para alcançarem os céus, Anatael os criou com mandalas místicas gravadas nas costas, inscrições divinas que lhes permitem manifestar um par de asas de energia.",
      "description": "Criados como soldados exemplares da ordem, vivem entre o paradoxo de suas asas livres e as algemas do dever. Sua sociedade é regida por tradições inflexíveis, fundamentada em uma justiça implacável, onde até os menores desvios são punidos com severidade. O progresso de seu povo é construído sobre o sacrifício das individualidades e dos sonhos pessoais, uma renúncia aceita sem questionamentos, pois tudo é considerado parte da vontade sagrada de sua criadora.\nSob a liderança da Juíza, sua missão original era uma cruzada implacável contra os conjuradores — especialmente os kahats'zas — um dever herdado desde os tempos da Primeira Cidade, Arba'shatrah. No entanto, com a queda da primeira Juíza, seus olhos se abriram para as complexidades do mundo. E agora, com a ascensão da segunda Juíza, os caminhos para uma justiça mais ampla se abriram, reconectando-os com o mundo e tornando seus princípios mais brandos e, por isso, mais respeitados.",
      "legacyAbilities": [
        {
          "name": "Ver a Verdade",
          "description": "Enquanto estiver tocando o corpo de um Alvo você poderá identificar se ele está mentindo ou não.",
          "actions": []
        },
        {
          "name": "Resplendor",
          "description": "Com a sua Ação Simples, você poderá desfazer as mandalas em suas costas, criando um par de asas etéreas, que lhe concedem Voar. Você poderá desfazer as asas com uma Ação Simples.",
          "actions": [
            {
              "id": "act_resplendor",
              "name": "Resplendor",
              "description": "Manifesta asas etéreas concedendo deslocamento de Voo. Desfeita com outra Ação Simples.",
              "cost": "",
              "type": {
                "actionType": "acaoSimples",
                "category": "utilidade",
                "tags": [
                  "voo",
                  "locomocao"
                ]
              },
              "attack": {
                "hasAttack": false
              },
              "damage": {
                "hasDamage": false
              },
              "healing": {
                "hasHealing": false
              },
              "condition": {
                "hasCondition": false
              },
              "check": {
                "hasCheck": false
              },
              "areaOfEffect": {
                "hasArea": false
              }
            }
          ]
        },
        {
          "name": "Toque da Salvação",
          "description": "Você pode tocar um Alvo Incapacitado, de modo que ele não precise mais rolar o Dado de Morte até a próxima vez que ele ficar Incapacitado.",
          "actions": []
        }
      ],
      "continente": "Vértonie",
      "altura": "Entre 1,60m e 1,90 metros de altura.",
      "expectativa_de_vida": "Vennélis podem viver até os 120 anos, sendo considerados adultos com 16 anos.",
      "aparencia": "Símbolos vivos da ordem e do dever, carregam no sangue os ideais da sua deusa criadora, Anatael. São bastiões da justiça, protegendo o mundo, até dos próprios excessos. Sua pele é rígida, reflete a nobreza de sua jornada. Apresentando tonalidades que evocam metais nobres — cobalto, prata, platina, ouro ou cobre — em uma variedade de intensidades. Porém, não possuem o brilho ou a textura desses metais.\nComo dádiva para alcançarem os céus, Anatael os criou com mandalas místicas gravadas nas costas, inscrições divinas que lhes permitem manifestar um par de asas de energia.",
      "descricao": "Criados como soldados exemplares da ordem, vivem entre o paradoxo de suas asas livres e as algemas do dever. Sua sociedade é regida por tradições inflexíveis, fundamentada em uma justiça implacável, onde até os menores desvios são punidos com severidade. O progresso de seu povo é construído sobre o sacrifício das individualidades e dos sonhos pessoais, uma renúncia aceita sem questionamentos, pois tudo é considerado parte da vontade sagrada de sua criadora.\nSob a liderança da Juíza, sua missão original era uma cruzada implacável contra os conjuradores — especialmente os kahats'zas — um dever herdado desde os tempos da Primeira Cidade, Arba'shatrah. No entanto, com a queda da primeira Juíza, seus olhos se abriram para as complexidades do mundo. E agora, com a ascensão da segunda Juíza, os caminhos para uma justiça mais ampla se abriram, reconectando-os com o mundo e tornando seus princípios mais brandos e, por isso, mais respeitados.",
      "origem": "A ausência do Tempo criou uma lacuna na própria história — eras tornaram-se milênios, milênios se dissolveram em segundos. Da solidão da Grande Mãe, surgiu uma existência dupla — Anatael e Kýria — filhas do amor que nunca recebeu, uma força fundamental para o caminho rumo ao eterno. Uma seria o alicerce da outra. Anatael, herdeira da compaixão protetora de Gaia, não pôde aceitar as ações ousadas de sua irmã, Kýria, que almejava poderes desconhecidos. Mesmo com o surgimento tardio de Exatir, o mediador divino, a cisão era inevitável. O primeiro ato de violência foi consumado, e a origem do mundo foi manchada para sempre. Para restaurar a ordem no Plano Mortal, a Bastiã da Justiça criou os vennélis, sublimes seres alados com pele semelhante a metais nobres, forjados no ideal inquebrantável da ordem. Sob a liderança de seu Primogênito, Anthariel, tornaram-se os guardiões da vontade de Anatael.\nMas mesmo os mais puros podem ser seduzidos. Ludibriados pelos tempos de paz, os vennélis se aproximaram dos outros povos e, ao contato com os kahats'zas, foram tocados pelas fagulhas da liberdade e da curiosidade que o Véu despertava. Quando a revolta engoliu Arba'shatrah, os vennélis foram convocados a defender a Torre dos Imortais. Ali, diante de tanta dor e sofrimento, enfrentaram aqueles com quem haviam partilhado sonhos e esperanças. Suas alvas asas foram tingidas de sangue. Destroçados pela dor, alguns desertaram, incapazes de sustentar o fardo da culpa.\nQuando a poeira da queda finalmente assentou, uma vennéli se ergueu: Ankalyel, que, em meio às ruínas, ergueu sua voz como símbolo da ordem no Plano Mortal. Reuniu seus irmãos e marchou em direção ao que viria a ser Vértonie, determinada a purgar seus inimigos declarados. Para ela, os culpados eram claros: aqueles que manipulavam o Véu. O desprezo pelos kahats'zas cresceu como chama viva — em seus olhos, eram responsáveis pela mácula, pela criação dos Shatraqs e pela ruína do mundo. Mesmo após inúmeros alertas, os kahats'zas insistiam em seguir sua arte nefasta, e para Ankalyel, apenas sua extinção poderia purificar o mundo.",
      "tradicoes": "A sociedade vennélica é uma teocracia solene, governada pela Juíza, que guia seu povo através dos ensinamentos de sua criadora, Anatael, a Bastiã da Justiça. Toda a estrutura social gira em torno de sua presença: quanto mais próxima ao Palácio de Prata, no coração da ilha central, mais alta é a posição da família. Apesar da hierarquia, a desigualdade é condenada como soberba, e sua população vive com dignidade. A partilha de bens é incentivada como expressão de virtude: apenas a fé em Anatael deve ser almejada. Nesse espírito, distribuem-se alimento e recursos, mantendo a harmonia entre o povo e o sagrado.\nA transição para a vida adulta é marcada pelo Caminho dos Justos, um rito de iniciação profundo e transformador. Ao completarem 10 anos, os vennélis de Vendrazus são confiados aos cuidados de um Paragão, um veterano exemplar. Juntos, partem em uma jornada por Auroria para testemunhar as sombras e as luzes do mundo — a fome, a injustiça, a tristeza, mas também a alegria, a beleza e o amor. O tempo de jornada é ditado pela maturidade moral do iniciado, e os mais virtuosos podem retornar para servir diretamente à Juíza.\nSeu patriotismo também se manifesta nos pequenos gestos cotidianos: sobre os telhados de suas casas, os vennélis deixam oferendas — comidas, bebidas, moedas — como demonstração de apoio às forças militares ou em orações à sua deusa. Acreditam que, por estarem abertos ao céu, os telhados são o caminho mais direto para que as oferendas alcancem os justos — ou, às vezes, se tornem brincadeiras inocentes de crianças travessas.\nSeus ritos funerários são solenes e pacíficos. Durante três dias, o povo presta seus respeitos, e não é permitido chorar, pois as lágrimas devem ser derramadas apenas pelos pecadores e suas existências corrompidas. No primeiro dia, o corpo é purificado com ervas e flores. No segundo, ocorre o velório, onde amigos e familiares exaltam os feitos e as virtudes do falecido. No terceiro dia, um oficial alça voo com o corpo em seus braços, permitindo que o finado sinta, uma última vez, a liberdade dos céus, antes de seu sepultamento.",
      "no_mundo": "Durante os dias sombrios da Ruptura, a segunda Juíza surgiu como avatar de Anatael, unindo os povos contra a tirania de Keldanas e os Shatraqs. Após a batalha, movida pela necessidade de impedir que tal calamidade voltasse a acontecer, a Juíza se uniu ao novo rei humano, Asgalok Ybaria I — os antigos avatares de seus deuses — criando a Inquisição Escarlate. A fama dos vennélis nunca foi estável, oscilando em tempos de guerra e paz. Com frequência são encontrados em Vértonie e Drunar, onde suas convicções são, por vezes temidas tanto quanto respeitadas. O mundo moderno os vê como portadores de uma moral inflexível, enraizada em tempos que muitos desejam esquecer — uma percepção que aflige especialmente os jovens vennélis que ousam abandonar Vendrazus ou rejeitar os preceitos de seu povo.\nMesmo com a liderança mais ponderada da segunda Juíza, e com o perdão parcial concedido aos kahats'zas após a Ruptura, os votos dos vennélis permanecem intactos: lutar contra as práticas da conjuração. Não se trata mais de ignorância — os vennélis sabem que os herdeiros de Kýria não desejam a destruição, mas veem neles almas perdidas, sedentas por redenção. E, na visão dos mais tradicionalistas, essa redenção só pode vir pela espada.\nTalvez essa guerra jamais termine. Apesar dos clamores de paz vindos de ambos os povos, o passado sangra no presente. Essa postura firme, por vezes fanática, também se reflete nas relações com outras nações de tradição mágica, como Idoll'Shalar, as Academias Themarianas, Kraun'gar, o Império Narzepiano e Noctúrnia, por exemplo.",
      "nomes_comuns_origem": [
        "Ankari",
        "Azrael",
        "Sabrathan",
        "Sankir",
        "Sybil",
        "Zahall"
      ],
      "abilities": [
        "hl00370000000000",
        "hl00380000000000",
        "hl00390000000000"
      ],
      "origin": "A ausência do Tempo criou uma lacuna na própria história — eras tornaram-se milênios, milênios se dissolveram em segundos. Da solidão da Grande Mãe, surgiu uma existência dupla — Anatael e Kýria — filhas do amor que nunca recebeu, uma força fundamental para o caminho rumo ao eterno. Uma seria o alicerce da outra. Anatael, herdeira da compaixão protetora de Gaia, não pôde aceitar as ações ousadas de sua irmã, Kýria, que almejava poderes desconhecidos. Mesmo com o surgimento tardio de Exatir, o mediador divino, a cisão era inevitável. O primeiro ato de violência foi consumado, e a origem do mundo foi manchada para sempre. Para restaurar a ordem no Plano Mortal, a Bastiã da Justiça criou os vennélis, sublimes seres alados com pele semelhante a metais nobres, forjados no ideal inquebrantável da ordem. Sob a liderança de seu Primogênito, Anthariel, tornaram-se os guardiões da vontade de Anatael.\nMas mesmo os mais puros podem ser seduzidos. Ludibriados pelos tempos de paz, os vennélis se aproximaram dos outros povos e, ao contato com os kahats'zas, foram tocados pelas fagulhas da liberdade e da curiosidade que o Véu despertava. Quando a revolta engoliu Arba'shatrah, os vennélis foram convocados a defender a Torre dos Imortais. Ali, diante de tanta dor e sofrimento, enfrentaram aqueles com quem haviam partilhado sonhos e esperanças. Suas alvas asas foram tingidas de sangue. Destroçados pela dor, alguns desertaram, incapazes de sustentar o fardo da culpa.\nQuando a poeira da queda finalmente assentou, uma vennéli se ergueu: Ankalyel, que, em meio às ruínas, ergueu sua voz como símbolo da ordem no Plano Mortal. Reuniu seus irmãos e marchou em direção ao que viria a ser Vértonie, determinada a purgar seus inimigos declarados. Para ela, os culpados eram claros: aqueles que manipulavam o Véu. O desprezo pelos kahats'zas cresceu como chama viva — em seus olhos, eram responsáveis pela mácula, pela criação dos Shatraqs e pela ruína do mundo. Mesmo após inúmeros alertas, os kahats'zas insistiam em seguir sua arte nefasta, e para Ankalyel, apenas sua extinção poderia purificar o mundo.",
      "traditions": "A sociedade vennélica é uma teocracia solene, governada pela Juíza, que guia seu povo através dos ensinamentos de sua criadora, Anatael, a Bastiã da Justiça. Toda a estrutura social gira em torno de sua presença: quanto mais próxima ao Palácio de Prata, no coração da ilha central, mais alta é a posição da família. Apesar da hierarquia, a desigualdade é condenada como soberba, e sua população vive com dignidade. A partilha de bens é incentivada como expressão de virtude: apenas a fé em Anatael deve ser almejada. Nesse espírito, distribuem-se alimento e recursos, mantendo a harmonia entre o povo e o sagrado.\nA transição para a vida adulta é marcada pelo Caminho dos Justos, um rito de iniciação profundo e transformador. Ao completarem 10 anos, os vennélis de Vendrazus são confiados aos cuidados de um Paragão, um veterano exemplar. Juntos, partem em uma jornada por Auroria para testemunhar as sombras e as luzes do mundo — a fome, a injustiça, a tristeza, mas também a alegria, a beleza e o amor. O tempo de jornada é ditado pela maturidade moral do iniciado, e os mais virtuosos podem retornar para servir diretamente à Juíza.\nSeu patriotismo também se manifesta nos pequenos gestos cotidianos: sobre os telhados de suas casas, os vennélis deixam oferendas — comidas, bebidas, moedas — como demonstração de apoio às forças militares ou em orações à sua deusa. Acreditam que, por estarem abertos ao céu, os telhados são o caminho mais direto para que as oferendas alcancem os justos — ou, às vezes, se tornem brincadeiras inocentes de crianças travessas.\nSeus ritos funerários são solenes e pacíficos. Durante três dias, o povo presta seus respeitos, e não é permitido chorar, pois as lágrimas devem ser derramadas apenas pelos pecadores e suas existências corrompidas. No primeiro dia, o corpo é purificado com ervas e flores. No segundo, ocorre o velório, onde amigos e familiares exaltam os feitos e as virtudes do falecido. No terceiro dia, um oficial alça voo com o corpo em seus braços, permitindo que o finado sinta, uma última vez, a liberdade dos céus, antes de seu sepultamento.",
      "inWorld": "Durante os dias sombrios da Ruptura, a segunda Juíza surgiu como avatar de Anatael, unindo os povos contra a tirania de Keldanas e os Shatraqs. Após a batalha, movida pela necessidade de impedir que tal calamidade voltasse a acontecer, a Juíza se uniu ao novo rei humano, Asgalok Ybaria I — os antigos avatares de seus deuses — criando a Inquisição Escarlate. A fama dos vennélis nunca foi estável, oscilando em tempos de guerra e paz. Com frequência são encontrados em Vértonie e Drunar, onde suas convicções são, por vezes temidas tanto quanto respeitadas. O mundo moderno os vê como portadores de uma moral inflexível, enraizada em tempos que muitos desejam esquecer — uma percepção que aflige especialmente os jovens vennélis que ousam abandonar Vendrazus ou rejeitar os preceitos de seu povo.\nMesmo com a liderança mais ponderada da segunda Juíza, e com o perdão parcial concedido aos kahats'zas após a Ruptura, os votos dos vennélis permanecem intactos: lutar contra as práticas da conjuração. Não se trata mais de ignorância — os vennélis sabem que os herdeiros de Kýria não desejam a destruição, mas veem neles almas perdidas, sedentas por redenção. E, na visão dos mais tradicionalistas, essa redenção só pode vir pela espada.\nTalvez essa guerra jamais termine. Apesar dos clamores de paz vindos de ambos os povos, o passado sangra no presente. Essa postura firme, por vezes fanática, também se reflete nas relações com outras nações de tradição mágica, como Idoll'Shalar, as Academias Themarianas, Kraun'gar, o Império Narzepiano e Noctúrnia, por exemplo."
    }
  },
  {
    "_id": "lg00140000000000",
    "name": "Yuansu",
    "type": "legacy",
    "img": "icons/skills/trades/academics-book-study.svg",
    "legadoKey": "yuansu",
    "folder": "fldlg00050000000",
    "_key": "!items!lg00140000000000",
    "system": {
      "name": "Yuansu",
      "height": "Entre 1,50 m e 1,80 metros de altura.",
      "lifeExpectancy": "Yuansus podem viver até os 120 anos, sendo considerados adultos com 18 anos.",
      "appearance": "Intocados, ilustres, serenos - sua pele de porcelana e cabelos de seda encarnam o que há de mais sublime. Sua pele reflete os tons pálidos do firmamento: o branco, o azul ou o lilás. Seus rostos possuem traços finos e delicados e suas cabeças são adornadas por pequenos chifres, semelhantes aos de cervos.\nUm de seus olhos possui uma tonalidade castanha, preta, verde, azul ou lilás, enquanto o outro apresenta uma cor distinta, mais vibrante e luminosa, podendo possuir qualquer tonalidade, incluindo tons exóticos, como o dourado, o prateado ou até mesmo tons perolados.",
      "description": "As grandiosas expectativas de seu criador, Laofeng, repousam nos ombros desse povo como pesadas correntes. Na busca constante de serem a melhor versão de si mesmos, não há espaço para erros ou desculpas. Todos saúdem o Imperador! Que todos abracem a herança selada para os belos e os puros, para que, ao fim de suas jornadas, repousem em glória, envoltos em mortalhas adornadas com as marcas de suas conquistas.\nO povo yuansani é disciplinado, guiado pelo pragmatismo e, em muitos aspectos, inflexível quanto às suas crenças e tradições. É impensável a um yuansu a possibilidade de manchar a honra e a reputação de seu povo. Sua rigidez moral emana tanto de seu criador quanto de suas próprias expectativas, conduzindo-os a uma posição exemplar - forjada dia após dia, sem atalhos, sem truques. A perfeição que almejam jamais foi o destino final, mas sim o caminho que trilham.",
      "legacyAbilities": [
        {
          "name": "Elevar a Grandeza",
          "description": "Você pode levitar a até 30 centímetros da superfície sólida atual. Você pode utilizar a sua Movimentação enquanto estiver levitando, ignorando também locais com Terreno Difícil.",
          "actions": []
        },
        {
          "name": "Dinastia Narzepiana",
          "description": "Os seus Parâmetros não poderão ser reduzidos por efeitos de Habilidades de Caminho e Características.",
          "actions": []
        },
        {
          "name": "Poder Oculto",
          "description": "Enquanto estiver em combate, você poderá refazer um teste de Parâmetro que tenha realizado, devendo ficar com o novo resultado. Essa habilidade só poderá ser utilizada uma vez por combate.",
          "actions": [
            {
              "id": "act_poder_oculto",
              "name": "Poder Oculto",
              "description": "Em combate, permite re-rolar um teste de Parâmetro realizado (1x por combate).",
              "cost": "",
              "type": {
                "actionType": "reacao",
                "category": "suporte",
                "tags": [
                  "reroll",
                  "combate"
                ]
              },
              "attack": {
                "hasAttack": false
              },
              "damage": {
                "hasDamage": false
              },
              "healing": {
                "hasHealing": false
              },
              "condition": {
                "hasCondition": false
              },
              "check": {
                "hasCheck": false
              },
              "areaOfEffect": {
                "hasArea": false
              }
            }
          ]
        }
      ],
      "continente": "Narzepion",
      "altura": "Entre 1,50 m e 1,80 metros de altura.",
      "expectativa_de_vida": "Yuansus podem viver até os 120 anos, sendo considerados adultos com 18 anos.",
      "aparencia": "Intocados, ilustres, serenos - sua pele de porcelana e cabelos de seda encarnam o que há de mais sublime. Sua pele reflete os tons pálidos do firmamento: o branco, o azul ou o lilás. Seus rostos possuem traços finos e delicados e suas cabeças são adornadas por pequenos chifres, semelhantes aos de cervos.\nUm de seus olhos possui uma tonalidade castanha, preta, verde, azul ou lilás, enquanto o outro apresenta uma cor distinta, mais vibrante e luminosa, podendo possuir qualquer tonalidade, incluindo tons exóticos, como o dourado, o prateado ou até mesmo tons perolados.",
      "descricao": "As grandiosas expectativas de seu criador, Laofeng, repousam nos ombros desse povo como pesadas correntes. Na busca constante de serem a melhor versão de si mesmos, não há espaço para erros ou desculpas. Todos saúdem o Imperador! Que todos abracem a herança selada para os belos e os puros, para que, ao fim de suas jornadas, repousem em glória, envoltos em mortalhas adornadas com as marcas de suas conquistas.\nO povo yuansani é disciplinado, guiado pelo pragmatismo e, em muitos aspectos, inflexível quanto às suas crenças e tradições. É impensável a um yuansu a possibilidade de manchar a honra e a reputação de seu povo. Sua rigidez moral emana tanto de seu criador quanto de suas próprias expectativas, conduzindo-os a uma posição exemplar - forjada dia após dia, sem atalhos, sem truques. A perfeição que almejam jamais foi o destino final, mas sim o caminho que trilham.",
      "origem": "'Nada é perfeito.' Essa simples frase martelava a mente de Laofeng. Sempre a achara um absurdo e, na tentativa de contradizê-la, criou e recriou infinitas vezes o seu Legado. Contudo, falhava em todas as tentativas - não por falta de habilidade, mas sim por ser impossível, até mesmo para uma divindade, desafiar a inalcançável perfeição. Quando enfim se deu por satisfeito, a mais bela das criaturas tomou forma diante de seus olhos: sua Primogênita definitiva, Bai Nuo. Tamanha foi a alegria da divindade que a presenteou com um raro vislumbre - o reflexo do momento da própria criação - gravando para sempre esse sentimento em um de seus olhos. Outros seres semelhantes a Bai Nuo emergiram, nomeados de yuansu, mas nenhum ostentava beleza comparável à da Primogênita. Sua perfeição despertava tanto a admiração quanto a inveja entre os recém-criados, que a contemplavam como o ideal absoluto.\nDesde a primeira batalha na guerra de Arba'shatrah, os yuansus auxiliaram os deuses a manter a ordem. Seus movimentos, belos e delicados como uma dança, eram também mortais trazendo equilíbrio ao campo de batalha ao subjugar os rebeldes. Bai Nuo era implacável, derrotando muitos com um movimento sutil de sua espada encontrando um oponente à altura apenas em Gaambatar, o Primogênito zaokan. Triunfante em seu duelo, Bai Nuo rendera os zaokans rebeldes, intimidando-os com a cabeça decepada de Gaambatar, enquanto autoproclamava-se a Imperatriz de Sangue. Posteriormente, o poder de Bai Nuo, seria uma das inspirações usadas para desenvolver a Magia de Sangue dos Shatraqs.\nA Primogênita marchou sozinha em direção ao nordeste, onde, futuramente, estaria Narzepion. Ao olhar para trás, todos os seus semelhantes e muitos outros - seguiam-na cegamente, admirados pelo seu poder e sua beleza. Durante a fundação da capital de seu Império, Yuankan, Bai Nuo escolheu o mais ilustre entre seus generais, tomando-o como esposo e perpetuando a sua linhagem inquestionável e imutável de Imperadores.",
      "tradicoes": "Acima de tudo e todos, o Imperador - ou a Imperatriz - reina com mão de ferro. Um harém lhe serve, e apenas os descendentes mais ilustres têm a honra de serem elevados à condição de herdeiros. Assim como o trono, que se ergue com base no mérito, a sociedade yuansani é construída sobre os alicerces da meritocracia, onde as conquistas pessoais superam as riquezas materiais, especialmente aquelas conquistadas a serviço do Imperador. Ao restante do povo, resta viver uma vida digna e impotente, já que pouquíssimos conseguem superar as expectativas e se tornar cidadãos dignos da atenção do Imperador ou de seus subordinados.\nO povo yuansani presa pela integridade de seus corpos, evitando a maquiagem excessiva, tatuagens, grandes adornos ou qualquer marca que possa perturbar a pureza de sua pele. Para preservar essa harmonia, frequentemente levitam, para evitar tocar o solo, repousando apenas em lugares que lhes tragam conforto e serenidade. Os yuansus costumam esconder sua beleza atrás de máscaras sobretudo na presença de membros da família real ou de seus agentes demonstrando subserviência e a união no Império, pois apenas à realeza é permitido possuir individualidades estéticas.\nAqueles que transgridem as leis ou desonram a sociedade yuansani - especialmente a família real - devem arcar com as consequências de seus atos, submetendo-se à Marca Perpétua. O criminoso tem o seu rosto marcado por lâminas afiadas, e seu próprio sangue é usado para tingir seus cabelos. É-lhe proibido esconder as cicatrizes atrás de máscaras ou qualquer outro adereço. O ritual é executado por algum familiar do transgressor e supervisionado por um agente imperial. As pessoas marcadas são segregadas, suas opções sendo o exílio ou reconquistar sua honra a serviço do Império para, talvez, redimir-se e ter suas marcas misticamente apagadas.\nO presente de Laofeng para Bai Nuo foi herdado por todos os yuansus: seu nascimento sempre é tranquilo e seguro, pois mãe e filho são acalmados pela vontade de seu criador. Um dos olhos do recém-nascido, porém, adquire uma tonalidade diferente e um fraco brilho, que se intensifica ao longo das suas vidas. Na hora de sua morte, a dor lhes é anestesiada, mantendo seu coração e mente reconfortados por seus sonhos, amores, conquistas e alegrias adquiridas em vida. Nesse processo, vívida cor e o brilho de seu olho se esvaem, tornando-se opaco.",
      "no_mundo": "Em contraste com sua severidade e arrogância, quando envolvidos em assuntos de grande importância, emanam uma aura leve e graciosa paradoxo que lhes rendeu o epíteto de 'belos nefastos'. Estabeleceram embaixadas em cada grande capital do mundo, até mesmo em Vértonie, na capital vennélica - Vendrazus. Por outro lado, não aceitam facilmente estrangeiros. Enquanto estiverem no seu território, estrangeiros devem utilizar túnicas vermelhas. Além disso, o comércio com outras nações normalmente é realizado fora de seus territórios. Pouquíssimos comerciantes recebem a oportunidade de adentrar o Império Yuansani.\nPossuem ótimo relacionamento com seikos e inaris, que cumprem papéis fundamentais no continente. Contudo, mesmo eles possuem limitações acerca de viver dentro das muralhas da capital Yuankan, sendo obrigados a utilizar túnicas púrpuras. Ao mesmo tempo, a guerra fria milenar entre zaokans e yuansus segue crescendo nos corações de ambos os povos, que convivem sob riscos constantes de uma nova guerra civil.\nApós a Ruptura, algumas regras foram afrouxadas, permitindo que yuansus se aventurassem pelo mundo e compreendessem a necessidade dos dogmas de sua sociedade, pois eles os protegem dos perigos do mundo, ou, pelo menos, é nisso que o Imperador quer que seu povo acredite. Yuansus encontrados longe de Narzepion, geralmente, estão em missões oficiais do Império ou adquirindo novas tecnologias. Existe também uma parcela de yuansus exilados ou que decidiram fugir de sua terra natal - não que haja diferença, já que dificilmente seriam recebidos de braços abertos por seu povo.",
      "nomes_comuns_origem": [
        "Haoran",
        "Jin-wo",
        "Lan-wei",
        "Xiang",
        "Zhang",
        "Zhihao"
      ],
      "abilities": [
        "hl003a0000000000",
        "hl003b0000000000",
        "hl003c0000000000"
      ],
      "origin": "'Nada é perfeito.' Essa simples frase martelava a mente de Laofeng. Sempre a achara um absurdo e, na tentativa de contradizê-la, criou e recriou infinitas vezes o seu Legado. Contudo, falhava em todas as tentativas - não por falta de habilidade, mas sim por ser impossível, até mesmo para uma divindade, desafiar a inalcançável perfeição. Quando enfim se deu por satisfeito, a mais bela das criaturas tomou forma diante de seus olhos: sua Primogênita definitiva, Bai Nuo. Tamanha foi a alegria da divindade que a presenteou com um raro vislumbre - o reflexo do momento da própria criação - gravando para sempre esse sentimento em um de seus olhos. Outros seres semelhantes a Bai Nuo emergiram, nomeados de yuansu, mas nenhum ostentava beleza comparável à da Primogênita. Sua perfeição despertava tanto a admiração quanto a inveja entre os recém-criados, que a contemplavam como o ideal absoluto.\nDesde a primeira batalha na guerra de Arba'shatrah, os yuansus auxiliaram os deuses a manter a ordem. Seus movimentos, belos e delicados como uma dança, eram também mortais trazendo equilíbrio ao campo de batalha ao subjugar os rebeldes. Bai Nuo era implacável, derrotando muitos com um movimento sutil de sua espada encontrando um oponente à altura apenas em Gaambatar, o Primogênito zaokan. Triunfante em seu duelo, Bai Nuo rendera os zaokans rebeldes, intimidando-os com a cabeça decepada de Gaambatar, enquanto autoproclamava-se a Imperatriz de Sangue. Posteriormente, o poder de Bai Nuo, seria uma das inspirações usadas para desenvolver a Magia de Sangue dos Shatraqs.\nA Primogênita marchou sozinha em direção ao nordeste, onde, futuramente, estaria Narzepion. Ao olhar para trás, todos os seus semelhantes e muitos outros - seguiam-na cegamente, admirados pelo seu poder e sua beleza. Durante a fundação da capital de seu Império, Yuankan, Bai Nuo escolheu o mais ilustre entre seus generais, tomando-o como esposo e perpetuando a sua linhagem inquestionável e imutável de Imperadores.",
      "traditions": "Acima de tudo e todos, o Imperador - ou a Imperatriz - reina com mão de ferro. Um harém lhe serve, e apenas os descendentes mais ilustres têm a honra de serem elevados à condição de herdeiros. Assim como o trono, que se ergue com base no mérito, a sociedade yuansani é construída sobre os alicerces da meritocracia, onde as conquistas pessoais superam as riquezas materiais, especialmente aquelas conquistadas a serviço do Imperador. Ao restante do povo, resta viver uma vida digna e impotente, já que pouquíssimos conseguem superar as expectativas e se tornar cidadãos dignos da atenção do Imperador ou de seus subordinados.\nO povo yuansani presa pela integridade de seus corpos, evitando a maquiagem excessiva, tatuagens, grandes adornos ou qualquer marca que possa perturbar a pureza de sua pele. Para preservar essa harmonia, frequentemente levitam, para evitar tocar o solo, repousando apenas em lugares que lhes tragam conforto e serenidade. Os yuansus costumam esconder sua beleza atrás de máscaras sobretudo na presença de membros da família real ou de seus agentes demonstrando subserviência e a união no Império, pois apenas à realeza é permitido possuir individualidades estéticas.\nAqueles que transgridem as leis ou desonram a sociedade yuansani - especialmente a família real - devem arcar com as consequências de seus atos, submetendo-se à Marca Perpétua. O criminoso tem o seu rosto marcado por lâminas afiadas, e seu próprio sangue é usado para tingir seus cabelos. É-lhe proibido esconder as cicatrizes atrás de máscaras ou qualquer outro adereço. O ritual é executado por algum familiar do transgressor e supervisionado por um agente imperial. As pessoas marcadas são segregadas, suas opções sendo o exílio ou reconquistar sua honra a serviço do Império para, talvez, redimir-se e ter suas marcas misticamente apagadas.\nO presente de Laofeng para Bai Nuo foi herdado por todos os yuansus: seu nascimento sempre é tranquilo e seguro, pois mãe e filho são acalmados pela vontade de seu criador. Um dos olhos do recém-nascido, porém, adquire uma tonalidade diferente e um fraco brilho, que se intensifica ao longo das suas vidas. Na hora de sua morte, a dor lhes é anestesiada, mantendo seu coração e mente reconfortados por seus sonhos, amores, conquistas e alegrias adquiridas em vida. Nesse processo, vívida cor e o brilho de seu olho se esvaem, tornando-se opaco.",
      "inWorld": "Em contraste com sua severidade e arrogância, quando envolvidos em assuntos de grande importância, emanam uma aura leve e graciosa paradoxo que lhes rendeu o epíteto de 'belos nefastos'. Estabeleceram embaixadas em cada grande capital do mundo, até mesmo em Vértonie, na capital vennélica - Vendrazus. Por outro lado, não aceitam facilmente estrangeiros. Enquanto estiverem no seu território, estrangeiros devem utilizar túnicas vermelhas. Além disso, o comércio com outras nações normalmente é realizado fora de seus territórios. Pouquíssimos comerciantes recebem a oportunidade de adentrar o Império Yuansani.\nPossuem ótimo relacionamento com seikos e inaris, que cumprem papéis fundamentais no continente. Contudo, mesmo eles possuem limitações acerca de viver dentro das muralhas da capital Yuankan, sendo obrigados a utilizar túnicas púrpuras. Ao mesmo tempo, a guerra fria milenar entre zaokans e yuansus segue crescendo nos corações de ambos os povos, que convivem sob riscos constantes de uma nova guerra civil.\nApós a Ruptura, algumas regras foram afrouxadas, permitindo que yuansus se aventurassem pelo mundo e compreendessem a necessidade dos dogmas de sua sociedade, pois eles os protegem dos perigos do mundo, ou, pelo menos, é nisso que o Imperador quer que seu povo acredite. Yuansus encontrados longe de Narzepion, geralmente, estão em missões oficiais do Império ou adquirindo novas tecnologias. Existe também uma parcela de yuansus exilados ou que decidiram fugir de sua terra natal - não que haja diferença, já que dificilmente seriam recebidos de braços abertos por seu povo."
    }
  },
  {
    "_id": "lg00150000000000",
    "name": "Zaokan",
    "type": "legacy",
    "img": "icons/skills/melee/strike-sword-blood-red.svg",
    "legadoKey": "zaokan",
    "folder": "fldlg00050000000",
    "_key": "!items!lg00150000000000",
    "system": {
      "name": "Zaokan",
      "height": "Entre 1,70 m e 2,20 metros de altura.",
      "lifeExpectancy": "Zaokans podem viver até os 130 anos, sendo considerados adultos com 16 anos.",
      "appearance": "Seus olhos refletem o vazio - a esclera de seus olhos é completamente negra, como o manto escuro do universo; enquanto suas írises herdam a cor de sua pele, que pode ser vermelha, verde, branca, cinza ou azul - cores vivas e vibrantes, mas que empalidecem conforme envelhecem. Sua pele também pode apresentar pequenas crostas endurecidas, semelhantes a rochas, especialmente nos seus rostos, ombros e coxas.\nPossuem também um par de chifres protuberantes a partir de sua testa, nos mais variados formatos, mas sempre apontando para trás, formando uma figura imponente e poderosa.",
      "description": "Os ideais desse povo foram forjados em resposta à opressão sofrida e, uma vez livres, juraram nunca mais se curvarem a ninguém. Ríspidos e brutais, os zaokans estão dispostos a sacrificar tudo para garantir a autonomia de seu povo, até mesmo a sua honra. Atos isolados lhes deram a reputação de violentos, sem misericórdia ou arrependimentos, pois um inimigo público é necessário para distrair o mundo de outras ameaças, mais ocultas e manipulativas. Os zaokans abraçaram essa fama, pois é melhor ser temido do que escravizado.\nO mundo não está a seu favor - e há razões para isso. Cada gesto seu é vigiado por olhos cruéis, sempre dispostos a julgar o todo pelos deslizes de poucos. Todo zaokan deveria ter o direito de escolher seu próprio caminho, de retornar às suas origens. Mas tal destino lhes foi negado. Restam-lhes, então, duas trilhas: uma vida consumida pelo medo ou uma existência moldada pela rebeldia - lutando, passo a passo, para reconquistar o direito de andar de cabeça erguida, lado a lado com os demais povos.",
      "legacyAbilities": [
        {
          "name": "Corpo Fechado",
          "description": "A regra de COMIDA, BEBIDA E DESCANSO é modificada para você, de modo que você ganhe 1 ponto de Exaustão Temporária a cada 48 horas, ao invés de 24 horas. Você também possui o dobro dos valores base da regra de Fôlego.",
          "actions": []
        },
        {
          "name": "Superar a Dor",
          "description": "Você remove 1 ponto adicional de Exaustão, sempre que concluir um Repouso Completo.",
          "actions": []
        },
        {
          "name": "Furor das Brumas",
          "description": "Ao chegar a zero, ou menos, Pontos de Vida, você ainda poderá agir normalmente, não sendo afetado pelos efeitos de Incapacitado. Para todos os efeitos, considere que você não esteja Incapacitado. Você ainda recebe o ponto de Exaustão por ter ficado Incapacitado, como também recebe Pontos de Vida Negativos, devendo rolar o Dado de Morte nos seus turnos enquanto permanecer com zero, ou menos, Pontos de Vida.",
          "actions": []
        }
      ],
      "continente": "Narzepion",
      "altura": "Entre 1,70 m e 2,20 metros de altura.",
      "expectativa_de_vida": "Zaokans podem viver até os 130 anos, sendo considerados adultos com 16 anos.",
      "aparencia": "Seus olhos refletem o vazio - a esclera de seus olhos é completamente negra, como o manto escuro do universo; enquanto suas írises herdam a cor de sua pele, que pode ser vermelha, verde, branca, cinza ou azul - cores vivas e vibrantes, mas que empalidecem conforme envelhecem. Sua pele também pode apresentar pequenas crostas endurecidas, semelhantes a rochas, especialmente nos seus rostos, ombros e coxas.\nPossuem também um par de chifres protuberantes a partir de sua testa, nos mais variados formatos, mas sempre apontando para trás, formando uma figura imponente e poderosa.",
      "descricao": "Os ideais desse povo foram forjados em resposta à opressão sofrida e, uma vez livres, juraram nunca mais se curvarem a ninguém. Ríspidos e brutais, os zaokans estão dispostos a sacrificar tudo para garantir a autonomia de seu povo, até mesmo a sua honra. Atos isolados lhes deram a reputação de violentos, sem misericórdia ou arrependimentos, pois um inimigo público é necessário para distrair o mundo de outras ameaças, mais ocultas e manipulativas. Os zaokans abraçaram essa fama, pois é melhor ser temido do que escravizado.\nO mundo não está a seu favor - e há razões para isso. Cada gesto seu é vigiado por olhos cruéis, sempre dispostos a julgar o todo pelos deslizes de poucos. Todo zaokan deveria ter o direito de escolher seu próprio caminho, de retornar às suas origens. Mas tal destino lhes foi negado. Restam-lhes, então, duas trilhas: uma vida consumida pelo medo ou uma existência moldada pela rebeldia - lutando, passo a passo, para reconquistar o direito de andar de cabeça erguida, lado a lado com os demais povos.",
      "origem": "Aquele que antes era conhecido como o deus do Heroísmo e da Bravura, Kalgoras, era admirado por todos em Arba'shatrah. Quando a existência de Athranamad foi revelada, a deusa Anatael ordenou a Kalgoras que o destruísse. Contudo, a influência da Dúvida, presente em Athranamad, fora subestimada e assim como todos que são tocados por ela, Kalgoras também cedeu aos seus sussurros: sua missão era aniquilar um de seus irmãos, algo que nunca antes sequer imaginara. Isso o fez se questionar sobre a autoridade divina de Anatael. Incapaz de destruir Athranamad, Kalgoras decidiu fragmentá-lo e esconder cada um de seus fragmentos do mundo. Mas, talvez por compaixão, guardou consigo uma dessas partes.\nKalgoras já havia criado seu Legado - os zaokans - com o intuito de inspirar e preservar a ordem na primeira cidade, mas, devido à conexão com seu criador, tornaram-se cada vez mais violentos, em busca de sua liberdade. Os zaokans, no seu ímpeto destrutivo, inauguraram a primeira guerra auroriana, enquanto Kalgoras se tornava cada vez mais alheio ao desespero, a ponto de sentir prazer na catástrofe. Ao abandonar suas virtudes, criador e criação abraçaram a destruição.\nApós Bai Nuo, a Primogênita yuansu, realizar sua procissão sangrenta exibindo a cabeça do Primogênito zaokan, Gaambatar, ela ofereceu aos zaokans uma única chance de corrigir suas falhas: abandonar seu criador o que prontamente aceitaram. Os zaokans, naquele momento, não eram mais um símbolo de bravura nem de destruição, mas um povo sem esperanças. Novamente acorrentados, os zaokans foram escravizados e usados para construir o Império Yuansani. Após séculos, o povo zaokino suplicou o perdão de Kalgoras, pois ele nunca esteve errado no seu ímpeto de quebrar as correntes da tirania, e, durante a Era Dourada, os zaokans fugiram para o norte de Narzepion, conquistando seu próprio lar longe da tirania do povo yuansu.",
      "tradicoes": "A história do povo zaokino os fez abominar a tirania e a escravidão, mas não os livrou de serem predatórios contra outras nações. Sua sociedade é composta de cidadãos livres, sem um governo centralizado ou nobreza. As mulheres zaokinas geralmente ocupam posições de liderança, principalmente no exército e nas fábricas, constituindo uma sociedade fundamentalmente matriarcal. Após eras sob o controle do Império Yuansani, os zaokans conquistaram o direito de possuir uma liderança legítima aos olhos de Narzepion e do mundo, pois antes eram vistos apenas como um agrupamento de criminosos, não uma nação de fato. Essa líder é chamada de Matriarca, sendo escolhida através de eleições populares.\nOs zaokans veem o poder como algo fundamental para sua sobrevivência, não dando muito sentido à palavra misericórdia. Esse povo, contudo, possui um conceito peculiar de honra: subestimar seu oponente é o mesmo que desonrá-lo e humilhá-lo. Independente do conflito, é fundamental utilizar todos os meios disponíveis para alcançar a vitória, sem medir esforços, até mesmo utilizando métodos considerados injustos. Isso não significa que todo e qualquer conflito resultará em morte, mas, caso aconteça, desde que os envolvidos não quebrem essa tradição, ambos serão considerados vencedores.\nA máxima 'a morte teme os destemidos' define muito bem os valores zaokinos. A morte por uma causa é glorificada - não porque busquem seu fim, mas, se ele vier, que seja carregado de significado. Tal pensamento fundamenta seus campos de treinamento talvez os mais exigentes e brutais do mundo. A partir de seus 7 anos, jovens zaokans podem se alistar no Exército Revolucionário, que promove a libertação total do povo zaokino e a queda do Império Yuansani. Poucos sobrevivem ao treinamento de elite, mas, sobrevivam ou não, seus nomes são gravados com honra nos registros de seu povo.\nDurante a virada de ano, os zaokans comemoram o Dia da Libertação, comemoração originada na sua emancipação, mesmo que parcial, do Império Yuansani, em 412 n.A., quando o Imperador assinou um decreto reconhecendo Uldara como um estado vassalo, garantindo-lhes direitos limitados, como uma nacionalidade própria e o reconhecimento de um líder. Ainda que a cidade continue subordinada ao Império, esse foi o primeiro passo em direção à liberdade de seu povo.",
      "no_mundo": "Os zaokans criaram fortes laços com os seikos do Templo do Inverno, que intercedem pelos zaokans, ajudando-os a conquistar o direito de se unirem ao Conselho das Brumas. Sua amizade com os seikos nortenhos gerou certa abertura com o povo inárico, estabelecendo relações mornas, enquanto os atritos históricos com yuansus seguem crescendo.\nFora de Narzepion, são considerados uma ameaça, reputação forjada por uma longa lista de crimes contra diversas nações - incluindo roubo, pirataria, assassinato, corrupção, e reiteradas violações das normas estabelecidas pelo Conselho Auroriano. As nações mais afetadas por esses crimes foram as dos humanos, elfos e minotauros. Por outro lado, nutrem relações neutras com anões e kahats'zas, povos que possuem experiências similares às suas com a tirania e a submissão. Diante das mudanças do novo mundo, viram-se forçados a reavaliar seus fundamentos e buscar alianças que assegurassem a independência de seu povo. Para isso, recorreram principalmente ao poder de barganha de sua produção armamentista, ofertando os frutos de suas fábricas de armas de fogo uma proposta que captou o interesse de Krabesh.\nAo longo das eras, muitos zaokans conseguiram escapar de Narzepion e estabelecer suas vidas em outros continentes, angariando apoio à sua causa. Mesmo que não seja uma vida fácil, consideram melhor que permanecer sob o controle Império Yuansani.",
      "nomes_comuns_origem": [
        "Aruktai",
        "Dagari",
        "Enkhtuya",
        "Sartak",
        "Sukh",
        "Temur"
      ],
      "abilities": [
        "hl003d0000000000",
        "hl003e0000000000",
        "hl003f0000000000"
      ],
      "origin": "Aquele que antes era conhecido como o deus do Heroísmo e da Bravura, Kalgoras, era admirado por todos em Arba'shatrah. Quando a existência de Athranamad foi revelada, a deusa Anatael ordenou a Kalgoras que o destruísse. Contudo, a influência da Dúvida, presente em Athranamad, fora subestimada e assim como todos que são tocados por ela, Kalgoras também cedeu aos seus sussurros: sua missão era aniquilar um de seus irmãos, algo que nunca antes sequer imaginara. Isso o fez se questionar sobre a autoridade divina de Anatael. Incapaz de destruir Athranamad, Kalgoras decidiu fragmentá-lo e esconder cada um de seus fragmentos do mundo. Mas, talvez por compaixão, guardou consigo uma dessas partes.\nKalgoras já havia criado seu Legado - os zaokans - com o intuito de inspirar e preservar a ordem na primeira cidade, mas, devido à conexão com seu criador, tornaram-se cada vez mais violentos, em busca de sua liberdade. Os zaokans, no seu ímpeto destrutivo, inauguraram a primeira guerra auroriana, enquanto Kalgoras se tornava cada vez mais alheio ao desespero, a ponto de sentir prazer na catástrofe. Ao abandonar suas virtudes, criador e criação abraçaram a destruição.\nApós Bai Nuo, a Primogênita yuansu, realizar sua procissão sangrenta exibindo a cabeça do Primogênito zaokan, Gaambatar, ela ofereceu aos zaokans uma única chance de corrigir suas falhas: abandonar seu criador o que prontamente aceitaram. Os zaokans, naquele momento, não eram mais um símbolo de bravura nem de destruição, mas um povo sem esperanças. Novamente acorrentados, os zaokans foram escravizados e usados para construir o Império Yuansani. Após séculos, o povo zaokino suplicou o perdão de Kalgoras, pois ele nunca esteve errado no seu ímpeto de quebrar as correntes da tirania, e, durante a Era Dourada, os zaokans fugiram para o norte de Narzepion, conquistando seu próprio lar longe da tirania do povo yuansu.",
      "traditions": "A história do povo zaokino os fez abominar a tirania e a escravidão, mas não os livrou de serem predatórios contra outras nações. Sua sociedade é composta de cidadãos livres, sem um governo centralizado ou nobreza. As mulheres zaokinas geralmente ocupam posições de liderança, principalmente no exército e nas fábricas, constituindo uma sociedade fundamentalmente matriarcal. Após eras sob o controle do Império Yuansani, os zaokans conquistaram o direito de possuir uma liderança legítima aos olhos de Narzepion e do mundo, pois antes eram vistos apenas como um agrupamento de criminosos, não uma nação de fato. Essa líder é chamada de Matriarca, sendo escolhida através de eleições populares.\nOs zaokans veem o poder como algo fundamental para sua sobrevivência, não dando muito sentido à palavra misericórdia. Esse povo, contudo, possui um conceito peculiar de honra: subestimar seu oponente é o mesmo que desonrá-lo e humilhá-lo. Independente do conflito, é fundamental utilizar todos os meios disponíveis para alcançar a vitória, sem medir esforços, até mesmo utilizando métodos considerados injustos. Isso não significa que todo e qualquer conflito resultará em morte, mas, caso aconteça, desde que os envolvidos não quebrem essa tradição, ambos serão considerados vencedores.\nA máxima 'a morte teme os destemidos' define muito bem os valores zaokinos. A morte por uma causa é glorificada - não porque busquem seu fim, mas, se ele vier, que seja carregado de significado. Tal pensamento fundamenta seus campos de treinamento talvez os mais exigentes e brutais do mundo. A partir de seus 7 anos, jovens zaokans podem se alistar no Exército Revolucionário, que promove a libertação total do povo zaokino e a queda do Império Yuansani. Poucos sobrevivem ao treinamento de elite, mas, sobrevivam ou não, seus nomes são gravados com honra nos registros de seu povo.\nDurante a virada de ano, os zaokans comemoram o Dia da Libertação, comemoração originada na sua emancipação, mesmo que parcial, do Império Yuansani, em 412 n.A., quando o Imperador assinou um decreto reconhecendo Uldara como um estado vassalo, garantindo-lhes direitos limitados, como uma nacionalidade própria e o reconhecimento de um líder. Ainda que a cidade continue subordinada ao Império, esse foi o primeiro passo em direção à liberdade de seu povo.",
      "inWorld": "Os zaokans criaram fortes laços com os seikos do Templo do Inverno, que intercedem pelos zaokans, ajudando-os a conquistar o direito de se unirem ao Conselho das Brumas. Sua amizade com os seikos nortenhos gerou certa abertura com o povo inárico, estabelecendo relações mornas, enquanto os atritos históricos com yuansus seguem crescendo.\nFora de Narzepion, são considerados uma ameaça, reputação forjada por uma longa lista de crimes contra diversas nações - incluindo roubo, pirataria, assassinato, corrupção, e reiteradas violações das normas estabelecidas pelo Conselho Auroriano. As nações mais afetadas por esses crimes foram as dos humanos, elfos e minotauros. Por outro lado, nutrem relações neutras com anões e kahats'zas, povos que possuem experiências similares às suas com a tirania e a submissão. Diante das mudanças do novo mundo, viram-se forçados a reavaliar seus fundamentos e buscar alianças que assegurassem a independência de seu povo. Para isso, recorreram principalmente ao poder de barganha de sua produção armamentista, ofertando os frutos de suas fábricas de armas de fogo uma proposta que captou o interesse de Krabesh.\nAo longo das eras, muitos zaokans conseguiram escapar de Narzepion e estabelecer suas vidas em outros continentes, angariando apoio à sua causa. Mesmo que não seja uma vida fácil, consideram melhor que permanecer sob o controle Império Yuansani."
    }
  }
];

export const HABILIDADES_LEGADO_FOLDERS_DATA = [
  {
    "_id": "fldhl00010000000",
    "name": "Alraune",
    "type": "Item",
    "sorting": "a",
    "color": "#2e1065",
    "_key": "!folders!fldhl00010000000"
  },
  {
    "_id": "fldhl00020000000",
    "name": "Anão",
    "type": "Item",
    "sorting": "a",
    "color": "#2e1065",
    "_key": "!folders!fldhl00020000000"
  },
  {
    "_id": "fldhl00030000000",
    "name": "Daeva",
    "type": "Item",
    "sorting": "a",
    "color": "#2e1065",
    "_key": "!folders!fldhl00030000000"
  },
  {
    "_id": "fldhl00040000000",
    "name": "Delahk",
    "type": "Item",
    "sorting": "a",
    "color": "#2e1065",
    "_key": "!folders!fldhl00040000000"
  },
  {
    "_id": "fldhl00050000000",
    "name": "Draenum",
    "type": "Item",
    "sorting": "a",
    "color": "#2e1065",
    "_key": "!folders!fldhl00050000000"
  },
  {
    "_id": "fldhl00060000000",
    "name": "Elemental",
    "type": "Item",
    "sorting": "a",
    "color": "#2e1065",
    "_key": "!folders!fldhl00060000000"
  },
  {
    "_id": "fldhl00070000000",
    "name": "Elfo",
    "type": "Item",
    "sorting": "a",
    "color": "#2e1065",
    "_key": "!folders!fldhl00070000000"
  },
  {
    "_id": "fldhl00080000000",
    "name": "Forjado",
    "type": "Item",
    "sorting": "a",
    "color": "#2e1065",
    "_key": "!folders!fldhl00080000000"
  },
  {
    "_id": "fldhl00090000000",
    "name": "Humano",
    "type": "Item",
    "sorting": "a",
    "color": "#2e1065",
    "_key": "!folders!fldhl00090000000"
  },
  {
    "_id": "fldhl000a0000000",
    "name": "Inari",
    "type": "Item",
    "sorting": "a",
    "color": "#2e1065",
    "_key": "!folders!fldhl000a0000000"
  },
  {
    "_id": "fldhl000b0000000",
    "name": "Kahats'za",
    "type": "Item",
    "sorting": "a",
    "color": "#2e1065",
    "_key": "!folders!fldhl000b0000000"
  },
  {
    "_id": "fldhl000c0000000",
    "name": "Kitari",
    "type": "Item",
    "sorting": "a",
    "color": "#2e1065",
    "_key": "!folders!fldhl000c0000000"
  },
  {
    "_id": "fldhl000d0000000",
    "name": "Minotauro",
    "type": "Item",
    "sorting": "a",
    "color": "#2e1065",
    "_key": "!folders!fldhl000d0000000"
  },
  {
    "_id": "fldhl000e0000000",
    "name": "Netune",
    "type": "Item",
    "sorting": "a",
    "color": "#2e1065",
    "_key": "!folders!fldhl000e0000000"
  },
  {
    "_id": "fldhl000f0000000",
    "name": "Orkrash",
    "type": "Item",
    "sorting": "a",
    "color": "#2e1065",
    "_key": "!folders!fldhl000f0000000"
  },
  {
    "_id": "fldhl00100000000",
    "name": "Seiko",
    "type": "Item",
    "sorting": "a",
    "color": "#2e1065",
    "_key": "!folders!fldhl00100000000"
  },
  {
    "_id": "fldhl00110000000",
    "name": "Ursar",
    "type": "Item",
    "sorting": "a",
    "color": "#2e1065",
    "_key": "!folders!fldhl00110000000"
  },
  {
    "_id": "fldhl00120000000",
    "name": "Valdrak",
    "type": "Item",
    "sorting": "a",
    "color": "#2e1065",
    "_key": "!folders!fldhl00120000000"
  },
  {
    "_id": "fldhl00130000000",
    "name": "Vennéli",
    "type": "Item",
    "sorting": "a",
    "color": "#2e1065",
    "_key": "!folders!fldhl00130000000"
  },
  {
    "_id": "fldhl00140000000",
    "name": "Yuansu",
    "type": "Item",
    "sorting": "a",
    "color": "#2e1065",
    "_key": "!folders!fldhl00140000000"
  },
  {
    "_id": "fldhl00150000000",
    "name": "Zaokan",
    "type": "Item",
    "sorting": "a",
    "color": "#2e1065",
    "_key": "!folders!fldhl00150000000"
  }
];

export const HABILIDADES_LEGADO_DATA = [
  {
    "_id": "hl00010000000000",
    "name": "Filhos de Darnawel",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Filhos de Darnawel.png",
    "folder": "fldhl00010000000",
    "_key": "!items!hl00010000000000",
    "system": {
      "name": "Filhos de Darnawel",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "alraune",
      "legadoNome": "Alraune",
      "description": "O seu corpo é feito de plantas e vinhas, por isso, você não precisa se alimentar, necessitando apenas água para sobreviver. Você pode criar pequenos efeitos inofensivos, que tenham ligação com a natureza, como: desabrochar flores, mimetizar som de animais, criar lufadas de vento, entre outros, desde que sejam autorizados pelo Narrador.",
      "subEffects": [],
      "actions": []
    }
  },
  {
    "_id": "hl00020000000000",
    "name": "Proteção da Natureza",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Proteção da Natureza.png",
    "folder": "fldhl00010000000",
    "_key": "!items!hl00020000000000",
    "effects": [
      {
        "_id": "eff_00020000000000",
        "_key": "!items.effects!hl00020000000000.eff_00020000000000",
        "name": "Proteção da Natureza",
        "img": "modules/gaia-compendium-manager/assets/legados/Proteção da Natureza.png",
        "icon": "modules/gaia-compendium-manager/assets/legados/Proteção da Natureza.png",
        "origin": "!items!hl00020000000000",
        "disabled": false,
        "transfer": true,
        "changes": [
          {
            "key": "system.damageResistance",
            "mode": 2,
            "value": "nature"
          },
          {
            "key": "system.conditionImmunity",
            "mode": 2,
            "value": "envenenado"
          }
        ],
        "duration": {
          "rounds": null,
          "seconds": null
        },
        "description": "Resistência Mágica [Natureza] e imunidade à condição Envenenado."
      }
    ],
    "system": {
      "name": "Proteção da Natureza",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "alraune",
      "legadoNome": "Alraune",
      "description": "Você possui Resistência Mágica [Natureza] e não é afetado por Envenenado.",
      "subEffects": [],
      "actions": []
    }
  },
  {
    "_id": "hl00030000000000",
    "name": "Essência Revigorante",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Essência Revigorante.png",
    "folder": "fldhl00010000000",
    "_key": "!items!hl00030000000000",
    "system": {
      "name": "Essência Revigorante",
      "category": "legado",
      "cost": "",
      "typeAction": "acaoSimples",
      "typeAbility": "legado",
      "types": [
        "ativa",
        "cura"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "alraune",
      "legadoNome": "Alraune",
      "description": "Você pode utilizar a sua Ação Simples para regenerar um valor de Pontos de Vida equivalente ao dobro do seu total máximo de Pontos de Energia. Esse efeito só poderá ser realizado novamente após concluir um Repouso Completo.",
      "subEffects": [],
      "actions": [
        {
          "id": "act_essencia_revigorante",
          "name": "Essência Revigorante",
          "description": "Regenera um valor de Pontos de Vida equivalente ao dobro do seu total máximo de Pontos de Energia (1x por Repouso Completo).",
          "cost": "",
          "type": {
            "actionType": "acaoSimples",
            "category": "suporte",
            "tags": [
              "cura",
              "repouso"
            ]
          },
          "attack": {
            "hasAttack": false
          },
          "damage": {
            "hasDamage": false
          },
          "healing": {
            "hasHealing": true,
            "formula": "2 * @pe.max",
            "type": "pv"
          },
          "condition": {
            "hasCondition": false
          },
          "check": {
            "hasCheck": false
          },
          "areaOfEffect": {
            "hasArea": false
          }
        }
      ]
    }
  },
  {
    "_id": "hl00040000000000",
    "name": "Herança dos Três Irmãos",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Herança dos Três Irmãos.png",
    "folder": "fldhl00020000000",
    "_key": "!items!hl00040000000000",
    "system": {
      "name": "Herança dos Três Irmãos",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "anao",
      "legadoNome": "Anão",
      "description": "Você precisa de metade de comida e água para sobreviver, além ignorar a regra de 2 horas adicionais vindos de Repousos caso esteja repousando em um local desconfortável. Você também possui Infravisão.",
      "subEffects": [],
      "actions": []
    }
  },
  {
    "_id": "hl00050000000000",
    "name": "Modelador Natural",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Modelador Natural.png",
    "folder": "fldhl00020000000",
    "_key": "!items!hl00050000000000",
    "system": {
      "name": "Modelador Natural",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "anao",
      "legadoNome": "Anão",
      "description": "Enquanto você estiver tocando um objeto mundano de, no máximo, 1 metro de altura e largura, você poderá modificar a forma física desse objeto. Você também poderá utilizar esse efeito para reparar um pequeno objeto mundano, contanto que a parte danificada não seja maior que 30 centímetros. Esse efeito de reparo é permanente, ou até que seja quebrado novamente.",
      "subEffects": [],
      "actions": []
    }
  },
  {
    "_id": "hl00060000000000",
    "name": "Fortitude Ampliada",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Fortitude Ampliada.png",
    "folder": "fldhl00020000000",
    "_key": "!items!hl00060000000000",
    "effects": [
      {
        "_id": "eff_00060000000000",
        "_key": "!items.effects!hl00060000000000.eff_00060000000000",
        "name": "Fortitude Ampliada",
        "img": "modules/gaia-compendium-manager/assets/legados/Fortitude Ampliada.png",
        "icon": "modules/gaia-compendium-manager/assets/legados/Fortitude Ampliada.png",
        "origin": "!items!hl00060000000000",
        "disabled": false,
        "transfer": true,
        "changes": [
          {
            "key": "system.hpDie",
            "mode": 2,
            "value": "1d8"
          },
          {
            "key": "system.hpFixed",
            "mode": 2,
            "value": "4"
          }
        ],
        "duration": {
          "rounds": null,
          "seconds": null
        },
        "description": "O dado de PV na criação e por Nível de Despertar passa a ser 1d8 (ou 4 fixo)."
      }
    ],
    "system": {
      "name": "Fortitude Ampliada",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "anao",
      "legadoNome": "Anão",
      "description": "O dado que você utiliza ao calcular seus Pontos de Vida, ao criar um personagem e ao receber Níveis de Despertar, é 1d8, ao invés de 1d6. Caso você opte pelo valor fixo nessa rolagem, considere 4, ao invés de 3.",
      "subEffects": [],
      "actions": []
    }
  },
  {
    "_id": "hl00070000000000",
    "name": "Essência Abissal",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Essência Abissal.png",
    "folder": "fldhl00030000000",
    "_key": "!items!hl00070000000000",
    "system": {
      "name": "Essência Abissal",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "daeva",
      "legadoNome": "Daeva",
      "description": "Intensificando suas características corrompidas, você pode modificar levemente a sua aparência, salientando os seus aspectos abissais, como o tom de sua voz, a cor de seus olhos, pequenos espinhos pelo seu corpo ou pequenos focos de chamas sombrías, por exemplo.",
      "subEffects": [],
      "actions": []
    }
  },
  {
    "_id": "hl00080000000000",
    "name": "Abraço da Treva",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Abraço da Treva.png",
    "folder": "fldhl00030000000",
    "_key": "!items!hl00080000000000",
    "effects": [
      {
        "_id": "eff_00080000000000",
        "_key": "!items.effects!hl00080000000000.eff_00080000000000",
        "name": "Abraço da Treva",
        "img": "modules/gaia-compendium-manager/assets/legados/Abraço da Treva.png",
        "icon": "modules/gaia-compendium-manager/assets/legados/Abraço da Treva.png",
        "origin": "!items!hl00080000000000",
        "disabled": false,
        "transfer": true,
        "changes": [
          {
            "key": "system.damageResistance",
            "mode": 2,
            "value": "dark"
          },
          {
            "key": "system.conditionImmunity",
            "mode": 2,
            "value": "enfraquecido"
          }
        ],
        "duration": {
          "rounds": null,
          "seconds": null
        },
        "description": "Resistência Mágica [Trevas] e imunidade à condição Enfraquecido."
      }
    ],
    "system": {
      "name": "Abraço da Treva",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "daeva",
      "legadoNome": "Daeva",
      "description": "Você possui Resistência Mágica [Trevas] e não é afetado por Enfraquecido.",
      "subEffects": [],
      "actions": []
    }
  },
  {
    "_id": "hl00090000000000",
    "name": "Pacto Originário",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Pacto Originário.png",
    "folder": "fldhl00030000000",
    "_key": "!items!hl00090000000000",
    "system": {
      "name": "Pacto Originário",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "daeva",
      "legadoNome": "Daeva",
      "description": "Ao criar um daeva, escolha um Parâmetro: Você é imune a efeitos de Habilidades de Caminho e Características que apliquem Inaptidão no Parâmetro escolhido. Habilidades de Caminho e Características que apliquem Inaptidão em si mesmo não são afetadas por este efeito.",
      "subEffects": [],
      "actions": []
    }
  },
  {
    "_id": "hl000a0000000000",
    "name": "Versatilidade",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Versatilidade.png",
    "folder": "fldhl00040000000",
    "_key": "!items!hl000a0000000000",
    "system": {
      "name": "Versatilidade",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "delahk",
      "legadoNome": "Delahk",
      "description": "Você pode utilizar as suas mãos e seus pés para escalar e se movimentar por qualquer superfície sólida, fixando-se nessa superfície sem teste algum.",
      "subEffects": [],
      "actions": []
    }
  },
  {
    "_id": "hl000b0000000000",
    "name": "Miragem",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Miragem.png",
    "folder": "fldhl00040000000",
    "_key": "!items!hl000b0000000000",
    "system": {
      "name": "Miragem",
      "category": "legado",
      "cost": "",
      "typeAction": "acaoSimples",
      "typeAbility": "legado",
      "types": [
        "ativa"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "delahk",
      "legadoNome": "Delahk",
      "description": "Com uma Ação Simples, você pode criar uma das pequenas ilusões a seguir, que permanecerá ativa por 10 minutos:\n• Um efeito sensorial em um local dentro 6 metros, que produzirá sons ou odores à sua escolha.\n• Um objeto inofensivo, que caiba em sua mão.\n• Um pequeno símbolo em um objeto ou superfície dentro de 6 metros.\nEssa ilusão é desfeita caso você realize uma nova ilusão com essa habilidade.",
      "subEffects": [],
      "actions": [
        {
          "id": "act_miragem",
          "name": "Miragem",
          "description": "Cria uma pequena ilusão sensorial (som/odor a 6m), objeto inofensivo de mão ou símbolo que dura 10 minutos.",
          "cost": "",
          "type": {
            "actionType": "acaoSimples",
            "category": "suporte",
            "tags": [
              "ilusao"
            ]
          },
          "attack": {
            "hasAttack": false
          },
          "damage": {
            "hasDamage": false
          },
          "healing": {
            "hasHealing": false
          },
          "condition": {
            "hasCondition": false
          },
          "check": {
            "hasCheck": false
          },
          "areaOfEffect": {
            "hasArea": false
          }
        }
      ]
    }
  },
  {
    "_id": "hl000c0000000000",
    "name": "Malabarismo",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Malabarismo.png",
    "folder": "fldhl00040000000",
    "_key": "!items!hl000c0000000000",
    "system": {
      "name": "Malabarismo",
      "category": "legado",
      "cost": "",
      "typeAction": "acaoRapida",
      "typeAbility": "legado",
      "types": [
        "ativa"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "delahk",
      "legadoNome": "Delahk",
      "description": "Durante seu turno, sem custo de Ação, você poderá sacar, trocar ou guardar um Armamento, utilizar ou passar um item para um Alvo dentro de 1 metro. Esse efeito ocorre apenas uma vez por turno.\nAlém disso, você pode utilizar a sua cauda para outras pequenas ações inofensivas, desde que sejam autorizadas pelo Narrador.",
      "subEffects": [],
      "actions": [
        {
          "id": "act_malabarismo",
          "name": "Malabarismo",
          "description": "1x por turno, sem custo de ação: sacar, trocar ou guardar armamento, ou utilizar/passar item para alvo a até 1 metro.",
          "cost": "",
          "type": {
            "actionType": "acaoRapida",
            "category": "utilidade",
            "tags": [
              "manobra"
            ]
          },
          "attack": {
            "hasAttack": false
          },
          "damage": {
            "hasDamage": false
          },
          "healing": {
            "hasHealing": false
          },
          "condition": {
            "hasCondition": false
          },
          "check": {
            "hasCheck": false
          },
          "areaOfEffect": {
            "hasArea": false
          }
        }
      ]
    }
  },
  {
    "_id": "hl000d0000000000",
    "name": "Presente das Sombras",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Presente das Sombras.png",
    "folder": "fldhl00050000000",
    "_key": "!items!hl000d0000000000",
    "system": {
      "name": "Presente das Sombras",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "draenum",
      "legadoNome": "Draenum",
      "description": "Você pode utilizar as linhas obsidianas de sua pele para manipular as sombras ao seu redor, podendo realizar pequenos truques com elas dentro de 3 metros, como abrir uma porta destrancada, segurar um cálice, entre outros pequenos efeitos inofensivos, desde que sejam autorizados pelo Narrador.",
      "subEffects": [],
      "actions": []
    }
  },
  {
    "_id": "hl000e0000000000",
    "name": "Herança da Eterna Escuridão",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Herança da Eterna Escuridão.png",
    "folder": "fldhl00050000000",
    "_key": "!items!hl000e0000000000",
    "system": {
      "name": "Herança da Eterna Escuridão",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "draenum",
      "legadoNome": "Draenum",
      "description": "Você possui Infravisão Mística.",
      "subEffects": [],
      "actions": []
    }
  },
  {
    "_id": "hl000f0000000000",
    "name": "Manto Noturno",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Manto Noturno.png",
    "folder": "fldhl00050000000",
    "_key": "!items!hl000f0000000000",
    "system": {
      "name": "Manto Noturno",
      "category": "legado",
      "cost": "",
      "typeAction": "reacao",
      "typeAbility": "legado",
      "types": [
        "reacao"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "draenum",
      "legadoNome": "Draenum",
      "description": "Caso seja o alvo de uma Condição Mágica, você poderá realizar o teste de Espírito para removê-la antes de recebê-la. Caso tenha sucesso, você não receberá a Condição Mágica.",
      "subEffects": [],
      "actions": [
        {
          "id": "act_manto_noturno",
          "name": "Manto Noturno",
          "description": "Ao ser alvo de uma Condição Mágica, realiza imediatamente o teste de Espírito para anulá-la antes de recebê-la.",
          "cost": "",
          "type": {
            "actionType": "reacao",
            "category": "defesa",
            "tags": [
              "reacao",
              "resistencia"
            ]
          },
          "attack": {
            "hasAttack": false
          },
          "damage": {
            "hasDamage": false
          },
          "healing": {
            "hasHealing": false
          },
          "condition": {
            "hasCondition": false
          },
          "check": {
            "hasCheck": true,
            "category": "parameter",
            "attribute": "spirit",
            "difficulty": 10,
            "onSuccess": "Não recebe a Condição Mágica",
            "onFailure": "Recebe a Condição Mágica normalmente"
          },
          "areaOfEffect": {
            "hasArea": false
          }
        }
      ]
    }
  },
  {
    "_id": "hl00100000000000",
    "name": "Essência Elemental",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Essência Elemental.png",
    "folder": "fldhl00060000000",
    "_key": "!items!hl00100000000000",
    "system": {
      "name": "Essência Elemental",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "elemental",
      "legadoNome": "Elemental",
      "description": "Escolha um elemento: Fogo, Água, Vento, Terra, Trovão ou Gelo. Você pode criar pequenos efeitos elementais inofensivos, referentes ao seu elemento, como: moldar uma chama em sua mão, congelar uma taça, etc., desde que sejam autorizados pelo Narrador.",
      "subEffects": [],
      "actions": []
    }
  },
  {
    "_id": "hl00110000000000",
    "name": "Um com o Elemento",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Um com o Elemento.png",
    "folder": "fldhl00060000000",
    "_key": "!items!hl00110000000000",
    "system": {
      "name": "Um com o Elemento",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "elemental",
      "legadoNome": "Elemental",
      "description": "Você possui Resistência Mágica referente ao seu elemento em Essência Elemental. Caso um Alvo Inimigo lhe cause um Dano Mágico do mesmo elemento da sua Essência Elemental, você receberá 1 Ponto de Energia Temporário. Esse efeito ocorre apenas uma vez por rodada.",
      "subEffects": [],
      "actions": []
    },
    "effects": [
      {
        "_id": "eff_00110000000000",
        "_key": "!items.effects!hl00110000000000.eff_00110000000000",
        "name": "Um com o Elemento",
        "img": "modules/gaia-compendium-manager/assets/legados/Um com o Elemento.png",
        "icon": "modules/gaia-compendium-manager/assets/legados/Um com o Elemento.png",
        "origin": "!items!hl00110000000000",
        "disabled": false,
        "transfer": true,
        "changes": [
          {
            "key": "system.damageResistance",
            "mode": 2,
            "value": "elemental"
          }
        ],
        "duration": {
          "rounds": null,
          "seconds": null
        },
        "description": "Resistência Mágica elemental referente à sua Essência Elemental."
      }
    ]
  },
  {
    "_id": "hl00120000000000",
    "name": "Encarnação Elemental",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Encarnação Elemental.png",
    "folder": "fldhl00060000000",
    "_key": "!items!hl00120000000000",
    "system": {
      "name": "Encarnação Elemental",
      "category": "legado",
      "cost": "",
      "typeAction": "reacao",
      "typeAbility": "legado",
      "types": [
        "reacao",
        "dano"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "elemental",
      "legadoNome": "Elemental",
      "description": "Enquanto estiver em combate, ao receber qualquer tipo de dano de um Alvo, você poderá causar, nesse mesmo Alvo, metade do seu total máximo de Pontos de Energia como Dano Mágico elemental, referente à sua Essência Elemental. Esse efeito ocorre apenas uma vez por rodada.",
      "subEffects": [],
      "actions": [
        {
          "id": "act_encarnacao_elemental",
          "name": "Encarnação Elemental",
          "description": "Reação ao receber dano em combate: causa metade do seu PE máximo como Dano Mágico elemental no agressor (1x por rodada).",
          "cost": "",
          "type": {
            "actionType": "reacao",
            "category": "ataque_magico",
            "tags": [
              "dano_magico",
              "retaliacao"
            ]
          },
          "attack": {
            "hasAttack": false
          },
          "damage": {
            "hasDamage": true,
            "formula": "floor(@pe.max / 2)",
            "type": "immaterial",
            "criticalBonus": ""
          },
          "healing": {
            "hasHealing": false
          },
          "condition": {
            "hasCondition": false
          },
          "check": {
            "hasCheck": false
          },
          "areaOfEffect": {
            "hasArea": false
          }
        }
      ]
    }
  },
  {
    "_id": "hl00130000000000",
    "name": "Sabedoria Antiga",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Sabedoria Antiga.png",
    "folder": "fldhl00070000000",
    "_key": "!items!hl00130000000000",
    "system": {
      "name": "Sabedoria Antiga",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "elfo",
      "legadoNome": "Elfo",
      "description": "Você inicia com 3 pontos adicionais a serem distribuídos nos seus Conhecimentos. O seu limite máximo na distribuição inicial dos seus Conhecimentos ainda é 2.",
      "subEffects": [],
      "actions": []
    }
  },
  {
    "_id": "hl00140000000000",
    "name": "Herança de Haladar",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Herança de Haladar.png",
    "folder": "fldhl00070000000",
    "_key": "!items!hl00140000000000",
    "system": {
      "name": "Herança de Haladar",
      "category": "legado",
      "cost": "",
      "typeAction": "acaoSimples",
      "typeAbility": "legado",
      "types": [
        "ativa"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "elfo",
      "legadoNome": "Elfo",
      "description": "Com uma Ação Simples, você passa a compreender um Idioma sendo falado por um Alvo dentro de 6 metros, podendo também falar este mesmo Idioma por 10 minutos. Você pode manter somente um Idioma por vez com esse efeito.",
      "subEffects": [],
      "actions": [
        {
          "id": "act_heranca_haladar",
          "name": "Herança de Haladar",
          "description": "Compreende e fala por 10 minutos um idioma ouvido de um alvo a até 6 metros.",
          "cost": "",
          "type": {
            "actionType": "acaoSimples",
            "category": "suporte",
            "tags": [
              "idioma"
            ]
          },
          "attack": {
            "hasAttack": false
          },
          "damage": {
            "hasDamage": false
          },
          "healing": {
            "hasHealing": false
          },
          "condition": {
            "hasCondition": false
          },
          "check": {
            "hasCheck": false
          },
          "areaOfEffect": {
            "hasArea": false
          }
        }
      ]
    }
  },
  {
    "_id": "hl00150000000000",
    "name": "Pensamento Célere",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Pensamento Célere.png",
    "folder": "fldhl00070000000",
    "_key": "!items!hl00150000000000",
    "system": {
      "name": "Pensamento Célere",
      "category": "legado",
      "cost": "",
      "typeAction": "reacao",
      "typeAbility": "legado",
      "types": [
        "reacao",
        "suporte"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "elfo",
      "legadoNome": "Elfo",
      "description": "Caso você falhe em teste de Parâmetro, você receberá +1 no seu próximo teste de Parâmetro. Esse efeito não acumula e, caso não seja utilizado, é removido em 1 minuto.",
      "subEffects": [],
      "actions": [
        {
          "id": "act_pensamento_celere",
          "name": "Pensamento Célere",
          "description": "Ao falhar em um teste de Parâmetro, concede +1 no seu próximo teste de Parâmetro dentro de 1 minuto.",
          "cost": "",
          "type": {
            "actionType": "reacao",
            "category": "suporte",
            "tags": [
              "bonus"
            ]
          },
          "attack": {
            "hasAttack": false
          },
          "damage": {
            "hasDamage": false
          },
          "healing": {
            "hasHealing": false
          },
          "condition": {
            "hasCondition": false
          },
          "check": {
            "hasCheck": false
          },
          "areaOfEffect": {
            "hasArea": false
          }
        }
      ]
    }
  },
  {
    "_id": "hl00160000000000",
    "name": "Adaptação do Metal",
    "type": "ability",
    "img": "icons/equipment/chest/breastplate-helmet-metal.svg",
    "folder": "fldhl00080000000",
    "_key": "!items!hl00160000000000",
    "system": {
      "name": "Adaptação do Metal",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "forjado",
      "legadoNome": "Forjado",
      "description": "Você não precisa se alimentar nem respirar. Você também ignora a regra de 2 horas adicionais em Repousos, caso repouse em um local desconfortável.",
      "subEffects": [],
      "actions": []
    }
  },
  {
    "_id": "hl00170000000000",
    "name": "Armadura Viva",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Armadura Viva.png",
    "folder": "fldhl00080000000",
    "_key": "!items!hl00170000000000",
    "system": {
      "name": "Armadura Viva",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "forjado",
      "legadoNome": "Forjado",
      "description": "Você não pode equipar Armaduras. Para qualquer efeito de Habilidades de Caminho você sempre estará equipado com uma Armadura.\nPor 30 minutos, você pode tocar uma Armadura para destruí-la, recebendo para si seus valores de Bloqueio, desde que possua o requisito de Vigor necessário. Você não recebe Inaptidões vindas dessa Armadura.\nCaso a Armadura seja uma Relíquia, você só poderá receber os seus valores de Bloqueio e efeitos da Relíquia caso você esteja Vinculado (VINCULANDO-SE A UMA RELÍQUIA) a ela, recebendo também o seu valor de Potência.\nCaso você realize esse processo em uma nova Armadura, o Bloqueio, efeitos e pontos de Potência atuais serão substituídos.",
      "subEffects": [],
      "actions": []
    }
  },
  {
    "_id": "hl00180000000000",
    "name": "Corpo de Ferro",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Corpo de Ferro.png",
    "folder": "fldhl00080000000",
    "_key": "!items!hl00180000000000",
    "effects": [
      {
        "_id": "eff_00180000000000",
        "_key": "!items.effects!hl00180000000000.eff_00180000000000",
        "name": "Corpo de Ferro",
        "img": "modules/gaia-compendium-manager/assets/legados/Corpo de Ferro.png",
        "icon": "modules/gaia-compendium-manager/assets/legados/Corpo de Ferro.png",
        "origin": "!items!hl00180000000000",
        "disabled": false,
        "transfer": true,
        "changes": [
          {
            "key": "system.conditionImmunity",
            "mode": 2,
            "value": "envenenado"
          },
          {
            "key": "system.conditionImmunity",
            "mode": 2,
            "value": "sangramento"
          }
        ],
        "duration": {
          "rounds": null,
          "seconds": null
        },
        "description": "Imunidade às condições Envenenado e Sangramento."
      }
    ],
    "system": {
      "name": "Corpo de Ferro",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "forjado",
      "legadoNome": "Forjado",
      "description": "Você é imune a Envenenado e Sangramento.",
      "subEffects": [],
      "actions": []
    }
  },
  {
    "_id": "hl00190000000000",
    "name": "Especialista",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Especialista.png",
    "folder": "fldhl00090000000",
    "_key": "!items!hl00190000000000",
    "system": {
      "name": "Especialista",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "humano",
      "legadoNome": "Humano",
      "description": "Você inicia com um ponto de Maestria adicional. Essa Maestria adicional não poderá ser aplicada em um mesmo Conhecimento que você já possua uma Maestria ao criar um novo personagem.",
      "subEffects": [],
      "actions": []
    }
  },
  {
    "_id": "hl001a0000000000",
    "name": "Aprimorar Resultados",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Aprimorar Resultados.png",
    "folder": "fldhl00090000000",
    "_key": "!items!hl001a0000000000",
    "system": {
      "name": "Aprimorar Resultados",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "humano",
      "legadoNome": "Humano",
      "description": "Ao realizar um teste de Parâmetro ou Conhecimento, e o seu Resultado Natural for 10, ou mais, considere-o um 12.",
      "subEffects": [],
      "actions": []
    }
  },
  {
    "_id": "hl001b0000000000",
    "name": "Determinação",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Determinação.png",
    "folder": "fldhl00090000000",
    "_key": "!items!hl001b0000000000",
    "system": {
      "name": "Determinação",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "humano",
      "legadoNome": "Humano",
      "description": "A sua regra do Dado de Morte é modificada. Você recebe uma Dádiva do Artesão com um 5 no teste, ao invés de 7.",
      "subEffects": [],
      "actions": []
    }
  },
  {
    "_id": "hl001c0000000000",
    "name": "Sempre Alerta",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Sempre Alerta.png",
    "folder": "fldhl000a0000000",
    "_key": "!items!hl001c0000000000",
    "system": {
      "name": "Sempre Alerta",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "inari",
      "legadoNome": "Inari",
      "description": "A sua Percepção Passiva passa a ser 8. A regra de Percepção Passiva é aplicada em você até mesmo enquanto estiver dormindo.",
      "subEffects": [],
      "actions": []
    }
  },
  {
    "_id": "hl001d0000000000",
    "name": "Sagacidade Mística",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Sagacidade Mística.png",
    "folder": "fldhl000a0000000",
    "_key": "!items!hl001d0000000000",
    "system": {
      "name": "Sagacidade Mística",
      "category": "legado",
      "cost": "",
      "typeAction": "acaoSimples",
      "typeAbility": "legado",
      "types": [
        "ativa"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "inari",
      "legadoNome": "Inari",
      "description": "Com uma Ação Simples, você passa a enxergar, por 10 minutos, todo Alvo Invisível, transformado ou ilusório, enxergando a sua forma original. Depois de utilizado, esse efeito só poderá ser utilizado novamente após você concluir um Repouso.",
      "subEffects": [],
      "actions": [
        {
          "id": "act_sagacidade_mistica",
          "name": "Sagacidade Mística",
          "description": "Enxerga a forma original de alvos invisíveis, metamorfoseados ou ilusórios por 10 minutos (1x por Repouso).",
          "cost": "",
          "type": {
            "actionType": "acaoSimples",
            "category": "utilidade",
            "tags": [
              "visao",
              "repouso"
            ]
          },
          "attack": {
            "hasAttack": false
          },
          "damage": {
            "hasDamage": false
          },
          "healing": {
            "hasHealing": false
          },
          "condition": {
            "hasCondition": false
          },
          "check": {
            "hasCheck": false
          },
          "areaOfEffect": {
            "hasArea": false
          }
        }
      ]
    }
  },
  {
    "_id": "hl001e0000000000",
    "name": "Instinto Natural",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Instinto Natural.png",
    "folder": "fldhl000a0000000",
    "_key": "!items!hl001e0000000000",
    "effects": [
      {
        "_id": "eff_001e0000000000",
        "_key": "!items.effects!hl001e0000000000.eff_001e0000000000",
        "name": "Instinto Natural",
        "img": "modules/gaia-compendium-manager/assets/legados/Instinto Natural.png",
        "icon": "modules/gaia-compendium-manager/assets/legados/Instinto Natural.png",
        "origin": "!items!hl001e0000000000",
        "disabled": false,
        "transfer": true,
        "changes": [
          {
            "key": "system.movement.walk",
            "mode": 2,
            "value": "2"
          }
        ],
        "duration": {
          "rounds": null,
          "seconds": null
        },
        "description": "Aptidão em rolagens de Iniciativa (Agilidade) e +2 metros na Movimentação."
      }
    ],
    "system": {
      "name": "Instinto Natural",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "inari",
      "legadoNome": "Inari",
      "description": "Você possui Aptidão em testes de Agilidade nas suas rolagens de Iniciativa. Além disso, você possui 2 metros adicionais na sua Movimentação.",
      "subEffects": [],
      "actions": []
    }
  },
  {
    "_id": "hl001f0000000000",
    "name": "Detectar Magia",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Detectar Magia.png",
    "folder": "fldhl000b0000000",
    "_key": "!items!hl001f0000000000",
    "system": {
      "name": "Detectar Magia",
      "category": "legado",
      "cost": "",
      "typeAction": "acaoAtiva",
      "typeAbility": "legado",
      "types": [
        "ativa"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "kahatsza",
      "legadoNome": "Kahats'za",
      "description": "Você pode se concentrar por 1 minuto para sentir as linhas do Véu ao seu redor, conseguindo identificar se alguma Conjuração foi realizada no ambiente nas últimas 12 horas. Você também sabe identificar o intuito da Conjuração — controle, destruição, etc.",
      "subEffects": [],
      "actions": [
        {
          "id": "act_detectar_magia",
          "name": "Detectar Magia",
          "description": "Concentra-se por 1 minuto para identificar conjurações realizadas nas últimas 12 horas e seu propósito.",
          "cost": "",
          "type": {
            "actionType": "acaoAtiva",
            "category": "utilidade",
            "tags": [
              "deteccao",
              "conjuracao"
            ]
          },
          "attack": {
            "hasAttack": false
          },
          "damage": {
            "hasDamage": false
          },
          "healing": {
            "hasHealing": false
          },
          "condition": {
            "hasCondition": false
          },
          "check": {
            "hasCheck": false
          },
          "areaOfEffect": {
            "hasArea": false
          }
        }
      ]
    }
  },
  {
    "_id": "hl00200000000000",
    "name": "Conectado com o Véu",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Conectado com o Véu.png",
    "folder": "fldhl000b0000000",
    "_key": "!items!hl00200000000000",
    "system": {
      "name": "Conectado com o Véu",
      "category": "legado",
      "cost": "",
      "typeAction": "acaoSimples",
      "typeAbility": "legado",
      "types": [
        "ativa"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "kahatsza",
      "legadoNome": "Kahats'za",
      "description": "Com uma Ação Simples, você poderá realizar um dos seguintes efeitos:\n• Levitar e mover objetos de até 20 kg, que estejam a 6 metros para um novo local a 6 metros.\n• Abrir ou fechar uma tranca ou recipiente destrancado dentro de 6 metros.\n• Acender ou apagar uma tocha, vela ou fogueira dentro de 6 metros.\n• Modificar a sua voz, ou até mesmo fazer com que ela ressoe a até 6 metros de você. Esse efeito permanece ativo por 1 minuto.",
      "subEffects": [],
      "actions": [
        {
          "id": "act_conectado_veu",
          "name": "Conectado com o Véu",
          "description": "Executa telecinese leve (20 kg a 6m), manipulação de trancas, controle de fogo ou voz ressonante.",
          "cost": "",
          "type": {
            "actionType": "acaoSimples",
            "category": "utilidade",
            "tags": [
              "telecinese",
              "magia"
            ]
          },
          "attack": {
            "hasAttack": false
          },
          "damage": {
            "hasDamage": false
          },
          "healing": {
            "hasHealing": false
          },
          "condition": {
            "hasCondition": false
          },
          "check": {
            "hasCheck": false
          },
          "areaOfEffect": {
            "hasArea": false
          }
        }
      ]
    }
  },
  {
    "_id": "hl00210000000000",
    "name": "Magia Antiga",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Magia Antiga.png",
    "folder": "fldhl000b0000000",
    "_key": "!items!hl00210000000000",
    "system": {
      "name": "Magia Antiga",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "kahatsza",
      "legadoNome": "Kahats'za",
      "description": "Ao perder qualquer valor de Pontos de Vida, o seu próximo custo de Pontos de Energia será reduzido em 1. Esse efeito não acumula e permanece ativo por 1 minuto, caso não seja utilizado.",
      "subEffects": [],
      "actions": []
    }
  },
  {
    "_id": "hl00220000000000",
    "name": "Mobilidade Felina",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Mobilidade Felina.png",
    "folder": "fldhl000c0000000",
    "_key": "!items!hl00220000000000",
    "system": {
      "name": "Mobilidade Felina",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "kitari",
      "legadoNome": "Kitari",
      "description": "Você possui um corpo ágil, modificando a regra de Saltar, fazendo com que você dobre os valores concedidos pelo Salto à Distância e o Salto em Altura.",
      "subEffects": [],
      "actions": []
    }
  },
  {
    "_id": "hl00230000000000",
    "name": "Improviso Natural",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Improviso Natural.png",
    "folder": "fldhl000c0000000",
    "_key": "!items!hl00230000000000",
    "system": {
      "name": "Improviso Natural",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "kitari",
      "legadoNome": "Kitari",
      "description": "Todo dano de Queda recebido é reduzido pela metade. Você também ignora metade dos pontos de Fratura recebidos por danos de Queda.",
      "subEffects": [],
      "actions": []
    }
  },
  {
    "_id": "hl00240000000000",
    "name": "Sorte",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Sorte.png",
    "folder": "fldhl000c0000000",
    "_key": "!items!hl00240000000000",
    "system": {
      "name": "Sorte",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "kitari",
      "legadoNome": "Kitari",
      "description": "Sempre que você obter 1 como Resultado Natural de um teste de Parâmetro, você poderá realizar novamente esse mesmo teste.",
      "subEffects": [],
      "actions": []
    }
  },
  {
    "_id": "hl00250000000000",
    "name": "Nômade",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Nômade.png",
    "folder": "fldhl000d0000000",
    "_key": "!items!hl00250000000000",
    "system": {
      "name": "Nômade",
      "category": "legado",
      "cost": "",
      "typeAction": "acaoSimples",
      "typeAbility": "legado",
      "types": [
        "ativa"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "minotauro",
      "legadoNome": "Minotauro",
      "description": "Você nunca esquece o caminho de trilhas, estradas ou ruínas que já tenha percorrido. Com uma Ação Simples, você se conecta a um pequeno local que você já tenha visitado (um quarto, sala, saguão, por exemplo), podendo enxergar tudo nesse local por 10 minutos. Você poderá desfazer esse efeito a qualquer momento. Depois de utilizada, essa habilidade só poderá ser utilizada novamente após você concluir um Repouso.",
      "subEffects": [],
      "actions": [
        {
          "id": "act_nomade",
          "name": "Nômade",
          "description": "Conecta-se a um local previamente visitado, enxergando tudo por 10 minutos (1x por Repouso).",
          "cost": "",
          "type": {
            "actionType": "acaoSimples",
            "category": "utilidade",
            "tags": [
              "clarividencia",
              "repouso"
            ]
          },
          "attack": {
            "hasAttack": false
          },
          "damage": {
            "hasDamage": false
          },
          "healing": {
            "hasHealing": false
          },
          "condition": {
            "hasCondition": false
          },
          "check": {
            "hasCheck": false
          },
          "areaOfEffect": {
            "hasArea": false
          }
        }
      ]
    }
  },
  {
    "_id": "hl00260000000000",
    "name": "Filho de Nolgadan",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Filho de Nolgadan.png",
    "folder": "fldhl000d0000000",
    "_key": "!items!hl00260000000000",
    "effects": [
      {
        "_id": "eff_00260000000000",
        "_key": "!items.effects!hl00260000000000.eff_00260000000000",
        "name": "Filho de Nolgadan",
        "img": "modules/gaia-compendium-manager/assets/legados/Filho de Nolgadan.png",
        "icon": "modules/gaia-compendium-manager/assets/legados/Filho de Nolgadan.png",
        "origin": "!items!hl00260000000000",
        "disabled": false,
        "transfer": true,
        "changes": [
          {
            "key": "system.conditionImmunity",
            "mode": 2,
            "value": "lentidao"
          },
          {
            "key": "system.conditionImmunity",
            "mode": 2,
            "value": "terreno dificil"
          }
        ],
        "duration": {
          "rounds": null,
          "seconds": null
        },
        "description": "Imunidade à condição Lentidão e a Terrenos Difíceis."
      }
    ],
    "system": {
      "name": "Filho de Nolgadan",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "minotauro",
      "legadoNome": "Minotauro",
      "description": "Você é imune a Lentidão e a Terrenos Difíceis.",
      "subEffects": [],
      "actions": []
    }
  },
  {
    "_id": "hl00270000000000",
    "name": "Corrida Aprimorada",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Corrida Aprimorada.png",
    "folder": "fldhl000d0000000",
    "_key": "!items!hl00270000000000",
    "system": {
      "name": "Corrida Aprimorada",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "minotauro",
      "legadoNome": "Minotauro",
      "description": "O total de Metros percorrido em sua Corrida é dobrado.",
      "subEffects": [],
      "actions": []
    }
  },
  {
    "_id": "hl00280000000000",
    "name": "Adaptação dos Oceanos",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Adaptação dos Oceanos.png",
    "folder": "fldhl000e0000000",
    "_key": "!items!hl00280000000000",
    "system": {
      "name": "Adaptação dos Oceanos",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "netune",
      "legadoNome": "Netune",
      "description": "Você respira e enxerga normalmente dentro e fora d'água, além de não receber as penalidades aplicadas por Combate Aquático. Em terra, você adapta o seu corpo, transformando a sua cauda em um par de pernas humanoides.",
      "subEffects": [],
      "actions": []
    }
  },
  {
    "_id": "hl00290000000000",
    "name": "Conexão Psíquica",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Conexão Psíquica.png",
    "folder": "fldhl000e0000000",
    "_key": "!items!hl00290000000000",
    "system": {
      "name": "Conexão Psíquica",
      "category": "legado",
      "cost": "",
      "typeAction": "acaoRapida",
      "typeAbility": "legado",
      "types": [
        "ativa"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "netune",
      "legadoNome": "Netune",
      "description": "Sem custo de Ação, você consegue se comunicar mentalmente com um Alvo dentro de 6 metros. Esse efeito permanece ativo por 1 minuto, ou até que você se comunique mentalmente com outro Alvo com esse efeito.",
      "subEffects": [],
      "actions": [
        {
          "id": "act_conexao_psiquica",
          "name": "Conexão Psíquica",
          "description": "Comunicação mental telepática com um alvo a até 6 metros durante 1 minuto.",
          "cost": "",
          "type": {
            "actionType": "acaoRapida",
            "category": "suporte",
            "tags": [
              "telepatia"
            ]
          },
          "attack": {
            "hasAttack": false
          },
          "damage": {
            "hasDamage": false
          },
          "healing": {
            "hasHealing": false
          },
          "condition": {
            "hasCondition": false
          },
          "check": {
            "hasCheck": false
          },
          "areaOfEffect": {
            "hasArea": false
          }
        }
      ]
    }
  },
  {
    "_id": "hl002a0000000000",
    "name": "Recompensa da Caçada",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Recompensa da Caçada.png",
    "folder": "fldhl000e0000000",
    "_key": "!items!hl002a0000000000",
    "system": {
      "name": "Recompensa da Caçada",
      "category": "legado",
      "cost": "",
      "typeAction": "reacao",
      "typeAbility": "legado",
      "types": [
        "reacao"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "netune",
      "legadoNome": "Netune",
      "description": "Enquanto estiver em combate, ao final de um turno que você tenha causado qualquer tipo de dano nos Pontos de Vida de um Alvo ou tenha utilizado Pontos de Energia, você poderá realizar um Teste de Destino, Dif. 10. Caso tenha sucesso, você regenerará 1 Ponto de Energia.",
      "subEffects": [],
      "actions": [
        {
          "id": "act_recompensa_cacada",
          "name": "Recompensa da Caçada",
          "description": "No final do seu turno após causar dano em PV ou gastar PE: Teste de Destino Dif. 10 para recuperar 1 PE.",
          "cost": "",
          "type": {
            "actionType": "reacao",
            "category": "suporte",
            "tags": [
              "energia",
              "destino"
            ]
          },
          "attack": {
            "hasAttack": false
          },
          "damage": {
            "hasDamage": false
          },
          "healing": {
            "hasHealing": true,
            "formula": "1",
            "type": "pe"
          },
          "condition": {
            "hasCondition": false
          },
          "check": {
            "hasCheck": true,
            "category": "destiny",
            "attribute": "destiny",
            "difficulty": 10,
            "onSuccess": "Regenera 1 Ponto de Energia",
            "onFailure": "Não recupera PE"
          },
          "areaOfEffect": {
            "hasArea": false
          }
        }
      ]
    }
  },
  {
    "_id": "hl002b0000000000",
    "name": "Agraciado pelos Rituais",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Agraciado pelos Rituais.png",
    "folder": "fldhl000f0000000",
    "_key": "!items!hl002b0000000000",
    "system": {
      "name": "Agraciado pelos Rituais",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "orkrash",
      "legadoNome": "Orkrash",
      "description": "Ao iniciar um Repouso Completo, você poderá realizar um pequeno ritual, que fará com que você, e todos os seus Alvos Aliados dentro de 20 metros, recebam os efeitos desse Repouso Completo em 4 horas, ao invés de 6 horas.",
      "subEffects": [],
      "actions": []
    }
  },
  {
    "_id": "hl002c0000000000",
    "name": "Marca Ritualística",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Marca Ritualística.png",
    "folder": "fldhl000f0000000",
    "_key": "!items!hl002c0000000000",
    "system": {
      "name": "Marca Ritualística",
      "category": "legado",
      "cost": "",
      "typeAction": "acaoSimples",
      "typeAbility": "legado",
      "types": [
        "ativa"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "orkrash",
      "legadoNome": "Orkrash",
      "description": "Com uma Ação Simples, você poderá marcar um local em uma superfície dentro de 1 metro. Caso um Alvo se aproxime de 10 metros desse local, você sentirá uma perturbação mística, sabendo que algo se aproximou do local. Esse efeito permanece ativo por 4 horas. Somente um local poderá ser marcado por vez.",
      "subEffects": [],
      "actions": [
        {
          "id": "act_marca_ritualistica",
          "name": "Marca Ritualística",
          "description": "Inscreve uma marca de alarme por 4 horas. Alerta quando qualquer criatura se aproximar a até 10 metros.",
          "cost": "",
          "type": {
            "actionType": "acaoSimples",
            "category": "utilidade",
            "tags": [
              "alarme",
              "ritual"
            ]
          },
          "attack": {
            "hasAttack": false
          },
          "damage": {
            "hasDamage": false
          },
          "healing": {
            "hasHealing": false
          },
          "condition": {
            "hasCondition": false
          },
          "check": {
            "hasCheck": false
          },
          "areaOfEffect": {
            "hasArea": true,
            "shape": "circle",
            "size": 10,
            "unit": "m"
          }
        }
      ]
    }
  },
  {
    "_id": "hl002d0000000000",
    "name": "Fúria dos Antigos",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Fúria dos Antigos.png",
    "folder": "fldhl000f0000000",
    "_key": "!items!hl002d0000000000",
    "system": {
      "name": "Fúria dos Antigos",
      "category": "legado",
      "cost": "",
      "typeAction": "reacao",
      "typeAbility": "legado",
      "types": [
        "reacao",
        "suporte"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "orkrash",
      "legadoNome": "Orkrash",
      "description": "Enquanto estiver em combate, ao chegar na metade, ou menos, do seu total máximo de Pontos de Vida, você poderá receber 1 ponto em todos os seus Parâmetros até o final desse combate. Esse ponto adicional pode ultrapassar o valor máximo de um Parâmetro. Esse efeito só poderá ser realizado novamente após concluir um Repouso Completo.",
      "subEffects": [],
      "actions": [
        {
          "id": "act_furia_antigos",
          "name": "Fúria dos Antigos",
          "description": "Ao ficar com metade ou menos do PV máximo em combate: recebe +1 em todos os Parâmetros até o fim do combate (1x por Repouso Completo).",
          "cost": "",
          "type": {
            "actionType": "reacao",
            "category": "suporte",
            "tags": [
              "buff",
              "combate"
            ]
          },
          "attack": {
            "hasAttack": false
          },
          "damage": {
            "hasDamage": false
          },
          "healing": {
            "hasHealing": false
          },
          "condition": {
            "hasCondition": false
          },
          "check": {
            "hasCheck": false
          },
          "areaOfEffect": {
            "hasArea": false
          }
        }
      ]
    }
  },
  {
    "_id": "hl002e0000000000",
    "name": "Vontade das Brumas",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Vontade das Brumas.png",
    "folder": "fldhl00100000000",
    "_key": "!items!hl002e0000000000",
    "system": {
      "name": "Vontade das Brumas",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "seiko",
      "legadoNome": "Seiko",
      "description": "Você pode tocar um Alvo morto para visualizar fragmentos de sua memória. A quantidade e a clareza dessas memórias serão definidas pelo Narrador.",
      "subEffects": [],
      "actions": []
    }
  },
  {
    "_id": "hl002f0000000000",
    "name": "Espelho da Alma",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Espelho da Alma.png",
    "folder": "fldhl00100000000",
    "_key": "!items!hl002f0000000000",
    "system": {
      "name": "Espelho da Alma",
      "category": "legado",
      "cost": "",
      "typeAction": "acaoSimples",
      "typeAbility": "legado",
      "types": [
        "ativa"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "seiko",
      "legadoNome": "Seiko",
      "description": "Com uma Ação Simples, você pode alterar a sua forma por completo, tornando-se um animal terrestre da fauna selvagem de Auroria desde que seja autorizada pelo Narrador. Esse animal deverá ter a mesma Categoria de Tamanho que a sua. Caso você possua equipamentos e pertences ao modificar a sua forma, eles serão transformados em pequenas marcas místicas, que se espalham pelo seu corpo, retornando à sua forma original quando esse efeito for desfeito.\nEnquanto estiver com a forma alterada, você perde todo Efeito Positivo e Foco ativo, além de não poder utilizar Habilidades de Caminhos. Essa forma não possui duração, mas você poderá desfazê-la com uma Ação Simples. Ao realizar um Repouso a forma é desfeita.\nVocê também poderá utilizar essa habilidade para apenas alterar a cor dos seus olhos ou pelos. Dessa forma, o efeito permanece ativo por 10 minutos.",
      "subEffects": [],
      "actions": [
        {
          "id": "act_espelho_alma",
          "name": "Espelho da Alma",
          "description": "Metamorfoseia-se em animal selvagem terrestre de mesmo tamanho ou altera cor dos olhos/pelos por 10 min.",
          "cost": "",
          "type": {
            "actionType": "acaoSimples",
            "category": "utilidade",
            "tags": [
              "metamorfose"
            ]
          },
          "attack": {
            "hasAttack": false
          },
          "damage": {
            "hasDamage": false
          },
          "healing": {
            "hasHealing": false
          },
          "condition": {
            "hasCondition": false
          },
          "check": {
            "hasCheck": false
          },
          "areaOfEffect": {
            "hasArea": false
          }
        }
      ]
    }
  },
  {
    "_id": "hl00300000000000",
    "name": "Resguardo de Energia",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Resguardo de Energia.png",
    "folder": "fldhl00100000000",
    "_key": "!items!hl00300000000000",
    "system": {
      "name": "Resguardo de Energia",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "seiko",
      "legadoNome": "Seiko",
      "description": "Você é imune a efeitos de Alvos Inimigos que removam os seus Pontos de Energia. Você ainda é afetado por Envenenado.",
      "subEffects": [],
      "actions": []
    }
  },
  {
    "_id": "hl00310000000000",
    "name": "Virtude do Primeiro Povo",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Virtude do Primeiro Povo.png",
    "folder": "fldhl00110000000",
    "_key": "!items!hl00310000000000",
    "system": {
      "name": "Virtude do Primeiro Povo",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "ursar",
      "legadoNome": "Ursar",
      "description": "Ao tocar o corpo de um Alvo, você poderá ler e acalmar as suas emoções.",
      "subEffects": [],
      "actions": []
    }
  },
  {
    "_id": "hl00320000000000",
    "name": "Energia Pacífica",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Energia Pacífica.png",
    "folder": "fldhl00110000000",
    "_key": "!items!hl00320000000000",
    "system": {
      "name": "Energia Pacífica",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "ursar",
      "legadoNome": "Ursar",
      "description": "Enquanto estiver em combate, o primeiro teste de Precisão ou Canalização de um Alvo Inimigo contra você será reduzido em 1. Esse efeito ocorre apenas uma vez por Alvo Inimigo em um mesmo combate.",
      "subEffects": [],
      "actions": []
    }
  },
  {
    "_id": "hl00330000000000",
    "name": "Presente de Norduk",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Presente de Norduk.png",
    "folder": "fldhl00110000000",
    "_key": "!items!hl00330000000000",
    "system": {
      "name": "Presente de Norduk",
      "category": "legado",
      "cost": "",
      "typeAction": "acaoSimples",
      "typeAbility": "legado",
      "types": [
        "suporte"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "ursar",
      "legadoNome": "Ursar",
      "description": "Ao concluir um Repouso Completo, você receberá um valor de Pontos de Vida Temporários equivalente ao dobro do seu total máximo de Pontos de Energia.",
      "subEffects": [],
      "actions": [
        {
          "id": "act_presente_norduk",
          "name": "Presente de Norduk",
          "description": "Ao concluir um Repouso Completo, recebe Pontos de Vida Temporários = 2 * PE Máximo.",
          "cost": "",
          "type": {
            "actionType": "acaoSimples",
            "category": "suporte",
            "tags": [
              "pv_temporario",
              "repouso"
            ]
          },
          "attack": {
            "hasAttack": false
          },
          "damage": {
            "hasDamage": false
          },
          "healing": {
            "hasHealing": true,
            "formula": "2 * @pe.max",
            "type": "temp"
          },
          "condition": {
            "hasCondition": false
          },
          "check": {
            "hasCheck": false
          },
          "areaOfEffect": {
            "hasArea": false
          }
        }
      ]
    }
  },
  {
    "_id": "hl00340000000000",
    "name": "Força de Gruneak",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Força de Gruneak.png",
    "folder": "fldhl00120000000",
    "_key": "!items!hl00340000000000",
    "effects": [
      {
        "_id": "eff_00340000000000",
        "_key": "!items.effects!hl00340000000000.eff_00340000000000",
        "name": "Força de Gruneak",
        "img": "modules/gaia-compendium-manager/assets/legados/Força de Gruneak.png",
        "icon": "modules/gaia-compendium-manager/assets/legados/Força de Gruneak.png",
        "origin": "!items!hl00340000000000",
        "disabled": false,
        "transfer": true,
        "changes": [
          {
            "key": "system.encumbrance.max",
            "mode": 2,
            "value": "120"
          }
        ],
        "duration": {
          "rounds": null,
          "seconds": null
        },
        "description": "Carga Máxima aumentada para 120 Unidades e dobro da capacidade de erguer/movimentar objetos."
      }
    ],
    "system": {
      "name": "Força de Gruneak",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "valdrak",
      "legadoNome": "Valdrak",
      "description": "O seu corpo possui uma força descomunal, possuindo um total de 120 pontos de Unidade, ao invés de 100. A sua base de valor da regra ERGUER E MOVIMENTAR OBJETOS é dobrada. O valor aumentado a cada ponto de Brutalidade não é alterado por essa habilidade.",
      "subEffects": [],
      "actions": []
    }
  },
  {
    "_id": "hl00350000000000",
    "name": "Resiliência",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Resiliência.png",
    "folder": "fldhl00120000000",
    "_key": "!items!hl00350000000000",
    "system": {
      "name": "Resiliência",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "valdrak",
      "legadoNome": "Valdrak",
      "description": "Você é imune a qualquer efeito que o faria se deslocar involuntariamente.",
      "subEffects": [],
      "actions": []
    }
  },
  {
    "_id": "hl00360000000000",
    "name": "Incansável",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Incansável.png",
    "folder": "fldhl00120000000",
    "_key": "!items!hl00360000000000",
    "system": {
      "name": "Incansável",
      "category": "legado",
      "cost": "",
      "typeAction": "reacao",
      "typeAbility": "legado",
      "types": [
        "reacao"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "valdrak",
      "legadoNome": "Valdrak",
      "description": "Você ignora 1 ponto de Exaustão recebido. Esse efeito só poderá ser realizado novamente após concluir um Repouso Completo.",
      "subEffects": [],
      "actions": [
        {
          "id": "act_incansavel",
          "name": "Incansável",
          "description": "Ignora 1 ponto de Exaustão recebido (1x por Repouso Completo).",
          "cost": "",
          "type": {
            "actionType": "reacao",
            "category": "defesa",
            "tags": [
              "exaustao",
              "repouso"
            ]
          },
          "attack": {
            "hasAttack": false
          },
          "damage": {
            "hasDamage": false
          },
          "healing": {
            "hasHealing": false
          },
          "condition": {
            "hasCondition": false
          },
          "check": {
            "hasCheck": false
          },
          "areaOfEffect": {
            "hasArea": false
          }
        }
      ]
    }
  },
  {
    "_id": "hl00370000000000",
    "name": "Ver a Verdade",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Ver a Verdade.png",
    "folder": "fldhl00130000000",
    "_key": "!items!hl00370000000000",
    "system": {
      "name": "Ver a Verdade",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "venneli",
      "legadoNome": "Vennéli",
      "description": "Enquanto estiver tocando o corpo de um Alvo você poderá identificar se ele está mentindo ou não.",
      "subEffects": [],
      "actions": []
    }
  },
  {
    "_id": "hl00380000000000",
    "name": "Resplendor",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Resplendor.png",
    "folder": "fldhl00130000000",
    "_key": "!items!hl00380000000000",
    "system": {
      "name": "Resplendor",
      "category": "legado",
      "cost": "",
      "typeAction": "acaoSimples",
      "typeAbility": "legado",
      "types": [
        "ativa"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "venneli",
      "legadoNome": "Vennéli",
      "description": "Com a sua Ação Simples, você poderá desfazer as mandalas em suas costas, criando um par de asas etéreas, que lhe concedem Voar. Você poderá desfazer as asas com uma Ação Simples.",
      "subEffects": [],
      "actions": [
        {
          "id": "act_resplendor",
          "name": "Resplendor",
          "description": "Manifesta asas etéreas concedendo deslocamento de Voo. Desfeita com outra Ação Simples.",
          "cost": "",
          "type": {
            "actionType": "acaoSimples",
            "category": "utilidade",
            "tags": [
              "voo",
              "locomocao"
            ]
          },
          "attack": {
            "hasAttack": false
          },
          "damage": {
            "hasDamage": false
          },
          "healing": {
            "hasHealing": false
          },
          "condition": {
            "hasCondition": false
          },
          "check": {
            "hasCheck": false
          },
          "areaOfEffect": {
            "hasArea": false
          }
        }
      ]
    }
  },
  {
    "_id": "hl00390000000000",
    "name": "Toque da Salvação",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Toque da Salvação.png",
    "folder": "fldhl00130000000",
    "_key": "!items!hl00390000000000",
    "system": {
      "name": "Toque da Salvação",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "venneli",
      "legadoNome": "Vennéli",
      "description": "Você pode tocar um Alvo Incapacitado, de modo que ele não precise mais rolar o Dado de Morte até a próxima vez que ele ficar Incapacitado.",
      "subEffects": [],
      "actions": []
    }
  },
  {
    "_id": "hl003a0000000000",
    "name": "Elevar a Grandeza",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Elevar a Grandeza.png",
    "folder": "fldhl00140000000",
    "_key": "!items!hl003a0000000000",
    "system": {
      "name": "Elevar a Grandeza",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "yuansu",
      "legadoNome": "Yuansu",
      "description": "Você pode levitar a até 30 centímetros da superfície sólida atual. Você pode utilizar a sua Movimentação enquanto estiver levitando, ignorando também locais com Terreno Difícil.",
      "subEffects": [],
      "actions": []
    }
  },
  {
    "_id": "hl003b0000000000",
    "name": "Dinastia Narzepiana",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Dinastia Narzepiana.png",
    "folder": "fldhl00140000000",
    "_key": "!items!hl003b0000000000",
    "system": {
      "name": "Dinastia Narzepiana",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "yuansu",
      "legadoNome": "Yuansu",
      "description": "Os seus Parâmetros não poderão ser reduzidos por efeitos de Habilidades de Caminho e Características.",
      "subEffects": [],
      "actions": []
    }
  },
  {
    "_id": "hl003c0000000000",
    "name": "Poder Oculto",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Poder Oculto.png",
    "folder": "fldhl00140000000",
    "_key": "!items!hl003c0000000000",
    "system": {
      "name": "Poder Oculto",
      "category": "legado",
      "cost": "",
      "typeAction": "reacao",
      "typeAbility": "legado",
      "types": [
        "reacao"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "yuansu",
      "legadoNome": "Yuansu",
      "description": "Enquanto estiver em combate, você poderá refazer um teste de Parâmetro que tenha realizado, devendo ficar com o novo resultado. Essa habilidade só poderá ser utilizada uma vez por combate.",
      "subEffects": [],
      "actions": [
        {
          "id": "act_poder_oculto",
          "name": "Poder Oculto",
          "description": "Em combate, permite re-rolar um teste de Parâmetro realizado (1x por combate).",
          "cost": "",
          "type": {
            "actionType": "reacao",
            "category": "suporte",
            "tags": [
              "reroll",
              "combate"
            ]
          },
          "attack": {
            "hasAttack": false
          },
          "damage": {
            "hasDamage": false
          },
          "healing": {
            "hasHealing": false
          },
          "condition": {
            "hasCondition": false
          },
          "check": {
            "hasCheck": false
          },
          "areaOfEffect": {
            "hasArea": false
          }
        }
      ]
    }
  },
  {
    "_id": "hl003d0000000000",
    "name": "Corpo Fechado",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Corpo Fechado.png",
    "folder": "fldhl00150000000",
    "_key": "!items!hl003d0000000000",
    "system": {
      "name": "Corpo Fechado",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "zaokan",
      "legadoNome": "Zaokan",
      "description": "A regra de COMIDA, BEBIDA E DESCANSO é modificada para você, de modo que você ganhe 1 ponto de Exaustão Temporária a cada 48 horas, ao invés de 24 horas. Você também possui o dobro dos valores base da regra de Fôlego.",
      "subEffects": [],
      "actions": []
    }
  },
  {
    "_id": "hl003e0000000000",
    "name": "Superar a Dor",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Superar a Dor.png",
    "folder": "fldhl00150000000",
    "_key": "!items!hl003e0000000000",
    "system": {
      "name": "Superar a Dor",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "zaokan",
      "legadoNome": "Zaokan",
      "description": "Você remove 1 ponto adicional de Exaustão, sempre que concluir um Repouso Completo.",
      "subEffects": [],
      "actions": []
    }
  },
  {
    "_id": "hl003f0000000000",
    "name": "Furor das Brumas",
    "type": "ability",
    "img": "modules/gaia-compendium-manager/assets/legados/Furor das Brumas.png",
    "folder": "fldhl00150000000",
    "_key": "!items!hl003f0000000000",
    "system": {
      "name": "Furor das Brumas",
      "category": "legado",
      "cost": "",
      "typeAction": "",
      "typeAbility": "legado",
      "types": [
        "passiva"
      ],
      "quote": "",
      "numberTarget": "1",
      "range": "Pessoal",
      "duration": "Permanente",
      "level": 1,
      "legadoId": "zaokan",
      "legadoNome": "Zaokan",
      "description": "Ao chegar a zero, ou menos, Pontos de Vida, você ainda poderá agir normalmente, não sendo afetado pelos efeitos de Incapacitado. Para todos os efeitos, considere que você não esteja Incapacitado. Você ainda recebe o ponto de Exaustão por ter ficado Incapacitado, como também recebe Pontos de Vida Negativos, devendo rolar o Dado de Morte nos seus turnos enquanto permanecer com zero, ou menos, Pontos de Vida.",
      "subEffects": [],
      "actions": []
    }
  }
];
