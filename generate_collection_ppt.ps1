$ErrorActionPreference = 'Stop'

function OfficeColor([int]$r, [int]$g, [int]$b) {
  return $r + 256 * $g + 65536 * $b
}

function Add-TextBox {
  param(
    $Slide,
    [double]$Left,
    [double]$Top,
    [double]$Width,
    [double]$Height,
    [string]$Text,
    [double]$FontSize = 18,
    [bool]$Bold = $false,
    [int]$Color = 0,
    [int]$Align = 1,
    [string]$FontName = 'Aptos'
  )
  $shape = $Slide.Shapes.AddTextbox(1, [single]$Left, [single]$Top, [single]$Width, [single]$Height)
  $shape.TextFrame.TextRange.Text = $Text
  $shape.TextFrame.TextRange.Font.Name = $FontName
  $shape.TextFrame.TextRange.Font.Size = $FontSize
  $shape.TextFrame.TextRange.Font.Bold = $(if ($Bold) { -1 } else { 0 })
  $shape.TextFrame.TextRange.Font.Color.RGB = $Color
  $shape.TextFrame.TextRange.ParagraphFormat.Alignment = $Align
  $shape.TextFrame.WordWrap = -1
  return $shape
}

function Add-Card {
  param($Slide,[double]$Left,[double]$Top,[double]$Width,[double]$Height,[int]$Fill,[int]$Line,[bool]$Rounded = $true)
  $shapeType = if ($Rounded) { 5 } else { 1 }
  $shape = $Slide.Shapes.AddShape([int]$shapeType, [single]$Left, [single]$Top, [single]$Width, [single]$Height)
  $shape.Fill.ForeColor.RGB = $Fill
  $shape.Line.ForeColor.RGB = $Line
  $shape.Line.Weight = 1
  return $shape
}

function Add-MetricCard {
  param($Slide,[double]$Left,[double]$Top,[double]$Width,[double]$Height,[string]$Label,[string]$Value,[string[]]$Lines,[int]$Fill,[int]$Accent,[int]$ValueColor)
  Add-Card $Slide $Left $Top $Width $Height $Fill $script:LineColor $true | Out-Null
  $accentShape = $Slide.Shapes.AddShape(1, [single]$Left, [single]$Top, [single]6, [single]$Height)
  $accentShape.Fill.ForeColor.RGB = $Accent
  $accentShape.Line.Visible = 0
  Add-TextBox $Slide ($Left + 12) ($Top + 10) ($Width - 18) 16 $Label.ToUpper() 10 $true $script:MutedColor 1 | Out-Null
  Add-TextBox $Slide ($Left + 12) ($Top + 28) ($Width - 18) 24 $Value 20 $true $ValueColor 1 'Aptos Display' | Out-Null
  Add-TextBox $Slide ($Left + 12) ($Top + 56) ($Width - 18) 32 ($Lines -join "`r`n") 10.5 $false $script:TextColor 1 | Out-Null
}

function Add-RolloutCard {
  param($Slide,[double]$Left,[double]$Top,[double]$Width,[double]$Height,[string]$Title,[string]$Meta,[string]$Actions,[string]$Note,[int]$Accent)
  Add-Card $Slide $Left $Top $Width $Height $script:WhiteColor $script:LineColor $true | Out-Null
  $accentShape = $Slide.Shapes.AddShape(1, [single]$Left, [single]$Top, [single]4, [single]$Height)
  $accentShape.Fill.ForeColor.RGB = $Accent
  $accentShape.Line.Visible = 0
  Add-TextBox $Slide ($Left + 10) ($Top + 8) ($Width - 18) 18 $Title 13 $true $Accent 1 'Aptos Display' | Out-Null
  Add-TextBox $Slide ($Left + 10) ($Top + 26) ($Width - 18) 18 $Meta 9.8 $true $script:TextColor 1 | Out-Null
  Add-TextBox $Slide ($Left + 10) ($Top + 48) 44 14 'Actions:' 9.8 $true $script:MutedColor 1 | Out-Null
  Add-TextBox $Slide ($Left + 56) ($Top + 47) ($Width - 66) 32 $Actions 9.8 $false $script:TextColor 1 | Out-Null
  if ($Note) {
    Add-TextBox $Slide ($Left + 10) ($Top + 84) 36 14 'Note:' 9.8 $true $script:MutedColor 1 | Out-Null
    Add-TextBox $Slide ($Left + 46) ($Top + 83) ($Width - 56) 26 $Note 9.6 $false $script:TextColor 1 | Out-Null
  }
}

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$output = Join-Path $root 'Collection Dashboard.pptx'

$script:TextColor = OfficeColor 24 24 27
$script:MutedColor = OfficeColor 95 102 114
$script:LineColor = OfficeColor 220 226 234
$script:WhiteColor = OfficeColor 255 255 255
$script:BlueFill = OfficeColor 230 239 250
$script:GreenFill = OfficeColor 226 243 236
$script:TealFill = OfficeColor 223 241 242
$script:Blue = OfficeColor 56 114 194
$script:Green = OfficeColor 47 145 98
$script:Teal = OfficeColor 42 145 153
$script:Orange = OfficeColor 225 139 16
$script:GrayBar = OfficeColor 124 124 124
$script:DarkGreen = OfficeColor 31 122 85
$script:Navy = OfficeColor 36 69 112

$ppt = New-Object -ComObject PowerPoint.Application
$ppt.Visible = -1
$presentation = $ppt.Presentations.Add()
$presentation.PageSetup.SlideWidth = 960
$presentation.PageSetup.SlideHeight = 540

# Slide 1
$slide = $presentation.Slides.Add(1, 12)
Add-TextBox $slide 40 24 820 36 '2026-2027 Accounting Cost Reduction Plan' 24 $true $script:Navy 1 'Aptos Display' | Out-Null
Add-TextBox $slide 40 60 860 24 'This plan aims to reduce Accounting operating cost through a combination of GBS migration and AI/Automation-led process optimization across AP/AR, GL, Collection and Invoicing.' 11.2 $false $script:MutedColor 1 | Out-Null
Add-MetricCard $slide 28 110 288 92 'Savings Potential' '$0.54M - 1.23M' @('Low case without GBS: $544.2K', 'High case with GBS: $1.12M') $script:BlueFill $script:Blue $script:Navy
Add-MetricCard $slide 336 110 288 92 'Investment & Return' '$150K / 0.8 - 2.6 yrs' @('AI & Automation investment: $150K', 'ROI range: 0.8 to 2.6 years') $script:GreenFill $script:Green $script:Navy
Add-MetricCard $slide 644 110 288 92 'Impact Application' '5 + 3' @('Existing: PCS / VAT / AR Portal / MDM / Credit', 'New: Enterprise WeChat / AI / RPA') $script:TealFill $script:Teal $script:Navy
Add-RolloutCard $slide 28 232 430 122 '1. AP / AR' 'Kickoff: Apr 2026 | Existed Cost: $1,715K | Saving Target: $520K' 'Total HC 34, convert the AP/AR team to the GBS model; keep 8 HC in Shanghai and move 23 HC to GBS.' '$20K / HC or 50% of China Cost, 9 months transition cycle' $script:Blue
Add-RolloutCard $slide 480 232 430 122 '2. Collection' 'Kickoff: April 2026 | Existed Cost: $1,570K | Saving Target: $314K' 'Total HC 36, deliver around 20% savings through AI/Automation-enabled productivity improvement.' 'Detailed scope to be identified.' $script:Teal
Add-RolloutCard $slide 28 374 430 122 '3. GL' 'Kickoff: July 2026 | Existed Cost: $1,923K | Saving Target: $219K' 'Total HC 28, convert part of the GL team (14 FTE) to the GBS model after process mapping and operating-model validation.' '100% band 5 and 30% band 6 move to GBS' $script:Green
Add-RolloutCard $slide 480 374 430 122 '4. Invoicing' 'Kickoff: April 2026 | Existed Cost: $398K | Saving Target: $70K' 'Total HC 9, leverage AI/Automation to improve invoicing efficiency by about 20%.' 'Keeping local execution for compliance' $script:Orange

# Slide 2
$slide = $presentation.Slides.Add(2, 12)
Add-TextBox $slide 32 24 360 34 'Business Current Status' 24 $true $script:TextColor 1 'Aptos Display' | Out-Null
Add-TextBox $slide 32 58 430 22 'Current FTE allocation by business step and legal entity, based on the latest workload snapshot.' 11.2 $false $script:MutedColor 1 | Out-Null
$tableShape = $slide.Shapes.AddTable(12, 7, 30, 100, 610, 388)
$table = $tableShape.Table
$headers = @('Step','ITSC','AA','AB Service','CD Service','BJBP+CTC','HK')
$rows = @(
  @('01 Master Data Prep','0.27','0.01','0.02','0.01','0.01','0.04'),
  @('02 Invoicing Support Delivery','10.50','0.09','0.22','0.07','0.02','0.12'),
  @('03 Reconciliation and Dispute','2.66','0.21','0.52','0.63','0.09','0.21'),
  @('04 Collection and Commitment','10.60','0.57','1.08','1.10','0.13','0.72'),
  @('05 Cash Application','2.22','0.19','0.13','0.19','0.09','0.07'),
  @('06 Notes or Special Receipts','0.00','0.00','0.00','0.01','0.00','0.14'),
  @('07 Escalation and Legal','0.11','0.01','0.01','0.01','0.01','-'),
  @('08 Write-off','0.12','0.00','0.00','0.01','0.00','0.02'),
  @('09 Reporting and Improvement','0.72','0.01','0.02','0.03','0.00','0.02'),
  @('10 Others','0.24','0.00','0.03','0.07','0.02','0.00')
)
$totals = @('Total FTE','27.44','1.09','2.04','2.12','0.38','1.33')
$widths = @(190, 70, 56, 70, 70, 74, 56)
for ($i = 1; $i -le 7; $i++) { $table.Columns.Item($i).Width = $widths[$i - 1] }
for ($c = 1; $c -le 7; $c++) {
  $cell = $table.Cell(1, $c)
  $cell.Shape.Fill.ForeColor.RGB = OfficeColor 242 243 245
  $cell.Shape.TextFrame.TextRange.Text = $headers[$c - 1]
  $cell.Shape.TextFrame.TextRange.Font.Size = 9.5
  $cell.Shape.TextFrame.TextRange.Font.Bold = -1
  $cell.Shape.TextFrame.TextRange.Font.Color.RGB = $script:MutedColor
}
for ($r = 0; $r -lt $rows.Count; $r++) {
  for ($c = 0; $c -lt 7; $c++) {
    $cell = $table.Cell($r + 2, $c + 1)
    $cell.Shape.TextFrame.TextRange.Text = [string]$rows[$r][$c]
    $cell.Shape.TextFrame.TextRange.Font.Size = 9.4
    $cell.Shape.TextFrame.TextRange.Font.Bold = $(if ($c -eq 1) { -1 } else { 0 })
    $cell.Shape.TextFrame.TextRange.Font.Color.RGB = $(if ($c -eq 1) { OfficeColor 209 103 47 } else { $script:TextColor })
  }
}
for ($c = 0; $c -lt 7; $c++) {
  $cell = $table.Cell(12, $c + 1)
  $cell.Shape.Fill.ForeColor.RGB = OfficeColor 248 248 248
  $cell.Shape.TextFrame.TextRange.Text = [string]$totals[$c]
  $cell.Shape.TextFrame.TextRange.Font.Size = 9.4
  $cell.Shape.TextFrame.TextRange.Font.Bold = -1
  $cell.Shape.TextFrame.TextRange.Font.Color.RGB = $script:TextColor
}
Add-Card $slide 668 100 230 72 $script:WhiteColor $script:LineColor $true | Out-Null
Add-TextBox $slide 684 116 90 16 'Total FTE' 11 $false $script:MutedColor 1 | Out-Null
Add-TextBox $slide 684 138 120 24 '34.400' 22 $true $script:TextColor 1 'Aptos Display' | Out-Null
Add-Card $slide 668 184 230 88 $script:WhiteColor $script:LineColor $true | Out-Null
Add-TextBox $slide 684 200 90 16 'Target FTE' 11 $false $script:MutedColor 1 | Out-Null
Add-TextBox $slide 684 222 120 24 '6.880' 22 $true $script:TextColor 1 'Aptos Display' | Out-Null
Add-TextBox $slide 684 250 110 14 '20% of Total FTE' 10 $false $script:MutedColor 1 | Out-Null
Add-Card $slide 668 286 230 202 $script:WhiteColor $script:LineColor $true | Out-Null
Add-TextBox $slide 684 302 90 16 'FCST FTE' 11 $false $script:MutedColor 1 | Out-Null
Add-TextBox $slide 684 324 120 24 '3.544' 22 $true $script:TextColor 1 'Aptos Display' | Out-Null
Add-TextBox $slide 684 366 120 14 'Under Review      3.000' 10.5 $false $script:TextColor 1 | Out-Null
Add-TextBox $slide 684 392 120 14 'Pending Approval  0.056' 10.5 $false $script:TextColor 1 | Out-Null
Add-TextBox $slide 684 418 120 14 'Approved          0.000' 10.5 $false $script:TextColor 1 | Out-Null
Add-TextBox $slide 684 444 120 14 'Pending Quote     0.488' 10.5 $false $script:TextColor 1 | Out-Null
Add-TextBox $slide 668 498 230 16 'Current identified pipeline covers part of the target, with further conversion still required.' 9.8 $false $script:MutedColor 1 | Out-Null

# Slide 3
$slide = $presentation.Slides.Add(3, 12)
Add-TextBox $slide 40 24 340 34 'Process Footprint View' 24 $true $script:TextColor 1 'Aptos Display' | Out-Null
Add-TextBox $slide 728 24 82 14 'FTE Threshold' 10.5 $false $script:MutedColor 1 | Out-Null
Add-Card $slide 812 18 76 28 $script:WhiteColor $script:LineColor $true | Out-Null
Add-TextBox $slide 826 24 44 14 '0.10' 11 $false $script:TextColor 1 | Out-Null
Add-TextBox $slide 728 48 160 14 'Flows below this value are hidden.' 8.5 $false $script:MutedColor 1 | Out-Null
Add-TextBox $slide 42 62 150 14 'Gray: No optimization potential' 9.5 $false $script:MutedColor 1 | Out-Null
Add-TextBox $slide 214 62 160 14 'Green: Click for detailed actions' 9.5 $false $script:MutedColor 1 | Out-Null
$bands = @(
  @{ Name = 'Pre-Invoice'; Steps = @(
      @{ Label = 'Master Data'; Value = 0.3; Green = $false },
      @{ Label = 'Special Invoice'; Value = 0.4; Green = $false },
      @{ Label = 'Invoice Delivery'; Value = 1.4; Green = $false }
    )},
  @{ Name = 'Collection'; Steps = @(
      @{ Label = 'Dispute'; Value = 1.3; Green = $false },
      @{ Label = 'Commitment'; Value = 8.2; Green = $true },
      @{ Label = 'Tracking'; Value = 0.7; Green = $true }
    )},
  @{ Name = 'Cash App'; Steps = @(
      @{ Label = 'Allocation'; Value = 1.6; Green = $false },
      @{ Label = 'Data Support'; Value = 0.6; Green = $false }
    )}
)
$allSteps = @()
foreach ($band in $bands) { foreach ($step in $band.Steps) { $allSteps += @{ Band = $band.Name; Label = $step.Label; Value = $step.Value; Green = $step.Green } } }
$usableWidth = 860
$stepWidth = $usableWidth / $allSteps.Count
$startX = 46
$maxVal = 8.2
$cursor = 0
foreach ($band in $bands) {
  $bandWidth = $stepWidth * $band.Steps.Count
  $fill = if (($cursor % 2) -eq 0) { $script:TealFill } else { $script:BlueFill }
  Add-Card $slide ($startX + $cursor * $stepWidth) 154 $bandWidth 24 $fill $script:LineColor $false | Out-Null
  Add-TextBox $slide ($startX + $cursor * $stepWidth) 158 $bandWidth 14 $band.Name 10.5 $true $script:TextColor 2 | Out-Null
  $cursor += $band.Steps.Count
}
for ($i = 0; $i -lt $allSteps.Count; $i++) {
  $item = $allSteps[$i]
  $label = Add-TextBox $slide ($startX + $i * $stepWidth + $stepWidth * 0.56) 148 16 92 $item.Label 8.3 $false (OfficeColor 50 50 50) 2 'Aptos'
  $label.Rotation = 270
  $barHeight = [Math]::Max(($item.Value / $maxVal) * 170, 12)
  $bar = $slide.Shapes.AddShape(1, [single]($startX + $i * $stepWidth + $stepWidth * 0.42), [single]184, [single]([Math]::Min(($stepWidth * 0.28), 16)), [single]$barHeight)
  $bar.Fill.ForeColor.RGB = $(if ($item.Green) { $script:DarkGreen } else { $script:GrayBar })
  $bar.Line.Visible = 0
  Add-TextBox $slide ($startX + $i * $stepWidth + $stepWidth * 0.16) (188 + $barHeight) ($stepWidth * 0.7) 14 ("{0:N1}" -f $item.Value) 8.5 $false $script:MutedColor 2 | Out-Null
}
Add-TextBox $slide 46 500 700 16 'Priority should stay on high-FTE flows with confirmed action linkage.' 9.8 $false $script:MutedColor 1 | Out-Null

# Slide 4
$slide = $presentation.Slides.Add(4, 12)
Add-TextBox $slide 40 24 420 34 'Identified Improvement Points' 24 $true $script:TextColor 1 'Aptos Display' | Out-Null
Add-TextBox $slide 40 58 360 18 'Current change opportunities summarized from the workbook action sheet.' 11.2 $false $script:MutedColor 1 | Out-Null
Add-TextBox $slide 40 84 340 16 'Focus: prioritize by maturity, FTE impact, and cost.' 10 $false $script:MutedColor 1 | Out-Null
Add-Card $slide 34 104 174 32 $script:WhiteColor $script:LineColor $true | Out-Null
Add-Card $slide 220 104 174 32 $script:WhiteColor $script:LineColor $true | Out-Null
Add-Card $slide 406 104 174 32 $script:WhiteColor $script:LineColor $true | Out-Null
Add-Card $slide 592 104 174 32 $script:WhiteColor $script:LineColor $true | Out-Null
Add-Card $slide 778 104 148 32 $script:WhiteColor $script:LineColor $true | Out-Null
Add-TextBox $slide 48 112 140 14 'System / Step / Status' 9.8 $false $script:MutedColor 1 | Out-Null
Add-TextBox $slide 234 112 120 14 'Type' 9.8 $false $script:MutedColor 1 | Out-Null
Add-TextBox $slide 420 112 140 14 'Default Order' 9.8 $false $script:MutedColor 1 | Out-Null
Add-TextBox $slide 606 112 140 14 'FTE / Cost Sort' 9.8 $false $script:MutedColor 1 | Out-Null
Add-TextBox $slide 792 112 110 14 'Card View' 9.8 $false $script:MutedColor 1 | Out-Null
$cards = @(
  @{ X = 34; Y = 154; Title = 'Use Enterprise WeChat'; Type = 'New'; Fte = '1.000'; Cost = '-'; Note = 'Reduce repetitive reminder work and improve communication traceability.'; Green = $true },
  @{ X = 340; Y = 154; Title = 'Enterprise WeChat + AI'; Type = 'AI'; Fte = '2.000'; Cost = '-'; Note = 'Enable layered handling and automation through AI-backed workflow.'; Green = $true },
  @{ X = 646; Y = 154; Title = 'Credit receipt capture'; Type = 'CR'; Fte = '0.100'; Cost = '-'; Note = 'Pull bank receipt data into Credit and reduce manual collection effort.'; Green = $true },
  @{ X = 34; Y = 334; Title = 'Payment habit field'; Type = 'CR'; Fte = '0.010'; Cost = '-'; Note = 'Add customer payment behavior field for quicker review and analysis.'; Green = $true },
  @{ X = 340; Y = 334; Title = 'Structured follow-up format'; Type = 'CR'; Fte = '0.090'; Cost = '-'; Note = 'Standardize collection records to reduce duplicate clarification.'; Green = $true },
  @{ X = 646; Y = 334; Title = 'Invoice line sequence'; Type = 'CR'; Fte = '0.020'; Cost = 'CNY 100,000'; Note = 'Adjust line-item sequence in invoice systems after business approval.'; Green = $true }
)
foreach ($card in $cards) {
  Add-Card $slide $card.X $card.Y 280 156 $script:WhiteColor $script:LineColor $true | Out-Null
  $topLine = $slide.Shapes.AddShape(1, [single]$card.X, [single]$card.Y, [single]280, [single]3)
  $topLine.Fill.ForeColor.RGB = $(if ($card.Green) { $script:DarkGreen } else { $script:GrayBar })
  $topLine.Line.Visible = 0
  Add-TextBox $slide ($card.X + 12) ($card.Y + 10) 252 30 $card.Title 13.5 $true $script:TextColor 1 'Aptos Display' | Out-Null
  Add-TextBox $slide ($card.X + 12) ($card.Y + 44) 66 14 ('Type: ' + $card.Type) 9.5 $true $script:TextColor 1 | Out-Null
  Add-TextBox $slide ($card.X + 90) ($card.Y + 44) 64 14 ('FTE: ' + $card.Fte) 9.5 $true $script:TextColor 1 | Out-Null
  Add-TextBox $slide ($card.X + 168) ($card.Y + 44) 96 14 ('Cost: ' + $card.Cost) 9.5 $true $script:TextColor 1 | Out-Null
  Add-TextBox $slide ($card.X + 12) ($card.Y + 72) 252 56 $card.Note 9.5 $false $script:MutedColor 1 | Out-Null
}

$presentation.SaveAs($output)
$presentation.Close()
$ppt.Quit()
Write-Output "Saved PPT to $output"
