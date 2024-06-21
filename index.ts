

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRoutes = require('./routes/authRoutes');
dotenv.config();

const index = express();
const port = process.env.PORT || 3000;

index.use(express.json());
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});



index.use('/api/auth', authRoutes);
index.use('/api', require('./routes/projectRoutes'));


index.listen(port ,() => {
    console.log(`Server is running on port ${port}`)
})

module.exports = index;
