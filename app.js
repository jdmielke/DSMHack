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
      return res.redirect('/login')
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/');
    });
  })(req, res, next);
});

app.get('/unsecure', function(req, res){
  return res.send("TEST");
});
app.get('/secure', ensureAuthenticated, function(req, res){
  return res.send("SECURE");
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

app.post("/hello", helloName);

app.listen(8080, function() {
  console.log("Application started on port 8080!");
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}