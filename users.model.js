import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    likedPets: [Object],
    preferences: {
        phone: { type: String },
        city: { type: String },
        state: { type: String },
        typePref: { type: String },
        agePref: { type: String },
        genderPref: { type: String }
    }
})

const Users = mongoose.model('users', userSchema);
module.exports = Users;