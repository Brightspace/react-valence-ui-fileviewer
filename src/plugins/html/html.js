import React from 'react'; // eslint-disable-line no-unused-vars
import NativeViewer from 'react-valence-ui-iframe';

var plugin = {
	getComponent: function(props) {
		return <NativeViewer {...props} />;
	},
	test: function(mimeType) {
		var isHtml = (mimeType === 'text/html');
		return isHtml;
	}
};

export default plugin;
