
// }
const asynchandlre=require('express-async-handler')
const { find } = require('../usermodel/usermodel')
const userregister=asynchandlre(async ()=>{
const usermodel=require('../usermodel/usermodel')
const jwt=require('jsonwebtoken')
const bcrypt =require('bcrypt')
//generate token
 const generatetoken=(id)=>{
    return jwt.sign({id},process.env.JWT_SEKRET,{expiresIn:"1d"})
 }

//validation

    const {email,password,name}=req.body

    if(!email || !password || !name){
        res.status(400).json({msg:"please enter all required information"})

    }

    if(password.length<6){
        res.status(400).json({msg:"password at least greater than 6 character"})
    }
           // chekc user existed by email

       const userexists=   await usermodel.findOne({email})

       if(userexists){
        res.status(400).json({msg:"email already existed"})
       }

// create user 

const user= await usermodel.create({
    name,
    email,
    password:passwordhashed


   
})

const token=generatetoken(user._id)
res.cookie("token",token,{
    path:'/',
    httpOnly:true,
    expires: new Date(Date.now()+1000*86400),//1day
    sameSite:'none',
    secure:true
})

 if(user){
        const {name ,_id, email,phone,photo}=usermodel
        res.status(200).json({
            name ,_id, email,phone,photo,token

        })
    }else{
        res.status(400).json({
            msg:"invalid user data"
        })
    }

     res.send("user")

}
)

// const loginuser

const  loginuser=loginhandler(async(req,res,next)=>{
    res.send("loginuser")
    const {email,password}=req.body
//validation
    if(!email || !password){
        res.status(400).json({msg:"Please provide all required filld"})
    }
//check user existed

const user =user.findOne({email})

if(!user){
    res.status(400).json({msg:"user is not existed"})
}

const ispasswordiscorect= await bcrypt.compare(password, user.password)


if(user && ispasswordiscorect){
       const {name ,_id, email,phone,photo}=usermodel
        res.status(200).json({
            name ,
            _id, 
            email,
            phone,
            photo,
            

        })

}


})
module.exports=userregister