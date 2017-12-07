var express = require('express')
var server = express()
var bp = require('body-parser')
var DBConnect = require('./config/mlab/mlab-config')
var port = 3000

//route variables


//register Middlewear
server.use(bp.json())
server.use(bp.urlencoded({extended: true}))

///register routes


server.listen(port, function(){
    console.log('Trying to get it done on: ', port)
})