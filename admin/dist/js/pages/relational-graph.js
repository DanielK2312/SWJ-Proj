$(document).ready(function () {
    getData()
});

// nodes = [{id = <ID>, surname = <SURNAME>}, ...]
// nodes = [{source: <ID>, target: <ID>}, ...]
let nodes = []
let links = []

// Step 1: Get list of all persons from Database
async function getData() {
    // Default options are marked with *
    fetch("/api/v1/person/list", { method: 'GET' })
        .then(data => data.json())
        .then(json => {
            dataToArray(json);
        })
}

// Step 2: Create a relational 2D-array
const dataToArray = (person_array) => {
    for (let x = 0; x < person_array.length; x++) {
        for (let y = 0; y < person_array.length; y++) {

            // Don't compare the same index
            if (person_array[x].surname !== person_array[y].surname) {
                // Get main person
                const main_surname = person_array[x].surname;
                let comp_proposer = person_array[y].proposer;

                const comp_array = comp_proposer.split(" ");
                if (comp_array[0] !== "") {
                    comp_proposer = comp_array[comp_array.length - 1];

                    if (comp_proposer.toLowerCase() === main_surname.toLowerCase()) {
                        // Bingo, person_surname proposed other surname

                        let foundX = false;
                        let foundY = false;
                        // Add both surnames as nodes
                        for (let j = 0; j < nodes.length; j++) {
                            if (person_array[x]._id === nodes[j].id) {
                                foundX = true;
                            }

                            if (person_array[y]._id === nodes[j].id) {
                                foundY = true;
                            }
                        }

                        if (foundX === false) {
                            nodes.push({
                                id: person_array[x]._id,
                                surname: person_array[x].surname
                            });
                        }

                        if (foundY === false) {
                            nodes.push({
                                id: person_array[y]._id,
                                surname: person_array[y].surname
                            });
                        }

                        // Add new link
                        links.push({
                            source: person_array[x]._id,
                            target: person_array[y]._id
                        })
                    }
                }

            }
        }
    }
    console.log(nodes)
    console.log(links)
}

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