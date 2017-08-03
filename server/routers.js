(function(){
    module.exports=function(app){
        app.use('/app/api',require('./routes/appApiRoutes'));
    }
})();