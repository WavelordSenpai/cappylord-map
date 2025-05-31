fetch('graph.json?cacheBust=' + Date.now())
  .then(res => res.json())
  .then(data => {
    const Graph = ForceGraph()(document.getElementById('graph'))
      .graphData(data)
      .nodeLabel(node => node.title || node.id)
      .nodeAutoColorBy('group')
      .onNodeClick(node => {
        // Replace [[Link]] with clickable anchor tags
        const contentHTML = node.content?.replace(/\[\[(.+?)\]\]/g, (match, p1) => {
          return `<a onclick="jumpToNode('${p1}')">${p1}</a>`;
        }) || 'No content.';
        document.getElementById('contentBox').innerHTML = `<h2>${node.title || node.id}</h2><p>${contentHTML}</p>`;
      });

    // Zoom to fit after load
    setTimeout(() => Graph.zoomToFit(400), 1000);

    // Make jumpToNode globally accessible
    window.jumpToNode = (nodeId) => {
      const target = data.nodes.find(n => n.id === nodeId);
      if (target) {
        Graph.centerAt(target.x, target.y, 1000);
        Graph.zoom(4, 1000);
        document.getElementById('contentBox').innerHTML = `<h2>${target.title || target.id}</h2><p>${target.content}</p>`;
      } else {
        alert(`Node "${nodeId}" not found.`);
      }
    };
  });
