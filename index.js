const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const DetailsModel = require('./models/CarDetails')
const dontenv = require('dotenv').config()
const port = process.env.PORT || 4000;
const bodyParser = require("body-parser");


const app = express()
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// console.log('11');
// app.use(express.json())
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

// In this add the pagination which would be the default of 10. And create the another api which will get the detail by id
// app.get('/buy',(req,res)=>{
//     DetailsModel.find()
//     .then((data)=>res.json(data))
//     .catch(err=> res.json(err))
// })


app.get('/buy', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || "";

    // search condition
    const searchQuery = search
      ? { title: { $regex: search, $options: "i" } }
      : {};

    const totalCount = await DetailsModel.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalCount / limit);

    const data = await DetailsModel
      .find(searchQuery)
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 });

    res.status(200).json({
      message: data.length > 0 ? "Data fetched succesfully" : "No data found",
      data,
      currentPage: page,
      totalPages
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching data",
      error: error.message
    });
  }
});

app.get('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid ID format"
      });
    }

    const data = await DetailsModel.findById(id);

    if (!data) {
      return res.status(404).json({
        message: "No data found"
      });
    }

    res.status(200).json({
      message: "Data fetched successfully",
      data
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching detail",
      error: error.message
    });
  }
});


app.listen(port, () => {
    console.log(`server is running ${port}`);
})
