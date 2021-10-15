const NewApplData =require('../src/models/NewAppl')


const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://userone:userone@libraryfiles.o5pxy.mongodb.net/TRAINERMANGEMENT?retryWrites=true&w=majority",{useUnifiedTopology:true,useNewUrlParser:true});


exports.getApps= async(req,res)=>{
    const applications = await NewApplData.find();
    // console.log(books)
    res.status(200).json({applications})
}