// main.js

fetch('graph.json?cacheBust=' + Date.now()) // prevent caching issues
  .then(res => res.json())
  .then(data => {
    const Graph = ForceGraph()
      (document.getElementById('graph'))
      .graphData(data)
      .nodeLabel('title')
      .nodeAutoColorBy('id')
      .linkDirectionalParticles(2)
      .linkDirectionalParticleSpeed(0.005)
      .onNodeClick(node => {
        alert(node.content || 'No content available for this node.');
      });

    // Fit graph to screen
    setTimeout(() => Graph.zoomToFit(400), 1000);
  });
