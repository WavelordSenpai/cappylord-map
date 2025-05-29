import ForceGraph3D from 'three-forcegraph';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

console.log("✅ main.js loaded");

const container = document.getElementById('3d-graph');

fetch('graph.json')
  .then(res => {
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    return res.json();
  })
  .then(data => {
    console.log("✅ graph.json loaded", data);

    const Graph = ForceGraph3D({
      extraRenderers: []
    })(container)
      .graphData(data)
      .backgroundColor('#000000')
      .nodeAutoColorBy('group')
      .nodeLabel('name')
      .onNodeClick(node => {
        const msg = `${node.name || 'Unnamed Node'}\n\n${node.description || 'No description available.'}`;
        alert(msg);
      });

    // Optional camera setup
    Graph.cameraPosition({ z: 120 });

    console.log("✅ Graph initialized");
  })
  .catch(err => {
    console.error("❌ Error loading graph.json:", err);
  });
