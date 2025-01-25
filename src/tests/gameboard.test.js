import { Gameboard, GameboardSquare } from '../modules/gameboard.js';
import { Ship } from '../modules/ship.js';

describe('Gameboard', () => {
  let gameboard;
  let ship;

  beforeEach(() => {
    gameboard = new Gameboard();
    ship = new Ship('carrier', 5);
  });

  describe('Ship placement', () => {
    test('Valid horizonal', () => {
      expect(gameboard.isShipPlacementValid(ship, [3, 2], true)).toBeTruthy();
    });

    test('Valid vertical', () => {
      expect(gameboard.isShipPlacementValid(ship, [8, 3], false)).toBeTruthy();
    });

    test('Invalid horizonal', () => {
      expect(gameboard.isShipPlacementValid(ship, [8, 2], true)).toBeFalsy();
    });

    test('Invalid vertical', () => {
      expect(gameboard.isShipPlacementValid(ship, [3, 5], false)).toBeFalsy();
    });

    test('Only squares where ship is placed are truthy', () => {
      gameboard.placeShip(ship, [3, 2], true);
      for (let x = 0; x <= 9; x++) {
        for (let y = 0; y <= 9; y++) {
          if (y === 2 && [3, 4, 5, 6, 7].includes(x)) {
            expect(gameboard.board[y][x].ship).toBeTruthy();
          } else {
            expect(gameboard.board[y][x].ship).toBeFalsy();
          }
        }
      }
    });
  });

  test('Remove ship', () => {
    gameboard.placeShip(ship, [3, 2], true);
    gameboard.removeShip(ship);
    for (let x = 0; x <= 9; x++) {
      for (let y = 0; y <= 9; y++) {
        expect(gameboard.board[y][x].ship).toBeFalsy();
      }
    }
  });

  describe('Check squares', () => {
    beforeEach(() => {
      gameboard.placeShip(ship, [3, 2], true);
    });

    test('Ship present and attacked', () => {
      gameboard.board[2][5].attacked = true;
      expect(gameboard.checkSquare(5, 2)).toEqual('hit');
    });

    test('Shot fired but no ship', () => {
      gameboard.board[7][1].attacked = true;
      expect(gameboard.checkSquare(1, 7)).toEqual('miss');
    });

    test('Ship present but not attacked', () => {
      expect(gameboard.checkSquare(5, 2)).toEqual('unharmed');
    });

    test('No ship and has not been attacked', () => {
      expect(gameboard.checkSquare(1, 7)).toEqual('empty');
    });
  });

  test('Ship successfully hit', () => {
    gameboard.placeShip(ship, [3, 2], true);
    gameboard.receiveAttack(5, 2);
    for (let i = 0; i < 5; i++) {
      expect(gameboard.board[2][3 + i].ship.timesHit).toBe(1);
    }
  });

  describe('Check if all ships destroyed', () => {
    beforeEach(() => {
      gameboard.placeShip(ship, [3, 2], true);
    });

    test('All destroyed', () => {
      for (let i = 3; i <= 7; i++) {
        gameboard.receiveAttack(i, 2);
      }
      expect(gameboard.areAllShipsDestroyed()).toBeTruthy();
    });

    test('Not all destroyed', () => {
      for (let i = 3; i <= 6; i++) {
        gameboard.receiveAttack(i, 2);
      }
      expect(gameboard.areAllShipsDestroyed()).toBeFalsy();
    });
  });
});

describe('GameboardSquare', () => {
  let square;

  beforeEach(() => {
    square = new GameboardSquare();
  });

  describe('Check status', () => {
    test('Ship present and attacked', () => {
      square.attacked = true;
      square.ship = new Ship();
      expect(square.status()).toEqual('hit');
    });

    test('Shot fired but no ship', () => {
      square.attacked = true;
      expect(square.status()).toEqual('miss');
    });

    test('Ship present but not attacked', () => {
      square.ship = new Ship();
      expect(square.status()).toEqual('unharmed');
    });

    test('No ship and has not been attacked', () => {
      expect(square.status()).toEqual('empty');
    });
  });
});
