import $ from 'jquery';
import Board from './board';
import ScoreKeeper from './score_keeper';
import TetroidBank from './tetroid_bank';
import GameStatus from './game_status';

/**
 * The role of this class is to be the main controller of the game.
 * Each component must be loaded and get ready to work together
 */
class Tetris {
  constructor(mainCanvasId, secondaryCanvasId) {
    this.initControls();
    this.mainBoard = new Board(mainCanvasId, 12, 20);
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
  }

  initControls() {
    $(document).keydown(event => {
      let code = event.keyCode;

      switch (code) {
        case 16:
          console.log('ROTATE -1');
          this.currentTetroid.rotateLeft();
          break;
        case 17:
          console.log('ROTATE 1');
          this.currentTetroid.rotateRight();
          break;
        // case 33:
        //   console.log('LINE COUNTER UP');
        //   this.scoreKeeper.incrementLine(1);
        //   break;
        // case 34:
        //   console.log('LINE COUNTER DOWN');
        //   this.scoreKeeper.decrementLine(1);
        //   break;
        case 37:
          console.log('LEFT');
          this.currentTetroid.moveLeft();
          break;
        case 39:
          console.log('RIGHT');
          this.currentTetroid.moveRight();
          break;
        case 40:
          console.log('DOWN');
          this.currentTetroid.drop();
          break;
        case 78:
          console.log('N');
          this.initCurrentTetroid();
          break;
        // case 107:
        //   console.log('SCORE UP');
        //   this.scoreKeeper.incrementScore(1);
        //   break;
        // case 109:
        //   console.log('SCORE DOWN');
        //   this.scoreKeeper.decrementScore(1);
        //   break;
      }
    });
  }

  initGame() {
    this.mainBoard.init();
    this.secondaryBoard.init();
    this.initButtonEventListener();
    this.initCurrentTetroid();
    this.initNextTetroid();
    this.gameStatus.loadGame();
  }

  initButtonEventListener() {
    this.gameStatus.button.on('click', {tetris : this}, function (event) {
      event.data.tetris.clickEventHandler();
    });
  }

  initCurrentTetroid() {
    if (this.nextTetroid) {
      this.currentTetroid = this.nextTetroid;
      this.initNextTetroid();
    } else {
      this.currentTetroid = this.tetroidBank.selectRandomTetroid();
    }

    const xPosition = (this.mainBoard.columnMax - this.currentTetroid.width)  / 2;
    this.currentTetroid.position = {
      x: xPosition,
      y: 0
    };
  }

  initNextTetroid() {
    this.nextTetroid = this.tetroidBank.selectRandomTetroid();
    const xPosition = (this.secondaryBoard.columnMax - this.nextTetroid.width)  / 2;
    const yPosition = (this.secondaryBoard.rowMax - this.nextTetroid.height) / 2;
    this.nextTetroid.position = {
      x: xPosition,
      y: yPosition
    };
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
    this.mainBoard.draw();
    this.secondaryBoard.draw();
    this.tryToDropTetroid(time);
    this.currentTetroid.draw(this.mainBoard);
    this.nextTetroid.draw(this.secondaryBoard);
    this.animationId = requestAnimationFrame(this.update.bind(this));
  }

  tryToDropTetroid(time) {
    const deltaTime = time - this.lastTime;
    this.lastTime = time;

    this.dropCounter += deltaTime;
    if (this.dropCounter > this.dropInterval) {
      this.currentTetroid.drop();
      this.dropCounter = 0;
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
    game = new Tetris('#tetris_canvas', '#next_tetroid_canvas');
    game.initGame();
  });
  $(document).on('hide.bs.modal', '#tetris_modal', function (event) {
    game = null;
  });
});