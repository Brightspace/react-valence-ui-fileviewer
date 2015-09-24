'use strict';

var getExtension = require('../getExtension.js'),
	React = require('react');;

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
	getComponent: function(src) {
		return <ImageViewer src={src} />;
	},
	test: function(src) {
		var extension = getExtension(src);
		var isImage = (extensions.indexOf(extension) > -1);
		return isImage;
	}
};

module.exports = plugin;
