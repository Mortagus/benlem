import p5 from 'p5';
import Playfield from '../includes/playfield';
import Pendulum from './pendulum';
import * as engine from './engine';

function pendulumSketch(p5) {
  let playfield = null;
  let pendulum = null;

  p5.setup = function () {
    playfield = new Playfield(p5, engine.CANVAS_WIDTH, engine.CANVAS_HEIGHT);
    pendulum = new Pendulum(p5, p5.createVector(engine.CANVAS_WIDTH / 2, 0));
    pendulum.setArmLength(350);
    pendulum.setMass(10);
  };

  p5.draw = function () {
    playfield.draw();
    pendulum.go();
  };

  p5.mousePressed = function() {
    pendulum.clicked(p5.mouseX, p5.mouseY)
  };

  p5.mouseReleased = function() {
    pendulum.stopDragging();
  };
}

export default new p5(pendulumSketch, 'single-pendulum-container');