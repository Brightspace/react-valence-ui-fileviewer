'use strict';

var React = require('react');

var GenericViewer = React.createClass({
	render: function() {
		return React.DOM.div(null, 'Generic Viewer');
	}
});

var plugin = {
	getComponent: function() {
		return <GenericViewer />;
	},
	test: function() {
		return true;
	}
};

module.exports = plugin;
