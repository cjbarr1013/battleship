export class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.timesHit = 0;
    this.sunk = false;
  }

  hit() {
    this.timesHit++;
  }

  isSunk() {
    if (this.length / this.timesHit <= 1) {
      this.sunk = true;
    }
    return this.sunk;
  }
}
