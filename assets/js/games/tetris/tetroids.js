class Tetroid {
  constructor(matrix, position, colorHex) {
    this.matrix = matrix;
    this.position = position;
    this.color = colorHex;
    this.width = this.matrix[0].length;
    this.height = this.matrix.length;
    this.lineWidth = 2;
  }

  draw(board) {
    const context = board.context;
    const length = board.unitLength;
    this.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          const rectanglePositionX = (x + this.position.x) * length;
          const rectanglePositionY = (y + this.position.y) * length;
          // context.beginPath();
          // context.lineWidth = this.lineWidth;
          // context.strokeStyle = "black";
          // context.rect(
          //   rectanglePositionX,
          //   rectanglePositionY,
          //   length,
          //   length
          // );
          // context.stroke();

          context.fillStyle = this.color;
          context.fillRect(
            rectanglePositionX,
            rectanglePositionY,
            length,
            length
          );
        }
      });
    });
  }

  moveLeft() {
    this.position.x--;
  }

  moveRight() {
    this.position.x++;
  }

  drop() {
    this.position.y++;
  }

  rotateLeft() {
    this.rotate(1);
  }

  rotateRight() {
    this.rotate(-1);
  }

  rotateTetroid(dir) {
    const pos = this.position.x;
    let offset = 1;
    this.rotate(dir);
  }

  rotate(dir) {
    this.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        [
          this.matrix[x][y],
          this.matrix[y][x],
        ] = [
          this.matrix[y][x],
          this.matrix[x][y],
        ];
      });
    });

    if (dir > 0) {
      this.matrix.forEach(row => row.reverse());
    } else {
      this.matrix.reverse();
    }
  }

  collide(cells) {
    const pos = this.position;
    this.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0 &&
          (cells[y + pos.y] &&
            cells[y + pos.y][x + pos.x]) !== 0) {
          return true;
        }
      });
    });
    return false;
  }
}

class HorizontalBar extends Tetroid {
  constructor(color) {
    super([[1, 1, 1, 1]], {x: 0, y: 0}, color);
  }
}

class RightL extends Tetroid {
  constructor(color) {
    super([[0, 0, 1], [1, 1, 1]], {x: 0, y: 0}, color);
  }
}

class LeftL extends Tetroid {
  constructor(color) {
    super([[1, 0, 0], [1, 1, 1]], {x: 0, y: 0}, color);
  }
}

class Square extends Tetroid {
  constructor(color) {
    super([[1, 1], [1, 1]], {x: 0, y: 0}, color);
  }
}

class LeftSquiggle extends Tetroid {
  constructor(color) {
    super([[1, 1, 0], [0, 1, 1]], {x: 0, y: 0}, color);
  }
}

class RightSquiggle extends Tetroid {
  constructor(color) {
    super([[0, 1, 1], [1, 1, 0]], {x: 0, y: 0}, color);
  }
}

class TBlock extends Tetroid {
  constructor(color) {
    super([[0, 1, 0], [1, 1, 1]], {x: 0, y: 0}, color);
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