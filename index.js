var multer = require("multer");
var express = require("express");
const path = require('path');
const app = express();
const port = 3000;
const { v4: uuidv4 } = require('uuid');
app.use('/uploads/images', express.static(path.join('uploads', 'images')));
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg'
};
app.get("/", (req, res) => {
  res.send("hello developers");
});

app.listen(port, () => {
  console.log("we are listening to the port: " + port);
});

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
    cb(null, './uploads/images');
    },
    filename: function (req, file, cb) {
    cb(null , file.originalname);
    
    }
   });

   var upload = multer({ storage: storage });
app.post('/single', upload.single('profile'), (req, res) => {
    try {
    res.send(req.file);
    }catch(err) {
    res.send(400);
    }
   });

   

   app.post('/bulk', upload.array('profiles', 4) , (req, res) =>{
    try {
    res.send(req.files);
    } catch(error) {
    console.log(error);
    res.send(400);
    }
   });