fetch('graph.json?cacheBust=' + Date.now())
  .then(res => res.json())
  .then(data => {
    const Graph = ForceGraph()(document.getElementById('graph'))
      .graphData(data)
      .nodeLabel(node => node.title || node.id)
      .nodeAutoColorBy('group')
      .onNodeClick(node => {
        const contentHTML = (node.content || 'No content.').replace(/\[\[(.+?)\]\]/g, (_, p1) => {
          return `<a onclick="jumpToNode('${p1}')">${p1}</a>`;
        });
        document.getElementById('contentBox').innerHTML = `<h2>${node.title || node.id}</h2><p>${contentHTML}</p>`;
      });

    // Fit to screen
    setTimeout(() => Graph.zoomToFit(400), 1000);

    // Wiki-style jump
    window.jumpToNode = (nodeId) => {
      const target = data.nodes.find(n => n.id === nodeId);
      if (target) {
        Graph.centerAt(target.x, target.y, 1000);
        Graph.zoom(4, 1000);
        const contentHTML = (target.content || 'No content.').replace(/\[\[(.+?)\]\]/g, (_, p1) => {
          return `<a onclick="jumpToNode('${p1}')">${p1}</a>`;
        });
        document.getElementById('contentBox').innerHTML = `<h2>${target.title || target.id}</h2><p>${contentHTML}</p>`;
      } else {
        alert(`Node "${nodeId}" not found.`);
      }
    };
  });
