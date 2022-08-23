//external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

//internal imports
const {notFoundHandler, errorHandler} = require("./middlewares/common/errorHandler");

const app = express();
dotenv.config(); 

//database connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING )
.then(()=>console.log("connection successful"))
.catch(err=>console.log(err));

//request parser
app.use(express.json());
app.use(express.urlencoded({extended:true})); //extended:true for query string

//set view engine
app.set("view engine", "ejs");

//set static folder
app.use(express.static(path.join(__dirname,"public")));

//parse cooies
app.use(cookieParser(process.env.COOKIE_SECRET));

//routing setup

//404 not found
app.use(notFoundHandler);
//common handler
app.use(errorHandler);

app.listen(process.env.PORT, ()=>{
    console.log(`app listeing to port ${process.env.PORT}`);
});