'use strict';

var React = require('react'),
	getExtension = require('../getExtension'),
	getIconClassName = require('../getIconClassName');

var GenericViewer = React.createClass({
	render: function() {

		var filename = this.props.src.substr(this.props.src.lastIndexOf('/') + 1);

		var size = null;
		if (this.props.size) {
			size = (
				<div className="vui-fileviewer-generic-size">{this.props.size}</div>
			);
		}

		return (<div className="vui-fileviewer-generic">
			<Icon src={this.props.src} />
			<div className="vui-fileviewer-generic-main">
				<div className="vui-fileviewer-generic-filename">{filename}</div>
				{size}
			</div>
		</div>);
	}
});

var Icon = React.createClass({
	render: function() {
		var extension = getExtension(this.props.src);
		var className = 'vui-fileviewer-icon vui-fileviewer-icon-' + getIconClassName(extension);
		return (
			<div className={className}></div>
		);
	}
});

var plugin = {
	getComponent: function(src, size) {
		return (<GenericViewer src={src} size={size} />);
	},
	test: function() {
		return true;
	}
};

module.exports = plugin;
