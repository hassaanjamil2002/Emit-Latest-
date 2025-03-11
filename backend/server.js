const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const logsT = require('./routes/logs.js'); // Import the Wazuh logs route
const agentsRoutes= require('./routes/agents.js');
const rulesRoutes= require('./routes/rules.js');
const enforceRulesRoute = require('./routes/enforceRules');

dotenv.config();
console.log('JWT_SECRET:', process.env.JWT_SECRET); // Debugging line

const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests 
app.use(cors());

// Routes
app.use('/api/logs', logsT); // Wazuh logs route
app.use('/api/auth', userRoutes); // User authentication routes
app.use('/api/agents', agentsRoutes);
app.use('/api', rulesRoutes);  
app.use('/api', enforceRulesRoute);
// MongoDB connection
mongoose.connect("mongodb://localhost:27017/emitdb")
   .then(() => console.log('MongoDB Connected'))
   .catch(err => console.error("Didn't connect", err));


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
