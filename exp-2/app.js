const express = require('express');
const app = express();
const session = require('express-session')
const cookieParser = require('cookie-parser');
const path = require('path');
const {check,validationResult} = require('express-validator');
const morgan = require('morgan');
const helmet = require('helmet');

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./static"));
app.use(session({secret:'my-key'}));

app.use(morgan('tiny'));
app.use(helmet())

app.set("view engine", "ejs");
app.set("views","./views");

app.get("/data",(req,res)=>{
    var v1 = 'ABCd Data';
    var v2 = 223423423;
    res.render("data",{v1,v2,ar:[12,3,4,34,545,3]});
});

app.get("/form1",(req,res)=>{
    res.render("form1",{data:{fname:"",lname:""}});

});

app.get("/form2",(req,res)=>{
    res.render("form2",{data:{fname:"",lname:""}});
});

app.post("/submit-form",
    check("fname").trim().escape().notEmpty().withMessage("First name is required"),
    check("lname").trim().escape().notEmpty().withMessage("Last name is required"),
    (req,res)=>{
    console.log(req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()});
    }
    res.send("Form submitted successfully!<br><a href='/form1'>Go back</a>");
});

app.post("/form1",
    check("fname").trim().escape().notEmpty().withMessage("First name is required"),
    check("lname").trim().escape().notEmpty().withMessage("Last name is required"),
    (req,res)=>{
    console.log(req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.render("form1",{errors: errors.array(),data: req.body});
    }
    res.send("Form submitted successfully!<br><a href='/form1'>Go back</a>");
});

app.post('/validate',(req,res)=>{
        console.log(req.body);
const { username, password } = req.body;
    if (username === 'admin' && password === 'password') {
        req.session.user = {username};
        res.cookie('sessionId', req.sessionID, { httpOnly: true });
        res.send('Login successful. Welcome ' + req.session.user.username + '!<br><a href="/">Go to Home</a>');
    } else {
        res.status(401).send('Invalid credentials');
    }
})

app.get('/', (req, res) => {
    if (req.session.user) {
        res.send("Welcome back " + req.session.user.username + "!<br><a href='/logout'>Logout</a>");
    } else {
        res.sendFile(path.join(__dirname, 'static', 'login.html'));
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Could not log out');
        }
        res.clearCookie('sessionId');
        res.send('Logged out successfully<br><a href="/">Login again</a>');
    });
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});