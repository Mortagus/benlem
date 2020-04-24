import Position from "./include/position";

class Tetroid {
  constructor(matrix, position, colorHex) {
    this.matrix = matrix;
    this.topLeftPos = new Position(position.row, position.col);
    this.potentialTopLeftPos = new Position(position.row, position.col);
    this.color = colorHex;
    this.lineWidth = 2;
    this.minimumOffset = 1;
  }

  draw(board) {
    const context = board.context;
    const widthlength = board.widthUnit;
    const heightUnit = board.heightUnit;
    this.matrix.forEach((rows, row) => {
      rows.forEach((value, col) => {
        if (value !== 0) {
          const rectanglePositionCol = (col + this.topLeftPos.col) * widthlength;
          const rectanglePositionRow = (row + this.topLeftPos.row) * heightUnit;

          context.fillStyle = this.color;
          context.fillRect(
            rectanglePositionCol,
            rectanglePositionRow,
            widthlength,
            heightUnit
          );
        }
      });
    });
  }

  width() {
    return this.matrix[0].length;
  }

  height() {
    return this.matrix.length;
  }

  moveLeft() {
    this.potentialTopLeftPos.col -= this.minimumOffset;
  }

  moveRight() {
    this.potentialTopLeftPos.col += this.minimumOffset;
  }

  drop() {
    this.potentialTopLeftPos.row += this.minimumOffset;
  }

  up() {
    this.potentialTopLeftPos.row -= this.minimumOffset;
  }

  rotateLeft() {
    this.rotate(1);
  }

  rotateRight() {
    this.rotate(-1);
  }

  rotate(dir) {
    this.transpose();
    if (dir > 0) {
      this.matrix.forEach(row => row.reverse());
    } else {
      this.matrix.reverse();
    }
  }

  transpose() {
    let transposedMatrix = new Array(this.width());
    for (let i = 0; i < this.width(); ++i) {
      transposedMatrix[i] = [];
      for (let j = 0; j < this.height(); j++) {
        transposedMatrix[i][j] = this.matrix[j][i];
      }
    }
    this.matrix = transposedMatrix;
  }

  updatePosition() {
    this.topLeftPos.row = this.potentialTopLeftPos.row;
    this.topLeftPos.col = this.potentialTopLeftPos.col;
  }

  resetPosition() {
    this.potentialTopLeftPos.row = this.topLeftPos.row;
    this.potentialTopLeftPos.col = this.topLeftPos.col;
  }
}

class HorizontalBar extends Tetroid {
  constructor(color) {
    super([[1, 1, 1, 1]], new Position(0, 0), color);
  }
}

class RightL extends Tetroid {
  constructor(color) {
    super([[0, 0, 1], [1, 1, 1]], new Position(0, 0), color);
  }
}

class LeftL extends Tetroid {
  constructor(color) {
    super([[1, 0, 0], [1, 1, 1]], new Position(0, 0), color);
  }
}

class Square extends Tetroid {
  constructor(color) {
    super([[1, 1], [1, 1]], new Position(0, 0), color);
  }
}

class LeftSquiggle extends Tetroid {
  constructor(color) {
    super([[1, 1, 0], [0, 1, 1]], new Position(0, 0), color);
  }
}

class RightSquiggle extends Tetroid {
  constructor(color) {
    super([[0, 1, 1], [1, 1, 0]], new Position(0, 0), color);
  }
}

class TBlock extends Tetroid {
  constructor(color) {
    super([[0, 1, 0], [1, 1, 1]], new Position(0, 0), color);
  }
}

export {
  Tetroid,
  HorizontalBar,
  RightL,
  LeftL,
  Square,
  LeftSquiggle,
  RightSquiggle,
  TBlock
};