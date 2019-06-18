// require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')
const db = require('./models')
const cheerio = require('cheerio')
const axios = require('axios')
const API_PORT = 3001
const app = express()
const router = express.Router()

// this is our MongoDB database
var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines'

// connects our back end code with the database
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
let dbConn = mongoose.connection

// checks if connection with the database is successful
dbConn.once('open', () => console.log('MongoDB connection open'))
dbConn.on('error', console.error.bind(console, 'MongoDB connection error:'))

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(logger('dev'))

// append /api for our http requests
app.use('/api', router)

require('./routes.js')(cheerio, axios, db, router)

app.listen(API_PORT, () => console.log(`🌎 listening on port ${API_PORT}`))