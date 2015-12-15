'use strict';

var React = require('react'),
	GenericViewer = require('../../generic/viewer.js');

var NativeViewer = React.createClass({
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
