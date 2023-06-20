const mongoose=require("mongoose");

const Schema=new mongoose.Schema({
    id:
     { 
        type: Number,
        required: true 
     },
    name:
     {
         type: String, 
         required: true 
     },
    time:
     {
         type: String, 
         required: true 
     },
    available_seats: 
    {  
          type: Number,
          required: true,
    },
  });

module.exports=mongoose.model("Shows",Schema);