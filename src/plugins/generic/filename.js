'use strict';

var React = require('react');

var Filename = React.createClass({
	render: function() {
		return <div className="vui-fileviewer-generic-filename">{this.props.value}</div>;
	}
});

module.exports = Filename;
