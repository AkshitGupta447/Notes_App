// jwt token formation during login

const token = jwt.sign({
    userId: user.userId,
    email: user.email,
    username: user.username
},
    process.env.JWT_SECRET
)

res.cookies("token",token)



// auth.middleware

const jwt = require("jsonwebtoken");

function auth(req,res,next){

try{

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            messgae: "Unauthorized"
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {userId: decoded.userId}
    // now req.user.userId will store userId now we don't need to decode again in down routes

    if(!req.user){
        return res.status(401).json({
            messgae: "Invalid Token Payout"
        })
    }
    // to make sure req.user.userId is present , it is possible that we forgot to put userId at token or someone potentinally tempered our id/token


}catch(err){

    return res.status(401).json({
        messgae: "Unauthorized"
    })  

}

    next();
}

module.exports = auth;