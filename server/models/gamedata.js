var mongoose = require('mongoose')

var schema = new mongoose.Schema({
    level: { type: Object },
    levelNumber: { type: Number }

})

module.exports = mongoose.model('Gamedata', schema)