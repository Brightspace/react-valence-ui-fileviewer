'use strict';

var React = require('react'),
	getExtension = require('./getExtension'),
	image = require('./plugins/image.js'),
	generic = require('./plugins/generic/generic.js'),
	pdfNative = require('./plugins/pdf/native.js');

var viewers = [
	image,
	pdfNative,
	generic
];

var FileViewer = React.createClass({
	propTypes: {
		src: React.PropTypes.string.isRequired
	},
	render: function() {
		var extension = getExtension(this.props.src);
		var viewer;
		for (var i = 0; i < viewers.length; i++) {
			if (viewers[i].test(extension)) {
				viewer = viewers[i].getComponent(this.props);
				break;
			}
		};
		return (<div className="vui-fileviewer">{viewer}</div>);
	}
});

module.exports = FileViewer;
