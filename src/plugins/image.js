'use strict';

var React = require('react');

var mimeTypes = [
	'image/jpeg',
	'image/gif',
	'image/png',
	'image/svg+xml'
];

var style = {
	maxWidth: '100%',
	maxHeight: '100%'
};

var ImageViewer = React.createClass({
	render: function() {
		return <img src={this.props.src} alt="" style={style} />;
	}
});

var plugin = {
	getComponent: function(props) {
		return <ImageViewer {...props} />;
	},
	test: function(mimeType) {
		var isImage = (mimeTypes.indexOf(mimeType) > -1);
		return isImage;
	}
};

module.exports = plugin;
