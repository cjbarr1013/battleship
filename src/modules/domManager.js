export function DOMManager() {
  const initGameboards = () => {
    const player1Board = [document.querySelector('#player-1 .board'), 'p1'];
    const player2Board = [document.querySelector('#player-2 .board'), 'p2'];
    [player1Board, player2Board].forEach((board) => {
      createGameboard(board);
    });
  };

  const createGameboard = (boardInfo) => {
    const yLabels = 'ABCDEFGHIJ';
    for (let y = 0; y < yLabels.length; y++) {
      for (let x = 1; x <= 10; x++) {
        const square = document.createElement('div');
        square.id = `${boardInfo[1]}-${x},${yLabels[y]}`;
        boardInfo[0].appendChild(square);
      }
    }
  };

  const fillSquare = (status) => {
    switch (status) {
      case 'hit':
        // apply hit class
        break;
      case 'miss':
        // apply miss class
        break;
      case 'unharmed':
        // apply unharmed class
        break;
      case 'empty':
        // apply empty class
        break;
    }
  };

  return {
    initGameboards,
  };
}
