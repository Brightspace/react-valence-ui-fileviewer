'use strict';

var React = require('react'),
	image = require('./plugins/image.js'),
	htmlNative = require('./plugins/html/native.js'),
	genericViewer = require('./plugins/generic/generic.js'),
	pdfNative = require('./plugins/pdf/native.js');

var viewers = [
	image,
	htmlNative,
	pdfNative,
	genericViewer
];

var FileViewerResolved = React.createClass({
	propTypes: {
		mimeType: React.PropTypes.string.isRequired,
		size: React.PropTypes.number.isRequired
	},
	render: function() {
		var viewer = null;
		for (var i = 0; i < viewers.length; i++) {
			if (viewers[i].test(this.props.mimeType)) {
				viewer = viewers[i].getComponent(this.props);
				break;
			}
		}
		return (<div className="vui-fileviewer">{viewer}</div>);
	}
});

module.exports = FileViewerResolved;
