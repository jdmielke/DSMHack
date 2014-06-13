var express = require('express'),
  nodemailer = require("nodemailer");

var MongoClient = require('mongodb').MongoClient,
	format = require('util').format;

var app = express();
var helloName = require("./server/helloName");
var api = require("./server/api");

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

app.get("/api/images/list", api.list);

app.post("/hello", helloName);

app.listen(8080, function() {
  console.log("Application started on port 8080!");
});