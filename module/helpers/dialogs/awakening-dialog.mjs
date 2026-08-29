/**
 * ==============================================================================
 * AWAKENING GUIDE DIALOG / GUIA DE CRIAÇÃO E DESPERTAR
 * ==============================================================================
 * Suporte a criação de personagens Despertos (Nível 1) e Não-Despertos (Nível 0).
 */

const { DialogV2 } = foundry.applications.api;
const { renderTemplate } = foundry.applications.handlebars;

/**
 * Exibe o diálogo com as abas do Guia de Criação / Despertar Inicial.
 * Suporta modo Desperto (7 pts Parâmetros, 7 pts Conhecimentos, 30+1d6+Vigor PV, 5 PE)
 * e Não-Desperto (4 pts Parâmetros, 7 pts Conhecimentos, 12 PV fixos, 0 PE, 6m movimento, Idioma Comum + 1 adicional).
 *
 * @param {Actor} [actor=null] - Instância opcional do Ator para aplicar os pontos distribuídos
 * @returns {Promise<any>}
 */
export async function promptAwakeningGuideDialog(actor = null) {
  const title = game.i18n.localize("GAIA.CreateActor.AwakeningRulesTitle") || "Guia de Criação: Despertar Inicial";
  
  const parameters = [
    { key: "precision", label: game.i18n.localize("GAIA.Parameter.Precision"), value: 0 },
    { key: "brutality", label: game.i18n.localize("GAIA.Parameter.Brutality"), value: 0 },
    { key: "dexterity", label: game.i18n.localize("GAIA.Parameter.Dexterity"), value: 0 },
    { key: "agility", label: game.i18n.localize("GAIA.Parameter.Agility"), value: 0 },
    { key: "channeling", label: game.i18n.localize("GAIA.Parameter.Channeling"), value: 0 },
    { key: "arcane", label: game.i18n.localize("GAIA.Parameter.Arcane"), value: 0 },
    { key: "spirit", label: game.i18n.localize("GAIA.Parameter.Spirit"), value: 0 },
    { key: "vigor", label: game.i18n.localize("GAIA.Parameter.Vigor"), value: 0 }
  ];

  const knowledge = [
    { key: "charisma", label: game.i18n.localize("GAIA.Knowledge.Charisma"), value: 0 },
    { key: "mystic_knowledge", label: game.i18n.localize("GAIA.Knowledge.MysticKnowledge"), value: 0 },
    { key: "exploration", label: game.i18n.localize("GAIA.Knowledge.Exploration"), value: 0 },
    { key: "stealth", label: game.i18n.localize("GAIA.Knowledge.Stealth"), value: 0 },
    { key: "history", label: game.i18n.localize("GAIA.Knowledge.History"), value: 0 },
    { key: "intimidation", label: game.i18n.localize("GAIA.Knowledge.Intimidation"), value: 0 },
    { key: "intuition", label: game.i18n.localize("GAIA.Knowledge.Intuition"), value: 0 },
    { key: "medicine", label: game.i18n.localize("GAIA.Knowledge.Medicine"), value: 0 },
    { key: "perception", label: game.i18n.localize("GAIA.Knowledge.Perception"), value: 0 },
    { key: "performance", label: game.i18n.localize("GAIA.Knowledge.Performance"), value: 0 },
    { key: "religion", label: game.i18n.localize("GAIA.Knowledge.Religion"), value: 0 },
    { key: "survival", label: game.i18n.localize("GAIA.Knowledge.Survival"), value: 0 },
    { key: "technology", label: game.i18n.localize("GAIA.Knowledge.Technology"), value: 0 },
    { key: "willpower", label: game.i18n.localize("GAIA.Knowledge.Willpower"), value: 0 }
  ];

  // Se o ator já possuir parâmetros com valores, carrega na interface
  if (actor?.system?.parameters?.length) {
    for (const p of parameters) {
      const found = actor.system.parameters.find(ap => String(ap.name || "").toLowerCase() === p.key);
      if (found) p.value = Math.min(2, Number(found.value) || 0);
    }
  }

  // Se o ator já possuir conhecimentos com valores, carrega na interface
  if (actor?.system?.knowledge?.length) {
    for (const k of knowledge) {
      const found = actor.system.knowledge.find(ak => String(ak.name || "").toLowerCase() === k.key);
      if (found) k.value = Math.min(2, Number(found.value) || 0);
    }
  }

  // Lista de idiomas disponíveis para escolha
  const config = /** @type {any} */ (CONFIG).GAIA;
  const availableLanguages = [];
  for (const [key, langObj] of Object.entries(config?.allLanguages ?? {})) {
    if (key === "comum") continue; // Comum é concedido por padrão
    const label = game.i18n.localize(langObj.label || key);
    const categoryLabel = game.i18n.localize(langObj.categoryLabel || "");
    availableLanguages.push({ key, label, categoryLabel });
  }

  // Lista de habilidades do ator (se já possuir)
  const initialAbilities = [];
  if (actor?.items) {
    for (const it of actor.items) {
      if (it.type === "ability") {
        initialAbilities.push({
          id: it.id,
          uuid: it.uuid,
          name: it.name,
          img: it.img || "icons/svg/item-bag.svg",
          type: it.type,
          category: it.system?.category ?? ""
        });
      }
    }
  }

  const content = await renderTemplate("systems/gaia-preludio/templates/dialog/awakening-guide-dialog.hbs", {
    parameters,
    knowledge,
    availableLanguages,
    initialAbilities: initialAbilities.slice(0, 2),
    hasActor: !!actor
  });

  return await DialogV2.prompt({
    classes: ["gaia-preludio", "gaia-dialog", "gaia-awakening-dialog"],
    window: { title },
    content,
    position: { width: 620, height: "auto" },
    render: (event, dialog) => {
      const html = dialog.element;
      const tabButtons = html.querySelectorAll(".gaia-dialog-tab-btn");
      const tabPanes = html.querySelectorAll(".gaia-dialog-tab-pane");
      const navButtons = html.querySelectorAll(".gaia-wizard-nav-btn");
      const okButton = html.querySelector('button[data-action="ok"]');
      const modeRadios = html.querySelectorAll(".creation-mode-radio");
      const introTextEl = html.querySelector(".gaia-intro-description-text");

      const vitalsAwakenedPanel = html.querySelector(".vitals-panel-awakened");
      const vitalsUnawakenedPanel = html.querySelector(".vitals-panel-unawakened");
      const abilitiesAwakenedPanel = html.querySelector(".abilities-panel-awakened");
      const abilitiesUnawakenedPanel = html.querySelector(".abilities-panel-unawakened");
      const paramMaxPointsDisplay = html.querySelector(".gaia-param-max-points");

      let currentMode = "awakened";
      let maxParamPoints = 7;
      const maxKnowPoints = 7;
      const MAX_PER_STAT = 2;

      // Troca de abas
      const switchTab = (targetTab) => {
        tabButtons.forEach(b => b.classList.toggle("active", b.dataset.tab === targetTab));
        tabPanes.forEach(pane => pane.classList.toggle("active", pane.dataset.tab === targetTab));

        if (okButton) {
          okButton.style.display = targetTab === "abilities" ? "inline-flex" : "none";
        }
      };

      tabButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          switchTab(btn.dataset.tab);
        });
      });

      navButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          const nextTab = btn.dataset.nextTab;
          if (nextTab) switchTab(nextTab);
        });
      });

      // Definição / Rolagem de Vida para Desperto
      const rollHpBtn = html.querySelector(".gaia-roll-hp-btn");
      const fixedHpBtn = html.querySelector(".gaia-fixed-hp-btn");
      const calculatedHpDisplay = html.querySelector(".gaia-vitals-calculated-hp");
      const hpInput = html.querySelector(".gaia-hp-selected-input");

      let currentDieVal = 3;

      const updateCalculatedHP = () => {
        if (currentMode === "unawakened") {
          if (calculatedHpDisplay) calculatedHpDisplay.textContent = "12 PV";
          if (hpInput) hpInput.value = "12";
          return;
        }

        const vigorInput = html.querySelector('.gaia-param-dist-input[data-param="vigor"]');
        const vigorVal = Number(vigorInput?.value) || 0;
        const totalHP = 30 + currentDieVal + vigorVal;

        const vigorHint = html.querySelector(".gaia-vigor-hint-val");
        if (vigorHint) vigorHint.textContent = String(vigorVal);

        if (calculatedHpDisplay) {
          calculatedHpDisplay.textContent = `${totalHP} PV (30 + ${currentDieVal} + ${vigorVal} Vig)`;
        }
        if (hpInput) {
          hpInput.value = String(totalHP);
        }
      };

      // Distribuidor de Parâmetros
      const paramPointsCounter = html.querySelector(".gaia-points-left");
      const paramInputs = html.querySelectorAll(".gaia-param-dist-input:not(.gaia-know-dist-input)");
      const paramAdjustBtns = html.querySelectorAll(".gaia-param-adjust-btn:not(.gaia-know-adjust-btn)");

      const updateParamPoints = () => {
        let spent = 0;
        paramInputs.forEach(input => spent += Number(input.value) || 0);

        // Se gastou mais do que o limite do modo atual, reduz os excedentes
        if (spent > maxParamPoints) {
          paramInputs.forEach(input => {
            let val = Number(input.value) || 0;
            while (val > 0 && spent > maxParamPoints) {
              val--;
              spent--;
              input.value = String(val);
            }
          });
        }

        const remaining = Math.max(0, maxParamPoints - spent);

        if (paramPointsCounter) {
          paramPointsCounter.textContent = String(remaining);
          paramPointsCounter.classList.toggle("points-depleted", remaining === 0);
        }

        paramAdjustBtns.forEach(btn => {
          const action = btn.dataset.action;
          const paramKey = btn.dataset.param;
          const input = html.querySelector(`.gaia-param-dist-input[data-param="${paramKey}"]`);
          const currentVal = Number(input?.value) || 0;

          if (action === "increase") {
            btn.disabled = remaining <= 0 || currentVal >= MAX_PER_STAT;
          } else if (action === "decrease") {
            btn.disabled = currentVal <= 0;
          }
        });

        updateCalculatedHP();
      };

      paramAdjustBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          const action = btn.dataset.action;
          const paramKey = btn.dataset.param;
          const input = html.querySelector(`.gaia-param-dist-input[data-param="${paramKey}"]`);
          if (!input) return;

          let currentVal = Number(input.value) || 0;
          let spent = 0;
          paramInputs.forEach(inp => spent += Number(inp.value) || 0);
          const remaining = maxParamPoints - spent;

          if (action === "increase" && remaining > 0 && currentVal < MAX_PER_STAT) {
            input.value = String(currentVal + 1);
          } else if (action === "decrease" && currentVal > 0) {
            input.value = String(currentVal - 1);
          }

          updateParamPoints();
        });
      });

      // Distribuidor de Conhecimentos
      const knowPointsCounter = html.querySelector(".gaia-know-points-left");
      const knowInputs = html.querySelectorAll(".gaia-know-dist-input");
      const knowAdjustBtns = html.querySelectorAll(".gaia-know-adjust-btn");

      const updateKnowPoints = () => {
        let spent = 0;
        knowInputs.forEach(input => spent += Number(input.value) || 0);
        const remaining = Math.max(0, maxKnowPoints - spent);

        if (knowPointsCounter) {
          knowPointsCounter.textContent = String(remaining);
          knowPointsCounter.classList.toggle("points-depleted", remaining === 0);
        }

        knowAdjustBtns.forEach(btn => {
          const action = btn.dataset.action;
          const knowKey = btn.dataset.knowledge;
          const input = html.querySelector(`.gaia-know-dist-input[data-knowledge="${knowKey}"]`);
          const currentVal = Number(input?.value) || 0;

          if (action === "increase") {
            btn.disabled = remaining <= 0 || currentVal >= MAX_PER_STAT;
          } else if (action === "decrease") {
            btn.disabled = currentVal <= 0;
          }
        });
      };

      knowAdjustBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          const action = btn.dataset.action;
          const knowKey = btn.dataset.knowledge;
          const input = html.querySelector(`.gaia-know-dist-input[data-knowledge="${knowKey}"]`);
          if (!input) return;

          let currentVal = Number(input.value) || 0;
          let spent = 0;
          knowInputs.forEach(inp => spent += Number(inp.value) || 0);
          const remaining = maxKnowPoints - spent;

          if (action === "increase" && remaining > 0 && currentVal < MAX_PER_STAT) {
            input.value = String(currentVal + 1);
          } else if (action === "decrease" && currentVal > 0) {
            input.value = String(currentVal - 1);
          }

          updateKnowPoints();
        });
      });

      // Alternância de Modo (Desperto vs Não-Desperto)
      const onModeChange = (newMode) => {
        currentMode = newMode;
        if (currentMode === "unawakened") {
          maxParamPoints = 4;
          if (introTextEl) {
            introTextEl.textContent = game.i18n.localize("GAIA.CreateActor.UnawakenedHint")
              || "Um Não-Desperto possui apenas suas Habilidades de Legado, 4 pontos em Parâmetros (máx 2), 7 pontos em Conhecimentos (máx 2), 12 PV fixos, 0 PE, Movimentação de 6m e o Idioma Comum mais um adicional à escolha.";
          }
          if (paramMaxPointsDisplay) paramMaxPointsDisplay.textContent = "4";
          if (vitalsAwakenedPanel) vitalsAwakenedPanel.style.display = "none";
          if (vitalsUnawakenedPanel) vitalsUnawakenedPanel.style.display = "block";
          if (abilitiesAwakenedPanel) abilitiesAwakenedPanel.style.display = "none";
          if (abilitiesUnawakenedPanel) abilitiesUnawakenedPanel.style.display = "block";
        } else {
          maxParamPoints = 7;
          if (introTextEl) {
            introTextEl.textContent = game.i18n.localize("GAIA.CreateActor.AwakeningIntro")
              || "Defina o estado de Despertar do personagem e distribua seus Parâmetros e Conhecimentos iniciais.";
          }
          if (paramMaxPointsDisplay) paramMaxPointsDisplay.textContent = "7";
          if (vitalsAwakenedPanel) vitalsAwakenedPanel.style.display = "block";
          if (vitalsUnawakenedPanel) vitalsUnawakenedPanel.style.display = "none";
          if (abilitiesAwakenedPanel) abilitiesAwakenedPanel.style.display = "block";
          if (abilitiesUnawakenedPanel) abilitiesUnawakenedPanel.style.display = "none";
        }

        updateParamPoints();
        updateCalculatedHP();
      };

      modeRadios.forEach(r => {
        r.addEventListener("change", (e) => {
          if (e.target.checked) {
            onModeChange(e.target.value);
          }
        });
      });

      if (rollHpBtn) {
        rollHpBtn.addEventListener("click", async (e) => {
          e.preventDefault();
          const roll = await new Roll("1d6").evaluate();
          if (game.dice3d) {
            await game.dice3d.showForRoll(roll, game.user, true);
          }
          currentDieVal = roll.total;
          rollHpBtn.classList.add("active");
          fixedHpBtn?.classList.remove("active");
          await roll.toMessage({
            speaker: ChatMessage.getSpeaker({ actor }),
            flavor: "Rolagem de PV Inicial (1d6)"
          });
          updateCalculatedHP();
        });
      }

      if (fixedHpBtn) {
        fixedHpBtn.addEventListener("click", (e) => {
          e.preventDefault();
          currentDieVal = 3;
          fixedHpBtn.classList.add("active");
          rollHpBtn?.classList.remove("active");
          updateCalculatedHP();
        });
      }

      // Seleção de Habilidades de Caminho (Capítulo 3) para Despertos
      let chosenAbilities = [...initialAbilities.slice(0, 2)];
      const MAX_ABILITIES = 2;

      const renderChosenAbilities = () => {
        const countEl = html.querySelector(".awakening-selected-abilities-count");
        const listEl = html.querySelector(".awakening-chosen-abilities-list");
        if (countEl) countEl.textContent = chosenAbilities.length;
        if (!listEl) return;

        if (chosenAbilities.length === 0) {
          listEl.innerHTML = `
            <div class="empty-abilities-hint gaia-dialog-hint-muted">
              ${game.i18n.localize("GAIA.CreateActor.EmptyAbilitiesHint") || "Nenhuma habilidade selecionada. Clique no botão acima para escolher até 2 Habilidades de Caminho."}
            </div>
          `;
          return;
        }

        listEl.innerHTML = chosenAbilities.map((ab, idx) => `
          <div class="awakening-ability-card" data-index="${idx}">
            <div class="awakening-ability-info">
              <img src="${ab.img || 'icons/svg/item-bag.svg'}" class="awakening-ability-img" alt="${ab.name}" />
              <div class="awakening-ability-text">
                <strong class="awakening-ability-name">${ab.name}</strong>
                ${ab.category ? `<span class="awakening-ability-category">${ab.category}</span>` : ''}
              </div>
            </div>
            <button type="button" class="btn-remove-chosen-ability" data-index="${idx}" title="Remover Habilidade">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        `).join("");

        listEl.querySelectorAll(".btn-remove-chosen-ability").forEach(btn => {
          btn.addEventListener("click", (e) => {
            e.preventDefault();
            const idx = Number(btn.dataset.index);
            chosenAbilities.splice(idx, 1);
            renderChosenAbilities();
          });
        });
      };

      html.querySelectorAll(".btn-remove-chosen-ability").forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          const idx = Number(btn.dataset.index);
          chosenAbilities.splice(idx, 1);
          renderChosenAbilities();
        });
      });

      const btnOpenAbilities = html.querySelector(".btn-open-abilities-browser");
      btnOpenAbilities?.addEventListener("click", async (e) => {
        e.preventDefault();
        const { GaiaItemBrowser } = await import("../../applications/item-browser.mjs");
        GaiaItemBrowser.open(null, {
          selectionMode: true,
          maxSelectable: MAX_ABILITIES,
          selectedItems: [...chosenAbilities],
          type: "ability",
          selectedSource: "all",
          onSelect: (selected) => {
            chosenAbilities = [...selected];
            renderChosenAbilities();
          }
        });
      });

      updateParamPoints();
      updateKnowPoints();
      updateCalculatedHP();
      switchTab("parameters");
    },
    ok: {
      label: actor ? (game.i18n.localize("GAIA.CreateActor.ApplyParameters") || "Confirmar e Aplicar") : "Entendido",
      icon: "fa-solid fa-check",
      callback: async (event, button, dialog) => {
        if (!actor) return;
        const html = dialog.element;

        const selectedMode = html.querySelector(".creation-mode-radio:checked")?.value || "awakened";
        const isUnawakened = selectedMode === "unawakened";

        // 1. Salva Parâmetros
        const paramInputs = html.querySelectorAll(".gaia-param-dist-input:not(.gaia-know-dist-input)");
        const paramList = [...(actor.system.parameters ?? [])];

        for (const input of paramInputs) {
          const key = input.dataset.param;
          const val = Number(input.value) || 0;
          let entry = paramList.find(p => String(p.name || "").toLowerCase() === key);
          if (!entry) {
            entry = { name: key, value: val };
            paramList.push(entry);
          } else {
            entry.value = val;
          }
        }

        // 2. Salva Conhecimentos
        const knowInputs = html.querySelectorAll(".gaia-know-dist-input");
        const knowList = [...(actor.system.knowledge ?? [])];

        for (const input of knowInputs) {
          const key = input.dataset.knowledge;
          const val = Number(input.value) || 0;
          let entry = knowList.find(k => String(k.name || "").toLowerCase() === key);
          if (!entry) {
            entry = { name: key, value: val };
            knowList.push(entry);
          } else {
            entry.value = val;
          }
        }

        // 3. Configura Recursos, Movimento e Idiomas de acordo com a Condição de Despertar
        const vigorVal = Number(paramList.find(p => p.name === "vigor")?.value) || 0;

        let finalLevel = 1;
        let finalMaxHp = 33;
        let finalHp = 33;
        let finalMaxPe = 5;
        let finalPe = 5;
        let finalMovement = 6;
        let actorLanguages = Array.isArray(actor.system?.languages) ? [...actor.system.languages] : [];

        if (isUnawakened) {
          // Regras do Não-Desperto
          finalLevel = 0;
          finalMaxHp = 12;
          finalHp = 12;
          finalMaxPe = 0;
          finalPe = 0;
          finalMovement = 6;

          // Idioma Comum + 1 Adicional à escolha
          const chosenLang = html.querySelector(".unawakened-additional-language-select")?.value;
          const langSet = new Set(["comum"]);
          if (chosenLang) langSet.add(chosenLang);
          actorLanguages = Array.from(langSet);
        } else {
          // Regras do Desperto (Nível 1)
          finalLevel = 1;
          const hpInputVal = Number(html.querySelector(".gaia-hp-selected-input")?.value);
          const baseHp = !isNaN(hpInputVal) && hpInputVal > 0 ? (hpInputVal - vigorVal) : 33;
          finalMaxHp = baseHp;
          finalHp = baseHp + vigorVal;
          finalMaxPe = 5;
          finalPe = 5;
        }

        const updateData = {
          "system.nivel": finalLevel,
          "system.level": finalLevel,
          "system.parameters": paramList,
          "system.knowledge": knowList,
          "system.health.max": finalMaxHp,
          "system.health.value": finalHp,
          "system.energy.value": finalPe,
          "system.energy.max": finalMaxPe,
          "system.movement": finalMovement,
          "system.languages": actorLanguages
        };

        await actor.update(updateData);

        // 4. Atualiza Bônus Derivados
        const bonusList = [...(actor.system.parametersBonus ?? [])];

        // Agilidade -> Deslocamento (+1 a cada 2 pontos para Despertos)
        const agiVal = Number(paramList.find(p => p.name === "agility")?.value) || 0;
        const agiBonus = !isUnawakened ? Math.floor(agiVal / 2) : 0;
        let agiBonusEntry = bonusList.find(b => b.attr === "movement");
        if (agiBonus > 0) {
          if (agiBonusEntry) agiBonusEntry.bonus = agiBonus;
          else bonusList.push({ attr: "movement", bonus: agiBonus });
        } else {
          const idx = bonusList.findIndex(b => b.attr === "movement");
          if (idx !== -1) bonusList.splice(idx, 1);
        }

        // Vigor -> PV Máx (+1 para cada ponto para Despertos)
        let vigBonusEntry = bonusList.find(b => b.attr === "health.max");
        if (!isUnawakened && vigorVal > 0) {
          if (vigBonusEntry) vigBonusEntry.bonus = vigorVal;
          else bonusList.push({ attr: "health.max", bonus: vigorVal });
        } else {
          const idx = bonusList.findIndex(b => b.attr === "health.max");
          if (idx !== -1) bonusList.splice(idx, 1);
        }

        // Percepção -> Percepção Passiva (+1 para cada ponto)
        const percVal = Number(knowList.find(k => k.name === "perception")?.value) || 0;
        let percBonusEntry = bonusList.find(b => b.attr === "passivePerception");
        if (percVal > 0) {
          if (percBonusEntry) percBonusEntry.bonus = percVal;
          else bonusList.push({ attr: "passivePerception", bonus: percVal });
        } else {
          const idx = bonusList.findIndex(b => b.attr === "passivePerception");
          if (idx !== -1) bonusList.splice(idx, 1);
        }

        await actor.update({ "system.parametersBonus": bonusList });

        // 5. Adiciona Habilidades de Caminho Escolhidas (se Desperto)
        if (!isUnawakened && chosenAbilities.length > 0) {
          const existingNames = new Set((actor.items || []).filter(i => i.type === "ability").map(i => i.name.toLowerCase()));
          const itemsToCreate = [];

          for (const ab of chosenAbilities) {
            if (existingNames.has(ab.name.toLowerCase())) continue;

            if (ab.uuid) {
              const doc = await fromUuid(ab.uuid);
              if (doc) {
                itemsToCreate.push(doc.toObject());
                continue;
              }
            }

            itemsToCreate.push({
              name: ab.name,
              type: "ability",
              img: ab.img || "icons/svg/item-bag.svg",
              system: {
                description: ab.description || "",
                category: ab.category || "path"
              }
            });
          }

          if (itemsToCreate.length > 0) {
            await actor.createEmbeddedDocuments("Item", itemsToCreate);
          }
        }

        const modeLabel = isUnawakened ? "Não-Desperto (Nível 0)" : "Desperto (Nível 1)";
        ui.notifications?.info(`Personagem "${actor.name}" configurado com sucesso como ${modeLabel}!`);
        return true;
      }
    },
    rejectClose: false
  });
}
