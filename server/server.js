var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);


// port provided by heroku or localhost:3000
var PORT = process.env.PORT || 3000;
server.listen(PORT, function () {
  console.log('listening on *:3000');
});
app.get('/', function (req, res) {
  res.sendFile("../client/index.html");
});



