const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const DetailsModel = require('./models/CarDetails')
const dontenv = require('dotenv').config()

// console.log(dontenv);

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


mongoose.connect(process.env.URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('Error connecting to MongoDB:', error));

app.get('/', (req, res) => {
    // res.send("THIS is a data")
    // console.log('hiiii');
})

// Title, Year, Km, Fuel, Transmision, Price [Sell/ Form]
//  Pic, Title, km, Fuel, Transmision, Price

app.post('/sell',async(req,res)=>{
    // const{title,year,km,Fuel,Transmision,Price}=req.body;
// console.log(req.body);
    let info = new DetailsModel(req.body);
    let result = await info.save();
    res.json(result);
})

app.get('/buy',(req,res)=>{
    DetailsModel.find()
    .then((data)=>res.json(data))
    .catch(err=> res.json(err))
})

app.listen(7777, () => {
    console.log('server is running');
})
