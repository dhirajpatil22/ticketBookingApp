const bookModel = require("../models/bookModel");
const showModel = require("../models/showModel");

// let {shows,screens}=require("../data");
const bookSeat = async (req, res) => {
    const showId = parseInt(req.body.showId);
    const seatNo = parseInt(req.body.seatNo);
    const userId=req.headers.userId;
    console.log(req.headers,"req.headersreq.headers")
    try {
        let show = await showModel.findOne({id:showId});
        if (!show) {
            res.status(404).json({ status: 404, message: "Show Not found" });
            return;
        }
        if (show.available_seats === 0) {
            //show suggestions

            let suggestions = showModel.find({id:{$nin:show.id}})
            res.status(404).json({ status: 404, message: "All seats are booked for today...you may select other show from suggestions", suggestions });
            return;
        }
        //check for seat booking
        if (seatNo > 0 && seatNo <= show.available_seats) {
            console.log(show, "SHOW")

            const isSeatBooked = await bookModel.findOne({id:showId,seatNo})
            console.log(isSeatBooked,"isSeatBookedisSeatBooked")
            if (isSeatBooked) {
                res.status(403).json({ status:403,message: "Seat Already booked" });

            } else {
                const booking = new bookModel({ id:showId,bookedBy:userId ,seatNo});
                 booking.save().then((err,data)=>{
                   if(err){
                    console.log(err)
                   }else{
                    console.log(data);
                   }
                 })
               
                    show.availableSeats--;
                    await show.save();    
                    res.json({ message: 'Ticket booked successfully' });
            }
        } else {
            res.status('404').json({ status: 404, message: "Enter correct seat number"});
        }

    } catch (error) {
        console.log(error, "ERRR")
        throw error;
    }


}
const cancelSeat = async (req, res) => {
    const id = parseInt(req.query.showId);
    const userId=req.headers.userId;
    try {
        // Find the show
        const booking = await bookModel.findOne({id,bookedBy:userId});
        if (!booking) {
          res.status(404).json({ error: 'Booking not found' });
          return;
        }
      
        await bookModel.findOneAndDelete({id});

        const show = await showModel.findOne({id:booking.id});
        show.availableSeats++;
        await show.save();
        res.json({ message: 'Ticket cancelled successfully' });


    } catch (error) {
        console.log(error, "ERRR")
        throw error;
    }

}
module.exports = { bookSeat, cancelSeat }