const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const blogRoute = require('./api/route/blog');
const userRoute = require('./api/route/user');
require('dotenv').config();
const uri = process.env.MONGO_URL;

const cors = require('cors');
app.use(cors());
mongoose.connect(uri);
mongoose.connection.on('error', err => {
    console.log('failed connection...')
});
mongoose.connection.on('connected', connected => {
    console.log('database connected...')
})

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/blog', blogRoute);
app.use('/user', userRoute);

module.exports = app;