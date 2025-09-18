const jwt = require('jsonwebtoken');

const authMiddleware = (roles = []) => {
    return async (req, res, next) => {
        try{
            const token = req.cookies['token'];

            if(!token) return res.render('login',{error:"Token not found"});

            const decoded = jwt.verify(token,process.env.SECRET)
            req.user = decoded;

            if(roles.length && !roles.includes(req.user.role)){
                return res.render('login',{error:"Access Forbidden"})
            }

            next();
        }catch(err){
            return res.render('login',{error:err})
        }
    }
}


module.exports = authMiddleware