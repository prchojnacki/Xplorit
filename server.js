var express = require('express');
var app = express();
var server = app.listen(8000, function() { console.log("Server on 8000..."); });
var io = require('socket.io').listen(server);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static('static'));

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/other', function (req, res) {
	res.render('other');
});