const AsyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const registerUser = AsyncHandler(async (req, res) => {
    try {
        const { username, email, password, avatar } = req.body;

        if (!username || !email || !password || !avatar) {
            res.status(400);
            throw new Error('Please enter all the fields');
        }

        const isUserPresent = await User.findOne({ email });
        if (isUserPresent) {
            res.status(400);
            throw new Error('User already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const createdUser = await User.create({
            username,
            email,
            password: hashedPassword,
            avatar
        });

        res.status(201).json(createdUser);
    } catch (error) {
        console.error('Error in registerUser:', error); // Log detailed error
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

const loginUser = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error('Please enter all the fields');
    }

    const userExists = await User.findOne({ email });
    if (!userExists) {
        res.status(404);
        throw new Error('User not found');
    }

    if (await bcrypt.compare(password, userExists.password)) {
        res.json(userExists); // Respond with user data
    } else {
        res.status(401);
        throw new Error('Invalid password');
    }
});




//get the user
const getUsers = AsyncHandler(async (req, res) => {
    const users = await User.find();
    res.send(users)
})

module.exports = {
    registerUser,
    loginUser,
    getUsers
};