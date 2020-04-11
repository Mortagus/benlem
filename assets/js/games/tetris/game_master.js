import $ from 'jquery';
import tetris from './tetris';

class GameMaster {

  constructor() {
    this.stopGame();
    this.tetris = null;
    this.tetrisModal = $('#tetris_modal');
    this.gameMessage = $('#game_message');
    this.gameButton = $('#game_button');
    this.lineScoreElement = $('#line-value');
    this.scoreElement = $('#score-value');
    this.gameButton.on('click', {gameMaster: this}, function (event) {
      event.data.gameMaster.clickEventHandler();
    });
    $(document).on('shown.bs.modal', this.tetrisModal.id, {gameMaster: this}, function (event) {
      event.data.gameMaster.tetris = new tetris('#tetris_canvas', '#next_tetroid_canvas');
      event.data.gameMaster.initKeyboardControl();
      event.data.gameMaster.setGameMessage('Welcome on my own tetris');
      event.data.gameMaster.setGameButtonText('Start a New Game');
      event.data.gameMaster.setLineCounter(0);
      event.data.gameMaster.setScoreValue(0);
    });
    this.tetrisModal.on('hide.bs.modal', {gameMaster: this}, function (event) {
      event.data.gameMaster.stopGameEventHandler();
      event.data.gameMaster.tetris = null;
    });
  }

  clickEventHandler() {
    if (this.isGameStopped()) {
      this.startGameEventHandler();
      return true;
    }
    if (this.isGameRunning()) {
      this.pauseGameEventHandler();
      return true;
    }
    if (this.isGamePaused()) {
      this.resumeGameEventHandler();
      return true;
    }
  }

  initKeyboardControl() {
    $(document).keydown(event => {
      if (this.isGameRunning()) {
        let code = event.keyCode;

        switch (code) {
          case 37:
            this.tetris.moveTetroid(-1);
            break;
          case 39:
            this.tetris.moveTetroid(1);
            break;
          case 40:
            this.tetris.dropTetroid();
            break;
          case 17:
            this.tetris.rotateTetroid(1);
            break;
          case 16:
            this.tetris.rotateTetroid(-1);
            break;
        }
      }
    });
  }

  setLineCounter(value) {
    this.lineScoreElement.text(value);
  }

  setScoreValue(value) {
    this.scoreElement.text(value);
  }
}

$(document).ready(function () {
  $(document).on('shown.bs.modal', '#tetris_modal', {gameMaster: this}, function (event) {
    console.log('modal fully shown');
  });
});