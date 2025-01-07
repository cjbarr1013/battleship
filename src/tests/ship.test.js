import { Ship } from '../modules/ship';

let myShip;

beforeEach(() => {
  myShip = new Ship('destroyer', 5);
});

test('Calling hit() should increase timesHit by one', () => {
  myShip.hit();
  expect(myShip.timesHit).toBe(1);
});

test('Length > times hit, ship should not be sunk', () => {
  myShip.timesHit = 3;
  expect(myShip.isSunk()).toBeFalsy();
});

test('Length == times hit, ship should be sunk', () => {
  myShip.timesHit = 5;
  expect(myShip.isSunk()).toBeTruthy();
});

test('Length < times hit, ship should be sunk', () => {
  myShip.timesHit = 6;
  expect(myShip.isSunk()).toBeTruthy();
});
