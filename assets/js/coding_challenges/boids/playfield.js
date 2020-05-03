class Playfield {
  constructor(p5, width, height) {
    this.p5 = p5;
    this.width = width;
    this.height = height;
    this.canvas = this.p5.createCanvas(width, height);
    this.backgroundColor = 51;
  }

  edges(flock) {
    for (let boid of flock.boids) {
      if (boid.position.x > this.width) {
        boid.position.x = 0;
      } else if (boid.position.x < 0) {
        boid.position.x = this.width;
      }
      if (boid.position.y > this.height) {
        boid.position.y = 0;
      } else if (boid.position.y < 0) {
        boid.position.y = this.height;
      }
    }
  }

  draw() {
    this.p5.background(this.backgroundColor);
  }
}

export default Playfield;