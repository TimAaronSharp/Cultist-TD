var mongoose = require('mongoose')
var connectionString = 'mongodb://cultist:admin@ds048368.mlab.com:48368/cultist'
var connection = mongoose.connection

mongoose.connect(connectionString, {
    useMongoClient: true,
    keepAlive: {socketOptions: {keepAlive: 300000, connectionTimeoutMS: 30000}}
})

connection.on('error', console.error.bind(console, 'connection error: '))

connection.once('open', () => {
    console.log('Connected to DB')
})