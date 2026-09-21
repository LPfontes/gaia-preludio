/**
 * ==============================================================================
 * GAIA: PRELÚDIO - INVENTORY GRID TABLE HELPER
 * ==============================================================================
 * PT: Utilitário para alternar os campos da tabela (.inventory-grid-table) entre
 *     modo de EDIÇÃO (<select>/<input>/<textarea>) e modo de LEITURA (<span>).
 * EN: Utility to toggle fields in (.inventory-grid-table) between EDIT mode
 *     (<select>/<input>/<textarea>) and READ-ONLY mode (<span>).
 */

/**
 * Alterna os elementos de formulário (<select>, <input> e <textarea>) em uma .inventory-grid-table ou tr.item-row
 * por elementos <span> de visualização (e vice-versa).
 *
 * @param {HTMLElement|Document|string} scope - Elemento contêiner, linha tr.item-row ou seletor CSS
 * @param {boolean} [forceEditState] - `true` para Edição (<select>/<input>), `false` para Leitura (<span>). Se omitido, alterna.
 */
export function toggleInventoryGridTableMode(scope, forceEditState) {
  const container = typeof scope === "string" ? document.querySelector(scope) : scope;
  if (!container) return;

  const targets = container.matches?.("tr.item-row, .inventory-grid-table") 
    ? [container] 
    : Array.from(container.querySelectorAll("tr.item-row, .inventory-grid-table"));

  if (targets.length === 0) return;

  for (const targetEl of targets) {
    const hasFormControls = targetEl.querySelector("select, textarea, input:not([type='checkbox']):not(.btn-toggle-table-edit)") !== null;
    const isEditing = forceEditState !== undefined ? forceEditState : !hasFormControls;

    if (isEditing) {
      // -----------------------------------------------------------------------
      // MODO EDIÇÃO: Converte <span> em <select>, <textarea> ou <input>
      // -----------------------------------------------------------------------
      const spans = targetEl.querySelectorAll("span.grid-cell-value");
      for (const span of spans) {
        const fieldType = span.dataset.fieldType;
        const name = span.dataset.name || "";
        const value = span.dataset.value || "";

        if (fieldType === "select") {
          const select = document.createElement("select");
          if (name) select.name = name;

          if (span.dataset.optionsHtml) {
            select.innerHTML = decodeURIComponent(span.dataset.optionsHtml);
          }

          select.value = value;
          Array.from(select.options).forEach(opt => {
            opt.selected = opt.value === value;
          });

          span.replaceWith(select);
        } else if (fieldType === "textarea") {
          const textarea = document.createElement("textarea");
          if (name) textarea.name = name;
          textarea.value = value;
          
          if (span.dataset.rows !== undefined) textarea.rows = span.dataset.rows;
          if (span.dataset.placeholder !== undefined) textarea.placeholder = span.dataset.placeholder;

          span.replaceWith(textarea);
        } else if (fieldType === "input") {
          const input = document.createElement("input");
          input.type = span.dataset.inputType || "text";
          if (name) input.name = name;
          input.value = value;

          if (span.dataset.min !== undefined) input.min = span.dataset.min;
          if (span.dataset.max !== undefined) input.max = span.dataset.max;
          if (span.dataset.step !== undefined) input.step = span.dataset.step;

          span.replaceWith(input);
        }
      }

      targetEl.classList.add("is-editing");
      targetEl.classList.remove("is-readonly");
    } else {
      // -----------------------------------------------------------------------
      // MODO LEITURA: Converte <select>, <textarea> e <input> em <span>
      // -----------------------------------------------------------------------
      const controls = targetEl.querySelectorAll("select, textarea, input:not([type='checkbox']):not(.btn-toggle-table-edit)");
      for (const control of controls) {
        if (control.classList.contains("btn-toggle-table-edit") || control.type === "button") continue;

        const span = document.createElement("span");
        span.className = "grid-cell-value";

        if (control.tagName.toLowerCase() === "select") {
          const selectedOpt = control.options[control.selectedIndex];
          const displayLabel = selectedOpt ? selectedOpt.text : control.value;

          span.dataset.fieldType = "select";
          span.dataset.name = control.name;
          span.dataset.value = control.value;
          span.dataset.optionsHtml = encodeURIComponent(control.innerHTML);
          span.textContent = displayLabel;

          control.replaceWith(span);
        } else if (control.tagName.toLowerCase() === "textarea") {
          span.dataset.fieldType = "textarea";
          span.dataset.name = control.name;
          span.dataset.value = control.value;
          
          if (control.rows) span.dataset.rows = control.rows;
          if (control.placeholder) span.dataset.placeholder = control.placeholder;

          span.textContent = control.value;

          control.replaceWith(span);
        } else if (control.tagName.toLowerCase() === "input") {
          span.dataset.fieldType = "input";
          span.dataset.inputType = control.type || "text";
          span.dataset.name = control.name;
          span.dataset.value = control.value;

          if (control.min) span.dataset.min = control.min;
          if (control.max) span.dataset.max = control.max;
          if (control.step) span.dataset.step = control.step;

          span.textContent = control.value;

          control.replaceWith(span);
        }
      }

      targetEl.classList.add("is-readonly");
      targetEl.classList.remove("is-editing");
    }
  }
}


/**
 * Alterna as textareas de descrição do sistema (system.description) entre 
 * modo de edição (<textarea>) e modo de leitura (<span>).
 *
 * @param {HTMLElement|Document|string} scope - Elemento contêiner ou seletor CSS
 * @param {boolean} [forceEditState] - `true` para Edição (<textarea>), `false` para Leitura (<span>). Se omitido, alterna.
 */
export function toggleDescriptionMode(scope, forceEditState) {
  const container = typeof scope === "string" ? document.querySelector(scope) : scope;
  if (!container) return;

  const textareas = container.querySelectorAll('textarea[name="system.description"], textarea[name="system.origin"], textarea[name="system.traditions"], textarea[name="system.inWorld"], textarea[name="system.specializations"], textarea[name="system.appearance"]');
  const spans = container.querySelectorAll('span.description-value[data-name="system.description"], span.description-value[data-name="system.origin"], span.description-value[data-name="system.traditions"], span.description-value[data-name="system.inWorld"], span.description-value[data-name="system.specializations"], span.description-value[data-name="system.appearance"]');
  
  // Se não encontrou nem textarea nem span de descrição, não faz nada
  if (textareas.length === 0 && spans.length === 0) return;

  // Se forceEditState não for passado, alterna com base no que está na tela
  const isEditing = forceEditState !== undefined ? forceEditState : textareas.length === 0;

  if (isEditing) {
    // -----------------------------------------------------------------------
    // MODO EDIÇÃO: Converte spans em <textarea>
    // -----------------------------------------------------------------------
    const handledNames = new Set();
    
    for (const span of spans) {
      const fieldName = span.dataset.name;
      if (!fieldName || handledNames.has(fieldName)) {
        span.remove();
        continue;
      }
      
      handledNames.add(fieldName);
      
      const textarea = document.createElement("textarea");
      textarea.name = fieldName;
      textarea.value = span.dataset.value || "";
      
      if (span.dataset.rows !== undefined) textarea.rows = span.dataset.rows;
      if (span.dataset.placeholder !== undefined) textarea.placeholder = span.dataset.placeholder;
      if (span.dataset.originalClass !== undefined) textarea.className = span.dataset.originalClass;

      span.replaceWith(textarea);
    }
  } else {
    // -----------------------------------------------------------------------
    // MODO LEITURA: Converte <textarea> em <span class="description-value">
    // -----------------------------------------------------------------------
    for (const textarea of textareas) {
      const rawText = (textarea.value || (textarea.placeholder ? `[${textarea.placeholder}]` : "")).replace(/\\n/g, "\n");
      
      // NÃO separa path-description-panel em múltiplos spans: apenas o campo specializations é dividido
      const isSpecializations = textarea.name === "system.specializations" && !textarea.closest(".path-description-panel");

      if (isSpecializations) {
        // Cada especialização ganha seu próprio elemento description-value
        const lines = rawText.split("\n").map(l => l.trim()).filter(Boolean);
        const displayLines = lines.length > 0 ? lines : [textarea.placeholder ? `[${textarea.placeholder}]` : ""];

        const fragment = document.createDocumentFragment();
        displayLines.forEach((lineText, idx) => {
          const span = document.createElement("span");
          span.className = "description-value";
          span.dataset.name = textarea.name;
          span.dataset.value = (textarea.value || "").replace(/\\n/g, "\n");
          span.dataset.index = idx;
          if (textarea.rows) span.dataset.rows = textarea.rows;
          if (textarea.placeholder) span.dataset.placeholder = textarea.placeholder;
          if (textarea.className) span.dataset.originalClass = textarea.className;

          span.innerHTML = lineText;
          fragment.appendChild(span);
        });

        textarea.replaceWith(fragment);
      } else {
        // Descrições narrativas completas (incluindo path-description-panel) permanecem em um único span
        const span = document.createElement("span");
        span.className = "description-value";
        span.dataset.name = textarea.name;
        span.dataset.value = (textarea.value || "").replace(/\\n/g, "\n");
        if (textarea.rows) span.dataset.rows = textarea.rows;
        if (textarea.placeholder) span.dataset.placeholder = textarea.placeholder;
        if (textarea.className) span.dataset.originalClass = textarea.className;

        span.innerHTML = rawText;
        textarea.replaceWith(span);
      }
    }
  }
}
