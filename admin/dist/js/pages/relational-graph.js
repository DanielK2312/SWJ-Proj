$(document).ready(function () {
    getData()
});

// nodes = [{id = <ID>, surname = <SURNAME>}, ...]
// edges = [{source: <ID>, target: <ID>}, ...]
let nodes = []
let edges = []
let activated = false; 

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
                                // For a Circle With Radius R r = R * sqrt(random()), theta = random() * 2 * PI 
                                // x = centerX + r * cos(theta)
                                // y = centerY + r * sin(theta)
                                x: (Math.random() * 9001) - 4500 + person_array.length * Math.sqrt(Math.random()) * Math.cos(Math.random() * 2 * Math.PI),
                                y: (Math.random() * 6000) - 3000 + person_array.length * Math.sqrt(Math.random()) * Math.sin(Math.random() * 2 * Math.PI),
                                color: '#007bff'
                            });
                        }

                        if (foundY === false) {
                            nodes.push({
                                id: person_array[y]._id,
                                label: person_array[y].surname,
                                size: 1,
                                x: (Math.random() * 9001) - 4500 + person_array.length * Math.sqrt(Math.random()) * Math.cos(Math.random() * 2 * Math.PI),
                                y: (Math.random() * 6000) - 3000 + person_array.length * Math.sqrt(Math.random()) * Math.sin(Math.random() * 2 * Math.PI),
                                color: '#007bff'
                            });
                        }

                        // Add new link
                        edges.push({
                            id: "e" + edges.length,
                            source: person_array[x]._id,
                            target: person_array[y]._id,
                            color: '#808080',
                            type: 'arrow',
                            size: 1,
                            // label: "Proposed"

                        })
                    }
                }

            }
        }
    }

    // Add in a neighbors method to the sigma graphing tool. 
    // Allows us to receieve a list of all the nodes that neighbor a node. 
    sigma.classes.graph.addMethod('neighbors', function (nodeId) {
        var k,
            neighbors = {},
            index = this.allNeighborsIndex[nodeId] || {};

        for (k in index)
            neighbors[k] = this.nodesIndex[k];

        return neighbors;
    });

    // Create our Sigma instance with the settings that we want for Node Size and Edge Size.
    var s = new sigma(
        {
            renderer: {
                container: document.getElementById('sigma-container'),
                type: 'canvas'
            },
            settings: {
                minEdgeSize: 0.2,
                maxEdgeSize: 0.7,
                minNodeSize: 3,
                maxNodeSize: 11,
                enableEdgeHovering: false,
                // drawLabels: false
                nodeLabelSize: 'proportional',
                
                // autoRescale: ['nodePosition', 'nodeSize', 'edgeSize'],
                // labelThreshold: 1,
            }
        }
    );

    // Add in the lovely Nodes and Edges found earlier to a graph variable. 
    var graph = {
        nodes,
        edges
    }

    // Let Sigma read those lovely nodes and then refresh our canvas so they get drawn on to it. 
    s.graph.read(graph);
    s.refresh();

    // Add eventlistner for when we hover over a node. 
    // When we hover over a node we want to see all the adjacent nodes and edges
    // So we use our handy neighbors method we made earlier to retrieve the neighboring nodes!
    // Then we set the color scheme to make them POP! 
    s.bind('overNode', function (e) {
        var nodeId = e.data.node.id,
        toKeep = s.graph.neighbors(nodeId);
        toKeep[nodeId] = e.data.node;

        // If the Nodes are neighbors make them blue! Otherwise make em grey!
        s.graph.nodes().forEach(function (n) {
            if (toKeep[n.id]){
                n.color = '#007bff';
                n.drawlabels = true;
            }
            else{
                n.color = '#808080';
                n.drawlabels = false;
            }
        });

        // Do the same thing we did to our nodes for our edges!
        s.graph.edges().forEach(function (e) {
            if (toKeep[e.source] && toKeep[e.target])
                e.color = '#007bff';
            else
                e.color = '#808080';
        });

        //Refresh graph to update colors
        s.refresh();
    });

    // Create an Event listner for when we leave a node. 
    // When we want all nodes and edges to return to their original color scheme!
    s.bind('outNode', function (e) {

        // Go through all nodes and make em Blue!
        s.graph.nodes().forEach(function (n) {
            n.color = '#007bff';
        });

        // Go through all edges and make them grey!
        s.graph.edges().forEach(function (e) {
            e.color = '808080';
        });

        //Refresh graph to update colors
        s.refresh();
    });

    s.bind('clickNode', function (e) {
        
        var nodeId = e.data.node.id,
        toKeep = s.graph.neighbors(nodeId);
        toKeep[nodeId] = e.data.node;

        if (!activated){ 
        // If the Nodes are neighbors make them blue! Otherwise make em grey!
        s.graph.nodes().forEach(function (n) {
            if (toKeep[n.id]) {
                n.color = '#007bff';
                n.drawlabels = true;
            }
            else {
                n.color = '#808080';
                n.drawlabels = false;
                n.hidden = true;
            }
        });

        // Do the same thing we did to our nodes for our edges!
        s.graph.edges().forEach(function (e) {
            if (toKeep[e.source] && toKeep[e.target]){
                e.color = '#007bff';
                e.label = 'Proposed';
            }
            else{
                e.color = '#808080';
                e.hidden = true;
                e.drawlabels = false;
                e.label = '';
                
            }    
            });

        //Refresh graph to update colors
        activated = true;
        s.refresh();
    }
    else{
            s.graph.nodes().forEach(function (n) {
                n.color = '#007bff';
                n.hidden = false;
            });

            // Go through all edges and make them grey!
            s.graph.edges().forEach(function (e) {
                e.color = '#808080';
                e.drawlabels = false;
                e.hidden = false;
                e.label = '';
            });

            //Refresh graph to update colors
            activated = false;
            s.refresh();
    }
    });
}