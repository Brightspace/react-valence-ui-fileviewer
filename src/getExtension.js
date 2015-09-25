'use strict';

function getExtension(path) {

	if (typeof(path) !== 'string') {
		return '';
	}

	var extension = path.substr(path.lastIndexOf('.') + 1).toLowerCase();
	return extension;

}

module.exports = getExtension;
