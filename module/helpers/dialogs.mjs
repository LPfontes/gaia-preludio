/**
 * ==============================================================================
 * DIALOG HELPERS / AUXILIARES DE CAIXAS DE DIÁLOGO
 * ==============================================================================
 * Funções modulares para exibir caixas de diálogo interativas do sistema
 * (DialogV2 e Dialog nativo) para adição de traços, edição de campos e maestrias.
 */

const { DialogV2 } = foundry.applications.api;
const { renderTemplate } = foundry.applications.handlebars;
const { FormDataExtended } = foundry.applications.ux || foundry.utils;
import { calculateHomunculusStats, getCreatureStatsByDifficulty, calculateLegacyNpcStats } from "./flow.mjs";

/**
 * Obtém a lista plana formatada de tipos de dano com seus rótulos traduzidos.
 * @returns {Array<{key: string, label: string}>}
 */
export function getDamageTypeOptions() {
  return [
    { key: "physical", label: game.i18n.localize("GAIA.DamageType.Physical") },
    { key: "fire", label: game.i18n.localize("GAIA.DamageType.Fire") },
    { key: "wind", label: game.i18n.localize("GAIA.DamageType.Wind") },
    { key: "water", label: game.i18n.localize("GAIA.DamageType.Water") },
    { key: "earth", label: game.i18n.localize("GAIA.DamageType.Earth") },
    { key: "thunder", label: game.i18n.localize("GAIA.DamageType.Thunder") },
    { key: "ice", label: game.i18n.localize("GAIA.DamageType.Ice") },
    { key: "neutro", label: game.i18n.localize("GAIA.DamageType.Neutro") },
    { key: "nature", label: game.i18n.localize("GAIA.DamageType.Nature") },
    { key: "profane", label: game.i18n.localize("GAIA.DamageType.Profane") },
    { key: "light", label: game.i18n.localize("GAIA.DamageType.Light") },
    { key: "dark", label: game.i18n.localize("GAIA.DamageType.Dark") },
    { key: "immaterial", label: game.i18n.localize("GAIA.DamageType.Immaterials") }
  ];
}

/**
 * Exibe caixa de diálogo DialogV2 para adicionar Resistência, Imunidade ou Redução de Dano.
 * @param {string} title - Título da janela
 * @param {boolean} [isReduction=false] - Se true, inclui campo de valor numérico
 * @returns {Promise<{type: string, value?: number} | null>}
 */
export async function promptDefenseTraitDialog(title, isReduction = false) {
  const damageTypes = getDamageTypeOptions();
  const dialogHtml = await renderTemplate("systems/gaia-preludio/templates/dialog/defense-trait-dialog.hbs", {
    title,
    damageTypes,
    isReduction
  });

  const result = await DialogV2.wait({
    classes: ["gaia-preludio", "gaia-dialog", "defense-dialog"],
    window: { title },
    position: { width: 380, height: "auto" },
    content: dialogHtml,
    buttons: [
      {
        action: "confirm",
        label: "Adicionar",
        icon: "fa-solid fa-plus",
        default: true,
        callback: (event, button, dialog) => {
          const form = dialog.element.querySelector("form");
          const data = new FormDataExtended(form).object;
          const custom = String(data.customType || "").trim();
          const selectedKey = String(data.damageType || "");
          const selectedOpt = damageTypes.find(d => d.key === selectedKey);
          const resolvedType = custom.length > 0 ? custom : (selectedOpt?.label || selectedKey);
          return {
            type: resolvedType,
            value: Number(data.value) || 1
          };
        }
      },
      {
        action: "cancel",
        label: "Cancelar",
        icon: "fa-solid fa-xmark",
        callback: () => null
      }
    ],
    rejectClose: false
  });

  if (result === "cancel" || !result) return null;
  return result;
}

/**
 * Abre diálogo para selecionar e adicionar uma nova maestria ao personagem.
 * @param {Actor} actor - Documento do Ator
 * @returns {Promise<void>}
 */
export async function promptMasteryDialog(actor) {
  const currentMasteries = new Set(actor.system.masteries ?? []);
  let optionsHtml = "";

  for (const [kKey, mObj] of Object.entries(CONFIG.GAIA?.masteries ?? {})) {
    const rawK = CONFIG.GAIA?.knowledge?.[kKey] ?? kKey;
    const kLabel = typeof rawK === "string" ? game.i18n.localize(rawK) : String(rawK);
    optionsHtml += `<optgroup label="${kLabel}">`;
    for (const [mKey, locString] of Object.entries(mObj)) {
      if (!currentMasteries.has(mKey)) {
        const mLabel = game.i18n.localize(locString);
        optionsHtml += `<option value="${mKey}">${mLabel}</option>`;
      }
    }
    optionsHtml += `</optgroup>`;
  }

  const result = await DialogV2.wait({
    classes: ["gaia-preludio", "gaia-dialog"],
    window: { title: "Adicionar Maestria" },
    content: `
      <form class="gaia-dialog-form">
        <div class="form-group">
          <label class="form-label" style="display:block; margin-bottom: 4px; font-weight: bold;">Selecione a Maestria:</label>
          <select name="mastery" id="gaia-mastery-select" style="width: 100%;">
            ${optionsHtml}
          </select>
        </div>
      </form>
    `,
    buttons: [
      {
        action: "add",
        label: "Adicionar",
        icon: "fas fa-check",
        default: true,
        callback: async (event, button, dialog) => {
          const form = dialog.element.querySelector("form");
          const data = new FormDataExtended(form).object;
          const selected = String(data.mastery || "").trim();
          if (selected) {
            const list = [...(actor.system.masteries ?? [])];
            if (!list.includes(selected)) {
              list.push(selected);
              await actor.update({ "system.masteries": list });
            }
          }
        }
      },
      {
        action: "cancel",
        label: "Cancelar",
        icon: "fas fa-times"
      }
    ],
    rejectClose: false
  });

  return result;
}

/**
 * Exibe uma caixa de diálogo genérica para alterar o valor de qualquer campo do ator.
 * @param {Actor} actor - Documento do Ator a ser atualizado
 * @param {string} field - Caminho do campo (ex: "system.health.value", "system.exhaustion", "name")
 * @param {object} [options={}] - Configurações opcionais
 * @param {string} [options.label] - Rótulo amigável exibido no diálogo
 * @param {string} [options.title] - Título da janela
 * @param {"number"|"text"|"textarea"} [options.type] - Tipo do input
 * @param {number} [options.min] - Valor mínimo permitido
 * @param {number} [options.max] - Valor máximo permitido
 * @param {number} [options.step] - Incremento do input
 * @returns {Promise<any | null>} Retorna o novo valor ou null se cancelado
 */
export async function promptEditFieldDialog(actor, field, options = {}) {
  if (!actor || !field) return null;

  const [prefix, subKey] = field.split(".");
  let currentVal;

  switch (prefix) {
    case "parameter": {
      const paramKey = (subKey || "").toLowerCase();
      const entry = (actor.system.parameters ?? []).find(p => String(p.name || "").toLowerCase() === paramKey);
      currentVal = entry?.value ?? (Number(foundry.utils.getProperty(actor.system, paramKey)) || 0);
      break;
    }
    case "knowledge": {
      const knowKey = (subKey || "").toLowerCase();
      const entry = (actor.system.knowledge ?? []).find(k => String(k.name || "").toLowerCase() === knowKey);
      currentVal = entry?.value ?? 0;
      break;
    }
    default: {
      const cleanField = field.startsWith("system.") ? field : `system.${field}`;
      const rawBase = foundry.utils.getProperty(actor._source, cleanField);
      currentVal = rawBase !== undefined ? rawBase : foundry.utils.getProperty(actor, field);
      break;
    }
  }

  const validTypes = ["number", "text", "textarea"];
  const inputType = validTypes.includes(options.type) ? options.type : (typeof currentVal === "number" ? "number" : "text");
  const label = options.label || subKey || field.split(".").pop();
  const title = options.title || `Alterar ${label}`;

  let inputHtml = "";
  if (inputType === "textarea") {
    inputHtml = `<textarea name="value" rows="4" style="width: 100%;">${currentVal ?? ""}</textarea>`;
  } else if (inputType === "number") {
    const minAttr = options.min !== undefined ? `min="${options.min}"` : "";
    const maxAttr = options.max !== undefined ? `max="${options.max}"` : "";
    const stepAttr = options.step !== undefined ? `step="${options.step}"` : 'step="any"';
    inputHtml = `<input type="number" name="value" value="${currentVal ?? 0}" ${minAttr} ${maxAttr} ${stepAttr} autofocus style="width: 100%; text-align: center;" />`;
  } else {
    inputHtml = `<input type="text" name="value" value="${currentVal ?? ""}" autofocus style="width: 100%;" />`;
  }

  const content = `
    <form class="gaia-roll-dialog">
      <div class="form-group" style="margin-bottom: 8px;">
        <label style="color: var(--gaia-text-parchment); font-weight: bold; margin-bottom: 4px; display: block;">${label}:</label>
        ${inputHtml}
      </div>
    </form>
  `;

  const result = await DialogV2.wait({
    classes: ["gaia-preludio", "gaia-dialog"],
    window: { title },
    position: { width: 320, height: "auto" },
    content,
    buttons: [
      {
        action: "confirm",
        label: "Salvar",
        icon: "fa-solid fa-check",
        default: true,
        callback: (event, button, dialog) => {
          const form = dialog.element.querySelector("form");
          const rawValue = form.querySelector("[name='value']").value;
          let value = rawValue;
          if (inputType === "number") {
            value = Number(rawValue);
            if (isNaN(value)) value = 0;
          }
          return value;
        }
      },
      {
        action: "cancel",
        label: "Cancelar",
        icon: "fa-solid fa-xmark",
        callback: () => null
      }
    ],
    rejectClose: false
  });

  if (result === null || result === undefined || result === "cancel") return null;
  
  switch (prefix) {
      case "parameter": {
        const paramKey = (subKey || "").toLowerCase();
        // Cria uma cópia da lista atual de parâmetros
        const list = [...(actor.system.parameters ?? [])];
        // Encontra o item correspondente na lista
        let entry = list.find(p => String(p.name || "").toLowerCase() === paramKey);
        // Se não existir, cria um novo
        if (!entry) {
          entry = { name: paramKey, value: 0 };
          list.push(entry);
        }
        // Atualiza o valor
        entry.value = result;
        await actor.update({ "system.parameters": list });
        break;
      }
      case "knowledge": {
        const knowKey = (subKey || "").toLowerCase();
        // Cria uma cópia da lista atual de conhecimentos
        const list = [...(actor.system.knowledge ?? [])];
        // Encontra o item correspondente na lista
        let entry = list.find(k => String(k.name || "").toLowerCase() === knowKey);
        // Se não existir, cria um novo
        if (!entry) {
          entry = { name: knowKey, value: 0 };
          list.push(entry);
        }
        // Atualiza o valor
        entry.value = result;
        await actor.update({ "system.knowledge": list });
        break;
      }
      default:
        // Atualiza qualquer outro campo (path) utilizando o valor original
        await actor.update({ [field]: result }, { saveOriginal: true });
        break;
    }
    return result;
}

/**
 * Exibe o diálogo com as abas do Guia de Despertar Inicial (Parâmetros e Conhecimentos com distribuidores de 7 pontos, Vida & Energia).
 * @param {Actor} [actor=null] - Instância opcional do Ator para aplicar os pontos distribuídos
 * @returns {Promise<any>}
 */
export async function promptAwakeningGuideDialog(actor = null) {
  const title = game.i18n.localize("GAIA.CreateActor.AwakeningRulesTitle");
  
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

  const content = await renderTemplate("systems/gaia-preludio/templates/dialog/awakening-guide-dialog.hbs", {
    parameters,
    knowledge,
    hasActor: !!actor
  });

  return await DialogV2.prompt({
    classes: ["gaia-preludio", "gaia-dialog"],
    window: { title },
    content,
    position: { width: 580, height: "auto" },
    render: (event, dialog) => {
      const html = dialog.element;
      const tabButtons = html.querySelectorAll(".gaia-dialog-tab-btn");
      const tabPanes = html.querySelectorAll(".gaia-dialog-tab-pane");
      const navButtons = html.querySelectorAll(".gaia-wizard-nav-btn");
      const okButton = html.querySelector('button[data-action="ok"]');

      // Função centralizada para troca de abas e controle de visibilidade do botão Confirmar e Aplicar
      const switchTab = (targetTab) => {
        tabButtons.forEach(b => b.classList.toggle("active", b.dataset.tab === targetTab));
        tabPanes.forEach(pane => pane.classList.toggle("active", pane.dataset.tab === targetTab));

        // Exibe o botão de confirmação apenas na 3ª aba (Vida & Energia)
        if (okButton) {
          okButton.style.display = targetTab === "vitals" ? "inline-flex" : "none";
        }
      };

      // Navegação pelas abas superiores
      tabButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          switchTab(btn.dataset.tab);
        });
      });

      // Navegação pelos botões de Avançar / Voltar dentro de cada aba
      navButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          const nextTab = btn.dataset.nextTab;
          if (nextTab) switchTab(nextTab);
        });
      });

      const MAX_TOTAL_POINTS = 7;
      const MAX_PER_PARAM = 2;

      // 3. Definição / Rolagem de Vida (30 + 1d6 (ou 3) + Vigor)
      const rollHpBtn = html.querySelector(".gaia-roll-hp-btn");
      const fixedHpBtn = html.querySelector(".gaia-fixed-hp-btn");
      const calculatedHpDisplay = html.querySelector(".gaia-vitals-calculated-hp");
      const hpInput = html.querySelector(".gaia-hp-selected-input");

      let currentDieVal = 3; // Padrão inicial: valor fixo (3)

      const updateCalculatedHP = () => {
        const vigorInput = html.querySelector('.gaia-param-dist-input[data-param="vigor"]');
        const vigorVal = Number(vigorInput?.value) || 0;
        const totalHP = 30 + currentDieVal + vigorVal;

        const vigorHint = html.querySelector(".gaia-vigor-hint-val");
        if (vigorHint) {
          vigorHint.textContent = String(vigorVal);
        }

        if (calculatedHpDisplay) {
          calculatedHpDisplay.textContent = `${totalHP} PV (30 + ${currentDieVal} + ${vigorVal} Vig)`;
        }
        if (hpInput) {
          hpInput.value = String(totalHP);
        }
      };

      // 1. Distribuidor de Parâmetros
      const paramPointsCounter = html.querySelector(".gaia-points-left");
      const paramInputs = html.querySelectorAll(".gaia-param-dist-input:not(.gaia-know-dist-input)");
      const paramAdjustBtns = html.querySelectorAll(".gaia-param-adjust-btn:not(.gaia-know-adjust-btn)");

      const updateParamPoints = () => {
        let spent = 0;
        paramInputs.forEach(input => spent += Number(input.value) || 0);
        const remaining = Math.max(0, MAX_TOTAL_POINTS - spent);

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
            btn.disabled = remaining <= 0 || currentVal >= MAX_PER_PARAM;
          } else if (action === "decrease") {
            btn.disabled = currentVal <= 0;
          }
        });

        // Sincroniza o cálculo de PV sempre que um parâmetro (Vigor) for ajustado
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
          const remaining = MAX_TOTAL_POINTS - spent;

          if (action === "increase" && remaining > 0 && currentVal < MAX_PER_PARAM) {
            input.value = String(currentVal + 1);
          } else if (action === "decrease" && currentVal > 0) {
            input.value = String(currentVal - 1);
          }

          updateParamPoints();
        });
      });

      // 2. Distribuidor de Conhecimentos
      const knowPointsCounter = html.querySelector(".gaia-know-points-left");
      const knowInputs = html.querySelectorAll(".gaia-know-dist-input");
      const knowAdjustBtns = html.querySelectorAll(".gaia-know-adjust-btn");

      const updateKnowPoints = () => {
        let spent = 0;
        knowInputs.forEach(input => spent += Number(input.value) || 0);
        const remaining = Math.max(0, MAX_TOTAL_POINTS - spent);

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
            btn.disabled = remaining <= 0 || currentVal >= MAX_PER_PARAM;
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
          const remaining = MAX_TOTAL_POINTS - spent;

          if (action === "increase" && remaining > 0 && currentVal < MAX_PER_PARAM) {
            input.value = String(currentVal + 1);
          } else if (action === "decrease" && currentVal > 0) {
            input.value = String(currentVal - 1);
          }

          updateKnowPoints();
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
            flavor: "Rolagem de PV Inicial (1d6) - Gaia: Prelúdio"
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

      updateParamPoints();
      updateKnowPoints();
      updateCalculatedHP();
      switchTab("parameters");
    },
    ok: {
      label: actor ? game.i18n.localize("GAIA.CreateActor.ApplyParameters") : "Entendido",
      icon: "fa-solid fa-check",
      callback: async (event, button, dialog) => {
        if (!actor) return;
        const html = dialog.element;

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

        // 3. Calcula Vida e Bônus Derivados
        const vigorVal = Number(paramList.find(p => p.name === "vigor")?.value) || 0;
        const hpInputVal = Number(html.querySelector(".gaia-hp-selected-input")?.value);
        const baseHp = !isNaN(hpInputVal) && hpInputVal > 0 ? (hpInputVal - vigorVal) : 33;

        await actor.update({
          "system.parameters": paramList,
          "system.knowledge": knowList,
          "system.health.max": baseHp,
          "system.health.value": baseHp + vigorVal,
          "system.energy.value": 5,
          "system.energy.max": 5
        });

        // 4. Atualiza Bônus Derivados (Agilidade -> Deslocamento, Vigor -> PV Máx, Percepção -> Percepção Passiva)
        const bonusList = [...(actor.system.parametersBonus ?? [])];

        // Agilidade -> Deslocamento (+1 a cada 2 pontos)
        const agiVal = Number(paramList.find(p => p.name === "agility")?.value) || 0;
        const agiBonus = Math.floor(agiVal / 2);
        let agiBonusEntry = bonusList.find(b => b.attr === "movement");
        if (agiBonus > 0) {
          if (agiBonusEntry) agiBonusEntry.bonus = agiBonus;
          else bonusList.push({ attr: "movement", bonus: agiBonus });
        } else {
          const idx = bonusList.findIndex(b => b.attr === "movement");
          if (idx !== -1) bonusList.splice(idx, 1);
        }

        // Vigor -> PV Máx (+1 para cada ponto)
        let vigBonusEntry = bonusList.find(b => b.attr === "health.max");
        if (vigorVal > 0) {
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
      }
    },
    rejectClose: false
  });
}

/**
 * Exibe caixa de diálogo DialogV2 para o Narrador criar um Pedido de Teste para os jogadores.
 * @returns {Promise<ChatMessage|null>}
 */
export async function promptRollRequestDialog() {
  const config = /** @type {any} */ (CONFIG).GAIA;

  // Monta lista de parâmetros
  const parameters = Object.entries(config?.parameters ?? {}).map(([key, labelKey]) => ({
    key,
    label: typeof labelKey === "string" ? game.i18n.localize(labelKey) : key
  }));

  // Monta lista de conhecimentos
  const knowledge = Object.entries(config?.knowledge ?? {}).map(([key, labelKey]) => ({
    key,
    label: typeof labelKey === "string" ? game.i18n.localize(labelKey) : key
  }));

  // Monta opções de Dificuldade baseadas no Enum GAIA.difficultyLevels
  const difficultyLevels = Object.values(config?.difficultyLevels ?? {}).map((levelObj) => ({
    dc: levelObj.max,
    label: game.i18n.localize(levelObj.label ?? levelObj.key),
    selected: levelObj.key === "normal"
  }));

  // Tipos de Rolagem (Aptidão)
  const rollTypes = Object.entries(config?.rollTypes ?? {}).map(([key, obj]) => ({
    key,
    label: typeof obj.label === "string" ? game.i18n.localize(obj.label) : key,
    selected: key === "standard"
  }));

  const content = await renderTemplate("systems/gaia-preludio/templates/dialog/roll-request-dialog.hbs", {
    parameters,
    knowledge,
    difficultyLevels,
    rollTypes
  });

  const dialogTitle = game.i18n.localize("GAIA.RollRequest.DialogTitle");
  const sendLabel = game.i18n.localize("GAIA.RollRequest.SendButton");
  const cancelLabel = game.i18n.localize("GAIA.RollRequest.CancelButton");

  const result = await DialogV2.wait({
    classes: ["gaia-preludio", "gaia-dialog", "roll-request-dialog"],
    window: { title: dialogTitle },
    position: { width: 440, height: "auto" },
    content,
    buttons: [
      {
        action: "send",
        label: sendLabel,
        icon: "fa-solid fa-paper-plane",
        default: true,
        callback: async (event, button, dialog) => {
          const form = dialog.element.querySelector("form") || dialog.element;
          const data = new FormDataExtended(form).object;

          const category = String(data.category || "parameters");
          const statKey = String(data.statKey || "precision");
          const customDC = Number(data.customDC);
          const dc = !isNaN(customDC) && customDC > 0 ? customDC : (Number(data.difficulty) || 9);
          const fitness = String(data.fitness || "standard");
          const note = String(data.note || "").trim();

          // Descobre o rótulo amigável do teste
          let statLabel = statKey;
          if (category === "parameters") {
            const raw = config?.parameters?.[statKey] ?? statKey;
            statLabel = typeof raw === "string" ? game.i18n.localize(raw) : String(raw);
          } else if (category === "knowledge") {
            const raw = config?.knowledge?.[statKey] ?? statKey;
            statLabel = typeof raw === "string" ? game.i18n.localize(raw) : String(raw);
          } else if (category === "defense") {
            statLabel = statKey === "agility" 
              ? game.i18n.localize("GAIA.RollRequest.EvasionAgility") 
              : game.i18n.localize("GAIA.RollRequest.BlockArmor");
          } else if (category === "destiny") {
            statLabel = game.i18n.localize("GAIA.RollRequest.CategoryDestiny");
          }

          const levelInfo = config?.getDifficultyLevel ? config.getDifficultyLevel(dc) : null;
          const levelLabel = levelInfo?.label ? game.i18n.localize(levelInfo.label) : `Dif. ${dc}`;

          const cardTitleText = game.i18n.localize("GAIA.RollRequest.CardTitle");
          const requestedCheckText = game.i18n.localize("GAIA.RollRequest.RequestedCheck");
          const difficultyLabelText = game.i18n.localize("GAIA.RollRequest.DifficultyLabel");
          const btnText = game.i18n.format("GAIA.RollRequest.RollButton", { label: statLabel, dc });
          const narratorAlias = game.i18n.localize("GAIA.RollRequest.NarratorAlias");

          // Monta o cartão do Chat
          const chatContent = `
            <div class="gaia-chat-card roll-request-card" style="border: 2px solid var(--color-border, #444); border-radius: 6px; padding: 10px; background: rgba(0,0,0,0.2);">
              <div style="font-weight: bold; font-size: 1.1em; color: var(--color-highlight, #e67e22); margin-bottom: 6px;">
                <i class="fa-solid fa-scroll"></i> ${cardTitleText}
              </div>
              <div style="font-size: 1.05em; margin-bottom: 4px;">
                <strong>${requestedCheckText}</strong> ${statLabel}
              </div>
              <div style="font-size: 0.95em; color: #aaa; margin-bottom: 8px;">
                <strong>${difficultyLabelText}</strong> Dif. ${dc} (${levelLabel})
              </div>
              ${note ? `<div style="font-style: italic; background: rgba(255,255,255,0.05); padding: 6px; border-radius: 4px; margin-bottom: 10px;">"${note}"</div>` : ''}
              <button type="button" class="gaia-btn-roll-request" 
                      data-action="rollRequest"
                      data-category="${category}"
                      data-stat-key="${statKey}"
                      data-dc="${dc}"
                      data-fitness="${fitness}"
                      data-label="${statLabel}"
                      style="width: 100%; padding: 8px; font-size: 1em; font-weight: bold; cursor: pointer;">
                ${btnText}
              </button>
            </div>
          `;

          return await ChatMessage.create({
            speaker: ChatMessage.getSpeaker({ alias: narratorAlias }),
            content: chatContent,
            style: CONST.CHAT_MESSAGE_STYLES?.OTHER ?? 0
          });
        }
      },
      {
        action: "cancel",
        label: cancelLabel,
        icon: "fa-solid fa-xmark",
        callback: () => null
      }
    ],
    rejectClose: false
  });

  return result;
}

/**
 * Registra os ouvintes de clique interativo para responder aos Pedidos de Teste no Chat.
 */
export function registerRollRequestListeners() {
  Hooks.on("renderChatMessageHTML", (message, html) => {
    const rootEl = html.jquery ? html[0] : html;
    
    // 1. Ouvinte para Pedidos de Teste do Narrador (rollRequest)
    const btn = rootEl.querySelector ? rootEl.querySelector("[data-action='rollRequest']") : null;
    if (btn) {
      btn.addEventListener("click", async (event) => {
        event.preventDefault();
        const dataset = btn.dataset;
        const category = dataset.category || "parameters";
        const statKey = dataset.statKey || "precision";
        const dc = Number(dataset.dc) || 9;
        const fitness = dataset.fitness || "standard";
        const statLabel = dataset.label || statKey;

        const { flowParameter, flowDifficultyCheck, flowDestinyCheck, defense } = await import("./flow.mjs");
        const { getStatEntry } = await import("./stat-rolls.mjs");

        // Resgata o ator do jogador
        const actor = game.user.character || canvas.tokens.controlled[0]?.actor;
        if (!actor) {
          ui.notifications.warn(game.i18n.localize("GAIA.RollRequest.WarnSelectActor"));
          return;
        }

        let roll = null;

        if (category === "destiny") {
          const result = await flowDestinyCheck(dc);
          roll = result.roll;
        } else if (category === "defense") {
          roll = await defense(statKey, actor, fitness);
        } else {
          const statEntry = getStatEntry(actor.system, category, statKey);
          roll = await flowParameter({ value: statEntry.value }, fitness);
        }

        // Valida o resultado contra a Dif. solicitada
        const check = flowDifficultyCheck(roll, dc);

        const statusColor = check.success ? "#27ae60" : "#c0392b";
        const outcomeTitle = game.i18n.format(
          check.success ? "GAIA.RollRequest.OutcomePassed" : "GAIA.RollRequest.OutcomeFailed",
          { name: actor.name, label: statLabel }
        );
        const resultLabelText = game.i18n.localize("GAIA.RollRequest.ResultLabel");
        const marginLabelText = game.i18n.localize("GAIA.RollRequest.MarginLabel");

        const outcomeHtml = `
          <div class="gaia-chat-card" style="border-left: 4px solid ${statusColor}; padding: 8px; background: rgba(0,0,0,0.15); margin-top: 4px;">
            <div style="font-weight: bold; font-size: 1.05em; color: ${statusColor};">
              ${outcomeTitle}
            </div>
            <div style="font-size: 0.9em; margin-top: 4px;">
              <strong>${resultLabelText}</strong> ${check.total} vs <strong>Dif. ${dc}</strong> (${marginLabelText} ${check.margin >= 0 ? '+' : ''}${check.margin})
            </div>
          </div>
        `;

        await roll.toMessage({
          speaker: ChatMessage.getSpeaker({ actor }),
          flavor: outcomeHtml
        });
      });
    }

    // 2. Ouvinte para Botões de Rolagem de Defesa do Alvo de Ataques (rollTargetDefense)
    const defenseBtns = rootEl.querySelectorAll ? rootEl.querySelectorAll("[data-action='rollTargetDefense']") : [];
    defenseBtns.forEach(defBtn => {
      defBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        const defenseType = defBtn.dataset.defenseType || "agility";
        const targetTokenId = defBtn.dataset.targetTokenId;
        const targetActorId = defBtn.dataset.targetActorId;

        // Resgata o total do ataque a partir do dataset do botão ou das rolagens da mensagem
        let attackTotal = Number(defBtn.dataset.attackTotal);
        if (isNaN(attackTotal) || attackTotal <= 0) {
          attackTotal = message.rolls?.[0]?.total ?? null;
        }

        // Procura o Ator do Alvo:
        // 1. Pelo Token ID na cena ativa
        // 2. Pelo Actor ID no game.actors
        // 3. Fallback: pelo token atualmente selecionado/mirado pelo jogador que clicou
        let targetActor = null;
        if (targetTokenId && canvas?.tokens) {
          const token = canvas.tokens.get(targetTokenId);
          if (token?.actor) targetActor = token.actor;
        }
        if (!targetActor && targetActorId) {
          targetActor = game.actors.get(targetActorId);
        }
        if (!targetActor) {
          const { getSelectedOrTargetToken } = await import("./token-helper.mjs");
          const token = getSelectedOrTargetToken(null, { notify: true, warnMessage: "Selecione ou mire em um token alvo para rolar a defesa." });
          targetActor = token?.actor ?? null;
        }

        if (!targetActor) return;

        // Dispara a rolagem de defesa (Esquiva/Agilidade ou Bloqueio) para o Ator Alvo
        const { rollStat } = await import("./stat-rolls.mjs");
        const defenseRoll = await rollStat(targetActor, {
          event,
          type: "defense",
          key: defenseType,
          categoryLabel: defenseType === "agility" ? "Defesa (Esquiva / Agilidade)" : "Defesa (Bloqueio)"
        });

        // Se a defesa foi rolada e temos o total do ataque, valida Acerto, Erro, Empate ou Crítico
        if (defenseRoll && attackTotal !== null && !isNaN(attackTotal)) {
          const { isCriticalHit } = await import("./flow.mjs");
          const critResult = isCriticalHit(attackTotal, defenseRoll);

          let outcomeStatus = "";

          switch (true) {
            case critResult.isCritical:
              outcomeStatus = "Crítico";
              break;
            case critResult.isHit:
              outcomeStatus = "Acerto";
              break;
            case critResult.difference === 0:
              outcomeStatus = "Empate";
              break;
            default:
              outcomeStatus = "Errou";
              break;
          }

          const diffSign = critResult.difference > 0 ? "+" : "";
          const outcomeHtml = `
            <div class="gaia-chat-card outcome-card" style="padding: 8px; background: rgba(0,0,0,0.15); margin-top: 6px;">
              <div style="font-weight: bold; font-size: 1.5em; display: flex; align-items: center; gap: 6px; color: var(--gaia-purple-dark);">
                ${outcomeStatus}
              </div>
              <div style="font-size: 1.2em; margin-top: 6px; color: var(--gaia-text-parchment);">
                <div style="display: flex; align-items: center; gap: 6px;">
                  <strong>Ataque:</strong> ${critResult.attackTotal} vs <strong>Defesa:</strong> ${critResult.defenseTotal}
                </div>
                <div style="display: flex; align-items: center; gap: 6px; font-weight: bold;">(Diferença: ${diffSign}${critResult.difference})</div>
              </div>
            </div>
          `;

          await ChatMessage.create({
            speaker: ChatMessage.getSpeaker({ actor: targetActor }),
            content: outcomeHtml,
            style: CONST.CHAT_MESSAGE_STYLES?.OTHER ?? 0
          });
        }
      });
    });
  });
}

/**
 * Exibe um pequeno diálogo interativo para um item com 2 opções: "Enviar no Chat" e "Rolar Ataque".
 * @param {Actor} actor - Documento do Ator
 * @param {Item} item - Documento do Item
 * @param {object} [options={}] - Opções adicionais (event, target)
 * @returns {Promise<any>}
 */
export async function promptItemActionDialog(actor, item, { event, target } = {}) {
  if (!actor || !item) return null;

  const isWeapon = item.type === "weapon" || item.system?.category === "weapon" || Boolean(item.system?.attackParameter);

  const buttons = [
    {
      action: "sendChat",
      label: "Enviar no Chat",
      icon: "fa-solid fa-comment",
      callback: () => "sendChat"
    }
  ];

  if (isWeapon) {
    buttons.push({
      action: "rollAttack",
      label: "Rolar Ataque",
      icon: "fa-solid fa-dice-d20",
      default: true,
      callback: () => "rollAttack"
    });
  }

  const result = await DialogV2.wait({
    classes: ["gaia-preludio", "gaia-dialog", "item-action-dialog"],
    window: { title: item.name },
    position: { width: 340, height: "auto" },
    content: `
      <div style="text-align: center; padding: 10px 4px; font-weight: 500; font-size: 0.95rem; color: var(--gaia-text-parchment);">
        Escolha a ação para <strong>${item.name}</strong>:
      </div>
    `,
    buttons,
    rejectClose: false
  });

  if (result === "sendChat") {
    return await item.roll?.() ?? null;
  } 
  
  if (result === "rollAttack") {
    const { rollWeaponAttack } = await import("./stat-rolls.mjs");
    return await rollWeaponAttack(actor, item, { event, target });
  }

  return null;
}

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
      const typeSelect = html.querySelector(".wizard-select-type");

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
        if (valFeaturesCount) valFeaturesCount.textContent = stats.features;
        if (summaryName) summaryName.textContent = name;
        if (summaryLevel) summaryLevel.textContent = `Nível ${level}`;
        if (summaryDifficulty) summaryDifficulty.textContent = difficulty;
        if (summarySize) summarySize.textContent = size;
        if (summaryHp) summaryHp.textContent = stats.health;
        if (summaryPe) summaryPe.textContent = stats.energy;
        if (summaryPower) summaryPower.textContent = stats.powerPoints;
        if (summaryOff) summaryOff.textContent = currentOff;
        if (summaryDef) summaryDef.textContent = currentDef;
        if (summaryFeatures) summaryFeatures.textContent = stats.features;
      };

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

        if (actor) {
          await actor.update(updateData);
          ui.notifications.info(`Ficha da criatura "${name}" configurada com sucesso!`);
          return actor;
        } else {
          const [newActor] = await Actor.createDocuments([{
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
          newActor?.sheet?.render(true);
          ui.notifications.info(`Criatura "${name}" criada com sucesso!`);
          return newActor;
        }
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

  const content = await renderTemplate("systems/gaia-preludio/templates/dialog/legacy-npc-wizard-dialog.hbs", {
    initialData,
    hasActor: !!actor
  });

  let selectedKnowledge = initialData.knowledge ? JSON.parse(JSON.stringify(initialData.knowledge)) : [];

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
        if (valAbilitiesMax) valAbilitiesMax.textContent = stats.maxAbilities;
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
        if (summaryAbilities) summaryAbilities.textContent = `Até ${stats.maxAbilities}`;
      };

      // Listeners de Eventos
      diffSelect?.addEventListener("change", updateCalculations);
      partyLevelInput?.addEventListener("input", updateCalculations);
      nameInput?.addEventListener("input", updateCalculations);
      legacyInput?.addEventListener("input", updateCalculations);

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

        if (actor) {
          await actor.update(updateData);
          ui.notifications.info(`Ficha de Legado NPC "${name}" configurada com sucesso!`);
          return actor;
        } else {
          const [newActor] = await Actor.createDocuments([{
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
          newActor?.sheet?.render(true);
          ui.notifications.info(`Legado NPC "${name}" criado com sucesso!`);
          return newActor;
        }
      }
    },
    rejectClose: false
  });
}

/**
 * Exibe caixa de diálogo para distribuir/selecionar pontos de Conhecimentos (perícias).
 * @param {number} totalPoints - Total de pontos disponíveis para distribuição
 * @param {Array<{name: string, value: number}>} [currentKnowledge=[]] - Lista atual de conhecimentos já distribuídos
 * @returns {Promise<Array<{name: string, value: number}> | null>}
 */
export async function promptKnowledgeSelectionDialog(totalPoints = 0, currentKnowledge = []) {
  const knowledgesConfig = CONFIG.GAIA?.knowledge ?? {};

  const allocatedMap = {};
  for (const k of (currentKnowledge || [])) {
    if (k?.name) allocatedMap[k.name] = Number(k.value) || 0;
  }

  const items = Object.entries(knowledgesConfig).map(([key, locKey]) => {
    const label = typeof locKey === "string" ? game.i18n.localize(locKey) : key;
    const value = allocatedMap[key] || 0;
    return { key, label, value };
  });

  let totalAllocated = items.reduce((sum, item) => sum + item.value, 0);

  const rowsHtml = items.map(item => `
    <div class="knowledge-alloc-row" data-key="${item.key}">
      <span class="knowledge-label">${item.label}</span>
      <div class="knowledge-counter-controls">
        <button type="button" class="btn-know-minus" data-key="${item.key}"><i class="fa-solid fa-minus"></i></button>
        <input type="number" class="know-val-input" data-key="${item.key}" value="${item.value}" min="0" readonly />
        <button type="button" class="btn-know-plus" data-key="${item.key}"><i class="fa-solid fa-plus"></i></button>
      </div>
    </div>
  `).join("");

  const content = `
    <div class="gaia-knowledge-selection-dialog">
      <div class="knowledge-pool-header">
        <span class="pool-title"><i class="fa-solid fa-brain"></i> Selecionar Conhecimentos</span>
        <div class="pool-badge">
          Pontos: <strong class="know-pool-remaining">${totalPoints - totalAllocated}</strong> / <span class="know-pool-total">${totalPoints}</span>
        </div>
      </div>
      <div class="knowledge-grid">
        ${rowsHtml}
      </div>
    </div>
  `;

  return await DialogV2.prompt({
    classes: ["gaia-preludio", "gaia-dialog", "gaia-dialog-knowledge-selection"],
    window: { title: "Selecionar Conhecimentos" },
    content,
    position: { width: 500, height: "auto" },
    render: (event, dialog) => {
      const html = dialog.element;
      const poolRemainingEl = html.querySelector(".know-pool-remaining");
      const rows = html.querySelectorAll(".knowledge-alloc-row");

      const updateUI = () => {
        let currentTotalUsed = 0;
        rows.forEach(row => {
          const input = row.querySelector(".know-val-input");
          currentTotalUsed += Number(input.value) || 0;
        });

        const rem = totalPoints - currentTotalUsed;
        if (poolRemainingEl) poolRemainingEl.textContent = rem;

        rows.forEach(row => {
          const input = row.querySelector(".know-val-input");
          const val = Number(input.value) || 0;
          const btnMinus = row.querySelector(".btn-know-minus");
          const btnPlus = row.querySelector(".btn-know-plus");

          if (btnMinus) btnMinus.disabled = val <= 0;
          if (btnPlus) btnPlus.disabled = rem <= 0;
        });
      };

      rows.forEach(row => {
        const input = row.querySelector(".know-val-input");
        const btnMinus = row.querySelector(".btn-know-minus");
        const btnPlus = row.querySelector(".btn-know-plus");

        btnMinus?.addEventListener("click", () => {
          let val = Number(input.value) || 0;
          if (val > 0) {
            input.value = val - 1;
            updateUI();
          }
        });

        btnPlus?.addEventListener("click", () => {
          let val = Number(input.value) || 0;
          let currentTotalUsed = 0;
          rows.forEach(r => { currentTotalUsed += Number(r.querySelector(".know-val-input").value) || 0; });
          if (totalPoints - currentTotalUsed > 0) {
            input.value = val + 1;
            updateUI();
          }
        });
      });

      updateUI();
    },
    ok: {
      label: "Salvar Conhecimentos",
      icon: "fa-solid fa-check",
      callback: (event, button, dialog) => {
        const html = dialog.element;
        const result = [];
        const rows = html.querySelectorAll(".knowledge-alloc-row");
        rows.forEach(row => {
          const key = row.dataset.key;
          const val = Number(row.querySelector(".know-val-input").value) || 0;
          if (val > 0) {
            result.push({ name: key, value: val });
          }
        });
        return result;
      }
    },
    rejectClose: false
  });
}

/**
 * Abre caixa de diálogo para criar ou editar uma Habilidade de Legado.
 * @param {object} [initialData={}] - Dados iniciais da habilidade (name, description, activeEffectText)
 * @returns {Promise<{name: string, description: string, activeEffectText: string} | null>}
 */
export async function promptLegacyAbilityDialog(initialData = {}) {
  const name = initialData.name || "";
  const description = initialData.description || "";
  let activeEffectText = initialData.activeEffectText || "";
  if (!activeEffectText && initialData.activeEffect) {
    activeEffectText = typeof initialData.activeEffect === "string" 
      ? initialData.activeEffect 
      : (initialData.activeEffect.text || "");
  }

  let currentActiveEffect = typeof initialData.activeEffect === "object" && initialData.activeEffect
    ? foundry.utils.deepClone(initialData.activeEffect)
    : { text: activeEffectText };

  const dialogHtml = await renderTemplate("systems/gaia-preludio/templates/dialog/legacy-ability-dialog.hbs", {
    name,
    description,
    activeEffectText
  });

  const title = initialData.name ? `Editar: ${initialData.name}` : "Nova Habilidade de Legado";

  const result = await DialogV2.wait({
    classes: ["gaia-preludio", "gaia-dialog", "legacy-ability-dialog"],
    window: { title },
    position: { width: 600, height: "auto" },
    content: dialogHtml,
    render: (event, dialog) => {
      const html = dialog.element;
      const btnConfig = html.querySelector("[data-action='configActiveEffect']");
      btnConfig?.addEventListener("click", async (ev) => {
        ev.preventDefault();
        const inputEl = html.querySelector("input[name='activeEffectText']");
        const previewEl = html.querySelector(".active-effect-preview-text");
        const currentText = inputEl?.value || "";
        const effectResult = await promptActiveEffectDialog({
          ...currentActiveEffect,
          text: currentText
        });
        if (effectResult) {
          currentActiveEffect = effectResult;
          const textVal = effectResult.text || "";
          if (inputEl) inputEl.value = textVal;
          if (previewEl) previewEl.textContent = textVal || (/** @type {any} */ (globalThis.game)?.i18n?.localize("GAIA.Legado.EmptyActiveEffectHint") || "Nenhum efeito ativo configurado.");
        }
      });
    },
    buttons: [
      {
        action: "save",
        label: "Salvar",
        icon: "fa-solid fa-floppy-disk",
        default: true,
        callback: (event, button, dialog) => {
          const form = dialog.element.querySelector("form");
          const data = new FormDataExtended(form).object;
          const textValue = String(data.activeEffectText || "").trim();
          return {
            name: String(data.name || "").trim() || "Nova Habilidade de Legado",
            description: String(data.description || "").trim(),
            activeEffectText: textValue,
            activeEffect: {
              ...currentActiveEffect,
              text: textValue
            }
          };
        }
      },
      {
        action: "cancel",
        label: "Cancelar",
        icon: "fa-solid fa-xmark",
        callback: () => null
      }
    ],
    rejectClose: false
  });

  if (result === "cancel" || !result) return null;
  return result;
}

/**
 * Abre caixa de diálogo para criar ou configurar a estrutura de um Efeito Ativo (activeEffect).
 * @param {object} [initialData={}] - Dados iniciais do Efeito Ativo
 * @returns {Promise<object | null>} Objeto de configuração do activeEffect
 */
export async function promptActiveEffectDialog(initialData = {}) {
  const text = typeof initialData === "string" ? initialData : (initialData.text || "");
  const recharge = initialData.recharge || "full_rest";
  const triggerEvent = initialData.trigger?.event || "hp_threshold";
  const inCombatOnly = initialData.trigger?.inCombatOnly ?? true;
  const hpThresholdPercentage = initialData.trigger?.hpThresholdPercentage ?? 50;
  
  const firstChange = Array.isArray(initialData.changes) && initialData.changes[0] ? initialData.changes[0] : {};
  const changeKey = firstChange.key || "all_parameters";
  const changeValue = Number(firstChange.value ?? 1);
  
  const durationType = initialData.duration?.type || "end_of_combat";

  const dialogHtml = await renderTemplate("systems/gaia-preludio/templates/dialog/active-effect-dialog.hbs", {
    text,
    recharge,
    triggerEvent,
    inCombatOnly,
    hpThresholdPercentage,
    changeKey,
    changeValue,
    durationType
  });

  const result = await DialogV2.wait({
    classes: ["gaia-preludio", "gaia-dialog", "active-effect-dialog"],
    window: { title: "Configurar Efeito Ativo" },
    position: { width: 460, height: "auto" },
    content: dialogHtml,
    buttons: [
      {
        action: "save",
        label: "Salvar Efeito",
        icon: "fa-solid fa-floppy-disk",
        default: true,
        callback: (event, button, dialog) => {
          const form = dialog.element.querySelector("form");
          const data = new FormDataExtended(form).object;
          return {
            text: String(data.text || "").trim(),
            used: Boolean(initialData.used ?? false),
            recharge: String(data.recharge || "full_rest"),
            trigger: {
              event: String(data.triggerEvent || "hp_threshold"),
              inCombatOnly: Boolean(data.inCombatOnly),
              hpThresholdPercentage: Number(data.hpThresholdPercentage || 50)
            },
            changes: [
              {
                key: String(data.changeKey || "all_parameters"),
                mode: "ADD",
                value: Number(data.changeValue ?? 1),
                allowExceedMax: true
              }
            ],
            duration: {
              type: String(data.durationType || "end_of_combat")
            }
          };
        }
      },
      {
        action: "cancel",
        label: "Cancelar",
        icon: "fa-solid fa-xmark",
        callback: () => null
      }
    ],
    rejectClose: false
  });

  if (result === "cancel" || !result) return null;
  return result;
}

/**
 * Exibe modal DialogV2 para criação ou edição de uma Sub-Habilidade.
 * @param {object} [subEffectData] - Dados atuais da sub-habilidade para edição
 * @returns {Promise<object|null>}
 */
export async function promptSubEffectDialog(subEffectData = {}) {
  const actionTypeOptions = Object.entries(CONFIG.GAIA?.actionType ?? {}).map(([key, labelKey]) => ({
    key,
    label: game.i18n.localize(labelKey),
    selected: subEffectData.typeAction === key
  }));

  const abilityTypeOptions = Object.entries(CONFIG.GAIA?.abilitiesTypes ?? {}).map(([key, labelKey]) => ({
    key,
    label: game.i18n.localize(labelKey),
    selected: subEffectData.type === key
  }));

  const title = subEffectData.name ? `Editar Sub-Habilidade: ${subEffectData.name}` : "Nova Sub-Habilidade";

  const dialogHtml = await renderTemplate("systems/gaia-preludio/templates/dialog/subeffect-dialog.hbs", {
    subEffect: subEffectData,
    actionTypeOptions,
    abilityTypeOptions
  });

  const result = await DialogV2.wait({
    classes: ["gaia-preludio", "gaia-dialog", "subeffect-dialog"],
    window: { title },
    position: { width: 800, height: "auto" },
    content: dialogHtml,
    buttons: [
      {
        action: "confirm",
        label: subEffectData.name ? "Salvar" : "Adicionar",
        icon: "fa-solid fa-check",
        default: true,
        callback: (event, button, dialog) => {
          const form = dialog.element.querySelector("form");
          const data = new FormDataExtended(form).object;
          return {
            name: String(data.name || "Nova Sub-Habilidade").trim(),
            typeAction: String(data.typeAction || ""),
            type: String(data.type || ""),
            cost: String(data.cost || "").trim(),
            description: String(data.description || "").trim(),
            note: String(data.note || "").trim()
          };
        }
      },
      {
        action: "cancel",
        label: "Cancelar",
        icon: "fa-solid fa-xmark",
        callback: () => null
      }
    ],
    rejectClose: false
  });

  if (result === "cancel" || !result) return null;
  return result;
}



