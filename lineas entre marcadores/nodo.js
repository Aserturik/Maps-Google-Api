class nodo{
  constructor(map, label, lat, lng){
    this.Marker = new google.maps.Marker({
      map,
      draggable: true,
      label: label,
      position: { lat: lat, lng: lng},
    });
  }
}

export default nodo;
