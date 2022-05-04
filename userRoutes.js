const express = require("express");
const res = require("express/lib/response");
const User = require('./models/userData.js');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

router.get('/', async(req, res) => {
    try{
        const allUsers= await User.find();
        res.status(200).json(allUsers);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
});

router.get('/:email', async(req, res) => {
    const email = req.params.email;
    try{
        const user = await User.findOne({email: email});

        res.status(201).json(user);
    }catch(error) {
        res.status(404).json({message: error.message});
    }
});

router.post('/', jsonParser, async(req, res) => {
    console.log(req.body);
    const newUser = new User({
        password: req.body.password,
        email: req.body.email,
    });
    try {
        await newUser.save();

        res.status(202).json(newUser);
    }catch(error) {
        res.status(404).json({message: error.message});
    }
});

router.patch('/:email/:likedpets', async(req, res)=>{
    const email = req.params.email;
    const likedPets = req.params.likedPets;
    const newLikedPet = {
        petId: req.body.petId,
        petName: req.body.petName,
        petType: req.body.petType,
        petAge: req.body.petAge,
        petDescription: req.body.petDescription,
        petImage: req.body.petImage
    }
    try{
        const user = await User.findOneAndUpdate({email: email},
            {
                likedPets: likedPets.push(newLikedPet)
            });

        res.status(205).json(user);
    }catch(error) {
        res.status(404).json({message: error.message});
    }
})
router.patch('/:email', jsonParser, async(req, res) => {
    const email = req.params.email;
    try{
        const update =  {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            phone: req.body.phone,
            likedPets: req.body.likedPets,
            preferences: req.body.preferences
        }
        const user = await User.findOneAndUpdate({email: email},update);

        res.status(203).json({email:email});
    }catch(error) {
        res.status(404).json({message: error.message});
    }
});

router.delete('/:email', async(req, res) => {
    const email = req.params.email;
    try {
        await User.findOneAndRemove({email: email});
        res.status(204).json({email:email});
    }catch(error) {
        res.status(404).json({message: error.message});
    }
});

module.exports = router;