var mysql=require('mysql');
var dbConfig=require('./dbConfig');
var dbConnection=mysql.createConnection(dbConfig.mysql);
dbConnection.connect(function(err,data){
    if(err){
        console.log(err);
        console.log('Error connecting the DB');
    }
    else{
        console.log('Server Connection established');
    }
});

module.exports=dbConnection;