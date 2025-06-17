const express = require('express')
const { userregister, loginuser, logout, getuser ,loggedenstatus,forgetpassword,updateuser,changepassword} = require('../controller/usercontroller')
const protect = require('../middleare/authmiddleware')
const router = express.Router()

// Public routes
router.post('/register', userregister)
router.post('/login', loginuser)
router.get('/logout', logout)

// Protected routes
router.get('/getuser', protect, getuser)
router.get('/loggden', loggedenstatus)
router.patch('/updateuser',protect, updateuser)
router.patch('/changepassword',protect, changepassword)
router.post('/forgetpassword',protect,forgetpassword )

module.exports = router
