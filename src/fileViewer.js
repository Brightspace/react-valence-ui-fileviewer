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
			canStream: null
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
				me.setState({canStream: false, info: null});
				return;
			}
			me.setState({canStream: true, info: fileInfo});
		});
	},
	render: function() {
		var forceGeneric = this.state.canStream === false;
		var info = (forceGeneric) ? {} : this.state.info;

		if (!info) {
			return null;
		}

		var messages = getMessages(this.props.locale);
		return <IntlFileViewer
			{...this.props}
			messages={messages}
			mimeType={info.mimeType}
		/>;
	}
});

module.exports = FileViewer;
