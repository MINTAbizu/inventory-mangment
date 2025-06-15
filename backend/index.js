const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cookieparser = require('cookie-parser')
const userroute = require('./route/userroute.js')

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieparser())

// Routes
app.use("/api/users", userroute)

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/inventory')
    .then(() => {
        console.log('Connected to MongoDB!')
        // Start server only after DB connection is established
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err)
    })