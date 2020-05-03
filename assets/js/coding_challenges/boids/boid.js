import p5 from 'p5';

class Boid {
  constructor(processing, position) {
    this.p5 = processing;
    this.position = position;
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(this.p5.random(0.5, 1.5));
    this.acceleration = this.p5.createVector();
    this.perceptionRadius = 50;
    this.maxForce = 0.2;
    this.maxSpeed = 4;
  }

  calculateAcceleration(boids) {
    let totalAcceleration = this.p5.createVector();
    let alignmentSteering = this.p5.createVector();
    let separationSteering = this.p5.createVector();
    let cohesionSteering = this.p5.createVector();
    let totalBoidWithinRadius = 0;

    for (let other of boids) {
      if (other === this) {
        continue;
      }
      let distance = this.calculateDistance(this.position, other.position);
      if (distance < this.perceptionRadius) {
        alignmentSteering.add(other.velocity);

        let diff = p5.Vector.sub(this.position, other.position);
        diff.div(distance);
        separationSteering.add(diff);

        cohesionSteering.add(other.position);

        totalBoidWithinRadius++;
      }
    }

    if (totalBoidWithinRadius > 0) {
      alignmentSteering.div(totalBoidWithinRadius);
      alignmentSteering.sub(this.velocity);
      alignmentSteering.limit(this.maxForce);

      separationSteering.div(totalBoidWithinRadius);
      separationSteering.sub(this.velocity);
      separationSteering.limit(this.maxForce);

      cohesionSteering.div(totalBoidWithinRadius);
      cohesionSteering.sub(this.position);
      cohesionSteering.sub(this.velocity);
      cohesionSteering.limit(this.maxForce);
    }

    totalAcceleration.add(alignmentSteering);
    totalAcceleration.add(separationSteering);
    totalAcceleration.add(cohesionSteering);

    return totalAcceleration;
  }

  calculateDistance(currentBoidPosition, otherBoidPosition) {
    return this.p5.dist(
      currentBoidPosition.x,
      currentBoidPosition.y,
      otherBoidPosition.x,
      otherBoidPosition.y
    );
  }

  align(boids) {
    let steering = this.p5.createVector();
    let total = 0;

    for (let other of boids) {
      let distance = this.p5.dist(
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
    let steering = this.p5.createVector();
    let total = 0;

    for (let other of boids) {
      let distance = this.p5.dist(
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
    let steering = this.p5.createVector();
    let total = 0;

    for (let other of boids) {
      let distance = this.p5.dist(
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

  update(allBoids) {
    this.position.add(this.velocity);
    this.acceleration = this.calculateAcceleration(allBoids);
    this.acceleration.limit(10);
    this.velocity.add(this.acceleration);
  }

  show () {
    this.p5.strokeWeight(8);
    this.p5.stroke(255);
    this.p5.point(this.position.x, this.position.y);
  }
}

export default Boid;