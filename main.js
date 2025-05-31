fetch('graph.json?cacheBust=' + Date.now()) // prevent caching issues
  .then(res => res.json())
  .then(data => {
    const graph = ForceGraph()(document.getElementById('graph'))
      .graphData(data)
      .nodeLabel('title')
      .nodeAutoColorBy('group')
      .linkDirectionalParticles(2)
      .linkDirectionalParticleSpeed(0.005)
      .onNodeClick(node => {
        // Render node content with clickable wiki-style links
        const content = (node.content || '').replace(/\[\[([^\]]+)\]\]/g, (match, p1) => {
          return `<a onclick="navigateToNode('${p1}')">${p1}</a>`;
        });

        document.getElementById('contentBox').innerHTML = `<h2>${node.title}</h2><p>${content}</p>`;
      });

    // Allow jumping between nodes by name
    window.navigateToNode = (nodeId) => {
      const target = data.nodes.find(n => n.id === nodeId);
      if (target) {
        document.getElementById('contentBox').innerHTML = `<h2>${target.title}</h2><p>${(target.content || '').replace(/\[\[([^\]]+)\]\]/g, (match, p1) => {
          return `<a onclick="navigateToNode('${p1}')">${p1}</a>`;
        })}</p>`;
      } else {
        alert(`Node "${nodeId}" not found.`);
      }
    };

    setTimeout(() => graph.zoomToFit(400), 1000);
  });
