//Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Selected drivers schema
const selectedDriversSchema = new Schema({
    id: String,
    name: String,
    day:String,
}, {timestamps: true});

//Mongoose Schema

const parentSchema = new Schema({
    name: String,
    email: String,
    password: String,
    selected_drivers: [selectedDriversSchema],
}, {
    timestamps: true
});

//Export model
module.exports = mongoose.model('Parent', parentSchema);