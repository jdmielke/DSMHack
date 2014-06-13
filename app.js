var express = require('express'),
  nodemailer = require("nodemailer");

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


/*app.get('/', function(req, res){
  res.render('index', {});
});*/

app.listen(8080, function() {
  console.log("Application started on port 8080!");
});