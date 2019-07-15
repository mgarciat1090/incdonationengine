var donationRoutes = require('../donations/routes');
var causeRoutes = require('../causes/routes');
module.exports.initialize = function(app){
	donationRoutes.initialize(app);
	causeRoutes.initialize(app);
}