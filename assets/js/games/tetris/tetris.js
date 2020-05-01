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

  clearGame() {
    console.error('Tetris ClearGame NOT implemented YET');
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
      if (event.keyCode === 66) {
        this.printDebug();
      }
      if (this.gameStatus.isGameRunning()) {
        let code = event.keyCode;
        // console.log('Pressed Key: ' + code);
        switch (code) {
          case 65: // a
            this.counterClockwiseRotation();
            break;
          case 68: // d
            this.moveRight();
            break;
          case 69: // e
            this.clockwiseRotation();
            break;
          case 78: // n
            this.changeWorkingPieces();
            break;
          case 81: // q
            this.moveLeft();
            break;
          case 83: // s
            this.moveDown();
            break;
          case 90: // z
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

  printDebug() {
    console.log('[TETRIS] DEBUG');
    console.log('Main Board Cells');
    console.log(this.mainBoard.cells);
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
      case this.gameStatus.isGameStopped():
        this.resetGame();
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

  resetGame() {
    this.mainBoard.init();
    this.secondaryBoard.init();
    this.nextTetroid = null;
    this.initCurrentTetroid();
    this.initNextTetroid();
    this.gameStatus.loadGame();
    this.mainBoard.draw();
    this.secondaryBoard.draw();
  }

  update(time = 0) {
    if (this.gameIsFinished()) {
      this.endGame();
    } else {
      this.tryToFallTetroid(time);
      this.tryToMove();
      this.tryToClearLines();
      this.mainBoard.draw();
      this.secondaryBoard.draw();
      this.currentTetroid.draw(this.mainBoard);
      this.nextTetroid.draw(this.secondaryBoard);
      this.animationId = requestAnimationFrame(this.update.bind(this));
    }
  }

  gameIsFinished() {
    return this.mainBoard.firstRowIsOccupied()
  }

  tryToFallTetroid(time) {
    if (this.isTimeToFall(time)) {
      this.tryToDropTetroid();
      this.dropCounter = 0;
    }
  }

  isTimeToFall(time) {
    const deltaTime = time - this.lastTime;
    this.lastTime = time;
    this.dropCounter += deltaTime;
    return this.dropCounter > this.dropInterval;
  }

  tryToDropTetroid() {
    this.moveDown();
    if (this.mainBoard.tetroidCanFall(this.currentTetroid)) {
      this.currentTetroid.updatePosition();
    } else {
      this.landTetroid();
    }
  }

  landTetroid() {
    this.mainBoard.saveTetroid(this.currentTetroid);
    this.initCurrentTetroid();
    this.updateScoreAfterCollision();
  }

  tryToClearLines() {
    const cleanedLineCounter = this.mainBoard.tryToClearLines();
    this.scoreKeeper.incrementLineCounter(cleanedLineCounter);
  }

  tryToMove() {
    if (this.mainBoard.tetroidCanMove(this.currentTetroid)) {
      this.currentTetroid.updatePosition();
    } else {
      this.currentTetroid.resetPosition();
    }
  }

  updateScoreAfterCollision() {
    this.scoreKeeper.updateScoreAfterCollision();
  }
}

export default Tetris;