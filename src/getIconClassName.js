'use strict';

var iconExtensionMap = {
	'audio/': 'audio',
	'application/pdf': 'pdf'
};

function getIconClassName(mimeType) {
	for (var pattern in iconExtensionMap) {
		if (mimeType.startsWith(pattern)) {
			return iconExtensionMap[pattern];
		}
	}
	return 'unknown';
}

module.exports = getIconClassName;
