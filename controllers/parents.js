// Dependencies
const express = require('express');
const Parent = require('../models/parent');
const Driver = require('../models/driver');
//Route object
const parentsRouter = express.Router();

//Routes

//Home Route
parentsRouter.get('/', (req, res) => {
    Parent.findById(req.session.user, (err, parent) => {
        res.render('showparent.ejs', {parent});
    });
});

//Search Route
parentsRouter.get('/search', (req, res) => {
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
parentsRouter.post('/:id/select', async (req, res) => {
    const parent = await Parent.findById(req.session.user);
    const driver = await Driver.findById(req.params.id);
    parent.selected_drivers.push({
        id: req.params.id,
        name: driver.name,
        day: req.body.days_available
    });
    await parent.save();
    driver.days_available = driver.days_available.filter( word => word !== req.body.days_available);
    await driver.save();
    res.redirect('/parent/');
});

//export route object
module.exports = parentsRouter;