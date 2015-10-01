'use strict';

function getFileInfo(path, callback) {

	var xhr = new XMLHttpRequest();
	xhr.open('HEAD', path);
	xhr.withCredentials = true;
	xhr.onreadystatechange = function() {
		if (xhr.status !== 200) {
			return callback(new Error('Non-200 status:' + xhr.status));
		}
		if (xhr.readyState !== 4) {
			return;
		}
		var size = xhr.getResponseHeader('content-length');
		if (size === null) {
			size = 0;
		}
		var mimeType = xhr.getResponseHeader('content-type');
		if (mimeType === null) {
			mimeType = 'application/octet-stream';
		}
		mimeType = mimeType.split(';')[0].trim();
		callback(null, {size: parseInt(size), mimeType: mimeType});
	};
	xhr.send();

}

module.exports = getFileInfo;
