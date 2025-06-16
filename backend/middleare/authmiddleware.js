const asynchandler = require('express-async-handler')
const usermodel = require('../usermodel/usermodel')
const jwt = require('jsonwebtoken')

const protect = asynchandler(async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ msg: "Not authorized, no token" })
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET)
        if (!verified) {
            return res.status(401).json({ msg: "Not authorized, token failed" })
        }

        const user = await usermodel.findById(verified.id).select('-password')
        if (!user) {
            return res.status(401).json({ msg: "User not found" })
        }

        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({ msg: "Not authorized, please login" })
    }
})

module.exports = protect