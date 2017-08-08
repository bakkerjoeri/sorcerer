/*eslint-env node */
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = () => {
	const env = process.env.NODE_ENV || 'production';

	let webpackConfig = {
		entry: './scripts/main.js',
		output: {
			path: path.resolve('./dist'),
			publicPath: '/',
			filename: 'sorcerer.min.js',
		},
		module: {
			rules: [{
				test: /\.js$/,
				exclude: [
					path.resolve('./node_modules'),
				],
				use: [{
					loader: 'babel-loader',
					options: {
						cacheDirectory: env === 'development' ? true : false
					}
				}],
			}],
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(env)
			}),
			new CleanWebpackPlugin(['dist']),
			new CopyWebpackPlugin([{
				from: 'assets',
				to: 'assets',
			}]),
		]
	};

	if (env === 'development') {
		webpackConfig.devtool = 'cheap-eval-source-map';
	}

	if (env === 'production') {
		webpackConfig.devtool = 'source-map';
		webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			extractComments: true,
		}));
		webpackConfig.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
		webpackConfig.plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
	}

	return webpackConfig;
}
