var Gamedata = require('../models/gamedata')
var router = require('express').Router()
var Users = require('../models/user')

router.get('/api/gamedata', (req, res, next) => {
    Gamedata.find({})
        .then(gamedata => {
            res.send(gamedata)
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})

router.get('/api/gamedata/:levelNumber', (req, res, next) => {
    Gamedata.findOne({ levelNumber: req.params.levelNumber })
        .then(gamedata => {
            res.send(gamedata)
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})

router.post('/api/gamedata', (req, res, next) => {
    Gamedata.create(req.body)
        .then(gamedata => {
            res.send({ data: gamedata, message: 'Level successfully added' })
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})

router.delete('/api/gamedata/:levelNumber', (req, res, next) => {
    Gamedata.findOneAndRemove({ levelNumber: req.params.levelNumber })
        .then(() => {
            res.send({ message: "Level gone" })
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})


module.exports = router