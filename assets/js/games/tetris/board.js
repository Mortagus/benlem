import $ from 'jquery';
import Cell from './include/cell';

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
    this.cells.forEach((rows, row) => {
      rows.forEach((cell, col) => {
        this.context.fillStyle = cell.color;
        this.context.fillRect(col * this.widthUnit, row * this.heightUnit, this.widthUnit, this.heightUnit);
      });
    });
  }

  collide(tetroid) {
    tetroid.matrix.forEach((rows, row) => {
      rows.forEach((value, col) => {
        if (value !== 0) {
          if (this.isNextCellBelowGround(row, tetroid.potentialTopLeftPos)) {
            return true;
          }
          if (this.isNextCellTaken(row, col, tetroid.potentialTopLeftPos)) {
            return true;
          }
        }
      });
    });

    return false;
  }

  isNextCellBelowGround(row, potentialTopLeftPos) {
    return (row + potentialTopLeftPos.row) >= this.cells.length;
  }

  isNextCellTaken(row, col, potentialTopLeftPos) {
    return (
      this.cells[row + potentialTopLeftPos.row]
      && this.cells[row + potentialTopLeftPos.row][col + potentialTopLeftPos.col]
      && this.cells[row + potentialTopLeftPos.row][col + potentialTopLeftPos.col] !== 0
    );
  }

  isOutOfBound(tetroid) {
    tetroid.matrix.forEach((rows, row) => {
      rows.forEach((value, col) => {
        if (value !== 0) {
          if (this.isNextCellOutOfLeft(col, tetroid.potentialTopLeftPos)) {
            console.log("OUT LEFT");
            return true;
          }
          if (this.isNextCellOutOfRight(col, tetroid.potentialTopLeftPos)) {
            console.log("OUT RIGHT");
            return true;
          }
          if (this.isNextCellOutOfUp(row, tetroid.potentialTopLeftPos)) {
            console.log("OUT UP");
            return true;
          }
          if (this.isNextCellOutOfDown(row, tetroid.potentialTopLeftPos)) {
            console.log("OUT DOWN");
            return true;
          }
        }
      });
    });

    return false;
  }

  isNextCellOutOfLeft(col, potentialTopLeftPos) {
    return (col + potentialTopLeftPos.col) < 0;
  }

  isNextCellOutOfRight(col, potentialTopLeftPos) {
    return (col + potentialTopLeftPos.col) > this.cells[0].length;
  }

  isNextCellOutOfUp(row, potentialTopLeftPos) {
    return (row + potentialTopLeftPos.row) < 0;
  }

  isNextCellOutOfDown(row, potentialTopLeftPos) {
    return (row + potentialTopLeftPos.row) > this.cells.length;
  }

  saveTetroid(tetroid) {
    tetroid.matrix.forEach((rows, row) => {
      rows.forEach((value, col) => {
        if (value !== 0) {
          this.cells[row + tetroid.topLeftPos.row][col + tetroid.topLeftPos.col] = value;
        }
      });
    });
  }
}

export default Board;