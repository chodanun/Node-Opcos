exports.stores = (uid,item_id)=>{
	return new Promise ( (resolve, reject)=>{
		console.log(uid,item_id)
		var mysql = require('mysql')
		var connection = mysql.createConnection({
		  host     : 'localhost',
		  user     : 'root',
		  password : '',
		  database : 'cosmetics',
		})
		connection.connect()
		connection.query("insert into item_logs (uid,item_id) values (?,?)",[uid,item_id], function (err, result){
			  if (err) {
				reject(err)
			  }
			  else{
			  	resolve(result)
			  }
		})
		connection.end()
	})
}

// exports.checkToken = (token) => {
// 	return new Promise ( (resolve, reject)=>{
// 		var mysql = require('mysql')
// 		var connection = mysql.createConnection({
// 		  host     : 'localhost',
// 		  user     : 'root',
// 		  password : '',
// 		  database : 'cosmetics',
// 		})
// 		connection.connect()
// 		connection.query("select isLogin,token,uid from token where token = ?",[token], function (err, result){
// 			  if (err) {
// 				reject(err)
// 			  }
// 			  else{
// 			  	resolve(result)
// 			  }
// 		})
// 	})
// 	connection.end()
// }