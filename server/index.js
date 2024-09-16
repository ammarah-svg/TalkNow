const express = require('express');
const handler = require('./middlewares/handler');
const connect = require('./config/connectDB');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes')
const app = express();
require('dotenv').config();
require('colors');
const cors = require('cors');


// for making your servers
const http = require('http');
// for making socket server
const { Server } = require('socket.io');


// create socket server

const io = new Server(server, {
  cors: {
      origin: "http://localhost:3000",
      method: ['POST', 'GET']
  }
})


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

connect();




app.use('/api/user', userRoutes); // Adjusted the endpoint to match routes
app.use('/api/chats', chatRoutes);

// Error handling middleware should be the last middleware
app.use(handler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT.toString().blue}`));
