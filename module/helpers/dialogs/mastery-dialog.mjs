/**
 * ==============================================================================
 * MASTERY DIALOG / DIÁLOGO DE MAESTRIA
 * ==============================================================================
 */

const { DialogV2 } = foundry.applications.api;
const { FormDataExtended } = foundry.applications.ux || foundry.utils;

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
        icon: "fa-solid fa-check",
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
        icon: "fa-solid fa-xmark"
      }
    ],
    rejectClose: false
  });

  return result;
}
