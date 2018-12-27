// this is gonna be fun
// actually, it's from geeksforgeeks, i believe

// finds the orientation of the ordered (p, q, r) triplet
// returns : 0 if colinear, 1 if clockwise, 2 if counterclockwise
function orientation(p, q, r) {
  let v = (
    (q.y - p.y) * (r.x - q.x) -
    (q.x - p.x) * (r.y - q.y)
  );
  if (v == 0) {
    return 0; // colinear
  } else {
    return (v > 0 ? 1 : 2); // CW or CCW
  }
}

// create the convex hull from a set of points
function convexHull(points) {
  // number of points
  let n = points.length;

  // at least three points are needed
  if (n < 3) {
    return;
  }

  // finds the leftmost point
  // for now, assume it's the first point
  let l = 0;
  for (let i = 0; i < points.length; i++) {
    // if p[i] is to the left of p[l], update "l"
    if (points[i].x < points[l].x) {
      l = i;
    }
  }
  
  // Start from leftmost point, keep moving counterclockwise until we reach the start point again.
  let p = l;
  let q;

  // empty hull
  let hull = [];

  do {
    // add the current point to the hull
    hull.push(points[p]);
    // Search for a point 'q' such that orientation(p, x, q) is counterclockwise for all points 'x'.
    // The idea is to keep track of last visited most counterclockwise point in q.
    // If any point 'i' is more counterclock-wise than q, then update q.
    q = (p + 1) % n;
    for (let i = 0; i < n; i++) {
      if (orientation(points[p], points[i], points[q]) == 2) {
        q = i;
      }
    }
    // Now q is the most counterclockwise with respect to p
    // Set p as q for next iteration, so that q is added to result 'hull'
    p = q;
  } while (p != l); // While we don't reach the first point

  // return the hull, yay.
  return hull;
}
