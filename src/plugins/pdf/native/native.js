'use strict';

var React = require('react'), // eslint-disable-line no-unused-vars
	NativeViewer = require('./nativeViewer'),
	supportsNativePdf = require('./supportsNativePdf.js');

var plugin = {
	getComponent: function(props) {
		return <NativeViewer {...props} />;
	},
	test: function(mimeType) {
		if (mimeType !== 'application/pdf') {
			return false;
		}
		var result = supportsNativePdf();
		console.log(`${Date.now()}\tpdf native viewer check: ${result}`); //eslint-disable-line
		return result;
	}
};

module.exports = plugin;
