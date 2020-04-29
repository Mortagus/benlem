import $ from 'jquery';


/**
 * Games States :
 *  GAME_INSTANCIATED
 *  GAME_LOADED
 *  GAME_RUNNING
 *  GAME_PAUSED
 *  GAME_STOPPED
 */
class GameStatus {
  constructor(gameButtonId, messageId) {
    this.status = 'instanciated';
    this.button = $(gameButtonId);
    this.message = $(messageId);
  }

  setGameMessage(message) {
    this.message.text(message);
  }

  setGameButtonText(message) {
    this.button.text(message);
  }

  isGameInstanciated() {
    return this.status === 'instanciated';
  }

  isGameLoaded() {
    return this.status === 'loaded';
  }

  isGameRunning() {
    return this.status === 'running';
  }

  isGamePaused() {
    return this.status === 'paused';
  }

  isGameStopped() {
    return this.status === 'stopped';
  }

  loadGame() {
    this.status = 'loaded';
    this.setGameButtonText('Start');
    this.setGameMessage('The game is ready to go.');
  }

  startGame() {
    this.status = 'running';
    this.setGameButtonText('Pause');
    this.setGameMessage('The game has started.');
  }

  pauseGame() {
    this.status = 'paused';
    this.setGameButtonText('Resume');
    this.setGameMessage('The game is paused.');
  }

  resumeGame() {
    this.status = 'running';
    this.setGameButtonText('Pause');
    this.setGameMessage('The game is resumed.');
  }

  stopGame() {
    this.status = 'stopped';
    this.setGameButtonText('RESET');
    this.setGameMessage('GAME OVER.');
  }
}

export default GameStatus;