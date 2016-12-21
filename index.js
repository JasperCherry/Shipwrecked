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
  socket.on('data1', function(msg1){
    setTimeout(function () {
      io.emit('data1', msg1);
    }, 0)
    //console.log(msg1);
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
