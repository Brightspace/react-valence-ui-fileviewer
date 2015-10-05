'use strict';

jest.autoMockOff();
jest.mock('../getFilename.js');

var getFilename = require('../getFilename'),
	sinon = require('sinon'),
	provider = require('../fileInfoProvider.js');

describe('FileInfoProvider', function() {

	var xhr, requests;

	beforeEach(function() {
		requests = [];
		xhr = sinon.useFakeXMLHttpRequest();
		xhr.onCreate = function(request) {
			requests.push(request);
		};
		getFilename.mockImpl(function() { return 'file.name'; });
	});

	afterEach(function() {
		xhr.restore();
	});

	it('should make a HEAD request to path', function() {
		provider('foo.bar', jest.genMockFunction());
		expect(requests.length).toBe(1);
		expect(requests[0].method).toBe('HEAD');
		expect(requests[0].url).toBe('foo.bar');
	});

	it('should return error for non-200 status', function() {
		var callback = jest.genMockFunction();
		provider('foo.bar', callback);
		requests[0].respond(500);
		expect(callback.mock.calls.length).toBe(1);
		expect(callback.mock.calls[0][0]).toEqual(new Error('Non-200 status:500'));
	});

	it('should calculate filename using path and content-disposition', function() {
		provider('foo.bar', jest.genMockFunction());
		requests[0].respond(200, {'content-disposition': 'blargh'});
		expect(getFilename.mock.calls[0][0]).toEqual('foo.bar');
		expect(getFilename.mock.calls[0][1]).toEqual('blargh');
	});

	it('should return size of 0 if content-length header is missing', function() {
		var callback = jest.genMockFunction();
		provider('foo.bar', callback);
		requests[0].respond(200);
		expect(callback.mock.calls[0][1].size).toBe(0);
	});

	it('should convert content-length header to an integer', function() {
		var callback = jest.genMockFunction();
		provider('foo.bar', callback);
		requests[0].respond(200, {'content-length': '92'});
		expect(callback.mock.calls[0][1].size).toBe(92);
	});

	it('should return octet-stream if content-type header is missing', function() {
		var callback = jest.genMockFunction();
		provider('foo.bar', callback);
		requests[0].respond(200);
		expect(callback.mock.calls[0][1].mimeType).toBe('application/octet-stream');
	});

	it('should return first segment of content-type header', function() {
		var callback = jest.genMockFunction();
		provider('foo.bar', callback);
		requests[0].respond(200, {'content-type': 'image/jpeg; charset=utf-8'});
		expect(callback.mock.calls[0][1].mimeType).toBe('image/jpeg');
	});

	it('should trim space from content-type header', function() {
		var callback = jest.genMockFunction();
		provider('foo.bar', callback);
		requests[0].respond(200, {'content-type': '  image/jpeg  '});
		expect(callback.mock.calls[0][1].mimeType).toBe('image/jpeg');
	});

	it('should include filename in result', function() {
		var callback = jest.genMockFunction();
		provider('foo.bar', callback);
		requests[0].respond(200);
		expect(callback.mock.calls[0][1].filename).toBe('file.name');
	});

});
