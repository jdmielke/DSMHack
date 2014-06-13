var express = require('express'),
  nodemailer = require("nodemailer"),
  passport = require('passport'), 
  LocalStrategy = require('passport-local').Strategy,
  mongoose = require("mongoose");

var format = require('util').format;

var app = express();
var helloName = require("./server/helloName");
var api = require("./server/api");

mongoose.connect("mongodb://localhost/chrysalis");
var db = mongoose.connection;

var models = require("./server/model/models")(mongoose);
var endpoints = require("./server/endpoints")(models);
var AdminModel = require("./server/model/Admin")(mongoose);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  AdminModel.findById(id,function(err,user){
    done(err,user);
  });
});
passport.use(new LocalStrategy(
  function(username, password, done) {
    AdminModel.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password != password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

// configure Express
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.engine('ejs', require('ejs-locals'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'ash ketchum' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(__dirname + '/chrysalis-public/www'));
  app.use(express.logger());
});

app.post('/admin/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      req.session.messages =  [info.message];
      return res.redirect('/admin.html')
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/index.html#/admin/messages');
    });
  })(req, res, next);
});

app.get('admin/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.get('/unsecure', function(req, res){
  return res.send("TEST");
});
app.get('/secure', ensureAuthenticated, function(req, res){
  return res.send("SECURE");
});


app.get("/api/images/list", api.list);
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
app.get("/api/messages", api.messages);

app.listen(8080, function() {
  console.log("Application started on port 8080!");
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}