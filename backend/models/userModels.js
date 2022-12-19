const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [30, 'Your name cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'Your passord must be longer than 6 characters'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true    
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

//Encrypting password before saving user
userSchema.pre('save', async function(next) {
    
    //Verifica se senha foi alterada
    if (!this.isModified('password'))
        next();

    //Criptografa a senha
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

//Compare user password
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

//Return JWT token 
userSchema.methods.getJwtToken = function() {
    return jwt.sign({ id: this._id  }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

//Generate password reset token
userSchema.methods.getResetPasswordToken = function() {
    
    // Generate token 
    const resetToken = "1212"; //crypto.randomBytes(20).ToString('hex');

    // Hash and sent to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Set token expire time (30 min)
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000; 

    return resetToken;
}


module.exports = mongoose.model('User', userSchema);