require('babel-register');
const webpack = require('webpack');
const path = require('path');
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
	entry: __dirname +"/src/DBSQL.js",
	output: {
		path: __dirname + "/dist",
		filename: "wed.sql.js"
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{
				loader: "babel-loader",
				include: [
					path.resolve(__dirname, "src"),
				],
				test: /\.js$/,
				// Options to configure babel with
				query: {
					plugins: ['transform-runtime', ],
					presets: ['react','es2015','stage-0'],

				}
			}
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			include: /\.min\.js$/,
			minimize: true
		})
	],
	devServer: {
		port : 3001,
		host : 'localhost',
		contentBase :`${__dirname}/dist`
	}
	
};
