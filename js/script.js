const eleLevel = document.getElementById('level');
const btnPlay = document.getElementById('play');
const eleGrid = document.querySelector('.grid');
const eleGuide = document.querySelector('.guide');
const eleOutput = document.querySelector('.output');
const arrLevels = [100, 81, 16];
const BOMB_NUMBER = 13;

btnPlay.addEventListener('click', setupGame);
eleLevel.addEventListener('change', setupGame);
document.addEventListener('keydown', function(ev) {
	switch (ev.key) {
		case 'f':
		case 'F':
			eleLevel.value = 0;
			setupGame();
			break;

		case 'm':
		case 'M':
			eleLevel.value = 1;
			setupGame();
			break;

		case 'd':
		case 'D':
			eleLevel.value = 2;
			setupGame();
			break;

		case 'g':
		case 'G':
			showGuide();
			break;

		case ' ':
			setupGame();
			break;
	}
})


function setupGame() {
	eleGrid.innerHTML = ''; 
	eleOutput.innerHTML = '';
	score = 0;

	// selezionare il livello
	const indexLevel = parseInt(eleLevel.value);
	const cellsCount = arrLevels[indexLevel];
	const cellsPerRow = Math.sqrt(cellsCount);
	const goodCells = cellsCount - BOMB_NUMBER;
	console.log('cellsCount:', cellsCount, 'indexLevel:', indexLevel);


	// stampare la griglia in base al livello
	for (let cellNum = 1; cellNum <= cellsCount; cellNum++){
		const eleCell = document.createElement('div');
		eleCell.classList.add('cell');
		// eleCell.append(cellNum); // metodo 1
		eleCell.innerHTML = cellNum; // metodo 2
		eleCell.style.width = `calc(100% / ${cellsPerRow})`;
		eleCell.style.height = `calc(100% / ${cellsPerRow})`;
		eleCell.addEventListener('click', manageCellClick);
		eleGrid.append(eleCell);
		// console.log(cellNum);
	}

	// logica del gioco
	const arrRandom = [];
	for (i = 0; i < BOMB_NUMBER; i++) {
		let randomNumber;
		do {
			randomNumber = getRandomNumber(1, cellsCount);
		} while (arrRandom.includes(randomNumber))
		arrRandom.push(randomNumber);
	}
	console.log('bombe', arrRandom.sort((a,b)=>a-b)); // il sort è giusto per avere la vita facile quando testiamo il programma

	function manageCellClick() {
		cellValue = parseInt(this.innerHTML);

		if (arrRandom.includes(cellValue)) {
			const cells = document.querySelectorAll('.cell');
			for (i = 0; i < cells.length; i++) {
				cells[i].removeEventListener('click', manageCellClick);
				if (arrRandom.includes(parseInt(cells[i].innerHTML))) {
					cells[i].classList.add('bomb');
				}
			}
			eleOutput.innerHTML = 'Hai preso una bomba. Il tuo punteggio è: ' + score;
		} else {
			this.classList.add('selected');
			score++;
		}

		if (score == goodCells) {
			eleOutput.innerHTML = 'Hai Vinto. Il tuo punteggio è: ' + score;
			const cells = document.querySelectorAll('.cell');
			for (i = 0; i < cells.length; i++) {
				cells[i].removeEventListener('click', manageCellClick);
			}
		}

		this.removeEventListener('click', manageCellClick);
	}
}

function showGuide() {
	eleGrid.innerHTML = '';
	eleGrid.append(eleGuide);
}

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}