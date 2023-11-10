let marker1, marker2, marker3, marker4, marker5, marker6, marker7, marker8, marker9, marker10;
let poly, poly2;

// importar la clase nodo
import nodo from "./nodo.js";
import arco from "./arco.js";



function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 5.554669754471106, lng: -73.35761563444203},
    fullscreenControl:true,
    mapTypeControl:true,
    streetViewControl:false,
    zoom:16,
    zoomControl:true,
    maxZoom:20,
  });

  // Arreglo de la clase nodo
const nodes = [
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

// Arreglo de la clase arco
const arcs = [
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

  map.controls[google.maps.ControlPosition.TOP_CENTER].push(
    document.getElementById("info"),
  );
  /*
  marker1 = new google.maps.Marker({
    map,
    draggable: true,
    label: "A",
    position: { lat: 5.552026661382956, lng: -73.35666170388217},
  });
  marker2 = new google.maps.Marker({
    map,
    draggable: true,
    label: "B",
    position: { lat: 5.551469188599672, lng: -73.35649737223628},
  });
  marker3 = new google.maps.Marker({
    map,
    draggable: true,
    label: "C",
    position: { lat: 5.551513535293195, lng:  -73.35715795891471},
  });
  marker4 = new google.maps.Marker({
    map,
    draggable: true,
    label: "D",
    position: { lat: 5.551695140693053, lng:  -73.35607699367031},
  });
  */
  const bounds = new google.maps.LatLngBounds(
  
  // marker1.getPosition(),
  // marker2.getPosition(),
  // marker3.getPosition(),
  // marker4.getPosition(),

  nodes[0].Marker.getPosition(),
  nodes[1].Marker.getPosition(),
  nodes[2].Marker.getPosition(),
  nodes[3].Marker.getPosition(),
  nodes[4].Marker.getPosition(),
  nodes[5].Marker.getPosition(),
  nodes[6].Marker.getPosition(),
  nodes[7].Marker.getPosition(),
  nodes[8].Marker.getPosition(),
  nodes[9].Marker.getPosition(),
  );
    
  // google.maps.event.addListener(marker1, "position_changed", update);
  // google.maps.event.addListener(marker2, "position_changed", update);
  // google.maps.event.addListener(marker3, "position_changed", update);
  // google.maps.event.addListener(marker4, "position_changed", update);
  
  for (let i = 0; i < nodes.length; i++) {
    google.maps.event.addListener(nodes[i].Marker, "position_changed", update);
  }


  poly = new google.maps.Polyline({
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 3,
    zIndex:2,
    map: map,
  });

  poly2 = new google.maps.Polyline({
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 3,
    zIndex:2,
    map: map,
  });

  update();
}

function update() {
  const path = [marker1.getPosition(), marker2.getPosition()];
  const path2 = [marker3.getPosition(), marker1.getPosition()];

  poly.setPath(path);
  poly2.setPath(path2);

  const distance = google.maps.geometry.spherical.computeDistanceBetween(path[0], path[1]);

  document.getElementById("distance").value = String(distance);
  document.getElementById("origin").value = String(marker1.label);
  document.getElementById("destination").value = String(marker2.label);
}

window.initMap = initMap;
