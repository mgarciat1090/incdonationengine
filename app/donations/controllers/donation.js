

var DonationsController = function(){};

DonationsController.prototype.index = function(req,res){

	res.header('Content-Type','text/html');
	res.status(200).send(JSON.stringify("hello donation test"));


}

module.exports = new DonationsController();