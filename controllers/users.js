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
//Create
usersRouter.post('/signup', (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(SALT_ROUNDS));
    const user = {
        name: req.body.name,
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


usersRouter.get('/login', (req, res) => {
    res.render('login.ejs', {
        err: ''
    });
});

usersRouter.post('/login', (req, res) => {
    //find driver in database
    Driver.findOne({
        email: req.body.email
    }, (err, driver) => {
        if (driver) {
            if (bcrypt.compareSync(req.body.password, driver.password)) {
                req.session.user = driver._id;
                req.session.user_type = 'driver';
                res.redirect('/driver/');
            } else {
                return res.render('login.ejs', {
                    err: 'invalid creds'
                });
            }

        } else {
            // find parent in database
            Parent.findOne({
                email: req.body.email
            }, (error, parent) => {
                if (parent) {
                    if (bcrypt.compareSync(req.body.password, parent.password)) {
                        req.session.user = parent._id;
                        req.session.user_type = 'parent';
                        res.redirect('/parent/')
                    } else {
                        return res.render('login.ejs', {
                            err: 'invalid creds'
                        });
                    }
                } else {
                    res.render('login.ejs', {
                        err: 'invalid creds'
                    });
                }
            })
        }
    });
});

    
  




usersRouter.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/user/login');
    });
});


module.exports = usersRouter;