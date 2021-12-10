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

    //TODO: code needs to be refactored
    Driver.findOne({
        email: req.body.email
    }, (err, driver) => {
        if (driver) {
            if (bcrypt.compareSync(req.body.password, driver.password)) {
                req.session.user = driver._id;
                res.redirect('/drivers/');
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
                        res.redirect('/user/search')
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
        res.redirect('/');
    });
});

/*usersRouter.get('/driversDashboard', (req, res) => {
    if (!req.session.user) return res.redirect('/user/login');
   Driver.findById(req.session.user, (err, driver) => {
        res.render('editdriver.ejs', {
            driver
        });
    });
   
});*/
//search
usersRouter.get('/search', (req, res) => {
    if (!req.session.user) return res.redirect('/user/login');
    Parent.findById(req.session.user, async (err, parent) => {
        const term = req.query.term;
        if (term) {
            const results = await Driver.find({
                days_available: {
                    $regex: term
                }
            });
            res.json({
                results
            });
        } else {
            res.render('searchdriver.ejs', {
                parent
            })
        }
    });
});

//Select Route

usersRouter.post('/:id/select', async (req, res) => {
    const parent = await Parent.findById(req.session.user);
    parent.selected_drivers.push({
        id: req.params.id,
        day: req.body.days_available
    });
    await parent.save();
    const driver = await Driver.findById(req.params.id);
    driver.days_available = driver.days_available.filter( word => word !== req.body.days_available);
    await driver.save();
    res.redirect('/drivers/');
});


/*driversRouter.get('/search', async (req, res) => {
    const term = req.query.term;
    if (term) {
        const results = await Driver.find({days_available: {$regex: term}});
        res.json({ results });
    } else {
        res.render('searchdriver.ejs');
    }
    
});*/


module.exports = usersRouter;