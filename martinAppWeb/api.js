

module.exports = function(options) {

	var seneca = this;

	seneca.act( { role : 'web' }, {
		use: {

			prefix: '/api',

			// use action patterns where role has the value 'api' and cmd has some defined value
			pin: {
				role:'api',
				cmd:'*'
			},

			// for each value of cmd, match some HTTP method, and use the
			// query parameters as values for the action
			map:{
				statement: true
			}
		}
	});

}

