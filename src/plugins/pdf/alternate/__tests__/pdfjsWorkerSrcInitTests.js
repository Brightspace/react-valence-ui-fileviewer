'use strict';

jest.autoMockOff();
jest.mock('../isCrossDomain');
jest.mock('../pdfjs-lib');

var sinon = require('sinon'),
	isCrossDomain = require('../isCrossDomain'),
	pdfjs = require('../pdfjs-lib'),
	pdfjsWorkerSrcInit = require('../pdfjsWorkerSrcInit'),
	cache = require('../pdfjsWorkerSrcInitCache');

describe('pdfjsWorkerSrcInit', function() {
	var xhr,
		requests,
		workerSrcIsCrossDomain,
		initialWorkerSrcUrl = 'http://cdn.example.com/pdf.worker.js',
		workerSrcObjectUrl = 'objectUrl',
		createObjectURL = jest.genMockFunction(),
		originalCreateObjectURL = window.URL.createObjectURL;

	beforeEach(function() {
		requests = [];
		xhr = sinon.useFakeXMLHttpRequest();
		xhr.onCreate = function(request) {
			requests.push(request);
		};

		workerSrcIsCrossDomain = true;
		isCrossDomain.mockImpl(function() { return workerSrcIsCrossDomain; });

		pdfjs.workerSrc = initialWorkerSrcUrl;

		createObjectURL.mockImpl(function() {
			return workerSrcObjectUrl;
		});
		window.URL.createObjectURL = createObjectURL;
	});

	afterEach(function() {
		cache.clear();
		xhr.restore();
		createObjectURL.mockClear();
		window.URL.createObjectURL = originalCreateObjectURL;
	});

	pit('should get worker js file and set workerSrc to an object URL', function() {
		var promise = pdfjsWorkerSrcInit();
		requests[0].respond(200, { 'Content-Type': 'application/javascript'	}, 'var x = 10000;');
		return promise.then(function() {
			expect(requests.length).toBe(1);
			expect(pdfjs.workerSrc).toEqual(workerSrcObjectUrl);
			expect(createObjectURL.mock.calls.length).toBe(1);
		});
	});

	pit('should not get worker js file if it has already been retrieved', function() {
		var promise1 = pdfjsWorkerSrcInit();
		var promise2 = pdfjsWorkerSrcInit();
		requests[0].respond(200, { 'Content-Type': 'application/javascript'	}, 'var x = 10000;');
		return Promise.all([promise1, promise2]).then(function() {
			expect(requests.length).toBe(1);
			expect(pdfjs.workerSrc).toEqual(workerSrcObjectUrl);
			expect(createObjectURL.mock.calls.length).toBe(1);
		});
	});

	pit('should not modify workerSrc if an error occurs getting js file', function() {
		var promise = pdfjsWorkerSrcInit();
		requests[0].respond(404);
		return promise.then(function() {
			expect(requests.length).toBe(1);
			expect(pdfjs.workerSrc).toEqual(initialWorkerSrcUrl);
			expect(createObjectURL.mock.calls.length).toBe(0);
		});
	});

	pit('should not modify workerSrc if url is not cross domain', function() {
		workerSrcIsCrossDomain = false;
		return pdfjsWorkerSrcInit().then(function() {
			expect(requests.length).toBe(0);
			expect(pdfjs.workerSrc).toEqual(initialWorkerSrcUrl);
			expect(createObjectURL.mock.calls.length).toBe(0);
		});
	});
});
