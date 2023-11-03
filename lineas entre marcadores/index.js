// This example requires the Geometry library. Include the libraries=geometry
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=geometry">
let marker1, marker2;
let poly, geodesicPoly;

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: { lat: 5.554669754471106, lng: -73.35761563444203},
  });

  map.controls[google.maps.ControlPosition.TOP_CENTER].push(
    document.getElementById("info"),
  );
  marker1 = new google.maps.Marker({
    map,
    draggable: true,
    label: "A",
    position: { lat: 5.554669754471106, lng: -73.35761563444203 },
  });
  marker2 = new google.maps.Marker({
    map,
    draggable: true,
    label: "B",
    position: { lat: 5.551582897545935, lng: -73.35286297239529 },
  });

  const bounds = new google.maps.LatLngBounds(
    marker1.getPosition(),
    marker2.getPosition(),
  );

  map.fitBounds(bounds);
  google.maps.event.addListener(marker1, "position_changed", update);
  google.maps.event.addListener(marker2, "position_changed", update);
  poly = new google.maps.Polyline({
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 3,
    zIndex:2,
    map: map,
  });


  geodesicPoly = new google.maps.Polyline({
    
  });
  update();
}

function update() {
  const path = [marker1.getPosition(), marker2.getPosition()];

  poly.setPath(path);
  // poner en la polylinea la distancia entre los marcadores
  
  geodesicPoly.setPath(path);

  const heading = google.maps.geometry.spherical.computeHeading(
    path[0],
    path[1],
  );

  document.getElementById("heading").value = String(heading);
  document.getElementById("origin").value = String(path[0]);
  document.getElementById("destination").value = String(path[1]);

  const distance = google.maps.geometry.spherical.computeDistanceBetween(path[0], path[1]);
  console.log(distance);

  
}

window.initMap = initMap;
