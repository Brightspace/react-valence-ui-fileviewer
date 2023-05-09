import React from 'react';
import image from './plugins/image/image.js';
import htmlNative from './plugins/html/html.js';
import genericViewer from './plugins/generic/generic.js';
import pdfNative from './plugins/pdf/native/native.js';
import pdfAlternate from './plugins/pdf/alternate/alternate.js';

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

export default FileViewerResolved;
