import os
import json

# === CONFIG ===
vault_path = r"D:\Downloads\Obsidian vault\Wavelord's Quintessential Human Development Map™\Wavelord's Quintessential Human Development Map™"
graph_json_path = "graph.json"  # Must be in same folder as script

# === Load Graph ===
with open(graph_json_path, "r", encoding="utf-8") as f:
    graph_data = json.load(f)

# Build lookup of markdown files
vault_files = {}
for root, dirs, files in os.walk(vault_path):
    for file in files:
        if file.endswith(".md"):
            node_id = os.path.splitext(file)[0]
            file_path = os.path.join(root, file)
            vault_files[node_id] = file_path

# === Update Graph Nodes ===
updated_nodes = 0
for node in graph_data.get("nodes", []):
    node_id = node.get("id")
    if node_id in vault_files:
        with open(vault_files[node_id], "r", encoding="utf-8") as f:
            content = f.read().strip()
        node["content"] = content
        updated_nodes += 1

# === Save New Graph ===
with open(graph_json_path, "w", encoding="utf-8") as f:
    json.dump(graph_data, f, indent=2, ensure_ascii=False)

print(f"✅ Synced {updated_nodes} nodes from vault to graph.json.")
