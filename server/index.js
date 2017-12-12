var express = require('express')
// var server = express()
var bp = require('body-parser')
var cors = require('cors')
var defaultErrorHandler = require('./handlers').defaultErrorHandler
var corsOptions = require('./handlers').corsOptions
var DBConnect = require('./config/mlab-config')
var sessions = require('./auth/sessions')
var Auth = require('./auth/auth')
var gamedataRoutes = require('./routes/gamedata-routes')
var port = 3000

//route variables
var userRoutes = require('./auth/auth')

let app = express()
let server = require('http').createServer(app)


//register Middlewear
// server.use(express.static(__dirname + '/public'))
app.use(sessions)
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/../public'))
app.use('*', logger)
app.use('*', cors(corsOptions))
app.use('/', Auth)

///register routes
app.use(userRoutes)
app.use(Validate)
app.use('/', defaultErrorHandler)

app.use(gamedataRoutes)

function Validate(req, res, next) {
    // ONLY ALLOW GET METHOD IF NOT LOGGED IN 
    console.log(req.session)
    if (req.method !== 'GET' && !req.session.uid) {
        return res.status(401).send({ error: 'Please Login or Register to continue' })
    }
    return next()
}

function logger(req, res, next) {
    console.log('INCOMING REQUEST', req.url)
    next()
}


server.listen(port, function(){
    console.log('Trying to get it done on: ', port)
})

module.exports = server