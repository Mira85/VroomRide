//Dependencies
const mongoose = require('mongoose');

//Mongoose schema
const Schema = mongoose.Schema;
const driverSchema = new Schema ({
    name: String,
    email: String,
    password:String,
    img: String,
    age: Number,
    years_experience: Number,
    certified: Boolean,
    days_available: {type:[String], required: true, lowercase:true},

}, {timestamps: true});

//export mongoose model
module.exports = mongoose.model('Driver', driverSchema);