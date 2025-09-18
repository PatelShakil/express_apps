const User = require('../models/User')

const router = require('express').Router()
const auth = require('../middleware/authMiddleware');


router.get('/home',auth(['student','teacher']),async (req , res)=>{
    
    const user = await User.findById(req.user.id);
    res.render('home',{user:user})
})


module.exports  = router