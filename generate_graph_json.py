import os
import json

# ✅ Path to your unzipped vault
VAULT_PATH = "wavelord-vault"

nodes = []
edges = []

def traverse(folder, parent_id=None):
    folder_name = os.path.basename(folder)
    node_id = folder.replace(VAULT_PATH, "").strip("\\/")

    # Create node
    nodes.append({
        "data": {
            "id": node_id,
            "label": folder_name
        }
    })

    # Create edge to parent
    if parent_id:
        edges.append({
            "data": {
                "source": parent_id,
                "target": node_id
            }
        })

    # Go deeper
    for item in os.listdir(folder):
        path = os.path.join(folder, item)
        if os.path.isdir(path):
            traverse(path, node_id)

# Run it
traverse(VAULT_PATH)

# Write out the JSON
with open("graph.json", "w", encoding="utf-8") as f:
    json.dump({"nodes": nodes, "edges": edges}, f, indent=2, ensure_ascii=False)

print("✅ graph.json created successfully!")
