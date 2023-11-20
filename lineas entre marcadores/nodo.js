const nodeArcs = [];
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

    this.Marker.setIcon({
      path: google.maps.SymbolPath.CIRCLE,
      scale: 20,
      fillColor: "red",
      fillOpacity: 1,
      strokeWeight: 1,
      strokeColor: "black",
    });
  }

  contextMenu(){
    console.log("contextMenu");
  }

  setArcs(nodeArcs){
    console.log("Nombre del nodo: " + this.label);
    console.log("Arcos del nodo: " + nodeArcs);
    this.nodeArcs = nodeArcs;
  }

  getArcs(){
    return nodeArcs;
  }
}

export default nodo;
