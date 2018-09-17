'use strict';

var request = require('request');

module.exports = function(Trandtls) {
    Trandtls.afterRemote('create',function(context,modelInstance,next){
        var requestUrl = "http://localhost:3000/api/TranDtls"   
        request({url:requestUrl,method:"POST",json:modelInstance.__data},function(err,response,body){
            if(err){
                console.log("error occurred "+err);
            }
            next();
        });
    });
};

