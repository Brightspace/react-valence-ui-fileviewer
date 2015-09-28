'use strict';

var React = require('react'), // eslint-disable-line no-unused-vars
	Viewer = require('./viewer');

var plugin = {
	getComponent: function(props) {
		return (<Viewer {...props} />);
	},
	test: function() {
		return true;
	}
};

module.exports = plugin;
