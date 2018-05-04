function setup() {
  createCanvas(600, 600) ;
  createP("") ;
  bt = createButton("Create hull!") ;
  bt.mousePressed(createHull) ;
  rand = createButton("Generate random points") ;
  rand.mousePressed(genpoints) ;
  background(0) ;
  points.push(new point(200, 200)) ;
  points.push(new point(200, 400)) ;
  points.push(new point(400, 200)) ;
  points.push(new point(400, 400)) ;
}

function genpoints() {
  for(let i = 0 ; i < 100 ; i++) {
    points.push(new point(random(width), random(height))) ;
  }
}

let hull = [] ;

let rand ;

function createHull() {
  hull = convexHull(points) ;
  stroke(0, 255, 100) ;
  fill(255) ;
  strokeWeight(0.5) ;
  if(hull) {
    fill(255, 50, 150, 50) ;
    background(0) ;
    beginShape() ;
    for(let i = 0 ; i < hull.length - 1 ; i++) {
      line(hull[i].x, hull[i].y, hull[i + 1].x, hull[i + 1].y) ;
      vertex(hull[i].x, hull[i].y) ;
    }
    line(hull[0].x, hull[0].y, hull[hull.length - 1].x, hull[hull.length - 1].y) ;
    vertex(hull[hull.length - 1].x, hull[hull.length - 1].y) ;
    vertex(hull[0].x, hull[0].y) ;
    endShape() ;
  }
}

let clicked = false ;
let points = [] ;

function mouseDragged() {
  if(!clicked) {
    noStroke() ;
    fill(255) ;
    if(mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
      points.push(new point(mouseX, mouseY)) ;
    }
//    clicked = true ;
  }
}

let bt ;

function draw() {
  if(!mouseIsPressed) {
    clicked = false ;
  }
  createHull() ;
  fill(255) ;
  stroke(255) ;
  for(let p of points) {
    ellipse(p.x, p.y, 1, 1) ;
  }
}
