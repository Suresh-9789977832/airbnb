const mongoose = require("mongoose")

const placeschema = new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId, ref:"Usermodal"},
    title: String,
    address: String,
    addedphotos: [String],
    description: String,
    perks: [String],
    extrainfo: String,
    checkin: String,
    checkout: String,
    maxguests: String,
    price:String
})

const Placemodal = mongoose.model("place", placeschema)

module.exports=Placemodal