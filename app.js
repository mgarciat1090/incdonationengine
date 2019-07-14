
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

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.get('/*', function(req,res) {
 	//res.status(200).send("Hellow World");
	res.sendFile(path.join(__dirname+'/dist/incdonation/index.html'));
});

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

routes.initialize(app);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);