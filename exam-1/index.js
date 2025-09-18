const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const connectDB = require('./config/db');
const Product = require('./models/Product');

connectDB();

app.use(express.urlencoded({extended:true}))
// app.use(express.json());
app.use(cookieParser());

app.set("view engine",'ejs');
app.set("views",'./views');

app.use(express.static('public'));
app.use('/uploads',express.static('uploads'));

app.get('/',async (req,res)=>{
    res.render('index',{products: await Product.find()})
})

app.use('/',authRoutes);
app.use('/product',productRoutes);
app.use('/order',orderRoutes)

app.listen(PORT,(req,res)=>{
    console.log("Listening at port : "+ PORT);
})