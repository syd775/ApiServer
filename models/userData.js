const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, default:'' },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, default: '' },
    likedPets: {type: Array},
    preferences: {
        petType: {type: String, default: ''},
        petGender: {type: String, default: ''},
        petAge: {type: String, default: ''},
        city: {type: String, default: ''},
        state: {type: String, default: ''}
    }
});

module.exports = mongoose.model('users', userSchema);