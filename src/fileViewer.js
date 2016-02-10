'use strict';

var React = require('react'),
	FileViewerResolved = require('./fileViewerResolved'),
	fileInfoProvider = require('./fileInfoProvider'),
	i18n = require('react-frau-intl').i18n,
	getMessages = require('./getMessages'),
	IntlFileViewer = i18n(FileViewerResolved);

var FileViewer = React.createClass({
	propTypes: {
		src: React.PropTypes.string.isRequired,
		locale: React.PropTypes.string,
		progressCallback: React.PropTypes.func
	},
	getInitialState: function() {
		return {
			info: null,
			canAccessFile: null
		};
	},
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
				me.setState({canAccessFile: false, info: null});
				return;
			}
			me.setState({canAccessFile: true, info: fileInfo});
		});
	},
	render: function() {
		var forceGeneric = this.state.canAccessFile === false;

		if (!forceGeneric && !this.state.info) {
			return null;
		}

		var messages = getMessages(this.props.locale);
		var mimeType = (forceGeneric) ? undefined : this.state.info.mimeType;

		return <IntlFileViewer
			{...this.props}
			messages={messages}
			mimeType={mimeType}
		/>;
	}
});

module.exports = FileViewer;
