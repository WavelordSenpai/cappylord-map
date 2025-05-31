fetch('graph.json?cacheBust=' + Date.now())
  .then(res => res.json())
  .then(data => {
    const Graph = ForceGraph()(document.getElementById('graph'))
      .graphData(data)
      .nodeLabel('title')
      .nodeAutoColorBy('group')  // Category-based color
      .linkDirectionalParticles(2)
      .linkDirectionalParticleSpeed(0.003)
      .onNodeClick(node => {
        const contentBox = document.getElementById('contentBox');
        let contentHTML = `<h2>${node.title}</h2><p>${node.content}</p>`;

        // Convert [[links]] into clickable <a> tags
        contentHTML = contentHTML.replace(/\[\[([^\]]+)\]\]/g, (match, p1) => {
          const target = data.nodes.find(n => n.id === p1.trim());
          return target
            ? `<a onclick="window.selectNode('${p1.trim()}')">${p1.trim()}</a>`
            : `<span style="color:gray">${p1.trim()} (Not Found)</span>`;
        });

        contentBox.innerHTML = contentHTML;
      });

    // Expose link-click helper
    window.selectNode = function (nodeId) {
      const node = data.nodes.find(n => n.id === nodeId);
      if (node) {
        Graph.centerAt(node.x, node.y, 1000);
        Graph.zoomToFit(400);
        document.getElementById('contentBox').innerHTML =
          `<h2>${node.title}</h2><p>${node.content}</p>`;
      }
    };

    // Fit to screen after load
    setTimeout(() => Graph.zoomToFit(400), 800);
  });
