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

  const checkIsDwarf = (legName, legData) => {
    const check = (str) => {
      const s = String(str || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      return s.includes("anao");
    };
    if (check(legName)) return true;
    if (legData) {
      if (check(legData.name)) return true;
      const abilities = legData.legacyAbilities || [];
      if (Array.isArray(abilities)) {
        if (abilities.some(a => {
          const n = String(a.name || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
          return n.includes("fortitude ampliada");
        })) {
          return true;
        }
      }
    }
    return false;
  };

  // Coleta de Legados Disponíveis (Mundo, Compêndios e Ator)
  const currentActorLegacyName = actor?.system?.legacy || "";
  const currentActorLegacyItem = actor?.items?.find(i => i.type === "legacy") || null;

  const availableLegacies = [];
  const seenLegacyNames = new Set();

  if (currentActorLegacyItem) {
    seenLegacyNames.add(currentActorLegacyItem.name.toLowerCase());
    availableLegacies.push({
      uuid: currentActorLegacyItem.uuid,
      id: currentActorLegacyItem.id,
      name: currentActorLegacyItem.name,
      img: currentActorLegacyItem.img || "icons/svg/aura.svg",
      sourceLabel: "Ficha Atual",
      height: currentActorLegacyItem.system?.height || "",
      lifeExpectancy: currentActorLegacyItem.system?.lifeExpectancy || "",
      appearance: currentActorLegacyItem.system?.appearance || "",
      origin: currentActorLegacyItem.system?.origin || "",
      traditions: currentActorLegacyItem.system?.traditions || "",
      inWorld: currentActorLegacyItem.system?.inWorld || "",
      legacyAbilities: Array.isArray(currentActorLegacyItem.system?.legacyAbilities) ? currentActorLegacyItem.system.legacyAbilities : [],
      isSelected: true
    });
  }

  for (const item of (game.items?.filter(i => i.type === "legacy") ?? [])) {
    const isSelected = !currentActorLegacyItem && currentActorLegacyName && item.name.toLowerCase() === currentActorLegacyName.toLowerCase();
    availableLegacies.push({
      uuid: item.uuid,
      id: item.id,
      name: item.name,
      img: item.img || "icons/svg/aura.svg",
      sourceLabel: "Mundo",
      height: item.system?.height || "",
      lifeExpectancy: item.system?.lifeExpectancy || "",
      appearance: item.system?.appearance || "",
      origin: item.system?.origin || "",
      traditions: item.system?.traditions || "",
      inWorld: item.system?.inWorld || "",
      legacyAbilities: Array.isArray(item.system?.legacyAbilities) ? item.system.legacyAbilities : [],
      isSelected: Boolean(isSelected)
    });
    seenLegacyNames.add(item.name.toLowerCase());
  }

  const itemPacks = game.packs.filter(p => p.documentName === "Item");
  for (const pack of itemPacks) {
    try {
      const index = await pack.getIndex({
        fields: [
          "type", "img",
          "system.origin", "system.traditions", "system.inWorld",
          "system.appearance", "system.height", "system.lifeExpectancy",
          "system.legacyAbilities"
        ]
      });
      for (const entry of index) {
        if (entry.type !== "legacy") continue;
        const isSelected = !currentActorLegacyItem && currentActorLegacyName && entry.name.toLowerCase() === currentActorLegacyName.toLowerCase();
        availableLegacies.push({
          uuid: pack.getUuid(entry._id),
          id: entry._id,
          name: entry.name,
          img: entry.img || "icons/svg/aura.svg",
          sourceLabel: pack.metadata.label,
          height: entry.system?.height || "",
          lifeExpectancy: entry.system?.lifeExpectancy || "",
          appearance: entry.system?.appearance || "",
          origin: entry.system?.origin || "",
          traditions: entry.system?.traditions || "",
          inWorld: entry.system?.inWorld || "",
          legacyAbilities: Array.isArray(entry.system?.legacyAbilities) ? entry.system.legacyAbilities : [],
          isSelected: Boolean(isSelected)
        });
        seenLegacyNames.add(entry.name.toLowerCase());
      }
    } catch (err) {
      console.warn(`Gaia: Prelúdio | Falha ao indexar legado no compêndio ${pack.collection}:`, err);
    }
  }

  let isCustomLegacy = false;
  let customLegacyName = "";
  if (currentActorLegacyName && !availableLegacies.some(l => l.isSelected)) {
    isCustomLegacy = true;
    customLegacyName = currentActorLegacyName;
  }

  const selectedLegacyData = availableLegacies.find(l => l.isSelected) || null;
  const isDwarf = Boolean(actor?.hasFortitudeAmpliada) || checkIsDwarf(currentActorLegacyName || customLegacyName, selectedLegacyData);
  const hpDie = isDwarf ? "1d8" : "1d6";
  const fixedHpBase = isDwarf ? 4 : 3;
  const hpDieIcon = isDwarf ? "fa-dice-d8" : "fa-dice-d6";
  const initialCalculatedHp = 30 + fixedHpBase;

  const content = await renderTemplate("systems/gaia-preludio/templates/dialog/awakening-guide-dialog.hbs", {
    parameters,
    knowledge,
    availableLanguages,
    initialAbilities: initialAbilities.slice(0, 2),
    hasActor: !!actor,
    hasFortitude: isDwarf,
    isDwarf,
    hpDie,
    fixedHpBase,
    hpDieIcon,
    initialCalculatedHp,
    availableLegacies,
    selectedLegacyData,
    isCustomLegacy,
    customLegacyName
  });

  let chosenAbilities = [...initialAbilities.slice(0, 2)];
  const MAX_ABILITIES = 2;

  return await DialogV2.prompt({
    classes: ["gaia-preludio", "gaia-dialog", "gaia-awakening-dialog"],
    window: { title },
    content,
    position: { width: 900, height: "auto", top: 80},
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

      let currentHasFortitude = isDwarf;
      let currentHpDie = hpDie;
      let currentFixedHpBase = fixedHpBase;
      let currentHpDieIcon = hpDieIcon;
      let currentDieVal = fixedHpBase;
      let hasRolledHp = false;

      const updateFortitudeAndHp = (dwarfActive) => {
        const changed = currentHasFortitude !== dwarfActive;
        currentHasFortitude = dwarfActive;
        currentHpDie = dwarfActive ? "1d8" : "1d6";
        currentFixedHpBase = dwarfActive ? 4 : 3;
        currentHpDieIcon = dwarfActive ? "fa-dice-d8" : "fa-dice-d6";

        // Atualiza textos na descrição de vitais
        const hpDieValEl = html.querySelector(".gaia-hp-die-val");
        const hpFixedValEl = html.querySelector(".gaia-hp-fixed-val");
        const badgeFortitudeEl = html.querySelector(".badge-fortitude");
        if (hpDieValEl) hpDieValEl.textContent = currentHpDie;
        if (hpFixedValEl) hpFixedValEl.textContent = String(currentFixedHpBase);
        if (badgeFortitudeEl) badgeFortitudeEl.style.display = dwarfActive ? "inline-flex" : "none";

        // Atualiza botões
        const rollLabelEl = html.querySelector(".gaia-hp-roll-label");
        const fixedLabelEl = html.querySelector(".gaia-hp-fixed-label");
        const rollIconEl = html.querySelector(".gaia-hp-roll-icon");

        if (rollLabelEl) rollLabelEl.textContent = `Rolar ${currentHpDie}`;
        if (fixedLabelEl) fixedLabelEl.textContent = `Fixo (${currentFixedHpBase})`;
        if (rollIconEl) {
          rollIconEl.classList.remove("fa-dice-d6", "fa-dice-d8");
          rollIconEl.classList.add(currentHpDieIcon);
        }

        if (dwarfActive) {
          rollHpBtn?.classList.add("active");
          fixedHpBtn?.classList.remove("active");
          if (changed) {
            hasRolledHp = false;
            currentDieVal = currentFixedHpBase;
          }
        } else {
          if (changed) {
            hasRolledHp = false;
            rollHpBtn?.classList.remove("active");
            fixedHpBtn?.classList.add("active");
            currentDieVal = currentFixedHpBase;
          }
        }

        updateCalculatedHP();
      };

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
          const roll = await new Roll(currentHpDie).evaluate();
          if (game.dice3d) {
            await game.dice3d.showForRoll(roll, game.user, true);
          }
          currentDieVal = roll.total;
          hasRolledHp = true;
          rollHpBtn.classList.add("active");
          fixedHpBtn?.classList.remove("active");
          await roll.toMessage({
            speaker: ChatMessage.getSpeaker({ actor }),
            flavor: `Rolagem de PV Inicial (${currentHpDie})${currentHasFortitude ? " [Fortitude Ampliada]" : ""}`
          });
          updateCalculatedHP();
        });
      }

      if (fixedHpBtn) {
        fixedHpBtn.addEventListener("click", (e) => {
          e.preventDefault();
          hasRolledHp = false;
          currentDieVal = currentFixedHpBase;
          fixedHpBtn.classList.add("active");
          rollHpBtn?.classList.remove("active");
          updateCalculatedHP();
        });
      }

      // Seleção de Habilidades de Caminho (Capítulo 3) para Despertos
      const renderChosenAbilities = () => {
        const countEl = html.querySelector(".awakening-selected-abilities-count");
        const listEl = html.querySelector(".awakening-chosen-abilities-container .awakening-chosen-abilities-list");
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

        listEl.innerHTML = chosenAbilities.map((ab, idx) => {
          const categoryBadge = ab.pathShortName
            ? `<span class="awakening-ability-category"><i class="${ab.pathIcon || 'fa-solid fa-route'}"></i> ${ab.pathShortName}</span>`
            : (ab.category ? `<span class="awakening-ability-category">${ab.category}</span>` : '');

          return `
            <div class="awakening-ability-card" data-index="${idx}">
              <div class="awakening-ability-info">
                <img src="${ab.img || 'icons/svg/item-bag.svg'}" class="awakening-ability-img" alt="${ab.name}" />
                <div class="awakening-ability-text">
                  <strong class="awakening-ability-name">${ab.name}</strong>
                  ${categoryBadge}
                </div>
              </div>
              <button type="button" class="btn-remove-chosen-ability" data-index="${idx}" title="Remover Habilidade">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          `;
        }).join("");

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

      // Seleção e Pré-visualização do Legado
      let currentChosenLegacy = selectedLegacyData;
      let currentChosenLegacyUuid = selectedLegacyData?.uuid || (isCustomLegacy ? "__custom__" : "");

      const legacySelect = html.querySelector(".gaia-awakening-legacy-select");
      const customLegacyBox = html.querySelector(".awakening-custom-legacy-box");
      const customLegacyInput = html.querySelector(".gaia-awakening-custom-legacy-input");
      const btnOpenLegacyBrowser = html.querySelector(".btn-open-legacy-browser");

      const renderLegacyPreview = (legData) => {
        const container = html.querySelector(".awakening-legacy-preview-container");
        if (!container) return;

        if (!legData) {
          container.innerHTML = `
            <div class="empty-abilities-hint gaia-dialog-hint-muted awakening-legacy-empty-hint">
              ${game.i18n.localize("GAIA.CreateActor.EmptyLegacyHint") || "Nenhum legado selecionado. Escolha um legado acima ou utilize o Navegador de Itens para explorar os legados disponíveis."}
            </div>
          `;
          return;
        }

        const heightHtml = legData.height ? `
          <span class="awakening-legacy-tag" title="${game.i18n.localize('GAIA.CreateActor.LegacyHeight') || 'Altura Média'}">
            <i class="fa-solid fa-ruler-vertical"></i> ${legData.height}
          </span>
        ` : "";

        const lifeHtml = legData.lifeExpectancy ? `
          <span class="awakening-legacy-tag" title="${game.i18n.localize('GAIA.CreateActor.LegacyLifeExpectancy') || 'Expectativa de Vida'}">
            <i class="fa-solid fa-hourglass-half"></i> ${legData.lifeExpectancy}
          </span>
        ` : "";

        const bioItems = [];
        if (legData.appearance) {
          bioItems.push(`
            <div class="awakening-legacy-bio-item">
              <span class="awakening-legacy-bio-label"><i class="fa-solid fa-eye"></i> ${game.i18n.localize("GAIA.Legado.Appearance") || "Aparência"}</span>
              <span class="awakening-legacy-bio-val">${legData.appearance}</span>
            </div>
          `);
        }
        if (legData.origin) {
          bioItems.push(`
            <div class="awakening-legacy-bio-item">
              <span class="awakening-legacy-bio-label"><i class="fa-solid fa-landmark"></i> ${game.i18n.localize("GAIA.Legado.Origin") || "Origem"}</span>
              <span class="awakening-legacy-bio-val">${legData.origin}</span>
            </div>
          `);
        }
        if (legData.traditions) {
          bioItems.push(`
            <div class="awakening-legacy-bio-item">
              <span class="awakening-legacy-bio-label"><i class="fa-solid fa-scroll"></i> ${game.i18n.localize("GAIA.Legado.Traditions") || "Tradições"}</span>
              <span class="awakening-legacy-bio-val">${legData.traditions}</span>
            </div>
          `);
        }
        if (legData.inWorld) {
          bioItems.push(`
            <div class="awakening-legacy-bio-item">
              <span class="awakening-legacy-bio-label"><i class="fa-solid fa-earth-americas"></i> ${game.i18n.localize("GAIA.Legado.InWorld") || "No Mundo"}</span>
              <span class="awakening-legacy-bio-val">${legData.inWorld}</span>
            </div>
          `);
        }

        const bioGridHtml = bioItems.length ? `
          <div class="awakening-legacy-bio-grid">
            ${bioItems.join("")}
          </div>
        ` : "";

        const abilitiesList = Array.isArray(legData.legacyAbilities) ? legData.legacyAbilities : [];
        const abilitiesHtml = abilitiesList.length ? `
          <div class="awakening-legacy-abilities-section">
            <span class="awakening-legacy-abilities-title">
              <i class="fa-solid fa-crown"></i> ${game.i18n.localize("GAIA.CreateActor.LegacyAbilities") || "Habilidades de Legado"} (${abilitiesList.length})
            </span>
            <div class="awakening-legacy-abilities-list">
              ${abilitiesList.map(ab => `
                <div class="awakening-legacy-ability-item">
                  <span class="awakening-legacy-ability-name">
                    <i class="fa-solid fa-feather-pointed"></i> ${ab.name || "Habilidade"}
                  </span>
                  ${ab.description ? `<span class="awakening-legacy-ability-desc">${ab.description}</span>` : ""}
                </div>
              `).join("")}
            </div>
          </div>
        ` : "";

        container.innerHTML = `
          <div class="awakening-legacy-preview-card">
            <div class="awakening-legacy-header">
              <img src="${legData.img || 'icons/svg/aura.svg'}" class="awakening-legacy-img" alt="${legData.name}" />
              <div class="awakening-legacy-title-group">
                <span class="awakening-legacy-name">${legData.name}</span>
                <div class="awakening-legacy-tags">
                  ${heightHtml}
                  ${lifeHtml}
                </div>
              </div>
            </div>
            ${bioGridHtml}
            ${abilitiesHtml}
          </div>
        `;
      };

      legacySelect?.addEventListener("change", async (e) => {
        const val = e.target.value;
        currentChosenLegacyUuid = val;

        if (val === "__custom__") {
          if (customLegacyBox) customLegacyBox.style.display = "flex";
          currentChosenLegacy = null;
          renderLegacyPreview(null);
          updateFortitudeAndHp(checkIsDwarf(customLegacyInput?.value, null));
        } else if (!val) {
          if (customLegacyBox) customLegacyBox.style.display = "none";
          currentChosenLegacy = null;
          renderLegacyPreview(null);
          updateFortitudeAndHp(false);
        } else {
          if (customLegacyBox) customLegacyBox.style.display = "none";
          let found = availableLegacies.find(l => l.uuid === val);
          if (!found) {
            const doc = await fromUuid(val);
            if (doc) {
              found = {
                uuid: doc.uuid,
                id: doc.id,
                name: doc.name,
                img: doc.img || "icons/svg/aura.svg",
                height: doc.system?.height || "",
                lifeExpectancy: doc.system?.lifeExpectancy || "",
                appearance: doc.system?.appearance || "",
                origin: doc.system?.origin || "",
                traditions: doc.system?.traditions || "",
                inWorld: doc.system?.inWorld || "",
                legacyAbilities: Array.isArray(doc.system?.legacyAbilities) ? doc.system.legacyAbilities : []
              };
            }
          }
          currentChosenLegacy = found || null;
          renderLegacyPreview(currentChosenLegacy);
          updateFortitudeAndHp(checkIsDwarf(currentChosenLegacy?.name, currentChosenLegacy));
        }
      });

      customLegacyInput?.addEventListener("input", (e) => {
        const val = e.target.value;
        updateFortitudeAndHp(checkIsDwarf(val, null));
      });

      btnOpenLegacyBrowser?.addEventListener("click", async (e) => {
        e.preventDefault();
        const { GaiaItemBrowser } = await import("../../applications/item-browser.mjs");
        GaiaItemBrowser.open(null, {
          selectionMode: true,
          maxSelectable: 1,
          selectedItems: currentChosenLegacyUuid && currentChosenLegacyUuid !== "__custom__" ? [{ uuid: currentChosenLegacyUuid }] : [],
          type: "legacy",
          selectedSource: "all",
          onSelect: async (selected) => {
            const chosen = selected?.[0];
            if (!chosen) return;
            const fullDoc = chosen.uuid ? await fromUuid(chosen.uuid) : null;
            const legData = {
              uuid: chosen.uuid,
              id: chosen.id,
              name: chosen.name,
              img: chosen.img || "icons/svg/aura.svg",
              height: fullDoc?.system?.height || "",
              lifeExpectancy: fullDoc?.system?.lifeExpectancy || "",
              appearance: fullDoc?.system?.appearance || "",
              origin: fullDoc?.system?.origin || "",
              traditions: fullDoc?.system?.traditions || "",
              inWorld: fullDoc?.system?.inWorld || "",
              legacyAbilities: Array.isArray(fullDoc?.system?.legacyAbilities) ? fullDoc.system.legacyAbilities : []
            };

            currentChosenLegacy = legData;
            currentChosenLegacyUuid = chosen.uuid;

            if (legacySelect) {
              let opt = legacySelect.querySelector(`option[value="${chosen.uuid}"]`);
              if (!opt) {
                opt = document.createElement("option");
                opt.value = chosen.uuid;
                opt.textContent = `${chosen.name} (${chosen.sourceLabel || "Compêndio"})`;
                opt.dataset.name = chosen.name;
                const customOpt = legacySelect.querySelector('option[value="__custom__"]');
                if (customOpt) legacySelect.insertBefore(opt, customOpt);
                else legacySelect.appendChild(opt);
              }
              legacySelect.value = chosen.uuid;
            }

            if (customLegacyBox) customLegacyBox.style.display = "none";
            renderLegacyPreview(legData);
            updateFortitudeAndHp(checkIsDwarf(legData.name, legData));
          }
        });
      });

      if (isDwarf) {
        updateFortitudeAndHp(true);
      }

      updateParamPoints();
      updateKnowPoints();
      updateCalculatedHP();
      switchTab("legacy");
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

        // 0. Processa e Aplica Legado Escolhido
        const legacySelect = html.querySelector(".gaia-awakening-legacy-select");
        const selectedLegacyUuid = legacySelect?.value || "";
        const customLegacyInput = html.querySelector(".gaia-awakening-custom-legacy-input");
        const customLegacyVal = customLegacyInput?.value?.trim() || "";

        let finalLegacyName = "";
        let chosenLegacyDoc = null;

        if (selectedLegacyUuid === "__custom__") {
          finalLegacyName = customLegacyVal;
        } else if (selectedLegacyUuid) {
          chosenLegacyDoc = await fromUuid(selectedLegacyUuid);
          if (chosenLegacyDoc) {
            finalLegacyName = chosenLegacyDoc.name;
          } else {
            const selectedOpt = legacySelect?.querySelector(`option[value="${selectedLegacyUuid}"]`);
            finalLegacyName = selectedOpt?.dataset?.name || "";
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
          const isFinalDwarf = checkIsDwarf(finalLegacyName, chosenLegacyDoc);
          const finalHpBase = isFinalDwarf ? 4 : 3;
          const hpInputVal = Number(html.querySelector(".gaia-hp-selected-input")?.value);
          const totalHp = !isNaN(hpInputVal) && hpInputVal > 0 ? hpInputVal : (30 + finalHpBase + vigorVal);
          finalMaxHp = totalHp;
          finalHp = totalHp;
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

        if (finalLegacyName) {
          updateData["system.legacy"] = finalLegacyName;
        }

        if (chosenLegacyDoc) {
          if (chosenLegacyDoc.system?.appearance) updateData["system.appearance"] = chosenLegacyDoc.system.appearance;
          if (chosenLegacyDoc.system?.height) updateData["system.height"] = chosenLegacyDoc.system.height;
          if (chosenLegacyDoc.system?.lifeExpectancy) updateData["system.lifeExpectancy"] = chosenLegacyDoc.system.lifeExpectancy;
          if (chosenLegacyDoc.system?.origin) updateData["system.origin"] = chosenLegacyDoc.system.origin;
          if (chosenLegacyDoc.system?.traditions) updateData["system.traditions"] = chosenLegacyDoc.system.traditions;
          if (chosenLegacyDoc.system?.inWorld) updateData["system.inWorld"] = chosenLegacyDoc.system.inWorld;
          if (Array.isArray(chosenLegacyDoc.system?.legacyAbilities)) updateData["system.legacyAbilities"] = chosenLegacyDoc.system.legacyAbilities;
        }

        await actor.update(updateData);

        // Se um item de Legado documental foi selecionado, sincroniza no Ator
        if (chosenLegacyDoc && chosenLegacyDoc.actor?.id !== actor.id) {
          const existingLegacies = actor.items.filter(i => i.type === "legacy");
          const alreadyHasSame = existingLegacies.some(i => i.name.toLowerCase() === chosenLegacyDoc.name.toLowerCase());
          if (!alreadyHasSame) {
            if (existingLegacies.length > 0) {
              await actor.deleteEmbeddedDocuments("Item", existingLegacies.map(i => i.id));
            }
            const itemData = chosenLegacyDoc.toObject();
            delete itemData._id;
            await actor.createEmbeddedDocuments("Item", [itemData]);
          }
        }

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
