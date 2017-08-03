(function(){
    module.exports.getTokenData=function(mail,token){
        if(mail===null){
            return null;
        }
        return {
            email:mail,
            token:token
        }
    };
})();