/* eslint-env node */
const path = require('path');

module.exports = {
	entry: {
		'sorcerer': './script/main.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].min.js'
	},
	resolve: {
		modules: [
			'script',
			'node_modules',
		],
	},
};
