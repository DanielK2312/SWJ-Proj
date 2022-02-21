$(document).ready(function () {
    getData()
});

// nodes = [{id = <ID>, surname = <SURNAME>}, ...]
// edges = [{source: <ID>, target: <ID>}, ...]
let nodes = []
let edges = []

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
        let size = 0.5;
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
                                nodes[j].size = nodes[j].size + 0.4
                                foundX = true;
                            }

                            if (person_array[y]._id === nodes[j].id) {
                                foundY = true;
                            }
                        }

                        if (foundX === false) {
                            nodes.push({
                                id: person_array[x]._id,
                                label: person_array[x].surname,
                                size: 2,
                                x: Math.random() * person_array.length,
                                y: Math.random() * person_array.length,
                                color: '#008cc2'
                            });
                        }

                        if (foundY === false) {
                            nodes.push({
                                id: person_array[y]._id,
                                label: person_array[y].surname,
                                size: 1,
                                x: Math.random() * person_array.length,
                                y: Math.random() * person_array.length,
                                color: '#008cc2'
                            });
                        }

                        // Add new link
                        edges.push({
                            id: "e"+edges.length,
                            source: person_array[x]._id,
                            target: person_array[y]._id,
                            color: '#282c34',
                            type: 'line', size: 1

                        })
                    }
                }

            }
        }
    }
    var s = new sigma(
        {
            renderer: {
                container: document.getElementById('sigma-container'),
                type: 'canvas'
            },
            settings: {
                minEdgeSize: 0.1,
                maxEdgeSize: 0.5,
                minNodeSize: 1,
                maxNodeSize: 7,
            }
        }
    );
    var graph = {
        nodes,
        edges
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
}