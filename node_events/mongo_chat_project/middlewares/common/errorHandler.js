const createError = require("http-errors");
//404 not found 
function notFoundHandler(req,res,next){
    next(createError(404,"Requested content was not found!"));
}

//default error handler
function errorHandler(err,req,res,next){
    res.render('error',{
        title:"Error page"
    }); //view page name
}

module.exports = {
    notFoundHandler,
    errorHandler,
};