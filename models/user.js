const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('../config/index').secret;
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        required: [true, "is required"],
        index: true,
        unique: [true, "is already taken"]
    },
    email: {
        type: String,
        lowercase: true,
        required: [true, "can't be blank"],
        index: true,
        unique: [true, "is already taken"]
    },
    profile: {
        first_name : String,
        last_name : String
    },
    hash: String,
    salt: String
}, {timestamps: true});

userSchema.plugin(uniqueValidator, {message: 'is already taken.'})

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

userSchema.methods.toAuthJSON = function(){
      return {
            username: this.username,
            email: this.email,
            token: this.generateJWT(),
            bio: this.bio,
            image: this.image
      };
    };

userSchema.methods.generateJsonWebToken = function () {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
    }, secret);
};

const User = mongoose.model('User', userSchema);

module.exports = User;


