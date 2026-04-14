import json
import re
import zipfile
import xml.etree.ElementTree as ET
from collections import defaultdict
from datetime import datetime
from pathlib import Path


WORKBOOK_PATH = Path(
    r"C:\Users\Sky.Lu\Thermo Fisher Scientific\Accounting Productivity Project - Accounting Productivity Project\Discussion Summary.xlsx"
)
OUT_DIR = Path(r"C:\Users\Sky.Lu\Project\Project\Collection")

NS = {
    "m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
    "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
}


def col_letters(cell_ref: str) -> str:
    match = re.match(r"([A-Z]+)", cell_ref or "")
    return match.group(1) if match else ""


def load_shared_strings(archive: zipfile.ZipFile):
    shared = []
    if "xl/sharedStrings.xml" not in archive.namelist():
        return shared
    root = ET.fromstring(archive.read("xl/sharedStrings.xml"))
    for si in root.findall("m:si", NS):
        texts = [node.text or "" for node in si.findall(".//m:t", NS)]
        shared.append("".join(texts))
    return shared


def workbook_sheet_map(archive: zipfile.ZipFile):
    workbook = ET.fromstring(archive.read("xl/workbook.xml"))
    rels = ET.fromstring(archive.read("xl/_rels/workbook.xml.rels"))
    rel_map = {rel.attrib["Id"]: rel.attrib["Target"] for rel in rels}
    mapping = {}
    for sheet in workbook.find("m:sheets", NS):
        rid = sheet.attrib.get(f"{{{NS['r']}}}id")
        mapping[sheet.attrib["name"]] = f"xl/{rel_map[rid]}"
    return mapping


def read_sheet_rows(archive: zipfile.ZipFile, sheet_path: str, shared_strings):
    root = ET.fromstring(archive.read(sheet_path))
    rows = []
    for row in root.findall(".//m:sheetData/m:row", NS):
        values = {}
        for cell in row.findall("m:c", NS):
            ref = cell.attrib.get("r", "")
            cell_type = cell.attrib.get("t", "")
            value_node = cell.find("m:v", NS)
            inline_node = cell.find("m:is", NS)
            text = ""
            if cell_type == "s" and value_node is not None and value_node.text is not None:
                text = shared_strings[int(value_node.text)]
            elif cell_type == "inlineStr" and inline_node is not None:
                text = "".join(node.text or "" for node in inline_node.findall(".//m:t", NS))
            elif value_node is not None and value_node.text is not None:
                text = value_node.text
            values[col_letters(ref)] = text
        if values:
            rows.append(values)
    return rows


def to_json_and_js_files(path: Path, payload, wrapper_name: str):
    content = json.dumps(payload, ensure_ascii=False, indent=2)
    path.write_text(content + "\n", encoding="utf-8")
    path.with_suffix(".js").write_text(f"window.{wrapper_name} = {content};\n", encoding="utf-8")


def build_discussion_payload(rows):
    grouped = defaultdict(list)
    for row in rows[1:]:
        item = {
            "stepId": row.get("A", ""),
            "l1": row.get("B", ""),
            "l2": row.get("C", ""),
            "l3": row.get("D", ""),
            "stepDescription": row.get("E", ""),
            "itscOpportunity": row.get("F", ""),
            "total": row.get("G", ""),
            "h": row.get("H", ""),
        }
        if not any(item.values()):
            continue
        grouped[item["l1"]].append(item)

    return {
        "sourceFile": str(WORKBOOK_PATH),
        "syncedAt": datetime.now().strftime("%Y-%m-%dT%H:%M:%S"),
        "groups": [{"l1": l1, "items": items} for l1, items in grouped.items() if l1],
    }


def build_action_payload(rows):
    items = []
    for row in rows[1:]:
        item = {
            "system": row.get("A", ""),
            "changePoint": row.get("B", ""),
            "remark": row.get("C", ""),
            "fte": row.get("D", ""),
            "cost": row.get("E", ""),
            "status": row.get("F", ""),
            "type": row.get("G", ""),
            "step": row.get("H", ""),
            "i": row.get("I", ""),
            "processStep": row.get("I", ""),
        }
        if not item["changePoint"] and not item["system"]:
            continue
        items.append(item)

    return {
        "sourceFile": str(WORKBOOK_PATH),
        "syncedAt": datetime.now().strftime("%Y-%m-%dT%H:%M:%S"),
        "items": items,
    }


def build_third_party_payload(rows):
    return {
        "sourceFile": str(WORKBOOK_PATH),
        "syncedAt": datetime.now().strftime("%Y-%m-%dT%H:%M:%S"),
        "header": rows[0] if rows else {},
        "rows": [row for row in rows[1:] if any((value or "").strip() for value in row.values())],
    }


def main():
    if not WORKBOOK_PATH.exists():
        raise SystemExit(f"Workbook not found: {WORKBOOK_PATH}")

    with zipfile.ZipFile(WORKBOOK_PATH) as archive:
        shared_strings = load_shared_strings(archive)
        sheets = workbook_sheet_map(archive)
        discussion_rows = read_sheet_rows(archive, sheets["汇总"], shared_strings)
        action_rows = read_sheet_rows(archive, sheets["Action"], shared_strings)
        third_party_rows = read_sheet_rows(archive, sheets["三方平台"], shared_strings)

    discussion_payload = build_discussion_payload(discussion_rows)
    action_payload = build_action_payload(action_rows)
    third_party_payload = build_third_party_payload(third_party_rows)

    to_json_and_js_files(OUT_DIR / "discussion-summary.json", discussion_payload, "DISCUSSION_SUMMARY")
    to_json_and_js_files(OUT_DIR / "action-summary.json", action_payload, "ACTION_SUMMARY")
    to_json_and_js_files(OUT_DIR / "third-party-summary.json", third_party_payload, "THIRD_PARTY_SUMMARY")

    print(
        json.dumps(
            {
                "sourceFile": str(WORKBOOK_PATH),
                "discussionGroups": len(discussion_payload["groups"]),
                "discussionRows": sum(len(group["items"]) for group in discussion_payload["groups"]),
                "actionRows": len(action_payload["items"]),
                "actionSystems": len({item["system"] for item in action_payload["items"] if item["system"]}),
                "thirdPartyRows": len(third_party_payload["rows"]),
            },
            ensure_ascii=False,
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
