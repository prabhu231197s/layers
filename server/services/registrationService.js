(function(){
    var registrationDao=require('../Dao/registrationDao');
    module.exports.registerUser=function(insertData,callback){
        return registrationDao.getRegistrationDao(insertData,callback);
    };
    module.exports.checkUser=function(insertData,callback){
        return registrationDao.checkUserDao(insertData,callback);
    }
    module.exports.generateToken=function(insertData,callback){
        return registrationDao.getToken(insertData,callback);
    }
    module.exports.checkToken=function(insertData,callback){
        return registrationDao.checkToken(insertData,callback);
    }
    module.exports.verifyUser=function(updateData,callback){
        return registrationDao.verifyUserDao(updateData,callback);
    }
    module.exports.updateClearance=function(updateData,callback){
        return registrationDao.updateClearanceDao(updateData,callback);
    }
})();