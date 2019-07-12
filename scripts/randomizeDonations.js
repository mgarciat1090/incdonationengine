var _ = require('lodash');
var Promise = require('bluebird')
var dbConnector = require('../app/common/dbConnector');
var prompt = require('prompt');
var donationModel = require('../app/models/donationModel');

// var logging = require('../app/logging/index');
// logging.initialize({
// 	appenders:[
// 		{ type: 'console' }
// 	]
// });
// var logger = logging.createLogger('_randomizeDonations');

//generate connection
dbConnector.getConnection();
const DonationSchema = dbConnector.generateSchema(donationModel);
const DonationModel = dbConnector.generateModel('DonationModel',DonationSchema);


let RandomizeDonations = {};

let names = ['Juan','Jose','Alejandro','Rodrigo','Pedro'];
let lastNames = ['Perez','Lopez','Domínguez','Garcia','Galindo'];

var generateDonations = function(){
	var initialMsg = 'This script generates random donations';

	//logger.info(initializeMsg);

	var schema = {
		properties : {
			donation : {
				type : 'string',
				description: 'Enter the donations amount',
				message: 'You must enter a donation number',
				required: true
			}
		}
	};

	prompt.start();
	prompt.get(schema,function(err,result){
		if(err){
			console.log(err);
			//logger.error(err);
			process.exit(0);
			return;
		}

		console.log("Generating new donations");

		new Promise(function(resolve,reject){
			for(i = 0; i < result.donation; i++){
				let donationInstance = new DonationModel({
					author: names[Math.floor((Math.random()*names.length))] + ' ' + lastNames[Math.floor((Math.random()*lastNames.length))],
					date: new Date(),
					amount: Math.round((Math.random()*1000)),
					comment: 'Comentario ' + i,
				});

				donationInstance.save(function(err,savedInfo){
					if(typeof err != 'undefined' && err){
						console.log('Error adding donation instance:' + err);
					}else{
						console.log('Donation added: ' + donationInstance._id);
						console.log('Donation added: ' + donationInstance.author);
					}
					resolve();
				})
			}
		});
	});
};


generateDonations();