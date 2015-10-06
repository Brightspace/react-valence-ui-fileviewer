'use strict';

var React = require('react');

var ImageViewer = React.createClass({
	propTypes: {
		src: React.PropTypes.string.isRequired
	},
	render: function() {
		return <img src={this.props.src} alt="" className="vui-fileviewer-image" />;
	}
});

module.exports = ImageViewer;
