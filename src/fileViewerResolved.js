'use strict';

var React = require('react'),
	image = require('./plugins/image/image.js'),
	htmlNative = require('./plugins/html/html.js'),
	genericViewer = require('./plugins/generic/generic.js'),
	pdfNative = require('./plugins/pdf/native/native.js'),
	pdfAlternate = require('./plugins/pdf/alternate/alternate.js');

var viewers = [
	image,
	htmlNative,
	pdfNative,
	pdfAlternate,
	genericViewer
];

var FileViewerResolved = React.createClass({
	propTypes: {
		mimeType: React.PropTypes.string
	},
	render: function() {
		var viewer = null;

		if (this.props.mimeType) {
			for (var i = 0; i < viewers.length; i++) {
				if (viewers[i].test(this.props.mimeType)) {
					viewer = viewers[i].getComponent(this.props);
					break;
				}
			}
		} else {
			viewer = genericViewer.getComponent(this.props);
		}

		return <div className="vui-fileviewer">{viewer}</div>;
	}
});

module.exports = FileViewerResolved;
