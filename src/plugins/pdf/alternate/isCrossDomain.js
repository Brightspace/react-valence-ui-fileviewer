'use strict';

var urlParse = require('url-parse');

function isCrossDomain(url) {
	if (typeof url !== 'string') {
		return false;
	}

	var currentUrl = urlParse(window.location.href),
		otherUrl = urlParse(url);

	return currentUrl.protocol !== otherUrl.protocol
		|| currentUrl.hostname !== otherUrl.hostname
		|| currentUrl.port !== otherUrl.port;
}

module.exports = isCrossDomain;
