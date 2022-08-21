const express = require("express");
const mongoose = require("mongoose");
const todoHandler = require("./routeHandler/todoHandler");

//app initilization
const app = express();
app.use(express.json());

//database connection with mongoose
mongoose.connect('mongodb://localhost/todos')//return a promise //promise handle using then catch
            .then (()=>console.log('connection successfull'))
            .catch(err=>console.log(err));

app.use('/todo',todoHandler);            
//default error handler
function errorHandler(err,req,res,next){
    if(res.headersSent){
        return next(err);
    }
    res.status(500).json({error:err});
}

app.listen(3000,()=>{
    console.log('app listening at port 3000');
});