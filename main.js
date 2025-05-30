fetch('graph.json?cacheBust=' + Date.now()) // prevent caching issues
  .then(res => res.json())
  .then(data => {
    const Graph = ForceGraph()(document.getElementById('graph'))
      .graphData(data)
      .nodeLabel('title')
      .nodeAutoColorBy('id')
      .linkDirectionalParticles(2)
      .linkDirectionalParticleSpeed(0.005)
      .onNodeClick(node => {
        document.getElementById('contentBox').innerHTML = `<h2>${node.title}</h2><p>${node.content}</p>`;
      });

    // Fit graph to screen after 1 sec
    setTimeout(() => Graph.zoomToFit(400), 1000);
  })
  .catch(err => {
    console.error("Graph load error:", err);
    document.getElementById('contentBox').innerHTML = "⚠️ Failed to load graph.json";
  });
