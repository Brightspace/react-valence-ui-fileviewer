'use strict';

const { mode } = require('babel-core/lib/transformation/file/options/config');
const path = require('path');

module.exports = {
	entry: './sample-webpack/app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.js'
	},
	watch: true,
	devServer: {
		static: {
		  directory: path.join(__dirname, 'sample-webpack'),
		},
		compress: true,
		port: 8080,
	},
	module: {
		rules: [
			{
				use: ['babel-loader'],
				test: /\.js$|\.jsx$/,
				exclude: /\.min\.js$/,
				include: [
					path.join( __dirname, 'src' ),
					path.join( __dirname, 'sample-webpack' )
				]
			},
			{
				use: 'babel-loader',
				test: /\.js$/,
				exclude: '/node_modules/',
				include: [
					path.join(__dirname, 'node_modules', 'react-vui-fileviewer'),
					path.join(__dirname, 'node_modules', 'react-valence-ui-iframe'),
					path.join(__dirname, 'node_modules', 'react-frau-intl')
				]
			}
		]
	},
	externals: {
		'pdfjs': 'PDFJS'
	}
};
