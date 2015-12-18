'use strict';

// inspired by http://colonelpanic.net/2014/08/using-pdf-js-web-worker-cross-domain-cors/

var pdfjs = require('./pdfjs-lib'),
	isCrossDomain = require('./isCrossDomain');

var initPromise;

function loadWorkerSrcFromUrl(url) {
	return new Promise(function(resolve, reject) {
		var request = new XMLHttpRequest();

		request.onreadystatechange = function() {
			if (request.readyState === 4) {
				if (request.status === 200) {
					var workerSrcBlob = new Blob([request.responseText], {
						type: 'text/javascript'
					});
					resolve(window.URL.createObjectURL(workerSrcBlob));
				} else {
					reject();
				}
			}
		};
		request.open('GET', url, true);
		request.send();
	});
}

function initialize() {
	return new Promise(function(resolve) {
		if (!isCrossDomain(pdfjs.workerSrc)) {
			// if we're not making a cross-domain call then there's nothing to do.
			resolve();
		} else {
			loadWorkerSrcFromUrl(pdfjs.workerSrc)
				.then(function(workerSrcBlobUrl) {
					pdfjs.workerSrc = workerSrcBlobUrl;
					resolve();
				}).catch(function() {
					// If loading the worker source via XHR did not work it's OK because pdf.js
					// will just fall back to using a fake worker which while less performant
					// should still work just fine.
					resolve();
				});
		}
	});
}

function ensureInitialized() {
	if (!initPromise) {
		initPromise = initialize();
	}
	return initPromise;
}

function clearCache() {
	initPromise = null;
}

module.exports = {
	init: ensureInitialized,
	clearCache: clearCache
};
