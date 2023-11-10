let marker1, marker2, marker3, marker4, marker5, marker6, marker7, marker8, marker9, marker10;
let poly, poly2;

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

  map.controls[google.maps.ControlPosition.TOP_CENTER].push(
    document.getElementById("info"),
  );

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

  const bounds = new google.maps.LatLngBounds(

    //for (Node: node){
    // Aqui va el for de rellenar a los nodos con el marker.getPosition
    //  node.getPosition()
    //}

    marker1.getPosition(),
    marker2.getPosition(),
    marker3.getPosition(),
    marker4.getPosition(),
  );

  map.fitBounds(bounds);
  google.maps.event.addListener(marker1, "position_changed", update);
  google.maps.event.addListener(marker2, "position_changed", update);
  google.maps.event.addListener(marker3, "position_changed", update);
  google.maps.event.addListener(marker4, "position_changed", update);
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
