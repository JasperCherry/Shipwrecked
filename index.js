var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 8080;

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var balls=new Array();

var ship1a=false;
var ship1b=false;
var ship1total;

var ship2a=false;
var ship2b=false;
var ship2total;

var ship3a=false;
var ship3b=false;
var ship3total;

var ship4a=false;
var ship4b=false;
var ship4total;

checkFreeId();

io.on('connection', function(socket){
  // ships sockets and their balls

  // chat
  socket.on('chat', function(txt){
    setTimeout(function () {
      io.emit('chat', txt);
    }, 0)
    //console.log(txt);
  });

  // setting id
  socket.on('setId', function(msg1){
    // assign free id or 200 to play as spectator
    msg1.status=checkId();
    // emit new id
    setTimeout(function () {
      io.emit('setId', msg1);
    }, 0)
    //console.log(msg1);
  });


  // ship1
  socket.on('id1', function(ship1){
    setTimeout(function () {
      io.emit('id1', ship1);
      ship1a=true;
      ship1b=true;
      ship1total=ship1;
    }, 0)
    //console.log(ship1);
  });
  socket.on('data1', function(ball1){
    setTimeout(function () {
      io.emit('data1', ball1);
      balls.push(new ball(ball1.x, ball1.y, ball1.a, 1, ball1.d));
    }, 0)
    //console.log(ball1);
  });


  // ship2
  socket.on('id2', function(ship2){
    setTimeout(function () {
      io.emit('id2', ship2);
      ship2a=true;
      ship2b=true;
      ship2total=ship2;
    }, 0)
    //console.log(ship2);
  });
  socket.on('data2', function(ball2){
    setTimeout(function () {
      io.emit('data2', ball2);
      balls.push(new ball(ball2.x, ball2.y, ball2.a, 2, ball2.d));
    }, 0)
    //console.log(ball2);
  });


  // ship3
  socket.on('id3', function(ship3){
    setTimeout(function () {
      io.emit('id3', ship3);
      ship3a=true;
      ship3b=true;
      ship3total=ship3;
    }, 0)
    //console.log(ship3);
  });
  socket.on('data3', function(ball3){
    setTimeout(function () {
      io.emit('data3', ball3);
      balls.push(new ball(ball3.x, ball3.y, ball3.a, 3, ball3.d));
    }, 0)
    //console.log(ball3);
  });


  // ship4
  socket.on('id4', function(ship4){
    setTimeout(function () {
      io.emit('id4', ship4);
      ship4a=true;
      ship4b=true;
      ship4total=ship4;
    }, 0)
    //console.log(ship4);
  });
  socket.on('data4', function(ball4){
    setTimeout(function () {
      io.emit('data4', ball4);
      balls.push(new ball(ball4.x, ball4.y, ball4.a, 4, ball4.d));
    }, 0)
    //console.log(ball4);
  });



///////////////////////////////////////////// END OF PLAYERS SHIPS


}); ///////////////////// end of sockets connection

  var aiShip1 = new aiShip("Flying Dutchman",81);
  var aiShip2 = new aiShip("Mary Celeste",82);



  // ai ships update interval
  function moveAi() {
    setInterval(function(){

      aiShip1.update();
      aiShip2.update();



      // updating balls
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

    }, 20);
  }



  moveAi();











// ai ship object
function aiShip(newName, newId) {

    this.name=newName;
    this.id=newId;
    this.x = Math.floor(Math.random()*1025);
    this.y = Math.floor(Math.random()*1025);
    this.targetX = Math.floor(Math.random()*1025);
    this.targetY = Math.floor(Math.random()*1025);

    this.hp=10; // to fix
    this.lastHit;
    this.lastInfo=true;
    this.alive=true;
    this.selfRepair=50;

    this.angle=0;
    this.targetA=0;
    // timer for changing the angle
    this.targetTimer=0;
    // timer for changing the target
    this.targetTimer2=0;

    this.speed=1;

    this.targetChange=400;

    this.emitTimer=0;

    // every 20 ms update, every 200 ms send
    this.sendTimer=10;

    // shooting
    this.fireAngle;
    this.ballDamage=5;
    this.fireGap=15;
    this.timerSR=0;
    this.timerSL=0;

    this.deadTimer=250;

    // wind
    this.windT=Math.random()*Math.PI*2;
    this.windSpeed=0.1;
    this.windTimer=0;
    this.windC=this.windT;

    // collision detection
    this.ifCollide = function(element){
    if(element!=null){
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
      if(Math.abs(this.x-(element.x-0+round((-30 * Math.sin(element.a)), 0)))<15
      && Math.abs(this.y-(element.y-0+round((30 * Math.cos(element.a)), 0)))<15
      ){
        if(this.hp<=1){
          this.lastHit=element.id;
        }
        this.hp--;
      }else
      if(Math.abs(this.x-(element.x-0+round((30 * Math.sin(element.a)), 0)))<15
      && Math.abs(this.y-(element.y-0+round((-30 * Math.cos(element.a)), 0)))<15
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
      -(element.x-0+round((-30 * Math.sin(element.a)), 0)))<15
      && Math.abs((this.y-0+round((30 * Math.cos(this.angle)), 0))
      -(element.y-0+round((30 * Math.cos(element.a)), 0)))<15
      ){
        if(this.hp<=1){
          this.lastHit=element.id;
        }
        this.hp--;
      }else
      if(Math.abs((this.x-0+round((-30 * Math.sin(this.angle)), 0))
      -(element.x-0+round((30 * Math.sin(element.a)), 0)))<15
      && Math.abs((this.y-0+round((30 * Math.cos(this.angle)), 0))
      -(element.y-0+round((-30 * Math.cos(element.a)), 0)))<15
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
      -(element.x-0+round((-30 * Math.sin(element.a)), 0)))<15
      && Math.abs((this.y-0+round((-30 * Math.cos(this.angle)), 0))
      -(element.y-0+round((30 * Math.cos(element.a)), 0)))<15
      ){
        if(this.hp<=1){
          this.lastHit=element.id;
        }
        this.hp--;
      }else
      if(Math.abs((this.x-0+round((30 * Math.sin(this.angle)), 0))
      -(element.x-0+round((30 * Math.sin(element.a)), 0)))<15
      && Math.abs((this.y-0+round((-30 * Math.cos(this.angle)), 0))
      -(element.y-0+round((-30 * Math.cos(element.a)), 0)))<15
      ){
        if(this.hp<=1){
          this.lastHit=element.id;
        }
        this.hp--;
      }
    }
    }
    }

    // if target is in the range -> open fire function
    this.ifShootP = function(control1, control2, shipdata) {
      // if ship exists in the game
      if((control1||control2)&&shipdata!=null){
        // checking distance
        if(Math.abs(shipdata.x-this.x)<350 && Math.abs(shipdata.y-this.y)<350){
          this.fireAngle=Math.atan2( shipdata.y - this.y, shipdata.x - this.x)+(180 * Math.PI / 180);

          this.fireAngle=Math.abs((this.fireAngle-this.angle)%6.28);
          //console.log(this.fireAngle);

          // shooting right side
          if(Math.abs(this.fireAngle)>3.14-0.28&&Math.abs(this.fireAngle)<3.14+0.28){
            if(this.timerSR==0){
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
            if(this.id==81){
              io.emit('ship1aibl', this.shot);
            }
            if(this.id==82){
              io.emit('ship2aibl', this.shot);
            }
            balls.push(new ball(this.shot.x, this.shot.y, this.shot.a, 0, this.shot.d));
            this.timerSR=this.fireGap;
            }
          }
          // shooting left side
          if(Math.abs(this.fireAngle)>6||Math.abs(this.fireAngle)<0.28){
            if(this.timerSL==0){
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
            if(this.id==81){
              io.emit('ship1aibl', this.shot);
            }
            if(this.id==82){
              io.emit('ship2aibl', this.shot);
            }
            balls.push(new ball(this.shot.x, this.shot.y, this.shot.a, 0, this.shot.d));
            this.timerSL=this.fireGap;
            }
          }
        }
      }
    }

    this.update = function() {

      // timers for shooting sideways
      if(this.timerSR>0){
        this.timerSR--;
      }
      if(this.timerSL>0){
        this.timerSL--;
      }

      // wind
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

      // self repair
      if(this.alive){
          if(this.hp<10){  // to fix
            this.selfRepair--;
            if(this.selfRepair==0){
              this.selfRepair=50;
              this.hp++;
            }
          }
      }


      // checking if ship is alive
      if(this.hp>0){
        this.alive=true;
      }else{
        this.alive=false;
      }

      // respawn
      if(!this.alive){
        this.deadTimer--;
        if(this.deadTimer==0){
          this.deadTimer=250;
          this.x = Math.floor(Math.random()*1025);
          this.y = Math.floor(Math.random()*1025);
          this.alive=true;
          this.hp=10; // to fix
          this.lastInfo=true;
        }
      }

      // sending data
      // n times per second  / 10
      if(this.emitTimer==5){

        this.emitTimer=0;
        if(this.hp==0&&this.lastInfo){
          this.lastInfo=false;
          var aiNew={"n":this.name, "x":round(this.x, 0), "y":round(this.y, 0), "a":round(this.angle, 4),
           "t1":round(this.targetX, 0), "t2":round(this.targetY, 0), "hp":"D"+this.lastHit};
           if(this.id==81){
             io.emit('ship1ai', aiNew);
           }
           if(this.id==82){
             io.emit('ship2ai', aiNew);
           }

        }else{

          var aiNew={"n":this.name,"x":round(this.x, 0), "y":round(this.y, 0), "a":round(this.angle, 4),
           "t1":round(this.targetX, 0), "t2":round(this.targetY, 0), "hp":this.hp};
           if(this.id==81){
             io.emit('ship1ai', aiNew);
           }
           if(this.id==82){
             io.emit('ship2ai', aiNew);
           }
        }

      }else{
        this.emitTimer++;
      }



      if(this.alive){

      if(this.targetTimer==150){
        this.targetA=Math.atan2( this.targetY - this.y, this.targetX - this.x)+(90 * Math.PI / 180);

        if(Math.abs(this.targetA-this.angle)>0.05){
          // moving the angle
          if(this.targetA>this.angle){
            this.angle += 1 * Math.PI / 180;
          }
          if(this.targetA<this.angle){
            this.angle -= 1 * Math.PI / 180;
          }
        }else{
          // stop rotating if the angle is set
          this.targetTimer=0;
        }

      }else{
        this.targetTimer++;
      }

      }

      // moving the ship
      this.x += this.speed * Math.sin(this.angle);
      this.y -= this.speed * Math.cos(this.angle);

      // map border detection
      if(this.x<0){
        this.x=0;
      }
      if(this.x>1024){
        this.x=1024;
      }
      if(this.y<0){
        this.y=0;
      }
      if(this.y>1024){
        this.y=1024;
      }

      // changing the target from time to time
      if(this.alive){
        if(this.targetTimer2==this.targetChange){
          this.targetX = Math.floor(Math.random()*1025);
          this.targetY = Math.floor(Math.random()*1025);
          this.targetTimer2=0;
        }else{
          this.targetTimer2++;
        }
      }



      // if target has been reached
      if(Math.abs(this.targetX-this.x)<50 && Math.abs(this.targetY-this.y)<50){
        this.targetX = Math.floor(Math.random()*1025);
        this.targetY = Math.floor(Math.random()*1025);
      }

      // checking for targets to open fire
      if(this.alive){
        // requires  x, y,
        this.ifShootP(ship1a, ship1b, ship1total);
        this.ifShootP(ship2a, ship2b, ship2total);
        this.ifShootP(ship3a, ship3b, ship3total);
        this.ifShootP(ship4a, ship4b, ship4total);


        // requires x, y, angle, id,
        /* if ai have to suffer from collision
        this.ifCollide(ship1total);
        */
      }



      // checking for harm
      // checking 3 squares
      if(balls.length>0){
        for(var x=0; x<balls.length; x++){
            if(Math.abs(balls[x].x-this.x)<15 && Math.abs(balls[x].y-this.y)<15
            &&balls[x].id!=0){
              if(this.hp<=balls[x].damage){
                this.lastHit=balls[x].id;
              }
              this.hp-=balls[x].damage;
              balls.splice(x,1);
            }else
            if(Math.abs(balls[x].x-(this.x-0+round((-30 * Math.sin(this.angle)), 0)))<15
             && Math.abs(balls[x].y-(this.y-0+round((30 * Math.cos(this.angle)), 0)))<15
            &&balls[x].id!=0){
              if(this.hp<=balls[x].damage){
                this.lastHit=balls[x].id;
              }
              this.hp-=balls[x].damage;
              balls.splice(x,1);
            }else
            if(Math.abs(balls[x].x-(this.x-0+round((30 * Math.sin(this.angle)), 0)))<15
             && Math.abs(balls[x].y-(this.y-0+round((-30 * Math.cos(this.angle)), 0)))<15
            &&balls[x].id!=0){
              if(this.hp<=balls[x].damage){
                this.lastHit=balls[x].id;
              }
              this.hp-=balls[x].damage;
              balls.splice(x,1);
            }
        }
      }

      // reducing hp to 0
      if(this.hp<0){
        this.hp=0;
      }



    }


}



function ball( x, y, a, id, d) {

    this.id=id;
    this.speed = 5;
    //this.speed = 0;
    this.angle = a;
    this.timer=60
    this.x = x;
    this.y = y;
    this.damage=d;

    this.show = function() {

      this.x += this.speed * Math.sin(this.angle);
      this.y -= this.speed * Math.cos(this.angle);

      this.timer--;

    }
}


// function that checks if id is taken:
function checkId() {
  if(!ship1a&&!ship1b){
    ship1a=true;
    ship1b=true;
    return 1;
  }
  if(!ship2a&&!ship2b){
    ship2a=true;
    ship2b=true;
    return 2;
  }
  if(!ship3a&&!ship3b){
    ship3a=true;
    ship3b=true;
    return 3;
  }
  if(!ship4a&&!ship4b){
    ship4a=true;
    ship4b=true;
    return 4;
  }
  return 100;
}


function checkFreeId() {
setInterval(function(){
/*
  console.log(ship1a);
  console.log(ship1b);
  console.log(ship2a);
  console.log(ship2b);
  console.log(ship3a);
  console.log(ship3b);
  console.log(ship4a);
  console.log(ship4b);
  console.log("");
*/
  // checking ship1
  if(ship1b==true&&ship1a==false){
    ship1b=false;
    ship1total=null;
  }
  if(ship1a==true){
    ship1a=false;
  }

  // checking ship2
  if(ship2b==true&&ship2a==false){
    ship2b=false;
    ship2total=null;
  }
  if(ship2a==true){
    ship2a=false;
  }

  // checking ship3
  if(ship3b==true&&ship3a==false){
    ship3b=false;
    ship3total=null;
  }
  if(ship3a==true){
    ship3a=false;
  }

  // checking ship4
  if(ship4b==true&&ship4a==false){
    ship4b=false;
    ship4total=null;
  }
  if(ship4a==true){
    ship4a=false;
  }

}, 2000);
}



// rounding numbers function
function round(n, k){
    var factor = Math.pow(10, k);
    return Math.round(n*factor)/factor;
}


http.listen(port, function(){
  console.log('listening on *:'+port);
});


// end
