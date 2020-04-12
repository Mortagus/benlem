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
    this.secondaryBoard = new Board(secondaryCanvasId, 6, 6);
    this.scoreKeeper = new ScoreKeeper('#score', '#line');
    this.tetroidBank = new TetroidBank(6);
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
          break;
        case 17:
          console.log('ROTATE 1');
          break;
        case 33:
          console.log('LINE COUNTER UP');
          this.scoreKeeper.incrementLine(1);
          break;
        case 34:
          console.log('LINE COUNTER DOWN');
          this.scoreKeeper.decrementLine(1);
          break;
        case 37:
          console.log('LEFT');
          break;
        case 39:
          console.log('RIGHT');
          break;
        case 40:
          console.log('DOWN');
          break;
        case 107:
          console.log('SCORE UP');
          this.scoreKeeper.incrementScore(1);
          break;
        case 109:
          console.log('SCORE DOWN');
          this.scoreKeeper.decrementScore(1);
          break;
      }
    });
  }

  initGame() {
    this.mainBoard.init();
    this.secondaryBoard.init();
    this.initButtonEventListener();
    this.currentTetroid = this.tetroidBank.selectRandomTetroid();
    this.nextTetroid = this.tetroidBank.selectRandomTetroid();
    this.gameStatus.loadGame();
  }

  initButtonEventListener() {
    this.gameStatus.button.on('click', {tetris : this}, function (event) {
      event.data.tetris.clickEventHandler();
    });
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
    console.log(time);
    this.animationId = requestAnimationFrame(this.update.bind(this));
  }
}

/**
 * Here is the starting point
 *
 * At the event triggered, the game is loaded
 */
$(document).ready(function () {
  $(document).on('shown.bs.modal', '#tetris_modal', function (event) {
    const game = new Tetris('#tetris_canvas', '#next_tetroid_canvas');
    game.initGame();
  });
});