const router = require('express').Router()

router.get('/',(req,res)=>{
    res.send("List of Products")
})

router.get('add',(req,res)=>{
    res.send("Add Product")
})

module.exports = router;