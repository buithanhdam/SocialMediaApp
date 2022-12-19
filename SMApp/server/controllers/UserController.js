const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



//get all user
const getAllUser = async (req,res)=>{
    try {
        let users = await UserModel.find();
        users.map((user,id)=>{
            const {password,...other} = user._doc;
            return other;
        });
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
}
//get a user

const getUser = async (req,res)=>{
    const id = req.params.id;

    
    try {
        const user = await UserModel.findById(id);

        if (user) {
            const {password,...others} = user._doc
            res.status(200).json(others);
        }else{

            res.status(404).json("No user exist")
        }
        
    } catch (error) {
        res.status(500).json({message : error.message});
    }
};

// update a  user
const updateUser = async (req,res) => {
    const id =req.params.id;
    const {_id,password} = req.body;

    if (id === _id ) {

        try {
            if (password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password,salt);
            }
            const user = await UserModel.findByIdAndUpdate(id,req.body,{new: true});
            const token = jwt.sign({username: user.username,id: user._id},process.env.JWT_SIGN_TOKEN,{expiresIn:'1h'});
            res.status(200).json({user,token});
        } catch (error) {
            res.status(500).json({message : error.message});
        }
    }else{
        res.status(404).json("Update denied you only can update your own profile!!")
    }

};

// delete a  user
const deleteUser = async (req,res)=>{
    const id = req.params.id;
    const {currentUserId,currentAdminStatus} = req.body;
    if (id === currentUserId || currentAdminStatus) {
        try {
            await UserModel.findByIdAndDelete(id);
            res.status(200).json("Delete successfully");
            
        } catch (error) {
            res.status(500).json({message : error.message});
        }
    }else{
        res.status(404).json("Update denied you only can delete your own profile!!")
    }

}

// follow a user 
const followUser = async (req,res) => {
    const id = req.params.id;
    const {_id} = req.body;
     
    if (_id === id) {
        res.status(403).json("Action forbidden");
    }else{
        try {
            const followuser = await UserModel.findById(id);
            const followingUser = await UserModel.findById(_id);
            if (!followuser.followers.includes(_id)) {
                await followuser.updateOne({$push :{followers: _id} });
                await followingUser.updateOne({$push :{followings: id} });
                res.status(200).json("User followed");
            }else{
                res.status(403).json("User is already followed by you")
            }
        } catch (error) {
            res.status(500).json({message : error.message});
        }
    }
};
// un follow a user 
const unFollowUser = async (req,res) => {
    const id = req.params.id;
    const {_id} = req.body;
     
    if (_id === id) {
        res.status(403).json("Action forbidden");
    }else{
        try {
            const followuser = await UserModel.findById(id);
            const followingUser = await UserModel.findById(_id);
            if (followuser.followers.includes(_id)) {
                await followuser.updateOne({$pull :{followers: _id} });
                await followingUser.updateOne({$pull :{followings: id} });
                res.status(200).json("User unfollowed");
            }else{
                res.status(403).json("User is already not followed by you")
            }
        } catch (error) {
            res.status(500).json({message : error.message});
        }
    }
};



module.exports = {getUser,updateUser,deleteUser,followUser,unFollowUser,getAllUser};