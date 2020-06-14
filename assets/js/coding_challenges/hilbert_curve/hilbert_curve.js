import p5 from 'p5';
import * as engine from "./engine";

class HilbertCurve {
  constructor(processing, order) {
    this.p5 = processing;
    this.order = order;
    this.N = this.p5.int(this.p5.pow(2, this.order));
    this.totalPoints = this.N * this.N;
    this.path = [];
  }

  buildPath() {
    const length = engine.CANVAS_WIDTH / this.N;
    for (let i = 0; i < this.totalPoints; i++) {
      this.path[i] = this.getHilbertPoint(i);
      this.path[i].mult(length);
      this.path[i].add(length / 2, length / 2);
    }
  }

  getHilbertPoint(i) {
    const points = [
      this.p5.createVector(0, 0),
      this.p5.createVector(0, 1),
      this.p5.createVector(1, 1),
      this.p5.createVector(1, 0)
    ];
    let index = i & 3;
    let hilbertPoint = points[index];

    for (let j = 1; j < this.order; j++) {
      i = i >>> 2;
      index = i & 3;
      let length = this.p5.pow(2, j);

      switch (index) {
        case 0:
          let temp0 = hilbertPoint.x;
          hilbertPoint.x = hilbertPoint.y;
          hilbertPoint.y = temp0;
          break;
        case 1:
          hilbertPoint.y += length;
          break;
        case 2:
          hilbertPoint.x += length;
          hilbertPoint.y += length;
          break;
        case 3:
          let temp3 = length - 1 - hilbertPoint.x;
          hilbertPoint.x = length - 1 - hilbertPoint.y;
          hilbertPoint.y = temp3;
          hilbertPoint.x += length;
          break;
      }
    }

    return hilbertPoint;
  }

  showPath() {
    this.p5.stroke(255);
    this.p5.strokeWeight(2);
    this.p5.noFill();
    this.p5.beginShape();

    for (let i = 0; i < this.totalPoints; i++) {
      this.p5.vertex(this.path[i].x, this.path[i].y);
    }

    this.p5.endShape();
  }

  showPoints() {
    this.p5.strokeWeight(1);
    for (let i = 0; i < this.totalPoints; i++) {
      this.p5.point(this.path[i].x, this.path[i].y);
      this.p5.text(i, this.path[i].x + 5, this.path[i].y - 5);
    }
  }
}

export default HilbertCurve;