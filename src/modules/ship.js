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
    if (length / this.timesHit <= 1) {
      this.sunk = true;
      return true;
    }
  }
}
