'use strict';
var QRAuth = require("../scripts/QRAuth.js");
var bodyParser = require('body-parser');

module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  
  router.get('/', server.loopback.status());
  router.post('/getRandamValue',function(req,res,next){
	 QRAuth.getRandomValue(req,res,next);	  
  });
  router.post('/validateQRCode',function(req,res,next){
    QRAuth.validateQRCode(req,res,next);
  })
  server.use(bodyParser.json()); 
  server.use(router);
};

