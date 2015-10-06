'use strict';

var React = require('react'),
	FileViewerResolved = require('./fileViewerResolved'),
	fileInfoProvider = require('./fileInfoProvider');

var FileViewer = React.createClass({
	componentDidMount: function() {
		this.fetchFileInfo(this.props.src);
	},
	componentWillReceiveProps: function(nextProps) {
		if (nextProps.src !== this.props.src) {
			this.setState({info:null});
			this.fetchFileInfo(nextProps.src);
		}
	},
	fetchFileInfo: function(src) {
		var me = this;
		fileInfoProvider(src, function(err, fileInfo) {
			if (!me.isMounted()) {
				return;
			}
			if (err) {
				me.setState({error: err});
				return;
			}
			me.setState({info: fileInfo});
		});
	},
	getInitialState: function() {
		return {
			error: null,
			info: null
		};
	},
	propTypes: {
		src: React.PropTypes.string.isRequired,
		progressCallback: React.PropTypes.func
	},
	render: function() {
		if (this.state.error) {
			return <div>{this.state.error}</div>;
		}
		if (!this.state.info) {
			return null;
		}
		return <FileViewerResolved
			{...this.props}
			filename={this.state.info.filename}
			mimeType={this.state.info.mimeType}
			size={this.state.info.size} />;
	}
});

module.exports = FileViewer;
