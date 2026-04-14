[CmdletBinding()]
param(
  [string]$Token,
  [string]$DatabaseId = "5de07913-56f9-435d-aae7-5b0d3a004bc8",
  [string]$NotionVersion = "2026-03-11",
  [string]$SourceJson = "C:\Users\Sky.Lu\Project\Project\Collection\action-summary.json"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Normalize-NotionId {
  param([string]$Id)
  if ([string]::IsNullOrWhiteSpace($Id)) {
    return $null
  }

  $raw = ($Id -replace "-", "").Trim()
  if ($raw.Length -eq 32) {
    return "{0}-{1}-{2}-{3}-{4}" -f $raw.Substring(0, 8), $raw.Substring(8, 4), $raw.Substring(12, 4), $raw.Substring(16, 4), $raw.Substring(20, 12)
  }

  return $Id.Trim()
}

function Get-NotionHeaders {
  param(
    [string]$AccessToken,
    [string]$Version
  )

  return @{
    "Authorization"  = "Bearer $AccessToken"
    "Notion-Version" = $Version
    "Content-Type"   = "application/json"
  }
}

function Invoke-NotionApi {
  param(
    [ValidateSet("GET", "POST", "PATCH")]
    [string]$Method,
    [string]$Endpoint,
    [hashtable]$Headers,
    $Body = $null
  )

  $uri = "https://api.notion.com$Endpoint"
  if ($Method -eq "GET") {
    return Invoke-RestMethod -Uri $uri -Method Get -Headers $Headers
  }

  $payload = if ($null -eq $Body) { "{}" } else { $Body | ConvertTo-Json -Depth 30 }
  return Invoke-RestMethod -Uri $uri -Method $Method -Headers $Headers -Body $payload
}

function Get-PlainText {
  param($Items)
  if ($null -eq $Items) {
    return ""
  }

  $parts = @()
  foreach ($item in $Items) {
    if ($item.plain_text) {
      $parts += [string]$item.plain_text
    }
  }
  return ($parts -join "").Trim()
}

function Query-DataSourcePages {
  param(
    [string]$DataSourceId,
    [hashtable]$Headers
  )

  $all = @()
  $cursor = $null

  do {
    $body = @{
      page_size   = 100
      result_type = "page"
    }
    if ($cursor) {
      $body.start_cursor = $cursor
    }

    $response = Invoke-NotionApi -Method POST -Endpoint "/v1/data_sources/$DataSourceId/query" -Headers $Headers -Body $body
    if ($response.results) {
      $all += @($response.results)
    }
    $cursor = $response.next_cursor
  } while ($response.has_more -and $cursor)

  return ,$all
}

function Resolve-PropertyName {
  param(
    [hashtable]$SchemaMap,
    [string[]]$Aliases,
    [string]$Type = ""
  )

  foreach ($alias in $Aliases) {
    foreach ($key in $SchemaMap.Keys) {
      if ($key -eq $alias) {
        if (-not $Type -or $SchemaMap[$key].type -eq $Type) {
          return $key
        }
      }
    }
  }

  if ($Type) {
    foreach ($key in $SchemaMap.Keys) {
      if ($SchemaMap[$key].type -eq $Type) {
        return $key
      }
    }
  }

  return $null
}

function To-NotionNumber {
  param($Value)
  if ($null -eq $Value -or $Value -eq "") {
    return $null
  }
  try {
    return [double]$Value
  }
  catch {
    return $null
  }
}

function Build-PropertyValue {
  param(
    [string]$SchemaType,
    $Value
  )

  switch ($SchemaType) {
    "title" {
      return @{
        title = @(
          @{
            text = @{
              content = [string]$Value
            }
          }
        )
      }
    }
    "rich_text" {
      return @{
        rich_text = @(
          @{
            text = @{
              content = [string]$Value
            }
          }
        )
      }
    }
    "number" {
      return @{
        number = (To-NotionNumber $Value)
      }
    }
    "select" {
      if ([string]::IsNullOrWhiteSpace([string]$Value)) {
        return @{ select = $null }
      }
      return @{
        select = @{
          name = [string]$Value
        }
      }
    }
    "status" {
      if ([string]::IsNullOrWhiteSpace([string]$Value)) {
        return @{ status = $null }
      }
      return @{
        status = @{
          name = [string]$Value
        }
      }
    }
    "url" {
      return @{ url = [string]$Value }
    }
    default {
      return @{
        rich_text = @(
          @{
            text = @{
              content = [string]$Value
            }
          }
        )
      }
    }
  }
}

function Build-Key {
  param(
    [string]$ChangePoint,
    [string]$Step,
    [string]$System
  )
  return ("{0}||{1}||{2}" -f $ChangePoint.Trim(), $Step.Trim(), $System.Trim()).ToLowerInvariant()
}

if ([string]::IsNullOrWhiteSpace($Token)) {
  $Token = $env:NOTION_ACCESS_TOKEN
}

if ([string]::IsNullOrWhiteSpace($Token)) {
  throw "Provide -Token or set NOTION_ACCESS_TOKEN before running this script."
}

if (-not (Test-Path -LiteralPath $SourceJson)) {
  throw "Source JSON not found: $SourceJson"
}

$normalizedDatabaseId = Normalize-NotionId $DatabaseId
$headers = Get-NotionHeaders -AccessToken $Token -Version $NotionVersion

$database = Invoke-NotionApi -Method GET -Endpoint "/v1/databases/$normalizedDatabaseId" -Headers $headers
if (-not $database.data_sources -or $database.data_sources.Count -lt 1) {
  throw "No accessible data source returned for database $normalizedDatabaseId."
}

$dataSourceId = [string]$database.data_sources[0].id
$dataSource = Invoke-NotionApi -Method GET -Endpoint "/v1/data_sources/$dataSourceId" -Headers $headers
$existingPages = Query-DataSourcePages -DataSourceId $dataSourceId -Headers $headers

$schemaMap = @{}
foreach ($prop in $dataSource.properties.PSObject.Properties) {
  $schemaMap[$prop.Name] = $prop.Value
}

$propTitle = Resolve-PropertyName -SchemaMap $schemaMap -Aliases @("Change Point", "ChangePoint", "Name", "Title") -Type "title"
$propSystem = Resolve-PropertyName -SchemaMap $schemaMap -Aliases @("System", "Legal Entity")
$propRemark = Resolve-PropertyName -SchemaMap $schemaMap -Aliases @("Remark", "Remarks", "Note", "Notes", "Description")
$propFte = Resolve-PropertyName -SchemaMap $schemaMap -Aliases @("FTE")
$propCost = Resolve-PropertyName -SchemaMap $schemaMap -Aliases @("Cost")
$propStatus = Resolve-PropertyName -SchemaMap $schemaMap -Aliases @("Status")
$propType = Resolve-PropertyName -SchemaMap $schemaMap -Aliases @("Type")
$propStep = Resolve-PropertyName -SchemaMap $schemaMap -Aliases @("Step")
$propProcessStep = Resolve-PropertyName -SchemaMap $schemaMap -Aliases @("Process Step", "ProcessStep", "I")

if (-not $propTitle) {
  throw "Could not find a title property in the Notion data source."
}

$source = Get-Content -LiteralPath $SourceJson -Raw -Encoding UTF8 | ConvertFrom-Json
$sourceItems = @($source.items)

$existingMap = @{}
foreach ($page in $existingPages) {
  $properties = @{}
  foreach ($prop in $page.properties.PSObject.Properties) {
    $properties[$prop.Name] = $prop.Value
  }

  $titleText = if ($properties.ContainsKey($propTitle)) { Get-PlainText $properties[$propTitle].title } else { "" }
  $stepText = if ($propStep -and $properties.ContainsKey($propStep)) {
    switch ($properties[$propStep].type) {
      "select" { [string]$properties[$propStep].select.name }
      "status" { [string]$properties[$propStep].status.name }
      default { Get-PlainText $properties[$propStep].rich_text }
    }
  } else { "" }
  $systemText = if ($propSystem -and $properties.ContainsKey($propSystem)) {
    switch ($properties[$propSystem].type) {
      "select" { [string]$properties[$propSystem].select.name }
      "status" { [string]$properties[$propSystem].status.name }
      default { Get-PlainText $properties[$propSystem].rich_text }
    }
  } else { "" }

  $key = Build-Key -ChangePoint $titleText -Step $stepText -System $systemText
  $existingMap[$key] = [string]$page.id
}

$created = 0
$updated = 0

foreach ($item in $sourceItems) {
  $properties = @{}

  $properties[$propTitle] = Build-PropertyValue -SchemaType $schemaMap[$propTitle].type -Value $item.changePoint

  if ($propSystem) {
    $properties[$propSystem] = Build-PropertyValue -SchemaType $schemaMap[$propSystem].type -Value $item.system
  }
  if ($propRemark) {
    $properties[$propRemark] = Build-PropertyValue -SchemaType $schemaMap[$propRemark].type -Value $item.remark
  }
  if ($propFte) {
    $properties[$propFte] = Build-PropertyValue -SchemaType $schemaMap[$propFte].type -Value $item.fte
  }
  if ($propCost) {
    $properties[$propCost] = Build-PropertyValue -SchemaType $schemaMap[$propCost].type -Value $item.cost
  }
  if ($propStatus) {
    $properties[$propStatus] = Build-PropertyValue -SchemaType $schemaMap[$propStatus].type -Value $item.status
  }
  if ($propType) {
    $properties[$propType] = Build-PropertyValue -SchemaType $schemaMap[$propType].type -Value $item.type
  }
  if ($propStep) {
    $properties[$propStep] = Build-PropertyValue -SchemaType $schemaMap[$propStep].type -Value $item.step
  }
  if ($propProcessStep) {
    $properties[$propProcessStep] = Build-PropertyValue -SchemaType $schemaMap[$propProcessStep].type -Value $item.processStep
  }

  $key = Build-Key -ChangePoint ([string]$item.changePoint) -Step ([string]$item.step) -System ([string]$item.system)

  if ($existingMap.ContainsKey($key)) {
    $pageId = $existingMap[$key]
    $body = @{
      properties = $properties
    }
    Invoke-NotionApi -Method PATCH -Endpoint "/v1/pages/$pageId" -Headers $headers -Body $body | Out-Null
    $updated += 1
  }
  else {
    $body = @{
      parent = @{
        type = "data_source_id"
        data_source_id = $dataSourceId
      }
      properties = $properties
    }
    Invoke-NotionApi -Method POST -Endpoint "/v1/pages" -Headers $headers -Body $body | Out-Null
    $created += 1
  }
}

[pscustomobject]@{
  databaseId = $normalizedDatabaseId
  dataSourceId = $dataSourceId
  sourceItems = $sourceItems.Count
  created = $created
  updated = $updated
} | ConvertTo-Json -Depth 10
