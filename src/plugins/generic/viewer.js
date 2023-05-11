import React from 'react';
import Download from './download.js';
import Icon from './icon.js';
import Size from './size.js';
import fileInfoProvider from '../../fileInfoProvider';

var Viewer = React.createClass({
	propTypes: {
		srcdownload: React.PropTypes.string,
		locale: React.PropTypes.string,
		progressCallback: React.PropTypes.func,
		mimeType: React.PropTypes.string,
		resizeCallback: React.PropTypes.func
	},
	contextTypes : {
		getIntlMessage: React.PropTypes.func
	},
	getInitialState: function() {
		return {
			info: null,
			error: null
		};
	},
	componentDidMount: function() {
		this.fetchFileInfo(this.props.srcdownload);
		if (this.props.progressCallback) {
			this.props.progressCallback(100, 'certain');
		}
		if (this.props.resizeCallback) {
			this.props.resizeCallback('100%', true);
		}
	},
	componentWillReceiveProps: function(nextProps) {
		if (nextProps.srcdownload !== this.props.srcdownload) {
			this.setState({ info:null, error: null });
			this.fetchFileInfo(nextProps.srcdownload);
		}
	},
	fetchFileInfo: function(downloadSrc) {
		var me = this;

		fileInfoProvider(downloadSrc, function(err, fileInfo) {
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
	render: function() {
		var headerMessage = this.context.getIntlMessage('Plugins.Generic.CanNotOpenFile'),
			subHeaderMessage = null,
			downloadArea = '';

		if (this.state.error) {
			subHeaderMessage = this.context.getIntlMessage('Plugins.Generic.NoAccess');
		} else if (this.state.info) {
			subHeaderMessage = this.context.getIntlMessage('Plugins.Generic.PleaseDownload');
			downloadArea = <div className="generic-download-area">
				<Size ref="fileSize" value={this.state.info.size} locale={this.props.locale} />
				<Download ref="download" src={this.props.srcdownload} />
			</div>;
		} else {
			return null;
		}

		var mimeType = (this.state.info) ? this.state.info.mimeType : this.props.mimeType;

		return (<div className="vui-fileviewer-generic">
			<div className="vui-fileviewer-generic-container">
				<div className="vui-fileviewer-generic-main">
					<div className="generic-header-icon-container">
						<div className="generic-headers">
							<div className="vui-fileviewer-generic-header">{headerMessage}</div>
							<div className="vui-fileviewer-generic-subheader">{subHeaderMessage}</div>
						</div>
						<Icon mimeType={mimeType} />
					</div>
					{downloadArea}
				</div>
			</div>
		</div>);
	}
});

export default Viewer;
