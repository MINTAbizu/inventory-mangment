const asynchandler = require('express-async-handler')
const usermodel = require('../usermodel/usermodel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

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

module.exports = {
    userregister,
    loginuser,
    logout
}