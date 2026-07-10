$ErrorActionPreference = "Stop"

Set-Location -LiteralPath $PSScriptRoot
$env:NEXT_BASE_PATH = "/hero"

$node = Join-Path $env:USERPROFILE "scoop\apps\nodejs-lts\current\node.exe"
if (-not (Test-Path $node)) {
  $node = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
}
if (-not (Test-Path $node)) {
  $node = "node"
}

& $node .\node_modules\next\dist\bin\next start -H 127.0.0.1 -p 18150
