const express = require('express');
const app = express();
const session = require('express-session')
const cookieParser = require('cookie-parser');
const path = require('path');

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./static"));
app.use(session({secret:'my-key'}));

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