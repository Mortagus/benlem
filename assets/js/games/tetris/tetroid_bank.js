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
  constructor(initialPosition) {
    this.tetroidBank = this.initTetroidBank();
    this.colorBank = this.initColorBank();
    this.initialPosition = {x: initialPosition, y: 0};
  }

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

  initTetroidBank() {
    return [
      new HorizontalBar(this.initialPosition, this.colorBank[7]),
      new RightL(this.initialPosition, this.colorBank[6]),
      new LeftL(this.initialPosition, this.colorBank[5]),
      new Square(this.initialPosition, this.colorBank[4]),
      new LeftSquiggle(this.initialPosition, this.colorBank[3]),
      new RightSquiggle(this.initialPosition, this.colorBank[2]),
      new TBlock(this.initialPosition, this.colorBank[1])
    ];
  }

  selectRandomTetroid() {
    const tetroidCount = this.tetroidBank.length;
    const randomIndex = Math.floor(Math.random() * tetroidCount);
    const tetroidFromBank = this.tetroidBank[randomIndex];
    return new Tetroid(tetroidFromBank.matrix, tetroidFromBank.position, tetroidFromBank.color);
  }
}