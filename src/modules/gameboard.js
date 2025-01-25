export class Gameboard {
  constructor() {
    this.board = this.#constructBoard();
  }

  #constructBoard() {
    let baseArr = Array(10).fill();
    for (let i = 0; i < baseArr.length; i++) {
      baseArr[i] = Array(10)
        .fill()
        .map(() => new GameboardSquare());
    }

    // Add IDs to squares
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        baseArr[y][x].id = `${x}${y}`;
      }
    }

    return baseArr;
  }

  isShipPlacementValid(ship, start, horizontal) {
    if (horizontal) {
      if (start[0] + (ship.length - 1) > 9) return false;
    } else {
      if (start[1] + (ship.length - 1) > 9) return false;
    }
    return true;
  }

  placeShip(ship, start, horizontal = true) {
    const x = start[0];
    const y = start[1];

    if (horizontal) {
      for (let i = 0; i < ship.length; i++) {
        this.board[y][x + i].ship = ship;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        this.board[y + i][x].ship = ship;
      }
    }
  }

  removeShip(ship) {
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        if (
          this.board[y][x].ship !== null &&
          this.board[y][x].ship.name === ship.name
        ) {
          this.board[y][x].ship = null;
        }
      }
    }
  }

  checkSquare(x, y) {
    return this.board[y][x].status();
  }

  receiveAttack(x, y) {
    this.board[y][x].attacked = true;
    if (this.checkSquare(x, y) === 'hit') {
      this.board[y][x].ship.hit();
    }
  }

  areAllShipsDestroyed() {
    for (let y = 0; y <= 9; y++) {
      for (let x = 0; x <= 9; x++) {
        if (this.checkSquare(x, y) === 'unharmed') return false;
      }
    }
    return true;
  }
}

export class GameboardSquare {
  constructor() {
    this.attacked = false;
    this.ship = null;
    this.id = null;
  }

  status() {
    if (this.attacked && this.ship) {
      return 'hit';
    } else if (this.attacked && !this.ship) {
      return 'miss';
    } else if (!this.attacked && this.ship) {
      return 'unharmed';
    } else {
      return 'empty';
    }
  }
}
