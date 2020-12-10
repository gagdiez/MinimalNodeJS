var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');

var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Account = require('./models/account');

var nunjucks = require('nunjucks')  // View Engine
var routes = require('./routes/index');  // Routes handling

// Create app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
nunjucks.configure('views', {autoescape:true, express:app});
app.set('view engine', 'html');

// app config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Session + auth
app.use(session({secret: 'keyboard cat', resave: false,
                 saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// to pass messages across routes
app.use(flash());

// Add public folder to separate js and css of the web
app.use(express.static(path.join(__dirname, 'public')));

// handle routes in another file
app.use('/', routes);

// mongoose
mongoose.connect('mongodb://localhost/basic-login',
                 {useNewUrlParser: true, useUnifiedTopology: true});

// catch 404 and forward to error handler
function error404(req, res, next){
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
}

function error_handler(err, req, res, next){
  res.status(err.status || 500);

  error = {}; // By default, we do not leak info to users

  if(app.get('env') === 'development'){
    error = err; // In development we see the stack
  }

  res.render('error', {message: err.message, error: error});
}

app.use(error404);
app.use(error_handler);

// Start server
var port = process.env.PORT || '3000';
var ip = process.env.IP || 'localhost';

function onListen(){
  console.log("Listening on PORT: " + port + " at IP: " + ip);
}

app.listen(port, ip, onListen);
