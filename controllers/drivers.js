// Dependencies
const express = require('express');
const { connections } = require('mongoose');
const driver = require('../models/driver');
const Driver = require('../models/driver');
//Route object
const driversRouter = express.Router();

driversRouter.get('/search', async (req, res) => {
    const term = req.query.term;
    if (term) {
        console.log(term)
        const results = await Driver.find({days_available: {$regex: term}});
        res.json({ results });
    } else {
        res.render('searchdriver.ejs');
    }
    
});

//Router actions
// seed route

driversRouter.get('/seed', async (req, res) => {
    const data = [{
            name: "Henry",
            img: "",
            age: 40,
            years_experience: 6,
            certified: true,
            days_available: ['monday', 'wednesday', 'thursday'],
        },
        {
            name: "Anny",
            img: "",
            age: 35,
            years_experience: 2,
            certified: true,
            days_available: ['monday', 'tuesday','wednesday', 'thursday','friday'],
        },
        {
            name: "David",
            img: "",
            age: 25,
            years_experience: 1,
            certified: false,
            days_available: ['friday'],
        },
    ];
    await Driver.deleteMany({});
    await Driver.create(data);
    res.redirect('/drivers');
});




//Index Route
driversRouter.get('/', (req, res) => {
    Driver.find({}, (err, drivers) => {
        res.render('driversindex.ejs', {drivers})
    })
})

//Delete Route
driversRouter.delete('/:id', (req, res) => {
    Driver.findByIdAndRemove(req.session.user, (error, driver)=> {
        res.redirect('/drivers/');
    }
    )
})

//Update Route
driversRouter.put('/driversDashboard', (req, res) => {
    const split_days = req.body.days_available.split(',');
        req.body.days_available = split_days;
    Driver.findByIdAndUpdate(req.session.user, req.body, {new:true}, (error, driver) => {
        res.redirect('/drivers/');
    });
});


//Edit Route
driversRouter.get('/edit', (req, res) => {
    Driver.findById(req.session.user, (err, driver) => {
        res.render('editdriver.ejs', {driver})
    })
})

//Show Route
driversRouter.get('/:id/', (req, res) => {
    Driver.findById(req.params.id, (err, driver) => {
        res.render('showdriver.ejs', {driver})
    })
})


//export route object
module.exports = driversRouter;