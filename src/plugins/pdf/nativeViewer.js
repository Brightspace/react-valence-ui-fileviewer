'use strict';

var React = require('react'),
	GenericViewer = require('../generic/viewer.js');

var NativeViewer = React.createClass({
	componentDidMount: function() {
		this.updateProgress(100);
	},
	updateProgress: function(progress) {
		if (this.props.progressCallback) {
			this.props.progressCallback(progress);
		}
	},
	render: function() {
		return <object
			data={this.props.src}
			type="application/pdf"
			className="vui-fileviewer-pdf-native">
			<GenericViewer {...this.props} />
		</object>;
	}
});

module.exports = NativeViewer;
