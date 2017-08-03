(function(){
    module.exports.getInsertData=function(req){
        //check the conditions for the required fields
        if(req.body.name===null||req.body.email===null||req.body.username===null||req.body.password===null||req.body.age===null){
            return null;
        }
        return {
            name:req.body.name,
            email:req.body.email,
            username:req.body.username,
            password:req.body.password,
            age:req.body.age,
            belt:req.body.belt,
            block_flag:req.body.block_flag,
            login_flag:req.body.login_flag,
            blood_group:req.body.blood_group,
            contact_number:req.body.contact_number,
            emergency_number:req.body.emergency_number,
            address:req.body.address,
            dojo:req.body.dojo,
            father_name:req.body.father_name,
            mother_name:req.body.mother_name,
            role:req.body.role,
            ka_id:req.body.ka_id
        }
    };
    module.exports.getVerifyData=function(req){
        if(req.body.email===null||req.body.token===null){
            return null;
        }
        return {
            email:req.body.email,
            token:req.body.token
        }
    }
})();