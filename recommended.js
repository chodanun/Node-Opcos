exports.loadRecItems = function(uid){
	return new Promise ( (resolve, reject)=>{
		var mysql = require('mysql')
		var connection = mysql.createConnection({
		  host     : 'localhost',
		  user     : 'root',
		  password : '',
		  database : 'cosmetics'
		});
		connection.connect()
		// find (type,brand) from logs limit 5 pairs
		connection.query("select distinct items.type,items.brand from item_logs left join items on  items.item_id = item_logs.item_id where uid = ? order by item_logs.time_stamp DESC LIMIT 5",[uid], function (err, result){
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