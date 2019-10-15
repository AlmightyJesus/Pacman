'use strict';
var WALL = '&#128679;';
var FOOD = '.';
var EMPTY = ' ';
var SUPER_FOOD = '&#127830;'
var CHERRY = '&#127826;'
var gAllFoodCount = 0
var gBoard;
var isSuper = false
var gCherryInterval;
var gGame = {
  score: 0,
  isOn: false
};

function init() {
  gBoard = buildBoard();
  closeModal()
  createPacman(gBoard);
  createGhosts(gBoard);
  gGame.score = 0
  printMat(gBoard, '.board-container');
  gGame.isOn = true;
  gCherryInterval = setInterval(function () {
    generateCherry(getShuffledEmptyCells(gBoard))
  }, 15000)
}

function generateCherry(emptyCells) {
  var pos = emptyCells.pop()
  gBoard[pos.i][pos.j] = CHERRY
  renderCell(pos, CHERRY)

}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;

      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j === 5 && i > 5 && i < SIZE - 2)) {

        board[i][j] = WALL;
      }
    }
  }
  board[1][1] = SUPER_FOOD
  board[1][board[1].length - 2] = SUPER_FOOD
  board[board.length - 2][1] = SUPER_FOOD
  board[board.length - 2][board[1].length - 2] = SUPER_FOOD
  return board;
}

function goSuper() {
  isSuper = true
  setTimeout(function () {
    isSuper = false
    for (var i = 0; i < gGhosts.length; i++) {
      renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]))
    }
    for (var i = 0; i < gEatenGhosts; i++) {
      createGhost(gBoard)
    }
    gEatenGhosts = 0
    return
  }, 5000)

}


function updateScore(value) {
  // Update both the model and the dom for the score
  gGame.score += value;
  document.querySelector('header h3 span').innerText = gGame.score;
}

function isVictory() {
  if (gAllFoodCount === (getFoodCount(gBoard) - 1)) victory()
}

function victory() {
  gameOver()
  var modalTxt = document.querySelector('h2')
  modalTxt.innerText = `YOU WON! Score : ${gGame.score}`
}

function gameOver() {
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  clearInterval(gCherryInterval)
  gIntervalGhosts = null;
  openModal()
}

function openModal() {
  var modalTxt = document.querySelector('h2')
  modalTxt.innerText = 'Game Over!'
  var modal = document.querySelector('.modal')
  modal.style.display = 'block';

}
function closeModal() {
  var modal = document.querySelector('.modal')
  modal.style.display = 'none';
}

function getFoodCount(board) {
  var count = 0
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      var cell = gBoard[i][j]
      if (cell === FOOD) {
        count++
      }
    }

  }
  return (count)
}

function getShuffledEmptyCells(board) {
  var locs = []
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      var cell = gBoard[i][j]
      if (cell !== FOOD && cell !== PACMAN && cell !== GHOST && cell !== SUPER_FOOD && cell !== CHERRY && cell !== WALL) {
        locs.push({ i: i, j: j })
      }
    }

  }
  return shuffle(locs)
}
