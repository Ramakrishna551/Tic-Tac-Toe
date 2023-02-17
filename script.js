const squares = document.querySelectorAll('.square');
const resetButton = document.querySelector('#reset');
let player = 'X';

function resetGame() {
  player = 'X';
  squares.forEach((square) => {
    square.textContent = '';
    square.classList.remove('winner');
  });
}

function checkForWinner() {
  const winningCombos = [    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  let winner = null;

  winningCombos.forEach((combo) => {
    const sq1 = squares[combo[0]];
    const sq2 = squares[combo[1]];
    const sq3 = squares[combo[2]];

    if (sq1.textContent && sq1.textContent === sq2.textContent && sq1.textContent === sq3.textContent) {
      winner = sq1.textContent;
      combo.forEach((index) => {
        squares[index].classList.add('winner');
      });
    }
  });

  return winner;
}

function handleClick(event) {
  const square = event.target;

  if (!square.textContent) {
    square.textContent = player;

    const winner = checkForWinner();

    if (winner) {
      alert(`Player ${winner} wins!`);
      resetGame();
    } else if ([...squares].every(sq => sq.textContent)) {
      alert("It's a tie!");
      resetGame();
    } else {
      player = player === 'X' ? 'O' : 'X';
    }
  }
}

resetButton.addEventListener('click', resetGame);
squares.forEach((square) => {
  square.addEventListener('click', handleClick);
});
