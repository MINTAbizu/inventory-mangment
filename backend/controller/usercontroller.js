const asynchandler = require('express-async-handler')
const usermodel = require('../usermodel/usermodel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const crypto=require('crypto')

const token=require('../usermodel/tokenmodel')
// const { use } = require('react')
// const { json } = require('express')

//generate token
const generatetoken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"})
}

// Register user
const userregister = asynchandler(async (req, res) => {
    const {email, password, name} = req.body

    //validation
    if(!email || !password || !name){
        return res.status(400).json({msg: "please enter all required information"})
    }

    if(password.length < 6){
        return res.status(400).json({msg: "password at least greater than 6 character"})
    }

    // check user existed by email
    const userexists = await usermodel.findOne({email})

    if(userexists){
        return res.status(400).json({msg: "email already existed"})
    }

    // create user (password will be hashed by the model's pre-save hook)
    const user = await usermodel.create({
        name,
        email,
        password
    })

    const token = generatetoken(user._id)
    res.cookie("token", token, {
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), //1day
        sameSite: 'none',
        secure: true
    })

    if(user){
        const {name, _id, email, phone, photo} = user
        return res.status(201).json({
            name,
            _id,
            email,
            phone,
            photo,
            token
        })
    } else {
        return res.status(400).json({
            msg: "invalid user data"
        })
    }
})

// Login user
const loginuser = asynchandler(async (req, res) => {
    const {email, password} = req.body

    //validation
    if(!email || !password){
        return res.status(400).json({msg: "Please provide all required fields"})
    }

    //check user existed
    const user = await usermodel.findOne({email})
    console.log("Found user:", user ? "Yes" : "No")

    if(!user){
        return res.status(400).json({msg: "user is not existed"})
    }

    console.log("Input password:", password)
    console.log("Stored hashed password:", user.password)

    const ispasswordiscorrect = await bcrypt.compare(password, user.password)
    console.log("Password comparison result:", ispasswordiscorrect)

    if(!ispasswordiscorrect){
        return res.status(400).json({msg: "Invalid password"})
    }

    const token = generatetoken(user._id)
    res.cookie("token", token, {
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), //1day
        sameSite: 'none',
        secure: true
    })

    const {name, _id, email: userEmail, phone, photo} = user
    return res.status(200).json({
        name,
        _id,
        email: userEmail,
        phone,
        photo,
        token
    })
})

//logout

const logout=asynchandler(async(req,res,next)=>{
     res.cookie("token", "", {
        path: '/',
        httpOnly: true,
        expires: new Date(0), //0 
        sameSite: 'none',
        secure: true
    })
    res.status(200).json({msg:"successfuly logod out"})
})

// getuser
const getuser = asynchandler(async (req, res) => {
    const user =await user.findById(req.user._id)
    if (user) {
        const { name, _id, email, phone, photo } = user
        return res.status(200).json({
            name,
            _id,
            email,
            phone,
            photo,
            bio
        })
    } else {
        return res.status(400).json({ msg: "User not found" })
    }
})
//loggdenstatus
const loggedenstatus =asynchandler(async(req,res)=>{

    const token=req.cookies.token
    if(!token){
       return res.json(false)
    }
    //verfied token
    const verified = jwt.verify(token, process.env.JWT_SECRET)

    if(verified){
        return res.json(true)

    }
       return res.json(false)

})


// updateuser information

const updateuser =asynchandler(async(req,res)=>{

     const user =await user.findById(req.user._id)
    if (user) {
        const { name, email, phone, photo ,bio} = user
        user.email=email;
        user.name=req.body.name || name;
        user.phone=req.body.phone || phone ;
        user.photo=req.body.photo || photo;
        user.bio=req.body.bio || bio ;
 const updatedeuser= await user.save()
        res.json({
            nam:updatedeuser.name,
             _id:updatedeuser._id,
              email:updatedeuser.email, 
              phone:updatedeuser.phone,
               photo:updatedeuser.photo,
            
               bio:updatedeuser.bio

        })


    }else{
        res.status(400).json({
            msg:"user is not found"
        })
    }
    res.send('update user')

})

//changepassword
const changepassword= asynchandler(async(req,res,next)=>{
     const user = await usermodel.findById(req.user._id)
     const {oldpassword,newpassword}=req.body
     if(!user){
        return res.status(400).json({msg:"user is not found: Please signup!"})
     }
     //validate password
     if(!oldpassword || !newpassword){
        return res.status(400).json({msg:"Please enter old password and new password"})
     }
     //check if the password is match to db password stored
     const ispasswordmatch = await bcrypt.compare(oldpassword, user.password)

     if(user && ispasswordmatch){
        user.password = newpassword
        await user.save()
        return res.status(200).json({msg: "Password changed successfully"})
     }else{
        return res.status(400).json({msg: "Old password is not correct"})
     }
})

//forgetpassword
const forgetpassword = asynchandler(async(req,res,next)=>{
    const {email} = req.body;

    const userexist = await usermodel.findOne({email});

    if(!userexist){
        return res.status(400).json({
            msg: "user is not existed"
        });
    }

    const reseatetoken = crypto.randomBytes(32).toString("hex") + "_" + userexist._id;
    console.log(reseatetoken);
    //hashe password before stored to db
    const hashedToken =crypto.
    createHash('sha256')
    .update(reseatetoken)
    .digest('hex')
    console.log("hashedToken: " + hashedToken)

    res.send('forgetpassword')
})


























module.exports = {
    userregister,
    loginuser,
    logout,
    getuser,
    loggedenstatus,
    updateuser,
    changepassword,
    forgetpassword
}