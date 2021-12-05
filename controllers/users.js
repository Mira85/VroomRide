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

    //TODO: code needs to be refactored
    Driver.findOne({
        email: req.body.email
    }, (err, driver) => {
        if (driver) {
            if (bcrypt.compareSync(req.body.password, driver.password)) {
                req.session.user = driver._id;
                res.redirect('/user/driversDashboard');
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
                        res.redirect('/user/parentsDashboard')
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


usersRouter.get('/driversDashboard', (req, res) => {
    if (!req.session.user) return res.redirect('/user/login');
   Driver.findById(req.session.user, (err, driver) => {
        res.render('editdriver.ejs', {
            driver
        });
    });
   
});

usersRouter.get('/parentsDashboard', (req, res) => {
    if (!req.session.user) return res.redirect('/user/login');
    Parent.findById(req.session.user, (err, parent) => {
        res.render('searchdriver.ejs', {
            parent
        });
    });
})




module.exports = usersRouter;