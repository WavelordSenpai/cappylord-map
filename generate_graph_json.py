import os
import re
import json

# ✅ Absolute path to your vault folder with .md files
BASE_FOLDER = r"D:\Downloads\Obsidian vault\Wavelord's Quintessential Human Development Map™\Wavelord's Quintessential Human Development Map™\Core Pillars – Foundations of the Wavelord Map"
OUTPUT_PATH = r"D:\Downloads\Obsidian vault\Wavelord's Quintessential Human Development Map™\Wavelord's Quintessential Human Development Map™\cappylordmap\graph.json"

# 🧠 Build node and edge lists
nodes = []
edges = []
node_ids = {}
node_id = 0

# 📍 Step 1: Add all Markdown notes as nodes
for root, dirs, files in os.walk(BASE_FOLDER):
    for file in files:
        if file.endswith(".md"):
            file_path = os.path.join(root, file)
            rel_path = os.path.relpath(file_path, BASE_FOLDER).replace("\\", "/")
            title = os.path.splitext(file)[0]

            nodes.append({
                "id": node_id,
                "label": title,
                "path": rel_path
            })
            node_ids[title] = node_id
            node_id += 1

# 🔗 Step 2: Parse links ([[linked note]]) and add edges
for node in nodes:
    file_path = os.path.join(BASE_FOLDER, node["path"].replace("/", os.sep))
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            links = re.findall(r"\[\[([^\]]+)\]\]", content)
            for link in links:
                target_title = link.split("|")[0].strip()
                if target_title in node_ids:
                    edges.append({
                        "from": node["id"],
                        "to": node_ids[target_title]
                    })
    except FileNotFoundError:
        print(f"⚠️ File not found: {file_path}")

# 💾 Step 3: Save as JSON
with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
    json.dump({"nodes": nodes, "edges": edges}, f, indent=2)

print(f"✅ Graph exported with {len(nodes)} nodes and {len(edges)} edges.")
