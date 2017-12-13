let session = require('express-session');
let MongoDBStore = require('connect-mongodb-session')(session);
var connectionString = 'mongodb://primary:tester@ds044667.mlab.com:44667/cultisttd'

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
	// cookie: {
	// 	maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week 
	// },
	store: store,
	resave: false,
	saveUninitialized: false
})