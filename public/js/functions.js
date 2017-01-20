// rounding numbers function
function round(n, k){
    var factor = Math.pow(10, k);
    return Math.round(n*factor)/factor;
}

// collision detection
function ifCollide(element){
if(element.hp>0){
  // first square
  if(Math.abs(myGamePiece.x-(element.x))<15
  && Math.abs(myGamePiece.y-(element.y))<15
  ){
    if(myGamePiece.hp<=1){
      myGamePiece.lastHit=element.id;
    }
    myGamePiece.hp--;
  }else
  if(Math.abs(myGamePiece.x-(element.x-0+round((-30 * Math.sin(element.angle)), 0)))<15
  && Math.abs(myGamePiece.y-(element.y-0+round((30 * Math.cos(element.angle)), 0)))<15
  ){
    if(myGamePiece.hp<=1){
      myGamePiece.lastHit=element.id;
    }
    myGamePiece.hp--;
  }else
  if(Math.abs(myGamePiece.x-(element.x-0+round((30 * Math.sin(element.angle)), 0)))<15
  && Math.abs(myGamePiece.y-(element.y-0+round((-30 * Math.cos(element.angle)), 0)))<15
  ){
    if(myGamePiece.hp<=1){
      myGamePiece.lastHit=element.id;
    }
    myGamePiece.hp--;
  }else

  // second square
  if(Math.abs((myGamePiece.x-0+round((-30 * Math.sin(myGamePiece.angle)), 0))-(element.x))<15
  && Math.abs((myGamePiece.y-0+round((30 * Math.cos(myGamePiece.angle)), 0))-(element.y))<15
  ){
    if(myGamePiece.hp<=1){
      myGamePiece.lastHit=element.id;
    }
    myGamePiece.hp--;
  }else
  if(Math.abs((myGamePiece.x-0+round((-30 * Math.sin(myGamePiece.angle)), 0))
  -(element.x-0+round((-30 * Math.sin(element.angle)), 0)))<15
  && Math.abs((myGamePiece.y-0+round((30 * Math.cos(myGamePiece.angle)), 0))
  -(element.y-0+round((30 * Math.cos(element.angle)), 0)))<15
  ){
    if(myGamePiece.hp<=1){
      myGamePiece.lastHit=element.id;
    }
    myGamePiece.hp--;
  }else
  if(Math.abs((myGamePiece.x-0+round((-30 * Math.sin(myGamePiece.angle)), 0))
  -(element.x-0+round((30 * Math.sin(element.angle)), 0)))<15
  && Math.abs((myGamePiece.y-0+round((30 * Math.cos(myGamePiece.angle)), 0))
  -(element.y-0+round((-30 * Math.cos(element.angle)), 0)))<15
  ){
    if(myGamePiece.hp<=1){
      myGamePiece.lastHit=element.id;
    }
    myGamePiece.hp--;
  }else

  // third square
  if(Math.abs((myGamePiece.x-0+round((30 * Math.sin(myGamePiece.angle)), 0))-(element.x))<15
  && Math.abs((myGamePiece.y-0+round((-30 * Math.cos(myGamePiece.angle)), 0))-(element.y))<15
  ){
    if(myGamePiece.hp<=1){
      myGamePiece.lastHit=element.id;
    }
    myGamePiece.hp--;
  }else
  if(Math.abs((myGamePiece.x-0+round((30 * Math.sin(myGamePiece.angle)), 0))
  -(element.x-0+round((-30 * Math.sin(element.angle)), 0)))<15
  && Math.abs((myGamePiece.y-0+round((-30 * Math.cos(myGamePiece.angle)), 0))
  -(element.y-0+round((30 * Math.cos(element.angle)), 0)))<15
  ){
    if(myGamePiece.hp<=1){
      myGamePiece.lastHit=element.id;
    }
    myGamePiece.hp--;
  }else
  if(Math.abs((myGamePiece.x-0+round((30 * Math.sin(myGamePiece.angle)), 0))
  -(element.x-0+round((30 * Math.sin(element.angle)), 0)))<15
  && Math.abs((myGamePiece.y-0+round((-30 * Math.cos(myGamePiece.angle)), 0))
  -(element.y-0+round((-30 * Math.cos(element.angle)), 0)))<15
  ){
    if(myGamePiece.hp<=1){
      myGamePiece.lastHit=element.id;
    }
    myGamePiece.hp--;
  }
}
}
