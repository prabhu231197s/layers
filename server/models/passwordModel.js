(function(){
    module.exports.getPasswordUpdateModel=function(req,password){
        if(req.body.email===null||req.body.new_password===null||req.body.cur_password===null){
            return null;
        }
        else{
            if(req.body.cur_password===password){
                return {new_password:req.body.new_password}
            }
            else{
                return {new_password:"failed"};
            }
        }
    };
})();