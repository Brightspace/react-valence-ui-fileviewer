'use strict';

var React = require('react'), // eslint-disable-line no-unused-vars
	AlternateViewer = require('./alternateViewer');

var plugin = {
	getComponent: function(props) {
		return <AlternateViewer {...props} />;
	},
	test: function(mimeType) {
		return mimeType === 'application/pdf';
	}
};

module.exports = plugin;
