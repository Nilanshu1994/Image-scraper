const express = require("express"),
    app     = express(),
    bodyparser= require("body-parser"),
    path = require('path'),
    mongoose = require("mongoose"),
    cors = require('cors'),
    Scraper = require ('images-scraper'),
    google = new Scraper.Google();
    
// Imports
var mongodata = require("./controllers/mongodata");
var controller = require("./controllers/index"); 

// Middlewares
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));  
app.use(bodyparser.urlencoded({extended: true}));


// Routes
//Route to get the main page
app.get("/", function(req,res){
    res.sendFile(path.join(__dirname, 'views/index.html'));
 });

// Route to search and get images from internet
app.post("/search", function(req,res){
    var options = {keyword:req.body.search,num:15,detail:true,nightmare:{show:false}};
    google.list(options)
     .then(images => controller.downloadfunc(images,req.body.search))
     .then(() => mongodata.searchcreate(req.body.search))
     .catch((err) => console.log("scrape :" ,err))
     setTimeout(() => res.send("success"), 28000);
    });

// Route to Get all searched terms from database
app.get("/searcheddata", function(req,res){
    mongodata.searchfind()
    .then((data) => res.json(data))
    .catch((err) => console.log(err))
});

 //Server Initiation
 app.listen(3000, ()=>{
   console.log("The Server Has Started!");
}); 



