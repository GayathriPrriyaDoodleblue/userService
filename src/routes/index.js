const apiRoutes =(app)=>{
    app.use('/merchant',require('./merchantRoutes')),
    app.use('/user',require('./userRoutes'));
   
}
module.exports=apiRoutes