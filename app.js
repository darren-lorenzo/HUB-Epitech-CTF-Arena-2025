const express = require('express');
const connectDB = require('./config/connect_db.js');
const app = express();
const cors = require('cors');
const Authorization = require('./routes/authorization.js');

require('dotenv').config();


// Conect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/auth', Authorization);


// Listening to the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});