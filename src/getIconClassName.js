'use strict';

var iconExtensionMap = {
	'application/pdf': 'pdf',
	'application/msword': 'document',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'document',
	'application/vnd.ms-powerpoint': 'presentation',
	'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'presentation',
	'application/vnd.ms-excel': 'spreadsheet',
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'spreadsheet',
	'application/x-shockwave-flash': 'flash',
	'text/xml': 'xml',
	'application/zip': 'zip',
	'audio/': 'audio',
	'image/': 'image',
	'text/': 'text',
	'video/': 'video'
};

function getIconClassName(mimeType) {
	if (!mimeType) {
		return 'unknown';
	}

	for (var pattern in iconExtensionMap) {
		if (mimeType.indexOf(pattern) === 0) {
			return iconExtensionMap[pattern];
		}
	}
	return 'unknown';
}

module.exports = getIconClassName;
