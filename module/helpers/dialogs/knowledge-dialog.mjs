/**
 * ==============================================================================
 * KNOWLEDGE DIALOG / SELEÇÃO E DISTRIBUIÇÃO DE CONHECIMENTOS
 * ==============================================================================
 */

const { DialogV2 } = foundry.applications.api;

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
