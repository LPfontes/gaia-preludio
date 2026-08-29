# Gaia: Prelúdio — Sistema para Foundry Virtual Tabletop (v14+)

![Foundry VTT](https://img.shields.io/badge/Foundry-v14%2B-orange?style=flat-square&logo=foundry-virtual-tabletop)
![Status](https://img.shields.io/badge/Status-Est%C3%A1vel-success?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)
![Language](https://img.shields.io/badge/Language-Portugu%C3%AAs%20(Brasil)-green?style=flat-square)

Implementação não oficial do sistema de RPG de mesa **Gaia: Prelúdio** para o **Foundry Virtual Tabletop**, construído sobre a arquitetura moderna de `ApplicationV2`, `DataModels` e `HandlebarsApplicationMixin`.

---

## Como Instalar no Foundry VTT

1. Abra o inicializador do **Foundry VTT**.
2. Vá até a aba **Game Systems** (Sistemas de Jogo) e clique em **Install System** (Instalar Sistema).
3. No campo **Manifest URL**, cole o seguinte link:
   ```text
   https://github.com/LPfontes/gaia-preludio/releases/latest/download/system.json
   ```
4. Clique em **Install** (Instalar) e aguarde o download.

---

## Principais Funcionalidades

### Fichas de Personagem e Legado (`LegacySheet`)
- **8 Parâmetros Base:** Precisão, Brutalidade, Destreza, Agilidade, Canalização, Arcano, Espírito e Vigor.
- **14 Conhecimentos & Maestrias:** Rastreamento de níveis de perícia com pips e diálogo para desbloqueio de maestrias especializadas.
- **Guia de Despertar Inicial (`AwakeningGuide`):** Janela assistente interativa passo a passo para distribuição de pontos, cálculo de atributos e PV.
- **Recursos Dinâmicos:**
  - Vida (PV) e Pontos de Vida Temporários (**PVT**).
  - Energia (PE) e Pontos de Energia Temporários (**PET**).
  - Escudos de Defesa (Bloqueio e Esquiva / Agilidade) e Iniciativa.
  - Resistências, Imunidades e Reduções fixas de dano com tags interativas.

### Regras de Combate e Sobrevivência
- **Sistema de Exaustão (0 a 6):**
  - Rastreamento com 6 pips (caveira no 6º nível).
  - Aplica automaticamente **-1 de penalidade** por ponto em todos os testes de Parâmetro e Bloqueio (`- @exaustao`).
  - Reduz **1 metro** da movimentação por ponto (`totalMovement`).
  - Notificação e estado de **Morte** ao atingir 6 pontos.
- **Janela do Dado de Morte (`GaiaDeathSaveDialog`):**
  - Abre automaticamente ao ficar **Incapacitado** (0 PV ou morrendo).
  - **1 a 6:** Sentença do Corruptor (2 Sentenças = Morte).
  - **7 a 12:** Dádiva do Artesão (2 Dádivas = Estabilizado).
  - Botão de **Estabilizar** e **Regenerar 1d4 PV** (a cada 10 minutos estabilizado).

### Motor de Ações, Efeitos e Itens
- **Ações Complexas:** Ataques, Embates, Testes de Dificuldade/CD, Condições e Templates de Área de Efeito (AoE - Círculo, Cone, Linha, Retângulo).
- **Navegador de Itens e Habilidades (`GaiaItemBrowser`):** Busca global em tempo real em compêndios e itens do mundo para importação direta na ficha.
- **Pedido de Testes para o Narrador (`promptRollRequestDialog`):** Criação de botões interativos no Chat para jogadores realizarem testes solicitados.
- **Assistente de Criaturas e Legados NPC (`promptCreatureWizardDialog` / `promptLegacyNpcWizardDialog`):** Geração automática de estatísticas balanceadas por nível de dificuldade.

---

## Tecnologias Utilizadas

- **Foundry VTT v14 API**: `ApplicationV2`, `HandlebarsApplicationMixin`, `DataModel`, `SchemaField`, `TypeDataModel`.
- **Vanilla JavaScript (ES Modules)**: Modularização limpa sem dependências externas de compilação.
- **Vanilla CSS**: Design temático com variáveis CSS centralizadas (`variables.css`) e padrão responsivo medieval.
- **Handlebars**: Templates parciais organizados e limpos.

---

## Licença

Este projeto está licenciado sob a licença **MIT**. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.
