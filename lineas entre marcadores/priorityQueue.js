class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(element, priority) {
    const queueElement = { element, priority };

    if (this.isEmpty()) {
      this.queue.push(queueElement);
    } else {
      let added = false;
      for (let i = 0; i < this.queue.length; i++) {
        if (queueElement.priority < this.queue[i].priority) {
          this.queue.splice(i, 0, queueElement);
          added = true;
          break;
        }
      }
      if (!added) {
        this.queue.push(queueElement);
      }
    }
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.queue.shift();
  }

  front() {
    if (this.isEmpty()) {
      return null;
    }
    return this.queue[0];
  }

  isEmpty() {
    return this.queue.length === 0;
  }

  size() {
    return this.queue.length;
  }

  clear() {
    this.queue = [];
  }
}

export default PriorityQueue;
