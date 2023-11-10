class arco{
  constructor(map, nodoA, nodoB){
    this.poly = new google.maps.Polyline({
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 3,
      zIndex:2,
      map: map,
    });
    this.nodoA = nodoA;
    this.nodoB = nodoB;
    this.path = [nodoA.Marker.getPosition(), nodoB.Marker.getPosition()];
    this.poly.setPath(this.path);
  }
}

export default arco;
