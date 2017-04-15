var express = require('express');
var bodyparser = require('body-parser');
var cors = require('cors')
var users = require('./users');
var cosmetic = require('./cosmetics');
var app = express();

app.use(cors())
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());


app.get('/', function (req, res) {
	res.send('<h1> Hello / </h1>');
});

app.post('/newuser', function (req, res) {
	var json = req.body;
	res.send('Add new ' + json.username + ' Completed')
});
 

// cosmetics
app.get('/api/search/all', function(req, res){
	res.json(cosmetic.searchAll());
});

app.get('/api/search/byName/:name', function(req, res){
	var name = req.params.name;
	if (name == "_all_"){
		res.json(cosmetic.searchByName(name));
	}
	else{
		cosmetic.queryItems(name,function(err,result){
			if (err){
				console.log(err);
			}
			else{
				console.log(result)
				res.json(result);
			}
			
		});	
	}

});

app.get('/api/search/byBarcode/:barcode', function(req, res){
	var barcode = req.params.barcode;
	cosmetic.queryItemsBarcode(barcode,function(err,result){
		if (err){
			console.log(err);
		}
		else{
			console.log(result)
			res.json(result);
		}
		
	});
	// res.json(cosmetic.searchByName(name));
});

app.get('/api/search/itemOpinion/:type/:id', function(req, res){
	var item_type = req.params.type;
	var item_id = req.params.id;
	cosmetic.queryItemOpinion(item_type,item_id,function(err,result){
		if (err){
			console.log(err);
		}
		else{
			res.json(result);
		}
		
	});
});

app.get('/api/search/item-comments/:item_id/:type/:feature/:kind', function (req, res) {
	var item_id = req.params.item_id;
	var item_type = req.params.type;
	var feature = req.params.feature;
	var kind = req.params.kind
	console.log(item_id,item_type,feature,kind)
	res.send('<h1> Hello / </h1>');
	// cosmetic.queryItemComments(item_id,item_type,feature,kind,function(err,result){
	// 	if (err){
	// 		console.log(err);
	// 	}
	// 	else{
	// 		console.log(result)
	// 		res.json(result);
	// 	}
		
	// });
});



//server
var server = app.listen(8000, function() {
  console.log('Server listening on port ' + server.address().port);
});