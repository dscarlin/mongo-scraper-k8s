require("dotenv").config();
const mongoose = require('mongoose');

const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./data');

const cheerio = require('cheerio');
const axios = require('axios');

const API_PORT = 3001;
const app = express();

const router = express.Router();



// this is our MongoDB database
const dbRoute =
`mongodb://${process.env.HOST}/${process.env.DATABASE}`;

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });
let db = mongoose.connection;

// checks if connection with the database is successful
db.once('open', () => console.log('MongoDB connection open'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));

// append /api for our http requests
app.use('/api', router);

//routes -- mig
router.get('/getData', (req, res) => {
    
    Data.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  });


router.get('/scrape', (req, res) => {
    
    axios.get("https://www.espn.com").then(function(response) {
        console.log('espn grabbed')
        // Load the HTML into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        var $ = cheerio.load(response.data);
        
        // An empty array to save the data that we'll scrape
        var results = [];
        
        // Select each element in the HTML body from which you want information.
        // NOTE: Cheerio selectors function similarly to jQuery's selectors,
        // but be sure to visit the package's npm page to see how it works
        $("div.contentItem__header__headings").each(function(i, element) {
        
        var title = $(element).find('h1').text();
        // Save these results in an object that we'll push into the results array we defined earlier
        results.push({
            title: title
        });
        });
        let bulk = Data.collection.initializeOrderedBulkOp();
        

        for (let i=0; i< results.length; i++) {
            bulk.find({title: results[i].title}).upsert().updateOne({title: results[i].title})
        }
        bulk.execute((err, result) => {
            console.log(err)
            console.log(result)
            if(err)
                res.json(err)
            else
                res.json(result)
        })
        
        
        
    });

});

app.listen(API_PORT, () => console.log(`🌎 listening on port ${API_PORT}`))