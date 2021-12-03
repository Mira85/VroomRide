// Dependencies
const express = require('express');
const Driver = require('../models/driver');
//Route object
const driversRouter = express.Router();

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

//Homepage Route
driversRouter.get('/', (req, res) => {
    res.render('drivers_home.ejs');
});

//New Route
driversRouter.get('/new', (req, res) => {
    res.render('newdriver.ejs');
});

//Delete Route

//Update Route
driversRouter.get('/edit', (req, res) => {
    Driver.findById(req.params.id, (error, driver) => {
        res.render('editdriver.ejs', {driver});
    });
});


//Create Route
driversRouter.post('/', (req, res) => {
    const split_days = req.body.days_available.split(',');
       req.body.days_available = split_days;
    Driver.create(req.body, (err, driver) => {
        res.redirect('/drivers');
    });
});


//export route object
module.exports = driversRouter;