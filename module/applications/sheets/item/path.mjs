/**
 * ==============================================================================
 * PATH ITEM SHEET / FICHA DE ITEM CAMINHO (ApplicationV2)
 * ==============================================================================
 * PT: Ficha de item para Caminhos no sistema Gaia: Prelúdio.
 * EN: Item sheet for Paths in the Gaia: Prelúdio system.
 */

const { ItemSheetV2 } = foundry.applications.sheets;
const { HandlebarsApplicationMixin } = foundry.applications.api;
import { promptLegacyAbilityDialog } from "../../../helpers/dialogs.mjs";

export class PathSheet extends HandlebarsApplicationMixin(ItemSheetV2) {
  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ["gaia-preludio", "sheet", "item", "caminho"],
    position: { width: 800, height: "auto" },
    tag: "form",
    form: {
      submitOnChange: true,
      closeOnSubmit: false
    },
    actions: {
      editImage: PathSheet.#onEditImage,
      addPathAbility: PathSheet.#onAddPathAbility,
      editPathAbility: PathSheet.#onEditPathAbility,
      removePathAbility: PathSheet.#onRemovePathAbility
    }
  };

  /** @override */
  static PARTS = {
    main: { template: "systems/gaia-preludio/templates/item/path.hbs" }
  };

  /** @override */
  _onRender(context, options) {
    super._onRender(context, options);
    this.element.querySelectorAll("[data-edit='img']").forEach(img => {
      img.addEventListener("click", (event) => {
        PathSheet.#onEditImage.call(this, event, img);
      });
    });
  }

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.item = this.item;
    context.system = this.item.system;
    context.config = /** @type {any} */ (CONFIG).GAIA;

    const rawAbilities = this.item.system?.abilities ?? [];
    context.pathAbilities = rawAbilities.map((ab) => {
      const activeEffect = ab.activeEffect;
      let activeEffectText = "";
      if (typeof activeEffect === "string") {
        activeEffectText = activeEffect;
      } else if (activeEffect && typeof activeEffect === "object") {
        activeEffectText = typeof activeEffect.text === "string" ? activeEffect.text : "";
      }
      return {
        ...ab,
        activeEffectText
      };
    });

    return context;
  }

  static async #onEditImage(event, target) {
    const attr = target.dataset.edit || "img";
    const current = foundry.utils.getProperty(this.item, attr);
    const FilePickerClass = foundry.applications.apps.FilePicker?.implementation || globalThis.FilePicker;
    const fpOptions = {
      type: "image",
      current,
      callback: async (path) => {
        await this.item.update({ [attr]: path });
      }
    };
    if (Number.isNumeric(this.position?.top)) fpOptions.top = this.position.top + 40;
    if (Number.isNumeric(this.position?.left)) fpOptions.left = this.position.left + 10;

    const fp = new FilePickerClass(fpOptions);
    return fp.browse();
  }

  static async #onAddPathAbility(event, target) {
    event.preventDefault();
    const dialogData = await promptLegacyAbilityDialog();
    if (!dialogData) return;

    const rawList = this.item.system.abilities ?? [];
    const current = Array.isArray(rawList) ? [...rawList] : [];
    current.push({
      name: dialogData.name,
      description: dialogData.description,
      level: 1,
      activeEffect: dialogData.activeEffect ?? {
        text: dialogData.activeEffectText,
        used: false,
        recharge: "full_rest",
        trigger: { event: "hp_threshold", inCombatOnly: true, hpThresholdPercentage: 50 },
        changes: [{ key: "all_parameters", mode: "ADD", value: 1, allowExceedMax: true }],
        duration: { type: "end_of_combat" }
      }
    });
    await this.item.update({ "system.abilities": current });
  }

  static async #onEditPathAbility(event, target) {
    event.preventDefault();
    const index = Number(target.dataset.index);
    if (isNaN(index)) return;

    const rawList = this.item.system.abilities ?? [];
    const ability = rawList[index];
    if (!ability) return;

    const dialogData = await promptLegacyAbilityDialog(ability);
    if (!dialogData) return;

    const current = Array.isArray(rawList) ? foundry.utils.deepClone(rawList) : [];
    current[index] = {
      ...current[index],
      name: dialogData.name,
      description: dialogData.description,
      activeEffect: dialogData.activeEffect ?? {
        ...(typeof current[index].activeEffect === "object" ? current[index].activeEffect : {}),
        text: dialogData.activeEffectText
      }
    };

    await this.item.update({ "system.abilities": current });
  }

  static async #onRemovePathAbility(event, target) {
    event.preventDefault();
    const index = Number(target.dataset.index);
    if (isNaN(index)) return;
    const rawList = this.item.system.abilities ?? [];
    const current = Array.isArray(rawList) ? [...rawList] : [];
    current.splice(index, 1);
    await this.item.update({ "system.abilities": current });
  }
}
