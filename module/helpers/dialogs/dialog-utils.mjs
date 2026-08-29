/**
 * ==============================================================================
 * DIALOG UTILS / UTILITÁRIOS DE DIÁLOGOS
 * ==============================================================================
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
      const list = [...(actor.system.parameters ?? [])];
      let entry = list.find(p => String(p.name || "").toLowerCase() === paramKey);
      if (!entry) {
        entry = { name: paramKey, value: 0 };
        list.push(entry);
      }
      entry.value = result;
      await actor.update({ "system.parameters": list });
      break;
    }
    case "knowledge": {
      const knowKey = (subKey || "").toLowerCase();
      const list = [...(actor.system.knowledge ?? [])];
      let entry = list.find(k => String(k.name || "").toLowerCase() === knowKey);
      if (!entry) {
        entry = { name: knowKey, value: 0 };
        list.push(entry);
      }
      entry.value = result;
      await actor.update({ "system.knowledge": list });
      break;
    }
    default:
      await actor.update({ [field]: result }, { saveOriginal: true });
      break;
  }
  return result;
}
