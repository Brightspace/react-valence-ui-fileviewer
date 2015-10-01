'use strict';

var React = require('react'),
	getIconClassName = require('../../getIconClassName');

var Icon = React.createClass({
	render: function() {
		var className = 'vui-fileviewer-icon vui-fileviewer-icon-' + getIconClassName(this.props.mimeType);
		return (
			<div className={className}></div>
		);
	}
});

module.exports = Icon;
