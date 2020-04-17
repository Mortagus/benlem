import $ from 'jquery';
import Cell from './cell';

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
    this.widthUnit = Math.floor(this.canvasWidth / this.columnMax);
    this.heightUnit = Math.floor(this.canvasHeight / this.rowMax);
  }

  init() {
    this.cells = this.initCells();
  }

  initCells() {
    let cells = [];
    for (let rowIndex = this.rowMax; rowIndex > 0; rowIndex--) {
      cells.push(new Array(this.columnMax).fill(
        new Cell(0, this.backgroundColor)
      ));
    }

    return cells;
  }

  draw() {
    this.cells.forEach((row, y) => {
      row.forEach((cell, x) => {
        this.context.fillStyle = cell.color;
        this.context.fillRect(x * this.widthUnit, y * this.heightUnit, this.widthUnit, this.heightUnit);
      });
    });
  }
}

export default Board;