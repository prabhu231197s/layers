(function(){
    var nodemailer=require('nodemailer');
    module.exports={
        sendToken:function(email,token,callback){
            var smtpTransport=nodemailer.createTransport("SMTP",{
                service:"Gmail",
                auth:{
                    user:"chintokankarateindiaofficial@gmail.com",
                    pass:"ChintokanKarate2017"
                }
            });
            var mail={
                from:"Chintokan Karate Do-INDIA",
                to:email,
                subject:"registration verification token",
                text:"Use the token "+token+" to complete your registration"
            }
            smtpTransport.sendMail(mail,function(err){
                if(err){
                    console.log('Mail not sent');
                    console.log(err);
                    callback(err,false);
                }
                else{
                    console.log('Mail sent successfully');
                    callback(null,true);
                }
            });
        }
    };
})();