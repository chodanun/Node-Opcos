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