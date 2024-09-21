const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUsers, addUsers } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/get-users', getUsers);




module.exports = router;
