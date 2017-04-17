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
	var mysql = require('mysql')
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '',
	  database : 'cosmetics',
	});

	selectUid(json,connection).then(function(data){
		console.log(data)
		return data
	}).then( (d)=> console.log(d))

	// connection.query("insert into users (uid_fb,email,name,birthday,img) values (?,?,?,?,?)",[uid_fb,email,name,birthday,img], function (err, result){
	// 	callback(err,null);
	// 	callback(null,result);
	// 	if ()
	//   	connection.query("select uid from users where uid_fb = ?",[uid_fb], function (err2,result2){
	//   		console.log(result2)
	//   		console.log(err2)
	//   		callback(null,result2)
	//   		console.log(result2)
	//   		if (result2){
	//   			console.log(result2)
	//   			callback(null,result2)
	//   		}
	//   	})
	// })
	
}

selectUid = function(json,connection){
	return new Promise( function(resolve, reject){
		let uid_fb = json.id
		connection.connect()
		connection.query("select uid from users where uid_fb = ?",[uid_fb], function (err,result){
			if (err){
				reject(err)
			}
			if(result){
				if (result.length != 0){
					// already had an account
					var uid = result[0].uid
					resolve(uid)
				}else{
					let name = json.name
					let email = json.email
					let birthday = json.birthday
					let img = json.picture.data.url
					birthday = birthday.split("/").reverse().join("-");
					// connection.connect()
					connection.query("insert into users (uid_fb,email,name,birthday,img) values (?,?,?,?,?)",[uid_fb,email,name,birthday,img], function (err2, result2){
						if (err2){
							console.log(err2)
						}
						if (result2){
							// console.log(result2)
							connection.query("select uid from users where uid_fb = ?",[uid_fb], function (err,result){
								if (err){
									reject(err)
								}
								if(result){
									if (result.length != 0){
										// already had an account
										var uid = result[0].uid
										resolve(uid)
									}
								}
							})
						}
					})
	  			}	
			}
	  	})
	})	
}