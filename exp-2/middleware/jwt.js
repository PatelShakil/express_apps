const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
    const token = req.cookies.jwt || req.headers['authorization'];
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }
    try {
        const decoded = jwt.verify(token, "My Key");
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }

}

module.exports = { verifyToken };