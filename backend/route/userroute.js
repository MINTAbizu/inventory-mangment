const express=require('express')
const registercontroller=require('../controller/usercontroller')
const router=express.Router()


router.post('/register', registercontroller)


module.exports=router
