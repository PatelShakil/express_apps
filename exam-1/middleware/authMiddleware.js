const jwt = require('jsonwebtoken');

const authMiddleware = (roles = [])=>{
    return (req,res,next)=>{
        const token = req.cookies['token'];

        if(!token) return res.status(401).send({message:"Unauthorized Access"});

        try{
            const decoded = jwt.verify(token,"secret");
            req.user = decoded;

            if(roles.length && !roles.includes(req.user.role)) {
                return res.render('login',{error:"Forbidden"});
            }

            next();
        }catch(er){
            return res.status(401).render('login',{error:"Invalid Token! Login Again"});
        }
    }
}


module.exports = authMiddleware;