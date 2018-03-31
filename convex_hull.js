function orientation(p, q, r) {
  let aux = (
    (q.y - p.y) * (r.x - q.x) -
    (q.x - p.x) * (r.y - q.y)
  ) ;
  if(aux == 0) {
    return 0 ;
  } else {
    return (aux > 0 ? 1 : 2) ;
  }
}

function convexHull(points) {
  let n = points.length ;
  
  if(n < 3) {
    return ;
  }

  let hull = [] ;

  let l = 0 ;
  for(let i = 0 ; i < points.length ; i++) {
    if(points[i].x < points[l].x) {
      l = i ;
    }
  }

  let p = l ;
  let q ;

  do {
    hull.push(points[p]) ;
    q = (p + 1) % n ;
    for(let i = 0 ; i < n ; i++) {
      if(orientation(points[p], points[i], points[q]) == 2) {
        q = i ;
      }
    }
    p = q ;
  } while(p != l) ;

  return hull ;
}
