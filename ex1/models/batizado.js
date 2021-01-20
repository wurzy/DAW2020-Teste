var mongoose = require('mongoose')

var batizadoSchema = new mongoose.Schema({
    _id: String,
    date: String,
    title: String,
    ref: String,
    href: String
});

module.exports = mongoose.model('casamentos', batizadoSchema)