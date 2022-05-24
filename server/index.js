/* eslint-disable no-unused-vars */
// external import
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// internal import
const auth = require('./routes/auth');
const user = require('./routes/users');
const post = require('./routes/posts');
const categorys = require('./routes/categorys');

const app = express();

dotenv.config();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '/images')));

// connection to the mongodb database
mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log('mongodb connection successfull');
    })
    .catch((err) => {
        console.log(err);
    });

// routing sec
app.use('/api/auth', auth);
app.use('/api/users', user);
app.use('/api/posts', post);
app.use('/api/categories', categorys);

// not found handler
app.use((req, res, next) => {
    res.status(404).json({
        error: 'requested url not found!',
    });
});
// error handling
app.use((err, req, res, next) => {
    res.status(500).json({
        error: err,
    });
});

// application connect port
app.listen(process.env.APP_PORT || 4000, () => {
    console.log(`listening on ${process.env.APP_PORT}`);
});
