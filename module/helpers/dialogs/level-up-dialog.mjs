/**
 * ==============================================================================
 * LEVEL UP DIALOG / DIÁLOGO DE EVOLUÇÃO DE NÍVEL
 * ==============================================================================
 */

const { DialogV2 } = foundry.applications.api;
const { renderTemplate } = foundry.applications.handlebars;

/**
 * Diálogo de Evolução / Subida de Nível de Despertar.
 * @param {Actor} actor - Documento do Ator
 * @param {number} [targetLevel=null] - Nível de destino opcional
 * @returns {Promise<any>}
 */
export async function promptLevelUpDialog(actor, targetLevel = null) {
  if (!actor) return null;

  const currentLevel = Math.max(1, Number(actor.system?.nivel ?? 1));
  const newLevel = targetLevel ? Math.max(currentLevel + 1, Number(targetLevel)) : currentLevel + 1;

  // Extrai Parâmetros atuais
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
  if (actor.system?.parameters?.length) {
    for (const p of parameters) {
      const found = actor.system.parameters.find(ap => String(ap.name || "").toLowerCase() === p.key);
      if (found) p.value = Number(found.value) || 0;
    }
  }

  // Extrai Conhecimentos atuais
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
  if (actor.system?.knowledge?.length) {
    for (const k of knowledge) {
      const found = actor.system.knowledge.find(ak => String(ak.name || "").toLowerCase() === k.key);
      if (found) k.value = Number(found.value) || 0;
    }
  }

  const vigorObj = parameters.find(p => p.key === "vigor");
  const currentVigor = Number(vigorObj?.value ?? 0);

  // Calcula pontos de Parâmetro e Conhecimento disponíveis para este nível
  let paramPoints = 0;
  let knowPoints = 0;
  if (newLevel === 3 || newLevel === 6) {
    paramPoints = 1;
    knowPoints = 1;
  } else if (newLevel >= 9 && newLevel % 3 === 0) {
    paramPoints = 2;
    knowPoints = 2;
  }

  const hasFortitude = Boolean(actor?.hasFortitudeAmpliada);
  const hpDie = hasFortitude ? "1d8" : "1d6";
  const fixedHpBase = hasFortitude ? 4 : 3;

  const content = await renderTemplate("systems/gaia-preludio/templates/dialog/level-up-dialog.hbs", {
    currentLevel,
    newLevel,
    vigor: currentVigor,
    hasAttributePoints: paramPoints > 0,
    paramPoints,
    knowPoints,
    parameters,
    knowledge,
    hasFortitude,
    hpDie,
    fixedHpBase
  });

  let rolledHpValue = null;

  return await DialogV2.prompt({
    classes: ["gaia-preludio", "gaia-dialog", "level-up-dialog"],
    window: { title: `${game.i18n.localize("GAIA.LevelUp.Title")} (Nível ${newLevel})` },
    content,
    position: { width: 520, height: "auto" },
    render: (event, dialog) => {
      const html = dialog.element;

      // Alternância de Abas
      const tabButtons = html.querySelectorAll(".gaia-dialog-tab-btn");
      const tabPanes = html.querySelectorAll(".gaia-dialog-tab-pane");

      tabButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          const targetTab = btn.dataset.tab;
          tabButtons.forEach(b => b.classList.remove("active"));
          tabPanes.forEach(p => p.classList.remove("active"));
          btn.classList.add("active");
          const pane = html.querySelector(`.gaia-dialog-tab-pane[data-tab='${targetTab}']`);
          if (pane) pane.classList.add("active");
        });
      });

      // Controle de Método de PV
      const hpRadios = html.querySelectorAll("input[name='hpMethod']");
      const btnRollHp = html.querySelector(".btn-roll-hp-gain");
      const previewHp = html.querySelector(".hp-gain-preview");

      const updateHpPreview = () => {
        const method = html.querySelector("input[name='hpMethod']:checked")?.value || "fixed";
        if (method === "roll") {
          if (btnRollHp) btnRollHp.style.display = "inline-flex";
          if (rolledHpValue !== null) {
            previewHp.textContent = `+${rolledHpValue + currentVigor} PV (${rolledHpValue} + ${currentVigor})`;
          } else {
            previewHp.textContent = `(Aguardando rolagem...)`;
          }
        } else {
          if (btnRollHp) btnRollHp.style.display = "none";
          previewHp.textContent = `+${fixedHpBase + currentVigor} PV`;
        }
      };

      hpRadios.forEach(r => r.addEventListener("change", updateHpPreview));

      btnRollHp?.addEventListener("click", async (e) => {
        e.preventDefault();
        const r = new Roll(hpDie);
        await r.evaluate();
        if (game.dice3d) {
          await game.dice3d.showForRoll(r, game.user, true);
        }
        rolledHpValue = r.total;
        await r.toMessage({
          speaker: ChatMessage.getSpeaker({ actor }),
          flavor: `Rolagem de Ganho de PV (${hpDie})${hasFortitude ? " [Fortitude Ampliada]" : ""}`
        });
        updateHpPreview();
      });

      // Distribuição de Parâmetros
      let currentParamLeft = paramPoints;
      const paramLeftDisplay = html.querySelector(".params-points-left");
      const vigorNotice = html.querySelector(".vigor-hp-bonus-notice");

      const paramAdjustButtons = html.querySelectorAll(".btn-adjust-param");
      paramAdjustButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          const action = btn.dataset.action;
          const key = btn.dataset.key;
          const span = html.querySelector(`.param-val-display[data-key='${key}']`);
          const baseVal = Number(span.dataset.base);
          let currentVal = Number(span.textContent);

          if (action === "increase") {
            if (currentParamLeft <= 0) return;
            if (currentVal >= baseVal + 1) return; // Máximo de 1 ponto por atributo neste nível
            currentVal += 1;
            currentParamLeft -= 1;
          } else if (action === "decrease") {
            if (currentVal <= baseVal) return;
            currentVal -= 1;
            currentParamLeft += 1;
          }

          span.textContent = currentVal;
          if (paramLeftDisplay) paramLeftDisplay.textContent = currentParamLeft;

          // Se Vigor foi aumentado no Nível >= 3, mostra aviso
          const currentVigorVal = Number(html.querySelector(".param-val-display[data-key='vigor']")?.textContent ?? baseVal);
          if (vigorNotice) {
            vigorNotice.style.display = (newLevel >= 3 && currentVigorVal > currentVigor) ? "block" : "none";
          }
        });
      });

      // Distribuição de Conhecimentos
      let currentKnowLeft = knowPoints;
      const knowLeftDisplay = html.querySelector(".knows-points-left");
      const knowAdjustButtons = html.querySelectorAll(".btn-adjust-know");
      knowAdjustButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          const action = btn.dataset.action;
          const key = btn.dataset.key;
          const span = html.querySelector(`.know-val-display[data-key='${key}']`);
          const baseVal = Number(span.dataset.base);
          let currentVal = Number(span.textContent);

          if (action === "increase") {
            if (currentKnowLeft <= 0) return;
            if (currentVal >= baseVal + 1) return; // Máximo de 1 ponto por atributo neste nível
            currentVal += 1;
            currentKnowLeft -= 1;
          } else if (action === "decrease") {
            if (currentVal <= baseVal) return;
            currentVal -= 1;
            currentKnowLeft += 1;
          }

          span.textContent = currentVal;
          if (knowLeftDisplay) knowLeftDisplay.textContent = currentKnowLeft;
        });
      });

      // Botão para abrir o Navegador de Habilidades (modo seleção)
      const btnOpenBrowser = html.querySelector(".btn-open-abilities-browser");
      const tagsContainer  = html.querySelector(".selected-abilities-tags");

      /** Renderiza as tags acumuladas de habilidades escolhidas. */
      const renderAbilityTags = (namesArr) => {
        if (!tagsContainer) return;
        if (!namesArr.length) {
          tagsContainer.style.display = "none";
          tagsContainer.innerHTML = "";
          return;
        }
        tagsContainer.style.display = "flex";
        tagsContainer.innerHTML = namesArr
          .map((name, i) =>
            `<span class="selected-ability-tag" data-index="${i}">
              <i class="fa-solid fa-wand-sparkles"></i>
              ${name}
            </span>`
          )
          .join("");
      };

      /** Lista acumulada de nomes de habilidades escolhidas nesta sessão. */
      const chosenAbilityNames = [];

      btnOpenBrowser?.addEventListener("click", async (e) => {
        e.preventDefault();
        const { GaiaItemBrowser } = await import("../../applications/item-browser.mjs");
        GaiaItemBrowser.open(actor, {
          type: "ability",
          selectionMode: true,
          onSelect: async (selectedItems) => {
            if (!selectedItems?.length) return;
            const toCreate = [];
            for (const entry of selectedItems) {
              try {
                const doc = await fromUuid(entry.uuid);
                if (doc) {
                  toCreate.push(doc.toObject());
                  // Adiciona à lista acumulada (evita duplicatas por nome)
                  if (!chosenAbilityNames.includes(entry.name)) {
                    chosenAbilityNames.push(entry.name);
                  }
                }
              } catch (err) {
                console.warn(`Gaia | Falha ao carregar habilidade "${entry.name}":`, err);
              }
            }
            if (toCreate.length > 0) {
              await actor.createEmbeddedDocuments("Item", toCreate);
              ui.notifications?.info(
                `${toCreate.length} habilidade${toCreate.length !== 1 ? "s" : ""} adicionada${toCreate.length !== 1 ? "s" : ""} a ${actor.name}.`
              );
            }
            renderAbilityTags(chosenAbilityNames);
          }
        });
      });
    },
    ok: {
      label: game.i18n.localize("GAIA.LevelUp.Confirm"),
      icon: "fa-solid fa-arrow-up-from-bracket",
      callback: async (event, button, dialog) => {
        const html = dialog.element;

        // 1. Calcula PV Ganho
        const method = html.querySelector("input[name='hpMethod']:checked")?.value || "fixed";
        let hpGainBase = fixedHpBase;
        if (method === "roll") {
          if (rolledHpValue === null) {
            const r = new Roll(hpDie);
            await r.evaluate();
            if (game.dice3d) {
              await game.dice3d.showForRoll(r, game.user, true);
            }
            await r.toMessage({
              speaker: ChatMessage.getSpeaker({ actor }),
              flavor: `Rolagem de Ganho de PV (${hpDie})${hasFortitude ? " [Fortitude Ampliada]" : ""}`
            });
            hpGainBase = r.total;
          } else {
            hpGainBase = rolledHpValue;
          }
        }
        let totalHpGained = hpGainBase + currentVigor;

        // 2. Extrai novos Parâmetros
        const updatedParams = [];
        let newVigor = currentVigor;
        parameters.forEach(p => {
          const span = html.querySelector(`.param-val-display[data-key='${p.key}']`);
          const finalVal = span ? Number(span.textContent) : p.value;
          if (p.key === "vigor") newVigor = finalVal;
          updatedParams.push({ name: p.key, value: finalVal });
        });

        // 3. Extrai novos Conhecimentos
        const updatedKnows = [];
        knowledge.forEach(k => {
          const span = html.querySelector(`.know-val-display[data-key='${k.key}']`);
          const finalVal = span ? Number(span.textContent) : k.value;
          updatedKnows.push({ name: k.key, value: finalVal });
        });

        // 4. Ganho de PV Adicional por Vigor a partir do Nível 3
        let extraVigorHp = 0;
        if (newLevel >= 3 && newVigor > currentVigor) {
          const vigorDiff = newVigor - currentVigor;
          extraVigorHp = newLevel * vigorDiff;
          totalHpGained += extraVigorHp;
        }

        // 5. Habilidade / Aprimoramento Escolhido
        const chosenAbility = String(html.querySelector(".level-up-ability-input")?.value || "").trim();

        // 6. Aplica atualização no Ator
        const currentHpMax = Number(actor.system?.health?.max ?? 30);
        const currentHpVal = Number(actor.system?.health?.value ?? currentHpMax);
        const newHpMax = currentHpMax + totalHpGained;
        const newHpVal = Math.min(newHpMax, currentHpVal + totalHpGained);

        const currentEnergyMax = Number(actor.system?.energy?.max ?? 10);
        const currentEnergyVal = Number(actor.system?.energy?.value ?? currentEnergyMax);
        const newEnergyMax = currentEnergyMax + 1;
        const newEnergyVal = Math.min(newEnergyMax, currentEnergyVal + 1);

        const updateData = {
          "system.nivel": newLevel,
          "system.health.max": newHpMax,
          "system.health.value": newHpVal,
          "system.energy.max": newEnergyMax,
          "system.energy.value": newEnergyVal
        };

        if (paramPoints > 0) {
          updateData["system.parameters"] = updatedParams;
        }
        if (knowPoints > 0) {
          updateData["system.knowledge"] = updatedKnows;
        }

        await actor.update(updateData);

        // 7. Envia Mensagem de Chat comemorando a Evolução
        const abilityHtml = chosenAbility ? `
          <div style="margin-top: 6px; padding-top: 4px; border-top: 1px dashed rgba(201, 163, 75, 0.4); font-size: 12px;">
            <i class="fa-solid fa-scroll" style="color: var(--gaia-gold-accent, #c9a34b);"></i> <strong>Habilidade/Aprimoramento:</strong> ${chosenAbility}
          </div>
        ` : "";

        const vigorNoticeHtml = extraVigorHp > 0 ? `
          <div style="font-size: 11px; color: var(--gaia-green, #2e8b57); margin-top: 2px;">
            ${extraVigorHp} PV bônus por aumento de Vigor (Nível ${newLevel})
          </div>
        ` : "";

        const chatHtml = `
          <div class="gaia-preludio chat-card level-up-card" style="border: 2px solid var(--gaia-border-gold, #8c7355); border-radius: var(--gaia-radius); padding: 10px; background: linear-gradient(135deg, rgba(74, 46, 107, 0.1), rgba(201, 163, 75, 0.1));">
            <header style="text-align: center; margin-bottom: 8px;">
              <h3 style="margin: 0; font-family: var(--gaia-font-medieval, 'Cinzel', Georgia, serif); color: var(--gaia-purple-dark, #4a2e6b); font-size: 1.2em;">
                ${game.i18n.localize("GAIA.LevelUp.Title")}
              </h3>
              <p style="margin: 2px 0 0 0; font-size: 12px; font-weight: bold; color: var(--gaia-text-parchment, #000);">
                <strong>${actor.name}</strong> ${game.i18n.format("GAIA.LevelUp.ChatMessageSubtitle", { level: newLevel })}
              </p>
            </header>
            <div style="display: flex; justify-content: space-around; background: rgba(0,0,0,0.05); padding: 6px; border-radius: var(--gaia-radius); margin-bottom: 6px; font-weight: bold; font-size: 13px;">
              <span style="color: var(--gaia-health, #b91c1c);"> +${totalHpGained} PV Máx</span>
              <span style="color: var(--gaia-purple-dark, #4a2e6b);"> +1 PE Máx</span>
            </div>
            ${vigorNoticeHtml}
            ${abilityHtml}
          </div>
        `;

        await ChatMessage.create({
          speaker: ChatMessage.getSpeaker({ actor }),
          content: chatHtml
        });

        ui.notifications?.info(`${actor.name} evoluiu para o Nível ${newLevel} de Despertar!`);
        return true;
      }
    }
  });
}
