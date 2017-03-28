

function myShip( x, y, name, id, shipType) {

    this.id=id;
    this.name=name;
    this.inGame=false;
    this.alive=true;
    this.lastInfo=true;
    this.lastHit;
    this.deadTimer=250;

    this.tracesTimer=0;

    this.speed = 0;
    this.acc = 0.05;

    this.angle = 0;
    this.moveAngle = 0;
    this.targetAngle = 0;

    this.followTimer=0;
    this.followAngle = 0;
    this.targetX=0;
    this.targetY=0;

    this.x = x;
    this.y = y;

    // level
    if(kills<1){
      this.level=1;
      this.ballDamage=3;
      this.selfRepair=200;
      this.numCannons=10;
      this.hp=100;
      this.hpLimit=100;
    }else if(kills<3){
      this.level=2;
      this.ballDamage=3;
      this.selfRepair=190;
      this.numCannons=10;
      this.hp=110;
      this.hpLimit=110;
    }else if(kills<5){
      this.level=3;
      this.ballDamage=3;
      this.selfRepair=180;
      this.numCannons=12;
      this.hp=120;
      this.hpLimit=120;
    }else if(kills<8){
      this.level=4;
      this.ballDamage=4;
      this.selfRepair=170;
      this.numCannons=12;
      this.hp=120;
      this.hpLimit=120;
    }else if(kills<12){
      this.level=5;
      this.ballDamage=4;
      this.selfRepair=160;
      this.numCannons=14;
      this.hp=130;
      this.hpLimit=130;
    }else if(kills<16){
      this.level=6;
      this.ballDamage=5;
      this.selfRepair=150;
      this.numCannons=14;
      this.hp=140;
      this.hpLimit=140;
    }else if(kills<20){
      this.level=7;
      this.ballDamage=5;
      this.selfRepair=140;
      this.numCannons=14;
      this.hp=140;
      this.hpLimit=140;
    }else  if(kills<24){
      this.level=8;
      this.ballDamage=5;
      this.selfRepair=130;
      this.numCannons=16;
      this.hp=150;
      this.hpLimit=150;
    }else if(kills<30){
      this.level=9;
      this.ballDamage=6;
      this.selfRepair=120;
      this.numCannons=18;
      this.hp=160;
      this.hpLimit=160;
    }else if(kills<36){
      this.level=10;
      this.ballDamage=6;
      this.selfRepair=110;
      this.numCannons=20;
      this.hp=160;
      this.hpLimit=160;
    }else if(kills<42){
      this.level=11;
      this.ballDamage=6;
      this.selfRepair=110;
      this.numCannons=22;
      this.hp=170;
      this.hpLimit=170;
    }else if(kills<48){
      this.level=12;
      this.ballDamage=6;
      this.selfRepair=100;
      this.numCannons=24;
      this.hp=180;
      this.hpLimit=180;
    }else if(kills<54){
      this.level=13;
      this.ballDamage=6;
      this.selfRepair=100;
      this.numCannons=26;
      this.hp=200;
      this.hpLimit=200;
    }else if(kills<60){
      this.level=14;
      this.ballDamage=7;
      this.selfRepair=100;
      this.numCannons=28;
      this.hp=200;
      this.hpLimit=200;
    }else if(kills>=60){
      this.level=15;
      this.ballDamage=7;
      this.selfRepair=100;
      this.numCannons=30;
      this.hp=200;
      this.hpLimit=200;
    }

    // those will remain constant
    this.loadGap=150;
    this.fireGap=15;
    this.type=shipType;

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

    // sound of cracking when colliding with other ships
    this.cracking=false;

    // main ship behaviour function
    this.update = function() {

      // level
      if(kills<1){
        this.level=1;
        this.ballDamage=3;
        this.selfRepair=200;
        this.numCannons=10;
        //this.hp=100;
        this.hpLimit=100;
      }else if(kills<3){
        this.level=2;
        this.ballDamage=3;
        this.selfRepair=190;
        this.numCannons=10;
        //this.hp=110;
        this.hpLimit=110;
      }else if(kills<5){
        this.level=3;
        this.ballDamage=3;
        this.selfRepair=180;
        this.numCannons=12;
        //this.hp=120;
        this.hpLimit=120;
      }else if(kills<8){
        this.level=4;
        this.ballDamage=4;
        this.selfRepair=170;
        this.numCannons=12;
        //this.hp=120;
        this.hpLimit=120;
      }else if(kills<12){
        this.level=5;
        this.ballDamage=4;
        this.selfRepair=160;
        this.numCannons=14;
        //this.hp=130;
        this.hpLimit=130;
      }else if(kills<16){
        this.level=6;
        this.ballDamage=5;
        this.selfRepair=150;
        this.numCannons=14;
        //this.hp=140;
        this.hpLimit=140;
      }else if(kills<20){
        this.level=7;
        this.ballDamage=5;
        this.selfRepair=140;
        this.numCannons=14;
        //this.hp=140;
        this.hpLimit=140;
      }else  if(kills<24){
        this.level=8;
        this.ballDamage=5;
        this.selfRepair=130;
        this.numCannons=16;
        //this.hp=150;
        this.hpLimit=150;
      }else if(kills<30){
        this.level=9;
        this.ballDamage=6;
        this.selfRepair=120;
        this.numCannons=18;
        //this.hp=160;
        this.hpLimit=160;
      }else if(kills<36){
        this.level=10;
        this.ballDamage=6;
        this.selfRepair=110;
        this.numCannons=20;
        //this.hp=160;
        this.hpLimit=160;
      }else if(kills<42){
        this.level=11;
        this.ballDamage=6;
        this.selfRepair=110;
        this.numCannons=22;
        //this.hp=170;
        this.hpLimit=170;
      }else if(kills<48){
        this.level=12;
        this.ballDamage=6;
        this.selfRepair=100;
        this.numCannons=24;
        //this.hp=180;
        this.hpLimit=180;
      }else if(kills<54){
        this.level=13;
        this.ballDamage=6;
        this.selfRepair=100;
        this.numCannons=26;
        //this.hp=200;
        this.hpLimit=200;
      }else if(kills<60){
        this.level=14;
        this.ballDamage=7;
        this.selfRepair=100;
        this.numCannons=28;
        //this.hp=200;
        this.hpLimit=200;
      }else if(kills>=60){
        this.level=15;
        this.ballDamage=7;
        this.selfRepair=100;
        this.numCannons=30;
        //this.hp=200;
        this.hpLimit=200;
      }

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

        this.cracking=false;

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

        // trrigering the sound
        if(this.hp>0 && this.cracking && soundState!=2){
          crush.play();
        }else{
          crush.load();
        }

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

        // drawing the traces on the water
        this.tracesTimer++;
        if(this.tracesTimer>10){
            traces.push(new trace(this.x, this.y, this.angle + 0 * Math.PI / 180));
          this.tracesTimer=0;
        }


        // shooting both sides
        if( (!writingMode && myGameArea.keys && myGameArea.keys[79] && !voiceControl && this.timerS==0)
        || (voiceControl && this.timerS==0 && shootingDir==0 && shootingOrder) ){

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
            if(this.id==5){
              socket.emit('data5', this.shot);
            }
            if(this.id==6){
              socket.emit('data6', this.shot);
            }
            if(this.id==7){
              socket.emit('data7', this.shot);
            }
            if(this.id==8){
              socket.emit('data8', this.shot);
            }
            if(this.id==9){
              socket.emit('data9', this.shot);
            }
            if(this.id==10){
              socket.emit('data10', this.shot);
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
            if(this.id==5){
              socket.emit('data5', this.shot);
            }
            if(this.id==6){
              socket.emit('data6', this.shot);
            }
            if(this.id==7){
              socket.emit('data7', this.shot);
            }
            if(this.id==8){
              socket.emit('data8', this.shot);
            }
            if(this.id==9){
              socket.emit('data9', this.shot);
            }
            if(this.id==10){
              socket.emit('data10', this.shot);
            }

          }

        }

        // shooting right side
        if( (!writingMode && myGameArea.keys && myGameArea.keys[80] && this.timerS==0 && !voiceControl && this.rightAmmo>0)
        || (voiceControl && shootingOrder && shootingDir==2 && this.timerS==0 && this.rightAmmo>0) ){
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
          if(this.id==5){
            socket.emit('data5', this.shot);
          }
          if(this.id==6){
            socket.emit('data6', this.shot);
          }
          if(this.id==7){
            socket.emit('data7', this.shot);
          }
          if(this.id==8){
            socket.emit('data8', this.shot);
          }
          if(this.id==9){
            socket.emit('data9', this.shot);
          }
          if(this.id==10){
            socket.emit('data10', this.shot);
          }
        }

        // shooting left side
        if( (!writingMode && myGameArea.keys && myGameArea.keys[73] && this.timerS==0 && !voiceControl && this.leftAmmo>0)
        || (voiceControl && shootingOrder && shootingDir==1 && this.leftAmmo>0 && this.timerS==0) ){
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
          if(this.id==5){
            socket.emit('data5', this.shot);
          }
          if(this.id==6){
            socket.emit('data6', this.shot);
          }
          if(this.id==7){
            socket.emit('data7', this.shot);
          }
          if(this.id==8){
            socket.emit('data8', this.shot);
          }
          if(this.id==9){
            socket.emit('data9', this.shot);
          }
          if(this.id==10){
            socket.emit('data10', this.shot);
          }
        }

        // self repair
        if(this.hp<this.hpLimit){
          this.timerR++;
          if(this.timerR>=this.selfRepair){
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


      // adjusting angle value for shorter rotations when following other ships
      this.angle=this.angle%6.28;

      if(this.inGame&&this.alive){
        // if in game and alive
        //this.speed=0;
        this.moveAngle=0;

        // moving the ship
        if(!voiceControl){

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

        }

        // moving the ship with voice control
        if(voiceControl){

          if(shipForward){
            if(myGamePiece.speed>-1){
              myGamePiece.speed-=myGamePiece.acc/2;
            }
          }else{
            if(myGamePiece.speed<0){
              myGamePiece.speed+=myGamePiece.acc;
            }
          }

        }

        // changing angle with voice control
        if(voiceControl){

          if(Math.abs(this.targetAngle-this.angle)>0.001){
            if(shipRight){
              this.moveAngle=+1;
            }else if(shipLeft){
              this.moveAngle=-1;
            }
          }else{
            shipLeft=false;
            shipRight=false;
          }

        }

        // following script
        if(voiceControl){
          if(follow){

            if(sName==ai1.id){
              this.targetX=ai1.x;
              this.targetY=ai1.y;
            }
            if(sName==ai2.id){
              this.targetX=ai2.x;
              this.targetY=ai2.y;
            }
            if(sName==ai3.id){
              this.targetX=ai3.x;
              this.targetY=ai3.y;
            }
            if(sName==ai4.id){
              this.targetX=ai4.x;
              this.targetY=ai4.y;
            }
            if(sName==ai5.id){
              this.targetX=ai5.x;
              this.targetY=ai5.y;
            }

            if(otherShips.length>0){
              console.log("yey theres someone in the game");
              for(var z=0; z<otherShips.length; z++){
                if(otherShips[z].id==sName){
                  console.log("yey ass");
                  this.targetX=otherShips[z].x;
                  this.targetY=otherShips[z].y;
                }
              }
            }



            if(Math.abs(this.followAngle-this.angle)>0.05){
              if(this.followAngle>this.angle){
                this.moveAngle=+1;
              }
              if(this.followAngle<this.angle){
                this.moveAngle=-1;
              }
            }else{
              this.moveAngle=0;
            }

            if(!aimLeft&&!aimRight){
              this.followAngle=Math.atan2( this.targetY - this.y, this.targetX - this.x)+(90 * Math.PI / 180);
            }else if(aimLeft&&!aimRight){
              this.followAngle=Math.atan2( this.targetY - this.y, this.targetX - this.x)+(180 * Math.PI / 180);
            }else if(!aimLeft&&aimRight){
              this.followAngle=Math.atan2( this.targetY - this.y, this.targetX - this.x)+(0 * Math.PI / 180);
            }


            // controling collision
              if(Math.abs(this.x-this.targetX)<100 && Math.abs(this.y-this.targetY)<100 && !collide){
                shipForward=false;
              }else{
                shipForward=true;
              }

          }
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
        if(this.y>3072){
          this.y=3072;
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
        }
      }


      // show help as first
      this.manual = function() {
        // show info about game
        if(showInfo){
          ctx = myGameArea.context;
          ctx.font = "20px Courier New";
          ctx.fillStyle = "white";
          ctx.fillText("GAME MANUAL:",window.innerWidth/2 + 100,100);
          ctx.fillText("moving : W,A,S,D",window.innerWidth/2 + 100,130);
          ctx.fillText("shooting :",window.innerWidth/2 + 100,160);
          ctx.fillText("I-left P-right O-both sides",window.innerWidth/2 + 100,190);
          ctx.fillText("press ENTER to chat",window.innerWidth/2 + 100,220);
          ctx.fillText("press M for minimap",window.innerWidth/2 + 100,250);
          if(soundState==0){
            ctx.fillText("press N to adjust sound: on",window.innerWidth/2 + 100,280);
          }else if(soundState==1){
            ctx.fillText("press N to adjust sound: only effects",window.innerWidth/2 + 100,280);
          }else if(soundState==2){
            ctx.fillText("press N to adjust sound: off",window.innerWidth/2 + 100,280);
          }
          if(voiceControl){
            ctx.fillText("press B to change voice control : on",window.innerWidth/2 + 100,310);
          }else{
            ctx.fillText("press B to change voice control : off",window.innerWidth/2 + 100,310);
          }
          ctx.fillText("press V to see voice commands",window.innerWidth/2 + 100,340);
          ctx.fillText("Destroy other ships",window.innerWidth/2 - 350,420);
          ctx.fillText("to earn levels and upgrades",window.innerWidth/2 - 350,450);
          ctx.fillText("Level : "+this.level+" / 15",window.innerWidth/2 - 350,100);
          ctx.fillText("Kills : "+kills,window.innerWidth/2 - 350,130);
          ctx.fillText("HP : "+this.hpLimit,window.innerWidth/2 - 350,170);
          ctx.fillText("Selfrepair : "+round(this.selfRepair/50, 2)+" sec",window.innerWidth/2 - 350,200);
          ctx.fillText("Damage : "+this.ballDamage,window.innerWidth/2 - 350,230);
          ctx.fillText("Cannons : "+this.numCannons,window.innerWidth/2 - 350,260);
        }

        if(showVoice){
          ctx = myGameArea.context;
          ctx.font = "20px Courier New";
          ctx.fillStyle = "white";
          ctx.fillText("VOICE COMMANDS",window.innerWidth/2 + 150,100);
          ctx.fillText("Movement:",window.innerWidth/2 + 150,140);
          ctx.fillText("Go forward",window.innerWidth/2 + 150,170);
          ctx.fillText("Full stop",window.innerWidth/2 + 150,200);
          ctx.fillText("Turn left / right + angle",window.innerWidth/2 + 150,230);
          ctx.fillText("Rotate left / right",window.innerWidth/2 + 150,260);
          ctx.fillText("Stop rotating",window.innerWidth/2 + 150,290);
          ctx.fillText("Start following + name of the ship",window.innerWidth/2 + 150,320);

          ctx.fillText("Combat:",window.innerWidth/2 + 150,380);
          ctx.fillText("Fire left / right / both sides",window.innerWidth/2 + 150,410);
          ctx.fillText("Stop shooitng",window.innerWidth/2 + 150,440);
          ctx.fillText("Target left / right",window.innerWidth/2 + 150,470);
          ctx.fillText("Collide",window.innerWidth/2 + 150,500);

          ctx.fillText("Game control:",window.innerWidth/2 - 400,320);
          ctx.fillText("Voice control",window.innerWidth/2 - 400,350);
          ctx.fillText("Keyboard control",window.innerWidth/2 - 400,380);
          ctx.fillText("Show me the game",window.innerWidth/2 - 400,410);
          ctx.fillText("Show me the map",window.innerWidth/2 - 400,440);
          ctx.fillText("Show me the voice commands",window.innerWidth/2 - 400,470);
          ctx.fillText("Help",window.innerWidth/2 - 400,500);

        }
      }

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
          this.cracking=true;
        }else
        if(Math.abs(this.x-(element.x-0+round((-30 * Math.sin(element.angle)), 0)))<15
        && Math.abs(this.y-(element.y-0+round((30 * Math.cos(element.angle)), 0)))<15
        ){
          if(this.hp<=1){
            this.lastHit=element.id;
          }
          this.hp--;
          this.cracking=true;
        }else
        if(Math.abs(this.x-(element.x-0+round((30 * Math.sin(element.angle)), 0)))<15
        && Math.abs(this.y-(element.y-0+round((-30 * Math.cos(element.angle)), 0)))<15
        ){
          if(this.hp<=1){
            this.lastHit=element.id;
          }
          this.hp--;
          this.cracking=true;
        }else

        // second square
        if(Math.abs((this.x-0+round((-30 * Math.sin(this.angle)), 0))-(element.x))<15
        && Math.abs((this.y-0+round((30 * Math.cos(this.angle)), 0))-(element.y))<15
        ){
          if(this.hp<=1){
            this.lastHit=element.id;
          }
          this.hp--;
          this.cracking=true;
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
          this.cracking=true;
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
          this.cracking=true;
        }else

        // third square
        if(Math.abs((this.x-0+round((30 * Math.sin(this.angle)), 0))-(element.x))<15
        && Math.abs((this.y-0+round((-30 * Math.cos(this.angle)), 0))-(element.y))<15
        ){
          if(this.hp<=1){
            this.lastHit=element.id;
          }
          this.hp--;
          this.cracking=true;
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
          this.cracking=true;
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
          this.cracking=true;
        }
      }
      }

      this.info = function() {

        if(this.inGame){

        ctx.font = "bold 18px Courier New";
        ctx.fillStyle = "white";
        ctx.fillText("HP:"+this.hp,window.innerWidth/2-30,window.innerHeight/2-90);
        ctx.fillText("Level:"+this.level,window.innerWidth/2-30,window.innerHeight/2-120);
        ctx.fillText(this.name,window.innerWidth/2-30,window.innerHeight/2-150);
        // hide in game
        //ctx.fillText("ID:"+this.id,window.innerWidth/2-30,window.innerHeight/2-180);
        //ctx.fillText("Type:"+this.type,window.innerWidth/2-30,window.innerHeight/2-210);

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

        if(!showMinimap){
          ctx = myGameArea.context;
          ctx.font = "15px Courier New";
          ctx.fillStyle = "white";
          ctx.fillText("PLAYERS:"+livePlayers,window.innerWidth - 130,window.innerHeight - 170);
        }
    }
}
