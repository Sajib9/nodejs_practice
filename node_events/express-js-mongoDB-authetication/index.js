const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const todoHandler = require("./routeHandler/todoHandler");
const userHandler = require("./routeHandler/userHandler");

//app initilization
const app = express();
dotenv.config()
app.use(express.json());

//database connection with mongoose
mongoose.connect('mongodb://localhost/todos')//return a promise //promise handle using then catch
            .then (()=>console.log('connection successfull'))
            .catch(err=>console.log(err));

app.use('/todo',todoHandler);            
app.use('/user',userHandler);  

// default error handler
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }
    res.status(500).json({ error: err });
  }
  
  app.use(errorHandler);

app.listen(3000,()=>{
    console.log('app listening at port 3000');
});