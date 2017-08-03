(function(){
    var passwordDao=require('../Dao/passwordDao');
    module.exports.getCurrentPassword=function(email,callback){
        return passwordDao.getCurrentPasswordDao(email,callback);
    };
    module.exports.updatePassword=function(password,email,callback){
        return passwordDao.updatePasswordDao(password,email,callback);
    };
})();