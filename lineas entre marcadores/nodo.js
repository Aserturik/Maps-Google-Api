class nodo{
  constructor(map, label, lat, lng){
    this.map = map;
    this.label = label;
    this.lat = lat;
    this.lng = lng;
    this.Marker = new google.maps.Marker({
      map,
      draggable: true,
      clickable: true,
      label: label,
      position: { lat: lat, lng: lng},
    });
  }
}

export default nodo;
