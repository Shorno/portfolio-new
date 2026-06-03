# Sync repository descriptions on GitHub (no clone).
# Requires GITHUB_TOKEN with write access to your repos:
#   Classic PAT: scope "repo" (or "public_repo" for public repos only)
#   Fine-grained: Repository administration → Read and write
#
# Usage (from repo root):
#   $env:GITHUB_TOKEN = "ghp_..."
#   .\scripts\sync-github-repo-descriptions.ps1
#
# Only updates repos you own (owner = Shorno) that currently have an empty description.

$ErrorActionPreference = "Stop"

if (-not $env:GITHUB_TOKEN) {
  $envPath = Join-Path (Split-Path $PSScriptRoot -Parent) ".env"
  if (Test-Path $envPath) {
    Get-Content $envPath | ForEach-Object {
      if ($_ -match '^\s*GITHUB_TOKEN\s*=\s*(.+)\s*$') {
        $env:GITHUB_TOKEN = $matches[1].Trim().Trim('"').Trim("'")
      }
    }
  }
}

if (-not $env:GITHUB_TOKEN) {
  Write-Error "Set GITHUB_TOKEN in the environment or in .env (needs repo write scope)."
}

$owner = "Shorno"

$descriptions = @{
  "portfolio-new" = "Editorial portfolio — Next.js 16, Tailwind v4, GitHub API archive."
  "bikalpo-project" = "B2B commerce monorepo — Next.js storefront, Hono API, Drizzle, Neon."
  "bright-tutor" = "Multi-tenant tutoring SaaS — Turborepo, oRPC, Expo, subdomain roles."
  "stock-management" = "Inventory & POS frontend — Vite, React 19, TanStack, react-pdf invoices."
  "stock-management-backend" = "Stock Management API — Hono on Bun, Drizzle, Better-Auth, PDF receipts."
  "stock-management-server" = "Alternate backend tree for stock-management (Hono + Drizzle)."
  "padma-service-project" = "Padma Service — Next.js CMS + Hono/Bun API, service catalog & approvals."
  "prepify" = "Exam-prep platform — Next.js 16, AI (Google SDK), Drizzle, Better-Auth."
  "organic-food-store" = "Organic grocery storefront — Next.js 16, i18n, Drizzle, Cloudinary."
  "ecommerce-laptop" = "Laptop e-commerce — Next.js 16, admin CMS, TipTap, Drizzle, shadcn."
  "ubaky-demo" = "Ubaky merchant UI demo — React, Vite, Ant Design (restaurant ops)."
  "mavencave-demo" = "MavenCave marketing SPA — React 19, Vite, Tailwind v4, Motion."
  "mavencave" = "MavenCave project workspace (earlier iteration)."
  "rockdale-updated" = "Rockdale brand site — Vite, React 19, GSAP, styled-components."
  "portfolio" = "Earlier portfolio iteration (pre portfolio-new)."
  "Shorno.github.io" = "GitHub Pages profile / legacy personal site."
  "dsa" = "Data structures & algorithms practice (TypeScript)."
  "ph-sql-assignment" = "Programming Hero SQL assignment."
  "Assignment-2-PH_Shorno" = "Programming Hero assignment 2."
  "PH-Assignment-3" = "Programming Hero assignment 3."
  "ph-assignment-5" = "Programming Hero assignment 5."
  "ph-assignment-7" = "Programming Hero assignment 7."
  "ph_assignment_8" = "Programming Hero assignment 8."
  "ph-assignment-09-003" = "Programming Hero assignment 9."
  "Assignment_1-PH" = "Programming Hero — first assignment."
  "assignment-1" = "Programming Hero — TypeScript fundamentals."
  "influencer-gears-practice" = "HTML/CSS layout practice (Influencer Gears)."
  "g3-architects-practice" = "HTML/CSS layout practice (G3 Architects)."
  "new-year-offer_PH_Practice" = "Programming Hero — New Year offer landing page."
  "vanilla-portfolio-v1" = "First vanilla HTML/CSS portfolio."
  "dice-roller" = "Browser dice roller — small JS DOM exercise."
  "JS-Dice-roll" = "JavaScript dice game practice."
  "level1-abstract" = "Early abstract JS exercises."
  "shorno" = "Personal experiments & scratch files."
  "balance360-backend" = "Balance360 API — Node/Express companion to the fitness frontend."
  "antique-chronicles-backend" = "Antique Chronicles API — artifact catalog backend."
  "visa-navigator-backend" = "Visa Navigator API — Express, MongoDB."
  "github-readme-streak-stats" = "Fork — GitHub readme streak stats (upstream project)."
}

$headers = @{
  Authorization = "Bearer $($env:GITHUB_TOKEN)"
  Accept = "application/vnd.github+json"
  "X-GitHub-Api-Version" = "2022-11-28"
}

# Verify token
$user = Invoke-RestMethod -Uri "https://api.github.com/user" -Headers $headers
Write-Host "Authenticated as $($user.login)"

$ok = 0; $skip = 0; $fail = 0

foreach ($repo in $descriptions.Keys) {
  $desc = $descriptions[$repo]
  if ($desc.Length -gt 350) { $desc = $desc.Substring(0, 350) }

  try {
    $current = Invoke-RestMethod -Uri "https://api.github.com/repos/$owner/$repo" -Headers $headers
    if (-not [string]::IsNullOrWhiteSpace($current.description)) {
      Write-Host "skip (already set): $owner/$repo"
      $skip++
      continue
    }
    $body = @{ description = $desc } | ConvertTo-Json -Compress
    Invoke-RestMethod -Uri "https://api.github.com/repos/$owner/$repo" -Method PATCH -Headers $headers -Body $body -ContentType "application/json" | Out-Null
    Write-Host "updated: $owner/$repo"
    $ok++
    Start-Sleep -Milliseconds 400
  } catch {
    $code = if ($_.Exception.Response) { [int]$_.Exception.Response.StatusCode } else { 0 }
    Write-Host "failed ($code): $owner/$repo"
    $fail++
  }
}

Write-Host ""
Write-Host "Done. updated=$ok skipped=$skip failed=$fail"
if ($fail -gt 0) {
  Write-Host "403/401 usually means the token needs the 'repo' scope (classic) or Repository administration write (fine-grained)."
}
