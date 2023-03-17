const apiRoutes =(app)=>{
    app.use('/admin',require('./admin.routes')),
     app.use('/merchant',require('./merchant.routes')),
     app.use('/user',require('./user.routes'))
    // app.use('/delivery',require('./delivery.routes'));
}
module.exports=apiRoutes