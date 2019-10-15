'use strict'
var gPacman;
var PACMAN = 'ᗤ';
var gEatenGhosts = 0;

function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isSuper: false
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(eventKeyboard) {
  if (!gGame.isOn) return;
  // console.log('eventKeyboard:', eventKeyboard);

  var nextLocation = getNextLocation(eventKeyboard);
  // User pressed none-relevant key in the keyboard
  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];

  // Hitting a WALL, not moving anywhere
  if (nextCell === WALL) return;

  if (nextCell === SUPER_FOOD && isSuper) return;

  if (nextCell === CHERRY) {
    updateScore(10);
  }

  // Hitting FOOD? update score
  if (nextCell === FOOD) {
    updateScore(1);
    gAllFoodCount + 1
    isVictory()
  } else if (nextCell === SUPER_FOOD) {
    goSuper()
    for (var i = 0; i < gGhosts.length; i++) {
      renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]))
    }
  }
  else if (nextCell === GHOST) {
    if (isSuper) {
      gEatenGhosts++
      for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === nextLocation.i && gGhosts[i].location.j === nextLocation.j) {
          gGhosts.splice(i, 1)
        }
      }
    } else {
      gameOver()
      renderCell(gPacman.location, EMPTY);
      return;
    }
  }

  // Update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // Update the DOM
  renderCell(gPacman.location, EMPTY);

  // Update the pacman MODEL to new location  
  gPacman.location = nextLocation;

  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // Render updated model to the DOM
  renderCell(gPacman.location, PACMAN);

}

function getNextLocation(keyboardEvent) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };

  switch (keyboardEvent.code) {
    case 'ArrowUp':
      nextLocation.i--;
      PACMAN = 'ᗢ';
      break;
    case 'ArrowDown':
      PACMAN = 'ᗣ';
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      PACMAN = 'ᗤ';
      break;
    case 'ArrowRight':
      nextLocation.j++;
      PACMAN = 'ᗧ';
      break;
    default: return null;
  }
  return nextLocation;
}
