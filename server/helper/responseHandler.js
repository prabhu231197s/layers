(function(){
    module.exports.sendErrorJson=function(res,err){
       var data = {};
        err.statusCode === undefined ? err.statusCode = 500 : err.statusCode;
        err.message === undefined? err.message = "FAILED" : err.message;
        err.stack === undefined?err.stack="FAILED":err.stack;
       
        
        res.status(err.statusCode).json(err);    
    };
})();