var whitelist = ['http://localhost:8080', 'http://portal.boisecodeworks.com'];
var corsOptions = {
	origin: function (origin, callback) {
		var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
		callback(null, originIsWhitelisted);
	},
	credentials: true
};

module.exports = {
    corsOptions
}