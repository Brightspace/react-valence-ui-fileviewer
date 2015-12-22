'use strict';

var React = require('react');

var ImageViewer = React.createClass({
	propTypes: {
		src: React.PropTypes.string.isRequired
	},
	componentWillMount: function() {
		this.updateProgress(0);
	},
	componentDidMount: function() {
		this.updateProgress(100);
	},
	updateProgress: function(progress) {
		if (this.props.progressCallback) {
			this.props.progressCallback(progress, 'none');
		}
	},
	componentWillUnmount: function() {
		// without this, the file continues to download after being removed from the DOM
		React.findDOMNode(this.refs.image).src = '';
	},
	render: function() {
		// Wrapped in a Div in order to prevent it from resizing to fit the dimensions of the flex-box
		return <div className="vui-fileviewer-image-container"><img ref="image" src={this.props.src} alt="" className="vui-fileviewer-image" /></div>;
	}
});

module.exports = ImageViewer;
