const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    firstName:{
        type: String,
        // required: true
    },
    lastName:{
        type: String,
        // required: true
    },
    email:{
        type:String,
        required: true,
        // unique:true
    },
    password:{
        type:String,
        required: true
    },
    uuid:{
        type: String,
        unique:true
    },
    address:{
        type:String
    },
    state:String,

})
module.exports=mongoose.model("Users",userSchema);