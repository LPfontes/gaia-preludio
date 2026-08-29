/**
 * ==============================================================================
 * GAIA: PRELÚDIO - ACTION AOE / MODELOS E ÁREAS DE EFEITO DE AÇÕES
 * ==============================================================================
 * PT: Posicionamento vetorial (PIXI), suporte a Regiões do Foundry v14+ e MeasuredTemplates,
 *     filtragem de alvos por disposição (todos, hostis, aliados).
 * EN: Vector positioning (PIXI), Foundry v14+ Region & MeasuredTemplate support,
 *     target filtering by disposition (all, hostile, friendly).
 */

/**
 * Filtra uma lista de tokens pela regra de disposição (todos, hostis, amigos).
 * @param {Token[]} tokens
 * @param {string} dispositionFilter
 * @param {Actor} [casterActor]
 * @returns {Token[]}
 */
export function filterTokensByDisposition(tokens, dispositionFilter = "all", casterActor = null) {
  if (!tokens || tokens.length === 0) return [];
  if (dispositionFilter === "all" || !dispositionFilter) return tokens;

  const casterToken = casterActor ? canvas.tokens.placeables.find(t => t.actor?.id === casterActor.id) : null;
  const casterDisp = casterToken?.document.disposition ?? (CONST.TOKEN_DISPOSITIONS?.FRIENDLY ?? 1);

  const filtered = tokens.filter(token => {
    const tokenDisp = token.document?.disposition ?? token.disposition;
    if (dispositionFilter === "hostile") {
      if (tokenDisp === (CONST.TOKEN_DISPOSITIONS?.HOSTILE ?? -1)) return true;
      if (casterToken && tokenDisp !== casterDisp && tokenDisp !== (CONST.TOKEN_DISPOSITIONS?.NEUTRAL ?? 0)) return true;
      return false;
    }
    if (dispositionFilter === "friendly") {
      if (tokenDisp === (CONST.TOKEN_DISPOSITIONS?.FRIENDLY ?? 1)) return true;
      if (casterToken && tokenDisp === casterDisp) return true;
      return false;
    }
    return true;
  });

  return filtered;
}

const toRad = (deg) => (deg * Math.PI) / 180;

/**
 * Extrai e converte as coordenadas de um evento de ponteiro/mouse para as coordenadas locais do canvas.
 * @param {Event|PIXI.FederatedPointerEvent|object} event
 * @returns {{ x: number, y: number } | null}
 */
export function getEventCanvasPosition(event) {
  let pos = null;
  if (event?.global) {
    pos = canvas.stage.toLocal(event.global);
  } else if (event?.data?.getLocalPosition) {
    pos = event.data.getLocalPosition(canvas.stage);
  }
  if (!pos || isNaN(pos.x)) pos = canvas.mousePosition;
  if (!pos || isNaN(pos.x)) return null;
  return pos;
}

/**
 * Constrói a definição geométrica de forma (shapeData) para o documento de Região (Foundry v14+).
 * @param {object} params
 * @param {string} params.shape - Formato geométrico (cone, line, ray, rectangle, square, box, circle)
 * @param {{ x: number, y: number }} params.snapped - Coordenadas ancoradas no grid
 * @param {number} params.radiusPixels - Raio em pixels na cena
 * @param {number} [params.direction=0] - Ângulo de rotação em graus
 * @param {number} [params.gridPixels=100] - Tamanho da célula de grade em pixels
 * @returns {object}
 */
export function buildRegionShapeData({ shape, snapped, radiusPixels, direction = 0, gridPixels = 100 }) {
  switch (shape) {
    case "cone": {
      const angle = Math.PI / 3; // 60 graus
      const rad = toRad(direction - 90);
      const startAngle = rad - angle / 2;
      const points = [snapped.x, snapped.y];
      const steps = 16;
      for (let i = 0; i <= steps; i++) {
        const a = startAngle + (i / steps) * angle;
        points.push(
          snapped.x + Math.cos(a) * radiusPixels,
          snapped.y + Math.sin(a) * radiusPixels
        );
      }
      return { type: "polygon", points };
    }
    case "line":
    case "ray": {
      const rad = toRad(direction);
      const perpRad = rad + Math.PI / 2;
      const halfWidth = gridPixels / 2;
      const cosP = Math.cos(perpRad) * halfWidth;
      const sinP = Math.sin(perpRad) * halfWidth;
      const endX = snapped.x + Math.cos(rad) * radiusPixels;
      const endY = snapped.y + Math.sin(rad) * radiusPixels;
      const points = [
        snapped.x + cosP, snapped.y + sinP,
        endX + cosP, endY + sinP,
        endX - cosP, endY - sinP,
        snapped.x - cosP, snapped.y - sinP
      ];
      return { type: "polygon", points };
    }
    case "rectangle":
    case "square":
    case "box":
      return { type: "rectangle", x: snapped.x, y: snapped.y, width: radiusPixels * 2, height: radiusPixels * 2 };
    case "circle":
    default:
      return { type: "circle", x: snapped.x, y: snapped.y, radius: radiusPixels };
  }
}

/**
 * Constrói os dados para criação de um MeasuredTemplate legado (Foundry v11/v12/v13).
 * @param {object} params
 * @param {string} params.shape - Formato geométrico
 * @param {{ x: number, y: number }} params.snapped - Coordenadas ancoradas
 * @param {number} params.distance - Distância da área
 * @param {number} [params.direction=0] - Direção em graus
 * @param {string} [params.fillColor="#942ce4"] - Cor de preenchimento
 * @returns {object}
 */
export function buildMeasuredTemplateData({ shape, snapped, distance, direction = 0, fillColor = "#942ce4" }) {
  let tType = "circle";
  switch (shape) {
    case "cone":
      tType = "cone";
      break;
    case "line":
    case "ray":
      tType = "ray";
      break;
    case "rectangle":
    case "square":
    case "box":
      tType = "rect";
      break;
    default:
      tType = "circle";
      break;
  }

  return {
    t: tType,
    user: game.user.id,
    distance,
    direction,
    x: snapped.x,
    y: snapped.y,
    fillColor
  };
}

/**
 * Cria e insere o documento persistido de área (Region no v14+ ou MeasuredTemplate no v11-v13) na cena.
 * @param {object} params
 * @returns {Promise<Document|null>}
 */
export async function createPlacedAoEDocument({ shape, snapped, radiusPixels, distance, direction = 0, fillColor = "#942ce4", gridPixels = 100 }) {
  const isV14Plus = (game.release?.generation ?? 12) >= 14;

  if (isV14Plus && CONFIG.Region && canvas.regions && canvas.scene.createEmbeddedDocuments) {
    const shapeData = buildRegionShapeData({ shape, snapped, radiusPixels, direction, gridPixels });
    const [created] = await canvas.scene.createEmbeddedDocuments("Region", [{
      name: "Área de Efeito",
      color: fillColor || "#942ce4",
      visibility: CONST.REGION_VISIBILITY?.ALWAYS ?? 0,
      displayMeasurements: true,
      shapes: [shapeData]
    }]);
    return created || null;
  }

  const templateData = buildMeasuredTemplateData({ shape, snapped, distance, direction, fillColor });
  const [created] = await canvas.scene.createEmbeddedDocuments("MeasuredTemplate", [templateData]);
  return created || null;
}

/**
 * Classe utilitária para prévia e posicionamento interativo de Área de Efeito no Canvas.
 * Utiliza overlay PIXI direto no canvas, compatível com a API nativa de Region (Foundry v12/v14+) e MeasuredTemplate (v11/v12/v13).
 */
export class GaiaAbilityTemplate extends PIXI.Container {
  constructor(data = {}) {
    super();
    this.data = {
      shape: data.shape || "circle",
      distance: Number(data.distance ?? 3),
      direction: Number(data.direction ?? 0),
      fillColor: data.fillColor || game.user?.color || "#942ce4",
      targetDisposition: data.targetDisposition || "all"
    };

    this.graphics = new PIXI.Graphics();
    this.addChild(this.graphics);
    this.x = 0;
    this.y = 0;
    this.eventMode = "none";
  }

  /**
   * Constrói a instância da prévia a partir dos dados do template.
   * @param {object} templateData
   * @returns {GaiaAbilityTemplate}
   */
  static fromData(templateData) {
    return new this(templateData);
  }

  /**
   * Redesenha a forma geométrica da área (círculo, cone, linha ou retângulo) na prévia.
   */
  refresh() {
    this.graphics.clear();
    const gridDistance = canvas.scene?.grid?.distance || 1;
    const gridPixels = canvas.scene?.grid?.size || 100;
    const radiusPixels = (this.data.distance / gridDistance) * gridPixels;

    // Converte cor hexadecimal de forma segura e resiliente
    let color = 0x942ce4;
    try {
      if (typeof foundry !== "undefined" && foundry.utils?.Color) {
        color = foundry.utils.Color.from(this.data.fillColor || "#942ce4").valueOf();
      } else if (typeof Color !== "undefined" && Color.from) {
        const c = Color.from(this.data.fillColor || "#942ce4");
        color = typeof c.valueOf === "function" ? c.valueOf() : (c.numeric ?? Number(c));
      } else {
        color = parseInt(String(this.data.fillColor || "942ce4").replace("#", ""), 16) || 0x942ce4;
      }
    } catch {
      color = 0x942ce4;
    }

    this.graphics.lineStyle(2, color, 0.85);
    this.graphics.beginFill(color, 0.25);

    switch (this.data.shape) {
      case "cone": {
        const angle = Math.PI / 3; // 60 graus
        const rad = toRad(this.data.direction - 90);
        const startAngle = rad - angle / 2;
        const endAngle = rad + angle / 2;
        this.graphics.moveTo(0, 0);
        this.graphics.arc(0, 0, radiusPixels, startAngle, endAngle);
        this.graphics.lineTo(0, 0);
        break;
      }
      case "line":
      case "ray": {
        const rad = toRad(this.data.direction);
        const endX = Math.cos(rad) * radiusPixels;
        const endY = Math.sin(rad) * radiusPixels;
        this.graphics.lineStyle(4, color, 0.9);
        this.graphics.moveTo(0, 0);
        this.graphics.lineTo(endX, endY);
        break;
      }
      case "rectangle":
      case "square":
      case "box":
        this.graphics.drawRect(-radiusPixels, -radiusPixels, radiusPixels * 2, radiusPixels * 2);
        break;
      case "circle":
      default:
        this.graphics.drawCircle(0, 0, radiusPixels);
        break;
    }

    this.graphics.endFill();
  }

  /**
   * Desenha a prévia do template e rastreia o cursor até o clique para posicionar na cena.
   * @returns {Promise<Document|null>}
   */
  async drawPreview() {
    const initialLayer = canvas.activeLayer;

    this.refresh();
    canvas.stage.addChild(this);

    return this.activatePreviewListeners(initialLayer);
  }

  /**
   * Ativa ouvintes de eventos para mover, rotacionar (scroll) e posicionar (clique).
   * @param {CanvasLayer} initialLayer
   * @returns {Promise<Document|null>}
   */
  activatePreviewListeners(initialLayer) {
    return new Promise((resolve) => {
      let moveTime = 0;
      const viewEl = canvas.app?.canvas || canvas.app?.view || window;

      const cleanup = () => {
        canvas.stage.off("pointermove", onMouseMove);
        canvas.stage.off("mousemove", onMouseMove);
        canvas.stage.off("pointerdown", onPointerDown);
        canvas.stage.off("mousedown", onPointerDown);

        if (viewEl && viewEl.removeEventListener) {
          viewEl.removeEventListener("contextmenu", onCancel);
          viewEl.removeEventListener("wheel", onWheel);
        }

        canvas.regions?.releaseAll?.();
        initialLayer?.activate?.();
        if (!this.destroyed) this.destroy({ children: true });
      };

      // 1. Move a prévia com o cursor
      const onMouseMove = (event) => {
        const now = Date.now();
        if (now - moveTime <= 16) return;
        moveTime = now;

        const pos = getEventCanvasPosition(event);
        if (!pos) return;

        const snapped = canvas.grid?.getSnappedPoint ? canvas.grid.getSnappedPoint(pos, { mode: CONST.GRID_SNAPPING_MODES?.CENTER ?? 1 }) : pos;
        this.x = snapped.x;
        this.y = snapped.y;
      };

      // 2. Confirma o posicionamento (Clique Esquerdo)
      const onConfirm = async (event) => {
        const pos = getEventCanvasPosition(event);
        const snapped = pos && canvas.grid?.getSnappedPoint ? canvas.grid.getSnappedPoint(pos, { mode: CONST.GRID_SNAPPING_MODES?.CENTER ?? 1 }) : (pos || { x: this.x, y: this.y });

        cleanup();

        const gridDistance = canvas.scene?.grid?.distance || 1;
        const gridPixels = canvas.scene?.grid?.size || 100;
        const radiusPixels = (this.data.distance / gridDistance) * gridPixels;

        const createdDoc = await createPlacedAoEDocument({
          shape: this.data.shape,
          snapped,
          radiusPixels,
          distance: this.data.distance,
          direction: this.data.direction,
          fillColor: this.data.fillColor,
          gridPixels
        });

        resolve(createdDoc || null);
      };

      // 3. Cancela o posicionamento (Clique Direito ou Esc)
      const onCancel = (event) => {
        if (event) {
          event.preventDefault?.();
          event.stopPropagation?.();
        }
        cleanup();
        resolve(null);
      };

      // 4. Despachante de clique (Ponteiro)
      const onPointerDown = (event) => {
        if (event?.button === 2) {
          onCancel(event);
        } else if (event?.button === 0 || event?.button === undefined) {
          onConfirm(event);
        }
      };

      // 5. Rotaciona o template com o Scroll do mouse (para cone / ray)
      const onWheel = (event) => {
        if (event.ctrlKey || event.altKey) return;
        event.preventDefault();
        event.stopPropagation();
        const delta = canvas.grid?.type > (CONST.GRID_TYPES?.GRIDLESS ?? 0) ? 15 : 5;
        const snap = event.shiftKey ? delta : delta * 2;
        this.data.direction = (this.data.direction + (event.deltaY > 0 ? snap : -snap)) % 360;
        this.refresh();
      };

      // Registra os ouvintes no canvas
      canvas.stage.on("pointermove", onMouseMove);
      canvas.stage.on("pointerdown", onPointerDown);

      if (viewEl && viewEl.addEventListener) {
        viewEl.addEventListener("contextmenu", onCancel);
        viewEl.addEventListener("wheel", onWheel, { passive: false });
      }
    });
  }
}

/**
 * Verifica se um ponto 2D está contido em uma forma geométrica de Região (Region shape).
 * @param {{ x: number, y: number }} point - Coordenadas do ponto a testar (ex: centro do token)
 * @param {object} shape - Definição da forma (circle, rectangle, polygon)
 * @returns {boolean}
 */
export function isPointInRegionShape(point, shape) {
  if (!point || !shape) return false;
  const shapeType = shape.type || "circle";

  switch (shapeType) {
    case "circle": {
      const dist = Math.hypot(point.x - shape.x, point.y - shape.y);
      return dist <= (shape.radius ?? 0);
    }
    case "rectangle": {
      const width = shape.width ?? (shape.radius ? shape.radius * 2 : 200);
      const height = shape.height ?? (shape.radius ? shape.radius * 2 : 200);
      const halfW = width / 2;
      const halfH = height / 2;
      return point.x >= (shape.x - halfW) && point.x <= (shape.x + halfW) &&
             point.y >= (shape.y - halfH) && point.y <= (shape.y + halfH);
    }
    case "polygon": {
      if (!Array.isArray(shape.points) || shape.points.length === 0) return false;
      const poly = new PIXI.Polygon(shape.points);
      return poly.contains(point.x, point.y);
    }
    default:
      return false;
  }
}

/**
 * Obtém tokens contidos a partir de um documento ou objeto de Região (Foundry v12/v14+).
 * @param {Region|RegionDocument|object} placedObject
 * @param {object} doc
 * @returns {Token[] | null}
 */
export function getTokensFromRegion(placedObject, doc) {
  // 1. Suporte a Coleção Nativa Region.tokens (Foundry v12/v14+)
  const regionTokensSet = placedObject?.tokens ?? doc?.tokens;
  if (regionTokensSet && regionTokensSet.size > 0) {
    const regionTokens = Array.from(regionTokensSet)
      .map(td => td.object || canvas.tokens.get(td.id || td._id))
      .filter(t => Boolean(t && !t.document?.hidden && t.actor));
    if (regionTokens.length > 0) return regionTokens;
  }

  // 2. Suporte a Formas de Região (RegionDocument.shapes)
  const shapes = doc?.shapes || placedObject?.shapes || [];
  if (shapes.length > 0) {
    const tokens = canvas.tokens.placeables.filter(t => !t.document.hidden && t.actor);
    return tokens.filter(token => {
      const center = token.center;
      return shapes.some(shape => isPointInRegionShape(center, shape));
    });
  }

  return null;
}

/**
 * Obtém tokens contidos a partir de um MeasuredTemplate clássico com shape PIXI.
 * @param {MeasuredTemplate|object} placedObject
 * @returns {Token[] | null}
 */
export function getTokensFromMeasuredTemplate(placedObject) {
  if (!placedObject?.shape) return null;

  const templatePos = {
    x: placedObject.document?.x ?? placedObject.x ?? 0,
    y: placedObject.document?.y ?? placedObject.y ?? 0
  };
  const tokens = canvas.tokens.placeables.filter(t => !t.document.hidden && t.actor);
  return tokens.filter(token => {
    const center = token.center;
    const localPoint = {
      x: center.x - templatePos.x,
      y: center.y - templatePos.y
    };
    return placedObject.shape.contains(localPoint.x, localPoint.y);
  });
}

/**
 * Fallback geométrico baseado na distância e raio em pixels para localizar tokens na área.
 * @param {object} placedObject
 * @param {object} doc
 * @param {object} [shapeData]
 * @returns {Token[]}
 */
export function getTokensFromGeometricFallback(placedObject, doc, shapeData = null) {
  const shapes = doc?.shapes || placedObject?.shapes || [];
  const firstShape = shapes[0];
  const posX = firstShape?.x ?? doc?.x ?? placedObject?.x ?? 0;
  const posY = firstShape?.y ?? doc?.y ?? placedObject?.y ?? 0;
  const gridDistance = canvas.scene?.grid?.distance || 1;
  const gridPixels = canvas.scene?.grid?.size || 100;
  const distMeters = shapeData?.distance || placedObject.distance || 3;
  const radiusPixels = firstShape?.radius ?? ((distMeters / gridDistance) * gridPixels);

  const tokens = canvas.tokens.placeables.filter(t => !t.document.hidden && t.actor);
  return tokens.filter(token => {
    const center = token.center;
    const dx = center.x - posX;
    const dy = center.y - posY;
    return Math.hypot(dx, dy) <= radiusPixels;
  });
}

/**
 * Retorna os tokens da cena atual que estão contidos na forma geométrica do template de área,
 * aplicando o filtro de disposição (todos, hostis, amigos).
 * @param {MeasuredTemplate|Region|RegionDocument} placedObject - Objeto de template ou região do canvas
 * @param {string} dispositionFilter - "all" | "hostile" | "friendly"
 * @param {Actor} [casterActor] - Ator conjurador (para determinar lealdade relativa)
 * @param {object} [shapeData] - Dados de formato e raio
 * @returns {Token[]}
 */
export function getTokensWithinAoETemplate(placedObject, dispositionFilter = "all", casterActor = null, shapeData = null) {
  if (!canvas.scene || !canvas.tokens || !placedObject) return [];

  const doc = placedObject?.document || placedObject;

  // 1. Tenta recuperar via documento/objeto de Região (v12/v14+)
  let containedTokens = getTokensFromRegion(placedObject, doc);

  // 2. Tenta recuperar via MeasuredTemplate com forma PIXI
  if (!containedTokens) {
    containedTokens = getTokensFromMeasuredTemplate(placedObject);
  }

  // 3. Fallback geométrico
  if (!containedTokens) {
    containedTokens = getTokensFromGeometricFallback(placedObject, doc, shapeData);
  }

  return filterTokensByDisposition(containedTokens || [], dispositionFilter, casterActor);
}

/**
 * Cria e posiciona um Template / Região na cena correspondente à área da ação.
 * @param {object} aoeData - Dados de areaOfEffect (shape, size, unit, targetDisposition)
 * @param {Actor} [casterActor] - Ator conjurador
 * @returns {Promise<Document|null>}
 */
export async function placeActionAoETemplate(aoeData, casterActor = null) {
  if (!canvas.scene || !aoeData) return null;
  const shape = aoeData.shape || "circle";
  const distance = Number(aoeData.size ?? 3);
  const targetDisposition = aoeData.targetDisposition || "all";

  const template = GaiaAbilityTemplate.fromData({
    shape,
    distance,
    targetDisposition,
    fillColor: game.user?.color || "#942ce4"
  });
  if (!template) return null;

  const placedDoc = await template.drawPreview();
  if (!placedDoc) return null;

  // Auto-seleciona os alvos contidos na área conforme regra de disposição
  const isV14Plus = (game.release?.generation ?? 12) >= 14;
  const placedObject = (isV14Plus && canvas.regions?.get(placedDoc.id)) || canvas.templates?.get(placedDoc.id) || placedDoc;

  if (placedObject) {
    const targets = getTokensWithinAoETemplate(placedObject, targetDisposition, casterActor, { distance, shape });
    if (targets.length > 0) {
      // Marca visualmente no canvas com o retículo de mira (equivalente à tecla 'T')
      targets.forEach((token, idx) => {
        if (typeof token.setTarget === "function") {
          token.setTarget(true, {
            user: game.user,
            releaseOthers: idx === 0,
            groupSelection: true
          });
        }
      });

      // Sincroniza alvos do usuário no Foundry (se necessário)
      if (typeof game.user?.broadcastActivity === "function") {
        game.user.broadcastActivity({ targets: game.user.targets?.ids ?? targets.map(t => t.id) });
      }

      const dispLabels = {
        all: "Todos",
        hostile: "Hostis/Inimigos",
        friendly: "Aliados"
      };
      const label = dispLabels[targetDisposition] || "Todos";
      ui.notifications?.info(`Área de Efeito: ${targets.length} alvo(s) [${label}] marcado(s)!`);
    } else {
      ui.notifications?.info("Área de Efeito posicionada (nenhum alvo correspondente encontrado dentro da área).");
    }
  }

  return placedDoc;
}
