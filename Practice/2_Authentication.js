// user.model.js





// user.routes.js

const { body, validationResult, cookie } = require("express-validator");
const userModel = require("../models/user.model");

router.post('/register',
    
    body('username').trim().isLength({min:5}),
    body('email').trim().isEmail().isLength({min:11}),
    body('password').trim().isLength({min:8}),
    
    async (req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ message: "Invalid Data" });
    }


    const {username,email,password} = req.body;

    const hashed_password = await bcrypt.hash(password,10);

    const newuser = await userModel.create({
        username,email,password:hashed_password
    })
    res.json(newuser)

})


router.post('/login',
    body('username').trim().isLength({min:5}),
    body('password').trim().isLength({min:8}),
    async (req,res)=>{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({message: "Invalid Data"});
        }

        const {username,password} = req.body;

        const find_user = await userModel.findOne({username:username})
        if(!find_user){
            return res.status(400).json({message:"Incorrect Username or Password"});
        }
        const isMatch = bcrypt.compare(password,find_user.password)
        if(!isMatch){
            return res.status(400).json({message:"Incorrect Username or Password"});
        }

        const token = jwt.sign({
            userId: find_user._id,
            username: username,
            email: find_user.email
        },process.env.JWT_SECRET)

        res.cookie("token",token)
        res.json(find_user)

    }
)