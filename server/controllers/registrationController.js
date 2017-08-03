var bcrypt=require('bcrypt-nodejs');
var emailverificationtoken=require('voucher-code-generator');
var commonFunctions=require('../CommonFunctions/commonFunctions');
var responseHandler=require('../helper/responseHandler');
var registrationModel=require('../models/registrationModel');
var mailSenderService=require('../services/mailsender');
var registrationService=require('../services/registrationService');

module.exports.registerUser=function(req,res){
    try{
      var insertData  =  registrationModel.getInsertData(req);
      if(insertData) {
        registrationService.checkUser(insertData,function(err,data){
            if(err){
                console.log(err);
                responseHandler.sendErrorJson(res,err);
            }
            else{
                if(data.length!==0){
                    responseHandler.sendErrorJson(res,{message:"Mail registered already",statusCode:"401"});
                }
                else{
                    registrationService.registerUser(insertData,function(err,data){
                        if(err){
                            console.log(err);
                            responseHandler.sendErrorJson(res,err);
                        }
                        else{
                            registrationService.checkToken(insertData,function(err,data){
                                if(err){
                                    responseHandler.sendErrorJson(res,err);
                                }
                                else{
                                    if(data.length===0){
                                        registrationService.generateToken(insertData,function(err,data){
                                            if(err){
                                                responseHandler.sendErrorJson(res,err);
                                            }
                                            else{
                                                //send mail with recieved new token
                                                commonFunctions.sendToken(insertData.email,data,function(err,data){
                                                    if(err){
                                                        responseHandler.sendErrorJson(res,err);
                                                    }
                                                    else{
                                                        res.send();
                                                    }
                                                });
                                            }
                                        });
                                    }
                                    else{
                                        //send mail with the reicieved data token
                                        commonFunctions.sendToken(insertData.email,data[0].token,function(err,data){
                                            if(err){
                                                responseHandler.sendErrorJson(res,err);
                                            }
                                            else{
                                                res.send();
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    });
                }
            }
        });
      }else {
          responseHandler.sendErrorJson(res,{message: "Null input in any field", statusCode:"403" });
      }
    }
    catch(err){
        console.log(err);
        responseHandler.sendErrorJson(res,err);
    }
};


module.exports.verifyUser=function(req,res){
    try{
        var updateData=registrationModel.getVerifyData(req);
        registrationService.checkUser(updateData,function(err,data){
            if(err){
                responseHandler.sendErrorJson(res,err);
            }
            else{
                if(data.length===0){
                    responseHandler.sendErrorJson(res,{message:"User not registered",statusCode:"403"});
                }
                else{
                    registrationService.checkToken(updateData,function(err,data){
                        if(err){
                            responseHandler.sendErrorJson(res,err);
                        }
                        else{
                            if(data.length===0){
                                responseHandler.sendErrorJson(res,{message:"Mail token not sent",statusCode:"401"});
                            }
                            else{
                                registrationService.verifyUser(updateData,function(err,data){
                                    if(err){
                                        responseHandler.sendErrorJson(res,err);
                                    }
                                    else{
                                        if(data[0].token===updateData.token){
                                            registrationService.updateClearance(updateData,function(err,data){
                                                if(err){
                                                    responseHandler.sendErrorJson(res,err);
                                                }
                                                else{
                                                    res.send();
                                                }
                                            });
                                        }
                                        else{
                                            responseHandler.sendErrorJson(res,{message:"Incorrect token",statusCode:"420"});
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
    }
    catch(err){
        console.log(err);
        responseHandler.sendErrorJson(res,err);
    }
};