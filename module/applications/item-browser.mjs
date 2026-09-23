const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;
import { HOMUNCULARIUM_BOOKS } from "../helpers/homuncularium-rules.mjs";
import { CARACTERISTICAS_FOLDERS_DATA } from "../helpers/datasets/caracteristicas-dataset.mjs";

/**
 * Mapeamento canônico dos Caminhos de Gaia: Prelúdio.
 */
const KNOWN_PATHS = {
  andarilho: {
    id: "andarilho",
    name: "O Caminho do Andarilho",
    shortName: "Andarilho",
    icon: "fa-solid fa-compass",
    order: 1
  },
  combatente: {
    id: "combatente",
    name: "O Caminho do Combatente",
    shortName: "Combatente",
    icon: "fa-solid fa-hand-fist",
    order: 2
  },
  devoto: {
    id: "devoto",
    name: "O Caminho do Devoto",
    shortName: "Devoto",
    icon: "fa-solid fa-hands-praying",
    order: 3
  },
  feiticeiro: {
    id: "feiticeiro",
    name: "O Caminho do Feiticeiro",
    shortName: "Feiticeiro",
    icon: "fa-solid fa-wand-magic-sparkles",
    order: 4
  },
  ladino: {
    id: "ladino",
    name: "O Caminho do Ladino",
    shortName: "Ladino",
    icon: "fa-solid fa-mask",
    order: 5
  }
};

/**
 * Mapeamento de folderId -> informações do Livro do Homuncularium.
 * Usado para agrupar características por livro no browser.
 */
const BOOK_FOLDER_MAP = (() => {
  const map = new Map();
  // Usa HOMUNCULARIUM_BOOKS como fonte canônica (inclui ícone)
  let order = 1;
  for (const book of Object.values(HOMUNCULARIUM_BOOKS)) {
    map.set(book.folderId, {
      id: book.folderId,
      name: book.bookName,
      shortName: book.bookName,
      icon: book.icon,
      order: order++
    });
  }
  // Adiciona pastas do dataset que não estão nos HOMUNCULARIUM_BOOKS (ex: Seres Comuns)
  for (const folder of CARACTERISTICAS_FOLDERS_DATA) {
    if (!map.has(folder._id)) {
      map.set(folder._id, {
        id: folder._id,
        name: folder.name,
        shortName: folder.name,
        icon: null,
        order: order++
      });
    }
  }
  return map;
})();

/**
 * Resolve o Livro ao qual uma característica pertence, baseado no folderId.
 * @param {string} folderId
 * @returns {object|null}
 */
function resolveItemBook(folderId) {
  if (!folderId) return null;
  return BOOK_FOLDER_MAP.get(folderId) || null;
}

/**
 * Resolve o Caminho ao qual um item/habilidade pertence.
 */
function resolveItemPath(item, customPathMap, abilityToPathMap, folderMap) {
  const cleanStr = (s) => String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

  // 1. pathId direto no system
  let rawPathId = cleanStr(item.pathId || item.system?.pathId || "");
  if (rawPathId && KNOWN_PATHS[rawPathId]) {
    return KNOWN_PATHS[rawPathId];
  }
  if (rawPathId && customPathMap.has(rawPathId)) {
    return customPathMap.get(rawPathId);
  }

  // 2. Mapeamento por nome de habilidade dentro de um Caminho
  const cleanName = cleanStr(item.name);
  if (abilityToPathMap.has(cleanName)) {
    return abilityToPathMap.get(cleanName);
  }

  // 3. Mapeamento por nome de Pasta (Folder)
  if (item.folderId && folderMap.has(item.folderId)) {
    const folderName = cleanStr(folderMap.get(item.folderId));
    for (const [key, pathInfo] of Object.entries(KNOWN_PATHS)) {
      if (folderName.includes(key)) {
        return pathInfo;
      }
    }
    for (const [key, pathInfo] of customPathMap.entries()) {
      if (folderName.includes(key)) {
        return pathInfo;
      }
    }
  }

  // 4. Correspondência parcial em rawPathId
  if (rawPathId) {
    for (const [key, pathInfo] of Object.entries(KNOWN_PATHS)) {
      if (rawPathId.includes(key)) {
        return pathInfo;
      }
    }
    return {
      id: rawPathId,
      name: rawPathId.charAt(0).toUpperCase() + rawPathId.slice(1),
      shortName: rawPathId.charAt(0).toUpperCase() + rawPathId.slice(1),
      icon: "fa-solid fa-route",
      order: 90
    };
  }

  return null;
}

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

  /** @type {string} */
  selectedPath = "all";

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

    if (options.path) {
      this.selectedPath = options.path;
    } else if (options.selectedPath) {
      this.selectedPath = options.selectedPath;
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
    const pathSelect = this.element.querySelector(".browser-path-select");

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

    if (pathSelect) {
      pathSelect.addEventListener("change", (e) => {
        this.selectedPath = e.target.value;
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

    const cleanStr = (s) => String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
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

      // 3. Filtro por Caminho
      if (this.selectedPath !== "all") {
        if (item.pathKey !== this.selectedPath) return false;
      }

      // 4. Filtro por Busca Textual (com suporte a busca por nome, descrição, tipo e caminho)
      if (cleanSearch.length > 0) {
        const nameMatch = cleanStr(item.name).includes(cleanSearch);
        const descMatch = cleanStr(item.rawDescription).includes(cleanSearch);
        const typeMatch = cleanStr(item.typeLabel).includes(cleanSearch) || cleanStr(item.type).includes(cleanSearch);
        const pathMatch = item.pathName && cleanStr(item.pathName).includes(cleanSearch);
        if (!nameMatch && !descMatch && !typeMatch && !pathMatch) return false;
      }

      return true;
    });

    const isSelectionMax = Boolean(this.maxSelectable && this.#selectedMap.size >= this.maxSelectable);

    for (const item of filtered) {
      item.isSelected = this.#selectedMap.has(item.uuid);
    }

    // Coleta todos os caminhos presentes nos itens indexados
    const availablePathsMap = new Map();
    for (const item of this.#indexedItems) {
      if (item.pathKey && !availablePathsMap.has(item.pathKey)) {
        availablePathsMap.set(item.pathKey, {
          id: item.pathKey,
          name: item.pathName,
          shortName: item.pathShortName,
          icon: item.pathIcon,
          order: item.pathOrder ?? 99
        });
      }
    }
    const availablePaths = Array.from(availablePathsMap.values())
      .sort((a, b) => (a.order || 99) - (b.order || 99));

    // Determina se devemos agrupar visualmente por Livro (características)
    const isFeatureType = this.selectedType === "feature" || (this.selectedType === "all" && filtered.every(i => i.type === "feature" || i.category === "caracteristica"));
    const shouldGroupByBook = isFeatureType && filtered.some(i => i.bookKey);

    // Determina se devemos agrupar visualmente por Caminho
    const shouldGroupByPath = !shouldGroupByBook && (this.selectedType === "ability" || this.selectedSource.includes("habilidades-caminho") || (this.selectedType === "all" && filtered.some(i => i.pathKey)));

    let groupedItems = [];

    if (shouldGroupByBook) {
      // Agrupa por Livro do Homuncularium
      const booksInResults = new Map();
      for (const item of filtered) {
        if (item.bookKey && !booksInResults.has(item.bookKey)) {
          booksInResults.set(item.bookKey, {
            id: item.bookKey,
            name: item.bookName,
            icon: item.bookIcon,
            order: item.bookOrder ?? 99
          });
        }
      }
      const sortedBooks = Array.from(booksInResults.values()).sort((a, b) => a.order - b.order);

      // 1. Grupos por livro, ordenados canonicamente
      for (const book of sortedBooks) {
        const bookItems = filtered.filter(i => i.bookKey === book.id).sort((a, b) => a.name.localeCompare(b.name, "pt"));
        if (bookItems.length > 0) {
          groupedItems.push({
            key: book.id,
            title: book.name,
            shortName: book.name,
            icon: book.icon ? null : "fa-solid fa-book",
            iconImg: book.icon || null,
            count: bookItems.length,
            items: bookItems
          });
        }
      }

      // 2. Características sem livro definido
      const noBookItems = filtered.filter(i => !i.bookKey).sort((a, b) => a.name.localeCompare(b.name, "pt"));
      if (noBookItems.length > 0) {
        groupedItems.push({
          key: "other",
          title: "Outras Características",
          shortName: "Outras",
          icon: "fa-solid fa-layer-group",
          iconImg: null,
          count: noBookItems.length,
          items: noBookItems
        });
      }
    } else if (shouldGroupByPath) {
      // 1. Grupos ordenados por caminho
      for (const p of availablePaths) {
        const pathItems = filtered.filter(i => i.pathKey === p.id);
        if (pathItems.length > 0) {
          groupedItems.push({
            key: p.id,
            title: p.name,
            shortName: p.shortName,
            icon: p.icon,
            iconImg: null,
            count: pathItems.length,
            items: pathItems
          });
        }
      }

      // 2. Itens que não possuem caminho definido
      const noPathItems = filtered.filter(i => !i.pathKey);
      if (noPathItems.length > 0) {
        groupedItems.push({
          key: "other",
          title: this.selectedType === "ability" ? (game.i18n.localize("GAIA.ItemBrowser.OtherAbilities") || "Outras Habilidades") : (game.i18n.localize("GAIA.ItemBrowser.OtherItems") || "Outros Itens"),
          shortName: "Geral",
          icon: "fa-solid fa-sparkles",
          iconImg: null,
          count: noPathItems.length,
          items: noPathItems
        });
      }
    } else {
      if (filtered.length > 0) {
        groupedItems.push({
          key: "all",
          title: null,
          count: filtered.length,
          items: filtered
        });
      }
    }

    const showPathFilter = (this.selectedType === "ability" || this.selectedType === "all" || this.selectedSource.includes("habilidades-caminho")) && availablePaths.length > 0;

    context.targetActor = this.targetActor;
    context.compendiums = compendiums;
    context.searchTerm = this.searchTerm;
    context.selectedType = this.selectedType;
    context.selectedSource = this.selectedSource;
    context.selectedPath = this.selectedPath;
    context.showPathFilter = showPathFilter;
    context.availablePaths = availablePaths;
    context.totalItems = this.#indexedItems.length;
    context.filteredItems = filtered;
    context.groupedItems = groupedItems;
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
    const folderMap = new Map();
    const customPathMap = new Map();
    const abilityToPathMap = new Map();
    const cleanStr = (s) => String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

    // Registra caminhos canônicos no customPathMap
    for (const [key, pathInfo] of Object.entries(KNOWN_PATHS)) {
      customPathMap.set(key, pathInfo);
      customPathMap.set(cleanStr(pathInfo.name), pathInfo);
      customPathMap.set(cleanStr(pathInfo.shortName), pathInfo);
    }

    // 1. Mapeia pastas do mundo
    for (const folder of game.folders) {
      if (folder.type === "Item") {
        folderMap.set(folder.id, folder.name);
      }
    }

    // 2. Mapeia itens do tipo "path" no mundo
    for (const item of game.items) {
      if (item.type === "path") {
        const pKey = cleanStr(item.name).replace(/[^a-z0-9]/g, "");
        const pathInfo = {
          id: pKey,
          name: item.name,
          shortName: item.name.replace(/^O\s+Caminho\s+d[oe]\s+/i, ""),
          icon: "fa-solid fa-route",
          order: 90
        };
        customPathMap.set(pKey, pathInfo);
        customPathMap.set(cleanStr(item.name), pathInfo);
        for (const ab of (item.system?.abilities || [])) {
          if (ab.name) {
            abilityToPathMap.set(cleanStr(ab.name), pathInfo);
          }
        }
      }
    }

    // 3. Mapeia compêndios de caminhos
    const itemPacks = game.packs.filter((p) => p.documentName === "Item");
    for (const pack of itemPacks) {
      if (pack.folders) {
        for (const f of pack.folders) {
          folderMap.set(f._id || f.id, f.name);
        }
      }
      if (pack.collection.includes("caminhos") || pack.metadata.label.toLowerCase().includes("caminho")) {
        try {
          const pathDocs = await pack.getDocuments({ type: "path" });
          for (const pDoc of pathDocs) {
            const pKey = cleanStr(pDoc.name).replace(/[^a-z0-9]/g, "");
            let pathInfo = KNOWN_PATHS[pKey] || Object.values(KNOWN_PATHS).find(kp => cleanStr(pDoc.name).includes(kp.id));
            if (!pathInfo) {
              pathInfo = {
                id: pKey,
                name: pDoc.name,
                shortName: pDoc.name.replace(/^O\s+Caminho\s+d[oe]\s+/i, ""),
                icon: "fa-solid fa-route",
                order: 90
              };
              customPathMap.set(pKey, pathInfo);
            }
            for (const ab of (pDoc.system?.abilities || [])) {
              if (ab.name) {
                abilityToPathMap.set(cleanStr(ab.name), pathInfo);
              }
            }
          }
        } catch (e) {
          console.warn("Gaia: Prelúdio | Não foi possível carregar documentos do compêndio de caminhos:", e);
        }
      }
    }

    // 4. Indexa itens criados no mundo (World Items)
    for (const item of game.items) {
      const typeLoc = game.i18n.localize(CONFIG.Item?.typeLabels?.[item.type] ?? item.type);
      const rawPathId = item.system?.pathId || "";
      const resolved = resolveItemPath(
        { name: item.name, pathId: rawPathId, folderId: item.folder },
        customPathMap,
        abilityToPathMap,
        folderMap
      );

      items.push({
        id: item.id,
        uuid: item.uuid,
        name: item.name,
        type: item.type,
        category: item.system?.category ?? "",
        pathId: rawPathId,
        pathKey: resolved?.id || "",
        pathName: resolved?.name || "",
        pathShortName: resolved?.shortName || "",
        pathIcon: resolved?.icon || "",
        pathOrder: resolved?.order ?? 99,
        typeLabel: typeLoc,
        img: item.img || "icons/svg/item-bag.svg",
        sourceId: "world",
        sourceLabel: "Mundo",
        description: item.system?.description ?? "",
        rawDescription: String(item.system?.description ?? "").replace(/<[^>]*>?/gm, "")
      });
    }

    // 5. Varre todos os compêndios de itens
    for (const pack of itemPacks) {
      const index = await pack.getIndex({
        fields: ["img", "type", "folder", "system.description", "system.category", "system.pathId"]
      });
      for (const entry of index) {
        const typeLoc = game.i18n.localize(CONFIG.Item?.typeLabels?.[entry.type] ?? entry.type);
        const rawPathId = entry.system?.pathId || "";
        const resolved = resolveItemPath(
          { name: entry.name, pathId: rawPathId, folderId: entry.folder },
          customPathMap,
          abilityToPathMap,
          folderMap
        );

        const entryBook = (entry.type === "feature" || entry.system?.category === "caracteristica")
          ? resolveItemBook(entry.folder)
          : null;

        items.push({
          id: entry._id,
          uuid: pack.getUuid(entry._id),
          name: entry.name,
          type: entry.type,
          category: entry.system?.category ?? "",
          folderId: entry.folder || "",
          pathId: rawPathId,
          pathKey: resolved?.id || "",
          pathName: resolved?.name || "",
          pathShortName: resolved?.shortName || "",
          pathIcon: resolved?.icon || "",
          pathOrder: resolved?.order ?? 99,
          bookKey: entryBook?.id || "",
          bookName: entryBook?.name || "",
          bookIcon: entryBook?.icon || "",
          bookOrder: entryBook?.order ?? 99,
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
