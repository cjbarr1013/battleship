export function ContentLoader() {
  const loadPregamePage = (pageContainer) => {
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

  const loadIngamePage = (pageContainer) => {
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

    const yLabels = 'ABCDEFGHIJ';
    for (let y = 0; y < yLabels.length; y++) {
      for (let x = 1; x <= 10; x++) {
        const square = document.createElement('div');
        square.id = `${id}-${x},${yLabels[y]}`;
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
    loadPregamePage,
    loadIngamePage,
  };
}

export function GameDOMManager() {
  // Pre-game

  // Apply ship-active-indicator class to ship currently being placed
  const addActiveShipIndicator = (shipName) => {
    removeAllActiveShipIndicators();
    const shipContainer = document.querySelector(`.${shipName} > div > div`);
    shipContainer.classList.add('ship-active-indicator');
  };

  const removeAllActiveShipIndicators = () => {
    const allContainers = document.querySelectorAll('.ship-name > div');
    allContainers.forEach((container) => (container.classList = ''));
  };

  // Change length of highlighted squares based on ship being placed

  // Change orientation of highlighted squares based on ship being placed

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
        if (player.gameboard[y][x].ship) {
          const square = document.querySelector(`#${player.id}-${x},${y}`);
          square.classList.add('ship-present');
        }
      }
    }
  };

  // const fillSquare = (status) => {
  //   switch (status) {
  //     case 'hit':
  //       // apply hit class
  //       break;
  //     case 'miss':
  //       // apply miss class
  //       break;
  //     case 'unharmed':
  //       // apply unharmed class
  //       break;
  //     case 'empty':
  //       // apply empty class
  //       break;
  //   }
  // };

  return {
    addActiveShipIndicator,
    toggleStartGameDisabled,
    toggleNewGameDisabled,
    displayAllShips,
  };
}
