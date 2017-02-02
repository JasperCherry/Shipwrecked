///////////////////////////////////// MAIN CANVAS INTERVAL FUNCTION
function updateGameArea() {

    myGameArea.clear();

    var ctx = myGameArea.context;

    // playing area
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x, window.innerHeight/2-myGamePiece.y);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x+1024, window.innerHeight/2-myGamePiece.y);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x, window.innerHeight/2-myGamePiece.y+1024);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x+1024, window.innerHeight/2-myGamePiece.y+1024);

    // upper part
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x-1024, window.innerHeight/2-myGamePiece.y-1024);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x, window.innerHeight/2-myGamePiece.y-1024);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x+1024, window.innerHeight/2-myGamePiece.y-1024);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x+2048, window.innerHeight/2-myGamePiece.y-1024);

    // lower part
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x-1024, window.innerHeight/2-myGamePiece.y+2048);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x, window.innerHeight/2-myGamePiece.y+2048);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x+1024, window.innerHeight/2-myGamePiece.y+2048);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x+2048, window.innerHeight/2-myGamePiece.y+2048);

    // left part
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x-1024, window.innerHeight/2-myGamePiece.y);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x-1024, window.innerHeight/2-myGamePiece.y+1024);

    // right part
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x+2048, window.innerHeight/2-myGamePiece.y);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x+2048, window.innerHeight/2-myGamePiece.y+1024);


    ctx.fillStyle = "red";
    ctx.globalAlpha = 0.5;
    ctx.fillRect(window.innerWidth/2-myGamePiece.x-5, window.innerHeight/2-myGamePiece.y, 2048+10, -5);
    ctx.fillRect(window.innerWidth/2-myGamePiece.x-5, window.innerHeight/2-myGamePiece.y+2048, 2048+10, 5);
    ctx.fillRect(window.innerWidth/2-myGamePiece.x, window.innerHeight/2-myGamePiece.y, -5, 2048);
    ctx.fillRect(window.innerWidth/2-myGamePiece.x+2048, window.innerHeight/2-myGamePiece.y, 5, 2048);
    ctx.globalAlpha = 1;



    // showing ai ships
    ai1.show();
    ai2.show();
    ai3.show();
    ai4.show();
    ai5.show();
    


    // showing other ships
    if(otherShips.length>0){
      for(var x=0; x<otherShips.length; x++){
          otherShips[x].show();
          if(otherShips[x].timer<=0){
            otherShips.splice(x,1);
          }
      }
    }

    // showing user ship
    myGamePiece.update();

    // showing balls
    if(balls.length>0){
      for(var x=0; x<balls.length; x++){
          balls[x].show();
      }
    }
    // deleting balls when timer is zero
    if(balls.length>0){
      for(var x=0; x<balls.length; x++){
          if(balls[x].timer<=0){
            balls.splice(x,1);
          }
      }
    }

    // showing explosions
    if(exps.length>0){
      for(var x=0; x<exps.length; x++){
          exps[x].show();
      }
    }
    // deleting explosions when timer is zero
    if(exps.length>0){
      for(var x=0; x<exps.length; x++){
          if(exps[x].exLoop>64){
            exps.splice(x,1);
          }
      }
    }

    // showing hits
    if(hits.length>0){

      for(var x=0; x<hits.length; x++){
          hits[x].show();
      }
    }
    // deleting hits when timer is zero
    if(hits.length>0){
      for(var x=0; x<hits.length; x++){
          if(hits[x].exLoop>48){
            hits.splice(x,1);
          }
      }
    }

    // showing chat
    if(textMsgArr.length>0){
      for(var x=0; x<textMsgArr.length; x++){
          if(x>0){
            textMsgArr[x].y+=20*x;
            textMsgArr[x].show();
            textMsgArr[x].y-=20*x;
          }else{
            textMsgArr[x].show();
          }

      }
    }
    // deleting messages
    if(textMsgArr.length>0){
      for(var x=0; x<textMsgArr.length; x++){
          if(textMsgArr[x].timer==0){
            textMsgArr.splice(x,1);
          }
      }
    }



    // checking if player was hit
/*
    ctx = myGameArea.context;
    ctx.fillStyle = "red";

    ctx.fillRect(-15+window.innerWidth/2, -15+window.innerHeight/2, 30, 30);

    ctx.fillRect(-15 + window.innerWidth/2+round((-30 * Math.sin(myGamePiece.angle)), 0),
      -15 + window.innerHeight/2+round((30 * Math.cos(myGamePiece.angle)), 0),30,30);

    ctx.fillRect(-15 + window.innerWidth/2+round((30 * Math.sin(myGamePiece.angle)), 0),
      -15 + window.innerHeight/2+round((-30 * Math.cos(myGamePiece.angle)), 0),30,30);
*/

    // checking 3 squares
    if(balls.length>0&&myGamePiece.inGame&&myGamePiece.hp>0){
      for(var x=0; x<balls.length; x++){
          if(Math.abs(balls[x].x-myGamePiece.x)<15 && Math.abs(balls[x].y-myGamePiece.y)<15
          &&balls[x].id!=myGamePiece.id){
            if(myGamePiece.hp<=balls[x].damage){
              myGamePiece.lastHit=balls[x].id;
            }
            myGamePiece.hp-=balls[x].damage;
            hits.push(new hit(balls[x].x, balls[x].y, balls[x].a));
            balls.splice(x,1);
          }else
          if(Math.abs(balls[x].x-(myGamePiece.x-0+round((-30 * Math.sin(myGamePiece.angle)), 0)))<15
           && Math.abs(balls[x].y-(myGamePiece.y-0+round((30 * Math.cos(myGamePiece.angle)), 0)))<15
          &&balls[x].id!=myGamePiece.id){
            if(myGamePiece.hp<=balls[x].damage){
              myGamePiece.lastHit=balls[x].id;
            }
            myGamePiece.hp-=balls[x].damage;
            hits.push(new hit(balls[x].x, balls[x].y, balls[x].a));
            balls.splice(x,1);
          }else
          if(Math.abs(balls[x].x-(myGamePiece.x-0+round((30 * Math.sin(myGamePiece.angle)), 0)))<15
           && Math.abs(balls[x].y-(myGamePiece.y-0+round((-30 * Math.cos(myGamePiece.angle)), 0)))<15
          &&balls[x].id!=myGamePiece.id){
            if(myGamePiece.hp<=balls[x].damage){
              myGamePiece.lastHit=balls[x].id;
            }
            myGamePiece.hp-=balls[x].damage;
            hits.push(new hit(balls[x].x, balls[x].y, balls[x].a));
            balls.splice(x,1);
          }
      }
    }

    // checking if other ship was hit
    // checking 3 squares
    if(balls.length>0&&otherShips.length>0){
      for(var z=0; z<otherShips.length; z++){
        if(otherShips[z].hp>0){
        for(var x=0; x<balls.length; x++){
          if(Math.abs(balls[x].x-(otherShips[z].x))<15
          && Math.abs(balls[x].y-(otherShips[z].y))<15
          &&balls[x].id!=otherShips[z].id){
            hits.push(new hit(balls[x].x, balls[x].y, balls[x].a));
            balls.splice(x,1);
          }else
          if(Math.abs(balls[x].x-(otherShips[z].x-0+round((-30 * Math.sin(otherShips[z].angle)), 0)))<15
          && Math.abs(balls[x].y-(otherShips[z].y-0+round((30 * Math.cos(otherShips[z].angle)), 0)))<15
          &&balls[x].id!=otherShips[z].id){
            hits.push(new hit(balls[x].x, balls[x].y, balls[x].a));
            balls.splice(x,1);
          }else
          if(Math.abs(balls[x].x-(otherShips[z].x-0+round((30 * Math.sin(otherShips[z].angle)), 0)))<15
          && Math.abs(balls[x].y-(otherShips[z].y-0+round((-30 * Math.cos(otherShips[z].angle)), 0)))<15
          &&balls[x].id!=otherShips[z].id){
            hits.push(new hit(balls[x].x, balls[x].y, balls[x].a));
            balls.splice(x,1);
          }
        }
        }
      }
    }



    // checking if player died
    if(myGamePiece.hp<=0){

      if(myGamePiece.lastHit.toString()=="ai1"&&myGamePiece.lastInfo==true){
        myGamePiece.lastInfo=false;
        var txt={"p":"","t":person+" has been killed by "+ai1.name, "c":1};
        socket.emit('chat', txt);
      }

      if(myGamePiece.lastHit.toString()=="ai2"&&myGamePiece.lastInfo==true){
        myGamePiece.lastInfo=false;
        var txt={"p":"","t":person+" has been killed by "+ai2.name, "c":1};
        socket.emit('chat', txt);
      }


      myGamePiece.hp=0;
      myGamePiece.deadTimer--;
      if(myGamePiece.deadTimer==0){
        // respawn
        var newPosX=Math.floor(Math.random()*2048+1)
        var newPosY=Math.floor(Math.random()*2048+1);
        myGamePiece = new myShip(newPosX, newPosY, person, tempId, 1);
      }
    }




}/////////////////////////////////////////////////// end of game update
