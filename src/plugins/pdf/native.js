'use strict';

var React = require('react'), // eslint-disable-line no-unused-vars
	NativeViewer = require('./nativeViewer');

var plugin = {
	getComponent: function(props) {
		return <NativeViewer {...props} />;
	},
	test: function(extension) {
		return (extension === 'pdf');
	}
};

module.exports = plugin;
