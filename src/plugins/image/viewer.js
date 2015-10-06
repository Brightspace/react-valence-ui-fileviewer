'use strict';

var React = require('react');

var ImageViewer = React.createClass({
	propTypes: {
		src: React.PropTypes.string.isRequired
	},
	componentDidMount: function() {
		this.updateProgress(100);
	},
	updateProgress: function(progress) {
		if (this.props.progressCallback) {
			this.props.progressCallback(progress);
		}
	},
	render: function() {
		return <img src={this.props.src} alt="" className="vui-fileviewer-image" />;
	}
});

module.exports = ImageViewer;
