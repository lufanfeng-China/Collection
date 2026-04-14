[CmdletBinding()]
param(
  [string]$Token,
  [string]$ResourceId,
  [ValidateSet("auto", "page", "database")]
  [string]$ResourceType = "auto",
  [string]$NotionVersion = "2026-03-11"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Write-Section {
  param([string]$Title)
  Write-Host ""
  Write-Host "=== $Title ===" -ForegroundColor Cyan
}

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

function Invoke-NotionGet {
  param(
    [string]$Endpoint,
    [string]$AccessToken,
    [string]$Version
  )

  $headers = @{
    "Authorization"   = "Bearer $AccessToken"
    "Notion-Version"  = $Version
    "Content-Type"    = "application/json"
  }

  $uri = "https://api.notion.com$Endpoint"
  try {
    $response = Invoke-RestMethod -Uri $uri -Method Get -Headers $headers
    return [pscustomobject]@{
      Ok       = $true
      Endpoint = $Endpoint
      Payload  = $response
    }
  }
  catch {
    $statusCode = $null
    $body = $null
    if ($_.Exception.Response) {
      try { $statusCode = [int]$_.Exception.Response.StatusCode } catch {}
      try {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $body = $reader.ReadToEnd()
        $reader.Close()
      } catch {}
    }

    return [pscustomobject]@{
      Ok         = $false
      Endpoint   = $Endpoint
      StatusCode = $statusCode
      ErrorText  = $_.Exception.Message
      Body       = $body
    }
  }
}

if ([string]::IsNullOrWhiteSpace($Token)) {
  $Token = $env:NOTION_ACCESS_TOKEN
}

if ([string]::IsNullOrWhiteSpace($Token)) {
  throw "Provide -Token or set NOTION_ACCESS_TOKEN first."
}

Write-Section "Token Test"
$tokenResult = Invoke-NotionGet -Endpoint "/v1/users/me" -AccessToken $Token -Version $NotionVersion
if ($tokenResult.Ok) {
  Write-Host "Token is valid." -ForegroundColor Green
  $tokenResult.Payload | ConvertTo-Json -Depth 10
}
else {
  Write-Host "Token test failed." -ForegroundColor Red
  [pscustomobject]@{
    endpoint = $tokenResult.Endpoint
    status   = $tokenResult.StatusCode
    error    = $tokenResult.ErrorText
    body     = $tokenResult.Body
  } | ConvertTo-Json -Depth 10
  exit 1
}

if (-not [string]::IsNullOrWhiteSpace($ResourceId)) {
  $normalizedId = Normalize-NotionId -Id $ResourceId
  $endpoints =
    switch ($ResourceType) {
      "page" { @("/v1/pages/$normalizedId") }
      "database" { @("/v1/databases/$normalizedId") }
      default { @("/v1/pages/$normalizedId", "/v1/databases/$normalizedId") }
    }

  Write-Section "Resource Test"
  foreach ($endpoint in $endpoints) {
    $resourceResult = Invoke-NotionGet -Endpoint $endpoint -AccessToken $Token -Version $NotionVersion
    if ($resourceResult.Ok) {
      Write-Host "Resource access confirmed." -ForegroundColor Green
      $resourceResult.Payload | ConvertTo-Json -Depth 12
      exit 0
    }
    else {
      [pscustomobject]@{
        endpoint = $resourceResult.Endpoint
        status   = $resourceResult.StatusCode
        error    = $resourceResult.ErrorText
        body     = $resourceResult.Body
      } | ConvertTo-Json -Depth 10
    }
  }

  Write-Host "Resource test did not succeed. Check whether the page or database has been shared with the integration." -ForegroundColor Yellow
}
