//Dependencies
const express = require('express');
const Driver = require('../models/driver');
const Parent = require('../models/parent');

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
            const user = {
                email: req.body.email,
                password: hash
            }
            if (req.body.selection === 'driver') {
                Driver.create(user, (error, driver) => {
                    req.session.user = driver._id;
                    res.redirect('/')
                })
            } else {
                Parent.create(user, (error, parent) => {
                        req.session.user = parent._id;
                        res.redirect('/')

                })

                };
            });

            module.exports = usersRouter;