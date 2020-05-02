import p5 from 'p5';

class Boid {
  constructor(processing) {
    this.processing = processing;
    this.position = this.processing.createVector(
      this.processing.random(this.processing.width),
      this.processing.random(this.processing.height)
    );
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(this.processing.random(0.5, 1.5));
    this.acceleration = this.processing.createVector();
    this.perceptionRadius = 50;
    this.maxForce = 0.2;
    this.maxSpeed = 4;
  }

  flock(boids) {
    let alignment = this.align(boids);
    let cohesion = this.cohesion(boids);
    let separation = this.separation(boids);
    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
    this.acceleration.add(separation);
  }

  align(boids) {
    let steering = this.processing.createVector();
    let total = 0;

    for (let other of boids) {
      let distance = this.processing.dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      if (other !== this && distance < this.perceptionRadius) {
        steering.add(other.velocity);
        total++;
      }
    }
    if (total) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }

    return steering;
  }

  separation(boids) {
    let steering = this.processing.createVector();
    let total = 0;

    for (let other of boids) {
      let distance = this.processing.dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      if (other !== this && distance < this.perceptionRadius) {
        let diff = p5.Vector.sub(this.position, other.position);
        diff.div(distance);
        steering.add(diff);
        total++;
      }
    }
    if (total) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }

    return steering;
  }

  cohesion(boids) {
    let steering = this.processing.createVector();
    let total = 0;

    for (let other of boids) {
      let distance = this.processing.dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      if (other !== this && distance < this.perceptionRadius) {
        steering.add(other.position);
        total++;
      }
    }
    if (total) {
      steering.div(total);
      steering.sub(this.position);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }

    return steering;
  }

  edges() {
    if (this.position.x > this.processing.width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = this.processing.width;
    }
    if (this.position.y > this.processing.height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = this.processing.height;
    }
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
  }

  show () {
    this.processing.strokeWeight(8);
    this.processing.stroke(255);
    this.processing.point(this.position.x, this.position.y);
  }
}

export default Boid;