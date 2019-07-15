var dbConnector = require('../../common/dbConnector');
var causeModel = require('../models/causeModel');

dbConnector.getConnection();

/* DB Connect */
const CauseSchema = dbConnector.generateSchema(causeModel);
var CauseModel = dbConnector.generateModel('CauseModel',CauseSchema);


/* Controller */

var CausesController = function(){};
var handleError = function(payload,res){
	if(payload && typeof payload.code !== 'undefined'){
		res.status(payload.code).send(JSON.stringify(payload));
	}else{
		res.status(500).send(JSON.stringify({ error : 'Internal Server Error',payload}));
	}
}

CausesController.prototype.getCause = function(req,res){
	CauseModel.findById(req.params.id,function(err,cause){
		if(typeof err != 'undefined' && err){
			return handleError({
				message:'Internal DB Error. Cause not found',
				code: 404,
				date: new Date()
			},res);
		}else{
			res.header('Content-Type','text/html');
			res.status(200).send(JSON.stringify(cause));
		}
	})
}


CausesController.prototype.getCauses = function(req,res){
	CauseModel.find(function(err,causes){
		if(typeof err != 'undefined' && err){
			return handleError({
				message:'Internal DB Error.',
				code: 500,
				date: new Date()
			},res);
		}else{
			res.header('Content-Type','text/html');
			res.status(200).send(JSON.stringify(causes));
		}
	})
}


CausesController.prototype.saveCause = function(req,res){
	let body = req.body;

	if(typeof body.tagline === 'undefined' || typeof body.title === 'undefined'){
		handleError({
			message: 'Bad request: no tagline or title',
			code: 400,
			date: new Date()
		},res)
	}else{
		let causeInstance = new CauseModel({
			tagline : body.tagline,
			title : body.title,
			description: body.description ? body.description : '' ,
			photo: body.photo ? body.photo : '',
			donors:[]
		})

		causeInstance.save(function(err,savedInfo){
			if(typeof err != 'undefined' && err){
				return handleError(err,res);
			}else{
				res.header('Content-Type','text/html');
				res.status(200).send(JSON.stringify(savedInfo));
			}
		});
	}
}


CausesController.prototype.updateCause = function(req,res){
	let body = req.body;
	let upsertCause = {
		tagline : body.tagline,
		title : body.title,
		description: body.description ? body.description : '' ,
		photo: body.photo ? body.photo : ''
	}

	CauseModel.findByIdAndUpdate({'_id':req.params.id},upsertCause,function(err,donations){
		if(typeof err != 'undefined' && err){
			return handleError({
				message:'Internal DB Error.',
				code:500,
				date: new Date()
			},res);
		}else{
			res.header('Content-Type','text/html');
			res.status(200).send(JSON.stringify(upsertCause));
		}
	})

}


CausesController.prototype.patchCause = function(req,res){
	let body = req.body;
	let upsertCause = {
		tagline : body.tagline,
		title : body.title,
		description: body.description ? body.description : '' ,
		photo: body.photo ? body.photo : ''
	}

	for(var propertyName in upsertCause){
		if(upsertCause[propertyName] === null || upsertCause[propertyName] === undefined){
			delete upsertCause[propertyName];
		}
	}

	CauseModel.findById(req.params.id,function(err,donation){
		if(typeof err != 'undefined' && err){
			return handleError({
				message:'Internal DB Error. Cause not found',
				code:404,
				date: new Date()
			},res);
		}else{
			CauseModel.findByIdAndUpdate({'_id':req.params.id},upsertCause,function(err,donations){
				if(typeof err != 'undefined' && err){
					return handleError({
						message:'Internal DB Error. Could not perform patch',
						code:500,
						date: new Date()
					},res);
				}else{
					res.header('Content-Type','text/html');
					res.status(200).send(JSON.stringify(upsertCause));
				}
			});
		}
	})

}


module.exports = new CausesController();