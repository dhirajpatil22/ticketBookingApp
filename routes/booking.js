const express=require("express");
const bookingRoute=express.Router();
const{bookSeat,cancelSeat}=require("../controllers/bookingController")
bookingRoute.post("/bookTicket/:showId/:seatNo",bookSeat);
bookingRoute.delete('/cancelTicket/:showId/:seatNo', cancelSeat);
module.exports=bookingRoute;