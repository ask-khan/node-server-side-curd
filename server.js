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
const logger = require('winston');
const mongoose = require('mongoose');

// Parse Application/ x-www-form-urlencoded.
app.use( bodyParser.urlencoded({ extended: false }) );

// Parse Application/Json.
app.use( bodyParser.json() );

app.disable('etag');

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


app.listen( config.mode.PORT , () => 	logger.info('listening port: ' + config.mode.PORT ));