class Playfield {
  constructor(p5, width, height) {
    this.p5 = p5;
    this.width = width;
    this.height = height;
    this.canvas = this.p5.createCanvas(width, height);
    this.backgroundColor = 51;
  }

  draw() {
    this.p5.background(this.backgroundColor);
  }
}

export default Playfield;