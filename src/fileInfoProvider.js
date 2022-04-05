'use strict';

var getFilename = require('./getFilename');

function getSize(xhr) {
	var size = xhr.getResponseHeader('content-length');
	if (size === null) {
		size = 0;
	}
	return parseInt(size);
}

function getMimeType(xhr) {
	var mimeType = xhr.getResponseHeader('content-type');
	if (mimeType === null) {
		mimeType = 'application/octet-stream';
	}
	mimeType = mimeType.split(';')[0].trim();
	return mimeType;
}

function getFileInfo(path, callback, token) {
	var xhr = new XMLHttpRequest();
	xhr.open('HEAD', path);
	if (token) {
		xhr.setRequestHeader('Authorization', `Bearer ${token}`);
	}
	xhr.withCredentials = true;
	xhr.onreadystatechange = function() {
		if (xhr.readyState !== 4) {
			return;
		}
		if (xhr.status !== 200) {
			return callback(new Error('Non-200 status:' + xhr.status));
		}

		var filename = getFilename(
			path, xhr.getResponseHeader('content-disposition')
		);

		var fileInfo = {
			size: getSize(xhr),
			mimeType: getMimeType(xhr),
			filename: filename
		};
		callback(null, fileInfo);

	};
	xhr.send();

}

module.exports = getFileInfo;
