import {
  Tetroid,
  HorizontalBar,
  RightL,
  LeftL,
  Square,
  LeftSquiggle,
  RightSquiggle,
  TBlock
} from './tetroids';

class TetroidBank {
  constructor() {
    this.colorBank = this.initColorBank();
    this.tetroidBank = this.initTetroidBank();
  }

  /**
   * @returns {string[]}
   */
  initColorBank() {
    return [
      null,
      '#5cad2c',
      '#2cb099',
      '#ef7e18',
      '#274696',
      '#df2384',
      '#f8d517',
      '#e5282e',
    ];
  }

  /**
   * @returns {(HorizontalBar|RightL|LeftL|Square|LeftSquiggle)[]}
   */
  initTetroidBank() {
    return [
      new HorizontalBar(this.colorBank[7]),
      new RightL(this.colorBank[6]),
      new LeftL(this.colorBank[5]),
      new Square(this.colorBank[4]),
      new LeftSquiggle(this.colorBank[3]),
      new RightSquiggle(this.colorBank[2]),
      new TBlock(this.colorBank[1])
    ];
  }

  /**
   * @returns {Tetroid}
   */
  selectRandomTetroid() {
    const tetroidCount = this.tetroidBank.length - 1;
    let randomIndex = Math.floor(Math.random() * tetroidCount);
    const tetroidFromBank = this.tetroidBank[randomIndex];
    return new Tetroid(tetroidFromBank.matrix, tetroidFromBank.topLeftPos, tetroidFromBank.color);
  }
}

export default TetroidBank;