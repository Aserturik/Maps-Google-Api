let arcs = [];
let nodes = [];

// importar la clase nodo
import nodo from "./nodo.js";
import arco from "./arco.js";

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 5.554669754471106, lng: -73.35761563444203},
    fullscreenControl:true,
    mapTypeControl:true,
    streetViewControl:false,
    zoom:20,
    zoomControl:true,
    maxZoom:19,
  });

  // Arreglo de la clase nodo
  nodes = [
    new nodo(map, "A", 5.552026661382956, -73.35666170388217),
    new nodo(map, "B", 5.551469188599672, -73.35649737223628),
    new nodo(map, "C", 5.551513535293195, -73.35715795891471),
    new nodo(map, "D", 5.553695140693053, -73.35607699367031),
    new nodo(map, "E", 5.554026661382344, -73.35666170384355),
    new nodo(map, "F", 5.555469188595435, -73.35649737223454),
    new nodo(map, "G", 5.556513535234666, -73.35715795846456),
    new nodo(map, "H", 5.557695140693532, -73.35607699323432),
    new nodo(map, "I", 5.558695140653456, -73.35607699345634),
    new nodo(map, "J", 5.559695140532453, -73.35607699534667),
  ];

  map.controls[google.maps.ControlPosition.TOP_CENTER].push(
    document.getElementById("info"),
  );

  // Arreglo de la clase arco
  arcs = [
  new arco(map, nodes[0], nodes[1]),
  new arco(map, nodes[1], nodes[2]),
  new arco(map, nodes[2], nodes[3]),
  new arco(map, nodes[3], nodes[0]),
  new arco(map, nodes[4], nodes[5]),
  new arco(map, nodes[5], nodes[6]),
  new arco(map, nodes[6], nodes[7]),
  new arco(map, nodes[7], nodes[4]),
  new arco(map, nodes[8], nodes[9]),
  new arco(map, nodes[9], nodes[0]),
  ];
  
  for (let i = 0; i < nodes.length; i++) {
    google.maps.event.addListener(nodes[i].Marker, "position_changed", update);
  }

  update();
}

function update() {

  for (let i = 0; i < arcs.length; i++) {
    arcs[i].path = [arcs[i].nodoA.Marker.getPosition(), arcs[i].nodoB.Marker.getPosition()];
    arcs[i].poly.setPath(arcs[i].path);
  }

  // const distance = google.maps.geometry.spherical.computeDistanceBetween(path[0], path[1]);

  // document.getElementById("distance").value = String(distance);
  // document.getElementById("origin").value = String(marker1.label);
  // document.getElementById("destination").value = String(marker2.label);
}

window.initMap = initMap;
