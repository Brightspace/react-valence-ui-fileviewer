'use strict';

var React = require('react'),
	getExtension = require('../../getExtension'),
	getIconClassName = require('../../getIconClassName');

var Icon = React.createClass({
	render: function() {
		var extension = getExtension(this.props.src);
		var className = 'vui-fileviewer-icon vui-fileviewer-icon-' + getIconClassName(extension);
		return (
			<div className={className}></div>
		);
	}
});

module.exports = Icon;
