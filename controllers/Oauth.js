var mongoose = require('mongoose');

/**
 * Models Configuration.
 */
var clientModel = require( __dirname + '/../models/oauth/model/client'),
	tokenModel = require( __dirname + '/../models/oauth/model/token'),
	userModel = require( __dirname + '/../models/User');


/**
 * Dump the database content (for debug).
 */

var dump = function() {
    // Find query.
	clientModel.find(function(err, clients) {

		if (err) {
			return console.error(err);
		}
		console.log('clients', clients);
	});
    
    // Token model find query.
	tokenModel.find(function(err, tokens) {

		if (err) {
			return console.error(err);
		}
		console.log('tokens', tokens);
	});

    // Use model find query.
	userModel.find(function(err, users) {

		if (err) {
			return console.error(err);
		}
		console.log('users', users);
	});
};

/*
 * Get access token.
 * @param {string}: bearerToken
 * @param {Object}: callback
 */
var getAccessToken = function(bearerToken, callback) {
    // findOne query.
	tokenModel.findOne({
		accessToken: bearerToken
	}, callback);
};

/**
 * Get client.
 * @param {string}: clientId
 * @param {string}: clientSecret
 * @param {Object}: callback
 */
var getClient = function(clientId, clientSecret, callback) {
    // client model findOne query.
	clientModel.findOne({
		clientId: clientId,
		clientSecret: clientSecret
	}, callback);
};

/**
 * Grant type allowed.
 * @param {string} clientId
 * @param {string} granttype
 * @param {Object} callback
 */

var grantTypeAllowed = function(clientId, grantType, callback) {
    // callback.
	callback(false, grantType === "password");
};

/**
 * Save Access Token.
 * @param {string}: accessToken
 * @param {string}: clientId
 * @param {string}: expires
 * @param {Object}: user
 * @param {Object}: callback
 */
var saveAccessToken = function(accessToken, clientId, expires, user, callback) {

	var token = new tokenModel({
		accessToken: accessToken,
		expires: expires,
		clientId: clientId,
		user: user
	});

	token.save(callback);
};

/*
 * Get user.
 * @param {string}: username
 * @param {string}: password
 * @param {Object}: callback
 */
var getUser = function(username, password, callback) {

	userModel.findOne({
		username: username,
		password: password
	}, callback);
};

/**
 * Export model definition object.
 */
module.exports = {
	getAccessToken: getAccessToken,
	getClient: getClient,
	grantTypeAllowed: grantTypeAllowed,
	saveAccessToken: saveAccessToken,
	getUser: getUser
};
