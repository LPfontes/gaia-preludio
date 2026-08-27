/**
 * ==============================================================================
 * PATH ITEM SHEET / FICHA DE ITEM CAMINHO (ApplicationV2)
 * ==============================================================================
 * PT: Ficha de item para Caminhos no sistema Gaia: Prelúdio.
 * EN: Item sheet for Paths in the Gaia: Prelúdio system.
 */

import { GaiaItemSheet } from "./base.mjs";
import { AbilitySheet } from "./ability.mjs";

class PathAbilitySheet extends AbilitySheet {
  /** @override */
  async _processSubmitData(event, form, submitData) {
    await this.document.update(submitData);
  }
}

export class PathSheet extends GaiaItemSheet {
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
    
    // Suporte a alteração de imagem
    this.element.querySelectorAll("[data-edit='img']").forEach(img => {
      img.addEventListener("click", (event) => {
        PathSheet.#onEditImage.call(this, event, img);
      });
    });

    // Suporte a Drag and Drop de Itens do tipo "ability" para o Caminho
    this.element.addEventListener("dragover", (event) => event.preventDefault());
    this.element.addEventListener("drop", async (event) => {
      event.preventDefault();
      let data;
      try {
        data = JSON.parse(event.dataTransfer.getData("text/plain"));
      } catch (err) {
        return;
      }
      if (data?.type === "Item") {
        const itemDoc = await Item.implementation.fromDropData(data);
        if (itemDoc && itemDoc.type === "ability") {
          await PathSheet.#addAbilityDocumentToPath.call(this, itemDoc);
        }
      }
    });
  }

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.item = this.item;
    context.system = this.item.system;
    context.config = /** @type {any} */ (CONFIG).GAIA;

    const rawAbilities = this.item.system?.abilities ?? [];
    context.pathAbilities = rawAbilities.map((ab, index) => {
      const activeEffect = ab.activeEffect;
      let activeEffectText = "";
      if (typeof activeEffect === "string") {
        activeEffectText = activeEffect;
      } else if (activeEffect && typeof activeEffect === "object") {
        activeEffectText = typeof activeEffect.text === "string" ? activeEffect.text : "";
      }

      const actionTypeKey = context.config?.actionType?.[ab.typeAction];
      const actionTypeLabel = actionTypeKey ? game.i18n.localize(actionTypeKey) : (ab.typeAction || "");

      let rawTypeKey = "";
      if (Array.isArray(ab.types) && ab.types.length > 0) {
        const validTypes = ab.types.filter(t => t && t !== "ability");
        rawTypeKey = validTypes[0] || "";
      } else if (ab.typeAbility && ab.typeAbility !== "ability") {
        rawTypeKey = ab.typeAbility;
      } else if (ab.type && ab.type !== "ability") {
        rawTypeKey = ab.type;
      }

      const typeKey = rawTypeKey ? context.config?.abilitiesTypes?.[rawTypeKey] : null;
      const typeLabel = typeKey ? game.i18n.localize(typeKey) : (rawTypeKey && rawTypeKey !== "ability" ? rawTypeKey : "");

      const categoryKey = context.config?.abilityCategories?.[ab.category];
      const categoryLabel = categoryKey ? game.i18n.localize(categoryKey) : (ab.category || "");

      return {
        ...ab,
        index,
        category: ab.category || "",
        categoryLabel,
        activeEffectText,
        typeLabel,
        actionTypeLabel
      };
    });

    // Agrupa as habilidades por categoria: Ofensivas, Defensivas, Auxiliadoras e Outras
    const categoriesMap = {
      ofensiva: { label: game.i18n.localize("GAIA.AbilityCategories.ofensiva") || "Ofensivas", abilities: [] },
      defensiva: { label: game.i18n.localize("GAIA.AbilityCategories.defensiva") || "Defensivas", abilities: [] },
      auxiliadora: { label: game.i18n.localize("GAIA.AbilityCategories.auxiliadora") || "Auxiliadoras", abilities: [] },
      outras: { label: game.i18n.localize("GAIA.AbilityCategories.other") || "Outras Habilidades", abilities: [] }
    };

    context.pathAbilities.forEach(ab => {
      const catKey = (ab.category && categoriesMap[ab.category]) ? ab.category : "outras";
      categoriesMap[catKey].abilities.push(ab);
    });

    context.pathAbilityCategories = Object.values(categoriesMap).filter(group => group.abilities.length > 0);

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

  /**
   * Adiciona um documento ou dados de Habilidade (AbilityBaseModel) ao Caminho.
   */
  static async #addAbilityDocumentToPath(itemDoc) {
    const rawList = this.item.system.abilities ?? [];
    const current = Array.isArray(rawList) ? foundry.utils.deepClone(rawList) : [];
    
    const sys = itemDoc.system || {};
    const rawTypes = Array.isArray(sys.types) ? sys.types.filter(Boolean) : (sys.type && sys.type !== "ability" ? [sys.type] : []);
    const newAbility = {
      id: itemDoc.id || foundry.utils.randomID(),
      uuid: itemDoc.uuid || "",
      name: itemDoc.name || "Nova Habilidade de Caminho",
      type: "ability",
      img: itemDoc.img || "icons/svg/item-bag.svg",
      level: sys.level || 1,
      description: sys.description || "",
      category: sys.category || "",
      cost: sys.cost || "",
      typeAction: sys.typeAction || "",
      typeAbility: rawTypes[0] || sys.typeAbility || "",
      types: rawTypes,
      quote: sys.quote || "",
      numberTarget: sys.numberTarget || "",
      range: sys.range || "",
      subEffects: Array.isArray(sys.subEffects) ? sys.subEffects : [],
      improvements: Array.isArray(sys.improvements) ? sys.improvements : [],
      activeEffect: sys.activeEffect || {}
    };

    current.push(newAbility);
    await this.item.update({ "system.abilities": current });
  }

  static async #onAddPathAbility(event, target) {
    event.preventDefault();
    const rawList = this.item.system.abilities ?? [];
    const current = Array.isArray(rawList) ? foundry.utils.deepClone(rawList) : [];
    
    const newAbility = {
      id: foundry.utils.randomID(),
      name: "Nova Habilidade de Caminho",
      type: "ability",
      img: "icons/svg/item-bag.svg",
      level: 1,
      description: "",
      category: "",
      cost: "",
      typeAction: "",
      typeAbility: "",
      types: [],
      quote: "",
      numberTarget: "",
      range: "",
      subEffects: [],
      improvements: [],
      activeEffect: {
        text: "",
        used: false,
        recharge: "full_rest",
        trigger: { event: "hp_threshold", inCombatOnly: true, hpThresholdPercentage: 50 },
        changes: [{ key: "all_parameters", mode: "ADD", value: 1, allowExceedMax: true }],
        duration: { type: "end_of_combat" }
      }
    };

    const newIndex = current.length;
    current.push(newAbility);
    await this.item.update({ "system.abilities": current });

    // Abre a AbilitySheet para a habilidade recém-criada
    PathSheet.#openAbilitySheetForIndex.call(this, newIndex);
  }

  static async #onEditPathAbility(event, target) {
    event.preventDefault();
    const index = Number(target.dataset.index);
    if (isNaN(index)) return;

    PathSheet.#openAbilitySheetForIndex.call(this, index);
  }

  /**
   * Instancia um Item temporário do tipo "ability" (AbilityBaseModel) e abre a ficha AbilitySheet para edição.
   */
  static #openAbilitySheetForIndex(index) {
    const rawList = this.item.system.abilities ?? [];
    const abData = rawList[index];
    if (!abData) return;

    const rawTypes = Array.isArray(abData.types) 
      ? abData.types.filter(t => t && t !== "ability")
      : (abData.typeAbility && abData.typeAbility !== "ability" ? [abData.typeAbility] : []);

    const sysData = {
      description: abData.description || "",
      category: abData.category || "",
      cost: abData.cost || "",
      typeAction: abData.typeAction || "",
      type: rawTypes[0] || "",
      types: rawTypes,
      quote: abData.quote || "",
      numberTarget: abData.numberTarget || "",
      range: abData.range || "",
      level: abData.level || 1,
      pathId: this.item.id,
      subEffects: Array.isArray(abData.subEffects) ? abData.subEffects : [],
      improvements: Array.isArray(abData.improvements) ? abData.improvements : [],
      activeEffect: abData.activeEffect || {}
    };

    const tempItem = new CONFIG.Item.documentClass({
      _id: abData.id || foundry.utils.randomID(),
      name: abData.name || "Habilidade de Caminho",
      type: "ability",
      img: abData.img || "icons/svg/item-bag.svg",
      system: sysData
    }, { parent: this.item.actor || null });

    Object.defineProperty(tempItem, "isTemporary", {
      get() { return false; },
      configurable: true
    });

    const pathItem = this.item;
    let sheet;
    tempItem.update = async (changes, options) => {
      const expanded = foundry.utils.expandObject(changes);
      tempItem.updateSource(expanded);

      const updatedList = foundry.utils.deepClone(pathItem.system.abilities ?? []);
      const itemObj = tempItem.toObject();

      const savedTypes = Array.isArray(itemObj.system.types)
        ? itemObj.system.types.filter(t => t && t !== "ability")
        : (itemObj.system.type && itemObj.system.type !== "ability" ? [itemObj.system.type] : []);

      updatedList[index] = {
        id: abData.id || tempItem.id || foundry.utils.randomID(),
        uuid: abData.uuid || "",
        name: itemObj.name,
        type: "ability",
        img: itemObj.img,
        level: itemObj.system.level || 1,
        category: itemObj.system.category || "",
        cost: itemObj.system.cost || "",
        typeAction: itemObj.system.typeAction || "",
        typeAbility: savedTypes[0] || "",
        types: savedTypes,
        quote: itemObj.system.quote || "",
        numberTarget: itemObj.system.numberTarget || "",
        range: itemObj.system.range || "",
        description: itemObj.system.description || "",
        subEffects: itemObj.system.subEffects || [],
        improvements: itemObj.system.improvements || [],
        activeEffect: itemObj.system.activeEffect || {}
      };

      await pathItem.update({ "system.abilities": updatedList });
      sheet?.render(true);
    };

    sheet = new PathAbilitySheet({ document: tempItem });
    sheet.render(true);
  }

  static async #onRemovePathAbility(event, target) {
    event.preventDefault();
    event.stopPropagation();
    const index = Number(target.dataset.index);
    if (isNaN(index)) return;
    const rawList = this.item.system.abilities ?? [];
    const current = Array.isArray(rawList) ? [...rawList] : [];
    current.splice(index, 1);
    await this.item.update({ "system.abilities": current });
  }
}

