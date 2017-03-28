var express = require('express');
var bodyparser = require('body-parser');

var users = require('./users');
var cosmetic = require('./cosmetics');
 
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
	res.json(users.findById(id));
});

app.post('/newuser', function (req, res) {
	var json = req.body;
	res.send('Add new ' + json.username + ' Completed')
});

app.post('/authen', function (req, res) {
	var json = req.body;
	res.send(json);
});
 

// cosmetics
app.get('/api/search/all', function(req, res){
	res.json(cosmetic.searchAll());
});

app.get('/api/search/byName/:name', function(req, res){
	var name = req.params.name;
	cosmetic.queryItems(name,function(err,result){
		if (err){
			console.log(err);
		}
		else if (result){
			console.log(result)
			res.json(result);
		}
		
	});
	// res.json(cosmetic.searchByName(name));
});

//server
var server = app.listen(8000, function() {
  console.log('Server listening on port ' + server.address().port);
});