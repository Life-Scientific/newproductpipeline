# PowerShell script to import EPPO data via Supabase REST API
param(
    [Parameter(Mandatory=$true)]
    [string]$ServiceRoleKey
)

$supabaseUrl = "https://ls-main-vikram-branch.supabase.co"
$headers = @{
    "apikey" = $ServiceRoleKey
    "Authorization" = "Bearer $ServiceRoleKey"
    "Content-Type" = "application/json"
    "Prefer" = "return=minimal"
}

# Read enriched data
$jsonPath = Join-Path $PSScriptRoot "enriched_eppo_data.json"
$data = Get-Content $jsonPath -Raw | ConvertFrom-Json

# Filter individuals (skip first 5 already imported)
$individuals = $data.codes | Where-Object { $_.eppo_type -eq "individual_crop" } | Select-Object -Skip 5

Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "EPPO DATA IMPORT VIA REST API" -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Importing $($individuals.Count) individuals in batches of 50..." -ForegroundColor Yellow
Write-Host ""

$batchSize = 50
$imported = 0
$errors = 0

for ($i = 0; $i -lt $individuals.Count; $i += $batchSize) {
    $batch = $individuals[$i..[Math]::Min($i + $batchSize - 1, $individuals.Count - 1)]
    
    # Prepare records
    $records = @()
    foreach ($code in $batch) {
        $parentCode = if ($code.parents -and $code.parents.Count -gt 0) { $code.parents[0] } else { $null }
        
        $record = @{
            eppo_code = $code.eppo_code
            latin_name = $code.latin_name
            english_name = $code.english_name
            german_name = $code.german_name
            french_name = $code.french_name
            italian_name = $code.italian_name
            spanish_name = $code.spanish_name
            portuguese_name = $code.portuguese_name
            dutch_name = $code.dutch_name
            russian_name = $code.russian_name
            swedish_name = $code.swedish_name
            czech_name = $code.czech_name
            hungarian_name = $code.hungarian_name
            polish_name = $code.polish_name
            slovak_name = $code.slovak_name
            croatian_name = $code.croatian_name
            ukrainian_name = $code.ukrainian_name
            bulgarian_name = $code.bulgarian_name
            lithuanian_name = $code.lithuanian_name
            catalan_name = $code.catalan_name
            danish_name = $code.danish_name
            slovene_name = $code.slovene_name
            turkish_name = $code.turkish_name
            eppo_type = $code.eppo_type
            classification = $code.classification
            eppo_datatype = $code.eppo_datatype
            parent_eppo_code = $parentCode
            is_parent = $code.is_parent
            hierarchy_level = if ($code.hierarchy_level) { $code.hierarchy_level } else { 0 }
            is_active = $true
        }
        $records += $record
    }
    
    # Send batch
    try {
        $body = $records | ConvertTo-Json -Depth 10
        $response = Invoke-RestMethod -Uri "$supabaseUrl/rest/v1/eppo_codes" -Method Post -Headers $headers -Body $body -ErrorAction Stop
        
        $imported += $batch.Count
        $batchNum = [Math]::Floor($i / $batchSize) + 1
        Write-Host "✓ Batch $batchNum : Imported $imported / $($individuals.Count)" -ForegroundColor Green
    }
    catch {
        $errors++
        $batchNum = [Math]::Floor($i / $batchSize) + 1
        $errorMsg = $_.Exception.Message
        Write-Host "✗ Batch $batchNum : Error - $errorMsg" -ForegroundColor Red
    }
    
    Start-Sleep -Milliseconds 500
}

Write-Host ""
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "IMPORT COMPLETE" -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "Imported: $imported" -ForegroundColor Green
$errorColor = if ($errors -gt 0) { "Red" } else { "Green" }
Write-Host "Errors: $errors" -ForegroundColor $errorColor
Write-Host ""

# Verify count
try {
    $countUri = "$supabaseUrl/rest/v1/eppo_codes?select=count"
    $countResponse = Invoke-RestMethod -Uri $countUri -Method Get -Headers $headers
    $totalCount = $countResponse.count
    Write-Host "Total EPPO codes in database: $totalCount" -ForegroundColor Cyan
    
    if ($totalCount -eq 533) {
        Write-Host "SUCCESS! All 533 codes imported!" -ForegroundColor Green
    }
}
catch {
    Write-Host "Could not verify final count" -ForegroundColor Yellow
}

