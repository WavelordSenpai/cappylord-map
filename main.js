document.addEventListener('DOMContentLoaded', () => {
  const Graph = ForceGraph3D()
    (document.getElementById('graph'))
    .nodeAutoColorBy('group')
    .nodeLabel(node => `<div style="color: white;"><strong>${node.id}</strong><br>${node.content || ''}</div>`)
    .onNodeClick(node => {
      alert(`${node.id}\n\n${node.content || 'No content available.'}`);
    });

  fetch('graph.json')
    .then(res => res.json())
    .then(data => {
      Graph.graphData(data);
      console.log("✅ Graph loaded successfully");
    })
    .catch(err => {
      console.error("❌ Error loading graph.json:", err);
    });
});
