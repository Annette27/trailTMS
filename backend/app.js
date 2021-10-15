const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require("path"); 
//const multer = require("multer");
const jwt = require('jsonwebtoken');
const LoginData = require('./src/models/LoginData')
//const LoginRoutes = require('./routes/login');
const appRoutes = require('./routes/apps')
const trainersRoutes = require('./routes/trainers')
const coursesRoutes = require('./routes/courses')
const batchesRoutes = require('./routes/batches')

mongoose.connect("mongodb+srv://userone:userone@libraryfiles.o5pxy.mongodb.net/TRAINERMANGEMENT?retryWrites=true&w=majority",{useUnifiedTopology:true,useNewUrlParser:true});

const NewApplData =require('./src/models/NewAppl')
const CourseData = require('./src/models/CourseData')
const BatchData = require('./src/models/BatchData')


var app = new express();
// app.use("/images", express.static(path.join("backend/images"))); 
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors());

//app.use('/login',LoginRoutes);

username="admin@gmail.com"
password="Admin@123"

app.use('/applications',appRoutes)
app.use('/trainers',trainersRoutes)
app.use('/courses',coursesRoutes)
app.use('/batches',batchesRoutes)

// var Storage=multer.diskStorage({
//     destination:"./public/images/",
//     filename:(req,file,cb)=>{
//         cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
//     }
// });
// var upload = multer({ 
//     storage:Storage
//  }).single('image')

function verifyToken1(req,res,next){
    if(!req.headers.authorization){
      return res.status(401).send("unauthorised request")
    }
  let token = req.headers.authorization.split(' ')[1]
  if(token==null){
    return res.status(401).send("unauthorised request")
  }
  let payload=jwt.verify(token,'secretKey')
//   console.log(payload)
  if(!payload){
    return res.status(401).send("unauthorised request")
  }
  req.userId=payload.subject
  next()
  }
  function verifyToken2(req,res,next){
    if(!req.headers.authorization){
      return res.status(401).send("unauthorised request")
    }
  let token = req.headers.authorization.split(' ')[2]
  if(token==null){
    return res.status(401).send("unauthorised request")
  }
  let payload=jwt.verify(token,'secretKey')
//   console.log(payload)
  if(!payload){
    return res.status(401).send("unauthorised request")
  }
  req.userId=payload.subject
  next()
  }


app.post('/login',function(req,res){

    let userData=req.body

    if(username === userData.uname && password === userData.password){
        let payload = {subject:username+password}
        let token = jwt.sign(payload,'secretKey')
        res.status(200).send({token});
        // console.log("success")
        
  }
  else{
    LoginData.findOne({email:userData.uname})
    .then((data)=>{
        
        if(data==null){
        let error ="Invalid User";
        res.send({error})
        }
        else if(data.password===userData.password){
            let payload = {subject:userData.uname+userData.password}
            let token1 = jwt.sign(payload,'secretKey')
            res.status(200).send({token1});
            // console.log("success")
        }
    
    else{
        let error ="Invalid User";
        res.send({error})
        
    }
    
        })
    }
})
    
//     if(username != userData.uname){
//       res.status(401).send("invalid username")
//     }else if(password != userData.password){
//       res.status(401).send("invalid password")
//    }else{

//     let payload = {subject:username+password};
//     let token = jwt.sign(payload,'secretkey');
//   res.status(200).send({token})
//     }


// delete Appl
app.delete('/remove/:id',verifyToken1,(req,res)=>{
    const id = req.params.id;
    NewApplData.findOne({"_id":id})
    .then((data)=>{
        trainer=
        {
            name: data.name,
            email: data.email,
            id: data.id,
            }
            NewApplData.findByIdAndDelete({"_id":id})
            .then(()=>{
                sendMailDecline(trainer).then((result)=>{
                    console.log("Email sent",result)
                res.send();
            
                })
                .catch((error)=>{
                    console.log(error.message)
                })
            })
    })

})

// delete course
app.delete('/delete/:id',verifyToken1,(req,res)=>{
    const id = req.params.id;
    BatchData.findOne({"_id":id})
    .then((data)=>{
            let course =data.course
            BatchData.findByIdAndDelete({"_id":id})
            .then(()=>{
                BatchData.findOne({"course":course})
                .then((data)=>{
                    if(data==null){
                        CourseData.findOneAndRemove({"name":course})
                        .then(()=>{
                         res.send();

                        })
                    }
                    else{
                res.send();

                    }
                })
           })
        
    })

})
// Add course
app.post('/course',verifyToken1,(req,res)=>{
    const name=req.body.batch.course
    const batch = req.body.batch.name
    const courseid = req.body.batch.courseid

    CourseData.findOne({"name":req.body.batch.course})
    .then((data)=>{
        if(data==null){
            var course={
                name:req.body.batch.course,
                courseid:req.body.batch.courseid
             }
             var course = CourseData(course);
             course.save();
             // res.send();
              var batch = {
                 course:req.body.batch.course,
                 name:req.body.batch.name,
                courseid:req.body.batch.courseid
    
             }
             var batch = BatchData(batch);
             batch.save();
             let error ="Batch added"
    
             res.send({error});
        }
        else{
            CourseData.findOne({"courseid":req.body.batch.courseid})
            .then((data)=>{
                if(data==null){
               let error = "Course ID incorrect"
            //    console.log(error)
               res.send({error});
                }
                else{
                    BatchData.findOne({"name":req.body.batch.name})
                    .then((data)=>{
                        if(data==null){
                            var batch = {
                                               courseid:req.body.batch.courseid,
                                               course:req.body.batch.course,
                                               name:req.body.batch.name
                                           }
                                        //    console.log(batch)
                               
                                           var batch = BatchData(batch);
                                           batch.save();
                                           let error = "Batch added"
                               
                                           res.send({error});
                        }
                        else{
                            let error = "Batch already exixts"
                                    //    console.log(error)
                                       res.send({error});
                        }
                    })
                }
            })


                   } 
        
    })
  
    
  })

// Add course end


// Approve trainer
// app.post('/trainer',(req,res)=>{
    
//     const id=req.body.trainer._id
     
//     trainer=
//         {
//             name: req.body.trainer.name,
//             email: req.body.trainer.email,
//             phone: req.body.trainer.phone,
//             address: req.body.trainer.address,
//             highestQualification: req.body.trainer.highestQualification,
//             skillSet: req.body.trainer.skillSet,
//             companyName: req.body.trainer.companyName,
//             designation: req.body.trainer.designation,
//             course: req.body.trainer.course,
//             id: req.body.trainer.id,
//             password: req.body.trainer.password,
//             image: req.body.trainer.image,
//             imagepath: req.body.trainer.imagepath,
//             type:req.body.trainer.type

//         }
//         // trainer.id=getid()
//         sendMail(trainer).then((result)=>{
//             console.log("Email sent",result)
//         })
//         .catch((error)=>{
//             console.log(error.message)
//         })
//     var trainer = LoginData(trainer);
//     trainer.save();
//     NewApplData.findByIdAndDelete({"_id":id})
// .then(()=>{
   
//     res.send();
// })
    
//   })

// Approve trainer end


// Approve trainer new
app.post('/trainer',verifyToken1,(req,res)=>{
    LoginData.findOne().sort({id:-1})
    .then((data)=>{
       if(data.id){
         let idnew = data.id;
           var num=   idnew.slice(-2)
           let  id1=parseInt(num);
           id2= id1 + 1
           if(id2<10){
           id2= `0`+`${id2}`
           }
            idq=`TR`+`${id2}`
    //   console.log(idq+ "first")
      const id=req.body.trainer._id
      
      trainer=
          {
              name: req.body.trainer.name,
              email: req.body.trainer.email,
              phone: req.body.trainer.phone,
              address: req.body.trainer.address,
              highestQualification: req.body.trainer.highestQualification,
              skillSet: req.body.trainer.skillSet,
              companyName: req.body.trainer.companyName,
              designation: req.body.trainer.designation,
              course: req.body.trainer.course,
              id: idq,
              password: req.body.trainer.password,
              image: req.body.trainer.image,
              imagepath: req.body.trainer.imagepath,
              type:req.body.trainer.type
  
          }
        //   console.log(trainer.id+"third")
          sendMail(trainer).then((result)=>{
              console.log("Email sent",result)
          })
          .catch((error)=>{
              console.log(error.message)
          })
      var trainer = LoginData(trainer);
      trainer.save();
      NewApplData.findByIdAndDelete({"_id":id})
      .then(()=>{
     
      res.send();
  })
         }
         else{
            idq="TR01"
            const id=req.body.trainer._id
           
            trainer=
                {
                    name: req.body.trainer.name,
                    email: req.body.trainer.email,
                    phone: req.body.trainer.phone,
                    address: req.body.trainer.address,
                    highestQualification: req.body.trainer.highestQualification,
                    skillSet: req.body.trainer.skillSet,
                    companyName: req.body.trainer.companyName,
                    designation: req.body.trainer.designation,
                    course: req.body.trainer.course,
                    id: idq,
                    password: req.body.trainer.password,
                    image: req.body.trainer.image,
                    imagepath: req.body.trainer.imagepath,
                    type:req.body.trainer.type
        
                }
              //   console.log(trainer.id+"third")
                sendMail(trainer).then((result)=>{
                    console.log("Email sent",result)
                })
                .catch((error)=>{
                    console.log(error.message)
                })
            var trainer = LoginData(trainer);
            trainer.save();
            NewApplData.findByIdAndDelete({"_id":id})
            .then(()=>{
           
            res.send();
        })
         }
    })
    .catch((error)=>{
      
       console.log(error)
        
    })
    
     
  })


// Approve trainer new end

//  app.get('/id',function(req,res){
//     LoginData.findOne().sort({id:-1})
//      .then((data)=>{
//         if(data.id){
//           let idnew = data.id;
//             var num=   idnew.slice(-2)
//             let  id1=parseInt(num);
//             id2= id1 + 1
//             if(id2<10){
//             id2= `0`+`${id2}`
//             }
//             let id=`TR`+`${id2}`
       
//             res.send({id})
//           }
         
//      })
//      .catch(()=>{
//         id="TR01"
//         res.send({id}) 
//      })
     
   
  
//  })



// sign up of new applicants
app.post('/newappl',function(req,res){
   
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
     NewAppl=
        {
            name: req.body.trainer.name,
            email: req.body.trainer.email,
            phone: req.body.trainer.phone,
            address: req.body.trainer.address,
            highestQualification: req.body.trainer.highestQualification,
            skillSet: req.body.trainer.skillSet,
            companyName: req.body.trainer.companyName,
            designation: req.body.trainer.designation,
            course: req.body.trainer.course,
            id: req.body.trainer.id,
            password: req.body.trainer.password,
            image: req.body.trainer.image,
            imagepath: req.body.trainer.imagepath
        }
        let trainerData = req.body  
        var trainer = {
                 
            email:req.body.trainer.email,
                      
           }   
        //    checking with admins mail id
        if(username === trainer.email){
            let error ="User Already exists";
           
            res.send({error})
            
        }
        // checking in database of new applicants
        else{
            LoginData.findOne({email: trainer.email})
            .then((data)=>{
                if(data==null){
                    NewApplData.findOne({email: trainer.email})  
                    .then((data)=>{
                        
                        if(data==null){
                            var newAppl = new NewApplData( NewAppl);
                            newAppl.save();
                                let error ="new User";
                                res.status(200).send({error});
                        }
                        else{
                        
                            let error ="Already applied";
                             res.send({error}) 
                        }
                        
                    })
                }
                else{
                    let error ="User Already exists";
                       
                    res.send({error}) 
                }
            })

         
      
    }

  
});



const nodemailer = require('nodemailer')
const {google} = require('googleapis')

const CLIENT_ID = '969416498839-luqrjn5g86hmiskk50nebjnv0mt4nbfd.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//045QNxudOy6-4CgYIARAAGAQSNwF-L9IrFJhDKPQk-tDVOWAYpSw_wFmPI9KaQaX8vvbr6rSSTspGLXdCzzYcqQLCdhBybukMu7Y'

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN})


async function sendMail(trainer){
try{
    const accessToken = await oAuth2Client.getAccessToken()
    const transport = nodemailer.createTransport({

        service:'gmail',
        auth:{
            type:'OAuth2',
            user:'sreeprasanth863@gmail.com',
            clientId:CLIENT_ID,
            clientSecret:CLIENT_SECRET,
            refreshToken:REFRESH_TOKEN,
            accessToken:accessToken
        }
    })

     mailOptions = {
        from:'sreeprasanth863@gmail.com',
        to:trainer.email,
        subject:'Sucessfull Enrollment in ICTAK as Trainer',
        text: 'Type of employment is '+ trainer.type + '. Your ID is ' + trainer.id +'. You can login using the email id and password used for signup.'

    }
const result = await transport.sendMail(mailOptions)
return result
}
catch(error){
return error
}
}

async function sendMailDecline(trainer){
    try{
        const accessToken = await oAuth2Client.getAccessToken()
        const transport = nodemailer.createTransport({
    
            service:'gmail',
            auth:{
                type:'OAuth2',
                user:'sreeprasanth863@gmail.com',
                clientId:CLIENT_ID,
                clientSecret:CLIENT_SECRET,
                refreshToken:REFRESH_TOKEN,
                accessToken:accessToken
            }
        })
    
         mailOptions = {
            from:'sreeprasanth863@gmail.com',
            to:trainer.email,
            subject:'Your Application for trainer enrollment in ICTAK is declined',
            text: 'Sorry your application has been rejected.'
    
        }
    const result = await transport.sendMail(mailOptions)
    return result
    }
    catch(error){
    return error
    }
    }

app.listen(3000,()=>{
    console.log(`Listening to port 3000`)
})