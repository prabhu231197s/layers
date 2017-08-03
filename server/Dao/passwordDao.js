(function(){
    var dbConnection=require('../config/connection');

    module.exports.getCurrentPasswordDao=function(email,callback){
        dbConnection.query('SELECT password from users where email=?',email,function(err,data){
            callback(err,data);
        });
    };

    module.exports.updatePasswordDao=function(password,email,callback){
        dbConnection.query('UPDATE users set password=? where email=?',[password,email],function(err,data){
            callback(err,data);
        });
    };

})();   