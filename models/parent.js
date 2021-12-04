//Dependencies
const mongoose = require('mongoose');

//Mongoose Schema
const Schema = mongoose.Schema;
const parentSchema = new Schema({
    name: String,
    email: String,
    password: String,
    selected_drivers: [{
        driver: String
    }],
}, {
    timestamps: true
});

//Export model
module.exports = mongoose.model('Parent', parentSchema);