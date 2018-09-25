var app = require('express')();
var http = require('http').Server(app);
var PORT = process.env.PORT || 3000;
app.get('/', function (req, res) {
  res.send('<h1>Hello world</h1>');
});

http.listen(PORT, function () {
  console.log('listening on *:3000');
});
