//Dependencies
const express = require('express');
const Driver = require('../models/driver');

const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

//Router object
const usersRouter = express.Router();

//Routes
usersRouter.get('/signup', (req, res) => {
    res.render('signup.ejs', {
        err: ''
    });
});

usersRouter.post('/signup', (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(SALT_ROUNDS));
    const driver = {
        email: req.body.email,
        password: hash
    }
    req.body.password = hash;
    if (req.body.selection === 'driver') {
        console.log(req.body.selection)
        Driver.create(driver, (error, driver) => {
            console.log(error)
            req.session.user = driver._id;
            res.redirect('/drivers')
        })
    } else {
        res.redirect('/')
    }

})

module.exports = usersRouter;