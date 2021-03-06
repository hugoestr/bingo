var express = require('express') 
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

app.use("/public", express.static(__dirname + '/public'));

server.listen(80);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});


io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });

  socket.on("chat", function(data){
    socket.emit("chat", { player: data.player ,content: data.content}); 
  });
  
  socket.on('game_status', function (data) {
    
    switch(data.action){
      case "start" :
        socket.emit("game_status", {status: "start", 'link' : data.link});
        break;
      case "won":
        socket.emit("game_status", {status: "won", player: data.player});
        break;
      default:
        break;
    }
  });

});

