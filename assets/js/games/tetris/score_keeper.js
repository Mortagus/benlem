import $ from 'jquery';

class ScoreKeeper {
  constructor(scoreId, lineId) {
    this.scoreDisplay = $(scoreId).find('#score-value');
    this.lineDisplay = $(lineId).find('#line-value');
    this.scoreCounter = 0;
    this.lineCounter = 0;
    this.scoreByLine = 500;
    this.scoreByTetroid = 50;
  }

  update() {
    this.scoreDisplay.text(this.scoreCounter);
    this.lineDisplay.text(this.lineCounter);
  }

  incrementScore(value) {
    this.scoreCounter += value;
    this.update();
  }

  incrementLineCounter(value) {
    this.lineCounter += value;
    let newScore = value * this.scoreByLine;
    this.incrementScore(newScore);
  }

  updateScoreAfterCollision() {
    this.incrementScore(this.scoreByTetroid);
  }
}

export default ScoreKeeper;