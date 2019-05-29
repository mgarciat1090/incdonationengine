var donationRoutes = require('../donations/routes');
module.exports.initialize = function(app){
	donationRoutes.initialize(app);
}