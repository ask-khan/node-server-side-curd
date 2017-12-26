const mongoose = require('mongoose');
const config = require(  __dirname + '/config.js');

// Mongoose Connection.
mongoose.connect(config.dbConfig.url);

module.exports = mongoose;