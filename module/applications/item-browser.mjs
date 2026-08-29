const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

/**
 * ==============================================================================
 * ITEM BROWSER / NAVEGADOR DE ITENS E HABILIDADES
 * ==============================================================================
 * Aplicativo interativo para busca, filtragem e importação de itens
 * varrendo os itens do mundo (game.items) e todos os compêndios de itens registrados.
 */
export class GaiaItemBrowser extends HandlebarsApplicationMixin(ApplicationV2) {
  /** @override */
  static DEFAULT_OPTIONS = {
    id: "gaia-item-browser",
    classes: ["gaia-preludio", "item-browser"],
    window: {
      title: "Itens e Habilidades",
      resizable: true
    },
    position: { width: 880, height: 680 },
    tag: "div",
    actions: {
      previewItem: GaiaItemBrowser.#onPreviewItem,
      importItem: GaiaItemBrowser.#onImportItem,
      createItem: GaiaItemBrowser.#onCreateItem,
      toggleSelectItem: GaiaItemBrowser.#onToggleSelectItem,
      confirmSelection: GaiaItemBrowser.#onConfirmSelection
    }
  };

  /** @override */
  static PARTS = {
    main: {
      template: "systems/gaia-preludio/templates/apps/item-browser.hbs",
      scrollable: [".browser-items-container"]
    }
  };

  /** @type {Actor|null} */
  targetActor = null;

  /** @type {boolean} Modo de seleção com retorno em callback */
  selectionMode = false;

  /** @type {number|null} Limite máximo de itens selecionáveis */
  maxSelectable = null;

  /** @type {Function|null} Callback ao confirmar seleção */
  onSelect = null;

  /** @type {Map<string, object>} */
  #selectedMap = new Map();

  /** @type {string} */
  searchTerm = "";

  /** @type {string} */
  selectedType = "all";

  /** @type {string} */
  selectedSource = "all";

  /** @type {Array<object>} Cache de itens indexados */
  #indexedItems = [];

  /**
   * Instancia o navegador de itens para um ator opcional (para importação direta).
   * @param {Actor} [actor=null] - Ator alvo para receber o item importado
   * @param {object} [options={}] - Opções da janela
   */
  constructor(actor = null, options = {}) {
    super(options);
    this.targetActor = actor;
    this.selectionMode = Boolean(options.selectionMode);
    this.maxSelectable = Number.isInteger(options.maxSelectable) ? options.maxSelectable : null;
    this.onSelect = typeof options.onSelect === "function" ? options.onSelect : null;

    if (Array.isArray(options.selectedItems)) {
      for (const item of options.selectedItems) {
        if (item.uuid) this.#selectedMap.set(item.uuid, item);
      }
    }

    if (options.type) {
      this.selectedType = options.type;
    } else if (options.selectedType) {
      this.selectedType = options.selectedType;
    }

    if (options.selectedSource) {
      this.selectedSource = options.selectedSource;
    }

    if (options.searchTerm !== undefined) {
      this.searchTerm = String(options.searchTerm || "").toLowerCase();
    } else if (options.search !== undefined) {
      this.searchTerm = String(options.search || "").toLowerCase();
    }
  }

  /**
   * Método estático de conveniência para abrir a janela do Navegador de Itens.
   * @param {Actor} [actor=null] - Ator alvo opcional
   * @param {object} [options={}] - Opções adicionais
   * @returns {GaiaItemBrowser}
   */
  static open(actor = null, options = {}) {
    const browser = new GaiaItemBrowser(actor, options);
    browser.render(true);
    return browser;
  }

  /** @override */
  _onRender(context, options) {
    super._onRender(context, options);

    // Registra os ouvintes em tempo real para os filtros e busca
    const searchInput = this.element.querySelector(".browser-search-input");
    const typeSelect = this.element.querySelector(".browser-type-select");
    const sourceSelect = this.element.querySelector(".browser-source-select");

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchTerm = String(e.target.value || "").toLowerCase();
        this.render(false);
      });
    }

    if (typeSelect) {
      typeSelect.addEventListener("change", (e) => {
        this.selectedType = e.target.value;
        this.render(false);
      });
    }

    if (sourceSelect) {
      sourceSelect.addEventListener("change", (e) => {
        this.selectedSource = e.target.value;
        this.render(false);
      });
    }
  }

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);

    // Indexa todos os itens se ainda não indexou
    if (!this.#indexedItems.length) {
      await this.#indexAllItems();
    }

    // Monta a lista de compêndios válidos
    const compendiums = game.packs
      .filter((p) => p.documentName === "Item")
      .map((p) => ({ id: p.collection, title: p.metadata.label }));

    const cleanStr = (s) => String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const cleanSearch = cleanStr(this.searchTerm);

    // Executa a filtragem
    const filtered = this.#indexedItems.filter((item) => {
      // 1. Filtro por Tipo / Categoria
      if (this.selectedType !== "all") {
        const matchesType = item.type === this.selectedType;
        const matchesCategory = item.category === this.selectedType;
        if (!matchesType && !matchesCategory) return false;
      }

      // 2. Filtro por Origem
      if (this.selectedSource !== "all") {
        if (this.selectedSource === "world" && item.sourceId !== "world") return false;
        if (this.selectedSource !== "world" && item.sourceId !== this.selectedSource) return false;
      }

      // 3. Filtro por Busca Textual (com suporte a busca por nome, descrição e tipo de item)
      if (cleanSearch.length > 0) {
        const nameMatch = cleanStr(item.name).includes(cleanSearch);
        const descMatch = cleanStr(item.rawDescription).includes(cleanSearch);
        const typeMatch = cleanStr(item.typeLabel).includes(cleanSearch) || cleanStr(item.type).includes(cleanSearch);
        if (!nameMatch && !descMatch && !typeMatch) return false;
      }

      return true;
    });

    const isSelectionMax = Boolean(this.maxSelectable && this.#selectedMap.size >= this.maxSelectable);

    for (const item of filtered) {
      item.isSelected = this.#selectedMap.has(item.uuid);
    }

    context.targetActor = this.targetActor;
    context.compendiums = compendiums;
    context.searchTerm = this.searchTerm;
    context.selectedType = this.selectedType;
    context.selectedSource = this.selectedSource;
    context.totalItems = this.#indexedItems.length;
    context.filteredItems = filtered;
    context.selectionMode = this.selectionMode;
    context.maxSelectable = this.maxSelectable;
    context.selectedCount = this.#selectedMap.size;
    context.isSelectionMax = isSelectionMax;

    return context;
  }

  /**
   * Varre os itens do mundo (game.items) e todos os compêndios de itens (game.packs).
   */
  async #indexAllItems() {
    const items = [];

    // 1. Indexa itens criados no mundo (World Items)
    for (const item of game.items) {
      const typeLoc = game.i18n.localize(CONFIG.Item?.typeLabels?.[item.type] ?? item.type);
      items.push({
        id: item.id,
        uuid: item.uuid,
        name: item.name,
        type: item.type,
        category: item.system?.category ?? "",
        typeLabel: typeLoc,
        img: item.img || "icons/svg/item-bag.svg",
        sourceId: "world",
        sourceLabel: "Mundo",
        description: item.system?.description ?? "",
        rawDescription: String(item.system?.description ?? "").replace(/<[^>]*>?/gm, "")
      });
    }

    // 2. Varre todos os compêndios de itens
    const itemPacks = game.packs.filter((p) => p.documentName === "Item");
    for (const pack of itemPacks) {
      const index = await pack.getIndex({ fields: ["img", "type", "system.description", "system.category"] });
      for (const entry of index) {
        const typeLoc = game.i18n.localize(CONFIG.Item?.typeLabels?.[entry.type] ?? entry.type);
        items.push({
          id: entry._id,
          uuid: pack.getUuid(entry._id),
          name: entry.name,
          type: entry.type,
          category: entry.system?.category ?? "",
          typeLabel: typeLoc,
          img: entry.img || "icons/svg/item-bag.svg",
          sourceId: pack.collection,
          sourceLabel: pack.metadata.label,
          description: entry.system?.description ?? "",
          rawDescription: String(entry.system?.description ?? "").replace(/<[^>]*>?/gm, "")
        });
      }
    }

    this.#indexedItems = items;
  }

  // ============================================================================
  // HANDLERS DE AÇÃO
  // ============================================================================

  static async #onPreviewItem(event, target) {
    const uuid = target.dataset.uuid || target.closest("[data-uuid]")?.dataset.uuid;
    if (!uuid) return;
    const item = await fromUuid(uuid);
    item?.sheet?.render(true);
  }

  static async #onToggleSelectItem(event, target) {
    const uuid = target.dataset.uuid || target.closest("[data-uuid]")?.dataset.uuid;
    if (!uuid) return;

    if (this.#selectedMap.has(uuid)) {
      this.#selectedMap.delete(uuid);
    } else {
      if (this.maxSelectable && this.#selectedMap.size >= this.maxSelectable) {
        ui.notifications?.warn(`Você já selecionou o limite máximo de ${this.maxSelectable} itens.`);
        return;
      }
      const item = this.#indexedItems.find(i => i.uuid === uuid);
      if (item) {
        this.#selectedMap.set(uuid, item);
      }
    }
    this.render(false);
  }

  static async #onConfirmSelection(event, target) {
    if (this.onSelect) {
      this.onSelect(Array.from(this.#selectedMap.values()));
    }
    await this.close();
  }

  static async #onImportItem(event, target) {
    const uuid = target.dataset.uuid || target.closest("[data-uuid]")?.dataset.uuid;
    if (!uuid || !this.targetActor) return;

    const item = await fromUuid(uuid);
    if (!item) return;

    const itemData = item.toObject();
    await this.targetActor.createEmbeddedDocuments("Item", [itemData]);
    ui.notifications.info(`Item "${item.name}" adicionado à ficha de ${this.targetActor.name}!`);
  }

  static async #onCreateItem(event, target) {
    event.preventDefault();
    const sel = (this.selectedType && this.selectedType !== "all") ? this.selectedType : "equipment";

    const typeMapping = {
      weapon: { type: "weapon", category: "weapon" },
      armor: { type: "armor", category: "armor" },
      shield: { type: "armor", category: "shield" },
      common: { type: "equipment", category: "common" },
      utilitarian: { type: "equipment", category: "utilitarian" },
      potion: { type: "equipment", category: "potion" },
      toxic: { type: "equipment", category: "toxic" },
      vehicle: { type: "equipment", category: "vehicle" },
      vestuary: { type: "equipment", category: "vestuary" },
      rides: { type: "equipment", category: "rides" },
      ability: { type: "ability", category: "" },
      legacy: { type: "legacy", category: "" }
    };

    const config = typeMapping[sel] || { type: "equipment", category: "common" };
    const type = config.type;
    const category = config.category;

    const defaultNames = {
      weapon: "Novo Armamento",
      armor: "Nova Armadura",
      shield: "Novo Escudo",
      equipment: "Novo Equipamento",
      common: "Novo Item Comum",
      utilitarian: "Novo Utilitário",
      potion: "Nova Poção",
      toxic: "Novo Tóxico",
      vehicle: "Novo Veículo",
      vestuary: "Novo Vestuário",
      rides: "Nova Montaria",
      ability: "Nova Habilidade",
      legacy: "Novo Legado"
    };

    const folderNames = {
      weapon: "Armamentos",
      armor: "Armaduras",
      shield: "Escudos",
      equipment: "Equipamentos",
      common: "Itens Comuns",
      utilitarian: "Utilitários",
      potion: "Poções e Consumíveis",
      toxic: "Tóxicos",
      vehicle: "Veículos",
      vestuary: "Vestuário",
      rides: "Montarias",
      ability: "Habilidades",
      legacy: "Legados"
    };

    const folderName = folderNames[sel] || folderNames[type] || "Itens";
    let folder = game.folders.find((f) => f.type === "Item" && f.name === folderName);
    if (!folder) {
      folder = await Folder.create({
        name: folderName,
        type: "Item"
      });
    }

    const name = defaultNames[sel] || defaultNames[type] || "Novo Item";
    const itemData = {
      name,
      type,
      folder: folder.id,
      system: category ? { category } : {}
    };

    const newItem = await Item.create(itemData);
    ui.notifications.info(`Item "${name}" criado na pasta "${folderName}" no Mundo!`);

    this.#indexedItems = [];
    this.render(false);
    newItem?.sheet?.render(true);
  }
}
