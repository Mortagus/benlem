class Tetroid {

  constructor(matrix, position, colorHex) {
    this.matrix = matrix;
    this.position = position;
    this.color = colorHex;
    this.length = 20;
  }

  draw(context) {
    this.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          context.beginPath();
          context.lineWidth = "2";
          context.strokeStyle = "black";
          context.rect(
            x + this.position.x,
            y + this.position.y,
            this.length, this.length);
          context.stroke();
          context.fillStyle = this.color;
          context.fillRect(
            x + this.position.x,
            y + this.position.y,
            this.length, this.length);
        }
      });
    });
  }

  update(xOffset, yOffset, rotation) {
    if (xOffset === -1 || xOffset === 1) {
      this.moveXOffset(xOffset);
    }
    if (yOffset === 1) {
      this.moveYOffset();
    }
    if (rotation === -1 || rotation === 1) {
      this.rotateTetroid(rotation);
    }
  }

  moveXOffset(offset) {
    this.position.x += offset;
  }

  moveYOffset() {
    this.position.y++;
  }

  rotateTetroid(dir) {
    const pos = this.position.x;
    let offset = 1;
    this.rotate(dir);
  }

  rotate(dir) {
    for (let y = 0; y < this.matrix.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [
          this.matrix[x][y],
          this.matrix[y][x],
        ] = [
          this.matrix[y][x],
          this.matrix[x][y],
        ];
      }
    }

    if (dir > 0) {
      this.matrix.forEach(row => row.reverse());
    } else {
      this.matrix.reverse();
    }
  }
}

class HorizontalBar extends Tetroid {
  constructor(initialPosition, color) {
    super([[1, 1, 1, 1]], initialPosition, color);
  }
}

class RightL extends Tetroid {
  constructor(initialPosition, color) {
    super([[0, 0, 1], [1, 1, 1]], initialPosition, color);
  }
}

class LeftL extends Tetroid {
  constructor(initialPosition, color) {
    super([[1, 0, 0], [1, 1, 1]], initialPosition, color);
  }
}

class Square extends Tetroid {
  constructor(initialPosition, color) {
    super([[1, 1], [1, 1]], initialPosition, color);
  }
}

class LeftSquiggle extends Tetroid {
  constructor(initialPosition, color) {
    super([[1, 1, 0], [0, 1, 1]], initialPosition, color);
  }
}

class RightSquiggle extends Tetroid {
  constructor(initialPosition, color) {
    super([[0, 1, 1], [1, 1, 0]], initialPosition, color);
  }
}

class TBlock extends Tetroid {
  constructor(initialPosition, color) {
    super([[0, 1, 0], [1, 1, 1]], initialPosition, color);
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