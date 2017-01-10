var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 8080;

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


var ship1a=false;
var ship1b=false;

var ship2a=false;
var ship2b=false;

var ship3a=false;
var ship3b=false;

var ship4a=false;
var ship4b=false;

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
    }, 0)
    //console.log(ship1);
  });
  socket.on('data1', function(ball1){
    setTimeout(function () {
      io.emit('data1', ball1);
    }, 0)
    //console.log(ball1);
  });
  /*
  socket.on('ship1ai1', function(ai){
    setTimeout(function () {
      var aiNew={"x":round(aiShip1.x, 0), "y":round(aiShip1.y, 0), "a":round(aiShip1.angle, 4), "t1":round(aiShip1.targetX, 0), "t2":round(aiShip1.targetY, 0)};
      io.emit('ship1ai1', aiNew);
      //console.log(aiNew);
    }, 0)
  });
  */

  // ship2
  socket.on('id2', function(ship2){
    setTimeout(function () {
      io.emit('id2', ship2);
      ship2a=true;
      ship2b=true;
    }, 0)
    //console.log(ship2);
  });
  socket.on('data2', function(ball2){
    setTimeout(function () {
      io.emit('data2', ball2);
    }, 0)
    //console.log(ball2);
  });
  /*
  socket.on('ship2ai1', function(ai){
    setTimeout(function () {
      var aiNew={"x":round(aiShip1.x, 0), "y":round(aiShip1.y, 0), "a":round(aiShip1.angle, 4), "t1":round(aiShip1.targetX, 0), "t2":round(aiShip1.targetY, 0)};
      io.emit('ship2ai1', aiNew);
      //console.log(aiNew);
    }, 0)
  });
  */


  // ship3
  socket.on('id3', function(ship3){
    setTimeout(function () {
      io.emit('id3', ship3);
      ship3a=true;
      ship3b=true;
    }, 0)
    //console.log(ship3);
  });
  socket.on('data3', function(ball3){
    setTimeout(function () {
      io.emit('data3', ball3);
    }, 0)
    //console.log(ball3);
  });
  /*
  socket.on('ship3ai1', function(ai){
    setTimeout(function () {
      var aiNew={"x":round(aiShip1.x, 0), "y":round(aiShip1.y, 0), "a":round(aiShip1.angle, 4), "t1":round(aiShip1.targetX, 0), "t2":round(aiShip1.targetY, 0)};
      io.emit('ship3ai1', aiNew);
      //console.log(aiNew);
    }, 0)
  });
  */


  // ship4
  socket.on('id4', function(ship4){
    setTimeout(function () {
      io.emit('id4', ship4);
      ship4a=true;
      ship4b=true;
    }, 0)
    //console.log(ship4);
  });
  socket.on('data4', function(ball4){
    setTimeout(function () {
      io.emit('data4', ball4);
    }, 0)
    //console.log(ball4);
  });
  /*
  socket.on('ship4ai1', function(ai){
    setTimeout(function () {
      var aiNew={"x":round(aiShip1.x, 0), "y":round(aiShip1.y, 0), "a":round(aiShip1.angle, 4), "t1":round(aiShip1.targetX, 0), "t2":round(aiShip1.targetY, 0)};
      io.emit('ship4ai1', aiNew);
      //console.log(aiNew);
    }, 0)
  });
  */

///////////////////////////////////////////// END OF PLAYERS SHIPS


}); ///////////////////// end of sockets connection

  var aiShip1 = new aiShip();


  // ai ships update interval
  function moveAi() {
    setInterval(function(){
      aiShip1.update();
      var aiNew={"x":round(aiShip1.x, 0), "y":round(aiShip1.y, 0), "a":round(aiShip1.angle, 4), "t1":round(aiShip1.targetX, 0), "t2":round(aiShip1.targetY, 0)};
      io.emit('ship1ai1', aiNew);
    }, 20);
  }



  moveAi();











// ai ship object
function aiShip() {

    this.x = Math.floor(Math.random()*1025);
    this.y = Math.floor(Math.random()*1025);
    this.targetX = Math.floor(Math.random()*1025);
    this.targetY = Math.floor(Math.random()*1025);

    this.angle = 0;
    this.targetA = 0;

    this.speed=1;

    this.targetChange=400;

    // every 20 ms update, every 200 ms send
    this.sendTimer=10;


    this.update = function() {

      this.targetA=Math.atan2( this.targetY - this.y, this.targetX - this.x)+(-90 * Math.PI / 180);

      if(Math.abs(this.targetA-this.angle)>0.05){
        // moving the angle
        if(this.targetA>this.angle){
          this.angle += 1 * Math.PI / 180;
        }
        if(this.targetA<this.angle){
          this.angle -= 1 * Math.PI / 180;
        }
      }else{
        // moving the ship
        this.x -= this.speed * Math.sin(this.angle);
        this.y += this.speed * Math.cos(this.angle);
      }

      // if target has been reached
      if(Math.abs(this.targetX-this.x)<5 && Math.abs(this.targetY-this.y)<5){
        this.targetX = Math.floor(Math.random()*1025);
        this.targetY = Math.floor(Math.random()*1025);
      }
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
  }
  if(ship1a==true){
    ship1a=false;
  }

  // checking ship2
  if(ship2b==true&&ship2a==false){
    ship2b=false;
  }
  if(ship2a==true){
    ship2a=false;
  }

  // checking ship3
  if(ship3b==true&&ship3a==false){
    ship3b=false;
  }
  if(ship3a==true){
    ship3a=false;
  }

  // checking ship4
  if(ship4b==true&&ship4a==false){
    ship4b=false;
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
