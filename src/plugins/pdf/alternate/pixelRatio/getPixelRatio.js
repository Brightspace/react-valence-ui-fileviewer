'use strict';

var getDevicePixelRatio = require('./getDevicePixelRatio'),
	getBackingStorePixelRatio = require('./getBackingStorePixelRatio');

function getPixelRatio() {
	var devicePixelRatio = getDevicePixelRatio(window),
		backingStorePixelRatio = getBackingStorePixelRatio();

	return devicePixelRatio / backingStorePixelRatio;
}

module.exports = getPixelRatio;
