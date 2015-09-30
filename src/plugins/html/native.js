'use strict';

var React = require('react'), // eslint-disable-line no-unused-vars
	NativeViewer = require('./nativeViewer');

var extensions = [
	'html',
	'htm'
];

var plugin = {
	getComponent: function(props) {
		return <NativeViewer {...props} />;
	},
	test: function(extension) {
		var isHtml = (extensions.indexOf(extension) > -1);
		return isHtml;
	}
};

module.exports = plugin;
