const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://userone:userone@libraryfiles.o5pxy.mongodb.net/TRAINERMANGEMENT?retryWrites=true&w=majority",{useUnifiedTopology:true,useNewUrlParser:true});

const Schema = mongoose.Schema;
var CourseSchema = new Schema({
      name: String,
      courseid:String
 
});
var CourseData = mongoose.model('course', CourseSchema);
module.exports = CourseData;