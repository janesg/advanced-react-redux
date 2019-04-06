const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the user model
const userSchema = new Schema({
    email: { 
        type: String,
        unique: true ,
        lowercase: true
    },
    password: String
});

// Before saving a model, this pre function is called
userSchema.pre('save', next => {
    // Get access to the user model
    const user = this;
    const saltRounds = 10;
    
    // Generate a salt and then run callback function
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
            return next(err);
        }
        
        // hash (encrypt) password using the salt
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) {
                return next(err);
            }
            
            // overwrite plaintext password with hashed version
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = (candidatePassword, callback) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) {
            return callback(err);
        }
        
        callback(null, isMatch);
    });
};

// Create the model class for collection of 'user'
const ModelClass = mongoose.model('user', userSchema);

module.exports = ModelClass;
