class arco{
  constructor(map, markerA, markerB){
    this.poly = new google.maps.Polyline({
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 3,
      zIndex:2,
      map: map,
    });

    this.path = [markerA.getPosition(), markerB.getPosition()];
  }
}
