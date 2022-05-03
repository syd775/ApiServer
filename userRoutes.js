const express = require("express");
const res = require("express/lib/response");
const Users = './users.model.js';
const router = express.Router();

router.get('/', async(req, res) => {
    try{
        const users= await Users.find();

        res.status(200).json(users);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
});

router.get('/:username', async(req, res) => {
    const username = req.params.username;
    try{
        const user = await Users.findOne({username: username});

        res.status(200).json(user);
    }catch(error) {
        res.status(404).json({message: error.message});
    }
});

router.post('/', async(req, res) => {
    console.log(req.body);
    const newUser = new Users({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone,
        likedPets: req.body.likedPets,
        preferences: req.body.preferences
    });
    try {
        await newUser.save();

        res.status(200).json(newUser);
    }catch(error) {
        res.status(404).json({message: error.message});
    }
});

router.patch('/:username', async(req, res) => {
    const username = req.params.username;
    try{
        await Users.findOneAndUpdate({
            username: username,
        },
        {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            phone: req.body.phone,
            likedPets: req.body.likedPets,
            preferences: req.body.preferences
        })
    }catch(error) {
        res.status(404).json({message: error.message});
    }
});

router.delete('/:username', async(req, res) => {
    const username = req.params.username;
    try {
        await Users.findOneAndRemove({username: username});
        res.status(203).json({username:username});
    }catch(error) {
        res.status(404).json({message: error.message});
    }
});

module.exports = router;