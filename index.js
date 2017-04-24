var express = require('express');
var bodyparser = require('body-parser');
var cors = require('cors')
var users = require('./users');
var logs = require('./logs');
var cosmetic = require('./cosmetics');
var recommended = require('./recommended');
var app = express();

app.use(cors())
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());


app.get('/', function (req, res) {
	res.send('<h1> Hello / </h1>');
});

// cosmetics
app.get('/api/search/all/', function(req, res){
	// console.log("IN")
	cosmetic.queryAllItems().then( data=>{
		// data = data.splice(0,10)
		res.json(data)
	}).catch( err=> res.send(err))

});

app.post('/api/search/byName/', function(req, res){
	let json = req.body
	console.log(json)
	cosmetic.queryItems(json).then( data=>{
		res.json(data)
	}).catch( err=> res.send(err))

});

app.post('/api/search/byBarcode/', function(req, res){
	console.log("BARCODE")
	var json = req.body
	cosmetic.queryItemsBarcode(json.barcode,function(err,result){
		if (err){
			console.log(err);
		}
		else{
			console.log(result)
			res.json(result);
		}
		
	});
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
	// res.send('<h1> Hello / </h1>');
	cosmetic.queryItemComments(item_id,item_type,feature,kind,function(err,result){
		if (err){
			console.log(err);
		}
		else{
			console.log(result)
			res.json(result);
		}
		
	});
});

app.get('/api/search/info_barcode/:barcode', function (req, res) {
	let barcode = req.params.barcode;
	// console.log(barcode)
	cosmetic.queryItemDetails(barcode).then( (data)=>{
		res.json(data)
	}).catch(err=>{
		res.json(err)
	})
});

//users
app.post('/api/newuser', function (req, res) {
	let json = req.body;
	users.auth(json,function(err,result){
		if (err){
			console.log(err)
		}
		if (result){
			res.json(result);
		}
	})
});

app.get('/api/checkToken/:token',function(req, res){
	let token = req.params.token
	// console.log(token)
	users.checkToken(token).then((data) =>{
		console.log(data)
		res.json(data)
	})
})

app.get('/api/logout/:token',function(req,res){
	let token = req.params.token
	users.logout(token).then( (data)=> {
		res.json(data)	
	})
	
})

app.get('/api/userdetails/:uid',function(req,res){
	let uid = req.params.uid
	users.getDetails(uid).then( (data)=>{
		res.json(data)
	})
})

app.get('/api/map/UidFbToUid/:uidfb',function (req,res){
	let uid_fb = req.params.uidfb
	users.mapUidFbToUid(uid_fb).then( (data)=>{
		res.json(data[0])
	})
})

// logs
app.get('/api/log/stores/:uid/:item_id',function(req,res){
	let uid = req.params.uid
	let item_id = req.params.item_id
	logs.stores(uid,item_id).then( (data)=>{
		res.json(data)
	})
})

app.get('/api/log/fetches/:uid',function(req,res){
	let uid = req.params.uid
	logs.fetches(uid).then( (data)=>{
		res.json(data)
	})	
})

// recommended system
app.get('/api/recommendedItems/:uid',function(req, res){
	let uid = req.params.uid
	recommended.loadItemsPairs(uid)
	.then( (pairs)=>{
		recommended.loadRecItems(pairs).then ( (data)=>{
			res.send(data)
		})
	})
})

//server
var server = app.listen(8000, function() {
  console.log('Server listening on port ' + server.address().port);
});