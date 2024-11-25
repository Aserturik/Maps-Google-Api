class arco{
  constructor(map, nodoA, nodoB, id){
    this.id = id;
    this.map = map;
    this.nodoA = nodoA;
    this.nodoB = nodoB;
    this.path = [nodoA.Marker.getPosition(), nodoB.Marker.getPosition()];
    this.poly = new google.maps.Polyline({
      path: this.path,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 3,
      zIndex:2,
      map: map,
    });
    this.poly.setPath(this.path);
    this.poly.setMap(map);
    this.updateWeight();
  }

  updateWeight() {
    const distance = google.maps.geometry.spherical.computeDistanceBetween(
      this.nodoA.Marker.getPosition(),
      this.nodoB.Marker.getPosition()
    );
    this.weight = distance.toFixed(2);
  }

  changeColorPoly(color){
    this.poly.setOptions({strokeColor: color});
  }
}


export default arco;
