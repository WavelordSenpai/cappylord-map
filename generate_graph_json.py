import os
import json

VAULT_PATH = r"D:\Downloads\Obsidian vault\Wavelord's Quintessential Human Development Map™\Wavelord's Quintessential Human Development Map™"
OUTPUT_PATH = os.path.join(VAULT_PATH, "cappylordmap", "graph.json")

def extract_links(md_content):
    import re
    return re.findall(r"\[\[(.*?)\]\]", md_content)

nodes = []
links = []
seen = set()

for root, _, files in os.walk(VAULT_PATH):
    for file in files:
        if file.endswith(".md"):
            full_path = os.path.join(root, file)
            relative_path = os.path.relpath(full_path, VAULT_PATH)
            node_id = os.path.splitext(file)[0]

            try:
                with open(full_path, "r", encoding="utf-8") as f:
                    content = f.read()

                if not content.strip():
                    continue  # Skip empty files

                nodes.append({
                    "id": node_id,
                    "title": node_id,
                    "content": content
                })

                for link in extract_links(content):
                    links.append({
                        "source": node_id,
                        "target": link.strip()
                    })

                seen.add(node_id)

            except Exception as e:
                print(f"⚠️ Skipping {relative_path}: {e}")

graph = {
    "nodes": nodes,
    "links": links
}

with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
    json.dump(graph, f, ensure_ascii=False, indent=2)

print(f"✅ Graph exported with {len(nodes)} nodes and {len(links)} edges.")
