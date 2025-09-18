const router = require('express').Router()
const Order = require('../models/Order');
const auth = require('../middleware/authMiddleware');
const Product = require('../models/Product');


router.get("/",auth(['customer']),async(req,res)=>{
    const products = await Product.find();
    res.render("order",{products,error:null});
});

router.get("/all" ,auth(['customer']),async (req , res)=>{
    // router code here
    try {
        const orders = await Order.find({userId:req.user.id}).populate('products.productId');
        console.log(orders);
        res.render('my-orders',{orders});
    } catch (err) {
        res.status(500).send({message:err});
    }
})

router.post('/',auth(['customer']),async (req,res)=>{
    try {

        const {products} = req.body;
        let prods = [];
        let totalAmount = 0;

        for(let r in products){
            const{id,quantity} = products[r];
            if(!id) continue;

            const product = await Product.findById(id);
            totalAmount += product.price * quantity;
            prods.push({
                productId:product._id,
                quantity:quantity
            })
        }

        const order = new Order({
            userId:req.user.id,
            totalAmount:totalAmount,
            products:prods
        });
        await order.save();
        res.redirect('/order/all');
    } catch (err) {
        res.render('order',{error:err,products:await Product.find()});
    }
})


module.exports  = router