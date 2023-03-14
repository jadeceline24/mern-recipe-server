const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    saveRecipe: [{type: mongoose.Schema.Types.ObjectId, ref: 'recipes'}]

})


const UserModel = mongoose.model('users', UserSchema) //user will be put in database
module.exports = UserModel