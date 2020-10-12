import p5 from 'p5';
import Playfield from '../includes/playfield';
import * as engine from './engine';

function Sketch(p5) {
  let playfield = null;

  p5.setup = function () {
    playfield = new Playfield(p5, engine.CANVAS_WIDTH, engine.CANVAS_HEIGHT);
  };

  p5.draw = function () {
    playfield.show();
  };
}

export default new p5(Sketch, 'fractal-set-container');