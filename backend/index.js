const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')    
// const cors=require('cors')
const bcrypt=require('bcrypt')
const cookieparser=require('cookie-parser')

const userroute=require('./route/userroute.js')


const app=express()
const PORT=process.env.PORT ||5000

//middleware
 
app.use(express.json());
app.use(express.urlencoded({extended:false}))
// app.use(bodyparser.json())

//user middle ware
app.use("/api/users",userroute)

mongoose.connect('mongodb://127.0.0.1:27017/user')
  .then(() => console.log('Connected!'));











  app.listen(PORT,()=>{
    console.log("server is running on port " + PORT)
  })
// mongoose
//     .connect(process.env.MONGOOSE_URL)
//         .then(()=>{
//             app.listen(PORT,()=>{
//               console.log("server is running on port "&{PORT })

// })

//         }).cacth((err)=>console.log(err))