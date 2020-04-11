import $ from 'jquery';

class GameStatus {
  constructor(gameButtonId, messageId) {
    this.status = 0;
    this.button = $(gameButtonId);
    this.message = $(messageId);
    this.initButtonEventListener();
  }

  initButtonEventListener() {
    this.button.on('click', {gameStatus : this}, function (event) {
      event.data.gameStatus.clickEventHandler();
    });
  }

  clickEventHandler() {
    console.log('click !');
  }

  setGameMessage(message) {
    this.message.text(message);
  }

  setGameButtonText(message) {
    this.button.text(message);
  }

  startGameEventHandler() {
    this.startGame();
    this.setGameMessage('The game just started !');
    this.setGameButtonText('Pause');
  }

  pauseGameEventHandler() {
    this.pauseGame();
    this.setGameMessage('PAUSE');
    this.setGameButtonText('Resume');
  }

  resumeGameEventHandler() {
    this.startGame();
    this.setGameMessage('We are back again!');
    this.setGameButtonText('Pause');
  }

  stopGameEventHandler() {
    this.stopGame();
    this.setGameMessage('Game OVER !!!!!');
    this.setGameButtonText('Start a New Game');
  }

  /**
   * Games States :
   *  GAME_STOPPED = -1
   *  GAME_PAUSED = 0
   *  GAME_RUNNING = 1
   */
  // Game State Management
  isGameRunning() {
    return this.gameState === 1;
  }

  isGameStopped() {
    return this.gameState === -1;
  }

  isGamePaused() {
    return this.gameState === 0;
  }

  pauseGame() {
    this.gameState = 0;
  }

  startGame() {
    this.gameState = 1;
  }

  stopGame() {
    this.gameState = -1;
  }
}

export default GameStatus;