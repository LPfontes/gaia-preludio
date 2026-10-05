import { GaiaBaseActorSheet } from "./base.mjs";
import { GAIA } from "../../../helpers/config.mjs";
import { getBookFolderForFeature, ensureHomunculariumAttacks, HOMUNCULARIUM_BOOKS, syncHomunculariumAttackFormulas } from "../../../helpers/homuncularium-rules.mjs";
import { calculateWeaponDamage } from "../../../helpers/actor-context.mjs";
import { CARACTERISTICAS_FOLDERS_DATA } from "../../../helpers/datasets/caracteristicas-dataset.mjs";

/**
 * ==============================================================================
 * CREATURE SHEET / FICHA DE CRIATURA (NPC/MONSTRO)
 * ==============================================================================
 * Ficha de ator para Criaturas baseada em ApplicationV2 do Foundry VTT.
 * Herda a estrutura básica e handlers genéricos de GaiaBaseActorSheet.
 */
export class CreatureSheet extends GaiaBaseActorSheet {
  /** @override */
  static DEFAULT_OPTIONS = {
    ...super.DEFAULT_OPTIONS,
    classes: ["gaia-preludio", "sheet", "actor", "creature-sheet"],
    position: { width: 850, height: 750  },
    actions: {
      ...super.DEFAULT_OPTIONS.actions,
      openCreatureWizard: CreatureSheet.#onOpenCreatureWizard,
      setFeatureModifierTarget: CreatureSheet.#onSetFeatureModifierTarget,
      changeFeatureModifierValue: CreatureSheet.#onChangeFeatureModifierValue,
      stepFeatureModifier: CreatureSheet.#onStepFeatureModifier,
      resetFeatureModifier: CreatureSheet.#onResetFeatureModifier
    }
  };

  /** @override */
  static PARTS = {
    header: { 
      template: "systems/gaia-preludio/templates/actor/parts/creature-header.hbs",
      scrollable: ["", ".gaia-creature-banner"]
    },
    tabs: {
      template: "systems/gaia-preludio/templates/actor/parts/creature-tabs-nav.hbs"
    },
    tabPersonagem: {
      template: "systems/gaia-preludio/templates/actor/parts/creature-personagem.hbs",
      scrollable: ["", ".creature-items-list"]
    },
    tabAbilities: {
      template: "systems/gaia-preludio/templates/actor/parts/creature-abilities.hbs",
      scrollable: ["", ".abilities-list-grid"]
    },
    tabBio: {
      template: "systems/gaia-preludio/templates/actor/parts/creature-bio.hbs",
      scrollable: [""]
    },
    tabEffects: {
      template: "systems/gaia-preludio/templates/actor/parts/effects.hbs",
      scrollable: ["", ".actor-effects-panel"]
    }
  };

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.actor = this.actor;
    context.system = this.actor.system;
    context.config = /** @type {any} */ (CONFIG).GAIA;

    // Garante que a criatura com Características do Homuncularium possua Golpe Brutal e Evocação Mística na ficha
    const hasHomunculariumFeature = this._hasHomunculariumFeatures();
    if (this.actor.isOwner && hasHomunculariumFeature && !this._ensuringHomunculariumAttacks) {
      const hasGolpe = this.actor.items.some(i => i.name === "Golpe Brutal" || i.flags?.["gaia-preludio"]?.attackType === "golpeBrutal");
      const hasEvocacao = this.actor.items.some(i => i.name === "Evocação Mística" || i.flags?.["gaia-preludio"]?.attackType === "evocacaoMistica");
      if (!hasGolpe || !hasEvocacao) {
        this._ensuringHomunculariumAttacks = true;
        ensureHomunculariumAttacks(this.actor).finally(() => {
          this._ensuringHomunculariumAttacks = false;
        });
      } else {
        // PT: Itens já existentes podem carregar imagens/fórmulas desatualizadas de versões anteriores.
        this._ensuringHomunculariumAttacks = true;
        syncHomunculariumAttackFormulas(this.actor).finally(() => {
          this._ensuringHomunculariumAttacks = false;
        });
      }
    }

    return context;
  }

  /** @override */
  async _preparePartContext(partId, context, options) {
    context = await super._preparePartContext(partId, context, options);
    const actor = this.actor;
    const config = /** @type {any} */ (CONFIG).GAIA;

    switch (partId) {
      case "tabs":
        context.tab = { active: this.tabGroups.primary || "personagem" };
        break;

      case "tabPersonagem": {
        context.tab = { active: this.tabGroups.primary || "personagem" };
        const currentTypes = new Set(actor.system.creatureTypes ?? []);
        context.creatureTypesList = Object.entries(GAIA.creaturesType ?? {}).map(([key, labelKey]) => ({
          key,
          label: game.i18n.localize(labelKey),
          checked: currentTypes.has(key)
        }));

        context.weapons = actor.items.filter((i) => i.type === "weapon").map((w) => {
          const dmg = calculateWeaponDamage(w, actor);
          return {
            ...w,
            id: w.id,
            name: w.name,
            img: w.img,
            system: w.system,
            damageText: dmg.damageText !== "-" ? dmg.damageText : "",
            isCollapsed: Boolean(this._collapsedAbilities?.has(w.id) || this._collapsedAbilities?.has(w.name?.trim()))
          };
        });

        context.inventory = actor.items.filter((i) => i.type === "equipment" || i.type === "armor");
        break;
      }

      case "tabAbilities": {
        context.tab = { active: this.tabGroups.primary || "personagem" };
        context.features = actor.items.filter((i) => i.type === "feature").map((i) => this._mapAbilityItem(i, config));
        context.abilities = actor.items.filter((i) => i.type === "ability").map((i) => this._mapAbilityItem(i, config));
        this._prepareFeatureContext(context);
        break;
      }

      case "tabBio":
        context.tab = { active: this.tabGroups.primary || "personagem" };
        break;

      case "tabEffects": {
        context.tab = { active: this.tabGroups.primary || "personagem" };
        const { prepareActiveEffectCategories } = await import("../../../helpers/actor-context.mjs");
        context.effects = prepareActiveEffectCategories(actor);
        break;
      }
    }

    return context;
  }

  /**
   * Mapeia um item de Habilidade ou Característica para exibição em card na ficha.
   * @protected
   * @param {Item} item
   * @param {object} config
   * @returns {object}
   */
  _mapAbilityItem(item, config) {
    const isFeature = item.type === "feature";
    const rawCategory = String(item.system?.category || "").trim();
    const rawCatNorm = rawCategory.toLowerCase();
    const isGenericType = rawCatNorm === "caracteristica" || rawCatNorm === "característica" || rawCatNorm === "feature" || rawCatNorm === "ability" || rawCatNorm === "habilidade";

    const categoryDict = isFeature ? config?.featureCategories : config?.abilityCategories;
    let categoryLabel = "";
    if (rawCategory && !isGenericType) {
      categoryLabel = categoryDict?.[rawCatNorm] ? game.i18n.localize(categoryDict[rawCatNorm]) : rawCategory;
    }

    const rawTypes = Array.isArray(item.system?.types) && item.system.types.length > 0 
      ? item.system.types 
      : (item.system?.type ? [item.system.type] : []);
    const localizedTypes = rawTypes.map(t => config?.abilitiesTypes?.[t] ? game.i18n.localize(config.abilitiesTypes[t]) : t).filter(Boolean);
    const firstType = localizedTypes[0] || "";
    const additionalTypes = localizedTypes.slice(1).join(" / ");

    // Evita duplicar categoria caso seja idêntica ao primeiro tipo (ex: "Passiva")
    if (categoryLabel && firstType && categoryLabel.toLowerCase() === firstType.toLowerCase()) {
      categoryLabel = "";
    }

    const rawAction = item.system?.typeAction || "";
    const actionLabel = rawAction && config?.actionType?.[rawAction] 
      ? game.i18n.localize(config.actionType[rawAction]) 
      : (rawAction || "");

    const cost = item.system?.cost || "";

    // Monta spans estilizados para a meta-row-1
    const metaSpanParts = [];
    if (cost) metaSpanParts.push(`<span class="meta-cost">${cost}</span>`);
    if (actionLabel) metaSpanParts.push(`<span class="meta-action">${actionLabel}</span>`);
    if (categoryLabel) metaSpanParts.push(`<span class="meta-category">${categoryLabel}</span>`);
    if (firstType) metaSpanParts.push(`<span class="meta-type">${firstType}</span>`);

    const dividerHtml = `<span class="meta-divider">|</span>`;
    const metaRow1 = metaSpanParts.join(` ${dividerHtml} `);

    const rawImprovements = Array.isArray(item.system?.improvements) ? item.system.improvements : [];
    const activeImprovements = rawImprovements.filter(imp => typeof imp === "object" && Boolean(imp.active));

    // Modificador de atributo da característica / habilidade
    const hasAttributeBonus = Boolean(item.system?.hasAttributeBonus);
    const rawModifier = item.flags?.["gaia-preludio"]?.featureModifier;
    let modifierTarget = rawModifier?.target ?? "";

    const descLower = (item.system?.description || "").toLowerCase();
    const nameLower = (item.name || "").toLowerCase();
    if (!modifierTarget && (hasAttributeBonus || (isFeature && (nameLower.includes("adrenalina") || (descLower.includes("receber qualquer tipo de dano") && descLower.includes("parâmetros ofensivos")))))) {
      modifierTarget = "offensiveParameters";
    }

    const modifierValue = Number(rawModifier?.value ?? 0);
    const modifierMax = Math.max(1, Number(this.actor?.system?.powerPoints ?? 1));
    const targetLabels = {
      offensiveParameters: "Parâmetros Ofensivos",
      defensiveParameters: "Parâmetros Defensivos",
      movement: "Deslocamento",
      block: "Bloqueio"
    };
    const modifierTargetLabel = targetLabels[modifierTarget] || modifierTarget;

    return {
      id: item.id,
      name: item.name,
      img: item.img,
      system: item.system,
      categoryLabel,
      firstType,
      additionalTypes,
      hasAdditionalTypes: localizedTypes.length > 1,
      actionLabel,
      cost,
      metaRow1,
      activeImprovements,
      hasActiveImprovements: activeImprovements.length > 0,
      hasAttributeBonus,
      modifierTarget,
      modifierValue,
      modifierMax,
      modifierTargetLabel,
      isCollapsed: Boolean(this._collapsedAbilities?.has(item.id) || this._collapsedAbilities?.has(item.name?.trim()))
    };
  }

  /**
   * Prepara as opções dos filtros da seção de Características (Dificuldade e Livro do Homuncularium)
   * e injeta no contexto a lista filtrada (`filteredFeatures`).
   * @protected
   * @param {object} context - Contexto da aba de habilidades
   */
  _prepareFeatureContext(context) {
    const allFeatures = Array.isArray(context.features) ? context.features : [];
    const featureItems = this.actor.items.filter(i => i.type === "feature");

    // PT: Rótulo canônico do Livro e ordem (Seres Comuns -> Seres Celestiais).
    const BOOK_LABELS = new Map();
    const BOOK_ORDER = new Map();
    let order = 1;
    for (const folder of CARACTERISTICAS_FOLDERS_DATA) {
      BOOK_LABELS.set(folder._id, folder.name);
      BOOK_ORDER.set(folder.name.toLowerCase(), order++);
    }
    for (const book of Object.values(HOMUNCULARIUM_BOOKS)) {
      if (!BOOK_LABELS.has(book.folderId)) {
        BOOK_LABELS.set(book.folderId, book.bookName);
        BOOK_ORDER.set(book.bookName.toLowerCase(), order++);
      }
    }

    const typeMap = new Map();
    const bookMap = new Map();
    // PT: Nome do Livro resolvido por item (modelo real), reutilizado como lista de opções e para o filtro.
    const bookNameByItemId = new Map();

    for (const item of featureItems) {
      const bookName = this._resolveFeatureBookName(item, BOOK_LABELS);
      if (!bookName) continue;

      bookNameByItemId.set(item.id, bookName);
      const bookKey = bookName.toLowerCase();
      if (!bookMap.has(bookKey)) bookMap.set(bookKey, bookName);
    }

    for (const feature of allFeatures) {
      const tierKey = String(feature.system?.tier || "").trim();
      if (tierKey && !typeMap.has(tierKey)) typeMap.set(tierKey, tierKey);
    }

    const featureTypeOptions = Array.from(typeMap.values()).map(label => ({ id: label, label }));
    const featureBookOptions = Array.from(bookMap.values())
      .map(name => ({ id: name.toLowerCase(), label: name }))
      .sort((a, b) => (BOOK_ORDER.get(a.id) || 99) - (BOOK_ORDER.get(b.id) || 99));

    const filters = this._featureFilters ?? { type: "all", book: "all" };
    // PT: Descarta valores de filtro que não existem mais nas Características atuais.
    if (filters.type !== "all" && !typeMap.has(filters.type)) filters.type = "all";
    if (filters.book !== "all" && !bookMap.has(filters.book)) filters.book = "all";

    const filteredFeatures = allFeatures.filter(feature => {
      const tierKey = String(feature.system?.tier || "").trim();
      if (filters.type !== "all" && tierKey !== filters.type) return false;
      if (filters.book !== "all") {
        const bookName = String(bookNameByItemId.get(feature.id) || "").toLowerCase();
        if (bookName !== filters.book) return false;
      }
      return true;
    });

    context.filteredFeatures = filteredFeatures;
    context.featureTypeOptions = featureTypeOptions;
    context.featureBookOptions = featureBookOptions;
    context.featureAllTiersLabel = game.i18n.localize("GAIA.Creature.AllFeatureTiers") || "Todas as Dificuldades";
    context.featureAllBooksLabel = game.i18n.localize("GAIA.Creature.AllFeatureBooks") || "Todos os Livros";
    context.featureNoMatchLabel = game.i18n.localize("GAIA.Creature.NoFeaturesMatchingFilters") || "Nenhuma característica corresponde aos filtros selecionados.";
    context.featureFilters = {
      type: filters.type,
      book: filters.book,
      isTypeAll: filters.type === "all",
      isBookAll: filters.book === "all",
      showTypeFilter: featureTypeOptions.length > 1,
      showBookFilter: featureBookOptions.length > 0
    };
    context.featureFilterCounts = {
      all: allFeatures.length,
      visible: filteredFeatures.length,
      filtered: allFeatures.length !== filteredFeatures.length
    };
  }

  /**
   * Resolve o nome do Livro do Homuncularium de uma Característica, priorizando a pasta
   * do item (mesma lógica usada pelas regras do Homuncularium) e caindo para `system.book`.
   * @protected
   * @param {Item|object} feature - Documento ou card de Característica
   * @param {Map<string, string>} bookLabels - Mapa folderId -> nome do Livro
   * @returns {string} Nome do Livro ou string vazia
   */
  _resolveFeatureBookName(feature, bookLabels) {
    const folderId = getBookFolderForFeature(feature);
    if (folderId && bookLabels.has(folderId)) return bookLabels.get(folderId);

    const rawBook = String(feature.system?.book || "").trim();
    if (rawBook) {
      const match = Array.from(bookLabels.values()).find(name => name.toLowerCase() === rawBook.toLowerCase());
      return match || rawBook;
    }

    return "";
  }

  /** @override */
  _onRender(context, options) {
    super._onRender(context, options);
    const html = this.element;
    if (!html) return;

    // Listeners diretos de input e change para garantir responsividade imediata dos modificadores
    html.querySelectorAll("select.feature-modifier-target").forEach(sel => {
      sel.addEventListener("change", (e) => CreatureSheet.#onSetFeatureModifierTarget.call(this, e, sel));
    });

    html.querySelectorAll("input.feature-modifier-value").forEach(inp => {
      inp.addEventListener("change", (e) => CreatureSheet.#onChangeFeatureModifierValue.call(this, e, inp));
    });

    // Listener direto para persistência instantânea de Pontos de Poder
    const powerInput = html.querySelector('input[name="system.powerPoints"]');
    if (powerInput) {
      powerInput.addEventListener("change", async (e) => {
        const val = Math.max(0, parseInt(e.target.value, 10) || 0);
        if (this.actor.system?.powerPoints !== val) {
          await this.actor.update({ "system.powerPoints": val }, { skipHomunculumRecalc: true });
        }
      });
    }
  }

  /* ==============================================================================
   * AÇÕES ESPECÍFICAS DA FICHA DE CRIATURA
   * ============================================================================== */

  static async #onOpenCreatureWizard(event, target) {
    event.preventDefault();
    const { promptCreatureWizardDialog } = await import("../../../helpers/dialogs/index.mjs");
    return await promptCreatureWizardDialog(this.actor);
  }

  static async #onStepFeatureModifier(event, target) {
    event.preventDefault();
    event.stopPropagation();
    const itemId = target.dataset.itemId;
    const step = Number(target.dataset.step) || 0;
    const item = this.actor.items.get(itemId);
    if (!item) return;

    const currentMod = item.flags?.["gaia-preludio"]?.featureModifier ?? {};
    const maxVal = Math.max(1, Number(this.actor.system?.powerPoints ?? 1));
    const currentVal = Number(currentMod.value ?? 0);
    const nextVal = Math.clamp(currentVal + step, 0, maxVal);
    const modTarget = currentMod.target || "offensiveParameters";

    await item.update({
      "flags.gaia-preludio.featureModifier": {
        ...currentMod,
        target: modTarget,
        value: nextVal
      }
    });
  }

  static async #onResetFeatureModifier(event, target) {
    event.preventDefault();
    event.stopPropagation();
    const itemId = target.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (!item) return;

    await item.update({
      "flags.gaia-preludio.featureModifier.value": 0
    });
  }

  static async #onChangeFeatureModifierValue(event, target) {
    const itemId = target.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (!item) return;

    const currentMod = item.flags?.["gaia-preludio"]?.featureModifier ?? {};
    const maxVal = Math.max(1, Number(this.actor.system?.powerPoints ?? 1));
    const inputVal = Math.clamp(Number(target.value) || 0, 0, maxVal);
    const modTarget = currentMod.target || "offensiveParameters";

    await item.update({
      "flags.gaia-preludio.featureModifier": {
        ...currentMod,
        target: modTarget,
        value: inputVal
      }
    });
  }

  static async #onSetFeatureModifierTarget(event, target) {
    const itemId = target.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (!item) return;

    const newTarget = String(target.value ?? "").trim();
    const currentMod = item.flags?.["gaia-preludio"]?.featureModifier ?? {};
    await item.update({
      "flags.gaia-preludio.featureModifier": {
        ...currentMod,
        target: newTarget
      }
    });
  }

  /**
   * PT: Verifica se a criatura possui ao menos uma Característica de um Livro do Homuncularium.
   * EN: Checks if the creature has at least one Homuncularium Book Feature.
   * @returns {boolean}
   */
  _hasHomunculariumFeatures() {
    return this.actor.items.some(i =>
      (i.type === "feature" || i.type === "ability") && getBookFolderForFeature(i) !== null
    );
  }
}