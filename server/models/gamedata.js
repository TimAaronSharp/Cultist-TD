var mongoose = require('mongoose')

var schema = new mongoose.Schema({
    gameData: { type: String },
    description: { type: String }
})

module.exports = mongoose.model('Gamedata', schema)