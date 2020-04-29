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
    this.backgroundColor = '#343a40';
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
    for (let row = 0; row < tetroid.matrix.length; row++) {
      for (let col = 0; col < tetroid.matrix[row].length; col++) {
        const value = tetroid.matrix[row][col];
        if (value !== 0) {
          if (this.isNextCellOutOfDown(row, tetroid.potentialTopLeftPos)) {
            return true;
          }
          if (this.isNextCellTaken(row, col, tetroid.potentialTopLeftPos)) {
            return true;
          }
        }
      }
    }

    return false;
  }

  isNextCellTaken(row, col, potentialTopLeftPos) {
    const currentCell = this.getCell(row, col, potentialTopLeftPos);
    return (currentCell && currentCell.value !== 0);
  }

  getCell(row, col, potentialTopLeftPos) {
    const cell = this.cells[row + potentialTopLeftPos.row][col + potentialTopLeftPos.col];
    if (cell) {
      return cell;
    } else {
      return false;
    }
  }

  isOutOfBound(tetroid) {
    for (let row = 0; row < tetroid.matrix.length; row++) {
      for (let col = 0; col < tetroid.matrix[row].length; col++) {
        const value = tetroid.matrix[row][col];
        if (value !== 0) {
          if (this.isNextCellOutOfRight(col, tetroid.potentialTopLeftPos)) {
            return true;
          }
          if (this.isNextCellOutOfLeft(col, tetroid.potentialTopLeftPos)) {
            return true;
          }
          if (this.isNextCellOutOfUp(row, tetroid.potentialTopLeftPos)) {
            return true;
          }
          if (this.isNextCellOutOfDown(row, tetroid.potentialTopLeftPos)) {
            return true;
          }
        }
      }
    }

    return false;
  }

  isNextCellOutOfRight(col, potentialTopLeftPos) {
    const valueToCheck = col + potentialTopLeftPos.col;
    return valueToCheck >= this.cells[0].length;
  }

  isNextCellOutOfLeft(col, potentialTopLeftPos) {
    const valueToCheck = col + potentialTopLeftPos.col;
    return valueToCheck < 0;
  }

  isNextCellOutOfUp(row, potentialTopLeftPos) {
    const valueToCheck = row + potentialTopLeftPos.row;
    return valueToCheck < 0;
  }

  isNextCellOutOfDown(row, potentialTopLeftPos) {
    const valueToCheck = row + potentialTopLeftPos.row;
    return valueToCheck >= this.cells.length;
  }

  saveTetroid(tetroid) {
    tetroid.matrix.forEach((rows, row) => {
      rows.forEach((value, col) => {
        if (value !== 0) {
          this.cells[row + tetroid.topLeftPos.row][col + tetroid.topLeftPos.col] = new Cell(value, tetroid.color);
        }
      });
    });
  }

  tryToClearLines() {
    let counter = 0;
    let isFilled = true;
    for (let row = 0; row < this.cells.length; row++) {
      isFilled = true;
      for (let col = 0; col < this.cells[row].length; col++) {
        if (this.cells[row][col].value === 0) {
          isFilled &= false;
        }
      }

      if (isFilled) {
        this.removeRow(row);
        this.addFreshLineToTheTop();
        counter++;
      }
    }

    return counter;
  }

  removeRow(row) {
    this.cells.splice(row, 1);
  }

  addFreshLineToTheTop() {
    this.cells.unshift(new Array(this.columnMax).fill(
      new Cell(0, this.backgroundColor)
    ));
  }

  firstRowIsOccupied() {
    for (let col = 0; col < this.cells[0].length; col++) {
      if (this.cells[0][col].value !== 0) {
        return true;
      }
    }

    return false;
  }
}

export default Board;