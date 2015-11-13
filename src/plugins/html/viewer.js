'use strict';

var React = require('react');

var NativeViewer = React.createClass({
	componentDidMount: function() {
		this.updateProgress(0);
	},
	propTypes: {
		src: React.PropTypes.string.isRequired
	},
	updateProgress: function(progress) {
		if (this.props.progressCallback) {
			this.props.progressCallback(progress);
		}
	},
	handleOnLoad: function() {
		this.updateProgress(100);
	},
	render: function() {
		return <iframe
			onLoad={this.handleOnLoad}
			src={this.props.src}
			className="vui-fileviewer-html-native">
		</iframe>;
	}
});

module.exports = NativeViewer;
