/**
 * ==============================================================================
 * WIZARD DIALOGS / ASSISTENTES DE CRIAÇÃO (CRIATURAS E LEGADO NPC)
 * ==============================================================================
 */

const { DialogV2 } = foundry.applications.api;
const { renderTemplate } = foundry.applications.handlebars;
import { calculateHomunculusStats, getCreatureStatsByDifficulty, calculateLegacyNpcStats } from "../flow.mjs";
import { promptKnowledgeSelectionDialog } from "./knowledge-dialog.mjs";
import { GaiaItemBrowser } from "../../applications/item-browser.mjs";

/**
 * Exibe o Assistente de Criação de Criatura (Wizard em 3 Etapas).
 * Etapa 1: Conceito, Dificuldade e Tamanho
 * Etapa 2: Visualizar e Definir os Parâmetros e Atributos da Ficha
 * Etapa 3: Características e Livro dos Seres
 *
 * @param {Actor} [actor=null] - Ator opcional para aplicar a configuração
 * @returns {Promise<any>}
 */
export async function promptCreatureWizardDialog(actor = null) {
  const title = game.i18n.localize("GAIA.CreatureWizard.Title") || "Assistente de Criação de Criatura";

  const initialData = {
    name: actor?.name || "Nova Criatura",
    level: Number(actor?.system?.nivel ?? actor?.system?.level) || 1,
    difficulty: actor?.system?.difficulty || "Normal",
    size: actor?.system?.size || "Medio",
    creatureType: actor?.system?.creatureTypes?.[0] || "comum",
    offensiveParameters: Number(actor?.system?.offensiveParameters) || 0,
    defensiveParameters: Number(actor?.system?.defensiveParameters) || 0,
    movement: Number(actor?.system?.movement) || 8,
    passivePerception: Number(actor?.system?.passivePerception) || 10
  };

  const content = await renderTemplate("systems/gaia-preludio/templates/dialog/creature-wizard-dialog.hbs", {
    initialData,
    hasActor: !!actor
  });

  let chosenFeatures = [];

  return await DialogV2.prompt({
    classes: ["gaia-preludio", "gaia-dialog", "gaia-dialog-creature-wizard"],
    window: { title },
    content,
    position: { width: 800, height: "auto" },
    render: (event, dialog) => {
      const html = dialog.element;
      const tabButtons = html.querySelectorAll(".gaia-dialog-tab-btn");
      const tabPanes = html.querySelectorAll(".gaia-dialog-tab-pane");
      const navButtons = html.querySelectorAll(".gaia-wizard-nav-btn");
      const okButton = html.querySelector('button[data-action="ok"]');

      if (okButton) {
        okButton.innerHTML = actor
          ? `<i class="fa-solid fa-floppy-disk"></i> Aplicar à Ficha`
          : `<i class="fa-solid fa-plus"></i> Criar Criatura`;
      }

      // Função de Troca de Abas
      const switchTab = (targetTab) => {
        tabButtons.forEach(b => b.classList.toggle("active", b.dataset.tab === targetTab));
        tabPanes.forEach(pane => pane.classList.toggle("active", pane.dataset.tab === targetTab));
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

      // Inputs de Controle da Etapa 1
      const nameInput = html.querySelector(".wizard-input-name");
      const levelInput = html.querySelector(".wizard-input-level");
      const diffSelect = html.querySelector(".wizard-select-difficulty");
      const sizeSelect = html.querySelector(".wizard-select-size");

      // Inputs / Controles da Etapa 2
      const offInput = html.querySelector(".wizard-input-off-param");
      const defInput = html.querySelector(".wizard-input-def-param");
      const btnOffMinus = html.querySelector(".btn-off-minus");
      const btnOffPlus = html.querySelector(".btn-off-plus");
      const btnDefMinus = html.querySelector(".btn-def-minus");
      const btnDefPlus = html.querySelector(".btn-def-plus");

      // Elementos de Exibição
      const valPvBase = html.querySelector(".val-pv-base");
      const valPeBase = html.querySelector(".val-pe-base");
      const valPoderBase = html.querySelector(".val-poder-base");
      const valParamBase = html.querySelector(".val-param-base");
      const valFeatBase = html.querySelector(".val-feat-base");

      const valHp = html.querySelector(".wizard-val-hp");
      const subHp = html.querySelector(".wizard-sub-hp");
      const valPe = html.querySelector(".wizard-val-pe");
      const subPe = html.querySelector(".wizard-sub-pe");
      const valPower = html.querySelector(".wizard-val-power");
      const subPower = html.querySelector(".wizard-sub-power");

      const paramPoolRemaining = html.querySelector(".wizard-param-pool-remaining");
      const paramPoolTotal = html.querySelector(".wizard-param-pool-total");
      const valFeaturesCount = html.querySelector(".wizard-val-features-count");

      // Resumo Final
      const summaryName = html.querySelector(".wizard-summary-name");
      const summaryLevel = html.querySelector(".wizard-summary-level");
      const summaryDifficulty = html.querySelector(".wizard-summary-difficulty");
      const summarySize = html.querySelector(".wizard-summary-size");
      const summaryHp = html.querySelector(".wizard-summary-hp");
      const summaryPe = html.querySelector(".wizard-summary-pe");
      const summaryPower = html.querySelector(".wizard-summary-power");
      const summaryOff = html.querySelector(".wizard-summary-off");
      const summaryDef = html.querySelector(".wizard-summary-def");
      const summaryFeatures = html.querySelector(".wizard-summary-features");

      let currentOff = Number(offInput?.value) || initialData.offensiveParameters || 0;
      let currentDef = Number(defInput?.value) || initialData.defensiveParameters || 0;
      let maxFeaturesCount = 3;

      // Atualização Dinâmica em Tempo Real dos Atributos
      const updateCalculations = () => {
        const difficulty = diffSelect?.value || "Normal";
        const level = Number(levelInput?.value) || 0;
        const name = nameInput?.value || "Criatura Sem Nome";
        const size = sizeSelect?.value || "Médio";

        const stats = calculateHomunculusStats(difficulty, level);
        const base = getCreatureStatsByDifficulty(difficulty);

        // Atualiza Etapa 1
        if (valPvBase) valPvBase.textContent = base.health;
        if (valPeBase) valPeBase.textContent = base.energy;
        if (valPoderBase) valPoderBase.textContent = base.powerPoints;
        if (valParamBase) valParamBase.textContent = base.parameters;
        if (valFeatBase) valFeatBase.textContent = base.features;

        // Atualiza Etapa 2
        if (valHp) valHp.textContent = stats.health;
        if (subHp) subHp.textContent = `(Base ${stats.baseHealth} + Bônus Nível ${stats.bonusHealth})`;

        if (valPe) valPe.textContent = stats.energy;
        if (subPe) subPe.textContent = `(Base ${stats.baseEnergy} + Bônus Nível ${stats.bonusEnergy})`;

        if (valPower) valPower.textContent = stats.powerPoints;
        if (subPower) subPower.textContent = `(Base ${stats.basePowerPoints} + Bônus Nível ${stats.bonusPowerPoints})`;

        if (paramPoolTotal) paramPoolTotal.textContent = stats.parameters;

        // Ajuste no pool de parâmetros
        const totalUsed = currentOff + currentDef;
        const remaining = stats.parameters - totalUsed;
        if (paramPoolRemaining) paramPoolRemaining.textContent = remaining;

        if (btnOffPlus) btnOffPlus.disabled = remaining <= 0;
        if (btnDefPlus) btnDefPlus.disabled = remaining <= 0;
        if (btnOffMinus) btnOffMinus.disabled = currentOff <= 0;
        if (btnDefMinus) btnDefMinus.disabled = currentDef <= 0;

        // Atualiza Etapa 3 & Resumo
        maxFeaturesCount = stats.features;
        if (valFeaturesCount) valFeaturesCount.textContent = maxFeaturesCount;
        const hintMax = html.querySelector(".wizard-hint-features-max");
        if (hintMax) hintMax.textContent = maxFeaturesCount;
        const hintMax2 = html.querySelector(".wizard-hint-features-max-2");
        if (hintMax2) hintMax2.textContent = maxFeaturesCount;

        if (summaryName) summaryName.textContent = name;
        if (summaryLevel) summaryLevel.textContent = `Nível ${level}`;
        if (summaryDifficulty) summaryDifficulty.textContent = difficulty;
        if (summarySize) summarySize.textContent = size;
        if (summaryHp) summaryHp.textContent = stats.health;
        if (summaryPe) summaryPe.textContent = stats.energy;
        if (summaryPower) summaryPower.textContent = stats.powerPoints;
        if (summaryOff) summaryOff.textContent = currentOff;
        if (summaryDef) summaryDef.textContent = currentDef;

        renderChosenFeatures();
      };

      const renderChosenFeatures = () => {
        const selectedCount = html.querySelector(".wizard-selected-features-count");
        if (selectedCount) selectedCount.textContent = chosenFeatures.length;

        const btnCount = html.querySelector(".wizard-btn-features-count");
        if (btnCount) btnCount.textContent = `${chosenFeatures.length}/${maxFeaturesCount}`;

        const summaryCount = html.querySelector(".wizard-summary-features-count");
        if (summaryCount) summaryCount.textContent = `${chosenFeatures.length}/${maxFeaturesCount}`;

        const summaryFeat = html.querySelector(".wizard-summary-features");
        if (summaryFeat) {
          summaryFeat.textContent = chosenFeatures.length
            ? chosenFeatures.map(f => f.name).join(", ")
            : "Nenhuma selecionada";
        }

        const featuresListEl = html.querySelector(".wizard-chosen-features-list");
        if (featuresListEl) {
          if (!chosenFeatures.length) {
            featuresListEl.innerHTML = `
              <div class="empty-features-hint" style="font-style: italic; color: var(--gaia-text-muted); font-size: 11px; padding: 6px; border: 1px dashed var(--gaia-border-subtle); border-radius: var(--gaia-radius); text-align: center;">
                Nenhuma característica selecionada. Clique no botão acima para escolher até ${maxFeaturesCount} características.
              </div>
            `;
          } else {
            featuresListEl.innerHTML = chosenFeatures.map((feat, idx) => `
              <div class="chosen-feature-pill" data-uuid="${feat.uuid}" style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.25); border: 1px solid var(--gaia-border-subtle); border-radius: var(--gaia-radius); padding: 4px 8px;">
                <div style="display: flex; align-items: center; gap: 6px;">
                  <img src="${feat.img || 'icons/svg/aura.svg'}" width="20" height="20" style="border: none; border-radius: var(--gaia-radius);" />
                  <span style="font-family: var(--gaia-font-medieval); font-weight: bold; color: var(--gaia-text-parchment); font-size: 12px;">${feat.name}</span>
                </div>
                <button type="button" class="btn-remove-chosen-feature" data-uuid="${feat.uuid}" data-index="${idx}" style="background: transparent; border: none; color: var(--gaia-text-muted); cursor: pointer;" title="Remover característica">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            `).join("");

            featuresListEl.querySelectorAll(".btn-remove-chosen-feature").forEach(btn => {
              btn.addEventListener("click", (ev) => {
                ev.preventDefault();
                const uuid = btn.dataset.uuid;
                chosenFeatures = chosenFeatures.filter(f => f.uuid !== uuid);
                renderChosenFeatures();
              });
            });
          }
        }
      };

      const btnOpenBrowser = html.querySelector(".btn-open-features-browser");
      btnOpenBrowser?.addEventListener("click", (ev) => {
        ev.preventDefault();

        GaiaItemBrowser.open(null, {
          selectionMode: true,
          maxSelectable: maxFeaturesCount,
          selectedItems: [...chosenFeatures],
          selectedSource: "all",
          type: "feature",
          searchTerm: "Caracteristica",
          onSelect: (selected) => {
            chosenFeatures = [...selected];
            renderChosenFeatures();
          }
        });
      });

      // Listeners de Eventos
      diffSelect?.addEventListener("change", updateCalculations);
      levelInput?.addEventListener("input", updateCalculations);
      nameInput?.addEventListener("input", updateCalculations);
      sizeSelect?.addEventListener("change", updateCalculations);

      btnOffPlus?.addEventListener("click", () => {
        currentOff++;
        if (offInput) offInput.value = currentOff;
        updateCalculations();
      });

      btnOffMinus?.addEventListener("click", () => {
        if (currentOff > 0) currentOff--;
        if (offInput) offInput.value = currentOff;
        updateCalculations();
      });

      btnDefPlus?.addEventListener("click", () => {
        currentDef++;
        if (defInput) defInput.value = currentDef;
        updateCalculations();
      });

      btnDefMinus?.addEventListener("click", () => {
        if (currentDef > 0) currentDef--;
        if (defInput) defInput.value = currentDef;
        updateCalculations();
      });

      updateCalculations();
    },
    ok: {
      label: actor ? "Aplicar à Ficha" : "Criar Criatura",
      icon: actor ? "fa-solid fa-floppy-disk" : "fa-solid fa-plus",
      callback: async (event, button, dialog) => {
        const html = dialog.element;

        const name = html.querySelector(".wizard-input-name")?.value || "Nova Criatura";
        const level = Number(html.querySelector(".wizard-input-level")?.value) || 0;
        const difficulty = html.querySelector(".wizard-select-difficulty")?.value || "Normal";
        const size = html.querySelector(".wizard-select-size")?.value || "Medio";
        const creatureType = html.querySelector(".wizard-select-type")?.value || "comum";

        const offParam = Number(html.querySelector(".wizard-input-off-param")?.value) || 0;
        const defParam = Number(html.querySelector(".wizard-input-def-param")?.value) || 0;
        const movement = Number(html.querySelector(".wizard-input-movement")?.value) || 8;
        const perception = Number(html.querySelector(".wizard-input-perception")?.value) || 10;

        const stats = calculateHomunculusStats(difficulty, level);

        const updateData = {
          name,
          "system.nivel": level,
          "system.level": level,
          "system.difficulty": difficulty,
          "system.size": size,
          "system.creatureTypes": [creatureType],
          "system.health.value": stats.health,
          "system.health.max": stats.health,
          "system.energy.value": stats.energy,
          "system.energy.max": stats.energy,
          "system.powerPoints": stats.powerPoints,
          "system.offensiveParameters": offParam,
          "system.defensiveParameters": defParam,
          "system.movement": movement,
          "system.passivePerception": perception
        };

        let targetActor = actor;
        if (actor) {
          await actor.update(updateData);
          ui.notifications.info(`Ficha da criatura "${name}" configurada com sucesso!`);
        } else {
          const [createdActor] = await Actor.createDocuments([{
            name,
            type: "creature",
            system: {
              nivel: level,
              level,
              difficulty,
              size,
              creatureTypes: [creatureType],
              health: { value: stats.health, max: stats.health },
              energy: { value: stats.energy, max: stats.energy },
              powerPoints: stats.powerPoints,
              offensiveParameters: offParam,
              defensiveParameters: defParam,
              movement,
              passivePerception: perception
            }
          }]);
          targetActor = createdActor;
          targetActor?.sheet?.render(true);
          ui.notifications.info(`Criatura "${name}" criada com sucesso!`);
        }

        if (targetActor && chosenFeatures.length > 0) {
          const itemDocs = (await Promise.all(chosenFeatures.map(f => fromUuid(f.uuid))))
            .filter(Boolean)
            .map(d => d.toObject());

          if (itemDocs.length) {
            await targetActor.createEmbeddedDocuments("Item", itemDocs);
            ui.notifications.info(`${itemDocs.length} característica(s) adicionada(s) à ficha!`);
          }
        }

        return targetActor;
      }
    },
    rejectClose: false
  });
}

/**
 * Exibe o Assistente de Criação de Legado NPC (Wizard em 3 Etapas / 4 Passos).
 * 1º PASSO: Legado e Identidade
 * 2º PASSO: Dificuldade & Parâmetros (limite por categoria 4 ou 6)
 * 3º PASSO: Bônus por Nível de Despertar do Grupo de Jogadores
 * 4º PASSO: Habilidades de Caminho, Conhecimentos & Maestrias
 *
 * @param {Actor} [actor=null] - Ator opcional para aplicar a configuração
 * @returns {Promise<any>}
 */
export async function promptLegacyNpcWizardDialog(actor = null) {
  const title = game.i18n.localize("GAIA.LegacyNpcWizard.Title") || "Assistente de Criação de Legado NPC";

  const initialData = {
    name: actor?.name || "Novo Legado NPC",
    legacy: actor?.system?.legacy || "",
    level: Number(actor?.system?.nivel ?? actor?.system?.level) || 1,
    difficulty: actor?.system?.difficulty || "Normal",
    offensiveParameters: Number(actor?.system?.offensiveParameters) || 0,
    defensiveParameters: Number(actor?.system?.defensiveParameters) || 0,
    movement: Number(actor?.system?.movement) || 8,
    passivePerception: Number(actor?.system?.passivePerception) || 10,
    knowledge: actor?.system?.knowledge ? Array.from(actor.system.knowledge) : []
  };

  const worldLegacies = (game.items?.filter(i => i.type === "legacy") ?? []).map(i => i.name);
  const actorLegacies = (actor?.items?.filter(i => i.type === "legacy") ?? []).map(i => i.name);
  const compendiumLegacies = [];
  for (const pack of game.packs.filter(p => p.documentName === "Item")) {
    const index = await pack.getIndex({ fields: ["type"] });
    for (const entry of index) {
      if (entry.type === "legacy") compendiumLegacies.push(entry.name);
    }
  }
  const allLegacies = Array.from(new Set([...worldLegacies, ...actorLegacies, ...compendiumLegacies])).filter(Boolean);
  if (initialData.legacy && !allLegacies.includes(initialData.legacy)) {
    allLegacies.push(initialData.legacy);
  }
  allLegacies.sort((a, b) => a.localeCompare(b));

  const content = await renderTemplate("systems/gaia-preludio/templates/dialog/legacy-npc-wizard-dialog.hbs", {
    initialData,
    hasActor: !!actor,
    legacyOptions: allLegacies
  });

  let selectedKnowledge = initialData.knowledge ? JSON.parse(JSON.stringify(initialData.knowledge)) : [];
  let chosenAbilities = [];

  // Se o ator já possui habilidades na ficha, pré-carrega com seus aprimoramentos
  if (actor) {
    const existingAbilities = actor.items.filter(i => i.type === "ability");
    for (const ab of existingAbilities) {
      const imps = (ab.system?.improvements || []).map((imp, idx) => {
        const letter = String.fromCharCode(65 + (idx % 26));
        return {
          index: idx,
          letter: `${letter})`,
          title: typeof imp === "string" ? imp : (imp.title || `Aprimoramento ${letter}`),
          description: typeof imp === "string" ? "" : (imp.description || ""),
          active: typeof imp === "object" ? Boolean(imp.active) : false
        };
      });
      const activeIdx = imps.findIndex(imp => imp.active);
      chosenAbilities.push({
        id: ab.id,
        uuid: ab.uuid,
        name: ab.name,
        img: ab.img,
        isOwned: true,
        improvements: imps,
        selectedImprovementIndex: activeIdx >= 0 ? activeIdx : -1
      });
    }
  }

  return await DialogV2.prompt({
    classes: ["gaia-preludio", "gaia-dialog", "gaia-dialog-legacy-npc-wizard"],
    window: { title },
    content,
    position: { width: 800, height: "auto" },
    render: (event, dialog) => {
      const html = dialog.element;
      const tabButtons = html.querySelectorAll(".gaia-dialog-tab-btn");
      const tabPanes = html.querySelectorAll(".gaia-dialog-tab-pane");
      const navButtons = html.querySelectorAll(".gaia-wizard-nav-btn");

      // Função de Troca de Abas
      const switchTab = (targetTab) => {
        tabButtons.forEach(b => b.classList.toggle("active", b.dataset.tab === targetTab));
        tabPanes.forEach(pane => pane.classList.toggle("active", pane.dataset.tab === targetTab));
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

      // Inputs de Controle
      const nameInput = html.querySelector(".wizard-input-name");
      const legacyInput = html.querySelector(".wizard-input-legacy");
      const partyLevelInput = html.querySelector(".wizard-input-party-level");
      const diffSelect = html.querySelector(".wizard-select-difficulty");

      const offInput = html.querySelector(".wizard-input-off-param");
      const defInput = html.querySelector(".wizard-input-def-param");
      const btnOffMinus = html.querySelector(".btn-off-minus");
      const btnOffPlus = html.querySelector(".btn-off-plus");
      const btnDefMinus = html.querySelector(".btn-def-minus");
      const btnDefPlus = html.querySelector(".btn-def-plus");
      const btnSelectKnowledge = html.querySelector(".btn-select-knowledge");

      // Elementos de Exibição
      const valHp = html.querySelector(".wizard-val-hp");
      const subHp = html.querySelector(".wizard-sub-hp");
      const valPe = html.querySelector(".wizard-val-pe");
      const subPe = html.querySelector(".wizard-sub-pe");
      const valPower = html.querySelector(".wizard-val-power");
      const subPower = html.querySelector(".wizard-sub-power");

      const paramPoolRemaining = html.querySelector(".wizard-param-pool-remaining");
      const paramPoolTotal = html.querySelector(".wizard-param-pool-total");
      const paramCatLimit = html.querySelector(".wizard-param-cat-limit");

      const valAbilitiesMax = html.querySelector(".wizard-val-abilities-max");
      const valEnhancements = html.querySelector(".wizard-val-enhancements");
      const valKnowledge = html.querySelector(".wizard-val-knowledge");
      const valMasteries = html.querySelector(".wizard-val-masteries");

      // Resumo Final
      const summaryName = html.querySelector(".wizard-summary-name");
      const summaryLegacy = html.querySelector(".wizard-summary-legacy");
      const summaryDifficulty = html.querySelector(".wizard-summary-difficulty");
      const summaryLevel = html.querySelector(".wizard-summary-level");
      const summaryHp = html.querySelector(".wizard-summary-hp");
      const summaryPe = html.querySelector(".wizard-summary-pe");
      const summaryPower = html.querySelector(".wizard-summary-power");
      const summaryOff = html.querySelector(".wizard-summary-off");
      const summaryDef = html.querySelector(".wizard-summary-def");
      const summaryAbilities = html.querySelector(".wizard-summary-abilities");

      let currentOff = Number(offInput?.value) || initialData.offensiveParameters || 0;
      let currentDef = Number(defInput?.value) || initialData.defensiveParameters || 0;

      // Listener para o botão de selecionar conhecimentos
      btnSelectKnowledge?.addEventListener("click", async (e) => {
        e.preventDefault();
        const difficulty = diffSelect?.value || "Normal";
        const level = Number(partyLevelInput?.value) || 0;
        const stats = calculateLegacyNpcStats(difficulty, level);

        const result = await promptKnowledgeSelectionDialog(stats.knowledgePoints, selectedKnowledge);
        if (result !== null && result !== undefined) {
          selectedKnowledge = result;
          updateCalculations();
        }
      });

      // Atualização Dinâmica em Tempo Real dos Atributos
      const updateCalculations = () => {
        const difficulty = diffSelect?.value || "Normal";
        const level = Number(partyLevelInput?.value) || 0;
        const name = nameInput?.value || "Legado NPC Sem Nome";
        const legacy = legacyInput?.value || "Legado";

        const stats = calculateLegacyNpcStats(difficulty, level);

        // Atualiza Etapa 2
        if (valHp) valHp.textContent = stats.health;
        if (subHp) subHp.textContent = `(Base ${stats.baseHealth} + Nível ${stats.bonusHealth})`;

        if (valPe) valPe.textContent = stats.energy;
        if (subPe) subPe.textContent = `(Base ${stats.baseEnergy} + Nível ${stats.bonusEnergy})`;

        if (valPower) valPower.textContent = stats.powerPoints;
        if (subPower) subPower.textContent = `(Base ${stats.basePowerPoints} + Nível ${stats.bonusPowerPoints})`;

        if (paramPoolTotal) paramPoolTotal.textContent = stats.parameters;
        if (paramCatLimit) paramCatLimit.textContent = stats.maxParamCategory;

        // Limite por Categoria (4 ou 6)
        const catLimit = stats.maxParamCategory;
        if (currentOff > catLimit) currentOff = catLimit;
        if (currentDef > catLimit) currentDef = catLimit;
        if (offInput) offInput.value = currentOff;
        if (defInput) defInput.value = currentDef;

        const totalUsed = currentOff + currentDef;
        const remaining = stats.parameters - totalUsed;
        if (paramPoolRemaining) paramPoolRemaining.textContent = remaining;

        if (btnOffPlus) btnOffPlus.disabled = remaining <= 0 || currentOff >= catLimit;
        if (btnDefPlus) btnDefPlus.disabled = remaining <= 0 || currentDef >= catLimit;
        if (btnOffMinus) btnOffMinus.disabled = currentOff <= 0;
        if (btnDefMinus) btnDefMinus.disabled = currentDef <= 0;

        // Atualiza Etapa 3
        const totalAllocatedKnowledge = (selectedKnowledge || []).reduce((sum, k) => sum + (Number(k.value) || 0), 0);
        maxAbilitiesCount = stats.maxAbilities;
        if (valAbilitiesMax) valAbilitiesMax.textContent = maxAbilitiesCount;
        const hintMax = html.querySelector(".wizard-hint-abilities-max");
        if (hintMax) hintMax.textContent = maxAbilitiesCount;
        const hintMax2 = html.querySelector(".wizard-hint-abilities-max-2");
        if (hintMax2) hintMax2.textContent = maxAbilitiesCount;

        if (valEnhancements) valEnhancements.textContent = stats.enhancementsDesc;
        if (valKnowledge) valKnowledge.textContent = `${stats.knowledgePoints} Pontos (${totalAllocatedKnowledge} distribuidos)`;
        if (valMasteries) valMasteries.textContent = `${stats.masteries} Maestrias`;

        // Atualiza Resumo
        if (summaryName) summaryName.textContent = name;
        if (summaryLegacy) summaryLegacy.textContent = legacy;
        if (summaryDifficulty) summaryDifficulty.textContent = difficulty;
        if (summaryLevel) summaryLevel.textContent = `Nível Grupo: ${level}`;
        if (summaryHp) summaryHp.textContent = stats.health;
        if (summaryPe) summaryPe.textContent = stats.energy;
        if (summaryPower) summaryPower.textContent = stats.powerPoints;
        if (summaryOff) summaryOff.textContent = currentOff;
        if (summaryDef) summaryDef.textContent = currentDef;

        renderChosenAbilities();
      };

      let maxAbilitiesCount = 3;

      const promptChooseImprovementDialog = async (ability) => {
        const imps = ability.improvements || [];
        const currentIdx = ability.selectedImprovementIndex ?? -1;

        const content = `
          <div class="gaia-dialog-choose-enhancement" style="display: flex; flex-direction: column; gap: 8px; font-family: var(--gaia-font-medieval); color: var(--gaia-text-parchment);">
            <p style="font-size: var(--gaia-font-sm); color: var(--gaia-text-muted); margin: 0 0 6px 0;">
              Selecione o aprimoramento desejado para <strong>${ability.name}</strong>:
            </p>
            <label class="enhancement-option-card" style="display: flex; gap: 8px; align-items: center; cursor: pointer; padding: 6px 8px; border: 1px solid var(--gaia-border-subtle); border-radius: var(--gaia-radius); background: rgba(0,0,0,0.25);">
              <input type="radio" name="selected_imp" value="-1" ${currentIdx === -1 ? 'checked' : ''} />
              <div>
                <strong style="color: var(--gaia-text-parchment);">Nenhum Aprimoramento</strong>
                <div style="font-size: var(--gaia-font-xs); color: var(--gaia-text-muted);">Manter habilidade em sua forma básica</div>
              </div>
            </label>
            ${imps.map((imp, i) => `
              <label class="enhancement-option-card" style="display: flex; gap: 8px; align-items: flex-start; cursor: pointer; padding: 6px 8px; border: 1px solid var(--gaia-border-subtle); border-radius: var(--gaia-radius); background: rgba(0,0,0,0.25);">
                <input type="radio" name="selected_imp" value="${i}" ${currentIdx === i ? 'checked' : ''} style="margin-top: 3px;" />
                <div style="flex: 1;">
                  <strong style="color: var(--gaia-gold-accent);">${imp.letter} ${imp.title}</strong>
                  ${imp.description ? `<div style="font-size: var(--gaia-font-xs); color: var(--gaia-text-parchment); margin-top: 2px; line-height: 1.3;">${imp.description}</div>` : ''}
                </div>
              </label>
            `).join("")}
          </div>
        `;

        return await DialogV2.prompt({
          window: { title: `Aprimorar: ${ability.name}` },
          content,
          classes: ["gaia-preludio", "gaia-dialog", "gaia-dialog-enhancement"],
          position: { width: 450, height: "auto" },
          ok: {
            label: "Confirmar",
            icon: "fa-solid fa-check",
            callback: (event, button, dialog) => {
              const selectedRadio = dialog.element.querySelector("input[name='selected_imp']:checked");
              if (selectedRadio) {
                ability.selectedImprovementIndex = Number(selectedRadio.value);
              }
            }
          }
        });
      };

      const renderChosenAbilities = () => {
        const selectedCount = html.querySelector(".wizard-selected-abilities-count");
        if (selectedCount) selectedCount.textContent = chosenAbilities.length;

        const selectedCount2 = html.querySelector(".wizard-selected-abilities-count-2");
        if (selectedCount2) selectedCount2.textContent = chosenAbilities.length;

        const btnCount = html.querySelector(".wizard-btn-abilities-count");
        if (btnCount) btnCount.textContent = `${chosenAbilities.length}/${maxAbilitiesCount}`;

        const summaryCount = html.querySelector(".wizard-summary-abilities-count");
        if (summaryCount) summaryCount.textContent = `${chosenAbilities.length}/${maxAbilitiesCount}`;

        const summaryAbil = html.querySelector(".wizard-summary-abilities");
        if (summaryAbil) {
          summaryAbil.textContent = chosenAbilities.length
            ? chosenAbilities.map(f => {
                const imp = f.selectedImprovementIndex >= 0 && f.improvements?.[f.selectedImprovementIndex];
                const impName = imp ? ` (+${imp.title})` : "";
                return `${f.name}${impName}`;
              }).join(", ")
            : "Nenhuma selecionada";
        }

        const abilitiesListEl = html.querySelector(".wizard-chosen-abilities-list");
        if (abilitiesListEl) {
          if (!chosenAbilities.length) {
            abilitiesListEl.innerHTML = `
              <div class="empty-abilities-hint" style="font-style: italic; color: var(--gaia-text-muted); font-size: var(--gaia-font-base); padding: 6px; border: 1px dashed var(--gaia-border-subtle); border-radius: var(--gaia-radius); text-align: center;">
                Nenhuma habilidade selecionada. Clique no botão acima para escolher até ${maxAbilitiesCount} habilidades.
              </div>
            `;
          } else {
            abilitiesListEl.innerHTML = chosenAbilities.map((ab, idx) => {
              const hasImps = Array.isArray(ab.improvements) && ab.improvements.length > 0;
              const activeImp = (hasImps && ab.selectedImprovementIndex >= 0) ? ab.improvements[ab.selectedImprovementIndex] : null;
              const btnEnhanceLabel = activeImp
                ? `<i class="fa-solid fa-sparkles"></i> ${activeImp.letter} ${activeImp.title}`
                : `<i class="fa-solid fa-sparkles"></i> Aprimorar`;

              return `
                <div class="chosen-ability-pill" data-uuid="${ab.uuid}" style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.25); border: 1px solid var(--gaia-border-subtle); border-radius: var(--gaia-radius); padding: 4px 8px; gap: 8px;">
                  <div style="display: flex; align-items: center; gap: 6px; flex: 1; min-width: 0;">
                    <img src="${ab.img || 'icons/svg/aura.svg'}" width="20" height="20" style="border: none; border-radius: var(--gaia-radius); flex-shrink: 0;" />
                    <span style="font-family: var(--gaia-font-medieval); font-weight: bold; color: var(--gaia-text-parchment); font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${ab.name}</span>
                    ${ab.isOwned ? `<span class="badge-owned" title="Habilidade já presente na ficha do Ator">Possuída</span>` : ''}
                  </div>
                  <div style="display: flex; align-items: center; gap: 6px; flex-shrink: 0;">
                    ${hasImps ? `
                      <button type="button" class="btn-enhance-ability ${activeImp ? 'active' : ''}" data-index="${idx}" title="Selecionar aprimoramento para esta habilidade">
                        ${btnEnhanceLabel}
                      </button>
                    ` : ''}
                    <button type="button" class="btn-remove-chosen-ability" data-uuid="${ab.uuid}" data-index="${idx}" style="background: transparent; border: none; color: var(--gaia-text-muted); cursor: pointer;" title="Remover habilidade">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              `;
            }).join("");

            abilitiesListEl.querySelectorAll(".btn-enhance-ability").forEach(btn => {
              btn.addEventListener("click", async (ev) => {
                ev.preventDefault();
                const index = Number(btn.dataset.index);
                const ability = chosenAbilities[index];
                if (!ability || !ability.improvements?.length) return;

                await promptChooseImprovementDialog(ability);
                renderChosenAbilities();
              });
            });

            abilitiesListEl.querySelectorAll(".btn-remove-chosen-ability").forEach(btn => {
              btn.addEventListener("click", (ev) => {
                ev.preventDefault();
                const idx = Number(btn.dataset.index);
                chosenAbilities.splice(idx, 1);
                renderChosenAbilities();
              });
            });
          }
        }
      };

      const btnOpenAbilities = html.querySelector(".btn-open-abilities-browser");
      btnOpenAbilities?.addEventListener("click", (ev) => {
        ev.preventDefault();

        GaiaItemBrowser.open(null, {
          selectionMode: true,
          maxSelectable: maxAbilitiesCount,
          selectedItems: [...chosenAbilities],
          type: "ability",
          selectedSource: "all",
          onSelect: async (selected) => {
            const newChosen = [];
            for (const sel of selected) {
              const existing = chosenAbilities.find(a => a.uuid === sel.uuid || (a.id && a.id === sel.id) || a.name.toLowerCase() === sel.name.toLowerCase());
              if (existing) {
                newChosen.push(existing);
              } else {
                let imps = [];
                let itemDoc = null;
                if (sel.uuid) {
                  itemDoc = await fromUuid(sel.uuid);
                }
                if (itemDoc?.system?.improvements) {
                  imps = (itemDoc.system.improvements || []).map((imp, idx) => {
                    const letter = String.fromCharCode(65 + (idx % 26));
                    return {
                      index: idx,
                      letter: `${letter})`,
                      title: typeof imp === "string" ? imp : (imp.title || `Aprimoramento ${letter}`),
                      description: typeof imp === "string" ? "" : (imp.description || ""),
                      active: typeof imp === "object" ? Boolean(imp.active) : false
                    };
                  });
                }
                const isOwned = actor ? actor.items.some(i => i.type === "ability" && (i.name.toLowerCase() === sel.name.toLowerCase() || i.uuid === sel.uuid)) : false;
                const activeIdx = imps.findIndex(imp => imp.active);
                newChosen.push({
                  id: sel.id || itemDoc?.id,
                  uuid: sel.uuid,
                  name: sel.name,
                  img: sel.img,
                  isOwned,
                  improvements: imps,
                  selectedImprovementIndex: activeIdx >= 0 ? activeIdx : -1
                });
              }
            }
            chosenAbilities = newChosen;
            renderChosenAbilities();
          }
        });
      });

      // Listeners de Eventos
      diffSelect?.addEventListener("change", updateCalculations);
      partyLevelInput?.addEventListener("input", updateCalculations);
      nameInput?.addEventListener("input", updateCalculations);
      legacyInput?.addEventListener("input", updateCalculations);
      legacyInput?.addEventListener("change", updateCalculations);

      btnOffPlus?.addEventListener("click", () => {
        currentOff++;
        if (offInput) offInput.value = currentOff;
        updateCalculations();
      });

      btnOffMinus?.addEventListener("click", () => {
        if (currentOff > 0) currentOff--;
        if (offInput) offInput.value = currentOff;
        updateCalculations();
      });

      btnDefPlus?.addEventListener("click", () => {
        currentDef++;
        if (defInput) defInput.value = currentDef;
        updateCalculations();
      });

      btnDefMinus?.addEventListener("click", () => {
        if (currentDef > 0) currentDef--;
        if (defInput) defInput.value = currentDef;
        updateCalculations();
      });

      updateCalculations();
    },
    ok: {
      label: actor ? "Aplicar à Ficha" : "Criar Legado NPC",
      icon: actor ? "fa-solid fa-floppy-disk" : "fa-solid fa-plus",
      callback: async (event, button, dialog) => {
        const html = dialog.element;

        const name = html.querySelector(".wizard-input-name")?.value || "Novo Legado NPC";
        const legacy = html.querySelector(".wizard-input-legacy")?.value || "";
        const level = Number(html.querySelector(".wizard-input-party-level")?.value) || 0;
        const difficulty = html.querySelector(".wizard-select-difficulty")?.value || "Normal";

        const offParam = Number(html.querySelector(".wizard-input-off-param")?.value) || 0;
        const defParam = Number(html.querySelector(".wizard-input-def-param")?.value) || 0;
        const movement = Number(html.querySelector(".wizard-input-movement")?.value) || 8;
        const perception = Number(html.querySelector(".wizard-input-perception")?.value) || 10;

        const stats = calculateLegacyNpcStats(difficulty, level);

        const updateData = {
          name,
          "system.legacy": legacy,
          "system.nivel": level,
          "system.level": level,
          "system.difficulty": difficulty,
          "system.health.value": stats.health,
          "system.health.max": stats.health,
          "system.energy.value": stats.energy,
          "system.energy.max": stats.energy,
          "system.powerPoints": stats.powerPoints,
          "system.offensiveParameters": offParam,
          "system.defensiveParameters": defParam,
          "system.movement": movement,
          "system.passivePerception": perception,
          "system.knowledge": selectedKnowledge
        };

        let targetActor = actor;
        if (actor) {
          await actor.update(updateData);
          ui.notifications.info(`Ficha de Legado NPC "${name}" configurada com sucesso!`);
        } else {
          const [createdActor] = await Actor.createDocuments([{
            name,
            type: "legacyNpc",
            system: {
              legacy,
              nivel: level,
              level,
              difficulty,
              health: { value: stats.health, max: stats.health },
              energy: { value: stats.energy, max: stats.energy },
              powerPoints: stats.powerPoints,
              offensiveParameters: offParam,
              defensiveParameters: defParam,
              movement,
              passivePerception: perception,
              knowledge: selectedKnowledge
            }
          }]);
          targetActor = createdActor;
          targetActor?.sheet?.render(true);
          ui.notifications.info(`Legado NPC "${name}" criado com sucesso!`);
        }

        if (targetActor && chosenAbilities.length > 0) {
          const itemsToCreate = [];
          for (const ab of chosenAbilities) {
            const existingItem = targetActor.items.find(i => (ab.id && i.id === ab.id) || i.name.toLowerCase() === ab.name.toLowerCase());
            if (existingItem) {
              if (ab.selectedImprovementIndex !== undefined) {
                const rawImps = Array.isArray(existingItem.system?.improvements) ? [...existingItem.system.improvements] : [];
                const updated = rawImps.map((imp, i) => {
                  if (typeof imp === "object") {
                    return { ...imp, active: i === ab.selectedImprovementIndex };
                  }
                  return { title: String(imp), description: "", active: i === ab.selectedImprovementIndex };
                });
                await existingItem.update({ "system.improvements": updated });
              }
            } else if (ab.uuid) {
              const doc = await fromUuid(ab.uuid);
              if (doc) {
                const itemData = doc.toObject();
                if (ab.selectedImprovementIndex >= 0 && Array.isArray(itemData.system?.improvements)) {
                  itemData.system.improvements = itemData.system.improvements.map((imp, i) => {
                    if (typeof imp === "object") {
                      return { ...imp, active: i === ab.selectedImprovementIndex };
                    }
                    return { title: String(imp), description: "", active: i === ab.selectedImprovementIndex };
                  });
                }
                itemsToCreate.push(itemData);
              }
            }
          }
          if (itemsToCreate.length) {
            await targetActor.createEmbeddedDocuments("Item", itemsToCreate);
          }
          ui.notifications.info(`Habilidades e aprimoramentos configurados na ficha com sucesso!`);
        }

        return targetActor;
      }
    },
    rejectClose: false
  });
}
