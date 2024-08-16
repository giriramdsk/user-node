require('dotenv').config(); // Load environment variables
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();
require("./helper/jwt.helper")

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api', require('./routes/userRoutes'));

// Server setup
const PORT = process.env.PORT || 3100;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
