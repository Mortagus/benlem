import p5 from 'p5';
import Flock from './flock';
import Playfield from './playfield';

function boidsSketch(p5) {
  let flock = null;
  let playfield = null;

  p5.setup = function () {
    playfield = new Playfield(p5, 720, 400);
    flock = new Flock(p5, 50);
  };

  p5.draw = function () {
    playfield.draw();
    playfield.edges(flock);
    flock.update();
    flock.draw();
  };
}

export default new p5(boidsSketch, 'boids-container');