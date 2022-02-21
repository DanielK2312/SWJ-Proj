// let json = require('./data.json');
// console.log(json, 'the json obj');
// Initialise sigma:
var s = new sigma(
    {
        renderer: {
            container: document.getElementById('sigma-container'),
            type: 'canvas'
        },
        settings: {
            minEdgeSize: 0.1,
            maxEdgeSize: 2,
            minNodeSize: 1,
            maxNodeSize: 8,
        }
    }
);

// Create a graph object
var graph = {
    nodes: [
        { id: "n0", label: "Samuel", x: 3, y: 2, size: 3, color: '#008cc2' },
        { id: "n1", label: "Gabe", x: 2, y: 1, size: 2, color: '#008cc2' },
        { id: "n2", label: "Samantha", x: 4, y: 2, size: 1, color: '#E57821' },
        { id: "n3", label: "Daniel", x: 3, y: 4, size: 4, color: '#E57821' }
    ],
    edges: [
        { id: "e0", source: "n0", target: "n1", color: '#282c34', type: 'line', size: 0.5 },
        { id: "e1", source: "n1", target: "n2", color: '#282c34', type: 'curve', size: 1 },
        { id: "e2", source: "n2", target: "n0", color: '#FF0000', type: 'line', size: 2 },
        { id: "e3", source: "n3", target: "n0", color: '#black', type: 'line', size: 1 }
    ]
}
function setHoveredNode(node) {
    if (node) {
        state.hoveredNode = node;
        state.hoveredNeighbors = new Set(graph.neighbors(node));
    }
    else {
        state.hoveredNode = undefined;
        state.hoveredNeighbors = undefined;
    }
    // Refresh rendering:
    renderer.refresh();
}
// Load the graph in sigma
s.graph.read(graph);
// Ask sigma to draw it
s.refresh();