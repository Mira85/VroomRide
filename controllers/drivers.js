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

//Homepage route
driversRouter.get('/', (req, res) => {
    res.render('drivers_home.ejs')
});

//export route object
module.exports = driversRouter;