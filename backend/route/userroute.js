const express = require('express')
const { userregister, loginuser,logout} = require('../controller/usercontroller')
const router = express.Router()

router.post('/register', userregister)
router.post('/login', loginuser)
router.get('/logout',logout)

module.exports = router
