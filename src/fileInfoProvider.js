'use strict';

var getFilename = require('./getFilename');
var auth = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjRjYWU3ZGMzLWMzN2MtNDViNy1hZmZjLWRlMzk4ZGU4NGMxNiJ9.eyJpc3MiOiJodHRwczovL2FwaS5icmlnaHRzcGFjZS5jb20vYXV0aCIsImF1ZCI6Imh0dHBzOi8vYXBpLmJyaWdodHNwYWNlLmNvbS9hdXRoL3Rva2VuIiwiZXhwIjoxNTkyMjQ1MjA2LCJuYmYiOjE1OTIyNDE2MDYsInN1YiI6IjE2OSIsInRlbmFudGlkIjoiMzBiYjZhZjgtODdhZi00ODcwLTk0ZjMtYmNlNmEzNjZlYzkzIiwiYXpwIjoiRXhwYW5kb0NsaWVudCIsInNjb3BlIjoiKjoqOioiLCJqdGkiOiJiZTRiMDljYS00ZDQ0LTRhMmItYTg3MC03ODU2OTRmNjBlNDkifQ.QuPsR7xpGMAwuLe8v-ILwgmRXMPyDziAVib_jgYEZGptwA9FGVYFafRspsqz9V8MytAjHQDolySda8qyFfPNGcq07HLz11t2Sz4Zt_K8DS2jE4tWlbWMq56C_wmcVMqoU9gOHG4JIrYfwNNH6aT02VT4KKoBy4Mn-mwUZOF4XQKd9M_JQN0MSWmp1vISNlArHYkDUhmyk6M0C2FP3a3pAy831OHpddYIvV51QHyJSoslIGh9-sI-90HZOp8uO99AAEUE-T28l0nIE1mviIMLKQ1LrrKFrN9TT4WP_WEhgKrjOmw4jJiyH7soavN3CMmNQPOqP2CFHTQ1_EWBNkxHyA';

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

function getFileInfo(path, callback) {

	var xhr = new XMLHttpRequest();
	xhr.open('HEAD', path);
	xhr.setRequestHeader('Authorization', auth);
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
