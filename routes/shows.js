const express=require("express");
const showModel = require("../models/showModel");
const showRoute=express.Router();
// let {shows}=require("../data");
showRoute.get("/all", async(req, res) => {
    try {
        const shows = await showModel.find({ available_seats: { $gt: 0 } });
        res.json(shows);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
})


module.exports=showRoute;