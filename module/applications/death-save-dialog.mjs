const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;
import { flowDeathDie, flowRegenerateStabilized } from "../helpers/flow.mjs";
import { buildPips } from "../helpers/actor-context.mjs";

/**
 * ==============================================================================
 * DEATH SAVE DIALOG / JANELA INDIVIDUAL DO DADO DE MORTE
 * ==============================================================================
 * Janela dedicada exibida quando o personagem fica Incapacitado (0 PV ou morrendo).
 * Permanece aberta até que o personagem estabilize, seja curado ou o jogador/mestre feche.
 */
export class GaiaDeathSaveDialog extends HandlebarsApplicationMixin(ApplicationV2) {
  /** @type {Map<string, GaiaDeathSaveDialog>} */
  static #instances = new Map();

  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ["gaia-preludio", "death-save-window", "dialog-v2"],
    window: {
      title: "GAIA.DeathDie.WindowTitle",
      resizable: false
    },
    position: { width: 440, height: "auto" },
    tag: "div",
    actions: {
      rollDeathDie: GaiaDeathSaveDialog.#onRollDeathDie,
      setDeathSentence: GaiaDeathSaveDialog.#onSetDeathSentence,
      setDeathGift: GaiaDeathSaveDialog.#onSetDeathGift,
      stabilize: GaiaDeathSaveDialog.#onStabilize,
      regenerateStabilized: GaiaDeathSaveDialog.#onRegenerateStabilized,
      closeWindow: GaiaDeathSaveDialog.#onCloseWindow
    }
  };

  /** @override */
  static PARTS = {
    main: {
      template: "systems/gaia-preludio/templates/dialog/death-save-dialog.hbs"
    }
  };

  /** @type {Actor} */
  actor = null;

  /**
   * Construtor da janela de Dado de Morte.
   * @param {Actor} actor - Documento do Ator
   * @param {object} [options={}] - Opções adicionais
   */
  constructor(actor, options = {}) {
    super({
      ...options,
      id: `gaia-death-save-${actor.id}`
    });
    this.actor = actor;
    GaiaDeathSaveDialog.#instances.set(actor.id, this);
  }

  /**
   * Abre a janela para o ator especificado ou traz para a frente se já aberta.
   * @param {Actor} actor - Ator em risco de morte
   * @returns {Promise<GaiaDeathSaveDialog|null>}
   */
  static async open(actor) {
    if (!actor) return null;
    let dialog = GaiaDeathSaveDialog.#instances.get(actor.id);
    if (!dialog || !dialog.rendered) {
      dialog = new GaiaDeathSaveDialog(actor);
    }
    await dialog.render({ force: true });
    if (typeof dialog.bringToFront === "function") {
      dialog.bringToFront();
    } else if (typeof dialog.bringToTop === "function") {
      dialog.bringToTop();
    }
    return dialog;
  }

  /**
   * Fecha a janela para o ator especificado se estiver aberta.
   * @param {Actor} actor - Ator estabilizado/curado
   */
  static async closeForActor(actor) {
    if (!actor) return;
    const dialog = GaiaDeathSaveDialog.#instances.get(actor.id);
    if (dialog && dialog.rendered) {
      await dialog.close();
    }
    GaiaDeathSaveDialog.#instances.delete(actor.id);
  }

  /** @override */
  async _prepareContext(options = {}) {
    const actor = this.actor;
    const system = actor.system ?? {};
    const death = system.death ?? { sentences: 0, gifts: 0, stabilized: false };
    
    const sentences = Number(death.sentences ?? 0);
    const gifts = Number(death.gifts ?? 0);
    const isStabilized = Boolean(death.stabilized);
    const isDead = sentences >= 2 || Boolean(system.isDeadByExhaustion);
    const hp = Number(system.health?.value ?? 0);
    const maxHp = Number(system.health?.max ?? 30);

    return {
      actor,
      system,
      sentences,
      gifts,
      isStabilized,
      isDead,
      hp,
      maxHp,
      sentencesPips: buildPips(sentences, 2),
      giftsPips: buildPips(gifts, 2)
    };
  }

  /** @override */
  async close(options = {}) {
    GaiaDeathSaveDialog.#instances.delete(this.actor?.id);
    return super.close(options);
  }

  /**
   * Handler de ação: Rola o Dado de Morte (1d12).
   */
  static async #onRollDeathDie(event, target) {
    event?.preventDefault?.();
    const result = await flowDeathDie(this.actor);
    await this.render();
  }

  /**
   * Handler de ação: Ajusta manualmente as Sentenças (0 a 2).
   */
  static async #onSetDeathSentence(event, target) {
    event?.preventDefault?.();
    const value = Number(target.dataset.value);
    const current = Number(this.actor.system?.death?.sentences ?? 0);
    const next = current === value ? value - 1 : value;
    const clamped = Math.clamp(next, 0, 2);
    await this.actor.update({ "system.death.sentences": clamped });
    if (clamped >= 2 && current < 2) {
      ui.notifications?.warn(`${this.actor.name} acumulou 2 Sentenças do Corruptor e morreu!`);
    }
    await this.render();
  }

  /**
   * Handler de ação: Ajusta manualmente as Dádivas (0 a 2).
   */
  static async #onSetDeathGift(event, target) {
    event?.preventDefault?.();
    const value = Number(target.dataset.value);
    const current = Number(this.actor.system?.death?.gifts ?? 0);
    const next = current === value ? value - 1 : value;
    const clamped = Math.clamp(next, 0, 2);
    if (clamped >= 2) {
      await this.actor.update({
        "system.death.gifts": 0,
        "system.death.sentences": 0,
        "system.death.stabilized": true
      });
      ui.notifications?.info(`${this.actor.name} acumulou 2 Dádivas do Artesão e estabilizou!`);
    } else {
      await this.actor.update({ "system.death.gifts": clamped });
    }
    await this.render();
  }

  /**
   * Handler de ação: Estabiliza o personagem e fecha a janela.
   */
  static async #onStabilize(event, target) {
    event?.preventDefault?.();
    await this.actor.update({
      "system.death.sentences": 0,
      "system.death.gifts": 0,
      "system.death.stabilized": true
    });
    ui.notifications?.info(`${this.actor.name} foi estabilizado.`);
    await this.close();
  }

  /**
   * Handler de ação: Regenera 1d4 PV após 10 minutos estabilizado.
   */
  static async #onRegenerateStabilized(event, target) {
    event?.preventDefault?.();
    await flowRegenerateStabilized(this.actor);
    await this.close();
  }

  /**
   * Handler de ação: Fecha a janela.
   */
  static async #onCloseWindow(event, target) {
    event?.preventDefault?.();
    await this.close();
  }
}
