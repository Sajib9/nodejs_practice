const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    description:String,
    status:{
        type:String,
        enum:["active","inactive"],
    },
    date:{
        type:Date,
        default:Date.now,
    }
});

//custom instance method asycn await
todoSchema.methods = {
    findActive:function(){
        return mongoose.model("Todo").find({status:"inactive"});
    }
};
//using callback
todoSchema.methods = {
    findActiveCallback:function(cb){
        return mongoose.model("Todo").find({status:"active"},cb);
    }
};

//static method no need to use mongoose.model ,instead this keyword
todoSchema.statics = {
    findActiveStatic:function(){
        return this.find({title:/22222/i}) //regular express ,find title key word from title column
    }
};

module.exports = todoSchema;