const gameBoard = (function() {
	const board = ["", "", "", "", "", "", "", "", ""];

	const cells = Array.from(document.querySelectorAll(".cell"));

	let winner = false;
	let player1Score = 0;
	let player2Score = 0;
	let turnCounter = 0;
	const turnDisplay = document.querySelector("#turnDisplay");
	const outcome = document.querySelector("#finalOutcome");

	cells.forEach(cell => {
		cell.addEventListener('click', () => {
			if (cell.textContent == "X" || cell.textContent == "O") {
				return;
			}

			if (winner !== false) {
				return;
			}
			
			if (turnCounter % 2 === 0) {
				cell.textContent = "X";
				turnDisplay.textContent = "Player O's Turn";
			} else {
				cell.textContent = "O";
				turnDisplay.textContent = "Player X's Turn";
			}

			turnCounter++;

			setCell(cell.dataset.index, cell.textContent);
		});
	});

	function setCell(cellID, value) {
		board[cellID] = value;
		checkForWin();
	}

	function checkForWin() {
		function compareCells(cell1, cell2, cell3) {
			if (cell1 == "X" || cell1 == "O") {
				if (cell1 == cell2 && cell2 == cell3) {
					turnCounter = 0;
					turnDisplay.textContent = "Game Over";
					declareWinner(cell1);
					return;
				}
			}
		}
		compareCells(board[0], board[1], board[2]);
		compareCells(board[3], board[4], board[5]);
		compareCells(board[6], board[7], board[8]);
		compareCells(board[0], board[3], board[6]);
		compareCells(board[1], board[4], board[7]);
		compareCells(board[2], board[5], board[8]);
		compareCells(board[0], board[4], board[8]);
		compareCells(board[2], board[4], board[6]);

		if (turnCounter == 9 && turnDisplay.textContent !== "Game Over") {
			turnDisplay.textContent = "Game Over";
			outcome.textContent = "It's a tie!";
			winner = "tie";
			turnCounter = 0;
		}
	}

	function declareWinner(roundWinner) {
		const xScore = document.querySelector("#xScore");
		const oScore = document.querySelector("#oScore");

		if (roundWinner == "X") {
			winner = "Player 1";
			outcome.textContent = `Player X wins!`;
			player1Score++;
			xScore.textContent = `Player One Score: ${player1Score}`;

		} else if (roundWinner == "O") {
			winner = "Player 2";
			outcome.textContent = `Player O wins!`;
			player2Score++;
			oScore.textContent = `Player Two Score: ${player2Score}`;
		}
	}


	const resetButton = document.querySelector("#resetButton");
	resetButton.addEventListener('click', () => {
		cells.forEach(cell => cell.textContent = "");
		for (let i in board) board[i] = "";
		winner = false;
		outcome.textContent = "";
		turnDisplay.textContent = "Player X's Turn";
	});

	return {
		board: board,
		setCell: setCell,
		winner: winner,
		checkForWin: checkForWin
	}
})();