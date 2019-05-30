var dbConnector = require('../../common/dbConnector');

/* DB Connect */
dbConnector.getConnection();
const DonationSchema = dbConnector.generateSchema({
	author: 	String,
	date: 		Date,
	amount: 	Number,
	comment: 	String
});
var DonationModel = dbConnector.generateModel('DonationModel',DonationSchema);


/* Controller */
var DonationsController = function(){};
let handleError = function(payload,res){
	if(payload && typeof payload.code !== 'undefined'){
		res.status(payload.code).send(JSON.stringify(payload));
	}else{
		res.status(500).send(JSON.stringify({ error : 'Internal Server Error',payload}));
	}
}


DonationsController.prototype.getDonations = function(req,res){
	DonationModel.find(function(err,donations){
		if(err){
			return handleError({
				message:'Internal DB Error.',
				code:500,
				date: new Date()
			},res);
		}else{
			res.header('Content-Type','text/html');
			res.status(200).send(JSON.stringify(donations));
		}
	})
}

DonationsController.prototype.saveDonations = function(req,res){
	let body = req.body;
	if( !body.amount || !body.comment || !body.author){
		handleError({
			message:'Bad request: no amount, author or comment',
			code:400,
			date: new Date()
		},res);
	}else{
		let donationInstance = new DonationModel({
			author: body.author,
			date: new Date(),
			amount: body.amount,
			comment: body.comment,
		});

		donationInstance.save(function(err,savedInfo){
			if(err){
				return handleError(err,res);
			}else{
				res.header('Content-Type','text/html');
				res.status(200).send(JSON.stringify(savedInfo));
			}
		});
	}
}

module.exports = new DonationsController();