class Graph {
  constructor() {
    this.elements = new Map();
    this.resultElements = new Map();
    this.existingIDs = [];
  }

  addElement(element) {
    element.idElement = this.getUniqueID();
    this.elements.set(element.idElement, element);
  }

  addNodes(nodeA, nodeB) {
    //this.addElement(nodeA);
    //this.addElement(nodeB);
  }

  getUniqueID() {
    let id = 0;
    while (this.existingIDs.includes(id)) {
      id++;
    }
    this.existingIDs.push(id);
    return id;
  }

  getElements() {
    return this.elements;
  }

  getElement(id) {
    return this.elements.get(id) || null;
  }

  getResultElements() {
    return this.resultElements;
  }

  clearResultElements() {
    this.resultElements.clear();
  }

  getExistingIDs() {
    return this.existingIDs;
  }

  setExistingIDs(existingIDs) {
    this.existingIDs = existingIDs;
  }

  setElements(elements) {
    this.elements = elements;
  }

  setResultElements(resultElements) {
    this.resultElements = resultElements;
  }

  calculateShortestRoute(origin, destine, attributeToCompare) {
    const temporalValues = this.getAllTheChildren(origin, []);
    const finalValues = new Map(temporalValues);
    if (temporalValues.has(origin) && temporalValues.has(destine)) {
      temporalValues.set(origin, 0.0);
      this.dijkstra(temporalValues, finalValues, attributeToCompare);
      this.addElementsToShortestRoute(finalValues, destine, attributeToCompare, []);
    }
  }

  getDistanceBetweenPoints(point1, point2) {
    const lat1Rad = this.toRadians(point1.geoPosition.latitude);
    const lat2Rad = this.toRadians(point2.geoPosition.latitude);

    const deltaLat = lat2Rad - lat1Rad;
    const deltaLon = this.toRadians(point2.geoPosition.longitude) - this.toRadians(point1.geoPosition.longitude);

    const sinDeltaLatSquared = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2);
    const sinDeltaLonSquared = Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

    const a = sinDeltaLatSquared + Math.cos(lat1Rad) * Math.cos(lat2Rad) * sinDeltaLonSquared;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.RADIUS * c * 1000;
  }

  deleteElement(id) {
    this.elements.delete(id);
  }

  getAllTheChildren(origin, parents) {
    const temporalValues = new Map();
    temporalValues.set(origin, Number.MAX_VALUE);
    if (parents.includes(origin)) {
      return temporalValues;
    }
    for (const element of this.getChildren(origin)) {
      temporalValues.set(element.idElement, Number.MAX_VALUE);
      parents.push(origin);
      const childrenValues = this.getAllTheChildren(element.idElement, parents);
      for (const [key, value] of childrenValues) {
        temporalValues.set(key, value);
      }
    }
    return temporalValues;
  }

  addElementsToShortestRoute(finalValues, currentId, attributeToCompare, parents) {
    parents.push(currentId);
    for (const child of this.getNonOrientationChildren(currentId)) {
      const childId = child.idElement;
      if (!parents.includes(childId) && finalValues.has(childId)) {
        const route = this.getRouteBetween(currentId, childId);
        const childValue = finalValues.get(childId) + this.getValueOfAttribute(route, attributeToCompare);
        if (childValue === finalValues.get(currentId)) {
          this.resultElements.set(childId, this.elements.get(childId));
          this.resultElements.set(currentId, this.elements.get(currentId));
          this.resultElements.set(route.idElement, this.elements.get(route.idElement));
          this.addElementsToShortestRoute(finalValues, childId, attributeToCompare, parents);
        }
      }
    }
  }

  getValueOfAttribute(element, attributeToCompare) {
    const route = element.mapRoute;
    if (!route) throw new Error("La ruta no existe entre los puntos seleccionados");
    const distance = this.getDistanceBetweenPoints(route.point1, route.point2);
    const speed = route.speedRoute;
    switch (attributeToCompare) {
      case this.TIME:
        return distance / (route.typeRoute === "PAVING" ? speed : route.typeRoute === "ROAT_RECEBO" ? speed * 0.9 : route.typeRoute === "ADOQUINATE" ? speed * 0.8 : route.typeRoute === "TRAIL" ? speed * 0.7 : route.typeRoute === "OTHER" ? speed * 0.6 : 0);
      case this.DISTANCE:
        return distance;
      default:
        return 0;
    }
  }

  dijkstra(temporalValues, finalValues, attributeToCompare) {
    const idMinPoint = this.getMinPoint(new Map(temporalValues), new Map(finalValues));
    finalValues.set(idMinPoint, temporalValues.get(idMinPoint));
    this.setTemporalValues(idMinPoint, this.getChildren(idMinPoint), temporalValues, attributeToCompare);
    if (Array.from(finalValues.values()).includes(Number.MAX_VALUE)) {
      this.dijkstra(temporalValues, finalValues, attributeToCompare);
    }
  }

  getMinPoint(temporalValues, finalValues) {
    const minKey = Array.from(temporalValues.keys()).reduce((min, key) => temporalValues.get(key) < temporalValues.get(min) ? key : min, -1);
    if (finalValues.get(minKey) !== Number.MAX_VALUE) {
      temporalValues.delete(minKey);
      return this.getMinPoint(temporalValues, finalValues);
    }
    return minKey;
  }

  setTemporalValues(idMinPoint, children, temporalValues, attributeToCompare) {
    for (const child of children) {
      const idChildPoint = child.idElement;
      const temporalValue = temporalValues.get(idMinPoint) + this.getValueOfAttribute(this.getRouteBetween(idChildPoint, idMinPoint), attributeToCompare);
      if (temporalValues.get(idChildPoint) === Number.MAX_VALUE) {
        temporalValues.set(idChildPoint, temporalValue);
      } else if (temporalValue < temporalValues.get(idChildPoint)) {
        temporalValues.set(idChildPoint, temporalValue);
      }
    }
  }

  getRouteBetween(point1, point2) {
    for (const element of this.elements.values()) {
      if (element.elementType === "ROUTE") {
        const route = element.mapRoute;
        if ((route.point1.idElement === point1 && route.point2.idElement === point2) || (route.point1.idElement === point2 && route.point2.idElement === point1)) {
          return element;
        }
      }
    }
    return null;
  }

  getNonOrientationChildren(actualPoint) {
    const children = [];
    for (const element of this.elements.values()) {
      if (element.elementType === "ROUTE") {
        const route = element.mapRoute;
        this.addChildrenBoth(actualPoint, children, route);
      }
    }
    return children;
  }

  getChildren(idPoint) {
    const children = [];
    for (const element of this.elements.values()) {
      if (element.elementType === "ROUTE") {
        const route = element.mapRoute;
        switch (route.orientationRoutes) {
          case "BOTH":
            this.addChildrenBoth(idPoint, children, route);
            break;
          case "ORIGIN_DESTIN":
            this.addChildrenOriginDestin(idPoint, children, route);
            break;
          case "DESTIN_ORIGIN":
            this.addChildrenDestinOrigin(idPoint, children, route);
            break;
        }
      }
    }
    return children;
  }

  addChildrenBoth(idPoint, children, route) {
    if (route.point1.idElement === idPoint) {
      children.push(route.point2);
    } else if (route.point2.idElement === idPoint) {
      children.push(route.point1);
    }
  }

  addChildrenOriginDestin(idPoint, children, route) {
    if (route.point1.idElement === idPoint) {
      children.push(route.point2);
    }
  }

  addChildrenDestinOrigin(idPoint, children, route) {
    if (route.point2.idElement === idPoint) {
      children.push(route.point1);
    }
  }
}

// Constantes
Graph.TIME = 0;
Graph.DISTANCE = 1;
Graph.RADIUS = 6371;

export default Graph;
