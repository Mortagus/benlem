import $ from 'jquery';

class ScoreKeeper {
  constructor(scoreId, lineId) {
    this.scoreDisplay = $(scoreId).find('#score-value');
    this.lineDisplay = $(lineId).find('#line-value');
    this.scoreCounter = 0;
    this.lineCounter = 0;
  }

  update() {
    this.scoreDisplay.text(this.scoreCounter);
    this.lineDisplay.text(this.lineCounter);
  }

  incrementScore(value) {
    this.scoreCounter += value;
    this.update();
  }

  decrementScore(value) {
    this.scoreCounter -= value;
    this.update();
  }

  incrementLine(value) {
    this.lineCounter += value;
    this.update();
  }

  decrementLine(value) {
    this.lineCounter -= value;
    this.update();
  }

}

export default ScoreKeeper;