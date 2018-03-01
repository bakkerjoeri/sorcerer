/* eslint-env node */
const path = require('path');

module.exports = {
	entry: './script/main',
	resolve: {
		modules: [
			'script',
			'node_modules',
		]
	},
}
