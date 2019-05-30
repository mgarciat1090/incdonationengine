var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


var mongoDB = 'mongodb://127.0.0.1/incdonations';

var DBConnector = function(){};

DBConnector.prototype.getConnection = function(){
	mongoose.connect(mongoDB);
	mongoose.Promise = global.Promise;

	let db = mongoose.connection;
	db.on('error',console.error.bind(console,'MongoDB connection error: '));
}

DBConnector.prototype.generateSchema = function(schemaBody){
	//objectSchemaBody = Object.assign(schemaBody,{_id:ObjectId})
	return new Schema(schemaBody);
}

DBConnector.prototype.generateModel = function(collection,schema){
	return mongoose.model(collection,schema);
}


module.exports = new DBConnector();