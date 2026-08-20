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

  return new Promise(resolve => {
    new Dialog({
      title: "Adicionar Maestria",
      content: `
        <div style="margin-bottom: 10px;">
          <label style="display:block; margin-bottom: 4px; font-weight: bold;">Selecione a Maestria:</label>
          <select id="gaia-mastery-select" style="width: 100%;">
            ${optionsHtml}
          </select>
        </div>
      `,
      buttons: {
        add: {
          icon: '<i class="fas fa-check"></i>',
          label: "Adicionar",
          callback: async (html) => {
            const selected = html.find("#gaia-mastery-select").val();
            if (selected) {
              const list = [...(actor.system.masteries ?? [])];
              if (!list.includes(selected)) {
                list.push(selected);
                await actor.update({ "system.masteries": list });
              }
            }
            resolve();
          }
        },
        cancel: {
          icon: '<i class="fas fa-times"></i>',
          label: "Cancelar",
          callback: () => resolve()
        }
      },
      default: "add"
    }).render(true);
  });
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
