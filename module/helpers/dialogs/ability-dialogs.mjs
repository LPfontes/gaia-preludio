/**
 * ==============================================================================
 * ABILITY & ACTION DIALOGS / DIÁLOGOS DE HABILIDADE E AÇÃO
 * ==============================================================================
 */

const { DialogV2 } = foundry.applications.api;
const { renderTemplate } = foundry.applications.handlebars;
const { FormDataExtended } = foundry.applications.ux || foundry.utils;

/**
 * Abre caixa de diálogo para criar ou editar uma Habilidade de Legado.
 * @param {object} [initialData={}] - Dados iniciais da habilidade (name, description, activeEffectText)
 * @returns {Promise<{name: string, description: string, activeEffectText: string} | null>}
 */
export async function promptLegacyAbilityDialog(initialData = {}, options = {}) {
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

  const selectedTrigger = currentActiveEffect?.trigger?.event || "manual";
  const triggerOptions = [
    { key: "manual", label: game.i18n.localize("GAIA.Trigger.Manual") || "Ativação Manual", selected: selectedTrigger === "manual" },
    { key: "hp_threshold", label: game.i18n.localize("GAIA.Trigger.HpThreshold") || "Limite de Vida (%)", selected: selectedTrigger === "hp_threshold" },
    { key: "on_attack", label: game.i18n.localize("GAIA.Trigger.OnAttack") || "Ao Efetuar Ataque", selected: selectedTrigger === "on_attack" },
    { key: "on_damage", label: game.i18n.localize("GAIA.Trigger.OnDamage") || "Ao Sofrer Dano", selected: selectedTrigger === "on_damage" },
    { key: "action", label: game.i18n.localize("GAIA.Trigger.Action") || "Ação Ativa", selected: selectedTrigger === "action" }
  ];

  const selectedDuration = currentActiveEffect?.duration?.type || "end_of_combat";
  const durationOptions = [
    { key: "end_of_combat", label: game.i18n.localize("GAIA.Duration.EndOfCombat") || "Até o Fim do Combate", selected: selectedDuration === "end_of_combat" },
    { key: "one_round", label: game.i18n.localize("GAIA.Duration.OneRound") || "1 Rodada", selected: selectedDuration === "one_round" },
    { key: "one_turn", label: game.i18n.localize("GAIA.Duration.OneTurn") || "1 Turno", selected: selectedDuration === "one_turn" },
    { key: "instant", label: game.i18n.localize("GAIA.Duration.Instant") || "Instantâneo", selected: selectedDuration === "instant" },
    { key: "permanent", label: game.i18n.localize("GAIA.Duration.Permanent") || "Permanente", selected: selectedDuration === "permanent" }
  ];

  const selectedChangeKey = currentActiveEffect?.changeKey || (currentActiveEffect?.changes?.[0]?.key === "all_parameters" ? "all_parameters" : (currentActiveEffect?.changes?.[0]?.key ? "custom" : "none"));
  const changeKeyOptions = [
    { key: "none", label: "Nenhum (Apenas Narrativo)", selected: selectedChangeKey === "none" },
    { key: "all_parameters", label: game.i18n.localize("GAIA.ChangeKey.AllParameters") || "Todos os Parâmetros (+Bônus)", selected: selectedChangeKey === "all_parameters" },
    { key: "movement", label: game.i18n.localize("GAIA.ChangeKey.Movement") || "Movimento", selected: selectedChangeKey === "movement" },
    { key: "block", label: game.i18n.localize("GAIA.ChangeKey.Block") || "Bloqueio", selected: selectedChangeKey === "block" },
    { key: "health", label: game.i18n.localize("GAIA.ChangeKey.Health") || "Vida Máxima", selected: selectedChangeKey === "health" }
  ];

  const activeEffectChangeValue = currentActiveEffect?.changeValue ?? (currentActiveEffect?.changes?.[0]?.value ?? 1);

  const dialogHtml = await renderTemplate("systems/gaia-preludio/templates/dialog/legacy-ability-dialog.hbs", {
    name,
    description,
    activeEffectText,
    triggerOptions,
    durationOptions,
    changeKeyOptions,
    activeEffectChangeValue,
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
          <div class="legacy-action-preview-item" style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.25); padding: 4px 8px; border-radius: var(--gaia-radius); font-size: 12px;">
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

      const btnCreateEffect = html.querySelector("[data-action='createEffect']");
      btnCreateEffect?.addEventListener("click", async (ev) => {
        ev.preventDefault();
        const textarea = html.querySelector("textarea[name='activeEffectText']");
        const nameInput = html.querySelector("input[name='name']");
        const effectName = nameInput?.value?.trim() || "Efeito Ativo";

        const parentDoc = options.item || options.actor || initialData.item || initialData.actor;
        if (parentDoc) {
          const created = await parentDoc.createEmbeddedDocuments("ActiveEffect", [{
            name: effectName,
            img: parentDoc.img || "icons/svg/aura.svg",
            icon: parentDoc.img || "icons/svg/aura.svg",
            origin: parentDoc.uuid,
            description: textarea?.value?.trim() || ""
          }]);
          if (created && created[0]) {
            created[0].sheet?.render(true);
            if (textarea && !textarea.value) {
              textarea.value = `Efeito configurado em ${parentDoc.name}`;
            }
          }
        } else {
          const fallbackActor = game.user.character || canvas?.tokens?.controlled?.[0]?.actor;
          if (fallbackActor) {
            const created = await fallbackActor.createEmbeddedDocuments("ActiveEffect", [{
              name: effectName,
              img: "icons/svg/aura.svg",
              icon: "icons/svg/aura.svg",
              origin: fallbackActor.uuid,
              description: textarea?.value?.trim() || ""
            }]);
            created?.[0]?.sheet?.render(true);
          } else {
            ui.notifications?.warn("Para criar o ActiveEffect configurável, salve a habilidade no item ou vincule a um personagem.");
          }
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
          const triggerEvent = data.activeEffectTrigger || "manual";
          const durationType = data.activeEffectDuration || "end_of_combat";
          const changeKey = data.activeEffectChangeKey || "none";
          const changeVal = Number(data.activeEffectChangeValue) || 1;

          const changes = [];
          if (changeKey === "all_parameters") {
            changes.push({ key: "all_parameters", mode: 2, value: changeVal });
          } else if (changeKey === "movement") {
            changes.push({ key: "system.movement", mode: 2, value: changeVal });
          } else if (changeKey === "block") {
            changes.push({ key: "system.block", mode: 2, value: changeVal });
          } else if (changeKey === "health") {
            changes.push({ key: "system.health.max", mode: 2, value: changeVal });
          }

          return {
            name: String(data.name || "").trim() || "Nova Habilidade de Legado",
            description: String(data.description || "").trim(),
            actions: currentActions,
            activeEffectText: textValue,
            activeEffect: {
              ...currentActiveEffect,
              text: textValue,
              trigger: { event: triggerEvent },
              duration: { type: durationType },
              changes,
              changeKey,
              changeValue: changeVal
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
