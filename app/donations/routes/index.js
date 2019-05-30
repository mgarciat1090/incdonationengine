var donationController = require('../controllers/donation');

module.exports.initialize = function(app){

	app.get('/donations',donationController.getDonations);
	app.post('/donations',donationController.saveDonations);

}