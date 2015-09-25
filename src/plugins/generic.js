'use strict';

var React = require('react');
var Enums = require('../enums');

var GenericViewer = React.createClass({
	render: function() {
		return (<div><Icon src={this.props.src} />Generic Viewer: {this.props.src}</div>);
	}
});

var plugin = {
	getComponent: function(src) {
		return (<GenericViewer src={src} />);
	},
	test: function() {
		return true;
	}
};

var Icon = React.createClass({
	render: function() {
		var iconString = 'vui-icon-file-' + getIconType(this.props.src) + '-large';
		return (
			<span className={iconString}></span>
		);
	}
});

function getIconType(src) {
	var fileType = getFileType(src);

	if (Enums.ImageType[fileType] !== undefined) {
		console.log("I'm an image");
		return Enums.IconType.image;
	} else {
		console.log("I'm generic");
		return Enums.IconType.generic;
	}
}

function getFileType(fileName) {
	var splitSrc = fileName.split('.');
	var fileType = splitSrc[splitSrc.length - 1].toLowerCase();
	return fileType;
}

module.exports = plugin;
