const express = require('express');
const handler = require('./middlewares/handler');
const connect = require('./config/connectDB');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes')
const app = express();
require('dotenv').config();
require('colors');
const cors = require('cors');

// Configure CORS
const corsOptions = {
  origin: "http://localhost:5173", 
  credentials: true, 
};

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
