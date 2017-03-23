
function otherShip(x, y, a, id, name, hp, shipType) {

    this.id=id;
    this.name=name;
    this.hp=hp;
    this.deadTimer=250;
    this.kills=0;
    this.type=shipType;
    this.speed=1;
    this.angle = a;
    this.moveAngle = 0;
    this.level=1;
    this.alive=true;

    this.x = x;
    this.y = y;
    this.targetX=x;
    this.targetY=y;

    this.scale=0.3;

    // time before object will be removed
    this.timer=150;


    this.update = function(newX, newY, newA, newHp, newK, newN, newT) {

      this.targetX = newX;
      this.targetY = newY;
      this.targetA = newA;
      this.hp=newHp;
      this.level=newK;
      this.name=newN;
      this.type=newT;

      // if the ship is far away from its target move it directly
      if(Math.abs(newX-this.x)>30||Math.abs(newY-this.y)>30){
        this.x = newX;
        this.y = newY;
      }

      // if ship angle is very different to target angle for more then 0.5 radian change it directly
      if(Math.abs(newA-this.angle)>0.5){
        this.angle = newA;
      }
        this.timer=150;
    }


    this.show = function() {

      // moving the ship
      if(this.targetX>this.x){
        this.x+=this.speed;
      }
      if(this.targetX<this.x){
        this.x-=this.speed;
      }
      if(this.targetY>this.y){
        this.y+=this.speed;
      }
      if(this.targetY<this.y){
        this.y-=this.speed;
      }


      if(this.targetA>this.angle){
        this.moveAngle=1;
      }
      if(this.targetA<this.angle){
        this.moveAngle=-1;
      }
      if(Math.abs(this.targetA-this.angle)<0.05){
        this.moveAngle=0;
      }

      this.angle += this.moveAngle * Math.PI / 180;

      // checking hits
      // checking 3 squares
      if(balls.length>0){
          if(this.hp>0){
          for(var x=0; x<balls.length; x++){
            if(Math.abs(balls[x].x-(this.x))<15
            && Math.abs(balls[x].y-(this.y))<15
            &&balls[x].id!=this.id){
              hits.push(new hit(balls[x].x, balls[x].y, balls[x].a));
              balls.splice(x,1);
            }else
            if(Math.abs(balls[x].x-(this.x-0+round((-30 * Math.sin(this.angle)), 0)))<15
            && Math.abs(balls[x].y-(this.y-0+round((30 * Math.cos(this.angle)), 0)))<15
            &&balls[x].id!=this.id){
              hits.push(new hit(balls[x].x, balls[x].y, balls[x].a));
              balls.splice(x,1);
            }else
            if(Math.abs(balls[x].x-(this.x-0+round((30 * Math.sin(this.angle)), 0)))<15
            && Math.abs(balls[x].y-(this.y-0+round((-30 * Math.cos(this.angle)), 0)))<15
            &&balls[x].id!=this.id){
              hits.push(new hit(balls[x].x, balls[x].y, balls[x].a));
              balls.splice(x,1);
            }
          }
          }
      }

      // sound of sinking
        // if ship died and effects sound is on
        if(this.alive&&this.hp==0&&soundState!=2){
          this.alive=false;
          var sd1=new Audio('sounds/sd1.wav');
          var sd2=new Audio('sounds/sd2.wav');
          var sd3=new Audio('sounds/sd3.wav');
          var sd4=new Audio('sounds/sd4.wav');
          var pickDeathSound=Math.floor(Math.random()*4);
        // checking if ship is on player screen
        if( Math.abs(this.x-myGamePiece.x)<window.innerWidth/2 &&
        Math.abs(this.y-myGamePiece.y)<window.innerHeight/2 ){
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
      }


      // drawing
      ctx = myGameArea.context;
      ctx.save();
      ctx.translate(window.innerWidth/2-myGamePiece.x+this.x,window.innerHeight/2-myGamePiece.y+this.y);
      ctx.rotate(this.angle);

      if(this.hp>0){
        this.deadTimer=250;
        this.alive=true;
      }

      if(this.hp==0&&this.deadTimer>0){
        this.deadTimer--;
      }

      // drawing the ship image
      if(this.hp>80){
        ctx.drawImage(ship1a, -100*this.scale, -250*this.scale -13 , 200*this.scale, 500*this.scale);
      }else if(this.hp>60){
        ctx.drawImage(ship1b, -100*this.scale, -250*this.scale -13 , 200*this.scale, 500*this.scale);
      }else if(this.hp>40){
        ctx.drawImage(ship1c, -100*this.scale, -250*this.scale -13 , 200*this.scale, 500*this.scale);
      }else if(this.hp>20){
        ctx.drawImage(ship1d, -100*this.scale, -250*this.scale -13 , 200*this.scale, 500*this.scale);
      }else if(this.hp>0){
        ctx.drawImage(ship1e, -100*this.scale, -250*this.scale -13 , 200*this.scale, 500*this.scale);
      }else{
        ctx.globalAlpha = this.deadTimer/250;
        ctx.drawImage(ship1e, -100*this.scale, -250*this.scale -13 , 200*this.scale, 500*this.scale);
      }

      //ctx.fillStyle = "blue";
      //ctx.fillRect(30 / -2, 60 / -2, 30, 60);
      ctx.restore();


      // drawing the target
      /*
      ctx.save();
      ctx.translate(window.innerWidth/2-myGamePiece.x+this.targetX,window.innerHeight/2-myGamePiece.y+this.targetY);
      ctx.fillStyle = "red";
      ctx.fillRect(10 / -2, 10 / -2, 10, 10);
      ctx.restore();
      */
    }

    this.info = function() {

      ctx.font = "bold 18px Courier New";
      ctx.fillStyle = "white";
      ctx.fillText("HP:"+this.hp,window.innerWidth/2-myGamePiece.x+this.x-30,window.innerHeight/2-myGamePiece.y+this.y-50);
      ctx.fillText("Level:"+this.level,window.innerWidth/2-myGamePiece.x+this.x-30,window.innerHeight/2-myGamePiece.y+this.y-80);
      ctx.fillText(this.name,window.innerWidth/2-myGamePiece.x+this.x-30,window.innerHeight/2-myGamePiece.y+this.y-110);
      // hide in game
      //ctx.fillText("ID:"+this.id,window.innerWidth/2-myGamePiece.x+this.x-30,window.innerHeight/2-myGamePiece.y+this.y-140);
      //ctx.fillText("Type:"+this.type,window.innerWidth/2-myGamePiece.x+this.x-30,window.innerHeight/2-myGamePiece.y+this.y-170);

      this.timer--;

    }
}


function ball( x, y, a, id, d) {

    this.id=id;
    this.speed = 8;
    //this.speed = 0;
    this.angle = a;
    this.timer=40;
    this.x = x;
    this.y = y;
    this.damage=d;

    this.shot1 = new Audio('sounds/shot1.mp3');
    this.shot2 = new Audio('sounds/shot2.mp3');
    this.shot3 = new Audio('sounds/shot3.mp3');

    this.pickShot=Math.floor(Math.random()*3);
    this.playSound=true;

    //checking if shot is on the screen
    if( Math.abs(this.x-myGamePiece.x)<window.innerWidth/2 &&
     Math.abs(this.y-myGamePiece.y)<window.innerHeight/2 ){

    if(this.playSound&&soundState!=2){
      if(this.pickShot==0){
        this.shot1.play();
      }else if(this.pickShot==1){
        this.shot2.play();
      }else if(this.pickShot==2){
        this.shot3.play();
      }
      this.playSound=false;
    }

    }

    this.show = function() {

      this.x += this.speed * Math.sin(this.angle);
      this.y -= this.speed * Math.cos(this.angle);

      ctx = myGameArea.context;
      ctx.save();
      ctx.translate(window.innerWidth/2-myGamePiece.x+this.x,window.innerHeight/2-myGamePiece.y+this.y);
      ctx.rotate(this.angle);
      ctx.beginPath();

      ctx.fillStyle = "black";
      //ctx.fillStyle = "red";

      ctx.arc(0, 0, 2, 0, 2*Math.PI);
      ctx.closePath();
      ctx.fill();
      ctx.restore();


      this.timer--;

    }
}


function exp( x, y, a) {

    this.angle = a;
    this.x = x;
    this.y = y;
    this.delayTime=0;
    this.exLoop=1;
    this.scale=0.6;

    this.show = function() {

      ctx = myGameArea.context;
      ctx.save();
      ctx.translate(window.innerWidth/2-myGamePiece.x+this.x,window.innerHeight/2-myGamePiece.y+this.y);
      ctx.rotate(this.angle);
      this.delayTime++;
      if(this.exLoop<65){
        ctx.drawImage(document.getElementById("ex"+this.exLoop), -64*this.scale+37*this.scale, -128*this.scale+9*this.scale,
        128*this.scale/2, 128*this.scale);
        if(this.delayTime==1){
          this.exLoop+=2;
          this.delayTime=0;
        }
      }
      ctx.restore();


      this.timer--;

    }
}


function hit( x, y, a) {

    this.angle = a;
    this.x = x;
    this.y = y;
    this.delayTime=0;
    this.exLoop=1;
    this.scale=0.1;

    this.show = function() {

      ctx = myGameArea.context;
      ctx.save();
      ctx.translate(window.innerWidth/2-myGamePiece.x+this.x,window.innerHeight/2-myGamePiece.y+this.y);
      ctx.rotate(this.angle);
      this.delayTime++;
      if(this.exLoop<49){
        ctx.drawImage(document.getElementById("hit"+this.exLoop), -128*this.scale, -128*this.scale,
        256*this.scale, 256*this.scale);
        if(this.delayTime==1){
          this.exLoop+=2;
          this.delayTime=0;
        }
      }
      ctx.restore();


      this.timer--;

    }
}


function textMsg(x, y, p, t, c) {

    this.x = x;
    this.y = y;
    this.player=p;
    this.text=t;
    this.color=c;

    this.timer=500;

    this.show = function() {

      ctx = myGameArea.context;

      if(this.color==1){
        ctx.fillStyle = "white";
        ctx.font = "bold 15px Courier New";
        ctx.fillText("<<< "+this.player+this.text+" >>>",this.x,this.y);
      }
      if(this.color==0){
        ctx.fillStyle = "white";
        ctx.font = "15px Courier New";
        ctx.fillText(this.player+":"+this.text,this.x,this.y);
      }

      this.timer--;
    }
}


function aiShip(x, y, a, newHp, newId) {

    this.name=null;
    this.id=newId;
    this.angle = a;
    this.targetA=this.angle;
    this.hp=newHp;
    this.scale=0.3;
    this.x = x;
    this.y = y;
    this.targetX=x;
    this.targetY=y;
    this.desX=0;
    this.desY=0;
    this.speed=1;
    this.timer=50;
    this.deadTimer=250;
    this.alive=true;

    this.update = function(newName, newX, newY, newA, d1, d2, newHp) {

      this.name=newName;
      this.desX=d1;
      this.desY=d2;
      this.hp=newHp;
      this.targetX = newX;
      this.targetY = newY;
      this.targetA = newA;

      // if the ship is far away from its target move it directly
      if(Math.abs(newX-this.x)>30||Math.abs(newY-this.y)>30){
        this.x = newX;
        this.y = newY;
      }

      // if ship angle is very different to target angle for more then 0.5 radian change it directly
      if(Math.abs(newA-this.angle)>0.5){
        this.angle = newA;
      }

      this.timer=50;
    }

    this.show = function(x, y) {

      // moving the ship
      if(this.targetX>this.x){
        this.x+=this.speed;
      }
      if(this.targetX<this.x){
        this.x-=this.speed;
      }
      if(this.targetY>this.y){
        this.y+=this.speed;
      }
      if(this.targetY<this.y){
        this.y-=this.speed;
      }

      // changing the angle
      if(Math.abs(this.targetA-this.angle)>0.05){
        if(this.targetA>this.angle){
          this.angle+=1 * Math.PI / 180;
        }
        if(this.targetA<this.angle){
          this.angle-=1 * Math.PI / 180;
        }
      }

      // sound of sinking
        // if ship died and effects sound is on
        if(this.alive&&this.hp==0&&soundState!=2){
          this.alive=false;
          var sd1=new Audio('sounds/sd1.wav');
          var sd2=new Audio('sounds/sd2.wav');
          var sd3=new Audio('sounds/sd3.wav');
          var sd4=new Audio('sounds/sd4.wav');
          var pickDeathSound=Math.floor(Math.random()*4);
        // checking if ship is on player screen
        if( Math.abs(this.x-myGamePiece.x)<window.innerWidth/2 &&
        Math.abs(this.y-myGamePiece.y)<window.innerHeight/2 ){
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
      }

      if(this.hp>0){
        this.deadTimer=250;
        this.alive=true;
      }

      if(this.hp==0&&this.deadTimer>0){
        this.deadTimer--;
      }

      // checking if ship was hit
      if(balls.length>0){
          if(this.hp>0){
          for(var x=0; x<balls.length; x++){
            if(balls[x].id!=this.id){
            if(Math.abs(balls[x].x-(this.x))<15
            && Math.abs(balls[x].y-(this.y))<15
            &&balls[x].id!=this.id){
              hits.push(new hit(balls[x].x, balls[x].y, balls[x].a));
              balls.splice(x,1);
            }else
            if(Math.abs(balls[x].x-(this.x-0+round((-30 * Math.sin(this.angle)), 0)))<15
            && Math.abs(balls[x].y-(this.y-0+round((30 * Math.cos(this.angle)), 0)))<15
            &&balls[x].id!=this.id){
              hits.push(new hit(balls[x].x, balls[x].y, balls[x].a));
              balls.splice(x,1);
            }else
            if(Math.abs(balls[x].x-(this.x-0+round((30 * Math.sin(this.angle)), 0)))<15
            && Math.abs(balls[x].y-(this.y-0+round((-30 * Math.cos(this.angle)), 0)))<15
            &&balls[x].id!=this.id){
              hits.push(new hit(balls[x].x, balls[x].y, balls[x].a));
              balls.splice(x,1);
            }
            }
          }
          }
      }


      ctx = myGameArea.context;
      ctx.save();
      ctx.translate(window.innerWidth/2-myGamePiece.x+this.x,window.innerHeight/2-myGamePiece.y+this.y);
      ctx.rotate(this.angle);
      //ctx.fillStyle = "red";
      //ctx.fillRect(30 / -2, 60 / -2, 30, 60);

      // drawing the ship image
      if(this.hp>80){
        ctx.drawImage(ship2a, -100*this.scale, -250*this.scale -13 , 200*this.scale, 500*this.scale);
      }else if(this.hp>60){
        ctx.drawImage(ship2b, -100*this.scale, -250*this.scale -13 , 200*this.scale, 500*this.scale);
      }else if(this.hp>40){
        ctx.drawImage(ship2c, -100*this.scale, -250*this.scale -13 , 200*this.scale, 500*this.scale);
      }else if(this.hp>20){
        ctx.drawImage(ship2d, -100*this.scale, -250*this.scale -13 , 200*this.scale, 500*this.scale);
      }else if(this.hp>0){
        ctx.drawImage(ship2e, -100*this.scale, -250*this.scale -13 , 200*this.scale, 500*this.scale);
      }else{
        ctx.globalAlpha = this.deadTimer/250;
        ctx.drawImage(ship2e, -100*this.scale, -250*this.scale -13 , 200*this.scale, 500*this.scale);
      }

      ctx.restore();

    }

    this.info = function() {
      /*
      ctx = myGameArea.context;
      ctx.save();
      ctx.translate(window.innerWidth/2-myGamePiece.x+this.desX,window.innerHeight/2-myGamePiece.y+this.desY);
      ctx.fillStyle = "green";
      ctx.fillRect(30 / -2, 30 / -2, 30, 30);
      ctx.restore();
      */
      ctx.font = "bold 18px Courier New";
      ctx.fillStyle = "white";
      ctx.fillText("HP:"+this.hp,window.innerWidth/2-myGamePiece.x+this.x-30,window.innerHeight/2-myGamePiece.y+this.y-50);
      ctx.fillText(this.name,window.innerWidth/2-myGamePiece.x+this.x-30,window.innerHeight/2-myGamePiece.y+this.y-80);


      this.timer--;
    }
}
