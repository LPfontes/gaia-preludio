import os
import sys
from PIL import Image

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    root_dir = os.path.abspath(os.path.join(base_dir, ".."))
    
    input_dir = sys.argv[1] if len(sys.argv) > 1 else os.path.join(root_dir, "assets", "PNG")
    output_dir = sys.argv[2] if len(sys.argv) > 2 else os.path.join(root_dir, "assets", "conditions")
    target_size = (128, 128)

    print("=" * 50)
    print("Gaia: Prelúdio - Conversor de Ícones para WebP (Python)")
    print("=" * 50)
    print(f"Diretório de Entrada : {input_dir}")
    print(f"Diretório de Saída   : {output_dir}")
    print(f"Dimensões Alvo       : {target_size[0]}x{target_size[1]}px")
    print("-" * 50)

    if not os.path.exists(input_dir):
        print(f"[ERRO] Diretório de entrada não encontrado: {input_dir}")
        sys.exit(1)

    os.makedirs(output_dir, exist_ok=True)

    files = [f for f in os.listdir(input_dir) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
    if not files:
        print("[AVISO] Nenhuma imagem encontrada para converter.")
        return

    print(f"Encontradas {len(files)} imagens para converter...\n")

    success_count = 0
    error_count = 0

    for file in files:
        input_path = os.path.join(input_dir, file)
        base_name, _ = os.path.splitext(file)
        output_path = os.path.join(output_dir, f"{base_name}.webp")

        try:
            with Image.open(input_path) as img:
                # Converte para RGBA para garantir canal alfa/transparência
                img_rgba = img.convert("RGBA")
                # Redimensiona preservando proporção
                img_rgba.thumbnail(target_size, Image.Resampling.LANCZOS)
                
                # Cria uma imagem 128x128 transparente e centraliza
                canvas = Image.new("RGBA", target_size, (0, 0, 0, 0))
                offset_x = (target_size[0] - img_rgba.width) // 2
                offset_y = (target_size[1] - img_rgba.height) // 2
                canvas.paste(img_rgba, (offset_x, offset_y), img_rgba)
                
                canvas.save(output_path, "WEBP", quality=90, method=6)
                print(f"[OK] {file} -> {base_name}.webp (128x128)")
                success_count += 1
        except Exception as e:
            print(f"[FALHA] Erro ao converter {file}: {e}")
            error_count += 1

    print("\n" + "-" * 50)
    print(f"Concluído: {success_count} convertidas, {error_count} erros.")
    print(f"Salvo em: {output_dir}")
    print("=" * 50)

if __name__ == "__main__":
    main()
