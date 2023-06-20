const mongoose=require("mongoose")
const bookingSchema = new mongoose.Schema({
    id: 
    { 
        type: Number,
         ref: 'Show', required: true 
    },
    seatNo:
     {
         type: String, 
         required: true 
    },
    bookedBy:
    {
        type: String,
        ref:'User',
        required: true
    },
    bookedOn:{
        type: Date,
        default:new Date()
    }
  });
 module.exports= mongoose.model('Bookings', bookingSchema);