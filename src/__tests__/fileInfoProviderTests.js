'use strict';

var sinon = require('sinon'),
	provider = require('../fileInfoProvider.js');

describe('FileInfoProvider', function() {

	var xhr, requests;

	beforeEach(function() {
		requests = [];
		xhr = sinon.useFakeXMLHttpRequest();
		xhr.onCreate = function(request) {
			requests.push(request);
		};
		provider.__Rewire__('getFilename', function() { return 'file.name'; });
	});

	afterEach(function() {
		xhr.restore();
	});

	it('should make a HEAD request to path', function() {
		provider('foo.bar', sinon.stub());
		expect(requests.length).toBe(1);
		expect(requests[0].method).toBe('HEAD');
		expect(requests[0].url).toBe('foo.bar');
	});

	it('should have an Authorization header when a token is provided', function() {
		provider('foo.bar', sinon.stub(), 'bar.foo');
		expect(requests.length).toBe(1);
		expect(requests[0].method).toBe('HEAD');
		expect(requests[0].url).toBe('foo.bar');
		expect(requests[0].requestHeaders['Authorization']).toBe('Bearer: bar.foo');
	});

	it('should return error for non-200 status', function() {
		var callback = sinon.stub();
		provider('foo.bar', callback);
		requests[0].respond(500);
		expect(callback.calledOnce).toBe(true);
		expect(callback.calledWithExactly(new Error('Non-200 status:500'))).toBe(true);
	});

	it('should calculate filename using path and content-disposition', function() {
		var getFileNameStub = sinon.stub();
		provider.__Rewire__('getFilename', getFileNameStub);
		provider('foo.bar', sinon.stub());
		requests[0].respond(200, {'content-disposition': 'blargh'});
		expect(getFileNameStub.calledWithExactly('foo.bar', 'blargh')).toBe(true);
	});

	it('should return size of 0 if content-length header is missing', function() {
		var callback = sinon.stub();
		provider('foo.bar', callback);
		requests[0].respond(200);

		expect(callback.firstCall.args[1].size).toBe(0);
	});

	it('should convert content-length header to an integer', function() {
		var callback = sinon.stub();
		provider('foo.bar', callback);
		requests[0].respond(200, {'content-length': '92'});
		expect(callback.firstCall.args[1].size).toBe(92);
	});

	it('should return octet-stream if content-type header is missing', function() {
		var callback = sinon.stub();
		provider('foo.bar', callback);
		requests[0].respond(200);
		expect(callback.firstCall.args[1].mimeType).toBe('application/octet-stream');
	});

	it('should return first segment of content-type header', function() {
		var callback = sinon.stub();
		provider('foo.bar', callback);
		requests[0].respond(200, {'content-type': 'image/jpeg; charset=utf-8'});
		expect(callback.firstCall.args[1].mimeType).toBe('image/jpeg');
	});

	it('should trim space from content-type header', function() {
		var callback = sinon.stub();
		provider('foo.bar', callback);
		requests[0].respond(200, {'content-type': '  image/jpeg  '});
		expect(callback.firstCall.args[1].mimeType).toBe('image/jpeg');
	});

	it('should include filename in result', function() {
		var callback = sinon.stub();
		provider('foo.bar', callback);
		requests[0].respond(200);
		expect(callback.firstCall.args[1].filename).toBe('file.name');
	});

});
