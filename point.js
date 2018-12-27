class point {
  // keeps the coordinates of a point... best class in this whole thing.
  constructor(x = random(width), y = random(height)) {
    this.x = x;
    this.y = y;
  }
  // render the point
  // set the stroke only once before calling render on all of the points to avoid useless calls to the stroke / fill functions
  render() {
    ellipse(this.x, this.y, 2, 2);
  }
}
