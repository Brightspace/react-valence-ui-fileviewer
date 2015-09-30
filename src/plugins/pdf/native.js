'use strict';

var React = require('react'), // eslint-disable-line no-unused-vars
	NativeViewer = require('./nativeViewer'),
	supportsNativePdf = require('./supportsNativePdf.js');

var plugin = {
	getComponent: function(props) {
		return <NativeViewer {...props} />;
	},
	test: function(extension) {
		if (extension !== 'pdf') {
			return false;
		}
		var result = supportsNativePdf();
		return result;
	}
};

module.exports = plugin;
