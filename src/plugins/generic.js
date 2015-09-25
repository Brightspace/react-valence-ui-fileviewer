'use strict';

var React = require('react');
var Enums = require('../enums'),
	getExtension = require('../getExtension');

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
	var fileType = getExtension(src);
	if (Enums.ImageType[fileType] !== undefined) {
		return Enums.IconType.image;
	} else {
		return Enums.IconType.generic;
	}
}

module.exports = plugin;
