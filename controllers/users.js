//Dependencies
const express = require('express');
const Driver = require('../models/driver');

const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

//Router object
const usersRouter = express.Router();

//Routes
usersRouter.get('/login', (req, res) => {
    res.render('login.ejs', {err:''});
});


