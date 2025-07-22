const express = require('express')
const app = express()
const router = require('./routes/product')
const port = 8000

const cookieParser = require('cookie-parser');
const path = require('path');
const multer = require('multer');

app.use(cookieParser())
app.use(express.static("./static"))
app.use(express.urlencoded({extended:true}))

var options = multer.diskStorage({
  destination: (req,file,cb)=>{
    if(file.mimetype !== "image/*") return cb("Invalid File Type"); else return cb(null,"./uploads");
  },
  filename:(req,file,cb)=>{
    return Date.now() + path.extname(file.originalname);
  }
})

const upload = multer({storage:options})

app.get('/process_get',(req,res)=>{
  res.send(req.query.fname + " " + req.query.lname)
})

app.post('/process_post',(req,res)=>{
  res.send(req.body.fname + " " + req.body.lname)
})

app.get('/set-cookie',(req,res)=>{
  res.cookie("key",'value')
  res.status(200).send(req.cookies)
})

app.post('/file_upload',upload.single("myfile"),(req,res)=>{
  res.send({
    status: "success",
    message: "File uploaded successfully",
    file: req.file.path
  })
})

app.post('/photos_upload',upload.array("photos"),(req,res)=>{
  res.send({
    status: "success",
    message: "Files uploaded successfully",
    files: req.files.map(file => file.path)
  })
})

app.use('/product',router)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);  
});