
const AsyncHandler = require('express-async-handler');
const Chats = require('../models/chatModel');
const { v4: uuidv4 } = require('uuid')
const addChat = AsyncHandler(async (req, res) => {

    // get the sender id and receiver id
    const { sender_id, receiver_id } = req.body;
    // cherck if chat already exists
    const findChat = await Chats.findOne({
        users: { $all: [sender_id, receiver_id] }
    });

    if (findChat) {
        res.send(findChat)
    } else {
        const newChat = await Chats.create({
            users: [sender_id, receiver_id], chats: []
        })
        res.send(newChat)
    }

});






module.exports = {
    addChat
    
}