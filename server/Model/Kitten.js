module.exports = function(mongoose) {
	var Kitten = mongoose.Schema({
	  name: String
	});

	return mongoose.model("Kitten", Kitten);
};
