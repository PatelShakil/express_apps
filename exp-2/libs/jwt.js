const jwt = require('jsonwebtoken');
function signToken(username, role) {
    // const token = jwt.sign({ username, role }, process.env.JWT_SECRET, {
    //     expiresIn: '1h'
    // });
    console.log(process.env.JWT_SECRET);
    const token = jwt.sign({ username, role }, "My Key", {
        expiresIn: '1h'
    });
    return token;
}

module.exports = { signToken };