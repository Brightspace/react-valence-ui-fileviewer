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
		fileInfo: React.PropTypes.object,
		locale: React.PropTypes.string,
		progressCallback: React.PropTypes.func,
		resizeCallback: React.PropTypes.func
	},

	getInitialState: function() {
		return {
			info: null,
			canAccessFile: null
		};
	},

	componentDidMount: function() {
		this.fetchFileInfo(this.props.src, this.props.fileInfo);
	},

	componentWillReceiveProps: function(nextProps) {
		if (nextProps.src !== this.props.src || nextProps.fileInfo !== this.props.fileInfo) {
			this.setState({info:null, canAccessFile: null});
			this.fetchFileInfo(nextProps.src, nextProps.fileInfo);
		}
	},

	fetchFileInfo: function(src, fileInfo) {
		if (!this.isMounted()) {
			return;
		}
		if ( this._isFileInfoValid(fileInfo)) {
			this.setState({
				canAccessFile: true,
				info: fileInfo
			});
		} else {
			fileInfoProvider(src, function(err, fileInfo) {
				if (err) {
					this.setState({canAccessFile: false, info: null});
					return;
				}
				this.setState({canAccessFile: true, info: fileInfo});
			}.bind(this));
		}
	},

	_isFileInfoValid: function(fileInfo) {
		if (!fileInfo) {
			return false;
		}
		return fileInfo.size !== undefined && fileInfo.mimeType !== undefined && fileInfo.filename !== undefined;
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
			withCredentials={this.state.info.withCredentials}
			messages={messages}
			mimeType={mimeType}
		/>;
	}
});

module.exports = FileViewer;
