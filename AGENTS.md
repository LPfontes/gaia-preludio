# Diretrizes e Regras de Desenvolvimento (Gaia: Prelúdio)

## 1. Verificação de Documentação Obrigatória

Sempre que for implementar, refatorar, corrigir ou estender qualquer código, lógica, sheet, diálogo ou componente deste sistema:

1. **Consultar a Documentação Oficial do Foundry VTT v14**:
   - Consultar o arquivo [`docs/FOUNDRY_V14_API.md`](file:///c:/Users/lpfon/AppData/Local/FoundryVTT/Data/systems/gaia-preludio/docs/FOUNDRY_V14_API.md) antes de usar APIs do Foundry (como `Roll`, `ChatMessage`, `ApplicationV2`, `DialogV2`, `DocumentSheetV2`, `DataModel`, `Hooks`, etc.).
   - Garantir total conformidade com a versão 14 (evitando métodos descontinuados como `{ rollMode }` em `Roll#toMessage`, priorizando `messageMode`, arquiteturas modernas `V2`, etc.).

2. **Consultar a Documentação do Sistema Gaia: Prelúdio**:
   - Consultar o arquivo [`DOCUMENTACAO_SISTEMA.md`](file:///c:/Users/lpfon/AppData/Local/FoundryVTT/Data/systems/gaia-preludio/DOCUMENTACAO_SISTEMA.md) para manter a coerência das regras de jogo (Aptidão, Modificadores, Exaustão, Condições, Fórmulas de Dano, Ações, Defesas e Fluxos de Combate).

3. **Validação e Integridade**:
   - Nunca assumir APIs de versões antigas do Foundry (v10/v11/v12/v13) sem validar a compatibilidade com a v14.
   - Preservar a consistência estilística e arquitetural já adotada nos módulos e helpers em `module/`.

---

## 2. Estilo Visual e Design Tokens (CSS)

1. **Uso Obrigatório das Variáveis de Design Tokens**:
   - Utilizar sempre as variáveis CSS definidas em [`styles/base/variables.css`](file:///c:/Users/lpfon/AppData/Local/FoundryVTT/Data/systems/gaia-preludio/styles/base/variables.css) como padrão para todo e qualquer estilo (cores de fundo, texto, bordas, fontes e dimensões).
   - Evitar valores de cores hardcoded ou estilos inline discrepantes; manter o tema de pergaminho medieval, couro e ferro.
   - Exemplos:
     - Cores de fundo: `var(--gaia-bg-window)`, `var(--gaia-bg-box)`, `var(--gaia-bg-input)`
     - Tipografia: `var(--gaia-font-medieval)`, tamanhos `var(--gaia-font-xs)` até `var(--gaia-font-3xl)`
     - Textos: `var(--gaia-text-parchment)`, `var(--gaia-text-muted)`, `var(--gaia-text-dim)`
     - Bordas e molduras: `var(--gaia-border-frame)`, `var(--gaia-border-gold)`, `var(--gaia-border-subtle)`
     - Recursos: `var(--gaia-health)`, `var(--gaia-energy)`, `var(--gaia-green)`, `var(--gaia-purple)`, etc.

2. **Proibição Estrita de Emojis**:
   - **NÃO utilizar emojis** em nenhum elemento de interface, botões, títulos, caixas de diálogo, notificações ou cards de chat.
   
