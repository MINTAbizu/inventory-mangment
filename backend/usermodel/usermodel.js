const mongoose=require('mongoose')
const bcrypt=require=('bcrypt')

const userschema=new mongoose.Schema({
    name:{type:String,required:[true,"Please enter user name"]},
    email:{
        type:String,
         required:[true,"please enter email "],
            unique:true ,trim:true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
        
              },
      password:{
            type:String,
            required:[true,"please enter password"],
            minLength:[6,"please enter at least 6 characters"],
            // maxLength:[23,"password must not be greater than 23 characters"]
                        },
        photo:{
            type:String,
            required:[true,"please enter a photo"],
            default:""


            } ,
        phone:{
            type:String,
            required:[true,"Please enter a phone"],
            default:"+251"
        },
        bio:{
            type:String,
            maxLength:[250,"Bio must not be greater than 250 characters"],
            default:"Bio"
        }
            
            
     
},{
    timestamps:true 
})



//hasing password befor stored to db
userschema.pre('save',async function(next){
 //passwordhashed
 if(!this.isModified('password')){
    return next()
 }
       const salt= bcrypt.genSalt(10)

       const passwordhashed= await bcrypt.hash(this.password,salt)
       const password=passwordhashed
      next()
})


   




const usermodel=mongoose.model('user',userschema)
console.log(usermodel)
module.exports = usermodel;