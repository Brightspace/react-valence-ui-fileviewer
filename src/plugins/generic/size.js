'use strict';

var React = require('react');

var Size = React.createClass({
	propTypes: {
		value: React.PropTypes.number.isRequired
	},
	render: function() {
		var size = this.props.value;
		if (size === 0) {
			size = '??';
		}
		return <div className="vui-fileviewer-generic-size">{size} bytes</div>;
	}
});

module.exports = Size;
