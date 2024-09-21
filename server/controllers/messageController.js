const Message = require('../models/messageModel'); 
const Chat = require('../models/chatModel'); 

// Add message function
const addMessage = async (req, res) => {
  const { sender_id, receiver_id, message } = req.body;
  const io = req.app.get('socketio'); // Access socket.io from the app

  try {
    // Find or create chat room
    let chat = await Chat.findOne({ 
      $or: [
        { users: [sender_id, receiver_id] },
        { users: [receiver_id, sender_id] }
      ]
    });

    if (!chat) {
      chat = new Chat({ users: [sender_id, receiver_id] });
      await chat.save();
    }

    // Create new message
    const newMessage = new Message({
      sender_id,
      receiver_id,
      message,
      roomID: chat._id, 
      sentAt: Date.now(),
    });

    await newMessage.save();

    // Emit message via socket.io to the relevant room
    io.to(chat._id.toString()).emit('new_message', newMessage);

    // Send the response back to the client
    res.status(201).json(newMessage);

  } catch (error) {
    console.error('Error while adding message:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};





// Get chat history function
const getChatHistory = async (req, res) => {
    const { roomID } = req.params;

    try {
        const chatHistory = await Message.find({ roomID }).sort({ sentAt: 1 });

        if (chatHistory.length === 0) {
            return res.status(404).json({ message: 'No messages found' });
        }

        res.json(chatHistory);
    } catch (error) {
        console.error('Error while retrieving chat history:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { addMessage, getChatHistory };
