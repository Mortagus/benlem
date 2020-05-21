import p5 from 'p5';
import * as engine from './engine';

class Boid {
  constructor(processing, position) {
    this.p5 = processing;
    this.position = position;
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(this.p5.random(0.5, 1.5));
    this.acceleration = this.p5.createVector();
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
      if (distance < engine.PERCEPTION_RADIUS) {
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
      alignmentSteering.setMag(engine.MAX_SPEED);
      alignmentSteering.sub(this.velocity);
      alignmentSteering.limit(engine.MAX_FORCE);

      separationSteering.div(totalBoidWithinRadius);
      separationSteering.setMag(engine.MAX_SPEED);
      separationSteering.sub(this.velocity);
      separationSteering.limit(engine.MAX_FORCE);

      cohesionSteering.div(totalBoidWithinRadius);
      cohesionSteering.sub(this.position);
      cohesionSteering.setMag(engine.MAX_SPEED);
      cohesionSteering.sub(this.velocity);
      cohesionSteering.limit(engine.MAX_FORCE);
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

  update(allBoids) {
    this.position.add(this.velocity);
    this.acceleration = this.calculateAcceleration(allBoids);
    this.velocity.add(this.acceleration);
  }

  draw() {
    this.p5.push();
    this.p5.strokeWeight(1);
    this.p5.stroke("#1658d2");
    const angle = Math.atan2(this.velocity.y, this.velocity.x);
    this.p5.translate(this.position.x, this.position.y);
    this.p5.rotate(angle);
    this.p5.translate(-this.position.x, -this.position.y);
    this.p5.triangle(
      this.position.x,
      this.position.y,
      this.position.x - 15,
      this.position.y + 5,
      this.position.x - 15,
      this.position.y - 5
    );
    this.p5.pop();
  }
}

export default Boid;