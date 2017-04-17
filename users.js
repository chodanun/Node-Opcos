
const crypto = require('crypto')

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

	selectUid(json,connection).then((uid) =>{
		crypto.randomBytes(20, (err, buffer) =>{
		  let token = buffer.toString('hex')
		  let isLogin = true
		  // console.log(uid,token,isLogin)
		  insertLogin({uid,token,isLogin},connection).then( (data)=>{
		  	console.log(data)
		  	callback(null,data)
		  })

		})
	})

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

insertLogin = function(json,connection){
	return new Promise( (resolve,reject) =>{
		let token = json.token
		let isLogin = json.isLogin
		let uid = json.uid
		connection.query('insert into token (token,isLogin,uid) values (?,?,?)',[token,isLogin,uid], function (err, result){
			if(result){
				resolve({token,uid})
			}
		})	
	})	
}

exports.checkToken = (token) => {
	return new Promise ( (resolve, reject)=>{
		var mysql = require('mysql')
		var connection = mysql.createConnection({
		  host     : 'localhost',
		  user     : 'root',
		  password : '',
		  database : 'cosmetics',
		})
		connection.connect()
		connection.query("select isLogin,token,uid from token where token = ?",[token], function (err, result){
			  if (err) {
				reject(err)
			  }
			  else{
			  	resolve(result)
			  }
		})
	})
	connection.end()
}

exports.logout = (token) =>{
	return new Promise ( (resolve, reject)=>{
		var mysql = require('mysql')
		var connection = mysql.createConnection({
		  host     : 'localhost',
		  user     : 'root',
		  password : '',
		  database : 'cosmetics',
		})
		connection.connect()
		connection.query("update token set isLogin = 0 where token = ?",[token], function (err, result){
			  if (err) {
				reject(err)
			  }
			  if (result){
			  	resolve({is_logout:true})
			  }
		})
	})
}

exports.getDetails = (uid)=>{
	return new Promise( (resolve,reject) =>{
		var mysql = require('mysql')
		var connection = mysql.createConnection({
		  host     : 'localhost',
		  user     : 'root',
		  password : '',
		  database : 'cosmetics',
		})
		connection.connect()
		connection.query("select uid_fb,name,email,birthday,img from users where uid = ?",[uid], function (err, result){
			  if (err) {
				reject(err)
			  }
			  if (result){
			  	resolve(result)
			  }
		})
	})
}

exports.mapUidFbToUid = (uid_fb)=>{
	return new Promise( (resolve,reject)=>{
		var mysql = require('mysql')
		var connection = mysql.createConnection({
		  host     : 'localhost',
		  user     : 'root',
		  password : '',
		  database : 'cosmetics',
		})
		connection.connect()
		connection.query("select uid from users where uid_fb = ?",[uid_fb], function (err, result){
			  if (err) {
				reject(err)
			  }
			  if (result){
			  	resolve(result)
			  }
		})
	})
}