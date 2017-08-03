var responseHandler=require('../helper/responseHandler');
var passwordModel=require('../models/passwordModel');
var passwordService=require('../services/passwordService');

module.exports.resetPassword=function(req,res){
    try{
        passwordService.getCurrentPassword(req.body.email,function(err,data){
            if(err){
                responseHandler.sendErrorJson(res,err);
            }
            else{
                if(data.length===0){
                    responseHandler.sendErrorJson(res,{message:"No password found in table",statusCode:"403"});
                }
                else{
                    var password=data[0].password;
                    console.log(password);
                    var newPassword=passwordModel.getPasswordUpdateModel(req,password);
                    console.log(newPassword);
                    if(newPassword===null){
                        responseHandler.sendErrorJson(res,{message:"Any field is null",statusCode:"403"});
                    }
                    else if(newPassword.new_password==="failed"){
                        responseHandler.sendErrorJson(res,{message:"Incorrect Password",statusCode:"420"});
                    }
                    else{
                        passwordService.updatePassword(newPassword.new_password,req.body.email,function(err,data){
                            if(err){
                                responseHandler.sendErrorJson(res,err);
                            }
                            else{
                                res.send();
                            }
                        });
                    }
                }
            }
        });
    }
    catch(err){
        console.log(err);
        responseHandler.sendErrorJson(res,err);
    }
};