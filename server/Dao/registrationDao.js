(function(){
    var dbConnection=require('../config/connection');
    var responseHandler=require('../helper/responseHandler');
    var emailverificationtoken=require('voucher-code-generator');
    var tokenModel=require('../models/tokenModel');
    module.exports.getRegistrationDao=function(insertData,callback){
        dbConnection.query('INSERT into users set ?',insertData,function(err,data){
            callback(err,data);
        });
    }
    module.exports.checkUserDao=function(insertData,callback){
        dbConnection.query('SELECT * from users where email=?',insertData.email,function(err,data){
            callback(err,data);
        });
    }
    module.exports.getToken=function(insertData,callback){
        var emailToken=emailverificationtoken.generate({
            length:6,
            count:1,
            charset:emailverificationtoken.charset("alphanumeric"),
            prefix:"KA-"
        }).toString().toUpperCase();
        var tokenConstruct=tokenModel.getTokenData(insertData.email,emailToken);
        dbConnection.query('INSERT into token_user_map set ?',tokenConstruct,function(err,data){
            callback(err,emailToken);
        });
    }
    module.exports.checkToken=function(insertData,callback){
        dbConnection.query('SELECT token from token_user_map where email=?',insertData.email,function(err,data){
            callback(err,data);
        });
    }
    module.exports.verifyUserDao=function(updateData,callback){
        dbConnection.query('SELECT token from token_user_map where email=?',updateData.email,function(err,data){
            callback(err,data);
        });
    }
    module.exports.updateClearanceDao=function(updateData,callback){
        dbConnection.query('UPDATE users set block_flag=0 where email=?',updateData.email,function(err,data){
            callback(err,data);
        });
    }
})();