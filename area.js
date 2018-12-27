// calculates the area of a convex polygon
function getArea(points) {
  // initialize the area as 0
  let area = 0 ;

  // and then use the formula abs( (x0 * y1 - x1 * y0) + (x1 * y2 - x2 * y1) + ... + (xn-1 * y0 - x0 * yn-1) ) / 2
  for(let i = 0 ; i < points.length - 1 ; i++) {
    area += points[i].x * points[i + 1].y - points[i + 1].x * points[i].y ;
  }
  
  area += points[points.length - 1].x * points[0].y - points[0].x * points[points.length - 1].y ;
  
  // return it
  return Math.abs(area) / 2 ;
}
