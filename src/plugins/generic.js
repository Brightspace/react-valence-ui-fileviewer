'use strict';

var React = require('react');
var Enums = require('../enums');

var GenericViewer = React.createClass({
	render: function() {
		return (<div>Generic Viewer: {this.props.src}</div>);
	}
});

var plugin = {
	getComponent: function(src) {
		return (<span>
					<Icon src={src} />
					<GenericViewer src={src} />
				</span>);
	},
	test: function() {
		return true;
	}
};

var Icon = React.createClass({
	render: function(src) {
		var iconString = "vui-icon-file-" + getIconType(this.props.src) + "-large";
		return (
			<div className={iconString}></div>
		)
	}
});

function getIconType (src) {
	var splitSrc = src.split('.');
	var fileType = splitSrc[splitSrc.length - 1].toLowerCase();

	if(Enums.ImageType[fileType] !== undefined) {
		console.log("I'm an image");
		return Enums.IconType.image;
	} else {
		console.log("I'm generic");
		return Enums.IconType.generic;
	}
}

module.exports = plugin;
