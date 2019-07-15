var causeController = require('../controllers/cause');

module.exports.initialize = function(app){


	app.get('/causes/:id',causeController.getCause);
	app.get('/causes/',causeController.getCauses);
	app.post('/causes/',causeController.saveCause);
	app.put('/causes/',causeController.updateCause);
	app.patch('/causes/',causeController.patchCause);

}