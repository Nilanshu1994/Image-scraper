var Jimp = require("jimp"),
    download = require('image-downloader');



var jimpfunc = (filename)=>{
        Jimp.read(filename)
        .then((img) => {
            img.resize(500, 500)            // resize
               .quality(90)
               .greyscale()                 // set greyscale 
               .write(`./public/images/grey/${filename.replace("./public/images/","")}`);
    })
    .catch((error) => console.log("errorjimp :" +error))
    };


module.exports.downloadfunc = (data,file)=>{
      return new Promise((resolve) =>{
      var value = [];
        for(var i=0;i<data.length;i++)
        {
        value.push(download.image({
                url: data[i].url,
                dest: `./public/images/${file}${i}.jpg`
                })
                .then((val) => {
                    jimpfunc(val.filename);
                })
                .catch((err) => console.log("errormap : " + err))
            );
        }
        Promise.all(value).then((data) => resolve(data))
    })  
    }
