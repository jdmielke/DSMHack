var express = require('express'),
  nodemailer = require("nodemailer");

var MongoClient = require('mongodb').MongoClient,
	format = require('util').format;

var db = MongoClient.connect('mongodb://127.0.0.1:27017/chrysalis', function(err, db) {
	if(err)
		throw err;
	console.log("connected to the mongoDB !");
	myCollection = db.collection('images');
});

var app = express();

// configure Express
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.engine('ejs', require('ejs-locals'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'ash ketchum' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/chrysalis-public/www'));
  app.use(express.logger());
});

app.get('/images', function(req, res){
  var cursor = myCollection.find({"name":"blah"});
  cursor.each(function(err, doc) {
	if(err)
		throw err;
	if(doc==null)
		return;

	console.log("document find:");
	console.log(doc.name);
  });
});


app.get("/test", function(req, res){
	var mongoose = require("mongoose");

	mongoose.connect("mongodb://localhost/chrysalis");
	var db = mongoose.connection;


	db.on("error", console.error.bind(console, "connection error:"));
	db.once("open", function callback (data) {
		console.log("open");
		console.log(data);
	});

	var kittySchema = mongoose.Schema({
		name: String
	});

	var Kitten = mongoose.model("testdata", kittySchema);
	var lilBub = new Kitten({ name: "Lil Bub" });

	lilBub.save(function(err, lilBub){
		if (err) return console.error(err);

		Kitten.find("", function(err, data){
			console.log("Idk");
			if (err) return console.error(err);
			console.log(data);
			db.close();
		});		
	});

});

app.listen(8080, function() {
  console.log("Application started on port 8080!");
});