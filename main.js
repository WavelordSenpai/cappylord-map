import ForceGraph from './3d-force-graph.min.js';

fetch('graph.json')
  .then(res => res.json())
  .then(graphData => {
    const elem = document.getElementById('3d-graph');
    const Graph = ForceGraph()(elem)
      .graphData(graphData)
      .nodeLabel(node => node.id)
      .nodeAutoColorBy('group')
      .onNodeClick(node => {
        const contentDiv = document.getElementById('content');
        contentDiv.innerHTML = node.content || "<em>No content available</em>";

        // Attempt to resolve [[Wiki Links]]
        const links = node.content?.match(/\[\[(.*?)\]\]/g) || [];
        links.forEach(link => {
          const target = link.replace(/\[\[|\]\]/g, '');
          const anchor = `<a href="#" class="wikilink" data-target="${target}">${target}</a>`;
          contentDiv.innerHTML = contentDiv.innerHTML.replace(link, anchor);
        });

        document.querySelectorAll('.wikilink').forEach(link => {
          link.addEventListener('click', e => {
            e.preventDefault();
            const targetNode = graphData.nodes.find(n => n.id === link.dataset.target);
            if (targetNode) {
              Graph.centerAt(targetNode.x, targetNode.y, 1000);
              Graph.zoomToFit(400);
              contentDiv.innerHTML = targetNode.content || "<em>No content available</em>";
            } else {
              contentDiv.innerHTML = `<strong>Node not found:</strong> ${link.dataset.target}`;
            }
          });
        });
      });
  });
