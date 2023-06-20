
const express = require("express");
const jwt=require("jsonwebtoken");
const bookingRoute = require("./routes/booking");
const showRoute = require("./routes/shows");
const userRoute = require("./routes/user");
const mongoose=require("mongoose")
require("dotenv").config();
//initialized the express app
const app = express();
//parsed the req body 
app.use(express.json());
//tested simple route for an app
app.get("/", (req, res) => {
    res.send(`<h1>Getting The Data...</h1>`);
});
//token authentication
app.use(async(req,res,next)=>{
    console.log("middleware called...")
    console.log(req.url,"URLLL")
    if (req.url == '/user/signup' || req.url.includes('/user/signin')) {
        next()
      } else {
        console.log(req.headers,"DHDHDHHDH")
        const token = req.headers['authorization'];
        if (token) {
          try {
            const data = await jwt.verify(token, `${process.env.JWT_KEY}`);
            console.log(data,"DATA")
            req.headers["userId"] = data.id
            next()
          } catch (ex) {
            res.status(401)
            res.send('invalid token')
          }
        } else {
          res.status(401)
          res.send('missing token')
        }
      }
})
//added different route using expressjs middleware
app.use("/user",userRoute);
app.use("/shows",showRoute);
app.use("/book",bookingRoute);

mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB}`).then(console.log("connected to DB...."))
//server is listening...
app.listen(`${process.env.PORT}`, () => {
    console.log(`app is listening on Port:${process.env.PORT}`)
});