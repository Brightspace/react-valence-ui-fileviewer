'use strict';

function getViewerContext() {
	return document.createElement('canvas').getContext('2d');
}

module.exports = getViewerContext;
