// Dependencies
const express = require('express');
const Parent = require('../models/parent');
//Route object
const parentsRouter = express.Router();

//Routes
//Home Route
parentsRouter.get('/', (req, res) => {
    Parent.findById(req.session.user, (err, parent) => {
        res.render('showparent.ejs', {parent});
    });
});


//export route object
module.exports = parentsRouter;