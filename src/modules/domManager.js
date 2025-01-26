export function GameDOMManager() {
  const contentLoader = ContentLoader();

  const initPregamePage = () => {
    contentLoader.loadPregameHTML();
  };

  const initIngamePage = () => {
    contentLoader.loadIngameHTML();
  };

  // Apply ship-active-indicator class to ship currently being placed
  const addActiveShipIndicator = (ship) => {
    removeAllActiveShipIndicators();
    const shipContainer = document.querySelector(`.${ship.name} > div > div`);
    shipContainer.classList.add('ship-active-indicator');
  };

  const removeAllActiveShipIndicators = () => {
    const allContainers = document.querySelectorAll('.ship-name > div');
    allContainers.forEach((container) => (container.classList = ''));
  };

  // Change length of highlighted squares based on ship being placed
  const showShipPlacementHighlight = (ship, horizontal, squareID, show) => {
    let start = squareID.split('-')[1].split('');
    start = start.map((item) => parseInt(item));

    for (let i = 0; i < ship.length; i++) {
      try {
        const square = document.querySelector(`#p1-${start[0]}${start[1]}`);
        if (show) square.classList.add('ship-placement-hover');
        else square.classList.remove('ship-placement-hover');
      } catch {
        null;
      }

      if (horizontal) start[0] += 1;
      else start[1] += 1;
    }
  };

  const toggleStartGameDisabled = () => {
    const btn = document.querySelector('#start-game');
    btn.disabled = btn.disabled ? false : true;
  };

  const toggleNewGameDisabled = () => {
    const btn = document.querySelector('#new-game');
    btn.disabled = btn.disabled ? false : true;
  };

  const displayAllShips = (player) => {
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const square = document.querySelector(`#${player.id}-${x}${y}`);
        square.classList.remove('ship-present');
        if (player.gameboard.board[y][x].ship) {
          square.classList.add('ship-present');
        }
      }
    }
  };

  const showSquareStatus = (status, player, x, y) => {
    const square = document.querySelector(`#${player.id}-${x}${y}`);
    if (status === 'hit') {
      square.classList.add('attack-hit');
    } else if (status === 'miss') {
      square.classList.add('attack-miss');
    }
  };

  return {
    initPregamePage,
    initIngamePage,
    addActiveShipIndicator,
    showShipPlacementHighlight,
    toggleStartGameDisabled,
    toggleNewGameDisabled,
    displayAllShips,
    showSquareStatus,
  };
}

function ContentLoader() {
  const pageContainer = document.querySelector('.page-container');

  const loadPregameHTML = () => {
    pageContainer.classList = '';
    pageContainer.classList.add('page-container', 'pregame-page-height');

    const pregameContentContainer = pageContainer.querySelector('div');
    pregameContentContainer.classList = 'pregame-content-container';
    pregameContentContainer.innerHTML = '';

    const pregameLeftContainer = document.createElement('div');
    pregameLeftContainer.classList = 'pregame-left';

    const pregameRightContainer = document.createElement('div');
    pregameRightContainer.classList = 'pregame-right';

    pregameLeftContainer.innerHTML += getPregameLeftHTML();
    pregameRightContainer.innerHTML += getPregameRightHTML();

    pregameContentContainer.appendChild(pregameLeftContainer);
    pregameContentContainer.appendChild(pregameRightContainer);
  };

  const loadIngameHTML = () => {
    pageContainer.classList = 'page-container';

    const ingameContentContainer = pageContainer.querySelector('div');
    ingameContentContainer.classList = 'ingame-content-container';
    ingameContentContainer.innerHTML = '';

    const gameContainer = document.createElement('div');
    gameContainer.classList = 'game-container';

    const msgContainer = document.createElement('div');
    msgContainer.classList = 'msg-container';

    gameContainer.innerHTML += getPlayersHTML();
    msgContainer.innerHTML += getIngameMsgHTML();

    ingameContentContainer.appendChild(gameContainer);
    ingameContentContainer.appendChild(msgContainer);
  };

  const getPregameLeftHTML = () => {
    return `
      <h2>Ready for Battle?</h2>
      <p>Place your ships to get started.</p>
      <button id="start-game">Start Game</button>
    `;
  };

  const getPregameRightHTML = () => {
    const p1Container = document.createElement('div');
    p1Container.classList = 'pregame-player-container';

    p1Container.innerHTML = getPlayer1HTML();
    p1Container.innerHTML += getPlaceShipNavHTML();

    return p1Container.outerHTML;
  };

  const getPlayersHTML = () => {
    const p2Container = document.createElement('div');
    p2Container.classList = 'player-container';
    p2Container.id = 'player-2';
    p2Container.innerHTML = getPlayer2HTML();

    const p1Container = document.createElement('div');
    p1Container.classList = 'player-container';
    p1Container.id = 'player-1';
    p1Container.innerHTML = getPlayer1HTML();

    return p2Container.outerHTML + p1Container.outerHTML;
  };

  const getPlayer2HTML = () => {
    let player2HTML = '';

    player2HTML += getPlayerInfoHTML('Computer');
    player2HTML += getPlayerShipsHTML();
    player2HTML += getPlayerBoardHTML('p2');

    return player2HTML;
  };

  const getPlayer1HTML = () => {
    let player1HTML = '';

    player1HTML += getPlayerInfoHTML('Player 1');
    player1HTML += getPlayerBoardHTML('p1');
    player1HTML += getPlayerShipsHTML();

    return player1HTML;
  };

  const getPlayerInfoHTML = (playerName) => {
    return `
        <div class="player-info">
          <h2 class="name">${playerName}</h2>
          <div class="turn"></div>
        </div>
      `;
  };

  const getPlayerShipsHTML = () => {
    const shipsContainer = document.createElement('div');
    shipsContainer.classList = 'ships-container';

    const ships = [
      ['carrier', 5],
      ['battleship', 4],
      ['cruiser', 3],
      ['submarine', 3],
      ['destroyer', 2],
    ];

    ships.forEach((ship) => {
      shipsContainer.innerHTML += createShip(ship[0], ship[1]);
    });

    return shipsContainer.outerHTML;
  };

  const createShip = (shipName, length) => {
    let shipBlocks = '';
    for (let i = 0; i < length; i++) {
      shipBlocks += '<div class="ship-block"></div>';
    }

    return `
      <div class="ship ${shipName}">
        <div class="ship-name">
          <p>${shipName.charAt(0).toUpperCase() + shipName.slice(1)}</p>
          <div></div>
        </div>
        <div class="ship-blocks-container">
          ${shipBlocks}
        </div>
      </div>
    `;
  };

  const getPlayerBoardHTML = (id) => {
    const boardContainer = document.createElement('div');
    boardContainer.classList = 'board-container';
    boardContainer.innerHTML += createXLabel();
    boardContainer.innerHTML += createYLabel();
    boardContainer.innerHTML += createBoard(id);

    return boardContainer.outerHTML;
  };

  const createXLabel = () => {
    const xLabelContainer = document.createElement('div');
    xLabelContainer.classList = 'x-label';

    for (let i = 1; i <= 10; i++) {
      xLabelContainer.innerHTML += `<div>${i}</div>`;
    }
    return xLabelContainer.outerHTML;
  };

  const createYLabel = () => {
    const yLabelContainer = document.createElement('div');
    yLabelContainer.classList = 'y-label';

    const yLabels = 'ABCDEFGHIJ';
    for (let i = 0; i < yLabels.length; i++) {
      yLabelContainer.innerHTML += `<div>${yLabels[i]}</div>`;
    }
    return yLabelContainer.outerHTML;
  };

  const createBoard = (id) => {
    const boardContainer = document.createElement('div');
    boardContainer.classList = 'board';

    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const square = document.createElement('div');
        square.id = `${id}-${x}${y}`;
        boardContainer.appendChild(square);
      }
    }
    return boardContainer.outerHTML;
  };

  const getPlaceShipNavHTML = () => {
    return `
      <div class="pregame-place-ship-nav">
        <button id="rotate">Rotate</button>
        <button id="undo">Undo</button>
        <button id="randomize">Randomize</button>
      </div>
    `;
  };

  const getIngameMsgHTML = () => {
    return `
      <p id="ingame-msg">It's your turn... fire away!</p>
      <button id="new-game">New Game</button>
    `;
  };

  return {
    loadPregameHTML,
    loadIngameHTML,
  };
}
