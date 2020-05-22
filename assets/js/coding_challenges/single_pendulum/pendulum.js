import p5 from "p5";
import * as engine from './engine';

class Pendulum {
  constructor(processing, position, armLength) {
    this.p5 = processing;
    this.origin = position;
    this.armLength = armLength;
    this.body = this.p5.createVector(this.origin.x, this.armLength);
    this.thetaAngle = this.p5.PI / 4;
    this.angularAcceleration = 0;
    this.angularVelocity = 0;
    this.bodyRadius = 37;
    this.dragging = false;
  }

  updateBodyPosition() {
    this.body.set(this.armLength * this.p5.sin(this.thetaAngle), this.armLength * this.p5.cos(this.thetaAngle), 0);
    this.body.add(this.origin);
  }

  update() {
    if (this.dragging === false) {
      this.angularAcceleration = ((-1 * engine.GRAVITY_CONST) / this.armLength) * this.p5.sin(this.thetaAngle);
      this.angularVelocity += this.angularAcceleration;
      this.angularVelocity *= engine.DAMPING_CONST;
      this.thetaAngle += this.angularVelocity;
    }
  }

  draw() {
    this.p5.stroke('#cd601a');
    this.p5.line(this.origin.x, this.origin.y, this.body.x, this.body.y);
    this.p5.strokeWeight(3);
    this.p5.fill('#e57e41');
    this.p5.ellipseMode(this.p5.CENTER);
    this.p5.ellipse(this.body.x, this.body.y, this.bodyRadius, this.bodyRadius);
  }

  go() {
    this.update();
    this.drag();
    this.updateBodyPosition();
    this.draw();
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

  drag() {
    if (this.dragging) {
      // Difference between 2 points
      const diff = p5.Vector.sub(this.origin, this.p5.createVector(this.p5.mouseX, this.p5.mouseY));
      // Angle relative to vertical axis
      this.thetaAngle = this.p5.atan2(-1*diff.y, diff.x) - this.p5.radians(90);
    }
  }
}

export default Pendulum;