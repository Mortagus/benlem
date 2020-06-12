import p5 from 'p5';
import Playfield from './playfield';
import Mover from './mover';
import * as engine from './engine';

function Sketch(p5) {
  let playfield = null;
  let movers = [];
  const moverCounter = 4;

  p5.setup = function () {
    playfield = new Playfield(p5, engine.CANVAS_WIDTH, engine.CANVAS_HEIGHT);
    let positionX = 0;
    for (let i = 1; i <= moverCounter; i++) {
      positionX = p5.constrain(positionX, i*100, playfield.width);
      let newPosition = p5.createVector(positionX, 200);
      let newMover = new Mover(p5, newPosition, i * 2);
      movers.push(newMover);
    }
  };

  p5.draw = function () {
    playfield.draw();
    for (let mover of movers) {
      mover.applyForce(mover.getWeight());
      playfield.applyGroundFriction(mover);
      mover.applyForce(getWind());
      mover.update();
      playfield.edges(mover)
      mover.draw();
      mover.resetAcceleration();
    }
  };

  let getWind = function () {
    return p5.createVector(0.1, 0);
  }
}

export default new p5(Sketch, 'mover-container');