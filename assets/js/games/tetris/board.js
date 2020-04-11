import $ from 'jquery';

class Board {
  constructor(canvasId, columnMax, rowMax) {
    this.canvas = $(canvasId)[0];
    this.context = this.canvas.getContext('2d');
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.cells = [];
    this.columnMax = columnMax;
    this.rowMax = rowMax;
    this.backgroundColor = '#e1c89f';
  }

  init() {
    this.cells = this.initCells();
    this.drawBackground();
  }

  initCells() {
    let cells = [];
    while (this.rowMax--) {
      cells.push(new Array(this.columnMax).fill(0));
    }

    return cells;
  }

  drawBackground() {
    this.context.fillStyle = this.backgroundColor;
    this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
  }
}

export default Board;