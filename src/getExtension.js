'use strict';

function getExtension(path) {

	if (path === undefined || path === null || typeof(path) !== 'string') {
		return '';
	}

	var index = path.lastIndexOf('.');
	if (index < 0) {
		return path.toLowerCase();
	}

	var extension = path.substr(index + 1).toLowerCase();
	return extension;

}

module.exports = getExtension;
