import p5 from 'p5';

new p5(function (p5) {
  p5.setup = function (p5) {
    p5.createCanvas(400, 400);
  };

  p5.draw = function (p5) {

  };
});

class Boids {
  constructor(containerId) {
    // sketch = new p5(function (p5) {
    //   p5.setup = Boids.setup(p5);
    //
    //   p5.draw = Boids.draw(p5);
    // }, containerId);
  }
}

export default Boids;