import p5 from 'p5';
import Boid from './boid';

function boidsSketch(p5) {
  let flock = [];

  p5.setup = function () {
    p5.createCanvas(720, 400);
    for (let index = 0; index < 1000; index++) {
      flock.push(new Boid(p5));
    }
  };

  p5.draw = function () {
    p5.background(51);
    for (let boid of flock) {
      boid.edges();
      boid.flock(flock);
      boid.update();
      boid.show();
    }
  };
}

export default new p5(boidsSketch, 'boids-container');