'use strict';

var React = require('react');

var LegacyViewer = React.createClass({
	render: function() {
		return React.DOM.div(null, 'Legacy Viewer');
	}
});

var plugin = {
	getComponent: function() {
		return <LegacyViewer />;
	},
	test: function() {
		return false;
	}
};

module.exports = plugin;
