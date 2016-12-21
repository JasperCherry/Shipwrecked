var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 8080;

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
  // ships socket
  // ship1
  socket.on('id1', function(ship1){
    setTimeout(function () {
      io.emit('id1', ship1);
    }, 0)
    //console.log(ship1);
  });
  // ship2
  socket.on('id2', function(ship2){
    setTimeout(function () {
      io.emit('id2', ship2);
    }, 0)
    //console.log(ship2);
  });
  // ship3
  socket.on('id3', function(ship3){
    setTimeout(function () {
      io.emit('id3', ship3);
    }, 0)
    //console.log(ship3);
  });
  // ship4
  socket.on('id4', function(ship4){
    setTimeout(function () {
      io.emit('id4', ship4);
    }, 0)
    //console.log(ship4);
  });




  // balls creating socket
  socket.on('data2', function(msg2){
    setTimeout(function () {
      io.emit('data2', msg2);
    }, 0)
    //console.log(msg2);
  });
});



http.listen(port, function(){
  console.log('listening on *:'+port);
});
