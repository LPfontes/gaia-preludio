import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Diretórios padrão (relativos à raiz do sistema gaia-preludio)
const rootDir = path.resolve(__dirname, "..");
const defaultInputDir = path.join(rootDir, "assets", "PNG");
const defaultOutputDir = path.join(rootDir, "assets", "conditions");

// Argumentos opcionais da linha de comando:
// node scripts/convert-webp.mjs [inputDir] [outputDir] [width] [height]
const args = process.argv.slice(2);
const inputDir = args[0] ? path.resolve(args[0]) : defaultInputDir;
const outputDir = args[1] ? path.resolve(args[1]) : defaultOutputDir;
const width = Number(args[2]) || 128;
const height = Number(args[3]) || 128;

async function main() {
  console.log("==================================================");
  console.log("Gaia: Prelúdio - Conversor de Ícones para WebP");
  console.log("==================================================");
  console.log(`Diretório de Entrada : ${inputDir}`);
  console.log(`Diretório de Saída   : ${outputDir}`);
  console.log(`Dimensões Alvo       : ${width}x${height}px`);
  console.log("--------------------------------------------------");

  if (!fs.existsSync(inputDir)) {
    console.error(`[ERRO] Diretório de entrada não encontrado: ${inputDir}`);
    process.exit(1);
  }

  // Tenta carregar a biblioteca sharp
  let sharp;
  try {
    const sharpModule = await import("sharp");
    sharp = sharpModule.default || sharpModule;
  } catch (err) {
    console.error("[ERRO] A biblioteca 'sharp' é necessária para a conversão.");
    console.log("\nPara instalar, execute no terminal:");
    console.log("  npm install -D sharp\n");
    process.exit(1);
  }

  // Cria o diretório de saída caso não exista
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = fs.readdirSync(inputDir).filter((file) => {
    return [".png", ".jpg", ".jpeg"].includes(path.extname(file).toLowerCase());
  });

  if (files.length === 0) {
    console.log("[AVISO] Nenhuma imagem PNG/JPG encontrada no diretório de entrada.");
    return;
  }

  console.log(`Encontradas ${files.length} imagens para converter...\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const baseName = path.parse(file).name;
    const outputPath = path.join(outputDir, `${baseName}.webp`);

    try {
      await sharp(inputPath)
        .resize(width, height, {
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .webp({
          quality: 90,
          alphaQuality: 100,
          effort: 6
        })
        .toFile(outputPath);

      console.log(`[OK] ${file} -> ${baseName}.webp (128x128)`);
      successCount++;
    } catch (conversionError) {
      console.error(`[FALHA] Erro ao converter ${file}:`, conversionError.message);
      errorCount++;
    }
  }

  console.log("\n--------------------------------------------------");
  console.log(`Processo concluído: ${successCount} convertidas, ${errorCount} erros.`);
  console.log(`Arquivos salvos em: ${outputDir}`);
  console.log("==================================================");
}

main();
