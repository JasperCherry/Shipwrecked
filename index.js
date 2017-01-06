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

///////////////////////////////////////////// END OF PLAYERS SHIPS

///////////////////////////////////// AI

  var aiShip1 = new aiShip();

  // ai ships update interval
  function sendAi() {
    setInterval(function(){
      aiShip1.update();
      aiShip1.send();
  }, 200);
  }

  sendAi();


  // ai ship object
  function aiShip() {

      this.angle = 0;
      this.x = Math.floor(Math.random()*1025);
      this.y = Math.floor(Math.random()*1025);

      this.update = function() {
        this.x++;
        this.y++;
      }

      this.send = function() {
        var aiData1={"x":this.x, "y":this.y};
        socket.emit('ai1', aiData1);
      }

  }


}); ///////////////////// end of sockets connection


http.listen(port, function(){
  console.log('listening on *:'+port);
});


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












// end
