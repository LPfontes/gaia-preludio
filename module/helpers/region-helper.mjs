/**
 * ==============================================================================
 * GAIA: PRELÚDIO - REGION HELPER / AUXILIAR DE REGIÕES DO FOUNDRY VTT
 * ==============================================================================
 * Função auxiliar para criar Documentos de Região (RegionDocument / Scene Region)
 * no Foundry VTT v12/v14 com suporte a múltiplos formatos e conversão de tamanho.
 */

/**
 * Converte um valor de distância/tamanho para pixels com base na grade da cena.
 * 
 * @param {number} value - O valor a ser convertido.
 * @param {object} [scene] - A cena do Foundry (opcional, usa canvas.scene por padrão).
 * @param {"distance"|"grid"|"pixels"} [unit="distance"] - Tipo de unidade do valor.
 * @returns {number} O tamanho convertido em pixels.
 */
export function convertToPixels(value, scene = null, unit = "distance") {
  if (unit === "pixels") return value;
  
  const currentScene = scene ?? canvas?.scene;
  const gridSize = currentScene?.grid?.size ?? 100;
  const gridDistance = currentScene?.grid?.distance ?? 1;

  if (unit === "grid") {
    return value * gridSize;
  }

  // unit === "distance" (metros / pés / unidades da cena)
  return (value / gridDistance) * gridSize;
}

/**
 * Cria a definição de forma (shape) para a Região com base no formato e tamanho.
 * 
 * @param {number|object} size - Tamanho da região (distância numérico ou objeto {width, height, radiusX, radiusY, etc}).
 * @param {string} format - Formato da região ("circle", "rectangle", "cone", "line", "ellipse", "polygon").
 * @param {object} [options={}] - Opções de geometria e posicionamento.
 * @param {number} [options.x=0] - Coordenada X central ou de origem.
 * @param {number} [options.y=0] - Coordenada Y central ou de origem.
 * @param {number} [options.rotation=0] - Rotação em graus (0 a 360).
 * @param {number} [options.coneAngle=60] - Ângulo do cone em graus (para formato "cone").
 * @param {number} [options.lineWidth=1] - Largura da linha em unidades de distância (para formato "line").
 * @param {object} [options.scene] - Cena de referência para escala.
 * @param {"distance"|"grid"|"pixels"} [options.unit="distance"] - Unidade do tamanho.
 * @returns {object} Objeto de forma válido para o campo `shapes` do RegionDocument.
 */
export function createRegionShape(size, format, options = {}) {
  const {
    x = 0,
    y = 0,
    rotation = 0,
    coneAngle = 60,
    lineWidth = 1,
    scene = null,
    unit = "distance"
  } = options;

  const fmt = (format || "").toLowerCase().trim();

  // CÍRCULO / ESFERA
  if (["circle", "circulo", "círculo", "sphere", "esfera", "radius", "raio"].includes(fmt)) {
    const radiusVal = typeof size === "number" ? size : (size.radius ?? size.width ?? 1);
    const radiusPixels = convertToPixels(radiusVal, scene, unit);
    return {
      type: "circle",
      x,
      y,
      radius: radiusPixels,
      hole: false
    };
  }

  // RETÂNGULO / QUADRADO / CAIXA
  if (["rectangle", "retangulo", "retângulo", "square", "quadrado", "box", "cube", "cubo"].includes(fmt)) {
    let widthVal = typeof size === "number" ? size : (size.width ?? size.x ?? 1);
    let heightVal = typeof size === "number" ? size : (size.height ?? size.y ?? widthVal);

    const wPixels = convertToPixels(widthVal, scene, unit);
    const hPixels = convertToPixels(heightVal, scene, unit);

    return {
      type: "rectangle",
      x: x - wPixels / 2,
      y: y - hPixels / 2,
      width: wPixels,
      height: hPixels,
      rotation,
      hole: false
    };
  }

  // ELIPSE
  if (["ellipse", "elipse"].includes(fmt)) {
    const radXVal = typeof size === "object" ? (size.radiusX ?? size.width ?? 1) : size;
    const radYVal = typeof size === "object" ? (size.radiusY ?? size.height ?? radXVal) : size;

    return {
      type: "ellipse",
      x,
      y,
      radiusX: convertToPixels(radXVal, scene, unit),
      radiusY: convertToPixels(radYVal, scene, unit),
      rotation,
      hole: false
    };
  }

  // CONE (Representado como Polígono)
  if (["cone"].includes(fmt)) {
    const lengthVal = typeof size === "number" ? size : (size.length ?? size.radius ?? 1);
    const lengthPixels = convertToPixels(lengthVal, scene, unit);

    const radRotation = (rotation * Math.PI) / 180;
    const halfAngleRad = ((coneAngle / 2) * Math.PI) / 180;

    const startAngle = radRotation - halfAngleRad;
    const endAngle = radRotation + halfAngleRad;

    // Vértice 0: Origem do cone
    const points = [x, y];

    // Adiciona pontos ao longo do arco do cone para suavidade
    const segments = 8;
    for (let i = 0; i <= segments; i++) {
      const a = startAngle + (endAngle - startAngle) * (i / segments);
      const px = x + lengthPixels * Math.cos(a);
      const py = y + lengthPixels * Math.sin(a);
      points.push(px, py);
    }

    return {
      type: "polygon",
      points,
      hole: false
    };
  }

  // LINHA / RAIO (Representado como Polígono Rotacionado)
  if (["line", "linha", "ray", "raio"].includes(fmt)) {
    const lengthVal = typeof size === "number" ? size : (size.length ?? size.height ?? 1);
    const widthVal = typeof size === "object" ? (size.width ?? lineWidth) : lineWidth;

    const lengthPixels = convertToPixels(lengthVal, scene, unit);
    const widthPixels = convertToPixels(widthVal, scene, unit);

    const halfW = widthPixels / 2;
    const radRotation = (rotation * Math.PI) / 180;

    // Pontos do retângulo relativo à origem (0,0) estendendo ao longo do eixo X (comprimento)
    const localVertices = [
      { x: 0, y: -halfW },
      { x: lengthPixels, y: -halfW },
      { x: lengthPixels, y: halfW },
      { x: 0, y: halfW }
    ];

    const points = [];
    for (const v of localVertices) {
      const rx = x + (v.x * Math.cos(radRotation) - v.y * Math.sin(radRotation));
      const ry = y + (v.x * Math.sin(radRotation) + v.y * Math.cos(radRotation));
      points.push(rx, ry);
    }

    return {
      type: "polygon",
      points,
      hole: false
    };
  }

  // POLÍGONO PERSONALIZADO
  if (["polygon", "poligono", "polígono"].includes(fmt)) {
    const pointsArray = Array.isArray(size) ? size : (size?.points ?? []);
    return {
      type: "polygon",
      points: pointsArray,
      hole: false
    };
  }

  // Formato padrão fallback (Círculo)
  const defaultRadius = convertToPixels(typeof size === "number" ? size : 1, scene, unit);
  return {
    type: "circle",
    x,
    y,
    radius: defaultRadius,
    hole: false
  };
}

/**
 * Cria ou gera dados para uma Class Region (RegionDocument) do Foundry VTT.
 * 
 * @param {number|object} size - Tamanho da região (ex: 5 para 5 metros, ou {width: 10, height: 10}).
 * @param {string} format - Formato da região ("circle", "rectangle", "cone", "line", "ellipse", "polygon").
 * @param {object} [options={}] - Configurações e metadados opcionais da região.
 * @param {string} [options.name="Região de Efeito"] - Nome da região.
 * @param {string} [options.color="#ff5500"] - Cor hexadecimal da região.
 * @param {number} [options.x] - Posição X (se omitido, usa a posição central da cena ou token selecionado).
 * @param {number} [options.y] - Posição Y (se omitido, usa a posição central da cena ou token selecionado).
 * @param {number} [options.rotation=0] - Ângulo de rotação em graus.
 * @param {number} [options.coneAngle=60] - Ângulo do cone em graus (se formato for "cone").
 * @param {number} [options.lineWidth=1] - Largura da linha (se formato for "line").
 * @param {"distance"|"grid"|"pixels"} [options.unit="distance"] - Unidade de medida ("distance" = metros/pés, "grid" = quadrados, "pixels" = px).
 * @param {object} [options.elevation] - Faixa de elevação { bottom: number|null, top: number|null }.
 * @param {Array} [options.behaviors=[]] - Comportamentos (RegionBehavior) a serem anexados.
 * @param {Scene} [options.scene] - Cena alvo (padrão: canvas.scene).
 * @param {boolean} [options.create=true] - Se true, cria o Documento na cena ativa; se false, retorna apenas o objeto de dados.
 * @returns {Promise<RegionDocument|object>} A instância do RegionDocument criada ou o objeto de dados.
 */
export async function createRegion(size, format, options = {}) {
  const scene = options.scene ?? canvas?.scene;

  if (options.create !== false && !scene) {
    throw new Error("createRegion: Nenhuma cena ativa (canvas.scene) foi encontrada para criar a Região.");
  }

  // Define centro padrão se X e Y não forem fornecidos
  let defaultX = options.x;
  let defaultY = options.y;

  if (defaultX === undefined || defaultY === undefined) {
    const controlledToken = canvas?.tokens?.controlled?.[0];
    if (controlledToken) {
      defaultX = defaultX ?? controlledToken.center.x;
      defaultY = defaultY ?? controlledToken.center.y;
    } else if (canvas?.dimensions) {
      defaultX = defaultX ?? canvas.dimensions.width / 2;
      defaultY = defaultY ?? canvas.dimensions.height / 2;
    } else {
      defaultX = defaultX ?? 0;
      defaultY = defaultY ?? 0;
    }
  }

  // Gera a forma geométrica principal
  const shape = createRegionShape(size, format, {
    ...options,
    x: defaultX,
    y: defaultY,
    scene
  });

  // Constrói os dados do documento Region
  const regionData = {
    name: options.name ?? `Região (${format})`,
    color: options.color ?? "#ff5500",
    elevation: options.elevation ?? { bottom: null, top: null },
    shapes: [shape],
    behaviors: options.behaviors ?? []
  };

  // Se create for false, apenas retorna o payload de dados
  if (options.create === false) {
    return regionData;
  }

  // Cria o RegionDocument na cena
  const createdDocs = await scene.createEmbeddedDocuments("Region", [regionData]);
  return createdDocs[0];
}
