'use strict';

var sinon = require('sinon'),
	pdfjsWorkerSrcInit = require('../pdfjsWorkerSrcInit'),
	cache = require('../pdfjsWorkerSrcInitCache'),
	getPdfjsMock = require('./utils/getPdfjsMock');

var pdfjs;
describe('pdfjsWorkerSrcInit', function() {
	var xhr,
		requests,
		workerSrcIsCrossDomain,
		createObjectURL,
		initialWorkerSrcUrl = 'http://cdn.example.com/pdf.worker.js',
		workerSrcObjectUrl = 'objectUrl';

	beforeEach(function() {
		requests = [];
		xhr = sinon.useFakeXMLHttpRequest();
		xhr.onCreate = function(request) {
			requests.push(request);
		};

		workerSrcIsCrossDomain = true;
		pdfjsWorkerSrcInit.__Rewire__('isCrossDomain', function() { return workerSrcIsCrossDomain; });
		pdfjs = getPdfjsMock();
		pdfjs.workerSrc = initialWorkerSrcUrl;

		pdfjsWorkerSrcInit.__Rewire__('pdfjs', pdfjs);

		createObjectURL = sinon.stub().returns(workerSrcObjectUrl);
		window.URL = { createObjectURL : createObjectURL };
	});

	afterEach(function() {
		cache.clear();
		xhr.restore();
	});

	describe('should get worker js file and set workerSrc to an object URL', function() {
		beforeEach(function(done) {
			var promise = pdfjsWorkerSrcInit();
			requests[0].respond(200, { 'Content-Type': 'application/javascript'	}, 'var x = 10000;');
			promise.then(done);
		});

		it('test', function() {
			expect(requests.length).toBe(1);
			expect(pdfjs.workerSrc).toEqual(workerSrcObjectUrl);
			expect(createObjectURL.calledOnce).toBe(true);
		});
	});

	describe('should not get worker js file if it has already been retrieved', function() {
		beforeEach(function(done) {
			var promise1 = pdfjsWorkerSrcInit();
			var promise2 = pdfjsWorkerSrcInit();
			requests[0].respond(200, { 'Content-Type': 'application/javascript'	}, 'var x = 10000;');
			return Promise.all([promise1, promise2]).then(done);
		});

		it('test', function() {
			expect(requests.length).toBe(1);
			expect(pdfjs.workerSrc).toEqual(workerSrcObjectUrl);
			expect(createObjectURL.calledOnce).toBe(true);
		});
	});

	describe('should not get worker js file if it has already been retrieved', function() {
		beforeEach(function(done) {
			var promise = pdfjsWorkerSrcInit();
			requests[0].respond(404);
			return promise.then(done);
		});

		it('test', function() {
			expect(requests.length).toBe(1);
			expect(pdfjs.workerSrc).toEqual(initialWorkerSrcUrl);
			expect(createObjectURL.called).toBe(false);
		});
	});

	describe('should not get worker js file if it has already been retrieved', function() {
		beforeEach(function(done) {
			workerSrcIsCrossDomain = false;
			return pdfjsWorkerSrcInit().then(done);
		});

		it('test', function() {
			expect(requests.length).toBe(0);
			expect(pdfjs.workerSrc).toEqual(initialWorkerSrcUrl);
			expect(createObjectURL.called).toBe(false);
		});
	});

});
