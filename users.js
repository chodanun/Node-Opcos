var users = [
	{
		"id": 1,
		"username": "user1",
		"password": "user1Password"
	},
	
	{
		"id": 2,
		"username": "user2",
		"password": "user2Password"
	}
];

exports.findAll = function() {
	return users;
};

exports.findById = function(id) {
	for (var i = 0 ; i < users.length ; i++) {
		if ( users[i].id == id ) 
			return users[i];
	}
};

exports.auth = function(json,callback){
	let uid_fb = json.id
	let email = json.email
	let name = json.name
	let birthday = json.birthday
	let img = json.picture.data.url
	
	birthday = birthday.split("/").reverse().join("-");
	console.log(email,name,birthday,img)
	// callback(null,{status_user:true})

	var mysql = require('mysql')
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '',
	  database : 'cosmetics',
	});

	connection.connect()

	connection.query("insert into users (uid_fb,email,name,birthday,img) values (?,?,?,?,?)",[uid_fb,email,name,birthday,img], function (err, result){
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

// exports.queryItemsBarcode = function(barcode,callback){
// 	var mysql = require('mysql')
// 	var connection = mysql.createConnection({
// 	  host     : 'localhost',
// 	  user     : 'root',
// 	  password : '',
// 	  database : 'cosmetics',
// 	});

// 	connection.connect()

// 	connection.query("select items.type,items.item_id,items.name,items.description,items.img,items.brand,items_matching.point, score,reviews  from ((items inner join items_matching on items.item_id = items_matching.item_id) inner join barcode on barcode.id = items_matching.barcode_id) inner join opinion_score_calculation on items.item_id = opinion_score_calculation.item_id where barcode.barcode = ? ORDER BY items_matching.point DESC",[barcode], function (err, result){
// 	  if (err) {
// 		callback(err,null);
// 	  }
// 	  else{
// 	  	callback(null,result);
// 	  }
	  
// 	  ;
// 	})
// 	connection.end()	
// }