import Boid from './boid';

class Flock {
  constructor(p5, boidNumber) {
    this.p5 = p5;
    this.boidNumber = boidNumber;
    this.boids = null;
    this.initBoidCollection();
  }

  initBoidCollection() {
    this.boids = [];

    for (let index = 0; index < this.boidNumber; index++) {
      let position = this.getRandomPosition();
      this.boids.push(new Boid(this.p5, position));
    }
  }

  getRandomPosition() {
    return this.p5.createVector(
      this.p5.random(this.p5.width),
      this.p5.random(this.p5.height)
    );
  }

  update() {
    for (let boid of this.boids) {
      boid.update(this.boids);
    }
  }

  draw() {
    /** Boid boid*/
    for (let boid of this.boids) {
      boid.draw();
    }
  }
}

export default Flock;