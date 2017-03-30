var cosmetics = [
	{
		"id": 1,
		"name": "W7 Lemon Meringue Anti Redness Eyelid Primer 2 g",
		"description": "W7 Lemon Meringue Anti Redness Eyelid Primer 2g. Tired Of Red Eyelids & Short-Lasting Eye Shadow Looks. Refresh Your Eyes Instantly. A Long Lasting, Yellow Primer With A Smooth & Creamy Texture To Combat Your Eyelid Problems. RRP £5.95.",
		"img":"http://rcdn-4.fishpond.co.nz/0123/636/247/260404920/6.jpeg",
		"brand":"W7",
		"barcode": "5060406147049"
	},
	
	{
		"id": 2,
		"name": "Maybelline Instant Anti-Age The Eraser Eye Concealer Light 6 ml",
		"description": "Maybelline Instant Anti-Age The Eraser Eye Concealer Light 6 ml",
		"img":"http://rcdn-3.fishpond.co.nz/0056/040/975/160260778/6.jpeg",
		"brand":"Maybelline",
		"barcode": "3600530733446"
	},

	{
		"id": 3,
		"name": "Beyondfashion 15 Colour Face Concealer Camouflage Palette Makeup W195",
		"description": "Package included: 1 Set of 15-Colour Concealer",
		"img":"http://rcdn-2.fishpond.co.nz/0036/598/500/159830731/6.jpeg",
		"brand":"Beyondfashion",
		"barcode": "6924561893120"
	},

	{
		"id": 4,
		"name": "Malloom Fashion 15 Colours Makeup Concealer Contour Palette + Makeup Brush",
		"description": "This 15 colour Concealer & Multi-Function Oblique Head Powder Brush is cost-effective and practical, which is an optimal choice. Made of high quality ingredients, this blemish cover can decorate the spot and blackhead immediately. What's more, it can decrease the pimples and dark circles in your face. Also, you will feel gentle on delicate facial area while using it. The multi-function oblique head powder brush adopts high-quality material, which is soft to your skin. It can spread powder evenly and perfectly. You can achieve natural makeup with the concealer and oblique head powder.Just come to buy it.",
		"img":"http://rcdn-4.fishpond.co.nz/0090/993/289/229467741/6.jpeg",
		"brand":"Malloom®",
		"barcode": "0643019093924"
	},

	{
		"id": 5,
		"name": "W7 Banana Dreams Loose Face Powder",
		"description": "Highlight the contours of your face with W7 Banana Dreams Loose Face Powder. The versatile Banana shade suits a range of skin tones as it softly and subtly colour corrects surface redness and pink undertones, as well as neutralises blue under eye circles.",
		"img":"http://rcdn-4.fishpond.co.nz/0069/862/180/198892891/6.jpeg",
		"brand":"W7",
		"barcode": "5060406141931"
	},

	{
		"id": 6,
		"name": "Eleacc 22 Pieces Make up Brushes Set Soft Powder Kabuki Cosmetic Set Kit Eyeshadow Foundation Powder",
		"description": "Package included: 1 Set of 15-Colour Concealer",
		"img":"http://rcdn-3.fishpond.co.nz/0077/485/409/213917185/6.jpeg",
		"brand":"Eleacc",
		"barcode": "0601706961987"
	},

	{
		"id": 7,
		"name": "E.l.f. Moisturising Lipstick Ravishing Rose, 5ml",
		"description": "The velvety, satin texture glides on lips with vibrant colour and luminous shine. Enriched with Shea and Vitamins A, C, & E to nourish and hydrate the lips. The rich, creamy formula seals in moisture for long-lasting wear and comfort.",
		"img":"http://rcdn-3.fishpond.co.nz/0068/887/364/196321392/6.jpeg",
		"brand":"e.l.f. Cosmetics",
		"barcode": "0609332826380"
	},

	{
		"id": 8,
		"name": "Olay Anti-Wrinkle Deep Wrinkle Treatment 30ml",
		"description": "New Olay Anti-Wrinkle Deep Wrinkle Treatment works by combining a proven-to-work formula composed of intense moisturisation, vitamins and anti-oxidants, with a precision applicator, to deliver anti-ageing benefits exactly where you need them:High levels of Olay Moisturiser to provide a plumping effect to reduce the appearance of wrinkles.Rich in Vitamins (B3, B5 and E), the formula smoothes out the appearance of fine lines and wrinkles, for younger-looking skin.With Anti-oxidants to help protect skin from free radicals",
		"img":"http://rcdn-4.fishpond.co.nz/0039/642/945/158508179/6.jpeg",
		"brand":"Olay",
		"barcode": "5011321959798"
	},

	{
		"id": 9,
		"name": "470ml Spa Size Argan Oil Intensive Beauty Cream",
		"description": "Ultra-hydrating, never greasy concentrated oil and herbal blend helps reduce the appearance of wrinkles while firming and tightening problem areas. Illuminates your complexion with rich plant oils. Huge 470ml value! Lightly scented.",
		"img":"http://rcdn-4.fishpond.co.nz/0054/203/278/159135940/6.jpeg",
		"brand":"Advanced Clinicals",
		"barcode": "0819265006319"
	}

];

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
	  
	  ;
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

	connection.query("select items.type,items.item_id,items.name,items.description,items.img,items.brand,items_matching.point from (items inner join items_matching on items.item_id = items_matching.item_id) inner join barcode on barcode.id = items_matching.barcode_id where barcode.barcode = ? ORDER BY items_matching.point DESC",[barcode], function (err, result){
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