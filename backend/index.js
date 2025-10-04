const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cookieparser = require('cookie-parser')
const userroute = require('./route/userroute.js')
const  itemrouter=require('./route/itemroute.js')
const cors = require('cors')
// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieparser())

// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173', // Vite's default port
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

// Routes
app.use("/api/user", userroute)
app.use("/api/items", itemrouter)

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