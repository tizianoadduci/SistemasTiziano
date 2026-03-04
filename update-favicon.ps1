$content = Get-Content 'c:/Trabajo/Proyectos/Sistemas Tiziano/index.html' -Raw
$old = '<link rel="icon" type="image/svg+xml" href="favicon.svg">'
$new = '<link rel="shortcut icon" href="favicon.ico">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link rel="icon" type="image/svg+xml" href="favicon.svg">'
$content = $content -replace [regex]::Escape($old), $new
Set-Content -Path 'c:/Trabajo/Proyectos/Sistemas Tiziano/index.html' -Value $content
Write-Host "Updated index.html with favicon.ico"
