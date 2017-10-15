require('babel-register');
const webpack = require('webpack');
const path = require('path');
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
	entry: __dirname +"/src/BrowerDataBase.js",
	output: {
		path: __dirname + "/dist",
		filename: "browser.database.min.js"
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
		new MinifyPlugin()
	],
	devServer: {
		port : 3001,
		host : 'localhost',
		contentBase :`${__dirname}/dist`
	}
	
};
