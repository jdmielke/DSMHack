module.exports = function(mongoose) {
	var Admin = mongoose.Schema({
	  username: String,
	  password: String,
	  email: String
	});

	return mongoose.model("Admin", Admin);
};
