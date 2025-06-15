const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter user name"]
    },
    email: {
        type: String,
        required: [true, "please enter email"],
        unique: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, "please enter password"],
        minLength: [6, "please enter at least 6 characters"]
    },
    photo: {
        type: String,
        default: "https://res.cloudinary.com/dkd5jblv5/image/upload/v1675976806/Default_ProfilePicture_gjngnb.png"
    },
    phone: {
        type: String,
        default: "+251"
    },
    bio: {
        type: String,
        maxLength: [250, "Bio must not be greater than 250 characters"],
        default: "Bio"
    }
}, {
    timestamps: true
})

//hashing password before stored to db
userschema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        console.log("Password not modified, skipping hash")
        return next()
    }
    try {
        console.log("Original password before hash:", this.password)
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        console.log("Hashed password:", this.password)
        next()
    } catch (error) {
        console.error("Error hashing password:", error)
        next(error)
    }
})

const usermodel = mongoose.model('user', userschema)
console.log(usermodel)
module.exports = usermodel;