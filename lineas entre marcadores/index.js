import Nodo from "./nodo.js";
import Arco from "./arco.js";

const arcs = [];
const nodes = [];
const nodeStart = nodes[0];
const nodeEnd = nodes[1];
const shortestRoute = [];


function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 5.551348977764909, lng: -73.35646257447256 },
    fullscreenControl: true,
    mapTypeControl: true,
    streetViewControl: false,
    zoom: 18,
    zoomControl: true,
    maxZoom: 20,
    contexMenu: true,
  });

  nodes.push(
    new Nodo(map, "A", 5.552026661382956, -73.35666170388217),
    new Nodo(map, "B", 5.551469188599672, -73.35649737223628),
    new Nodo(map, "C", 5.551513535293195, -73.35715795891471),
    new Nodo(map, "D", 5.551403150227596, -73.35771800613736),
    new Nodo(map, "E", 5.550686000699201, -73.35645708130097),
    new Nodo(map, "F", 5.550967105703704, -73.35547858581054),
    new Nodo(map, "G", 5.551635559605786, -73.35448007559745),
    new Nodo(map, "H", 5.552425756674258, -73.35687878659566),
    new Nodo(map, "I", 5.549840276077607, -73.35699016854028),
    new Nodo(map, "J", 5.549417510996117, -73.35647423459095)
  );

  map.controls[google.maps.ControlPosition.TOP_CENTER].push(
    document.getElementById("info")
  );

  arcs.push(
    new Arco(map, nodes[0], nodes[1]),
    new Arco(map, nodes[1], nodes[2]),
    new Arco(map, nodes[2], nodes[3]),
    new Arco(map, nodes[3], nodes[0]),
    new Arco(map, nodes[4], nodes[5]),
    new Arco(map, nodes[5], nodes[6]),
    new Arco(map, nodes[6], nodes[7]),
    new Arco(map, nodes[7], nodes[4]),
    new Arco(map, nodes[8], nodes[9]),
    new Arco(map, nodes[9], nodes[0])
  );

  nodes.forEach((node) => {
    google.maps.event.addListener(node.Marker, "position_changed", update);
    google.maps.event.addListener(node.Marker, "click", () => {
      node.Marker.setIcon({
        path: google.maps.SymbolPath.CIRCLE,
        scale: 20,
        fillColor: "yellow",
        fillOpacity: 1,
        strokeWeight: 1,
        strokeColor: "black",
      });
    });
  });

  update();
}

// Calculate distance between nodes and update polyline weight
const update = () => {
  arcs.forEach((arc) => {
    arc.updateWeight();
    arc.path = [arc.nodoA.Marker.getPosition(), arc.nodoB.Marker.getPosition()];
    arc.poly.setPath(arc.path);

    const arcInfo = document.getElementById(`arc-${arc.nodoA.label}-${arc.nodoB.label}`);
    if (arcInfo) {
      arcInfo.innerHTML = `La distancia entre el nodo ${arc.nodoA.Marker.label} y ${arc.nodoB.Marker.label} es de: ${arc.weight} metros`;
    }
  });
};

window.initMap = initMap;
