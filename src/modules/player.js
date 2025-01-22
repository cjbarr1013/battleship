import { Gameboard } from './gameboard.js';

export class Player {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.gameboard = new Gameboard();
    this.isTurn = false;
  }

  toggleTurn() {
    this.isTurn = this.isTurn ? false : true;
  }
}

export class ComputerPlayer extends Player {
  constructor(name) {
    super(name);
  }
}
