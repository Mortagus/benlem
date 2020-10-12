import p5 from 'p5';
import Playfield from '../includes/playfield';
import * as engine from './engine';

function Sketch(p5) {
  let playfield = null;

  p5.setup = function () {
    playfield = new Playfield(p5, engine.CANVAS_WIDTH, engine.CANVAS_HEIGHT);
    p5.pixelDensity(1);
  };

  p5.draw = function () {
    p5.loadPixels();

    for (let x = 0; x < playfield.width; x++) {
      for (let y = 0; y < playfield.height; y++) {

        let ca = p5.map(x, 0, playfield.width, engine.SET_MIN_VAL, engine.SET_MAX_VAL);
        let cb = p5.map(y, 0, playfield.height, engine.SET_MIN_VAL, engine.SET_MAX_VAL);

        let a = ca;
        let b = cb;
        let n;

        for (n = 0; n < engine.SET_MAX_ITERATION; n++) {
          let real = (a * a) - (b * b);
          let imaginary = 2 * a * b;

          a = real + ca;
          b = imaginary + cb;

          if (Math.abs(a + b) > 16) {
            break;
          }
        }

        let bright = p5.map(n, 0, engine.SET_MAX_ITERATION, 0, 1);
        bright = p5.map(Math.sqrt(bright), 0, 1, 0, 255);
        if (n === engine.SET_MAX_ITERATION) {
          bright = 0;
        }

        const pix = (x + y * playfield.width) * 4;
        p5.pixels[pix] = bright;
        p5.pixels[pix + 1] = bright;
        p5.pixels[pix + 2] = bright;
        p5.pixels[pix + 3] = 255;
      }
    }

    p5.updatePixels();
  };
}

export default new p5(Sketch, 'fractal-set-container');