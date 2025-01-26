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

  // Methods
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
  domManager.toggleNewGameDisabled();

  // Initialize gameplay objects and variables
  let gameOver = false;

  // Initialize event listeners
  const newGameBtn = document.querySelector('#new-game');
  const squares = document.querySelectorAll('.board > div');

  newGameBtn.addEventListener('click', () => {
    PregameController(domManager);
  });

  squares.forEach((square) => {
    square.addEventListener('click', (e) => {
      manageAttackClick(e.target.id);
    });
  });

  // Methods

  function manageAttackClick(squareID) {
    if (!gameOver) {
      let coordinates = squareID.split('-')[1].split('');
      const x = coordinates[0];
      const y = coordinates[1];

      if (computer.gameboard.isAttackValid(x, y)) {
        playerAttack(x, y);
        if (!gameOver) {
          computerAttack();
        }
      }
    }
  }

  function playerAttack(x, y) {
    computer.gameboard.receiveAttack(x, y);
    const squareStatus = computer.gameboard.checkSquare(x, y);
    domManager.showSquareStatus(squareStatus, computer, x, y);
    checkGameStatus(computer);
  }

  const computerAttack = () => {
    while (true) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);

      if (player1.gameboard.isAttackValid(x, y)) {
        player1.gameboard.receiveAttack(x, y);
        const squareStatus = player1.gameboard.checkSquare(x, y);
        domManager.showSquareStatus(squareStatus, player1, x, y);
        checkGameStatus(player1);
        return;
      }
    }
  };

  function checkGameStatus(player) {
    if (player.gameboard.areAllShipsDestroyed()) {
      gameOver = true;
      endGame();
    }
  }

  function endGame() {
    domManager.displayAllShips(computer);
    domManager.toggleNewGameDisabled();
  }

  // Write event listener function that responds to board clicks
  // to drive gameplay

  // Write function that shows ship has been attacked on left/right
  // hand side of screen (domManager)

  // Write function that fills square with object that represents
  // its' status (hit, miss, no attack) (domManager)
}
