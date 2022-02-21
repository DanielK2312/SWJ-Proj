"use strict";
/**
 * This example showcases sigma's reducers, which aim to facilitate dynamically
 * changing the appearance of nodes and edges, without actually changing the
 * main graphology data.
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var sigma_1 = require("sigma");
var graphology_1 = require("graphology");
var data_json_1 = require("./data.json");

// Retrieve some useful DOM elements:
var container = document.getElementById("sigma-container");
var searchInput = document.getElementById("search-input");
var searchSuggestions = document.getElementById("suggestions");

// Instantiate sigma:
var graph = new graphology_1.default();
graph.import(data_json_1.default);
var renderer = new sigma_1.default(graph, container);
var state = { searchQuery: "" };

// Feed the datalist autocomplete values:
searchSuggestions.innerHTML = graph
    .nodes()
    .map(function (node) { return "<option value=\"".concat(graph.getNodeAttribute(node, "label"), "\"></option>"); })
    .join("\n");

    // Actions:
function setSearchQuery(query) {
    state.searchQuery = query;
    if (searchInput.value !== query)
        searchInput.value = query;
    if (query) {
        var lcQuery_1 = query.toLowerCase();
        var suggestions = graph
            .nodes()
            .map(function (n) { return ({ id: n, label: graph.getNodeAttribute(n, "label") }); })
            .filter(function (_a) {
                var label = _a.label;
                return label.toLowerCase().includes(lcQuery_1);
            });
        // If we have a single perfect match, them we remove the suggestions, and
        // we consider the user has selected a node through the datalist
        // autocomplete:
        if (suggestions.length === 1 && suggestions[0].label === query) {
            state.selectedNode = suggestions[0].id;
            state.suggestions = undefined;
            // Move the camera to center it on the selected node:
            var nodePosition = renderer.getNodeDisplayData(state.selectedNode);
            renderer.getCamera().animate(nodePosition, {
                duration: 500,
            });
        }
        // Else, we display the suggestions list:
        else {
            state.selectedNode = undefined;
            state.suggestions = new Set(suggestions.map(function (_a) {
                var id = _a.id;
                return id;
            }));
        }
    }
    // If the query is empty, then we reset the selectedNode / suggestions state:
    else {
        state.selectedNode = undefined;
        state.suggestions = undefined;
    }
    // Refresh rendering:
    renderer.refresh();
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

// Bind search input interactions:
searchInput.addEventListener("input", function () {
    setSearchQuery(searchInput.value || "");
});
searchInput.addEventListener("blur", function () {
    setSearchQuery("");
});

// Bind graph interactions:
renderer.on("enterNode", function (_a) {
    var node = _a.node;
    setHoveredNode(node);
});
renderer.on("leaveNode", function () {
    setHoveredNode(undefined);
});

// Render nodes accordingly to the internal state:
// 1. If a node is selected, it is highlighted
// 2. If there is query, all non-matching nodes are greyed
// 3. If there is a hovered node, all non-neighbor nodes are greyed
renderer.setSetting("nodeReducer", function (node, data) {
    var res = __assign({}, data);
    if (state.hoveredNeighbors && !state.hoveredNeighbors.has(node) && state.hoveredNode !== node) {
        res.label = "";
        res.color = "#f6f6f6";
    }
    if (state.selectedNode === node) {
        res.highlighted = true;
    }
    else if (state.suggestions && !state.suggestions.has(node)) {
        res.label = "";
        res.color = "#f6f6f6";
    }
    return res;
});

// Render edges accordingly to the internal state:
// 1. If a node is hovered, the edge is hidden if it is not connected to the
//    node
// 2. If there is a query, the edge is only visible if it connects two
//    suggestions
renderer.setSetting("edgeReducer", function (edge, data) {
    var res = __assign({}, data);
    if (state.hoveredNode && !graph.hasExtremity(edge, state.hoveredNode)) {
        res.hidden = true;
    }
    if (state.suggestions && (!state.suggestions.has(graph.source(edge)) || !state.suggestions.has(graph.target(edge)))) {
        res.hidden = true;
    }
    return res;
});
