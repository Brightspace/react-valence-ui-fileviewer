// inspired by http://colonelpanic.net/2014/08/using-pdf-js-web-worker-cross-domain-cors/

import pdfjs from './pdfjs-lib';
import isCrossDomain from './isCrossDomain';
import cache from './pdfjsWorkerSrcInitCache';

function loadWorkerSrcFromUrl(url) {
	return new Promise(function(resolve, reject) {
		var request = new XMLHttpRequest();

		request.onreadystatechange = function() {
			if (request.readyState === 4) {
				if (request.status === 200) {
					var workerSrcBlob = getBlob(request);
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

function getBlob(request) {
	return new Blob([request.responseText], {
		type: 'text/javascript'
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
	var cachedResult = cache.get();
	if (!cachedResult) {
		cachedResult = initialize();
		cache.set(cachedResult);
	}
	return cachedResult;
}

export default ensureInitialized;
