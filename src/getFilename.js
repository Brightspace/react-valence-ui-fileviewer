'use strict';

function getFilename(path, contentDisposition) {

	path = path || '';
	var pathFilename = path.substr(path.lastIndexOf('/') + 1);
	if (!contentDisposition) {
		return pathFilename;
	}

	var match = contentDisposition.match(/filename\*=.*'.*'([^;]+)/) ||
		contentDisposition.match(/filename="([^;]+)"/);
	if (match === null) {
		return pathFilename;
	}

	var filename = match[1];
	filename = decodeURIComponent(filename);
	return filename;

}

module.exports = getFilename;
