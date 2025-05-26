import os
import json

VAULT_DIR = ".."  # Your parent vault directory
OUTPUT_FILE = "graph.json"

def clean_label(filename):
    name = filename.replace(".md", "")
    emoji_map = {
        "Nutrition": "🌳 Nutrition for Avatar Optimization",
        "Exercise": "💪 Exercise – Forge the Avatar Body",
        "Sleep": "😴 Sleep – The Gateway to Regeneration",
        "Breathwork": "🌬️ Breathwork – Mastery of the Vital Force",
        "README": "🧿 CappyLord: The Divine Avatar",
        "Welcome": "Welcome",
    }
    return emoji_map.get(name, name)

def extract_links(content):
    import re
    return re.findall(r"\[\[([^\]]+)\]\]", content)

def main():
    nodes = []
    edges = []
    files_seen = set()

    for root, dirs, files in os.walk(VAULT_DIR):
        for file in files:
            if file.endswith(".md"):
                filepath = os.path.join(root, file)
                with open(filepath, "r", encoding="utf-8") as f:
                    content = f.read()

                file_id = file
                if file.lower() == "readme.md":
                    file_id = "readme.md"
                else:
                    file_id = os.path.splitext(file)[0]

                label = clean_label(os.path.splitext(file)[0])
                node = {
                    "data": {
                        "id": file_id,
                        "label": label,
                        "content": content
                    }
                }

                nodes.append(node)
                files_seen.add(file_id)

                links = extract_links(content)
                for link in links:
                    target_id = link.strip()
                    if target_id.endswith(".md"):
                        target_id = target_id.replace(".md", "")
                    edges.append({
                        "data": {
                            "source": file_id,
                            "target": target_id
                        }
                    })

    graph = nodes + edges
    with open(OUTPUT_FILE, "w", encoding="utf-8") as out:
        json.dump(graph, out, indent=2, ensure_ascii=False)

    print("✅ graph.json updated with note content.")

if __name__ == "__main__":
    main()
