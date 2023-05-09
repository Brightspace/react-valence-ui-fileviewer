import React from 'react'; // eslint-disable-line no-unused-vars
import AlternateViewer from './alternateViewer';

var plugin = {
	getComponent: function(props) {
		return <AlternateViewer {...props} />;
	},
	test: function(mimeType) {
		return mimeType === 'application/pdf';
	}
};

export default plugin;
