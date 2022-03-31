'use strict';

var React = require('react'),
	GenericViewer = require('../../generic/viewer.js');

var NativeViewer = React.createClass({
	propTypes: {
		resizeCallback: React.PropTypes.func,
		progressCallback: React.PropTypes.func,
		srcdownload: React.PropTypes.string,
		locale: React.PropTypes.string,
		src: React.PropTypes.string
	},
	componentWillMount: function() {
		this.updateProgress(0);
		if (this.props.resizeCallback) {
			this.props.resizeCallback('100%', false);
		}
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
		console.log(`${Date.now()}\tnative viewer render func`); //eslint-disable-line
		return <div>
			<iframe
				src={this.props.src}
				className="vui-fileviewer-pdf-native">

			</iframe>
			<GenericViewer srcdownload={this.props.srcdownload} locale={this.props.locale} />
		</div>;
	}
});

module.exports = NativeViewer;
