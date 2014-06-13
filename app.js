var express = require('express'),
  nodemailer = require("nodemailer");

var format = require('util').format;

var app = express();
var helloName = require("./server/helloName");
var api = require("./server/api");
var imagesTags = require("./server/imagesTags");

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/chrysalis");
var db = mongoose.connection;

var models = require("./server/model/models")(mongoose);

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
app.get("/message", function(req, res){
  return models.message.find("", function(err, data){
    if (!err){ 
      return res.send(data)
    }
    else{
       return console.error(err);
    }

  }); 
});

app.get('/message/:id', function (req, res){
  return models.message.findById(req.params.id, function (err, data) {
    if (!err) {
      return res.send(data);
    } else {
      return console.error(err);
    }
  });
});

app.post("/message", function(req, res){
  var newTag = new models.message(req.body);
  newTag.save(function (err) {
    if (err) {
      return console.log(err);
    }
  });
  return res.send(newTag);
});


app.get("/image", function(req, res){
  return models.image.find("", function(err, data){
    if (!err){ 
      return res.send(data)
    }
    else{
       return console.error(err);
    }

  }); 
});

app.get('/image/:id', function (req, res){
  return models.image.findById(req.params.id, function (err, data) {
    if (!err) {
      return res.send(data);
    } else {
      return console.error(err);
    }
  });
});

app.post("/image", function(req, res){
  var newTag = new models.image(req.body);
  newTag.save(function (err) {
    if (err) {
      return console.log(err);
    }
  });
  return res.send(newTag);
});

app.get("/tag", function(req, res){
  return models.tag.find("", function(err, data){
    if (!err){ 
      return res.send(data)
    }
    else{
       return console.error(err);
    }

  }); 
});

app.get('/tag/:id', function (req, res){
  return models.tag.findById(req.params.id, function (err, data) {
    if (!err) {
      return res.send(data);
    } else {
      return console.error(err);
    }
  });
});

app.post("/tag", function(req, res){
  var newTag = new models.tag(req.body);
  newTag.save(function (err) {
    if (err) {
      return console.log(err);
    }
  });
  return res.send(newTag);
});

app.get("/api/images/list", api.list);
app.get("/api/messages", api.messages);
app.get("/api/images/tags", imagesTags.list);

app.post("/hello", helloName);

app.listen(8080, function() {
  console.log("Application started on port 8080!");
});