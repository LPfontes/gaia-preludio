const { ActorSheetV2 } = foundry.applications.sheets;
const { HandlebarsApplicationMixin } = foundry.applications.api;


export class CreatureSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
   /** @override */
  static DEFAULT_OPTIONS = {
    classes: ["gaia-preludio", "sheet", "actor"],
    position: { width: 900, height: 600 },
    tag: "form",
    form: {
      submitOnChange: true,
      closeOnSubmit: false
    }
  };
  /** @override */
  static PARTS = {
    main: { template: "systems/gaia-preludio/templates/actor/creature.hbs" }
  };
  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.actor = this.actor;
    context.system = this.actor.system;
    return context;
  }
}