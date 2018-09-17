var loopback = require('loopback');
var qrmap = loopback.findModel("qrmap");
var bankUser = loopback.findModel("BankUser");
//var BankUser = loopback.findModel("BankUser");
var randomString = require('randomstring');

var getRandomValue = function(req,res,next){
    console.log("inside getRandomValue");
	qrmap.upsert(getQRMapData(req.body), req.callContext, function(err,data){
		if(err)
			return errorResponse(res,"Generation Failed");
		return successResponse(res,data.qrcode);
	});
	var id = randomString.generate();    
}

var validateQRCode = function(req,res,next){
	console.log("inside validateQRCode");
	if(req.body.qrcode === undefined)
		return errorResponse(res,"Invalid Request");
	qrmap.find({where: {qrcode: req.body.qrcode}}, req.callContext, function(err,data){
		if(err)
			return errorResponse(res);
		bankUser.find({where: {user_id: data[0].user_id}},req.callContext,function(err,data){
			if(err)
				return errorResponse(res, "Validation Failed");
			return successResponse(res,data);
		})
	});
}

function getQRMapData(data){
	var QRMapData = {};
	var currentTime = new Date();
	var validTime = currentTime.getHours()
	QRMapData.id = randomString.generate();
	QRMapData.qrcode = QRMapData.id;
	QRMapData.user_id = data.user_id;
	QRMapData.gen_time = currentTime
	currentTime.setMinutes(currentTime.getMinutes()+10);
	QRMapData.valid_till = currentTime;
	QRMapData.verified_flg = "N";
	return QRMapData;
}

function errorResponse(res, message){
	var responseObject = {};
	responseObject.status = "Failure";
	responseObject.message = message;
	res.writeHead(300, { "Content-Type": "application/json" });
	res.end(JSON.stringify(responseObject));
	return;
}

function successResponse(res,data){
	var responseObject = {};
	responseObject.status = "SUCCESS";
	responseObject.data = data;
	res.writeHead(200, { "Content-Type": "application/json" });
	res.end(JSON.stringify(responseObject));
	return;
}


module.exports = {
	getRandomValue : getRandomValue,
	validateQRCode : validateQRCode
};
