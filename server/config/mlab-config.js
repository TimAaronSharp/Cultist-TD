var mongoose = require('mongoose')
var connectionString = 'mongodb://admin:tester@ds143907.mlab.com:43907/cultistdb'
var connection = mongoose.connection

mongoose.connect(connectionString, {
    useMongoClient: true,
    keepAlive: {socketOptions: {keepAlive: 300000, connectionTimeoutMS: 30000}}
})

connection.on('error', console.error.bind(console, 'connection error: '))

connection.once('open', () => {
    console.log('Connected to DB')
})