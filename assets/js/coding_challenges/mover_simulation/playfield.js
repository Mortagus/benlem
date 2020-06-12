import * as engine from './engine';

class Playfield {
  constructor(p5, width, height) {
    this.p5 = p5;
    this.width = width;
    this.height = height;
    this.canvas = this.p5.createCanvas(width, height);
    this.backgroundColor = 51;
  }

  edges(mover) {
    // ground edge
    if (mover.position.y >= this.height - mover.radius) {
      mover.position.y = this.height - mover.radius;
      mover.velocity.y *= -1;
    }
    // right edge
    if (mover.position.x >= this.width - mover.radius) {
      mover.position.x = this.width - mover.radius;
      mover.velocity.x *= -1;
    }
    // left edge
    if (mover.position.x <= mover.radius) {
      mover.position.x = mover.radius;
      mover.velocity.x *= -1;
    }
    // top edge
    if (mover.position.y <= mover.radius) {
      mover.position.y = mover.radius;
      mover.velocity.y *= -1;
    }
  }

  applyGroundFriction(mover) {
    let distanceFromGround = this.height - (mover.position.y + mover.radius);
    if (distanceFromGround < 1) {
      let friction = mover.velocity.copy();
      friction.normalize();
      friction.mult(-1);
      friction.setMag(engine.FRICTION_COEFFICIENT * mover.mass);
      mover.applyForce(friction);
    }
  }

  draw() {
    this.p5.background(this.backgroundColor);
  }
}

export default Playfield;