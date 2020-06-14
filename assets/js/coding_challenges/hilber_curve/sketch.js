import p5 from 'p5';
import Playfield from "./playfield";

function Sketch(p5) {
  let playfield = null;

  p5.setup = function () {
    playfield = new Playfield(p5, 400, 400);
  };

  p5.draw = function () {
    playfield.draw();
  };
}

export default new p5(Sketch, 'mover-container');