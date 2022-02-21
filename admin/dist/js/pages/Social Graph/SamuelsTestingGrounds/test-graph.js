import Graph from "graphology";
import Sigma from "sigma";

const container = document.getElementById("sigma-container")
const graph = new Graph()

graph.addNode("Samuel", { x: 0, y: 10, size: 5, label: "Samuel", color: "blue" });
graph.addNode("Gabe", { x: 10, y: 0, size: 3, label: "Gabe", color: "red" });
const rendered = new Sigma(graph, container);

rendered.read(graph)
rendered.refresh()