export function ContentLoader() {
  const loadPregamePage = () => {};

  const loadIngamePage = (pageContainer) => {
    const ingameContentContainer = pageContainer.querySelector('div');
    ingameContentContainer.classlist = 'ingame-content-container';
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
    player1HTML += getPlayerShipsHTML();
    player1HTML += getPlayerBoardHTML('p1');

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
        <p>${shipName.charAt(0).toUpperCase() + shipName.slice(1)}</p>
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

  const createTempBoard = (id) => {
    const boardContainer = document.querySelector('.board');

    const yLabels = 'ABCDEFGHIJ';
    for (let y = 0; y < yLabels.length; y++) {
      for (let x = 1; x <= 10; x++) {
        const square = document.createElement('div');
        square.id = `${id}-${x},${yLabels[y]}`;
        boardContainer.appendChild(square);
      }
    }
  };

  const getIngameMsgHTML = () => {
    return `
      <p id="ingame-msg">It's your turn... fire away!</p>
      <button>New Game</button>
    `;
  };

  // const initGameboards = () => {
  //   const player1Board = [document.querySelector('#player-1 .board'), 'p1'];
  //   const player2Board = [document.querySelector('#player-2 .board'), 'p2'];
  //   [player1Board, player2Board].forEach((board) => {
  //     createGameboard(board);
  //   });
  // };

  // const createGameboard = (boardInfo) => {
  //   const yLabels = 'ABCDEFGHIJ';
  //   for (let y = 0; y < yLabels.length; y++) {
  //     for (let x = 1; x <= 10; x++) {
  //       const square = document.createElement('div');
  //       square.id = `${boardInfo[1]}-${x},${yLabels[y]}`;
  //       boardInfo[0].appendChild(square);
  //     }
  //   }
  // };

  return {
    loadPregamePage,
    loadIngamePage,
    createTempBoard,
  };
}

// export function GameplayDOMManager(gameContainer) {
//   const fillSquare = (status) => {
//     switch (status) {
//       case 'hit':
//         // apply hit class
//         break;
//       case 'miss':
//         // apply miss class
//         break;
//       case 'unharmed':
//         // apply unharmed class
//         break;
//       case 'empty':
//         // apply empty class
//         break;
//     }
//   };
// }
