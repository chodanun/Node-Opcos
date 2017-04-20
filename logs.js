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

exports.fetches = (uid)=>{
	return new Promise ( (resolve, reject)=>{
		var mysql = require('mysql')
		var connection = mysql.createConnection({
		  host     : 'localhost',
		  user     : 'root',
		  password : '',
		  database : 'cosmetics',
		})
		connection.connect()
		connection.query("select item_logs.id,item_logs.item_id,item_logs.time_stamp, items.name from item_logs inner join items on  items.item_id = item_logs.item_id where uid = ? order by item_logs.time_stamp DESC",[uid], function (err, result){
			  if (err) {
				reject(err)
			  }
			  else{
			  	if (result.length > 10){
			  		resolve(result.slice(0, 10))	
			  	}else{
			  		resolve(result)	
			  	}
			  }
		})
		connection.end()
	})
}