'use strict';

//////////////////////////////
// Requires
//////////////////////////////

var express = require('express')
	, cfenv = require('cfenv')
	, path = require('path')
	, bodyParser = require('body-parser')
	, Promise = require('promise')
	, requestHandler = require('./libs/requestHandler.js');

//////////////////////////////
// App Variables
//////////////////////////////

var app = express(), appEnv = cfenv.getAppEnv();

app.use(bodyParser.json()); // for parsing application/json
app.use(express.static(path.join(__dirname, 'public')));

//////////////////////////////
// Endpoints
//////////////////////////////

app.get('/', function(req, res) {
	res.sendFile('html/index.html', { root : __dirname + '/public/' });
});

app.post('/submit', function(req, res) {
	requestHandler.handleAsync(req.body).then(function(options) {
		res.json(options);
	});
});

//////////////////////////////
// Start the server
//////////////////////////////

app.listen(appEnv.port, function() {
	console.log('Server starting on ' + appEnv.url);
});
