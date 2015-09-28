'use strict';

var React = require('react');

var Filename = React.createClass({
	render: function() {
		var filename = this.props.src.substr(this.props.src.lastIndexOf('/') + 1);
		return <div className="vui-fileviewer-generic-filename">{filename}</div>;
	}
});

module.exports = Filename;
