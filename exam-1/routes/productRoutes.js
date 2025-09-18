const express = require('express')
const auth = require('../middleware/authMiddleware');
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');

const router = express.Router();


var options = multer.diskStorage({
  destination: (req,file,cb)=>{
    if(!file.mimetype.startsWith("image")) return cb("Invalid File Type"); else return cb(null,"./uploads");
  },
  filename:(req,file,cb)=>{
    return cb(null,Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({storage:options})


router.get('/',auth(['customer','admin']),async (req,res)=>{
    try {
        const products = await Product.find();
        res.render('products',{products,isAdmin:req.user?.role == 'admin'});
    } catch (error) {
        res.render('products',{products:[],isAdmin:req.user?.role == 'admin', error:"No Products Found"});
    }
})

router.post('/',auth(['admin']),upload.single('photo'),async (req,res)=>{
    try {
        const product = new Product(req.body);
        product.photo = req.file ? req.file.path : null;
        await product.save();
        return res.redirect('product');
    } catch (err) {
        return res.status(500).send({message:err});
    }
})
router.get('/delete',auth(['admin']),async (req,res)=>{
    try {
        const product = await Product.findById(req.query.id)
        await product.deleteOne();
        return res.redirect('product');
    } catch (err) {
        return res.render('product');
    }
})

module.exports = router;