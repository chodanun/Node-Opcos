// var stringSimilarity = require('string-similarity');
exports.queryAllItems = function(){
	return new Promise ( (resolve,reject)=>{
		var mysql = require('mysql')
		var connection = mysql.createConnection({
		  host     : 'localhost',
		  user     : 'root',
		  password : '',
		  database : 'cosmetics'
		});
		connection.connect()
		connection.query("SELECT * FROM items WHERE 1", function (err, result){
		  if (err) {
			reject(err)
		  }
		  if (result){
		  	resolve(result)
		  }
		})
		connection.end()	
	})
}

exports.queryItems = function(obj){
	return new Promise ( (resolve,reject)=>{
		let name = obj.name
		var mysql = require('mysql')
		var connection = mysql.createConnection({
		  host     : 'localhost',
		  user     : 'root',
		  password : '',
		  database : 'cosmetics'
		});

		connection.connect()
		connection.query("SELECT items.item_id, items.brand, items.name, items.description, items.img, items.type, score, reviews FROM items inner join opinion_score_calculation on items.item_id = opinion_score_calculation.item_id WHERE name = ?",[name], function (err, result){
		  if (err) {
			reject(err)
		  }
		  if (result){
		  	resolve(result)
		  }
		})
		connection.end()	
	})
}

exports.queryItemsBarcode = function(barcode,callback){
	let new_barcode = barcode
	console.log(barcode)
	for (let i = 0 ; i < new_barcode.length ; i++){
		if (barcode[i] == "0"){
			new_barcode = new_barcode.substr(1,barcode.length)
		}
		else{
			break
		}
	}

	var mysql = require('mysql')
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '',
	  database : 'cosmetics',
	});

	connection.connect()

	connection.query("select items.type,items.item_id,items.name,items.description,items.img,items.brand,items_matching.point, score,reviews  from ((items inner join items_matching on items.item_id = items_matching.item_id) inner join barcode on barcode.id = items_matching.barcode_id) inner join opinion_score_calculation on items.item_id = opinion_score_calculation.item_id where barcode.barcode = ? or barcode.barcode = ? ORDER BY items_matching.point DESC",[barcode,new_barcode], function (err, result){
	  if (err) {
		callback(err,null);
	  }
	  else{
	  	callback(null,result);
	  }
	  
	  ;
	})
	connection.end()	
}

exports.queryItemOpinion = function(type,id,callback){
	if (type == 'lipstick'){
		var query = "select * from opinion_score_lips where item_id = ?"
	}
	else if (type == "skin protection"){
		var query = "select * from opinion_score_skins where item_id = ?"	
	}
	// return callback(null,table_name);
	var mysql = require('mysql')
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '',
	  database : 'cosmetics',
	});

	connection.connect()

	connection.query(query,[id], function (err, result){
	  if (err) {
		callback(err,null);
	  }
	  else{
	  	callback(null,result);
	  }
	  
	  ;
	})
	connection.end()	
}

exports.queryItemComments = function(item_id,item_type,feature,kind,callback){
	if (item_type == "lipstick"){
		console.log("quet in lipstick")
		if (kind == "positive"){
			var query = "select * from comments inner join opinion_lip on comments.comment_id = opinion_lip.comment_id where comments.item_id = "+item_id+" and "+feature+" > 0";	
		}else{
			var query = "select * from comments inner join opinion_lip on comments.comment_id = opinion_lip.comment_id where comments.item_id = "+item_id+" and "+feature+" < 0";	
		}
		
	}
	else{
		console.log("quet in skin-protection")
		if (kind == "positive"){
			var query = "select * from comments inner join opinion_skin on comments.comment_id = opinion_skin.comment_id where comments.item_id = "+item_id+" and "+feature+" > 0";	
		}else{
			var query = "select * from comments inner join opinion_skin on comments.comment_id = opinion_skin.comment_id where comments.item_id = "+item_id+" and "+feature+" < 0";	
		}
		
	}
	
	var mysql = require('mysql')
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '',
	  database : 'cosmetics',
	});

	connection.connect()
	console.log(query)
	connection.query(query,[item_id,feature], function (err, result){
	  if (err) {
		callback(err,null);
	  }
	  else{
	  	callback(null,result);
	  }
	  
	})
	connection.end()	
	
}

exports.queryItemDetails = function(barcode){

	return new Promise( (resolve,reject)=>{
		let new_barcode = barcode
		console.log(barcode)

		for (let i = 0 ; i < new_barcode.length ; i++){
			if (barcode[i] == "0"){
				new_barcode = new_barcode.substr(1,barcode.length)
			}
			else{
				break
			}
		}
		console.log("upc : "+new_barcode)
		var mysql = require('mysql')
		var connection = mysql.createConnection({
		  host     : 'localhost',
		  user     : 'root',
		  password : '',
		  database : 'cosmetics',
		});

		connection.connect()
		connection.query("select * from barcode where barcode = ? or barcode = ?",[barcode,new_barcode], function (err, result){
		  if(result){
		  	resolve(result[0])
		  }
		  if(err){
		  	reject(err)
		  }
		  
		})
		connection.end()
	})
}


