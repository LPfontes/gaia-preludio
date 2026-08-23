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
      createItem: GaiaItemBrowser.#onCreateItem
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
    if (options.type) {
      this.selectedType = options.type;
    } else if (options.selectedType) {
      this.selectedType = options.selectedType;
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

      // 3. Filtro por Busca Textual
      if (this.searchTerm.length > 0) {
        const nameMatch = item.name.toLowerCase().includes(this.searchTerm);
        const descMatch = item.rawDescription.toLowerCase().includes(this.searchTerm);
        if (!nameMatch && !descMatch) return false;
      }

      return true;
    });

    context.targetActor = this.targetActor;
    context.compendiums = compendiums;
    context.searchTerm = this.searchTerm;
    context.selectedType = this.selectedType;
    context.selectedSource = this.selectedSource;
    context.totalItems = this.#indexedItems.length;
    context.filteredItems = filtered;

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
