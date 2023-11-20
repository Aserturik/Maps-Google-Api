class nodo{
  constructor(map, label, lat, lng, color){
    this.map = map;
    this.label = label;
    this.lat = lat;
    this.lng = lng;
    this.color = color;
    this.Marker = new google.maps.Marker({
      map,
      draggable: true,
      clickable: true,
      label: label,
      position: { lat: lat, lng: lng},
    });
  }

  contextMenu(){
    console.log("contextMenu");
  }
}

export default nodo;
