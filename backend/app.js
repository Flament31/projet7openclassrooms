const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');
const helmet = require('helmet');
const session = require('cookie-session');
const nocache = require('nocache');
require('dotenv').config();
require('sequelize');

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const { sequelize } = require('./models/index');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const expiryDate = new Date(Date.now() + 3600000);
app.use(session({
    name: 'session',
    secret: process.env.SEC_SES,
    cookie: {
        secure: true,
        httpOnly: true,
        domain: 'http://localhost:3000',
        expires: expiryDate
    }
}));

app.use(bodyParser.json());

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));
app.use(helmet());
app.use(nocache());

app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);

const dbTest = async function () {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
dbTest();

module.exports = app;