var mongoose = require('mongoose')

var batizadoSchema = new mongoose.Schema({
    _id: String,
    date: String,
    href: String,
    mae: String,
    pai: String,
    ref: String,
    title: String
});

module.exports = mongoose.model('batismos', batizadoSchema)