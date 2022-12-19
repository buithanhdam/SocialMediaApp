const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//register a new user
const registerUser = async (req,res) => {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);
    req.body.password = hashedPassword;
    const newUser = new UserModel(req.body);
    const {username} =req.body;
    try {

        const olduser = await UserModel.findOne({username:username})
        console.log(olduser)
        if (olduser) {
            return res.status(400).json({message:"Username is already existed!"})
        }
       const user= await newUser.save();
        const token = jwt.sign({username: user.username,id: user._id},process.env.JWT_SIGN_TOKEN,{expiresIn:'1h'})
        res.status(200).json({user,token});
    } catch (error) {
        res.status(500).json({message : error.message});
    };

}

// login user
const loginUser = async (req,res) => {

    const{username,password} = req.body;
    try {
        const user = await UserModel.findOne({username: username});
        if(user){
            const validate =  await bcrypt.compare(password,user.password);

            if (!validate) {
                res.status(400).json("Wrong password")
            }else{
                const token = jwt.sign({username: user.username,id: user._id},process.env.JWT_SIGN_TOKEN,{expiresIn:'1h'})
                res.status(200).json({user,token});
        
            }
                
        }else{
            res.status(404).json("User does not exist");
        }
    } catch (error) {
        res.status(500).json({message : error.message});
    };
};

module.exports = {registerUser,loginUser};

