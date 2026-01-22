const asynchandler = require('express-async-handler')
const usermodel = require('../usermodel/usermodel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
// const crypto=require('crypto')

const token=require('../usermodel/tokenmodel')
// const sendEmail = require('../utils/sendemail.js')
// const { Suspense } = require('react')
// const { use } = require('react')
// const { json } = require('express')

//generate token
const generatetoken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "30d"})
}

// Register user


const userregister = asynchandler(async (req, res) => {
  const { name, email, password } = req.body;

  console.log("REGISTER BODY:", req.body);

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  if (password.length < 6) {
    return res.status(400).json({ msg: "Password must be at least 6 characters" });
  }

  const userExists = await usermodel.findOne({ email });
  if (userExists) {
    return res.status(400).json({ msg: "Email already exists" });
  }

  // ✅ CREATE USER
  const user = await usermodel.create({
    name,
    email,
    password,
  });

  console.log("USER CREATED:", user._id);

  // ✅ GENERATE TOKEN
  const token = generatetoken(user._id);

  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",   // IMPORTANT for localhost
    secure: false,     // IMPORTANT for localhost
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
});



// const userregister = asynchandler(async (req, res) => {
//     console.log(req.body);
//     const {email, password, name} = req.body
// try {
//      //validation
//     if(!email || !password || !name){
//         return res.status(400).json({msg: "please enter all required information"})
//     }

//     if(password.length < 6){
//         return res.status(400).json({msg: "password at least greater than 6 character"})
//     }

//     // check user existed by email
//     const userexists = await usermodel.findOne({email})

//     if(userexists){
//         return res.status(400).json({msg: "email already existed"})
//     }

//     // create user (password will be hashed by the model's pre-save hook)
//     const user = await usermodel.create({
//         name,
//         email,
//         password
//     })

//     const token = generatetoken(user._id)
//     res.cookie("token", token, {
//         path: '/',
//         httpOnly: true,
//         expires: new Date(Date.now() + 1000 * 86400), //1day
//         sameSite: 'none',
//         secure: true
//     })

//     if(user){
//         const {name, _id, email, phone, photo} = user
//         return res.status(201).json({
//             name,
//             _id,
//             email,
//             phone,
//             photo,
//             token
//         })
//     } else {
//         return res.status(400).json({
//             msg: "invalid user data"
//         })
//     }
    
// } catch (error) {
//       console.error("Registration error:", error);
//     return res.status(500).json({ msg: "Internal server error" });
    
// }
   
// })
// const userregister = asynchandler(async (req, res) => {

//     const { email, password, name } = req.body;

//     if (!email || !password || !name) {
//         return res.status(400).json({ msg: "Please enter all required information" });
//     }

//     if (password.length < 6) {
//         return res.status(400).json({ msg: "Password must be at least 6 characters long" });
//     }

//     const userexists = await usermodel.findOne({ email });
//     if (userexists) {
//         return res.status(400).json({ msg: "Email already exists" });
//     }

//     try {
//         // const user = await usermodel.create({ name, email, password });
//         const token = generatetoken(userexists);
//         res.cookie("token", token, {
//             path: '/',
//             httpOnly: true,
//             expires: new Date(Date.now() + 1000 * 86400), // 1 day
//             sameSite: 'none',
//             secure: true
//         });
        
//         // const {  phone, photo } = userexists; // Adjust fields as necessary
//         return res.status(201).json({});
        
//             // console.log(req.body); // Log the incoming request body


//     } catch (error) {
//         console.error("Error during user creation:", error);
//         return res.status(500).json({ msg: "Internal server error" });
//     }
// });
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

    // console.log("Input password:", password)
    // console.log("Stored hashed password:", user.password)

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
    const user =await usermodel.findById(req.user._id)
    if (user) {
        const { name, _id, email, phone, photo,bio } = user
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

     const user =await usermodel.findById(req.user._id)
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
// const forgetpassword = asynchandler(async(req,res,next)=>{
//     const {email} = req.body;

//     const userexist = await usermodel.findOne({email});

//     if(!userexist){
//         return res.status(400).json({
//             msg: "user is not existed"
//         });
//     }

//     const reseatetoken = crypto.randomBytes(32).toString("hex") + "_" + userexist._id;
//     console.log(reseatetoken);
//     //hashe password before stored to db
//     const hashedToken =crypto.
//     createHash('sha256')
//     .update(reseatetoken)
//     .digest('hex')


//     await new token({
//         userId:userexist._id,
//         token:hashedToken,
//         createdAt:Date.now(),
//         expiresAt:Date.now()+ 30 *(60*1000),
//     }).save()
//     console.log("hashedToken: " + hashedToken)
    

//     //COnstruct reseat url
// // =http://localhost:3000

//     const reseturl=`${process.env.FRONTEND_URL}/reseatpassword/${reseatetoken}`
 

//     //message

//     const message= `<h1>Hellow ${userexist.name}</h1>
//     <P>please use the url below to reseat your passwor</P>
//     <P>this url is only avilabel for 30m</P>
//     <a href=${reseturl} clicktracking=off>${reseturl}</a>
//     `;
//     const subject='password reseat Request '
//     const send_to=userexist.email
//     const send_from=process.env.EMAIL_USER
//     try {
//         await sendEmail(subject,send_to,send_from,message)
//         res.status(200).json({Success:true,msg:"Reset password email sent successfully"})
//     } catch (error) {
//         res.status(500).json({error:"Error sending reset password email: " + error})
//     }
    
//     // Remove the unreachable res.send
//     // res.send('forgetpassword')
// })


























module.exports = {
    userregister,
    loginuser,
    logout,
    getuser,
    loggedenstatus,
    updateuser,
    changepassword,
    // forgetpassword
}