'use strict';

/*global ActiveXObject*/

function supportsNativePdf(platform, userAgent) {

	platform = platform || navigator.platform;
	userAgent = userAgent || navigator.userAgent;

	// iOS devices are unable to scroll embedded PDFs
	// http://stackoverflow.com/questions/15480804/problems-displaying-pdf-in-iframe-on-mobile-safari
	var iOS = /iPad|iPhone|iPod/i.test(platform);
	if (iOS) {
		return false;
	}

	// Microsoft Edge has not yet implemented the mimeTypes thing, but ships with native PDF support
	// http://stackoverflow.com/questions/31793186/detecting-support-for-application-pdf-in-microsoft-edge
	var isEdge = /Edge/i.test(userAgent);
	if (isEdge) {
		return true;
	}

	var mimeType = navigator.mimeTypes['application/pdf'];
	if (mimeType) {
		return true;
	}

	// for non-Edge IE-based browsers
	try {
		new ActiveXObject('AcroPDF.PDF');
		return true;
	} catch (e) {
		// do nothing
	}

	return false;

}

module.exports = supportsNativePdf;
