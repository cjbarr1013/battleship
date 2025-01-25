import { Player } from './player.js';
import { Ship } from './ship.js';

export function PregameController(domManager) {
  // Initialize HTML
  domManager.initPregamePage();

  // Initialize ship placement objects and variables
  const player1 = new Player('Player 1', 'p1');
  const computer = new Player('Computer', 'p2');
  let activePlayer = player1;

  const ships = [
    new Ship('carrier', 5),
    new Ship('battleship', 4),
    new Ship('cruiser', 3),
    new Ship('submarine', 3),
    new Ship('destroyer', 2),
  ];

  let activeShipIndex = 0;
  let activeShip = ships[activeShipIndex];
  domManager.addActiveShipIndicator(activeShip);
  domManager.toggleStartGameDisabled();
  let horizontal = true;

  // Initialize event listeners
  const startBtn = document.querySelector('#start-game');
  const rotateBtn = document.querySelector('#rotate');
  const undoBtn = document.querySelector('#undo');
  const randomizeBtn = document.querySelector('#randomize');
  const squares = document.querySelectorAll('.board > div');

  startBtn.addEventListener('click', () => {
    initComputerPlayer();
    IngameController(domManager, player1, computer);
  });

  squares.forEach((square) => {
    square.addEventListener('click', () => {
      if (activeShipIndex < ships.length) {
        placeShip(square.id);
      }
    });
  });

  squares.forEach((square) => {
    square.addEventListener('mouseover', (e) => {
      domManager.showShipPlacementHighlight(
        activeShip,
        horizontal,
        e.target.id,
        true
      );
    });
  });

  squares.forEach((square) => {
    square.addEventListener('mouseout', (e) => {
      domManager.showShipPlacementHighlight(
        activeShip,
        horizontal,
        e.target.id,
        false
      );
    });
  });

  rotateBtn.addEventListener('click', () => {
    rotateShip();
  });

  undoBtn.addEventListener('click', () => {
    if (activeShipIndex > 0) {
      removeShip();
    }
  });

  randomizeBtn.addEventListener('click', () => {
    if (activeShipIndex < ships.length) {
      placeShipRandom();
    }
  });

  // Button methods
  function placeShip(squareID) {
    let start = squareID.split('-')[1].split('');
    start = start.map((item) => parseInt(item));

    if (
      activePlayer.gameboard.isShipPlacementValid(activeShip, start, horizontal)
    ) {
      activePlayer.gameboard.placeShip(activeShip, start, horizontal);
      if (activePlayer.id === 'p1') {
        domManager.displayAllShips(activePlayer);
      }
      nextShip();
    }
  }

  function rotateShip() {
    horizontal = !horizontal ? true : false;
  }

  function removeShip() {
    previousShip();
    activePlayer.gameboard.removeShip(activeShip);
    domManager.displayAllShips(activePlayer);
  }

  function nextShip() {
    activeShipIndex += 1;
    if (activeShipIndex < ships.length) {
      activeShip = ships[activeShipIndex];
      if (activePlayer.id === 'p1') {
        domManager.addActiveShipIndicator(activeShip);
      }
    } else {
      if (activePlayer.id === 'p1') {
        domManager.toggleStartGameDisabled();
      }
    }
  }

  function previousShip() {
    if (activeShipIndex >= ships.length) {
      domManager.toggleStartGameDisabled();
    }
    activeShipIndex -= 1;
    activeShip = ships[activeShipIndex];
    domManager.addActiveShipIndicator(activeShip);
  }

  function placeShipRandom() {
    let oldIndex = activeShipIndex;
    while (activeShipIndex === oldIndex) {
      const randomX = Math.floor(Math.random() * 10);
      const randomY = Math.floor(Math.random() * 10);
      horizontal = [true, false].at(Math.floor(Math.random() * 2));
      placeShip(`${activePlayer.id}-${randomX}${randomY}`);
    }
  }

  function initComputerPlayer() {
    activePlayer = computer;
    activeShipIndex = 0;
    activeShip = ships[activeShipIndex];

    for (let i = 0; i < ships.length; i++) {
      placeShipRandom();
    }
  }
}

function IngameController(domManager, player1, computer) {
  // Initialize HTML
  domManager.initIngamePage();
  domManager.displayAllShips(player1);
  domManager.displayAllShips(computer);

  // Initialize buttons
  const newGameBtn = document.querySelector('#new-game');
  const squares = document.querySelectorAll('.board > div');

  newGameBtn.addEventListener('click', () => {
    PregameController(domManager);
  });

  squares.forEach(() => {});

  // Initialize gameplay objects and variables
}
