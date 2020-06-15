'use strict';

var getFilename = require('./getFilename');
var auth = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjAzZWY4ZjAyLTU4NDAtNDEwNS05Y2U1LTliMDRkZmY0YzgwMSJ9.eyJzdWIiOiIxNjkiLCJ0ZW5hbnRpZCI6ImJjMGQxMjFiLTQ5YmUtNDU4NS04ZTRlLTg5MjUzNzkyNDM2YSIsInNjb3BlIjoiKjoqOioiLCJqdGkiOiI3MzA1YzUwMy1mNjM1LTRlMTAtOGEzOS0zMzZhNDVhYTU5NjYiLCJpc3MiOiJodHRwczovL2FwaS5icmlnaHRzcGFjZS5jb20vYXV0aCIsImF1ZCI6Imh0dHBzOi8vYXBpLmJyaWdodHNwYWNlLmNvbS9hdXRoL3Rva2VuIiwiZXhwIjoxNTkyMjQyNTA3LCJuYmYiOjE1OTIyMzg5MDd9.AxSF9IdowyKN8SAVPmGjItMlv6DdqXBAlSKswRdWIo8187zibMgGHoZAtFuFaOfJLeNMCeP3jUvAMwGui331z6l2CzZY6gRg0qWKxVSKZUiTEU9Amjo0j6iK_63HV7XXMjfv3nMGY2ZkzKbf-7BKsqTj5S128Gu0KOSqJ5u71uMC8t83HV1l23sMGoVAch-W23BXDqVGRTBIGd_cIfCNS9jEjUPpXedRNsSSodUFhHPj8qHufXgF7n5z3rjCwG3qNonca3AQZtk1WV2gxrqjUET0Uqa58Ucdq65YvhIR8b60fjZMksb-brKw0L43bFF94cXIOcAOU75UbeF8fP_D8w';

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
