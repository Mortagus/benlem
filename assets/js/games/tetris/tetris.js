import Tetroid from './tetroids';

class Tetris {

  constructor(mainCanvasId, secondaryCanvasId) {
    this.mainCanvas = $(mainCanvasId)[0];
    this.mainCanvasContext = this.mainCanvas.getContext('2d');

    this.smallCanvas = $(secondaryCanvasId)[0];
    this.smallCanvasContext = this.smallCanvas.getContext('2d');

    // time related variables
    this.lastTime = 0;
    this.dropCounter = 0;
    this.dropInterval = 1000;

    this.animationId = null;

    this.arena = [];
    this.tetroidBank = this.initTetroidBank();
    this.colorBank = this.initColorBank();
    this.currentPiece = null;
    this.nextPiece = null;

    this.initCanvases();
  }

  initCanvases() {
    this.initContexts();
    this.drawMainBoard();
    this.nextPiece = this.createNewTetroid();
    this.drawSecondaryBoard();
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
      new Tetroid([[0, 1, 0], [1, 1, 1]], {x: 6, y: 0}),
      new Tetroid([[2, 2, 0], [0, 2, 2]], {x: 6, y: 0}),
      new Tetroid([[0, 3, 3], [3, 3, 0]], {x: 6, y: 0}),
      new Tetroid([[4, 4], [4, 4]], {x: 6, y: 0}),
      new Tetroid([[0, 0, 5], [5, 5, 5]], {x: 6, y: 0}),
      new Tetroid([[6, 0, 0], [6, 6, 6]], {x: 6, y: 0}),
      new Tetroid([[7, 7, 7, 7]], {x: 6, y: 0})
    ];
  }

  start() {
    this.initArena(12, 20);
    this.resetCurrentPiece();
    this.update();
  };

  end() {
    cancelAnimationFrame(this.animationId);
    this.initArena(12, 20);
  };

  pause() {
    cancelAnimationFrame(this.animationId);
  }

  resume() {
    this.animationId = requestAnimationFrame(this.update.bind(this));
  }

  initContexts() {
    this.mainCanvasContext.scale(1, 1);
    this.smallCanvasContext.scale(1, 1);
  }

  initArena(w, h) {
    this.arena = [];
    while (h--) {
      this.arena.push(new Array(w).fill(0));
    }
  }

  resetCurrentPiece() {
    this.currentPiece = new Tetroid(this.nextPiece.matrix, this.nextPiece.position);
    this.currentPiece.position.y = 0;
    this.currentPiece.position.x = (this.arena[0].length / 2 | 0) -
      (this.currentPiece.matrix[0].length / 2 | 0);
    if (this.collide()) {
      // FIN DU JEU !!!!!
      this.arena.forEach(row => row.fill(0));
    }
    this.nextPiece = this.createNewTetroid();
  }

  cleanArena() {
    let rowCount = 1;
    outer: for (let y = this.arena.length - 1; y > 0; --y) {
      for (let x = 0; x < this.arena[y].length; ++x) {
        if (this.arena[y][x] === 0) {
          continue outer;
        }
      }

      const row = this.arena.splice(y, 1)[0].fill(0);
      this.arena.unshift(row);
      ++y;

      rowCount *= 2;
    }
  }

  createNewTetroid() {
    const tetroidFromBank = this.tetroidBank[Math.floor(Math.random() * this.tetroidBank.length)];
    return new Tetroid(tetroidFromBank.matrix, tetroidFromBank.position);
  }

  saveCurrentPieceIntoArena() {
    this.currentPiece.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          this.arena[y + this.currentPiece.position.y][x + this.currentPiece.position.x] = value;
        }
      });
    });
  }

  collide() {
    const m = this.currentPiece.matrix;
    const o = this.currentPiece.position;
    for (let y = 0; y < m.length; ++y) {
      for (let x = 0; x < m[y].length; ++x) {
        if (m[y][x] !== 0 &&
          (this.arena[y + o.y] &&
            this.arena[y + o.y][x + o.x]) !== 0) {
          return true;
        }
      }
    }
    return false;
  }

  moveTetroid(offset) {
    this.currentPiece.position.x += offset;
    if (this.collide()) {
      this.currentPiece.position.x -= offset;
    }
  }

  rotateTetroid(dir) {
    const pos = this.currentPiece.position.x;
    let offset = 1;
    this.rotate(dir);
    while (this.collide()) {
      this.currentPiece.position.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > this.currentPiece.matrix[0].length) {
        this.rotate(-dir);
        this.currentPiece.position.x = pos;
        return;
      }
    }
  }

  dropTetroid() {
    this.currentPiece.position.y++;
    if (this.collide()) {
      this.currentPiece.position.y--;
      this.saveCurrentPieceIntoArena();
      this.resetCurrentPiece();
      this.cleanArena();
    }
    this.dropCounter = 0;
  }

  rotate(dir) {
    for (let y = 0; y < this.currentPiece.matrix.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [
          this.currentPiece.matrix[x][y],
          this.currentPiece.matrix[y][x],
        ] = [
          this.currentPiece.matrix[y][x],
          this.currentPiece.matrix[x][y],
        ];
      }
    }

    if (dir > 0) {
      this.currentPiece.matrix.forEach(row => row.reverse());
    } else {
      this.currentPiece.matrix.reverse();
    }
  }

  update(time = 0) {
    const deltaTime = time - this.lastTime;
    this.lastTime = time;

    this.dropCounter += deltaTime;
    if (this.dropCounter > this.dropInterval) {
      this.dropTetroid();
    }

    this.drawAll();
    this.animationId = requestAnimationFrame(this.update.bind(this));
  }

  drawAll() {
    this.drawMainBoard();
    this.drawArena();
    this.drawMatrix(this.mainCanvasContext, this.currentPiece.matrix, this.currentPiece.position);
  }

  drawMainBoard() {
    this.mainCanvasContext.fillStyle = '#e1c89f';
    this.mainCanvasContext.fillRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
  }

  drawSecondaryBoard() {
    this.smallCanvasContext.fillStyle = '#e1c89f';
    this.smallCanvasContext.fillRect(0, 0, this.smallCanvas.width, this.smallCanvas.height);
    // this.drawMatrix(this.smallCanvasContext, this.nextPiece.matrix, {x: this.smallCanvas.width / 2, y: this.smallCanvas.height / 2});
    this.drawMatrix(this.smallCanvasContext, this.nextPiece.matrix, this.nextPiece.position);
    console.log(this.nextPiece);
    console.log('je devrais voir ma prochaine pièce');
  }

  drawArena() {
    this.drawMatrix(this.mainCanvasContext, this.arena, {x: 0, y: 0});
  }

  drawMatrix(context, matrix, offset) {
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          context.beginPath();
          context.lineWidth = "2";
          context.strokeStyle = "black";
          context.rect(
            x + offset.x,
            y + offset.y,
            1, 1);
          context.stroke();
          context.fillStyle = this.colorBank[value];
          context.fillRect(
            x + offset.x,
            y + offset.y,
            20, 20);
        }
      });
    });
  }
}

export default Tetris;