import $ from 'jquery';
import Board from './board';
import ScoreKeeper from './score_keeper';
import TetroidBank from './tetroid_bank';
import GameStatus from './game_status';
import Position from "./include/position";

/**
 * The role of this class is to be the main controller of the game.
 * Each component must be loaded and get ready to work together
 */
class Tetris {
  constructor(mainCanvasId, secondaryCanvasId, cheatActivated) {
    this.mainBoard = new Board(mainCanvasId, 10, 16);
    this.secondaryBoard = new Board(secondaryCanvasId, 5, 5);
    this.scoreKeeper = new ScoreKeeper('#score', '#line');
    this.tetroidBank = new TetroidBank();
    this.gameStatus = new GameStatus('#game_button', '#game_message');
    this.currentTetroid = null;
    this.nextTetroid = null;
    this.lastTime = 0;
    this.dropCounter = 0;
    this.dropInterval = 1000;
    this.animationId = null;
    this.cheatActivated = cheatActivated;
  }

  initGame() {
    this.initControls();
    this.initButtonEventListener();
    this.mainBoard.init();
    this.secondaryBoard.init();
    this.nextTetroid = null;
    this.initCurrentTetroid();
    this.initNextTetroid();
    this.gameStatus.loadGame();
  }

  initControls() {
    $(document).keydown(event => {
      if (this.gameStatus.isGameRunning()) {
        let code = event.keyCode;
        // console.log('Pressed Key: ' + code);
        switch (code) {
          case 65:
            this.counterClockwiseRotation();
            break;
          case 68:
            this.moveRight();
            break;
          case 69:
            this.clockwiseRotation();
            break;
          case 78:
            this.changeWorkingPieces();
            break;
          case 81:
            this.moveLeft();
            break;
          case 83:
            this.moveDown();
            break;
          case 90:
            this.moveUp();
            break;
        }
      }
    });
  }

  initButtonEventListener() {
    this.gameStatus.button.on('click', {tetris: this}, function (event) {
      event.data.tetris.clickEventHandler();
    });
  }

  counterClockwiseRotation() {
    this.currentTetroid.rotateLeft();
  }

  clockwiseRotation() {
    this.currentTetroid.rotateRight();
  }

  moveLeft() {
    this.currentTetroid.moveLeft();
  }

  moveRight() {
    this.currentTetroid.moveRight();
  }

  moveDown() {
    this.currentTetroid.drop();
  }

  moveUp() {
    if (this.cheatActivated) {
      this.currentTetroid.up();
    }
  }

  changeWorkingPieces() {
    if (this.cheatActivated) {
      this.initCurrentTetroid();
    }
  }

  initCurrentTetroid() {
    if (this.nextTetroid) {
      this.currentTetroid = this.nextTetroid;
      this.initNextTetroid();
    } else {
      this.currentTetroid = this.tetroidBank.selectRandomTetroid();
    }

    const col = this.mainBoard.columnMax / 2;
    this.currentTetroid.potentialTopLeftPos = new Position(0, col);
  }

  initNextTetroid() {
    this.nextTetroid = this.tetroidBank.selectRandomTetroid();
    const col = (this.secondaryBoard.columnMax - this.nextTetroid.width()) / 2;
    const row = (this.secondaryBoard.rowMax - this.nextTetroid.height()) / 2;
    this.nextTetroid.topLeftPos = new Position(row, col);
  }

  clickEventHandler() {
    switch (true) {
      case this.gameStatus.isGameLoaded():
        this.startGame();
        break;
      case this.gameStatus.isGameRunning():
        this.pauseGame();
        break;
      case this.gameStatus.isGamePaused():
        this.resumeGame();
        break;
    }
  }

  startGame() {
    this.gameStatus.startGame();
    this.update();
  }

  pauseGame() {
    this.gameStatus.pauseGame();
    cancelAnimationFrame(this.animationId);
  }

  resumeGame() {
    this.gameStatus.resumeGame();
    this.animationId = requestAnimationFrame(this.update.bind(this));
  }

  endGame() {
    this.gameStatus.stopGame();
    cancelAnimationFrame(this.animationId);
  }

  update(time = 0) {
    // this.tryToDropTetroid(time);
    // this.tryToLand();
    this.tryToMove();
    this.mainBoard.draw();
    this.secondaryBoard.draw();
    this.currentTetroid.draw(this.mainBoard);
    this.nextTetroid.draw(this.secondaryBoard);
    this.animationId = requestAnimationFrame(this.update.bind(this));
  }

  tryToDropTetroid(time) {
    const deltaTime = time - this.lastTime;
    this.lastTime = time;

    this.dropCounter += deltaTime;
    if (this.dropCounter > this.dropInterval) {
      this.moveDown();
      this.dropCounter = 0;
    }
  }

  tryToLand() {
    if (this.mainBoard.collide(this.currentTetroid)) {
      console.log('WE LAND');
      // this.mainBoard.saveTetroid(this.currentTetroid);
      // this.initCurrentTetroid();
    }
  }

  tryToMove() {
    if (this.mainBoard.isOutOfBound(this.currentTetroid) === false) {
      this.currentTetroid.updatePosition();
    } else {
      console.log('OUT');
    }
  }
}

/**
 * Here is the starting point
 *
 * At the event triggered, the game is loaded
 */
$(document).ready(function () {
  let game = null;
  $(document).on('shown.bs.modal', '#tetris_modal', function (event) {
    game = new Tetris('#tetris_canvas', '#next_tetroid_canvas', true);
    game.initGame();
  });
  $(document).on('hide.bs.modal', '#tetris_modal', function (event) {
    game = null;
  });
});