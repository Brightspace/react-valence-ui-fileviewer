import ImageViewer from './viewer';
import mimeTypes from './mimeTypes';
import React from 'react'; // eslint-disable-line no-unused-vars

var plugin = {
	getComponent: function(props) {
		return <ImageViewer {...props} />;
	},
	test: function(mimeType) {
		var isImage = (mimeTypes.indexOf(mimeType) > -1);
		return isImage;
	}
};

export default plugin;
