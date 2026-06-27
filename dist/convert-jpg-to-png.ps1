# convert-jpg-to-png.ps1
# Script para converter todas as imagens JPG para PNG

# Define o caminho da pasta
$folderPath = "C:\Users\HP\notion-elite-2026\public\images"

# Verifica se a pasta existe
if (-not (Test-Path $folderPath)) {
    Write-Host "❌ Pasta não encontrada: $folderPath" -ForegroundColor Red
    exit
}

Write-Host "📁 A processar imagens em: $folderPath" -ForegroundColor Cyan

# Carrega a assembly necessária
Add-Type -AssemblyName System.Drawing

# Contadores
$total = 0
$convertidos = 0
$erros = 0

# Procura todos os ficheiros JPG/JPG/JPEG
$jpgFiles = Get-ChildItem -Path $folderPath -Include "*.jpg", "*.jpeg", "*.JPG", "*.JPEG" -Recurse

if ($jpgFiles.Count -eq 0) {
    Write-Host "❌ Nenhuma imagem JPG encontrada." -ForegroundColor Yellow
    exit
}

Write-Host "🔍 Encontradas $($jpgFiles.Count) imagens JPG" -ForegroundColor Green

foreach ($jpgFile in $jpgFiles) {
    $total++
    try {
        # Carrega a imagem
        $img = [System.Drawing.Image]::FromFile($jpgFile.FullName)
        
        # Define o caminho do ficheiro PNG
        $pngPath = [System.IO.Path]::ChangeExtension($jpgFile.FullName, ".png")
        
        # Guarda como PNG
        $img.Save($pngPath, [System.Drawing.Imaging.ImageFormat]::Png)
        $img.Dispose()
        
        # Remove o ficheiro JPG original (opcional)
        # Remove-Item $jpgFile.FullName
        
        $convertidos++
        Write-Host "✅ Convertido: $($jpgFile.Name) → $([System.IO.Path]::GetFileName($pngPath))" -ForegroundColor Green
    }
    catch {
        $erros++
        Write-Host "❌ Erro ao converter: $($jpgFile.Name) - $_" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "══════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "📊 RESUMO DA CONVERSÃO" -ForegroundColor White
Write-Host "══════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "✅ Convertidos: $convertidos" -ForegroundColor Green
Write-Host "❌ Erros: $erros" -ForegroundColor Red
Write-Host "📁 Total processado: $total" -ForegroundColor Yellow
Write-Host ""
Write-Host "✅ Conversão concluída!" -ForegroundColor Green