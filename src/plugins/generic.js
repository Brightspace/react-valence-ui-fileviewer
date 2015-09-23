'use strict';

var React = require('react');

var GenericViewer = React.createClass({
	render: function() {
		return (<div>Generic Viewer: {this.props.src}</div>);
	}
});

var plugin = {
	getComponent: function(src) {
		return <GenericViewer src={src} />;
	},
	test: function() {
		return true;
	}
};

module.exports = plugin;
