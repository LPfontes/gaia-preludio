/**
 * ==============================================================================
 * GAIA: PRELÚDIO - ACTION CHAT LISTENERS / OUVINTES DE CHAT DE AÇÕES
 * ==============================================================================
 * PT: Registro de ouvintes de eventos nos botões interativos de cards de ação no Chat.
 * EN: Event listener registration for interactive buttons in Action Chat cards.
 */

import { flowParameter, flowDifficultyCheck } from "../flow.mjs";
import { getTargetedTokens } from "../token-helper.mjs";
import { applyActionDamage } from "./action-damage.mjs";
import { applyActionCondition } from "./action-condition.mjs";
import { placeActionAoETemplate } from "./action-aoe.mjs";
import { executeAction } from "./action-executor.mjs";

/**
 * Registra todos os ouvintes interativos nos cards de chat de Ação.
 * @param {HTMLElement|JQuery} html - Elemento do chat
 * @param {ChatMessage} message - Mensagem do chat
 */
export function registerActionChatListeners(html, message) {
  const rootEl = html.jquery ? html[0] : html;
  if (!rootEl) return;

  // 1. Rolar Dano da Ação
  rootEl.querySelectorAll("[data-action='rollActionDamage']").forEach(btn => {
    btn.addEventListener("click", async (ev) => {
      ev.preventDefault();
      const formula = btn.dataset.formula || "1d6";
      const dmgType = btn.dataset.damageType || "Físico";

      const roll = new Roll(formula);
      await roll.evaluate();

      const speaker = ChatMessage.getSpeaker();
      let speakerActor = null;
      if (speaker.token && canvas?.tokens) {
        speakerActor = canvas.tokens.get(speaker.token)?.actor;
      }
      if (!speakerActor && speaker.actor) {
        speakerActor = game.actors.get(speaker.actor);
      }

      let damageTotal = roll.total;
      let weakenedNotice = "";
      if (speakerActor?.system?.hasWeakened) {
        damageTotal = Math.floor(damageTotal / 2);
        weakenedNotice = ` <span style="font-size: 11px; color: var(--gaia-gold-accent, #c9a34b); font-style: italic;">(Enfraquecido: ${roll.total} &rarr; ${damageTotal})</span>`;
      }

      const targets = getTargetedTokens(null, { fallbackToSelected: true });
      let applyButtons = "";
      if (targets.length > 0) {
        applyButtons = `
          <div class="action-damage-targets-block">
            ${targets.map(t => `
              <div class="action-damage-target-row">
                <span>${t.name}</span>
                <button type="button" class="btn-apply-damage-target" data-action="applyActionDamageDirect" data-target-token-id="${t.id}" data-amount="${damageTotal}">
                  Aplicar ${damageTotal} Dano
                </button>
              </div>
            `).join("")}
          </div>
        `;
      }

      const flavor = `<strong>Dano (${dmgType})</strong>${weakenedNotice}${applyButtons}`;

      await roll.toMessage({
        speaker,
        flavor
      });
    });
  });

  // 2. Aplicar Dano Direto a Alvo Específico
  rootEl.querySelectorAll("[data-action='applyActionDamageDirect']").forEach(btn => {
    btn.addEventListener("click", async (ev) => {
      ev.preventDefault();
      const tokenId = btn.dataset.targetTokenId;
      const amount = Number(btn.dataset.amount ?? 0);
      const token = canvas.tokens?.get(tokenId);
      if (!token || !token.actor) return;

      await applyActionDamage(token.actor, amount);
      btn.disabled = true;
      btn.innerText = "Dano Aplicado";
    });
  });

  // 3. Fazer Teste de Resistência (Individual por Alvo ou em Lote)
  rootEl.querySelectorAll("[data-action='rollTargetCheck'], [data-action='rollActionCheck']").forEach(btn => {
    btn.addEventListener("click", async (ev) => {
      ev.preventDefault();
      const tokenId = btn.dataset.targetTokenId;
      const statKey = btn.dataset.statKey || btn.dataset.stat || "vigor";
      const statCategory = btn.dataset.statCategory || (btn.dataset.stat ? "parameter" : "auto");
      const dc = Number(btn.dataset.dc ?? 10);
      let statLabel = btn.dataset.label || null;

      let actorsToRoll = [];
      if (tokenId) {
        // Alvo individual da linha da tabela de ataque
        const token = canvas.tokens?.get(tokenId);
        if (token?.actor) actorsToRoll = [token.actor];
        else {
          ui.notifications?.warn("Token alvo não encontrado na cena.");
          return;
        }
      } else {
        // Alvos alvejados (Targets com 'T'), selecionados, ou o usuário ativo
        const targets = getTargetedTokens(null, { fallbackToSelected: true });
        actorsToRoll = targets.map(t => t.actor).filter(Boolean);
        if (actorsToRoll.length === 0) {
          const userActor = game.user.character || (message.speaker?.actor ? game.actors.get(message.speaker.actor) : null);
          if (userActor) actorsToRoll = [userActor];
        }
      }

      if (actorsToRoll.length === 0) {
        ui.notifications?.warn("Selecione ou mire em pelo menos um token para realizar o teste de resistência.");
        return;
      }

      const renderTpl = foundry.applications?.handlebars?.renderTemplate || globalThis.renderTemplate;

      for (const actor of actorsToRoll) {
        let paramObj = null;
        let label = statLabel;

        switch (statCategory) {
          case "parameter":
            paramObj = actor.system.parameters?.[statKey] || { value: Number(actor.system.parameters?.[statKey]?.value ?? 0) };
            if (!label) label = CONFIG.GAIA?.parameters?.[statKey] ? game.i18n.localize(CONFIG.GAIA.parameters[statKey]) : statKey;
            break;
          case "knowledge":
            paramObj = actor.system.knowledge?.[statKey] || { value: Number(actor.system.knowledge?.[statKey]?.value ?? 0) };
            if (!label) label = CONFIG.GAIA?.knowledge?.[statKey] ? game.i18n.localize(CONFIG.GAIA.knowledge[statKey]) : statKey;
            break;
          case "defense":
            const mod = Number(actor.system.defesas?.[statKey]?.total ?? actor.system.defesas?.[statKey]?.value ?? 0);
            paramObj = { value: mod };
            if (!label) label = statKey.toUpperCase();
            break;
          default:
            paramObj = actor.system.parameters?.[statKey] 
              || actor.system.knowledge?.[statKey] 
              || { value: Number(actor.system.parameters?.[statKey]?.value ?? actor.system.knowledge?.[statKey]?.value ?? 0) };
            if (!label) {
              label = CONFIG.GAIA?.parameters?.[statKey] 
                ? game.i18n.localize(CONFIG.GAIA.parameters[statKey]) 
                : (CONFIG.GAIA?.knowledge?.[statKey] ? game.i18n.localize(CONFIG.GAIA.knowledge[statKey]) : statKey);
            }
            break;
        }

        const isParam = statCategory === "parameter" || Boolean(CONFIG.GAIA?.parameters?.[statKey]);
        const checkExhaustion = isParam ? (Number(actor.system?.exhaustion) || 0) : 0;
        const roll = await flowParameter(paramObj, "standard", 0, checkExhaustion);
        const check = flowDifficultyCheck(roll, dc);

        const outcomeClass = check.success ? "outcome-success" : "outcome-failure";
        const outcomeTitle = check.success ? `PASSOU no Teste de ${label}!` : `FALHOU no Teste de ${label}!`;

        const flavor = await renderTpl("systems/gaia-preludio/templates/chat/outcome-card.hbs", {
          actor,
          outcomeClass,
          outcomeTitle,
          formula: roll.formula,
          total: roll.total,
          dc
        });

        await roll.toMessage({
          speaker: ChatMessage.getSpeaker({ actor }),
          flavor
        });
      }
    });
  });

  // 4. Aplicar Condição da Ação
  rootEl.querySelectorAll("[data-action='applyActionCondition']").forEach(btn => {
    btn.addEventListener("click", async (ev) => {
      ev.preventDefault();
      const statusName = btn.dataset.status;
      const duration = btn.dataset.duration || "";
      const targets = getTargetedTokens(null, { fallbackToSelected: true });
      if (targets.length === 0) {
        ui.notifications?.warn("Selecione ou mire em pelo menos um alvo para aplicar a condição.");
        return;
      }
      for (const t of targets) {
        if (t.actor) await applyActionCondition(t.actor, statusName, duration);
      }
    });
  });

  // 5. Posicionar Template de Área da Ação
  rootEl.querySelectorAll("[data-action='placeActionTemplate']").forEach(btn => {
    btn.addEventListener("click", async (ev) => {
      ev.preventDefault();
      const shape = btn.dataset.shape || "circle";
      const size = Number(btn.dataset.size ?? 3);
      const targetDisposition = btn.dataset.targetDisposition || "all";
      const actorId = message.speaker?.actor;
      const casterActor = actorId ? game.actors.get(actorId) : null;
      await placeActionAoETemplate({ shape, size, targetDisposition }, casterActor);
    });
  });

  // 6. Rolar Ação a partir do Card de Habilidade/Item no Chat
  rootEl.querySelectorAll("[data-action='rollItemAction']").forEach(btn => {
    btn.addEventListener("click", async (ev) => {
      ev.preventDefault();
      const itemUuid = btn.dataset.itemUuid;
      const itemId = btn.dataset.itemId;
      const actionId = btn.dataset.actionId;
      const actionIndex = Number(btn.dataset.actionIndex);

      let item = null;
      if (itemUuid) {
        try {
          item = await fromUuid(itemUuid);
        } catch (e) {
          item = null;
        }
      }

      const actorId = message.speaker?.actor;
      const tokenId = message.speaker?.token;
      let actor = null;
      if (tokenId && canvas?.tokens) {
        actor = canvas.tokens.get(tokenId)?.actor;
      }
      if (!actor && actorId) {
        actor = game.actors.get(actorId);
      }

      if (!item && actor && itemId) {
        item = actor.items.get(itemId);
      }

      if (!item && itemId) {
        item = game.items.get(itemId);
      }

      if (!item && itemId) {
        for (const act of game.actors) {
          const found = act.items.get(itemId);
          if (found) {
            item = found;
            if (!actor) actor = act;
            break;
          }
        }
      }

      if (!item) {
        ui.notifications?.warn("Item não encontrado.");
        return;
      }

      let act = (item.system.actions || []).find(a => a.id === actionId);
      if (!act && !isNaN(actionIndex)) {
        act = item.system.actions?.[actionIndex];
      }
      if (!act) {
        ui.notifications?.warn("Ação não encontrada no item.");
        return;
      }

      const finalActor = item.actor || actor || (game.user.character ?? null);
      await executeAction(act, { actor: finalActor, item });
    });
  });

  // 6. Ativar / Criar Efeito de Habilidade de Legado pelo Chat
  rootEl.querySelectorAll("[data-action='createEffect'], [data-action='applyLegacyEffectFromChat']").forEach(btn => {
    btn.addEventListener("click", async (ev) => {
      ev.preventDefault();
      const actorId = btn.dataset.actorId;
      const abilityIndex = Number(btn.dataset.abilityIndex);
      const actor = game.actors.get(actorId) || canvas?.tokens?.get(actorId)?.actor || (game.user.character ?? null);

      if (!actor) {
        ui.notifications?.warn("Personagem não encontrado.");
        return;
      }

      const legacyItem = (actor.items ?? []).find(i => i.type === "legacy" && i.name.toLowerCase() === (actor.system?.legacy || "").toLowerCase())
        || (game.items ?? []).find(i => i.type === "legacy" && i.name.toLowerCase() === (actor.system?.legacy || "").toLowerCase());

      let rawList = legacyItem?.system?.legacyAbilities;
      if (!rawList || !Array.isArray(rawList)) {
        rawList = actor.system?.legacyAbilities ?? [];
      }

      const ab = rawList[abilityIndex];
      if (!ab) {
        ui.notifications?.warn("Habilidade de Legado não encontrada.");
        return;
      }

      const effectName = ab.name;
      const existing = actor.effects.find(e => e.name === effectName || e.flags?.gaia?.abilityName === effectName);

      if (existing) {
        await existing.delete();
        ui.notifications?.info(`Efeito "${effectName}" desativado de ${actor.name}.`);
        return;
      }

      const activeEffectData = ab.activeEffect || {};
      const effectText = typeof activeEffectData === "string" ? activeEffectData : (activeEffectData.text || ab.activeEffectText || "");
      
      const changes = [];
      const changeList = Array.isArray(activeEffectData.changes) ? activeEffectData.changes : [];
      for (const ch of changeList) {
        if (ch.key === "all_parameters") {
          const val = String(ch.value ?? 1);
          const paramKeys = ["precision", "brutality", "dexterity", "agility", "channeling", "arcane", "spirit", "vigor"];
          for (const p of paramKeys) {
            changes.push({ key: `system.parameters.${p}`, mode: 2, value: val });
          }
        } else {
          changes.push({ key: ch.key, mode: ch.mode ?? 2, value: String(ch.value ?? 1) });
        }
      }

      await actor.createEmbeddedDocuments("ActiveEffect", [{
        name: effectName,
        img: legacyItem?.img || "icons/svg/aura.svg",
        icon: legacyItem?.img || "icons/svg/aura.svg",
        origin: legacyItem?.uuid || actor.uuid,
        description: effectText,
        changes,
        flags: {
          gaia: {
            abilityName: effectName,
            activeEffect: activeEffectData
          }
        }
      }]);

      ui.notifications?.info(`Efeito "${effectName}" ativado em ${actor.name}!`);
    });
  });
}
