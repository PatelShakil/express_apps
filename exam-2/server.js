const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000
const authRoutes = require('./routes/authRoutes');
const homeRoutes = require('./routes/homeRoutes');
const session = require('express-session');
const db = require('./config/db')
const auth = require('./middleware/authMiddleware');
const cookieParser = require('cookie-parser');

app.use(express.urlencoded({extended:true}));
app.use('/public',express.static('./public'));
app.use('/uploads',express.static('./uploads'));

app.use(session({secret:"secret"}))
app.use(cookieParser())

app.set("view engine",'ejs')
app.set('views','./views')

app.get('/',auth(['student','teacher']),(req,res)=>{res.render('home',{user:null})})
app.use('/',authRoutes);
app.use('/',homeRoutes);

app.listen(port , ()=> console.log('> Server is up and running on port : ' + port))