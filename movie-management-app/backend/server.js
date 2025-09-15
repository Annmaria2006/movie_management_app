// backend/server.js
const express = require('express');
const dotenv = require('dotenv').config(); 
const connectDB = require('./config/db'); 
const cors = require('cors'); 


connectDB();

const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());

app.use(cors());


app.use('/api/movies', require('./routes/movieRoutes'));


app.get('/', (req, res) => {
    res.send('Movie Management API is running!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
