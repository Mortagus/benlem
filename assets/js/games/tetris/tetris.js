class Tetris {

    constructor(elementId) {
        this.canvas = document.getElementById(elementId);
        this.context = this.canvas.getContext('2d');

        // time related variables
        this.lastTime = 0;
        this.dropCounter = 0;
        this.dropInterval = 1000;

        this.arena = [];
        this.tetroidBank = this.initTetroidBank();
        this.colorBank = this.initColorBank();
        this.currentPiece = null;
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
            new Tetroid([[0, 1, 0], [1, 1, 1], [0, 0, 0]], {x: 6, y: 0}),
            new Tetroid([[2, 2, 0], [0, 2, 2], [0, 0, 0]], {x: 6, y: 0}),
            new Tetroid([[0, 3, 3], [3, 3, 0], [0, 0, 0]], {x: 6, y: 0}),
            new Tetroid([[4, 4], [4, 4]], {x: 6, y: 0}),
            new Tetroid([[0, 0, 5], [5, 5, 5], [0, 0, 0]], {x: 6, y: 0}),
            new Tetroid([[6, 0, 0], [6, 6, 6], [0, 0, 0]], {x: 6, y: 0}),
            new Tetroid([[0, 0, 0, 0], [7, 7, 7, 7], [0, 0, 0, 0], [0, 0, 0, 0]], {x: 6, y: 0})
        ];
    }

    start() {
        this.initContext();
        this.initKeyboardControl();
        this.initArena(12, 20);
        this.resetCurrentPiece();
        this.update();
    };

    initContext() {
        this.context.scale(20, 20);
    }

    initKeyboardControl() {
        document.addEventListener('keydown', event => {
            let code = 0;

            if (event.key !== undefined) {
                code = event.key;
            } else if (event.keyIdentifier !== undefined) {
                code = event.keyIdentifier;
            } else if (event.keyCode !== undefined) {
                code = event.keyCode;
            }

            switch (code) {
                case 37: this.moveTetroid(-1); break;
                case 39: this.moveTetroid(1); break;
                case 40: this.dropTetroid(); break;
                case 17: this.rotateTetroid(1); break;
                case 16: this.rotateTetroid(-1); break;
            }
        });
    }

    initArena(w, h) {
        this.arena = [];
        while (h--) {
            this.arena.push(new Array(w).fill(0));
        }
    }

    resetCurrentPiece() {
        this.currentPiece = this.createNewTetroid();
        this.currentPiece.position.y = 0;
        this.currentPiece.position.x = (this.arena[0].length / 2 | 0) -
            (this.currentPiece.matrix[0].length / 2 | 0);
        if (this.collide()) {
            this.arena.forEach(row => row.fill(0));
        }
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
        requestAnimationFrame(this.update.bind(this));
    }

    drawAll() {
        this.drawField();
        this.drawArena();
        this.drawMatrix(this.currentPiece.matrix, this.currentPiece.position);
    }

    drawField() {
        this.context.fillStyle = '#e1c89f';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawArena() {
        this.drawMatrix(this.arena, {x: 0, y: 0}, 'red');
    }

    drawMatrix(matrix, offset) {
        matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    this.context.fillStyle = this.colorBank[value];
                    this.context.fillRect(
                        x + offset.x,
                        y + offset.y,
                        1, 1);
                }
            });
        });
    }
}

module.exports = Tetris;