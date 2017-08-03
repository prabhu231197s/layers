var express=require('express');
var app=express();
var serverConfig=require('./server/config/serverConfig.json');
//fetch the required details to connect to the db
//var dbConnection=require('./server/config/connection');
var port=serverConfig.local.port;
app.use(function(req,res,next){
     res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});

var routes=require('./server/routers')(app);
var server=app.listen(port);
console.log('The server is running at port '+server.port);