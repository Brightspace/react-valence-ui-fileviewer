'use strict';

var React = require('react'),
	Download = require('./download.js'),
	Filename = require('./filename.js'),
	Icon = require('./icon.js'),
	Size = require('./size.js');

var Viewer = React.createClass({
	propTypes: {
		mimeType: React.PropTypes.string.isRequired,
		filename: React.PropTypes.string.isRequired,
		size: React.PropTypes.number.isRequired,
		srcdownload: React.PropTypes.string,
		locale: React.PropTypes.string,
		progressCallback: React.PropTypes.func
	},
	componentDidMount: function() {
		if (this.props.progressCallback) {
			this.props.progressCallback(100, 'certain');
		}
	},
	render: function() {
		return (<div className="vui-fileviewer-generic">
			<div className="vui-fileviewer-generic-container">
				<Icon mimeType={this.props.mimeType} />
				<div className="vui-fileviewer-generic-main">
					<Filename value={this.props.filename} />
					<Size value={this.props.size} locale={this.props.locale} />
					<Download src={this.props.srcdownload} />
				</div>
			</div>
		</div>);
	}
});

module.exports = Viewer;
