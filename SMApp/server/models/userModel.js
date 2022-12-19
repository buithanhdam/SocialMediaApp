const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {type: String, require: true },
    password: {type: String, require: true },
    firstname: {type: String, require: true },
    lastname: {type: String, require: true },
    profilePicture: {type: String, default: '' },
    coverPicture: {type: String, default: '' },
    age:{type:String,require: true},
    livein: String,
    about: String,
    followers: [],
    followings: [],


},{timestamps: true});

const UserModel = mongoose.model('User',UserSchema);
module.exports = UserModel;