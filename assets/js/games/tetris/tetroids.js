class Tetroid {

    constructor(matrix, position) {
        this._matrix = matrix;
        this._position = position;
    }

    set matrix(matrix) {
        this._matrix = matrix;
    }

    set position(position) {
        this._position = position;
    }

    get matrix() {
        return this._matrix;
    }

    get position() {
        return this._position;
    }
}

export default Tetroid;