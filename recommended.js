exports.loadItemsPairs = function(uid,distinctPairs=5){
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
		connection.query("select distinct items.type,items.brand from item_logs left join items on  items.item_id = item_logs.item_id where uid = ? order by item_logs.time_stamp DESC LIMIT ?",[uid,distinctPairs], function (err, result){
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

exports.loadRecItems = function(pairs,numPerPairs=10){
	return new Promise ( (resolve, reject) =>{
		var arr_sql = []
		pairs.map( (item)=> {
			let q = `( select * from items inner join opinion_score_calculation on items.item_id=opinion_score_calculation.item_id where (items.type="${item.type}" and items.brand="${item.brand}") order by score desc limit ${numPerPairs})`
			arr_sql.push(q)
		})
		
		var sql = arr_sql.join(" union ")
		var mysql = require('mysql')
		var connection = mysql.createConnection({
		  host     : 'localhost',
		  user     : 'root',
		  password : '',
		  database : 'cosmetics'
		});
		connection.connect()
		connection.query(sql, function (err, result){
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