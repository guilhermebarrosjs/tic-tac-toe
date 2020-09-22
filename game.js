 // HTML elements
 const board = document.querySelector('#board');
 const playerTurn = document.querySelector('.game-panel p span');
 const winPanel = document.querySelector('.win-panel');
 const winPanelPlayer = document.querySelector('.win-panel h1');

 let gameOver = false;

 // Turn
 let xandao = true;

 let boardCells = [
     '', '', '',
     '', '', '',
     '', '', ''
 ];

 const winnedPlays = [
     [0, 1, 2],
     [3, 4, 5],
     [6, 7, 8],
     [0, 3, 6],
     [1, 4, 7],
     [2, 5, 8],
     [0, 4, 8],
     [2, 4, 6]
 ];

 // Click behaviour
 function handleCellClick(index) {
     if (boardCells[index] !== '' || gameOver) return;

     xandao ? boardCells[index] = 'x' : boardCells[index] = 'o';

     handleCheckWin(xandao ? 'x' : 'o');
     xandao = !xandao;
     draw();
 }

 // Checks if the player won
 function handleCheckWin(simbol) {
     winnedPlays.forEach(plays => {
         if (boardCells[plays[0]] === simbol &&
             boardCells[plays[1]] === simbol &&
             boardCells[plays[2]] === simbol
         ) {
             handleGameOver(simbol);
         }
     });

     // Checks if is a tie
     const isTie = boardCells.every(cell => {
         return cell !== '' && gameOver === false;
     });

     if (isTie) {
         handleGameOver();
     }
 }

 // Game over behaviour
 function handleGameOver(simbol) {
     gameOver = true;
     winPanel.classList.add('show');
     winPanelPlayer.innerHTML = simbol ? ( simbol === 'x' ? '[X]ANDÃO venceu.' : '[O]vo derrotar o [X]ANDÃO venceu.') : 'Empate.';
 }

 // Clear all and restart the game
 function handleRestartGame() {
     winPanel.classList.remove('show');
     gameOver = false;

     boardCells = [
         '', '', '',
         '', '', '',
         '', '', ''
     ];

     draw();
 }

 // Draw the board
 function draw() {
     playerTurn.innerHTML = xandao ? '[X]ANDÃO' : '[O]vo derrotar o [X]ANDÃO';

     board.innerHTML = '';
     boardCells.forEach((value, index) => board.innerHTML += `<div onclick='handleCellClick(${ index })'>${ value }</div>`);
 }

 // When is ready
 window.addEventListener('load', draw);