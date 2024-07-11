const boardElement = document.getElementById('board');
        const messageElement = document.getElementById('message');
        let board = Array(9).fill(null);
        let currentPlayer = 'X';
        let gameActive = true;

        function createBoard() {
            boardElement.innerHTML = '';
            board.forEach((cell, index) => {
                const cellElement = document.createElement('div');
                cellElement.classList.add('cell');
                cellElement.addEventListener('click', () => handleCellClick(index));
                boardElement.appendChild(cellElement);
            });
        }

        function handleCellClick(index) {
            if (board[index] !== null || !gameActive) return;

            board[index] = currentPlayer;
            document.querySelectorAll('.cell')[index].textContent = currentPlayer;
            document.querySelectorAll('.cell')[index].classList.add('disabled');

            if (checkWin()) {
                messageElement.textContent = `${currentPlayer} Wins!`;
                gameActive = false;
                return;
            }

            if (board.every(cell => cell !== null)) {
                messageElement.textContent = 'Draw!';
                gameActive = false;
                return;
            }

            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            messageElement.textContent = `Player ${currentPlayer}'s turn`;
        }

        function checkWin() {
            const winPatterns = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];

            return winPatterns.some(pattern => {
                const [a, b, c] = pattern;
                return board[a] && board[a] === board[b] && board[a] === board[c];
            });
        }

        function restartGame() {
            board = Array(9).fill(null);
            currentPlayer = 'X';
            gameActive = true;
            messageElement.textContent = `Player ${currentPlayer}'s turn`;
            createBoard();
        }

        createBoard();
        messageElement.textContent = `Player ${currentPlayer}'s turn`;