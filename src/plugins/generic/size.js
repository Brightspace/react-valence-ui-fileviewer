'use strict';

var React = require('react');

var Size = React.createClass({
	render: function() {
		var size = this.props.value;
		if (size === 0) {
			size = '??';
		}
		return <div className="vui-fileviewer-generic-size">{size}</div>;
	}
});

module.exports = Size;
