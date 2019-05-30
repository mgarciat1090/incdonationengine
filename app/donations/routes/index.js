var donationController = require('../controllers/donation');

module.exports.initialize = function(app){

	app.get('/donations/:id',donationController.getDonation);
	app.get('/donations',donationController.getDonations);
	app.post('/donations/:id',donationController.saveDonation);
	app.put('/donations/:id',donationController.updateDonation);
	app.patch('/donations/:id',donationController.patchDonation);

}