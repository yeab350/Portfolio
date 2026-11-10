# Script to generate public/og-image.png (1200x630, <300KB)
Add-Type -AssemblyName System.Drawing

$width = 1200
$height = 630
$bmp = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

# Background dark navy
$bgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 11, 15, 23))
$g.FillRectangle($bgBrush, 0, 0, $width, $height)

# Subtle decorative gradient / accent glow on the left edge
$glowBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(20, 16, 185, 129))
$g.FillEllipse($glowBrush, -100, -100, 500, 500)

# Card frame
$cardBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 19, 25, 38))
$cardPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 30, 41, 59), 2)
$rect = New-Object System.Drawing.Rectangle(40, 40, 1120, 550)
$g.FillRectangle($cardBrush, $rect)
$g.DrawRectangle($cardPen, $rect)

# Accent top bar on the card
$accentBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 16, 185, 129))
$g.FillRectangle($accentBrush, 40, 40, 1120, 6)

# Status pill
$pillBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(30, 16, 185, 129))
$pillPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(120, 16, 185, 129), 1)
$g.FillRectangle($pillBrush, 90, 95, 200, 36)
$g.DrawRectangle($pillPen, 90, 95, 200, 36)
$g.FillEllipse($accentBrush, 105, 108, 10, 10)

$fontStatus = New-Object System.Drawing.Font('Segoe UI', 11, [System.Drawing.FontStyle]::Bold)
$brushStatus = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 16, 185, 129))
$g.DrawString('AVAILABLE FOR WORK', $fontStatus, $brushStatus, 124, 103)

# Name
$fontName = New-Object System.Drawing.Font('Segoe UI', 44, [System.Drawing.FontStyle]::Bold)
$brushName = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 248, 250, 252))
$g.DrawString('Yeab T. Mekasha', $fontName, $brushName, 85, 155)

# Role / Headline
$fontRole = New-Object System.Drawing.Font('Segoe UI', 22, [System.Drawing.FontStyle]::Bold)
$brushRole = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 16, 185, 129))
$g.DrawString('Frontend Developer with full-stack experience', $fontRole, $brushRole, 90, 240)

# Bio line
$fontBio = New-Object System.Drawing.Font('Segoe UI', 16, [System.Drawing.FontStyle]::Regular)
$brushBio = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 148, 163, 184))
$g.DrawString('Software Engineering Student at HiLCoE | Addis Ababa, Ethiopia', $fontBio, $brushBio, 90, 290)

# Tech tags
$tags = @('React', 'TypeScript', 'Node.js', 'Next.js', 'PostgreSQL', 'Flutter')
$tagX = 90
$fontTag = New-Object System.Drawing.Font('Segoe UI', 12, [System.Drawing.FontStyle]::Bold)
$tagBgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 30, 41, 59))
$tagPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 51, 65, 85), 1)
$tagTextBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 226, 232, 240))

foreach ($t in $tags) {
    $size = $g.MeasureString($t, $fontTag)
    $w = [int]$size.Width + 24
    $g.FillRectangle($tagBgBrush, $tagX, 355, $w, 36)
    $g.DrawRectangle($tagPen, $tagX, 355, $w, 36)
    $g.DrawString($t, $fontTag, $tagTextBrush, ($tagX + 12), 363)
    $tagX += $w + 12
}

# Site URL at bottom
$fontUrl = New-Object System.Drawing.Font('Segoe UI', 15, [System.Drawing.FontStyle]::Bold)
$brushUrl = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 148, 163, 184))
$g.DrawString('yeabtmekasha.netlify.app', $fontUrl, $brushUrl, 90, 495)

# Profile Photo on right side (Circular clipped)
$profilePath = Join-Path $PSScriptRoot '..\public\Images\Profile.jpg'
if (Test-Path $profilePath) {
    $rawImg = [System.Drawing.Image]::FromFile($profilePath)
    $cx = 810
    $cy = 135
    $dia = 280

    # Draw offset ring
    $ringPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 16, 185, 129), 3)
    $g.DrawEllipse($ringPen, $cx - 8, $cy - 8, $dia + 16, $dia + 16)

    # Circular clipping path for photo
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path.AddEllipse($cx, $cy, $dia, $dia)
    $g.SetClip($path)
    $g.DrawImage($rawImg, $cx, $cy, $dia, $dia)
    $g.ResetClip()

    # Border around circle
    $borderPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 19, 25, 38), 4)
    $g.DrawEllipse($borderPen, $cx, $cy, $dia, $dia)
    $rawImg.Dispose()
}

$outputPath = Join-Path $PSScriptRoot '..\public\og-image.png'
$bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()
Write-Host "OG image saved to $outputPath"

