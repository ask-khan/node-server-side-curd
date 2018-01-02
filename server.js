const express = require('express');

const app = express();

// Add Configuration File.
const config = require( __dirname + '/config.js');

// Add Constant File.
const message = require( __dirname + '/constant.js' );

// Add Http File.
const Http = require( __dirname + '/http.js' );

// Add Models
const User = require( __dirname + '/models/User.js' );

// Add Database Configuration.
const db = require( __dirname + '/db.js' );

// Add Controllers.
const userControllers = require( __dirname + '/controllers/user.js' );

// NodeJS Modules.
const bodyParser = require('body-parser');
var session = require('express-session');
const logger = require('winston');
const mongoose = require('mongoose');
var oauthserver = require('oauth2-server');
var cookieParser = require('cookie-parser');

// Use Cookie Parser.
app.use(cookieParser());

// Use Sessions.
app.use(session({secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }}));

// Parse Application/ x-www-form-urlencoded.
app.use( bodyParser.urlencoded({ extended: true }) );

// Parse Application/Json.
app.use( bodyParser.json() );

//app.disable('etag');

app.oauth = oauthserver({
  model: require('./controllers/Oauth.js'),
	grants: ['password'],
	debug: true
});

app.all('/oauth/token', app.oauth.grant());


// User Controller Initization.
var userControllersObject = new userControllers( app, message, Http, logger, db, User);

// User Created.
userControllersObject.UserCreated( app, message, Http, logger, db, User );

// User Deleted.
userControllersObject.UserDeleted( app, message, Http, logger, db, User );

// Get User Information.
userControllersObject.UserGetInfo( app, message, Http, logger, db, User );

// Update User Information.
userControllersObject.UserUpdateInfo( app, message, Http, logger, db, User );

// User Login Information.
userControllersObject.userLoginInfo( app, message, Http, logger, db, User );

// User Logout Information.
userControllersObject.userLogoutInfo( app, message, Http, logger, db, User );


app.use(app.oauth.errorHandler());

app.listen( config.mode.PORT , () => 	logger.info('listening port: ' + config.mode.PORT ));