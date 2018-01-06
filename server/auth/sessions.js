let session = require('express-session');
let MongoDBStore = require('connect-mongodb-session')(session);
var connectionString = 'mongodb://admin:tester@ds143907.mlab.com:43907/cultistdb'

let store = new MongoDBStore(
	{
		uri: connectionString,
		collection: 'Sessions'
	});

// Catch errors 
store.on('error', function (error) {
	console.error(error);
});

module.exports = session({
	secret: 'I drink your milkshake!',
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week 
	},
	store: store,
	resave: false,
	saveUninitialized: false
})