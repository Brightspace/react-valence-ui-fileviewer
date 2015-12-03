'use strict';

function getDevicePixelRatio(browserWindow) {
	if (browserWindow && browserWindow.devicePixelRatio) {
		return browserWindow.devicePixelRatio;
	} else {
		return 1;
	}
}

module.exports = getDevicePixelRatio;
