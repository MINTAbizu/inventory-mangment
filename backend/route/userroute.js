const express = require('express')
const { userregister, loginuser, logout, getuser ,loggedenstatus,updateuser} = require('../controller/usercontroller')
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

module.exports = router
