import { Player, ComputerPlayer } from '../modules/player.js';
import { Gameboard } from '../modules/gameboard.js';

test('toggleTurn method should change isTurn boolean', () => {
  let player = new Player('Jimmy');
  player.toggleTurn();
  expect(player.isTurn).toBeTruthy();
  player.toggleTurn();
  expect(player.isTurn).toBeFalsy();
});

test('ComputerPlayer should have same properties as Player', () => {
  let cpuPlayer = new ComputerPlayer('Jimmy');
  expect(cpuPlayer.name).toBe('Jimmy');
  expect(cpuPlayer.gameboard).toEqual(new Gameboard());
  expect(cpuPlayer.isTurn).toBeFalsy();
});
