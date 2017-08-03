(function(){
    var express = require('express');
    var app = express();
    var router = express.Router();
    var bodyParser=require('body-parser');
    var bcrypt=require('bcrypt-nodejs');

    router.use(bodyParser.urlencoded({extended:true}));
    router.use(bodyParser.json());
    router.use(bodyParser.json({type:'application/vnd.api+json'}));

    var RegistrationController = require('../controllers/registrationController');
    var PasswordController=require('../controllers/passwordController');

    router.post('/register',function(req,res){
        RegistrationController.registerUser(req,res);
    });

    router.post('/forgotpassword',function(req,res){
        PasswordController.resetPassword(req,res);
    });

    router.post('/verify',function(req,res){
        RegistrationController.verifyUser(req,res);
    });

    module.exports=router;
})();