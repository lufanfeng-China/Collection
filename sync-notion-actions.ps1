[CmdletBinding()]
param(
  [string]$Token,
  [string]$DatabaseId = "ce0e76be-a520-4af9-ba1a-1ee2f4f15b0f",
  [string]$NotionVersion = "2026-03-11",
  [string]$OutDir = "C:\Users\Sky.Lu\Project\Project\Collection"
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
    [ValidateSet("GET", "POST")]
    [string]$Method,
    [string]$Endpoint,
    [hashtable]$Headers,
    $Body = $null
  )

  $uri = "https://api.notion.com$Endpoint"
  if ($Method -eq "GET") {
    return Invoke-RestMethod -Uri $uri -Method Get -Headers $Headers
  }

  $payload = if ($null -eq $Body) { "{}" } else { $Body | ConvertTo-Json -Depth 20 }
  return Invoke-RestMethod -Uri $uri -Method Post -Headers $Headers -Body $payload
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

function Get-PropertyObject {
  param(
    [hashtable]$Properties,
    [string[]]$Aliases
  )

  foreach ($alias in $Aliases) {
    if ($Properties.ContainsKey($alias)) {
      return $Properties[$alias]
    }
  }

  return $null
}

function Get-PropertyValue {
  param($Property)

  if ($null -eq $Property) {
    return ""
  }

  switch ($Property.type) {
    "title" { return Get-PlainText $Property.title }
    "rich_text" { return Get-PlainText $Property.rich_text }
    "status" { return [string]$Property.status.name }
    "select" { return [string]$Property.select.name }
    "multi_select" { return (($Property.multi_select | ForEach-Object { $_.name }) -join ", ") }
    "number" {
      if ($null -eq $Property.number) { return "" }
      return [string]$Property.number
    }
    "url" { return [string]$Property.url }
    "email" { return [string]$Property.email }
    "phone_number" { return [string]$Property.phone_number }
    "checkbox" { return [string]$Property.checkbox }
    "formula" {
      if ($null -eq $Property.formula) { return "" }
      switch ($Property.formula.type) {
        "string" { return [string]$Property.formula.string }
        "number" {
          if ($null -eq $Property.formula.number) { return "" }
          return [string]$Property.formula.number
        }
        "boolean" { return [string]$Property.formula.boolean }
        default { return "" }
      }
    }
    default { return "" }
  }
}

function Query-NotionDataSourcePages {
  param(
    [string]$DataSourceId,
    [hashtable]$Headers
  )

  $all = @()
  $cursor = $null

  do {
    $body = @{
      page_size = 100
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

if ([string]::IsNullOrWhiteSpace($Token)) {
  $Token = $env:NOTION_ACCESS_TOKEN
}

if ([string]::IsNullOrWhiteSpace($Token)) {
  throw "Provide -Token or set NOTION_ACCESS_TOKEN before running this script."
}

$normalizedDatabaseId = Normalize-NotionId $DatabaseId
$headers = Get-NotionHeaders -AccessToken $Token -Version $NotionVersion

$database = Invoke-NotionApi -Method GET -Endpoint "/v1/databases/$normalizedDatabaseId" -Headers $headers
if (-not $database.data_sources -or $database.data_sources.Count -lt 1) {
  throw "No accessible data source was returned for database $normalizedDatabaseId."
}

$dataSourceId = [string]$database.data_sources[0].id
$dataSource = Invoke-NotionApi -Method GET -Endpoint "/v1/data_sources/$dataSourceId" -Headers $headers
$pages = Query-NotionDataSourcePages -DataSourceId $dataSourceId -Headers $headers

$items = @()
foreach ($page in $pages) {
  $properties = @{}
  foreach ($prop in $page.properties.PSObject.Properties) {
    $properties[$prop.Name] = $prop.Value
  }

  $item = [ordered]@{
    system       = Get-PropertyValue (Get-PropertyObject -Properties $properties -Aliases @("System", "Legal Entity"))
    changePoint  = Get-PropertyValue (Get-PropertyObject -Properties $properties -Aliases @("Change Point", "ChangePoint", "Name", "Title"))
    remark       = Get-PropertyValue (Get-PropertyObject -Properties $properties -Aliases @("Remark", "Remarks", "Note", "Notes", "Description"))
    fte          = Get-PropertyValue (Get-PropertyObject -Properties $properties -Aliases @("FTE"))
    cost         = Get-PropertyValue (Get-PropertyObject -Properties $properties -Aliases @("Cost"))
    status       = Get-PropertyValue (Get-PropertyObject -Properties $properties -Aliases @("Status"))
    type         = Get-PropertyValue (Get-PropertyObject -Properties $properties -Aliases @("Type"))
    step         = Get-PropertyValue (Get-PropertyObject -Properties $properties -Aliases @("Step"))
    i            = Get-PropertyValue (Get-PropertyObject -Properties $properties -Aliases @("Process Step", "ProcessStep", "I"))
    processStep  = Get-PropertyValue (Get-PropertyObject -Properties $properties -Aliases @("Process Step", "ProcessStep", "I"))
    notionPageId = [string]$page.id
    notionUrl    = [string]$page.url
  }

  if ([string]::IsNullOrWhiteSpace($item.changePoint) -and [string]::IsNullOrWhiteSpace($item.system)) {
    continue
  }

  $items += [pscustomobject]$item
}

$payload = [ordered]@{
  sourceFile    = "Notion database $normalizedDatabaseId"
  dataSourceId  = $dataSourceId
  syncedAt      = (Get-Date).ToString("s")
  items         = $items
}

$jsonPath = Join-Path $OutDir "action-summary.json"
$jsPath = Join-Path $OutDir "action-summary-data.js"

$jsonContent = $payload | ConvertTo-Json -Depth 20
[System.IO.File]::WriteAllText($jsonPath, $jsonContent, [System.Text.UTF8Encoding]::new($false))
[System.IO.File]::WriteAllText($jsPath, "window.ACTION_SUMMARY = $jsonContent;`n", [System.Text.UTF8Encoding]::new($false))

[pscustomobject]@{
  databaseId   = $normalizedDatabaseId
  dataSourceId = $dataSourceId
  itemCount    = $items.Count
  jsonPath     = $jsonPath
  jsPath       = $jsPath
} | ConvertTo-Json -Depth 10
