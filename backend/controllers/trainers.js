const LoginData = require('../src/models/LoginData')


const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://userone:userone@libraryfiles.o5pxy.mongodb.net/TRAINERMANGEMENT?retryWrites=true&w=majority",{useUnifiedTopology:true,useNewUrlParser:true});


exports.getTrainers= async(req,res)=>{
    const trainers = await LoginData.find();
    // console.log(books)
    res.status(200).json({trainers})
}