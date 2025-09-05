
const jwt = require("jsonwebtoken");

function auth(req,res,next){

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }

    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        
        console.log("Decoded JWT:", decoded);
        req.user = { userId: decoded.userId };
        console.log('UserID from Auth: ',req.user);
        
        if (!req.user) {
            return res.status(401).json({ message: "Invalid token payload" });
        }


        return next()

    }catch(err){
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
}

module.exports = auth;