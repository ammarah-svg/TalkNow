const express = require('express');
const { addMessage, getChatHistory } = require('../controllers/messageController');
const router = express.Router();




router.post('/add-message', addMessage);
router.get('/history/:roomID', getChatHistory);

module.exports = router;