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
          const selectedKey = String(data.damageType || "physical");
          const resolvedType = custom.length > 0 ? custom : selectedKey;
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
            <div class="gaia-chat-card roll-request-card">
              <div class="roll-request-header">
                <i class="fa-solid fa-scroll"></i> ${cardTitleText}
              </div>
              <div class="roll-request-stat">
                <strong>${requestedCheckText}</strong> ${statLabel}
              </div>
              <div class="roll-request-dc">
                <strong>${difficultyLabelText}</strong> Dif. ${dc} (${levelLabel})
              </div>
              ${note ? `<div class="roll-request-note">"${note}"</div>` : ''}
              <button type="button" class="gaia-btn-roll-request" 
                      data-action="rollRequest"
                      data-category="${category}"
                      data-stat-key="${statKey}"
                      data-dc="${dc}"
                      data-fitness="${fitness}"
                      data-label="${statLabel}">
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

        const outcomeClass = check.success ? "outcome-success" : "outcome-failure";
        const outcomeTitle = game.i18n.format(
          check.success ? "GAIA.RollRequest.OutcomePassed" : "GAIA.RollRequest.OutcomeFailed",
          { name: actor.name, label: statLabel }
        );
        const resultLabelText = game.i18n.localize("GAIA.RollRequest.ResultLabel");
        const marginLabelText = game.i18n.localize("GAIA.RollRequest.MarginLabel");

        const outcomeHtml = `
          <div class="gaia-outcome-card ${outcomeClass}">
            <div class="outcome-title">${outcomeTitle}</div>
            <div class="outcome-details">
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

        // Resgata o dano configurado a partir do dataset do botão de defesa
        let damageAmount = Number(defBtn.dataset.damageAmount);
        let damageText = defBtn.dataset.damageText || "";
        let damageType = defBtn.dataset.damageType || "";
        if (isNaN(damageAmount) || damageAmount <= 0) {
          const match = damageText.match(/(\d+)/);
          if (match) damageAmount = parseInt(match[1], 10);
        }

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

          let applyDamageBtnHtml = "";
          if (critResult.isHit || critResult.isCritical) {
            const damageDisplay = damageText ? ` (${damageText})` : (damageAmount > 0 ? ` (${damageAmount})` : "");
            applyDamageBtnHtml = `
              <div style="margin-top: 8px; display: flex; justify-content: center;">
                <button type="button" class="gaia-btn-apply-damage" 
                        data-action="applyTargetDamage" 
                        data-damage-amount="${damageAmount || ''}" 
                        data-damage-text="${damageText}" 
                        data-damage-type="${damageType}" 
                        data-target-token-id="${targetTokenId}" 
                        data-target-actor-id="${targetActorId || targetActor?.id}">
                  Aplicar Dano${damageDisplay}
                </button>
              </div>
            `;
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
              ${applyDamageBtnHtml}
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

    // 3. Ouvinte para Botão de Aplicar Dano no Alvo (applyTargetDamage)
    const applyDamageBtns = rootEl.querySelectorAll ? rootEl.querySelectorAll("[data-action='applyTargetDamage']") : [];
    applyDamageBtns.forEach(applyBtn => {
      applyBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        const targetTokenId = applyBtn.dataset.targetTokenId;
        const targetActorId = applyBtn.dataset.targetActorId;
        let amount = Number(applyBtn.dataset.damageAmount);
        const damageText = applyBtn.dataset.damageText || "";
        let damageType = applyBtn.dataset.damageType || "";

        if (isNaN(amount) || amount <= 0) {
          const match = damageText.match(/(\d+)/);
          if (match) amount = parseInt(match[1], 10);
        }

        // Se ainda não temos um valor de dano definido, pergunta ao usuário
        if (isNaN(amount) || amount <= 0) {
          const promptVal = window.prompt("Quantidade de dano a aplicar:", "1");
          if (!promptVal) return;
          amount = Number(promptVal) || 0;
        }

        if (amount <= 0) return;

        if (!damageType && damageText) {
          const typeMatch = damageText.replace(/^\d+\s*/, "").trim();
          if (typeMatch) damageType = typeMatch;
        }

        // Procura o Ator do Alvo:
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
          const token = getSelectedOrTargetToken(null, { notify: true, warnMessage: "Selecione ou mire em um token alvo para aplicar o dano." });
          targetActor = token?.actor ?? null;
        }

        if (!targetActor) {
          ui.notifications.warn("Nenhum alvo selecionado ou mirado para aplicar dano.");
          return;
        }

        // Calcula o dano final considerando Imunidade, Resistência, Vulnerabilidade e Redução de Dano
        const { calculateDamage } = await import("./flow.mjs");
        const finalDamage = calculateDamage({ type: damageType, value: amount }, targetActor);

        if (finalDamage === 0) {
          ui.notifications.info(`${targetActor.name} é imune a dano ${damageType || ''} (0 de dano recebido).`);
          applyBtn.disabled = true;
          applyBtn.innerHTML = "Imune (0 Dano)";

          const immuneCardHtml = `
            <div class="gaia-chat-card damage-applied-card immune">
              <div class="damage-applied-header">
                <div class="damage-applied-title">
                  <i class="fa-solid fa-shield"></i> Dano Anulado (Imunidade)
                </div>
                <span class="damage-applied-badge">
                  ${damageType ? damageType.toUpperCase() : 'IMUNE'}
                </span>
              </div>
              <div class="damage-applied-target">
                ${targetActor.img ? `<img src="${targetActor.img}" class="damage-target-avatar" />` : ''}
                <div class="damage-target-info">
                  <div class="damage-target-name">${targetActor.name}</div>
                  <div class="damage-target-amount">
                    É imune a dano <strong>${damageType || ''}</strong> (0 de dano sofrido).
                  </div>
                </div>
              </div>
            </div>
          `;

          await ChatMessage.create({
            speaker: ChatMessage.getSpeaker({ actor: targetActor }),
            content: immuneCardHtml,
            style: CONST.CHAT_MESSAGE_STYLES?.OTHER ?? 0
          });
          return;
        }

        const { applyActionDamage } = await import("./action-flow.mjs");
        await applyActionDamage(targetActor, finalDamage, { damageType, baseDamage: amount });

        applyBtn.disabled = true;
        applyBtn.innerHTML = `Dano Aplicado (${finalDamage})`;
      });
    });

    // 4. Ouvinte para Ações Estruturadas (ActionDataModel)
    import("./action-flow.mjs").then(({ registerActionChatListeners }) => {
      registerActionChatListeners(rootEl, message);
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
  
  // Resgata ações estruturadas (ActionDataModel) do item
  const actions = [];
  if (Array.isArray(item.system?.actions)) {
    actions.push(...item.system.actions);
  }
  if (item.system?.action && typeof item.system.action === "object" && (item.system.action.name || item.system.action.attack?.hasAttack || item.system.action.damage?.hasDamage)) {
    actions.push(item.system.action);
  }
  if (Array.isArray(item.system?.legacyAbilities)) {
    for (const la of item.system.legacyAbilities) {
      if (la.action && (la.action.name || la.action.attack?.hasAttack || la.action.damage?.hasDamage)) {
        actions.push(la.action);
      }
    }
  }

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
      default: actions.length === 0,
      callback: () => "rollAttack"
    });
  }

  // Adiciona botões dinâmicos para cada Ação configurada
  actions.forEach((act, idx) => {
    const actName = act.name || `Ação ${idx + 1}`;
    const costText = act.cost ? ` (${act.cost})` : "";
    buttons.push({
      action: `action_${idx}`,
      label: `${actName}${costText}`,
      default: idx === 0 && !isWeapon,
      callback: () => `action_${idx}`
    });
  });

  const result = await DialogV2.wait({
    classes: ["gaia-preludio", "gaia-dialog", "item-action-dialog"],
    window: { title: item.name },
    position: { width: Math.max(340, 160 * Math.min(buttons.length, 3)), height: "auto" },
    content: `
      <div style="text-align: center; padding: 10px 4px; font-weight: 500; font-size: 0.95rem; color: var(--gaia-text-parchment);">
        Escolha a ação para <strong>${item.name}</strong>:
      </div>
    `,
    buttons,
    rejectClose: false
  });

  if (!result) return null;

  if (result === "sendChat") {
    return await item.roll?.() ?? null;
  } 
  
  if (result === "rollAttack") {
    const { rollWeaponAttack } = await import("./stat-rolls.mjs");
    return await rollWeaponAttack(actor, item, { event, target });
  }

  if (typeof result === "string" && result.startsWith("action_")) {
    const idx = parseInt(result.replace("action_", ""), 10);
    const act = actions[idx];
    if (act) {
      return await item.rollAction(act, { event, target });
    }
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

  let currentActions = Array.isArray(initialData.actions) ? foundry.utils.deepClone(initialData.actions) : [];

  const config = /** @type {any} */ (CONFIG).GAIA;

  function getFormattedActions() {
    return currentActions.map((act, index) => {
      const summaries = [];
      if (act.attack?.hasAttack) {
        const paramKey = act.attack.attribute || "brutality";
        const paramLabel = config?.parameters?.[paramKey] ? game.i18n.localize(config.parameters[paramKey]) : paramKey;
        summaries.push(`Ataque: ${paramLabel}`);
      }
      if (act.damage?.hasDamage && act.damage.formula) {
        summaries.push(`Dano: ${act.damage.formula}`);
      }
      if (act.check?.hasCheck) {
        summaries.push(`Dif. ${act.check.difficulty ?? 10}`);
      }
      return {
        ...act,
        index,
        summary: summaries.join(" | ")
      };
    });
  }

  const dialogHtml = await renderTemplate("systems/gaia-preludio/templates/dialog/legacy-ability-dialog.hbs", {
    name,
    description,
    activeEffectText,
    formattedActions: getFormattedActions()
  });

  const title = initialData.name ? `Editar: ${initialData.name}` : "Nova Habilidade de Legado";

  const result = await DialogV2.wait({
    classes: ["gaia-preludio", "gaia-dialog", "legacy-ability-dialog"],
    window: { title },
    position: { width: 600, height: "auto" },
    content: dialogHtml,
    render: (event, dialog) => {
      const html = dialog.element;

      const refreshActionsList = () => {
        const container = html.querySelector(".legacy-actions-preview-list");
        if (!container) return;
        const actions = getFormattedActions();
        if (actions.length === 0) {
          container.innerHTML = `<div class="empty-hint" style="font-size: 11px; font-style: italic; color: var(--gaia-text-muted);">${game.i18n.localize("GAIA.Action.EmptyActionsHint")}</div>`;
          return;
        }
        container.innerHTML = actions.map(a => `
          <div class="legacy-action-preview-item" style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.25); padding: 4px 8px; border-radius: 3px; font-size: 12px;">
            <span><strong>${a.name}</strong> ${a.summary ? `<small style="color: #aaa;">(${a.summary})</small>` : ""}</span>
            <div style="display: flex; gap: 4px;">
              <button type="button" class="btn-edit-dialog-action" data-index="${a.index}" style="background: transparent; border: none; cursor: pointer; color: var(--gaia-text-parchment);"><i class="fa-solid fa-pen-to-square"></i></button>
              <button type="button" class="btn-remove-dialog-action" data-index="${a.index}" style="background: transparent; border: none; cursor: pointer; color: var(--gaia-text-parchment);"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
        `).join("");
        bindActionButtons();
      };

      const bindActionButtons = () => {
        html.querySelectorAll(".btn-edit-dialog-action").forEach(btn => {
          btn.addEventListener("click", async (ev) => {
            ev.preventDefault();
            const idx = Number(btn.dataset.index);
            if (isNaN(idx) || !currentActions[idx]) return;
            const res = await promptActionDialog(currentActions[idx]);
            if (res) {
              currentActions[idx] = res;
              refreshActionsList();
            }
          });
        });
        html.querySelectorAll(".btn-remove-dialog-action").forEach(btn => {
          btn.addEventListener("click", (ev) => {
            ev.preventDefault();
            const idx = Number(btn.dataset.index);
            if (isNaN(idx)) return;
            currentActions.splice(idx, 1);
            refreshActionsList();
          });
        });
      };

      const btnAddAction = html.querySelector("[data-action='addLegacyAction']");
      btnAddAction?.addEventListener("click", async (ev) => {
        ev.preventDefault();
        const actionResult = await promptActionDialog();
        if (actionResult) {
          currentActions.push(actionResult);
          refreshActionsList();
        }
      });

      bindActionButtons();
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
            actions: currentActions,
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

/**
 * Exibe modal DialogV2 para criação ou edição de uma Ação (ActionDataModel).
 * @param {object} [actionData] - Dados da ação para edição (ou vazio para nova ação)
 * @returns {Promise<object|null>} Objeto de Ação formatado ou null se cancelado
 */
export async function promptActionDialog(actionData = {}) {
  const defaultAction = {
    id: actionData.id || foundry.utils.randomID(),
    name: actionData.name || "",
    description: actionData.description || "",
    cost: actionData.cost || "",
    type: {
      actionType: actionData.type?.actionType || "acaoAtiva",
      category: actionData.type?.category || "ataque_corpo_a_corpo",
      tags: Array.isArray(actionData.type?.tags) ? actionData.type.tags : []
    },
    attack: {
      hasAttack: Boolean(actionData.attack?.hasAttack),
      attribute: actionData.attack?.attribute || "brutality",
      knowledge: actionData.attack?.knowledge || "",
      bonus: actionData.attack?.bonus || "",
      rollType: actionData.attack?.rollType || "standard"
    },
    damage: {
      hasDamage: Boolean(actionData.damage?.hasDamage),
      formula: actionData.damage?.formula || "",
      type: actionData.damage?.type || "physical",
      criticalBonus: actionData.damage?.criticalBonus || "",
      scaling: actionData.damage?.scaling || ""
    },
    check: {
      hasCheck: Boolean(actionData.check?.hasCheck),
      category: actionData.check?.category || "parameter",
      attribute: actionData.check?.attribute || "vigor",
      difficulty: Number(actionData.check?.difficulty ?? 10),
      onSuccess: actionData.check?.onSuccess || "",
      onFailure: actionData.check?.onFailure || ""
    },
    condition: {
      hasCondition: Boolean(actionData.condition?.hasCondition),
      status: actionData.condition?.status || "",
      duration: actionData.condition?.duration || "",
      description: actionData.condition?.description || ""
    },
    areaOfEffect: {
      hasArea: Boolean(actionData.areaOfEffect?.hasArea),
      shape: actionData.areaOfEffect?.shape || "circle",
      size: Number(actionData.areaOfEffect?.size ?? 3),
      unit: actionData.areaOfEffect?.unit || "m",
      targetDisposition: actionData.areaOfEffect?.targetDisposition || "all",
      targetLimit: actionData.areaOfEffect?.targetLimit || ""
    }
  };

  const actionTypeOptions = Object.entries(CONFIG.GAIA?.actionType ?? {}).map(([key, labelKey]) => ({
    key,
    label: game.i18n.localize(labelKey),
    selected: defaultAction.type.actionType === key
  }));

  const abilityTypeOptions = Object.entries(CONFIG.GAIA?.abilitiesTypes ?? {}).map(([key, labelKey]) => ({
    key,
    label: game.i18n.localize(labelKey),
    selected: defaultAction.type.category === key
  }));

  const parameterOptions = Object.entries(CONFIG.GAIA?.parameters ?? {}).map(([key, labelKey]) => ({
    key,
    label: game.i18n.localize(labelKey),
    selectedAttack: defaultAction.attack.attribute === key,
    selectedCheck: defaultAction.check.attribute === key
  }));

  const knowledgeOptions = Object.entries(CONFIG.GAIA?.knowledge ?? {}).map(([key, labelKey]) => ({
    key,
    label: game.i18n.localize(labelKey),
    selectedAttack: defaultAction.attack.knowledge === key,
    selectedCheck: defaultAction.check.attribute === key
  }));

  const rollTypeOptions = Object.entries(CONFIG.GAIA?.rollTypes ?? {}).map(([key, data]) => ({
    key,
    label: game.i18n.localize(data.label),
    selected: defaultAction.attack.rollType === key
  }));

  const damageTypeOptions = Object.entries(CONFIG.GAIA?.damageTypesFlat ?? {}).map(([key, labelKey]) => ({
    key,
    label: game.i18n.localize(labelKey),
    selected: defaultAction.damage.type === key
  }));

  const conditionOptions = Object.values(CONFIG.GAIA?.conditions ?? {}).map(c => ({
    id: c.id,
    name: typeof c.name === "string" ? game.i18n.localize(c.name) : String(c.id)
  }));

  const title = defaultAction.name
    ? `${game.i18n.localize("GAIA.ActionDialog.EditTitle")}: ${defaultAction.name}`
    : game.i18n.localize("GAIA.ActionDialog.CreateTitle");

  const dialogHtml = await renderTemplate("systems/gaia-preludio/templates/dialog/action-dialog.hbs", {
    action: defaultAction,
    actionTypeOptions,
    abilityTypeOptions,
    parameterOptions,
    knowledgeOptions,
    rollTypeOptions,
    damageTypeOptions,
    conditionOptions
  });

  const result = await DialogV2.wait({
    classes: ["gaia-preludio", "gaia-dialog", "action-dialog"],
    window: { title },
    position: { width: 720, height: "auto" },
    content: dialogHtml,
    render: (event, dialog) => {
      const el = dialog.element;

      // Navegação por Abas do Diálogo
      el.querySelectorAll(".action-dialog-tabs .tab-item").forEach(tabBtn => {
        tabBtn.addEventListener("click", (ev) => {
          ev.preventDefault();
          const targetTab = tabBtn.dataset.tab;
          el.querySelectorAll(".action-dialog-tabs .tab-item").forEach(b => b.classList.toggle("active", b.dataset.tab === targetTab));
          el.querySelectorAll(".action-tab").forEach(content => {
            content.classList.toggle("active", content.dataset.tab === targetTab);
          });
        });
      });

      // Toggles de Habilitação de cada Seção
      el.querySelectorAll(".section-toggle").forEach(toggle => {
        toggle.addEventListener("change", () => {
          const targetSelector = toggle.dataset.target;
          const targetEl = el.querySelector(targetSelector);
          if (targetEl) {
            targetEl.style.opacity = toggle.checked ? "1" : "0.45";
            targetEl.style.pointerEvents = toggle.checked ? "auto" : "none";
          }
        });
      });
    },
    buttons: [
      {
        action: "confirm",
        label: defaultAction.name
          ? game.i18n.localize("GAIA.ActionDialog.SaveButton")
          : game.i18n.localize("GAIA.ActionDialog.CreateButton"),
        icon: "fa-solid fa-check",
        default: true,
        callback: (event, button, dialog) => {
          const form = dialog.element.querySelector("form");
          const data = foundry.utils.expandObject(new FormDataExtended(form).object);
          
          const conditionStatus = String(data.condition?.status || "").trim();
          if (Boolean(data.condition?.hasCondition) && conditionStatus) {
            const condId = conditionStatus.toLowerCase().replace(/\s+/g, "-");
            if (CONFIG.GAIA?.conditions && !CONFIG.GAIA.conditions[condId]) {
              const newCond = {
                id: condId,
                name: conditionStatus,
                icon: "icons/svg/aura.svg",
                description: String(data.condition?.description || "").trim()
              };
              CONFIG.GAIA.conditions[condId] = newCond;
              if (Array.isArray(CONFIG.statusEffects) && !CONFIG.statusEffects.some(e => e.id === condId || e.name === conditionStatus)) {
                CONFIG.statusEffects.push(newCond);
              }
            }
          }

          return {
            id: defaultAction.id,
            name: String(data.name || "Nova Ação").trim(),
            description: String(data.description || "").trim(),
            cost: String(data.cost || "").trim(),
            type: {
              actionType: String(data.type?.actionType || "acaoAtiva"),
              category: String(data.type?.category || "ataque_corpo_a_corpo"),
              tags: defaultAction.type.tags
            },
            attack: {
              hasAttack: Boolean(data.attack?.hasAttack),
              attribute: String(data.attack?.attribute || "brutality"),
              knowledge: String(data.attack?.knowledge || ""),
              bonus: String(data.attack?.bonus || "").trim(),
              rollType: String(data.attack?.rollType || "standard"),
              defenseTarget: String(data.attack?.defenseTarget || "evasion")
            },
            damage: {
              hasDamage: Boolean(data.damage?.hasDamage),
              formula: String(data.damage?.formula || "").trim(),
              type: String(data.damage?.type || "physical"),
              criticalBonus: String(data.damage?.criticalBonus || "").trim(),
              scaling: String(data.damage?.scaling || "").trim()
            },
            check: {
              hasCheck: Boolean(data.check?.hasCheck),
              category: String(data.check?.category || "parameter"),
              attribute: String(data.check?.attribute || "vigor"),
              difficulty: Number(data.check?.difficulty ?? 10),
              onSuccess: String(data.check?.onSuccess || "").trim(),
              onFailure: String(data.check?.onFailure || "").trim()
            },
            condition: {
              hasCondition: Boolean(data.condition?.hasCondition),
              status: conditionStatus,
              duration: String(data.condition?.duration || "").trim(),
              description: String(data.condition?.description || "").trim()
            },
            areaOfEffect: {
              hasArea: Boolean(data.areaOfEffect?.hasArea),
              shape: String(data.areaOfEffect?.shape || "circle"),
              size: Number(data.areaOfEffect?.size ?? 3),
              unit: String(data.areaOfEffect?.unit || "m").trim(),
              targetDisposition: String(data.areaOfEffect?.targetDisposition || "all"),
              targetLimit: String(data.areaOfEffect?.targetLimit || "").trim()
            }
          };
        }
      },
      {
        action: "cancel",
        label: game.i18n.localize("GAIA.ActionDialog.CancelButton"),
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

  const content = await renderTemplate("systems/gaia-preludio/templates/dialog/level-up-dialog.hbs", {
    currentLevel,
    newLevel,
    vigor: currentVigor,
    hasAttributePoints: paramPoints > 0,
    paramPoints,
    knowPoints,
    parameters,
    knowledge
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
          previewHp.textContent = `+${3 + currentVigor} PV`;
        }
      };

      hpRadios.forEach(r => r.addEventListener("change", updateHpPreview));

      btnRollHp?.addEventListener("click", async (e) => {
        e.preventDefault();
        const r = new Roll("1d6");
        await r.evaluate();
        rolledHpValue = r.total;
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

      // Botão para abrir o Navegador de Habilidades
      const btnOpenBrowser = html.querySelector(".btn-open-abilities-browser");
      btnOpenBrowser?.addEventListener("click", async (e) => {
        e.preventDefault();
        const { GaiaItemBrowser } = await import("../applications/item-browser.mjs");
        GaiaItemBrowser.open(actor, { type: "ability" });
      });
    },
    ok: {
      label: game.i18n.localize("GAIA.LevelUp.Confirm"),
      icon: "fa-solid fa-arrow-up-from-bracket",
      callback: async (event, button, dialog) => {
        const html = dialog.element;

        // 1. Calcula PV Ganho
        const method = html.querySelector("input[name='hpMethod']:checked")?.value || "fixed";
        let hpGainBase = 3;
        if (method === "roll") {
          if (rolledHpValue === null) {
            const r = new Roll("1d6");
            await r.evaluate();
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
            <i class="fa-solid fa-shield-heart"></i> +${extraVigorHp} PV bônus por aumento de Vigor (Nível ${newLevel})
          </div>
        ` : "";

        const chatHtml = `
          <div class="gaia-preludio chat-card level-up-card" style="border: 2px solid var(--gaia-border-gold, #8c7355); border-radius: 6px; padding: 10px; background: linear-gradient(135deg, rgba(74, 46, 107, 0.1), rgba(201, 163, 75, 0.1));">
            <header style="text-align: center; margin-bottom: 8px;">
              <h3 style="margin: 0; font-family: var(--gaia-font-medieval, 'Cinzel', Georgia, serif); color: var(--gaia-purple-dark, #4a2e6b); font-size: 1.2em;">
                ${game.i18n.localize("GAIA.LevelUp.Title")}
              </h3>
              <p style="margin: 2px 0 0 0; font-size: 12px; font-weight: bold; color: var(--gaia-text-parchment, #000);">
                <strong>${actor.name}</strong> ${game.i18n.format("GAIA.LevelUp.ChatMessageSubtitle", { level: newLevel })}
              </p>
            </header>
            <div style="display: flex; justify-content: space-around; background: rgba(0,0,0,0.05); padding: 6px; border-radius: 4px; margin-bottom: 6px; font-weight: bold; font-size: 13px;">
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




