module.exports = function(mongoose) {
	var tag = mongoose.Schema({
		name: String
	});
	
	var image = mongoose.Schema({
		name: String,
		extension: String,
		tags: [tag],
		artist: String,
		age: Number,
		orientation: String
	});

	var message = mongoose.Schema({
		text: String,
		tags: [tag],
		published: Boolean
	});
	var card = mongoose.Schema({
	  image: Object,
	  messageText: String,
	  from: String,
	  fromEmail: String,
	  to: String,
	  toEmail: String,
	  amount: Number,
	  uuid: String,
	  status: String
	});


	var models = {
		tag : mongoose.model("tag", tag),
		image : mongoose.model("image", image),
		message : mongoose.model("message", message),
		card: mongoose.model("card", card)
	};

	return models;
};
