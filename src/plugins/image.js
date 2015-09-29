'use strict';

var React = require('react');

var extensions = [
	'jpg',
	'jpeg',
	'gif',
	'png',
	'svg'
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
	test: function(extension) {
		var isImage = (extensions.indexOf(extension) > -1);
		return isImage;
	}
};

module.exports = plugin;
