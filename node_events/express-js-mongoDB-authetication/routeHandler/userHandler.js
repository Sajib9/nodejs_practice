const express = require("express");
const  mongoose = require("mongoose");
const  bcrypt = require("bcrypt");
const  jwt = require("jsonwebtoken");
const router = express.Router();
const userSchema = require('./schemas/userSchema');
const { route } = require("./todoHandler");
const User = new mongoose.model("User",userSchema); 

//SIGNUP
router.post("/signup", async(req,res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(200).json({
            message:"Sugnup was successfull",
        });
    }
    catch{
        res.status(500).json({
            message:"Signup failed",
        });
    }
});

//LOGIN
router.post("/login",async(req,res) => {
    try{
        const user = await User.find({username: req.body.username}); //return an array
        if(user && user.length > 0){
            const isValid = await bcrypt.compare(req.body.password,user[0].password);
    
            if(isValid){
                //token generate
                const token = jwt.sign({
                    username: user[0].username,
                    userid: user[0]._id,
                },process.env.JWT_SECRET,{
                    expiresIn:'1h'
                });
                
                res.status(200).json({
                    "access_token": token,
                    "message" : "login successfull",
                });
            }
            else{
                res.status(401).json({
                    "error":"Authentication failed",
                });
            }
        }  
        else{
            res.status(401).json({
                "error":"Authentication failed",
            });
        }
    }
    catch{
        res.status(401).json({
            "error":"Authentication failed",
        });
    }
  
});

module.exports = router;