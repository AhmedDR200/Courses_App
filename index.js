const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const path = require('path');

// Static files
app.use('/upload', express.static(path.join(__dirname, 'upload')));

// CORS Middleware
const cors = require('cors');
app.use(cors());

// Dotenv config
require('dotenv').config();

// connect to db
const mongoose = require('mongoose');

const url = process.env.MONGO_URL;

mongoose.connect(url).then(() => {
    console.log('Connected to DB');
})


// JSON Middleware
app.use(express.json());

// Route middleware
app.use('/', require('./routes/courses'));
app.use('/', require('./routes/users'));

// Error handling middleware for invalid routes
app.all('*', (req, res, next) => {
    res.status(404).json({
        Status: false,
        Message: 'Resource not found',
        Data: null
    })
});

// Error handling middleware for global errors
app.use((error, req, res, next) => {
    res.status(500).json({
        Status: false,
        Message: 'Internal Server Error',
        Error: error.message
    })
});

// Listening on http://localhost:3001
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})