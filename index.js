const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
    

let allFiles = [];

const storage = multer.diskStorage(
    {
        destination: './sound_files/',
        filename: function (req, file, cb ) {
            cb( null, file.originalname);
            allFiles.push(file.originalname)
        }
        
    }
);


getFiles();
function getFiles() {

        //allFiles = []

        const directoryPath = path.join(__dirname, 'sound_files');
    //passsing directoryPath and callback function
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            //return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            allFiles.push(file)
        });
});

}


const upload = multer( { storage: storage } );

 const app = express();
const port = 1247;

 app.use(express.static('./'));

app.post("/notes", upload.single("audio_data"), function(req,res){
    res.status(200).send("ok");
});


app.get('/sounds', (req, res) => {

    //getFiles()
    res.send(allFiles)
})

app.listen(port, () => {
    //console.log(`Express server listening on port: ${port}...`);
});