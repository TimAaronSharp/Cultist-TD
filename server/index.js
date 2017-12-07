var express = require('express')
var server = express()
var bp = require('body-parser')
var DBConnect = require('./config/mlab-config')
var sessions = require('./auth/sessions')
var port = 3000

//route variables
var userRoutes = require('./auth/auth')


//register Middlewear
// server.use(express.static(__dirname + '/public'))
server.use(bp.json())
server.use(bp.urlencoded({extended: true}))
server.use(sessions)

///register routes
server.use(userRoutes)
server.use(Authenticate)

function Authenticate(req, res, next) {
    if(!req.session.uid) {
        return res.status(401).send({ error: 'You must login to continue' })
    }
    next()
}


server.listen(port, function(){
    console.log('Trying to get it done on: ', port)
})