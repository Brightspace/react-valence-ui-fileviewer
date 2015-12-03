'use strict';

var getViewerContext = require('./getViewerContext');

function getBackingStorePixelRatio() {
	var ctx = getViewerContext();

	if (ctx) {
		return ctx.webkitBackingStorePixelRatio
			|| ctx.mozBackingStorePixelRatio
			|| ctx.msBackingStorePixelRatio
			|| ctx.oBackingStorePixelRatio
			|| ctx.backingStorePixelRatio
			|| 1;
	} else {
		return 1;
	}
}

module.exports = getBackingStorePixelRatio;
