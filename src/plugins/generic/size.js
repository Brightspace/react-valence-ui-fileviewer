'use strict';

var React = require('react');

var Size = React.createClass({
	render: function() {
		if (!this.props.value) {
			return null;
		}
		return <div className="vui-fileviewer-generic-size">{this.props.value}</div>;
	}
});

module.exports = Size;
