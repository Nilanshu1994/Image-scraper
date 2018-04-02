var mongoose = require("mongoose");
var mongomodels = require("../models/model");

mongoose.connect("mongodb://nilanshu:imagescraper@ds129939.mlab.com:29939/searchdata");

module.exports = {
    searchcreate : (data) =>{
        return new Promise((resolve,reject) =>{
        mongomodels.findOneAndUpdate({searchparam:data},{searchparam:data},{upsert:true},function(err,data){
            if(err) reject(err);
            else resolve(data);
                })
            })
         },

    searchfind : (data) =>{
        return new Promise((resolve,reject) =>{
            mongomodels.find({},function(err,data){
                if(err) reject(err);
                else resolve(data);
             })
            })
         }
}