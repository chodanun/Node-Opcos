var cosmetics = [
  {
    "id": 1,
    "tittle": "รายงานสำหรับผู้บริหารยุทธศาสตร์วิจัยด้านการพัฒนาเศรษฐกิจจากฐานความหลากหลายทางชีวภาพของประเทศไทยปี 2559-2563",
    "author": "นภาวรรณ นพรัตนราภรณ์ และคณะนักวิจัย, กรุงเทพฯ : สำนักงานคณะกรรมการวิจัยแห่งชาติ, 2559",
    "image": "http://lib.ku.ac.th/web/images/stories/news_book/Poenkeo/01-2017/research%20strategy%20on%20biodiversity-base.png"
  },
  {
    "id": 2,
    "tittle": "พระราชพงศาวดารกรุงรัตนโกสินทร์ รัชกาลที่ 5",
    "author": "สมเด็จฯ กรมพระยาดำรงราชานุภาพ, กรุงเทพฯ : ไทยควอลิตี้บุ๊คส์ (2006), 2559",
    "image": "http://lib.ku.ac.th/web/images/stories/news_book/Poenkeo/01-2017/king%20rama5%20antecedence.png"
  },
  {
    "id": 3,
    "tittle": "สแกนกิน",
    "author": "เขียน : ทิม สเป็กเตอร์ ; แปล : ธิดากานต์ รุจิพัฒนกุล, กรุงเทพฯ : อมรินทร์เฮลท์, 2559",
    "image": "http://lib.ku.ac.th/web/images/stories/news_book/Poenkeo/01-2017/diet%20myth.png"
  },
  {
    "id": 4,
    "tittle": "The secret of volume by price",
    "author": "จุติ เสนางคนิกร, กรุงเทพฯ : ซุปเปอร์เทรดเดอร์ พับลิชชิ่ง จำกัด, 2559",
    "image": "http://lib.ku.ac.th/web/images/stories/news_book/Poenkeo/01-2017/CB%20trader.png"
  },
  {
    "id": 5,
    "tittle": "แบรนด์ที่ใช่ ขายอะไรก็มีคนซื้อ",
    "author": "ดลชัย บุณยะรัตเวช เขียน ; อรณัญช์ สุขเกษม วาดภาพประกอบ, กรุงเทพฯ : อมรินทร์ฮาวทู, 2559",
    "image": "http://lib.ku.ac.th/web/images/stories/news_book/Poenkeo/01-2017/brand%20engine.png"
  }
]

exports.searchAll = function() {
	return cosmetics;
};

exports.searchByName = function(name) {
	if (name == "_all_"){
		return cosmetics;
	}
	else{
		return [];	
	}
};

exports.queryItems = function(name,callback){
	var mysql = require('mysql')
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '',
	  database : 'cosmetics'
	});

	connection.connect()

	connection.query("SELECT brand FROM `barcode` WHERE barcode_id = 1", function (err, result){
	  if (err) {
		callback(err,null);
	  }
	  else{
	  	callback(null,result[0].brand);
	  }
	})
	connection.end()	
}

exports.queryItemsBarcode = function(barcode,callback){
	var mysql = require('mysql')
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '',
	  database : 'cosmetics',
	});

	connection.connect()

	connection.query("select items.type,items.item_id,items.name,items.description,items.img,items.brand,items_matching.point, score,reviews  from ((items inner join items_matching on items.item_id = items_matching.item_id) inner join barcode on barcode.id = items_matching.barcode_id) inner join opinion_score_calculation on items.item_id = opinion_score_calculation.item_id where barcode.barcode = ? ORDER BY items_matching.point DESC",[barcode], function (err, result){
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
	  
	  ;
	})
	connection.end()	
	
}
