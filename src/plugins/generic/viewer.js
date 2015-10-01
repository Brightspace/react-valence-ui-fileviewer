'use strict';

var React = require('react'),
	Download = require('./download.js'),
	Filename = require('./filename.js'),
	Icon = require('./icon.js'),
	Size = require('./size.js');

var Viewer = React.createClass({
	render: function() {
		return (<div className="vui-fileviewer-generic">
			<Icon mimeType={this.props.mimeType} />
			<div className="vui-fileviewer-generic-main">
				<Filename src={this.props.src} />
				<Size value={this.props.size} />
				<Download src={this.props.srcdownload} />
			</div>
		</div>);
	}
});

module.exports = Viewer;
