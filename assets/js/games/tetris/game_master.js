import $ from 'jquery';
import tetris from './tetris';

class GameMaster {

    constructor() {
        this.stopGame();
        this.gameMessage = $('#game_message');
        this.gameButton = $('#game_button');
        this.gameButton.on('click', {gameMaster: this}, function (event) {
            event.data.gameMaster.clickEventHandler();
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

    startGameEventHandler() {
        this.tetris = new tetris('tetris_canvas');
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

    setGameMessage(message) {
        this.gameMessage.text(message);
    }

    setGameButtonText(message) {
        this.gameButton.text(message);
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

if (document.getElementById('tetris_canvas') !== null) {
    new GameMaster();
}