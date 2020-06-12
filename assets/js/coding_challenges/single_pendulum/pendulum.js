import p5 from "p5";
import * as engine from './engine';

class Pendulum {
  constructor(processing, position, armLength) {
    this.p5 = processing;

    this.pivot = position;
    this.body = this.p5.createVector(this.pivot.x, 0);

    this.armLength = armLength;
    this.thetaAngle = 0;

    this.angularVelocity = 0.0;
    this.angularAcceleration = 0.0;

    this.bodyRadius = 35;
    this.bodyMass = 0;

    this.dragging = false;
  }

  setMass(mass) {
    this.bodyMass = mass;
  }

  setArmLength(armLength) {
    this.armLength = armLength;
  }

  go() {
    this.update();
    this.drag();
    this.updateBodyPosition();
    this.draw();
  }

  update() {
    if (this.dragging === true) {
      return;
    }

    const gravityForce = engine.GRAVITY_CONST * this.bodyMass;
    this.angularAcceleration = (-1 * gravityForce / this.armLength) * this.p5.sin(this.thetaAngle);
    // this.angularAcceleration = (-1 * gravityForce * this.p5.sin(this.thetaAngle)) / this.armLength;
    this.angularVelocity += this.angularAcceleration;
    this.thetaAngle += this.angularVelocity;
    this.angularVelocity *= engine.DAMPING_CONST;
  }

  drag() {
    if (this.dragging === false) {
      return;
    }
    // Difference between 2 points
    const diff = p5.Vector.sub(this.pivot, this.p5.createVector(this.p5.mouseX, this.p5.mouseY));
    // Angle relative to vertical axis
    this.thetaAngle = this.p5.atan2(-1 * diff.y, diff.x) - this.p5.radians(90);
  }

  updateBodyPosition() {
    const newX = this.armLength * this.p5.sin(this.thetaAngle);
    const newY = this.armLength * this.p5.cos(this.thetaAngle);
    this.body.set(newX, newY, 0);
    this.body.add(this.pivot);
  }

  draw() {
    this.drawArm();
    this.drawBody();
  }

  drawArm() {
    this.p5.stroke('#cd601a');
    this.p5.line(this.pivot.x, this.pivot.y, this.body.x, this.body.y);
    this.p5.strokeWeight(3);
  }

  drawBody() {
    this.p5.fill('#e57e41');
    this.p5.ellipseMode(this.p5.CENTER);
    this.p5.ellipse(this.body.x, this.body.y, this.bodyRadius);
  }

  clicked(mouseX, mouseY) {
    const d = this.p5.dist(mouseX, mouseY, this.body.x, this.body.y);
    if (d < this.bodyRadius) {
      this.dragging = true;
    }
  }

  stopDragging() {
    if (this.dragging) {
      this.angularVelocity = 0; // No velocity once you let go
      this.dragging = false;
    }
  }
}

export default Pendulum;