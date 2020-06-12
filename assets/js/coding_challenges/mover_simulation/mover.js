import p5 from 'p5';
import * as engine from './engine';

class Mover {
  constructor(processing, originPosition, mass) {
    this.p5 = processing;
    this.position = originPosition;
    this.acceleration = this.p5.createVector(0, 0);
    this.velocity = this.p5.createVector(0, 0);
    this.weight = this.p5.createVector(0, mass * engine.GRAVITY_CONST);

    this.mass = mass;
    this.radius = this.p5.sqrt(this.mass) * engine.VISUAL_MAGNIFIER;
  }

  applyForce(force) {
    let newForce = p5.Vector.div(force, this.mass);
    this.acceleration.add(newForce);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
  }

  getWeight() {
    return this.weight;
  }

  resetAcceleration() {
    this.acceleration.set(0, 0);
  }

  draw() {
    this.p5.stroke(255);
    this.p5.strokeWeight(2);
    this.p5.fill(255, 100);
    this.p5.ellipse(this.position.x, this.position.y, this.radius * 2);
  }
}

export default Mover;