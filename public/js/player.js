

function myShip( x, y, name, id) {

    this.id=id;
    this.name=name;
    this.inGame=false;
    this.alive=true;
    this.lastInfo=true;
    this.lastInfoText=true;
    this.lastHit;
    this.deadTimer=250;

    this.speed = 0;
    this.acc = 0.05;

    this.angle = 0;
    this.moveAngle = 0;

    this.x = x;
    this.y = y;

    // upgrades
    this.hp=100;
    this.hpLimit=this.hp;

    this.selfRepair=400;
    this.loadGap=150;
    this.fireGap=15;
    this.leftAmmo=10;
    this.rightAmmo=10;

    // shooting
    this.timerR=0;
    this.timerS=0;
    this.shot;
    this.shootBoth=false; // selecting side
    this.leftLoad=this.loadGap;
    this.rightLoad=this.loadGap;
    this.scale=0.3;


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
              "a":round(this.angle+( (Math.round(Math.random() * (20)) - 10  + 90) * Math.PI / 180), 4)};
            }else if(shootingHole==1){
              this.shot={"x":round(this.x+(12 * Math.sin(this.angle))+ 12 * (Math.sin(this.angle+90 * Math.PI / 180)), 0),
              "y":round(this.y-(12 * Math.cos(this.angle))- 12 * (Math.cos(this.angle+90 * Math.PI / 180)), 0),
              "a":round(this.angle+( (Math.round(Math.random() * (20)) - 10  + 90) * Math.PI / 180), 4)};
            }else if(shootingHole==2){
              this.shot={"x":round(this.x+(4 * Math.sin(this.angle))+ 12 * (Math.sin(this.angle+90 * Math.PI / 180)), 0),
              "y":round(this.y-(4 * Math.cos(this.angle))- 12 * (Math.cos(this.angle+90 * Math.PI / 180)), 0),
              "a":round(this.angle+( (Math.round(Math.random() * (20)) - 10  + 90) * Math.PI / 180), 4)};
            }else if(shootingHole==3){
              this.shot={"x":round(this.x+(-4 * Math.sin(this.angle))+ 12 * (Math.sin(this.angle+90 * Math.PI / 180)), 0),
              "y":round(this.y-(-4 * Math.cos(this.angle))- 12 * (Math.cos(this.angle+90 * Math.PI / 180)), 0),
              "a":round(this.angle+( (Math.round(Math.random() * (20)) - 10  + 90) * Math.PI / 180), 4)};
            }else if(shootingHole==4){
              this.shot={"x":round(this.x+(-12 * Math.sin(this.angle))+ 12 * (Math.sin(this.angle+90 * Math.PI / 180)), 0),
              "y":round(this.y-(-12 * Math.cos(this.angle))- 12 * (Math.cos(this.angle+90 * Math.PI / 180)), 0),
              "a":round(this.angle+( (Math.round(Math.random() * (20)) - 10  + 90) * Math.PI / 180), 4)};
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
              "a":round(this.angle+( (Math.round(Math.random() * (20)) - 10  - 90) * Math.PI / 180), 4)};
            }else if(shootingHole==1){
              this.shot={"x":round(this.x+(12 * Math.sin(this.angle))+ 12 * (Math.sin(this.angle-90 * Math.PI / 180)), 0),
              "y":round(this.y-(12 * Math.cos(this.angle))- 12 * (Math.cos(this.angle-90 * Math.PI / 180)), 0),
              "a":round(this.angle+( (Math.round(Math.random() * (20)) - 10  - 90) * Math.PI / 180), 4)};
            }else if(shootingHole==2){
              this.shot={"x":round(this.x+(4 * Math.sin(this.angle))+ 12 * (Math.sin(this.angle-90 * Math.PI / 180)), 0),
              "y":round(this.y-(4 * Math.cos(this.angle))- 12 * (Math.cos(this.angle-90 * Math.PI / 180)), 0),
              "a":round(this.angle+( (Math.round(Math.random() * (20)) - 10  - 90) * Math.PI / 180), 4)};
            }else if(shootingHole==3){
              this.shot={"x":round(this.x+(-4 * Math.sin(this.angle))+ 12 * (Math.sin(this.angle-90 * Math.PI / 180)), 0),
              "y":round(this.y-(-4 * Math.cos(this.angle))- 12 * (Math.cos(this.angle-90 * Math.PI / 180)), 0),
              "a":round(this.angle+( (Math.round(Math.random() * (20)) - 10  - 90) * Math.PI / 180), 4)};
            }else if(shootingHole==4){
              this.shot={"x":round(this.x+(-12 * Math.sin(this.angle))+ 12 * (Math.sin(this.angle-90 * Math.PI / 180)), 0),
              "y":round(this.y-(-12 * Math.cos(this.angle))- 12 * (Math.cos(this.angle-90 * Math.PI / 180)), 0),
              "a":round(this.angle+( (Math.round(Math.random() * (20)) - 10  - 90) * Math.PI / 180), 4)};
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
            "a":round(this.angle+( (Math.round(Math.random() * (20)) - 10  + 90) * Math.PI / 180), 4)};
          }else if(shootingHole==1){
            this.shot={"x":round(this.x+(12 * Math.sin(this.angle))+ 12 * (Math.sin(this.angle+90 * Math.PI / 180)), 0),
            "y":round(this.y-(12 * Math.cos(this.angle))- 12 * (Math.cos(this.angle+90 * Math.PI / 180)), 0),
            "a":round(this.angle+( (Math.round(Math.random() * (20)) - 10  + 90) * Math.PI / 180), 4)};
          }else if(shootingHole==2){
            this.shot={"x":round(this.x+(4 * Math.sin(this.angle))+ 12 * (Math.sin(this.angle+90 * Math.PI / 180)), 0),
            "y":round(this.y-(4 * Math.cos(this.angle))- 12 * (Math.cos(this.angle+90 * Math.PI / 180)), 0),
            "a":round(this.angle+( (Math.round(Math.random() * (20)) - 10  + 90) * Math.PI / 180), 4)};
          }else if(shootingHole==3){
            this.shot={"x":round(this.x+(-4 * Math.sin(this.angle))+ 12 * (Math.sin(this.angle+90 * Math.PI / 180)), 0),
            "y":round(this.y-(-4 * Math.cos(this.angle))- 12 * (Math.cos(this.angle+90 * Math.PI / 180)), 0),
            "a":round(this.angle+( (Math.round(Math.random() * (20)) - 10  + 90) * Math.PI / 180), 4)};
          }else if(shootingHole==4){
            this.shot={"x":round(this.x+(-12 * Math.sin(this.angle))+ 12 * (Math.sin(this.angle+90 * Math.PI / 180)), 0),
            "y":round(this.y-(-12 * Math.cos(this.angle))- 12 * (Math.cos(this.angle+90 * Math.PI / 180)), 0),
            "a":round(this.angle+( (Math.round(Math.random() * (20)) - 10  + 90) * Math.PI / 180), 4)};
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
            "a":round(this.angle+( (Math.round(Math.random() * (20)) - 10  - 90) * Math.PI / 180), 4)};
          }else if(shootingHole==1){
            this.shot={"x":round(this.x+(12 * Math.sin(this.angle))+ 12 * (Math.sin(this.angle-90 * Math.PI / 180)), 0),
            "y":round(this.y-(12 * Math.cos(this.angle))- 12 * (Math.cos(this.angle-90 * Math.PI / 180)), 0),
            "a":round(this.angle+( (Math.round(Math.random() * (20)) - 10  - 90) * Math.PI / 180), 4)};
          }else if(shootingHole==2){
            this.shot={"x":round(this.x+(4 * Math.sin(this.angle))+ 12 * (Math.sin(this.angle-90 * Math.PI / 180)), 0),
            "y":round(this.y-(4 * Math.cos(this.angle))- 12 * (Math.cos(this.angle-90 * Math.PI / 180)), 0),
            "a":round(this.angle+( (Math.round(Math.random() * (20)) - 10  - 90) * Math.PI / 180), 4)};
          }else if(shootingHole==3){
            this.shot={"x":round(this.x+(-4 * Math.sin(this.angle))+ 12 * (Math.sin(this.angle-90 * Math.PI / 180)), 0),
            "y":round(this.y-(-4 * Math.cos(this.angle))- 12 * (Math.cos(this.angle-90 * Math.PI / 180)), 0),
            "a":round(this.angle+( (Math.round(Math.random() * (20)) - 10  - 90) * Math.PI / 180), 4)};
          }else if(shootingHole==4){
            this.shot={"x":round(this.x+(-12 * Math.sin(this.angle))+ 12 * (Math.sin(this.angle-90 * Math.PI / 180)), 0),
            "y":round(this.y-(-12 * Math.cos(this.angle))- 12 * (Math.cos(this.angle-90 * Math.PI / 180)), 0),
            "a":round(this.angle+( (Math.round(Math.random() * (20)) - 10  - 90) * Math.PI / 180), 4)};
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
        if(this.leftAmmo<10){
          this.leftLoad--;
          if(this.leftLoad==0){
            this.leftAmmo++;
            this.leftLoad=this.loadGap;
          }
        }

        if(this.rightAmmo<10){
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
        if(myGamePiece.x<0){
          myGamePiece.x=0;
        }
        if(myGamePiece.x>1024){
          myGamePiece.x=1024;
        }
        if(myGamePiece.y<0){
          myGamePiece.y=0;
        }
        if(myGamePiece.y>1024){
          myGamePiece.y=1024;
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
        ctx.fillText(this.name,window.innerWidth/2-30,window.innerHeight/2-120);
        ctx.fillText("Kills:"+kills,window.innerWidth/2-30,window.innerHeight/2-150);
        ctx.fillText("ID:"+this.id,window.innerWidth/2-30,window.innerHeight/2-180);
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

        // instructions
        if(insTime>0){
          insTime--;
          ctx.font = "bold 20px Courier New";
          ctx.fillStyle = "red";
          ctx.fillText("MOVE : WASD  SHOOT: IOP CHAT : ENTER",window.innerWidth/2-130,window.innerHeight-200);
        }

        }


        if(!this.inGame){
          var info = "Waiting to enter the game";
          if(this.id==100){
            ctx = myGameArea.context;
            ctx.font = "bold 30px Courier New";
            ctx.fillStyle = "red";
            ctx.fillText(info,window.innerWidth/2-200,window.innerHeight/2-100);
          }
        }

        // chat text message
        if(writingMode){
          ctx = myGameArea.context;
          ctx.font = "bold 15px Courier New";
          ctx.fillStyle = "white";
          ctx.fillText(textReady,20,window.innerHeight-20);
        }

    }
}
