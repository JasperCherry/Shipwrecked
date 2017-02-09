///////////////////////////////////// MAIN CANVAS INTERVAL FUNCTION
function updateGameArea() {

    myGameArea.clear();

    var ctx = myGameArea.context;

    // playing area
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x, window.innerHeight/2-myGamePiece.y);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x+1024, window.innerHeight/2-myGamePiece.y);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x+2048, window.innerHeight/2-myGamePiece.y);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x, window.innerHeight/2-myGamePiece.y+1024);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x+1024, window.innerHeight/2-myGamePiece.y+1024);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x+2048, window.innerHeight/2-myGamePiece.y+1024);

    // upper part
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x-1024, window.innerHeight/2-myGamePiece.y-1024);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x, window.innerHeight/2-myGamePiece.y-1024);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x+1024, window.innerHeight/2-myGamePiece.y-1024);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x+2048, window.innerHeight/2-myGamePiece.y-1024);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x+3072, window.innerHeight/2-myGamePiece.y-1024);

    // lower part
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x-1024, window.innerHeight/2-myGamePiece.y+2048);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x, window.innerHeight/2-myGamePiece.y+2048);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x+1024, window.innerHeight/2-myGamePiece.y+2048);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x+2048, window.innerHeight/2-myGamePiece.y+2048);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x+3072, window.innerHeight/2-myGamePiece.y+2048);

    // left part
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x-1024, window.innerHeight/2-myGamePiece.y);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x-1024, window.innerHeight/2-myGamePiece.y+1024);

    // right part
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x+3072, window.innerHeight/2-myGamePiece.y);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x+3072, window.innerHeight/2-myGamePiece.y+1024);


    ctx.fillStyle = "red";
    ctx.globalAlpha = 0.5;
    ctx.fillRect(window.innerWidth/2-myGamePiece.x-5, window.innerHeight/2-myGamePiece.y, 3072+10, -5);
    ctx.fillRect(window.innerWidth/2-myGamePiece.x-5, window.innerHeight/2-myGamePiece.y+2048, 3072+10, 5);
    ctx.fillRect(window.innerWidth/2-myGamePiece.x, window.innerHeight/2-myGamePiece.y, -5, 2048);
    ctx.fillRect(window.innerWidth/2-myGamePiece.x+3072, window.innerHeight/2-myGamePiece.y, 5, 2048);
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

    // showing info
    // showing ai ships
    ai1.info();
    ai2.info();
    ai3.info();
    ai4.info();
    ai5.info();

    // showing other ships
    if(otherShips.length>0){
      for(var x=0; x<otherShips.length; x++){
          otherShips[x].info();
          if(otherShips[x].timer<=0){
            otherShips.splice(x,1);
          }
      }
    }

    // showing user ship
    myGamePiece.info();


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

    // show minimap

    if(showMinimap){
      ctx.globalAlpha = 0.2;
      ctx = myGameArea.context;
      ctx.fillStyle = "blue";
      ctx.fillRect(window.innerWidth/2 - 450 ,window.innerHeight/2 - 300, 900, 600);
      ctx.globalAlpha = 1;

      // showing ai position
      ctx.fillStyle = "silver";
      if(ai1.hp==0){
        ctx.fillStyle = "black";
      }
      ctx.fillRect(window.innerWidth/2 - 450 + (ai1.x/3072*900) -5,
      window.innerHeight/2 - 300 + (ai1.y/2048*600) -5,
      10, 10);
      ctx.fillStyle = "silver";
      if(ai2.hp==0){
        ctx.fillStyle = "black";
      }
      ctx.fillRect(window.innerWidth/2 - 450 + (ai2.x/3072*900) -5,
      window.innerHeight/2 - 300 + (ai2.y/2048*600) -5,
      10, 10);
      ctx.fillStyle = "silver";
      if(ai3.hp==0){
        ctx.fillStyle = "black";
      }
      ctx.fillRect(window.innerWidth/2 - 450 + (ai3.x/3072*900) -5,
      window.innerHeight/2 - 300 + (ai3.y/2048*600) -5,
      10, 10);
      ctx.fillStyle = "silver";
      if(ai4.hp==0){
        ctx.fillStyle = "black";
      }
      ctx.fillRect(window.innerWidth/2 - 450 + (ai4.x/3072*900) -5,
      window.innerHeight/2 - 300 + (ai4.y/2048*600) -5,
      10, 10);
      ctx.fillStyle = "silver";
      if(ai5.hp==0){
        ctx.fillStyle = "black";
      }
      ctx.fillRect(window.innerWidth/2 - 450 + (ai5.x/3072*900) -5,
      window.innerHeight/2 - 300 + (ai5.y/2048*600) -5,
      10, 10);

      // showing other ships position
      if(otherShips.length>0){
        for(var x=0; x<otherShips.length; x++){
          if(otherShips[x].hp==0){
            ctx.fillStyle = "black";
          }else{
            ctx.fillStyle = "red";
          }
          ctx.fillRect(window.innerWidth/2 - 450 + (otherShips[x].x/3072*900) -5,
          window.innerHeight/2 - 300 + (otherShips[x].y/2048*600) -5,
          10, 10);
        }
      }

      // showing player position
      if(myGamePiece.inGame){
        ctx.fillStyle = "orange";
      }else{
        ctx.fillStyle = "white";
      }

      if(myGamePiece.hp==0){
        ctx.fillStyle = "black";
      }

      ctx.fillRect(window.innerWidth/2 - 450 + (myGamePiece.x/3072*900) -5,
      window.innerHeight/2 - 300 + (myGamePiece.y/2048*600) -5,
       10, 10);

      // showing bullets
      if(balls.length>0){
        ctx.fillStyle = "black";
        for(var x=0; x<balls.length; x++){
          ctx.fillRect(window.innerWidth/2 - 450 + (balls[x].x/3072*900) -1,
          window.innerHeight/2 - 300 + (balls[x].y/2048*600) -1,
          2, 2);
        }
      }

    }


    // displaying info
    // player

    // other players

    // ai


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

      if(myGamePiece.lastHit.toString()=="ai3"&&myGamePiece.lastInfo==true){
        myGamePiece.lastInfo=false;
        var txt={"p":"","t":person+" has been killed by "+ai3.name, "c":1};
        socket.emit('chat', txt);
      }

      if(myGamePiece.lastHit.toString()=="ai4"&&myGamePiece.lastInfo==true){
        myGamePiece.lastInfo=false;
        var txt={"p":"","t":person+" has been killed by "+ai4.name, "c":1};
        socket.emit('chat', txt);
      }

      if(myGamePiece.lastHit.toString()=="ai5"&&myGamePiece.lastInfo==true){
        myGamePiece.lastInfo=false;
        var txt={"p":"","t":person+" has been killed by "+ai5.name, "c":1};
        socket.emit('chat', txt);
      }


      myGamePiece.hp=0;
      myGamePiece.deadTimer--;
      if(myGamePiece.deadTimer==0){
        // respawn
        var newPosX=Math.floor(Math.random()*3072+1)
        var newPosY=Math.floor(Math.random()*2048+1);
        myGamePiece = new myShip(newPosX, newPosY, person, tempId, 1);
      }
    }




}/////////////////////////////////////////////////// end of game update
