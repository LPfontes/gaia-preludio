# Foundry Virtual Tabletop - API Documentation - Version 14

> **Fonte:** [https://foundryvtt.com/api/](https://foundryvtt.com/api/)  
> **Versão Oficial:** Foundry Virtual Tabletop v14 (Stable) © Foundry Gaming LLC.

---

## Sumário
1. [Visão Geral & Diretrizes da API](#1-visão-geral--diretrizes-da-api)
   - [API Pública vs Privada](#api-pública-vs-privada)
   - [Anotações & Nomenclatura](#anotações--nomenclatura)
   - [Estrutura do Código-Fonte](#estrutura-do-código-fonte)
2. [Documentos e Dados (Documents & Data)](#2-documentos-e-dados)
   - [Abstração de Documentos & Modelos de Dados](#abstração-de-documentos--modelos-de-dados)
   - [Operações de Banco de Dados](#operações-de-banco-de-dados)
   - [Coleções (Collections)](#coleções-collections)
   - [Tipos Primários de Documentos](#tipos-primários-de-documentos-primary-documents)
   - [Tipos de Documentos Embutidos](#tipos-de-documentos-embutidos-embedded-documents)
3. [Game Canvas & WebGL (PixiJS)](#3-game-canvas--webgl)
   - [Canvas Groups](#canvas-groups)
   - [Canvas Layers](#canvas-layers)
   - [Placeable Objects & HUD Overlay](#placeable-objects--hud-overlay)
4. [Interface de Usuário (ApplicationV2)](#4-interface-de-usuário-applicationv2)
   - [Building Blocks](#building-blocks)
   - [DocumentSheetV2 & DialogV2](#documentsheetv2--dialogv2)
5. [Sistema de Rolagem de Dados (Dice Rolling)](#5-sistema-de-rolagem-de-dados-dice-rolling)
   - [Roll & RollTerm](#roll--rollterm)
   - [Tipos de Termos e Dados](#tipos-de-termos-e-dados)
   - [ChatMessage Modes no v14](#chatmessage-modes-no-v14)
6. [Outros Componentes Principais](#6-outros-componentes-principais)
   - [Áudio e Vídeo](#áudio-e-vídeo)
   - [Game Management & GameTime](#game-management--gametime)
   - [Interatividade & Hooks](#interatividade--hooks)

---

## 1. Visão Geral & Diretrizes da API

### API Pública vs Privada

| Tipo | Descrição | Estabilidade & Suporte |
| :--- | :--- | :--- |
| **API Pública** (`@public`) | Métodos e propriedades oficialmente suportados para pacotes e sistemas. | Suporte a depreciação e compatibilidade garantidos entre versões. |
| **Protegida** (`@protected`) | Destinada a classes e subclasses. Ideal para ser estendida/sobrescrita por subclasses de sistemas. | Estável dentro da hierarquia da classe. |
| **API Privada** (`@private` / `#`) | Uso interno do core do Foundry VTT. | Sujeita a mudanças e quebras a qualquer momento, sem aviso prévio. |
| **Interna** (`@internal`) | Pode ser chamada pelo core fora da classe, mas não deve ser usada por pacotes de terceiros. | Sem garantia de compatibilidade. |

### Anotações & Nomenclatura
- `_metodo()`: Métodos iniciados com `_` não anotados devem ser considerados **privados**.
- `#propriedade`: Propriedades e métodos privados nativos do JavaScript ES2022+ (acessíveis apenas dentro da classe declarante).

### Estrutura do Código-Fonte
- `client/`: Código executado no cliente (aplicações, canvas, sheets). Totalmente ESM a partir da v13/v14.
- `common/`: Código compartilhado entre cliente e servidor (DataModels, validações de schema, regras de documentos).
- `public/scripts/foundry.mjs`: Bundle client-side consolidado exposto sob a namespace global `foundry` e objetos globais (`Actor`, `Item`, `Roll`, `CONFIG`, `ChatMessage`, etc.).

---

## 2. Documentos e Dados

### Abstração de Documentos & Modelos de Dados
- `foundry.abstract.DataModel`: Classe base abstrata para definição de esquemas de dados tipados (`foundry.data.fields`).
- `foundry.abstract.Document`: Classe base para documentos do banco de dados (sincronização cliente-servidor).
- `foundry.abstract.TypeDataModel`: Classe base para criar `system` DataModels para subtipos de `Actor`, `Item`, etc.
- `foundry.ClientDocument`: Mixin com métodos do lado do cliente (sheets, canvas, sockets).
- `foundry.CanvasDocument`: Mixin para documentos que possuem representação espacial na cena.

### Operações de Banco de Dados
- `foundry.abstract.DatabaseBackend`: Interface transacional abstrata (CRUD).
- `foundry.data.ClientDatabaseBackend`: Implementação client-side que despacha operações de criação, edição e exclusão.

### Coleções (Collections)
- `foundry.documents.abstract.WorldCollection`: Singleton para coleções mundiais (`game.actors`, `game.items`, `game.scenes`, `game.messages`, etc.).
- `foundry.documents.collections.CompendiumCollection`: Gerenciador de pacotes de compêndio (`game.packs.get(...)`).

### Tipos Primários de Documentos (Primary Documents)
Constante de referência: `CONST.PRIMARY_DOCUMENT_TYPES`

- **Actor** (`foundry.documents.Actor`): Personagens, NPCs, Criaturas.
- **Item** (`foundry.documents.Item`): Armas, armaduras, habilidades, magias (podem ser do mundo ou embutidos no Ator).
- **ChatMessage** (`foundry.documents.ChatMessage`): Mensagens de chat, rolagens, cartões interativos.
- **Combat** (`foundry.documents.Combat`): Encontros de combate e rastreadores de turno/iniciativa.
- **Scene** (`foundry.documents.Scene`): Mapas e cenas de jogo.
- **JournalEntry** (`foundry.documents.JournalEntry`): Diários e anotações ricas.
- **RollTable** (`foundry.documents.RollTable`): Tabelas de rolagem aleatória.
- **Playlist** (`foundry.documents.Playlist`): Músicas e listas de reprodução sonora.
- **Macro** (`foundry.documents.Macro`): Scripts e atalhos de macros.
- **Folder** (`foundry.documents.Folder`): Pastas organizacionais da barra lateral.
- **User** (`foundry.documents.User`): Usuários e permissões.
- **Adventure** (`foundry.documents.Adventure`): Pacotes de aventura para compêndios.
- **Cards** (`foundry.documents.Cards`): Baralhos e pilhas de cartas.
- **Setting** (`foundry.documents.Setting`): Configurações mundiais persistentes.
- **FogExploration** (`foundry.documents.FogExploration`): Estado de névoa de guerra por usuário e cena.

### Tipos de Documentos Embutidos (Embedded Documents)
Constante de referência: `CONST.EMBEDDED_DOCUMENT_TYPES`
Acessados através de `EmbeddedCollection` (ex: `actor.items`, `actor.effects`, `scene.tokens`).

- **ActiveEffect** (`foundry.documents.ActiveEffect`): Modificadores, buffs, debuffs e condições.
- **Token** (`foundry.documents.TokenDocument`): Representação física de atores no Canvas.
- **ActorDelta** (`foundry.documents.ActorDelta`): Modificações sintéticas em tokens desvinculados (Unlinked Tokens).
- **Combatant** (`foundry.documents.Combatant`): Participantes de um combate.
- **AmbientLight** / **AmbientSound**: Luzes e sons posicionados na cena.
- **Region** / **RegionBehavior**: Regiões interativas e gatilhos de comportamento espacial.
- **Wall** / **Drawing** / **Tile** / **Note**: Paredes, desenhos, tiles e notas de mapa.
- **JournalEntryPage** / **JournalEntryCategory**: Páginas de diário (Texto, Imagem, PDF, Vídeo, Markdown).
- **Card** / **TableResult**: Cartas em baralhos e resultados de tabelas.

---

## 3. Game Canvas & WebGL

O Canvas visual do Foundry VTT é renderizado com **PixiJS**:

### Canvas Groups
1. `EffectsCanvasGroup`: Efeitos visuais, iluminação, escuridão, clima e pós-processamento.
2. `EnvironmentCanvasGroup`: Ambientes e elementos não-interface.
3. `PrimaryCanvasGroup`: Objetos tangíveis na cena (Tokens, Tiles, Desenhos).
4. `InterfaceCanvasGroup`: Elementos de UI sobre o grid (controles, réguas, sobreposições).
5. `OverlayCanvasGroup`: Elementos fixos desacoplados da transformação do palco.
6. `CanvasVisibility`: Visão dinâmica, iluminação e cálculo de névoa de guerra.

### Canvas Layers
- `ControlsLayer`, `DrawingsLayer`, `GridLayer`, `LightingLayer`, `NotesLayer`, `RegionLayer`, `SoundsLayer`, `TilesLayer`, `TokenLayer`, `WallsLayer`.

### Placeable Objects & HUD Overlay
- Cada documento no canvas possui um correspondente `PlaceableObject` (ex: `Token` -> `foundry.canvas.placeables.Token`).
- HUDs HTML são controlados por `TokenHUD`, `TileHUD`, `DrawingHUD`.

---

## 4. Interface de Usuário (ApplicationV2)

A arquitetura moderna de interfaces do Foundry v14 é baseada em `ApplicationV2`:

- `foundry.applications.api.ApplicationV2`: Base reativa com ciclo de vida estruturado (`_renderHTML`, `_prepareContext`, `_onRender`).
- `foundry.applications.api.DocumentSheetV2`: Ficha padrão para edição de documentos (Actors, Items, Effects).
- `foundry.applications.sheets.ActorSheetV2`: Ficha de Ator especializada.
- `foundry.applications.sheets.ItemSheetV2`: Ficha de Item especializada.
- `foundry.applications.api.DialogV2`: Criação de diálogos assíncronos modernos (`DialogV2.wait`, `DialogV2.prompt`, `DialogV2.confirm`).
- `foundry.applications.ux.ContextMenu`, `DragDrop`, `Tabs`, `TextEditor`: Utilitários modernos de experiência de usuário.

---

## 5. Sistema de Rolagem de Dados (Dice Rolling)

### Roll & RollTerm
- `foundry.dice.Roll`: Construtor e avaliador de fórmulas (`new Roll(formula, data).evaluate()`).
- `RollTerm`: Termos individuais de uma fórmula (como `DiceTerm`, `NumericTerm`, `OperatorTerm`, `ParentheticalTerm`, `PoolTerm`, `FunctionTerm`).

### ChatMessage Modes (Atualização v14)
No Foundry v14, as opções de exibição de rolagem para o chat foram migradas:
- A opção `{ rollMode }` em `Roll#toMessage` foi descontinuada em favor de `{ messageMode }`.
- Valores válidos residem em `CONFIG.ChatMessage.modes` (`publicroll`, `gmroll`, `blindroll`, `selfroll`).

Exemplo v14:
```javascript
const roll = new Roll("1d12 + @mod", { mod: 3 });
await roll.evaluate();

await roll.toMessage(
  {
    speaker: ChatMessage.getSpeaker({ actor }),
    flavor: "Ataque com Espada"
  },
  {
    messageMode: "publicroll" // No v14 usa-se messageMode
  }
);
```

---

## 6. Outros Componentes Principais

### Áudio e Vídeo
- `foundry.audio.AudioHelper` & `foundry.audio.Sound`: Controle de reprodução e Web Audio API.
- `foundry.helpers.media.ImageHelper` & `foundry.helpers.media.VideoHelper`: Carregamento, texturas e redimensionamento.

### Game Management & GameTime
- `game` (`foundry.Game`): Instância central ativa no cliente.
- `foundry.helpers.GameTime`: Gestor de tempo no mundo e servidor (`game.time`).

### Interatividade & Hooks
- `Hooks.on(hookName, callback)`: Registro de manipuladores de ciclo de vida.
- `Hooks.callAll(hookName, ...args)` / `Hooks.call(hookName, ...args)`: Disparo de eventos de extensibilidade.
- Principais hooks: `init`, `setup`, `ready`, `renderActorSheet`, `renderItemSheet`, `preCreateItem`, `createItem`, `updateActor`, `deleteToken`, `getChatLogEntryContext`.
