var dbConnector = require('../../common/dbConnector');
var donationModel = require('../../models/donationModel');

/* DB Connect */
dbConnector.getConnection();

const DonationSchema = dbConnector.generateSchema(donationModel);
var DonationModel = dbConnector.generateModel('DonationModel',DonationSchema);


/* Controller */
var DonationsController = function(){};
var handleError = function(payload,res){
	if(payload && typeof payload.code !== 'undefined'){
		res.status(payload.code).send(JSON.stringify(payload));
	}else{
		res.status(500).send(JSON.stringify({ error : 'Internal Server Error',payload}));
	}
}


DonationsController.prototype.getDonation = function(req,res){
	DonationModel.findById(req.params.id,function(err,donation){
		if(typeof err != 'undefined' && err){
			return handleError({
				message:'Internal DB Error. Donation not found',
				code:404,
				date: new Date()
			},res);
		}else{
			res.header('Content-Type','text/html');
			res.status(200).send(JSON.stringify(donation));
		}
	})
}


DonationsController.prototype.getDonations = function(req,res){
	console.log("enters");
	DonationModel.find(function(err,donations){
		if(typeof err != 'undefined' && err){
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

DonationsController.prototype.saveDonation = function(req,res){
	let body = req.body;
	if( typeof body.amount === 'undefined' || typeof body.comment === 'undefined' || typeof body.author === 'undefined'){
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
			if(typeof err != 'undefined' && err){
				return handleError(err,res);
			}else{
				res.header('Content-Type','text/html');
				res.status(200).send(JSON.stringify(savedInfo));
			}
		});
	}
}

DonationsController.prototype.updateDonation = function(req,res){
	let body = req.body;
	let upsertDonation = {
		author: body.author,
		date: body.date,
		amount: body.amount,
		comment: body.comment
	}
	DonationModel.findByIdAndUpdate({'_id':req.params.id},upsertDonation,function(err,donations){
		if(typeof err != 'undefined' && err){
			return handleError({
				message:'Internal DB Error.',
				code:500,
				date: new Date()
			},res);
		}else{
			res.header('Content-Type','text/html');
			res.status(200).send(JSON.stringify(upsertDonation));
		}
	})
}

DonationsController.prototype.patchDonation = function(req,res){
	let body = req.body;
	let upsertDonation = {
		author: body.author,
		date: body.date,
		amount: body.amount,
		comment: body.comment
	}

	for(var propertyName in upsertDonation){
		if(upsertDonation[propertyName] === null || upsertDonation[propertyName] === undefined){
			delete upsertDonation[propertyName];
		}
	}

	DonationModel.findById(req.params.id,function(err,donation){
		if(typeof err != 'undefined' && err){
			return handleError({
				message:'Internal DB Error. Donation not found',
				code:404,
				date: new Date()
			},res);
		}else{
			DonationModel.findByIdAndUpdate({'_id':req.params.id},upsertDonation,function(err,donations){
				if(typeof err != 'undefined' && err){
					return handleError({
						message:'Internal DB Error. Could not perform patch',
						code:500,
						date: new Date()
					},res);
				}else{
					res.header('Content-Type','text/html');
					res.status(200).send(JSON.stringify(upsertDonation));
				}
			});
		}
	})
}




module.exports = new DonationsController();