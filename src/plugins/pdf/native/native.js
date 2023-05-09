import React from 'react'; // eslint-disable-line no-unused-vars
import NativeViewer from 'react-valence-ui-iframe';
import supportsNativePdf from './supportsNativePdf.js';

var plugin = {
	getComponent: function(props) {
		return <NativeViewer {...props} />;
	},
	test: function(mimeType) {
		if (mimeType !== 'application/pdf') {
			return false;
		}
		var result = supportsNativePdf();
		return result;
	}
};

export default plugin;
