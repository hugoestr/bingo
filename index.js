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
  socket.on('winning', function (data) {
    socket.emit("news", { status: "game over!" + data.user + " won" });
  });
});

