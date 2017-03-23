///////////////////////////////////// MAIN CANVAS INTERVAL FUNCTION
function updateGameArea() {

  setTimeout(function () {
    // do nothing
  }, 0)


  // changing voice control
  if(!voiceControl){
    shipForward = false;
    shipLeft = false;
    shipRight = false;
    shootingOrder=false;
    follow=false;
    sName=null;
    aimLeft=false;
    aimRight=false;
  }

    CookieJS.set({name:'totalKills',value:kills,expires: 30});

    if(soundState==0){
      b.play();
    }else{
      b.load();
    }


    myGameArea.clear();

    var ctx = myGameArea.context;

    // playing area
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x, window.innerHeight/2-myGamePiece.y);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x+1024, window.innerHeight/2-myGamePiece.y);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x+2048, window.innerHeight/2-myGamePiece.y);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x, window.innerHeight/2-myGamePiece.y+1024);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x+1024, window.innerHeight/2-myGamePiece.y+1024);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x+2048, window.innerHeight/2-myGamePiece.y+1024);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x, window.innerHeight/2-myGamePiece.y+2048);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x+1024, window.innerHeight/2-myGamePiece.y+2048);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x+2048, window.innerHeight/2-myGamePiece.y+2048);

    // upper part
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x-1024, window.innerHeight/2-myGamePiece.y-1024);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x, window.innerHeight/2-myGamePiece.y-1024);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x+1024, window.innerHeight/2-myGamePiece.y-1024);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x+2048, window.innerHeight/2-myGamePiece.y-1024);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x+3072, window.innerHeight/2-myGamePiece.y-1024);

    // lower part
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x-1024, window.innerHeight/2-myGamePiece.y+3072);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x, window.innerHeight/2-myGamePiece.y+3072);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x+1024, window.innerHeight/2-myGamePiece.y+3072);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x+2048, window.innerHeight/2-myGamePiece.y+3072);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x+3072, window.innerHeight/2-myGamePiece.y+3072);

    // left part
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x-1024, window.innerHeight/2-myGamePiece.y);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x-1024, window.innerHeight/2-myGamePiece.y+1024);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x-1024, window.innerHeight/2-myGamePiece.y+2048);

    // right part
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x+3072, window.innerHeight/2-myGamePiece.y);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x+3072, window.innerHeight/2-myGamePiece.y+1024);
    ctx.drawImage(water, window.innerWidth/2-myGamePiece.x+3072, window.innerHeight/2-myGamePiece.y+2048);

    ctx.fillStyle = "red";
    ctx.globalAlpha = 0.5;
    ctx.fillRect(window.innerWidth/2-myGamePiece.x-5, window.innerHeight/2-myGamePiece.y, 3072+10, -5);
    ctx.fillRect(window.innerWidth/2-myGamePiece.x-5, window.innerHeight/2-myGamePiece.y+3072, 3072+10, 5);
    ctx.fillRect(window.innerWidth/2-myGamePiece.x, window.innerHeight/2-myGamePiece.y, -5, 3072);
    ctx.fillRect(window.innerWidth/2-myGamePiece.x+3072, window.innerHeight/2-myGamePiece.y, 5, 3072);
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
          if(textMsgArr[x].timer<=0){
            textMsgArr.splice(x,1);
          }
      }
    }

    // show minimap

    if(showMinimap){
      //ctx.globalAlpha = 0.2;
      ctx = myGameArea.context;
      ctx.fillStyle = "black";
      ctx.fillRect(window.innerWidth/2 - 300-2 ,window.innerHeight/2 - 300-2, 604, 604);
      ctx.fillStyle = "SlateGray";
      ctx.fillRect(window.innerWidth/2 - 300 ,window.innerHeight/2 - 300, 600, 600);
      //ctx.globalAlpha = 1;

      // showing ai position
      ctx.fillStyle = "red";
      if(ai1.hp==0){
        ctx.fillStyle = "black";
      }
      ctx.fillRect(window.innerWidth/2 - 300 + (ai1.x/3072*600) -5,
      window.innerHeight/2 - 300 + (ai1.y/3072*600) -5,
      10, 10);

      ctx.fillStyle = "red";
      if(ai2.hp==0){
        ctx.fillStyle = "black";
      }
      ctx.fillRect(window.innerWidth/2 - 300 + (ai2.x/3072*600) -5,
      window.innerHeight/2 - 300 + (ai2.y/3072*600) -5,
      10, 10);

      ctx.fillStyle = "red";
      if(ai3.hp==0){
        ctx.fillStyle = "black";
      }
      ctx.fillRect(window.innerWidth/2 - 300 + (ai3.x/3072*600) -5,
      window.innerHeight/2 - 300 + (ai3.y/3072*600) -5,
      10, 10);

      ctx.fillStyle = "red";
      if(ai4.hp==0){
        ctx.fillStyle = "black";
      }
      ctx.fillRect(window.innerWidth/2 - 300 + (ai4.x/3072*600) -5,
      window.innerHeight/2 - 300 + (ai4.y/3072*600) -5,
      10, 10);

      ctx.fillStyle = "red";
      if(ai5.hp==0){
        ctx.fillStyle = "black";
      }
      ctx.fillRect(window.innerWidth/2 - 300 + (ai5.x/3072*600) -5,
      window.innerHeight/2 - 300 + (ai5.y/3072*600) -5,
      10, 10);

      // showing other ships position
      if(otherShips.length>0){
        for(var x=0; x<otherShips.length; x++){
          if(otherShips[x].hp==0){
            ctx.fillStyle = "black";
          }else{
            ctx.fillStyle = "orange";
          }
          ctx.fillRect(window.innerWidth/2 - 300 + (otherShips[x].x/3072*600) -5,
          window.innerHeight/2 - 300 + (otherShips[x].y/3072*600) -5,
          10, 10);
        }
      }

      // showing player position
      if(myGamePiece.inGame){
        ctx.fillStyle = "lime";
      }else{
        ctx.fillStyle = "white";
      }

      if(myGamePiece.hp==0){
        ctx.fillStyle = "black";
      }

      ctx.fillRect(window.innerWidth/2 - 300 + (myGamePiece.x/3072*600) -5,
      window.innerHeight/2 - 300 + (myGamePiece.y/3072*600) -5,
       10, 10);




      // displaying names on minimap
      ctx.font = "bold 12px Courier New";
      ctx.fillStyle = "white";

      // ai
      ctx.fillText(ai1.name,
        window.innerWidth/2 - 300 + (ai1.x/3072*600) -5,
        window.innerHeight/2 - 300 + (ai1.y/3072*600) -5-5);
      ctx.fillText(ai2.name,
        window.innerWidth/2 - 300 + (ai2.x/3072*600) -5,
        window.innerHeight/2 - 300 + (ai2.y/3072*600) -5-5);
      ctx.fillText(ai3.name,
        window.innerWidth/2 - 300 + (ai3.x/3072*600) -5,
        window.innerHeight/2 - 300 + (ai3.y/3072*600) -5-5);
      ctx.fillText(ai4.name,
        window.innerWidth/2 - 300 + (ai4.x/3072*600) -5,
        window.innerHeight/2 - 300 + (ai4.y/3072*600) -5-5);
      ctx.fillText(ai5.name,
        window.innerWidth/2 - 300 + (ai5.x/3072*600) -5,
        window.innerHeight/2 - 300 + (ai5.y/3072*600) -5-5);

      // other players
      if(otherShips.length>0){
        for(var x=0; x<otherShips.length; x++){
          ctx.fillText(otherShips[x].name,
            window.innerWidth/2 - 300 + (otherShips[x].x/3072*600) -5,
            window.innerHeight/2 - 300 + (otherShips[x].y/3072*600) -5-5);
          }
        }

      // player
      ctx.fillText(myGamePiece.name,
        window.innerWidth/2 - 300 + (myGamePiece.x/3072*600) -5,
        window.innerHeight/2 - 300 + (myGamePiece.y/3072*600) -5-5);


      // showing bullets
      if(balls.length>0){
        ctx.fillStyle = "black";
        for(var x=0; x<balls.length; x++){
          ctx.fillRect(window.innerWidth/2 - 300 + (balls[x].x/3072*600) -1,
          window.innerHeight/2 - 300 + (balls[x].y/3072*600) -1,
          2, 2);
        }
      }

    }else{ // showing small minimap

      ctx = myGameArea.context;
      ctx.fillStyle = "black";
      ctx.fillRect(window.innerWidth - 160-1 ,window.innerHeight - 160-1, 152, 152);
      ctx.fillStyle = "SlateGray";
      ctx.fillRect(window.innerWidth - 160 ,window.innerHeight - 160, 150, 150);

      // showing ai position
      ctx.fillStyle = "red";
      if(ai1.hp==0){
        ctx.fillStyle = "black";
      }
      ctx.fillRect(window.innerWidth - 160 + (ai1.x/3072*150) -3,
      window.innerHeight - 160 + (ai1.y/3072*150) -3,
      6, 6);

      ctx.fillStyle = "red";
      if(ai2.hp==0){
        ctx.fillStyle = "black";
      }
      ctx.fillRect(window.innerWidth - 160 + (ai2.x/3072*150) -3,
      window.innerHeight - 160 + (ai2.y/3072*150) -3,
      6, 6);

      ctx.fillStyle = "red";
      if(ai3.hp==0){
        ctx.fillStyle = "black";
      }
      ctx.fillRect(window.innerWidth - 160 + (ai3.x/3072*150) -3,
      window.innerHeight - 160 + (ai3.y/3072*150) -3,
      6, 6);

      ctx.fillStyle = "red";
      if(ai4.hp==0){
        ctx.fillStyle = "black";
      }
      ctx.fillRect(window.innerWidth - 160 + (ai4.x/3072*150) -3,
      window.innerHeight - 160 + (ai4.y/3072*150) -3,
      6, 6);

      ctx.fillStyle = "red";
      if(ai5.hp==0){
        ctx.fillStyle = "black";
      }
      ctx.fillRect(window.innerWidth - 160 + (ai5.x/3072*150) -3,
      window.innerHeight - 160 + (ai5.y/3072*150) -3,
      6, 6);

      // showing other ships position
      if(otherShips.length>0){
        for(var x=0; x<otherShips.length; x++){
          if(otherShips[x].hp==0){
            ctx.fillStyle = "black";
          }else{
            ctx.fillStyle = "orange";
          }
          ctx.fillRect(window.innerWidth - 160 + (otherShips[x].x/3072*150) -3,
          window.innerHeight - 160 + (otherShips[x].y/3072*150) -3,
          6, 6);
        }
      }

      // showing player position
      if(myGamePiece.inGame){
        ctx.fillStyle = "lime";
      }else{
        ctx.fillStyle = "white";
      }

      if(myGamePiece.hp==0){
        ctx.fillStyle = "black";
      }

      ctx.fillRect(window.innerWidth - 160 + (myGamePiece.x/3072*150) -3,
      window.innerHeight - 160 + (myGamePiece.y/3072*150) -3,
       6, 6);

       // showing bullets
       if(balls.length>0){
         ctx.fillStyle = "black";
         for(var x=0; x<balls.length; x++){
           ctx.fillRect(window.innerWidth - 160 + (balls[x].x/3072*150) ,
           window.innerHeight - 160 + (balls[x].y/3072*150) ,
            1, 1);
         }
       }
    }

    // displaying manual as priority
    myGamePiece.manual();


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


    // checking if player died
    if(myGamePiece.hp<=0){

      // last sound
      if(myGamePiece.lastInfo){
        var pickDeathSound=Math.floor(Math.random()*4);
      }

      if(soundState!=2){
        if(pickDeathSound==0){
          sd1.play();
        }else if(pickDeathSound==1){
          sd2.play();
        }else if(pickDeathSound==2){
          sd3.play();
        }else if(pickDeathSound==3){
          sd4.play();
        }
      }

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
        var newPosY=Math.floor(Math.random()*3072+1);
        myGamePiece = new myShip(newPosX, newPosY, person, tempId, 1);
      }
    }


}/////////////////////////////////////////////////// end of game update
