const game = document.getElementById('game');
const grid = [];
const rows = 10;
const cols = 10;
const minesCount = 15;
let minesLocation = [];

function initializeGame() {
    for (let row = 0; row < rows; row++) {
        grid[row] = [];
        for (let col = 0; col < cols; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleClick);
            cell.addEventListener('contextmenu', handleRightClick);
            grid[row][col] = cell;
            game.appendChild(cell);
        }
    }
    placeMines();
}

function placeMines() {
    let placedMines = 0;
    while (placedMines < minesCount) {
        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * cols);
        const cell = grid[row][col];
        if (!cell.classList.contains('mine')) {
            cell.classList.add('mine');
            minesLocation.push({ row, col });
            placedMines++;
        }
    }
}

function handleClick(event) {
    const cell = event.target;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);

    if (cell.classList.contains('mine')) {
        revealMines();
        alert('Game Over');
        resetGame();
    } else {
        revealCell(row, col);
    }
}

function handleRightClick(event) {
    event.preventDefault();
    const cell = event.target;
    if (!cell.classList.contains('revealed')) {
        cell.classList.toggle('flag');
    }
}

function revealCell(row, col) {
    const cell = grid[row][col];
    if (cell.classList.contains('revealed') || cell.classList.contains('flag')) return;

    cell.classList.add('revealed');

    const minesAround = countMinesAround(row, col);
    if (minesAround > 0) {
        cell.textContent = minesAround;
    } else {
        for (let r = row - 1; r <= row + 1; r++) {
            for (let c = col - 1; c <= col + 1; c++) {
                if (r >= 0 && r < rows && c >= 0 && c < cols) {
                    revealCell(r, c);
                }
            }
        }
    }
}

function countMinesAround(row, col) {
    let count = 0;
    for (let r = row - 1; r <= row + 1; r++) {
        for (let c = col - 1; c <= col + 1; c++) {
            if (r >= 0 && r < rows && c >= 0 && c < cols && grid[r][c].classList.contains('mine')) {
                count++;
            }
        }
    }
    return count;
}

function revealMines() {
    for (let i = 0; i < minesLocation.length; i++) {
        const mine = minesLocation[i];
        grid[mine.row][mine.col].classList.add('revealed');
    }
}

function resetGame() {
    game.innerHTML = '';
    minesLocation = [];
    initializeGame();
}

initializeGame();