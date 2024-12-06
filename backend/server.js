const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
console.log('JWT_SECRET:', process.env.JWT_SECRET);  // Debugging line





const app = express();
app.use(express.json()); // Parse JSON requests

app.use(cors());
// Use user routes for handling login and registration
app.use('/api/auth', userRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
