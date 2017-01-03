var users = require('./users');

var express = require('express');
var bodyparser = require('body-parser');
 
var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.get('/', function (req, res) {
	res.send('<h1> Hello / </h1>');
});

app.get('/user', function (req, res) {
	// res.send('<h1> Hello /index </h1>');
	res.json(users.findAll());
});

app.get('/user/:id', function (req, res) {
	var id = req.params.id;
	res.json(users.findByID(id));
});

app.post('/newuser', function (req, res) {
	var json = req.body;
	res.send('Add new ' + json.username + ' Completed')
});

app.post('/authen', function (req, res) {
	var json = req.body;
	// var id = parseInt(json.id);
	res.send(json);
	// res.json(users.findByID(id));
});
 
var server = app.listen(8000, function() {
  console.log('Server listening on port ' + server.address().port);
});