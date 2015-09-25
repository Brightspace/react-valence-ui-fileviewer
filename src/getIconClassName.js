'use strict';

var iconExtensionMap = {
	'audio': ['mp3', 'wav']
};

function getIconClassName(extension) {
	for (var className in iconExtensionMap) {
		if (iconExtensionMap[className].indexOf(extension) > -1) {
			return className;
		}
	}
	return 'generic';
}

module.exports = getIconClassName;
