var React = require('react'), // eslint-disable-line no-unused-vars
	NativeViewer = require('react-valence-ui-iframe'),
	supportsNativePdf = require('./supportsNativePdf.js');

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
