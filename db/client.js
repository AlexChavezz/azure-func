const { MongoClient } = require("mongodb");

module.exports = new MongoClient(process.env['CONNECTION_STRING']);