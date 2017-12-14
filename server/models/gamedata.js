var mongoose = require('mongoose')

var schema = new mongoose.Schema({
    level: { type: Object },
    
})

module.exports = mongoose.model('Gamedata', schema)