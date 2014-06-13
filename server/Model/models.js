module.exports = function(mongoose) {
	var tag = mongoose.Schema({
		name: String
	});
	
	var image = mongoose.Schema({
		name: String,
		data: String,
		tags: [tag],
		artist: String,
		age: Number
	});

	var message = mongoose.Schema({
		text: String,
		tags: [tag]
	});


	var models = {
		tag : mongoose.model("tag", tag),
		image : mongoose.model("image", image),
		message : mongoose.model("message", message)
	};

	return models;
};
