/**
 * ==============================================================================
 * PATH REGISTRY / REGISTRO CANÔNICO DE CAMINHOS
 * ==============================================================================
 * PT: Resolve a identidade dos Caminhos de Gaia: Prelúdio de forma tolerante.
 * Um mesmo Caminho pode aparecer como id de documento ("path000300000000"),
 * slug ("andarilho"), nome curto ("Devoto") ou nome completo ("O Caminho Do Devoto").
 * Este módulo centraliza a normalização para que a ficha e o Navegador de Itens
 * concordem sobre qual Caminho uma Habilidade pertence.
 */

import { CAMINHOS_DATA } from "./datasets/caminhos-dataset.mjs";

/**
 * Chave de busca tolerante a acentos, separadores e caixa.
 * @param {any} value - Valor de entrada
 * @returns {string}
 */
export function normalizePathKey(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/**
 * Reduz um nome de Caminho ao seu título curto (ex: "O Caminho Do Andarilho" -> "Andarilho").
 * @param {string} name - Nome bruto do Caminho
 * @returns {string}
 */
export function shortenPathName(name) {
  return String(name || "")
    .replace(/^\s*o\s+caminho\s+d[oa]\s+/i, "")
    .trim();
}

/**
 * Rótulo de último recurso para um id de Caminho sem nome conhecido.
 * Evita exibir ids crus como "Path000300000000".
 * @param {string} id - Identificador do Caminho
 * @returns {string}
 */
export function fallbackPathLabel(id) {
  const raw = String(id || "").trim();
  if (!raw) return "Caminho";

  // PT: ids no formato "path000300000000" (documento do compêndio) não têm nome legível.
  if (/^path\d+$/i.test(raw)) return "Caminho Desconhecido";

  let base = raw;
  try {
    if (/^(Item|Compendium)\./i.test(raw)) {
      const doc = typeof globalThis.fromUuidSync === "function" ? globalThis.fromUuidSync(raw) : null;
      if (doc?.name) return shortenPathName(doc.name) || doc.name;
    }
  } catch (e) {
    // PT: UUID não resolvível (documento ausente) — segue para o tratamento por string.
  }
  if (raw.includes(".")) base = raw.split(".").pop();

  // PT: ids de caminho costumam ser slugs (ex: "andarilho", "o-caminho-do-devoto").
  return shortenPathName(
    base.replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/\b\w/g, ch => ch.toUpperCase())
  );
}

/**
 * Cria um descritor canônico de Caminho.
 * @param {{id?: string, name?: string, shortName?: string, icon?: string, order?: number}} data - Dados do Caminho
 * @returns {{id: string, name: string, fullName: string, icon: string, order: number}|null}
 */
export function createPathDescriptor(data) {
  const id = String(data?.id || "").trim();
  const fullName = String(data?.name || "").trim();
  const shortName = String(data?.shortName || "").trim();

  if (!id && !fullName) return null;

  const name = shortName || shortenPathName(fullName) || fullName || fallbackPathLabel(id);

  return {
    id: id || normalizePathKey(fullName),
    name,
    fullName: fullName || shortName || name,
    icon: data?.icon || "fa-solid fa-route",
    order: Number.isFinite(data?.order) ? data.order : 99
  };
}

/**
 * Registra um Caminho em um registro, criando aliases para todos os formatos conhecidos
 * (id, sem prefixo "path", nome curto, nome completo, slug e versão sem separadores).
 * @param {Map<string, object>} registry - Registro de Caminhos
 * @param {object} data - Dados do Caminho
 * @returns {object|null} Descritor registrado
 */
export function registerPathDescriptor(registry, data) {
  const entry = createPathDescriptor(data);
  if (!entry) return null;

  registry.set(normalizePathKey(entry.id), entry);

  const aliases = [entry.name, entry.fullName, entry.fullName ? shortenPathName(entry.fullName) : ""];
  for (const alias of aliases) {
    const key = normalizePathKey(alias);
    if (!key) continue;
    registry.set(key, entry);
    registry.set(key.replace(/[^a-z0-9]+/g, ""), entry);
  }

  if (/^path/i.test(entry.id)) {
    registry.set(normalizePathKey(entry.id.replace(/^path/i, "")), entry);
  }

  return entry;
}

/**
 * Busca um Caminho no registro tolerando id de documento, slug, nome ou UUID.
 * @param {Map<string, object>} registry - Registro de Caminhos
 * @param {any} raw - Valor bruto de identificação do Caminho
 * @returns {object|null} Descritor encontrado
 */
export function lookupPathDescriptor(registry, raw) {
  const value = String(raw ?? "").trim();
  if (!value) return null;

  const key = normalizePathKey(value);
  return registry.get(key)
    || registry.get(normalizePathKey(key.replace(/^path/i, "")))
    || registry.get(key.replace(/[^a-z0-9]+/g, ""))
    || registry.get(key.split(".").pop())
    || null;
}

/**
 * Resolve um `pathId`/slug/nome no descritor canônico do Caminho.
 * O `id` retornado é sempre o valor bruto, para que a opção do filtro e o `pathId` do item coincidam.
 * @param {Map<string, object>} registry - Registro de Caminhos
 * @param {any} rawPathId - Valor bruto vindo de `system.pathId`
 * @returns {{id: string, key: string, name: string, icon: string, order: number}}
 */
export function resolvePathDescriptor(registry, rawPathId) {
  const raw = String(rawPathId || "").trim();
  if (!raw) return { id: "", key: "", name: "", icon: "fa-solid fa-route", order: 99 };

  const known = lookupPathDescriptor(registry, raw);
  const key = normalizePathKey(raw);

  if (known) {
    return { id: raw, key, name: known.name, icon: known.icon, order: known.order };
  }

  return { id: raw, key, name: fallbackPathLabel(raw), icon: "fa-solid fa-route", order: 99 };
}

/**
 * Constrói o registro canônico a partir do dataset oficial de Caminhos.
 * @returns {Map<string, object>}
 */
function buildCanonicalPathRegistry() {
  const registry = new Map();
  let order = 1;
  for (const pathData of CAMINHOS_DATA) {
    if (pathData?.type !== "path") continue;
    registerPathDescriptor(registry, {
      id: pathData._id || pathData.id,
      name: pathData.name,
      order: order++
    });
  }
  return registry;
}

/** Registro canônico dos Caminhos de Gaia: Prelúdio. */
export const PATH_REGISTRY = buildCanonicalPathRegistry();

/** Lista canônica dos Caminhos conhecidos, na ordem oficial. */
export const CANONICAL_PATHS = Array.from(
  new Map(Array.from(PATH_REGISTRY.values()).map(path => [path.id, path])).values()
).sort((a, b) => (a.order || 99) - (b.order || 99));
