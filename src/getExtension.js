'use strict';

function getExtension(path) {

	if (path === undefined || path === null || typeof(path) !== 'string') {
		return '';
	}

	var extension = path.substr(path.lastIndexOf('.') + 1).toLowerCase();
	return extension;

}

module.exports = getExtension;
