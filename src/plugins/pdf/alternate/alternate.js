'use strict';

var React = require('react'), // eslint-disable-line no-unused-vars
	AlternateViewer = require('./alternateViewer');

var plugin = {
	getComponent: function(props) {
		return <AlternateViewer {...props} />;
	},
	test: function(mimeType) {
		console.log(`${Date.now()}\tpdf alternate check: ${mimeType === 'application/pdf'}`); //eslint-disable-line
		return mimeType === 'application/pdf';
	}
};

module.exports = plugin;
