Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap(256,256)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.Clear([System.Drawing.Color]::FromArgb(10,10,15))
$font = New-Object System.Drawing.Font('Arial', 100, [System.Drawing.FontStyle]::Bold)
$brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255,215,0))
$g.DrawString('ST', $font, $brush, 20, 50)
$icon = [System.Drawing.Icon]::FromHandle($bmp.GetHicon())
$fs = [System.IO.File]::Create('c:/Trabajo/Proyectos/Sistemas Tiziano/favicon.ico')
$icon.Save($fs)
$fs.Close()
$g.Dispose()
$bmp.Dispose()
Write-Host "ICO created successfully"
