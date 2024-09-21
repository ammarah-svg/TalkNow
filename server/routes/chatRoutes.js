const express = require('express');
const { addChat } = require('../controllers/chatController');
const {addMessage, getChatHistory} = require('../controllers/messageController');
const router = express.Router();


router.post('/add-chat', addChat)
router.get('/history/:roomID', getChatHistory)

module.exports = router