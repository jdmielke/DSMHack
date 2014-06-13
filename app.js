var express = require('express'),
  nodemailer = require("nodemailer");

var format = require('util').format;

var app = express();
var helloName = require("./server/helloName");

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/chrysalis");
var db = mongoose.connection;

var KittenModel = require("./server/model/Kitten")(mongoose);

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

app.get("/kittens", function(req, res){
  KittenModel.find("", function(err, data){
    if (err) return console.error(err);
    res.write(JSON.stringify(data));
    res.end();
  }); 
});

app.post("/kitten", function(req, res){
  var newKitten = new KittenModel({
    "name" : req.body.name
  });
  newKitten.save(function (err) {
    if (err) {
      return console.log(err);
    }
  });
  return res.send(newKitten);
});

app.post("/hello", helloName);

app.listen(8080, function() {
  console.log("Application started on port 8080!");
});