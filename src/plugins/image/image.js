'use strict';

var ImageViewer = require('./viewer'),
	mimeTypes = require('./mimeTypes'),
	React = require('react'); // eslint-disable-line no-unused-vars

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
