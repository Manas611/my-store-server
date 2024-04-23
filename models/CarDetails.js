const mongoose = require('mongoose')

// title,year,km,Fuel,Transmision,Price

const DetailsSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    year:{
        type:Number,
        required: true
    },
    km:{
        type:String,
        required: true
    },
    Fuel:{
        type:String,
        required: true
    },
    Transmision:{
        type:String,
        required: true
    },
    Price:{
        type:Number,
        required: true
    },
    Image:{
        type:String,
        required:true
    }
})

const DetailsModel = mongoose.model("detail",DetailsSchema)
module.exports = DetailsModel