import p5 from 'p5';
import Playfield from './playfield';
import HilbertCurve from './hilbert_curve'
import * as engine from './engine';

function Sketch(p5) {
  let playfield = null;
  let hilbert = null;
  let order = 4;

  p5.setup = function () {
    playfield = new Playfield(p5, engine.CANVAS_WIDTH, engine.CANVAS_HEIGHT);
    hilbert = new HilbertCurve(p5, order)
    hilbert.buildPath();
  };

  p5.draw = function () {
    playfield.show();
    hilbert.showPath();
    hilbert.showPoints();
  };
}

export default new p5(Sketch, 'hilbert-container');