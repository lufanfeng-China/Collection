import json
import sys
import urllib.error
import urllib.request
from pathlib import Path


NOTION_VERSION = "2026-03-11"
DATABASE_ID = "ce0e76be-a520-4af9-ba1a-1ee2f4f15b0f"
SOURCE_JSON = Path(r"C:\Users\Sky.Lu\Project\Project\Collection\action-summary.json")


def normalize_notion_id(value: str) -> str:
    raw = value.replace("-", "").strip()
    if len(raw) == 32:
        return f"{raw[:8]}-{raw[8:12]}-{raw[12:16]}-{raw[16:20]}-{raw[20:]}"
    return value.strip()


def notion_request(method: str, endpoint: str, token: str, body=None):
    url = f"https://api.notion.com{endpoint}"
    data = None
    headers = {
        "Authorization": f"Bearer {token}",
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
    }
    if body is not None:
        data = json.dumps(body, ensure_ascii=False).encode("utf-8")
    req = urllib.request.Request(url, headers=headers, data=data, method=method)
    try:
        with urllib.request.urlopen(req, timeout=90) as resp:
            return json.load(resp)
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"{method} {endpoint} failed: {exc.code} {detail}") from exc


def query_all_pages(data_source_id: str, token: str):
    results = []
    cursor = None
    while True:
        payload = {"page_size": 100, "result_type": "page"}
        if cursor:
            payload["start_cursor"] = cursor
        data = notion_request("POST", f"/v1/data_sources/{data_source_id}/query", token, payload)
        results.extend(data.get("results", []))
        if not data.get("has_more"):
            break
        cursor = data.get("next_cursor")
    return results


def get_plain_text(items):
    if not items:
        return ""
    return "".join(part.get("plain_text", "") for part in items).strip()


def get_property_value(prop):
    if not prop:
        return ""
    prop_type = prop.get("type")
    if prop_type == "title":
        return get_plain_text(prop.get("title"))
    if prop_type == "rich_text":
        return get_plain_text(prop.get("rich_text"))
    if prop_type == "number":
        value = prop.get("number")
        return "" if value is None else str(value)
    if prop_type == "select":
        value = prop.get("select")
        return "" if not value else value.get("name", "")
    if prop_type == "status":
        value = prop.get("status")
        return "" if not value else value.get("name", "")
    return ""


def resolve_property_name(schema: dict, aliases, expected_type=""):
    for alias in aliases:
        if alias in schema:
            if not expected_type or schema[alias].get("type") == expected_type:
                return alias
    if expected_type:
        for name, meta in schema.items():
            if meta.get("type") == expected_type:
                return name
    return None


def build_key(change_point: str, step: str, system: str) -> str:
    return f"{change_point.strip()}||{step.strip()}||{system.strip()}".lower()


def maybe_float(value):
    if value in (None, ""):
        return None
    try:
        return float(value)
    except Exception:
        return None


def build_property_payload(schema_type: str, value):
    if schema_type == "title":
        return {"title": [{"text": {"content": str(value)}}]}
    if schema_type == "rich_text":
        if not str(value).strip():
            return {"rich_text": []}
        return {"rich_text": [{"text": {"content": str(value)}}]}
    if schema_type == "number":
        return {"number": maybe_float(value)}
    if schema_type == "select":
        return {"select": None if not str(value).strip() else {"name": str(value)}}
    if schema_type == "status":
        return {"status": None if not str(value).strip() else {"name": str(value)}}
    return {"rich_text": [] if not str(value).strip() else [{"text": {"content": str(value)}}]}


def main():
    token = ""
    if len(sys.argv) > 1:
        token = sys.argv[1].strip()
    if not token:
        raise SystemExit("Usage: python import-notion-actions.py <NOTION_TOKEN>")

    database_id = normalize_notion_id(DATABASE_ID)
    with SOURCE_JSON.open("r", encoding="utf-8") as f:
        source = json.load(f)
    items = source.get("items", [])

    database = notion_request("GET", f"/v1/databases/{database_id}", token)
    data_sources = database.get("data_sources") or []
    if not data_sources:
        raise RuntimeError(f"No accessible data source returned for database {database_id}")
    data_source_id = data_sources[0]["id"]
    data_source = notion_request("GET", f"/v1/data_sources/{data_source_id}", token)
    schema = data_source.get("properties", {})

    prop_title = resolve_property_name(schema, ["Change Point", "ChangePoint", "Name", "Title"], "title")
    prop_system = resolve_property_name(schema, ["System", "Legal Entity"])
    prop_remark = resolve_property_name(schema, ["Remark", "Remarks", "Note", "Notes", "Description"])
    prop_fte = resolve_property_name(schema, ["FTE"])
    prop_cost = resolve_property_name(schema, ["Cost"])
    prop_status = resolve_property_name(schema, ["Status"])
    prop_type = resolve_property_name(schema, ["Type"])
    prop_step = resolve_property_name(schema, ["Step"])
    prop_process_step = resolve_property_name(schema, ["Process Step", "ProcessStep", "I"])

    if not prop_title:
        raise RuntimeError("Could not locate a title property in the target database.")

    existing_pages = query_all_pages(data_source_id, token)
    existing_index = {}
    for page in existing_pages:
        props = page.get("properties", {})
        key = build_key(
            get_property_value(props.get(prop_title, {})),
            get_property_value(props.get(prop_step, {})) if prop_step else "",
            get_property_value(props.get(prop_system, {})) if prop_system else "",
        )
        existing_index[key] = page

    created = 0
    updated = 0

    for item in items:
        change_point = (item.get("changePoint") or "").strip()
        step = (item.get("step") or "").strip()
        system = (item.get("system") or "").strip()
        if not change_point:
            continue

        properties = {}

        def add_property(name, value):
            if not name:
                return
            schema_type = schema[name]["type"]
            properties[name] = build_property_payload(schema_type, value)

        add_property(prop_title, change_point)
        add_property(prop_system, system)
        add_property(prop_remark, item.get("remark") or "")
        add_property(prop_fte, item.get("fte") or "")
        add_property(prop_cost, item.get("cost") or "")
        add_property(prop_status, item.get("status") or "")
        add_property(prop_type, item.get("type") or "")
        add_property(prop_step, step)
        add_property(prop_process_step, item.get("processStep") or item.get("i") or "")

        key = build_key(change_point, step, system)
        existing = existing_index.get(key)

        if existing:
            notion_request("PATCH", f"/v1/pages/{existing['id']}", token, {"properties": properties})
            updated += 1
        else:
            page = notion_request(
                "POST",
                "/v1/pages",
                token,
                {
                    "parent": {"type": "data_source_id", "data_source_id": data_source_id},
                    "properties": properties,
                },
            )
            existing_index[key] = page
            created += 1

    print(json.dumps({
        "databaseId": database_id,
        "dataSourceId": data_source_id,
        "sourceItemCount": len(items),
        "created": created,
        "updated": updated,
    }, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
