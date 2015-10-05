'use strict';

var ImageViewer = require('./viewer'),
	React = require('react'); // eslint-disable-line no-unused-vars

var mimeTypes = [
	'image/jpeg',
	'image/gif',
	'image/png',
	'image/svg+xml'
];

var plugin = {
	getComponent: function(props) {
		return <ImageViewer {...props} />;
	},
	test: function(mimeType) {
		var isImage = (mimeTypes.indexOf(mimeType) > -1);
		return isImage;
	}
};

module.exports = plugin;
