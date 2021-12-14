const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session')
const driversController = require('./controllers/drivers');
const usersController = require('./controllers/users');
const parentsController = require('./controllers/parents');

//Initialize app
const app =express();

//configure settings
require('dotenv').config();

//Database
const{DATABASE_URL, PORT, SECRET} = process.env;

//Connection to MongoDB
mongoose.connect(DATABASE_URL);

//Success/Error
const db = mongoose.connection;
db.on('connected', () => console.log('Connected to MongoDB'));
db.on('error', (err) => console.log('MongoDB Error: ' + err.message));
db.on('disconnected', () => console.log('MongoDB disconnected'));

//Middleware
//for public folder
app.use(express.static('public'));
//for req.body
app.use(express.urlencoded({extended:false}));
//for authentication
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
}));
//for user type 
app.use(async function(req, res, next) {
    if(req.session && req.session.user_type) {
        res.locals.user_type = req.session.user_type;
    } else {
    res.locals.user = null;
    }
    next();
});

//method-override
app.use(methodOverride('_method'));
//https logger
app.use(morgan('dev'));

//Route
app.use('/drivers/', driversController);
app.use('/user/', usersController);
app.use('/parent/', parentsController);
app.get('/', (req, res) => {
    res.render('welcomepage.ejs')
});

//Listener
app.listen(PORT, () => {
    console.log('Express is listening on port: ' + PORT)
});