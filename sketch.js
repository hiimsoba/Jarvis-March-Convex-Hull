// humans like to press buttons
let create_hull_button;
let create_hull_continuously_button;
let generate_random_points_button;

// will hold the points that form the convex hull... eventually
let conv_hull = [];

// store all the points in the canvas
let points = [];

// continuous? :o
let continuous = true;

function setup() {
  // create a 600x600 canvas
  createCanvas(600, 600);

  // new paragraph so the buttons appear nicely, under the canvas
  createP("");

  // self explanatory much
  create_hull_button = createButton("Create hull");
  create_hull_continuously_button = createButton("Create hull continuously");
  generate_random_points_button = createButton("Generate random points");

  // link functions to the mouse pressed event of the buttons
  create_hull_button.mousePressed(createHull);
  generate_random_points_button.mousePressed(generate_points);
  // a little anonymous function for this one, since its functionality is quite simple
  // switch the state of the "continuous" variable
  // damn, that's kinda hard to spell, yikes
  create_hull_continuously_button.mousePressed(() => {
    continuous = !continuous;
  });

  // push 4 points initially, forming a square
  points.push(new point(200, 200));
  points.push(new point(200, 400));
  points.push(new point(400, 200));
  points.push(new point(400, 400));
}

function draw() {
  // if the user wants to update the hull each frame, just do it!
  if (continuous) {
    createHull();
    // also, only draw the points if we're updating the hull, because only then something will change
    // white fill and stroke for the points
    fill(255);
    stroke(255);
    // draw all of them
    for (let p of points) {
      p.render();
    }
  }
}

// creates the hull and draws it on the canvas
function createHull() {
  // get the convex hull from the set of points
  conv_hull = convexHull(points);
  // if the hull is not null or undefined... so basically, if there is a hull
  if (conv_hull) {
    // give it some fill color
    fill(255, 50, 150, 50);
    // and a stroke
    stroke(0, 255, 100);
    // reset the background
    background(0);
    // begin the shape of the hull
    beginShape();
    for (let i = 0; i < conv_hull.length; i++) {
      // set a vertex at each point's position
      vertex(conv_hull[i].x, conv_hull[i].y);
    }
    // close the shape
    endShape(CLOSE);
  }
}

// generate num points on the canvas, at random positions
function generate_points(num = 100) {
  for (let i = 0; i < num; i++) {
    points.push(new point());
  }
}

// add points when the mouse is dragged
function mouseDragged() {
  // make a little check if the point is between the boundaries of the canvas
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    // if so, add a point at the position of the mouse
    let pt = new point(mouseX, mouseY);
    points.push(pt);
    // and also draw it
    pt.render();
  }
}
