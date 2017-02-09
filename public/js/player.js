

function myShip( x, y, name, id, shipType) {

    this.id=id;
    this.name=name;
    this.inGame=false;
    this.alive=true;
    this.lastInfo=true;
    this.lastHit;
    this.deadTimer=250;

    this.speed = 0;
    this.acc = 0.05;

    this.angle = 0;
    this.moveAngle = 0;

    this.x = x;
    this.y = y;

    // upgrades
    // 50 = 1 second
    this.hp=100;
    this.hpLimit=this.hp;

    this.type=shipType;
    this.ballDamage=3;
    this.selfRepair=200;
    this.loadGap=150;
    this.fireGap=15;
    this.numCannons=10;

    // shooting
    this.leftAmmo=this.numCannons;
    this.rightAmmo=this.numCannons;
    this.timerR=0;
    this.timerS=0;
    this.shot;
    this.shootBoth=false; // selecting side
    this.leftLoad=this.loadGap;
    this.rightLoad=this.loadGap;
    this.scale=0.3;

    // wind
    this.windT=Math.random()*Math.PI*2;
    this.windSpeed=0.1;
    this.windTimer=0;
    this.windC=this.windT;


    // collision detection function
    this.ifCollide = function(element) {
    if(element.hp>0){
      // first square
      if(Math.abs(this.x-(element.x))<15
      && Math.abs(this.y-(element.y))<15
      ){
        if(this.hp<=1){
          this.lastHit=element.id;
        }
        this.hp--;
      }else
      if(Math.abs(this.x-(element.x-0+round((-30 * Math.sin(element.angle)), 0)))<15
      && Math.abs(this.y-(element.y-0+round((30 * Math.cos(element.angle)), 0)))<15
      ){
        if(this.hp<=1){
          this.lastHit=element.id;
        }
        this.hp--;
      }else
      if(Math.abs(this.x-(element.x-0+round((30 * Math.sin(element.angle)), 0)))<15
      && Math.abs(this.y-(element.y-0+round((-30 * Math.cos(element.angle)), 0)))<15
      ){
        if(this.hp<=1){
          this.lastHit=element.id;
        }
        this.hp--;
      }else

      // second square
      if(Math.abs((this.x-0+round((-30 * Math.sin(this.angle)), 0))-(element.x))<15
      && Math.abs((this.y-0+round((30 * Math.cos(this.angle)), 0))-(element.y))<15
      ){
        if(this.hp<=1){
          this.lastHit=element.id;
        }
        this.hp--;
      }else
      if(Math.abs((this.x-0+round((-30 * Math.sin(this.angle)), 0))
      -(element.x-0+round((-30 * Math.sin(element.angle)), 0)))<15
      && Math.abs((this.y-0+round((30 * Math.cos(this.angle)), 0))
      -(element.y-0+round((30 * Math.cos(element.angle)), 0)))<15
      ){
        if(this.hp<=1){
          this.lastHit=element.id;
        }
        this.hp--;
      }else
      if(Math.abs((this.x-0+round((-30 * Math.sin(this.angle)), 0))
      -(element.x-0+round((30 * Math.sin(element.angle)), 0)))<15
      && Math.abs((this.y-0+round((30 * Math.cos(this.angle)), 0))
      -(element.y-0+round((-30 * Math.cos(element.angle)), 0)))<15
      ){
        if(this.hp<=1){
          this.lastHit=element.id;
        }
        this.hp--;
      }else

      // third square
      if(Math.abs((this.x-0+round((30 * Math.sin(this.angle)), 0))-(element.x))<15
      && Math.abs((this.y-0+round((-30 * Math.cos(this.angle)), 0))-(element.y))<15
      ){
        if(this.hp<=1){
          this.lastHit=element.id;
        }
        this.hp--;
      }else
      if(Math.abs((this.x-0+round((30 * Math.sin(this.angle)), 0))
      -(element.x-0+round((-30 * Math.sin(element.angle)), 0)))<15
      && Math.abs((this.y-0+round((-30 * Math.cos(this.angle)), 0))
      -(element.y-0+round((30 * Math.cos(element.angle)), 0)))<15
      ){
        if(this.hp<=1){
          this.lastHit=element.id;
        }
        this.hp--;
      }else
      if(Math.abs((this.x-0+round((30 * Math.sin(this.angle)), 0))
      -(element.x-0+round((30 * Math.sin(element.angle)), 0)))<15
      && Math.abs((this.y-0+round((-30 * Math.cos(this.angle)), 0))
      -(element.y-0+round((-30 * Math.cos(element.angle)), 0)))<15
      ){
        if(this.hp<=1){
          this.lastHit=element.id;
        }
        this.hp--;
      }
    }
    }


    // main ship behaviour function
    this.update = function() {

        // checking if ship should be able to take part in action
        if(this.id!=100){
          this.inGame=true;
        }else{
          this.inGame=false;
        }

        // checking if ship is alive
        if(this.hp>0){
          this.alive=true;
        }else{
          this.alive=false;
        }

        // live ships collision detection
        if(this.inGame){

        if(otherShips.length>0){
          for(var z=0; z<otherShips.length; z++){
            this.ifCollide(otherShips[z]);
          }
        }

        // ai ships collision detection
        this.ifCollide(ai1);
        this.ifCollide(ai2);
        this.ifCollide(ai3);
        this.ifCollide(ai4);
        this.ifCollide(ai5);

        }

        if(this.hp<0){
          this.hp=0;
        }

        // wind reaction
        if(this.inGame){
          this.x -= this.windSpeed * Math.sin(this.windC);
          this.y += this.windSpeed * Math.cos(this.windC);

          // changing direction from time to time
          if(this.windTimer==100){
            this.windTimer=0;
            this.windT=Math.random()*Math.PI*2;
          }else{
            this.windTimer++;
          }
          if(Math.abs(this.windT-this.windC)>0.05){
            if(this.windT>this.windC){
              this.windC = this.windC + 1* Math.PI / 180;
            }
            if(this.windT<this.windC){
              this.windC = this.windC - 1* Math.PI / 180;
            }
          }
        }


        // shooting and sending data
        if(this.inGame&&this.alive){
        // if in game and alive

        // shooting both sides
        if(!writingMode && myGameArea.keys && myGameArea.keys[79] && this.timerS==0){

          if(this.shootBoth && this.rightAmmo>0){
            this.shootBoth=false;
            this.rightAmmo--;
            var shootingHole=Math.floor(Math.random()*5);
            if(shootingHole==0){
              this.shot={"x":round(this.x+(20 * Math.sin(this.angle))+ 12 * (Math.sin(this.angle+90 * Math.PI / 180)), 0),
              "y":round(this.y-(20 * Math.cos(this.angle))- 12 * (Math.cos(this.angle+90 * Math.PI / 180)), 0),
              "a":round(this.angle+( (Math.round(Math.random() * (20)) - 10  + 90) * Math.PI / 180), 4), "d":this.ballDamage};
            }else if(shootingHole==1){
              this.shot={"x":round(this.x+(12 * Math.sin(this.angle))+ 12 * (Math.sin(this.angle+90 * Math.PI / 180)), 0),
              "y":round(this.y-(12 * Math.cos(this.angle))- 12 * (Math.cos(this.angle+90 * Math.PI / 180)), 0),
              "a":round(this.angle+( (Math.round(Math.random() * (20)) - 10  + 90) * Math.PI / 180), 4), "d":this.ballDamage};
            }else if(shootingHole==2){
              this.shot={"x":round(this.x+(4 * Math.sin(this.angle))+ 12 * (Math.sin(this.angle+90 * Math.PI / 180)), 0),
              "y":round(this.y-(4 * Math.cos(this.angle))- 12 * (Math.cos(this.angle+90 * Math.PI / 180)), 0),
              "a":round(this.angle+( (Math.round(Math.random() * (20)) - 10  + 90) * Math.PI / 180), 4), "d":this.ballDamage};
            }else if(shootingHole==3){
              this.shot={"x":round(this.x+(-4 * Math.sin(this.angle))+ 12 * (Math.sin(this.angle+90 * Math.PI / 180)), 0),
              "y":round(this.y-(-4 * Math.cos(this.angle))- 12 * (Math.cos(this.angle+90 * Math.PI / 180)), 0),
              "a":round(this.angle+( (Math.round(Math.random() * (20)) - 10  + 90) * Math.PI / 180), 4), "d":this.ballDamage};
            }else if(shootingHole==4){
              this.shot={"x":round(this.x+(-12 * Math.sin(this.angle))+ 12 * (Math.sin(this.angle+90 * Math.PI / 180)), 0),
              "y":round(this.y-(-12 * Math.cos(this.angle))- 12 * (Math.cos(this.angle+90 * Math.PI / 180)), 0),
              "a":round(this.angle+( (Math.round(Math.random() * (20)) - 10  + 90) * Math.PI / 180), 4), "d":this.ballDamage};
            }

            this.timerS=this.fireGap;

            if(this.id==1){
              socket.emit('data1', this.shot);
            }
            if(this.id==2){
              socket.emit('data2', this.shot);
            }
            if(this.id==3){
              socket.emit('data3', this.shot);
            }
            if(this.id==4){
              socket.emit('data4', this.shot);
            }

          }else if(!this.shootBoth && this.leftAmmo>0){
            this.shootBoth=true;
            this.leftAmmo--;
            var shootingHole=Math.floor(Math.random()*5);
            if(shootingHole==0){
              this.shot={"x":round(this.x+(20 * Math.sin(this.angle))+ 12 * (Math.sin(this.angle-90 * Math.PI / 180)), 0),
              "y":round(this.y-(20 * Math.cos(this.angle))- 12 * (Math.cos(this.angle-90 * Math.PI / 180)), 0),
              "a":round(this.angle+( (Math.round(Math.random() * (20)) - 10  - 90) * Math.PI / 180), 4), "d":this.ballDamage};
            }else if(shootingHole==1){
              this.shot={"x":round(this.x+(12 * Math.sin(this.angle))+ 12 * (Math.sin(this.angle-90 * Math.PI / 180)), 0),
              "y":round(this.y-(12 * Math.cos(this.angle))- 12 * (Math.cos(this.angle-90 * Math.PI / 180)), 0),
              "a":round(this.angle+( (Math.round(Math.random() * (20)) - 10  - 90) * Math.PI / 180), 4), "d":this.ballDamage};
            }else if(shootingHole==2){
              this.shot={"x":round(this.x+(4 * Math.sin(this.angle))+ 12 * (Math.sin(this.angle-90 * Math.PI / 180)), 0),
              "y":round(this.y-(4 * Math.cos(this.angle))- 12 * (Math.cos(this.angle-90 * Math.PI / 180)), 0),
              "a":round(this.angle+( (Math.round(Math.random() * (20)) - 10  - 90) * Math.PI / 180), 4), "d":this.ballDamage};
            }else if(shootingHole==3){
              this.shot={"x":round(this.x+(-4 * Math.sin(this.angle))+ 12 * (Math.sin(this.angle-90 * Math.PI / 180)), 0),
              "y":round(this.y-(-4 * Math.cos(this.angle))- 12 * (Math.cos(this.angle-90 * Math.PI / 180)), 0),
              "a":round(this.angle+( (Math.round(Math.random() * (20)) - 10  - 90) * Math.PI / 180), 4), "d":this.ballDamage};
            }else if(shootingHole==4){
              this.shot={"x":round(this.x+(-12 * Math.sin(this.angle))+ 12 * (Math.sin(this.angle-90 * Math.PI / 180)), 0),
              "y":round(this.y-(-12 * Math.cos(this.angle))- 12 * (Math.cos(this.angle-90 * Math.PI / 180)), 0),
              "a":round(this.angle+( (Math.round(Math.random() * (20)) - 10  - 90) * Math.PI / 180), 4), "d":this.ballDamage};
            }

            this.timerS=this.fireGap;

            if(this.id==1){
              socket.emit('data1', this.shot);
            }
            if(this.id==2){
              socket.emit('data2', this.shot);
            }
            if(this.id==3){
              socket.emit('data3', this.shot);
            }
            if(this.id==4){
              socket.emit('data4', this.shot);
            }

          }

        }

        // shooting right side
        if(!writingMode && myGameArea.keys && myGameArea.keys[80] && this.timerS==0 && this.rightAmmo>0){
          this.rightAmmo--;
          var shootingHole=Math.floor(Math.random()*5);
          if(shootingHole==0){
            this.shot={"x":round(this.x+(20 * Math.sin(this.angle))+ 12 * (Math.sin(this.angle+90 * Math.PI / 180)), 0),
            "y":round(this.y-(20 * Math.cos(this.angle))- 12 * (Math.cos(this.angle+90 * Math.PI / 180)), 0),
            "a":round(this.angle+( (Math.round(Math.random() * (20)) - 10  + 90) * Math.PI / 180), 4), "d":this.ballDamage};
          }else if(shootingHole==1){
            this.shot={"x":round(this.x+(12 * Math.sin(this.angle))+ 12 * (Math.sin(this.angle+90 * Math.PI / 180)), 0),
            "y":round(this.y-(12 * Math.cos(this.angle))- 12 * (Math.cos(this.angle+90 * Math.PI / 180)), 0),
            "a":round(this.angle+( (Math.round(Math.random() * (20)) - 10  + 90) * Math.PI / 180), 4), "d":this.ballDamage};
          }else if(shootingHole==2){
            this.shot={"x":round(this.x+(4 * Math.sin(this.angle))+ 12 * (Math.sin(this.angle+90 * Math.PI / 180)), 0),
            "y":round(this.y-(4 * Math.cos(this.angle))- 12 * (Math.cos(this.angle+90 * Math.PI / 180)), 0),
            "a":round(this.angle+( (Math.round(Math.random() * (20)) - 10  + 90) * Math.PI / 180), 4), "d":this.ballDamage};
          }else if(shootingHole==3){
            this.shot={"x":round(this.x+(-4 * Math.sin(this.angle))+ 12 * (Math.sin(this.angle+90 * Math.PI / 180)), 0),
            "y":round(this.y-(-4 * Math.cos(this.angle))- 12 * (Math.cos(this.angle+90 * Math.PI / 180)), 0),
            "a":round(this.angle+( (Math.round(Math.random() * (20)) - 10  + 90) * Math.PI / 180), 4), "d":this.ballDamage};
          }else if(shootingHole==4){
            this.shot={"x":round(this.x+(-12 * Math.sin(this.angle))+ 12 * (Math.sin(this.angle+90 * Math.PI / 180)), 0),
            "y":round(this.y-(-12 * Math.cos(this.angle))- 12 * (Math.cos(this.angle+90 * Math.PI / 180)), 0),
            "a":round(this.angle+( (Math.round(Math.random() * (20)) - 10  + 90) * Math.PI / 180), 4), "d":this.ballDamage};
          }

          this.timerS=this.fireGap;

          if(this.id==1){
            socket.emit('data1', this.shot);
          }
          if(this.id==2){
            socket.emit('data2', this.shot);
          }
          if(this.id==3){
            socket.emit('data3', this.shot);
          }
          if(this.id==4){
            socket.emit('data4', this.shot);
          }
        }

        // shooting left side
        if(!writingMode && myGameArea.keys && myGameArea.keys[73] && this.timerS==0 && this.leftAmmo>0){
          this.leftAmmo--;
          var shootingHole=Math.floor(Math.random()*5);
          if(shootingHole==0){
            this.shot={"x":round(this.x+(20 * Math.sin(this.angle))+ 12 * (Math.sin(this.angle-90 * Math.PI / 180)), 0),
            "y":round(this.y-(20 * Math.cos(this.angle))- 12 * (Math.cos(this.angle-90 * Math.PI / 180)), 0),
            "a":round(this.angle+( (Math.round(Math.random() * (20)) - 10  - 90) * Math.PI / 180), 4), "d":this.ballDamage};
          }else if(shootingHole==1){
            this.shot={"x":round(this.x+(12 * Math.sin(this.angle))+ 12 * (Math.sin(this.angle-90 * Math.PI / 180)), 0),
            "y":round(this.y-(12 * Math.cos(this.angle))- 12 * (Math.cos(this.angle-90 * Math.PI / 180)), 0),
            "a":round(this.angle+( (Math.round(Math.random() * (20)) - 10  - 90) * Math.PI / 180), 4), "d":this.ballDamage};
          }else if(shootingHole==2){
            this.shot={"x":round(this.x+(4 * Math.sin(this.angle))+ 12 * (Math.sin(this.angle-90 * Math.PI / 180)), 0),
            "y":round(this.y-(4 * Math.cos(this.angle))- 12 * (Math.cos(this.angle-90 * Math.PI / 180)), 0),
            "a":round(this.angle+( (Math.round(Math.random() * (20)) - 10  - 90) * Math.PI / 180), 4), "d":this.ballDamage};
          }else if(shootingHole==3){
            this.shot={"x":round(this.x+(-4 * Math.sin(this.angle))+ 12 * (Math.sin(this.angle-90 * Math.PI / 180)), 0),
            "y":round(this.y-(-4 * Math.cos(this.angle))- 12 * (Math.cos(this.angle-90 * Math.PI / 180)), 0),
            "a":round(this.angle+( (Math.round(Math.random() * (20)) - 10  - 90) * Math.PI / 180), 4), "d":this.ballDamage};
          }else if(shootingHole==4){
            this.shot={"x":round(this.x+(-12 * Math.sin(this.angle))+ 12 * (Math.sin(this.angle-90 * Math.PI / 180)), 0),
            "y":round(this.y-(-12 * Math.cos(this.angle))- 12 * (Math.cos(this.angle-90 * Math.PI / 180)), 0),
            "a":round(this.angle+( (Math.round(Math.random() * (20)) - 10  - 90) * Math.PI / 180), 4), "d":this.ballDamage};
          }

          this.timerS=this.fireGap;

          if(this.id==1){
            socket.emit('data1', this.shot);
          }
          if(this.id==2){
            socket.emit('data2', this.shot);
          }
          if(this.id==3){
            socket.emit('data3', this.shot);
          }
          if(this.id==4){
            socket.emit('data4', this.shot);
          }
        }

        // self repair
        if(this.hp<this.hpLimit){
          this.timerR++;
          if(this.timerR==this.selfRepair){
            this.timerR=0;
            this.hp++;
          }
        }

        // loading guns
        if(this.leftAmmo<this.numCannons){
          this.leftLoad--;
          if(this.leftLoad==0){
            this.leftAmmo++;
            this.leftLoad=this.loadGap;
          }
        }

        if(this.rightAmmo<this.numCannons){
          this.rightLoad--;
          if(this.rightLoad==0){
            this.rightAmmo++;
            this.rightLoad=this.loadGap;
          }
        }

        // timer for shooting
        if(this.timerS>0){
          this.timerS--;
        }

      }// if in game and alive


      if(this.inGame&&this.alive){
        // if in game and alive
        //this.speed=0;
        this.moveAngle=0;

        // moving the ship
        if(!writingMode &&  myGameArea.keys && myGameArea.keys[87]){
          if(this.speed>-1){
            this.speed-=this.acc/2;
          }
        }

        if(!writingMode &&  myGameArea.keys && myGameArea.keys[83]){
          if(this.speed<0){
            this.speed+=this.acc;
          }
        }

        if(!writingMode &&  myGameArea.keys && myGameArea.keys[65] ){
          this.moveAngle=-1;
        }
        if(!writingMode &&  myGameArea.keys && myGameArea.keys[68] ){
          this.moveAngle=1;
        }

        if(this.speed>0){
          this.speed=0;
        }

      } // if in game and alive


        // moving as spectator
        if(this.id==100){
          if(myGameArea.keys && myGameArea.keys[87]){
            this.y-=3;
          }
          if(myGameArea.keys && myGameArea.keys[83]){
            this.y+=3;
          }
          if(myGameArea.keys && myGameArea.keys[65] ){
            this.x-=3;
          }
          if(myGameArea.keys && myGameArea.keys[68] ){
            this.x+=3;
          }
        }

        // map border detection
        if(this.x<0){
          this.x=0;
        }
        if(this.x>3072){
          this.x=3072;
        }
        if(this.y<0){
          this.y=0;
        }
        if(this.y>2048){
          this.y=2048;
        }

        if(this.inGame){

        // changing position
        this.angle += this.moveAngle * Math.PI / 180;
        this.x -= this.speed * Math.sin(this.angle);
        this.y += this.speed * Math.cos(this.angle);

        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(window.innerWidth/2, window.innerHeight/2);
        ctx.rotate(this.angle);

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

        //ctx.fillStyle = "red";
        //ctx.fillRect(30 / -2, 60 / -2, 30, 60);
        ctx.restore();

        ctx.font = "bold 18px Courier New";
        ctx.fillStyle = "white";
        ctx.fillText("HP:"+this.hp,window.innerWidth/2-30,window.innerHeight/2-90);
        ctx.fillText("Kills:"+kills,window.innerWidth/2-30,window.innerHeight/2-120);
        ctx.fillText(this.name,window.innerWidth/2-30,window.innerHeight/2-150);
        // hide in game
        ctx.fillText("ID:"+this.id,window.innerWidth/2-30,window.innerHeight/2-180);
        ctx.fillText("Type:"+this.type,window.innerWidth/2-30,window.innerHeight/2-210);

        ctx.font = "bold 15px Courier New";

        ctx.save();
        ctx.translate(window.innerWidth/2,window.innerHeight/2);
        ctx.rotate(this.angle);

        ctx.save();
        ctx.translate(-60,0);
        ctx.rotate(-this.angle);
        ctx.fillText("I"+this.leftAmmo,0,0);
        ctx.restore();

        ctx.save();
        ctx.translate(60,0);
        ctx.rotate(-this.angle);
        ctx.fillText("P"+this.rightAmmo,0,0);
        ctx.restore();

        ctx.restore();

        }

        if(infoTime>0){
          infoTime--;
        }

        if(infoTime>0){

        if(!this.inGame){
          var info = "Waiting to enter the game";

          if(person.toString().toLowerCase()=="spectator"){
            var info = "You are spectator";
          }

          if(this.id==100){
            ctx = myGameArea.context;
            ctx.font = "bold 30px Courier New";
            ctx.fillStyle = "red";
            ctx.fillText(info,window.innerWidth/2-150,window.innerHeight/2+100);
          }
        }

        ctx = myGameArea.context;
        ctx.font = "bold 30px Courier New";
        ctx.fillStyle = "red";
        ctx.fillText("Press H for manual",window.innerWidth/2-150,window.innerHeight/2+150);

        }

        // chat text message
        if(writingMode){
          ctx = myGameArea.context;
          ctx.font = "bold 15px Courier New";
          ctx.fillStyle = "white";
          ctx.fillText(textReady,20,window.innerHeight-20);
        }

        // show info about game
        if(showInfo){
          ctx = myGameArea.context;
          ctx.font = "20px Courier New";
          ctx.fillStyle = "white";
          ctx.fillText("GAME MANUAL:",window.innerWidth/2 + 100,100);
          ctx.fillText("moving : W,A,S,D",window.innerWidth/2 + 100,130);
          ctx.fillText("shooting :",window.innerWidth/2 + 100,160);
          ctx.fillText("I-left P-right O-both sides",window.innerWidth/2 + 100,190);
          ctx.fillText("use ENTER to chat",window.innerWidth/2 + 100,220);

          ctx.fillText("Destroy other ships",window.innerWidth/2 + 100,280);
          ctx.fillText("to earn points",window.innerWidth/2 + 100,310);
        }


        ctx = myGameArea.context;
        ctx.font = "20px Courier New";
        ctx.fillStyle = "white";
        ctx.fillText("PLAYERS:"+livePlayers,window.innerWidth - 150,40);

    }
}
