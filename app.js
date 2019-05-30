
let express = require('express');
let app = express();
//let donationController = require('./app/controllers/donation');
let routes = require('./app/routes');
let bodyParser = require('body-parser');

// app.use(app.router);
// app.get('/', function (req, res) {
//   res.send('Test Hello World Router!');
// });

// app.get('/',function(req,res){
// 	res.header('Content-Type','text/html');
// 	res.status(200).send(JSON.stringify("Hello world!"));
// });

//app.get('/',donationController.index);

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

routes.initialize(app);


app.listen(3000, function () {
  console.log('PM2 Example app listening on port 3000!');
});
