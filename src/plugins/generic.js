'use strict';

var React = require('react'),
	getExtension = require('../getExtension'),
	getIconClassName = require('../getIconClassName');

var GenericViewer = React.createClass({
	render: function() {
		return (<div><Icon src={this.props.src} />Generic Viewer: {this.props.src}</div>);
	}
});

var Icon = React.createClass({
	render: function() {
		var extension = getExtension(this.props.src);
		var className = getIconClassName(extension);
		return (
			<span className={className}></span>
		);
	}
});

var plugin = {
	getComponent: function(src) {
		return (<GenericViewer src={src} />);
	},
	test: function() {
		return true;
	}
};

module.exports = plugin;
