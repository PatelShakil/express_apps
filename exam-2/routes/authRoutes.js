const router = require('express').Router();
const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination : (req,file,cb) =>{
        if(!file.mimetype.startsWith('image')) return new Error("Invalid mime type"); 
        else cb(null,'./uploads')
    },
    filename : (req,file,cb)=>{
        return cb(null,Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage});

router.get('/login',(req,res)=>{res.render('login',{error:null})})
router.get('/register',(req,res)=>{res.render('register',{error:null})})


router.post('/register',upload.single('profile'),async(req,res)=>{
    try {
        const user = new User(req.body);
        if(!user.email | !user.password) return res.render('register',{error:"Email & Password is mandatory"});
        if(!req.file) return res.render("register",{error:"Profile is mandatory"})
        user.profile = req.file ? req.file.path : null;

        user.password = await bcrypt.hash(user.password,10)
        await user.save();
        
        const token = jwt.sign({id:user._id,role:user.role},process.env.SECRET,{expiresIn:'1d'});

        res.cookie('token',token,{httpOnly:true})
        res.redirect('home');

    } catch (err) {
        res.render('register',{error:err});
    }
})


router.post('/login',async(req,res)=>{
    try {
        const {email,password} = new User(req.body);
        if(!email | !password) return res.render('login',{error:"Email & Password is mandatory"});

        let user = await User.findOne({email});

        if(!user) return res.render('login',{error:"User not found"});
        
        const isMatch = bcrypt.compare(password,user.password);
        if(!isMatch) return res.render('login',{error:"Invalid Password"});

        const token = jwt.sign({id:user._id,role:user.role},process.env.SECRET,{expiresIn:'1d'});
          res.cookie('token',token,{httpOnly:true})
        res.redirect('home');

    } catch (err) {
        res.render('login',{error:err});
    }
})
router.get('/logout',(req,res)=>{
    res.clearCookie('token')
    res.redirect('/login')
})
module.exports = router;