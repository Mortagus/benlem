class GameMaster {

    constructor() {
        this.stopGame();
        if (document.getElementById('tetris_canvas') !== null) {
            // this.tetris = new Tetris('tetris_canvas');
            const tetrisClass = require('./tetris');
            this.tetris = new tetrisClass('tetris_canvas');
        }
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

new GameMaster();