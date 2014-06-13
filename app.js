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
var endpoints = require("./server/endpoints")(models);

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


app.get("/api/images/list", api.list);
app.get("/api/images/tags", imagesTags.list);
app.get("/api/tags", endpoints.tagGet);
app.get("/api/tags/:id", endpoints.tagIdGet);
app.get("/api/cards", endpoints.cardGet);
app.get("/api/cards/:id", endpoints.cardIdGet);
app.get("/api/images", endpoints.imageGet);
app.get("/api/images/:id", endpoints.imageIdGet);
app.get("/api/messages", endpoints.messageGet);
app.get("/api/messages/:id", endpoints.messageIdGet);

app.post("/api/messages", endpoints.messagePost);
app.post("/api/images", endpoints.imagePost);
app.post("/api/cards", endpoints.cardPost);
app.post("/api/tags", endpoints.tagPost);
app.post("/hello", helloName);

app.listen(8080, function() {
  console.log("Application started on port 8080!");
});