const express = require("express");
const  mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require('./schemas/todoSchema');
const Todo = new mongoose.model("Todo",todoSchema); 
const checkLogin = require("../middlewares/checkLogin");

//GET all the todos using custom instance method [asycn await]
router.get("/active",async(req,res)=>{
    const todo = new Todo();
    const data = await todo.findActive();
    res.status(200).json({  
        data:data
    });
});

//GET all the todos using custom instance method using [callback method]
router.get("/active-callback",checkLogin,(req,res)=>{
    const todo = new Todo();
    todo.findActiveCallback((err,data)=>{
        res.status(200).json({
            data
        });
    });
    
    
});

//GET all the todos using static method [asycn await]
router.get("/static",async(req,res)=>{
    const data = await Todo.findActiveStatic(); //used Direct model name [Todo] not instance of model class
    res.status(200).json({  
        data:data
    });
});

//GET a  todos by id
router.get("/:id",async(req,res)=>{
    await Todo.find({_id : req.params.id}).select({
        _id:0
    })
    .exec((err,data)=>{
        if(err){
            res.status(500).json({
                error:"server error",
            });
        }
        else{
            res.status(200).json({
                result:data,
                message:"success",
            });
        }
    });
});

//POST a todos
router.post("/",async(req,res)=>{
    const newTodo = new Todo(req.body);
    await newTodo.save((err)=>{
        if(err){
            res.status(500).json({
                error: "there was a server side error",
            });
        }
        else{
            res.status(200).json({
                message:"todo was inserted successfully",
            });
        }
    });
});

//POST multiple the todos
router.post("/all",async(req,res)=>{
    await Todo.insertMany(req.body,(err)=>{
        if(err){
            res.status(500).json({
                error:"there was a server side error",
            });
        }
        else{
            res.status(200).json({
                message:"Todos were inserted"
            });
        }
    });
});

//PUT todos
router.put("/:id",async(req,res)=>{
    // try {
    // await Todo.updateOne({_id: req.params.id},{
    //     $set:{
    //         status:'inactive'
    //     },
    // },);
    // res.json({message: "Todo Was Update successfully!" })
    // }
    // catch (err) {
    //     console.log('error', err)
    //     res.status(500).json({error:'There was a Server Side Error!'})
    //  }

    try {
        const result = await Todo.findByIdAndUpdate({ _id:req.params.id},{
            $set:{
                status:"active"
            }
        },{
            new:true,
            useFindAndModify:false,
        },);
        console.log(result)
        res.json({message: "Todo Was Update successfully!" })
    }
    catch{
        res.status(500).json({error:'There was a Server Side Error!'});
    }
});

//DELETE todos
router.delete("/:id",async(req,res)=>{
    await Todo.deleteOne({_id : req.params.id})
    .exec((err)=>{
        if(err){
            res.status(500).json({
                error:"server error",
            });
        }
        else{
            res.status(200).json({
                message:"success",
            });
        }
    });
});

module.exports = router;